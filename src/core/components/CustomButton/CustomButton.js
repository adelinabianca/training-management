import React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './CustomButton.module.scss';


const CustomButton = (props) => {
    const { onClick, children, isLoading = false, disabled = false } = props;
    return (
        <Button 
          className={[styles.button, isLoading || disabled ? styles.isDisabled : ''].join(' ')} 
          onClick={onClick}
          disabled={isLoading || disabled}>
          {isLoading ? <CircularProgress size={20} className={styles.loadingCircle} /> : children}
        </Button>
    )
}

export default CustomButton;