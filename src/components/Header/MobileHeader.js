import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Router from 'next/router'
import GlobalStore from '../../stores/GlobalStore'
import ShortLogin from '../../pages/Login/ShortLogin'
import ModalComponent from '../Modal/Modal'
import Link from 'next/link'

const MobileHeader = ({show}) => {
  const ref = useRef(null)
  const ref2 = useRef(null)
  const [showMenus, setShowMenus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && ref2.current && !ref2.current.contains(event.target)) {
        setShowMenus(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  useEffect(() => {
    const trackScrolling = () => {
      if (showMenus) {
        setShowMenus(false)
      }
    }
    window.addEventListener('scroll', trackScrolling);

    return () => {
      window.removeEventListener('scroll', trackScrolling);
    }
  }, [showMenus])

  const handleButtonAccount = () => {
    if (GlobalStore.isLoggedIn) {
      Router.push('/tai-khoan')
    } else {
      setShowLogin(true);
    }
  }

  return (
    <div className={classNames('flex items-center justify-between md:hidden px-[20px] py-[10px] border-b-[1px] border-color border-t-[1px] fixed top-0 right-0 left-0 z-[99] background-white mobile-header', show && 'mobile-header-show')}>
      <div className={classNames('flex items-center')}
        onClick={() => {
          Router.push('/de-cu-truyen-full')
        }}
        >
          <img src={'/images/star-home-active.svg'} className='w-[18px] mr-[13px]' alt='home'/>
          <p className={classNames('mb-0 text-[15px] font-bold text-active leading-[20px] whitespace-nowrap'
          )}>
            Toidoc
          </p>
        </div>

        <div className='flex items-center'>
          <a className='w-[100px] h-[32px] flex items-center justify-center rounded-full download-btn text-white pr-[10px] mr-[10px]'
              href='https://toidoc.onelink.me/59bO/d42503wz' rel="nofollow"
            >
            <img src='/images/download-arrow.png' className='w-[24px]' alt='Góp ý truyện fulll' title='Góp ý truyện full'/>
            Tải app
          </a>
          <a className='w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full'
            onClick={() => {
              Router.push(`/tim-kiem-truyen`)
            }}
          >
            <img src='/images/ic_search.svg' className='w-[24px]' alt='search'/>
          </a>
          <a className={classNames('w-[32px] h-[32px] flex items-center justify-center gray-bg rounded-full ml-[20px]', showMenus && 'bg-tab-active')}
            onClick={() => {
              setShowMenus((prev) => !prev)
            }}
            ref={ref2}
          >
            <img src={showMenus ? '/images/ic_menu_close.svg' : '/images/ic_menu.svg'} className='w-[24px]'
              alt='menu'
            />
          </a>
        </div>

        <div className={classNames('mobile-header-menus py-[10px]', showMenus && 'mobile-header-menus-show')}
          ref={ref}  
        >
          <div className={classNames('flex items-center py-[10px]')}
            onClick={() => {
              Router.push('/tim-kiem')
            }}
          >
            <img src={'/images/search-loupe.svg'} className='w-[24px] mr-[11px]' alt='search'/>
            <p className={classNames('mb-0 text-[15px] font-semibold main-text leading-[20px] whitespace-nowrap'
            )}>
               Khám phá
            </p>
          </div>
          {/*<div className={classNames('flex items-center py-[10px]')}
            onClick={() => {
              Router.push('/thu-vien')
            }}
          >
            <img src={'/images/book.svg'} className='w-[24px] mr-[11px]' alt='library'/>
            <p className={classNames('mb-0 text-[15px] font-semibold main-text leading-[20px] whitespace-nowrap'
            )}>
              Thư viện
            </p>
          </div>*/}
          <div className={classNames('flex items-center py-[10px]')}
            onClick={() => handleButtonAccount()}
          >
            <img src={GlobalStore?.profile?.avatar ? GlobalStore?.profile?.avatar : '/images/user.svg'} className='w-[24px] mr-[11px] bd-radius-24' alt='user'/>
            <p className={classNames('mb-0 text-[15px] font-semibold main-text leading-[20px] whitespace-nowrap'
            )}>
              {GlobalStore?.isLoggedIn ? 'Tài khoản' : 'Đăng nhập'}
            </p>
          </div>
        </div>
        {showLogin && 
          <ModalComponent
              show={showLogin}
              handleClose={(e) => setShowLogin(false)}>
            <ShortLogin description='Đăng nhập 1 chạm bằng các phương thức dưới đây để sử dụng tính năng này.' closeModal= {() => setShowLogin(false)}/>
          </ModalComponent>
        }
    </div>
  )
}

export default MobileHeader
