import styled from 'styled-components';
import { ActivityCardListContainer } from "../GlobalStyledComponents";

import React from 'react';
import Card from "../Card/Card";
import { useNavigate } from 'react-router-dom';




const ActivityCardList = ({ cards, buttonText, data, category }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/post/${id}`); // 카드 ID에 따라 그룹 페이지로 이동
    };

    { console.log('setFilteredCards : ', data) }

    {/* 추후변경 - handleCardClick(card.id) */ }
    return (
        <>
            {<ActivityCardListContainer>
                {cards.map((card) => {
                    // 신청일이 있을 때만 전달
                    const applicationDate = card.applicationDate ? card.applicationDate : null;

                    // 합류일이 있을 때만 전달
                    const joinDate = card.joinDate ? card.joinDate : null;

                    // 프로필이 있을 때만 전달
                    const profile = card.profile ? card.profile : null;

                    return (
                        <Card
                            onClick={() => navigate(`/post/1`)}
                            key={card.id}
                            category={card.category}
                            title={card.title}
                            deadline={card.deadline}
                            challenge={card.challenge}
                            tags={card.tags}
                            icons={card.icons}
                            profile={profile}
                            applicationDate={applicationDate}
                            joinDate={joinDate}
                            buttonText={buttonText}
                            data={card}
                        />
                    );
                })}
            </ActivityCardListContainer>}
        </>
    );
};


export default ActivityCardList;