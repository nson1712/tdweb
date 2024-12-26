import React from 'react'
import SelectTypeComponent from '../src/pages/SelectType'
import HeaderServer from '../src/components/HeaderServer'



const SelectType = () => {
  return (
    <>
      <HeaderServer description="Danh sách các thể loại truyện online mà bạn có thể thích. Bạn lựa chọn và hệ thống sẽ gợi ý cho bạn các loại truyện full hợp lý nhất"
                    canonical="https://toidoc.vn/the-loai-yeu-thich"/>
      <SelectTypeComponent />
    </>
  )
}

export default SelectType
