var BIO_TEMPLATE = './templates/bio.ejs',
	AVATAR_TEMPLATE = './templates/avatar.ejs',
	OUTPUT_DIR = '../_includes/';

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

function normalizeTwitterUser( key ) {
	return presenters.twitterExceptions[ key ] === null ? '' : ( presenters.twitterExceptions[ key ] || key );
}

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
		var userData,
			skipAppend = false;

		console.log( response.statusCode );
		if( error ) {
			console.log( 'Error: ', error );
			skipAppend = true;
		} else if( response.statusCode === 404 ) { // Not on GitHub
			userData = {
				name: '',
				username: username,
				blog: '',
				github: '',
				twitter: normalizeTwitterUser( username ),
				count: presenters.count[ username ] || 1 // default is 1
			};
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
				twitter: normalizeTwitterUser( username ),
				count: presenters.count[ username ] || 1 // default is 1
			};
		} else { // maybe a 403
			console.log( body );
			skipAppend = true;
		}

		if( !skipAppend ) {
			var individualUserTemplate = {};
			data[ username ] = individualUserTemplate[ username ] = userData;

			console.log( individualUserTemplate );
			writeBioTemplate( OUTPUT_DIR + username + '.html', individualUserTemplate );
		}

		counter++;
		if( counter > 0 && counter === requests ) {
			writeBioTemplate( OUTPUT_DIR + 'presenters.html', data );
			writeAvatarsTemplate( OUTPUT_DIR + 'avatars.html', data );
		}
	});
}

function writeBioTemplate( filename, presenters ) {
	var arr = [],
		bioTemplate = fs.readFileSync( BIO_TEMPLATE, 'utf8' ),
		str;

	for( var j in presenters ) {
		arr.push( presenters[ j ] );
	}

	str = ejs.render( bioTemplate, { presenters: arr });

	fs.writeFile( filename, str, function( error ) {
		if( error ) {
			console.log( 'Bio error: ', error );
		} else {
			console.log( "Bio success." );
		}
	});
}

function writeAvatarsTemplate( filename, presenters ) {
	var avatarTemplate = fs.readFileSync( AVATAR_TEMPLATE, 'utf8' ),
		str = [];

	for( var j in presenters ) {
		str.push( '{% if author contains "' + j + '" %}' + ejs.render( avatarTemplate, { presenter: presenters[ j ] }) + '{% endif %}' );
	}

	fs.writeFile( filename, str.join( '' ), function( error ) {
		if( error ) {
			console.log( 'Avatars error: ', error );
		} else {
			console.log( "Avatars success." );
		}
	});
}