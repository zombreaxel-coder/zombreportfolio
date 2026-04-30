import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined in environment variables');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    console.log(`Nouveau message pour axelzombre11@gmail.com de ${name} (${email}): ${message}`);

    try {
      const resend = getResendClient();
      
      const { data, error } = await resend.emails.send({
        from: 'Contact Portefolio <onboarding@resend.dev>',
        to: ['axelzombre11@gmail.com'],
        subject: `Nouveau message de ${name}`,
        html: `
          <h3>Nouveau message de contact</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        console.error('Erreur Resend:', error);
        return res.status(400).json({ success: false, error });
      }
      
      res.status(200).json({ success: true, message: 'Message envoyé avec succès !', data });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur ou clé API manquante' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

startServer();
