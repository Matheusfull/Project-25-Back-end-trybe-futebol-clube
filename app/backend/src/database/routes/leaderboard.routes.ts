// import { Request, Response, Router } from 'express';
import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', leaderboardController.getAll);
leaderboardRouter.get('/leaderboard/away', leaderboardController.getAllAway);

export default leaderboardRouter;
