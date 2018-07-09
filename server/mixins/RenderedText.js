'use strict';

module.exports = function(Model, options) {
  const rawProperty = options.raw || 'rawText';
  const renderedProperty = options.rendered || 'renderedText';

  Model.defineProperty(rawProperty, { type: 'string', required: true });
  Model.defineProperty(renderedProperty, { type: 'string' });

  Model.observe('before save', function(ctx, next) {
    console.warn('!!! Unimplemented mixin RequriedText !!!');
    next();
  });
};
