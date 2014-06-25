/* nebraskajs - v0.0.11 - 2014-06-24
* http://github.com/nebraskajs/nebraskajs.com/
* Copyright (c) 2014 Zach Leatherman; MIT License */

;( function( win, doc ) {
	"use strict";

	if( !doc.querySelector ) {
		return;
	}

	// Mask feature test
	function featureTest( prop, unprefixedProp ) {
		var style = doc.createElement('tester').style,
			prefixes = 'webkit Moz o ms'.split(' ');

		if( unprefixedProp in style ) {
			return true;
		}
		for( var j = 0, k = prefixes.length; j < k; j++ ) {
			if( ( prefixes[ j ] + prop ) in style ) {
				return true;
			}
		}
		return false;
	}

	if( featureTest( 'MaskRepeat', 'maskRepeat' ) ) {
		document.documentElement.className += ' supports-mask';

		// Add the image for masking
		//<img src="/img/cornfield-640.jpg" class="nejs-title-img">
		var title = doc.querySelector( '.nejs-title' );
		if( title ) {
			var cornfield = new Image();
			cornfield.src = '/img/cornfield-640.jpg';
			cornfield.className = 'nejs-title-img';
			title.appendChild( cornfield );
		}
	}

	// Add @font-face
	var font = 'Raleway:600,400', // Questrial
		link = document.createElement( 'link' ),
		head = document.head || document.getElementsByTagName( 'head' )[ 0 ];

	link.setAttribute( 'href', 'http://fonts.googleapis.com/css?family=' + font );
	link.setAttribute( 'rel', 'stylesheet' );
	head.appendChild( link );

}( this, this.document ) );

// Google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-33622676-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();