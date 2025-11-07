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
	const staytime = 3.25
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

		@keyframes setbg { 
			from { background: transparent; color: transparent; } 
			to { background: red; color: white; }
		}

		@keyframes nobg { 
			from { background: red; color: white; } 
			to { background: transparent; color: transparent; }
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
			animation-duration: ${animtime}s, 0.25s, ${animtime}s;
			animation-iteration-count: 1, 1, 1;
			animation-fill-mode: forwards, none, forwards;
		}

		div.${userclass} {
			position: absolute; 
			padding: 5px;
			animation-name: setbg, shaker, nobg;
			animation-delay: 0s, 0s, 2s;
			animation-duration: ${animtime}s, 0.25s, ${animtime}s;
			animation-iteration-count: 1, 1, 1;
			animation-fill-mode: forwards, none, forwards;
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

		// Define a block
		let div = null

		// Add style to thing
		el.classList.add( userclass )

		// Add a div for TEXT as well (with a matching color or class)
		if ( errstr ) {
			div = document.createElement( "div" )
			div.classList.add( userclass )
			div.innerHTML = errstr
			el.insertAdjacentElement( "afterend", div )
		}
	
		// Remove the class after time elapses
		setTimeout( () => {
			//console.log( `removing ${userclass}` )
			el.classList.remove( userclass )
			if ( div ) {
				div.classList.remove( userclass )
				el.parentElement.removeChild( div )
			}
		}, staytime * 1000 )

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

      // Define things
      const c = f.value.trim()
			let errstr = ""
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

      // Check that the field is required
      if ( f.hasAttribute( "x-required" ) && !c.match( /[A-Z,a-z,0-9]/g ) ) {
        // TODO: Be way more specific about what's failing here
				styleError( f, errstr || `Field ${f.name} was required, but not specified` )
        return null 
      }

			// Check for a minimum length
			if ( f.hasAttribute( "x-minlength" ) ) {
				const len = parseInt( f.getAttribute( "x-minlength" ) )
				if ( isNaN( len ) ) {
					styleError( f, `Argument type to [x-minlength] at field ${f.name} is invalid` )
					return null 
				}
				if ( c.length < len ) {
					styleError( f, errstr || `Length of field ${f.name} must be at least ${len} characters` )
					return null 
				}
			}

			// Check for a maximum length
			if ( f.hasAttribute( "x-maxlength" ) ) {
				const len = parseInt( f.getAttribute( "x-maxlength" ) )
				if ( isNaN( len ) ) {
					styleError( f, `Argument type to [x-minlength] at field ${f.name} is invalid` )
					return null 
				}
				if ( c.length > len ) {
					styleError( f, errstr || `Length of field ${f.name} must be less than ${len} characters` )
					return null 
				}
			}

			// Check for a validator function
			if ( f.hasAttribute( "x-validator" ) ) {
				// TODO: Depending on handling style, we'll throw from here if necessary
			}

      // If the 'x-formdata-transformer' attribute exists, run that on the value
			// This can control custom stuff like email addresses and phone formatters
      // { ... }
      
      // Finally, serialize each type for transmission via JSON 
			// TODO: (supporting other formats would still help)
      if ( f.type == "checkbox" ) {
        p[ f.name ] = ( f.checked ) ? true : false
        continue
      }

      // Handle select multiples
      else if ( f.type == "select-multiple" ) { 
				//console.log(f), console.log( `Value = ${f.value}` )
				p[ f.name ] = []
				for ( const ff of f.selectedOptions ) p[ f.name ].push( ff.value )	
				continue
			}

			// Everything else...
      else {
        p[ f.name ] = c
      }

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

