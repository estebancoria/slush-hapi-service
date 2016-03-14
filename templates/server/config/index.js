'use strict';

/**
 * <%= serviceName %> Confidence
 */

const Confidence = require( 'confidence' );
const GeneralConfig = require( './general' );
const Config = new Confidence.Store();

const criteria = {
  env: process.env.NODE_ENV
};

Config.load( GeneralConfig );

// Exports the config object based on the NODE_ENV and (optional) key

exports.get = function ( key ) {
    key = '/' + key || '/';
    return Config.get( key, criteria );
};
