import styled from "styled-components";

import React from "react";
import {googleLogin} from "../Apis/AuthApi";
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase-config';


// components/SignInContent/LoginContent.jsx
export const LogoL = styled.div`
  font-family: "Kavoon";
  font-size: 96px;
  font-weight: 700;
  background-size: 100%;
  margin: 0 auto;

  @media (max-width: 480px) {
    font-size: 75px;
  }
`;

// components/SignInContent/LoginContent.jsx
export const LoginDescription = styled.div`
  margin: 10px 0;
  font-size: 15px;
  line-height: 1.5;
  color: var(--black500);

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

// components/SignInContent/LoginContent.jsx
export const LoginSubTitle = styled.div`
  margin: 30px 0 20px 0;
  font-size: 20px;
  color: var(--black800);

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }
`;


// components/SignInContent/LoginContent.jsx
export const GoogleLoginButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background: var(--black000);
  border: 2px solid var(--black200);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--black800);

  &:hover {
    background: var(--black200);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  &:active {
    background: var(--black200);
    transition: background-color 0.1s ease, color 0.1s ease;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const LoginContent = ({ onNext , redirectUrl}) => {
  // 알림 권한을 요청하는 함수
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('알림 권한이 허용되었습니다.');
        return true;
      } else {
        console.log('알림 권한이 거부되었습니다.');
        return false;
      }
    } catch (error) {
      console.error('알림 권한 요청 중 오류 발생:', error);
      return false;
    }
  };


  const requestFcmToken = async () => {
    try {
      const fcmToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } catch (error) {
      console.error('FCM 토큰 요청 실패:', error);
      return null;
    }
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = redirectUrl;  // 리디렉션 URL
    const scope = 'openid profile email';
    const responseType = 'id_token';  // ID 토큰 직접 받아오기
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&nonce=YOUR_NONCE`;

    // 팝업으로 OAuth 동의 화면 열기
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      'GoogleLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const pollTimer = window.setInterval(() => {
      try {
        if (popup.location.href.includes('#')) {
          const params = new URLSearchParams(popup.location.hash.substring(1)); // hash에서 # 제거
          const idToken = params.get('id_token'); // id_token 추출
          console.log('ID token:', idToken);
          if (idToken) {
            // 로그인 성공 후
            googleLogin(idToken)
              .then((data) => {
                console.log('로그인 성공:', data);
                // 로그인 성공 후 추가 작업
              })
              .catch((error) => {
                console.error('로그인 실패:', error);
                console.error('로그인 실패:', error);
                window.clearInterval(pollTimer); // 실패 시에도 타이머 제거
                popup.close(); // 팝업 닫기
              });
            window.clearInterval(pollTimer);
            popup.close();
          }
        }
      } catch (e) {
        // 팝업 창의 location 접근이 허용되지 않은 경우 (CORS 문제 등)
        console.error('Error accessing popup location:', e);
      }
      if (popup.closed) {
        window.clearInterval(pollTimer);
      }
    }, 500);
    // onNext();
  }


    return (
        <>
            <LogoL>Wolf</LogoL>
            <LoginSubTitle>WOLF에 오신것을 환영합니다.</LoginSubTitle>
            <LoginDescription>
                스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법! <br />
                WOLF에서 함께 할 팀원들을 찾으세요!
            </LoginDescription>
            <GoogleLoginButton type="button" onClick={handleGoogleLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="25"
                    height="25" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Google 로그인
            </GoogleLoginButton>
        </>
    );
};


export default LoginContent;