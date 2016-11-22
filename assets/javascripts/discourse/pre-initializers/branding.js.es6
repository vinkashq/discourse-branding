import ApplicationRoute from 'discourse/routes/application';
import { siteTitle } from "discourse/plugins/branding/discourse/lib/computed";

export default {
  name: 'apply-branding',
  initialize() {
    ApplicationRoute.reopen({
      siteTitle: siteTitle(),
    });
  }
};
