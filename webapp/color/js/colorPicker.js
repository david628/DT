class Color {
    constructor(props) {
        this.template = `
            <div class="hw-color-wrap">
                <input class="hw-color-hidden" type="hidden"/>
                <div class="hw-color-recommend"></div>
                <div class="hw-color-picker-container">
                    <span class="hw-color-picker hw-color-opener"></span>
                    <span class="hw-color-picker-value hw-color-opener"></span>
                </div>
            </div>
        `;
        Object.assign(this, props);
        this.el.innerHTML = this.template;
        this.hidden = this.el.querySelector(".hw-color-hidden");
        this.$wrap = $(this.el).find(".hw-color-wrap");
        this.$picker = $(this.el).find(".hw-color-picker");
        this.$pickerValue = $(this.el).find(".hw-color-picker-value");
        this.$recommend = $(this.el).find(".hw-color-recommend");
        let recommendHtml = this.getRecommendHtml(this.recommend);
        this.$recommend.html(recommendHtml);
        this.hidden.name = this.name;
        if(!this.value) {
            this.value = '#FFFFFF';
        }
        this.hidden.value = this.value;
        this.init();
    }
    init() {
        if(!Color.hasDialog) {
            Color.initDialog();
            Color.hasDialog = true;
        }
        this.options = {
            gradient: this.gradient === false ? false : true,
            radial: this.radial ? true : false,
            angle: this.angle === false ? false : true,
            update: (value) => {
                this.setValue(value, true);
            }
        };
        this.updateUI();
    }
    refresh() {

    }
    onchange(v) {

    }
    getValue() {
        return $(this.hidden).val();
    }
    setValue(color, req) {
        this.value = color;
        this.hidden.value = color;
        this.updateUI();
        if(req) {
            this.onchange(color);
        }
    }
    updateUI() {
        let options = Color.getColorObject(this.value);
        let value;
        if(options.type == 2 || options.type == 3) {
            let startHex = Color.toHexString(options.colors[0], true);
            let endHex = Color.toHexString(options.colors[1], true);
            value = startHex + '-' + endHex;
        } else {
            value = Color.toHexString(options.color, true);
        }
        this.$pickerValue.text(value);
        this.$picker.css("background", options.color);
        this.$recommend.find(".hw-color-selectable").removeClass("active");
        let selectIndex = -1;
        for(let i in this.recommend) {
            if(this.recommend[i] == options.color) {
                selectIndex = i;
                break;
            }
        }
        if(selectIndex > -1) {
            this.$recommend.find(".hw-color-selectable").eq(selectIndex).addClass("active");
        }
        Object.assign(this.options, options);
        this.setOption();
    }
    setOption() {
        this.$wrap.data("options", this.options);
    }
    getRecommendHtml(colors) {
        if(!colors || !colors.length) {
            return '';
        }
        let html = colors.map(function(item) {
            return `<span class="hw-color-selectable" style="background:${ item }" data-value="${ item }">&nbsp;</span>`;
        }).join('');
        return html;
    }
    static getColor(value, options) {
        if (!value) {
            return "#fff";
        }
        let obj = this.getColorObject(value);
        if(!obj) {
            return "#fff";
        }
        if(obj.type == 1 || options && options.type == 'color') {
            return obj.color;
        }
        return this.parseEColor(obj);
    }
    static getColorObject(color) {
        let type, colors, angleValue = 180, shape = "ellipse";
        if (typeof color == 'string') {
            if (color.startsWith('{')) {
                let obj = JSON.parse(color);
                if (obj.color) {
                    color = obj.color;
                } else {
                    return this.getEColorObject(obj.ecolor);
                }
            }
            if (color.startsWith('linear-gradient') || color.startsWith('radial-gradient')) {
                let obj = this.getGradientColor(color);
                colors = obj.colors;
                type = obj.type;
                angleValue = obj.angleValue;
                shape = obj.shape;
            } else if(color.startsWith('#') || color.startsWith('rgb') || color.startsWith('RGB')) {
                type = 1;
            } else {
                return;
            }
        } else if (typeof color == 'object') {
            let obj = color;
            if (obj.color) {
                color = obj.color;
            } else {
                return this.getEColorObject(obj.ecolor);
            }
        }
        return {
            type,
            colors,
            angleValue,
            color,
            shape
        };
    }
    static getEColorObject(color) {
        let ecv = color;
        if(typeof color == 'string') {
            ecv = Color.getColor(color, {type: 'ecolor'});
        }
        let type = ecv.type;
        let c1 = ecv.colorStops[0].color;
        let c2 = ecv.colorStops[1].color;
        if(type == 'radial') {
            return {
                type: 3,
                angleValue: 180,
                colors: [c1, c2],
                color: `radial-gradient(ellipse,${ c1 },${ c2 })`
            };
        }
        let x1 = ecv.x, x2 = ecv.x2, y1 = ecv.y, y2 = ecv.y2, angleValue = 90;
        let dx = x2 - x1, dy =  y2 - y1;
        if(dx == 0) {
            if(dy < 0) {
                angleValue = 270;
            }
        } else {
            angleValue = Math.atan(dy / dx) * 360 / Math.PI;
        }
        angleValue = (angleValue + 90) % 360;
        return {
            type: 2,
            angleValue,
            colors: [c1, c2],
            color: `linear-gradient(${ angleValue }deg,${ c1 },${ c2 })`
        };
    }
    static getGradientColor(color) {
        let regex = "\\((.+)\\)";
        let arr = color.match(regex);
        let rgbRex = /\((.*?)\)/ig;
        let arrColor = arr[1].replace(rgbRex, function(data) {
            return data.replace(/,/g, '-');
        });
        let sp = arrColor.split(',');
        let angleValue = 180, c1, c2, shape = 'ellipse';
        if(sp[0].indexOf("deg") > -1
            || sp[0].indexOf("top") > -1
            || sp[0].indexOf("bottom") > -1
            || sp[0].indexOf("left") > -1
            || sp[0].indexOf("right") > -1
            || sp[0].indexOf("circle") > -1
            || sp[0].indexOf("ellipse") > -1
        ) {
             if(sp[0].indexOf("deg") > -1) {
                 angleValue = parseInt(sp[0], 10);
             } else if(sp[0].indexOf("top") > -1) {
                 angleValue = 0;
             } else if(sp[0].indexOf("right") > -1) {
                 angleValue = 90;
             } else if(sp[0].indexOf("bottom") > -1) {
                 angleValue = 180;
             } else if(sp[0].indexOf("left") > -1) {
                 angleValue = 270;
             } else if(sp[0].indexOf("circle") > -1) {
                 shape = 'circle';
             } else if(sp[0].indexOf("ellipse") > -1) {
                 shape = 'ellipse';
             }
             c1 = sp[1].replace(/-/g, ',');
             c2 = sp[2].replace(/-/g, ',');
        } else {
            c1 = sp[0].replace(/-/g, ',');
            c2 = sp[1].replace(/-/g, ',');
        }
        if(c1.indexOf(')') > -1) {
            c1 = c1.split(')')[0] + ')';
        } else {
            c1 = c1.split(' ')[0];
        }
        if(c2.indexOf(')') > -1) {
            c2 = c2.split(')')[0] + ')';
        } else {
            c2 = c2.split(' ')[0];
        }
        let type = 1;
        if(color.startsWith('linear-gradient')) {
            type = 2;
        } else if(olor.startsWith('radial-gradient')) {
            type = 3;
        }
        return {
            type,
            angleValue,
            colors: [c1, c2],
            shape
        };
    }
    static getType(color) {
        let type = 1;
        if(color.startsWith('linear-gradient')) {
            type = 2;
        } else if(olor.startsWith('radial-gradient')) {
            type = 3;
        }
        return type;
    }
    static parseEColor(value) {
        let obj = (typeof value == 'string') ? this.getGradientColor(value) : value;
        let ecolor;
        if(obj.type == 3) {
            ecolor = {
                type: 'radial',
                x: 0,
                y: 0,
                r: 1,
                colorStops: [{
                    offset: 0,
                    color: '#fff'
                }, {
                    offset: 1,
                    color: '#fff'
                }]
            };
        } else {
            ecolor = {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: '#fff'
                }, {
                    offset: 1,
                    color: '#fff'
                }]
            };
            let angleValue = (obj.angleValue + 360 - 90) % 360;
            let dx = Math.cos(angleValue / 180 * Math.PI);
            let dy = Math.sin(angleValue / 180 * Math.PI);
            if(angleValue >= 0 && angleValue <= 90 || angleValue >= 270 && angleValue <= 360) {
                ecolor.x = 0;
                ecolor.x2 = Math.floor((ecolor.x + dx) * 100) / 100;
            } else {
                ecolor.x2 = 0;
                ecolor.x = Math.floor((ecolor.x2 - dx) * 100) / 100;
            }
            if(angleValue >= 0 && angleValue <= 180) {
                ecolor.y = 0;
                ecolor.y2 = Math.floor((ecolor.y + dy) * 100) / 100;
            } else {
                ecolor.y2 = 0;
                ecolor.y = Math.floor(ecolor.y2 - dy) * 100 / 100;
            }
        }
        ecolor.colorStops[0].color = obj.colors[0];
        ecolor.colorStops[1].color = obj.colors[1];
        return ecolor;
    }
    static initColor(color) {
        let rgba = this.toRgba(color);
        this.rgba = rgba;
        let hsv = this.rgbToHsv(rgba.r, rgba.g, rgba.b);
        this.hsv = hsv;
        this.$areaSlider.val(hsv.h);
        this.hexValue = this.toHexString(color);
        this.$hexInput.val(this.hexValue);
        this.alphaValue = Math.floor(100 * rgba.a);
        this.$alphaInput.val(this.alphaValue);
        this.updateAlphaSlider(true);
        this.updateHueArea();
        this.$preview.css("background", color);
    }
    static initDialog() {
        let commons = [
            "#ffffff", "#fafafa", "#f5f5f5", "#e8e8e8", "#d9d9d9", "#bfbfbf", "#8c8c8c", "#595959", "#262626", "#000000",
            "#e5f7ff", "#b8e7ff", "#8ed4ff", "#65bfff", "#39a7ff", "#008dff", "#006adc", "#004db6", "#00378e", "#002568",
            "#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c783", "#66bb6a", "#4caf50", "#42a047", "#388e3c", "#2f7d32", "#1b5e20",
            "#fffbe5", "#fff2b5", "#ffe689", "#ffd75c", "#ffc627", "#fcae00", "#d68900", "#ae6900", "#884d00", "#623400",
            "#fff1f0", "#ffccc6", "#ffa39c", "#ff7772", "#ff4b49", "#f81d22", "#d10d18", "#aa0212", "#84000f", "#5d000f",
            "#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c26b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"];
        let commonHtml = commons.map(function(item) {
            return `<span class="hw-color-selectable" style="background-color: ${ item }"></span>`;
        }).join('');
        let globalHtml = this.getGlobalHtml();
        let recentHtml = this.getRecentHtml();
        this.$dialog = $(`
            <div class="hw-color-dialog" style="visibility: hidden;">
                <div class="hw-color-head">
                    <div class="hw-color-tab common"></div>
                    <div class="hw-color-tab custom"></div>
                    <div class="hw-color-tab gradient"></div>
                    <div class="hw-color-tab radial"></div>
                </div>
                <div class="hw-color-content">
                    <div class="hw-color-gradient none clearfix">
                        <div class="hw-color-gradient-bar left pointer"></div>
                        <div class="hw-color-gradient-bar right pointer"></div>
                    </div>
                    <div class="hw-color-hue">
                        <div class="hw-color-saturation">
                            <div class="hw-color-brightness">
                                <div class="hw-color-dragger"></div>
                            </div>
                        </div>
                    </div>
                    <div class="hw-color-middle clearfix">
                        <div class="hw-color-slider">
                            <input class="hw-color-area-slider" type="range" min=0 max=360 value=0>
                            <input class="hw-color-alpha-slider" type="range" min=0 max=100 value=100>
                        </div>
                        <div class="hw-color-show">
                            <div class="hw-color-preview-bg">
                                <div class="hw-color-preview"></div>
                            </div>
                        </div>
                    </div>
                    <div class="hw-color-input-container clearfix">
                        <div class="hw-color-hex-container">填充&nbsp;&nbsp;#<input class="hw-color-hex-input" value="FFFFFF" type="text"></div>
                        <div class="hw-color-alpha-container">不透明度&nbsp;&nbsp;<input class="hw-color-alpha-input" value=100 type="number"></div>
                    </div>
                    <div class="hw-color-angle none">
                        <input class="hw-color-angle-slider" min=0 max=360 value=180 type="range">
                        <div class="hw-color-angle-area">
                            <span>0</span>
                            <input class="hw-color-angle-input" min=0 max=360 value=180 type="number">
                            <span>360</span>
                        </div>
                    </div>
                </div>
                <div class="hw-color-spliter"></div>
                <div class="hw-color-common none">
                    <div class="hw-color-common-content">${ commonHtml }</div>
                    <div class="hw-color-spliter"></div>
                </div>
                <div class="hw-color-global"><div>
                <span class="hw-color-global-arrow"></span>
                <span>全局颜色收藏</span>
            </div>
            <div class="hw-color-global-content">${ globalHtml }</div>
            </div>
            <div class="hw-color-spliter"></div>
            <div class="hw-color-recent">
                <div>
                    <span class="hw-color-recent-arrow"></span>
                    <span>最近使用颜色</span>
                </div>
                <div class="hw-color-recent-content">${ recentHtml }</div>
            </div>
        </div>`);
        $("body").append(this.$dialog);
        this.$tabs = this.$dialog.find(".hw-color-tab");
        this.$tabGradient = this.$dialog.find(".hw-color-tab.gradient");
        this.$tabRadial = this.$dialog.find(".hw-color-tab.radial");
        this.$common = this.$dialog.find(".hw-color-common");
        this.$content = this.$dialog.find(".hw-color-content");
        this.$global = this.$dialog.find(".hw-color-global");
        this.$recent = this.$dialog.find(".hw-color-recent");
        this.$gradient = this.$dialog.find(".hw-color-gradient");
        this.$bars = this.$dialog.find(".hw-color-gradient-bar");
        this.$hue = this.$dialog.find(".hw-color-hue");
        this.$val = this.$dialog.find(".hw-color-brightness");
        this.$dragger = this.$dialog.find(".hw-color-dragger");
        this.$areaSlider = this.$dialog.find(".hw-color-area-slider");
        this.$alphaSlider = this.$dialog.find(".hw-color-alpha-slider");
        this.$preview = this.$dialog.find(".hw-color-preview");
        this.$hexInput = this.$dialog.find(".hw-color-hex-input");
        this.$alphaInput = this.$dialog.find(".hw-color-alpha-input");
        this.$angle = this.$dialog.find(".hw-color-angle");
        this.$angleSlider = this.$dialog.find(".hw-color-angle-slider");
        this.$angleInput = this.$dialog.find(".hw-color-angle-input");
        this.$collectionAdd = this.$dialog.find(".hw-color-collection-add");
        this.$globalContent = this.$dialog.find(".hw-color-global-content");
        this.$recentContent = this.$dialog.find(".hw-color-recent-content");
        this.color = "#FFFFFF";
        this.rgba = {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        };
        this.index = 1;
        this.bindEvent();
        this.setPosition();
    }
    static setOptions($target) {
        let $wrap = $target.closest(".hw-color-wrap");
        if($wrap.length) {
            this.options = $wrap.data('options');
        }
    }
    static bindEvent() {
        $(document).on("click", (e) => {
            let $target = $(e.target);
            if ($target.hasClass("hw-color-opener")) {
                let top = $target.offset().top + 30;
                let wh = $(window).height();
                let mt = e.clientY;
                let th = this.$dialog.height();
                if(mt > wh / 2) {
                    top = mt - th - 50;
                }
                if(top < 0) {
                    top = 10;
                }
                this.$dialog.css("visibility", "");
                    this.$dialog.css({
                    top: top + "px"
                });
                this.setOptions($target);
                this.color = this.options.color;
                this.type = this.options.type;
                this.options.gradient ? this.$tabGradient.show() : this.$tabGradient.hide();
                this.options.radial ? this.$tabRadial.show() : this.$tabRadial.hide();
                this.options.angle ? this.$angle.show() : this.$angle.hide();
                this.getRecentHtml();
                this.initColor(this.color);
                this.updateBar();
                this.show(this.type);
            } else {
                let $container = $target.closest(".hw-color-dialog");
                if ($target.hasClass("hw-color-collection-add")) {
                    let color = this.toRgbaString(this.rgba);
                    let globalHtml = this.getGlobalHtml(color);
                    this.$globalContent.html(globalHtml);
                } else if ($target.hasClass("hw-color-selectable")) {
                    this.setOptions($target);
                    let color = $target.attr("data-value") || $target.css("background-color");
                    this.$dialog.find(".hw-color-selectable").removeClass("active");
                    $target.siblings().removeClass("active");
                    $target.addClass("active");
                    this.setSelectColor(color);
                }
                if (!$container.length && !$target.hasClass(".hw-color-dialog-inner")) {
                    this.$dialog.css("visibility", "hidden");
                    let recentHtml = this.getRecentHtml(this.color);
                    this.$recentContent.html(recentHtml);
                }
            }
            Color.$menu.hide();
        });
        $(document).on("mouseup", (e) => {
            this.isMouseDown = false;
        });
        this.$tabs.click((e) => {
            let $target = $(e.target);
            $target.siblings().removeClass("active");
            $target.addClass("active");
            let index = $target.index();
            this.index = index;
            if(index == 0) {
                this.$common.show();
                this.$content.hide();
                this.$gradient.hide();
                this.$angle.hide();
            } else if(index == 1) {
                this.$common.hide();
                this.$content.show();
                this.$gradient.hide();
                this.$angle.hide();
            } else if(index == 2) {
                this.$common.hide();
                this.$content.show();
                this.$gradient.show();
                this.$angle.show();
                this.updateBar();
                this.$bars[0].click();
            } else if(index == 3) {
                this.$common.hide();
                this.$content.show();
                this.$gradient.show();
                this.$angle.hide();
                this.updateBar();
                this.$bars[0].click();
            }
        });
        this.$bars.click((e) => {
            let $target = $(e.target);
            $target.siblings().removeClass("active");
            $target.addClass("active");
            let color = $target.css("background-color");
            this.initColor(color);
        });
        this.$val.on("mousedown", (e) => {
            e.stopPropagation();
            this.isMouseDown = true;
            this.setDragger(e);
        });
        this.$val.on("mousemove", (e) => {
            e.stopPropagation();
            if(!this.isMouseDown) {
                return;
            }
            this.setDragger(e);
        });
        this.$areaSlider.get(0).onchange = (e) => {
            this.hsv.h = e.target.value;
            this.updateHueArea();
            this.setDragger();
        };
        this.$alphaSlider.get(0).onchange = (e) => {
            this.alphaValue = e.target.value;
            this.rgba.a = this.alphaValue / 100;
            this.$alphaInput.val(this.alphaValue);
            this.updateUI();
        };
        this.$hexInput.get(0).onchange = (e) => {
            let value = this.checkHexValue(e.target.value);
            let rgb = this.hexToRgba(value);
            this.hexValue = value;
            Object.assign(this.rgba, rgb);
            let hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
            this.hsv = hsv;
            this.$areaSlider.val(hsv.h);
            this.updateHueArea();
            this.updateAlphaSlider();
            this.updateUI();
        };
        this.$alphaInput.get(0).onchange = (e) => {
            let target = e.target;
            if(target.value < 0) {
                target.value = 0;
            } else if(target.value > 100) {
                target.value = 100;
            }
            target.value = Math.floor(target.value);
            this.alphaValue = target.value;
            this.rgba.a = this.alphaValue / 100;
            this.$alphaSlider.val(this.alphaValue);
            this.updateUI();
        };
        this.$angleSlider.get(0).onchange = (e) => {
            this.angleValue = e.target.value;
            this.$angleInput.val(this.angleValue);
            this.updateUI();
        };
        this.$angleInput.get(0).onchange = (e) => {
            let target = e.target;
            if(target.value < 0) {
                target.value = 0;
            } else if(target.value > 360) {
                target.value = 360;
            }
            target.value = Math.floor(target.value);
            this.angleValue = target.value;
            this.$angleSlider.val(this.angleValue);
            this.updateUI();
        };
        Color.$menu = $(`<div class="hw-color-menu hw-color-dialog-inner">x</div>`);
        $("body").append(Color.$menu);
        Color.$dialog.on("contextmenu", (e) => {
            e.stopPropagation();
            e.preventDefault();
            let $target = $(a.target);
            if(!$target.hasClass("hw-color-selectable") || !$target.hasClass("collection")) {
                return;
            }
            Color.$menu.css("left", e.clientX + "px").css("top", e.clientY + "px");
            Color.$menu.show();
            this.selectIndex = $target.index();
        });
        Color.$menu.click((a) => {
            e.stopPropagation(),
            this.$globalContent.html(Color.getGlobalHtml(null, this.selectIndex));
            this.$menu.hide();
        });
        Color.$dialog.find(".hw-color-global-arrow").click((e) => {
            let $target = $(e.target);
            if($target.hasClass("active")) {
                $target.removeClass("active");
                Color.$globalContent.show()
            } else {
                $target.addClass("active");
                Color.$globalContent.hide();
            }
        });
        Color.$dialog.find(".hw-color-recent-arrow").click((e) => {
            let $target = $(e.target);
            if($target.hasClass("active")) {
                $target.removeClass("active");
                Color.$recentContent.show();
            } else {
                $target.addClass("active");
                Color.$recentContent.hide();
            }
        });
    }
    static show(index) {
        if(index == null) {
            index = 1;
        }
        Object.assign(this, this.getColorObject(this.color));
        this.$tabs[index].click();
        if(index > 1) {
            for (let i in this.colors) {
                $(this.$bars[i]).css("background-color", this.colors[i]);
            }
            this.updateGradient();
            $(this.$bars[0]).click();
            this.$angleSlider.val(this.angleValue);
            this.$angleInput.val(this.angleValue);
        }
    }
    static callback(color) {
        this.options.update(color);
    }
    static checkHexValue(hexColor) {
        let rgba = this.hexToRgba(hexColor);
        hexColor = this.rgbaToHexString(rgba);
        this.$hexInput.val(hexColor);
        return hexColor;
    }
    static getGlobalHtml(value, delIndex) {
        let name = "globalColor";
        let len = 24;
        let is = localStorage.getItem(name);
        let colors = is ? JSON.parse(is) : [];
        if(colors.length < len && value && this.getColorObject(value).type == 1) {
            value = value.replace(/ /g, "");
            if(colors.indexOf(value) == -1) {
                colors.push(value);
                localStorage.setItem(name, JSON.stringify(colors));
            }
        }
        if(delIndex != null) {
            colors.splice(delIndex, 1);
            localStorage.setItem(name, JSON.stringify(colors));
        }
        let html = colors.slice(0, len).map(function(item) {
            return `<span class="hw-color-selectable collection" style="background-color: ${ item }">&nbsp;</span>`;
        }).join('');
        return html + (colors.length < len ? '<span class="hw-color-collection-add">+</span>': '');
    }
    static getRecentHtml(value) {
        let name = "recentColors";
        let len = 8;
        let is = localStorage.getItem(name);
        let colors = is ? JSON.parse(is) : [];
        if(value && this.getColorObject(value).type == 1) {
            value = value.replace(/ /g, "");
            if(colors.indexOf(value) == -1) {
                colors.unshift(value);
                colors = colors.slice(0, len);
                localStorage.setItem(name, JSON.stringify(colors));
            }
        }
        let html = colors.slice(0, len).map(function(item) {
            return `<span class="hw-color-selectable" style="background-color: ${ item }">&nbsp;</span>`;
        }).join('');
        return html;
    }
    static setPosition() {
        this.valWidth = this.$val.width();
        this.valHeight = this.$val.height();
        this.valTop = this.$val.offset().top;
        this.valLeft = this.$val.offset().left;
    }
    static setDragger(e) {
        this.setPosition();
        if(e) {
            this.draggerTop = e.clientY - this.valTop;
            this.draggerLeft = e.clientX - this.valLeft;
        }
        if(this.draggerTop < 0) {
            this.draggerTop = 0;
        } else if(this.draggerTop > this.valHeight) {
            this.draggerTop = this.valHeight;
        }
        if(this.draggerLeft < 0) {
            this.draggerLeft = 0;
        } else if(this.draggerLeft > this.valWidth) {
            this.draggerLeft = this.valWidth;
        }
        this.$dragger.css({
            top: this.draggerTop,
            left: this.draggerLeft
        });
        let saturation = parseFloat(this.draggerLeft / this.valWidth, 10);
        let brightness = parseFloat((this.valHeight - this.draggerTop) / this.valHeight, 10);
        let hueValue = this.hsv.h;
        Object.assign(this.rgba, this.hsvToRgb(hueValue, saturation, brightness)),
        this.$hexInput.val(this.rgbaToHexString(this.rgba));
        this.updateAlphaSlider();
        this.updateUI();
    }
    static updateHueArea() {
        let hsv = this.hsv;
        let hueValue = hsv.h;
        let top = Math.floor((1 - hsv.v / 100) * this.valHeight);
        let left = Math.floor(hsv.s / 100 * this.valWidth);
        if(this.draggerTop == null) {
            this.draggerTop = top;
        }
        if(this.draggerLeft == null) {
            this.draggerLeft = left;
        }
        this.$dragger.css({
            top: top + "px",
            left: left + "px"
        });
        let bg = this.hsvToRgb(hueValue);
        this.$hue.css("background-color", `rgb(${ bg.r },${ bg.g },${ bg.b })`);
    }
    static updateUI() {
        let rgba = this.rgba;
        let color = `rgb(${ rgba.r },${ rgba.g },${ rgba.b },${ rgba.a })`;
        this.color = color;
        if(this.index == 2) {
            let $target = this.$gradient.find('.active');
            $target.css("background-color", color);
            let index = $target.index();
            this.colors[index] = color;
            this.updateGradient();
            color = `linear-gradient(${ this.angleValue }deg,${ this.leftBarValue },${ this.rightBarValue })`;
        } else if(this.index == 3) {
            let $target = this.$gradient.find(".active");
            $target.css("background-color", color);
            let index = $target.index();
            this.colors[index] = color;
            this.updateGradient();
            if(!this.shape) {
                this.shape = 'ellipse';
                color = `radial-gradient(${ this.shape },${ this.leftBarValue },${ this.rightBarValue })`;
            }
        }
        this.$preview.css("background", color);
        this.$dialog.find(".hw-color-selectable").removeClass("active");
        this.callback(color);
    }
    static updateBar() {
        if(!this.colors) {
            this.colors = [this.color, this.color];
        }
        for(let i in this.colors) {
            $(this.$bars[i]).css('background-color', this.colors[i]);
        }
        this.updateGradient();
    }
    static updateGradient() {
        let startColor = this.$gradient.find(".left").css("background-color");
        let endColor = this.$gradient.find(".right").css("background-color");
        this.leftBarValue = startColor;
        this.rightBarValue = endColor;
        this.$gradient.get(0).style.setProperty("--start-value", startColor);
        this.$gradient.get(0).style.setProperty("--end-value", endColor);
    }
    static updateAlphaSlider(full) {
        let rgba = this.rgba;
        let startColor = `rgba(${ rgba.r },${ rgba.g },${ rgba.b },0)`;
        let endColor = `rgba(${ rgba.r },${ rgba.g },${ rgba.b })`;
        this.$alphaSlider.get(0).style.setProperty("--start-value", startColor);
        this.$alphaSlider.get(0).style.setProperty("--end-value", endColor);
        if(full) {
            this.$alphaSlider.val(Math.floor(this.alphaValue));
        }
    }
    static setSelectColor(color) {
        this.initColor(color);
        this.callback(color);
        this.getRecentHtml(color);
    }
    static rgbaStringToHexString(value) {
        let rgba = this.toRgba(value);
        return this.rgbaToHexString(rgba);
    }
    static rgbaStringToHex8String(value) {
        let rgba = this.toRgba(value);
        return this.rgbaToHex8String(rgba);
    }
    static toRgba(value) {
        let rgba;
        if (value.startsWith("rgb")) {
            let cs = value.split('(')[1].split(')')[0].split(',');
            rgba = {
                r: parseInt(cs[0], 10),
                g: parseInt(cs[1], 10),
                b: parseInt(cs[2], 10),
                a: cs.length > 3 ? parseFloat(cs[3]) : 1
            };
            return rgba;
        }
        rgba = this.hexToRgba(value);
        return rgba;
    }
    static hexToRgba(ohexColor) {
        let hexColor = ohexColor.replace(/ /g, '');
        if(hexColor.startsWith('#')) {
            hexColor = hexColor.substr(1, 6);
        }
        if(hexColor == '') {
            hexColor = '#FFFFFF';
        } else if(hexColor.length < 3) {
            hexColor = hexColor.padEnd(3, 'F');
        }
        let r, g, b, a = 255;
        if(hexColor.length < 6) {
            r = parseInt(`0x${ hexColor[0] }${ hexColor[0] }`, 10);
            g = parseInt(`0x${ hexColor[1] }${ hexColor[1] }`, 10);
            b = parseInt(`0x${ hexColor[2] }${ hexColor[2] }`, 10);
        } else {
            r = parseInt(`0x${ hexColor[0] }${ hexColor[1] }`, 10);
            g = parseInt(`0x${ hexColor[2] }${ hexColor[3] }`, 10);
            b = parseInt(`0x${ hexColor[4] }${ hexColor[5] }`, 10);
        }
        if(hexColor.length > 7) {
            a = parseInt(`0x${ hexColor[6] }${ hexColor[7] }`);
            if(isNaN(a)) {
                a = 255;
            }
        }
        if(isNaN(r)) {
            r = 255;
        }
        if(isNaN(g)) {
            g = 255;
        }
        if(isNaN(b)) {
            b = 255;
        }
        return {
            r,
            g,
            b,
            a: a / 255
        };
    }
    static toRgbaString(rgba) {
        return (rgba.a == null || rgba.a == 1) ? `rgb(${ rgba.r },${ rgba.g },${ rgba.b })` : `rgba(${ rgba.r },${ rgba.g },${ rgba.b },${ rgba.a })`;
    }
    static rgbaToHex8String(rgba, flag) {
        let a = (rgba.a == null) ? 255 : Math.floor(rgba.a * 255);
        return (flag ? '#' : '') + `${ this.toHex2String(rgba.r) }${ this.toHex2String(rgba.g) }${ this.toHex2String(rgba.b) }` + (a !== 255 ? this.toHex2String(a) : '');
    }
    static rgbaToHexString(rgba, flag) {
        return (flag ? '#' : '') + `${ this.toHex2String(rgba.r) }${ this.toHex2String(rgba.g) }${ this.toHex2String(rgba.b) }`;
    }
    static toHex2String(value) {
        return parseInt(value, 10).toString(16).padStart(2, '0').toUpperCase();
    }
    static toHexString(value, flag) {
        let rgba = this.toRgba(value);
        return this.rgbaToHexString(rgba, flag);
    }
    static toHex8String(value, flag) {
        let rgba = this.toRgba(value);
        return this.rgbaToHexString(rgba, flag) + (rgba.a == 1 ? '' : this.toHex2String(Math.floor(rgba.a * 100)));
    }
    static hsvToRgb(ah, as = 1, av = 1) {
        let h = ah / 60 % 6, s = as, v = av;
        if(as > 1) {
            s = as / 100;
        }
        if(av > 1) {
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
    static rgbToHsv(ar, ag, ab) {
        let r = ar / 255;
        let g = ag / 255;
        let b = ab / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;
        if(max == min) {
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
    static getGradientRatio(startColor, endColor, dstColor) {
        let sRgb = this.toRgba(startColor);
        let eRgb = this.toRgba(endColor);
        let dRgb = this.toRgba(dstColor);
        let dr = dRgb.r - sRgb.r;
        let dg = dRgb.g - sRgb.g;
        let db = dRgb.b - sRgb.b;
        let max = Math.max(dr, dg, db);
        let ratio;
        if(max === dg) {
            ratio = (eRgb.g - sRgb.g) ? (dg / (eRgb.g - sRgb.g)) : 0;
        } else if(max === db) {
            ratio = (eRgb.b - sRgb.b) ? (db / (eRgb.b - sRgb.b)) : 0;
        } else {
            ratio = (eRgb.r - sRgb.r) ? (dr / (eRgb.r - sRgb.r)) : 0;
        }
        return ratio;
    }
    static getGradientArray(startColor, endColor, step) {
        let sRgb = this.toRgba(startColor);
        let eRgb = this.toRgba(endColor);
        if(step < 2) {
            return [startColor];
        }
        let dr = (eRgb.r - sRgb.r) / (step - 1);
        let dg = (eRgb.g - sRgb.g) / (step - 1);
        let db = (eRgb.b - sRgb.b) / (step - 1);
        let arr = [];
        for(let i = 0; i < step; i++) {
            let rgba = {
                r: parseInt(dr * i + sRgb.r, 10),
                g: parseInt(dg * i + sRgb.g, 10),
                b: parseInt(db * i + sRgb.b, 10)
            }
            arr.push(this.rgbaToHexString(rgba, true));
        }
        return arr;
    }
    static getGradientValue(startColor, endColor, ratio) {
        let sRgb = this.toRgba(startColor);
        let eRgb = this.toRgba(endColor);
        let dr = (eRgb.r - sRgb.r) * ratio;
        let dg = (eRgb.g - sRgb.g) * ratio;
        let db = (eRgb.b - sRgb.b) * ratio;
        let rgba = {
            r: parseInt(dr + sRgb.r, 10),
            g: parseInt(dg + sRgb.g, 10),
            b: parseInt(db + sRgb.b, 10)
        };
        return this.rgbaToHexString(rgba, true);
    }
}




var cp = new Color({
    el: document.getElementById('id-test')
});
