import { Router } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamsController = new TeamsController();
const teamsRouter = Router();

teamsRouter.get('/teams', teamsController.getAll);
teamsRouter.get('/teams/:id', teamsController.getById);

export default teamsRouter;
