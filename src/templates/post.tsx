import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { css } from '@emotion/core';
import { Helmet } from 'react-helmet';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostContent from '../components/PostContent';
import PostFooter from '../components/PostFooter';
import IndexLayout from '../layouts';

import { ArticleWrapper, PostTitle, PostDate } from '../styles/shared';

const PostTemplateStyle = css`
  flex: 1 1 auto;
  align-items: center;
`;

interface PostTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    markdownRemark: any;
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image?: {
      childImageSharp: {
        fluid: any;
      };
    };
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: {
      id: string;
      bio: string;
      avatar: {
        children: Array<{
          fixed: {
            src: string;
          };
        }>;
      };
    };
  };
}

const PostTemplate: React.FC<PostTemplateProps> = props => {
  const post = props.data.markdownRemark;

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang="ko" />
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <Wrapper>
        <Header />
        <main css={PostTemplateStyle} role="main">
          <ArticleWrapper role="article">
            <header>
              <PostTitle>{post.frontmatter.title}</PostTitle>
              <PostDate dateTime={post.frontmatter.date}>{post.frontmatter.userDate}</PostDate>
            </header>
            <PostContent htmlAst={post.htmlAst} />
          </ArticleWrapper>
          <PostFooter prev={props.pageContext.prev} next={props.pageContext.next} />
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default PostTemplate;

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt(truncate: true)
      timeToRead
      frontmatter {
        title
        userDate: date(formatString: "YYYY MMMM D")
        date
        tags
      }
    }
  }
`;
