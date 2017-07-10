import React from 'react';
import assign from 'object-assign';
import Tooltip from '../tooltip';
import warning from '../_util/warning';
export default class Popover extends React.Component {
    getPopupDomNode() {
        return this.refs.tooltip.getPopupDomNode();
    }
    getOverlay() {
        const { title, prefixCls, content } = this.props;
        warning(!('overlay' in this.props), 'Popover[overlay] is removed, please use Popover[content] instead, ' +
            'see: http://u.ant.design/popover-content');
        return (<div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>
          {content}
        </div>
      </div>);
    }
    render() {
        const props = assign({}, this.props);
        delete props.title;
        return (<Tooltip {...props} ref="tooltip" overlay={this.getOverlay()}/>);
    }
}
Popover.defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
};
