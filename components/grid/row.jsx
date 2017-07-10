var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import assign from 'object-assign';
import PropTypes from 'prop-types';
export default class Row extends React.Component {
    render() {
        const _a = this.props, { type, justify, align, className, gutter, style, children, prefixCls = 'ant-row' } = _a, others = __rest(_a, ["type", "justify", "align", "className", "gutter", "style", "children", "prefixCls"]);
        const classes = classNames({
            [prefixCls]: !type,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${type}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align,
        }, className);
        const rowStyle = gutter > 0 ? assign({}, {
            marginLeft: gutter / -2,
            marginRight: gutter / -2,
        }, style) : style;
        const cols = Children.map(children, (col) => {
            if (!col) {
                return null;
            }
            if (col.props && gutter > 0) {
                return cloneElement(col, {
                    style: assign({}, {
                        paddingLeft: gutter / 2,
                        paddingRight: gutter / 2,
                    }, col.props.style),
                });
            }
            return col;
        });
        return <div {...others} className={classes} style={rowStyle}>{cols}</div>;
    }
}
Row.defaultProps = {
    gutter: 0,
};
Row.propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.number,
    prefixCls: PropTypes.string,
};
