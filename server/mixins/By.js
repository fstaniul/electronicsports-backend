'use strict';

const app = require('../server');

module.exports = function(Model, options) {
  const Member = app.models.Member;
  Model.belongsTo(Member, { foreignKey: 'createdBy', as: 'createdBy' });
  if (!options.skipUpdated) {
    Model.belongsTo(Member, { foreignKey: 'updatedBy', as: 'updatedBy' });
  }

  Model.observe('before save', function(ctx, next) {
    const userId = ctx.options.accessToken && ctx.options.accessToken.userId;

    if (!userId) {
      next(
        new Error(
          `User is not logged in, so cannot update this ${
            Model.name
          } with createdBy and updatedBy!`
        )
      );
    }

    if (ctx.instance) {
      if (!options.skipUpdated) ctx.instance.updatedBy = userId;
      if (ctx.isNewInstance || ctx.instance.createdBy) {
        ctx.instance.createdBy = userId;
      }
    } else {
      if (!options.skipUpdated) ctx.data.updatedBy = userId;
      delete ctx.data.createdBy;
    }
  });
};
