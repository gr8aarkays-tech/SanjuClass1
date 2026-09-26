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

app.get('/', (_, res) => res.json({ name: 'SchoolBuddy API', status: 'ok' }));
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`SchoolBuddy backend v${process.env.npm_package_version ?? '1.0'} running on port ${PORT}`);
  console.log(`DB path: ${process.env.DATA_DIR ?? 'default (relative)'}`);
});
