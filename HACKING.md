# Hacking

This file provides a bit of information on how to hack on jquery-pageswipe
and get your development environment up and running.

## Tests

There is a test suite available in `tests/` that uses Capybara, PhantomJS and
Poltergeist to test certain aspects of this plugin. The basic idea is the 
following:

* Run your tests with `rake test`
* It uses a Rack app in `tests/app.rb` to "start up" the demo in Capybara.
* It runs the test cases in `tests/*_test.rb`

## In iOS Simulator on Mac OS X

The iOS Simulator on the newest XCode has to be manually installed and is
located at:

```
/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/iPhone Simulator.app
```

To open the demo in the iOS Simulator, a config.ru file is provided in this
recipe. This way you can open up a local web server to access the demo in the
simulator:

``` sh
gem install rack
cd jquery-pageswipe
rackup -p 3000
```

Then, open up

  `http://localhost:3000/demo/index.html`
