import React, {useEffect, useState} from 'react'
import Header from '../../components/Header/Header'
import * as Api from '../../api/api'
import Router from 'next/router'
import CommonLayout from '../../layouts/CommonLayout/CommonLayout'
import GlobalStore from '../../stores/GlobalStore'
import { removeToken } from '../../utils/storage'
import StoryStore from '../../stores/StoryStore'
import ProfileStore from '../../stores/ProfileStore'
import StoryItem from '../../components/StoryItem/StoryItem'
import { formatStringToNumber } from '../../utils/utils'
import CopyButton from '../../components/CopyButton/CopyButton'

const Profile = () => {

  const {
      bookmark,
      getBookMark,
      viewings,
      getStoryViewings,
      history,
      getStoryHistory,
    } = StoryStore

  const {
    balance,
    getBalance
  } = ProfileStore;
    
  const [selfProfile, setSelfProfile] = useState({});
  const [activeTab, setActiveTab] = useState(0); // Tab mặc định là 0
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    const fetchData = async() => {
      const isLoggedIn = await GlobalStore.checkIsLogin();
      if(!isLoggedIn) {
        console.log('Go to dang nhap: ', GlobalStore.isLoggedIn);
        Router.push('/dang-nhap');
      }

      if (isLoggedIn) {
        console.log('Start fetch data');
        await getStoryViewings();
        await getStoryHistory();
        await getBalance();
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    setSelfProfile(GlobalStore.profile);
  }, [GlobalStore.isLoggedIn])

  const handleLogout = async() => {
    try {
      await Api.deleteData({
        url: '/customer/customer/logout',
      });
      removeToken();
      GlobalStore.profile = {};
      GlobalStore.isLoggedIn = false;
      Router.push('/');
    } catch (e) {
      console.log('Error call logout: ', e);
    }
  }

  // Render dữ liệu theo tab được chọn
  const renderContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (activeTab === 0 && viewings?.data && viewings?.data.length <= 0) {
      return <p>Hiện tại bạn chưa lưu lịch sử đọc truyện...</p>;
    }

    if (activeTab === 1 && history?.data && history?.data.length <= 0) {
      return <p>Hiện tại bạn chưa lưu lịch sử đọc truyện...</p>;
    }

    if (activeTab === 0) {
      return (
        <ul>
          {viewings?.data?.map((item, index) => (
            <div style={{display: 'flex', 'borderBottom': '1px solid #ededed', 'marginBottom': '10px'}} key={index}>
              <StoryItem item={item?.story}
                direction='row'
                fromSearch={true}
              />
            </div>
            
          ))}
        </ul>
      );
    }

    if (activeTab === 1) {
      return (
        <ul>
          {history?.data?.map((item, index) => (
            <div style={{display: 'flex', 'borderBottom': '1px solid #ededed', 'marginBottom': '10px'}} key={index}>
              <StoryItem item={item?.story}
                direction='row'
                fromSearch={true}
              />
            </div>
          ))}
        </ul>
      );
    }
  };

  const renderDiamond = () => {
    return (
        <>
          {balance?.map((item, i) => (
            <div key={i} style={{marginRight: '20px'}}>
              
                <div>  
                  <p className='fl mr-[5px]'>{item?.denomination?.name}</p>
                  <img src={item?.denomination?.icon} className='w-[20px]'/>
                </div>
                <p className='text-center font-bold'>{formatStringToNumber(item?.balance)}</p>
             
            </div>
          ))}
        </>
      );
  };

  const renderPremiumInfo = () => {
    return (
      <div style={{padding: '5px', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: 'linear-gradient(to right, #FDDC73 0%, #FFF3D3 50%, #E5A93F 100%)',
        width: '73px', height: '20px'}}>
        <img src='/images/queen-crown.png' className='w-[15px] h-[15px] fl mr-[5px]'/>
        <p style={{margin: 0, fontSize: '10px', fontWeight: 'bold', color: '#A54426'}}>Premium</p>
      </div>
    );
  }

  return (
    <CommonLayout >
      <div>
        <Header selectedTab={'PROFILE'}/>
        <div className='relative pb-[100px] max-w-[768px] mx-auto bg-white pt-[88px] px-0 md:px-[8px] items-center justify-center h-[90vh]'>
          <div className='box-account'>
            <div style={{display: 'flex'}}>
              <img src={GlobalStore.profile?.avatar || selfProfile?.avatar} className='w-[80px] h-[80px] bd-radius-80'/>
              <div className='ml-[10px]'>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <p className='font-bold text-[18px] my-[0px] mr-[10px]'>{GlobalStore.profile?.displayName || selfProfile?.displayName}</p>
                  {GlobalStore.profile?.subscription?.tier === 'PREMIUM' &&
                    renderPremiumInfo()
                  }
                </div>
                
                <div style={{display: 'flex'}}>
                  <p className='font-bold text-[18px] my-[0px]'>{`(${GlobalStore.profile?.referralCode})` || selfProfile?.referralCode}</p>
                  <CopyButton text={GlobalStore.profile?.referralCode || selfProfile?.referralCode} />
                </div>
                <p className='account-title mt-[5px]'>{GlobalStore.profile?.authorDate ? 'Tác giả' : GlobalStore.profile?.translatorDate ? 'Dịch giả' : 'Độc giả'}</p>
                <div style={{display: 'flex', 'alignItems': 'center'}}>
                  <a onClick={() => handleLogout()} className='fl' style={{color: '#c6625c'}}>Đăng xuất</a>
                  <img src='/images/logout.png' className='w-[30px] ml-[5px]'/>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
              {renderDiamond()}
            </div>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
            <a className='button-open-chapter' href={`/nap-kim-cuong?ref=${GlobalStore.profile?.referralCode}`}>Nạp Kim Cương</a>
          </div>
          <div style={{ display: "flex", margin: '20px 15px'}}>
            <div
              onClick={() => setActiveTab(0)}
              style={{
                'padding': "10px 20px",
                'border': 'none',
                'borderBottom': activeTab === 0 ? '2px solid #5C95C6' : 'none',
                'cursor': "pointer",
                'position': "relative",
                'color': activeTab === 0 ? '#5C95C6' : '#000000',
                'fontWeight': activeTab === 0 ? 'bold' : 'normal'
              }}
            >
              DS Đang Đọc
            </div>
            <div
              onClick={() => setActiveTab(1)}
              style={{
                  'padding': "10px 20px",
                'border': 'none',
                'borderBottom': activeTab === 1 ? '2px solid #5C95C6' : 'none',
                'cursor': "pointer",
                'position': "relative",
                'color': activeTab === 1 ? '#5C95C6' : '#000000',
                'fontWeight': activeTab === 1 ? 'bold' : 'normal'
                }}
            >
              DS Đọc Xong
            </div>
          </div>

          {/* Content */}
          <div style={{ margin: '20px 15px', 'backgroundColor': '#fff', paddingBottom: '70px' }}>{renderContent()}</div>
        </div>
      </div>
    </CommonLayout>
  )
}

export default Profile
