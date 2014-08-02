var BIO_TEMPLATE = './templates/bio.ejs',
	AVATAR_TEMPLATE = './templates/avatar.ejs',
	CACHE_DIR = './cache/',
	OUTPUT_DIR = '../_includes/';

var presenters = require('./presenters'),
	request = require('request'),
	ejs = require('ejs'),
	fs = require('fs'),
	data = {},
	requests = presenters.users.length,
	counter = 0,
	usernames = {
		twitter: function( key ) {
			return presenters.twitterExceptions[ key ] === null ? '' : ( presenters.twitterExceptions[ key ] || key );
		},
		github: function( username ) {
			return presenters.githubExceptions[ username ] || username;
		}
	};

function getCacheFileName( username ) {
	return CACHE_DIR + username + '.json';
}

presenters.users.forEach(function( username ) {
	var filename = getCacheFileName( username );

	data[ username ] = {};

	fs.exists( filename, function( exists ) {
		if (exists) {
			var jsonBody = fs.readFileSync( filename, 'utf8' ),
				userData = parseJson( username, jsonBody );
				finish( false, username, userData );
		} else {
			fetchGitHubUser( username );
		}
	});
});

function fixAvatarUrl( url ) {
	if( url.indexOf( '?' ) > -1 ) {
		return url + '&s=80';
	} else {
		return url + '?s=80';
	}
}

function parseJson( username, body ) {
	var json = JSON.parse( body );

	json.blog = json.blog || '';
	if( json.blog.length && json.blog.indexOf( 'http://' ) !== 0 ) {
		json.blog = 'http://' + json.blog;
	}

	return {
		name: json.name || '',
		username: username,
		avatar_url: fixAvatarUrl( json.avatar_url ),
		blog: json.blog,
		github: usernames.github( username ),
		twitter: usernames.twitter( username ),
		count: presenters.count[ username ] || 1 // default is 1
	};
}

function fetchGitHubUser( username ) {
	var url = 'https://api.github.com/users/' + usernames.github( username );

	console.log( 'fetching: ' + url);
	request({
		uri: url,
		headers: {
			'User-Agent': 'Mozilla/1.0 (zachleat)'
		}
	}, function ( error, response, body ) {
		var userData,
			hasError = false;

		console.log( response.statusCode );
		if( error ) {
			console.log( 'Error: ', error );
			hasError = true;
		} else if( response.statusCode === 404 ) { // Not on GitHub
			userData = {
				name: '',
				username: username,
				blog: '',
				github: '',
				twitter: usernames.twitter( username ),
				count: presenters.count[ username ] || 1 // default is 1
			};
		} else if( response.statusCode === 200 ) {
			fs.writeFile( getCacheFileName( username ), body, function( error ) {
				if( error ) {
					console.log( 'Cache error: ', error );
				} else {
					console.log( 'Cache success for ' + username +'.' );
				}
			});

			userData = parseJson( username, body );
		} else { // maybe a 403
			console.log( body );
			hasError = true;
		}

		finish( hasError, username, userData );
	});
}

function finish( hasError, username, userData ) {
	if( !hasError ) {
		data[ username ] = userData;
		write.userData( username, userData );
	}

	counter++;
	if( counter === requests ) {
		write.allUserData( data );
	}
}

var write = {
	userData: function( username, userData ) {
		var individualUserTemplate = {};
		individualUserTemplate[ username ] = userData;

		// console.log( individualUserTemplate );
		write.bioTemplate( OUTPUT_DIR + username + '.html', individualUserTemplate );
	},
	allUserData: function( data ) {
		write.bioTemplate( OUTPUT_DIR + 'presenters.html', data );
		write.avatarsTemplate( OUTPUT_DIR + 'avatars.html', data );
	},
	bioTemplate: function( filename, presenters ) {
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
	},
	avatarsTemplate: function( filename, presenters ) {
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
}
