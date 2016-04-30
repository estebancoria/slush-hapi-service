/*
 * slush-hapi-service
 *
 * Licensed under the MIT license.
 */

'use strict';

const pathJoin = require(  'path' ).join,
    gulp = require( 'gulp' ),
    install = require( 'gulp-install' ),
    conflict = require( 'gulp-conflict' ),
    template = require( 'gulp-template' ),
    rename = require( 'gulp-rename' ),
    gulpFilter = require( 'gulp-filter' ),
    _ = require( 'underscore.string' ),
    inquirer = require( 'inquirer' ),
    gutil = require( 'gulp-util' );

    function format( string ) {
        var username = string.toLowerCase();
        return username.replace( /\s/g, '' );
    }

    function report_fail( answers ){
        var valid_folder = answers.git_app_prefix + '-' + _.dasherize(defaults.folder_name.replace( answers.git_app_prefix, '-' ));

        gutil.log( gutil.colors.red.bold.underline( 'Scaffolding error:' ), '\n' );

        gutil.log( gutil.colors.white.bgRed(" Folder name " + gutil.colors.gray.bgYellow(' '+defaults.folder_name+' ') +" does not follows the (dasherized) naming convention, eg.", gutil.colors.white.bgGreen(' ' + answers.git_app_prefix + "-my-service ")), '\n');

        gutil.log( gutil.colors.white.bgGreen(" It should be like: ", valid_folder ), ' \n');

        gutil.log( gutil.colors.white.bold.bgBlue(" Now you can run : cd .. && mv ", defaults.folder_name, ' ', valid_folder, ' && cd ', valid_folder, ' '), ' \n');
        gutil.log( gutil.colors.white.bold.bgBlue(" And then: slush hapi-service "), '\n' );
    }

    function check_folder_name( answers ){
        if ( !answers.prefix_ok ){
            return true;
        }
        // otherwise we use the prefix for folder name validation.
        var reg = new RegExp( "^" + answers.git_app_prefix + "-([A-Za-z0-9]{1,}(-){0,1})+", "g" );
        return reg.test( defaults.folder_name );
    }

    function suggested_git_name( app_name ){
        return defaults.folder_name;
    }

    function report( answers ){
        var git_app = suggested_git_name( answers.appName );

        gutil.log( gutil.colors.green.bold.underline( 'Component info:' ), '\n' );
        gutil.log( gutil.colors.white.bgBlue( 'Package name: ', gutil.colors.white.bold( answers.npmName ) ), '\n' );
        gutil.log( gutil.colors.white.bgBlue( 'Suggested git project name: ', gutil.colors.white.bold( git_app ) ), '\n ' );
    }


var defaults = ( function () {
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        workingDirName = process.cwd().split( '/' ).pop().split( '\\' ).pop(),
        osUserName = homeDir && homeDir.split( '/' ).pop() || 'root',
        configFile = homeDir + '/.gitconfig',
        user = {};
    if ( require( 'fs' ).existsSync( configFile ) ) {
        user = require( 'iniparser' ).parseSync( configFile ).user;
    }
    return {
        folder_name: workingDirName,
        appName: workingDirName,
        userName: format( user.name ) || osUserName,
        authorName:  user.name || osUserName,
        authorEmail: user.email || '',
        prefix: ''
    };
} )();


const global_answers = {};

function get_app_info( done ){
    var prompts = [
        {
            type: 'input',
            name: 'appDescription',
            message: 'What is the description?'
        }, {
            type: 'input',
            name: 'appVersion',
            message: 'What is the version of your project?',
            default: '1.0.0'
        }, {
            type: 'input',
            name: 'authorName',
            message: 'What is the author name?',
            default: defaults.authorName
        }, {
            type: 'input',
            name: 'authorEmail',
            message: 'What is the author email?',
            default: defaults.authorEmail
        }, {
            type: 'confirm',
            name: 'prefix_ok',
            message: 'Do you want to use a prefix for your app?'
        }, {
            type: 'input',
            name: 'git_app_prefix',
            message: 'What is the git prefix?',
            default: defaults.prefix,
            when: function( answers ){
                return answers.prefix_ok;
            }
        },
        {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }
    ];

   inquirer.prompt( prompts, function ( answers ) {
        answers.git_app_prefix = answers.git_app_prefix || '';
        answers.appName = defaults.folder_name;
        answers.appNameSlug = _.slugify( answers.appName );
        answers.npmName = ( answers.git_app_prefix + answers.appName ).toLowerCase();
        answers.serviceName = _.camelize( answers.appName );
        global_answers = answers;
        return done();
    });
};


function scaffolding_task( done ){
    if ( !check_folder_name( global_answers ) ){
        report_fail( global_answers );
        process.exit(0);
    }

    const prompts = [
        {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }
    ];

    inquirer.prompt( prompts, function ( answers ) {
        if ( !answers.moveon ) {
            return done();
        }
        const templates_glob = '/templates/**';

        const srcPath = pathJoin(__dirname, templates_glob)

        gulp.src( srcPath )
            .pipe( template( global_answers ) )
            .pipe( rename( function ( file ) {
                if ( file.basename[ 0 ] === '_' ) {
                    file.basename = '.' + file.basename.slice( 1 );
                }
            } ) )
            .pipe( conflict( './' ) )
            .pipe( gulp.dest( './' ) )
            .pipe( install() )
            .on( 'error', function(e){
                process._rawDebug( 'FATAL:',e );
            } )
            .on( 'end', function( e ){
                if ( e ) {
                    gutil.log( gutil.colors.red.bold.underline( 'Oops! Something went wrong: ', e ), '\n' );
                }
                report( global_answers );
                gutil.log( gutil.colors.white.bold.bgGreen( 'Scaffolding done. Have a nice day. ' ) );
                done();
            })
            .resume();
    } );
}

/* Gulp Tasks */

gulp.task( 'app_info', get_app_info );
gulp.task( 'scaffolding', ['app_info'] );
gulp.task( 'default', ['app_info'] , scaffolding_task );
