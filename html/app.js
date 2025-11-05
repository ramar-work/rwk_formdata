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

		show() {
			//console.log( $formdata );
		}

	}))

})
