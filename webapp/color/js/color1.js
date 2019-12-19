class Color {
  constructor(props) {
    Object.assign(this, props);
    this.template = `
      <div class="dwrui-color-picker-contain">
        <div class="dwrui-color-picker-panel">
          <div class="dwrui-color-picker-bg">
            <div class="dwrui-color-picker-bg-inner1">
              <div class="dwrui-color-picker-bg-inner2"></div>
            </div>
          </div>
          <div class="dwrui-color-picker-pointer"></div>
        </div>
        <div class="dwrui-color-clearfix dwrui-color-picker-view">
          <div class="dwrui-color-clearfix dwrui-color-picker-slider">
            <div class="dwrui-color-picker-area-slider-bg">
                <input class="dwrui-color-picker-range dwrui-color-picker-area-slider" type="range" min="0" max="360" value="360"/>
            </div>
            <div class="dwrui-color-picker-alpha-slider-bg">
                <input class="dwrui-color-picker-range dwrui-color-picker-alpha-slider" type="range" min="0" max="100" value="100"/>
            </div>
          </div>
          <div class="dwrui-color-picker-preview-bg">
            <div class="dwrui-color-picker-preview"></div>
          </div>
        </div>
        <div class="dwrui-color-clearfix dwrui-color-picker-colors">
            <div class="dwrui-color-picker-colors-inner">
                <div class="dwrui-color-picker-hex-wrap">
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text" style="width: 100%;"/>
                        <div class="dwrui-color-picker-label">HEX</div>
                    </div>  
                </div>
                <div class="dwrui-color-picker-rgba-wrap">
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">R</div>
                    </div>
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">G</div>
                    </div>
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">B</div>
                    </div>
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">A</div>
                    </div>
                </div>
                <div class="dwrui-color-picker-hsla-wrap">
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">H</div>
                    </div>
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">S</div>
                    </div>
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">L</div>
                    </div>
                    <div class="dwrui-color-picker-col">
                        <input class="dwrui-color-picker-input" type="text"/>
                        <div class="dwrui-color-picker-label">A</div>
                    </div>
                </div>
            </div>
            <div class="dwrui-color-picker-arrow">
                <div class="dwrui-color-picker-arrow-up">
                    
                </div>
                <div class="dwrui-color-picker-arrow-bottom">
                    
                </div>
            </div>
        </div>
        <div class="dwrui-color-picker-favorite">

        </div>
        <div class="dwrui-color-picker-history">

        </div>
      </div>
    `;
    this.el.className = 'dwrui-color-picker';
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
