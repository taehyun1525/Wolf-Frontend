import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLogin from './HeaderComponents/HeaderLogin';
import ModalContainer from './Modal/ModalContainer';
import HeaderCreateGroupButton from './Button/HeaderCreateGroupButton';
import HeaderFaqButton from './Button/HeaderFaqButton';
import SignInSteps from './SignInContent/SignInSteps';
import Cookies from "js-cookie";
import {googleLogin, saveFcmToken} from "./Apis/AuthApi";
import {getToken} from "firebase/messaging";
import {messaging} from "./firebase-config";

export const HeaderContainer = styled.header`
  margin: auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 30px 35px;
  background: var(--black000);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.07);
  max-width: 1500px;
  width: 100%;
`;

export const HeaderLogo = styled.a`
  color: var(--black900);
  font: 32px Kavoon, sans-serif;
  text-decoration: none;
`;

function Header({ isLoggedIn, onLogin, offLogin, notifications, setNotifications }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [redirectUrl, setRedirectUrl] = useState(null);

  const openModal = () => {
    // 현재 URL을 저장해둠
    setRedirectUrl(window.location.href);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const requestFcmPermissionAndSaveToken = async () => {
    console.log("FCM 권한 요청 시작");
    try {
      // 알림 권한 요청
      const permission = await Notification.requestPermission();
      console.log("알림 권한 상태:", permission);

      if (permission === "granted") {
        const fcmToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });

        if (fcmToken) {
          console.log("FCM 토큰:", fcmToken);
          await saveFcmToken(fcmToken);
          console.log("FCM 토큰이 서버에 저장되었습니다.");
        } else {
          console.log("FCM 토큰을 가져올 수 없습니다.");
        }
      } else if (permission === "denied") {
        // 사용자에게 브라우저 설정에서 권한을 허용하라는 안내를 띄움
        alert("알림 권한이 거부되었습니다. 브라우저 설정에서 알림 권한을 허용해 주세요.");

        // 만약 설정 페이지로 유도하고 싶다면 안내 메시지와 함께 링크를 제공할 수 있음
        // const settingsUrl = "chrome://settings/content/notifications";
        // if (window.confirm("알림 권한을 허용하려면 브라우저 설정 페이지로 이동하시겠습니까?")) {
        //   window.open(settingsUrl);
        // }
      }
    } catch (error) {
      console.error("FCM 토큰 요청 또는 저장 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // Google 로그인 후 결과를 처리하는 리스너 등록
    window.addEventListener('message', (event) => {
      if (event.origin === window.origin && event.data.type === 'id-token') {
        const { idToken } = event.data;
        // ID 토큰을 가지고 로그인 작업 수행
        googleLogin(idToken)
          .then((response) => {
            const { accessToken, refreshToken } = response.data.tokenResponse;

            // 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            Cookies.set('refreshToken', refreshToken);

            if(response.data.loginFlag === "SIGNUP") {
              // 회원가입 프로세스 진행
              setCurrentStep(2);
            }
            if (response.data.loginFlag === "LOGIN") {
              // FCM 권한 요청
              requestFcmPermissionAndSaveToken().then(r => console.log(r));
              closeModal();  // 로그인 완료 후 모달 닫기
              onLogin();  // 부모 컴포넌트에 로그인 상태 업데이트
            }
          })
          .catch((error) => {
            console.error('로그인 실패:', error);
          });
      }
    });

    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);

  return (
    <HeaderContainer>
      <HeaderLogo href="/">WOLF</HeaderLogo>
      <div style={{ display: 'flex', gap: '10px' }}>
        <HeaderCreateGroupButton onClick={() => navigate('/write')}>팀원 모집하기</HeaderCreateGroupButton>
        <HeaderFaqButton onClick={() => navigate('/faq')}>FAQ</HeaderFaqButton>
        <HeaderLogin
          isLoggedIn={isLoggedIn}
          openModal={openModal}
          offLogin={offLogin}
          notifications={notifications}
          setNotifications={setNotifications} // setNotifications 전달
        />
      </div>
      {/* 로그인/회원가입 모달 */}
      {isModalOpen && (
        <ModalContainer onClose={closeModal}>
          <SignInSteps
            redirectUrl={redirectUrl}
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            onLogin={onLogin}
            closeModal={closeModal} // closeModal 함수 전달
          />
        </ModalContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
