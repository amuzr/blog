import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const outer = css`
  position: relative;
  padding: 0 4vw;
`;

// Centered content container blocks
export const inner = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;

export const ArticleWrapper = styled.article``;

export const PostTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;
export const PostDate = styled.time`
  display: block;
  font-family: 'Avenir';
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.58);
  /* margin: 0.3rem 0; */
`;
