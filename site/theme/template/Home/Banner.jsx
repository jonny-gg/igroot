import React from 'react';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import GitHubButton from 'react-github-button';
import { Icon } from 'igroot';
import QueueAnim from 'rc-queue-anim';
import * as utils from '../utils';

function typeFunc(a) {
  if (a.key === 'line') {
    return 'right';
  } else if (a.key === 'button') {
    return 'bottom';
  }
  return 'left';
}

export class Banner extends React.Component {
  isZhCN = utils.isZhCN(this.props.location.pathname);


  componentDidMount() {

    //canvas init
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    //canvas dimensions
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //创建"雪花" 数组
    //最大数量
    var mp = 75;
    var particles = [];
    for (var i = 0; i < mp; i++) {
      particles.push({
        // 坐标 x
        x: Math.random() * W,
        //坐标 y
        y: Math.random() * H,
        // 半径
        r: Math.random() * 2 + 1,
        // 密度
        d: Math.random() * mp
      })
    }

    //绘制 ‘雪花’ 函数
    function draw() {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = '0';
      ctx.beginPath();
      for (let i = 0; i < mp; i++) {
        let p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      ctx.stroke();
      update();
      requestAnimFrame(draw)
    }

    //‘雪花’下落函数
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    let angle = 0;
    function update() {
      angle += 0.01;
      for (let i = 0; i < mp; i++) {
        let p = particles[i];
        // 更新坐标 X, Y；
        // 会在 cos 余弦函数 的值上加 1，为了防止会出现负值然后‘雪花’向上飞；
        // 每片‘雪花’之前都定义了密度，这个密度值可以上雪花飘落的速度彼此不一样。
        // 在后面再加上不等的半径让‘雪花’更‘随便落下’
        p.y += (Math.cos(angle + p.d) + 1 + p.r / 6) * 0.5;
        p.x += (Math.sin(angle) * 1) * 0.5;

        // 让‘雪花’从头再开始飘下
        // 为了让‘雪花’表现的更自然点儿我们让一些从左边和右边飘出.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) //66.67% 的'雪花瓣'
          {
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
          } else {
            // 如果雪花已经飘出右边
            if (Math.sin(angle) > 0) {
              // 从左边飘出
              particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
            } else {
              // 从右边飘出
              particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
            }
          }
        }
      }
    }
    draw()
  }

  render() {
    return (
      <section className="page banner-wrapper">
        <canvas id="canvas"></canvas>
        <ScrollElement
          className="page"
          id="banner"
          playScale={0.9}
        >

          <QueueAnim className="banner-text-wrapper" type={typeFunc} delay={300} key="banner">
            {/*<span className="line" key="line" />*/}
            {/*<img src="http://groot.i.qingcdn.com/owncloud/remote.php/webdav/Photos/iGroot/logo-home.png" alt=""/>*/}
            <div key="button1" className="start-button clearfix">
              <Link to={utils.getLocalizedPathname('/docs/start/introduce', this.isZhCN)}>
                <FormattedMessage id="app.home.start" />
              </Link>
            </div>
            {/*          <GitHubButton
              key="github-button"
              type="stargazers"
              namespace="ant-design"
              repo="ant-design"
            />*/}
          </QueueAnim>
          <Icon type="down" className="down" />
        </ScrollElement>
      </section>
    );
  }

}
