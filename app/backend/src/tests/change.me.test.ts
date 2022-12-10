import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de User e Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Token retornado com dados válidos', async () => {
    const response = await chai.request(app).post('/login').send(
      {
        email: 'admin@admin.com', password: 'secret_admin',
      },
    )

    expect(response.status).to.be.equal(200);
    expect(response.body.token).to.be.string;
  });


  it('Acesso negado, caso não haja email', async () => {
    const response = await chai.request(app).post('/login').send(
      {
        password: 'secret_admin',
      },
    )

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Acesso negado, caso não haja senha', async () => {
    const response = await chai.request(app).post('/login').send(
      {
        email: 'admin@admin.com',
      },
    )

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Acesso negado, caso email esteja errado', async () => {
    const response = await chai.request(app).post('/login').send(
      {
        email: 'erro@admin.com', password: 'secret_admin',
      },
    )

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('Acesso negado, caso password esteja errado', async () => {
    const response = await chai.request(app).post('/login').send(
      {
        email: 'admin@admin.com', password: 'erro',
      },
    )

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Incorrect email or password' })
  });

  it('valid token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NzA0MjY0MjksImV4cCI6MTY3MTcyMjQyOX0.6LmndMJ0Up-OR8KYRj4lhAuZdoosBSwimzTFloIb7qA';

    const response = await chai.request(app).get('/login/validate').set({
      'authorization': token,
    });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ role: 'admin' })
  });

});

describe('testes de Times', () => {
  it('Trazendo todos os times', async () => {
    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200);
    // expect(response.body).to.deep.equal(times);
  })

  it('Trazendo o time pelo seu id', async () => {
    const response = await chai.request(app).get('/teams/1')

    expect(response.status).to.be.equal(200);
    // expect(response.body).to.deep.equal(times[0]);
  })

})

describe('testes de Matches', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NzA0MjY0MjksImV4cCI6MTY3MTcyMjQyOX0.6LmndMJ0Up-OR8KYRj4lhAuZdoosBSwimzTFloIb7qA';

  it('Trazendo todos os dados de partidas sem nenhum filtro', async () => {
    const response = await chai.request(app).get('/matches')

    expect(response.status).to.be.equal(200);
  })

  it('filtrando as partidas em andamento', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true')

    expect(response.status).to.be.equal(200);
  })

  it('filtrando as partidas finalizadas', async () => {
    const response = await chai.request(app).get('/matches?inProgress=false')

    expect(response.status).to.be.equal(200);
  })

  it('salvando uma partida com o status de inProgress como true no banco de dados', async () => {
    const response = await chai.request(app).post('/matches').set({ 'authorization': token }).send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })

    expect(response.status).to.be.equal(201);
  })

  it('alterando o status inProgress de uma partida para false no banco de dados', async () => {
    const response = await chai.request(app).patch('/matches/48/finish')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' })
  })

  it('não é possível inserir uma partida com times iguais', async () => {
    const response = await chai.request(app).post('/matches').set({ 'authorization': token }).send({
      "homeTeam": 10,
      "awayTeam": 10,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })

    expect(response.status).to.be.equal(422);
    expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  })

  it('não é possível inserir uma partida com um time que não existe na tabela teams', async () => {
    const response = await chai.request(app).post('/matches').set({ 'authorization': token }).send({
      "homeTeam": 100,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })

    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: 'There is no team with such id!' });
  })

  it('salvando uma partida com o status de inProgress com token inválido', async () => {
    const response = await chai.request(app).post('/matches').set({ 'authorization': '.' }).send({
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
  })

  it('é possível atualizar partidas em andamento', async () => {
    const response = await chai.request(app).patch('/matches/48').set({ 'authorization': token }).send({
      "homeTeamGoals": 20,
      "awayTeamGoals": 20,
    })

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ message: 'Placares alterados' });
  })

})

describe('testes de Leaderboard', () => {
  it('Teste da rota leaderboard/home', async () => {
    const response = await chai.request(app).get('/leaderboard/home')

    expect(response.status).to.be.equal(200);
  })

  it('Teste da rota leaderboard/away', async () => {
    const response = await chai.request(app).get('/leaderboard/away')

    expect(response.status).to.be.equal(200);
  })
})

