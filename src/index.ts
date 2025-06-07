import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';

import { typeDefs, resolvers } from './graphql';
import { connectDB } from './utils/connectDB';
import { sessionOptions } from './utils/session';
import { setupPassport } from './utils/passport';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  const app: express.Application = express();

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  app.use(session(sessionOptions) as any);
  app.use(passport.initialize() as any);
  app.use(passport.session() as any);
  setupPassport();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });
  app.set('trust proxy', 1); // trust Heroku proxy

  // Google OAuth routes (ensure these are still included)
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
