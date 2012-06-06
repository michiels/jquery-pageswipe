require 'rake/testtask'
require 'closure-compiler'

desc "Minimizes the plugin for distribution with Closure"
task :minimize do
  compiled = Closure::Compiler.new.compile(File.read("pageswipe/jquery.pageswipe.js"))
  puts compiled
end

Rake::TestTask.new do |t|
  t.test_files = FileList['test/*_test.rb']
  t.verbose = true
end

task :default => [:test]