import { createWidget } from 'discourse/widgets/widget';
import DiscourseURL from 'discourse/lib/url';
import { wantsNewWindow } from 'discourse/lib/intercept-click';

import { h } from 'virtual-dom';

export default createWidget('brand-header', {
  tagName: 'header.b-header.clearfix',
  buildKey: () => `header`,

  html(attrs, state) {

    const contents = [ this.attach('brand-logo', attrs) ];

    return h('div.wrap', h('div.contents.clearfix', contents));
  }
  
});
