import Teams from '../models/TeamsModel';
import Matches from '../models/MatchesModel';

export default class LeadboardService {
// 1 - partidas para o mesmo time
  static async getAllMatches() {
    const allTeams = await Teams.findAll();
    const allMatches = await Matches.scope('homeLeaderboard').findAll();

    return allTeams.map(({ id }) => allMatches.filter(({ homeTeam }) => homeTeam === id));
  }

  // 2 - para ver a quantidade de resultados
  static async getResults(result: string) {
    const matches = await LeadboardService.getAllMatches();

    if (result === 'win') {
      return matches.map((match) => match
        .filter(({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals > awayTeamGoals).length);
    }

    if (result === 'loss') {
      return matches.map((match) => match
        .filter(({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals < awayTeamGoals).length);
    }

    return matches.map((match) => match
      .filter(({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals === awayTeamGoals).length);
  }

  // 3 - soma os gols tomados
  static async getGoalsOwn() {
    const matches = await LeadboardService.getAllMatches();

    return matches.map((match) => {
      const allGoalsOwn = match.map(({ awayTeamGoals }) => awayTeamGoals);

      return allGoalsOwn.reduce((acc, curr) => acc + curr, 0);
    });
  }

  // 4 - soma os gols levados
  static async getGoalsFavor() {
    const matches = await LeadboardService.getAllMatches();

    return matches.map((match) => {
      const allGoalsFavor = match.map(({ homeTeamGoals }) => homeTeamGoals);

      return allGoalsFavor.reduce((acc, curr) => acc + curr, 0);
    });
  }

  static async getTotalPoints() {
    const draws = await LeadboardService.getResults('draw');
    const victories = await LeadboardService.getResults('win');

    return victories.map((win, index) => win * 3 + draws[index]);
  }

  static async getTotalGames() {
    const matches = await LeadboardService.getAllMatches();

    return matches.map((match) => match.length);
  }

  static async getEfficiency() {
    const points = await LeadboardService.getTotalPoints();
    const totalGames = await LeadboardService.getTotalGames();
    // console.log(points);
    return points.map((point, index) => point / ((totalGames[index] * 3) * 0.01));
  }

  static async getGoalsBalance() {
    const allGoalsOwn = await LeadboardService.getGoalsOwn();
    const allGoalsFavor = await LeadboardService.getGoalsFavor();

    return allGoalsFavor.map((goal, index) => goal - allGoalsOwn[index]);
  }

  static async getLeaderboardHome() {
    const allTeams = await Teams.findAll();
    const leaderboardHome = await Promise.all(
      allTeams.map(async (team, index) => ({
        name: team.teamName,
        totalPoints: Object.values(await LeadboardService.getTotalPoints())[index],
        totalGames: Object.values(await LeadboardService.getTotalGames())[index],
        totalVictories: Object.values(await LeadboardService.getResults('win'))[index],
        totalDraws: Object.values(await LeadboardService.getResults('draw'))[index],
        totalLosses: Object.values(await LeadboardService.getResults('loss'))[index],
        goalsFavor: Object.values(await LeadboardService.getGoalsFavor())[index],
        goalsOwn: Object.values(await LeadboardService.getGoalsOwn())[index],
        goalsBalance: Object.values(await LeadboardService.getGoalsBalance())[index],
        efficiency: Object.values(await LeadboardService.getEfficiency())[index].toFixed(2),
      })),
    );

    return leaderboardHome;
  }
}
