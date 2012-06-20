// jQuery pageSwipe - Page swiping plugin for jQuery
// Copyright (C) 2012  Michiel Sikkes <michiel@firmhouse.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function( $ ) {
  $.fn.pageSwipe = function( ) {
    
    viewportHeight = $(window).height();
    
    if (viewportHeight > 1024) {
      remaining = viewportHeight - 1024
      remainingHeight = (remaining / 2) + 'px '
      viewportHeight = 1024
    } else {
      remainingHeight = ''
    }
    
    pageswipe_viewport = $('<div class="pageswipe-viewport viewport"></div>')
    pageswipe_viewport.css({height: viewportHeight + 'px', height: viewportHeight + 'px', width: '768px', margin: remainingHeight + 'auto', overflow: "hidden", position: "relative"})
    this.wrap(pageswipe_viewport)
    
    var numberOfPages = this.children('.page').length
    
    this.css({width: (numberOfPages * 768) + "px", position: "absolute"})
    this.children('.page').css({width: '768px', height: viewportHeight + 'px', "float": "left", "overflow-y": "auto", "-webkit-overflow-scrolling": "touch", "position": "relative"})
    
    var that = this
    var pagesStartPosition = 0
    var horizontalTouchStart = null
    var verticalTouchStart = null
    var scrollDirection = null
    var currentPage = 1
    var touchDown = false
    
    $(this).bind('webkitTransitionEnd', function () {
      this.style.WebkitTransition = ''
    })
    
    $(this).bind('transitionend', function () {
      this.style.MozTransition = ''
    })
    
    $(this).bind('MSTransitionEnd', function() {
      this.style.MSTransition = ''
    })
    
    $(document).bind('touchstart.pageswipe mousedown.pageswipe', function(event) {
      e = event.originalEvent
      
      scrollDirection = null
      
      pagesStartPosition = that.position().left
      
      touchDown = true
      
      if (e.type == 'mousedown') {
        horizontalTouchStart = e.clientX
        verticalTouchStart = e.pageY
        
      } else {
      
        horizontalTouchStart = e.touches[0].pageX
        verticalTouchStart = e.touches[0].pageY
        
      }
            
    })
    
    $(document).bind('touchmove.pageswipe mousemove.pageswipe', function(event) {
      
      if (!touchDown) {
        return true;
      }
      
      e = event.originalEvent
            
      if (e.type == 'mousemove') {
        horizontalTouchPosition = e.clientX
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
      
      selecting = false;
      
      if (window.getSelection) {
        if (window.getSelection().type == "Range") {
          selecting = true;
        }
      }
      
      if (!scrollDirection && !selecting) {
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
        if (e.preventDefault) {
          e.preventDefault() /* Disable other scroll directions when we are scrolling horizontally */
        }
        if ( 
          (horizontalDirection == "right" && currentPage > 1) || /* Make sure we cannot scroll to the left of the first page. */
          (horizontalDirection == "left" && currentPage < numberOfPages) /* Make sure we cannot scroll beyond the last page. */
        ) {
          that[0].style.WebkitTransform = "translate3d(" + (pagesStartPosition + horizontalTouchDelta) + "px,0,0)"
          that[0].style.msTransform = "translate(" + (pagesStartPosition + horizontalTouchDelta) + "px, 0)"
          that[0].style.MozTransform = "translateX(" + (pagesStartPosition + horizontalTouchDelta) + "px)"
          
          if (jQuery.browser.version == "8.0") {
            that[0].style.left = (pagesStartPosition + horizontalTouchDelta)
          }
        }
      }
    })
    
    $(document).bind('touchend.pageswipe mouseup.pageswipe', function(event) {
      touchDown = false
      e = event.originalEvent
      
      if (e.type == 'mouseup') {
        horizontalTouchEnd = e.clientX
      } else {
        horizontalTouchEnd = e.changedTouches[0].pageX
      }
      
      horizontalTouchDelta = horizontalTouchStart - horizontalTouchEnd
      
      if (scrollDirection == "h") {
        if (horizontalTouchDelta > 0 && currentPage < numberOfPages) {
          nextPosition = (-768 * (currentPage))
          that[0].style.WebkitTransition = 'all .2s ease-in-out'
          that[0].style.WebkitTransform = "translate3d("  + nextPosition + "px,0,0)"
          
          that[0].style.msTransition = 'all .2s ease-in-out'
          that[0].style.msTransform = "translate(" + nextPosition + "px, 0)"
          
          that[0].style.MozTransition = 'all .2s ease-in-out'
          that[0].style.MozTransform = "translateX("  + nextPosition + "px)"
          
          if (jQuery.browser.version == "8.0") {
            that[0].style.left = nextPosition
          }
          currentPage++
        } else if (horizontalTouchDelta < 0 && currentPage > 1) {
          currentPage--
          nextPosition = (-768 * (currentPage - 1))
          that[0].style.WebkitTransition = 'all .2s ease-in-out'
          that[0].style.WebkitTransform = "translate3d("  + nextPosition + "px,0,0)"
          
          that[0].style.msTransition = 'all .2s ease-in-out'
          that[0].style.msTransform = "translate(" + nextPosition + "px, 0)"
          
          that[0].style.MozTransition = 'all .2s ease-in-out'
          that[0].style.MozTransform = "translateX("  + nextPosition + "px)"
          
          if (jQuery.browser.version == "8.0") {
            that[0].style.left = nextPosition
          }
        }
      }
    })
    
    return this
  };
})( jQuery )
