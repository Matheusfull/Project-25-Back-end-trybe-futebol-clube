import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import Matches from './MatchesModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/* Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'matchesHome' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'matchesAway' }); */

export default Teams;
