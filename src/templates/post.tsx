import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import { css } from '@emotion/core';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostContent from '../components/PostContent';
import PostFooter from '../components/PostFooter';
import IndexLayout from '../layouts';

import { ArticleWrapper, PostTitle, PostDate } from '../styles/shared';
import { colors } from '../styles/colors';

const PostTemplateStyle = css`
  flex: 1 1 auto;
  align-items: center;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

const PostFullImage = styled.figure`
  margin: 0 -10vw -165px;
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 0 -4vw -100px;
    height: 600px;
    border-radius: 0;
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

interface PostTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image?: {
          childImageSharp: {
            fluid: any;
          };
        };
        tags: string[];
      };
    };
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
    collection: string;
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
            {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
              <PostFullImage>
                <Img
                  style={{ height: '100%' }}
                  fluid={post.frontmatter.image.childImageSharp.fluid}
                />
              </PostFullImage>
            )}
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
        image {
          childImageSharp {
            fluid(maxWidth: 3720) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
