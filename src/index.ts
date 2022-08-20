import express from 'express';
import optimizeRoutes from './routes/optimize.route';

const app = express();
const port = process.env.PORT || '2030';


app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.use('/optimize', optimizeRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

