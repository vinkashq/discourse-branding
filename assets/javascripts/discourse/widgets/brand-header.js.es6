import { createWidget } from 'discourse/widgets/widget';
import DiscourseURL from 'discourse/lib/url';
import { wantsNewWindow } from 'discourse/lib/intercept-click';

import { h } from 'virtual-dom';

createWidget('brand-menu-item', {
  tagName: 'li',

  html(attrs) {
    return h('a', { attributes: { href: attrs.href, 'data-auto-route': true } }, attrs.text);
  }
});

createWidget('brand-navigation', {
  tagName: 'ul.b-navigation',

  html(attrs) {
    const menuItems = [];

    if(attrs.brand_home.enabled) {
      menuItems.push(this.attach('brand-menu-item', { href: attrs.brand_home.url,
                                                      text: I18n.t('brand.home') }));
    }
    return menuItems;
  }
});

export default createWidget('brand-header', {
  tagName: 'header.b-header.clearfix',
  buildKey: () => `header`,

  html(attrs, state) {
    const { siteSettings } = this;
    const contents = [ this.attach('brand-logo', { home: { enabled: siteSettings.brand_home_link_enabled,
                                                           url: siteSettings.brand_url } }),
                       this.attach('brand-navigation', attrs) ];

    return h('div.wrap', h('div.contents.clearfix', contents));
  }

});
