/*!
 * jQuery UI Effects Slide @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function( $, undefined ) {

$.effects.defaultMode.slide = "show";

$.effects.effect.slide = function( o, done ) {

	var el = $( this ),
		map = {
			up: [ "bottom", "top" ],
			down: [ "top", "bottom" ],
			left: [ "right", "left" ],
			right: [ "left", "right" ]
		},
		mode = $.effects.mode( el ),
		direction = o.direction || "left",
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
		positiveMotion = ( direction === "up" || direction === "left" ),
		distance = o.distance || el[ ref === "top" ? "outerHeight" : "outerWidth" ]( true ),
		animation = {},
		placeholder = $.effects.createPlaceholder( el ),
		startClip = el.cssClip(),
		startRef = el.position()[ ref ];

	// define hide animation
	animation[ ref ] = ( positiveMotion ? -1 : 1 ) * distance + startRef;
	animation.clip = el.cssClip();
	animation.clip[ map[ direction ][ 1 ] ] = animation.clip[ map[ direction ][ 0 ] ];

	// reverse the animation if we're showing
	if ( mode === "show" ) {
		el.cssClip( animation.clip );
		el.css( ref, animation[ ref ] );
		animation.clip = startClip;
		animation[ ref ] = startRef;
	}

	// actually animate
	el.animate( animation, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: function() {
			$.effects.removePlaceholder( placeholder, el );

			if ( mode === "hide" ) {
				el.hide();
			}

			done();
		}
	});
};

})(jQuery);
