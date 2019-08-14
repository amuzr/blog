import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { PageContext } from '../templates/post';

const PostFooterStyle = css`
  background-color: var(--whitegrey);
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
`;

const FooterWrapper = styled.div`
  width: 100%;

  .inner {
    display: flex;
    padding: 3em 2em;
    margin: 0 auto;
    max-width: 700px;
  }
`;

const FooterLink = styled.div`
  flex: 1 1 300px;
  padding: 0 2em;

  .label {
    font-family: 'Avenir', 'Open Sans', sans-serif;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.28);
    font-weight: 600;
  }

  .label:last-child {
    text-align: right;
  }
`;

interface PostFooterProps {
  prev: PageContext;
  next: PageContext;
}

const PostFooter: React.FC<PostFooterProps> = ({ prev, next }) => {
  return (
    <aside css={PostFooterStyle} role="navigation">
      <FooterWrapper>
        <div className="inner">
          {prev && (
            <FooterLink>
              <a href={prev.fields.slug} rel="prev">
                <p className="label">Previous</p>
                <h3 className="article">{prev.frontmatter.title}</h3>
              </a>
            </FooterLink>
          )}
          {next && (
            <FooterLink>
              <a href={next.fields.slug} rel="next">
                <p className="label">Next</p>
                <h3 className="article">{next.frontmatter.title}</h3>
              </a>
            </FooterLink>
          )}
        </div>
      </FooterWrapper>
    </aside>
  );
};

export default PostFooter;
