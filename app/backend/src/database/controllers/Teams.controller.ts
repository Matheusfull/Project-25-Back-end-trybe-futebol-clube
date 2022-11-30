/* import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

const teamsService = new TeamsService();

export default class UserController {
  public getall = async (req: Request, res: Response) => {
    const teams = await teamsService.getAll();
    console.log(teams);
    return res.status(200).json(teams);
  };
} */

import { RequestHandler } from 'express';
import TeamsService from '../services/Teams.service';

export default class UserController {
  constructor(private service = new TeamsService()) { }

  public getAll:RequestHandler = async (_req, res) => {
    const response = await this.service.getAll();
    return res.status(200).json(response);
  };

  public getById:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.getById(id);
    return res.status(200).json(response);
  };
}
