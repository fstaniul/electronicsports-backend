'use strict';

module.exports = function(Model, options) {
  Model.defineProperty('createdAt', { type: Date, default: '$now' });
  Model.defineProperty('updatedAt', { type: Date, default: '$now' });

  Model.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstace || !ctx.instance.createdAt) {
        ctx.instance.createdAt = new Date();
      }
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
      delete ctx.data.createdAt;
    }
  });
};
