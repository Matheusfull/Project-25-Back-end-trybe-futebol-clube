import { Application } from 'express';
import usersRouter from './users.routes';
import teamsRouter from './teams.routes';
import matchesRouter from './matches.routes';

export default (app: Application) => {
  app.use(usersRouter);
  app.use(teamsRouter);
  app.use(matchesRouter);
};
