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
    var scrollDirection = null
    var currentPage = 1
    
    $(this).bind('webkitTransitionEnd', function () {
      $(this).css({"-webkit-transition": ""})
    })
    
    $(document).bind('touchstart.pageswipe', function(event) {
      e = event.originalEvent
      
      scrollDirection = null
      
      pagesStartPosition = that.position().left
      horizontalTouchStart = e.touches[0].pageX
    })
    
    $(document).bind('touchmove.pageswipe', function(event) {
      e = event.originalEvent
      
      horizontalTouchPosition = e.touches[0].pageX
      horizontalTouchDelta = horizontalTouchPosition - horizontalTouchStart
      
      if (!scrollDirection) {
        /* We do not have a scrollDirection yet. So we are going to figure it
           out: */
        if (Math.abs(horizontalTouchDelta) > 10) {
          scrollDirection = "h"
        }
      }
      
      if (scrollDirection == "h") {
        e.preventDefault()
        that.css({"-webkit-transform": "translate3d(" + (pagesStartPosition + horizontalTouchDelta) + "px,0,0)"})
      }
    })
    
    $(document).bind('touchend.pageswipe', function(event) {
      e = event.originalEvent
      
      horizontalTouchEnd = e.changedTouches[0].pageX
      horizontalTouchDelta = horizontalTouchStart - horizontalTouchEnd
      
      if (scrollDirection == "h") {
        if (horizontalTouchDelta > 0) {
          that.css({
            "-webkit-transition": "all .2s ease-in-out", 
            "-webkit-transform": "translate3d("  + (-768 * (currentPage)) + "px,0,0)"
          })
          currentPage++
        } else if (horizontalTouchDelta < 0) {
          currentPage--
          that.css({
            "-webkit-transition": "all .2s ease-in-out", 
            "-webkit-transform": "translate3d("  + (-768 * (currentPage - 1)) + "px,0,0)"
          })
        }
      }
    })
    
    return this
  };
})( jQuery )