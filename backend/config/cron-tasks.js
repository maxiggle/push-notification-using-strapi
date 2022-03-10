const { notify } = require('./web-push');

module.exports = {
  '*/1 * * * * *': async ({ strapi }) => {
    
    const expiredAssets = await strapi.entityService.findMany('api::asset.asset', {
      filters: { 
        validity_period: {
          $lte: new Date()
        },
        is_expired: false
      },
    });

    for (const e of expiredAssets) {
      const notice = await strapi.entityService.create('api::notification.notification', {
        data: {
          message: `Asset ${e.name} with model number ${e.model_number} has expired`,
          type: 'asset',
          metadata: {
            id: e.id
          }
        }
      })
  
      await strapi.entityService.update('api::asset.asset', e.id, {
        data: {
          is_expired: true
        }
      });

      await notify(strapi, notice);
    }
  },
};
