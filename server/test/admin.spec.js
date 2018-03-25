import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import fakeData from './helper/fakeData';
import { token } from './user.spec';
import db from '../src/models';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

export let billId;
let adminToken;

 describe('Bill Votting System ::: Admin', () => {
   
  before((done) => {
    chai.request(app)
      .post('/api/v1/signin')
      .send(fakeData.admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });

   describe('Create bill', () => {
    it('should not allow unauthorized user create a bill', (done) => {
      chai.request(app)
      .post('/api/v1/bill/create')
      .send(fakeData.noBill)
      .set('token', token)

      .end((err, res) => {
        const message = 'Your not Authorized to access this page!';
        expect(res.status).to.equal(401);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should not allow user create a bill with no data', (done) => {
      chai.request(app)
      .post('/api/v1/bill/create')
      .send(fakeData.noBill)
      .set('token', adminToken)
      .end((err, res) => {
        const message = {
          "title": [
            "The title field is required."
          ],
          "description": [
              "The description field is required."
          ]
        };
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should  allow user create a bill', (done) => {
      chai.request(app)
      .post('/api/v1/bill/create')
      .send(fakeData.bill)
      .set('token', adminToken)
      .end((err, res) => {
        const message = 'Bill created sucessfully';
        expect(res.status).to.equal(201);
        expect(res.body).to.haveOwnProperty('newBill').to.not.be.null;
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

   });

   describe('Edit bill', (done) => {
    it('should  allow user throw an error if bill id is not valid', () => {
      chai.request(app)
      .patch('/api/v1/bill/edit/ok')
      .send(fakeData.bill)
      .set('token', adminToken)
      .end((err, res) => {
        const message = 'Parameter must be a number!';
        expect(res.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should throw an error if bill does not exisits.', (done) => {
      chai.request(app)
      .patch('/api/v1/bill/edit/3000')
      .send(fakeData.bill)
      .set('token', adminToken)
      .end((err, res) => {
        const message = 'Bill not found!';
        expect(res.status).to.equal(404);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

    it('should  allow user edit bill', (done) => {
      chai.request(app)
      .patch('/api/v1/bill/edit/3')
      .send(fakeData.editBill)
      .set('token', adminToken)
      .end((err, res) => {
        const message = 'Bill updated sucessfully';
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });




   });
   
   describe('Delete Bill', () => {
      
    it('should delete bill with no errors', (done) => {
      chai.request(app)
      .delete('/api/v1/bill/delete/3')
      .set('token', adminToken)
      .end((err, res) => {
        const message = 'Bill has been deleted sucessfully!';
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty('message').to.eql(message);
        done();
      });
    });

      it('should thro errors if bill not found', (done) => {
        chai.request(app)
        .delete('/api/v1/bill/delete/3')
        .set('token', adminToken)
        .end((err, res) => {
          const message = 'Bill not found!';
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message').to.eql(message);
          done();
        });
      });

   });
   
   
 });