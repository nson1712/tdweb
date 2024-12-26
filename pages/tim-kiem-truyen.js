import React from 'react'
import SearchComponent from '../src/pages/Search'
import HeaderServer from '../src/components/HeaderServer'

const Search = () => {
  return (
    <>
      <HeaderServer canonical='https://toidoc.vn/tim-kiem-truyen'
                    title = "Tìm kiếm Truyện Full| Nền tảng cộng cồng đọc truyện Online Toidoc"
                    description= "Trang tìm kiếm truyện full theo tên truyện, tên nhân vật, tên tác giả một cách nhanh chóng và đầy đủ. Bạn có thể tìm kiếm bất cứ truyện gì mà bạn muốn"/>
      <SearchComponent />
    </>
  )
}

export default Search
