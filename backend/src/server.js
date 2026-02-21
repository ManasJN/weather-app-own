import app from './app.js';
import { config, validateEnv } from './config.js';

validateEnv();

app.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});
