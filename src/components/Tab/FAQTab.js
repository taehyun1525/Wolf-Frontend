import styled from "styled-components";

import React from "react";

const FAQTabWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--black200);
  width: 100%;
`;

const FAQTabButton = styled.button`
  white-space: nowrap;
  font-size: 18px;
  width: auto;
  text-align: center;
  min-height: 50px;
  background: none;
  flex: 1;
  outline: none;
  border: 1px solid var(--black100);

  color: ${(props) => (props.active ? 'var(--violet600)' : 'var(--black600)')};
  background-color: ${(props) => (props.active ? '' : '')};
  border-bottom: ${(props) => (props.active ? '2px solid var(--violet600)' : 'none')};

  &:hover {
    background-color: var(--black100);
  }

  @media (max-width: 768px) {
    font-size: 17px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;


const FAQTab = ({ tab, activeTab, changeTab }) => {
    return (
        <FAQTabWrapper>
            {tab.map((tab) => (
                <FAQTabButton
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => changeTab(tab)}
                >
                    {tab}
                </FAQTabButton>
            ))}
        </FAQTabWrapper>
    );
}

export default FAQTab;