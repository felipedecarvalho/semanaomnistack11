const knex = require('knex');
const configuration = require('../../knexfile');

//pega a variavel de TEST
const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;

//const connection = knex(configuration.development);
const connection = knex(config);

module.exports = connection;
