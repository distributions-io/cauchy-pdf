'use strict';

// FUNCTIONS //

var pow = Math.pow;


// VARIABLES //

var PI = Math.PI;

// PDF //

/**
* FUNCTION: pdf( x, gamma, x0 )
*	Evaluates the probability density function (PDF) for a Cauchy distribution with scale parameter `gamma` and location parameter `x0` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} gamma - scale parameter
* @param {Number} x0 - location parameter
* @returns {Number} evaluated PDF
*/
function pdf( x, gamma, x0 ) {
	var denom = PI * gamma * ( 1 + pow( (x - x0) / gamma, 2 ) );
			return 1 / denom;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
