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

interface IChange {
  homeTeamGoals: number | string,
  awayTeamGoals: number | string,
}

export default class MatchesService {
  // public model = MatchesModel;

  public static async getAll() {
    const response = await MatchesModel.findAll({
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return response;
  }

  public static async getAllInProgress(inProgress: boolean) {
    const matchesInProgress = await MatchesModel.findAll({
      where: { inProgress },
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matchesInProgress;
  }

  public static async createMatch(match: IMatch) {
    const createNewMatch = await MatchesModel.create({
      homeTeam: match.homeTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeam: match.awayTeam,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    return createNewMatch;
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

  public static async changeMatchInProgress(id : number | string, change: IChange) {
    const changeMatchInProgress = await MatchesModel.update(
      { homeTeamGoals: change.homeTeamGoals,
        awayTeamGoals: change.awayTeamGoals },
      { where: { id } },
    );
    return changeMatchInProgress;
  }
}
