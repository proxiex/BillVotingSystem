import Validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Validate {
  /**
   *
   * @param {request} request
   *
   * @param {response} response
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Validate
   */
  static billId(request, response, next) {
    const { billId } = request.params;

    if (isNaN(billId)) {
      return response.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }
  /**
   *
   * @static
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code.
   *
   * @memberof Validate
   */
  static voteValue(request, response, next) {
    const { voteValue } = request.params;

    if (voteValue === 'For' || voteValue === 'Against') {
      return next();
    }
    return response.status(400).json({
      message: 'Invalid vote value,  must be [ For or Against ]'
    });
  }

  /**
   *
   * @static
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
   */
  static signup(request, response, next) {
    const {
      firstname,
      lastname,
      email,
      username,
      password

    } = request.body;

    const userData = {
      firstname,
      lastname,
      email,
      username,
      password
    };

    const userDataRules = {
      email: 'required|string|email',
      password: 'required|min:6',
      username: 'required|string|min:5',
      firstName: 'string|alpha|min:2',
      lastName: 'string|alpha|min:2'
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400)
        .json({ message: errors });
    }
  }
  /**
   *
   * @static
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
   */
  static signin(request, response, next) {
    const {
      identifier,
      password
    } = request.body;

    const userData = {
      identifier,
      password
    };

    const userDataRules = {
      identifier: 'required|string',
      password: 'required|min:6',
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400)
        .json({ message: errors });
    }
  }
  /**
   *
   *
   * @static
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {unctionf} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
  */
  static createBill(request, response, next) {
    const { title, description } = request.body;

    const billData = { title, description };

    const billDataRules = {
      title: 'required|string|min:6',
      description: 'required|string|min:6'
    };

    const validation = new Validator(billData, billDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400)
        .json({ message: errors });
    }
  }
}

export default Validate;

