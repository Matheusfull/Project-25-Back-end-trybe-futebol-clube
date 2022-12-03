import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class matchesController {
  constructor(private matchesService = new MatchesService()) { }
  public getAll = async (req: Request, res: Response) => {
    const matches = await MatchesService.getAll();

    return res.status(200).json(matches);
  };
}
