import styled from "styled-components";
import {
  Violet500LineDiv,
  FormFieldColumn,
  Violet500BackgroundButton,
  FormFieldRow,
  DoubleDateContainer,
  InfoContainer,

} from "../GlobalStyledComponents";

import React, { useState } from "react";
import ApplicantModal from "./GroupInfoModal/ApplicantModal";
import EvaluationModal from "./GroupInfoModal/EvaluationModal";
import FormFieldSingle from "./GroupComponent/FormFieldSingle";
import TextAreaNoCss from "../Input/TextAreaNoCss";
import InputTextNoCss from "../Input/InputTextNoCss";
import InputDateNoCss from "../Input/InputDateNoCss";
import RecentNewsSlider from "../Slider/RecentNewsSlider";
import QuestionForm from "./Question/QuestionForm";
import ImagePreview from "../Img/ImagePreview"

const GroupInfoContent = ({ mode, groupPostId, userId, groupPostData, groupNewsData }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  return (
    <>
      <InfoContainer>
        {/* 이미지가 있으면 여기에 넣으면 됨! */}
        <ImagePreview
          src={groupPostData?.thumbnail ? groupPostData?.thumbnail : "기본이미지"}
          imageFile={groupPostData?.thumbnail ? groupPostData?.thumbnail : "기본이미지"}
        />

        {/* 정보 묶음 */}
        <Violet500LineDiv>
          <FormFieldColumn>
            <FormFieldSingle label={"모임 기간"}>
              <DoubleDateContainer className="date">
                <InputDateNoCss value={groupPostData?.startDate} />
                ~
                <InputDateNoCss value={groupPostData?.endDate} />
              </DoubleDateContainer>
            </FormFieldSingle>
            <Violet500BackgroundButton onClick={openModal}>
              지원하기
            </Violet500BackgroundButton>
          </FormFieldColumn>

          {isModalOpen && (
            <ApplicantModal
              onClose={closeModal}
              isView={false}
              groupPostId={groupPostId}
              optionalRequirements={groupPostData?.optionalRequirements} />

          )}

          <FormFieldRow>
            <FormFieldSingle
              label={mode === "study" ? "모집 현황" : "지원 현황"}
              className="recruitPeople"
            >
              <InputTextNoCss
                value={mode === "study" ? "스터디원 2/8" : "개발자 1/8"}
                readOnly
              />
            </FormFieldSingle>
            <FormFieldSingle
              label={mode === "study" ? "지원 가능" : "지원 가능 개발자"}
              className="recruitSupport"
            >
              <InputTextNoCss
                value={mode === "study" ? "스터디원 6/8" : "개발자 7/8"}
                readOnly
              />
            </FormFieldSingle>
          </FormFieldRow>
        </Violet500LineDiv>

        {/*<HiddenFileInput*/}
        {/*    id="thumbnail"*/}
        {/*    type="file"*/}
        {/*    accept="image/*"*/}
        {/*    onChange={handleFileChange}*/}
        {/*/>*/}

        {/* 주제 설명 */}
        <Violet500LineDiv>
          <FormFieldRow>
            <FormFieldSingle label={"주제"} className="PostTitle">
              <InputTextNoCss
                value={groupPostData?.topic}
                readOnly />
            </FormFieldSingle>
          </FormFieldRow>
          <TextAreaNoCss
            name="introduction"
            placeholder="모집에 대한 간단한 소개를 작성해주세요."
            value={groupPostData?.description}
          />
        </Violet500LineDiv>

        {/* 최근 소식 */}
        <RecentNewsSlider news={groupNewsData} />

        {/* 질문 작성 영역 */}
        <Violet500LineDiv>
          <FormFieldSingle
            FormLabelGroupStyle={{ width: '100%', marginTop: '10px' }}
            labelStyle={{
              width: '100%', textWrap: 'wrap', justifyContent: 'start',

            }}
            label={"응원이나 궁금한 내용을 입력해주세요 !"}
          />
          <QuestionForm
            userId={userId}
            showFileOption={false}
            groupPostId={groupPostId}
          />
        </Violet500LineDiv>
      </InfoContainer >
      {/* 평가하기 모달 테스트 */}
      <button type="button" onClick={() => setIsEvaluationModalOpen(true)}>
        평가하기 모달 열기
      </button>
      {
        isEvaluationModalOpen && <EvaluationModal
          userId={userId}
          onClose={() => setIsEvaluationModalOpen(false)}
          isView={false}
          optionalRequirements={groupPostData?.optionalRequirements}
          groupId={groupPostId} />
      }
    </>
  );
};

export default GroupInfoContent;
