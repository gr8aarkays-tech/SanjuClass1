import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({
  origin: [
    'https://gr8aarkays-tech.github.io',
    'http://localhost:5173',
    'http://localhost:4173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

app.use('/api', routes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`SanjuClass1 backend running on http://localhost:${PORT}`);
});
