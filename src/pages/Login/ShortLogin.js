import React, { useState } from 'react';
import * as Api from '../../api/api';
import Button from '../../components/Button';
import { useGoogleLogin } from '@react-oauth/google';
import { base64URLdecode } from '../../utils/utils';
import { setAccessToken, setRefreshToken, setItem } from '../../utils/storage';
import GlobalStore from '../../stores/GlobalStore';
import Router from 'next/router';

const ShortLogin = ({
}) => {
  const [loading, setLoading] = useState(false)
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
      console.log('tokenResponse: ', tokenResponse);
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
      console.log('updateProfileInfo start decode token')
      const decoded = base64URLdecode(tokens[1]);
      const jsonObj = JSON.parse(decoded);
      console.log('updateProfileInfo jsonObj: ', jsonObj);
      GlobalStore.profile = {
        ...GlobalStore.profile,
        ...jsonObj,
      };
      GlobalStore.isLoggedIn = true;
    }});

  const handleLoginEmail = () => {
    Router.push('/dang-nhap');
  }

  return (
    <>
      <div className='box-login'>
        <h3 className='white-text' style={{'margin': 'auto', 'fontWeight': 'bold', 'marginBottom': '10px'}}>Bạn chưa đăng nhập !</h3>
        <p className='white-text'>Hãy đăng nhập hoặc đăng ký để đọc tiếp theo các phương thức sau</p>
        <div style={{'margin': 'auto'}}>

          <Button className='login-button white-text'
            onClick={(e) => handleLoginGoogle(e)}>
            <img src='/images/google.png' style={{'float': 'left', 'marginRight': '10px', 'width': '25px'}}/>
            Đăng nhập qua google
          </Button>
          <Button className='login-button white-text login-email-button'
            onClick={() => handleLoginEmail()}>
            <img src='/images/email.png'  style={{'float': 'left', 'marginRight': '10px', 'width': '30px'}}/>
            Dùng email cá nhân
          </Button>
        </div>
      </div>
    </>
  )
}


export default ShortLogin;
