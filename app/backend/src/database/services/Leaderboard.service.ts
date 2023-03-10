import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import Leaderboard from '../helpers/Leardboard';

export default class MatchesService {
  public static async getAllInProgress() {
    const finishedMatch = await MatchesModel.findAll({
      where: { inProgress: false },
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
      ],
    });
    const timesID = (await TeamsModel.findAll()).map((el) => el.id);
    const list = timesID.map((el) => finishedMatch.map((match) => match.dataValues)
      .filter((match) => match.homeTeam === Number(el)));
    const leaderboardList = list.map((el) => {
      const leaderboard = new Leaderboard();
      leaderboard.resultado(el);
      leaderboard.totalJogo(el);
      leaderboard.saldo(el);
      leaderboard.nome(el);
      return leaderboard.resultadoFinal();
    });
    return leaderboardList;
  }

  public static async orderList() {
    const order = await this.getAllInProgress();
    const orderSort = [...order].sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return orderSort;
  }
}
