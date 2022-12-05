import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import TokenValidate from '../helpers/tokeValidate';

const matchesController = new MatchesController();
const matchesRouter = Router();
// const tokenValidate = new TokenValidate();

matchesRouter.get('/matches', matchesController.getAll);
matchesRouter.post(
  '/matches',
  TokenValidate.validateToken,
  matchesController.createMatcheInProgress,
);
matchesRouter.patch('/matches/:id/finish', matchesController.changeMatchInProgress);

export default matchesRouter;
