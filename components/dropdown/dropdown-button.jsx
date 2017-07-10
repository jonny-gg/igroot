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
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
const ButtonGroup = Button.Group;
import classNames from 'classnames';
export default class DropdownButton extends React.Component {
    render() {
        const _a = this.props, { type, overlay, trigger, align, children, className, onClick, prefixCls, disabled, visible, onVisibleChange, placement } = _a, restProps = __rest(_a, ["type", "overlay", "trigger", "align", "children", "className", "onClick", "prefixCls", "disabled", "visible", "onVisibleChange", "placement"]);
        const cls = classNames(prefixCls, className);
        const dropdownProps = {
            align,
            overlay,
            trigger: disabled ? [] : trigger,
            onVisibleChange,
            placement,
        };
        if ('visible' in this.props) {
            dropdownProps.visible = visible;
        }
        return (<ButtonGroup {...restProps} className={cls}>
        <Button type={type} onClick={onClick} disabled={disabled}>{children}</Button>
        <Dropdown {...dropdownProps}>
          <Button type={type} disabled={disabled}>
            <Icon type="down"/>
          </Button>
        </Dropdown>
      </ButtonGroup>);
    }
}
DropdownButton.defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'ant-dropdown-button',
};
