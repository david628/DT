class Color {
    constructor(props) {
        this.sprefix = 'dwrui';
        Object.assign(this, props);
        this.template = `
            <div class="${ this.sprefix }-color-picker">
                <div class="${ this.sprefix }-color-picker-header" style="height: 36px;">
                    <div class="${ this.sprefix }-color-picker-list" style="width: 100%;height: 100%;padding: 8px 10px;box-sizing: border-box;">
                        <div class="${ this.sprefix }-color-picker-item"></div>
                        <div class="${ this.sprefix }-color-picker-item" style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABO1BMVEVHcExjsb/uTqzhymrlZp7Rjox7w57FwYJNm+aw6VX+m0/6Soe611x2urJkoNbks2r0aG2Du6v/MJhIm+r/MZj/MZj/QWj/c03+m1D/TlCSxZTktWH7zFSg3XBxr7y/u4A7kvo5lPn/Kqz/N4Rnodb/gk3+sU//dE7/0VL/J8X/Jb6FyZJ6psNaqs2z61LAzmP6Mb/Sl4Lgd5OXsar9pFBImez/S01vua//OX7+jk7+Ykz+bkz/LaH/V0z5ML3/QGn/JMH+eU3/L5z/Rlj/PXOR04Cyu5P9uU/+g03/JrhZqs2j4GeFyo+Cqrz8y1L20Fe35lM8lfX/M43/KK//QmBvpMtRo9qRsK70P7TBymLXj4bLrHX9w1DUxnWitqHcf4/tz2DQnX7+OYeb2nPgdJXGumzsV6H5sVH/MZea7IfDAAAANHRSTlMA/fz9/iH9/v/+/jr9Nv02VFTz2dmB0MPZ7IGB0Mv9w76Bvr7Zgb7YVFTYx77H2dnH2MfYBQ7XUQAAAelJREFUSMft1VlbgkAUBuBUlCnFpX192ve9RNxAU3Oh0BYETcUlxf7/L+gMWHoxqPf1eXveM2eAGWdm/vN3417aX5yfX9xbck9V7l/OhMNvb6n4+3vh7HRiuXNZTvyCZFK4cU6YZk2WE4kRINjHzuUOhdLpBCzRwaAAoGIfJ5xrGMBMmR9Qqdh1ynqqlSjPA8G76KTihYIAC1BU987y+URNkB4COwZNvwU4jsVMIsvhMAAYSIfyj49bcr3vIWYIPFTGBNC/CaDtI4LD/AMEDB+Cob7igqDj8natVtsgbzmfzxsAhAEqVBe6A+htE8FqBGKiaCj9ldIp3L3Xq1ar10QwFzEDJMbzHb3bbJvlVY+HCIJz+DdIEKo8Lz+ZJY8UHEnf8zQ7zBURHPX7/RykXi+WGnRZ5FyPj5+fTzhbRLCRG5QXSy06qyAb9/w8IOvkF1c3ikstR4PWVIQUkTMIIIb8qjeLRQwcDppWJcQqCse5XJhsWXxLJ9C95YD+WU0CgJBoM0nA6nPdxKBB05omlRHLIlE0wLn1AcLt6WxWVcsYsIpow2uMOda+xgh4hV1gwIw71D4o1zRVKnsBvMKDEm3MhGtmG4A0BJfOiTdT4F6VJK+XBcAuBKa6+5j1iwMvWtjZZf7/Nv5wvgHGFpB5+rlLRwAAAABJRU5ErkJggg==) no-repeat;background-size: 100% 100%;"></div>
                        <div class="${ this.sprefix }-color-picker-item"></div>
                        <div class="${ this.sprefix }-color-picker-item"></div>
                    </div>
                </div>
                <div class="${ this.sprefix }-color-picker-center">
                    <div class="${ this.sprefix }-color-picker-center-inner">
                        <div></div>
                        <div class="${ this.sprefix }-color-picker-panel">
                            <div class="${ this.sprefix }-color-picker-hue">
                                <div class="${ this.sprefix }-color-picker-saturation">
                                    <div class="${ this.sprefix }-color-picker-brightness"></div>
                                </div>
                            </div>
                            <div class="${ this.sprefix }-color-picker-pointer"></div>
                        </div>
                        <div class="${ this.sprefix }-color-picker-fixed">
                            <div class="${ this.sprefix }-color-picker-left">
                                <div class="dwrui-color-picker-area-slider-bg">
                                    <input class="dwrui-color-picker-range dwrui-color-picker-area-slider" type="range" min="0" max="360" value="360"/>
                                </div>
                                <div class="dwrui-color-picker-alpha-slider-bg">
                                    <input class="dwrui-color-picker-range dwrui-color-picker-alpha-slider" type="range" min="0" max="100" value="100"/>
                                </div>
                            </div>
                            <div class="${ this.sprefix }-color-picker-right">
                                <div class="${ this.sprefix }-color-picker-preview"></div>
                            </div>
                        </div>
                        <div style="overflow: hidden;margin-top: 5px;">
                            <div style="float: left;width: 30%;box-sizing: border-box;">
                                <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">HEX</div>
                            </div>
                            <div style="float: left;width: 70%;box-sizing: border-box;">
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">R</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">G</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">B</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">A</div>
                                </div>
                            </div>
                        </div>
                        <div style="overflow: hidden;margin-top: 5px;">
                            <div style="float: left;width: 30%;box-sizing: border-box;">&nbsp;</div>
                            <div style="float: left;width: 70%;box-sizing: border-box;">
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">H</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">S</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">L</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="dwrui-color-picker-input" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">A</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="${ this.sprefix }-color-picker-footer">
                    <div class="${ this.sprefix }-color-picker-global">
                        <input class="${ this.sprefix }-color-picker-chk" type="checkbox"/>
                        <div class="${ this.sprefix }-color-picker-arrow-wrap">
                            <span class="${ this.sprefix }-color-picker-arrow"></span>
                            <span style="font-size: 12px;">Global Colors</span>
                        </div>
                        <div class="${ this.sprefix }-color-picker-list">
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item-add">+</div>
                        </div>
                    </div>
                    <div class="${ this.sprefix }-color-picker-recent">
                        <input class="${ this.sprefix }-color-picker-chk" type="checkbox"/>
                        <div class="${ this.sprefix }-color-picker-arrow-wrap">
                            <span class="${ this.sprefix }-color-picker-arrow"></span>
                            <span style="font-size: 12px;">Recent Colors</span>
                        </div>
                        <div class="${ this.sprefix }-color-picker-list">
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                            <div class="${ this.sprefix }-color-picker-item"></div>
                        </div>
                    </div>
                </div>
            </div>`;
    //this.el.className = 'dwrui-color-picker';
    this.el.innerHTML = this.template;
    this.panel = this.el.querySelector('.dwrui-color-picker-panel');
    this.pointer = this.panel.querySelector('.dwrui-color-picker-pointer');
    this.preview = this.el.querySelector('.dwrui-color-picker-preview');
    this.initEvent();
    //this.setValue('#fff');
    this.hsb = this.inputToRGB('#fff');
    //this.hsb = this.rgbToHsb(rgb);
    //console.log(this.hsb.h);
  }
  initEvent() {
    this.isMove = false;
    this.onMouseMove = e => {
      this.stopEvent(e);
      if(this.isMove) {
        this.setPos({
          x: e.pageX || e.clientX,
          y: e.pageY || e.clientY
        });
      }
    }
    this.onMouseUp = e => {
      this.stopEvent(e);
      this.isMove = false;
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
    this.onMouseDown = e => {
      this.stopEvent(e);
      this.isMove = true;
      this.setPos({
        x: e.pageX || e.clientX,
        y: e.pageY || e.clientY
      });
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
    this.panel.addEventListener('mousedown', this.onMouseDown);
  }
  setPos(pos) {
    const rect = this.panel.getBoundingClientRect();
    let left = pos.x - rect.left;
    let top = pos.y - rect.top;
    left = Math.max(0, left);
    left = Math.min(left, rect.width);
    top = Math.max(0, top);
    top = Math.min(top, rect.height);
    this.pointer.style.left = left + 'px';
    this.pointer.style.top = top + 'px';
    //console.log(this.hsb);
    // const hue = this.hsb.h;
    // const saturation = left / rect.width;
    // const bright = (rect.height - top) / rect.height;
    // let hsb = {
    //   h: this.hsb.h,
    //   s: left / rect.width * 100,
    //   b: 100 - top / rect.height * 100
    // }
    // let hex = this.hsbToHex(hsb)
    // let rgba = this.hexToRgb(hex);
    // this.hsb = this.rgbToHsb(rgba);
    //this.setValue(rgba);
  }
  stopEvent(e) {
    this.stopPropagation(e);
    this.preventDefault(e);
  }
  preventDefault(e) {
    if(e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }
  stopPropagation(e) {
    if (e.type == 'mousedown') {
      return true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
  inputToRGB(v) {
    let rgb = this.hexToRgb(v);
    let hsb = this.rgbToHsb(rgb);
    return hsb;
    // let rgb;
    // if(typeof v === 'string') {
    //   // rgb = {
    //   //   r: v[0].value ? parseInt(v[0].value) : 0,
    //   //   g: v[1].value ? parseInt(v[1].value) : 0,
    //   //   b: v[2].value ? parseInt(v[2].value) : 0
    //   // }
    // }
  }
  setValue(rgba) {
    console.log(rgba);
    this.preview.style.background = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a || 1})`;
  }
}




var c = new Color({
  el: document.getElementById('id-test')
});
