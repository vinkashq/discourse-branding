# name: branding
# about: Plugin to add a custom brand header for Discourse
# version: 0.0.1
# authors: Vinoth Kannan (vinothkannan@vinkas.com)
# url: https://github.com/vinkas0/discourse-branding

enabled_site_setting :branding_enabled

register_asset 'stylesheets/branding.scss'
register_asset "javascripts/branding.js"
