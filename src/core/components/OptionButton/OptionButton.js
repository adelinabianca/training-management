import React from 'react';

import styles from './OptionButton.module.scss';

const OptionButton = (props) => {
    const { icon, isSelected, title, subtitle, onSelect } = props;
    return (
        <div className={[styles.option, isSelected ? styles.isActive : ''].join(' ')} onClick={onSelect}>
            {icon}
            <h4>{title}</h4>
            <div className={styles.subtitle}>{subtitle}</div>
        </div>
    )

};

export default OptionButton;