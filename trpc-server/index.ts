import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import appRouter from './router';

const app = express();
const port = 4000;

app.use(express.json());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), // Return an empty object instead of null
  })
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
