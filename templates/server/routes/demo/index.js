'use strict';

/**
 * DEMO API
 */

/**
 * require'd
 */

const handler = require( './handler' );

/**
 * Exports: ROUTES
 */
module.exports = [
    {
        method: [ 'GET' ],
        path: '/demo',
        handler: handler.demo
    }
];
