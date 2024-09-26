import React, { useState } from 'react';
import styled from 'styled-components';
import TabContentsWrapper from "../TabContentsWrapper";
import CommentSection from "./Question/CommentSection";
import QuestionList from "./Question/QuestionList";
import QuestionForm from "./Question/QuestionForm";

const MeetingContainer = styled(TabContentsWrapper)`
    padding: 20px;
    border-radius: 0 0 3px 3px;
`;

const MeetingHeader = styled.h3`
    display: flex;
    font-size: 16px;
    font-weight: 500;
    color: var(--black800);
    text-align: left;
`;

const MeetingContent = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'gahyun',
            text: '백엔드는 정말 어렵네요. 추가로 공부할만한 책이 있나요?',
            date: '2024.08.28',
            file: null,
            comments: [

            ],
        },
        {
            id: 2,
            author: 'myeongju',
            text: '화면구현이 빨리 끝나야할텐데...언제까지 가능하신지 댓글로 남겨주세요',
            date: '2024.09.20',
            file: null,
            comments: [],
        },
    ]);

    const [newQuestion, setNewQuestion] = useState('');
    const [newQuestionFile, setNewQuestionFile] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(null);

    // 게시글 추가
    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (newQuestion.trim()) {
            const newPostObj = {
                id: posts.length + 1,
                author: 'currentUser',
                text: newQuestion,
                date: new Date().toLocaleDateString(),
                file: newQuestionFile,
                comments: [],
            };
            setPosts([...posts, newPostObj]);
            setNewQuestion('');
            setNewQuestionFile(null);
        }
    };

    // 댓글 토글
    const toggleComments = (postId) => {
      setSelectedPostId(selectedPostId === postId ? null : postId);
    };

    const renderComments = (comments) => (
        <CommentSection
            comments={comments}
            onSubmit={handleCommentSubmit}
        />
    );

    // 댓글 추가
    const handleCommentSubmit = (postId) => {
      if (newComment.trim()) {
        const updatedPosts = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, { author: 'currentUser', text: newComment, date: new Date().toLocaleDateString() }],
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        setNewComment('');
      }
    };

    // 게시글 삭제
    const handlePostDelete = (postId) => {
      setPosts(posts.filter((post) => post.id !== postId));
    };

    // 게시글 수정
    const handlePostEdit = (postId, updatedText) => {
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, text: updatedText } : post
        )
      );
    };

    // 파일 추가/변경
    const handleFileChange = (postId, newFile) => {
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, file: newFile } : post
        )
      );
    };

    return (
        <MeetingContainer>
            {/*미팅 버튼 */}

            <MeetingHeader>팀원들과 궁금한 내용을 나눠보세요!</MeetingHeader>

            {/* 게시글 작성 영역 */}
            <QuestionForm
                newQuestion={newQuestion}
                setNewQuestion={setNewQuestion}
                newQuestionFile={newQuestionFile}
                setNewQuestionFile={setNewQuestionFile}
                handleQuestionSubmit={handlePostSubmit}
            />
            <QuestionList
                questions={posts}
                selectedQuestionId={selectedPostId}
                toggleComments={toggleComments}
                renderComments={renderComments}
                handleFileChange={(id, file) => {}}
                handleQuestionEdit={(id, text) => {}}
                handleQuestionDelete={(id) => {}}
            />
          </MeetingContainer>
    );
};

export default MeetingContent;