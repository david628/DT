class Color {
    constructor(props) {
        this.sprefix = 'dwrui';
        this.type = 0;
        this.angle = 'to bottom';
        this.value = '#FFFFFF';
        this.angleType = {
            'to top': 0,
            'to top right': 45,
            'to right': 90,
            'to bottom right': 135,
            'to bottom': 180,
            'to bottom left': 225,
            'to left': 270,
            'to top left': 315,
            //'radial': 'at center center'
        };
        this.colors = [
            "#ffffff", "#fafafa", "#f5f5f5", "#e8e8e8", "#d9d9d9", "#bfbfbf", "#8c8c8c", "#595959", "#262626", "#000000",
            "#e5f7ff", "#b8e7ff", "#8ed4ff", "#65bfff", "#39a7ff", "#008dff", "#006adc", "#004db6", "#00378e", "#002568",
            "#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c783", "#66bb6a", "#4caf50", "#42a047", "#388e3c", "#2f7d32", "#1b5e20",
            "#fffbe5", "#fff2b5", "#ffe689", "#ffd75c", "#ffc627", "#fcae00", "#d68900", "#ae6900", "#884d00", "#623400",
            "#fff1f0", "#ffccc6", "#ffa39c", "#ff7772", "#ff4b49", "#f81d22", "#d10d18", "#aa0212", "#84000f", "#5d000f",
            "#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c26b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"
        ];
        Object.assign(this, props);
        this.template = `
            <div class="${this.sprefix}-color-picker">
                <div class="${this.sprefix}-color-picker-header" style="height: 36px;">
                    <div class="${this.sprefix}-color-picker-list" style="width: 100%;height: 100%;padding: 8px 10px;box-sizing: border-box;">
                        <div class="${this.sprefix}-color-picker-item"></div>
                        <div class="${this.sprefix}-color-picker-item" style="background-image: linear-gradient(180deg,#ffffff,#008dff);"></div>
                        <div class="${this.sprefix}-color-picker-item" style="background-image: radial-gradient(#ffffff,#008dff);"></div>
                    </div>
                </div>
                <div class="${this.sprefix}-color-picker-center">
                    <div class="${this.sprefix}-color-picker-gradient">
                        <div class="${this.sprefix}-color-picker-gradient-bar-bg">
                            <div class="${this.sprefix}-color-picker-gradient-bar"></div>
                        </div>
                        <div class="${this.sprefix}-color-picker-gradient-slider-bar"></div>
                        <div class="${this.sprefix}-color-picker-gradient-angle-wrap">
                            <input class="${this.sprefix}-color-picker-range ${this.sprefix}-color-picker-gradient-angle" type="range" min="0" max="360" value="0"/>
                            <div class="${this.sprefix}-color-picker-gradient-angle-list" style="display: none;">
                                <span class="${this.sprefix}-color-picker-gradient-angle-item">0</span>
                                <span class="${this.sprefix}-color-picker-gradient-angle-item">
                                    <input class="dwrui-color-picker-input dwrui-color-picker-gradient-angle-input" type="text"/>
                                </span>
                                <span class="${this.sprefix}-color-picker-gradient-angle-item">360</span>
                            </div>
                        </div>
                    </div>
                    <div class="${this.sprefix}-color-picker-center-inner">
                        <div></div>
                        <div class="${this.sprefix}-color-picker-panel">
                            <div class="${this.sprefix}-color-picker-hue">
                                <div class="${this.sprefix}-color-picker-saturation">
                                    <div class="${this.sprefix}-color-picker-brightness"></div>
                                </div>
                            </div>
                            <div class="${this.sprefix}-color-picker-pointer"></div>
                        </div>
                        <div class="${this.sprefix}-color-picker-fixed">
                            <div class="${this.sprefix}-color-picker-left">
                                <div class="${this.sprefix}-color-picker-area-slider-bg">
                                    <input class="${this.sprefix}-color-picker-range ${this.sprefix}-color-picker-area-slider" type="range" min="0" max="360" value="360"/>
                                </div>
                                <div class="${this.sprefix}-color-picker-alpha-slider-bg">
                                    <input class="${this.sprefix}-color-picker-range ${this.sprefix}-color-picker-alpha-slider" type="range" min="0" max="100" value="100"/>
                                </div>
                            </div>
                            <div class="${this.sprefix}-color-picker-right">
                                <div class="${this.sprefix}-color-picker-preview-bg">
                                    <div class="${this.sprefix}-color-picker-preview"></div>
                                    <div class="${this.sprefix}-color-picker-gradient-preview"></div>
                                </div>
                            </div>
                        </div>
                        <div style="overflow: hidden;margin-top: 5px;">
                            <div style="float: left;width: 30%;padding-left: 12px;position: relative;box-sizing: border-box;">
                                <span style="position: absolute;top: 0;left: 0;line-height: 26px;">#</span>
                                <input class="${this.sprefix}-color-picker-input dwrui-color-picker-input-hex" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                <div class="${this.sprefix}-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">HEX</div>
                            </div>
                            <div style="float: left;width: 70%;box-sizing: border-box;">
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="${this.sprefix}-color-picker-input dwrui-color-picker-rgba-r" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="${this.sprefix}-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">R</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="${this.sprefix}-color-picker-input dwrui-color-picker-rgba-g" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="${this.sprefix}-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">G</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="${this.sprefix}-color-picker-input dwrui-color-picker-rgba-b" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="${this.sprefix}-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">B</div>
                                </div>
                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">
                                    <input class="${this.sprefix}-color-picker-input dwrui-color-picker-rgba-a" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>
                                    <div class="${this.sprefix}-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">A</div>
                                </div>
                            </div>
                        </div>
<!--                        <div style="overflow: hidden;margin-top: 5px;">-->
<!--                            <div style="float: left;width: 30%;box-sizing: border-box;">&nbsp;</div>-->
<!--                            <div style="float: left;width: 70%;box-sizing: border-box;">-->
<!--                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">-->
<!--                                    <input class="dwrui-color-picker-input dwrui-color-picker-hsla-h" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>-->
<!--                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">H</div>-->
<!--                                </div>-->
<!--                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">-->
<!--                                    <input class="dwrui-color-picker-input dwrui-color-picker-hsla-s" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>-->
<!--                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">S</div>-->
<!--                                </div>-->
<!--                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">-->
<!--                                    <input class="dwrui-color-picker-input dwrui-color-picker-hsla-l" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>-->
<!--                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">L</div>-->
<!--                                </div>-->
<!--                                <div style="float: left;width: 25%;padding-left: 5px;box-sizing: border-box;">-->
<!--                                    <input class="dwrui-color-picker-input dwrui-color-picker-hsla-a" type="text" style="width: 100%;padding: 0 5px;outline: none;box-sizing: border-box;"/>-->
<!--                                    <div class="dwrui-color-picker-label" style="width: 100%;font-size: 12px;text-align: center;">A</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                </div>
                <div class="${this.sprefix}-color-picker-footer">
                    <div class="${this.sprefix}-color-picker-global">
                        <input class="${this.sprefix}-color-picker-chk" type="checkbox"/>
                        <div class="${this.sprefix}-color-picker-arrow-wrap">
                            <span class="${this.sprefix}-color-picker-arrow">
                                <svg viewBox="0 0 1024 1024" focusable="false" class="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                                </svg>
                            </span>
                            <span style="font-size: 12px;">Global Colors</span>
                        </div>
                        <div class="${this.sprefix}-color-picker-list ${this.sprefix}-color-picker-colors"></div>
                    </div>
                    <div class="${this.sprefix}-color-picker-recent">
                        <input class="${this.sprefix}-color-picker-chk" type="checkbox"/>
                        <div class="${this.sprefix}-color-picker-arrow-wrap">
                            <span class="${this.sprefix}-color-picker-arrow">
                                <svg viewBox="0 0 1024 1024" focusable="false" class="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                                </svg>
                            </span>
                            <span style="font-size: 12px;">Recent Colors</span>
                        </div>
                        <div class="${this.sprefix}-color-picker-list">
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                            <div class="${this.sprefix}-color-picker-item"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        //this.el.className = 'dwrui-color-picker';
        this.el.innerHTML = this.template;

        this.headerPanel = this.el.querySelector(`.${this.sprefix}-color-picker-header`);

        this.colorsPanel = this.el.querySelector(`.${this.sprefix}-color-picker-colors`);
        this.panel = this.el.querySelector(`.${this.sprefix}-color-picker-panel`);
        this.pointer = this.panel.querySelector(`.${this.sprefix}-color-picker-pointer`);

        this.preview = this.el.querySelector(`.${this.sprefix}-color-picker-preview`);
        this.hexInput = this.el.querySelector(`.${this.sprefix}-color-picker-input-hex`);
        this.rInput = this.el.querySelector(`.${this.sprefix}-color-picker-rgba-r`);
        this.gInput = this.el.querySelector(`.${this.sprefix}-color-picker-rgba-g`);
        this.bInput = this.el.querySelector(`.${this.sprefix}-color-picker-rgba-b`);
        this.aInput = this.el.querySelector(`.${this.sprefix}-color-picker-rgba-a`);

        // this.hInput = this.el.querySelector(`.${this.sprefix}-color-picker-hsla-h`);
        // this.sInput = this.el.querySelector(`.${this.sprefix}-color-picker-hsla-s`);
        // this.lInput = this.el.querySelector(`.${this.sprefix}-color-picker-hsla-l`);
        // this.laInput = this.el.querySelector(`.${this.sprefix}-color-picker-hsla-a`);

        this.hue = this.el.querySelector(`.${this.sprefix}-color-picker-hue`);
        this.areaInput = this.el.querySelector(`.${this.sprefix}-color-picker-area-slider`);
        this.alphaInput = this.el.querySelector(`.${this.sprefix}-color-picker-alpha-slider`);

        this.hexInput.onchange = (e) => {
            if (this.validHex(this.hexInput.value)) {
                let rgba = this.hexToRgba(this.hexInput.value);
                rgba.a = this.rgba.a;
                rgba = this.rgbaToString(rgba);
                this.setColor(rgba);
            } else {
                this.hexInput.value = this.hex;
            }
        };
        this.rInput.onchange = (e) => {
            let v = this.validRgb(this.rInput.value);
            if (v !== false) {
                let rgba = this.rgbaToString(Object.assign(this.rgba, {
                    r: v
                }));
                this.setColor(rgba);
            } else {
                this.rInput.value = this.rgba.r;
            }
        };
        this.gInput.onchange = (e) => {
            let v = this.validRgb(this.gInput.value);
            if (v !== false) {
                let rgba = this.rgbaToString(Object.assign(this.rgba, {
                    g: v
                }));
                this.setColor(rgba);
            } else {
                this.gInput.value = this.rgba.g;
            }
        };
        this.bInput.onchange = (e) => {
            let v = this.validRgb(this.bInput.value);
            if (v !== false) {
                let rgba = this.rgbaToString(Object.assign(this.rgba, {
                    b: v
                }));
                this.setColor(rgba);
            } else {
                this.bInput.value = this.rgba.b;
            }
        };
        this.aInput.onchange = (e) => {
            let old = this.aInput.value;
            let v = this.validApacity(old);
            if (v !== false) {
                let rgba = this.rgbaToString(Object.assign(this.rgba, {
                    a: v
                }));
                this.setColor(rgba);
            } else {
                this.aInput.value = this.rgba.a;
            }
        };

        this.areaInput.onchange = (e) => {
            this.hsv.h = this.areaInput.value;
            this.handleChange();
        };
        this.alphaInput.onchange = (e) => {
            this.rgba.a = this.alphaInput.value / 100;
            this.update();
        };

        this.rWidth = this.panel.offsetWidth;
        this.rHeight = this.panel.offsetHeight;

        this.initColors();
        this.initEvent();

        this.initGradient();
        this.setType(this.type);

        if (this.value) {
            this.setValue(this.value);
        }
    }

    validHex(hex) {
        return /^[0-9a-fA-F]{3,6}$/.test(hex);
    }

    validRgb(v) {
        let value = parseInt(v, 10);
        if (value >= 0 && value <= 255) {
            return value;
        }
        return false;
    }

    validApacity(v) {
        let value = parseFloat(v, 10).toFixed(2);
        if (value >= 0 && value <= 1) {
            return value;
        }
        return false;
    }

    hasClass(dom, cls) {
        if (dom && typeof dom.className !== "undefined") {
            return (' ' + dom.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }
        return false;
    }

    addClass(dom, cls) {
        if (dom && typeof dom.classList !== "undefined" && cls.length > 0) {
            dom.classList.add(cls);
        }
    }

    removeClass(dom, cls) {
        if (dom && typeof dom.classList !== "undefined") {
            dom.classList.remove(cls);
        }
    }

    setType(type) {
        if (this.type !== type) {
            this.type = type;
        }
        if (this.type === 0) {
            this.gradient.style.display = 'none';
            this.setCurrentDrag();
        } else if (this.type === 1) {
            this.gradient.style.display = 'block';
            this.angleWrap.style.display = 'block';
        } else if (this.type === 2) {
            this.gradient.style.display = 'block';
            this.angleWrap.style.display = 'none';
        }
        this.updateGradient();
    }

    initColors() {
        let rs = [];
        for (let i = 0; i < this.colors.length; i++) {
            rs.push(`<div index="${i}" class="${this.sprefix}-color-picker-colors-item" style="background-color: ${this.colors[i]};"></div>`);
        }
        this.colorsPanel.innerHTML = rs.join('');
    }

    setAngle(angle) {
        this.angle = this.gradientAngle.title = this.gradientAngleInput.value = angle;
        this.gradientAngle.value = this.angle;
    }

    getAngle(angle) {
        return this.angleType[angle] !== undefined ? this.angleType[angle] : angle;
    }

    initGradient() {
        this.gradient = this.el.querySelector(`.${this.sprefix}-color-picker-gradient`);
        this.gradientAngle = this.el.querySelector(`.${this.sprefix}-color-picker-gradient-angle`);
        this.gradientAngleInput = this.el.querySelector(`.${this.sprefix}-color-picker-gradient-angle-input`);
        this.gradientPreview = this.el.querySelector(`.${this.sprefix}-color-picker-gradient-preview`);
        this.gradientAngle.onchange = e => {
            this.setAngle(this.gradientAngle.value);
            this.updateGradient();
        }

        this.onDragMouseDown = e => {
            this.dragStartX = e.pageX || e.clientX;
            this.dragStartY = e.pageY || e.clientY;
            this.stopEvent(e);
            this.isDragMove = true;
            document.addEventListener('mousemove', this.onDragMouseMove);
            document.addEventListener('mouseup', this.onDragMouseUp);
        }
        this.onDragMouseMove = e => {
            this.stopEvent(e);
            this.dragEndX = e.pageX || e.clientX;
            this.dragEndY = e.pageY || e.clientY;
            if (this.isDragMove && (this.dragEndX - this.dragStartX !== 0)) {
                this.setDragPos({
                    x: e.pageX || e.clientX,
                    y: e.pageY || e.clientY
                }, this.gradientDrag);
                this.updateGradient();
            }
        }
        this.onDragMouseUp = e => {
            this.stopEvent(e);
            this.isDragMove = false;
            document.removeEventListener('mousemove', this.onDragMouseMove);
            document.removeEventListener('mouseup', this.onDragMouseUp);
        }
        this.gradientBar = this.el.querySelector(`.${this.sprefix}-color-picker-gradient-bar`);
        this.gradientSliderBar = this.el.querySelector(`.${this.sprefix}-color-picker-gradient-slider-bar`);
        this.angleWrap = this.el.querySelector(`.${this.sprefix}-color-picker-gradient-angle-wrap`);
        this.gradientSliderBarWidth = this.gradientSliderBar.offsetWidth;
        this.gradientSliderBarHeight = this.gradientSliderBar.offsetHeight;
        this.gradientSliderBar.onmousedown = (e) => {
            if (e.target === this.gradientSliderBar) {
                let drag = this.addDrag();
                this.setDragPos({
                    x: e.pageX || e.clientX,
                    y: e.pageY || e.clientY
                }, drag);
                this.setDragColor(drag, '#fff');
                this.setCurrentDrag(drag);
                this.onDragMouseDown(e);
            }

        }
        this.addDrag([{
            pos: {
                x: 0,
                y: 0
            },
            value: '#fff'
        }, {
            pos: {
                x: 100,
                y: 0
            },
            value: '#000'
        }]);
        this.gradientAngleInput.value = this.gradientAngle.title = this.gradientAngle.value = this.getAngle(this.angle);
    }

    addDrag(item) {
        let items;
        if (Array.isArray(item)) {
            items = item;
        } else {
            items = [item];
        }
        let rs = [];
        for (let i = 0; i < items.length; i++) {
            let drag = document.createElement('div');
            drag.className = `${this.sprefix}-color-picker-gradient-slider-drag`;
            drag.innerHTML = `<div class="${this.sprefix}-color-picker-gradient-slider-pointer"></div>
                                <input type="hidden"/>
                                <div class="${this.sprefix}-color-picker-gradient-slider-body">
                                <div class="${this.sprefix}-color-picker-gradient-slider-body-inner"></div>`;
            this.gradientSliderBar.appendChild(drag);
            drag.onmousedown = e => {
                this.setCurrentDrag(drag);
                this.onDragMouseDown(e);
            }
            drag.ondblclick = e => {
                if (this.getDrags().length > 2) {
                    this.gradientSliderBar.removeChild(drag);
                    this.updateGradient();
                }
            }
            if (items[i]) {
                if (items[i].pos) {
                    drag.style.left = items[i].pos.x * this.gradientSliderBarWidth / 100 + 'px';
                    drag.style.top = items[i].pos.y + 'px';
                }
                this.setDragColor(drag, items[i].value, i !== items.length - 1);
            }

            rs.push(drag);
        }
        return rs.length > 1 ? rs : rs[0];
    }

    setDragColor(drag, value, notUpdate) {
        drag.querySelector('input').value = value || '';
        drag.querySelector(`.${this.sprefix}-color-picker-gradient-slider-body-inner`).style.background = value;
        if (!notUpdate) {
            this.updateGradient();
        }
        //style="background: -webkit-linear-gradient(left, rgba(189, 171, 250, 0.45) 0%, rgba(201, 249, 80, 0.88) 100%);"
    }

    updateGradient() {
        //background: linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 99%, rgb(0, 0, 0) 100%);
        let rs = [];
        this.getDrags().forEach(item => {
            let pos = parseFloat(item.style.left, 10) * 100 / this.gradientSliderBarWidth;
            rs.push(`${this.getDragColor(item)} ${pos}%`);
        });
        this.gradientBar.style.background = `linear-gradient(to right,${rs.join(',')})`;
        if (this.type === 0) {
            this.preview.style.display = 'block';
            this.gradientPreview.style.display = 'none';
        } else if (this.type === 1) {
            this.preview.style.display = 'none';
            this.gradientPreview.style.display = 'block';
            if (this.angle !== '' && !isNaN(this.angle)) {
                rs.unshift(this.getAngle(this.angle) + 'deg');
            }
            this.gradientPreview.style.background = `linear-gradient(${rs.join(',')})`;
        } else if (this.type === 2) {
            this.preview.style.display = 'none';
            this.gradientPreview.style.display = 'block';
            this.gradientPreview.style.background = `radial-gradient(at center center,${rs.join(',')})`;
        }
    }

    setCurrentDrag(drag) {
        this.gradientDrag = drag;
        this.getDrags().forEach(item => {
            if (item === drag) {
                this.addClass(drag, `${this.sprefix}-color-picker-gradient-slider-drag-selected`);
            } else {
                this.removeClass(item, `${this.sprefix}-color-picker-gradient-slider-drag-selected`);
            }
        });
        if (drag) {
            this.setColor(this.getDragColor(drag));
        }
    }

    getDragColor(drag) {
        return drag.querySelector('input').value;
    }

    clearDrags() {
        this.gradientSliderBar.innerHTML = '';
    }

    getDrags() {
        let rs = Array.prototype.slice.call(this.gradientSliderBar.querySelectorAll(`.${this.sprefix}-color-picker-gradient-slider-drag`));
        return rs.sort((a, b) => {
            return parseFloat(a.style.left, 10) - parseFloat(b.style.left, 10);
        });
    }

    setDragPos(pos, drag) {
        let rect = this.gradientSliderBar.getBoundingClientRect();
        let left = pos.x - rect.left - (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0);
        //let top = pos.y - rect.top - (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        left = Math.max(0, left);
        left = Math.min(left, this.gradientSliderBarWidth);
        //top = Math.max(0, top);
        //top = Math.min(top, this.gradientSliderBarHeight);
        drag.style.left = left + 'px';
        //drag.style.top = top + 'px';
    }

    initEvent() {
        this.isMove = false;
        this.onMouseMove = e => {
            this.stopEvent(e);
            if (this.isMove) {
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

        this.headerPanel.querySelectorAll(`.${this.sprefix}-color-picker-item`).forEach((item, index) => {
            item.onclick = e => {
                this.setType(index);
            }
        })
        this.colorsPanel.onclick = (e) => {
            let target = e.target;
            if (this.hasClass(target, `${this.sprefix}-color-picker-colors-item`)) {
                let index = target.getAttribute('index');
                if (this.colors[index]) {
                    console.log(this.colors[index]);
                    this.setColor(this.colors[index]);
                }
            }
        }
    }

    getParsedGradient(k) {
        var a = function (l, j) {
            var k, m = "";
            for (k = 0; k < l.length; k++) {
                if (typeof l[k] === "string") {
                    m += l[k];
                } else {
                    m += l[k].source;
                }
            }
            return new RegExp(m, j);
        };
        var c = function () {
            var s = "gi"
                , j = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/
                ,
                l = /(?:to\s+)?((?:(?:left|right|top|bottom|ellipse at center|center, ellipse cover|)(?:\s+(?:top|bottom))?))/
                , x = /\s*,\s*/
                , t = /\#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/
                , r = /\(\s*(?:[0-9]{1,3}\s*,\s*){1}\s*(?:[0-9]{1,3}(?:%)?\s*,\s*){1}[0-9]{1,3}(?:%)?\s*\)/
                ,
                q = /\(\s*(?:[0-9]{1,3}\s*,\s*){1}\s*(?:[0-9]{1,3}(?:%)?\s*,\s*){2}\s*(?:[0-9]{1,3}(?:%)?(?:[.][0-9]{1,3})?\s*)\)/
                , u = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/
                , v = /[_A-Za-z-][_A-Za-z0-9-]*/
                , k = a(["(?:", t, "|", "(?:rgb|hsl)", r, "|", "(?:rgba|hsla)", q, "|", v, ")"], "")
                , w = a([k, "(?:\\s+", u, ")?"], "")
                , o = a(["(?:", w, x, ")*", w], "")
                , n = a(["(?:(", j, ")|", l, ")"], "")
                , m = a(["(", n, ")", x, "(", o, ")"], s)
                , p = a(["\\s*(", k, ")", "(?:\\s+", "(", u, "))?", "(?:", x, "\\s*)?"], s);
            return {
                gradientSearch: m,
                colorsSearch: p
            }
        };
        var i = function (k, m) {
            var j, n, o, l;
            n = k.gradientSearch.exec(m);
            if (n !== null) {
                j = {
                    //string: n[0],
                    colors: []
                };
                if (!!n[1]) {
                    j.direction = n[1];
                    if (j.direction.indexOf("ellipse") !== -1 || j.direction.indexOf("circle") !== -1) {
                        j.direction = "radial";
                        j.type = 'radial-gradient';
                        //j.radialDirection = n[1]
                    }
                }
                // if (!!n[2]) {
                //     j.angle = n[2];
                // }
                // if (!!n[3]) {
                //     j.sideCorner = n[3]
                // }
                o = k.colorsSearch.exec(n[4]);
                while (o !== null) {
                    l = {
                        color: o[1]
                    };
                    if (!!o[2]) {
                        l.pos = o[2]
                    }
                    j.colors.push(l);
                    o = k.colorsSearch.exec(n[4])
                }
            }
            return j
        };
        var u;
        var n = [];
        var r = [];
        if (!k || k.length == 0 || k.indexOf("gradient(") == -1) {
            return [];
        }
        var v = /(?:\s*)(?:linear|radial)-gradient\s*\(((?:\([^\)]*\)|[^\)\(])*)\)/g;
        var q;
        while (q = v.exec(k)) {
            n.push(q[0]);
        }
        if (n.length == 0) {
            return [];
        }
        for (let o = 0; o < n.length; o++) {
            u = n[o];
            if (u.length == 0) {
                break;
            }
            if (u.indexOf("to ") == -1) {
                u = u.replace("linear-gradient(", "linear-gradient(to bottom, ");
            }
            var l = c();
            var s = /.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/;
            var q = s.exec(u);
            if (q !== null) {
                var t = i(l, q[1]);
                if (t) {
                    if (!t.direction && u.indexOf("radial") !== -1) {
                        t.type = 'radial-gradient';
                        t.direction = "radial";
                    } else {
                        t.type = 'linear-gradient';
                    }
                    for (let p = 0; p < t.colors.length; p++) {
                        if (typeof t.colors[p].pos !== "undefined") {
                            t.colors[p].pos = t.colors[p].pos.replace("%", "");
                        } else {
                            if (t.colors.length == 1) {
                                t.colors[p].pos = "100";
                            } else {
                                t.colors[p].pos = "" + ((p / (t.colors.length - 1)) * 100);
                            }
                        }
                        if (typeof t.direction !== "undefined") {
                            t.direction = t.direction.replace("deg", "");
                        }
                    }
                    r.push(t);
                }
            }
        }
        return r;
    }

    setColor(v) {
        //if(this.type === 1) {
        if (v.startsWith('rgb') || v.startsWith('RGB')) {
            this.rgba = this.parseRgba(v);
        } else if (v.startsWith('#')) {
            let value = v.slice(1);
            if (this.validHex(value)) {
                this.rgba = this.hexToRgba(value);
            }
        } else if (this.validHex(v)) {
            this.rgba = this.hexToRgba(v);
        }
        //}
        this.hex = this.rgbaToHex(this.rgba);
        this.hsv = this.rgbToHsv(this.rgba);

        this.areaInput.value = this.hsv.h;
        this.alphaInput.value = this.rgba.a * 100;

        let left = this.hsv.s * this.rWidth / 100;
        let top = (100 - this.hsv.v) * this.rHeight / 100;

        this.pointer.style.left = left + 'px';
        this.pointer.style.top = top + 'px';

        let hueColor = this.hsvToRgb(this.hsv.h);
        this.hue.style.backgroundColor = `rgb(${hueColor.r},${hueColor.g},${hueColor.b})`;

        this.update();

    }

    setValue(value) {
        let item = this.getParsedGradient(value);
        if (item && item.length) {
            this.value = value;
            this.clearDrags();
            this.setColor('#FFFFFF');
            item = item[0];
            this.value = item;
            let colors = item.colors;
            this.setAngle(this.getAngle(item.direction));
            if (item.type === 'linear-gradient') {
                this.setType(1);
            } else if (item.type === 'radial-gradient') {
                this.setType(2);
            }
            let rs = [];
            colors.forEach(item => {
                rs.push({
                    pos: {
                        x: parseFloat(item.pos, 10),
                        y: 0
                    },
                    value: item.color
                });
            });
            this.addDrag(rs);
        } else {
            this.setType(0);
            this.value = value;
            this.setColor(value);
        }
        //console.log(/(?:\s*)(?:linear|radial)-gradient\s*\(((?:\([^\)]*\)|[^\)\(])*)\)/g.test(v));
    }

    handleChange() {
        let hueColor = this.hsvToRgb(this.hsv.h);
        this.hue.style.backgroundColor = `rgb(${hueColor.r},${hueColor.g},${hueColor.b})`;

        let left = parseFloat(this.pointer.style.left, 10);
        let top = parseFloat(this.pointer.style.top, 10);

        let s = left * 100 / this.rWidth;
        let v = (this.rHeight - top) * 100 / this.rHeight;

        let rbg = this.hsvToRgb(this.hsv.h, s, v);

        Object.assign(this.rgba, rbg);

        this.hex = this.rgbaToHex(this.rgba);

        this.update();
    }

    update() {
        this.hexInput.value = this.hex;
        this.rInput.value = this.rgba.r;
        this.gInput.value = this.rgba.g;
        this.bInput.value = this.rgba.b;
        this.aInput.value = this.rgba.a;

        let startColor = `rgba(${this.rgba.r},${this.rgba.g},${this.rgba.b},0)`;
        let endColor = `rgba(${this.rgba.r},${this.rgba.g},${this.rgba.b})`;
        this.alphaInput.style.setProperty("--start-value", startColor);
        this.alphaInput.style.setProperty("--end-value", endColor);

        this.preview.style.backgroundColor = `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a === undefined ? 1 : this.rgba.a})`;

        if (this.gradientDrag) {
            this.setDragColor(this.gradientDrag, this.rgbaToString(this.rgba));
        }
    }

    rgbaToString(rgba) {
        return (rgba.a == null || rgba.a == 1) ? `rgb(${rgba.r},${rgba.g},${rgba.b})` : `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
    }

    parseRgba(value) {
        let rgba;
        if (value.startsWith('rgb') || value.startsWith('RGB')) {
            let cs = value.split('(')[1].split(')')[0].split(',');
            rgba = {
                r: parseInt(cs[0], 10),
                g: parseInt(cs[1], 10),
                b: parseInt(cs[2], 10),
                a: cs.length > 3 ? parseFloat(cs[3]) : 1
            };
            return rgba;
        }
        //rgba = this.hexToRgba(value);
        return rgba;
    }

    hsvToRgb(ah, as = 1, av = 1) {
        let h = ah / 60 % 6, s = as, v = av;
        if (as > 1) {
            s = as / 100;
        }
        if (av > 1) {
            v = av / 100;
        }
        let i = Math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];
        return {
            r: Math.floor(r * 255),
            g: Math.floor(g * 255),
            b: Math.floor(b * 255)
        };
    }

    rgbToHsv(rgb) {
        let r = rgb.r / 255;
        let g = rgb.g / 255;
        let b = rgb.b / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max == min) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: Math.floor(h * 360),
            s: Math.floor(s * 100),
            v: Math.floor(v * 100)
        };
    }

    hexToRgba(HEX) {
        let hex = HEX.indexOf("#") > -1 ? HEX.slice(1) : HEX;
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        return {
            r: parseInt(hex.slice(0, 2), 16) || 0,
            g: parseInt(hex.slice(2, 4), 16) || 0,
            b: parseInt(hex.slice(4, 6), 16) || 0,
            a: (parseInt(hex.slice(6, 8), 16) || 255) / 255
        };
    }

    rgbaToHex(rgba) {
        return (
            (rgba.r < 16 ? '0' : '') + rgba.r.toString(16) +
            (rgba.g < 16 ? '0' : '') + rgba.g.toString(16) +
            (rgba.b < 16 ? '0' : '') + rgba.b.toString(16)
        ).toUpperCase();
    }

    // hexToRgb(hex) {
    //     let HEX = hex.split('');
    //     return {
    //         r: +('0x' + HEX[0] + HEX[HEX[3] ? 1 : 0]) / 255,
    //         g: +('0x' + HEX[HEX[3] ? 2 : 1] + (HEX[3] || HEX[1])) / 255,
    //         b: +('0x' + (HEX[4] || HEX[2]) + (HEX[5] || HEX[2])) / 255
    //     };
    // }
    // RGB2HEX(RGB) {
    //     return (
    //         (RGB.r < 16 ? '0' : '') + RGB.r.toString(16) +
    //         (RGB.g < 16 ? '0' : '') + RGB.g.toString(16) +
    //         (RGB.b < 16 ? '0' : '') + RGB.b.toString(16)
    //     ).toUpperCase();
    // }
    // hue2RGB(hue) {
    //     var _Math = _math,
    //         h = hue * 6,
    //         mod = ~~h % 6, // Math.floor(h) -> faster in most browsers
    //         i = h === 6 ? 0 : (h - mod);
    //
    //     return {
    //         r: _Math.round([1, 1 - i, 0, 0, i, 1][mod] * 255),
    //         g: _Math.round([i, 1, 1, 1 - i, 0, 0][mod] * 255),
    //         b: _Math.round([0, 0, i, 1, 1, 1 - i][mod] * 255)
    //     };
    // }
    setPos(pos) {
        let rect = this.panel.getBoundingClientRect();
        let left = pos.x - rect.left - (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0);
        let top = pos.y - rect.top - (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        left = Math.max(0, left);
        left = Math.min(left, this.rWidth);
        top = Math.max(0, top);
        top = Math.min(top, this.rHeight);
        this.pointer.style.left = left + 'px';
        this.pointer.style.top = top + 'px';

        this.handleChange();
        //this.preview.style.background = `rgba(${ this.rgba.r }, ${ this.rgba.g }, ${ this.rgba.b }, ${ this.rgba.a || 1 })`;

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

    // toHexString(value, flag) {
    //     let rgba = this.toRgba(value);
    //     return this.rgbaToHexString(rgba, flag);
    // }
    // toRgba(value) {
    //     let rgba;
    //     if (value.startsWith("rgb")) {
    //         let cs = value.split('(')[1].split(')')[0].split(',');
    //         rgba = {
    //             r: parseInt(cs[0], 10),
    //             g: parseInt(cs[1], 10),
    //             b: parseInt(cs[2], 10),
    //             a: cs.length > 3 ? parseFloat(cs[3], 10) : 1
    //         };
    //         return rgba;
    //     }
    //     rgba = this.hexToRgba(value);
    //     return rgba;
    // }
    // rgbaToHexString(rgba, flag) {
    //     return (flag ? '#' : '') + `${ this.toHex2String(rgba.r) }${ this.toHex2String(rgba.g) }${ this.toHex2String(rgba.b) }`;
    // }
    // toHex2String(value) {
    //     return parseInt(value, 10).toString(16).padStart(2, '0').toUpperCase();
    // }
    // hexToRgba(ohexColor) {
    //     let hexColor = ohexColor.replace(/ /g, '');
    //     if(hexColor.startsWith('#')) {
    //         hexColor = hexColor.substr(1, 6);
    //     }
    //     if(hexColor == '') {
    //         hexColor = '#FFFFFF';
    //     } else if(hexColor.length < 3) {
    //         hexColor = hexColor.padEnd(3, 'F');
    //     }
    //     let r, g, b, a = 255;
    //     if(hexColor.length < 6) {
    //         r = parseInt(`0x${ hexColor[0] }${ hexColor[0] }`, 10);
    //         g = parseInt(`0x${ hexColor[1] }${ hexColor[1] }`, 10);
    //         b = parseInt(`0x${ hexColor[2] }${ hexColor[2] }`, 10);
    //     } else {
    //         r = parseInt(`0x${ hexColor[0] }${ hexColor[1] }`, 10);
    //         g = parseInt(`0x${ hexColor[2] }${ hexColor[3] }`, 10);
    //         b = parseInt(`0x${ hexColor[4] }${ hexColor[5] }`, 10);
    //     }
    //     if(hexColor.length > 7) {
    //         a = parseInt(`0x${ hexColor[6] }${ hexColor[7] }`);
    //         if(isNaN(a)) {
    //             a = 255;
    //         }
    //     }
    //     if(isNaN(r)) {
    //         r = 255;
    //     }
    //     if(isNaN(g)) {
    //         g = 255;
    //     }
    //     if(isNaN(b)) {
    //         b = 255;
    //     }
    //     return {
    //         r,
    //         g,
    //         b,
    //         a: a / 255
    //     };
    // }
    // getColorObject(color) {
    //     let type, colors, angleValue = 180, shape = "ellipse";
    //     if (typeof color == 'string') {
    //         if (color.startsWith('{')) {
    //             let obj = JSON.parse(color);
    //             if (obj.color) {
    //                 color = obj.color;
    //             } else {
    //                 return this.getEColorObject(obj.ecolor);
    //             }
    //         }
    //         if (color.startsWith('linear-gradient') || color.startsWith('radial-gradient')) {
    //             let obj = this.getGradientColor(color);
    //             colors = obj.colors;
    //             type = obj.type;
    //             angleValue = obj.angleValue;
    //             shape = obj.shape;
    //         } else if(color.startsWith('#') || color.startsWith('rgb') || color.startsWith('RGB')) {
    //             type = 1;
    //         } else {
    //             return;
    //         }
    //     } else if (typeof color == 'object') {
    //         let obj = color;
    //         if (obj.color) {
    //             color = obj.color;
    //         } else {
    //             return this.getEColorObject(obj.ecolor);
    //         }
    //     }
    //     return {
    //         type,
    //         colors,
    //         angleValue,
    //         color,
    //         shape
    //     };
    // }
    stopEvent(e) {
        this.stopPropagation(e);
        this.preventDefault(e);
    }

    preventDefault(e) {
        if (e.preventDefault) {
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
}


var c = new Color({
    el: document.getElementById('id-test'),
    //value: '#f3e5f5'
});

//let color = 'f3e5f5';
let color = 'radial-gradient(at center center, rgba(214,0,0,0.1) 4.09836%,rgba(0,37,104,0.5) 11.4754%, #00B7EE 33.1967%,rgb(98,52,0) 56.5574%,rgb(93,0,15) 71.7213%,rgba(74,20,140,1) 92.623%)';
//let color = 'rgba(0,37,104,0.5)';
c.setValue(color);
//console.log(g);
//c.setValue('#f3e5f5');
