'use strict';
const { notify } = require('../../../../config/web-push');
/**
 *  asset controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::asset.asset', ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);
    return response;
  },

  async update(ctx) {
    const response = await super.update(ctx);
    return response;
  },

  async findOne(ctx) {
    const response = await super.findOne(ctx);
    return response;
  },

  async delete(ctx) {
    const response = await super.delete(ctx);
    await notify(strapi, { message: 'An asset has been deleted' });
    return response;
  },
  
  async create (ctx) {
    const response = await super.create(ctx);
    await notify(strapi, {
      message: `An asset ${response?.data?.attributes?.name} has been created` 
    });
    return response;
  }
}));
