# jQuery pageSwipe

This is a jQuery plugin that lets you create an e-reader or iPad
magazine-like user experience for your web application.

It let's you create pages with HTML, CSS and JavaScript and turns it into
and iPad experience with swiping pages and vertical scrolling.

## Usage

You can call the plugin like the following:

``` js
$(document).ready(function() {
  $('.pages').pageSwipe()
})
```

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

## Questions and feedback

Michiel Sikkes <michiel@firmhouse.com> or [@michiels](http://twitter.com/michiels)
on Twitter.