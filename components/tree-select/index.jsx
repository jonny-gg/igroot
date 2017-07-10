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
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import injectLocale from '../locale-provider/injectLocale';
class TreeSelect extends React.Component {
    render() {
        const locale = this.getLocale();
        const _a = this.props, { prefixCls, className, size, notFoundContent = locale.notFoundContent, dropdownStyle } = _a, restProps = __rest(_a, ["prefixCls", "className", "size", "notFoundContent", "dropdownStyle"]);
        const cls = classNames({
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
        }, className);
        let checkable = restProps.treeCheckable;
        if (checkable) {
            checkable = <span className={`${prefixCls}-tree-checkbox-inner`}/>;
        }
        return (<RcTreeSelect {...restProps} prefixCls={prefixCls} className={cls} dropdownStyle={Object.assign({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle)} treeCheckable={checkable} notFoundContent={notFoundContent}/>);
    }
}
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect.defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
    dropdownClassName: 'ant-select-tree-dropdown',
};
// Use Select's locale
const injectSelectLocale = injectLocale('Select', {});
export default injectSelectLocale(TreeSelect);
