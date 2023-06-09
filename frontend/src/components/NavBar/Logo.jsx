// import "./Logo.css";
import styled from "styled-components";
import NavLink from "./NavLink";

const StyledLogo = styled.li`
  width: 100%;
`;

const Logo = () => {
  return (
    <StyledLogo>
      <NavLink />
    </StyledLogo>
  );
};

export default Logo;
