import styled, { css } from "styled-components";
import {
    ModalContentWrapper, Div, WrapperForm, Row, ContentsRow, Column, SubContentsWrapper, EtcContentsWrapper,
    SubTitle, Label, LinkInputDiv, Violet400BackgroundButton, ButtonGroupRight, ButtonGroupLeft,
    Hr,
    Violet500BackgroundButton
} from "../GlobalStyledComponents";

import React, { useEffect, useState } from "react";
import InputText from "../Input/InputText";
import ActivityScoreBar from "../ActivityScore/ActivityScoreBar";
import SelectButton from "../Button/SelectButton";
import { LinkButtonGroup, LinkInputDirection } from "../Group/TodoContent";
import RefreshIcon from "../Icon/RefreshIcon";
import ALinkText from "../Input/ALinkText";
import TextArea from "../Input/TextArea";
import EditButton from "../Button/EditButton"
import WithdrawalButton from "../Button/WithdrawalButton"
import SaveButton from "../Button/SaveButton";
import CancelButton from "../Button/CancelButton";
import CopyButton from "../Button/CopyButton";
import InputNumber from "../Input/InputNumber"
import GlobalSvg from "../Icon/GlobalSvg";
import { postMyProfile } from "../Apis/UserApi";
import { checkNickname, deleteUser } from "../Apis/AuthApi";
import { useNavigate } from 'react-router-dom';
import { getRefreshToken, removeAccessToken, removeRefreshToken } from '../Apis/Common';
import { logout } from "../Apis/AuthApi";


const UserInfoContent = ({
    contentsType,
    setContentsType,
    profileData,
    offLogin
}) => {
    const navigate = useNavigate();

    const [newProfileData, setNewProfileData] = useState(profileData);

    const linkTypes = ["github", "figma", "notion", "velog"];

    const [newUserLinks, setNewUserLinks] = useState(
        linkTypes.map(linkType => {
            const linkData = profileData?.links?.find(data => data.linkType === linkType) || {};

            const linkObject = {
                linkType: linkType,
                linkUrl: linkData.linkUrl || "",
                linkSvg: GlobalSvg[linkType.toLowerCase()]('25px') // 대문자를 소문자로 변환하여 사용
            };

            // linkId가 존재할 경우에만 linkId 속성을 추가
            if (linkData.linkId) {
                linkObject.linkId = linkData.linkId;
            }

            return linkObject;
        })
    );

    useEffect(() => { // 링크 초기 값을 설정함

        setNewProfileData(prev => ({
            ...prev,
            links: newUserLinks.map(({ linkId, linkType, linkUrl }) => ({
                linkId,
                linkType,
                linkUrl: linkUrl,
            }))
        }));
    }, []);

    const handleLogout = async () => {
        try {
            // 먼저 로그아웃 API를 호출
            await logout(getRefreshToken(), localStorage.getItem('fcmToken'));

            // 성공적으로 로그아웃된 경우 토큰을 제거
            removeAccessToken();
            removeRefreshToken();
            offLogin();
            navigate("/");
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
            // 오류가 발생해도 토큰을 제거할지 여부는 결정에 따라 처리 가능
            removeAccessToken();
            removeRefreshToken();
            offLogin();
            navigate("/");
        }
    };

    const [isEditing, setIsEditing] = useState(false); // 편집중인지의 상태

    const [isEditingNickName, setIsEditingNickName] = useState(false); // 편집중인지의 상태
    const [isNickNamePossible, setIsNickNamePossible] = useState(false);
    const [isNickNameImpossible, setIsNickNameImpossible] = useState(false);
    const [isNickNameEqual, setIsNickNameEqual] = useState(false);


    const handleEditClick = () => {
        setContentsType('myselfEditing');
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();

        // 링크를 수정했는데, 저장하려고 할 경우 : 모든 배열이 true가 아님
        // 링크를 수정했고, 저장도 되었을 경우 : 모든 배열이 true임
        const boolArray = linkTypes.map(linkType => {
            const isSaved = Boolean(newProfileData?.links?.find(data => data.linkType === linkType).linkUrl) ===
                Boolean(newUserLinks?.find(data => data.linkType === linkType).linkUrl)
            return isSaved;
        })


        // 모든 요소가 true인지 확인 & 
        // 닉네임이 사용 가능한지 확인
        if ((boolArray.every(value => value === true)) &&
            (isEditingNickName === true && isNickNamePossible === true)) {
            setIsEditing(false); // 편집 종료
            setContentsType('myselfViewing');
            setIsEditingNickName(false);

            // 최종적인 폼 제출 진행
            try {
                const result = await postMyProfile(newProfileData);

                // 상태 코드가 200-299 범위인지 확인
                if (result.status < 200 || result.status >= 300) {
                    throw new Error('네트워크 오류');
                }

                alert("회원 정보가 수정되었습니다");
                window.location.reload(); // 페이지 새로 고침


            } catch (error) {
                // setError('회원 정보 삭제 실패');
                console.error(error);
            } finally {
                // setIsLoading(false);
            }
        } else if (!(boolArray.every(value => value === true))) {
            // false 인덱스 찾기
            const falseIndexes = boolArray
                .map((value, index) => (value === false ? index : -1)) // false일 때 인덱스 저장

            falseIndexes?.filter(index => index !== -1); // -1을 제외한 인덱스만 필터링

            const linkNames = falseIndexes.map(index => linkTypes[index]); // false 인덱스에 해당하는 이름 가져오기
            alert(`수정한 ${linkNames.join(", ")} 링크를 등록해주세요!`);
        }
        else if ((isEditingNickName === true || (isNickNamePossible === false && isNickNameEqual === false))) {
            alert(`닉네임을 중복 검사해주세요!`);
        } else {
            alert(`수정 사항을 다시 확인해주세요!`);
        }



    };

    const handleCancelClick = () => {
        const resetProfileData = () => {
            setNewProfileData(profileData); // 수정 전의 DB 정보로 초기화
            setIsEditingNickName(false);
            setNewUserLinks( // 링크 정보도 초기화
                linkTypes.map(linkType => {
                    const linkData = profileData?.links?.find(data => data.linkType === linkType) || {};

                    const linkObject = {
                        linkType: linkType,
                        linkUrl: linkData.linkUrl || "",
                        linkSvg: GlobalSvg[linkType.toLowerCase()]('25px') // 대문자를 소문자로 변환하여 사용
                    };

                    // linkId가 존재할 경우에만 linkId 속성을 추가
                    if (linkData.linkId) {
                        linkObject.linkId = linkData.linkId;
                    }

                    return linkObject;
                })
            );
        };

        // eslint-disable-next-line no-restricted-globals
        if ((isEditing && !isNickNameEqual) && !confirm("변경 사항이 있습니다. 취소하시겠습니까?")) {
            return; // 사용자가 취소를 선택하면 함수 종료
        }

        setIsEditing(false); // 편집 종료
        setIsNickNamePossible(false);
        setIsNickNameImpossible(false);
        setIsNickNameEqual(false);
        setContentsType('myselfViewing');
        resetProfileData();
    };

    const deleteUserHandler = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("탈퇴 하시겠습니까?")) {
            // setIsLoading(true);
            // setError(null); // 이전 에러 초기화

            try {
                const result = await deleteUser();
                handleLogout();
                alert("회원 정보가 삭제되었습니다", result);
            } catch (error) {
                // setError('회원 정보 삭제 실패');
                console.error(error);
            } finally {
                // setIsLoading(false);
            }

            navigate("/");
        } else {
        }
    };


    const handleInputChange = (field, value) => {
        setIsNickNamePossible(false);
        setIsNickNameImpossible(false);
        setIsNickNameEqual(false);

        setIsEditing(true); // 수정 시작
        setIsEditingNickName(true);

        setNewProfileData((prev) => ({
            ...prev,
            [field]: value
        }));
    };



    const handleInputLinkChange = (targetLinkType, value) => {
        setIsEditing(true); // 수정 시작

        // 바꾼 value 값으로 다시 넣어줌
        setNewUserLinks(prevLinks =>
            prevLinks.map(link =>
                link.linkType === targetLinkType ? { ...link, linkUrl: value } : link
            )
        );
    };


    // URL 유효성 검사
    const isValidURL = (urlString) => {
        try {
            new URL(urlString);
            return true;
        } catch (_) {
            return false;
        }
    };



    const editLinkRefresh = (targetLinkType) => {
        if (window.confirm("내용을 초기화 하시겠습니까?")) {
            setIsEditing(true);
            // 내용을 초기화 함
            setNewUserLinks(prevLinks =>
                prevLinks.map(link =>
                    link.linkType === targetLinkType ? { ...link, linkUrl: '' } : link
                )
            );
            setNewProfileData(prev => ({
                ...prev,
                links: prev.links.map(link =>
                    link.linkType === targetLinkType ? {
                        ...link, linkUrl: ''
                    } : link
                )
            }));
        } else {
            return; // 초기화하지 않으면 함수 종료
        }
    };

    // 링크 수정 완료
    const editLinkFinish = (targetLinkType) => {
        setNewProfileData(prev => ({
            ...prev,
            links: prev.links.map(link =>
                link.linkType === targetLinkType ? {
                    ...link, linkUrl: newUserLinks?.filter(data => data.linkType === `${targetLinkType}`)[0]?.linkUrl
                } : link
            )
        }));

        alert('링크를 등록했습니다');
    };

    // 닉네임 중복 검사
    const handleNickNameCheck = async () => {
        try {

            // 닉네임 중복 검사

            const isAvailable = newProfileData?.nickname ? await checkNickname(newProfileData?.nickname) : "";  // 서버에서 중복 여부 확인

            if (isAvailable === "true") {
                // 닉네임 사용 가능
                setIsNickNamePossible(true);
            } else if (isAvailable === "equal") {
                setIsNickNameEqual(true);
            } else {
                // 닉네임 사용 불가
                setIsNickNameImpossible(true);
                // handleInputChange('nickname', profileData?.nickname);  // 실패 시 값 초기화
            }
        } catch (error) {
            console.error('닉네임 중복 확인 중 오류 발생:', error);
            // 필요에 따라 에러 처리 로직 추가
        }
    };

    const renderNicknameNotice = () => {
        return (
            <>

                <div style={{ height: '16px' }}>
                    {isNickNamePossible && (
                        <span
                            style={{
                                fontSize: '13px', color: 'var(--blueViolet700)'
                            }}>
                            사용 가능한 닉네임입니다.
                        </span>
                    )}
                    {isNickNameImpossible && (
                        <span
                            style={{
                                fontSize: '13px', color: '#ED4E51'
                            }}>
                            사용 불가능한 닉네임입니다.
                        </span>
                    )}
                    {isNickNameEqual && (
                        <span
                            style={{
                                fontSize: '13px', color: '#32CD32' // 밝은 초록색
                            }}>
                            현재 닉네임입니다.
                        </span>
                    )}
                </div>
            </>

        )
    };

    return (
        <WrapperForm onSubmit={handleSaveClick} method="post" action="/user">
            <ButtonGroupRight>
                {contentsType === 'myselfEditing' ? (
                    <>
                        {/* myselfEditing */}
                        {/* 저장 버튼 */}
                        <SaveButton
                            type="submit"
                            style={{ width: '88.99px' }} />
                        {/* 취소 버튼 */}
                        <CancelButton
                            type="button"
                            style={{ width: '88.99px' }}
                            onClick={handleCancelClick} />
                        {/* 수정 중 문구 */}
                        <span style={{ display: "flex", alignItems: "center", height: "35px", gap: "10px", width: '88.99px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                            수정 중
                        </span>
                    </>
                ) : contentsType === 'strangerViewing' ? (
                    <>
                        {/* strangerViewing */}
                        {/* 없음 */}
                    </>
                ) : (
                    <>
                        {/* myselfViewing */}
                        {/* 수정 버튼 */}
                        <EditButton onClick={handleEditClick} />
                    </>
                )}
            </ButtonGroupRight>
            <ContentsRow>
                <SubContentsWrapper>
                    <div>
                        <SubTitle>기본 정보</SubTitle>
                        <Hr />
                    </div>
                    <ModalContentWrapper style={{ gap: '5px' }}>
                        <Div style={{ gap: '2px' }}>
                            <Row>
                                <Div>
                                    <Label>닉네임</Label>
                                    <Row>
                                        <InputText
                                            type="text"
                                            placeholder="닉네임을 입력해주세요"
                                            readOnly={!(contentsType === 'myselfEditing')}
                                            value={isEditing ?
                                                (newProfileData?.nickname ? newProfileData?.nickname : "") :
                                                (profileData?.nickname ? profileData?.nickname : "")}
                                            onChange={(e) => {
                                                handleInputChange('nickname', e.target.value);
                                            }}
                                            required
                                        />
                                    </Row>
                                </Div>
                                {contentsType === 'myselfEditing' ? (<>
                                    {/* myselfEditing */}
                                    <Violet400BackgroundButton
                                        type="button"
                                        onClick={handleNickNameCheck}
                                    >
                                        중복 검사
                                    </Violet400BackgroundButton>
                                </>) : (<>
                                    {/* strangerViewing */}
                                    {/* myselfViewing */}
                                </>)}

                            </Row>
                            {/* 중복 검사 후 코멘트 출력 */}
                            {renderNicknameNotice()}
                        </Div>

                        {contentsType === 'strangerViewing' ? (<>
                        </>) : (<>

                            <Div>
                                <Label>환불 계좌</Label>
                                <Row>
                                    <SelectButton
                                        style={{
                                            pointerEvents: contentsType === 'myselfEditing' ? '' : 'none',
                                            backgroundColor: contentsType === 'myselfEditing' ? '' : 'var(--violet200)' // 비활성화 색상
                                        }}
                                    >
                                        <option value="kb">국민은행</option>
                                        <option value="shinhan">신한은행</option>
                                        <option value="hana">하나은행</option>
                                        <option value="woori">우리은행</option>
                                        <option value="nh">농협은행</option>
                                        <option value="ibk">기업은행</option>
                                        <option value="sc">SC제일은행</option>
                                        <option value="kbank">케이뱅크</option>
                                        <option value="toss">토스뱅크</option>
                                        <option value="busan">부산은행</option>
                                        <option value="gwangju">광주은행</option>
                                        <option value="daegu">대구은행</option>
                                        <option value="jeonbuk">전북은행</option>
                                        <option value="jeju">제주은행</option>
                                        <option value="creditunion">신협중앙회</option>
                                    </SelectButton>
                                    <InputText
                                        type="text"
                                        placeholder="환불 계좌를 입력해주세요"
                                        readOnly={!(contentsType === 'myselfEditing')}
                                        value={isEditing ?
                                            (newProfileData?.refundAccount ? newProfileData?.refundAccount : "") :
                                            (profileData?.refundAccount ? profileData?.refundAccount : "")}
                                        onChange={(e) => handleInputChange('refundAccount', e.target.value)}
                                    />
                                </Row>
                            </Div>
                        </>)}
                    </ModalContentWrapper>
                    <ContentsRow>
                        <Column>
                            {contentsType === 'strangerViewing' ? (<>
                            </>) : (<>
                                <Div>
                                    <Label>이메일</Label>
                                    <Row>
                                        <InputText
                                            type="email"
                                            readOnly={true}
                                            placeholder="이메일은 필수값입니다"
                                            value={isEditing ?
                                                (newProfileData?.email ? newProfileData?.email : "") :
                                                (profileData?.email ? profileData?.email : "")}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                    </Row>
                                </Div>
                            </>)}

                            <Div>
                                <Label>이름</Label>
                                <Row>
                                    <InputText
                                        type="text"
                                        placeholder="이름을 입력해주세요"
                                        readOnly={!(contentsType === 'myselfEditing')}
                                        value={isEditing ?
                                            (newProfileData?.name ? newProfileData?.name : "") :
                                            (profileData?.name ? profileData?.name : "")}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                    />
                                </Row>
                            </Div>
                        </Column>
                        <Column>
                            <Div>
                                <Label>활동 점수</Label>
                                <Row>
                                    <ActivityScoreBar activityMetricData={profileData?.activityMetric} />
                                </Row>
                            </Div>
                        </Column>
                    </ContentsRow>
                </SubContentsWrapper>

                <SubContentsWrapper>
                    <div>
                        <SubTitle>경력 정보</SubTitle>
                        <Hr />
                    </div>
                    <Div>
                        <Label>직무</Label>
                        <Row>
                            <InputText
                                placeholder="직무를 입력하세요"
                                type="text"
                                readOnly={!(contentsType === 'myselfEditing')}
                                value={isEditing ?
                                    (newProfileData?.jobTitle ? newProfileData?.jobTitle : "") :
                                    (profileData?.jobTitle ? profileData?.jobTitle : "")}
                                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                            />
                        </Row>
                    </Div>
                    <Div>
                        <Label>소속</Label>
                        <Row>
                            <InputText
                                type="text"
                                placeholder="소속을 입력하세요"
                                readOnly={!(contentsType === 'myselfEditing')}
                                value={isEditing ?
                                    (newProfileData?.organization ? newProfileData?.organization : "") :
                                    (profileData?.organization ? profileData?.organization : "")}
                                onChange={(e) => handleInputChange('organization', e.target.value)}
                            />
                        </Row>
                    </Div>
                    <Div>
                        <Label>경력</Label>

                        <Row>
                            <InputNumber
                                placeholder="경력"
                                style={{ textAlign: 'start', }}
                                readOnly={!(contentsType === 'myselfEditing')}
                                value={isEditing ?
                                    (newProfileData?.experience ? newProfileData?.experience : "") :
                                    (profileData?.experience ? profileData?.experience : "")}
                                onChange={(e) => handleInputChange('experience', e.target.value)}
                                min={0}
                                max={100}
                                step={1} // 1단위로 증가/감소
                            />
                            <span style={{ height: '100%', lineHeight: '35px' }}>년</span>
                        </Row>
                    </Div>
                </SubContentsWrapper>
            </ContentsRow >

            <EtcContentsWrapper>
                <div>
                    <SubTitle>기타 정보</SubTitle>
                    <Hr />
                </div>
                <Div>
                    <Label>자기 소개</Label>
                    <Row>
                        <TextArea
                            placeholder="자기 소개를 입력해주세요"
                            value={isEditing ?
                                (newProfileData?.introduction ? newProfileData?.introduction : "WOLF에서 함께 성장하고 새로운 도전에 나서고 싶습니다!") :
                                (profileData?.introduction ? profileData?.introduction
                                    : 'WOLF에서 함께 성장하고 새로운 도전에 나서고 싶습니다!')}
                            onChange={(e) => handleInputChange("introduction", e.target.value)}
                            disabled={!(contentsType === 'myselfEditing')}
                        />
                    </Row>
                </Div>

                {newUserLinks.map((link, index) => (
                    <LinkInputDiv key={`link-${index}`}>
                        <span style={{
                            width: '30px', textAlign: 'center', marginTop: '4px'
                        }}>
                            {link.linkSvg}
                        </span>
                        {contentsType === 'myselfEditing' ? (
                            <>
                                {/* myselfEditing */}
                                <LinkInputDirection>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                            flexDirection: 'column',
                                            gap: '3px'
                                        }}
                                    >
                                        <InputText
                                            style={{
                                                border: '2px solid var(--violet500)',
                                                fontSize: '14px',
                                                color: 'black'
                                            }}
                                            type="text"
                                            placeholder="링크를 입력하세요"
                                            value={isEditing ?
                                                newUserLinks?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                                (profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl ?
                                                    profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                                    "")}
                                            onChange={(e) => handleInputLinkChange(link.linkType, e.target.value)}
                                        />
                                        {!isValidURL(isEditing ?
                                            newUserLinks?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                            (profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl ?
                                                profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                                "")) &&
                                            <span
                                                style={{
                                                    fontSize: '12px', color: '#ED4E51', marginLeft: '5px'
                                                }}>
                                                유효한 링크를 입력하세요
                                            </span>}
                                    </div>
                                    <LinkButtonGroup>
                                        <RefreshIcon type="button" onClick={() => editLinkRefresh(link.linkType)} />
                                        <Violet400BackgroundButton
                                            type="button"
                                            onClick={() => editLinkFinish(link.linkType)}
                                            disabled={!isValidURL(isEditing ?
                                                newUserLinks?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                                (profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl ?
                                                    profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                                    ""))}>
                                            등록
                                        </Violet400BackgroundButton>
                                    </LinkButtonGroup>
                                </LinkInputDirection>
                            </>
                        ) : (
                            <>
                                {/* strangerViewing */}
                                {/* myselfViewing */}
                                {/* 링크 보기 모드 */}
                                <ALinkText
                                    style={{ border: '2px solid rgba(255, 255, 255, 0)' }}
                                    href={(profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0] ?
                                        profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                        "")}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {(profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0] ?
                                        profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                        "")}
                                </ALinkText>
                                <CopyButton copyTarget={(profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0] ?
                                    profileData?.links?.filter(data => data.linkType === `${link.linkType}`)[0]?.linkUrl :
                                    "")}>
                                </CopyButton>
                            </>
                        )}

                    </LinkInputDiv>
                ))
                }
            </EtcContentsWrapper>
            {
                contentsType === 'strangerViewing' ?
                    (<>
                        {/* strangerViewing */}
                    </>)
                    : (<>
                        {/* myselfEditing */}
                        {/* myselfViewing */}
                        <ButtonGroupLeft>
                            <WithdrawalButton onClick={deleteUserHandler}>탈퇴하기</WithdrawalButton>
                        </ButtonGroupLeft>
                    </>)
            }
        </WrapperForm >
    );
};

export default UserInfoContent;