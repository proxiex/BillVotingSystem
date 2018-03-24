

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('bills', [{
      title: 'Test bill',
      description: 'This is a test bill nothing more!',
      billProgress: 'House Passed',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Test bill 2',
      description: 'This is a test bill nothing more!',
      billProgress: 'Not enacted',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Test bill 3',
      description: 'This is a test bill nothing more!',
      billProgress: 'Not enacted',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('bills', null, {})
};
