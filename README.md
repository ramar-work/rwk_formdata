# RWK Formdata

A form validation and serialization module for front-end apps.


## What this is

This should make short work of a quick signup, booking or order form on websites that <i>aren't</i> using a full-fledged framework.  For Alpine, simple configuration can be done from the app itself and you're good to go.  Just tell it where you want to save your data.


## What this is not

This is <i>not</i> a substitute for server-side validation.  While tightening things up on the client side will help your visitors get entry right the first time, this library won't stop bad actors from trying to game your form or submit data with a bot looking for exploits.  <i>Always</i>, <i>always</i>, <b><i>always</i></b> do server-side validation when implementing forms.

<!--
This is also <i>not</i> a good choice for large scale apps with multiple scopes, and whatnot.  Either use the Angular version or consider a different solution.
--> 


## Languages / Frameworks Supported

So far, `rwk_formdata` works with the following frameworks/libraries:

- [Alpine](https://alpinejs.dev)
<!--
- Vanilla JS 
- [Dart](https://dart.dev)
-->


## Setup

Using GNU Make:
1. Step 1

Using npm:
1. Step 2


## Usage

Use x-formdata somewhere on a form element on your page.  This will "activate" the module and make the framework aware of elements that we should be looking for when a submit button is pressed.

Below is a quick table of the possible decorators, their arguments and what they do.

Decorator Name | Arguments | Description
---- | ---- | ----
x-formdata     | -         | "Activates" a form.
x-onerror      | 1 (string) | Specifies a custom error string to use when failures occur on a field.
x-validator    | 0         |         


## Contact & Support

Message me or just send me an email at: [ramar@ramarcollins.com](mailto:ramar@ramarcollins.com)

