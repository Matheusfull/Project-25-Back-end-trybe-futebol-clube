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

  public static async changeProgress(id: number | string) {
    // const { homeTeam } = await MatchesModel.findByPk(id); tentando pegar tudo do match e só mudar o inProgress
    const updateMatchInProgress = await MatchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return updateMatchInProgress;
  }

  public static async getById(id: number | string) {
    const match = await MatchesModel.findByPk(id);
    return match;
  }
}
