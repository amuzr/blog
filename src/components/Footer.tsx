import * as React from 'react';
import { css } from '@emotion/core';

import config from '../website-config';

const FooterStyle = css`
  padding: 2rem 0;
  color: #8a8e99;
  font-size: 1.5rem;
  flex: 0 0 auto;

  div,
  a {
    color: #8a8e99;
    font-family: 'Avenir', 'Open Sans', serif;
  }
`;

const Footer: React.FC<any> = () => {
  return (
    <footer css={FooterStyle} role="contentinfo">
      <div>
        Copyright &copy; 2019 <a href={config.siteUrl}>{config.title}</a> &bull; All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
