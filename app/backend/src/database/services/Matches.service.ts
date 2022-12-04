import MatchesModel from '../models/MatchesModel';
// import TeamsModel from '../models/TeamsModel';

/* interface ITeam {
  id?: number;
  teamName: string;
} */

interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default class MatchesService {
  public model = MatchesModel;

  public static async getAll() {
    const response = await MatchesModel.findAll({
      include: [
        { association: 'teamsHome', attributes: ['teamName'] },
        { association: 'teamsAway', attributes: ['teamName'] },
      ],
    });
    return response;
  }

  public static async getAllInProgress(inProgress: boolean) {
    const matcheinProgress = await MatchesModel.findAll({
      where: { inProgress },
      include: [
        { association: 'teamsHome', attributes: ['teamName'] },
        { association: 'teamsAway', attributes: ['teamName'] },
      ],
    });
    return matcheinProgress;
  }

  public static async createMatch(match: IMatch) {
    const createNewMatche = await MatchesModel.create({
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    return createNewMatche;
  }
}
