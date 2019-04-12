import React from 'react';
import styles from './Error.module.scss';

export default ({ error }) => {
  return error && error.message ? <div className={styles.error}>{error.message}</div> : null;
};
