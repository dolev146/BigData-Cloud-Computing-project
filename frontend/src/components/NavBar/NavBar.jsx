// import "./NavBar.css";
import NavBarUl from "./NavBarUl";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  position: fixed;
  background-color: var(--bg-primary);
  transition: width 600ms ease;

  @media only screen and (max-width: 600px) {
    bottom: 0;
    width: 100vw;
    height: 5rem;
  }

  @media only screen and (min-width: 600px) {
    top: 0;
    width: 4rem;
    height: 100vh;

    :hover {
      width: 16rem;
    }
    :hover ul li svg {
      transform: rotate(-180deg);
      margin-left: 11rem;
    }
  }
`;

const NavBar = () => {
  return (
    <StyledNavBar className="navbar">
      <NavBarUl />
    </StyledNavBar>
  );
};

export default NavBar;
