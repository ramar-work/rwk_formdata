/**
 * formdata.js
 * ===========
 * 
 * Collects form handling logic all in one place.  In any apps, this
 * can be rebuilt with `form`.
 *
 *
 * Usage
 * -----
 * - ?
 * - ?
 * - ?
 *
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

	// Generate a random string
	const random = function () {
		// Math.floor( Math.random() ) // 1
		return "myrandclass"
	}

	// Define all selectors for this job.
  const selectors = 'input:not([type=submit]), select, textarea'

	// Add a style node here
	const dom = document.createElement( "style" );
	const head = ( [].slice.call( document.getElementsByTagName( "head" ) ) || [])[0]

	// Add to the head
	if ( head ) {
		head.appendChild( dom )
	}

	// Error decorator 
	// TODO: I should be private
	styleError = function ( el, errstr ) {
console.log( 'CALLBACK START' )

		// Define defaults here
		const userclass = ""
		const time = 0.5

		// Add a STYLE node (this MIGHT need to happen sooner)
		dom.innerHTML = `
			@keyframes setborder { from { border: inherit; } to { border: 1px solid red; } }
			.${random()} { animation: ${time}s ease-in 0s setborder; border: 1px solid red; }
		`

		// Save the original styles somewhere?
		if ( true ) {

			// TODO: The requested label or class would be applied here.
			if ( true ) {
				el.classList.add( userclass || random() )
console.log( 'CALLBACK END - DEFAULT' )
				return
			}

			// TODO: Set default timeout

			// Apply the style
			//el.style = styles

		}
		
		//throw new Error( "Error occurred, stop" )
console.log( 'CALLBACK END' )
		return
	}

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

			// Replace an error message if requested
			if ( f.hasAttribute( "x-onerror" ) ) {
				errstr = f.getAttribute( "x-onerror" ) 
			}

			/*
      // Check that the field is required
      if ( f.hasAttribute( "x-required" ) && !c.match( /[A-Z,a-z,0-9]/g ) ) {
        // TODO: Be way more specific about what's failing here
        //throw new Error( `Field ${f.name} was required, but not specified` )
        //const omsg = `Field ${f.name} was required, but not specified`
				styleError( f, errstr || `Field ${f.name} was required, but not specified` )
        return {}
      }
			*/

			if ( true ) {
				styleError( f, errstr || `Field ${f.name} was required, but not specified` )
				return null 
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

		// x-debug (in the correct "scope") should allow me to show logs or not
		true ? console.log( 'initializing formdata' ) : ""

  //Alpine.directive( 'formdata', ( el, { expression }, { evaluateLater, effect } )
  //Alpine.directive( 'formdata', ( el, { expression }, { evaluate } )
    const selectors = 'input:not([type=submit]), select, textarea'
    const formdata = el.querySelectorAll( selectors )
		//console.log( formdata )
    //Alpine.store( 'formdata' ).data = formdata
  })

})

