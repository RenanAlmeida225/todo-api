import expess, { json, urlencoded } from 'express';
import route from './routes';

const app = expess();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', route);
export default app;
