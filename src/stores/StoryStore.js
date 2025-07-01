import { makeAutoObservable, runInAction, toJS } from "mobx";
import GlobalStore from "./GlobalStore";
import * as Api from "../api/api";
import { decryptData } from "../utils/utils";
import { getItem } from "../utils/storage";

class StoryStore {
  categories = [];
  collectionData = [];

  favouriteCategories = [];

  storyByCategory = {};

  storiesByHashtag = {};

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

  ratingsByStory = {};

  myRating = {};

  comments = {};

  modalComments = {};

  hashtags = {};

  stories = {};

  loadingChapterDetail = false;

  isClickAff = false;

  isOpenFull = false;

  constructor() {
    makeAutoObservable(this);
    this.getBookMark(1, 1000);
  }

  setIsOpenFull = (value) => {
    runInAction(() => {
      this.isOpenFull = value;
    });
  };

  resetDataHastag = async () => {
    this.hashtags = {};
  };

  getStories = async (
    categoryCode,
    page = 1,
    size = 20,
    keyword,
    sortBy = "totalView",
    sortDirection = "DESC",
    chapterMin,
    chapterMax,
    status
  ) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story",
        params: {
          categoryCode,
          page,
          size,
          keyword,
          sortBy,
          sortDirection,
          chapterMin,
          chapterMax,
          status,
        },
        hideError: true,
      });

      runInAction(() => {
        this.stories = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getStories1 = async ({
    categoryCode,
    page = 1,
    size = 20,
    keyword,
    sortBy = "totalView",
    sortDirection = "DESC",
    chapterMin,
    chapterMax,
    status,
  }) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story",
        params: {
          categoryCode,
          page,
          size,
          keyword,
          sortBy,
          sortDirection,
          chapterMin,
          chapterMax,
          status,
        },
        hideError: true,
      });

      runInAction(() => {
        this.stories = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getcollections1 = async () => {
    try {
      const result = await Api.get({
        url: "data/private/data/collections?page=1&pageSize=10",
        hideError: true,
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
        hideError: true,
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
        hideError: true,
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
        hideError: true,
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
      if (storySlug !== "") {
        const result = await Api.get({
          url: "/data/private/data/story/price",
          params: {
            slug: storySlug,
          },
          hideError: true,
        });

        return result.data;
      }
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
        hideError: true,
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
        hideError: true,
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

  getTopTrending = async (page = 0, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/trending",
        params: {
          page,
          pageSize,
        },
        hideError: true,
      });

      runInAction(() => {
        this.topTrending = result.data;
      });
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
        hideError: true,
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
        hideError: true,
      });

      runInAction(() => {
        this.topViews = result.data;
      });
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
          size: pageSize,
        },
        hideError: true,
      });

      runInAction(() => {
        this.hotStories = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getTopNew = async (page = 0, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/newest",
        params: {
          page,
          pageSize,
        },
        hideError: true,
      });

      runInAction(() => {
        this.topNew = result.data;
      });
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
        hideError: true,
      });

      runInAction(() => {
        this.topFull = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getCategories = async () => {
    try {
      const result = await Api.get({
        url: "data/private/data/categories",
        hideError: true,
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
        hideError: true,
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
        hideError: true,
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
      if (slug !== this.storyDetail?.slug) {
        this.storyDetail = {};
      }
      const result = await Api.get({
        url: "data/private/data/story/detail",
        params: {
          slug: slug,
        },
      });

      runInAction(() => {
        this.storyDetail = result.data;
      });

      return this.storyDetail;
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
        hideError: true,
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

  getRatings = async (page = 0, size = 20) => {
    try {
      const result = await Api.get({
        url: "data/web/rating/v2/list",
        params: {
          page,
          size,
        },
        hideError: true,
      });

      runInAction(() => {
        this.ratings = result.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getRatingsByStory = async ({ page, size = 20, parentId, isLoggedIn }) => {
    try {
      const result = await Api.get({
        url: isLoggedIn
          ? "/data/web/rating/list"
          : "/data/web/rating/anonymous/list",
        params: {
          page,
          size,
          type: "STORY",
          parentId: parentId,
        },
        hideError: true,
      });

      if (page === 0) {
        runInAction(() => {
          this.ratingsByStory = result?.data;
        });
      } else {
        runInAction(() => {
          this.ratingsByStory = {
            ...result?.data,
            data: [...this.ratingsByStory?.data, ...result.data?.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getMyRating = async ({ parentId }) => {
    try {
      const result = await Api.get({
        url: "/data/web/rating/mine",
        params: {
          type: "STORY",
          parentId: parentId,
        },
      });

      runInAction(() => {
        this.myRating = result.data;
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  getHashtags = async (page = 0, size = 20) => {
    try {
      const result = await Api.get({
        url: "data/private/hash-tag/popular",
        params: {
          page,
          size,
        },
        hideError: true,
      });

      if (page === 0) {
        runInAction(() => {
          this.hashtags = result?.data;
        });
      } else {
        runInAction(() => {
          this.hashtags = {
            ...result?.data,
            data: [...this.hashtags?.data, ...result.data?.data],
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getStoriesByHashtag = async (page = 0, size = 20, hashtag) => {
    try {
      const result = await Api.get({
        url: "data/private/data/story/search-by-hashtag",
        params: {
          hashtag,
          page,
          size,
        },
        hideError: true,
      });

      runInAction(() => {
        this.storiesByHashtag = result?.data;
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleLikeUnlike = async (id, isLike, parentId) => {
    try {
      const url = isLike
        ? `/data/web/rating/${id}/unlike`
        : `/data/web/rating/${id}/like`;

      await Api.post({
        url: url,
        data: {
          id: id,
        },
      });

      await this.getRatingsByStory({
        page: 0,
        parentId: parentId,
      });
    } catch (error) {
      console.error("Error while toggling like:", error);
    }
  };

  getComments = async (page, size, parentId, isLoggedIn, isModal = false) => {
    try {
      const result = await Api.get({
        url: isLoggedIn
          ? "/data/web/comment/list"
          : "/data/web/comment/anonymous/list",
        params: {
          type: "CHAPTER",
          page,
          size,
          parentId,
        },
      });

      runInAction(() => {
        if (!isModal) {
          // inline
          this.comments = result.data;
        } else {
          // modal
          if (page === 0) {
            this.modalComments = result.data;
          } else {
            this.modalComments = {
              ...result.data,
              data: [...this.modalComments.data, ...result.data.data],
            };
          }
        }
      });
    } catch (e) {
      console.log("Error while fetching comments: ", e);
    }
  };
}

export default new StoryStore();
