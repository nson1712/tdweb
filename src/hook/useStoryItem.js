import { useMemo } from "react";
import { StoryConfigurationService } from "../config/storyConfig";

export const useStoryItem = (storyData, configService = new StoryConfigurationService()) => {
  const config = configService;
  
  const processedData = useMemo(() => ({
    title: storyData.title || "",
    slug: storyData.slug || "",
    coverImage: storyData.coverImage || null,
    status: storyData.status || "",
    rate: storyData.rate || 0,
    totalView: storyData.totalView || 0,
    mainCategories: storyData.mainCategories || [],
    config
  }), [storyData, config]);

  return processedData;
}; 