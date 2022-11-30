/* import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  public getAll = async () => {
    const teams = await TeamsModel.findAll();

    return teams;
  };
}
 */

import TeamsModel from '../models/TeamsModel';

interface ITeam {
  id?: number;
  teamName: string;
}

/* interface IMatches {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: number | boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
} */
// import IMatches from '../interfaces/IMatches';

export default class TeamsService {
  public model = TeamsModel;

  public async getAll(): Promise<ITeam[]> {
    const response = await this.model.findAll();
    // console.log(response);
    return response;
  }

  public async getById(id: string | number): Promise<ITeam> {
    const team = await this.model.findByPk(id);
    // console.log(team);
    return team as ITeam;
  }
}
