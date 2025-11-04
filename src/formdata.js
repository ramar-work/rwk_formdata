/**
 * hg-formdata.js
 * 
 * Collects form handling logic all in one place.  In any apps, this
 * can be rebuilt with `form`.
 *
 * TODO
 * ----
 * - Add a term for auto submittal (if values pass validation)
 * - x-sendas to control how to send the payload back to server
 * - x-sendmethod to control how to send the payload back to server
 * - Add basic error handling (can't tell if this should be seprate or not)
 * - x-error or x-onerror can be used to create custom messages.
 *
 */
document.addEventListener( "alpine:init", () => {

	// Define all selectors for this job.
  const selectors = 'input:not([type=submit]), select, textarea'

  // Use this to shuttle stuff around...
  Alpine.store( 'formdata', { data: {} } )

  // Use the magic to access the validated values 
  Alpine.magic( 'formdata', (el) => {

		// Define ahead of time for cleanliness
    const p = {}
    const formdata = el.querySelectorAll( selectors )

    // Validate and require checks
    //for ( const f of Alpine.store( 'formdata' ).data ) {
    for ( const f of formdata ) {

      // Trim the value
      const c = f.value.trim()

			// Store any error text somewhere
			let errstr = "No custom error message specified"
			let minlength = 0
			let maxlength = 0

      // If this is disabled, skip it
      if ( f.hasAttribute( "disabled" ) ) {
        continue
      }

			if ( f.hasAttribute( "x-onerror" ) ) {
				errstr = f.getAttribute( "x-onerror" ) 
			}
console.log( errstr )

      // Check that the field is required
      if ( f.hasAttribute( "required" ) && !c.match( /[A-Z,a-z,0-9]/g ) ) {
        // TODO: Be way more specific about what's failing here
        throw new Error( `Field ${f.name} was required, but not specified` )
        return
      }

			// Check for a minimum length
			if ( f.hasAttribute( "x-minlength" ) ) {
				// TODO: Depending on handling style, we'll throw from here if necessary
			}

			// Check for a maximum length
			if ( f.hasAttribute( "x-maxlength" ) ) {
				// TODO: Depending on handling style, we'll throw from here if necessary
			}

			// Check for a validator function
			if ( f.hasAttribute( "x-validator" ) ) {
				// TODO: Depending on handling style, we'll throw from here if necessary
			}


      // Handle checkboxes
      if ( f.type == "checkbox" ) {
        p[ f.name ] = ( f.checked ) ? true : false
        continue
      }

      // Handle select multiples
      else if ( f.type == "select-multiple" ) { 
				console.log(f)
				console.log( `Value = ${f.value}` )
				p[ f.name ] = []
				for ( const ff of f.selectedOptions ) {
					p[ f.name ].push( ff.value )	
				}
				continue
			}

			// Everything else...
      else {
        p[ f.name ] = c
      }

      // If the 'x-formdata-transformer' attribute exists, run that on the value
      // { ... }
      
    }
    return p
  })


  // Register the directive (and any callbacks, eventually)
  Alpine.directive( 'formdata', ( el ) => {
		console.log( 'initializing formdata' )
  //Alpine.directive( 'formdata', ( el, { expression }, { evaluateLater, effect } )
  //Alpine.directive( 'formdata', ( el, { expression }, { evaluate } )
    const selectors = 'input:not([type=submit]), select, textarea'
    const formdata = el.querySelectorAll( selectors )
		//console.log( formdata )
    //Alpine.store( 'formdata' ).data = formdata
  })

})

