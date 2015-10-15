require "liquid"

module Jekyll
  module WidontFilter
    
    def widont(text)
      text.gsub(/\b\s(\S*?)$/, '&nbsp;\1')
    end

  end
end

Liquid::Template.register_filter(Jekyll::WidontFilter)
