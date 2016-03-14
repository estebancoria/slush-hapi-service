'use strict';

/**
 * <%= serviceName %> general config
 */

// require all your config folders. 
const DemoConfig = require( './demo_config' );

// populate config object
const config = {
    [ DemoConfig.name ]: DemoConfig.config
};

/**
 * Module exports: General Config
 */

module.exports = config;
