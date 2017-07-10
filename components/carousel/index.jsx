// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
import assign from 'object-assign';
import debounce from 'lodash.debounce';
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            },
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}
import SlickCarousel from 'react-slick';
import React from 'react';
export default class Carousel extends React.Component {
    constructor() {
        super();
        this.onWindowResized = () => {
            // Fix https://github.com/ant-design/ant-design/issues/2550
            const { slick } = this.refs;
            const { autoplay } = this.props;
            if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
                slick.innerSlider.autoPlay();
            }
        };
        this.onWindowResized = debounce(this.onWindowResized, 500, {
            leading: false,
        });
    }
    componentDidMount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.addEventListener('resize', this.onWindowResized);
        }
    }
    componentWillUnmount() {
        const { autoplay } = this.props;
        if (autoplay) {
            window.removeEventListener('resize', this.onWindowResized);
            this.onWindowResized.cancel();
        }
    }
    render() {
        let props = assign({}, this.props);
        if (props.effect === 'fade') {
            props.fade = true;
        }
        let className = props.prefixCls;
        if (props.vertical) {
            className = `${className} ${className}-vertical`;
        }
        return (<div className={className}>
        <SlickCarousel ref="slick" {...props}/>
      </div>);
    }
}
Carousel.defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'ant-carousel',
    draggable: false,
};
