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
    return { generalLinks: [], socialIcons: [], loading: true};
  },

  load() {
    if(this.state.loading) {
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
        self.state.loading = false;
        //self.scheduleRerender();
      });
    }
  },

  generalLinks() {
    if(this.state.loading) {
      const { siteSettings } = this;

      if(siteSettings.brand_home_link_enabled) {
        this.state.generalLinks.push({ href: siteSettings.brand_url, className: 'brand-home-link', label: 'brand.home' });
      }

      const extraLinks = flatten(applyDecorators(this, 'generalLinks', this.attrs, this.state));
      this.state.generalLinks.concat(extraLinks).map(l => this.attach('link', l));
    }
    return this.state.generalLinks;
  },

  html(attrs, state) {
    const { siteSettings } = this;
    const contents = [];

    contents.push(this.attach('brand-logo'));

    contents.push(this.attach('nav-links', { contents: () => this.generalLinks() }));

    if(siteSettings.navigation_enabled) {
      this.load();
    }

    return h('div.wrap', h('div.contents.clearfix', contents));
  }

});
