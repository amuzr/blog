import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';

const PostCardStyle = css`
  margin: 0 0 4rem;
  display: flex;

  @media (max-width: 500px) {
    flex-direction: column;
    /* margin: 0 0 4rem; */
  }
`;
const PostCardContent = styled.div`
  width: 100%;
`;
const PostCardTitle = styled.h1`
  font-weight: 700;
  margin: 0;

  a {
    color: rgba(0, 0, 0, 0.8);
  }
`;
const PostCardExcerpt = styled.div`
  margin: 0.3rem 0 0.4em;
  line-height: 1.45;
`;
const ReadingTime = styled.div`
  display: block;
  font-family: 'Avenir';
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.58);
  /* margin: 0.3rem 0; */
`;
const PostCardImage = styled.div`
  margin-left: 2rem;

  img {
    width: 9rem;
  }

  @media (max-width: 500px) {
    margin: 0;
    order: -1;

    .card__img {
        width: 100%;
    }
`;

export interface PostCardProps {
  post: PageContext;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="post-card" css={PostCardStyle} role="article">
      <Link to={post.fields.slug}>
        <PostCardContent className="post-card-content">
          <header>
            <PostCardTitle>{post.frontmatter.title}</PostCardTitle>
          </header>
          <PostCardExcerpt>
            <p>{post.excerpt}</p>
          </PostCardExcerpt>
          <ReadingTime>{post.timeToRead} min read</ReadingTime>
        </PostCardContent>
      </Link>
      {post.frontmatter.image && (
        <Link to={post.fields.slug}>
          <PostCardImage>
            <Img
              alt={post.frontmatter.title}
              style={{ height: '100%' }}
              fluid={post.frontmatter.image.childImageSharp.fluid}
            />
          </PostCardImage>
        </Link>
      )}
    </article>
  );
};

export default PostCard;
