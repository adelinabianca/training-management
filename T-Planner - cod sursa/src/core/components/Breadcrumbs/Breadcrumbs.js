import React, { memo } from 'react';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = (props) => {
  const { crumbs, handleClick } = props;
  if (!crumbs) {
    return '';
  }

  return (
    <span
      className={styles.container}
      role="button"
    >
      <span>{crumbs.image ? crumbs.image : ''}</span>
      <span 
        className={styles.crumbName}
        onClick={(e) => {
          handleClick(crumbs.value);
          e.stopPropagation();
        }}
      >
        {crumbs.displayName}
      </span>
      {crumbs.child ? '>' : ''}
      {crumbs.child ? <Breadcrumbs crumbs={crumbs.child} handleClick={handleClick} /> : ''}
    </span>
  );
};

export default memo(Breadcrumbs);
