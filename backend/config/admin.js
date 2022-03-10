module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'fc726392e2ec4e77a0c87731dae6af08'),
  },
});
