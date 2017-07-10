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
import classNames from 'classnames';
export default (props) => {
    const { prefixCls = 'ant-card', className, extra, bodyStyle, title, loading, bordered = true } = props, others = __rest(props, ["prefixCls", "className", "extra", "bodyStyle", "title", "loading", "bordered"]);
    let children = props.children;
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-bordered`]: bordered,
    });
    if (loading) {
        children = (<div>
        <p className={`${prefixCls}-loading-block`} style={{ width: '94%' }}/>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '28%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '62%' }}/>
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '22%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '66%' }}/>
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '56%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '39%' }}/>
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '21%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '15%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '40%' }}/>
        </p>
      </div>);
    }
    let head;
    if (!title) {
        head = null;
    }
    else {
        head = typeof title === 'string' ? (<div className={`${prefixCls}-head`}>
        <h3 className={`${prefixCls}-head-title`}>{title}</h3>
      </div>) : (<div className={`${prefixCls}-head`}>
        <div className={`${prefixCls}-head-title`}>{title}</div>
      </div>);
    }
    return (<div {...others} className={classString}>
      {head}
      {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
      <div className={`${prefixCls}-body`} style={bodyStyle}>{children}</div>
    </div>);
};
