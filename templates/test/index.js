/**
 * {{ serviceName }} tests
 */

const Code = require( 'code' );   // assertion library
const Lab = require( 'lab' );
const lab = exports.lab = Lab.script();

const server = require( '../' ); // require ../index.js

lab.experiment('Basic HTTP Test', function() {
    // tests
    lab.test('Demo endpoint /demo', function(done) {
        var options = {
            method: 'GET',
            url: '/demo'
        };
        // server.inject lets you similate an http request
        server.inject(options, function(response) {
            Code.expect( response.statusCode ).to.equal( 200 );  //  Expect http response status code to be 200 ("Ok")
            Code.expect( response.result ).to.have.length( 11 ); // Expect result to be "Demo route!" (11 chars long)
            done();                                         // done() callback is required to end the test.
        });
    });
});
