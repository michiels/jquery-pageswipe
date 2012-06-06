require 'test/unit'
require 'capybara'
require 'capybara/dsl'
require 'capybara/poltergeist'
require './test/app'

Capybara.app = App.run
Capybara.default_driver = :poltergeist

class CapybaraTestCase < Test::Unit::TestCase
  include Capybara::DSL
end