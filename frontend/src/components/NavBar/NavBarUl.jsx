import styled from "styled-components";
import Logo from "./Logo";
// import "./NavBarUl.css";

const StyledNavBarUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  @media only screen and (max-width: 600px) {
    flex-direction: row;
  }
`;

const NavBarUl = () => {
  return (
    <StyledNavBarUl>
      <Logo />
    </StyledNavBarUl>
  );
};

export default NavBarUl;
