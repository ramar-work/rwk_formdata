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
			//console.log('submitting')
			if ( f ) {
				alert( JSON.stringify( f ) );
			}
		}

	}))

})
