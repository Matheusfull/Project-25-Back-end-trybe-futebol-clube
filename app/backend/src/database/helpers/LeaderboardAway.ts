interface IMatches {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamAway:{
    teamName: string,
  }
}

export default class Leaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number | string;

  constructor() {
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  resultado(time: IMatches[]) {
    time.forEach((el) => {
      if (el.homeTeamGoals < el.awayTeamGoals) {
        this.totalVictories += 1;
        this.totalPoints += 3;
      }
      if (el.homeTeamGoals > el.awayTeamGoals) {
        this.totalLosses += 1;
      }
      if (el.homeTeamGoals === el.awayTeamGoals) {
        this.totalDraws += 1;
        this.totalPoints += 1;
      }
    });
  }

  totalJogo(time: IMatches[]) {
    this.totalGames = time.length;
  }

  Aproveitamento() {
    this.efficiency = Number(((this.totalPoints) / ((this.totalGames) * 3)) * 100).toFixed(2);
  }

  saldo(time: IMatches[]) {
    time.forEach((el) => {
      this.goalsFavor += el.awayTeamGoals;
      this.goalsOwn += el.homeTeamGoals;
    });
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.Aproveitamento();
  }

  nome(time: IMatches[]) {
    this.name = time[0].teamAway.teamName;
  }

  resultadoFinal() {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
