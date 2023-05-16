import TagManager from 'react-gtm-module';

class TaggingService {
  init() {
    const tagManagerArgs = {
      gtmId: 'GTM-5C3Q2FX'
    };
    TagManager.initialize(tagManagerArgs);
  }
}

export default new TaggingService();