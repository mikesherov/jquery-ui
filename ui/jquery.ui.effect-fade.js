/*!
 * jQuery UI Effects Fade @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function( $, undefined ) {

$.effects.define( "fade", "toggle", function( o, done ) {
	$( this ).animate({
		opacity: o.mode
	}, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: done
	});
});

})( jQuery );
