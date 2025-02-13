import { makeAutoObservable, runInAction } from "mobx";
import GlobalStore from "./GlobalStore";
import * as Api from "../api/api";
import { decryptData } from "../utils/utils";
import { getItem } from "../utils/storage";

class StoryStore {
  categories = [];
  collectionData = [];

  favouriteCategories = [];

  storyByCategory = {};

  storyDetail = {};

  chappers = [];

  latestReadingChapter = {};

  lastestStory = {};

  loadingStories = false;

  topTrending = {};
  toidocStories = {};
  topViews = {};
  hotStories = [];
  topNew = {};
  topFull = {};

  chapterDetail = [];
  currentChapter = "";

  bookmark = {};
  viewings = {};
  history = {};

  bookmarkIds = [];

  recentSearchs = {};

  collections1 = {};

  collections2 = {};

  collectionStories = {};

  ratings = {};

  hashtags = {};

  loadingChapterDetail = false;

  isClickAff = false;

  constructor() {
    makeAutoObservable(this);
    this.getBookMark(1, 1000);
  }

  getcollections1 = async () => {
    try {
      const result = await Api.get({
        url: "data/private/data/collections?page=1&pageSize=10",
      });

      runInAction(() => {
        this.collections1 = result.data;
      });
    } catch (e) {}
  };

  getcollections2 = async () => {
    try {
      const result = await Api.get({
        url: "data/private/data/collections?page=2&pageSize=10",
      });

      runInAction(() => {
        this.collections2 = result.data;
      });
    } catch (e) {}
  };

  getRecentSearchs = async () => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/search/recent",
      });

      runInAction(() => {
        this.recentSearchs = result.data;
      });
    } catch (e) {}
  };

  saveStory = async (storySlug) => {
    try {
      const result = await Api.post({
        url: "data/private/data/story/search/save",
        data: {
          storySlug,
        },
      });

      runInAction(() => {
        this.recentSearchs = result.data;
      });
    } catch (e) {}
  };

  getChapterDetail = async (storySlug, slug, isLoggedIn) => {
    try {
      this.loadingChapterDetail = true;

      const result = await Api.get({
        url: isLoggedIn
          ? "/data/private/data/chapter/detail"
          : "/data/private/data/chapter/slug",
        params: {
          storySlug,
          slug,
        },
      });

      const contents = result.data?.contents?.map((obj, i) => {
        // Decrypt the `encryptedContent` field
        const decryptedContent = obj.content;
        let isCanvas = true;
        if (result.data?.contents.length > 7) {
          if (
            i > result.data?.contents.length - 3 ||
            i < result.data?.contents.length - 5
          ) {
            isCanvas = false;
            decryptedContent = decryptData(obj.content);
          }
        } else {
          isCanvas = false;
          decryptedContent = decryptData(obj.content);
        }

        // Return a new object with the decrypted content
        return {
          ...obj,
          content: decryptedContent, // Add or replace the decrypted content field
          isCanvas: isCanvas,
        };
      });

      this.loadingChapterDetail = false;
      runInAction(() => {
        this.chapterDetail = {
          ...result.data,
          contents,
        };
      });

      return this.chapterDetail;
    } catch (e) {
      console.log(e);
      this.loadingChapterDetail = false;
    }
  };

  getStoryPrice = async (storySlug) => {
    try {
      const result = await Api.get({
        url: "/data/private/data/story/price",
        params: {
          slug: storySlug,
        },
      });

      return result.data;
    } catch (e) {
      console.log(e);
    }
  };

  getReadingLatestChapter = async (storySlug) => {
    try {
      const result = await Api.get({
        url: "/data/private/data/story/reading/progress",
        params: {
          storySlug,
        },
      });

      runInAction(() => {
        this.latestReadingChapter = result.data;
      });
      return result.data;
    } catch (e) {
      console.log(e);
    }
  };

  getStoryByCollection = async (page = 1, pageSize = 20, slug) => {
    try {
      const result = await Api.get({
        url: "data/private/data/collection/detail",
        params: {
          page,
          pageSize,
          slug,
        },
      });

      if (page === 1) {
        runInAction(() => {
          this.collectionStories = {
            ...result.data,
            data: result.data.stories,
          };
        });
      } else {
        runInAction(() => {
          this.collectionStories = {
            ...result.data,
            data: [...this.collectionStories.data, ...result.data.stories],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getTopTrending = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/trending",
        params: {
          page,
          pageSize,
        },
      });

      if (page === 1) {
        runInAction(() => {
          this.topTrending = result.data;
        });
      } else {
        runInAction(() => {
          this.topTrending = {
            ...result.data,
            data: [...this.topTrending.data, ...result.data.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getToidocStories = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/toidoc",
        params: {
          page,
          pageSize,
        },
      });

      if (page === 1) {
        runInAction(() => {
          this.toidocStories = result.data;
        });
      } else {
        runInAction(() => {
          this.toidocStories = {
            ...result.data,
            data: [...this.toidocStories.data, ...result.data.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getTopViews = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/view/top",
        params: {
          page,
          pageSize,
          key: "view",
        },
      });

      runInAction(() => {
        this.topViews = result.data;
      });

      // if (page === 1) {
      //   runInAction(() => {
      //     this.topViews = result.data;
      //   });
      // } else {
      //   runInAction(() => {
      //     this.topViews = {
      //       ...result.data,
      //       data: [...this.topViews.data, ...result.data.data],
      //     };
      //   });
      // }
    } catch (e) {
      console.log(e);
    }
  };

  getHotStories = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/hot1",
        params: {
          page,
          pageSize,
        },
      });
      if (page === 1) {
        runInAction(() => {
          this.hotStories = result.data;
        });
      } else {
        runInAction(() => {
          this.hotStories = {
            ...result.data,
            data: [...this.hotStories.data, ...result.data.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getTopNew = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/newest",
        params: {
          page,
          pageSize,
        },
      });

      if (page === 1) {
        runInAction(() => {
          this.topNew = result.data;
        });
      } else {
        runInAction(() => {
          this.topNew = {
            ...result.data,
            data: [...this.topNew.data, ...result.data.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getTopFull = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/fulls",
        params: {
          page,
          pageSize,
        },
      });

      if (page === 1) {
        runInAction(() => {
          this.topFull = result.data;
        });
      } else {
        runInAction(() => {
          this.topFull = {
            ...result.data,
            data: [...this.topFull.data, ...result.data.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getCategories = async () => {
    try {
      const result = await Api.get({
        url: "data/private/data/categories",
      });

      runInAction(() => {
        this.categories = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getFavouriteCategories = async () => {
    try {
      const result = await Api.get({
        url: "/customer/public/customer/categories",
      });

      runInAction(() => {
        this.favouriteCategories = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  saveFavoriteCategories = async (categoryCodes) => {
    try {
      // const result = await Api.post({
      //   url: '/customer/public/customer/category/save',
      //   data: {
      //     categoryCodes
      //   }
      // })
      // this.categories  = result.data
    } catch (e) {
      console.log(e);
    }
  };

  getStoryByCategory = async (
    categoryCode,
    last = undefined,
    limit = 5,
    params = {}
  ) => {
    try {
      this.loadingStories = true;
      const result = await Api.get({
        url: "data/private/data/category/stories1",
        params: {
          categoryCode,
          last,
          limit,
          ...params,
        },
      });

      if (last === undefined) {
        runInAction(() => {
          this.storyByCategory = {
            ...this.storyByCategory,
            [categoryCode]: {
              ...result.data,
              data: result.data.list,
            },
          };
        });
      } else {
        runInAction(() => {
          this.storyByCategory = {
            ...this.storyByCategory,
            [categoryCode]: {
              ...result.data,
              data: [
                ...this.storyByCategory[categoryCode]?.data,
                ...result.data.list,
              ],
            },
          };
        });
      }

      this.loadingStories = false;
    } catch (e) {
      console.log(e);
      this.loadingStories = false;
    }
  };

  getStoryDetail = async (slug) => {
    try {
      if (slug !== this.storyDetail.slug) {
        this.storyDetail = {};
      }
      const result = await Api.get({
        url: "data/private/data/story/detail",
        params: {
          slug: slug,
        },
      });

      runInAction(() => {
        runInAction(() => {
          this.storyDetail = result.data;
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  findStories = async (keyword, last, limit) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/search",
        params: {
          keyword,
          last,
          limit,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  saveLastStory = async (storySlug, chapterSlug) => {
    try {
      Api.post({
        url: "/data/private/data/story/reading/progress",
        data: {
          eventName: "READ_CHAPTER",
          screenName: "STORY_CONTENT",
          eventProperties: {
            storySlug: storySlug,
            chapterSlug: chapterSlug,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  getLastStory = async () => {
    try {
      // const result = await Api.get({
      //   url: '/customer/public/story/latest',
      //   hideError: true
      // })
      // this.lastestStory = result.data
    } catch (e) {
      console.log(e);
    }
  };

  saveBookMark = async (slug, storyId) => {
    try {
      // await Api.post({
      //   url: '/customer/public/story/bookmark/save',
      //   data: {
      //     storySlug: slug
      //   }
      // })
      // this.bookmarkIds = [...this.bookmarkIds, storyId]
      // toast('Lưu truyện thành công', {
      //   type: "success",
      //   theme: "colored",
      // })
    } catch (e) {
      console.log(e);
    }
  };

  unBookMark = async (slug, storyId) => {
    try {
      // await Api.post({
      //   url: '/customer/public/story/unbookmark/save',
      //   data: {
      //     storySlug: slug
      //   }
      // })
      // this.bookmarkIds = this.bookmarkIds.filter((item) => item !== storyId)
      // toast('Huỷ truyện thành công', {
      //   type: "success",
      //   theme: "colored",
      // })
    } catch (e) {
      console.log(e);
    }
  };

  getBookMark = async (page = 1, pageSize = 10) => {
    try {
      // const result = await Api.get({
      //   url: '/customer/public/story/bookmarks',
      //   params: {
      //     page,
      //     pageSize
      //   },
      //   hideError: true
      // })
      // if (page === 1) {
      //   this.bookmark  = result
      // } else {
      //   this.bookmark = {
      //     ...result,
      //     data: [...this.bookmark.data, ...result.data]
      //   }
      // }
      // this.bookmarkIds = result.data.map((item) => item.id)
    } catch (e) {
      console.log(e);
    }
  };

  getStoryHistory = async (page = 0, size = 100) => {
    try {
      try {
        const result = await Api.get({
          url: "/data/private/data/customer/reading",
          params: {
            page,
            size,
            reading: false,
          },
          hideError: true,
        });

        if (page === 0) {
          runInAction(() => {
            this.history = result?.data;
          });
        } else {
          runInAction(() => {
            this.history = {
              data: [...this.history.data, ...result?.data?.data],
            };
          });
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  getStoryViewings = async (page = 0, size = 100) => {
    try {
      const result = await Api.get({
        url: "/data/private/data/customer/reading",
        params: {
          page,
          size,
          reading: true,
        },
        hideError: true,
      });

      if (page === 0) {
        runInAction(() => {
          this.viewings = result?.data;
        });
      } else {
        runInAction(() => {
          this.viewings = {
            data: [...this.viewings.data, ...result?.data?.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  checkCustomerClickAff = async (guid) => {
    return true;
    // try {
    //   const result = await Api.get({
    //     url: 'data/shopee/aff/click/aff',
    //     params: {
    //       guid
    //     },
    //     hideError: true
    //   })
    //   console.log('result: ', result)
    //   return result.data

    // } catch(e) {
    //   console.log(e)
    // }
  };

  saveViewStory = (slug) => {
    Api.post({
      url: "data/private/data/view/save",
      data: {
        storySlug: slug,
      },
      hideError: true,
    });
  };

  saveCustomerClickBanner = async (code) => {
    // try {
    //   const result = await Api.get({
    //     url: 'data/private/data/banner/click',
    //     params: {
    //       code
    //     }
    //   })
    //   this.chappers = result.data
    // } catch(e) {
    //   console.log(e)
    // }
  };

  recordClickAff = async (deviceId, code) => {
    // try {
    //   const result = await Api.get({
    //     url: 'data/shopee/aff/click/aff/record',
    //     params: {
    //       guid: deviceId,
    //       productCode: code
    //     }
    //   })
    //   this.chappers = result.data
    // } catch(e) {
    //   console.log(e)
    // }
  };

  getCollections = async (page = 1, size = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/collections",
        params: {
          page,
          pageSize: size,
        },
        hideError: true,
      });

      if (page === 1) {
        runInAction(() => {
          this.collectionData = result?.data;
        });
      } else {
        runInAction(() => {
          this.collectionData = {
            ...result?.data,
            data: [...this.collectionData.data, ...result.data?.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getRatings = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "https://uatapi.truyenso1.xyz/data/web/rating/v2/list",
        params: {
          page,
          pageSize,
        },
      });

      runInAction(() => {
        this.ratings = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getHashtags = async (page = 1, size = 22) => {
    try {
      const result = await Api.get({
        url: "https://uatapi.truyenso1.xyz/data/private/hash-tag/popular",
        params: {
          page,
          size,
        },
      });

      runInAction(() => {
        this.hashtags = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };
}

  

export default new StoryStore();
