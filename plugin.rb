# name: branding
# about: Plugin to add a custom brand header for Discourse
# version: 0.0.1
# authors: Vinoth Kannan (vinothkannan@vinkas.com)
# url: https://github.com/vinkas0/discourse-branding

enabled_site_setting :branding_enabled

register_asset 'stylesheets/branding.scss'
register_asset "javascripts/branding.js"

after_initialize do
  ApplicationController.class_eval do
    def set_layout
      if use_crawler_layout?
        'crawler'
      else
        File.expand_path('../app/views/layouts/application.html.erb', __FILE__)
      end
    end
  end
end
