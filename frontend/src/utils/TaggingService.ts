import TagManager from 'react-gtm-module'

class TaggingService {
  // empty constructor
  constructor() {
  }

  // initialize third party service
  init() {
    // TODO remove id from here
    const tagManagerArgs = {
      gtmId: 'GTM-5C3Q2FX'
    }
    TagManager.initialize(tagManagerArgs)
  }
}

export default new TaggingService()
