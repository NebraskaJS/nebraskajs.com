var INPUT_TEMPLATE = './template.ejs',
	OUTPUT_DIR = '../_includes/',
	OUTPUT_TEMPLATE = OUTPUT_DIR + 'presenters.html';

var presenters = require('./presenters'),
	request = require('request'),
	ejs = require('ejs'),
	fs = require('fs'),
	data = {},
	requests = presenters.users.length,
	counter = 0;

presenters.users.forEach(function( username, j ) {
	data[ username ] = {};
	fetchGitHubUser( username );
});

function fetchGitHubUser( username ) {
	var githubUsername = presenters.githubExceptions[ username ] || username,
		url = 'https://api.github.com/users/' + githubUsername;

	console.log( 'fetching: ' + url);
	request({
		uri: url,
		headers: {
			'User-Agent': 'Mozilla/1.0 (zachleat)'
		}
	}, function ( error, response, body ) {
		var userData;

		console.log( response.statusCode );
		if( error ) {
			console.log( 'Error: ', error );
		} else if( response.statusCode !== 200 ) { // 403
			console.log( body );
		} else if( response.statusCode === 200 ) {
			json = JSON.parse( body );

			json.blog = json.blog || '';
			if( json.blog.length && json.blog.indexOf( 'http://' ) !== 0 ) {
				json.blog = 'http://' + json.blog;
			}

			userData = {
				name: json.name || '',
				username: username,
				avatar_url: json.avatar_url,
				blog: json.blog,
				github: githubUsername,
				twitter: presenters.twitterExceptions[ username ] || username,
				count: presenters.count[ username ] || 1 // default is 1
			};

			var individualUserTemplate = {};
			data[ username ] = individualUserTemplate[ username ] = userData;

			writeTemplate( OUTPUT_DIR + username + '.html', individualUserTemplate );
		}
		counter++;
		if( counter > 0 && counter === requests ) {
			writeTemplate( OUTPUT_TEMPLATE, data );
		}
	});
}

function writeTemplate( filename, presenters ) {
	var arr = [],
		template = fs.readFileSync( INPUT_TEMPLATE, 'utf8' ),
		str;

	for( var j in presenters ) {
		console.log( presenters[ j ] );
		arr.push( presenters[ j ] );
	}

	str = ejs.render( template, { presenters: arr });

	fs.writeFile( filename, str, function( error ) {
		if( error ) {
			console.log( 'Error: ', error );
		} else {
			console.log( "Success." );
		}
	}); 
}