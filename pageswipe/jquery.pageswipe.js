(function( $ ) {
  $.fn.pageSwipe = function() {
    
    viewport = $('<div class="pageswipe-viewport" class="viewport"></div>')
    viewport.css({height: '1024px', width: '768px', margin: 'auto', overflow: "hidden", position: "relative"})
    this.wrap(viewport)
    
    numberOfPages = this.children('.page').length
    
    this.css({width: (numberOfPages * 768) + "px", position: "absolute", height: "1024px", overflow: 'hidden'})
    this.children('.page').css({width: '768px', height: '1024px', "float": "left"})
    
    var that = this
    var pagesStartPosition = 0
    var horizontalTouchStart = null
    
    $(document).bind('touchstart.pageswipe', function(event) {
      e = event.originalEvent
      
      pagesStartPosition = that.position().left
      horizontalTouchStart = e.touches[0].pageX
    })
    
    $(document).bind('touchmove.pageswipe', function(event) {
      horizontalTouchPosition = e.touches[0].pageX
      horizontalTouchDelta = horizontalTouchPosition - horizontalTouchStart
      
      that.css({"-webkit-transform": "translate3d(" + (pagesStartPosition + horizontalTouchDelta) + "px,0,0)"})
    })
    
    return this
  };
})( jQuery )