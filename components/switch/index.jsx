import React from 'react';
import PropTypes from 'prop-types';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
export default class Switch extends React.Component {
    render() {
        const { prefixCls, size, className = '' } = this.props;
        const classes = classNames(className, {
            [`${prefixCls}-small`]: size === 'small',
        });
        return <RcSwitch {...this.props} className={classes}/>;
    }
}
Switch.defaultProps = {
    prefixCls: 'ant-switch',
};
Switch.propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/ant-design/ant-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string,
};
