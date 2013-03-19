/*!
 * jQuery UI Effects Highlight @VERSION
 * http://jqueryui.com
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/highlight-effect/
 *
 * Depends:
 *	jquery.ui.effect.js
 */
(function( $, undefined ) {

$.effects.define( "highlight", "show", function( o, done ) {
	var elem = $( this ),
		mode = o.mode,
		animation = {
			backgroundColor: elem.css("backgroundColor")
		};

	if ( mode === "hide" ) {
		animation.opacity = 0;
	}

	$.effects.saveStyle( elem );

	elem
		.css({
			backgroundImage: "none",
			backgroundColor: o.color || "#ffff99"
		})
		.animate( animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function() {
				$.effects.restoreStyle( elem );

				if ( mode === "hide" ) {
					elem.hide();
				}

				done();
			}
		});
});

})(jQuery);
