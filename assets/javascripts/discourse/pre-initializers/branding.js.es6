import ApplicationRoute from 'discourse/routes/application';
import { siteTitle } from "discourse/plugins/branding/lib/computed";

export default {
  name: 'apply-branding',
  initialize() {
    ApplicationRoute.reopen({
      siteTitle: siteTitle(),
    });
  }
};
