# RWK Formdata

A form validation and serialization module for front-end apps.


## What this is

This module will make short work of a quick signup, booking or order form on websites that <i>aren't</i> using a full-fledged framework.  For Alpine, simple configuration can be done from the app itself and you're good to go.  Just tell it where you want to save your data.


## What this is not

This is <i>not</i> a substitute for server-side validation.  While tightening things up on the client side will help your visitors get entry right the first time, this library won't stop bad actors from trying to game your form or submit data with a bot looking for exploits.  <i>Always</i>, <i>always</i>, <b><i>always</i></b> do server-side validation when implementing forms.

This is also <i>not</i> a good choice for large scale apps that need things like routing, component communication and state management.  While there would theoretically be no problem using this library with a framework that ties in that sort of thing, this tool wasn't built for that purpose and will probably cause you frustration in the long run. 


## Languages / Frameworks Supported

So far, `rwk_formdata` works with the following frameworks/libraries:

- [Alpine](https://alpinejs.dev)
<!--
- Vanilla JS 
- [Dart](https://dart.dev)
-->


## Setup

TBD

<!--
Using npm:

If you've already installed npm, you can do npm build

Using GNU Make:
1. Step 1
-->


## Usage

This module works VERY hard to stay simple and stay out of your way when coding.   It supports common attributes such as: `required`, `placeholder`, `minlength` and `maxlength` with no additional configuration.  

### With Alpine

Use `x-formdata` on the appropriate &lt;form&gt; element within your HTML.  This will "activate" the module and make Alpine aware of elements that should be inspected when the submit button is pressed.

To submit the data from the form, simply reference `$formdata` within the `@submit.prevent` directive placed on the &lt;form&gt; element.  Example:

<pre>
&lt;form x-formdata @submit.prevent="submit( $formdata )"&gt;
...
&lt;/form&gt;
</pre>

#### Modifiers

The library makes extensive use of modifiers (and a few custom directives) to fit a wide variety of use cases.  These modifiers are listed below:

Modifier Name | Description
---           | ---
[animate](#animate) |  Animates transitions between styles when elements fail validation
[decorate](#decorate) |  Tags elements failing validation with a custom message or a default message explaining the error 
[exhaustive](#exhaustive) |  Runs validation on all fields and catches errors instead of stopping immediately
[realtime](#realtime) |  Runs validation on fields as the user progresses through the form
[debug](#debug) |  Run in debug mode

<!--
##### More

<a id="animate"></a>
###### animate

<p> Animates transitions between styles when elements fail validation</p>


<a id="decorate"></a>
###### decorate

<p> Tags elements failing validation with a custom message or a default message explaining the error </p>


<a id="exhaustive"></a>
###### exhaustive

<p> Runs validation on all fields and catches errors instead of stopping immediately</p>


<a id="realtime"></a>
###### realtime

<p> Runs validation on fields as the user progresses through the form</p>


<a id="debug"></a>
###### debug

<p> Run in debug mode</p>
-->




#### Directives 

To make certain parts of conifguration a little bit easier, custom attributes are used to modify the behavior of the library on a page

Attribute Name          | Arguments  | Description
---                     | ---        | ---
[x-formdata-onerrorclass](#x-formdata-onerrorclass) |  1 (string) |  Set a custom error class to apply when validation fails.
[x-formdata-onerror](#x-formdata-onerror) |  1 (string) |  Specifies a custom error message to use when a failure occur on a field.
[x-formdata-formatter](#x-formdata-formatter) |  1 (function) |  Formats values for visual presentation
[x-formdata-transformer](#x-formdata-transformer) |  1 (function) |  Transforms values before submitting (without changing the actual value contained in the input field)
[x-formdata-validator](#x-formdata-validator) |  1 (regex/string) |  Performs custom validation via a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
[x-formdata-onvalidatorerror](#x-formdata-onvalidatorerror) |  1 (string) |  Specifies a custom error message to use when failures occur on a field.


<!--
##### More

Additional details about each of the attributes are below:

<a id="x-formdata-onerror"></a>
###### x-formdata-onerror

<p> Specifies a custom error message to use when a failure occur on a field.</p>


<a id="x-formdata-formatter"></a>
###### x-formdata-formatter

<p> Formats values for visual presentation</p>


<a id="x-formdata-transformer"></a>
###### x-formdata-transformer

<p> Transforms values before submitting (without changing the actual value contained in the input field)</p>


<a id="x-formdata-validator"></a>
###### x-formdata-validator

<p> Performs custom validation via a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)</p>


<a id="x-formdata-onvalidatorerror"></a>
###### x-formdata-onvalidatorerror

<p> Specifies a custom error message to use when failures occur on a field.</p>
-->


<!--
## Examples

### A Simple Login Screen with a Maskable Password

### A Contact Form Requesting a Phone Number

### A Headshot Upload Form
-->

## Contact & Support

Message me or just send me an email at: [ramar@ramarcollins.com](mailto:ramar@ramarcollins.com)


<!--
## Attributions

https://www.pexels.com/photo/purple-toyota-gr86-at-outdoor-car-meet-34643052/
https://www.pexels.com/photo/white-car-in-urban-parking-garage-at-night-32905206/
-->
