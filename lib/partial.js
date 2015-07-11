'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( gamma, x0 )
*	Partially applies scale parameter `gamma` and location parameter `x0` and returns a function for evaluating the probability density function (PDF) for a Cauchy distribution.
*
* @param {Number} gamma - scale parameter
* @param {Number} x0 - location parameter
* @returns {Function} PDF
*/
function partial( gamma, x0 ) {

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Cauchy distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
