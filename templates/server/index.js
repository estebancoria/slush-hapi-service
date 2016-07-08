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

const server = new Hapi.Server( HapiConfig.application );

server.connection( HapiConfig.connection );

server.register( Plugins, ( err ) => {

    // if (err) {
    //     throw err;
    // };

    // Setting up hapi views
    server.views( HapiConfig.views );

    // registering server methods
    server.method( Methods );

    // registering routes
    server.route( Routes );

    server.start( function () {

        console.info( `HapiJS server running at ${server.info.uri} in ${process.env.NODE_ENV || 'development'} mode` );
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

module.exports = server;