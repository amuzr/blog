import * as React from 'react';
import { css } from '@emotion/core';

import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import { PostFullContent } from '../components/PostContent';
import { outer, ArticleWrapper, PostTitle } from '../styles/shared';

import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-top: 4vw;
    padding-bottom: 4vw;
  }
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <Header />
      <main id="site-main" className="site-main" css={[outer]}>
        <ArticleWrapper role="article">
          <header>
            <PostTitle>Happy coding !</PostTitle>
          </header>
          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>포스팅 & 한달에 한개 프로젝트</p>
            </div>
          </PostFullContent>
        </ArticleWrapper>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
