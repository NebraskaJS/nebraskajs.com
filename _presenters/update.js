var  CACHE_DIR = '../cache/',
     OUTPUT_FILE = '../_data/presenters.yml';

var yaml = require('js-yaml'),
    request = require('request'),
    fs = require('fs'),
    authors = yaml.safeLoad(fs.readFileSync(OUTPUT_FILE, 'utf8')),
    requests = Object.keys(authors).length,
    counter = 0;

fs.exists( CACHE_DIR, function ( exists ) {
  if( ! exists ) {
    console.log("Cache directory does not exist.", CACHE_DIR);
  }
});

Object.keys(authors).forEach(function (username) {
  var filename = getCacheFileName( username );
  fs.exists( filename, function ( exists ) {
    if( exists ) {
		  var jsonBody = fs.readFileSync( filename, 'utf8' );
      finish( false, username, jsonBody );
    }
    else {
      fetchGitHub( username );
    }
  });
});

function getCacheFileName( username ) {
	return CACHE_DIR + username + '.json';
}

function fixGithubAvatarUrl( url ) {
	if( url.indexOf( '?' ) > -1 ) {
		return url + '&s=80';
	} else {
		return url + '?s=80';
	}
}

function fetchGitHub( username ) {

  var github_username = username;
  if( authors[username] ) {
    github_username = authors[username].github ? authors[username].github : username;
  }

  if( github_username === null ) { return {}; }

  var url = 'https://api.github.com/users/' + github_username;

  console.log( 'fetching: ' + url );
  request({
    uri: url,
    headers: {
      'User-Agent': 'Mozilla/1.0 (zachleat)'
    }
  }, 
  function ( error, response, body ) {
    var userData,
    hasError = false;

    console.log( response.statusCode );
    if( error ) {
      console.log( 'Error: ', error );
      hasError = true;
    }
    else if( response.statusCode === 404 ) {
      // Bad username
      console.log( 'Error: User not found on github,', github_username );
      hasError = true;
    }
    else if (response.statusCode > 299 ) {
      // Maybe a 403
      console.log( body );
      hasError = true;
    }

    if( ! hasError ) { 
      fs.writeFile( getCacheFileName( username ), body, function( error ) {
        if( error ) {
          console.log( 'Cache error: ', error );
        } else {
          console.log( 'Cache success for ' + username +'.' );
        }
      });
    }

    finish( hasError, username, body );
  });
}

function finish( hasError, username, githubJsonBody ) {

	if( ! hasError ) {
    console.log( username );
	  var json = JSON.parse( githubJsonBody );
  	json.blog = json.blog || '';
	  if( json.blog.length && json.blog.indexOf( 'http://' ) !== 0 ) {
  		json.blog = 'http://' + json.blog;
  	}

    if( authors[username] === null ) {
      authors[username] = {};
    }

    authors[username].github = json.login;
    authors[username].twitter = ( undefined === authors[username].twitter ) ? username : authors[username].twitter;
    authors[username].name =  json.name || authors[username].name || '';
    authors[username].avatar_url = fixGithubAvatarUrl( json.avatar_url ) || authors[username].avatar_url || '';
		authors[username].blog = json.blog || authors[username].blog || '';
    if( authors[username].blog.length === 0 ) {
      delete authors[username].blog;
    }
	};

	counter++;

	if( counter === requests ) {
    write_data();
	}
}

function write_data () {
  console.log(authors);
  fs.writeFile( OUTPUT_FILE, yaml.safeDump( authors ), function( error ) {
    if( error ) {
      console.log( 'Error writing dat: ', error );
    } else {
      console.log( "Success!" );
    }
  });
}
