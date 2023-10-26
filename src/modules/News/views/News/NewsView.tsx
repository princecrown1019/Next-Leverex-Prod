import React, { FC } from 'react';

import clsx from 'clsx';

// import { TabsComponent } from '~/components/Tabs/TabsComponent';
// import { ButtonComponent } from '~/components/Button/ButtonComponent';
// import { SearchIcon } from '~/assets/Icons';
import { BlogPreviewComponent } from '~/modules/News/components/BlogPreview/BlogPreviewComponent';

import style from './style.module.scss';

export type Props = {
  className?: string;
};

const desc = 'Leverex.io today announced the launch of its derivatives trading platform and rolling futures product.';

// const tabs = ['Leverex', 'Announcements', 'News'];

export const NewsView: FC<Props> = ({ className }) => (
  <div>
    <div className={style.navigation}>
      {/*<TabsComponent className={style.tabs} tabClassName={style.tabsItem} tabs={tabs} />*/}
      {/*<ButtonComponent className={style.searchButton} withoutRipple>*/}
      {/*  <SearchIcon />*/}
      {/*</ButtonComponent>*/}
    </div>
    <div className={clsx(style.blogs, className)}>
      <BlogPreviewComponent
        className={style.blog}
        headline="Leverex Announces the Launch of its Derivatives Trading Platform"
        description={desc}
        author="Leverex team"
        href="/news/leverex-announces-the-launch"
        image="/static/media/news/press-release-asset.png"
      />
    </div>
  </div>
);
