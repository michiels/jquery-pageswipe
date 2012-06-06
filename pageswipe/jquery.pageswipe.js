(function( $ ) {
  $.fn.pageSwipe = function( ) {
    
    viewportHeight = $(window).height();
    
    viewport = $('<div class="pageswipe-viewport" class="viewport"></div>')
    viewport.css({height: viewportHeight + 'px', width: '768px', margin: 'auto', overflow: "hidden", position: "relative"})
    this.wrap(viewport)
    
    var numberOfPages = this.children('.page').length
    
    this.css({width: (numberOfPages * 768) + "px", position: "absolute", height: viewportHeight + 'px', overflow: 'hidden'})
    this.children('.page').css({width: '768px', height: viewportHeight + 'px', "float": "left", "overflow-y": "auto", "-webkit-overflow-scrolling": "touch"})
    
    var that = this
    var pagesStartPosition = 0
    var horizontalTouchStart = null
    var verticalTouchStart = null
    var scrollDirection = null
    var currentPage = 1
    
    $(this).bind('webkitTransitionEnd', function () {
      $(this).css({"-webkit-transition": ""})
    })
    
    $(document).bind('touchstart.pageswipe mousedown.pageswipe', function(event) {
      e = event.originalEvent
      
      scrollDirection = null
      
      pagesStartPosition = that.position().left
      
      if (e.type == 'mousedown') {
        horizontalTouchStart = e.pageX
        verticalTouchStart = e.pageY
        
      } else {
      
        horizontalTouchStart = e.touches[0].pageX
        verticalTouchStart = e.touches[0].pageY
        
      }
            
    })
    
    $(document).bind('touchmove.pageswipe mousemove.pageswipe', function(event) {
      e = event.originalEvent
            
      if (e.type == 'mousemove') {
        horizontalTouchPosition = e.pageX
      } else {
        horizontalTouchPosition = e.touches[0].pageX
      }
      
      horizontalTouchDelta = horizontalTouchPosition - horizontalTouchStart
            
      if (e.type == 'mousemove') {
        verticalTouchPosition = e.pageY
      } else {
        verticalTouchPosition = e.touches[0].pageY
      }
      
      verticalTouchDelta = verticalTouchPosition - verticalTouchStart
      
      if (horizontalTouchDelta > 0) {
        horizontalDirection = "right"
      } else if (horizontalTouchDelta < 1) {
        horizontalDirection = "left"
      }
      
      if (!scrollDirection) {
        /* We do not have a scrollDirection yet. So we are going to figure it
           out: */
        if (Math.abs(horizontalTouchDelta) > 10) {
          scrollDirection = "h"
        }
        
        if (Math.abs(verticalTouchDelta) > 10) {
          scrollDirection = "v"
        }
      }
      
      if (scrollDirection == "h") {
        e.preventDefault() /* Disable other scroll directions when we are scrolling horizontally */
        if ( 
          (horizontalDirection == "right" && currentPage > 1) || /* Make sure we cannot scroll to the left of the first page. */
          (horizontalDirection == "left" && currentPage < numberOfPages) /* Make sure we cannot scroll beyond the last page. */
        ) {
          that.css({"-webkit-transform": "translate3d(" + (pagesStartPosition + horizontalTouchDelta) + "px,0,0)"})
        }
      }
    })
    
    $(document).bind('touchend.pageswipe mouseup.pageswipe', function(event) {
      e = event.originalEvent
      
      if (e.type == 'mouseup') {
        horizontalTouchEnd = e.pageX
      } else {
        horizontalTouchEnd = e.changedTouches[0].pageX
      }
      
      horizontalTouchDelta = horizontalTouchStart - horizontalTouchEnd
      
      if (scrollDirection == "h") {
        if (horizontalTouchDelta > 0 && currentPage < numberOfPages) {
          that.css({
            "-webkit-transition": "all .2s ease-in-out", 
            "-webkit-transform": "translate3d("  + (-768 * (currentPage)) + "px,0,0)"
          })
          currentPage++
        } else if (horizontalTouchDelta < 0 && currentPage > 1) {
          currentPage--
          that.css({
            "-webkit-transition": "all .2s ease-in-out", 
            "-webkit-transform": "translate3d("  + (-768 * (currentPage - 1)) + "px,0,0)"
          })
        }
      }
      
      $('.page').css({
          "overflow-y": "hidden",
          "-webkit-overflow-scrolling": "none"
      })
      
    })
    
    return this
  };
})( jQuery )