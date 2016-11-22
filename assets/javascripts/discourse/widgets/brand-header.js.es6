import { createWidget, applyDecorators } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

const flatten = array => [].concat.apply([], array);

createWidget('nav-links', {
  tagName: 'nav.links',

  html(attrs) {
    const links = [].concat(attrs.contents());
    const liOpts = { };

    const result = [];
    result.push(h('ul.nav.nav-pills', links.map(l => h('li', liOpts, l))));

    return result;
  }
});

export default createWidget('brand-header', {
  tagName: 'header.b-header.clearfix',
  buildKey: () => `header`,

  defaultState() {
    return { generalLinks: [], socialIcons: [], isLoaded: false};
  },

  load() {
    var self = this;
    this.store.findAll('menu-link').then(function(rs) {
      rs.content.forEach(function(l) {
        if(l.visible_brand_general) {
          self.state.generalLinks.push({ href: l.url, rawLabel: l.name });
        }
        if(l.visible_brand_social) {
          self.state.socialIcons.push({ href: l.url, rawLabel: l.name });
        }
      });
      self.state.isLoaded = true;
      self.scheduleRerender();
    });
  },

  generalLinks() {
    const { siteSettings } = this;

    if(siteSettings.brand_home_link_enabled) {
      this.state.generalLinks.push({ href: siteSettings.brand_url, className: 'brand-home-link', label: 'brand.home' });
    }

    const extraLinks = flatten(applyDecorators(this, 'generalLinks', this.attrs, this.state));
    return this.state.generalLinks.concat(extraLinks).map(l => this.attach('link', l));
  },

  html(attrs, state) {
    const { siteSettings } = this;
    const contents = [];


    if(siteSettings.navigation_enabled && this.state.isLoaded == false) {
      this.load();
    }

    contents.push(this.attach('brand-logo'));

    contents.push(this.attach('nav-links', { contents: () => this.generalLinks() }));

    return h('div.wrap', h('div.contents.clearfix', contents));
  }

});
