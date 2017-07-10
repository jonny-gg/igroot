import React from 'react';
import RcMenu, { Item, Divider, SubMenu, ItemGroup } from 'rc-menu';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = (e) => {
            this.setOpenKeys([]);
            const { onClick } = this.props;
            if (onClick) {
                onClick(e);
            }
        };
        this.handleOpenChange = (openKeys) => {
            this.setOpenKeys(openKeys);
            const { onOpenChange } = this.props;
            if (onOpenChange) {
                onOpenChange(openKeys);
            }
        };
        warning(!('onOpen' in props || 'onClose' in props), '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' +
            'see: http://u.ant.design/menu-on-open-change.');
        let openKeys;
        if ('defaultOpenKeys' in props) {
            openKeys = props.defaultOpenKeys;
        }
        else if ('openKeys' in props) {
            openKeys = props.openKeys;
        }
        this.state = {
            openKeys: openKeys || [],
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.mode === 'inline' &&
            nextProps.mode !== 'inline') {
            this.switchModeFromInline = true;
        }
        if ('openKeys' in nextProps) {
            this.setState({ openKeys: nextProps.openKeys });
        }
    }
    setOpenKeys(openKeys) {
        if (!('openKeys' in this.props)) {
            this.setState({ openKeys });
        }
    }
    render() {
        let openAnimation = this.props.openAnimation || this.props.openTransitionName;
        if (this.props.openAnimation === undefined && this.props.openTransitionName === undefined) {
            switch (this.props.mode) {
                case 'horizontal':
                    openAnimation = 'slide-up';
                    break;
                case 'vertical':
                    // When mode switch from inline
                    // submenu should hide without animation
                    if (this.switchModeFromInline) {
                        openAnimation = '';
                        this.switchModeFromInline = false;
                    }
                    else {
                        openAnimation = 'zoom-big';
                    }
                    break;
                case 'inline':
                    openAnimation = animation;
                    break;
                default:
            }
        }
        let props = {};
        const className = `${this.props.className} ${this.props.prefixCls}-${this.props.theme}`;
        if (this.props.mode !== 'inline') {
            // There is this.state.openKeys for
            // closing vertical popup submenu after click it
            props = {
                openKeys: this.state.openKeys,
                onClick: this.handleClick,
                onOpenChange: this.handleOpenChange,
                openTransitionName: openAnimation,
                className,
            };
        }
        else {
            props = {
                openAnimation,
                className,
            };
        }
        return <RcMenu {...this.props} {...props}/>;
    }
}
Menu.Divider = Divider;
Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
Menu.defaultProps = {
    prefixCls: 'ant-menu',
    className: '',
    theme: 'light',
};
