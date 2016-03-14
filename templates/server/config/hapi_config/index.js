'use strict';

/**
 * Hapi config file
 */

/**
 * require'd
 */

const HapiConfig = {
    connection: {
        host: '0.0.0.0',
        port: 3000
    },
    is_development: ( process.env.NODE_ENV === 'development' ) ? true : false,
    views: {
        layout: true,
        path: '/server/views',
        layoutPath: '/server/views',
        isCached: ( process.env.NODE_ENV === 'development' ) ? false : true
    },
    application: {
        connections: {
            router: {
                stripTrailingSlash: true
            }
        }
    }
};

/**
 * Module exports: Hapi config
 */
module.exports = HapiConfig;
