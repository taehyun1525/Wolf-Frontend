import styled from 'styled-components';
import { PageTitle } from "../components/GlobalStyledComponents";
import PaginatedList from '../components/Pagination/PaginatedList';
import React, { useEffect, useState } from 'react';
import ErrorUI from "../components/Error/ErrorUI";

import NoticeDetail from "../components/Notice/NoticeDetail";
import { getFaqByCategory } from "../components/Apis/FaqApi";
import { getNotices, getNoticeById } from "../components/Apis/NoticeApi";
import { useLocation, useNavigate } from 'react-router-dom';


const NoticeContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 50px;
    padding: 40px 30px;
    @media (max-width: 768px) {
      padding: 40px 20px;
    }
    @media (max-width: 480px) {
      padding: 40px 10px;
    }
`;

const NoticeContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const NoticeList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 5px;
    width: 100%;
`;

export const NoticeItem = styled.div`
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    width: 100%;
`;

export const NoticeTitle = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    line-height: 1.5;
    align-items: center;
    padding: 15px;
    font-size: 16px;
    color: var(--black800);
    min-height: 80px;

    border-radius: 7px;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }
`;

const Notice = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [noticeIdFromState, setNoticeIdFromState] = useState(location.state?.sendNoticeId || null); // BannerSlider에서  navigate('/notice', { state: { sendNoticeId: 1 } })} 형태로 객체 전송중

  const [currentPage, setCurrentPage] = useState(1); // 최근 페이지 번호
  const [error, setError] = useState(null);
  const [noticeId, setNoticeId] = useState(null);
  const [detailModalOn, setDetailModalOn] = useState(false);
  const [item, setItem] = useState();
  const [noticeData, setNoticeData] = useState([]);
  const [detailNotice, setDetailNotice] = useState([]);


  const fetchNoticeDetailData = (noticeId) => {
    getNoticeById(noticeId)
      .then((data) => {
        setDetailNotice(data?.data); // 받아온 Notice 데이터를 설정
        // 받아온 Notice 데이터를 설정
      })
      .catch(() => {
        setError("Notice 데이터를 불러올 수 없습니다.");
      })
  };

  const fetchNoticeData = (page) => {
    getNotices(page)
      .then((data) => {
        setNoticeData(data.data.notices); // 받아온 Notice 데이터를 설정
        // 받아온 Notice 데이터를 설정
      })
      .catch(() => {
        setError("Notice 데이터를 불러올 수 없습니다.");
      })
  };

  useEffect(() => {
    fetchNoticeData(currentPage - 1);
  }, [currentPage]);


  // 공지사항 상세
  function setDetailItem(item) {
    setDetailModalOn(true);
    setItem(item);
    fetchNoticeDetailData(item.noticeId);
  }

  useEffect(() => {
    if (noticeIdFromState) {
      fetchNoticeDetailData(noticeIdFromState);
      setDetailModalOn(true);
      setNoticeIdFromState(null); // 초기화
      navigate('/notice');
    }
  }, [noticeIdFromState]); // noticeIdFromState가 변경될 때마다 호출


  const renderItems = (items) => {
    return (
      <>
        {items?.map((notice) => (
          <NoticeItem onClick={() => setDetailItem(notice)} key={notice.noticeId}>
            <NoticeTitle>
              <span>{notice.title}</span>
            </NoticeTitle>
          </NoticeItem>
        ))}
      </>
    );
  };

  // 에러 발생 UI
  if (error) {
    return <ErrorUI error={error} />;
  }

  return (
    <NoticeContainer>
      <PageTitle>공지사항</PageTitle>
      <NoticeContent>
        {detailModalOn ?
          <NoticeDetail
            item={detailNotice}
            prevClick={() => setDetailModalOn(false)} /> :
          <>
            <NoticeList>
              <PaginatedList
                setDetail={setDetailItem}
                data={noticeData}
                renderItems={renderItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </NoticeList>
          </>
        }
      </NoticeContent>
    </NoticeContainer>
  );
};

export default Notice;
