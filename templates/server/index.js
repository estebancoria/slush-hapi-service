'use strict';

/**
 * <%= serviceName %> server entry point
 *
 * Powered by HapiJS
 */

const Hapi = require( 'hapi' );
const HapiConfig = require( './config/hapi_config' );
const Routes = require( './routes' );
const Methods = require( './methods' );
const Plugins = require( './plugins' );
let server;

server = new Hapi.Server( HapiConfig.application );

server.connection( HapiConfig.connection );

server.register( Plugins, function( err ){
    if (err) {
        throw err;
    };

    // Setting up hapi views
    server.views( HapiConfig.views );

    // registering server methods
    server.method( Methods );

    // registering routes
    server.route( Routes );

    server.start( function () {
        console.info( `HapiJS server running at ${server.info.uri}:${server.info.port} in ${process.env.NODE_ENV || 'development'} mode` );
    } );
} );

// ON UNCAUGHT EXCEPTION, DO SOMETHING

process.on(
    'uncaughtException',
    function ( err ) {
        console.error( err.stack );
            process.exit( 1 );
    }
);
