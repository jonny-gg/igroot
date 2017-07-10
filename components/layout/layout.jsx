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
import classNames from 'classnames';
function generator(props) {
    return (Basic) => {
        return class Adapter extends React.Component {
            render() {
                const { prefixCls } = props;
                return <Basic prefixCls={prefixCls} {...this.props}/>;
            }
        };
    };
}
class Basic extends React.Component {
    render() {
        const _a = this.props, { prefixCls, className, children } = _a, others = __rest(_a, ["prefixCls", "className", "children"]);
        let hasSider;
        React.Children.forEach(children, (element) => {
            if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
                hasSider = true;
            }
        });
        const divCls = classNames(className, prefixCls, {
            [`${prefixCls}-has-sider`]: hasSider,
        });
        return (<div className={divCls} {...others}>{children}</div>);
    }
}
const Layout = generator({
    prefixCls: 'ant-layout',
})(Basic);
const Header = generator({
    prefixCls: 'ant-layout-header',
})(Basic);
const Footer = generator({
    prefixCls: 'ant-layout-footer',
})(Basic);
const Content = generator({
    prefixCls: 'ant-layout-content',
})(Basic);
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
export default Layout;
