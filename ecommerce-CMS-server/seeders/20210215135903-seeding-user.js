'use strict';

const { hashPassword } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: hashPassword('admin'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user@mail.com',
      password: hashPassword('user'),
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {})
  }
};
