/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	pdf = require( './../lib' ),

	// Error function:
	PDF = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-cauchy-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( pdf( values[ i ] ) ) );
		}
	});

	it( 'should compute the Cauchy pdf when provided a number', function test() {
		assert.closeTo( pdf( -1 ), 0.1591549, 1e-7 );
	});

	it( 'should evaluate the Cauchy pdf when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [
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
		];
		expected = [
			0.318309886, 0.318309886, 0.318309886, 0.318309886,
			0.194091394, 0.194091394, 0.159154943, 0.159154943,
			0.003151583, 0.003151583, 0.063661977, 0.063661977,
			0.031830989, 0.031830989
		];

		actual = pdf( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate...
		actual = pdf( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the Cauchy pdf when provided a typed array', function test() {
		var data, actual, expected, i;

		var gamma = 5,
			x0 = 1;

		data = new Int8Array( [ -3, -2, -1, 0, 1, 2, 3 ] );

		expected = new Float64Array([
			0.03881828,
			0.04681028,
			0.05488101,
			0.06121344,
			0.06366198,
			0.06121344,
			0.05488101
		]);

		actual = pdf( data, {
			'gamma': gamma,
			'x0': x0
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = pdf( data, {
			'gamma': gamma,
			'x0': x0,
			'copy': false
		});
		expected = new Int8Array([
			0, 0, 0, 0, 0, 0, 0
		]);
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the Cauchy pdf element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		var gamma = 0.1,
			x0 = 1;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = new Int8Array([
			0, 0, 0, 0, 3, 0, 0
		]);

		actual = pdf( data, {
			'gamma': gamma,
			'x0': x0,
			'dtype': 'int8'
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the Cauchy pdf element-wise using an accessor', function test() {
		var data, actual, expected, i;

		var gamma = 1,
			x0 = 1;

		data = [
			[0,-3],
			[1,-2],
			[2,-1],
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [
			0.01872411,
			0.03183099,
			0.06366198,
			0.1591549,
			0.3183099,
			0.1591549,
			0.06366198
		];

		actual = pdf( data, {
			'gamma': gamma,
			'x0': x0,
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}

		// Mutate:
		actual = pdf( data, {
			'gamma': gamma,
			'x0': x0,
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the Cauchy pdf element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[0,0.03183099]},
			{'x':[1,0.06366198]},
			{'x':[2,0.15915494]},
			{'x':[3,0.31830989]},
			{'x':[4,0.15915494]},
			{'x':[5,0.06366198]},
			{'x':[6,0.03183099]}
		];

		actual = pdf( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = pdf( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-7 );
		}
	});

	it( 'should evaluate the Cauchy pdf element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = PDF( i / 5, 1, 0 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = pdf( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the Cauchy pdf element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = PDF( i / 5, 1, 0 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = pdf( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( pdf( [] ), [] );
		assert.deepEqual( pdf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( pdf( new Int8Array() ), new Float64Array() );
	});

});
