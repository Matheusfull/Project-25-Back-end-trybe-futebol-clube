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
        email: 'admin@admin.com', password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      },
    )

    expect(response.status).to.be.equal(200);
    expect(response.body.token).to.be.string;
  });


  it('Acesso negado, caso não haja email', async () => {
    const response = await chai.request(app).post('/login').send(
      {
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      },
    )

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.equal('message : All fields must be filled')
  });
});

/* describe('testes de times', () => {
  it('Trazendo todos os times', async () => {
    const response = await chai.request(app).post('/teams').send({
      id : 1
    })

    const times = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      {
        "id": 6,
        "teamName": "Ferroviária"
      },
      {
        "id": 7,
        "teamName": "Flamengo"
      },
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      },
      {
        "id": 10,
        "teamName": "Minas Brasília"
      },
      {
        "id": 11,
        "teamName": "Napoli-SC"
      },
      {
        "id": 12,
        "teamName": "Palmeiras"
      },
      {
        "id": 13,
        "teamName": "Real Brasília"
      },
      {
        "id": 14,
        "teamName": "Santos"
      },
      {
        "id": 15,
        "teamName": "São José-SP"
      },
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ]

    // expect(response.status).to.be.equal(200);
    expect(response).to.be.equal(times[0]);
  })

}) */
