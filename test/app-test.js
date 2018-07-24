const knex = require('../db/knex');
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const fixtures = require('./fixtures');

describe('CRUD Stickers', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => done())
      .catch(err => {
        console.error(err);
        process.exit(1);
    });

  });
  it('List all records',(done) => {
      request(app)
        .get('/api/v1/stickers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
          .then((response) => {
            expect(response.body).to.be.a('array');
            expect(response.body).to.deep.equal(fixtures.stickers);
            console.log(response.body);
            done();
        });
  });
  it('Lists a record by id',(done) => {
      request(app)
        .get('/api/v1/stickers/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
          .then((response) => {
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal(fixtures.stickers[0]);
            console.log(response.body);
            done();
        });
  });
  it('Create a record',(done) => {
      request(app)
        .post('/api/v1/stickers')
        .send(fixtures.sticker)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
          fixtures.sticker.id = response.body.id;
          expect(response.body).to.deep.equal(fixtures.sticker);
          done();

        });
  });
  // it('Update a record',(done) => {
  //     request(app)
  //       .put('/api/v1/stickers/12')
  //       .send(fixtures.sticker)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).to.be.a('object');
  //         fixtures.sticker.id = response.body.id;
  //         expect(response.body).to.deep.equal(fixtures.sticker);
  //         done();
  //
  //       });
  // });
  it('Delete a record',(done) => {
      request(app)
        .delete('/api/v1/stickers/12')
        .send(fixtures.sticker)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body).to.deep.equal({
            deleted: true
          });
          done();

        });
  });
});
