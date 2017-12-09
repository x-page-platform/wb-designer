const JWT = require('jsonwebtoken');
const { getConfig} = require('../lib/util');

module.exports = class JWTService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async encode(data) {
    return JWT.sign(data, getConfig('secret'), {
      expiresIn: '7d'
    });
  }

  async decode(data) {
    return JWT.decode(data, getConfig('secret'));
  }
}