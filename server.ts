import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    console.log(`Nouveau message de ${name} (${email}): ${message}`);

    // Simulation d'envoi d'email
    // Dans un environnement de production, vous utiliseriez un service comme Resend, SendGrid ou Nodemailer ici.
    // L'email sera envoyé à : wenkuni20@outlook.com
    
    try {
      // Si vous avez une clé API Resend, vous feriez :
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({ ... });
      
      res.status(200).json({ success: true, message: 'Message reçu !' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
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
