import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import {GITHUB_ADDRESS} from "@/constants";

const Footer: React.FC = () => {
  const defaultMessage = '云出品';
  const currentYear = new Date().getFullYear()
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <><GithubOutlined/> 贰拾 Github </>,
          href: GITHUB_ADDRESS,
          blankTarget: true,
        },
        {
          key: 'codeNav',
          title: '湘ICP备2024062025号',
          href: 'https://beian.miit.gov.cn',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
