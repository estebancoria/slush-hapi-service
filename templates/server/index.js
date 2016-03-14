'use strict';

/**
 * <%= serviceName %> Server entry point
 *
 * Powered by HapiJS
 */

const Hapi = require( 'hapi' );
const HapiConfig = require( './config/hapi_config' );
const Routes = require( './routes' );
const Methods = require( './methods' );
const Plugins = require( './plugins' );
let Server;

Server = new Hapi.Server( HapiConfig.application );

Server.connection( HapiConfig.connection );

Server.register( Plugins, function(err, ){
    if (err) {
        throw err;
    };

    // Setting up hapi views
    Server.views( HapiConfig.views );

    // registering Server methods
    Server.method( Methods );

    // registering routes
    Server.route( Routes );

    Server.start( function () {
        console.info( `HapiJS server running at ${Server.info.uri}:${Server.info.port} in ${process.env.NODE_ENV || 'development'} mode` );
    } );
} );

// ON UNCAUGHT EXCEPTION, DO SOMETHING

process.on(
    'uncaughtException',
    function ( err ) {
        LOGGER.error( err.stack );
            process.exit( 1 );
    }
);
