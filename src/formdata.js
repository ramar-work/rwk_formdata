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
		const alpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		const arr = []
		for ( let i = 0; i < 8; i++ ) {
			arr.push( alpha[ Math.floor( ( Math.random() * 1000 ) % 26 ) ] )
		}  
		return arr.join("")
	}

	// Define all selectors for this job.
  const selectors = 'input:not([type=submit]), select, textarea'
	const userclass = "" || `_${random()}`
	const head = ( [].slice.call( document.getElementsByTagName( "head" ) ) || [])[0]
	const staytime = 3.0
	const animtime = 0.5
	// const prompt = ???
	// const position = [ top, left, right, bottom, custom: ... ]

	// Since these are user settings, we need to check for failures before we even get started...
	if ( false ) {
		// Check that all times are positive	
	}

	// Add to the DOM before we even start
	const style = `
		@keyframes setborder { 
			from { border: 1px solid #444; } 
			to { border: 5px solid red; } 
		}

		@keyframes noborder { 
			from { border: 5px solid red; } 
			to { border: 1px solid #444; } 
		}

		@keyframes shaker {
			0% { transform: translate(3px,0px); }
			10% { transform: translate(0px,3px); }
			20% { transform: translate(2px,0px); }
			30% { transform: translate(0px,2px); }
			40% { transform: translate(1px,0px); }
			50% { transform: translate(0px,1px); }
			100% { transform: translate(0px,0px); }
		}

		input.${userclass}, textarea.${userclass}, select.${userclass} { 
			position: relative; 
			animation-name: setborder, shaker, noborder;
			animation-delay: 0s, 0s, 2s;
			animation-duration: ${animtime}s, 0.2s, ${animtime / 2}s;
			animation-iteration-count: 1, 1, 1;
			animation-fill-mode: forwards, none, forwards;
			/*border: 1px solid red;*/
		}

		.${userclass} { 
			position: relative; 
		}
	`

	// Add to the head
	if ( head ) {
		const dom = document.createElement( "style" );
		dom.innerHTML = style;
		head.appendChild( dom )
	}

	// Error decorator, TODO: I should be private
	styleError = function ( el, errstr ) {

		// TODO: The requested label or class would be applied here.
		if ( true ) {
			// Add style to thing
			el.classList.add( userclass )

			// Add a div as well (with a matching color or class)
			const div = document.createElement( "div" )
			div.classList.add( userclass )
			return
		}

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

