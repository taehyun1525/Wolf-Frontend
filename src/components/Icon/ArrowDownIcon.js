import styled from "styled-components";
import { CommonButton, NoBackground, NoBackgroundHover2 } from "../GlobalStyledComponents";

const ArrowDownIconWrapper = styled.button`
    ${CommonButton}
    ${NoBackground}
    ${NoBackgroundHover2}
    padding: 10px;
`;

const ArrowDownIcon = ({ ...props }) => {

    return (
        <ArrowDownIconWrapper type="button" {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
            </svg>
        </ArrowDownIconWrapper>
    );
}

export default ArrowDownIcon;


