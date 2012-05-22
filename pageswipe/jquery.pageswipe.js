(function( $ ) {
  $.fn.pageSwipe = function() {
    
    viewport = $('<div class="pageswipe-viewport" class="viewport"></div>')
    viewport.css({height: '1024px', width: '768px', margin: 'auto', overflow: "hidden", position: "relative"})
    this.wrap(viewport)
    
    numberOfPages = this.children('.page').length
    
    this.css({width: (numberOfPages * 768) + "px", position: "absolute", height: "1024px", overflow: 'hidden'})
    this.children('.page').css({width: '768px', height: '1024px', "float": "left"})
    
    return this
  };
})( jQuery )