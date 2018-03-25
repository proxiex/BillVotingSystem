import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import models from '../models';
import Authenticate from '../utils/Authenticate';

const { user, bill, vote } = models;
const { Op } = Sequelize;

/**
 * @description - Class Definition for the User class
 *
 * @export
 *
 * @class User
 *
 * @class Users
 */
class Users {
  /**
   * @description - signup a new user
   *
   * @param {object} request - HTTP requestuest
   *
   * @param {object} response
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  signup(request, response) {
    const {
      firstname,
      lastname,
      email,
      username,
      password

    } = request.body;

    const errors = {};

    user.find({
      where: {
        [Op.or]: [
          { email },
          { username }
        ]
      }
    }).then((foundUser) => {
      if (foundUser) {
        if (foundUser.email === email) {
          errors.email = 'Email is already in use';
        }
        if (foundUser.username === username.trim()) {
          errors.username = 'Username already taken';
        }

        return response.status(409).json({
          errors
        });
      }
      return user
        .create({
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          username: username.trim(),
          email,
          password: bcrypt.hashSync(password, 10)

        }).then((createdUser) => {
          const newUser = {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            role: createdUser.role
          };
          const token = Authenticate.createToken(newUser);

          response.status(201).json({
            message: 'Signup succesfull',
            newUser,
            token
          });
        });
    })
      .catch((err) => {
        console.log('>>>>>>', err);
        response.status(500).json({
          error: 'Something tereble happened :('
        });
      });

    return this;
  }

  /**
   * @description - Login in a user.
   *
   * @param {object} request - HTTP requestuest
   *
   * @param {object} response - HTTP responseponse
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  signin(request, response) {
    const { identifier, password } = request.body;
    user
      .findOne({
        where: {
          [Op.or]: [
            { email: identifier },
            { username: identifier }

          ]
        }
      }).then((found) => {
        if (!found) {
          return response.status(400).json({
            message: 'Incorrect signin credentials!'
          });
        } else if (bcrypt.compareSync(password, found.password)) {
          const userDetials = {
            id: found.id,
            username: found.username,
            email: found.email,
            role: found.role
          };
          const token = Authenticate.createToken(userDetials);
          return response.status(200).json({
            message: 'Loign in Successful!',
            userDetials,
            token
          });
        }
        return response.status(400).json({
          message: 'Incorrect signin credentials!'
        });
      })
      .catch(() => {
        response.status(500).json({
          error: 'Something tereble happened :('
        });
      });

    return this;
  }


  /**
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @returns {boject} this - class instance
   *
   * @memberof Users
   */
  viewAllBills(request, response) {
    let message;

    if (request.query.search) {
      const searchQuery = request.query.search.split(' ');

      const title = searchQuery.map(value => ({
        title: { $iLike: `%${value}%` }
      }));

      const description = searchQuery.map(value => ({
        description: { $iLike: `%${value}%` }
      }));

      bill
        .findAll({
          where: {
            $or:
            title.concat(description)
          },
          order: [
            ['id', 'DESC']
          ]
        }).then((allBills) => {
          if (allBills.length < 1) {
            return response.status(200).json({
              message: 'Sorry no bill matched your search!'
            });
          }
          response.status(200).json({
            allBills
          });
        }).catch(() => {
          response.status(500).json({
            message: 'something terrible happend :('
          });
        });
    } else {
      bill
        .findAll({
          order: [
            ['id', 'DESC']
          ]
        }).then((allBills) => {
          if (allBills.length < 1) {
            message = 'No Bill have yet been created by admin!';
            return response.status(200).json({
              message
            });
          }
          response.status(200).json({
            allBills
          });
        }).catch(() => {
          response.status(500).json({
            message: 'something terrible happend :('
          });
        });
    }

    return this;
  }


  /**
   *
   * @param {object} request
   *
   * @param {boject} response
   *
   * @returns {object} this - class instance.
   *
   * @memberof Users
   */
  voteBill(request, response) {
    const { billId, voteValue } = request.params;
    const { opinion } = request.body;

    const userId = request.decoded.id; // collect user Id from token
    let message;

    let billVoteValue = {
      billId,
      vote: voteValue,
      opinion,
      userId
    };

    bill
      .findById(billId).then((found) => {
        if (!found) {
          return response.status(404).json({
            message: 'Bill not found'
          });
        }

        if (opinion !== '') {
          if (
            found.billProgress === 'House Passed' ||
            found.billProgress === 'Senate Voted'
          ) {
            billVoteValue = {
              billId,
              vote: voteValue,
              userId
            };
            message = 'Your opinon can\'t added, this bill is "House Passed" ';
          }
        }

        vote
          .findOne({
            where: {
              userId
            }
          }).then((foundRecord) => {
            if (foundRecord) {
              foundRecord
                .update(billVoteValue, {
                  where: {
                    userId
                  }
                }).then((billVotes) => {
                  message += ' Your vote has been updated!';
                  response.status(200).json({
                    billVotes,
                    message
                  });
                });
            } else {
              vote
                .create(billVoteValue).then((billVotes) => {
                  message = ' Your vote has been recoreded.';
                  response.status(201).json({
                    billVotes,
                    message
                  });
                });
            }
          });
      });
    return this;
  }


  /**
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @returns {object} this - class instance
   *
   * @memberof Users
   */
  viewVotedBills(request, response) {
    const userId = 1;
    bill
      .findAll({
        include: [
          {
            model: vote,
            where: {
              userId
            }
          }
        ]
      }).then((allVotedBills) => {
        response.status(200).json({
          allVotedBills
        });
      });
    return this;
  }
}
export default Users;
