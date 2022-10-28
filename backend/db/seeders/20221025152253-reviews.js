'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'This place was bad',
        stars: 1,
      }, {
        spotId: 2,
        userId: 2,
        review: 'This place was okay',
        stars: 2,
      } , {
        spotId: 3,
        userId: 3,
        review: 'This place was alright',
        stars: 3,
      }, {
        spotId: 4,
        userId: 4,
        review: 'This place was good',
        stars: 4,
      }, {
        spotId: 5,
        userId: 5,
        review: 'This place was great',
        stars: 5,
      }
     ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews',  {
      spotId: [1,2,3,4,5]
     });
  }
};