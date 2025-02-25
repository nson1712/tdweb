import React, { useState } from 'react';
import * as Api from '../../api/api';
import Button from '../../components/Button';
import { useGoogleLogin } from '@react-oauth/google';
import { base64URLdecode, isCocCoc } from '../../utils/utils';
import { setAccessToken, setRefreshToken } from '../../utils/storage';
import GlobalStore from '../../stores/GlobalStore';
import Router from 'next/router';
import { toast } from 'react-toastify';

const ShortLogin = ({description, navigate='', closeModal, enableFB}) => {
  const [loading, setLoading] = useState(false)
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
      const loginResult = await Api.post({
        url: '/customer/public/login-by-social',
        data: {
          token: tokenResponse.access_token,
          socialType: 'GOOGLE',
        },
      });

      await setAccessToken(loginResult?.data?.accessToken);
      await setRefreshToken(loginResult?.data?.refreshToken);

      const tokens = loginResult?.data?.accessToken.split('.');
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;
      if (closeModal) {
        closeModal();
      }
      toast('Bạn đã đăng nhập thành công!', {
        type: "success",
        theme: "colored",
      })
      if (navigate !== '') {
        Router.push(navigate);
      }
      
    }});

  const handleFacebookLogin = () => {
    if (typeof window.FB !== "undefined") {
      window.FB.login(
        function (response) {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            sendTokenToBackend(accessToken);
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "public_profile,email,user_link" } // Yêu cầu quyền
      );
    }
  };
  
  const sendTokenToBackend = async (accessToken) => {
    try {
      const loginResult = await Api.post({
        url: '/customer/public/login-by-social',
        data: {
          token: accessToken,
          socialType: 'FACEBOOK',
        },
      });

      await setAccessToken(loginResult?.data?.accessToken);
      await setRefreshToken(loginResult?.data?.refreshToken);

      const tokens = loginResult?.data?.accessToken.split('.');
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;
      if (closeModal) {
        closeModal();
      }
      toast('Bạn đã đăng nhập thành công!', {
        type: "success",
        theme: "colored",
      })
      if (navigate !== '') {
        Router.push(navigate);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginEmail = () => {
    Router.push('/dang-nhap');
  }

  return (
    <>
      <div className='box-login'>
        <h3 className='white-text' style={{'margin': 'auto', 'fontWeight': 'bold', 'marginBottom': '10px'}}>Bạn chưa đăng nhập !</h3>
        <p className='white-text text-left'>{description || 'Đăng nhập 1 chạm bằng các phương thức dưới đây để đọc nội dung này'}</p>
        <div style={{'margin': 'auto'}}>
          <a id='google-login-btn' className='align-center'>
            <Button className='login-button login-google-bg'
              onClick={(e) => handleLoginGoogle(e)}>
              <img src='/images/google.png' style={{'float': 'left', 'marginRight': '10px', 'width': '25px'}}/>
              Đăng Nhập Bằng GOOGLE
            </Button>
          </a>
          <a id='facebook-login-btn' className='align-center mt-[10px]'>
            <Button className='login-button login-fb-bg'
              onClick={(e) => handleFacebookLogin(e)}>
              <img src='/images/facebook.png' style={{'float': 'left', 'marginRight': '10px', 'width': '15px', height: '25px'}}/>
              Đăng Nhập Bằng FACEBOOK
            </Button>
          </a>
          

          <div style={{'margin': '30px 10px', 'borderTop': '1px solid #fff'}}></div>
          <p className='white-text px-[10px] '>Hoặc bạn tải <a className='text-[#08e9ed] underline'href='https://toidoc.onelink.me/59bO/d42503wz'>App Toidoc</a>, đăng nhập và đọc truyện mượt mà hơn.</p>
          <div className='align-center'>
              <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                <img src='/images/apple-icon-min.png' style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
              </a>
              <a href='https://toidoc.onelink.me/59bO/d42503wz'>
                <img src='/images/android-icon-min.png'  style={{'float': 'left', 'marginRight': '10px', 'width': '135px'}}/>
              </a>
          </div>
          {/*<Button className='login-button white-text login-email-button'
            onClick={() => handleLoginEmail()}>
            <img src='/images/email.png'  style={{'float': 'left', 'marginRight': '10px', 'width': '30px'}}/>
            Dùng email cá nhân
          </Button>*/}
          <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginTop': '20px'}}>
            <a className='text-underline' style={{color: '#ebf269'}} href='https://m.me/185169981351799?text=Mình muốn đăng nhập trên web không được. Trợ giúp mình với.'>Báo lỗi đăng nhập</a>
          </div>
          
        </div>
      </div>
    </>
  )
}


export default ShortLogin;
