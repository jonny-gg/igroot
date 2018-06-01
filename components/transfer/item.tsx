import * as React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Lazyload from 'react-lazy-load';
import Checkbox from '../checkbox';

export default class Item extends React.Component<any, any> {
  dbClickLock = false

  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  render() {
    const { renderedText, renderedEl, item, lazy, checked, prefixCls, onMouseDown, onDoubleClick} = this.props;

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: item.disabled,
    });

    const listItem = (
      <li
        className={className}
        title={renderedText}
        onMouseOver={this.onHover}
        onMouseDown={item.disabled ? undefined : () => onMouseDown(item.key)}
        onClick={item.disabled ? undefined : e => this.onClick(e, item)}
        onDoubleClick={() => onDoubleClick(item.key)}
      >
        <Checkbox checked={checked} disabled={item.disabled} />
        <span style={{userSelect: 'none'}}>{renderedEl}</span>
      </li>
    );
    let children: JSX.Element | null = null;
    if (lazy) {
      const lazyProps = {
        height: 32,
        offset: 500,
        throttle: 0,
        debounce: false,
        ...lazy,
      };
      children = <Lazyload {...lazyProps}>{listItem}</Lazyload>;
    } else {
      children = listItem;
    }

    return children;
  }

  onClick = (e:any, item:any) => {
    if(e.shiftKey) {
      this.props.onShiftClick(item.key)
    } else
      this.props.onClick(item)
  }

  onHover = () => {
    if (this.props.hoverSelect)
      this.props.onHoverSelect(this.props.item.key)
  }
}
