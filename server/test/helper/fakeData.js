import faker from 'faker';

const fakeData = {
  admin: {
    identifier: 'Admin',
    password: 'password'
  },
  newUsers: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '11110000',
  },

  noFirstNameUsers: {
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.name.findName(),
    password: '11110000',
    
  },

  noLastNameUsers: {
    firstName: faker.name.firstName(),
    email: faker.internet.email(),
    username: faker.name.findName(),
    password: '11110000',
    
  },

  noEmailUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: '11110000',
    
  },

  noPasswordUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    
  },
  lessPass: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '111',
    
  },
  noUsernameUsers: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '11110000',
    
  },
  bill: {
    title: 'No law',
    description: 'This is a now low zone'
  },
  billErr: {
    title: 'o',
    description: 'o'
  },
  noBill: {

  },
  editBill: {
    title: 'Edited bill',
    description: 'This is what we wanted to change it to',
    billProgress: 'Senate Voted'
  }
  
};

export default fakeData;