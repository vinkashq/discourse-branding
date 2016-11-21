import { createWidget } from 'discourse/widgets/widget';
import DiscourseURL from 'discourse/lib/url';
import { wantsNewWindow } from 'discourse/lib/intercept-click';

import { h } from 'virtual-dom';

createWidget('brand-menu-item', {
  tagName: 'li',

  html(attrs) {
    h('a', { attributes: { href: attrs.href, 'data-auto-route': true } }, attrs.text);
  }
});

createWidget('brand-navigation', {
  tagName: 'ul.b-navigation',

  html(attrs) {
    const menuItems = [];


    menuItems.push(this.attach('brand-menu-item', { href: '/',
                                                    text: 'Home' }));
    return menuItems;
  }
});

export default createWidget('brand-header', {
  tagName: 'header.b-header.clearfix',
  buildKey: () => `header`,

  html(attrs, state) {

    const contents = [ this.attach('brand-logo', attrs), this.attach('brand-navigation', attrs) ];

    return h('div.wrap', h('div.contents.clearfix', contents));
  }

});
