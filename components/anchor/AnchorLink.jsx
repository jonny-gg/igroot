import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scrollTo } from './anchorHelper';
export default class AnchorLink extends React.Component {
    constructor() {
        super(...arguments);
        this.renderAnchorLink = (child) => {
            // Here child is a ReactChild type
            if (typeof child !== 'string' && typeof child !== 'number') {
                const { href } = child.props;
                if (href) {
                    this.context.anchorHelper.addLink(href);
                    return React.cloneElement(child, {
                        onClick: this.props.onClick,
                        prefixCls: this.props.prefixCls,
                        affix: this.props.affix,
                        offsetTop: this.props.offsetTop,
                    });
                }
            }
            return child;
        };
        this.refsTo = (component) => {
            this._component = component;
        };
        this.scrollTo = (e) => {
            e.preventDefault();
            const { onClick, href } = this.props;
            const { anchorHelper } = this.context;
            if (onClick) {
                onClick(href, this._component);
            }
            else {
                const scrollToFn = anchorHelper ? anchorHelper.scrollTo : scrollTo;
                scrollToFn(href, this.props.offsetTop);
            }
        };
    }
    setActiveAnchor() {
        const { bounds, offsetTop, href, affix } = this.props;
        const { anchorHelper } = this.context;
        const active = affix && anchorHelper && anchorHelper.getCurrentAnchor(offsetTop, bounds) === href;
        if (active && anchorHelper) {
            anchorHelper.setActiveAnchor(this._component);
        }
    }
    componentDidMount() {
        this.setActiveAnchor();
    }
    componentDidUpdate() {
        this.setActiveAnchor();
    }
    render() {
        const { prefixCls, href, children, title, bounds, offsetTop, affix } = this.props;
        const { anchorHelper } = this.context;
        const active = affix && anchorHelper && anchorHelper.getCurrentAnchor(offsetTop, bounds) === href;
        const cls = classNames({
            [`${prefixCls}-link`]: true,
            [`${prefixCls}-link-active`]: active,
        });
        return (<div className={cls}>
        <a ref={this.refsTo} className={`${prefixCls}-link-title`} onClick={this.scrollTo} href={href} title={typeof title === 'string' ? title : ''}>
          {title}
        </a>
        {React.Children.map(children, this.renderAnchorLink)}
      </div>);
    }
}
AnchorLink.__ANT_ANCHOR_LINK = true;
AnchorLink.contextTypes = {
    anchorHelper: PropTypes.any,
};
AnchorLink.defaultProps = {
    href: '#',
    prefixCls: 'ant-anchor',
};
