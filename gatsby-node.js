const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const { permalink, layout, primaryTag } = node.frontmatter;
    const { relativePath, sourceInstanceName } = getNode(node.parent);

    let slug = permalink;

    if (!slug) {
      slug =
        sourceInstanceName === 'content' ?
          `/${relativePath.replace('.md', '')}/` :
          `/${sourceInstanceName}/${relativePath.replace('.md', '')}/`;
    }

    createNodeField({
      node,
      name: 'collection',
      value: sourceInstanceName,
    });

    // Used to generate URL to view this content.
    createNodeField({
      node,
      name: 'slug',
      value: slug || '',
    });

    // Used to determine a page layout.
    createNodeField({
      node,
      name: 'layout',
      value: layout || '',
    });

    createNodeField({
      node,
      name: 'primaryTag',
      value: primaryTag || '',
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: ASC }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            excerpt(truncate: true)
            timeToRead
            frontmatter {
              title
              tags
              date
              draft
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
            fields {
              layout
              slug
              collection
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Create post pages
  const posts = result.data.allMarkdownRemark.edges.filter(
    edge => edge.node.fields.collection === 'content',
  );

  // Create paginated index
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/${i + 1}`,
      component: path.resolve('./src/templates/index.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(({ node }, index) => {
    const { slug, layout } = node.fields;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : '',
      },
    });
  });

  // Create post pages
  const projects = result.data.allMarkdownRemark.edges.filter(
    edge => edge.node.fields.collection === 'project',
  );

  // Create paginated index
  const projectsPerPage = 6;
  const projectNumPages = Math.ceil(projects.length / projectsPerPage);

  Array.from({ length: projectNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/project/' : `/project/${i + 1}`,
      component: path.resolve('./src/templates/project.tsx'),
      context: {
        limit: projectsPerPage,
        skip: i * projectsPerPage,
        projectNumPages,
        currentPage: i + 1,
      },
    });
  });

  projects.forEach(({ node }, index) => {
    const { slug, layout } = node.fields;
    const prev = index === 0 ? null : projects[index - 1].node;
    const next = index === projects.length - 1 ? null : projects[index + 1].node;

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : '',
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === 'develop' || stage === 'develop-html') {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};
