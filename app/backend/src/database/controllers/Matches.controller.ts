import { Request, Response } from 'express';
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
}
