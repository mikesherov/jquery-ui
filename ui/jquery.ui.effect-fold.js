/*!
 * jQuery UI Effects Fold @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fold-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function( $, undefined ) {

$.effects.defaultMode.fold = "hide";

$.effects.effect.fold = function( o, done ) {

	// Create element
	var el = $( this ),
		mode = $.effects.effectsMode( el ),
		show = mode === "show",
		hide = mode === "hide",
		size = o.size || 15,
		percent = /([0-9]+)%/.exec( size ),
		horizFirst = !!o.horizFirst,
		ref = horizFirst ? [ "right", "bottom" ] : [ "bottom", "right" ],
		duration = o.duration / 2,

		placeholder = $.effects.createPlaceholder( el ),

		start = el.cssClip(),
		animation1 = {
			clip: el.cssClip()
		},
		animation2 = {
			clip: el.cssClip()
		},

		distance = [ start[ref[0]], start[ref[1]] ],

		// we will need to re-assemble the queue to stack our animations in place
		queue = el.queue(),
		queuelen = queue.length;

	// define animations
	if ( percent ) {
		size = parseInt( percent[ 1 ], 10 ) / 100 * distance[ hide ? 0 : 1 ];
	}
	animation1.clip[ ref[ 0 ] ] = size;
	animation2.clip[ ref[ 0 ] ] = size;
	animation2.clip[ ref[ 1 ] ] = 0;

	if ( show ) {
		el.cssClip( animation2.clip );
		animation2.clip = start;
	}

	// Animate
	el
		.animate( animation1, duration, o.easing )
		.animate( animation2, duration, o.easing )
		.queue(function() {
			$.effects.removePlaceholder( placeholder, el );

			if ( hide ) {
				el.hide();
			}

			done();
		});

	// inject all the animations we just queued to be first in line (after "inprogress")
	if ( queuelen > 1) {
		queue.splice.apply( queue,
			[ 1, 0 ].concat( queue.splice( queuelen, 3 ) ) );
	}
	el.dequeue();
};

})(jQuery);
