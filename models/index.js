const Sequelize = require('sequelize');

const scheme = require('./scheme');

const Op = Sequelize.Op;

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'db.sqlite3',

  operatorsAliases: {
    $and: Op.and,
    $gt: Op.gt,
    $lt: Op.lt
  },
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

scheme(sequelize);
sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.models = sequelize.models;
