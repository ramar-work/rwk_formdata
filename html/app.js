/**
 * app.js
 * -------
 *
 * A test app for formdata work.
 *
 */

document.addEventListener( "alpine:init", () => {

	Alpine.data( "app", () => ({

		showPreferences: false,

		showComments: false,

		submit( f ) {
			if ( f ) {
				alert( JSON.stringify( f ) );
			}
		}

	}))

})
