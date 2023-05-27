'use strict';

/**
 * mausac service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mausac.mausac');
