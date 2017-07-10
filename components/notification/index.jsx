import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
import assign from 'object-assign';
const notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement = 'topRight';
let defaultGetContainer;
function getPlacementStyle(placement) {
    let style;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto',
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom,
            };
            break;
        case 'bottomRight':
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom,
            };
            break;
        default:
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto',
            };
    }
    return style;
}
function getNotificationInstance(prefixCls) {
    if (notificationInstance[defaultPlacement]) {
        return notificationInstance[defaultPlacement];
    }
    notificationInstance[defaultPlacement] = Notification.newInstance({
        prefixCls: prefixCls,
        className: `${prefixCls}-${defaultPlacement}`,
        style: getPlacementStyle(defaultPlacement),
        getContainer: defaultGetContainer,
    });
    return notificationInstance[defaultPlacement];
}
function notice(args) {
    const outerPrefixCls = args.prefixCls || 'ant-notification';
    const prefixCls = `${outerPrefixCls}-notice`;
    if (args.placement !== undefined) {
        defaultPlacement = args.placement;
    }
    let duration;
    if (args.duration === undefined) {
        duration = defaultDuration;
    }
    else {
        duration = args.duration;
    }
    let iconType = '';
    switch (args.type) {
        case 'success':
            iconType = 'check-circle-o';
            break;
        case 'info':
            iconType = 'info-circle-o';
            break;
        case 'error':
            iconType = 'cross-circle-o';
            break;
        case 'warning':
            iconType = 'exclamation-circle-o';
            break;
        default:
            iconType = 'info-circle';
    }
    let iconNode;
    if (args.icon) {
        iconNode = (<span className={`${prefixCls}-icon`}>
        {args.icon}
      </span>);
    }
    else if (args.type) {
        iconNode = <Icon className={`${prefixCls}-icon ${prefixCls}-icon-${args.type}`} type={iconType}/>;
    }
    const autoMarginTag = (!args.description && iconNode)
        ? <span className={`${prefixCls}-message-single-line-auto-margin`}/>
        : null;
    const { style, className } = args;
    getNotificationInstance(outerPrefixCls).notice({
        content: (<div className={iconNode ? `${prefixCls}-with-icon` : ''}>
        {iconNode}
        <div className={`${prefixCls}-message`}>
          {autoMarginTag}
          {args.message}
        </div>
        <div className={`${prefixCls}-description`}>{args.description}</div>
        {args.btn ? <span className={`${prefixCls}-btn`}>{args.btn}</span> : null}
      </div>),
        duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: assign({}, style),
        className,
    });
}
const api = {
    open(args) {
        notice(args);
    },
    close(key) {
        if (notificationInstance[defaultPlacement]) {
            notificationInstance[defaultPlacement].removeNotice(key);
        }
    },
    config(options) {
        const { duration, placement, bottom, top, getContainer } = options;
        if (placement !== undefined) {
            defaultPlacement = placement;
        }
        if (bottom !== undefined) {
            defaultBottom = bottom;
        }
        if (top !== undefined) {
            defaultTop = top;
        }
        if (getContainer !== undefined) {
            defaultGetContainer = getContainer;
        }
        // delete notificationInstance
        if (placement !== undefined || bottom !== undefined || top !== undefined) {
            const notify = notificationInstance[defaultPlacement];
            if (notify) {
                notify.destroy();
            }
            delete notificationInstance[defaultPlacement];
        }
        if (duration !== undefined) {
            defaultDuration = duration;
        }
    },
    destroy() {
        Object.keys(notificationInstance).forEach(key => {
            notificationInstance[key].destroy();
            delete notificationInstance[key];
        });
    },
};
['success', 'info', 'warning', 'error'].forEach((type) => {
    api[type] = (args) => api.open(assign({}, args, { type }));
});
api.warn = api.warning;
export default api;
