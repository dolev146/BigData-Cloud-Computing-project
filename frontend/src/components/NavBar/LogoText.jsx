// import './LogoText.css'
import styled from "styled-components";

const StyledLinkText = styled.span`
  /* display: none; */

  margin-left: 1rem;
  display: inline;
  position: absolute;
  left: -999px;
  transition: var(--transition-speed);
  &:hover {
    color: wheat;
    left: 0;
  }

`;

const LogoText = () => {
  return <StyledLinkText>BigData</StyledLinkText>;
};

export default LogoText;
