import { RequestHandler } from 'express';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardAwayService from '../services/LeaderboardAway.service';

export default class UserController {
  // constructor(private service = new LeaderboardService()) { }

  public getAll:RequestHandler = async (_req, res) => {
    const response = await LeaderboardService.orderList();
    return res.status(200).json(response);
  };

  public getAllAway:RequestHandler = async (_req, res) => {
    const response = await LeaderboardAwayService.orderList();
    return res.status(200).json(response);
  };
}
