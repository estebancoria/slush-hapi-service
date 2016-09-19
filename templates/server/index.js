'use strict';

/**
 * {{ serviceName }}
 * Server entry point
 *
 * Powered by HapiJS & GEUT
 */

const Hapi = require( 'hapi' );
const HapiConfig = require( './config/hapi_config' );
const Routes = require( './routes' );
const Methods = require( './methods' );
const Plugins = require( './plugins' );

const Service = new Hapi.Server( HapiConfig.application );

Service.connection( HapiConfig.connection );

Service.register( Plugins, ( err ) => {

    // if (err) {
    //     throw err;
    // };

    // Note: If your service deals with views you will need to install `vision` and some template engine.
    // Setting up hapi views
    // Service.views( HapiConfig.views );

    // registering Service methods
    Service.method( Methods );

    // registering routes
    Service.route( Routes );

    Service.start( function (err) {
        if (err) {
            Service.log('error', err);
            throw err;
        }

        Service.log( 'start', `HapiJS Service running at ${Service.info.uri} in ${process.env.NODE_ENV || 'development'} mode` );
    } );
} );

// ON UNCAUGHT EXCEPTION, DO SOMETHING :D
// process.on(
//     'uncaughtException',
//     ( err ) => {
//
//         console.log( err.stack );
//         process.exit( 1 );
//     }
// );

module.exports = Service;