'use strict';

/**
 * <%= serviceName %> plugins
 */

let PLUGINS = [];

PLUGINS = PLUGINS
    .concat({
        register: require( 'vision' ),
        options: {}
    })
    .concat({
        register: require( 'blipp' ),
        options: {}
    });   
  

/**
 * Exports: PLUGINS
 */

module.exports = PLUGINS;
