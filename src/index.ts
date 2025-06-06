import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';

import { typeDefs, resolvers } from './graphql/index';
import { connectDB } from './utils/connectDB';
import { sessionOptions } from './utils/session';
import { setupPassport } from './utils/passport';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  const app = express();

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
  setupPassport();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  // Google OAuth routes (ensure these are still included)
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('http://localhost:3000');
    }
  );

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
