import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createDOMForm from 'rc-form/lib/createDOMForm';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import omit from 'omit.js';
import assign from 'object-assign';
import createReactClass from 'create-react-class';
import warning from '../_util/warning';
import FormItem from './FormItem';
import { FIELD_META_PROP } from './constants';
export default class Form extends React.Component {
    constructor(props) {
        super(props);
        warning(!props.form, 'It is unnecessary to pass `form` to `Form` after antd@1.7.0.');
    }
    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }
    getChildContext() {
        const { layout, vertical } = this.props;
        return {
            vertical: layout === 'vertical' || vertical,
        };
    }
    render() {
        const { prefixCls, hideRequiredMark, className = '', layout, 
        // @deprecated
        inline, horizontal, vertical, } = this.props;
        warning(!inline && !horizontal && !vertical, '`Form[inline|horizontal|vertical]` is deprecated, please use `Form[layout]` instead.');
        const formClassName = classNames(prefixCls, {
            [`${prefixCls}-horizontal`]: (!inline && !vertical && layout === 'horizontal') || horizontal,
            [`${prefixCls}-vertical`]: layout === 'vertical' || vertical,
            [`${prefixCls}-inline`]: layout === 'inline' || inline,
            [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
        }, className);
        const formProps = omit(this.props, [
            'prefixCls',
            'className',
            'layout',
            'inline',
            'horizontal',
            'vertical',
            'form',
            'hideRequiredMark',
        ]);
        return <form {...formProps} className={formClassName}/>;
    }
}
Form.defaultProps = {
    prefixCls: 'ant-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit(e) {
        e.preventDefault();
    },
};
Form.propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool,
};
Form.childContextTypes = {
    vertical: PropTypes.bool,
};
Form.Item = FormItem;
Form.create = function (options) {
    const formWrapper = createDOMForm(assign({
        fieldNameProp: 'id',
    }, options, {
        fieldMetaProp: FIELD_META_PROP,
    }));
    /* eslint-disable react/prefer-es6-class */
    return (Component) => formWrapper(createReactClass({
        propTypes: {
            form: PropTypes.object.isRequired,
        },
        childContextTypes: {
            form: PropTypes.object.isRequired,
        },
        getChildContext() {
            return {
                form: this.props.form,
            };
        },
        componentWillMount() {
            this.__getFieldProps = this.props.form.getFieldProps;
        },
        deprecatedGetFieldProps(name, option) {
            warning(false, '`getFieldProps` is not recommended, please use `getFieldDecorator` instead, ' +
                'see: http://u.ant.design/get-field-decorator');
            return this.__getFieldProps(name, option);
        },
        render() {
            this.props.form.getFieldProps = this.deprecatedGetFieldProps;
            const withRef = {};
            if (options && options.withRef) {
                withRef.ref = 'formWrappedComponent';
            }
            return <Component {...this.props} {...withRef}/>;
        },
    }));
};
