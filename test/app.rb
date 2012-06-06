require 'rack'

class App
  def self.run
    return Rack::Builder.new {
      use ::Rack::Static,
        :urls => ["/demo", "/pageswipe", "/demo/assets"],
        :root => "."

      run lambda { |env|
          [
            200, 
            {
              'Content-Type'  => 'text/html', 
              'Cache-Control' => 'public, max-age=86400' 
            },
            File.open('demo/index.html', File::RDONLY)
          ]
        }
    }
  end
end