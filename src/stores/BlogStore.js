import { makeAutoObservable, runInAction } from "mobx";
import * as Api from "../api/api";

class BlogStore {

  storyDetailArticle = {}

  constructor() {
    makeAutoObservable(this)
  }

  getBlogStoryDetail = async (storySlug) => {
    try {
      if (storySlug) {
        const result = await Api.get({
          url: `/data/article/story/${storySlug}`,
        });
        runInAction(() => {
          this.storyDetailArticle = result.data;
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

}

export default new BlogStore();
