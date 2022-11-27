import { Sequelize } from 'sequelize';
import * as config from '../config/database';

const sequelize = new Sequelize(config)

export default sequelize;

/* 
const config = require(__dirname + '/../config/config.json')[env]; // configuração antiga
const config = require(__dirname + '/../config/config.js')[env];   // configuração nova
Antes era aquele arquivo gigante em JS, agora em TS é só fazer isso. Antes fazia todo o mapeamento das models, gerenciamento. Aqui só vai exportar instanciado o sequelize com as configurações do banco.
*/