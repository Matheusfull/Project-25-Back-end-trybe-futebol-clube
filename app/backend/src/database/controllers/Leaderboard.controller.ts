import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getLeaderboardHome(req: Request, res: Response) {
    const matches = await LeaderboardService.getLeaderboardHome();

    const matchesSorted = matches.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    res.status(200).json(matchesSorted);
  }
}
