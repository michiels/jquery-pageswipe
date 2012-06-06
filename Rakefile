require 'closure-compiler'

desc "Minimizes the plugin for distribution with Closure"
task :minimize do
  compiled = Closure::Compiler.new.compile(File.read("pageswipe/jquery.pageswipe.js"))
  puts compiled
end

desc "Run tests"
task :test
  
end