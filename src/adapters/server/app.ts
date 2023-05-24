import expess, { json, urlencoded } from 'express';

const app = expess();
app.use(json());
app.use(urlencoded({ extended: true }));

export default app;
