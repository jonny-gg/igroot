import React from 'react';
import { findDOMNode } from 'react-dom';
export default class InputElement extends React.Component {
    constructor() {
        super(...arguments);
        this.focus = () => {
            this.ele.focus ? this.ele.focus() : findDOMNode(this.ele).focus();
        };
        this.blur = () => {
            this.ele.blur ? this.ele.blur() : findDOMNode(this.ele).blur();
        };
    }
    render() {
        return React.cloneElement(this.props.children, Object.assign({}, this.props, { ref: ele => this.ele = ele }), null);
    }
}
