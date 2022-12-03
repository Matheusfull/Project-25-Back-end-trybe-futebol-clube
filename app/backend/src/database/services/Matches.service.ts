import MatchesModel from '../models/MatchesModel';
// import TeamsModel from '../models/TeamsModel';

/* interface ITeam {
  id?: number;
  teamName: string;
} */

/* interface IMatches {
  id: number,
  homeTeam: number,
  homeTeamGoals:number,
  awayTeam:number,
  awayTeamGoals:number,
  inProgress: boolean,
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  },
} */

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
}
