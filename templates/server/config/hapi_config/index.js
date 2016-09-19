'use strict';

/**
 * Hapi config file
 */

const HapiConfig = {
    connection: {
        host: '0.0.0.0',
        port: 3000
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
