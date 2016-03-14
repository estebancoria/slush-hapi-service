var Code = require( 'code' );   // assertion library
var Lab = require( 'lab' );
var lab = exports.lab = Lab.script();

var server = require( '../' ); // require ../index.js

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
            Code.expect( response.result ).to.have.length( 5 ); // Expect result to be "Demo!" (5 chars long)
            done();                                         // done() callback is required to end the test.
        });
    });
});