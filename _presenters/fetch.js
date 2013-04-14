var INPUT_TEMPLATE = './template.ejs',
	OUTPUT_TEMPLATE = '../_includes/presenters.html';

var presenters = require('./presenters'),
	request = require('request'),
	ejs = require('ejs'),
	fs = require('fs'),
	data = {},
	requests = presenters.github.length,
	counter = 0;

presenters.github.forEach(function( username, j ) {
	data[ username ] = {};
	fetchGitHubUser( username );
});

function fetchGitHubUser( username ) {
	request.get('https://api.github.com/users/' + username, function ( error, response, body ) {
		console.log( response.statusCode );
		if( error ) {
			console.log( 'Error: ', error );
		} else if( response.statusCode == 200 ) {
			json = JSON.parse( body );

			json.blog = json.blog || '';
			if( json.blog.length && json.blog.indexOf( 'http://' ) !== 0 ) {
				json.blog = 'http://' + json.blog;
			}

			data[ username ] = {
				name: json.name || '',
				avatar_url: json.avatar_url,
				blog: json.blog,
				github: json.login,
				twitter: presenters.twitter[ json.login ]
			};
		}
		counter++;
		if( counter > 0 && counter === requests ) {
			writeTemplate( data );
		}
	});
}

function writeTemplate( presenters ) {
	var arr = [],
		template = fs.readFileSync( INPUT_TEMPLATE, 'utf8' ),
		str;

	for( var j in presenters ) {
		console.log( presenters[ j ] );
		arr.push( presenters[ j ] );
	}

	str = ejs.render( template, { presenters: arr });

	fs.writeFile( OUTPUT_TEMPLATE, str, function( error ) {
		if( error ) {
			console.log( 'Error: ', error );
		} else {
			console.log( "Success." );
		}
	}); 
}