import { graphql } from 'gatsby';
import * as React from 'react';
import { css } from '@emotion/core';
import { Helmet } from 'react-helmet';

import config from '../website-config';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import IndexLayout from '../layouts';

import { PageContext } from './post';

const IndexPageStyle = css`
  flex: 1 1 auto;
  align-items: center;
`;

export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = props => {
  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang="ko" />
        <title>{config.title}</title>
        <meta name="description" content="test" />
      </Helmet>
      <Wrapper>
        <Header />
        <main css={IndexPageStyle} role="main">
          {props.data.allMarkdownRemark.edges.map(post => {
            // filter out drafts in production
            return (
              (post.node.frontmatter.draft !== true || process.env.NODE_ENV !== 'production') && (
                <PostCard key={post.node.fields.slug} post={post.node} />
              )
            );
          })}
        </main>
        {props.children}
        <Pagination
          currentPage={props.pageContext.currentPage}
          numPages={props.pageContext.numPages}
        />
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            draft
          }
          excerpt(truncate: true)
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
