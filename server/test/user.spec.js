import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import fakeData from './helper/fakeData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

export let token;
export let billId;

describe('Bill Votting System ::: User', () => {

  describe('Signup ', ()=> {
    it('should not allow user signup with no email.', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(fakeData.noEmailUsers)
        .end((err, res) => {
          const message = {
            "email": [
                "The email field is required."
            ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not allow user signup with no username.', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(fakeData.noUsernameUsers)
        .end((err, res) => {
          const message = {
            "username": [
              "The username field is required."
          ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should not allow user signup with no password.', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(fakeData.noPasswordUsers)
        .end((err, res) => {
          const message = {
            "password": [
              "The password field is required."
          ]
          };
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
    });

    it('should allow user signup with no errors.', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(fakeData.newUsers)
        .end((err, res) => {
          const message = 'Signup succesfull';
          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          expect(res.body).to.haveOwnProperty('token').to.not.be.null;
          expect(res.body).to.haveOwnProperty('newUser').to.not.be.null;
          done();
        });
    });

    it('should not allow user signup with same email or username twice.', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(fakeData.newUsers)
        .end((err, res) => {
          const message = 'Signup succesfull';
          expect(res.status).to.equal(409);
          expect(res.body).to.haveOwnProperty('errors').to.not.be.null;
          done();
        });
    });

  });

  describe('Signin', () => {
    it('should not let user sigin with no password', (done) => {
      const user = {
        identifier: fakeData.newUsers.email,
      }
      chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        const message = {
          "password": [
            "The password field is required."
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should not let user sigin with no identifier', (done) => {
      const user = {
        password: 'fakeData.newUsers.password'
      }
      chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        const message = {
          "identifier": [
            "The identifier field is required."
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should not let user sigin with wrong credentials', (done) => {
      const user = {
        identifier: fakeData.newUsers.email,
        password: 'fakeData.newUsers.password'
      }
      chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        const message = 'Incorrect signin credentials!';
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should not let user sigin with wrong credentials', (done) => {
      const user = {
        identifier: 'fakeData.newUsers.email',
        password: 'fakeData.newUsers.password'
      }
      chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        const message = 'Incorrect signin credentials!';
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should let user sigin with no errors', (done) => {
      const user = {
        identifier: fakeData.newUsers.email,
        password: fakeData.newUsers.password
      };
      chai.request(app)
      .post('/api/v1/signin')
      .send(user)
      .end((err, res) => {
        const message = 'Loign in Successful!';
        token = res.body.token;
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        expect(res.body).to.haveOwnProperty('token').to.not.be.null;
        expect(res.body).to.haveOwnProperty('userDetials').to.not.be.null;
        done();
      });
    });

  });

  describe('Bills', () => {
    it('should not allow user access with out token', (done) => {
      chai.request(app)
      .get('/api/v1/bills/votes')
      .end((err, res) => {
        const message = 'Unauthorised User! Please provide a valid token';
        expect(res.status).to.equal(401);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should not allow user access with out a valid token', (done) => {
      chai.request(app)
      .get('/api/v1/bills/votes')
      .set('token', 'some random stuff')
      .end((err, res) => {
        const message = 'Token could not be authenticated';
        expect(res.status).to.equal(401);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should throw an error if vote value is not valid', (done) => {
      chai.request(app)
      .post('/api/v1/bill/vote/2/ok')
      .set('token', token)
      .end((err, res) => {
        const message = 'Invalid vote value,  must be [ For or Against ]';
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should throw error if bill not found.', (done) => {
      chai.request(app)
      .post('/api/v1/bill/vote/200000000/For')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        const message = 'Bill not found';
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should allow user vote for a bill.', (done) => {
      chai.request(app)
      .post('/api/v1/bill/vote/2/For')
      .set('token', token)
      .end((err, res) => {
        console.log('Errr >>>', err)
        expect(res.status).to.equal(201);
        expect(res.body).to.haveOwnProperty('message').to.not.be.null;
        done();
      });
    });

    it('should allow user vote for a bill and add an opinion.', (done) => {
      chai.request(app)
      .post('/api/v1/bill/vote/2/For')
      .send({opinion: 'I do not like this bill'})
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.not.be.null;
        done();
      });
    });

    it('should not allow user add an opinion to bill already passed by hoiuse', (done) => {
      chai.request(app)
      .post('/api/v1/bill/vote/1/For')
      .send({opinion: 'I do not like this bill'})
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.not.be.null;
        done();
      });
    });

    it('should allow user view bill they have voted for', (done) => {
      chai.request(app)
      .get('/api/v1/bills/votes')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('allVotedBills').to.not.be.null;
        done();
      });
    });

    it('should allow user view all bills', (done) => {
      chai.request(app)
      .get('/api/v1/bills')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('allBills').to.not.be.null;
        done();
      });
    });

    it('should tell user if search not found tell your', (done) => {
      chai.request(app)
      .get('/api/v1/bills?search=nothig+yet')
      .set('token', token)
      .end((err, res) => {
        const message = 'Sorry no bill matched your search!';
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });


    it('should return search result', (done) => {
      chai.request(app)
      .get('/api/v1/bills?search=test')
      .set('token', token)
      .end((err, res) => {
        const message = 'Sorry no bill matched your search!';
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('allBills').to.not.be.null;
        done();
      });
    });


    

  });
  
});
