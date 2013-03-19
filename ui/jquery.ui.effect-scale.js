/*!
 * jQuery UI Effects Scale @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/scale-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function( $, undefined ) {

$.effects.define( "puff", function( o, done ) {
	var options = {
		fade: true,
		percent: parseInt( o.percent, 10 ) || 150
	};

	$.effects.effect.scale.call( this, options, done );
});

$.effects.define( "scale", function( o, done ) {

	// Create element
	var temp,
		el = $( this ),
		mode = o.mode,

		// this copies the "scale" option, which is normalized in $.effects.effect.size
		// and the "fade" option, which isn't documented, but supports $.effects.effect.puff
		options = $.extend( true, {}, o ),

		percent = parseInt( o.percent, 10 ) ||
			( parseInt( o.percent, 10 ) === 0 ? 0 : ( mode !== "effect" ? 0 : 100 ) ),
		direction = o.direction || "both",
		factor = {
			y: direction !== "horizontal" ? ( percent / 100 ) : 1,
			x: direction !== "vertical" ? ( percent / 100 ) : 1
		};

	options.from = {
		height: el.height(),
		width: el.width(),
		outerHeight: el.outerHeight(),
		outerWidth: el.outerWidth()
	};
	options.to = {
		height: options.from.height * factor.y,
		width: options.from.width * factor.x,
		outerHeight: options.from.outerHeight * factor.y,
		outerWidth: options.from.outerWidth * factor.x
	};

	// Set default origin and restore for show/hide
	if ( mode !== "effect" ) {
		options.origin = o.origin || [ "middle", "center" ];
		options.restore = true;

		// Fade option to support puff
		if ( options.fade ) {
			options.from.opacity = 1;
			options.to.opacity = 0;
		}
	}

	if ( mode === "show" ) {
		temp = options.from;
		options.from = options.to;
		options.to = temp;
	}

	$.effects.effect.size.call( this, options, done );
});

$.effects.define( "size", function( o, done ) {

	// Create element
	var baseline, factor,
		el = $( this ),

		// Copy for children
		cProps = [ "fontSize" ],
		vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],
		hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],

		// Set options
		mode = o.mode,
		restore = o.restore || mode !== "effect",
		scale = o.scale || "both",
		origin = o.origin || [ "top", "left" ],
		position = el.css( "position" ),
		pos = el.position(),
		zero = {
			height: 0,
			width: 0,
			outerHeight: 0,
			outerWidth: 0
		},

		placeholder = $.effects.createPlaceholder( el ),

		original = {
			height: el.height(),
			width: el.width(),
			outerHeight: el.outerHeight(),
			outerWidth: el.outerWidth()
		};

	if ( o.mode === "toggle" && mode === "show" ) {
		el.from = o.to || zero;
		el.to = o.from || original;
	} else {
		el.from = o.from || ( mode === "show" ? zero : original );
		el.to = o.to || ( mode === "hide" ? zero : original );
	}

	// Set scaling factor
	factor = {
		from: {
			y: el.from.height / original.height,
			x: el.from.width / original.width
		},
		to: {
			y: el.to.height / original.height,
			x: el.to.width / original.width
		}
	};

	// Scale the css box
	if ( scale === "box" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			el.from = $.effects.setTransition( el, vProps, factor.from.y, el.from );
			el.to = $.effects.setTransition( el, vProps, factor.to.y, el.to );
		}

		// Horizontal props scaling
		if ( factor.from.x !== factor.to.x ) {
			el.from = $.effects.setTransition( el, hProps, factor.from.x, el.from );
			el.to = $.effects.setTransition( el, hProps, factor.to.x, el.to );
		}
	}

	// Scale the content
	if ( scale === "content" || scale === "both" ) {

		// Vertical props scaling
		if ( factor.from.y !== factor.to.y ) {
			el.from = $.effects.setTransition( el, cProps, factor.from.y, el.from );
			el.to = $.effects.setTransition( el, cProps, factor.to.y, el.to );
		}
	}

	// Adjust the position properties based on the provided origin points
	if ( origin ) {
		baseline = $.effects.getBaseline( origin, original );
		el.from.top = ( original.outerHeight - el.from.outerHeight ) * baseline.y + pos.top;
		el.from.left = ( original.outerWidth - el.from.outerWidth ) * baseline.x + pos.left;
		el.to.top = ( original.outerHeight - el.to.outerHeight ) * baseline.y + pos.top;
		el.to.left = ( original.outerWidth - el.to.outerWidth ) * baseline.x + pos.left;
	}
	el.css( el.from );

	// Animate the children if desired
	if ( scale === "content" || scale === "both" ) {

		vProps = vProps.concat([ "marginTop", "marginBottom" ]).concat( cProps );
		hProps = hProps.concat([ "marginLeft", "marginRight" ]);

		// only animate children with width attributes specified
		// TODO: is this right? should we include anything with css width specified as well
		el.find( "*[width]" ).each( function(){
			var child = $( this ),
				c_original = {
					height: child.height(),
					width: child.width(),
					outerHeight: child.outerHeight(),
					outerWidth: child.outerWidth()
				};
			if (restore) {
				$.effects.saveStyle( child );
			}

			child.from = {
				height: c_original.height * factor.from.y,
				width: c_original.width * factor.from.x,
				outerHeight: c_original.outerHeight * factor.from.y,
				outerWidth: c_original.outerWidth * factor.from.x
			};
			child.to = {
				height: c_original.height * factor.to.y,
				width: c_original.width * factor.to.x,
				outerHeight: c_original.height * factor.to.y,
				outerWidth: c_original.width * factor.to.x
			};

			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				child.from = $.effects.setTransition( child, vProps, factor.from.y, child.from );
				child.to = $.effects.setTransition( child, vProps, factor.to.y, child.to );
			}

			// Horizontal props scaling
			if ( factor.from.x !== factor.to.x ) {
				child.from = $.effects.setTransition( child, hProps, factor.from.x, child.from );
				child.to = $.effects.setTransition( child, hProps, factor.to.x, child.to );
			}

			// Animate children
			child.css( child.from );
			child.animate( child.to, o.duration, o.easing, function() {

				// Restore children
				if ( restore ) {
					$.effects.restoreStyle( child );
				}
			});
		});
	}

	// Animate
	el.animate( el.to, {
		queue: false,
		duration: o.duration,
		easing: o.easing,
		complete: function() {
			$.effects.removePlaceholder( placeholder, el );

			if ( el.to.opacity === 0 ) {
				el.css( "opacity", el.from.opacity );
			}
			if( mode === "hide" ) {
				el.hide();
			}

			if ( !restore ) {

				// we need to calculate our new positioning based on the scaling
				if ( position === "static" ) {
					el.css({
						position: "relative",
						top: el.to.top,
						left: el.to.left
					});
				} else {
					$.each([ "top", "left" ], function( idx, pos ) {
						el.css( pos, function( _, str ) {
							var val = parseInt( str, 10 ),
								toRef = idx ? el.to.left : el.to.top;

							// if original was "auto", recalculate the new value from wrapper
							if ( str === "auto" ) {
								return toRef + "px";
							}

							return val + toRef + "px";
						});
					});
				}
			}

			done();
		}
	});

});

})(jQuery);
