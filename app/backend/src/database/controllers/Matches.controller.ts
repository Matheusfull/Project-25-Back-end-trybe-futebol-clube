import { Request, Response } from 'express';
// import TokenManager from '../helpers/TokenManager';
import MatchesService from '../services/Matches.service';
// import TeamsService from '../services/Teams.service';

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
    // const { authorization } = req.headers;
    const match = req.body;
    if (match.homeTeam === match.awayTeam) {
      return res.status(422).json({
        message: `It is not possible to create 
      a match with two equal teams` });
    }
    /* const homeTeamValidation = await TeamsService.getById(match.homeTeam);
    const awayTeamValidation = await TeamsService.getById(match.awayTeam);

    if (!homeTeamValidation || !awayTeamValidation) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    } */

    const createMatch = await MatchesService.createMatch(match);
    return res.status(200).json(createMatch);
  };

  public changeMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;

    /* const match = await MatchesService.getById(id);
    if (!match) return res.status(404).json({ message: 'There is no team with such id!' }); */

    await MatchesService.changeProgress(id);
    res.status(200).json({ message: 'Finished' });
  };
}
