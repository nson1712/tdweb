
export const STORY_CONFIG = {
  HOT_THRESHOLD: 500000,
  MAX_CATEGORIES: 1,
  ACTIVE_STATUS: 'ACTIVE',
  IMAGE_DIMENSIONS: {
    width: 200,
    height: 266
  }
};

export class StoryConfigurationService {
  constructor(config = STORY_CONFIG) {
    this.config = config;
  }

  getHotThreshold() {
    return this.config.HOT_THRESHOLD;
  }

  getMaxCategories() {
    return this.config.MAX_CATEGORIES;
  }

  getActiveStatus() {
    return this.config.ACTIVE_STATUS;
  }

  getImageDimensions() {
    return this.config.IMAGE_DIMENSIONS;
  }
} 