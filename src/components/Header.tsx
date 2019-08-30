import { Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from '../website-config';

const HeaderStyles = css`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  margin-bottom: 4rem;
  padding: 1.2rem 0 2rem;
  width: 100%;

  @media (max-width: 500px) {
    margin-bottom: 0.2rem;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  a {
    color: #1c2437;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  margin-left: auto;
  /* justify-content: space-between; */
  width: auto;
`;

const HeaderLink = css`
  margin-left: 2.1rem;
  font-family: 'Nanum Myeongjo', 'Open Sans', sans-serif;
  font-size: 1.5rem;
  line-height: 1.6;
  padding: 0;
  color: rgba(0, 0, 0, 0.7);
  /* transition: background .2s ease-in-out; */

  @media (max-width: 500px) {
    margin-left: 1.2rem;
  }

  :hover {
    /* color: rgba(0, 0, 0, 0.84); */
    /* background: #FFEA00; */
    /* border-radius: 8px; */
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 0 #2b2b2b;
  }
`;

const Header: React.FC<any> = () => {
  return (
    <header css={HeaderStyles} role="banner">
      <HeaderTitle>
        <a title={config.title} href={config.siteUrl}>
          {config.title}
        </a>
      </HeaderTitle>
      <HeaderNav role="navigation">
        <Link css={HeaderLink} to="/">
          Posts
        </Link>
        <Link css={HeaderLink} to="/about">
          About
        </Link>
      </HeaderNav>
    </header>
  );
};

export default Header;
