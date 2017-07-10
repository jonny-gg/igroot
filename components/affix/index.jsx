var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import getScroll from '../_util/getScroll';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
function getTargetRect(target) {
    return target !== window ?
        target.getBoundingClientRect() :
        { top: 0, left: 0, bottom: 0 };
}
function getOffset(element, target) {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);
    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);
    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;
    return {
        top: elemRect.top - targetRect.top +
            scrollTop - clientTop,
        left: elemRect.left - targetRect.left +
            scrollLeft - clientLeft,
        width: elemRect.width,
        height: elemRect.height,
    };
}
function noop() { }
function getDefaultTarget() {
    return typeof window !== 'undefined' ?
        window : null;
}
export default class Affix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            affixStyle: null,
            placeholderStyle: null,
        };
    }
    setAffixStyle(e, affixStyle) {
        const { onChange = noop, target = getDefaultTarget } = this.props;
        const originalAffixStyle = this.state.affixStyle;
        const isWindow = target() === window;
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
            return;
        }
        if (shallowequal(affixStyle, originalAffixStyle)) {
            return;
        }
        this.setState({ affixStyle }, () => {
            const affixed = !!this.state.affixStyle;
            if ((affixStyle && !originalAffixStyle) ||
                (!affixStyle && originalAffixStyle)) {
                onChange(affixed);
            }
        });
    }
    setPlaceholderStyle(placeholderStyle) {
        const originalPlaceholderStyle = this.state.placeholderStyle;
        if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
            return;
        }
        this.setState({ placeholderStyle });
    }
    updatePosition(e) {
        let { offsetTop, offsetBottom, offset, target = getDefaultTarget } = this.props;
        const targetNode = target();
        // Backwards support
        offsetTop = offsetTop || offset;
        const scrollTop = getScroll(targetNode, true);
        const affixNode = ReactDOM.findDOMNode(this);
        const elemOffset = getOffset(affixNode, targetNode);
        const elemSize = {
            width: this.refs.fixedNode.offsetWidth,
            height: this.refs.fixedNode.offsetHeight,
        };
        const offsetMode = {
            top: false,
            bottom: false,
        };
        // Default to `offsetTop=0`.
        if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
            offsetMode.top = true;
            offsetTop = 0;
        }
        else {
            offsetMode.top = typeof offsetTop === 'number';
            offsetMode.bottom = typeof offsetBottom === 'number';
        }
        const targetRect = getTargetRect(targetNode);
        const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
        if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
            // Fixed Top
            const width = elemOffset.width;
            this.setAffixStyle(e, {
                position: 'fixed',
                top: targetRect.top + offsetTop,
                left: targetRect.left + elemOffset.left,
                width,
            });
            this.setPlaceholderStyle({
                width,
                height: affixNode.offsetHeight,
            });
        }
        else if (scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight &&
            offsetMode.bottom) {
            // Fixed Bottom
            const targetBottomOffet = targetNode === window ? 0 : (window.innerHeight - targetRect.bottom);
            const width = elemOffset.width;
            this.setAffixStyle(e, {
                position: 'fixed',
                bottom: targetBottomOffet + offsetBottom,
                left: targetRect.left + elemOffset.left,
                width,
            });
            this.setPlaceholderStyle({
                width,
                height: affixNode.offsetHeight,
            });
        }
        else {
            const { affixStyle } = this.state;
            if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
                this.setAffixStyle(e, Object.assign({}, affixStyle, { width: affixNode.offsetWidth }));
            }
            else {
                this.setAffixStyle(e, null);
            }
            this.setPlaceholderStyle(null);
        }
    }
    componentDidMount() {
        const target = this.props.target || getDefaultTarget;
        // Wait for parent component ref has its value
        this.timeout = setTimeout(() => {
            this.setTargetEventListeners(target);
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.target !== nextProps.target) {
            this.clearScrollEventListeners();
            this.setTargetEventListeners(nextProps.target);
            // Mock Event object.
            this.updatePosition({});
        }
    }
    componentWillUnmount() {
        this.clearScrollEventListeners();
        clearTimeout(this.timeout);
        this.updatePosition.cancel();
    }
    setTargetEventListeners(getTarget) {
        const target = getTarget();
        if (!target) {
            return;
        }
        this.clearScrollEventListeners();
        this.scrollEvent = addEventListener(target, 'scroll', this.updatePosition);
        this.resizeEvent = addEventListener(target, 'resize', this.updatePosition);
    }
    clearScrollEventListeners() {
        ['scrollEvent', 'resizeEvent'].forEach((name) => {
            if (this[name]) {
                this[name].remove();
            }
        });
    }
    render() {
        const className = classNames({
            [this.props.prefixCls || 'ant-affix']: this.state.affixStyle,
        });
        const props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
        const placeholderStyle = Object.assign({}, this.state.placeholderStyle, this.props.style);
        return (<div {...props} style={placeholderStyle}>
        <div className={className} ref="fixedNode" style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>);
    }
}
Affix.propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    target: PropTypes.func,
};
__decorate([
    throttleByAnimationFrameDecorator()
], Affix.prototype, "updatePosition", null);
