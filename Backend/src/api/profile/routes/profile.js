'use strict';

/**
 * profile router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::profile.profile');


// const defaultRouter = createCoreRouter('api::profile.profile')
// const customRouter = (innerRouter, extraRoutes = []) => {
//     let routes;
//     return {
//         get prefix() {
//             return innerRouter.prefix;
//         },
//         get routes() {
//             if (!routes) routes = innerRouter.routes.concat(extraRoutes);
//             return routes;
//         },
//     };
// };

// const myExtraRoutes = [
//     {
//         method: 'GET',
//         path: '/profiles/check-valid',
//         handler: 'profile.checkValid',
//     },
// ];

// module.exports = customRouter(defaultRouter, myExtraRoutes);