'use strict';
const bcrypt = require("bcryptjs");

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code
//review file has the old way

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
      return queryInterface.bulkInsert(options, [ //they return instead of await
        {
          firstName: 'demoFirst',
          lastName: 'demoLast',
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password')
      } , {
        firstName: 'user2First',
        lastName: 'user2Last',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },{
      firstName: 'user3First',
      lastName: 'user3Last',
      email: 'user3@user.io',
      username: 'FakeUser3',
      hashedPassword: bcrypt.hashSync('password3')
    } , {
      firstName: 'user4First',
      lastName: 'user4Last',
      email: 'user4@user.io',
      username: 'FakeUser4',
      hashedPassword: bcrypt.hashSync('password4')
    },{
      firstName: 'user5First',
      lastName: 'user5Last',
      email: 'user5@user.io',
      username: 'FakeUser5',
      hashedPassword: bcrypt.hashSync('password5')
    }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
      return queryInterface.bulkDelete(options
      //  {username: ['Demo-lition', 'FakeUser2','FakeUser3', 'FakeUser4', 'FakeUser5'  ]} //this line was removed
      );
  }
};
