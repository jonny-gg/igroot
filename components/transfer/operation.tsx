import * as React from 'react';
import Button from '../button';

function noop() {
}

export interface TransferOperationProps {
  className?: string;
  leftArrowText?: string;
  rightArrowText?: string;
  upArrowText?: string;
  downArrowText?: string;
  moveToLeft?: React.MouseEventHandler<HTMLButtonElement>;
  moveToRight?: React.MouseEventHandler<HTMLButtonElement>;
  moveUp?: React.FormEventHandler<any>;
  moveDown?: React.FormEventHandler<any>;
  leftActive?: boolean;
  rightActive?: boolean;
  style?: React.CSSProperties;
  upActive?: boolean;
  downActive?: boolean;
}

export default class Operation extends React.Component<TransferOperationProps, any> {
  render() {
    const {
      moveToLeft = noop,
      moveToRight = noop,
      moveUp = noop,
      moveDown = noop,
      leftArrowText = '',
      rightArrowText = '',
      upArrowText = '',
      downArrowText = '',
      leftActive,
      rightActive,
      upActive,
      downActive,
      className,
      style,
    } = this.props;
    return (
      <div className={className} style={style}>
        <Button
          type="primary"
          size="small"
          disabled={!leftActive}
          onClick={moveToLeft}
          icon="left"
        >
          {leftArrowText}
        </Button>
        <Button
          type="primary"
          size="small"
          disabled={!rightActive}
          onClick={moveToRight}
          icon="right"
        >
          {rightArrowText}
        </Button>
        <Button
          type="primary"
          size="small"
          disabled={!upActive}
          onClick={moveUp}
          icon="up"
        >
          {upArrowText}
        </Button>
        <Button
          type="primary"
          size="small"
          disabled={!downActive}
          onClick={moveDown}
          icon="down"
        >
          {downArrowText}
        </Button>
      </div>
    );
  }
}
