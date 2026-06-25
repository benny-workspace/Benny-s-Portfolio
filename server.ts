import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// Lazily initialize Resend (as per the environment guidelines on API key safety)
let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY || "re_CeEDsrpi_3eFYZiqJuNmwgwrz1uLFFCvB";
    if (!key) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, projectType, budget, details, timeline } = req.body;

      if (!name || !email || !details) {
        return res.status(400).json({ error: "Missing required fields (name, email, details)" });
      }

      const resend = getResend();

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Project Inquiry from Benny's Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
          <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
          <p style="margin-top: 20px;"><strong>Message / Details:</strong></p>
          <p style="white-space: pre-wrap; background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #333; color: #444;">${details}</p>
        </div>
      `;

      // Send to the user's email
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "benny0839.2007@gmail.com",
        subject: `New Inquiry from ${name} (${projectType || 'General'})`,
        html: htmlContent,
      });

      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Failed to send email via Resend:", error);
      return res.status(500).json({ error: error.message || "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
