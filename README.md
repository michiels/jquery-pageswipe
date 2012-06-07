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

## Distribution

The Google Closure compiler is used to optimize and minify the JavaScript.
Run the following command to pack the plugin:

```
rake minimize > jquery.pageswipe.min.js
```

## Hacking & Testing

To start hacking, clone the repository and run:

``` sh
bundle install
rake test
```

For more information, see: [HACKING.md](https://github.com/michiels/jquery-pageswipe/blob/master/HACKING.md)

## Commercial use and licensing

The plugin is released under the GPLv2. This basically means that you can
use and (re)distribute this plugin and your changes as long as your new
version or the application you are using this plugin is released
under these same terms.

In most cases, this is not suitable for your own closed priorietary software.
For example, if you use this plugin in consulting jobs or if you plan to
ship it with a SaaS application or other product you will need a commercial
license. Get in touch if you are interested.

## Questions and feedback

Michiel Sikkes <michiel@firmhouse.com> or [@michiels](http://twitter.com/michiels)
on Twitter.