import React, { Component } from 'react';
import cx from 'classnames';

import styles from './TextInput.module.scss';

export default class TextInput extends Component {
  state = {
    value: '',
    touched: false,
  };

  setValue = e => {
    const { onChange } = this.props;

    this.setState({
      value: e.target.value,
      touched: true,
    });
    onChange(e.target.value);
  };

  render() {
    const { className, onChange, required, ...rest } = this.props;
    const { value, touched } = this.state;

    return (
      <input
        className={cx(styles.input, className, {
          [styles.error]: required && touched && value === '',
        })}
        onChange={this.setValue}
        required={required}
        type="text"
        value={value}
        {...rest}
      />
    );
  }
}
