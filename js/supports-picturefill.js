/*!
 * Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs).
 * Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv3 */

(function( w, doc ){

	// Enable strict mode
	"use strict";

	var supports = {
		svg: !!doc.createElementNS && !!doc.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect
	};

	w.picturefill = function() {
		var ps = doc.getElementsByTagName( "div" ),
			alt;

		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			var picImg = null;
			if( ps[ i ].getAttribute( "data-picture" ) !== null ){

				var sources = ps[ i ].getElementsByTagName( "div" ),
					matches = [];

				// See if which sources match
				for( var j = 0, jl = sources.length; j < jl; j++ ){
					var test = sources[ j ].getAttribute( "data-supports" );

					// if there's no supports specified, OR the specified test is supported 
					if( !test || supports[ test ] ){
						matches.push( sources[ j ] );
					}
				}

			// Find any existing img element in the picture element
			picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

			if( matches.length ){
				if( !picImg ){
					picImg = doc.createElement( "object" );
					picImg.setAttribute( "type", "image/svg+xml" );

					ps[ i ].insertBefore( picImg, ps[ i ].firstChild );
				}

				picImg.setAttribute( "data", matches.pop().getAttribute( "data-src" ) );
			}
			else if( picImg ){
				ps[ i ].removeChild( picImg );
			}
		}
		}
	};

	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "DOMContentLoaded", function(){
			w.picturefill();
			// Run once only
			w.removeEventListener( "load", w.picturefill, false );
		}, false );
		w.addEventListener( "load", w.picturefill, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill );
	}

}( this, this.document ));