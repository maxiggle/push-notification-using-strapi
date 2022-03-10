const fs = require('@strapi/strapi/lib/services/fs');
const { readFileSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const webpush = require('web-push');

const pathToVapidKey = join(__dirname, 'vapidKeys.json'); 

if (!existsSync(pathToVapidKey)) {
  const keys = webpush.generateVAPIDKeys();
  writeFileSync(pathToVapidKey, JSON.stringify(keys));
}

const vapidKeys = JSON.parse(readFileSync(pathToVapidKey).toString());

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const notify = async (strapi, data) => {
  const users = await strapi.entityService.findMany(
    'api::user-notification-key.user-notification-key', {
    filters: {
      subscription: {
        $notNull: true
      }
    }
  });

  users.forEach(user => {
    setTimeout(() => {
      webpush.sendNotification(
        user.subscription,
        JSON.stringify(data)
      ).then(() => console.log('notification sent')).catch(console.error)
    }, 6000)
  })
}

module.exports = {
  webpush,
  notify,
};
