# source "https://rubygems.org"
source "https://gems.ruby-china.com"

gem "jekyll", "~> 4.2.0"
# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.5.1"  
gem "webrick"
# If you have any plugins, put them here!
group :jekyll_plugins do
#  gem "jekyll-feed", "~> 0.12"
gem "jekyll-paginate"
gem "html-proofer"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
 gem "tzinfo", "~> 2.0.4"
 gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

