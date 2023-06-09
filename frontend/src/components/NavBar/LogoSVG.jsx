import styled from "styled-components";

const StyledSVG = styled.svg`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: red;
  /* background: var(--bg-secondary); */
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  width: 100%;
  transform: rotate(0deg);
  transition: var(--transition-speed);

  @media only screen and (max-width: 600px) {
    display: none;
  }

  @media only screen and (min-width: 600px) {
    &:hover {
      transform: rotate(-180deg);
      margin-left: 11rem;
    }
  }
`;

const LogoSVG = () => {
  return (
    <StyledSVG
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="angle-double-right"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x svg"
    >
      <g className="fa-group">
        <path
          fill="currentColor"
          d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
          className="fa-secondary"
        ></path>
        <path
          fill="currentColor"
          d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
          className="fa-primary"
        ></path>
      </g>
    </StyledSVG>
  );
};

export default LogoSVG;
