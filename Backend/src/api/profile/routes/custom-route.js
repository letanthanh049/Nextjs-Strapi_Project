'use strict';

/**
 * custom profile router
 */

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/profiles/check-valid',
            handler: 'profile.checkValid',
        },
    ]
}
