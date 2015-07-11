/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array pdf', function tests() {

	var gamma = 3,
		x0 = 2;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the Cauchy pdf', function test() {
		var data, actual, expected, i;

		data = new Float64Array([
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3
		]);
		actual = new Float64Array( data.length );

		actual = pdf( actual, data, gamma, x0 );

		// Evaluated in R:
		expected = new Float64Array([
			0.07345613,
			0.07345613,
			0.07345613,
			0.07345613,
			0.09146836,
			0.05670604,
			0.09549297,
			0.05305165,
			0.01308123,
			0.00624137,
			0.1061033,
			0.03819719,
			0.09549297,
			0.02808617
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( new Int8Array(), new Int8Array(), gamma, x0 ), new Int8Array() );
	});

});
