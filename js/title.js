( function( win, doc ) {
	"use strict";

	if( !doc.querySelector ) {
		return;
	}

	function cloneImages() {
		var titleImage = doc.querySelector( '.nejs-title object, .nejs-title img' ),
			numberOfImages = 6;

		if( titleImage ) {
			for( var j=1, k=numberOfImages; j<k; j++ ) {
				titleImage.parentNode.insertBefore( titleImage.cloneNode( false ), titleImage );
			}
		}
	}

	if( win.addEventListener ){
		win.addEventListener( "DOMContentLoaded", function(){
			cloneImages();
			// Run once only
			win.removeEventListener( "load", cloneImages, false );
		}, false );
		win.addEventListener( "load", cloneImages, false );
	}
	else if( win.attachEvent ){
		win.attachEvent( "onload", cloneImages );
	}
}( this, this.document ) );