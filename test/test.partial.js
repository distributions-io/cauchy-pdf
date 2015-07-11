/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var gamma = 1,
		x0 = 0;

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should partially apply the Cauchy pdf for given parameter values', function test() {
		var pdf;
		pdf = partial( gamma, x0);
		expect( pdf ).to.be.a( 'function' );
	});

});
