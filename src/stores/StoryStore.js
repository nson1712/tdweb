import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'
import * as Api from '../api/api'

class StoryStore {

  categories = []
  collectionData = []

  favouriteCategories = []

  storyByCategory = {}

  storyDetail = {}

  chappers = []

  lastestStory = {}

  loadingStories = false

  topTrending = {}
  toidocStories = {}
  topViews = {}
  hotStories = []
  topNew = {}
  topFull = {}

  chapterDetail = []
  currentChapter = ''

  bookmark = {}
  viewings = {}
  history = {}

  bookmarkIds = []

  recentSearchs = {}

  collections1 = {}

  collections2 = {}

  collectionStories = {}

  loadingChapterDetail = false

  isClickAff = false


  constructor() {
    makeAutoObservable(this)
    this.getBookMark(1, 1000)
  }

  getcollections1 = async () => {
    try {
      const result = await Api.get({
        url: 'data/private/data/collections?page=1&pageSize=10'
      })

      this.collections1 = result.data
    } catch(e) {

    }
  }

  getcollections2 = async () => {
    try {
      const result = await Api.get({
        url: 'data/private/data/collections?page=2&pageSize=10'
      })

      this.collections2 = result.data
    } catch(e) {

    }
  }

  getRecentSearchs = async () => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/search/recent'
      })

      this.recentSearchs = result.data
    } catch(e) {

    }
  }

  saveStory = async (storySlug) => {
    try {
      const result = await Api.post({
        url: 'data/private/data/story/search/save',
        data: {
          storySlug
        }
      })

      this.recentSearchs = result.data
    } catch(e) {

    }
  }

  getChapterDetail = async (storySlug, slug) => {
    try {
      this.loadingChapterDetail = true
      if (this.currentChapter !== slug) {
        this.chapterDetail = []
        this.currentChapter = slug
      }
      const result = await Api.get({
        url: 'data/private/data/chapter/slug',
        params: {
          storySlug,
          slug
        }
      })

      this.chapterDetail = result.data

      this.loadingChapterDetail = false

      return result.data

      
    } catch(e) {
      console.log(e)
      this.loadingChapterDetail = false
    }
  }

  getStoryByCollection = async (page = 1, pageSize = 20, slug) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/collection/detail',
        params: {
          page,
          pageSize,
          slug
        }
      })

      if (page === 1) {
        this.collectionStories  = {...result.data, data: result.data.stories}
      } else {
        this.collectionStories = {
          ...result.data,
          data: [...this.collectionStories.data, ...result.data.stories]
        }
      }

      
    } catch(e) {
      console.log(e)
    }
  }

  getTopTrending = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/trending',
        params: {
          page,
          pageSize
        }
      })

      if (page === 1) {
        this.topTrending  = result.data
      } else {
        this.topTrending = {
          ...result.data,
          data: [...this.topTrending.data, ...result.data.data]
        }
      }

      
    } catch(e) {
      console.log(e)
    }
  }

  getToidocStories = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/toidoc',
        params: {
          page,
          pageSize
        }
      })

      if (page === 1) {
        this.toidocStories  = result.data
      } else {
        this.toidocStories = {
          ...result.data,
          data: [...this.toidocStories.data, ...result.data.data]
        }
      }

      
    } catch(e) {
      console.log(e)
    }
  }

  getTopViews = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/view/top',
        params: {
          page,
          pageSize,
          key: 'view'
        }
      })

      if (page === 1) {
        this.topViews  = result.data
      } else {
        this.topViews = {
          ...result.data,
          data: [...this.topViews.data, ...result.data.data]
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  getHotStories = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/hot1',
        params: {
          page,
          pageSize
        }
      })
      if (page === 1) {
        this.hotStories  = result.data
      } else {
        this.hotStories = {
          ...result.data,
          data: [...this.hotStories.data, ...result.data.data]
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  getTopNew = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/newest',
        params: {
          page,
          pageSize
        }
      })

      if (page === 1) {
        this.topNew  = result.data
      } else {
        this.topNew = {
          ...result.data,
          data: [...this.topNew.data, ...result.data.data]
        }
      }

    } catch(e) {
      console.log(e)
    }
  }

  getTopFull = async (page = 1, pageSize = 20) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/fulls',
        params: {
          page,
          pageSize
        }
      })

      if (page === 1) {
        this.topFull  = result.data
      } else {
        this.topFull = {
          ...result.data,
          data: [...this.topFull.data, ...result.data.data]
        }
      }
    } catch(e) {
      console.log(e)
    }
  }

  getCategories = async () => {
    try {
      const result = await Api.get({
        url: 'data/private/data/categories'
      })

      this.categories  = result.data
    } catch(e) {
      console.log(e)
    }
  }

  getFavouriteCategories = async () => {
    try {
      const result = await Api.get({
        url: '/customer/public/customer/categories'
      })

      this.favouriteCategories  = result.data
    } catch(e) {
      console.log(e)
    }
  }

  saveFavoriteCategories = async (categoryCodes) => {
    try {
      // const result = await Api.post({
      //   url: '/customer/public/customer/category/save',
      //   data: {
      //     categoryCodes
      //   }
      // })

      // this.categories  = result.data
    } catch(e) {
      console.log(e)
    }
  }

  getStoryByCategory = async (categoryCode, last = undefined, limit = 5, params = {}) => {
    try {
      this.loadingStories = true
      console.log('Start get category story')
      const result = await Api.get({
        url: 'data/private/data/category/stories1',
        params: {
          categoryCode,
          last,
          limit,
          ...params
        }
      })
      console.log('Start get category story: ', result)
      if (last === undefined) {
        this.storyByCategory = {
          ...this.storyByCategory,
          [categoryCode]: {
            ...result.data,
            data: result.data.list
          }
        }
      } else {
        this.storyByCategory = {
          ...this.storyByCategory,
          [categoryCode]: {
            ...result.data,
            data: [...this.storyByCategory[categoryCode]?.data, ...result.data.list]
          }
        }
      }

      this.loadingStories = false
     
    } catch(e) {
      console.log(e)
      this.loadingStories = false
    }
  }

  getStoryDetail = async (slug) => {
    try {
      if (slug !== this.storyDetail.slug) {
        this.storyDetail = {}
      }
      const result = await Api.get({
        url: 'data/private/data/story/detail',
        params: {
          slug: slug
        }
      })

      this.storyDetail = result.data
    } catch(e) {
      console.log(e)
    }
  }

  findStories = async (keyword, last, limit) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/story/search',
        params: {
          keyword,
          last,
          limit
        }
      })

    } catch(e) {
      console.log(e)
    }
  }

  saveLastStory = async (data) => {
    try {
      // await Api.post({
      //   url: '/customer/public/story/history/save',
      //   data: data,
      //   hideError: true
      // })

    } catch(e) {
      console.log(e)
    }
  }

  getLastStory = async () => {
    try {
      // const result = await Api.get({
      //   url: '/customer/public/story/latest',
      //   hideError: true
      // })

      // this.lastestStory = result.data

    } catch(e) {
      console.log(e)
    }
  }

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

    } catch(e) {
      console.log(e)
    }
  }

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

    } catch(e) {
      console.log(e)
    }
  }

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

    } catch(e) {
      console.log(e)
    }
  }

  getStoryHistory = async (page = 1, pageSize = 10) => {
    try {
      // const result = await Api.get({
      //   url: '/customer/public/story/reads',
      //   params: {
      //     page,
      //     pageSize
      //   },
      //   hideError: true
      // })

      // if (page === 1) {
      //   this.history  = result
      // } else {
      //   this.history = {
      //     ...result,
      //     data: [...this.history.data, ...result.data]
      //   }
      // }

    } catch(e) {
      console.log(e)
    }
  }

  getStoryViewings = async (page = 1, pageSize = 10) => {
    try {
      // const result = await Api.get({
      //   url: '/customer/public/story/viewings?pageSize=10',
      //   params: {
      //     page
      //   },
      //   hideError: true
      // })

      // if (page === 1) {
      //   this.viewings  = result
      // } else {
      //   this.viewings = {
      //     ...result,
      //     data: [...this.viewings.data, ...result.data]
      //   }
      // }

    } catch(e) {
      console.log(e)
    }
  }

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
  }

  saveViewStory = (slug) => {
    Api.post({
      url: 'data/private/data/view/save',
      data: {
        storySlug: slug
      },
      hideError: true
    })
  }


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
  }

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
  }

  getCollections = async (page = 1, size = 20) => {
    try {
      const result = await Api.get({
        url: 'data/private/data/collections',
        params: {
          page,
          pageSize: size
        },
        hideError: true
      })

      if (page === 1) {
        this.collectionData  = result?.data
      } else {
        this.collectionData = {
          ...result?.data,
          data: [...this.collectionData.data, ...result.data?.data]
        }
      }

    } catch(e) {
      console.log(e)
    }
  }

}

export default new StoryStore()