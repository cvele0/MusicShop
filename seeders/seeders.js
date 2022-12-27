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

      await queryInterface.bulkInsert('Employees', [
        {
          id: 1,
          name: "Marko",
          surname: "Markovic",
          shopID: 2
        },{
          id: 2,
          name: "Pero",
          surname: "Peric",
          shopID: 3
        },{
          id: 3,
          name: "Ana",
          surname: "Simic",
          shopID: 4
        },{
          id: 4,
          name: "Vladan",
          surname: "Cvjetkovic",
          shopID: 1
        },{
          id: 5,
          name: "Zarko",
          surname: "Radenkovic",
          shopID: 5
        }
    ], {});

    await queryInterface.bulkInsert('Shops', [
      {
        id: 1,
        name: "Flaute",
        location: "Bulevar Djindjica"
      },{
        id: 2,
        name: "Gitare",
        location: "Vidovdanska"
      },
      {
        id: 3,
        name: "Bubnjevi",
        location: "Kasperova"
      },
      {
        id: 4,
        name: "Violine",
        location: "Cosiceva"
      },
      {
        id: 5,
        name: "Klaviri",
        location: "Andriceva"
      }
  ], {});

  await queryInterface.bulkInsert('Departments', [
    {
      id: 1,
      type: "Elektricne",
      shopID: 2
    },{
      id: 2,
      type: "Cinele",
      shopID: 3
    },
    {
      id: 3,
      type: "Klasicne",
      shopID: 4
    },
    {
      id: 4,
      type: "Akusticne",
      shopID: 2
    },
    {
      id: 5,
      type: "Elektricni",
      shopID: 5
    },
], {});

await queryInterface.bulkInsert('Instruments', [
  {
    id: 1,
    name: "Gibson SG",
    brand: "Gibson",
    manufacturerID: 1,
    shopID: 2
  },{
    id: 2,
    name: "El. gitara Peavey",
    brand: "Peavey",
    manufacturerID: 2,
    shopID: 2
  },
  {
    id: 3,
    name: "Klavir C40 Yamaha",
    brand: "Yamaha",
    manufacturerID: 3,
    shopID: 5
  },
  {
    id: 4,
    name: "Klasicna gitara Alhambra",
    brand: "Alhambra",
    manufacturerID: 5,
    shopID: 2
  },
  {
    id: 5,
    name: "El. gitara Stratokaster",
    brand: "Stratokaster",
    manufacturerID: 4,
    shopID: 2
  },
], {});

await queryInterface.bulkInsert('Countries', [
  {
    id: 1,
    country: "Amerika"
  },{
    id: 2,
    country: "Spanija"
  },
  {
    id: 3,
    country: "Portugal"
  },
  {
    id: 4,
    country: "Japan"
  },
  {
    id: 5,
    country: "Kina"
  },
], {});

  await queryInterface.bulkInsert('Manufacturers', [
    {
      id: 1,
      name: "Gibson",
      countryID: 1
    },{
      id: 2,
      name: "Peavey",
      countryID: 1
    },
    {
      id: 3,
      name: "Yamaha",
      countryID: 4
    },
    {
      id: 4,
      name: "Fender",
      countryID: 5
    },
    {
      id: 5,
      name: "Alhambra",
      countryID: 2
    },
], {});

await queryInterface.bulkInsert('Products', [
  {
    id: 1,
    price: 200,
    year: 2020,
    instrumentID: 1,
    countryID: 1
  },{
    id: 2,
    price: 350,
    year: 2020,
    instrumentID: 4,
    countryID: 2
  },
  {
    id: 3,
    price: 1000,
    year: 2020,
    instrumentID: 3,
    countryID: 4
  },
  {
    id: 4,
    price: 500,
    year: 2020,
    instrumentID: 5,
    countryID: 5
  },
  {
    id: 5,
    price: 720,
    year: 2020,
    instrumentID: 2,
    countryID: 1
  },
], {});

await queryInterface.bulkInsert('Customers', [
  {
    id: 1,
    name: "John",
    username: "john",
    password: "john1",
    countryID: 1
  },{
    id: 2,
    name: "Fernando",
    username: "fernando",
    password: "fernando1",
    countryID: 2
  },
  {
    id: 3,
    name: "Xavi",
    username: "xavi",
    password: "xavi1",
    countryID: 3
  },
  {
    id: 4,
    name: "Makoto",
    username: "makoto",
    password: "makoto1",
    countryID: 4
  },
  {
    id: 5,
    name: "Xiao",
    username: "xiao",
    password: "xiao1",
    countryID: 5
  },
], {});

await queryInterface.bulkInsert('Orders', [
  {
    id: 1,
    address: "Vidovdanska 3",
    customerID: 1
  },{
    id: 2,
    address: "Andriceva 2",
    customerID: 2
  },
  {
    id: 3,
    address: "Principova 6",
    customerID: 3
  },
  {
    id: 4,
    address: "Trg 4",
    customerID: 4
  },
  {
    id: 5,
    address: "Gospodska 2",
    customerID: 5
  },
], {});

await queryInterface.bulkInsert('ProductOrders', [
  {
    id: 1,
    price: 250,
    productID: 1,
    orderID: 1
  },{
    id: 2,
    price: 400,
    productID: 2,
    orderID: 2
  },
  {
    id: 3,
    price: 1050,
    productID: 3,
    orderID: 3
  },
  {
    id: 4,
    price: 550,
    productID: 4,
    orderID: 4
  },
  {
    id: 5,
    price: 770,
    productID: 5,
    orderID: 5
  },
], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Employees', null, {});
     await queryInterface.bulkDelete('Shops', null, {});
  }
};
