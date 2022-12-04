import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/matches', matchesController.getAll);
matchesRouter.post('/matches', matchesController.createMatcheInProgress);

export default matchesRouter;
