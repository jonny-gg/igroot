import React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import animation from '../_util/openAnimation';
import classNames from 'classnames';
export class AntTreeNode extends React.Component {
    render() {
        return <AntTreeNode {...this.props}/>;
    }
}
export default class Tree extends React.Component {
    render() {
        const props = this.props;
        const { prefixCls, className, showLine } = props;
        let checkable = props.checkable;
        const classString = classNames({
            [`${prefixCls}-show-line`]: !!showLine,
        }, className);
        return (<RcTree {...props} className={classString} checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
        {this.props.children}
      </RcTree>);
    }
}
Tree.TreeNode = TreeNode;
Tree.defaultProps = {
    prefixCls: 'ant-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
};
