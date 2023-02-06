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

    await queryInterface.bulkInsert('AvailableInstruments', [
      {
        id: 1,
        name: "Les Paul Tribute",
        brand: "Gibson",
        price: 1500,
        url: "https://images.ctfassets.net/m8onsx4mm13s/0zbHLch9idV77XUCH31zp7/3c42b3dd5d3a1eac31478a1d0214af53/__static.gibson.com_product-images_USA_USAANM97_Satin_Tobacco_Burst_beauty-banner-640_480.png?h=900",
        description: "The Les Paul Tribute captures the vibe, feel and tonality of a traditional Les Paul and is available in four classic finishes."
      },{
        id: 2,
        name: "Piano NV10",
        brand: "Kawai",
        price: 2500,
        url: "https://lyrastyle.rs/uploads/kawai-novus-nv-10-1_2.jpg",
        description: "Kawai pianos offer a warmer, fuller quality of tone when compared to a normal piano built by Yamaha."
      },{
        id: 3,
        name: "Violin V5 SC44",
        brand: "Yamaha",
        price: 800,
        url: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/172522/14389014_800.jpg",
        description: "Violin Solid wood Hand-carved spruce top Maple back Oil-based finish applied with a brush Ebony fingerboard Ebony pegs Wittner"
      },{
        id: 4,
        name: "Amplifier JTM45 2245",
        brand: "Marshall",
        price: 600,
        url: "https://www.player.rs/images/products/big/26721.webp",
        description: "Model. JTM45 2245. Range. Vintage reissue. Technology. Valve. Channels. 2 (Split) ; Output wattage. 30W."
      },{
        id: 5,
        name: "Masters Muple Gum 22",
        brand: "Pearl",
        price: 1200,
        url: "https://media.sweetwater.com/api/i/q-82__ha-b57d1157840f5bb4__hmac-1c934519bf46b5262f51977ca68bc0c9cee47a27/images/items/750/DM7PC-RB-large.jpg",
        description: "This Pearl Decade Maple Drum Set is an excellent kit. The Redburst is a great color and the drums sound outstanding."
      },{
        id: 6,
        name: "Flute JFL700WE",
        brand: "Jupiter",
        price: 500,
        url: "https://www.fluteworld.com/wp-content/uploads/2019/10/JFL700WE-600x390.jpg",
        description: "Plateau (closed hole) model with Waveline Technology headjoint, one-piece body to low C, assembly alignment indicators, split E mechanism"
      },{
        id: 7,
        name: "Bass guitar GSR200-BK",
        brand: "Jupiter",
        price: 400,
        url: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/147685/7182268_800.jpg",
        description: "Electric Bass Body: Poplar Neck: GSR4 Maple Fretboard: Jatoba Scale: Long scale Matching headstock Pickups: 1 J-Style and 1 P-Style Single Coil Active"
      },{
        id: 8,
        name: "Silent Electric Violin SV-255",
        brand: "Yamaha",
        price: 2100,
        url: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/247291/12343757_800.jpg",
        description: "Silent Violin 5-string The traditional oval shaped neck gives a natural feel Weight similar to an acoustic violin (approx. 500g) Spruce top Ebony"
      }
  ], {});

    await queryInterface.bulkInsert('Shops', [
      {
        id: 1,
        name: "Flutes",
        location: "Bulevar Djindjica"
      },{
        id: 2,
        name: "Guitars",
        location: "Vidovdanska"
      },
      {
        id: 3,
        name: "Drums",
        location: "Kasperova"
      },
      {
        id: 4,
        name: "Violins",
        location: "Cosiceva"
      },
      {
        id: 5,
        name: "Pianos",
        location: "Andriceva"
      }
  ], {});

  await queryInterface.bulkInsert('Departments', [
    {
      id: 1,
      type: "Electrical",
      shopID: 2
    },{
      id: 2,
      type: "Cymbals",
      shopID: 3
    },
    {
      id: 3,
      type: "Classical",
      shopID: 4
    },
    {
      id: 4,
      type: "Acoustic",
      shopID: 2
    },
    {
      id: 5,
      type: "Electrical",
      shopID: 5
    },
], {});

await queryInterface.bulkInsert('Instruments', [
  {
    id: 1,
    name: "Gibson SG",
    brand: "Gibson",
    url: "https://www.mitrosmusic.com/media/inlineimage/upload_28451_1.jpg",
    manufacturerID: 1,
    shopID: 2
  },{
    id: 2,
    name: "El. guitar Peavey",
    brand: "Peavey",
    url: "https://www.scmusic.com.au/content/uploads/2015/11/p-25175-PEAVEY-AT200-BLACK-MAIN.jpg",
    manufacturerID: 2,
    shopID: 2
  },
  {
    id: 3,
    name: "Piano C40 Yamaha",
    brand: "Yamaha",
    url: "https://www.player.rs/images/products/big/30559.webp",
    manufacturerID: 3,
    shopID: 5
  },
  {
    id: 4,
    name: "Classical guitar Alhambra",
    brand: "Alhambra",
    url: "https://www.alhambraguitarras.com/layout/common/_thumb/2304mahoganydelante_ma-480x640-zc2.jpg",
    manufacturerID: 5,
    shopID: 2
  },
  {
    id: 5,
    name: "El. guitar Stratocaster",
    brand: "Stratocaster",
    url: "https://makingfunmusic.com/wp-content/uploads/2021/02/Fender-Player-Stratocaster-Electric-Guitar-Maple-Fingerboard-Black-Full-Straight-Front.jpg",
    manufacturerID: 4,
    shopID: 2
  },
], {});

await queryInterface.bulkInsert('Countries', [
  {
    id: 1,
    country: "America"
  },{
    id: 2,
    country: "Spain"
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
    country: "China"
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
    year: 1980,
    instrumentID: 4,
    countryID: 2
  },
  {
    id: 3,
    price: 1000,
    year: 2010,
    instrumentID: 3,
    countryID: 4
  },
  {
    id: 4,
    price: 500,
    year: 2012,
    instrumentID: 5,
    countryID: 5
  },
  {
    id: 5,
    price: 720,
    year: 2008,
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
