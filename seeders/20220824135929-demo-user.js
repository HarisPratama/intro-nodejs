'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
		 */
	 	await queryInterface.bulkInsert('Users', [
			{
				name: 'John Doe',
				email: 'a@mail.com',
				password: '123456',
				createdAt: new Date(),
				updatedAt: new Date(),
	  	},
			{
				name: 'Johny Doe',
				email: 'b@mail.com',
				password: '123456',
				createdAt: new Date(),
				updatedAt: new Date(),
	  	}
	], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
		await queryInterface.bulkDelete('Users', null, {});
	}
};
