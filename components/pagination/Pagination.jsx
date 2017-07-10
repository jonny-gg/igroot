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
import RcPagination from 'rc-pagination';
import zhCN from 'rc-pagination/lib/locale/zh_CN';
import classNames from 'classnames';
import injectLocale from '../locale-provider/injectLocale';
import Select from '../select';
import MiniSelect from './MiniSelect';
class Pagination extends React.Component {
    render() {
        const _a = this.props, { className, size } = _a, restProps = __rest(_a, ["className", "size"]);
        const locale = this.getLocale();
        const isSmall = size === 'small';
        return (<RcPagination {...restProps} className={classNames(className, { mini: isSmall })} selectComponentClass={isSmall ? MiniSelect : Select} locale={locale}/>);
    }
}
Pagination.defaultProps = {
    prefixCls: 'ant-pagination',
    selectPrefixCls: 'ant-select',
};
const injectPaginationLocale = injectLocale('Pagination', zhCN);
export default injectPaginationLocale(Pagination);
