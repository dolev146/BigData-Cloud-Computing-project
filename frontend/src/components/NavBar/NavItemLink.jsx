import React from "react";
import styled from "styled-components";

const StyledNavItemLink = styled.a`
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

const NavItemLink = ({ svgPaths, linkText }) => {
  return (
    <StyledNavItemLink href="#" className="nav-link">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fad"
        data-icon="cat"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="svg-inline--fa fa-cat fa-w-16 fa-9x"
      >
        <g className="fa-group">
          {svgPaths.map((path, index) => (
            <path
              key={index}
              fill="#0F3A97"
              d={path.d}
              className={path.className}
            />
          ))}
        </g>
      </svg>
      <span className="link-text">{linkText}</span>
    </StyledNavItemLink>
  );
};

export default NavItemLink;
