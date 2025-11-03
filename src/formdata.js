/**
 * hg-formdata.js
 * 
 * Collects form handling logic all in one place.  In any apps, this
 * can be rebuilt with `form`.
 *
 * ?
 *
 */
document.addEventListener( "alpine:init", () => {

  const selectors = 'input:not([type=submit]), select, textarea'

  // Use this to shuttle stuff around...
  Alpine.store( 'formdata', { data: {} } )


  // Use the magic to access the validated values 
  Alpine.magic( 'formdata', (el) => {
    // Validate and require checks
    const p = {}
    const formdata = el.querySelectorAll( selectors )
    //for ( const f of Alpine.store( 'formdata' ).data ) {
    for ( const f of formdata ) {

      // Trim the value
      const c = f.value.trim()

      // If this is disabled, skip it
      if ( f.hasAttribute( "disabled" ) ) {
        continue
      }

      // Check that the field is required
      if ( f.hasAttribute( "required" ) && !c.match( /[A-Z,a-z,0-9]/g ) ) {
        // TODO: Be way more specific about what's failing here
        throw new Error( `Field ${f.name} was required, but not specified` )
        return
      }

      // If the 'x-formdata-validator' attribute exists, run whatever is asked for (a regex is most likely)
      // { ... }

      // Handle checkboxes
      if ( f.type == "checkbox" ) {
        p[ f.name ] = ( f.checked ) ? true : false
        continue
      }
      // Handle select multiples
      //else if ( f.type == "select-multiple" ) { ; }
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
    //Alpine.store( 'formdata' ).data = formdata
  })

})

