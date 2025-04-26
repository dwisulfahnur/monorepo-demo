import app from './core/app';

const PORT = parseInt(process.env.PORT || '4000');
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Backend running on http://${HOST}:${PORT}`);
});
