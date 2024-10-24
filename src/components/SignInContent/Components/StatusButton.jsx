import styled from 'styled-components';

import React from 'react';

// components/SignInContent/Components/StatusButton.jsx
export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

// components/SignInContent/Components/StatusButton.jsx
export const StatusButtonLine = styled.div`
  width: 25px;
  height: 2px;
  background-color: var(--black500);
  margin: 0 10px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 20px;
    margin: 0 8px;
  }

  @media (max-width: 480px) {
    width: 15px;
    margin: 0 6px;
  }
`;


// components/SignInContent/Components/StatusButton.jsx
export const CircleButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ active }) =>
        active ? "var(--violet500)" : "var(--black200)"};
  color: ${({ active }) => (active ? "#fff" : "var(--black000)")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }
`;

const StatusButton = ({ nowIndex }) => {
    const buttons = Array(4).fill(null).map((_, i) => (
        <>
            <CircleButton active={i === nowIndex}>{i + 1}</CircleButton>
            {i < 3 && <StatusButtonLine />}
        </>
    ));

    return <StatusContainer>{buttons}</StatusContainer>;
};

export default StatusButton;
