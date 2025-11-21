/**
 * rwk-formdata.js
 * ===============
 * 
 * Collects form handling logic all in one place.
 * Please see README.md for usage and setup instructions.
 *
 */
document.addEventListener( "alpine:init", (xx) => {

	// Define a config object and reference won't change 
	const config = {

		// Set total animation length
		staytime: 3.25,

		// Set animation time 
		animtime: 0.5,

		// Choose to decorate or not
		decoration: false,

		// Choose exhaustive mode
		exhaustive: false,

		// Choose realtime mode
		realtime: false,

		// Enable or disable scrolling
		scroll: true,

		// Enable important CSS rules in specific cases
		important: "",

		// TODO: Try to change this to encapsulate
		classname: "",  //`_${random()}`
	}


	// Define a list of selectors that won't change
	const selectors = 'input:not([type=submit]), select, textarea'

	
	// Use this until we figure out the best way to display errors
	const die = function (errmsg) {
		throw new Error( errmsg )
	} 


	// Generate a random string
	const random = function () {
		const alpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		const arr = []
		for ( let i = 0; i < 8; i++ ) {
			arr.push( alpha[ Math.floor( ( Math.random() * 1000 ) % 26 ) ] )
		}  
		return arr.join("")
	}


	// Error decorator, TODO: I should be private
	const styleError = function ( el, errstr ) {
		// Define a block
		let div = null

		// Add style to thing
		el.classList.add( config.classname )

		// Add further decoration
		if ( config.decoration ) {
			// Add a div for TEXT as well (with a matching color or class)
			if ( errstr ) {
				div = document.createElement( "div" )
				div.classList.add( config.classname )
				div.innerHTML = errstr
				el.insertAdjacentElement( "afterend", div )
			}
		}

		// Scroll if alternate behavior is not specified
		if ( config.scroll ) {
			// Add add'l offset
			const i = el.offsetTop
			window.scrollTo({"top":i,"left":0,"behavior":"smooth"})
		}
	
		// Remove the class after time elapses
		setTimeout( () => {
			//console.log( `removing ${userclass}` )
			el.classList.remove( config.classname )
			if ( div ) {
				div.classList.remove( config.classname )
				el.parentElement.removeChild( div )
			}
		}, config.staytime * 1000 )

		return
	}


	// Define a local validator function for each field
	const validate = async function (p,f) {

		// Define things
		const c = f.value.trim()
		let errstr = ""
		let minlength = 0
		let maxlength = 0

		// If the field is disabled, skip it
		if ( f.hasAttribute( "disabled" ) ) {
			return true	
		}

		// Replace an error message if requested
		if ( f.hasAttribute( "x-formdata-onerror" ) ) {
			errstr = f.getAttribute( "x-formdata-onerror" ) 
		}

		// Check that the field is required
		if ( f.hasAttribute( "required" ) && !c.match( /[A-Z,a-z,0-9]/g ) ) {
			// TODO: Be way more specific about what's failing here
			styleError( f, errstr || `Field ${f.name} was required, but not specified` )
			return false 
		}

		// Check for a {min,max}imum length
		if ( f.hasAttribute( "minlength" ) ) {
			const len = parseInt( f.getAttribute( "minlength" ) )
			if ( isNaN( len ) ) {
				styleError( f, `Argument type to [minlength] at field ${f.name} is invalid` )
				return null 
			}
			if ( c.length < len ) {
				styleError( f, errstr || `Length of field ${f.name} must be at least ${len} characters` )
				return false
			}
		}

		// Check for a maximum length
		if ( f.hasAttribute( "maxlength" ) ) {
			const len = parseInt( f.getAttribute( "maxlength" ) )
			if ( isNaN( len ) ) {
				styleError( f, `Argument type to [maxlength] at field ${f.name} is invalid` )
				return false 
			}
			if ( c.length > len ) {
				styleError( f, errstr || `Length of field ${f.name} must be less than ${len} characters` )
				return false 
			}
		}

		// Check for a validator function
		if ( f.hasAttribute( "x-formdata-validator" ) ) {

			// Pull the validator
			const validator = f.getAttribute( "x-formdata-validator" )
			const regexp = new RegExp( validator )

			// Finally, check it
			if ( !regexp.exec( c ) ) {
				const lerr = f.getAttribute( "x-formdata-onvalidatorerror" )
				styleError( f, lerr || errstr || `Field ${f.name} fails validation` )
				return false 
			}
		}

		// This is used to change the value underneath for formatting purposes	
		if ( f.hasAttribute( "x-formdata-formatter" ) ) {
		
			// Extract the function or call	
			const fbody = f.getAttribute( "x-formdata-formatter" )
			if ( !fbody ) {
				die( "Expected argument for attribute x-formdata-formatter." )
				return false 
			}

			// Prevent silliness
			if ( f.type == "checkbox" && f.type == "select-multiple" ) {
				die( `x-formdata-formatter attribute should not be used on element type: ${f.type}` )
				return false 
			}

			// NOTE: It would be worth the time to develop some tests comparing Function vs indirect eval
			// NOTE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
			f.value = (eval?.(`"use strict";({f:${fbody}})`)).f( c )
		}
	
		// Finally, serialize each type for transmission via JSON 
		if ( f.type == "checkbox" ) {
			p[ f.name ] = ( f.checked ) ? true : false
		}

		else if ( f.type == "select-multiple" ) { 
			//console.log(f), console.log( `Value = ${f.value}` )
			p[ f.name ] = []
			for ( const ff of f.selectedOptions ) {
				p[ f.name ].push( ff.value )	
			}
		}

		else if ( f.type == "file" ) {

			// There may be multiple files
			p[ f.name ] = []

			// Loop through each file
			for ( const ff of f.files ) {

				// Use FileReader to convert to base64 and return
				const file = new FileReader()
				file.readAsDataURL( ff )
				return new Promise( (resolve,reject) => {
					file.onload = () => {
						p[ f.name ].push( file.result.replace( /data:[a-z]*\/[\w-]*;base64,/, "" ) )
						resolve( true )
					}
				})
				
			}

		}

		else {

			// NOTE: Custom transformers only are run here
			if ( !f.hasAttribute( "x-formdata-transformer" ) )
				p[ f.name ] = c
			else {
				const fbody = f.getAttribute( "x-formdata-transformer" )

				if ( !fbody ) {
					die( "Expected argument for attribute x-formdata-transformer." )
					return false 
				}

				p[ f.name ] = (eval?.(`"use strict";({f:${fbody}})`)).f( c )
			}

		}

		return true
	}	

  // Use this to shuttle stuff around...
  Alpine.store( 'formdata', { 
		data: {} 
	})

  // Use the magic to access the validated values 
  Alpine.magic( 'formdata', async (el) => {

		// Define ahead of time for cleanliness
		let p = {}, pstatus = true;

    // Validate and require checks
    for ( const f of el.querySelectorAll( selectors ) ) {
		
			// If exhaustive, then all checks must run
			if ( !await validate( p, f ) ) {
				pstatus = false
			}

			// If a failure is caught, quit
			if ( !pstatus && !config.exhaustive ) {
				return null
			}

    }

		// This should get here everytime now
    return pstatus ? p : null
  })


  // Register the directive (and any callbacks, eventually)
  Alpine.directive( 'formdata', ( el, { modifiers, expression } ) => {

		const module = "x-formdata"
		const key = {
			for: {
				errorclass: `${module}-onerrorclass`,
				decoration: `${module}-decoration`,
				animtime: `${module}-animtime`,
				staytime: `${module}-staytime`,
				animtime: `${module}-animtime`,
			}
		}

		// Add the novalidate attribute so that 'required', 'minlength', 
		// 'maxlength', 'min' and 'max' can be used with no excess decorators
		el.setAttribute( "novalidate", "" )

		// .debug (in the correct "scope") should allow me to show logs or not
		modifiers.includes( "debug" ) ? console.log( `Initializing ${module}...` ) : ""

		// Check if the user wants to immediately throw an exception or evaluate ALL the fields
		if ( modifiers.includes( "exhaustive" ) ) {
			config.exhaustive = true
		}

		// Disable scrolling
		if ( modifiers.includes( "noscroll" ) ) {
			config.scroll = false
		}

		// Try important
		if ( modifiers.includes( "important" ) ) {
			config.important = "!important"
		}

		// Check if the user wants to diplay a "popup" or not
		if ( modifiers.includes( "decorate" ) ) {
		
			if ( !el.hasAttribute( key.for.decoration ) ) {
				config.decoration = "bottom"
			}
			else {

				// If so, check the position where they want it
				const positions = [ "top", "left", "right", "bottom", "centered" ] //custom: ... ]

				// Get it
				config.decoration = el.getAttribute( key.for.decoration )

				// If it doesn't match, throw or just go with the default
				if ( !config.decoration || !positions.includes( config.decoration ) ) {
					die( `
						Argument type to [${key.for.decoration}] must be one of the following: 
						${[ "top", "left", "right", "bottom", "centered" ].join( ", " )} 
					`)
				}

			}
		}

		// Get any custom class names
		if ( !el.hasAttribute( key.for.errorclass ) ) {
			config.classname = `_${random()}`
		}
		else {
			config.classname = el.getAttribute( key.for.errorclass )

			// Make sure that the class name is valid? and not blank?
			if ( !config.classname ) {
				die( `Argument type to [${key.for.errorclass}] must be a string` )
			}

			// Make sure that the class name is valid (e.g. starts with anything but a number)	
			if ( /[0-9]/.exec( config.classname ) ) {
				die( `Argument type to [${key.for.errorclass}] must be a string and start with an English letter` )
			}

		}
	
		// If animate is true, add rules
		if ( modifiers.includes( "animate" ) || el.hasAttribute( key.for.animtime ) ) {
			// Find the head (or root) node
			const xel = ( [].slice.call( document.getElementsByTagName( "head" ) ) || [])[0] || document.body

			// Check that all animation time is positive
			if ( el.hasAttribute( key.for.animtime ) ) {
				if ( isNaN( config.animtime = el.getAttribute( key.for.animtime ) ) ) {
					die( `Argument type to [${key.for.animtime}] must be numeric and positive` )
				}
			}

			// Check that "stay" time is positive
			if ( el.hasAttribute( key.for.staytime ) ) {
				if ( isNaN( config.staytime = el.getAttribute( key.for.staytime ) ) ) {
					die( `Argument type to [${key.for.staytime}] must be numeric and positive` )
				}	
			}

			// Add to the DOM before we even start
			if ( xel ) {
				const dom = document.createElement( "style" );
				dom.innerHTML = `
					@keyframes setborder { 
						from { border: 1px solid #444; } 
						to { border: 5px solid red ${config.important}; }
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

					input.${config.classname}, 
					textarea.${config.classname}, 
					select.${config.classname} { 
						position: relative; 
						animation-name: setborder, shaker, noborder;
						animation-delay: 0s, 0s, 2s;
						animation-duration: ${config.animtime}s, 0.25s, ${config.animtime}s;
						animation-iteration-count: 1, 1, 1;
						animation-fill-mode: forwards, none, forwards;
						border: 5px solid red ${config.important};
					}

					div.${config.classname} {
						position: absolute; 
						padding: 5px;
						animation-name: setbg, shaker, nobg;
						animation-delay: 0s, 0s, 2s;
						animation-duration: ${config.animtime}s, 0.25s, ${config.animtime}s;
						animation-iteration-count: 1, 1, 1;
						animation-fill-mode: forwards, none, forwards;
					}`

				xel.appendChild( dom )
			}
		}

		// Add a listener
		if ( modifiers.includes( "realtime" ) ) {
			config.realtime = true
			console.log( el.querySelectorAll( selectors ) )
			// Find each element in the selector list and apply a listener
			for ( const f of el.querySelectorAll( selectors ) ) {
				f.addEventListener( "change", () => {
					validate( {}, f )
				})
			}
		}

		// Dump the configuration if requested
		if ( modifiers.includes( "debug" ) ) {
			//Alpine.store( 'formdata' ).data = formdata
			console.log( "============= CONFIGURATION =================" ) 
			console.log( `.exhaustive   = ${config.exhaustive}` )
			console.log( `.decoration   = ${config.decoration}` )
			console.log( `.onerrorclass = ${config.classname}` )
			console.log( `.animtime     = ${config.animtime}` )
			console.log( `.staytime     = ${config.staytime}` )
			console.log( `.realtime     = ${config.realtime}` )
			//console.log( `.extra = ${config.extra}` )
			console.log( "============= END CONFIGURATION ============" ) 
		}
  })

})

