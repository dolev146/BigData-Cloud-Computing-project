import LogoSVG from "./LogoSVG";
import LogoText from "./LogoText";
import styled from "styled-components";
// import "./NavLink.css";

const StyledNavLink = styled.a`
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-primary);
  text-decoration: none;
  filter: grayscale(70%) opacity(0.7);
  transition: var(--transition-speed);

  :hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }

  @media only screen and (max-width: 600px) {
    justify-content: center;
  }

  svg {
    width: 2rem;
    min-width: 2rem;
    margin: 1rem;
  }
`;

const NavLink = () => {
  return (
    <StyledNavLink href="#">
      <LogoText />
      <LogoSVG />
    </StyledNavLink>
  );
};

export default NavLink;
