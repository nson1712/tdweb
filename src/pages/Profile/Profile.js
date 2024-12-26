import React from 'react'
import Header from '../../components/Header/Header'
import StoryItem from '../../components/StoryItem/StoryItem'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'

const Profile = () => {
  return (
    <CommonLayout >
      <div>
        <Header selectedTab={'PROFILE'}/>
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white pt-[88px] px-0 md:px-[8px] flex items-center justify-center h-[90vh]'>
          Comming soon
          
        </div>
      </div>
    </CommonLayout>
  )
}

export default Profile
