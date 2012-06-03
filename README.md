# jQuery pageSwipe

This is a jQuery plugin in progress that lets you create an e-reader or iPad
magazine-like user experience for your web app.

The idea is that you can create and style your pages with everything you've
creatively got in you just like you are used to with normal pages. This
plugin will take care of swiping, navigating and scaling to all device 
sizes.

## Usage

Your HTML should look something like this:

``` html
<div class="pages">
  <div class="page">
    <div class="title">Awesome magazine</div>
  </div>
  <div class="page">
    <h1>This could be a great article</h1>
    <p>Lorem ipsum...</p>
    </p>
  </div>
</div>
```

Then with JavaScript:

``` js
$(document).ready(function() {
  $('.pages').pageSwipe()
})
```

in Safari.

## Questions and requests

For now, questions (no matter what!) and requests can be sent to

  Michiel Sikkes <michiel@firmhouse.com>
  
Or you can get in touch on Twitter:

  http://twitter.com/michiels