import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Header from '../../components/Header/Header'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import StoryStore from '../../stores/StoryStore'
import Router from 'next/router'


const SelectType = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const { categories, getCategories, saveFavoriteCategories } = StoryStore
 
  useEffect(() => {
    getCategories()
  }, [])

  console.log('selectedCategories', selectedCategories)

  const onComplete = async () => {
    if (selectedCategories?.length > 0) {
      await saveFavoriteCategories(selectedCategories)
      localStorage.setItem('SELECTED_CATEGORIES', selectedCategories?.join(','))
      Router.push('/tim-kiem')
    }
    
  }

  return (
      <div className='relative'>
        <div className='hidden md:block'>
          <Header selectedTab={'HOME'}/>
        </div>
      
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white mt-[16px] md:pt-[88px] px-0 md:px-[8px] min-h-[100vh] flex flex-col justify-center'>
          <p className='text-[20px] leading-[24px] font-bold main-text mb-[8px] text-center'>
            Thể loại yêu thích của bạn?
          </p>
          <p className='text-[14px] leading-[17px] label-text mb-[24px] text-center'>
            Cá nhân hóa trang chủ của bạn
          </p>

          <div className='mx-auto flex items-center flex-wrap px-[16px]'>
          { categories?.map((category) => (
            <a className={classNames('p-[16px] flex items-center justify-center text-[14px] main-text font-medium rounded-[24px] bg-primary2 m-[4px] category',
              selectedCategories.indexOf(category.code) !== -1 && 'text-white bg-active category-active')}
              key={category.code}
              title={`Thể loại truyện ${category.name}`}
              onClick={() => {
                setSelectedCategories((prev) => {
                  if (prev.indexOf(category.code) !== -1) {
                    return prev.filter((cate) => cate !== category.code)
                  }
                  return [...prev, category.code]
                })
              }}
            >
              {category.name}
            </a>
          )) }

          
        </div>
        { selectedCategories && selectedCategories.length > 0
          && <div className='lg:max-w-[344px] mx-auto mt-[50px] w-full fixed bottom-[0] left-[0] right-[0] background-white p-[20px]'>
          <a className='btnMain'
            onClick={onComplete}
          >
            Hoàn thành
          </a>
        </div>
      
        }
        </div>
      </div>
  )
}

export default observer(SelectType)
