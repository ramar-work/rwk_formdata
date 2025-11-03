// rwk_formdata.js
document.addEventListener( "alpine:init", () => {

	console.log( 'formdata was seen' );

  Alpine.directive( 'formdata', ( el ) => {
		console.log( 'formdata is on' );
	})

})
