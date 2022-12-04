import { Request, Response } from 'express';
import TokenManager from '../helpers/TokenManager';
import MatchesService from '../services/Matches.service';

export default class matchesController {
  // constructor(private matchesService = new MatchesService()) { }
  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    //  if (inProgress === 'true' || inProgress === 'false') {
    // const matchesFilter = matches.filter((match) => match.inProgress = inProgress);
    // const matchInProgress = await MatchesService.getAllInProgress(inProgress);
    // return res.status(200).json(matchInProgress);
    // }
    if (inProgress === 'true') {
      const matchInProgress = await MatchesService.getAllInProgress(true);
      return res.status(200).json(matchInProgress);
    }
    if (inProgress === 'false') {
      const matchInProgress = await MatchesService.getAllInProgress(false);
      return res.status(200).json(matchInProgress);
    }

    const matches = await MatchesService.getAll();

    return res.status(200).json(matches);
  };

  public createMatcheInProgress = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const match = req.body;
    if (typeof authorization === 'string') {
      const role = await TokenManager.loginValidation(authorization);
      if (!role) {
        res.status(401).json({ message: 'Invalid Token' });
      }
      const createMatch = await MatchesService.createMatch(match);
      res.status(200).json(createMatch);
    }
  };
}
