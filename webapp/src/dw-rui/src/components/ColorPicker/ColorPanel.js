import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColorPanel extends Component {
    static propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        angle: PropTypes.string,
        angleType: PropTypes.any,
        colors: PropTypes.array,
        isMove: PropTypes.bool
    };
    static defaultProps = {
        sprefix: 'dwrui',
        isMove: false,
        angleType: {
            'to top': 0,
            'to top right': 45,
            'to right': 90,
            'to bottom right': 135,
            'to bottom': 180,
            'to bottom left': 225,
            'to left': 270,
            'to top left': 315,
            'radial': 180
            //'radial': 'at center center'
        },
        colors: [
            "#ffffff", "#fafafa", "#f5f5f5", "#e8e8e8", "#d9d9d9", "#bfbfbf", "#8c8c8c", "#595959", "#262626", "#000000",
            "#e5f7ff", "#b8e7ff", "#8ed4ff", "#65bfff", "#39a7ff", "#008dff", "#006adc", "#004db6", "#00378e", "#002568",
            "#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c783", "#66bb6a", "#4caf50", "#42a047", "#388e3c", "#2f7d32", "#1b5e20",
            "#fffbe5", "#fff2b5", "#ffe689", "#ffd75c", "#ffc627", "#fcae00", "#d68900", "#ae6900", "#884d00", "#623400",
            "#fff1f0", "#ffccc6", "#ffa39c", "#ff7772", "#ff4b49", "#f81d22", "#d10d18", "#aa0212", "#84000f", "#5d000f",
            "#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c26b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c"
        ]
    };
    constructor(props) {
        super(props);
        this.rWidth = 244;
        this.rHeight = 168;
        this.gradientSliderBarWidth = 244;
        let value = props.value || props.defaultValue;
        let { color, gradient, type, angle } = this.getColor(value);
        if(!gradient || !gradient.length) {
            gradient = [{
                pos: {
                    x: 0,
                    y: 0
                },
                value: '#FFFFFF'
            }, {
                pos: {
                    x: 100,
                    y: 0
                },
                value: '#000000'                    
            }];
        }
        let rgba = this.getRgba(color);
        let hex = this.rgbaToHex(rgba);
        let hsv = this.rgbToHsv(rgba);
        let hue = hsv.h;
        let left = hsv.s * this.rWidth / 100;
        let top = (100 - hsv.v) * this.rHeight / 100;
        this.state = {
            angle,
            type,
            hex,
            hue,
            rgba,
            ...rgba,
            currentDrag: 0,
            gradient,
            pos: [left, top]
        }
    }
    componentDidMount() {
        const { rgba } = this.state;
        let startColor = `rgba(${ rgba.r },${ rgba.g },${ rgba.b },0)`;
        let endColor = `rgba(${ rgba.r },${ rgba.g },${ rgba.b })`;
        this.alphaInput.style.setProperty("--start-value", startColor);
        this.alphaInput.style.setProperty("--end-value", endColor);
    }
    componentWillReceiveProps(nextProps) {
        if('value' in nextProps) {
            const { value } = nextProps;
            this.setState({
                value
            });
        }
    }
    componentDidUpdate() {
        const { rgba } = this.state;
        let startColor = `rgba(${ rgba.r },${ rgba.g },${ rgba.b },0)`;
        let endColor = `rgba(${ rgba.r },${ rgba.g },${ rgba.b })`;
        this.alphaInput.style.setProperty("--start-value", startColor);
        this.alphaInput.style.setProperty("--end-value", endColor);
    }
    setPos(pos) {
        const { rgba, hue } = this.state;
        let rect = this.panel.getBoundingClientRect();
        let left = pos.x - rect.left - (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0);
        let top = pos.y - rect.top - (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        left = Math.max(0, left);
        left = Math.min(left, this.rWidth);
        top = Math.max(0, top);
        top = Math.min(top, this.rHeight);
        if(left !== this.state.pos[0] || top !== this.state.pos[1]) {
            let s = left * 100 / this.rWidth;
            let v = (this.rHeight - top) * 100 / this.rHeight;
            let newRgba = this.hsvToRgb(hue, s, v);
            newRgba.a = rgba.a;
            let hex = this.rgbaToHex(rgba);
            this.doUpdate({
                pos: [left, top],
                rgba: newRgba,
                ...newRgba,
                hex
            });
        }
    }
    getColor(value) {
        let color = '#FFFFFF', angle, item = this.getParsedGradient(value), gradient = [], type;
        if (item && item.length) {
            item = item[0];
            let colors = item.colors;
            angle = item.direction;
            if (item.type === 'linear-gradient') {
                type = 1;
            } else if (item.type === 'radial-gradient') {
                type = 2;
            }
            colors.forEach(item => {
                gradient.push({
                    pos: {
                        x: parseFloat(item.pos, 10),
                        y: 0
                    },
                    value: item.color
                });
            });
        } else {
            color = value;
            type = 0;
        }
        return {
            color,
            angle,
            gradient,
            type
        };
    }
    getRgba(v) {
        let rgba;
        if (v.startsWith('rgb') || v.startsWith('RGB')) {
            rgba = this.parseRgba(v);
        } else if (v.startsWith('#')) {
            let value = v.slice(1);
            if (this.validHex(value)) {
                rgba = this.hexToRgba(value);
            }
        } else if (this.validHex(v)) {
            rgba = this.hexToRgba(v);
        }
        return rgba;
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
    handleMouseDown = e => {
        e.preventDefault();
        this.isMove = true;
        this.setPos({
            x: e.pageX || e.clientX,
            y: e.pageY || e.clientY
        });
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    };
    handleMouseMove = e => {
        e.preventDefault();
        if (this.isMove) {
            this.setPos({
                x: e.pageX || e.clientX,
                y: e.pageY || e.clientY
            });
        }
    };
    handleMouseUp = e => {
        e.preventDefault();
        this.isMove = false;
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    };
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
        let value = Number(v);
        if (value >= 0 && value <= 1) {
            return value;
        }
        return false;
    }
    handleAngle = e => {
        e.preventDefault();
        const angle = e.target.value;
        this.setState({
            angle
        });
        this.onChange({
            ...this.state,
            angle
        });
    };
    handleArea = e => {
        e.preventDefault();
        const { rgba, pos } = this.state;
        let hue = Number(e.target.value);
        let s = pos[0] * 100 / this.rWidth;
        let v = (this.rHeight - pos[1]) * 100 / this.rHeight;
        let newRgba = this.hsvToRgb(hue, s, v);
        let hex = this.rgbaToHex(newRgba);
        newRgba.a = rgba.a;
        this.doUpdate({
            hue,
            rgba: newRgba,
            ...newRgba,
            hex
        });
    };
    handleAlpha = e => {
        e.preventDefault();
        const { r, g, b } = this.state.rgba;
        let newRgba = {
            r,
            g,
            b,
            a: Number(e.target.value) / 100
        };
        this.doUpdate({
            rgba: newRgba,
            ...newRgba
        });
    };
    handleHex = e => {
        e.preventDefault();
        let hex = e.target.value;
        this.doUpdate({
            hex
        });
    };
    handleHexPress = e => {
        if(e.nativeEvent.which === 13) {
            e.target.blur();
        }
    };
    handleHexBlur = e => {
        e.preventDefault();
        const { rgba } = this.state;
        if(this.validHex(this.state.hex)) {
            let newRgba = this.hexToRgba(this.state.hex);
            newRgba.a = rgba.a;
            let hsv = this.rgbToHsv(newRgba);
            let hue = hsv.h;
            let left = hsv.s * this.rWidth / 100;
            let top = (100 - hsv.v) * this.rHeight / 100;
            this.doUpdate({
                hex: this.rgbaToHex(newRgba),
                rgba: newRgba,
                ...newRgba,
                hue,
                pos: [left, top]
            });
        } else {
            this.setState({
                hex: this.rgbaToHex(rgba)
            });
        }
    };
    handleRgb = v => {
        return e => {
            e.preventDefault();
            this.setState({
                [v]: e.target.value
            });
        };
    };
    handleRgbPress = e => {
        if(e.nativeEvent.which === 13) {
            e.target.blur();
        }
    };
    handleRgbBlur = v => {
        const rgba = this.state.rgba;
        return e => {
            e.preventDefault();
            let value = this.validRgb(e.target.value);
            if(value !== false) {
                let newRgba = {
                    r: rgba.r,
                    g: rgba.g,
                    b: rgba.b,
                    a: rgba.a
                };
                newRgba[v] = value;
                let hsv = this.rgbToHsv(newRgba);
                let hue = hsv.h;
                let left = hsv.s * this.rWidth / 100;
                let top = (100 - hsv.v) * this.rHeight / 100;
                this.doUpdate({
                    hex: this.rgbaToHex(newRgba),
                    rgba: newRgba,
                    ...newRgba,
                    hue,
                    pos: [left, top]
                });
            } else {
                this.setState({
                    [v]: rgba[v]
                });
            }
        };
    };
    handleA = e => {
        e.preventDefault();
        this.setState({
            a: e.target.value
        });
    };
    handleAPress = e => {
        if(e.nativeEvent.which === 13) {
            e.target.blur();
        }
    };
    handleABlur = e => {
        e.preventDefault();
        const { r, g, b } = this.state.rgba;
        let value = this.validApacity(e.target.value);
        if(value !== false) {
            let newRgba = {
                r,
                g,
                b,
                a: value
            };
            this.doUpdate({
                rgba: newRgba,
                ...newRgba
            });
        } else {
            this.setState({
                a: this.state.rgba.a
            });
        }
    };
    handleClick = color => {
        return e => {
            e.preventDefault();
            this.doUpdate(this.getRenderParamByValue(color));
        };
    };
    handleType = type => {
        return e => {
            e.preventDefault();
            let param = {
                type
            }
            if(type === 0) {
                param.currentDrag = 0;
            }
            this.setState(param);
            this.onChange({
                ...this.state,
                ...param
            });
        };
    };
    renderGlobalColors() {
        const { sprefix, colors } = this.props;
        const rs = [];
        colors.forEach((item, index) => {
            rs.push(
                <div key={ index } className={ `${ sprefix }-colorPicker-colors-item` } onClick={ this.handleClick(item) } style={{ backgroundColor: item }}></div>
            );
        });
        return rs;
    }
    getRenderParamByValue(value) {
        let { color } = this.getColor(value);
        let rgba = this.getRgba(color);
        let hex = this.rgbaToHex(rgba);
        let hsv = this.rgbToHsv(rgba);
        let hue = hsv.h;
        let left = hsv.s * this.rWidth / 100;
        let top = (100 - hsv.v) * this.rHeight / 100;
        return {
            rgba,
            ...rgba,
            hex,
            hue,
            pos: [left, top]
        };
    }
    handleMouseDownDrag = index => {
        return e => {
            e.preventDefault();
            this.dragStartX = e.pageX || e.clientX;
            //this.dragStartY = e.pageY || e.clientY;
            this.isDragMove = true;
            document.addEventListener('mousemove', this.handleMouseMoveDrag);
            document.addEventListener('mouseup', this.handleMouseUpDrag);
            const currentDrag = index;
            let param = this.getRenderParamByValue(this.state.gradient[currentDrag].value);
            param.currentDrag = currentDrag;
            this.setState(param);
            // this.onChange({
            //     ...this.state,
            //     param
            // });
        };
    };
    handleMouseMoveDrag = e => {
        e.preventDefault();
        const { gradient, currentDrag } = this.state;
        this.dragEndX = e.pageX || e.clientX;
        //this.dragEndY = e.pageY || e.clientY;
        if (this.isDragMove && (this.dragEndX - this.dragStartX !== 0)) {
            let x = e.pageX || e.clientX;
            //let y = e.pageY || e.clientY;
            let rect = this.gradientSliderBar.getBoundingClientRect();
            let left = x - rect.left - (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0);
            //let top = y - rect.top - (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            left = Math.max(0, left);
            left = Math.min(left, this.gradientSliderBarWidth);
            //top = Math.max(0, top);
            //top = Math.min(top, this.gradientSliderBarHeight);
            //console.log(gradient[currentDrag], left);
            let newGradient = gradient.slice();
            newGradient[currentDrag].pos.x = left * 100 / this.gradientSliderBarWidth;
            this.setState({
                gradient: newGradient
            });
            this.onChange({
                ...this.state,
                gradient: newGradient
            });
        }
    };
    handleMouseUpDrag = e => {
        e.preventDefault();
        this.isDragMove = false;
        document.removeEventListener('mousemove', this.handleMouseMoveDrag);
        document.removeEventListener('mouseup', this.handleMouseUpDrag);
    };
    handleDoubleClickDrag = e => {
        e.preventDefault();
        const { currentDrag, gradient } = this.state;
        if(gradient.length <= 2) {
            return false;
        }
        let newGradient = gradient.slice();
        newGradient.splice(currentDrag, 1);
        this.setState({
            currentDrag: -1,
            gradient: newGradient
        });
        this.onChange({
            ...this.state,
            currentDrag: -1,
            gradient: newGradient
        });
    };
    handleAddDrag = e => {
        e.preventDefault();
        if (e.target === this.gradientSliderBar) {
            const { gradient } = this.state;
            let x = e.pageX || e.clientX;
            //let y = e.pageY || e.clientY;
            let rect = this.gradientSliderBar.getBoundingClientRect();
            let left = x - rect.left - (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0);
            //let top = y - rect.top - (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            left = Math.max(0, left);
            left = Math.min(left, this.gradientSliderBarWidth);
            left = left * 100 / this.gradientSliderBarWidth;
            let newGradient = gradient.slice(), defaultColor = '#FFFFFF';
            newGradient.push({
                pos: {
                    x: left,
                    y: 0
                },
                value: defaultColor
            });
            this.dragStartX = e.pageX || e.clientX;
            //this.dragStartY = e.pageY || e.clientY;
            this.isDragMove = true;
            document.addEventListener('mousemove', this.handleMouseMoveDrag);
            document.addEventListener('mouseup', this.handleMouseUpDrag);
            let param = this.getRenderParamByValue(defaultColor);
            this.setState({
                ...param,
                currentDrag: newGradient.length - 1,
                gradient: newGradient
            });
            this.onChange({
                ...this.state,
                ...param,
                currentDrag: newGradient.length - 1,
                gradient: newGradient
            });
        }
    };
    doUpdate(param) {
        const { type, currentDrag, gradient } = this.state;
        if(type === 0) {

        } else {
            if(currentDrag > -1) {
                let newGradient = gradient.slice();
                newGradient[currentDrag].value = this.rgbaToString(param.rgba);
                param.gradient = newGradient;
            }
        }
        this.setState(param);
        this.onChange({
            ...this.state,
            ...param
        });
    }
    getAngle(angle) {
        return this.props.angleType[angle] !== undefined ? this.props.angleType[angle] : angle;
    }
    onChange = (param) => {
        //console.log(`param`, param);
        let value = this.getValue(param);
        this.props.onChange(value);
    }
    renderGradientBar() {
        const { sprefix } = this.props;
        const { gradient, currentDrag } = this.state;
        const rs = [];
        gradient.forEach((item, index) => {
            let cls = [`${ sprefix }-colorPicker-gradient-slider-drag`];
            if(currentDrag === index) {
                cls.push(`${ sprefix }-colorPicker-gradient-slider-drag-selected`);
            }
            rs.push(
                <div
                    key={ index }
                    className={ cls.join(' ') }
                    style={{
                        left: item.pos.x * this.gradientSliderBarWidth / 100 + 'px',
                        top: item.pos.y + 'px'
                    }}
                    onMouseDown={ this.handleMouseDownDrag(index) }
                    onDoubleClick={ this.handleDoubleClickDrag }
                >
                    <div className={ `${ sprefix }-colorPicker-gradient-slider-pointer` }></div>
                    <input type="hidden"/>
                    <div className={ `${ sprefix }-colorPicker-gradient-slider-body` }>
                        <div
                            className={ `${ sprefix }-colorPicker-gradient-slider-body-inner` }
                            style={{
                                background: item.value
                            }}
                        ></div>
                    </div>
                </div>
            );
        });
        return rs;
    }
    getValue(param) {
        const { rgba, type, gradient, angle } = param;
        let value,
            prviewItem = [],
            gradientItems = [],
            gradientList = gradient.slice();
        gradientList.sort((a, b) => {
            return Number(a.pos.x) - Number(b.pos.x);
        });
        gradientList.forEach(item => {
            prviewItem.push(`${ item.value } ${ item.pos.x }%`);
            gradientItems.push(`${ item.value } ${ item.pos.x }%`);
        });
        if(type === 0) {
            value = this.rgbaToString(rgba);
        } else if(type === 1) {
            if (angle !== '' && !isNaN(angle)) {
                prviewItem.unshift(this.getAngle(angle) + 'deg');
            }
            value = `linear-gradient(${ prviewItem.join(',') })`;
        } else if(type === 2) {
            value = `radial-gradient(at center center,${ prviewItem.join(',') })`;
        }
        return value;
    }
    render() {
        const { sprefix } = this.props;
        const { pos, hex, hue, rgba, r, g, b, a, type, gradient, angle } = this.state;
        //console.log(angle, this.getAngle(angle));
        let cls = [`${ sprefix }-colorPicker`];
        //let hex = this.rgbaToHex(rgba);
        let hueColor = this.hsvToRgb(hue);
        let prviewBg, gradientBarBg, gradientDisplay, angleDisplay, prviewItem = [], gradientItems = [], gradientList = gradient.slice();
        gradientList.sort((a, b) => {
            return Number(a.pos.x) - Number(b.pos.x);
        });
        gradientList.forEach(item => {
            prviewItem.push(`${ item.value } ${ item.pos.x }%`);
            gradientItems.push(`${ item.value } ${ item.pos.x }%`);
        });
        if(type === 0) {
            gradientDisplay = 'none';
            angleDisplay = 'none';
            gradientBarBg = '';
            prviewBg = this.rgbaToString(rgba);
        } else if(type === 1) {
            gradientDisplay = 'block';
            angleDisplay = 'block';
            if (angle !== '' && !isNaN(angle)) {
                prviewItem.unshift(this.getAngle(angle) + 'deg');
            }
            gradientBarBg = `linear-gradient(to right,${ gradientItems.join(',') })`;
            prviewBg = `linear-gradient(${ prviewItem.join(',') })`;
        } else if(type === 2) {
            gradientDisplay = 'block';
            angleDisplay = 'none';
            gradientBarBg = `linear-gradient(to right,${ gradientItems.join(',') })`;
            prviewBg = `radial-gradient(at center center,${ prviewItem.join(',') })`;
        }
        return (
            <div className={ cls.join(' ') }>
                <div className={ `${ sprefix }-colorPicker-header` } style={{ height: '36px' }}>
                    <div className={ `${ sprefix }-colorPicker-list` } style={{ width: '100%', height: '100%', padding: '8px 10px', boxSizing: 'border-box' }}>
                        <div className={ `${ sprefix }-colorPicker-item` } onClick={ this.handleType(0) }></div>
                        <div className={ `${ sprefix }-colorPicker-item` } onClick={ this.handleType(1) } style={{ backgroundImage: 'linear-gradient(180deg,#ffffff,#008dff)' }}></div>
                        <div className={ `${ sprefix }-colorPicker-item` } onClick={ this.handleType(2) } style={{ backgroundImage: 'radial-gradient(#ffffff,#008dff)' }}></div>
                    </div>
                </div>
                <div className={ `${ sprefix }-colorPicker-center` }>
                    <div className={ `${ sprefix }-colorPicker-gradient` } style={{ display: gradientDisplay }}>
                        <div className={ `${ sprefix }-colorPicker-gradient-bar-bg` }>
                            <div
                                className={ `${ sprefix }-colorPicker-gradient-bar` }
                                style={{
                                    background: gradientBarBg
                                }}
                            ></div>
                        </div>
                        <div
                            className={ `${ sprefix }-colorPicker-gradient-slider-bar` }
                            ref={ (ref) => this.gradientSliderBar = ref }
                            onMouseDown={ this.handleAddDrag }
                        >
                            { this.renderGradientBar() }
                        </div>
                        <div className={ `${ sprefix }-colorPicker-gradient-angle-wrap` }>
                            <input
                                className={ `${ sprefix }-colorPicker-range ${ sprefix }-colorPicker-gradient-angle` }
                                type="range"
                                min="0"
                                max="360"
                                title={ this.getAngle(angle) }
                                value={ this.getAngle(angle) }
                                onChange={ this.handleAngle }
                                style={{ display: angleDisplay }}
                            />
                            <div className={ `${ sprefix }-colorPicker-gradient-angle-list` } style={{ display: 'none' }}>
                                <span className={ `${ sprefix }-colorPicker-gradient-angle-item` }>0</span>
                                <span className={ `${ sprefix }-colorPicker-gradient-angle-item` }>
                                    <input
                                        className={ `${ sprefix }-colorPicker-input ${ sprefix }-colorPicker-gradient-angle-input` }
                                        type="text"
                                    />
                                </span>
                                <span className={ `${ sprefix }-colorPicker-gradient-angle-item` }>360</span>
                            </div>
                        </div>
                    </div>
                    <div className={ `${ sprefix }-colorPicker-center-inner` }>
                        <div></div>
                        <div className={ `${ sprefix }-colorPicker-panel` } ref={ (ref) => this.panel = ref } onMouseDown={ this.handleMouseDown }>
                            <div className={ `${ sprefix }-colorPicker-hue` } style={{ backgroundColor: `rgb(${ hueColor.r },${ hueColor.g },${ hueColor.b })` }}>
                                <div className={ `${ sprefix }-colorPicker-saturation` }>
                                    <div className={ `${ sprefix }-colorPicker-brightness` }></div>
                                </div>
                            </div>
                            <div className={ `${ sprefix }-colorPicker-pointer` } style={{ left: pos[0] + 'px', top: pos[1] + 'px' }}></div>
                        </div>
                        <div className={ `${ sprefix }-colorPicker-fixed` }>
                            <div className={ `${ sprefix }-colorPicker-left` }>
                                <div className={ `${ sprefix }-colorPicker-area-slider-bg` }>
                                    <input className={ `${ sprefix }-colorPicker-range ${ sprefix }-colorPicker-area-slider` } type="range" min="0" max="360" value={ hue } onChange={ this.handleArea }/>
                                </div>
                                <div className={ `${ sprefix }-colorPicker-alpha-slider-bg` }>
                                    <input className={ `${ sprefix }-colorPicker-range ${ sprefix }-colorPicker-alpha-slider` } ref={ (ref) => this.alphaInput = ref } value={ rgba.a * 100 } onChange={ this.handleAlpha } type="range" min="0" max="100"/>
                                </div>
                            </div>
                            <div className={ `${ sprefix }-colorPicker-right` }>
                                <div className={ `${ sprefix }-colorPicker-preview-bg` }>
                                    <div className={ `${ sprefix }-colorPicker-preview` }
                                         style={{
                                             background: prviewBg
                                         }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ overflow: 'hidden', marginTop: '5px' }}>
                            <div style={{ float: 'left', width: '30%', paddingLeft: '12px', position: 'relative', boxSizing: 'border-box' }}>
                                <span style={{ position: 'absolute', top: 0, left: 0, lineHeight: '26px' }}>#</span>
                                <input
                                    className={ `${ sprefix }-colorPicker-input ${ sprefix }-colorPicker-input-hex` }
                                    type="text"
                                    value={ hex }
                                    maxLength="6"
                                    onKeyPress={ this.handleHexPress }
                                    onBlur={ this.handleHexBlur }
                                    onChange={ this.handleHex }
                                    style={{ width: '100%', padding: '0 5px', outline: 'none', boxSizing: 'border-box' }}
                                />
                                <div className={ `${ sprefix }-colorPicker-label` } style={{ width: '100%', fontSize: '12px', textAlign: 'center' }}>HEX</div>
                            </div>
                            <div style={{ float: 'left', width: '70%', boxSizing: 'border-box' }}>
                                <div style={{ float: 'left', width: '25%', paddingLeft: '5px', boxSizing: 'border-box' }}>
                                    <input
                                        className={ `${ sprefix }-colorPicker-input ${ sprefix }-colorPicker-rgba-r` }
                                        type="text"
                                        value={ r }
                                        maxLength="3"
                                        onKeyPress={ this.handleRgbPress }
                                        onBlur={ this.handleRgbBlur('r') }
                                        onChange={ this.handleRgb('r') }
                                        style={{ width: '100%', padding: '0 5px', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                    <div className={ `${ sprefix }-colorPicker-label` } style={{ width: '100%', fontSize: '12px', textAlign: 'center' }}>R</div>
                                </div>
                                <div style={{ float: 'left', width: '25%', paddingLeft: '5px', boxSizing: 'border-box' }}>
                                    <input
                                        className={ `${ sprefix }-colorPicker-input ${ sprefix }-colorPicker-rgba-g` }
                                        type="text"
                                        value={ g }
                                        maxLength="3"
                                        onKeyPress={ this.handleRgbPress }
                                        onBlur={ this.handleRgbBlur('g') }
                                        onChange={ this.handleRgb('g') }
                                        style={{ width: '100%', padding: '0 5px', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                    <div className={ `${ sprefix }-colorPicker-label` } style={{ width: '100%', fontSize: '12px', textAlign: 'center' }}>G</div>
                                </div>
                                <div style={{ float: 'left', width: '25%', paddingLeft: '5px', boxSizing: 'border-box' }}>
                                    <input
                                        className={ `${ sprefix }-colorPicker-input ${ sprefix }-colorPicker-rgba-b` }
                                        type="text"
                                        value={ b }
                                        maxLength="3"
                                        onKeyPress={ this.handleRgbPress }
                                        onBlur={ this.handleRgbBlur('b') }
                                        onChange={ this.handleRgb('b') }
                                        style={{ width: '100%', padding: '0 5px', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                    <div className={ `${ sprefix }-colorPicker-label` } style={{ width: '100%', fontSize: '12px', textAlign: 'center' }}>B</div>
                                </div>
                                <div style={{ float: 'left', width: '25%', paddingLeft: '5px', boxSizing: 'border-box' }}>
                                    <input
                                        className={ `${ sprefix }-colorPicker-input ${ sprefix }-colorPicker-rgba-a` }
                                        type="text"
                                        value={ a }
                                        onKeyPress={ this.handleAPress }
                                        onBlur={ this.handleABlur }
                                        onChange={ this.handleA }
                                        style={{ width: '100%', padding: '0 5px', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                    <div className={ `${ sprefix }-colorPicker-label` } style={{ width: '100%', fontSize: '12px', textAlign: 'center' }}>A</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ `${ sprefix }-colorPicker-footer` }>
                    <div className={ `${ sprefix }-colorPicker-global` }>
                        <input className={ `${ sprefix }-colorPicker-chk` } type="checkbox"/>
                        <div className={ `${ sprefix }-colorPicker-arrow-wrap` }>
                            <span className={ `${ sprefix }-colorPicker-arrow` }>
                                <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                                </svg>
                            </span>
                            <span style={{ fontSize: '12px' }}>Global Colors</span>
                        </div>
                        <div className={ `${ sprefix }-colorPicker-list ${ sprefix }-colorPicker-colors` }>
                            { this.renderGlobalColors() }
                        </div>
                    </div>
                    <div className={ `${ sprefix }-colorPicker-recent` }>
                        <input className={ `${ sprefix }-colorPicker-chk` } type="checkbox"/>
                        <div className={ `${ sprefix }-colorPicker-arrow-wrap` }>
                            <span className={ `${ sprefix }-colorPicker-arrow` }>
                                <svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                                </svg>
                            </span>
                            <span style={{ fontSize: '12px' }}>Recent Colors</span>
                        </div>
                        <div className={ `${ sprefix }-colorPicker-list` }></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ColorPanel;
