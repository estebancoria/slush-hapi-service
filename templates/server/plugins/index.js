'use strict';

/**
 * {{ serviceName }} plugins
 */

let PLUGINS = [];

PLUGINS = PLUGINS
    .concat({
        register: require( 'good' ),
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    })
    .concat({
        register: require( 'blipp' ),
        options: {}
    });


/**
 * Exports: PLUGINS
 */

module.exports = PLUGINS;
