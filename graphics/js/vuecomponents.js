webpackJsonp([2], {
    1189: function(t, e, n) {
        n(220),
        n(222),
        n(223),
        t.exports = n(23)
    },
    220: function(t, e, n) {
        !function(t, e) {
            e(n(668))
        }(0, function(e) {
            "use strict";
            function n(t) {
                for (var e = [], n = arguments.length - 1; n-- > 0; )
                    e[n] = arguments[n + 1];
                for (var r = 0; r < e.length; r++)
                    for (var i = e[r], o = Object.keys(i), a = 0; a < o.length; a++) {
                        var s = o[a];
                        t[s] = i[s]
                    }
                return t
            }
            function r() {
                return {
                    type: Object,
                    default: function() {
                        return {}
                    }
                }
            }
            function i(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }
            function o(t) {
                var n = t.direction;
                if ("string" == typeof n) {
                    var r = "DIRECTION_" + n.toUpperCase();
                    a.indexOf(n) > -1 && e.hasOwnProperty(r) ? t.direction = e[r] : console.warn("[vue-touch] invalid direction: " + n)
                }
                return t
            }
            e = "default"in e ? e.default : e;
            var a = ["up", "down", "left", "right", "horizontal", "vertical", "all"]
              , s = {}
              , u = {}
              , c = ["pan", "panstart", "panmove", "panend", "pancancel", "panleft", "panright", "panup", "pandown", "pinch", "pinchstart", "pinchmove", "pinchend", "pinchcancel", "pinchin", "pinchout", "press", "pressup", "rotate", "rotatestart", "rotatemove", "rotateend", "rotatecancel", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "tap"]
              , h = {
                pan: "pan",
                panstart: "pan",
                panmove: "pan",
                panend: "pan",
                pancancel: "pan",
                panleft: "pan",
                panright: "pan",
                panup: "pan",
                pandown: "pan",
                pinch: "pinch",
                pinchstart: "pinch",
                pinchmove: "pinch",
                pinchend: "pinch",
                pinchcancel: "pinch",
                pinchin: "pinch",
                pinchout: "pinch",
                press: "press",
                pressup: "press",
                rotate: "rotate",
                rotatestart: "rotate",
                rotatemove: "rotate",
                rotateend: "rotate",
                rotatecancel: "rotate",
                swipe: "swipe",
                swipeleft: "swipe",
                swiperight: "swipe",
                swipeup: "swipe",
                swipedown: "swipe",
                tap: "tap"
            }
              , p = {
                props: {
                    options: r(),
                    tapOptions: r(),
                    panOptions: r(),
                    pinchOptions: r(),
                    pressOptions: r(),
                    rotateOptions: r(),
                    swipeOptions: r(),
                    tag: {
                        type: String,
                        default: "div"
                    },
                    enabled: {
                        default: !0,
                        type: [Boolean, Object]
                    }
                },
                mounted: function() {
                    this.$isServer || (this.hammer = new e.Manager(this.$el,this.options),
                    this.recognizers = {},
                    this.setupBuiltinRecognizers(),
                    this.setupCustomRecognizers(),
                    this.updateEnabled(this.enabled))
                },
                destroyed: function() {
                    this.$isServer || this.hammer.destroy()
                },
                watch: {
                    enabled: {
                        deep: !0,
                        handler: function() {
                            for (var t = [], e = arguments.length; e--; )
                                t[e] = arguments[e];
                            (n = this).updateEnabled.apply(n, t);
                            var n
                        }
                    }
                },
                methods: {
                    setupBuiltinRecognizers: function() {
                        for (var t = this, e = 0; e < c.length; e++) {
                            var r = c[e];
                            if (t._events[r]) {
                                var i = h[r]
                                  , o = n({}, s[i] || {}, t[i + "Options"]);
                                t.addRecognizer(i, o),
                                t.addEvent(r)
                            }
                        }
                    },
                    setupCustomRecognizers: function() {
                        for (var t = this, e = Object.keys(u), r = 0; r < e.length; r++) {
                            var i = e[r];
                            if (t._events[i]) {
                                var o = u[i]
                                  , a = t[i + "Options"] || {}
                                  , s = n({}, o, a);
                                t.addRecognizer(i, s, {
                                    mainGesture: s.type
                                }),
                                t.addEvent(i)
                            }
                        }
                    },
                    addRecognizer: function(t, n, r) {
                        void 0 === r && (r = {});
                        var a = r.mainGesture;
                        if (!this.recognizers[t]) {
                            var s = new (e[i(a || t)])(o(n));
                            this.recognizers[t] = s,
                            this.hammer.add(s),
                            s.recognizeWith(this.hammer.recognizers)
                        }
                    },
                    addEvent: function(t) {
                        var e = this;
                        this.hammer.on(t, function(n) {
                            return e.$emit(t, n)
                        })
                    },
                    updateEnabled: function(t, e) {
                        var n = this;
                        if (!0 === t)
                            this.enableAll();
                        else if (!1 === t)
                            this.disableAll();
                        else if ("object" == typeof t)
                            for (var r = Object.keys(t), i = 0; i < r.length; i++) {
                                var o = r[i];
                                n.recognizers[o] && (t[o] ? n.enable(o) : n.disable(o))
                            }
                    },
                    enable: function(t) {
                        var e = this.recognizers[t];
                        e.options.enable || e.set({
                            enable: !0
                        })
                    },
                    disable: function(t) {
                        var e = this.recognizers[t];
                        e.options.enable && e.set({
                            enable: !1
                        })
                    },
                    toggle: function(t) {
                        var e = this.recognizers[t];
                        e && (e.options.enable ? this.disable(t) : this.enable(t))
                    },
                    enableAll: function(t) {
                        this.toggleAll({
                            enable: !0
                        })
                    },
                    disableAll: function(t) {
                        this.toggleAll({
                            enable: !1
                        })
                    },
                    toggleAll: function(t) {
                        for (var e = this, n = t.enable, r = Object.keys(this.recognizers), i = 0; i < r.length; i++) {
                            var o = e.recognizers[r[i]];
                            o.options.enable !== n && o.set({
                                enable: n
                            })
                        }
                    },
                    isEnabled: function(t) {
                        return this.recognizers[t] && this.recognizers[t].options.enable
                    }
                },
                render: function(t) {
                    return t(this.tag, {}, this.$slots.default)
                }
            }
              , f = !1
              , l = {
                config: s,
                customEvents: u
            };
            l.install = function(t, e) {
                void 0 === e && (e = {});
                var r = e.name || "v-touch";
                t.component(r, n(p, {
                    name: r
                })),
                f = !0
            }
            .bind(l),
            l.registerCustomEvent = function(t, e) {
                if (void 0 === e && (e = {}),
                f)
                    return void console.warn("\n      [vue-touch]: Custom Event '" + t + "' couldn't be added to vue-touch.\n      Custom Events have to be registered before installing the plugin.\n      ");
                e.event = t,
                u[t] = e,
                p.props[t + "Options"] = {
                    type: Object,
                    default: function() {
                        return {}
                    }
                }
            }
            .bind(l),
            l.component = p,
            t.exports = l
        })
    },
    222: function(t, e, n) {
        "use strict";
        function r(t, e) {}
        function i(t) {
            return Object.prototype.toString.call(t).indexOf("Error") > -1
        }
        function o(t, e) {
            switch (typeof e) {
            case "undefined":
                return;
            case "object":
                return e;
            case "function":
                return e(t);
            case "boolean":
                return e ? t.params : void 0
            }
        }
        function a(t, e) {
            for (var n in e)
                t[n] = e[n];
            return t
        }
        function s(t, e, n) {
            void 0 === e && (e = {});
            var r, i = n || u;
            try {
                r = i(t || "")
            } catch (t) {
                r = {}
            }
            for (var o in e)
                r[o] = e[o];
            return r
        }
        function u(t) {
            var e = {};
            return (t = t.trim().replace(/^(\?|#|&)/, "")) ? (t.split("&").forEach(function(t) {
                var n = t.replace(/\+/g, " ").split("=")
                  , r = Lt(n.shift())
                  , i = n.length > 0 ? Lt(n.join("=")) : null;
                void 0 === e[r] ? e[r] = i : Array.isArray(e[r]) ? e[r].push(i) : e[r] = [e[r], i]
            }),
            e) : e
        }
        function c(t) {
            var e = t ? Object.keys(t).map(function(e) {
                var n = t[e];
                if (void 0 === n)
                    return "";
                if (null === n)
                    return qt(e);
                if (Array.isArray(n)) {
                    var r = [];
                    return n.forEach(function(t) {
                        void 0 !== t && (null === t ? r.push(qt(e)) : r.push(qt(e) + "=" + qt(t)))
                    }),
                    r.join("&")
                }
                return qt(e) + "=" + qt(n)
            }).filter(function(t) {
                return t.length > 0
            }).join("&") : null;
            return e ? "?" + e : ""
        }
        function h(t, e, n, r) {
            var i = r && r.options.stringifyQuery
              , o = e.query || {};
            try {
                o = p(o)
            } catch (t) {}
            var a = {
                name: e.name || t && t.name,
                meta: t && t.meta || {},
                path: e.path || "/",
                hash: e.hash || "",
                query: o,
                params: e.params || {},
                fullPath: l(e, i),
                matched: t ? f(t) : []
            };
            return n && (a.redirectedFrom = l(n, i)),
            Object.freeze(a)
        }
        function p(t) {
            if (Array.isArray(t))
                return t.map(p);
            if (t && "object" == typeof t) {
                var e = {};
                for (var n in t)
                    e[n] = p(t[n]);
                return e
            }
            return t
        }
        function f(t) {
            for (var e = []; t; )
                e.unshift(t),
                t = t.parent;
            return e
        }
        function l(t, e) {
            var n = t.path
              , r = t.query;
            void 0 === r && (r = {});
            var i = t.hash;
            void 0 === i && (i = "");
            var o = e || c;
            return (n || "/") + o(r) + i
        }
        function d(t, e) {
            return e === Ut ? t === e : !!e && (t.path && e.path ? t.path.replace(Ht, "") === e.path.replace(Ht, "") && t.hash === e.hash && v(t.query, e.query) : !(!t.name || !e.name) && (t.name === e.name && t.hash === e.hash && v(t.query, e.query) && v(t.params, e.params)))
        }
        function v(t, e) {
            if (void 0 === t && (t = {}),
            void 0 === e && (e = {}),
            !t || !e)
                return t === e;
            var n = Object.keys(t)
              , r = Object.keys(e);
            return n.length === r.length && n.every(function(n) {
                var r = t[n]
                  , i = e[n];
                return "object" == typeof r && "object" == typeof i ? v(r, i) : String(r) === String(i)
            })
        }
        function m(t, e) {
            return 0 === t.path.replace(Ht, "/").indexOf(e.path.replace(Ht, "/")) && (!e.hash || t.hash === e.hash) && y(t.query, e.query)
        }
        function y(t, e) {
            for (var n in e)
                if (!(n in t))
                    return !1;
            return !0
        }
        function g(t) {
            if (!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey || t.defaultPrevented || void 0 !== t.button && 0 !== t.button)) {
                if (t.currentTarget && t.currentTarget.getAttribute) {
                    if (/\b_blank\b/i.test(t.currentTarget.getAttribute("target")))
                        return
                }
                return t.preventDefault && t.preventDefault(),
                !0
            }
        }
        function b(t) {
            if (t)
                for (var e, n = 0; n < t.length; n++) {
                    if (e = t[n],
                    "a" === e.tag)
                        return e;
                    if (e.children && (e = b(e.children)))
                        return e
                }
        }
        function w(t) {
            if (!w.installed || It !== t) {
                w.installed = !0,
                It = t;
                var e = function(t) {
                    return void 0 !== t
                }
                  , n = function(t, n) {
                    var r = t.$options._parentVnode;
                    e(r) && e(r = r.data) && e(r = r.registerRouteInstance) && r(t, n)
                };
                t.mixin({
                    beforeCreate: function() {
                        e(this.$options.router) ? (this._routerRoot = this,
                        this._router = this.$options.router,
                        this._router.init(this),
                        t.util.defineReactive(this, "_route", this._router.history.current)) : this._routerRoot = this.$parent && this.$parent._routerRoot || this,
                        n(this, this)
                    },
                    destroyed: function() {
                        n(this)
                    }
                }),
                Object.defineProperty(t.prototype, "$router", {
                    get: function() {
                        return this._routerRoot._router
                    }
                }),
                Object.defineProperty(t.prototype, "$route", {
                    get: function() {
                        return this._routerRoot._route
                    }
                }),
                t.component("router-view", Pt),
                t.component("router-link", Yt);
                var r = t.config.optionMergeStrategies;
                r.beforeRouteEnter = r.beforeRouteLeave = r.beforeRouteUpdate = r.created
            }
        }
        function T(t, e, n) {
            var r = t.charAt(0);
            if ("/" === r)
                return t;
            if ("?" === r || "#" === r)
                return e + t;
            var i = e.split("/");
            n && i[i.length - 1] || i.pop();
            for (var o = t.replace(/^\//, "").split("/"), a = 0; a < o.length; a++) {
                var s = o[a];
                ".." === s ? i.pop() : "." !== s && i.push(s)
            }
            return "" !== i[0] && i.unshift(""),
            i.join("/")
        }
        function _(t) {
            var e = ""
              , n = ""
              , r = t.indexOf("#");
            r >= 0 && (e = t.slice(r),
            t = t.slice(0, r));
            var i = t.indexOf("?");
            return i >= 0 && (n = t.slice(i + 1),
            t = t.slice(0, i)),
            {
                path: t,
                query: n,
                hash: e
            }
        }
        function E(t) {
            return t.replace(/\/\//g, "/")
        }
        function O(t, e) {
            for (var n, r = [], i = 0, o = 0, a = "", s = e && e.delimiter || "/"; null != (n = Qt.exec(t)); ) {
                var u = n[0]
                  , c = n[1]
                  , h = n.index;
                if (a += t.slice(o, h),
                o = h + u.length,
                c)
                    a += c[1];
                else {
                    var p = t[o]
                      , f = n[2]
                      , l = n[3]
                      , d = n[4]
                      , v = n[5]
                      , m = n[6]
                      , y = n[7];
                    a && (r.push(a),
                    a = "");
                    var g = null != f && null != p && p !== f
                      , b = "+" === m || "*" === m
                      , w = "?" === m || "*" === m
                      , T = n[2] || s
                      , _ = d || v;
                    r.push({
                        name: l || i++,
                        prefix: f || "",
                        delimiter: T,
                        optional: w,
                        repeat: b,
                        partial: g,
                        asterisk: !!y,
                        pattern: _ ? j(_) : y ? ".*" : "[^" + S(T) + "]+?"
                    })
                }
            }
            return o < t.length && (a += t.substr(o)),
            a && r.push(a),
            r
        }
        function x(t, e) {
            return k(O(t, e))
        }
        function A(t) {
            return encodeURI(t).replace(/[\/?#]/g, function(t) {
                return "%" + t.charCodeAt(0).toString(16).toUpperCase()
            })
        }
        function C(t) {
            return encodeURI(t).replace(/[?#]/g, function(t) {
                return "%" + t.charCodeAt(0).toString(16).toUpperCase()
            })
        }
        function k(t) {
            for (var e = new Array(t.length), n = 0; n < t.length; n++)
                "object" == typeof t[n] && (e[n] = new RegExp("^(?:" + t[n].pattern + ")$"));
            return function(n, r) {
                for (var i = "", o = n || {}, a = r || {}, s = a.pretty ? A : encodeURIComponent, u = 0; u < t.length; u++) {
                    var c = t[u];
                    if ("string" != typeof c) {
                        var h, p = o[c.name];
                        if (null == p) {
                            if (c.optional) {
                                c.partial && (i += c.prefix);
                                continue
                            }
                            throw new TypeError('Expected "' + c.name + '" to be defined')
                        }
                        if (Bt(p)) {
                            if (!c.repeat)
                                throw new TypeError('Expected "' + c.name + '" to not repeat, but received `' + JSON.stringify(p) + "`");
                            if (0 === p.length) {
                                if (c.optional)
                                    continue;
                                throw new TypeError('Expected "' + c.name + '" to not be empty')
                            }
                            for (var f = 0; f < p.length; f++) {
                                if (h = s(p[f]),
                                !e[u].test(h))
                                    throw new TypeError('Expected all "' + c.name + '" to match "' + c.pattern + '", but received `' + JSON.stringify(h) + "`");
                                i += (0 === f ? c.prefix : c.delimiter) + h
                            }
                        } else {
                            if (h = c.asterisk ? C(p) : s(p),
                            !e[u].test(h))
                                throw new TypeError('Expected "' + c.name + '" to match "' + c.pattern + '", but received "' + h + '"');
                            i += c.prefix + h
                        }
                    } else
                        i += c
                }
                return i
            }
        }
        function S(t) {
            return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
        }
        function j(t) {
            return t.replace(/([=!:$\/()])/g, "\\$1")
        }
        function $(t, e) {
            return t.keys = e,
            t
        }
        function R(t) {
            return t.sensitive ? "" : "i"
        }
        function M(t, e) {
            var n = t.source.match(/\((?!\?)/g);
            if (n)
                for (var r = 0; r < n.length; r++)
                    e.push({
                        name: r,
                        prefix: null,
                        delimiter: null,
                        optional: !1,
                        repeat: !1,
                        partial: !1,
                        asterisk: !1,
                        pattern: null
                    });
            return $(t, e)
        }
        function I(t, e, n) {
            for (var r = [], i = 0; i < t.length; i++)
                r.push(D(t[i], e, n).source);
            return $(new RegExp("(?:" + r.join("|") + ")",R(n)), e)
        }
        function P(t, e, n) {
            return z(O(t, n), e, n)
        }
        function z(t, e, n) {
            Bt(e) || (n = e || n,
            e = []),
            n = n || {};
            for (var r = n.strict, i = !1 !== n.end, o = "", a = 0; a < t.length; a++) {
                var s = t[a];
                if ("string" == typeof s)
                    o += S(s);
                else {
                    var u = S(s.prefix)
                      , c = "(?:" + s.pattern + ")";
                    e.push(s),
                    s.repeat && (c += "(?:" + u + c + ")*"),
                    c = s.optional ? s.partial ? u + "(" + c + ")?" : "(?:" + u + "(" + c + "))?" : u + "(" + c + ")",
                    o += c
                }
            }
            var h = S(n.delimiter || "/")
              , p = o.slice(-h.length) === h;
            return r || (o = (p ? o.slice(0, -h.length) : o) + "(?:" + h + "(?=$))?"),
            o += i ? "$" : r && p ? "" : "(?=" + h + "|$)",
            $(new RegExp("^" + o,R(n)), e)
        }
        function D(t, e, n) {
            return Bt(e) || (n = e || n,
            e = []),
            n = n || {},
            t instanceof RegExp ? M(t, e) : Bt(t) ? I(t, e, n) : P(t, e, n)
        }
        function N(t, e, n) {
            try {
                return (te[t] || (te[t] = Gt.compile(t)))(e || {}, {
                    pretty: !0
                })
            } catch (t) {
                return ""
            }
        }
        function q(t, e, n, r) {
            var i = e || []
              , o = n || Object.create(null)
              , a = r || Object.create(null);
            t.forEach(function(t) {
                L(i, o, a, t)
            });
            for (var s = 0, u = i.length; s < u; s++)
                "*" === i[s] && (i.push(i.splice(s, 1)[0]),
                u--,
                s--);
            return {
                pathList: i,
                pathMap: o,
                nameMap: a
            }
        }
        function L(t, e, n, r, i, o) {
            var a = r.path
              , s = r.name
              , u = r.pathToRegexpOptions || {}
              , c = U(a, i, u.strict);
            "boolean" == typeof r.caseSensitive && (u.sensitive = r.caseSensitive);
            var h = {
                path: c,
                regex: H(c, u),
                components: r.components || {
                    default: r.component
                },
                instances: {},
                name: s,
                parent: i,
                matchAs: o,
                redirect: r.redirect,
                beforeEnter: r.beforeEnter,
                meta: r.meta || {},
                props: null == r.props ? {} : r.components ? r.props : {
                    default: r.props
                }
            };
            if (r.children && r.children.forEach(function(r) {
                var i = o ? E(o + "/" + r.path) : void 0;
                L(t, e, n, r, h, i)
            }),
            void 0 !== r.alias) {
                (Array.isArray(r.alias) ? r.alias : [r.alias]).forEach(function(o) {
                    var a = {
                        path: o,
                        children: r.children
                    };
                    L(t, e, n, a, i, h.path || "/")
                })
            }
            e[h.path] || (t.push(h.path),
            e[h.path] = h),
            s && (n[s] || (n[s] = h))
        }
        function H(t, e) {
            var n = Gt(t, [], e);
            return n
        }
        function U(t, e, n) {
            return n || (t = t.replace(/\/$/, "")),
            "/" === t[0] ? t : null == e ? t : E(e.path + "/" + t)
        }
        function F(t, e, n, r) {
            var i = "string" == typeof t ? {
                path: t
            } : t;
            if (i.name || i._normalized)
                return i;
            if (!i.path && i.params && e) {
                i = X({}, i),
                i._normalized = !0;
                var o = X(X({}, e.params), i.params);
                if (e.name)
                    i.name = e.name,
                    i.params = o;
                else if (e.matched.length) {
                    var a = e.matched[e.matched.length - 1].path;
                    i.path = N(a, o, "path " + e.path)
                }
                return i
            }
            var u = _(i.path || "")
              , c = e && e.path || "/"
              , h = u.path ? T(u.path, c, n || i.append) : c
              , p = s(u.query, i.query, r && r.options.parseQuery)
              , f = i.hash || u.hash;
            return f && "#" !== f.charAt(0) && (f = "#" + f),
            {
                _normalized: !0,
                path: h,
                query: p,
                hash: f
            }
        }
        function X(t, e) {
            for (var n in e)
                t[n] = e[n];
            return t
        }
        function Y(t, e) {
            function n(t) {
                q(t, u, c, p)
            }
            function r(t, n, r) {
                var i = F(t, n, !1, e)
                  , o = i.name;
                if (o) {
                    var s = p[o];
                    if (!s)
                        return a(null, i);
                    var h = s.regex.keys.filter(function(t) {
                        return !t.optional
                    }).map(function(t) {
                        return t.name
                    });
                    if ("object" != typeof i.params && (i.params = {}),
                    n && "object" == typeof n.params)
                        for (var f in n.params)
                            !(f in i.params) && h.indexOf(f) > -1 && (i.params[f] = n.params[f]);
                    if (s)
                        return i.path = N(s.path, i.params, 'named route "' + o + '"'),
                        a(s, i, r)
                } else if (i.path) {
                    i.params = {};
                    for (var l = 0; l < u.length; l++) {
                        var d = u[l]
                          , v = c[d];
                        if (V(v.regex, i.path, i.params))
                            return a(v, i, r)
                    }
                }
                return a(null, i)
            }
            function i(t, n) {
                var i = t.redirect
                  , o = "function" == typeof i ? i(h(t, n, null, e)) : i;
                if ("string" == typeof o && (o = {
                    path: o
                }),
                !o || "object" != typeof o)
                    return a(null, n);
                var s = o
                  , u = s.name
                  , c = s.path
                  , f = n.query
                  , l = n.hash
                  , d = n.params;
                if (f = s.hasOwnProperty("query") ? s.query : f,
                l = s.hasOwnProperty("hash") ? s.hash : l,
                d = s.hasOwnProperty("params") ? s.params : d,
                u) {
                    p[u];
                    return r({
                        _normalized: !0,
                        name: u,
                        query: f,
                        hash: l,
                        params: d
                    }, void 0, n)
                }
                if (c) {
                    var v = B(c, t);
                    return r({
                        _normalized: !0,
                        path: N(v, d, 'redirect route with path "' + v + '"'),
                        query: f,
                        hash: l
                    }, void 0, n)
                }
                return a(null, n)
            }
            function o(t, e, n) {
                var i = N(n, e.params, 'aliased route with path "' + n + '"')
                  , o = r({
                    _normalized: !0,
                    path: i
                });
                if (o) {
                    var s = o.matched
                      , u = s[s.length - 1];
                    return e.params = o.params,
                    a(u, e)
                }
                return a(null, e)
            }
            function a(t, n, r) {
                return t && t.redirect ? i(t, r || n) : t && t.matchAs ? o(t, n, t.matchAs) : h(t, n, r, e)
            }
            var s = q(t)
              , u = s.pathList
              , c = s.pathMap
              , p = s.nameMap;
            return {
                match: r,
                addRoutes: n
            }
        }
        function V(t, e, n) {
            var r = e.match(t);
            if (!r)
                return !1;
            if (!n)
                return !0;
            for (var i = 1, o = r.length; i < o; ++i) {
                var a = t.keys[i - 1]
                  , s = "string" == typeof r[i] ? decodeURIComponent(r[i]) : r[i];
                a && (n[a.name] = s)
            }
            return !0
        }
        function B(t, e) {
            return T(t, e.parent ? e.parent.path : "/", !0)
        }
        function G() {
            window.history.replaceState({
                key: ot()
            }, ""),
            window.addEventListener("popstate", function(t) {
                K(),
                t.state && t.state.key && at(t.state.key)
            })
        }
        function W(t, e, n, r) {
            if (t.app) {
                var i = t.options.scrollBehavior;
                i && t.app.$nextTick(function() {
                    var t = J()
                      , o = i(e, n, r ? t : null);
                    o && ("function" == typeof o.then ? o.then(function(e) {
                        rt(e, t)
                    }).catch(function(t) {}) : rt(o, t))
                })
            }
        }
        function K() {
            var t = ot();
            t && (ee[t] = {
                x: window.pageXOffset,
                y: window.pageYOffset
            })
        }
        function J() {
            var t = ot();
            if (t)
                return ee[t]
        }
        function Z(t, e) {
            var n = document.documentElement
              , r = n.getBoundingClientRect()
              , i = t.getBoundingClientRect();
            return {
                x: i.left - r.left - e.x,
                y: i.top - r.top - e.y
            }
        }
        function Q(t) {
            return nt(t.x) || nt(t.y)
        }
        function tt(t) {
            return {
                x: nt(t.x) ? t.x : window.pageXOffset,
                y: nt(t.y) ? t.y : window.pageYOffset
            }
        }
        function et(t) {
            return {
                x: nt(t.x) ? t.x : 0,
                y: nt(t.y) ? t.y : 0
            }
        }
        function nt(t) {
            return "number" == typeof t
        }
        function rt(t, e) {
            var n = "object" == typeof t;
            if (n && "string" == typeof t.selector) {
                var r = document.querySelector(t.selector);
                if (r) {
                    var i = t.offset && "object" == typeof t.offset ? t.offset : {};
                    i = et(i),
                    e = Z(r, i)
                } else
                    Q(t) && (e = tt(t))
            } else
                n && Q(t) && (e = tt(t));
            e && window.scrollTo(e.x, e.y)
        }
        function it() {
            return re.now().toFixed(3)
        }
        function ot() {
            return ie
        }
        function at(t) {
            ie = t
        }
        function st(t, e) {
            K();
            var n = window.history;
            try {
                e ? n.replaceState({
                    key: ie
                }, "", t) : (ie = it(),
                n.pushState({
                    key: ie
                }, "", t))
            } catch (n) {
                window.location[e ? "replace" : "assign"](t)
            }
        }
        function ut(t) {
            st(t, !0)
        }
        function ct(t, e, n) {
            var r = function(i) {
                i >= t.length ? n() : t[i] ? e(t[i], function() {
                    r(i + 1)
                }) : r(i + 1)
            };
            r(0)
        }
        function ht(t) {
            return function(e, n, r) {
                var o = !1
                  , a = 0
                  , s = null;
                pt(t, function(t, e, n, u) {
                    if ("function" == typeof t && void 0 === t.cid) {
                        o = !0,
                        a++;
                        var c, h = dt(function(e) {
                            lt(e) && (e = e.default),
                            t.resolved = "function" == typeof e ? e : It.extend(e),
                            n.components[u] = e,
                            --a <= 0 && r()
                        }), p = dt(function(t) {
                            var e = "Failed to resolve async component " + u + ": " + t;
                            s || (s = i(t) ? t : new Error(e),
                            r(s))
                        });
                        try {
                            c = t(h, p)
                        } catch (t) {
                            p(t)
                        }
                        if (c)
                            if ("function" == typeof c.then)
                                c.then(h, p);
                            else {
                                var f = c.component;
                                f && "function" == typeof f.then && f.then(h, p)
                            }
                    }
                }),
                o || r()
            }
        }
        function pt(t, e) {
            return ft(t.map(function(t) {
                return Object.keys(t.components).map(function(n) {
                    return e(t.components[n], t.instances[n], t, n)
                })
            }))
        }
        function ft(t) {
            return Array.prototype.concat.apply([], t)
        }
        function lt(t) {
            return t.__esModule || oe && "Module" === t[Symbol.toStringTag]
        }
        function dt(t) {
            var e = !1;
            return function() {
                for (var n = [], r = arguments.length; r--; )
                    n[r] = arguments[r];
                if (!e)
                    return e = !0,
                    t.apply(this, n)
            }
        }
        function vt(t) {
            if (!t)
                if (Vt) {
                    var e = document.querySelector("base");
                    t = e && e.getAttribute("href") || "/",
                    t = t.replace(/^https?:\/\/[^\/]+/, "")
                } else
                    t = "/";
            return "/" !== t.charAt(0) && (t = "/" + t),
            t.replace(/\/$/, "")
        }
        function mt(t, e) {
            var n, r = Math.max(t.length, e.length);
            for (n = 0; n < r && t[n] === e[n]; n++)
                ;
            return {
                updated: e.slice(0, n),
                activated: e.slice(n),
                deactivated: t.slice(n)
            }
        }
        function yt(t, e, n, r) {
            var i = pt(t, function(t, r, i, o) {
                var a = gt(t, e);
                if (a)
                    return Array.isArray(a) ? a.map(function(t) {
                        return n(t, r, i, o)
                    }) : n(a, r, i, o)
            });
            return ft(r ? i.reverse() : i)
        }
        function gt(t, e) {
            return "function" != typeof t && (t = It.extend(t)),
            t.options[e]
        }
        function bt(t) {
            return yt(t, "beforeRouteLeave", Tt, !0)
        }
        function wt(t) {
            return yt(t, "beforeRouteUpdate", Tt)
        }
        function Tt(t, e) {
            if (e)
                return function() {
                    return t.apply(e, arguments)
                }
        }
        function _t(t, e, n) {
            return yt(t, "beforeRouteEnter", function(t, r, i, o) {
                return Et(t, i, o, e, n)
            })
        }
        function Et(t, e, n, r, i) {
            return function(o, a, s) {
                return t(o, a, function(t) {
                    s(t),
                    "function" == typeof t && r.push(function() {
                        Ot(t, e.instances, n, i)
                    })
                })
            }
        }
        function Ot(t, e, n, r) {
            e[n] ? t(e[n]) : r() && setTimeout(function() {
                Ot(t, e, n, r)
            }, 16)
        }
        function xt(t) {
            var e = window.location.pathname;
            return t && 0 === e.indexOf(t) && (e = e.slice(t.length)),
            (e || "/") + window.location.search + window.location.hash
        }
        function At(t) {
            var e = xt(t);
            if (!/^\/#/.test(e))
                return window.location.replace(E(t + "/#" + e)),
                !0
        }
        function Ct() {
            var t = kt();
            return "/" === t.charAt(0) || ($t("/" + t),
            !1)
        }
        function kt() {
            var t = window.location.href
              , e = t.indexOf("#");
            return -1 === e ? "" : t.slice(e + 1)
        }
        function St(t) {
            var e = window.location.href
              , n = e.indexOf("#");
            return (n >= 0 ? e.slice(0, n) : e) + "#" + t
        }
        function jt(t) {
            ne ? st(St(t)) : window.location.hash = t
        }
        function $t(t) {
            ne ? ut(St(t)) : window.location.replace(St(t))
        }
        function Rt(t, e) {
            return t.push(e),
            function() {
                var n = t.indexOf(e);
                n > -1 && t.splice(n, 1)
            }
        }
        function Mt(t, e, n) {
            var r = "hash" === n ? "#" + e : e;
            return t ? E(t + "/" + r) : r
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var It, Pt = {
            name: "router-view",
            functional: !0,
            props: {
                name: {
                    type: String,
                    default: "default"
                }
            },
            render: function(t, e) {
                var n = e.props
                  , r = e.children
                  , i = e.parent
                  , s = e.data;
                s.routerView = !0;
                for (var u = i.$createElement, c = n.name, h = i.$route, p = i._routerViewCache || (i._routerViewCache = {}), f = 0, l = !1; i && i._routerRoot !== i; )
                    i.$vnode && i.$vnode.data.routerView && f++,
                    i._inactive && (l = !0),
                    i = i.$parent;
                if (s.routerViewDepth = f,
                l)
                    return u(p[c], s, r);
                var d = h.matched[f];
                if (!d)
                    return p[c] = null,
                    u();
                var v = p[c] = d.components[c];
                s.registerRouteInstance = function(t, e) {
                    var n = d.instances[c];
                    (e && n !== t || !e && n === t) && (d.instances[c] = e)
                }
                ,
                (s.hook || (s.hook = {})).prepatch = function(t, e) {
                    d.instances[c] = e.componentInstance
                }
                ;
                var m = s.props = o(h, d.props && d.props[c]);
                if (m) {
                    m = s.props = a({}, m);
                    var y = s.attrs = s.attrs || {};
                    for (var g in m)
                        v.props && g in v.props || (y[g] = m[g],
                        delete m[g])
                }
                return u(v, s, r)
            }
        }, zt = /[!'()*]/g, Dt = function(t) {
            return "%" + t.charCodeAt(0).toString(16)
        }, Nt = /%2C/g, qt = function(t) {
            return encodeURIComponent(t).replace(zt, Dt).replace(Nt, ",")
        }, Lt = decodeURIComponent, Ht = /\/?$/, Ut = h(null, {
            path: "/"
        }), Ft = [String, Object], Xt = [String, Array], Yt = {
            name: "router-link",
            props: {
                to: {
                    type: Ft,
                    required: !0
                },
                tag: {
                    type: String,
                    default: "a"
                },
                exact: Boolean,
                append: Boolean,
                replace: Boolean,
                activeClass: String,
                exactActiveClass: String,
                event: {
                    type: Xt,
                    default: "click"
                }
            },
            render: function(t) {
                var e = this
                  , n = this.$router
                  , r = this.$route
                  , i = n.resolve(this.to, r, this.append)
                  , o = i.location
                  , a = i.route
                  , s = i.href
                  , u = {}
                  , c = n.options.linkActiveClass
                  , p = n.options.linkExactActiveClass
                  , f = null == c ? "router-link-active" : c
                  , l = null == p ? "router-link-exact-active" : p
                  , v = null == this.activeClass ? f : this.activeClass
                  , y = null == this.exactActiveClass ? l : this.exactActiveClass
                  , w = o.path ? h(null, o, null, n) : a;
                u[y] = d(r, w),
                u[v] = this.exact ? u[y] : m(r, w);
                var T = function(t) {
                    g(t) && (e.replace ? n.replace(o) : n.push(o))
                }
                  , _ = {
                    click: g
                };
                Array.isArray(this.event) ? this.event.forEach(function(t) {
                    _[t] = T
                }) : _[this.event] = T;
                var E = {
                    class: u
                };
                if ("a" === this.tag)
                    E.on = _,
                    E.attrs = {
                        href: s
                    };
                else {
                    var O = b(this.$slots.default);
                    if (O) {
                        O.isStatic = !1;
                        var x = It.util.extend;
                        (O.data = x({}, O.data)).on = _;
                        (O.data.attrs = x({}, O.data.attrs)).href = s
                    } else
                        E.on = _
                }
                return t(this.tag, E, this.$slots.default)
            }
        }, Vt = "undefined" != typeof window, Bt = Array.isArray || function(t) {
            return "[object Array]" == Object.prototype.toString.call(t)
        }
        , Gt = D, Wt = O, Kt = x, Jt = k, Zt = z, Qt = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");
        Gt.parse = Wt,
        Gt.compile = Kt,
        Gt.tokensToFunction = Jt,
        Gt.tokensToRegExp = Zt;
        var te = Object.create(null)
          , ee = Object.create(null)
          , ne = Vt && function() {
            var t = window.navigator.userAgent;
            return (-1 === t.indexOf("Android 2.") && -1 === t.indexOf("Android 4.0") || -1 === t.indexOf("Mobile Safari") || -1 !== t.indexOf("Chrome") || -1 !== t.indexOf("Windows Phone")) && (window.history && "pushState"in window.history)
        }()
          , re = Vt && window.performance && window.performance.now ? window.performance : Date
          , ie = it()
          , oe = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag
          , ae = function(t, e) {
            this.router = t,
            this.base = vt(e),
            this.current = Ut,
            this.pending = null,
            this.ready = !1,
            this.readyCbs = [],
            this.readyErrorCbs = [],
            this.errorCbs = []
        };
        ae.prototype.listen = function(t) {
            this.cb = t
        }
        ,
        ae.prototype.onReady = function(t, e) {
            this.ready ? t() : (this.readyCbs.push(t),
            e && this.readyErrorCbs.push(e))
        }
        ,
        ae.prototype.onError = function(t) {
            this.errorCbs.push(t)
        }
        ,
        ae.prototype.transitionTo = function(t, e, n) {
            var r = this
              , i = this.router.match(t, this.current);
            this.confirmTransition(i, function() {
                r.updateRoute(i),
                e && e(i),
                r.ensureURL(),
                r.ready || (r.ready = !0,
                r.readyCbs.forEach(function(t) {
                    t(i)
                }))
            }, function(t) {
                n && n(t),
                t && !r.ready && (r.ready = !0,
                r.readyErrorCbs.forEach(function(e) {
                    e(t)
                }))
            })
        }
        ,
        ae.prototype.confirmTransition = function(t, e, n) {
            var o = this
              , a = this.current
              , s = function(t) {
                i(t) && (o.errorCbs.length ? o.errorCbs.forEach(function(e) {
                    e(t)
                }) : (r(!1, "uncaught error during route navigation:"),
                console.error(t))),
                n && n(t)
            };
            if (d(t, a) && t.matched.length === a.matched.length)
                return this.ensureURL(),
                s();
            var u = mt(this.current.matched, t.matched)
              , c = u.updated
              , h = u.deactivated
              , p = u.activated
              , f = [].concat(bt(h), this.router.beforeHooks, wt(c), p.map(function(t) {
                return t.beforeEnter
            }), ht(p));
            this.pending = t;
            var l = function(e, n) {
                if (o.pending !== t)
                    return s();
                try {
                    e(t, a, function(t) {
                        !1 === t || i(t) ? (o.ensureURL(!0),
                        s(t)) : "string" == typeof t || "object" == typeof t && ("string" == typeof t.path || "string" == typeof t.name) ? (s(),
                        "object" == typeof t && t.replace ? o.replace(t) : o.push(t)) : n(t)
                    })
                } catch (t) {
                    s(t)
                }
            };
            ct(f, l, function() {
                var n = [];
                ct(_t(p, n, function() {
                    return o.current === t
                }).concat(o.router.resolveHooks), l, function() {
                    if (o.pending !== t)
                        return s();
                    o.pending = null,
                    e(t),
                    o.router.app && o.router.app.$nextTick(function() {
                        n.forEach(function(t) {
                            t()
                        })
                    })
                })
            })
        }
        ,
        ae.prototype.updateRoute = function(t) {
            var e = this.current;
            this.current = t,
            this.cb && this.cb(t),
            this.router.afterHooks.forEach(function(n) {
                n && n(t, e)
            })
        }
        ;
        var se = function(t) {
            function e(e, n) {
                var r = this;
                t.call(this, e, n);
                var i = e.options.scrollBehavior;
                i && G();
                var o = xt(this.base);
                window.addEventListener("popstate", function(t) {
                    var n = r.current
                      , a = xt(r.base);
                    r.current === Ut && a === o || r.transitionTo(a, function(t) {
                        i && W(e, t, n, !0)
                    })
                })
            }
            return t && (e.__proto__ = t),
            e.prototype = Object.create(t && t.prototype),
            e.prototype.constructor = e,
            e.prototype.go = function(t) {
                window.history.go(t)
            }
            ,
            e.prototype.push = function(t, e, n) {
                var r = this
                  , i = this
                  , o = i.current;
                this.transitionTo(t, function(t) {
                    st(E(r.base + t.fullPath)),
                    W(r.router, t, o, !1),
                    e && e(t)
                }, n)
            }
            ,
            e.prototype.replace = function(t, e, n) {
                var r = this
                  , i = this
                  , o = i.current;
                this.transitionTo(t, function(t) {
                    ut(E(r.base + t.fullPath)),
                    W(r.router, t, o, !1),
                    e && e(t)
                }, n)
            }
            ,
            e.prototype.ensureURL = function(t) {
                if (xt(this.base) !== this.current.fullPath) {
                    var e = E(this.base + this.current.fullPath);
                    t ? st(e) : ut(e)
                }
            }
            ,
            e.prototype.getCurrentLocation = function() {
                return xt(this.base)
            }
            ,
            e
        }(ae)
          , ue = function(t) {
            function e(e, n, r) {
                t.call(this, e, n),
                r && At(this.base) || Ct()
            }
            return t && (e.__proto__ = t),
            e.prototype = Object.create(t && t.prototype),
            e.prototype.constructor = e,
            e.prototype.setupListeners = function() {
                var t = this
                  , e = this.router
                  , n = e.options.scrollBehavior
                  , r = ne && n;
                r && G(),
                window.addEventListener(ne ? "popstate" : "hashchange", function() {
                    var e = t.current;
                    Ct() && t.transitionTo(kt(), function(n) {
                        r && W(t.router, n, e, !0),
                        ne || $t(n.fullPath)
                    })
                })
            }
            ,
            e.prototype.push = function(t, e, n) {
                var r = this
                  , i = this
                  , o = i.current;
                this.transitionTo(t, function(t) {
                    jt(t.fullPath),
                    W(r.router, t, o, !1),
                    e && e(t)
                }, n)
            }
            ,
            e.prototype.replace = function(t, e, n) {
                var r = this
                  , i = this
                  , o = i.current;
                this.transitionTo(t, function(t) {
                    $t(t.fullPath),
                    W(r.router, t, o, !1),
                    e && e(t)
                }, n)
            }
            ,
            e.prototype.go = function(t) {
                window.history.go(t)
            }
            ,
            e.prototype.ensureURL = function(t) {
                var e = this.current.fullPath;
                kt() !== e && (t ? jt(e) : $t(e))
            }
            ,
            e.prototype.getCurrentLocation = function() {
                return kt()
            }
            ,
            e
        }(ae)
          , ce = function(t) {
            function e(e, n) {
                t.call(this, e, n),
                this.stack = [],
                this.index = -1
            }
            return t && (e.__proto__ = t),
            e.prototype = Object.create(t && t.prototype),
            e.prototype.constructor = e,
            e.prototype.push = function(t, e, n) {
                var r = this;
                this.transitionTo(t, function(t) {
                    r.stack = r.stack.slice(0, r.index + 1).concat(t),
                    r.index++,
                    e && e(t)
                }, n)
            }
            ,
            e.prototype.replace = function(t, e, n) {
                var r = this;
                this.transitionTo(t, function(t) {
                    r.stack = r.stack.slice(0, r.index).concat(t),
                    e && e(t)
                }, n)
            }
            ,
            e.prototype.go = function(t) {
                var e = this
                  , n = this.index + t;
                if (!(n < 0 || n >= this.stack.length)) {
                    var r = this.stack[n];
                    this.confirmTransition(r, function() {
                        e.index = n,
                        e.updateRoute(r)
                    })
                }
            }
            ,
            e.prototype.getCurrentLocation = function() {
                var t = this.stack[this.stack.length - 1];
                return t ? t.fullPath : "/"
            }
            ,
            e.prototype.ensureURL = function() {}
            ,
            e
        }(ae)
          , he = function(t) {
            void 0 === t && (t = {}),
            this.app = null,
            this.apps = [],
            this.options = t,
            this.beforeHooks = [],
            this.resolveHooks = [],
            this.afterHooks = [],
            this.matcher = Y(t.routes || [], this);
            var e = t.mode || "hash";
            switch (this.fallback = "history" === e && !ne && !1 !== t.fallback,
            this.fallback && (e = "hash"),
            Vt || (e = "abstract"),
            this.mode = e,
            e) {
            case "history":
                this.history = new se(this,t.base);
                break;
            case "hash":
                this.history = new ue(this,t.base,this.fallback);
                break;
            case "abstract":
                this.history = new ce(this,t.base)
            }
        }
          , pe = {
            currentRoute: {
                configurable: !0
            }
        };
        he.prototype.match = function(t, e, n) {
            return this.matcher.match(t, e, n)
        }
        ,
        pe.currentRoute.get = function() {
            return this.history && this.history.current
        }
        ,
        he.prototype.init = function(t) {
            var e = this;
            if (this.apps.push(t),
            !this.app) {
                this.app = t;
                var n = this.history;
                if (n instanceof se)
                    n.transitionTo(n.getCurrentLocation());
                else if (n instanceof ue) {
                    var r = function() {
                        n.setupListeners()
                    };
                    n.transitionTo(n.getCurrentLocation(), r, r)
                }
                n.listen(function(t) {
                    e.apps.forEach(function(e) {
                        e._route = t
                    })
                })
            }
        }
        ,
        he.prototype.beforeEach = function(t) {
            return Rt(this.beforeHooks, t)
        }
        ,
        he.prototype.beforeResolve = function(t) {
            return Rt(this.resolveHooks, t)
        }
        ,
        he.prototype.afterEach = function(t) {
            return Rt(this.afterHooks, t)
        }
        ,
        he.prototype.onReady = function(t, e) {
            this.history.onReady(t, e)
        }
        ,
        he.prototype.onError = function(t) {
            this.history.onError(t)
        }
        ,
        he.prototype.push = function(t, e, n) {
            this.history.push(t, e, n)
        }
        ,
        he.prototype.replace = function(t, e, n) {
            this.history.replace(t, e, n)
        }
        ,
        he.prototype.go = function(t) {
            this.history.go(t)
        }
        ,
        he.prototype.back = function() {
            this.go(-1)
        }
        ,
        he.prototype.forward = function() {
            this.go(1)
        }
        ,
        he.prototype.getMatchedComponents = function(t) {
            var e = t ? t.matched ? t : this.resolve(t).route : this.currentRoute;
            return e ? [].concat.apply([], e.matched.map(function(t) {
                return Object.keys(t.components).map(function(e) {
                    return t.components[e]
                })
            })) : []
        }
        ,
        he.prototype.resolve = function(t, e, n) {
            var r = F(t, e || this.history.current, n, this)
              , i = this.match(r, e)
              , o = i.redirectedFrom || i.fullPath;
            return {
                location: r,
                route: i,
                href: Mt(this.history.base, o, this.mode),
                normalizedTo: r,
                resolved: i
            }
        }
        ,
        he.prototype.addRoutes = function(t) {
            this.matcher.addRoutes(t),
            this.history.current !== Ut && this.history.transitionTo(this.history.getCurrentLocation())
        }
        ,
        Object.defineProperties(he.prototype, pe),
        he.install = w,
        he.version = "3.0.1",
        Vt && window.Vue && window.Vue.use(he),
        e.default = he
    },
    223: function(t, e, n) {
        /**
 * vue-meta v1.4.4
 * (c) 2018 Declan de Wet & Atinux
 * @license MIT
 */
        !function(e, n) {
            t.exports = n()
        }(0, function() {
            "use strict";
            function t(t) {
                if (null === t || void 0 === t)
                    throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }
            function e(t) {
                return !!t && "object" == typeof t
            }
            function n(t) {
                var e = Object.prototype.toString.call(t);
                return "[object RegExp]" === e || "[object Date]" === e || r(t)
            }
            function r(t) {
                return t.$$typeof === I
            }
            function i(t) {
                return Array.isArray(t) ? [] : {}
            }
            function o(t, e) {
                return e && !1 === e.clone || !R(t) ? t : u(i(t), t, e)
            }
            function a(t, e, n) {
                return t.concat(e).map(function(t) {
                    return o(t, n)
                })
            }
            function s(t, e, n) {
                var r = {};
                return R(t) && Object.keys(t).forEach(function(e) {
                    r[e] = o(t[e], n)
                }),
                Object.keys(e).forEach(function(i) {
                    R(e[i]) && t[i] ? r[i] = u(t[i], e[i], n) : r[i] = o(e[i], n)
                }),
                r
            }
            function u(t, e, n) {
                var r = Array.isArray(e)
                  , i = Array.isArray(t)
                  , u = n || {
                    arrayMerge: a
                };
                if (r === i)
                    return r ? (u.arrayMerge || a)(t, e, n) : s(t, e, n);
                return o(e, n)
            }
            function c(t) {
                var e = !1;
                if (null != t && "function" != typeof t.toString)
                    try {
                        e = !!(t + "")
                    } catch (t) {}
                return e
            }
            function h(t) {
                return !!t && "object" == typeof t
            }
            function p(t) {
                if (!h(t) || U.call(t) != z || c(t))
                    return !1;
                var e = F(t);
                if (null === e)
                    return !0;
                var n = L.call(e, "constructor") && e.constructor;
                return "function" == typeof n && n instanceof n && q.call(n) == H
            }
            function f(t) {
                return Array.isArray ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t)
            }
            function l(t, e) {
                void 0 === e && (e = {});
                var n = t.component
                  , r = t.option
                  , i = t.deep
                  , o = t.arrayMerge
                  , a = n.$options;
                if (n._inactive)
                    return e;
                if (void 0 !== a[r] && null !== a[r]) {
                    var s = a[r];
                    "function" == typeof s && (s = s.call(n)),
                    e = "object" == typeof s ? P(e, s, {
                        arrayMerge: o
                    }) : s
                }
                return i && n.$children.length && n.$children.forEach(function(t) {
                    e = l({
                        component: t,
                        option: r,
                        deep: i,
                        arrayMerge: o
                    }, e)
                }),
                e
            }
            function d(t) {
                void 0 === t && (t = {});
                var e = t.keyName
                  , n = t.tagIDKeyName;
                return function(t) {
                    var r = {
                        title: "",
                        titleChunk: "",
                        titleTemplate: "%s",
                        htmlAttrs: {},
                        bodyAttrs: {},
                        headAttrs: {},
                        meta: [],
                        base: [],
                        link: [],
                        style: [],
                        script: [],
                        noscript: [],
                        __dangerouslyDisableSanitizers: [],
                        __dangerouslyDisableSanitizersByTagID: {}
                    }
                      , i = l({
                        component: t,
                        option: e,
                        deep: !0,
                        arrayMerge: function(t, e) {
                            var r = [];
                            for (var i in t) {
                                var o = t[i]
                                  , a = !1;
                                for (var s in e) {
                                    var u = e[s];
                                    if (o[n] && o[n] === u[n]) {
                                        a = !0;
                                        break
                                    }
                                }
                                a || r.push(o)
                            }
                            return r.concat(e)
                        }
                    });
                    i.title && (i.titleChunk = i.title),
                    i.titleTemplate && ("function" == typeof i.titleTemplate ? i.title = i.titleTemplate.call(t, i.titleChunk) : i.title = i.titleTemplate.replace(/%s/g, i.titleChunk)),
                    i.base && (i.base = Object.keys(i.base).length ? [i.base] : []);
                    var o = i.__dangerouslyDisableSanitizers
                      , a = i.__dangerouslyDisableSanitizersByTagID
                      , s = function(t) {
                        return Object.keys(t).reduce(function(e, r) {
                            var i = o && o.indexOf(r) > -1
                              , u = t[n];
                            !i && u && (i = a && a[u] && a[u].indexOf(r) > -1);
                            var c = t[r];
                            return e[r] = c,
                            "__dangerouslyDisableSanitizers" === r || "__dangerouslyDisableSanitizersByTagID" === r ? e : (i ? e[r] = c : "string" == typeof c ? e[r] = Y(c) : X(c) ? e[r] = s(c) : f(c) ? e[r] = c.map(s) : e[r] = c,
                            e)
                        }, {})
                    };
                    return i = P(r, i),
                    i = s(i)
                }
            }
            function v(t) {
                void 0 === t && (t = {});
                var e = t.attribute;
                return function(t, n) {
                    return {
                        text: function() {
                            return "<" + t + " " + e + '="true">' + n + "</" + t + ">"
                        }
                    }
                }
            }
            function m(t) {
                void 0 === t && (t = {});
                var e = t.attribute;
                return function(t, n) {
                    return {
                        text: function() {
                            var t = ""
                              , r = [];
                            for (var i in n)
                                n.hasOwnProperty(i) && (r.push(i),
                                t += (void 0 !== n[i] ? i + '="' + n[i] + '"' : i) + " ");
                            return t += e + '="' + r.join(",") + '"',
                            t.trim()
                        }
                    }
                }
            }
            function y(t) {
                void 0 === t && (t = {});
                var e = t.attribute;
                return function(n, r) {
                    return {
                        text: function(i) {
                            void 0 === i && (i = {});
                            var o = i.body;
                            return void 0 === o && (o = !1),
                            r.reduce(function(r, i) {
                                if (!!i.body !== o)
                                    return r;
                                var a = Object.keys(i).reduce(function(e, n) {
                                    switch (n) {
                                    case "innerHTML":
                                    case "cssText":
                                    case "once":
                                        return e;
                                    default:
                                        return -1 !== [t.tagIDKeyName, "body"].indexOf(n) ? e + " data-" + n + '="' + i[n] + '"' : void 0 === i[n] ? e + " " + n : e + " " + n + '="' + i[n] + '"'
                                    }
                                }, "").trim()
                                  , s = i.innerHTML || i.cssText || ""
                                  , u = -1 === ["noscript", "script", "style"].indexOf(n)
                                  , c = i.once ? "" : e + '="true" ';
                                return u ? r + "<" + n + " " + c + a + "/>" : r + "<" + n + " " + c + a + ">" + s + "</" + n + ">"
                            }, "")
                        }
                    }
                }
            }
            function g(t) {
                return void 0 === t && (t = {}),
                function(e, n) {
                    switch (e) {
                    case "title":
                        return v(t)(e, n);
                    case "htmlAttrs":
                    case "bodyAttrs":
                    case "headAttrs":
                        return m(t)(e, n);
                    default:
                        return y(t)(e, n)
                    }
                }
            }
            function b(t) {
                return void 0 === t && (t = {}),
                function() {
                    var e = d(t)(this.$root);
                    for (var n in e)
                        e.hasOwnProperty(n) && "titleTemplate" !== n && "titleChunk" !== n && (e[n] = g(t)(n, e[n]));
                    return e
                }
            }
            function w() {
                return function(t) {
                    void 0 === t && (t = document.title),
                    document.title = t
                }
            }
            function T(t) {
                void 0 === t && (t = {});
                var e = t.attribute;
                return function(t, n) {
                    var r = n.getAttribute(e)
                      , i = r ? r.split(",") : []
                      , o = [].concat(i);
                    for (var a in t)
                        if (t.hasOwnProperty(a)) {
                            var s = t[a] || "";
                            n.setAttribute(a, s),
                            -1 === i.indexOf(a) && i.push(a);
                            var u = o.indexOf(a);
                            -1 !== u && o.splice(u, 1)
                        }
                    for (var c = o.length - 1; c >= 0; c--)
                        n.removeAttribute(o[c]);
                    i.length === o.length ? n.removeAttribute(e) : n.setAttribute(e, i.join(","))
                }
            }
            function _(t) {
                void 0 === t && (t = {});
                var e = t.attribute;
                return function(n, r, i, o) {
                    var a, s = V(i.querySelectorAll(n + "[" + e + "]")), u = V(o.querySelectorAll(n + "[" + e + '][data-body="true"]')), c = [];
                    if (r.length > 1) {
                        var h = [];
                        r = r.map(function(t) {
                            var e = JSON.stringify(t);
                            if (h.indexOf(e) < 0)
                                return h.push(e),
                                t
                        }).filter(function(t) {
                            return t
                        })
                    }
                    r && r.length && r.forEach(function(r) {
                        var i = document.createElement(n)
                          , o = !0 !== r.body ? s : u;
                        for (var h in r)
                            if (r.hasOwnProperty(h))
                                if ("innerHTML" === h)
                                    i.innerHTML = r.innerHTML;
                                else if ("cssText" === h)
                                    i.styleSheet ? i.styleSheet.cssText = r.cssText : i.appendChild(document.createTextNode(r.cssText));
                                else if (-1 !== [t.tagIDKeyName, "body"].indexOf(h)) {
                                    var p = "data-" + h
                                      , f = void 0 === r[h] ? "" : r[h];
                                    i.setAttribute(p, f)
                                } else {
                                    var l = void 0 === r[h] ? "" : r[h];
                                    i.setAttribute(h, l)
                                }
                        i.setAttribute(e, "true"),
                        o.some(function(t, e) {
                            return a = e,
                            i.isEqualNode(t)
                        }) ? o.splice(a, 1) : c.push(i)
                    });
                    var p = s.concat(u);
                    return p.forEach(function(t) {
                        return t.parentNode.removeChild(t)
                    }),
                    c.forEach(function(t) {
                        "true" === t.getAttribute("data-body") ? o.appendChild(t) : i.appendChild(t)
                    }),
                    {
                        oldTags: p,
                        newTags: c
                    }
                }
            }
            function E(t) {
                void 0 === t && (t = {});
                var e = t.ssrAttribute;
                return function(n) {
                    var r = document.getElementsByTagName("html")[0];
                    if (null === r.getAttribute(e)) {
                        var i = {}
                          , o = {};
                        Object.keys(n).forEach(function(e) {
                            switch (e) {
                            case "title":
                                w(t)(n.title);
                                break;
                            case "htmlAttrs":
                                T(t)(n[e], r);
                                break;
                            case "bodyAttrs":
                                T(t)(n[e], document.getElementsByTagName("body")[0]);
                                break;
                            case "headAttrs":
                                T(t)(n[e], document.getElementsByTagName("head")[0]);
                                break;
                            case "titleChunk":
                            case "titleTemplate":
                            case "changed":
                            case "__dangerouslyDisableSanitizers":
                                break;
                            default:
                                var a = document.getElementsByTagName("head")[0]
                                  , s = document.getElementsByTagName("body")[0]
                                  , u = _(t)(e, n[e], a, s)
                                  , c = u.oldTags
                                  , h = u.newTags;
                                h.length && (i[e] = h,
                                o[e] = c)
                            }
                        }),
                        "function" == typeof n.changed && n.changed.call(this, n, i, o)
                    } else
                        r.removeAttribute(e)
                }
            }
            function O(t) {
                return void 0 === t && (t = {}),
                function() {
                    var e = d(t)(this.$root);
                    return E(t).call(this, e),
                    e
                }
            }
            function x(t) {
                return void 0 === t && (t = {}),
                function() {
                    return {
                        inject: b(t).bind(this),
                        refresh: O(t).bind(this)
                    }
                }
            }
            function A(t, e) {
                return B(t),
                G(function() {
                    t = null,
                    e()
                })
            }
            function C(t, e) {
                void 0 === e && (e = {}),
                e = $({
                    keyName: W,
                    attribute: K,
                    ssrAttribute: J,
                    tagIDKeyName: Z
                }, e),
                t.prototype.$meta = x(e);
                var n = null;
                t.mixin({
                    beforeCreate: function() {
                        void 0 !== this.$options[e.keyName] && (this._hasMetaInfo = !0),
                        "function" == typeof this.$options[e.keyName] && (void 0 === this.$options.computed && (this.$options.computed = {}),
                        this.$options.computed.$metaInfo = this.$options[e.keyName])
                    },
                    created: function() {
                        var t = this;
                        !this.$isServer && this.$metaInfo && this.$watch("$metaInfo", function() {
                            n = A(n, function() {
                                return t.$meta().refresh()
                            })
                        })
                    },
                    activated: function() {
                        var t = this;
                        this._hasMetaInfo && (n = A(n, function() {
                            return t.$meta().refresh()
                        }))
                    },
                    deactivated: function() {
                        var t = this;
                        this._hasMetaInfo && (n = A(n, function() {
                            return t.$meta().refresh()
                        }))
                    },
                    beforeMount: function() {
                        var t = this;
                        this._hasMetaInfo && (n = A(n, function() {
                            return t.$meta().refresh()
                        }))
                    },
                    destroyed: function() {
                        var t = this;
                        if (!this.$isServer && this._hasMetaInfo)
                            var e = setInterval(function() {
                                t.$el && null !== t.$el.offsetParent || (clearInterval(e),
                                n = A(n, function() {
                                    return t.$meta().refresh()
                                }))
                            }, 50)
                    }
                })
            }
            /*
object-assign
(c) Sindre Sorhus
@license MIT
*/
            var k = Object.getOwnPropertySymbols
              , S = Object.prototype.hasOwnProperty
              , j = Object.prototype.propertyIsEnumerable
              , $ = function() {
                try {
                    if (!Object.assign)
                        return !1;
                    var t = new String("abc");
                    if (t[5] = "de",
                    "5" === Object.getOwnPropertyNames(t)[0])
                        return !1;
                    for (var e = {}, n = 0; n < 10; n++)
                        e["_" + String.fromCharCode(n)] = n;
                    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                        return e[t]
                    }).join(""))
                        return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                        r[t] = t
                    }),
                    "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
                } catch (t) {
                    return !1
                }
            }() ? Object.assign : function(e, n) {
                for (var r, i, o = arguments, a = t(e), s = 1; s < arguments.length; s++) {
                    r = Object(o[s]);
                    for (var u in r)
                        S.call(r, u) && (a[u] = r[u]);
                    if (k) {
                        i = k(r);
                        for (var c = 0; c < i.length; c++)
                            j.call(r, i[c]) && (a[i[c]] = r[i[c]])
                    }
                }
                return a
            }
              , R = function(t) {
                return e(t) && !n(t)
            }
              , M = "function" == typeof Symbol && Symbol.for
              , I = M ? Symbol.for("react.element") : 60103;
            u.all = function(t, e) {
                if (!Array.isArray(t))
                    throw new Error("first argument should be an array");
                return t.reduce(function(t, n) {
                    return u(t, n, e)
                }, {})
            }
            ;
            var P = u
              , z = "[object Object]"
              , D = Function.prototype
              , N = Object.prototype
              , q = D.toString
              , L = N.hasOwnProperty
              , H = q.call(Object)
              , U = N.toString
              , F = function(t, e) {
                return function(n) {
                    return t(e(n))
                }
            }(Object.getPrototypeOf, Object)
              , X = p
              , Y = function(t) {
                return "undefined" == typeof window ? String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;") : String(t).replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "'")
            }
              , V = Function.prototype.call.bind(Array.prototype.slice)
              , B = ("undefined" != typeof window ? window.cancelAnimationFrame : null) || clearTimeout
              , G = ("undefined" != typeof window ? window.requestAnimationFrame : null) || function(t) {
                return setTimeout(t, 0)
            }
              , W = "metaInfo"
              , K = "data-vue-meta"
              , J = "data-vue-meta-server-rendered"
              , Z = "vmid";
            "undefined" != typeof window && void 0 !== window.Vue && Vue.use(C);
            return C.version = "1.4.4",
            C
        })
    },
    23: function(t, e, n) {
        "use strict";
        function r(t) {
            x && (t._devtoolHook = x,
            x.emit("vuex:init", t),
            x.on("vuex:travel-to-state", function(e) {
                t.replaceState(e)
            }),
            t.subscribe(function(t, e) {
                x.emit("vuex:mutation", t, e)
            }))
        }
        function i(t, e) {
            Object.keys(t).forEach(function(n) {
                return e(t[n], n)
            })
        }
        function o(t) {
            return null !== t && "object" == typeof t
        }
        function a(t) {
            return t && "function" == typeof t.then
        }
        function s(t, e, n) {
            if (e.update(n),
            n.modules)
                for (var r in n.modules) {
                    if (!e.getChild(r))
                        return;
                    s(t.concat(r), e.getChild(r), n.modules[r])
                }
        }
        function u(t, e) {
            return e.indexOf(t) < 0 && e.push(t),
            function() {
                var n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
            }
        }
        function c(t, e) {
            t._actions = Object.create(null),
            t._mutations = Object.create(null),
            t._wrappedGetters = Object.create(null),
            t._modulesNamespaceMap = Object.create(null);
            var n = t.state;
            p(t, n, [], t._modules.root, !0),
            h(t, n, e)
        }
        function h(t, e, n) {
            var r = t._vm;
            t.getters = {};
            var o = t._wrappedGetters
              , a = {};
            i(o, function(e, n) {
                a[n] = function() {
                    return e(t)
                }
                ,
                Object.defineProperty(t.getters, n, {
                    get: function() {
                        return t._vm[n]
                    },
                    enumerable: !0
                })
            });
            var s = S.config.silent;
            S.config.silent = !0,
            t._vm = new S({
                data: {
                    $$state: e
                },
                computed: a
            }),
            S.config.silent = s,
            t.strict && y(t),
            r && (n && t._withCommit(function() {
                r._data.$$state = null
            }),
            S.nextTick(function() {
                return r.$destroy()
            }))
        }
        function p(t, e, n, r, i) {
            var o = !n.length
              , a = t._modules.getNamespace(n);
            if (r.namespaced && (t._modulesNamespaceMap[a] = r),
            !o && !i) {
                var s = g(e, n.slice(0, -1))
                  , u = n[n.length - 1];
                t._withCommit(function() {
                    S.set(s, u, r.state)
                })
            }
            var c = r.context = f(t, a, n);
            r.forEachMutation(function(e, n) {
                d(t, a + n, e, c)
            }),
            r.forEachAction(function(e, n) {
                var r = e.root ? n : a + n
                  , i = e.handler || e;
                v(t, r, i, c)
            }),
            r.forEachGetter(function(e, n) {
                m(t, a + n, e, c)
            }),
            r.forEachChild(function(r, o) {
                p(t, e, n.concat(o), r, i)
            })
        }
        function f(t, e, n) {
            var r = "" === e
              , i = {
                dispatch: r ? t.dispatch : function(n, r, i) {
                    var o = b(n, r, i)
                      , a = o.payload
                      , s = o.options
                      , u = o.type;
                    return s && s.root || (u = e + u),
                    t.dispatch(u, a)
                }
                ,
                commit: r ? t.commit : function(n, r, i) {
                    var o = b(n, r, i)
                      , a = o.payload
                      , s = o.options
                      , u = o.type;
                    s && s.root || (u = e + u),
                    t.commit(u, a, s)
                }
            };
            return Object.defineProperties(i, {
                getters: {
                    get: r ? function() {
                        return t.getters
                    }
                    : function() {
                        return l(t, e)
                    }
                },
                state: {
                    get: function() {
                        return g(t.state, n)
                    }
                }
            }),
            i
        }
        function l(t, e) {
            var n = {}
              , r = e.length;
            return Object.keys(t.getters).forEach(function(i) {
                if (i.slice(0, r) === e) {
                    var o = i.slice(r);
                    Object.defineProperty(n, o, {
                        get: function() {
                            return t.getters[i]
                        },
                        enumerable: !0
                    })
                }
            }),
            n
        }
        function d(t, e, n, r) {
            (t._mutations[e] || (t._mutations[e] = [])).push(function(e) {
                n.call(t, r.state, e)
            })
        }
        function v(t, e, n, r) {
            (t._actions[e] || (t._actions[e] = [])).push(function(e, i) {
                var o = n.call(t, {
                    dispatch: r.dispatch,
                    commit: r.commit,
                    getters: r.getters,
                    state: r.state,
                    rootGetters: t.getters,
                    rootState: t.state
                }, e, i);
                return a(o) || (o = Promise.resolve(o)),
                t._devtoolHook ? o.catch(function(e) {
                    throw t._devtoolHook.emit("vuex:error", e),
                    e
                }) : o
            })
        }
        function m(t, e, n, r) {
            t._wrappedGetters[e] || (t._wrappedGetters[e] = function(t) {
                return n(r.state, r.getters, t.state, t.getters)
            }
            )
        }
        function y(t) {
            t._vm.$watch(function() {
                return this._data.$$state
            }, function() {}, {
                deep: !0,
                sync: !0
            })
        }
        function g(t, e) {
            return e.length ? e.reduce(function(t, e) {
                return t[e]
            }, t) : t
        }
        function b(t, e, n) {
            return o(t) && t.type && (n = e,
            e = t,
            t = t.type),
            {
                type: t,
                payload: e,
                options: n
            }
        }
        function w(t) {
            S && t === S || (S = t,
            O(S))
        }
        function T(t) {
            return Array.isArray(t) ? t.map(function(t) {
                return {
                    key: t,
                    val: t
                }
            }) : Object.keys(t).map(function(e) {
                return {
                    key: e,
                    val: t[e]
                }
            })
        }
        function _(t) {
            return function(e, n) {
                return "string" != typeof e ? (n = e,
                e = "") : "/" !== e.charAt(e.length - 1) && (e += "/"),
                t(e, n)
            }
        }
        function E(t, e, n) {
            return t._modulesNamespaceMap[n]
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        n.d(e, "Store", function() {
            return j
        }),
        n.d(e, "install", function() {
            return w
        }),
        n.d(e, "mapState", function() {
            return R
        }),
        n.d(e, "mapMutations", function() {
            return M
        }),
        n.d(e, "mapGetters", function() {
            return I
        }),
        n.d(e, "mapActions", function() {
            return P
        }),
        n.d(e, "createNamespacedHelpers", function() {
            return z
        });
        /**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
        var O = function(t) {
            function e() {
                var t = this.$options;
                t.store ? this.$store = "function" == typeof t.store ? t.store() : t.store : t.parent && t.parent.$store && (this.$store = t.parent.$store)
            }
            if (Number(t.version.split(".")[0]) >= 2)
                t.mixin({
                    beforeCreate: e
                });
            else {
                var n = t.prototype._init;
                t.prototype._init = function(t) {
                    void 0 === t && (t = {}),
                    t.init = t.init ? [e].concat(t.init) : e,
                    n.call(this, t)
                }
            }
        }
          , x = "undefined" != typeof window && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
          , A = function(t, e) {
            this.runtime = e,
            this._children = Object.create(null),
            this._rawModule = t;
            var n = t.state;
            this.state = ("function" == typeof n ? n() : n) || {}
        }
          , C = {
            namespaced: {
                configurable: !0
            }
        };
        C.namespaced.get = function() {
            return !!this._rawModule.namespaced
        }
        ,
        A.prototype.addChild = function(t, e) {
            this._children[t] = e
        }
        ,
        A.prototype.removeChild = function(t) {
            delete this._children[t]
        }
        ,
        A.prototype.getChild = function(t) {
            return this._children[t]
        }
        ,
        A.prototype.update = function(t) {
            this._rawModule.namespaced = t.namespaced,
            t.actions && (this._rawModule.actions = t.actions),
            t.mutations && (this._rawModule.mutations = t.mutations),
            t.getters && (this._rawModule.getters = t.getters)
        }
        ,
        A.prototype.forEachChild = function(t) {
            i(this._children, t)
        }
        ,
        A.prototype.forEachGetter = function(t) {
            this._rawModule.getters && i(this._rawModule.getters, t)
        }
        ,
        A.prototype.forEachAction = function(t) {
            this._rawModule.actions && i(this._rawModule.actions, t)
        }
        ,
        A.prototype.forEachMutation = function(t) {
            this._rawModule.mutations && i(this._rawModule.mutations, t)
        }
        ,
        Object.defineProperties(A.prototype, C);
        var k = function(t) {
            this.register([], t, !1)
        };
        k.prototype.get = function(t) {
            return t.reduce(function(t, e) {
                return t.getChild(e)
            }, this.root)
        }
        ,
        k.prototype.getNamespace = function(t) {
            var e = this.root;
            return t.reduce(function(t, n) {
                return e = e.getChild(n),
                t + (e.namespaced ? n + "/" : "")
            }, "")
        }
        ,
        k.prototype.update = function(t) {
            s([], this.root, t)
        }
        ,
        k.prototype.register = function(t, e, n) {
            var r = this;
            void 0 === n && (n = !0);
            var o = new A(e,n);
            if (0 === t.length)
                this.root = o;
            else {
                this.get(t.slice(0, -1)).addChild(t[t.length - 1], o)
            }
            e.modules && i(e.modules, function(e, i) {
                r.register(t.concat(i), e, n)
            })
        }
        ,
        k.prototype.unregister = function(t) {
            var e = this.get(t.slice(0, -1))
              , n = t[t.length - 1];
            e.getChild(n).runtime && e.removeChild(n)
        }
        ;
        var S, j = function(t) {
            var e = this;
            void 0 === t && (t = {}),
            !S && "undefined" != typeof window && window.Vue && w(window.Vue);
            var n = t.plugins;
            void 0 === n && (n = []);
            var i = t.strict;
            void 0 === i && (i = !1);
            var o = t.state;
            void 0 === o && (o = {}),
            "function" == typeof o && (o = o() || {}),
            this._committing = !1,
            this._actions = Object.create(null),
            this._actionSubscribers = [],
            this._mutations = Object.create(null),
            this._wrappedGetters = Object.create(null),
            this._modules = new k(t),
            this._modulesNamespaceMap = Object.create(null),
            this._subscribers = [],
            this._watcherVM = new S;
            var a = this
              , s = this
              , u = s.dispatch
              , c = s.commit;
            this.dispatch = function(t, e) {
                return u.call(a, t, e)
            }
            ,
            this.commit = function(t, e, n) {
                return c.call(a, t, e, n)
            }
            ,
            this.strict = i,
            p(this, o, [], this._modules.root),
            h(this, o),
            n.forEach(function(t) {
                return t(e)
            }),
            S.config.devtools && r(this)
        }, $ = {
            state: {
                configurable: !0
            }
        };
        $.state.get = function() {
            return this._vm._data.$$state
        }
        ,
        $.state.set = function(t) {}
        ,
        j.prototype.commit = function(t, e, n) {
            var r = this
              , i = b(t, e, n)
              , o = i.type
              , a = i.payload
              , s = (i.options,
            {
                type: o,
                payload: a
            })
              , u = this._mutations[o];
            u && (this._withCommit(function() {
                u.forEach(function(t) {
                    t(a)
                })
            }),
            this._subscribers.forEach(function(t) {
                return t(s, r.state)
            }))
        }
        ,
        j.prototype.dispatch = function(t, e) {
            var n = this
              , r = b(t, e)
              , i = r.type
              , o = r.payload
              , a = {
                type: i,
                payload: o
            }
              , s = this._actions[i];
            if (s)
                return this._actionSubscribers.forEach(function(t) {
                    return t(a, n.state)
                }),
                s.length > 1 ? Promise.all(s.map(function(t) {
                    return t(o)
                })) : s[0](o)
        }
        ,
        j.prototype.subscribe = function(t) {
            return u(t, this._subscribers)
        }
        ,
        j.prototype.subscribeAction = function(t) {
            return u(t, this._actionSubscribers)
        }
        ,
        j.prototype.watch = function(t, e, n) {
            var r = this;
            return this._watcherVM.$watch(function() {
                return t(r.state, r.getters)
            }, e, n)
        }
        ,
        j.prototype.replaceState = function(t) {
            var e = this;
            this._withCommit(function() {
                e._vm._data.$$state = t
            })
        }
        ,
        j.prototype.registerModule = function(t, e, n) {
            void 0 === n && (n = {}),
            "string" == typeof t && (t = [t]),
            this._modules.register(t, e),
            p(this, this.state, t, this._modules.get(t), n.preserveState),
            h(this, this.state)
        }
        ,
        j.prototype.unregisterModule = function(t) {
            var e = this;
            "string" == typeof t && (t = [t]),
            this._modules.unregister(t),
            this._withCommit(function() {
                var n = g(e.state, t.slice(0, -1));
                S.delete(n, t[t.length - 1])
            }),
            c(this)
        }
        ,
        j.prototype.hotUpdate = function(t) {
            this._modules.update(t),
            c(this, !0)
        }
        ,
        j.prototype._withCommit = function(t) {
            var e = this._committing;
            this._committing = !0,
            t(),
            this._committing = e
        }
        ,
        Object.defineProperties(j.prototype, $);
        var R = _(function(t, e) {
            var n = {};
            return T(e).forEach(function(e) {
                var r = e.key
                  , i = e.val;
                n[r] = function() {
                    var e = this.$store.state
                      , n = this.$store.getters;
                    if (t) {
                        var r = E(this.$store, "mapState", t);
                        if (!r)
                            return;
                        e = r.context.state,
                        n = r.context.getters
                    }
                    return "function" == typeof i ? i.call(this, e, n) : e[i]
                }
                ,
                n[r].vuex = !0
            }),
            n
        })
          , M = _(function(t, e) {
            var n = {};
            return T(e).forEach(function(e) {
                var r = e.key
                  , i = e.val;
                n[r] = function() {
                    for (var e = [], n = arguments.length; n--; )
                        e[n] = arguments[n];
                    var r = this.$store.commit;
                    if (t) {
                        var o = E(this.$store, "mapMutations", t);
                        if (!o)
                            return;
                        r = o.context.commit
                    }
                    return "function" == typeof i ? i.apply(this, [r].concat(e)) : r.apply(this.$store, [i].concat(e))
                }
            }),
            n
        })
          , I = _(function(t, e) {
            var n = {};
            return T(e).forEach(function(e) {
                var r = e.key
                  , i = e.val;
                i = t + i,
                n[r] = function() {
                    if (!t || E(this.$store, "mapGetters", t))
                        return this.$store.getters[i]
                }
                ,
                n[r].vuex = !0
            }),
            n
        })
          , P = _(function(t, e) {
            var n = {};
            return T(e).forEach(function(e) {
                var r = e.key
                  , i = e.val;
                n[r] = function() {
                    for (var e = [], n = arguments.length; n--; )
                        e[n] = arguments[n];
                    var r = this.$store.dispatch;
                    if (t) {
                        var o = E(this.$store, "mapActions", t);
                        if (!o)
                            return;
                        r = o.context.dispatch
                    }
                    return "function" == typeof i ? i.apply(this, [r].concat(e)) : r.apply(this.$store, [i].concat(e))
                }
            }),
            n
        })
          , z = function(t) {
            return {
                mapState: R.bind(null, t),
                mapGetters: I.bind(null, t),
                mapMutations: M.bind(null, t),
                mapActions: P.bind(null, t)
            }
        }
          , D = {
            Store: j,
            install: w,
            version: "3.0.1",
            mapState: R,
            mapMutations: M,
            mapGetters: I,
            mapActions: P,
            createNamespacedHelpers: z
        };
        e.default = D
    },
    668: function(t, e, n) {
        var r;
        /*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
        !function(i, o, a, s) {
            "use strict";
            function u(t, e, n) {
                return setTimeout(l(t, n), e)
            }
            function c(t, e, n) {
                return !!Array.isArray(t) && (h(t, n[e], n),
                !0)
            }
            function h(t, e, n) {
                var r;
                if (t)
                    if (t.forEach)
                        t.forEach(e, n);
                    else if (t.length !== s)
                        for (r = 0; r < t.length; )
                            e.call(n, t[r], r, t),
                            r++;
                    else
                        for (r in t)
                            t.hasOwnProperty(r) && e.call(n, t[r], r, t)
            }
            function p(t, e, n) {
                var r = "DEPRECATED METHOD: " + e + "\n" + n + " AT \n";
                return function() {
                    var e = new Error("get-stack-trace")
                      , n = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace"
                      , o = i.console && (i.console.warn || i.console.log);
                    return o && o.call(i.console, r, n),
                    t.apply(this, arguments)
                }
            }
            function f(t, e, n) {
                var r, i = e.prototype;
                r = t.prototype = Object.create(i),
                r.constructor = t,
                r._super = i,
                n && dt(r, n)
            }
            function l(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            }
            function d(t, e) {
                return typeof t == yt ? t.apply(e ? e[0] || s : s, e) : t
            }
            function v(t, e) {
                return t === s ? e : t
            }
            function m(t, e, n) {
                h(w(e), function(e) {
                    t.addEventListener(e, n, !1)
                })
            }
            function y(t, e, n) {
                h(w(e), function(e) {
                    t.removeEventListener(e, n, !1)
                })
            }
            function g(t, e) {
                for (; t; ) {
                    if (t == e)
                        return !0;
                    t = t.parentNode
                }
                return !1
            }
            function b(t, e) {
                return t.indexOf(e) > -1
            }
            function w(t) {
                return t.trim().split(/\s+/g)
            }
            function T(t, e, n) {
                if (t.indexOf && !n)
                    return t.indexOf(e);
                for (var r = 0; r < t.length; ) {
                    if (n && t[r][n] == e || !n && t[r] === e)
                        return r;
                    r++
                }
                return -1
            }
            function _(t) {
                return Array.prototype.slice.call(t, 0)
            }
            function E(t, e, n) {
                for (var r = [], i = [], o = 0; o < t.length; ) {
                    var a = e ? t[o][e] : t[o];
                    T(i, a) < 0 && r.push(t[o]),
                    i[o] = a,
                    o++
                }
                return n && (r = e ? r.sort(function(t, n) {
                    return t[e] > n[e]
                }) : r.sort()),
                r
            }
            function O(t, e) {
                for (var n, r, i = e[0].toUpperCase() + e.slice(1), o = 0; o < vt.length; ) {
                    if (n = vt[o],
                    (r = n ? n + i : e)in t)
                        return r;
                    o++
                }
                return s
            }
            function x() {
                return Et++
            }
            function A(t) {
                var e = t.ownerDocument || t;
                return e.defaultView || e.parentWindow || i
            }
            function C(t, e) {
                var n = this;
                this.manager = t,
                this.callback = e,
                this.element = t.element,
                this.target = t.options.inputTarget,
                this.domHandler = function(e) {
                    d(t.options.enable, [t]) && n.handler(e)
                }
                ,
                this.init()
            }
            function k(t) {
                var e = t.options.inputClass;
                return new (e || (At ? U : Ct ? Y : xt ? B : H))(t,S)
            }
            function S(t, e, n) {
                var r = n.pointers.length
                  , i = n.changedPointers.length
                  , o = e & St && r - i == 0
                  , a = e & ($t | Rt) && r - i == 0;
                n.isFirst = !!o,
                n.isFinal = !!a,
                o && (t.session = {}),
                n.eventType = e,
                j(t, n),
                t.emit("hammer.input", n),
                t.recognize(n),
                t.session.prevInput = n
            }
            function j(t, e) {
                var n = t.session
                  , r = e.pointers
                  , i = r.length;
                n.firstInput || (n.firstInput = M(e)),
                i > 1 && !n.firstMultiple ? n.firstMultiple = M(e) : 1 === i && (n.firstMultiple = !1);
                var o = n.firstInput
                  , a = n.firstMultiple
                  , s = a ? a.center : o.center
                  , u = e.center = I(r);
                e.timeStamp = wt(),
                e.deltaTime = e.timeStamp - o.timeStamp,
                e.angle = N(s, u),
                e.distance = D(s, u),
                $(n, e),
                e.offsetDirection = z(e.deltaX, e.deltaY);
                var c = P(e.deltaTime, e.deltaX, e.deltaY);
                e.overallVelocityX = c.x,
                e.overallVelocityY = c.y,
                e.overallVelocity = bt(c.x) > bt(c.y) ? c.x : c.y,
                e.scale = a ? L(a.pointers, r) : 1,
                e.rotation = a ? q(a.pointers, r) : 0,
                e.maxPointers = n.prevInput ? e.pointers.length > n.prevInput.maxPointers ? e.pointers.length : n.prevInput.maxPointers : e.pointers.length,
                R(n, e);
                var h = t.element;
                g(e.srcEvent.target, h) && (h = e.srcEvent.target),
                e.target = h
            }
            function $(t, e) {
                var n = e.center
                  , r = t.offsetDelta || {}
                  , i = t.prevDelta || {}
                  , o = t.prevInput || {};
                e.eventType !== St && o.eventType !== $t || (i = t.prevDelta = {
                    x: o.deltaX || 0,
                    y: o.deltaY || 0
                },
                r = t.offsetDelta = {
                    x: n.x,
                    y: n.y
                }),
                e.deltaX = i.x + (n.x - r.x),
                e.deltaY = i.y + (n.y - r.y)
            }
            function R(t, e) {
                var n, r, i, o, a = t.lastInterval || e, u = e.timeStamp - a.timeStamp;
                if (e.eventType != Rt && (u > kt || a.velocity === s)) {
                    var c = e.deltaX - a.deltaX
                      , h = e.deltaY - a.deltaY
                      , p = P(u, c, h);
                    r = p.x,
                    i = p.y,
                    n = bt(p.x) > bt(p.y) ? p.x : p.y,
                    o = z(c, h),
                    t.lastInterval = e
                } else
                    n = a.velocity,
                    r = a.velocityX,
                    i = a.velocityY,
                    o = a.direction;
                e.velocity = n,
                e.velocityX = r,
                e.velocityY = i,
                e.direction = o
            }
            function M(t) {
                for (var e = [], n = 0; n < t.pointers.length; )
                    e[n] = {
                        clientX: gt(t.pointers[n].clientX),
                        clientY: gt(t.pointers[n].clientY)
                    },
                    n++;
                return {
                    timeStamp: wt(),
                    pointers: e,
                    center: I(e),
                    deltaX: t.deltaX,
                    deltaY: t.deltaY
                }
            }
            function I(t) {
                var e = t.length;
                if (1 === e)
                    return {
                        x: gt(t[0].clientX),
                        y: gt(t[0].clientY)
                    };
                for (var n = 0, r = 0, i = 0; i < e; )
                    n += t[i].clientX,
                    r += t[i].clientY,
                    i++;
                return {
                    x: gt(n / e),
                    y: gt(r / e)
                }
            }
            function P(t, e, n) {
                return {
                    x: e / t || 0,
                    y: n / t || 0
                }
            }
            function z(t, e) {
                return t === e ? Mt : bt(t) >= bt(e) ? t < 0 ? It : Pt : e < 0 ? zt : Dt
            }
            function D(t, e, n) {
                n || (n = Ht);
                var r = e[n[0]] - t[n[0]]
                  , i = e[n[1]] - t[n[1]];
                return Math.sqrt(r * r + i * i)
            }
            function N(t, e, n) {
                n || (n = Ht);
                var r = e[n[0]] - t[n[0]]
                  , i = e[n[1]] - t[n[1]];
                return 180 * Math.atan2(i, r) / Math.PI
            }
            function q(t, e) {
                return N(e[1], e[0], Ut) + N(t[1], t[0], Ut)
            }
            function L(t, e) {
                return D(e[0], e[1], Ut) / D(t[0], t[1], Ut)
            }
            function H() {
                this.evEl = Xt,
                this.evWin = Yt,
                this.pressed = !1,
                C.apply(this, arguments)
            }
            function U() {
                this.evEl = Gt,
                this.evWin = Wt,
                C.apply(this, arguments),
                this.store = this.manager.session.pointerEvents = []
            }
            function F() {
                this.evTarget = Jt,
                this.evWin = Zt,
                this.started = !1,
                C.apply(this, arguments)
            }
            function X(t, e) {
                var n = _(t.touches)
                  , r = _(t.changedTouches);
                return e & ($t | Rt) && (n = E(n.concat(r), "identifier", !0)),
                [n, r]
            }
            function Y() {
                this.evTarget = te,
                this.targetIds = {},
                C.apply(this, arguments)
            }
            function V(t, e) {
                var n = _(t.touches)
                  , r = this.targetIds;
                if (e & (St | jt) && 1 === n.length)
                    return r[n[0].identifier] = !0,
                    [n, n];
                var i, o, a = _(t.changedTouches), s = [], u = this.target;
                if (o = n.filter(function(t) {
                    return g(t.target, u)
                }),
                e === St)
                    for (i = 0; i < o.length; )
                        r[o[i].identifier] = !0,
                        i++;
                for (i = 0; i < a.length; )
                    r[a[i].identifier] && s.push(a[i]),
                    e & ($t | Rt) && delete r[a[i].identifier],
                    i++;
                return s.length ? [E(o.concat(s), "identifier", !0), s] : void 0
            }
            function B() {
                C.apply(this, arguments);
                var t = l(this.handler, this);
                this.touch = new Y(this.manager,t),
                this.mouse = new H(this.manager,t),
                this.primaryTouch = null,
                this.lastTouches = []
            }
            function G(t, e) {
                t & St ? (this.primaryTouch = e.changedPointers[0].identifier,
                W.call(this, e)) : t & ($t | Rt) && W.call(this, e)
            }
            function W(t) {
                var e = t.changedPointers[0];
                if (e.identifier === this.primaryTouch) {
                    var n = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    this.lastTouches.push(n);
                    var r = this.lastTouches
                      , i = function() {
                        var t = r.indexOf(n);
                        t > -1 && r.splice(t, 1)
                    };
                    setTimeout(i, ee)
                }
            }
            function K(t) {
                for (var e = t.srcEvent.clientX, n = t.srcEvent.clientY, r = 0; r < this.lastTouches.length; r++) {
                    var i = this.lastTouches[r]
                      , o = Math.abs(e - i.x)
                      , a = Math.abs(n - i.y);
                    if (o <= ne && a <= ne)
                        return !0
                }
                return !1
            }
            function J(t, e) {
                this.manager = t,
                this.set(e)
            }
            function Z(t) {
                if (b(t, se))
                    return se;
                var e = b(t, ue)
                  , n = b(t, ce);
                return e && n ? se : e || n ? e ? ue : ce : b(t, ae) ? ae : oe
            }
            function Q(t) {
                this.options = dt({}, this.defaults, t || {}),
                this.id = x(),
                this.manager = null,
                this.options.enable = v(this.options.enable, !0),
                this.state = pe,
                this.simultaneous = {},
                this.requireFail = []
            }
            function tt(t) {
                return t & me ? "cancel" : t & de ? "end" : t & le ? "move" : t & fe ? "start" : ""
            }
            function et(t) {
                return t == Dt ? "down" : t == zt ? "up" : t == It ? "left" : t == Pt ? "right" : ""
            }
            function nt(t, e) {
                var n = e.manager;
                return n ? n.get(t) : t
            }
            function rt() {
                Q.apply(this, arguments)
            }
            function it() {
                rt.apply(this, arguments),
                this.pX = null,
                this.pY = null
            }
            function ot() {
                rt.apply(this, arguments)
            }
            function at() {
                Q.apply(this, arguments),
                this._timer = null,
                this._input = null
            }
            function st() {
                rt.apply(this, arguments)
            }
            function ut() {
                rt.apply(this, arguments)
            }
            function ct() {
                Q.apply(this, arguments),
                this.pTime = !1,
                this.pCenter = !1,
                this._timer = null,
                this._input = null,
                this.count = 0
            }
            function ht(t, e) {
                return e = e || {},
                e.recognizers = v(e.recognizers, ht.defaults.preset),
                new pt(t,e)
            }
            function pt(t, e) {
                this.options = dt({}, ht.defaults, e || {}),
                this.options.inputTarget = this.options.inputTarget || t,
                this.handlers = {},
                this.session = {},
                this.recognizers = [],
                this.oldCssProps = {},
                this.element = t,
                this.input = k(this),
                this.touchAction = new J(this,this.options.touchAction),
                ft(this, !0),
                h(this.options.recognizers, function(t) {
                    var e = this.add(new t[0](t[1]));
                    t[2] && e.recognizeWith(t[2]),
                    t[3] && e.requireFailure(t[3])
                }, this)
            }
            function ft(t, e) {
                var n = t.element;
                if (n.style) {
                    var r;
                    h(t.options.cssProps, function(i, o) {
                        r = O(n.style, o),
                        e ? (t.oldCssProps[r] = n.style[r],
                        n.style[r] = i) : n.style[r] = t.oldCssProps[r] || ""
                    }),
                    e || (t.oldCssProps = {})
                }
            }
            function lt(t, e) {
                var n = o.createEvent("Event");
                n.initEvent(t, !0, !0),
                n.gesture = e,
                e.target.dispatchEvent(n)
            }
            var dt, vt = ["", "webkit", "Moz", "MS", "ms", "o"], mt = o.createElement("div"), yt = "function", gt = Math.round, bt = Math.abs, wt = Date.now;
            dt = "function" != typeof Object.assign ? function(t) {
                if (t === s || null === t)
                    throw new TypeError("Cannot convert undefined or null to object");
                for (var e = Object(t), n = 1; n < arguments.length; n++) {
                    var r = arguments[n];
                    if (r !== s && null !== r)
                        for (var i in r)
                            r.hasOwnProperty(i) && (e[i] = r[i])
                }
                return e
            }
            : Object.assign;
            var Tt = p(function(t, e, n) {
                for (var r = Object.keys(e), i = 0; i < r.length; )
                    (!n || n && t[r[i]] === s) && (t[r[i]] = e[r[i]]),
                    i++;
                return t
            }, "extend", "Use `assign`.")
              , _t = p(function(t, e) {
                return Tt(t, e, !0)
            }, "merge", "Use `assign`.")
              , Et = 1
              , Ot = /mobile|tablet|ip(ad|hone|od)|android/i
              , xt = "ontouchstart"in i
              , At = O(i, "PointerEvent") !== s
              , Ct = xt && Ot.test(navigator.userAgent)
              , kt = 25
              , St = 1
              , jt = 2
              , $t = 4
              , Rt = 8
              , Mt = 1
              , It = 2
              , Pt = 4
              , zt = 8
              , Dt = 16
              , Nt = It | Pt
              , qt = zt | Dt
              , Lt = Nt | qt
              , Ht = ["x", "y"]
              , Ut = ["clientX", "clientY"];
            C.prototype = {
                handler: function() {},
                init: function() {
                    this.evEl && m(this.element, this.evEl, this.domHandler),
                    this.evTarget && m(this.target, this.evTarget, this.domHandler),
                    this.evWin && m(A(this.element), this.evWin, this.domHandler)
                },
                destroy: function() {
                    this.evEl && y(this.element, this.evEl, this.domHandler),
                    this.evTarget && y(this.target, this.evTarget, this.domHandler),
                    this.evWin && y(A(this.element), this.evWin, this.domHandler)
                }
            };
            var Ft = {
                mousedown: St,
                mousemove: jt,
                mouseup: $t
            }
              , Xt = "mousedown"
              , Yt = "mousemove mouseup";
            f(H, C, {
                handler: function(t) {
                    var e = Ft[t.type];
                    e & St && 0 === t.button && (this.pressed = !0),
                    e & jt && 1 !== t.which && (e = $t),
                    this.pressed && (e & $t && (this.pressed = !1),
                    this.callback(this.manager, e, {
                        pointers: [t],
                        changedPointers: [t],
                        pointerType: "mouse",
                        srcEvent: t
                    }))
                }
            });
            var Vt = {
                pointerdown: St,
                pointermove: jt,
                pointerup: $t,
                pointercancel: Rt,
                pointerout: Rt
            }
              , Bt = {
                2: "touch",
                3: "pen",
                4: "mouse",
                5: "kinect"
            }
              , Gt = "pointerdown"
              , Wt = "pointermove pointerup pointercancel";
            i.MSPointerEvent && !i.PointerEvent && (Gt = "MSPointerDown",
            Wt = "MSPointerMove MSPointerUp MSPointerCancel"),
            f(U, C, {
                handler: function(t) {
                    var e = this.store
                      , n = !1
                      , r = t.type.toLowerCase().replace("ms", "")
                      , i = Vt[r]
                      , o = Bt[t.pointerType] || t.pointerType
                      , a = "touch" == o
                      , s = T(e, t.pointerId, "pointerId");
                    i & St && (0 === t.button || a) ? s < 0 && (e.push(t),
                    s = e.length - 1) : i & ($t | Rt) && (n = !0),
                    s < 0 || (e[s] = t,
                    this.callback(this.manager, i, {
                        pointers: e,
                        changedPointers: [t],
                        pointerType: o,
                        srcEvent: t
                    }),
                    n && e.splice(s, 1))
                }
            });
            var Kt = {
                touchstart: St,
                touchmove: jt,
                touchend: $t,
                touchcancel: Rt
            }
              , Jt = "touchstart"
              , Zt = "touchstart touchmove touchend touchcancel";
            f(F, C, {
                handler: function(t) {
                    var e = Kt[t.type];
                    if (e === St && (this.started = !0),
                    this.started) {
                        var n = X.call(this, t, e);
                        e & ($t | Rt) && n[0].length - n[1].length == 0 && (this.started = !1),
                        this.callback(this.manager, e, {
                            pointers: n[0],
                            changedPointers: n[1],
                            pointerType: "touch",
                            srcEvent: t
                        })
                    }
                }
            });
            var Qt = {
                touchstart: St,
                touchmove: jt,
                touchend: $t,
                touchcancel: Rt
            }
              , te = "touchstart touchmove touchend touchcancel";
            f(Y, C, {
                handler: function(t) {
                    var e = Qt[t.type]
                      , n = V.call(this, t, e);
                    n && this.callback(this.manager, e, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: "touch",
                        srcEvent: t
                    })
                }
            });
            var ee = 2500
              , ne = 25;
            f(B, C, {
                handler: function(t, e, n) {
                    var r = "touch" == n.pointerType
                      , i = "mouse" == n.pointerType;
                    if (!(i && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
                        if (r)
                            G.call(this, e, n);
                        else if (i && K.call(this, n))
                            return;
                        this.callback(t, e, n)
                    }
                },
                destroy: function() {
                    this.touch.destroy(),
                    this.mouse.destroy()
                }
            });
            var re = O(mt.style, "touchAction")
              , ie = re !== s
              , oe = "auto"
              , ae = "manipulation"
              , se = "none"
              , ue = "pan-x"
              , ce = "pan-y"
              , he = function() {
                if (!ie)
                    return !1;
                var t = {}
                  , e = i.CSS && i.CSS.supports;
                return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(n) {
                    t[n] = !e || i.CSS.supports("touch-action", n)
                }),
                t
            }();
            J.prototype = {
                set: function(t) {
                    "compute" == t && (t = this.compute()),
                    ie && this.manager.element.style && he[t] && (this.manager.element.style[re] = t),
                    this.actions = t.toLowerCase().trim()
                },
                update: function() {
                    this.set(this.manager.options.touchAction)
                },
                compute: function() {
                    var t = [];
                    return h(this.manager.recognizers, function(e) {
                        d(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                    }),
                    Z(t.join(" "))
                },
                preventDefaults: function(t) {
                    var e = t.srcEvent
                      , n = t.offsetDirection;
                    if (this.manager.session.prevented)
                        return void e.preventDefault();
                    var r = this.actions
                      , i = b(r, se) && !he[se]
                      , o = b(r, ce) && !he[ce]
                      , a = b(r, ue) && !he[ue];
                    if (i) {
                        var s = 1 === t.pointers.length
                          , u = t.distance < 2
                          , c = t.deltaTime < 250;
                        if (s && u && c)
                            return
                    }
                    return a && o ? void 0 : i || o && n & Nt || a && n & qt ? this.preventSrc(e) : void 0
                },
                preventSrc: function(t) {
                    this.manager.session.prevented = !0,
                    t.preventDefault()
                }
            };
            var pe = 1
              , fe = 2
              , le = 4
              , de = 8
              , ve = de
              , me = 16;
            Q.prototype = {
                defaults: {},
                set: function(t) {
                    return dt(this.options, t),
                    this.manager && this.manager.touchAction.update(),
                    this
                },
                recognizeWith: function(t) {
                    if (c(t, "recognizeWith", this))
                        return this;
                    var e = this.simultaneous;
                    return t = nt(t, this),
                    e[t.id] || (e[t.id] = t,
                    t.recognizeWith(this)),
                    this
                },
                dropRecognizeWith: function(t) {
                    return c(t, "dropRecognizeWith", this) ? this : (t = nt(t, this),
                    delete this.simultaneous[t.id],
                    this)
                },
                requireFailure: function(t) {
                    if (c(t, "requireFailure", this))
                        return this;
                    var e = this.requireFail;
                    return t = nt(t, this),
                    -1 === T(e, t) && (e.push(t),
                    t.requireFailure(this)),
                    this
                },
                dropRequireFailure: function(t) {
                    if (c(t, "dropRequireFailure", this))
                        return this;
                    t = nt(t, this);
                    var e = T(this.requireFail, t);
                    return e > -1 && this.requireFail.splice(e, 1),
                    this
                },
                hasRequireFailures: function() {
                    return this.requireFail.length > 0
                },
                canRecognizeWith: function(t) {
                    return !!this.simultaneous[t.id]
                },
                emit: function(t) {
                    function e(e) {
                        n.manager.emit(e, t)
                    }
                    var n = this
                      , r = this.state;
                    r < de && e(n.options.event + tt(r)),
                    e(n.options.event),
                    t.additionalEvent && e(t.additionalEvent),
                    r >= de && e(n.options.event + tt(r))
                },
                tryEmit: function(t) {
                    if (this.canEmit())
                        return this.emit(t);
                    this.state = 32
                },
                canEmit: function() {
                    for (var t = 0; t < this.requireFail.length; ) {
                        if (!(this.requireFail[t].state & (32 | pe)))
                            return !1;
                        t++
                    }
                    return !0
                },
                recognize: function(t) {
                    var e = dt({}, t);
                    if (!d(this.options.enable, [this, e]))
                        return this.reset(),
                        void (this.state = 32);
                    this.state & (ve | me | 32) && (this.state = pe),
                    this.state = this.process(e),
                    this.state & (fe | le | de | me) && this.tryEmit(e)
                },
                process: function(t) {},
                getTouchAction: function() {},
                reset: function() {}
            },
            f(rt, Q, {
                defaults: {
                    pointers: 1
                },
                attrTest: function(t) {
                    var e = this.options.pointers;
                    return 0 === e || t.pointers.length === e
                },
                process: function(t) {
                    var e = this.state
                      , n = t.eventType
                      , r = e & (fe | le)
                      , i = this.attrTest(t);
                    return r && (n & Rt || !i) ? e | me : r || i ? n & $t ? e | de : e & fe ? e | le : fe : 32
                }
            }),
            f(it, rt, {
                defaults: {
                    event: "pan",
                    threshold: 10,
                    pointers: 1,
                    direction: Lt
                },
                getTouchAction: function() {
                    var t = this.options.direction
                      , e = [];
                    return t & Nt && e.push(ce),
                    t & qt && e.push(ue),
                    e
                },
                directionTest: function(t) {
                    var e = this.options
                      , n = !0
                      , r = t.distance
                      , i = t.direction
                      , o = t.deltaX
                      , a = t.deltaY;
                    return i & e.direction || (e.direction & Nt ? (i = 0 === o ? Mt : o < 0 ? It : Pt,
                    n = o != this.pX,
                    r = Math.abs(t.deltaX)) : (i = 0 === a ? Mt : a < 0 ? zt : Dt,
                    n = a != this.pY,
                    r = Math.abs(t.deltaY))),
                    t.direction = i,
                    n && r > e.threshold && i & e.direction
                },
                attrTest: function(t) {
                    return rt.prototype.attrTest.call(this, t) && (this.state & fe || !(this.state & fe) && this.directionTest(t))
                },
                emit: function(t) {
                    this.pX = t.deltaX,
                    this.pY = t.deltaY;
                    var e = et(t.direction);
                    e && (t.additionalEvent = this.options.event + e),
                    this._super.emit.call(this, t)
                }
            }),
            f(ot, rt, {
                defaults: {
                    event: "pinch",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [se]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & fe)
                },
                emit: function(t) {
                    if (1 !== t.scale) {
                        var e = t.scale < 1 ? "in" : "out";
                        t.additionalEvent = this.options.event + e
                    }
                    this._super.emit.call(this, t)
                }
            }),
            f(at, Q, {
                defaults: {
                    event: "press",
                    pointers: 1,
                    time: 251,
                    threshold: 9
                },
                getTouchAction: function() {
                    return [oe]
                },
                process: function(t) {
                    var e = this.options
                      , n = t.pointers.length === e.pointers
                      , r = t.distance < e.threshold
                      , i = t.deltaTime > e.time;
                    if (this._input = t,
                    !r || !n || t.eventType & ($t | Rt) && !i)
                        this.reset();
                    else if (t.eventType & St)
                        this.reset(),
                        this._timer = u(function() {
                            this.state = ve,
                            this.tryEmit()
                        }, e.time, this);
                    else if (t.eventType & $t)
                        return ve;
                    return 32
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function(t) {
                    this.state === ve && (t && t.eventType & $t ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = wt(),
                    this.manager.emit(this.options.event, this._input)))
                }
            }),
            f(st, rt, {
                defaults: {
                    event: "rotate",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [se]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & fe)
                }
            }),
            f(ut, rt, {
                defaults: {
                    event: "swipe",
                    threshold: 10,
                    velocity: .3,
                    direction: Nt | qt,
                    pointers: 1
                },
                getTouchAction: function() {
                    return it.prototype.getTouchAction.call(this)
                },
                attrTest: function(t) {
                    var e, n = this.options.direction;
                    return n & (Nt | qt) ? e = t.overallVelocity : n & Nt ? e = t.overallVelocityX : n & qt && (e = t.overallVelocityY),
                    this._super.attrTest.call(this, t) && n & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && bt(e) > this.options.velocity && t.eventType & $t
                },
                emit: function(t) {
                    var e = et(t.offsetDirection);
                    e && this.manager.emit(this.options.event + e, t),
                    this.manager.emit(this.options.event, t)
                }
            }),
            f(ct, Q, {
                defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 9,
                    posThreshold: 10
                },
                getTouchAction: function() {
                    return [ae]
                },
                process: function(t) {
                    var e = this.options
                      , n = t.pointers.length === e.pointers
                      , r = t.distance < e.threshold
                      , i = t.deltaTime < e.time;
                    if (this.reset(),
                    t.eventType & St && 0 === this.count)
                        return this.failTimeout();
                    if (r && i && n) {
                        if (t.eventType != $t)
                            return this.failTimeout();
                        var o = !this.pTime || t.timeStamp - this.pTime < e.interval
                          , a = !this.pCenter || D(this.pCenter, t.center) < e.posThreshold;
                        this.pTime = t.timeStamp,
                        this.pCenter = t.center,
                        a && o ? this.count += 1 : this.count = 1,
                        this._input = t;
                        if (0 === this.count % e.taps)
                            return this.hasRequireFailures() ? (this._timer = u(function() {
                                this.state = ve,
                                this.tryEmit()
                            }, e.interval, this),
                            fe) : ve
                    }
                    return 32
                },
                failTimeout: function() {
                    return this._timer = u(function() {
                        this.state = 32
                    }, this.options.interval, this),
                    32
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function() {
                    this.state == ve && (this._input.tapCount = this.count,
                    this.manager.emit(this.options.event, this._input))
                }
            }),
            ht.VERSION = "2.0.7",
            ht.defaults = {
                domEvents: !1,
                touchAction: "compute",
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [[st, {
                    enable: !1
                }], [ot, {
                    enable: !1
                }, ["rotate"]], [ut, {
                    direction: Nt
                }], [it, {
                    direction: Nt
                }, ["swipe"]], [ct], [ct, {
                    event: "doubletap",
                    taps: 2
                }, ["tap"]], [at]],
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                }
            };
            pt.prototype = {
                set: function(t) {
                    return dt(this.options, t),
                    t.touchAction && this.touchAction.update(),
                    t.inputTarget && (this.input.destroy(),
                    this.input.target = t.inputTarget,
                    this.input.init()),
                    this
                },
                stop: function(t) {
                    this.session.stopped = t ? 2 : 1
                },
                recognize: function(t) {
                    var e = this.session;
                    if (!e.stopped) {
                        this.touchAction.preventDefaults(t);
                        var n, r = this.recognizers, i = e.curRecognizer;
                        (!i || i && i.state & ve) && (i = e.curRecognizer = null);
                        for (var o = 0; o < r.length; )
                            n = r[o],
                            2 === e.stopped || i && n != i && !n.canRecognizeWith(i) ? n.reset() : n.recognize(t),
                            !i && n.state & (fe | le | de) && (i = e.curRecognizer = n),
                            o++
                    }
                },
                get: function(t) {
                    if (t instanceof Q)
                        return t;
                    for (var e = this.recognizers, n = 0; n < e.length; n++)
                        if (e[n].options.event == t)
                            return e[n];
                    return null
                },
                add: function(t) {
                    if (c(t, "add", this))
                        return this;
                    var e = this.get(t.options.event);
                    return e && this.remove(e),
                    this.recognizers.push(t),
                    t.manager = this,
                    this.touchAction.update(),
                    t
                },
                remove: function(t) {
                    if (c(t, "remove", this))
                        return this;
                    if (t = this.get(t)) {
                        var e = this.recognizers
                          , n = T(e, t);
                        -1 !== n && (e.splice(n, 1),
                        this.touchAction.update())
                    }
                    return this
                },
                on: function(t, e) {
                    if (t !== s && e !== s) {
                        var n = this.handlers;
                        return h(w(t), function(t) {
                            n[t] = n[t] || [],
                            n[t].push(e)
                        }),
                        this
                    }
                },
                off: function(t, e) {
                    if (t !== s) {
                        var n = this.handlers;
                        return h(w(t), function(t) {
                            e ? n[t] && n[t].splice(T(n[t], e), 1) : delete n[t]
                        }),
                        this
                    }
                },
                emit: function(t, e) {
                    this.options.domEvents && lt(t, e);
                    var n = this.handlers[t] && this.handlers[t].slice();
                    if (n && n.length) {
                        e.type = t,
                        e.preventDefault = function() {
                            e.srcEvent.preventDefault()
                        }
                        ;
                        for (var r = 0; r < n.length; )
                            n[r](e),
                            r++
                    }
                },
                destroy: function() {
                    this.element && ft(this, !1),
                    this.handlers = {},
                    this.session = {},
                    this.input.destroy(),
                    this.element = null
                }
            },
            dt(ht, {
                INPUT_START: St,
                INPUT_MOVE: jt,
                INPUT_END: $t,
                INPUT_CANCEL: Rt,
                STATE_POSSIBLE: pe,
                STATE_BEGAN: fe,
                STATE_CHANGED: le,
                STATE_ENDED: de,
                STATE_RECOGNIZED: ve,
                STATE_CANCELLED: me,
                STATE_FAILED: 32,
                DIRECTION_NONE: Mt,
                DIRECTION_LEFT: It,
                DIRECTION_RIGHT: Pt,
                DIRECTION_UP: zt,
                DIRECTION_DOWN: Dt,
                DIRECTION_HORIZONTAL: Nt,
                DIRECTION_VERTICAL: qt,
                DIRECTION_ALL: Lt,
                Manager: pt,
                Input: C,
                TouchAction: J,
                TouchInput: Y,
                MouseInput: H,
                PointerEventInput: U,
                TouchMouseInput: B,
                SingleTouchInput: F,
                Recognizer: Q,
                AttrRecognizer: rt,
                Tap: ct,
                Pan: it,
                Swipe: ut,
                Pinch: ot,
                Rotate: st,
                Press: at,
                on: m,
                off: y,
                each: h,
                merge: _t,
                extend: Tt,
                assign: dt,
                inherit: f,
                bindFn: l,
                prefixed: O
            }),
            (void 0 !== i ? i : "undefined" != typeof self ? self : {}).Hammer = ht,
            (r = function() {
                return ht
            }
            .call(e, n, e, t)) !== s && (t.exports = r)
        }(window, document)
    }
}, [1189]);
