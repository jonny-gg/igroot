import React from 'react';
import PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import Icon from '../icon';
export default class Rate extends React.Component {
    render() {
        return <RcRate {...this.props}/>;
    }
}
Rate.propTypes = {
    prefixCls: PropTypes.string,
    character: PropTypes.node,
};
Rate.defaultProps = {
    prefixCls: 'ant-rate',
    character: <Icon type="star"/>,
};
