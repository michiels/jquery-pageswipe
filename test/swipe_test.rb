require File.expand_path(File.dirname(__FILE__)) + '/test_helper'

class SwipeTest < CapybaraTestCase
  
  def test_swipe_moves_page
    visit "/"
    
    page.driver.mouse_down_at(100, 100)
    page.driver.mouse_move_at(50, 100)
    page.driver.mouse_up_at(20, 100)
    sleep 1
    
    assert_equal -763, css_matrix_for_selector('.pages')[0], "Expected .pages to have a left position of -768"
  end
  
  private
  
  def css_matrix_for_selector(css_selector)
    css_transform_matrix = page.driver.evaluate_script("$('#{css_selector}').css('-webkit-transform')")
    match = /matrix\(\d+, \d+, \d+, \d+, (-?\d+), (-?\d+)\)/.match(css_transform_matrix)
    [match[1], match[2]].map! { |x| x.to_i }
  end
  
end