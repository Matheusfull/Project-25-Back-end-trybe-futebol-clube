import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

// const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', LeaderboardController.getLeaderboardHome);

export default leaderboardRouter;
