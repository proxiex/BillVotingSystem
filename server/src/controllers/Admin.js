import models from '../models';

const { bill } = models;

/**
 * @description - Class defination for Admin class
 *
 * @class Admin
 */
class Admin {
  /**
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @returns {object} this - class instance
   *
   * @memberof Admin
   */
  createBill(request, response) {
    const { title, description } = request.body;

    bill
      .create({
        title,
        description,
        billProgress: 'Not enacted'
      }).then((newBill) => {
        response.status(201).json({
          message: 'Bill created sucessfully',
          newBill
        });
      })
      .catch((err) => {
        response.status(500).json({
          message: 'something terrible happend :(',
          error: err.message
        });
      });
    return this;
  }


  /**
   *
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @returns {object} this - class instance
   *
   * @memberof Admin
   */
  editBill(request, response) {
    const { billId } = request.params;
    const { title, description, billProgress } = request.body;
    const updateFields = {};
    bill
      .findById(billId).then((foundBill) => {
        if (!foundBill) {
          return response.status(404).json({
            message: 'Bill not found!'
          });
        }

        if (title) {
          updateFields.title = title;
        }

        if (description) {
          updateFields.description = description;
        }

        if (billProgress) {
          updateFields.billProgress = billProgress;
        }

        foundBill.update(
          updateFields,
          {
            where: {
              id: billId
            }
          }
        ).then((updatedBill) => {
          response.status(200).json({
            message: 'Bill updated sucessfully',
            updatedBill
          });
        });
      }).catch(() => {
        response.status(500).json({
          message: 'Some thing terrible happend :('
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
   * @memberof Admin
   */
  deleteBill(request, response) {
    const { billId } = request.params;
    bill
      .findById(billId).then((foundBill) => {
        if (!foundBill) {
          return response.status(404).json({
            message: 'Bill not found!'
          });
        }

        bill
          .destroy({
            where: {
              id: billId
            }
          }).then(() => {
            response.status(200).json({
              message: 'Bill has been deleted sucessfully!'
            });
          });
      }).catch(() => {
        response.status(500).json({
          message: 'something terrible happend :('
        });
      });
    return this;
  }

  // Admin should be able to get the stat of bills voted for by the eipl
}

export default Admin;
