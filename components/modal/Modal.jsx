import React from 'react';
import Dialog from 'rc-dialog';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Button from '../button';
let mousePosition;
let mousePositionEventBinded;
export default class Modal extends React.Component {
    constructor() {
        super(...arguments);
        this.handleCancel = (e) => {
            const onCancel = this.props.onCancel;
            if (onCancel) {
                onCancel(e);
            }
        };
        this.handleOk = (e) => {
            const onOk = this.props.onOk;
            if (onOk) {
                onOk(e);
            }
        };
    }
    componentDidMount() {
        if (mousePositionEventBinded) {
            return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        addEventListener(document.documentElement, 'click', (e) => {
            mousePosition = {
                x: e.pageX,
                y: e.pageY,
            };
            // 100ms 内发生过点击事件，则从点击位置动画展示
            // 否则直接 zoom 展示
            // 这样可以兼容非点击方式展开
            setTimeout(() => mousePosition = null, 100);
        });
        mousePositionEventBinded = true;
    }
    render() {
        let { okText, cancelText, confirmLoading, footer, visible } = this.props;
        if (this.context.antLocale && this.context.antLocale.Modal) {
            okText = okText || this.context.antLocale.Modal.okText;
            cancelText = cancelText || this.context.antLocale.Modal.cancelText;
        }
        const defaultFooter = [(<Button key="cancel" size="large" onClick={this.handleCancel}>
        {cancelText || '取消'}
      </Button>), (<Button key="confirm" type="primary" size="large" loading={confirmLoading} onClick={this.handleOk}>
        {okText || '确定'}
      </Button>)];
        return (<Dialog onClose={this.handleCancel} footer={footer === undefined ? defaultFooter : footer} {...this.props} visible={visible} mousePosition={mousePosition}/>);
    }
}
Modal.defaultProps = {
    prefixCls: 'ant-modal',
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false,
};
Modal.propTypes = {
    prefixCls: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool,
    align: PropTypes.object,
    footer: PropTypes.node,
    title: PropTypes.node,
    closable: PropTypes.bool,
};
Modal.contextTypes = {
    antLocale: PropTypes.object,
};
