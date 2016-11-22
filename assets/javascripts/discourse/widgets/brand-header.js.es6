import { createWidget, applyDecorators } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

const flatten = array => [].concat.apply([], array);

generalLinks() {
  const { siteSettings } = this;
  const links = [];

  if(siteSettings.brand_home_link_enabled) {
    links.push({ href: siteSettings.brand_url, className: 'brand-home-link', label: 'brand.home' });
  }

  const extraLinks = flatten(applyDecorators(this, 'generalLinks', this.attrs, this.state));
  return links.concat(extraLinks).map(l => this.attach('link', l));
};

export default createWidget('brand-header', {
  tagName: 'header.b-header.clearfix',
  buildKey: () => `header`,

  html(attrs, state) {
    const { siteSettings } = this;
    const results = [];

    results.push(this.attach('brand-logo'));

    results.push(this.attach('menu-links', { contents: () => this.generalLinks() }));

    return h('div.wrap', h('div.contents.clearfix', { contents: () => results }));
  }

});
