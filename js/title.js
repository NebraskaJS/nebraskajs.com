( function( win, doc ) {
	"use strict";

	if( !doc.querySelector ) {
		return;
	}

	if( win.addEventListener ){
		win.addEventListener( "DOMContentLoaded", function(){
			// Run once only
			win.removeEventListener( "load", cloneImages, false );
		}, false );
		win.addEventListener( "load", cloneImages, false );
	}
	else if( win.attachEvent ){
		win.attachEvent( "onload", cloneImages );
	}
}( this, this.document ) );