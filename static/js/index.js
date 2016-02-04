define("template", ["jquery"], function (t) {
    "use strict";
    return function (e, n) {
        var r;
        return r = e || "", t.each(n, function (e, n) {
            var a, i;
            a = typeof n, i = new RegExp("{{\\s*" + e + "\\s*}}", "g"), "object" === a && null !== n ? t.each(n, function (t, n) {
                var a;
                a = new RegExp("{{\\s*" + e + "." + t + "\\s*}}", "g"), r = r.replace(a, n)
            }) : r = r.replace(i, n)
        }), r
    }
}), define("sfModal", ["jquery", "template"], function (t, e) {
    "use strict";
    return function (n) {
        var r, a;
        if ("object" != typeof n) {
            if ("hide" === n)return void t(".sfmodal").modal("hide");
            if ("toggle" === n)return void t(".sfmodal").modal("toggle");
            n = {content: n, hideDone: !0}
        }
        r = t.extend({
            hideTitle: !1,
            hideFooter: !1,
            modalSize: "",
            title: "警告：前方高能！",
            content: "玩脱了",
            wrapper: null,
            $content: null,
            hideClose: !1,
            closeText: "取消",
            closeClass: "btn-default",
            backdrop: !0,
            closeFn: function () {
            },
            hideDone: !1,
            doneText: "确认",
            doneClass: "btn-primary",
            doneFn: function () {
                t(".sfmodal").modal("hide")
            },
            show: function () {
            },
            shown: function () {
            },
            hide: function () {
            },
            hidden: function () {
            },
            loaded: function () {
            }
        }, n), a = '<div class="sfmodal modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">  <div class="modal-dialog {{modalSize}}">    <div class="modal-content">      ' + (r.hideTitle ? "" : '<div class="modal-header">        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>        <h4 class="modal-title">{{title}}</h4>      </div>') + '<div class="modal-body">        <p class="sfModal-content">          </div>          <div class="modal-footer ' + (r.hideFooter ? "hidden" : "") + '">' + (r.hideClose ? "" : '<button type="button" class="btn {{closeClass}}" data-dismiss="modal">{{closeText}}</button>') + (r.hideDone ? "" : '<button type="button" class="btn {{doneClass}} done-btn">{{doneText}}</button>') + "</div>        </div>      </div>    </div>", t(".sfmodal").length > 0 && (t(".sfmodal").remove(), t(".modal-backdrop").remove()), r.wrapper ? (t(r.wrapper).append(e(a, r)), t(r.wrapper).append('<div class="modal-backdrop in"></div>')) : t("body").append(e(a, r)), r.$content ? t(".sfmodal .sfModal-content").append(r.$content) : t(".sfmodal .sfModal-content").html(r.content), t(".sfmodal").modal({
            keyboard: !0,
            backdrop: r.backdrop
        }), t(".sfmodal").on("show.bs.modal", r.show).on("shown.bs.modal", r.shown).on("hide.bs.modal", function (e) {
            r.hide(e), r.wrapper && t(".modal-backdrop").remove()
        }).on("hidden.bs.modal", r.hidden).on("loaded.bs.modal", r.loaded).modal("show"), t(".sfmodal .done-btn").click(function (e) {
            r.doneFn(e), r.wrapper && t(".modal-backdrop").remove()
        }), t(".sfmodal .close-btn").click(function (e) {
            r.closeFn(e), r.wrapper && t(".modal-backdrop").remove()
        })
    }
}), define("mobile", ["jquery"], function (t) {
    return window.innerWidth > 767 ? {
        login: null,
        signup: null
    } : (t(".hate, .like").data("toggle", "false"), {
        login: function () {
            location.href = "/user/login"
        }, signup: function () {
            location.href = "/user/register"
        }
    })
}), function (t) {
    t.fn.hoverIntent = function (e, n, r, a) {
        var i = {interval: a || 400, sensitivity: 5, timeout: 600};
        i = "object" == typeof e ? t.extend(i, e) : t.isFunction(n) ? t.extend(i, {
            over: e,
            out: n,
            selector: r
        }) : t.extend(i, {over: e, out: e, selector: n});
        var o, s, l, c, u = function (t) {
            o = t.pageX, s = t.pageY
        }, h = function (e, n) {
            return n.hoverIntent_t = clearTimeout(n.hoverIntent_t), Math.sqrt((l - o) * (l - o) + (c - s) * (c - s)) < i.sensitivity ? (t(n).off("mousemove.hoverIntent", u), n.hoverIntent_s = !0, i.over.apply(n, [e])) : (l = o, c = s, n.hoverIntent_t = setTimeout(function () {
                h(e, n)
            }, i.interval), void 0)
        }, p = function (t, e) {
            return e.hoverIntent_t = clearTimeout(e.hoverIntent_t), e.hoverIntent_s = !1, i.out.apply(e, [t])
        }, d = function (e) {
            var n = t.extend({}, e), r = this;
            r.hoverIntent_t && (r.hoverIntent_t = clearTimeout(r.hoverIntent_t)), "mouseenter" === e.type ? (l = n.pageX, c = n.pageY, t(r).on("mousemove.hoverIntent", u), r.hoverIntent_s || (r.hoverIntent_t = setTimeout(function () {
                h(n, r)
            }, i.interval))) : (t(r).off("mousemove.hoverIntent", u), r.hoverIntent_s && (r.hoverIntent_t = setTimeout(function () {
                p(n, r)
            }, i.timeout)))
        };
        return this.on({"mouseenter.hoverIntent": d, "mouseleave.hoverIntent": d}, i.selector)
    }
}(jQuery), define("jquery_hoverIntent", ["jquery"], function (t) {
    return function () {
        var e;
        return e || t.$.fn.hoverIntent
    }
}(this)), define("sfAjax", ["jquery"], function (t) {
    "use strict";
    t.sfAjax = function (e, n, r, a) {
        var i, o, s, l;
        o = t.extend({
            id: e.data("id"),
            "do": e.data("do"),
            type: e.data("type")
        }, r), i = o["do"], s = i.indexOf("/cancel") > 0 ? i.replace("/cancel", "") : i + "/cancel", l = "/api/" + o.type + "/" + o.id + "/" + o["do"], t.post(l, function (t) {
            0 === t.status ? (e.data("do", s), n ? n(t) : location.reload()) : a && a(t)
        })
    }
}), function (t) {
    "function" == typeof define && define.amd ? define("jquery_cookie", ["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (t) {
    function e(t) {
        return s.raw ? t : encodeURIComponent(t)
    }

    function n(t) {
        return s.raw ? t : decodeURIComponent(t)
    }

    function r(t) {
        return e(s.json ? JSON.stringify(t) : String(t))
    }

    function a(t) {
        0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return t = decodeURIComponent(t.replace(o, " ")), s.json ? JSON.parse(t) : t
        } catch (e) {
        }
    }

    function i(e, n) {
        var r = s.raw ? e : a(e);
        return t.isFunction(n) ? n(r) : r
    }

    var o = /\+/g, s = t.cookie = function (a, o, l) {
        if (void 0 !== o && !t.isFunction(o)) {
            if (l = t.extend({}, s.defaults, l), "number" == typeof l.expires) {
                var c = l.expires, u = l.expires = new Date;
                u.setTime(+u + 864e5 * c)
            }
            return document.cookie = [e(a), "=", r(o), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
        }
        for (var h = a ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], d = 0, f = p.length; f > d; d++) {
            var m = p[d].split("="), g = n(m.shift()), v = m.join("=");
            if (a && a === g) {
                h = i(v, o);
                break
            }
            a || void 0 === (v = i(v)) || (h[g] = v)
        }
        return h
    };
    s.defaults = {}, t.removeCookie = function (e, n) {
        return void 0 === t.cookie(e) ? !1 : (t.cookie(e, "", t.extend({}, n, {expires: -1})), !t.cookie(e))
    }
}), function (t, e, n, r) {
    var a = t(e);
    t.fn.lazyload = function (i) {
        function o() {
            var e = 0;
            l.each(function () {
                var n = t(this);
                if (!c.skip_invisible || n.is(":visible"))if (t.abovethetop(this, c) || t.leftofbegin(this, c)); else if (t.belowthefold(this, c) || t.rightoffold(this, c)) {
                    if (++e > c.failure_limit)return !1
                } else n.trigger("appear"), e = 0
            })
        }

        var s, l = this, c = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: e,
            data_attribute: "original",
            skip_invisible: !0,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return i && (r !== i.failurelimit && (i.failure_limit = i.failurelimit, delete i.failurelimit), r !== i.effectspeed && (i.effect_speed = i.effectspeed, delete i.effectspeed), t.extend(c, i)), s = c.container === r || c.container === e ? a : t(c.container), 0 === c.event.indexOf("scroll") && s.bind(c.event, function () {
            return o()
        }), this.each(function () {
            var e = this, n = t(e);
            e.loaded = !1, (n.attr("src") === r || n.attr("src") === !1) && n.is("img") && n.attr("src", c.placeholder), n.one("appear", function () {
                if (!this.loaded) {
                    if (c.appear) {
                        var r = l.length;
                        c.appear.call(e, r, c)
                    }
                    t("<img />").bind("load", function () {
                        var r = n.attr("data-" + c.data_attribute);
                        n.hide(), n.is("img") ? n.attr("src", r) : n.css("background-image", "url('" + r + "')"), n[c.effect](c.effect_speed), e.loaded = !0;
                        var a = t.grep(l, function (t) {
                            return !t.loaded
                        });
                        if (l = t(a), c.load) {
                            var i = l.length;
                            c.load.call(e, i, c)
                        }
                    }).attr("src", n.attr("data-" + c.data_attribute))
                }
            }), 0 !== c.event.indexOf("scroll") && n.bind(c.event, function () {
                e.loaded || n.trigger("appear")
            })
        }), a.bind("resize", function () {
            o()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && a.bind("pageshow", function (e) {
            e.originalEvent && e.originalEvent.persisted && l.each(function () {
                t(this).trigger("appear")
            })
        }), t(n).ready(function () {
            o()
        }), this
    }, t.belowthefold = function (n, i) {
        var o;
        return o = i.container === r || i.container === e ? (e.innerHeight ? e.innerHeight : a.height()) + a.scrollTop() : t(i.container).offset().top + t(i.container).height(), o <= t(n).offset().top - i.threshold
    }, t.rightoffold = function (n, i) {
        var o;
        return o = i.container === r || i.container === e ? a.width() + a.scrollLeft() : t(i.container).offset().left + t(i.container).width(), o <= t(n).offset().left - i.threshold
    }, t.abovethetop = function (n, i) {
        var o;
        return o = i.container === r || i.container === e ? a.scrollTop() : t(i.container).offset().top, o >= t(n).offset().top + i.threshold + t(n).height()
    }, t.leftofbegin = function (n, i) {
        var o;
        return o = i.container === r || i.container === e ? a.scrollLeft() : t(i.container).offset().left, o >= t(n).offset().left + i.threshold + t(n).width()
    }, t.inviewport = function (e, n) {
        return !(t.rightoffold(e, n) || t.leftofbegin(e, n) || t.belowthefold(e, n) || t.abovethetop(e, n))
    }, t.extend(t.expr[":"], {
        "below-the-fold": function (e) {
            return t.belowthefold(e, {threshold: 0})
        }, "above-the-top": function (e) {
            return !t.belowthefold(e, {threshold: 0})
        }, "right-of-screen": function (e) {
            return t.rightoffold(e, {threshold: 0})
        }, "left-of-screen": function (e) {
            return !t.rightoffold(e, {threshold: 0})
        }, "in-viewport": function (e) {
            return t.inviewport(e, {threshold: 0})
        }, "above-the-fold": function (e) {
            return !t.belowthefold(e, {threshold: 0})
        }, "right-of-fold": function (e) {
            return t.rightoffold(e, {threshold: 0})
        }, "left-of-fold": function (e) {
            return !t.rightoffold(e, {threshold: 0})
        }
    })
}(jQuery, window, document), define("jquery_lazyload", ["jquery"], function (t) {
    return function () {
        var e;
        return e || t.$.fn.lazyload
    }
}(this)), function () {
    var t = this, e = t._, n = Array.prototype, r = Object.prototype, a = Function.prototype, i = n.push, o = n.slice, s = n.concat, l = r.toString, c = r.hasOwnProperty, u = Array.isArray, h = Object.keys, p = a.bind, d = function (t) {
        return t instanceof d ? t : this instanceof d ? void(this._wrapped = t) : new d(t)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = d), exports._ = d) : t._ = d, d.VERSION = "1.7.0";
    var f = function (t, e, n) {
        if (void 0 === e)return t;
        switch (null == n ? 3 : n) {
            case 1:
                return function (n) {
                    return t.call(e, n)
                };
            case 2:
                return function (n, r) {
                    return t.call(e, n, r)
                };
            case 3:
                return function (n, r, a) {
                    return t.call(e, n, r, a)
                };
            case 4:
                return function (n, r, a, i) {
                    return t.call(e, n, r, a, i)
                }
        }
        return function () {
            return t.apply(e, arguments)
        }
    };
    d.iteratee = function (t, e, n) {
        return null == t ? d.identity : d.isFunction(t) ? f(t, e, n) : d.isObject(t) ? d.matches(t) : d.property(t)
    }, d.each = d.forEach = function (t, e, n) {
        if (null == t)return t;
        e = f(e, n);
        var r, a = t.length;
        if (a === +a)for (r = 0; a > r; r++)e(t[r], r, t); else {
            var i = d.keys(t);
            for (r = 0, a = i.length; a > r; r++)e(t[i[r]], i[r], t)
        }
        return t
    }, d.map = d.collect = function (t, e, n) {
        if (null == t)return [];
        e = d.iteratee(e, n);
        for (var r, a = t.length !== +t.length && d.keys(t), i = (a || t).length, o = Array(i), s = 0; i > s; s++)r = a ? a[s] : s, o[s] = e(t[r], r, t);
        return o
    };
    var m = "Reduce of empty array with no initial value";
    d.reduce = d.foldl = d.inject = function (t, e, n, r) {
        null == t && (t = []), e = f(e, r, 4);
        var a, i = t.length !== +t.length && d.keys(t), o = (i || t).length, s = 0;
        if (arguments.length < 3) {
            if (!o)throw new TypeError(m);
            n = t[i ? i[s++] : s++]
        }
        for (; o > s; s++)a = i ? i[s] : s, n = e(n, t[a], a, t);
        return n
    }, d.reduceRight = d.foldr = function (t, e, n, r) {
        null == t && (t = []), e = f(e, r, 4);
        var a, i = t.length !== +t.length && d.keys(t), o = (i || t).length;
        if (arguments.length < 3) {
            if (!o)throw new TypeError(m);
            n = t[i ? i[--o] : --o]
        }
        for (; o--;)a = i ? i[o] : o, n = e(n, t[a], a, t);
        return n
    }, d.find = d.detect = function (t, e, n) {
        var r;
        return e = d.iteratee(e, n), d.some(t, function (t, n, a) {
            return e(t, n, a) ? (r = t, !0) : void 0
        }), r
    }, d.filter = d.select = function (t, e, n) {
        var r = [];
        return null == t ? r : (e = d.iteratee(e, n), d.each(t, function (t, n, a) {
            e(t, n, a) && r.push(t)
        }), r)
    }, d.reject = function (t, e, n) {
        return d.filter(t, d.negate(d.iteratee(e)), n)
    }, d.every = d.all = function (t, e, n) {
        if (null == t)return !0;
        e = d.iteratee(e, n);
        var r, a, i = t.length !== +t.length && d.keys(t), o = (i || t).length;
        for (r = 0; o > r; r++)if (a = i ? i[r] : r, !e(t[a], a, t))return !1;
        return !0
    }, d.some = d.any = function (t, e, n) {
        if (null == t)return !1;
        e = d.iteratee(e, n);
        var r, a, i = t.length !== +t.length && d.keys(t), o = (i || t).length;
        for (r = 0; o > r; r++)if (a = i ? i[r] : r, e(t[a], a, t))return !0;
        return !1
    }, d.contains = d.include = function (t, e) {
        return null == t ? !1 : (t.length !== +t.length && (t = d.values(t)), d.indexOf(t, e) >= 0)
    }, d.invoke = function (t, e) {
        var n = o.call(arguments, 2), r = d.isFunction(e);
        return d.map(t, function (t) {
            return (r ? e : t[e]).apply(t, n)
        })
    }, d.pluck = function (t, e) {
        return d.map(t, d.property(e))
    }, d.where = function (t, e) {
        return d.filter(t, d.matches(e))
    }, d.findWhere = function (t, e) {
        return d.find(t, d.matches(e))
    }, d.max = function (t, e, n) {
        var r, a, i = -1 / 0, o = -1 / 0;
        if (null == e && null != t) {
            t = t.length === +t.length ? t : d.values(t);
            for (var s = 0, l = t.length; l > s; s++)r = t[s], r > i && (i = r)
        } else e = d.iteratee(e, n), d.each(t, function (t, n, r) {
            a = e(t, n, r), (a > o || a === -1 / 0 && i === -1 / 0) && (i = t, o = a)
        });
        return i
    }, d.min = function (t, e, n) {
        var r, a, i = 1 / 0, o = 1 / 0;
        if (null == e && null != t) {
            t = t.length === +t.length ? t : d.values(t);
            for (var s = 0, l = t.length; l > s; s++)r = t[s], i > r && (i = r)
        } else e = d.iteratee(e, n), d.each(t, function (t, n, r) {
            a = e(t, n, r), (o > a || 1 / 0 === a && 1 / 0 === i) && (i = t, o = a)
        });
        return i
    }, d.shuffle = function (t) {
        for (var e, n = t && t.length === +t.length ? t : d.values(t), r = n.length, a = Array(r), i = 0; r > i; i++)e = d.random(0, i), e !== i && (a[i] = a[e]), a[e] = n[i];
        return a
    }, d.sample = function (t, e, n) {
        return null == e || n ? (t.length !== +t.length && (t = d.values(t)), t[d.random(t.length - 1)]) : d.shuffle(t).slice(0, Math.max(0, e))
    }, d.sortBy = function (t, e, n) {
        return e = d.iteratee(e, n), d.pluck(d.map(t, function (t, n, r) {
            return {value: t, index: n, criteria: e(t, n, r)}
        }).sort(function (t, e) {
            var n = t.criteria, r = e.criteria;
            if (n !== r) {
                if (n > r || void 0 === n)return 1;
                if (r > n || void 0 === r)return -1
            }
            return t.index - e.index
        }), "value")
    };
    var g = function (t) {
        return function (e, n, r) {
            var a = {};
            return n = d.iteratee(n, r), d.each(e, function (r, i) {
                var o = n(r, i, e);
                t(a, r, o)
            }), a
        }
    };
    d.groupBy = g(function (t, e, n) {
        d.has(t, n) ? t[n].push(e) : t[n] = [e]
    }), d.indexBy = g(function (t, e, n) {
        t[n] = e
    }), d.countBy = g(function (t, e, n) {
        d.has(t, n) ? t[n]++ : t[n] = 1
    }), d.sortedIndex = function (t, e, n, r) {
        n = d.iteratee(n, r, 1);
        for (var a = n(e), i = 0, o = t.length; o > i;) {
            var s = i + o >>> 1;
            n(t[s]) < a ? i = s + 1 : o = s
        }
        return i
    }, d.toArray = function (t) {
        return t ? d.isArray(t) ? o.call(t) : t.length === +t.length ? d.map(t, d.identity) : d.values(t) : []
    }, d.size = function (t) {
        return null == t ? 0 : t.length === +t.length ? t.length : d.keys(t).length
    }, d.partition = function (t, e, n) {
        e = d.iteratee(e, n);
        var r = [], a = [];
        return d.each(t, function (t, n, i) {
            (e(t, n, i) ? r : a).push(t)
        }), [r, a]
    }, d.first = d.head = d.take = function (t, e, n) {
        return null == t ? void 0 : null == e || n ? t[0] : 0 > e ? [] : o.call(t, 0, e)
    }, d.initial = function (t, e, n) {
        return o.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
    }, d.last = function (t, e, n) {
        return null == t ? void 0 : null == e || n ? t[t.length - 1] : o.call(t, Math.max(t.length - e, 0))
    }, d.rest = d.tail = d.drop = function (t, e, n) {
        return o.call(t, null == e || n ? 1 : e)
    }, d.compact = function (t) {
        return d.filter(t, d.identity)
    };
    var v = function (t, e, n, r) {
        if (e && d.every(t, d.isArray))return s.apply(r, t);
        for (var a = 0, o = t.length; o > a; a++) {
            var l = t[a];
            d.isArray(l) || d.isArguments(l) ? e ? i.apply(r, l) : v(l, e, n, r) : n || r.push(l)
        }
        return r
    };
    d.flatten = function (t, e) {
        return v(t, e, !1, [])
    }, d.without = function (t) {
        return d.difference(t, o.call(arguments, 1))
    }, d.uniq = d.unique = function (t, e, n, r) {
        if (null == t)return [];
        d.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = d.iteratee(n, r));
        for (var a = [], i = [], o = 0, s = t.length; s > o; o++) {
            var l = t[o];
            if (e)o && i === l || a.push(l), i = l; else if (n) {
                var c = n(l, o, t);
                d.indexOf(i, c) < 0 && (i.push(c), a.push(l))
            } else d.indexOf(a, l) < 0 && a.push(l)
        }
        return a
    }, d.union = function () {
        return d.uniq(v(arguments, !0, !0, []))
    }, d.intersection = function (t) {
        if (null == t)return [];
        for (var e = [], n = arguments.length, r = 0, a = t.length; a > r; r++) {
            var i = t[r];
            if (!d.contains(e, i)) {
                for (var o = 1; n > o && d.contains(arguments[o], i); o++);
                o === n && e.push(i)
            }
        }
        return e
    }, d.difference = function (t) {
        var e = v(o.call(arguments, 1), !0, !0, []);
        return d.filter(t, function (t) {
            return !d.contains(e, t)
        })
    }, d.zip = function (t) {
        if (null == t)return [];
        for (var e = d.max(arguments, "length").length, n = Array(e), r = 0; e > r; r++)n[r] = d.pluck(arguments, r);
        return n
    }, d.object = function (t, e) {
        if (null == t)return {};
        for (var n = {}, r = 0, a = t.length; a > r; r++)e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
        return n
    }, d.indexOf = function (t, e, n) {
        if (null == t)return -1;
        var r = 0, a = t.length;
        if (n) {
            if ("number" != typeof n)return r = d.sortedIndex(t, e), t[r] === e ? r : -1;
            r = 0 > n ? Math.max(0, a + n) : n
        }
        for (; a > r; r++)if (t[r] === e)return r;
        return -1
    }, d.lastIndexOf = function (t, e, n) {
        if (null == t)return -1;
        var r = t.length;
        for ("number" == typeof n && (r = 0 > n ? r + n + 1 : Math.min(r, n + 1)); --r >= 0;)if (t[r] === e)return r;
        return -1
    }, d.range = function (t, e, n) {
        arguments.length <= 1 && (e = t || 0, t = 0), n = n || 1;
        for (var r = Math.max(Math.ceil((e - t) / n), 0), a = Array(r), i = 0; r > i; i++, t += n)a[i] = t;
        return a
    };
    var y = function () {
    };
    d.bind = function (t, e) {
        var n, r;
        if (p && t.bind === p)return p.apply(t, o.call(arguments, 1));
        if (!d.isFunction(t))throw new TypeError("Bind must be called on a function");
        return n = o.call(arguments, 2), r = function () {
            if (!(this instanceof r))return t.apply(e, n.concat(o.call(arguments)));
            y.prototype = t.prototype;
            var a = new y;
            y.prototype = null;
            var i = t.apply(a, n.concat(o.call(arguments)));
            return d.isObject(i) ? i : a
        }
    }, d.partial = function (t) {
        var e = o.call(arguments, 1);
        return function () {
            for (var n = 0, r = e.slice(), a = 0, i = r.length; i > a; a++)r[a] === d && (r[a] = arguments[n++]);
            for (; n < arguments.length;)r.push(arguments[n++]);
            return t.apply(this, r)
        }
    }, d.bindAll = function (t) {
        var e, n, r = arguments.length;
        if (1 >= r)throw new Error("bindAll must be passed function names");
        for (e = 1; r > e; e++)n = arguments[e], t[n] = d.bind(t[n], t);
        return t
    }, d.memoize = function (t, e) {
        var n = function (r) {
            var a = n.cache, i = e ? e.apply(this, arguments) : r;
            return d.has(a, i) || (a[i] = t.apply(this, arguments)), a[i]
        };
        return n.cache = {}, n
    }, d.delay = function (t, e) {
        var n = o.call(arguments, 2);
        return setTimeout(function () {
            return t.apply(null, n)
        }, e)
    }, d.defer = function (t) {
        return d.delay.apply(d, [t, 1].concat(o.call(arguments, 1)))
    }, d.throttle = function (t, e, n) {
        var r, a, i, o = null, s = 0;
        n || (n = {});
        var l = function () {
            s = n.leading === !1 ? 0 : d.now(), o = null, i = t.apply(r, a), o || (r = a = null)
        };
        return function () {
            var c = d.now();
            s || n.leading !== !1 || (s = c);
            var u = e - (c - s);
            return r = this, a = arguments, 0 >= u || u > e ? (clearTimeout(o), o = null, s = c, i = t.apply(r, a), o || (r = a = null)) : o || n.trailing === !1 || (o = setTimeout(l, u)), i
        }
    }, d.debounce = function (t, e, n) {
        var r, a, i, o, s, l = function () {
            var c = d.now() - o;
            e > c && c > 0 ? r = setTimeout(l, e - c) : (r = null, n || (s = t.apply(i, a), r || (i = a = null)))
        };
        return function () {
            i = this, a = arguments, o = d.now();
            var c = n && !r;
            return r || (r = setTimeout(l, e)), c && (s = t.apply(i, a), i = a = null), s
        }
    }, d.wrap = function (t, e) {
        return d.partial(e, t)
    }, d.negate = function (t) {
        return function () {
            return !t.apply(this, arguments)
        }
    }, d.compose = function () {
        var t = arguments, e = t.length - 1;
        return function () {
            for (var n = e, r = t[e].apply(this, arguments); n--;)r = t[n].call(this, r);
            return r
        }
    }, d.after = function (t, e) {
        return function () {
            return --t < 1 ? e.apply(this, arguments) : void 0
        }
    }, d.before = function (t, e) {
        var n;
        return function () {
            return --t > 0 ? n = e.apply(this, arguments) : e = null, n
        }
    }, d.once = d.partial(d.before, 2), d.keys = function (t) {
        if (!d.isObject(t))return [];
        if (h)return h(t);
        var e = [];
        for (var n in t)d.has(t, n) && e.push(n);
        return e
    }, d.values = function (t) {
        for (var e = d.keys(t), n = e.length, r = Array(n), a = 0; n > a; a++)r[a] = t[e[a]];
        return r
    }, d.pairs = function (t) {
        for (var e = d.keys(t), n = e.length, r = Array(n), a = 0; n > a; a++)r[a] = [e[a], t[e[a]]];
        return r
    }, d.invert = function (t) {
        for (var e = {}, n = d.keys(t), r = 0, a = n.length; a > r; r++)e[t[n[r]]] = n[r];
        return e
    }, d.functions = d.methods = function (t) {
        var e = [];
        for (var n in t)d.isFunction(t[n]) && e.push(n);
        return e.sort()
    }, d.extend = function (t) {
        if (!d.isObject(t))return t;
        for (var e, n, r = 1, a = arguments.length; a > r; r++) {
            e = arguments[r];
            for (n in e)c.call(e, n) && (t[n] = e[n])
        }
        return t
    }, d.pick = function (t, e, n) {
        var r, a = {};
        if (null == t)return a;
        if (d.isFunction(e)) {
            e = f(e, n);
            for (r in t) {
                var i = t[r];
                e(i, r, t) && (a[r] = i)
            }
        } else {
            var l = s.apply([], o.call(arguments, 1));
            t = new Object(t);
            for (var c = 0, u = l.length; u > c; c++)r = l[c], r in t && (a[r] = t[r])
        }
        return a
    }, d.omit = function (t, e, n) {
        if (d.isFunction(e))e = d.negate(e); else {
            var r = d.map(s.apply([], o.call(arguments, 1)), String);
            e = function (t, e) {
                return !d.contains(r, e)
            }
        }
        return d.pick(t, e, n)
    }, d.defaults = function (t) {
        if (!d.isObject(t))return t;
        for (var e = 1, n = arguments.length; n > e; e++) {
            var r = arguments[e];
            for (var a in r)void 0 === t[a] && (t[a] = r[a])
        }
        return t
    }, d.clone = function (t) {
        return d.isObject(t) ? d.isArray(t) ? t.slice() : d.extend({}, t) : t
    }, d.tap = function (t, e) {
        return e(t), t
    };
    var b = function (t, e, n, r) {
        if (t === e)return 0 !== t || 1 / t === 1 / e;
        if (null == t || null == e)return t === e;
        t instanceof d && (t = t._wrapped), e instanceof d && (e = e._wrapped);
        var a = l.call(t);
        if (a !== l.call(e))return !1;
        switch (a) {
            case"[object RegExp]":
            case"[object String]":
                return "" + t == "" + e;
            case"[object Number]":
                return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
            case"[object Date]":
            case"[object Boolean]":
                return +t === +e
        }
        if ("object" != typeof t || "object" != typeof e)return !1;
        for (var i = n.length; i--;)if (n[i] === t)return r[i] === e;
        var o = t.constructor, s = e.constructor;
        if (o !== s && "constructor"in t && "constructor"in e && !(d.isFunction(o) && o instanceof o && d.isFunction(s) && s instanceof s))return !1;
        n.push(t), r.push(e);
        var c, u;
        if ("[object Array]" === a) {
            if (c = t.length, u = c === e.length)for (; c-- && (u = b(t[c], e[c], n, r)););
        } else {
            var h, p = d.keys(t);
            if (c = p.length, u = d.keys(e).length === c)for (; c-- && (h = p[c], u = d.has(e, h) && b(t[h], e[h], n, r)););
        }
        return n.pop(), r.pop(), u
    };
    d.isEqual = function (t, e) {
        return b(t, e, [], [])
    }, d.isEmpty = function (t) {
        if (null == t)return !0;
        if (d.isArray(t) || d.isString(t) || d.isArguments(t))return 0 === t.length;
        for (var e in t)if (d.has(t, e))return !1;
        return !0
    }, d.isElement = function (t) {
        return !(!t || 1 !== t.nodeType)
    }, d.isArray = u || function (t) {
        return "[object Array]" === l.call(t)
    }, d.isObject = function (t) {
        var e = typeof t;
        return "function" === e || "object" === e && !!t
    }, d.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t) {
        d["is" + t] = function (e) {
            return l.call(e) === "[object " + t + "]"
        }
    }), d.isArguments(arguments) || (d.isArguments = function (t) {
        return d.has(t, "callee")
    }), "function" != typeof/./ && (d.isFunction = function (t) {
        return "function" == typeof t || !1
    }), d.isFinite = function (t) {
        return isFinite(t) && !isNaN(parseFloat(t))
    }, d.isNaN = function (t) {
        return d.isNumber(t) && t !== +t
    }, d.isBoolean = function (t) {
        return t === !0 || t === !1 || "[object Boolean]" === l.call(t)
    }, d.isNull = function (t) {
        return null === t
    }, d.isUndefined = function (t) {
        return void 0 === t
    }, d.has = function (t, e) {
        return null != t && c.call(t, e)
    }, d.noConflict = function () {
        return t._ = e, this
    }, d.identity = function (t) {
        return t
    }, d.constant = function (t) {
        return function () {
            return t
        }
    }, d.noop = function () {
    }, d.property = function (t) {
        return function (e) {
            return e[t]
        }
    }, d.matches = function (t) {
        var e = d.pairs(t), n = e.length;
        return function (t) {
            if (null == t)return !n;
            t = new Object(t);
            for (var r = 0; n > r; r++) {
                var a = e[r], i = a[0];
                if (a[1] !== t[i] || !(i in t))return !1
            }
            return !0
        }
    }, d.times = function (t, e, n) {
        var r = Array(Math.max(0, t));
        e = f(e, n, 1);
        for (var a = 0; t > a; a++)r[a] = e(a);
        return r
    }, d.random = function (t, e) {
        return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
    }, d.now = Date.now || function () {
        return (new Date).getTime()
    };
    var _ = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, x = d.invert(_), w = function (t) {
        var e = function (e) {
            return t[e]
        }, n = "(?:" + d.keys(t).join("|") + ")", r = RegExp(n), a = RegExp(n, "g");
        return function (t) {
            return t = null == t ? "" : "" + t, r.test(t) ? t.replace(a, e) : t
        }
    };
    d.escape = w(_), d.unescape = w(x), d.result = function (t, e) {
        if (null != t) {
            var n = t[e];
            return d.isFunction(n) ? t[e]() : n
        }
    };
    var S = 0;
    d.uniqueId = function (t) {
        var e = ++S + "";
        return t ? t + e : e
    }, d.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var k = /(.)^/, C = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, P = /\\|'|\r|\n|\u2028|\u2029/g, B = function (t) {
        return "\\" + C[t]
    };
    d.template = function (t, e, n) {
        !e && n && (e = n), e = d.defaults({}, e, d.templateSettings);
        var r = RegExp([(e.escape || k).source, (e.interpolate || k).source, (e.evaluate || k).source].join("|") + "|$", "g"), a = 0, i = "__p+='";
        t.replace(r, function (e, n, r, o, s) {
            return i += t.slice(a, s).replace(P, B), a = s + e.length, n ? i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? i += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), e
        }), i += "';\n", e.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(e.variable || "obj", "_", i)
        } catch (s) {
            throw s.source = i, s
        }
        var l = function (t) {
            return o.call(this, t, d)
        }, c = e.variable || "obj";
        return l.source = "function(" + c + "){\n" + i + "}", l
    }, d.chain = function (t) {
        var e = d(t);
        return e._chain = !0, e
    };
    var A = function (t) {
        return this._chain ? d(t).chain() : t
    };
    d.mixin = function (t) {
        d.each(d.functions(t), function (e) {
            var n = d[e] = t[e];
            d.prototype[e] = function () {
                var t = [this._wrapped];
                return i.apply(t, arguments), A.call(this, n.apply(d, t))
            }
        })
    }, d.mixin(d), d.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
        var e = n[t];
        d.prototype[t] = function () {
            var n = this._wrapped;
            return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], A.call(this, n)
        }
    }), d.each(["concat", "join", "slice"], function (t) {
        var e = n[t];
        d.prototype[t] = function () {
            return A.call(this, e.apply(this._wrapped, arguments))
        }
    }), d.prototype.value = function () {
        return this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function () {
        return d
    })
}.call(this), function (t) {
    function e(e, n, r, a) {
        var i = {
            data: a || 0 === a || a === !1 ? a : n ? n.data : {},
            _wrap: n ? n._wrap : null,
            tmpl: null,
            parent: n || null,
            nodes: [],
            calls: c,
            nest: u,
            wrap: h,
            html: p,
            update: d
        };
        return e && t.extend(i, e, {
            nodes: [],
            parent: n
        }), r && (i.tmpl = r, i._ctnt = i._ctnt || i.tmpl(t, i), i.key = ++x, (S.length ? b : y)[x] = i), i
    }

    function n(e, a, i) {
        var o, s = i ? t.map(i, function (t) {
            return "string" == typeof t ? e.key ? t.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + g + '="' + e.key + '" $2') : t : n(t, e, t._ctnt)
        }) : e;
        return a ? s : (s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (e, n, a, i) {
            o = t(a).get(), l(o), n && (o = r(n).concat(o)), i && (o = o.concat(r(i)))
        }), o ? o : r(s))
    }

    function r(e) {
        var n = document.createElement("div");
        return n.innerHTML = e, t.makeArray(n.childNodes)
    }

    function a(e) {
        return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + t.trim(e).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (e, n, r, a, i, s, l) {
            var c, u, h, p = t.tmpl.tag[r];
            if (!p)throw"Unknown template tag: " + r;
            return c = p._default || [], s && !/\w$/.test(i) && (i += s, s = ""), i ? (i = o(i), l = l ? "," + o(l) + ")" : s ? ")" : "", u = s ? i.indexOf(".") > -1 ? i + o(s) : "(" + i + ").call($item" + l : i, h = s ? u : "(typeof(" + i + ")==='function'?(" + i + ").call($item):(" + i + "))") : h = u = c.$1 || "null", a = o(a), "');" + p[n ? "close" : "open"].split("$notnull_1").join(i ? "typeof(" + i + ")!=='undefined' && (" + i + ")!=null" : "true").split("$1a").join(h).split("$1").join(u).split("$2").join(a || c.$2 || "") + "__.push('"
        }) + "');}return __;")
    }

    function i(e, r) {
        e._wrap = n(e, !0, t.isArray(r) ? r : [v.test(r) ? r : t(r).html()]).join("")
    }

    function o(t) {
        return t ? t.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function s(t) {
        var e = document.createElement("div");
        return e.appendChild(t.cloneNode(!0)), e.innerHTML
    }

    function l(n) {
        function r(n) {
            function r(t) {
                t += c, o = u[t] = u[t] || e(o, y[o.parent.key + c] || o.parent)
            }

            var a, i, o, s, l = n;
            if (s = n.getAttribute(g)) {
                for (; l.parentNode && 1 === (l = l.parentNode).nodeType && !(a = l.getAttribute(g)););
                a !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 : l.getAttribute(g) || 0 : 0, (o = y[s]) || (o = b[s], o = e(o, y[l] || b[l]), o.key = ++x, y[x] = o), w && r(s)), n.removeAttribute(g)
            } else w && (o = t.data(n, "tmplItem")) && (r(o.key), y[o.key] = o, l = t.data(n.parentNode, "tmplItem"), l = l ? l.key : 0);
            if (o) {
                for (i = o; i && i.key != l;)i.nodes.push(n), i = i.parent;
                delete o._ctnt, delete o._wrap, t.data(n, "tmplItem", o)
            }
        }

        var a, i, o, s, l, c = "_" + w, u = {};
        for (o = 0, s = n.length; s > o; o++)if (1 === (a = n[o]).nodeType) {
            for (i = a.getElementsByTagName("*"), l = i.length - 1; l >= 0; l--)r(i[l]);
            r(a)
        }
    }

    function c(t, e, n, r) {
        return t ? void S.push({_: t, tmpl: e, item: this, data: n, options: r}) : S.pop()
    }

    function u(e, n, r) {
        return t.tmpl(t.template(e), n, r, this)
    }

    function h(e, n) {
        var r = e.options || {};
        return r.wrapped = n, t.tmpl(t.template(e.tmpl), e.data, r, e.item)
    }

    function p(e, n) {
        var r = this._wrap;
        return t.map(t(t.isArray(r) ? r.join("") : r).filter(e || "*"), function (t) {
            return n ? t.innerText || t.textContent : t.outerHTML || s(t)
        })
    }

    function d() {
        var e = this.nodes;
        t.tmpl(null, null, null, this).insertBefore(e[0]), t(e).remove()
    }

    var f, m = t.fn.domManip, g = "_tmplitem", v = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, y = {}, b = {}, _ = {
        key: 0,
        data: {}
    }, x = 0, w = 0, S = [];
    t.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, n) {
        t.fn[e] = function (r) {
            var a, i, o, s, l = [], c = t(r), u = 1 === this.length && this[0].parentNode;
            if (f = y || {}, u && 11 === u.nodeType && 1 === u.childNodes.length && 1 === c.length)c[n](this[0]), l = this; else {
                for (i = 0, o = c.length; o > i; i++)w = i, a = (i > 0 ? this.clone(!0) : this).get(), t(c[i])[n](a), l = l.concat(a);
                w = 0, l = this.pushStack(l, e, c.selector)
            }
            return s = f, f = null, t.tmpl.complete(s), l
        }
    }), t.fn.extend({
        tmpl: function (e, n, r) {
            return t.tmpl(this[0], e, n, r)
        }, tmplItem: function () {
            return t.tmplItem(this[0])
        }, template: function (e) {
            return t.template(e, this[0])
        }, domManip: function (e, n, r) {
            if (e[0] && t.isArray(e[0])) {
                for (var a, i = t.makeArray(arguments), o = e[0], s = o.length, l = 0; s > l && !(a = t.data(o[l++], "tmplItem")););
                a && w && (i[2] = function (e) {
                    t.tmpl.afterManip(this, e, r)
                }), m.apply(this, i)
            } else m.apply(this, arguments);
            return w = 0, !f && t.tmpl.complete(y), this
        }
    }), t.extend({
        tmpl: function (r, a, o, s) {
            var l, c = !s;
            if (c)s = _, r = t.template[r] || t.template(null, r), b = {}; else if (!r)return r = s.tmpl, y[s.key] = s, s.nodes = [], s.wrapped && i(s, s.wrapped), t(n(s, null, s.tmpl(t, s)));
            return r ? ("function" == typeof a && (a = a.call(s || {})), o && o.wrapped && i(o, o.wrapped), l = t.isArray(a) ? t.map(a, function (t) {
                return t ? e(o, s, r, t) : null
            }) : [e(o, s, r, a)], c ? t(n(s, null, l)) : l) : []
        }, tmplItem: function (e) {
            var n;
            for (e instanceof t && (e = e[0]); e && 1 === e.nodeType && !(n = t.data(e, "tmplItem")) && (e = e.parentNode););
            return n || _
        }, template: function (e, n) {
            return n ? ("string" == typeof n ? n = a(n) : n instanceof t && (n = n[0] || {}), n.nodeType && (n = t.data(n, "tmpl") || t.data(n, "tmpl", a(n.innerHTML))), "string" == typeof e ? t.template[e] = n : n) : e ? "string" != typeof e ? t.template(null, e) : t.template[e] || t.template(null, v.test(e) ? e : t(e)) : null
        }, encode: function (t) {
            return ("" + t).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    }), t.extend(t.tmpl, {
        tag: {
            tmpl: {
                _default: {$2: "null"},
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {$2: "null"},
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            each: {
                _default: {$2: "$index, $value"},
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {open: "if(($notnull_1) && $1a){", close: "}"},
            "else": {_default: {$1: "true"}, open: "}else if(($notnull_1) && $1a){"},
            html: {open: "if($notnull_1){__.push($1a);}"},
            "=": {_default: {$1: "$data"}, open: "if($notnull_1){__.push($.encode($1a));}"},
            "!": {open: ""}
        }, complete: function () {
            y = {}
        }, afterManip: function (e, n, r) {
            var a = 11 === n.nodeType ? t.makeArray(n.childNodes) : 1 === n.nodeType ? [n] : [];
            r.call(e, n), l(a), w++
        }
    })
}(jQuery), define("jquery_tmpl", ["jquery"], function (t) {
    return function () {
        var e;
        return e || t.$.fn.tmpl
    }
}(this)), define("typeHelper", ["jquery", "jquery_tmpl"], function (t) {
    "use strict";
    var e, n, r, a, i, o, s, l;
    s = '<ul class="dropdown-menu" role="menu"></ul>', a = void 0, e = void 0, r = void 0, n = void 0, i = void 0, o = ["gmail.com", "qq.com", "163.com", "hotmail.com", "sina.com", "126.com", "live.com", "live.cn", "vip.sina.com", "vip.qq.com", "sina.cn", "sohu.com", "139.com", "wo.com.cn", "189.cn", "21cn.com"], l = '<button class="btn btn-default result" type="button">${result}</button><a href="#" class="i-cancel ml10 delete-result">&times;</a>', t.fn.typeHelperOld = function (c) {
        var u;
        a = t.extend({
            data: null,
            tpl: '<li><a href="#" data-value="${name}">${name}</a></li>',
            defaultList: [],
            showNum: 5,
            remoteData: null,
            submitKey: null,
            onlyResult: !0,
            autoSelect: !0,
            emailMode: !1,
            insertHandler: function () {
            }
        }, c), u = [], n = t(this), 0 !== n.length && (n.after(t("<div></div>").addClass("typehelper")).siblings(".typehelper").append(n), e = n.parent().css("position", "relative"), t.tmpl(s).insertAfter(n), r = e.find("ul").hide().css("minWidth", n.outerWidth()), t.each(a.defaultList, function (e, n) {
            t.tmpl(a.tpl, n).appendTo(r)
        }), n.on("focus", function () {
            a.defaultList.length > 0 && t(this).parent().trigger("show.typehelper")
        }), n.on("input", function (e) {
            t(this).parent().trigger("search.typehelper"), t(this).parent().trigger("show.typehelper")
        }), n.on("keydown", function (e) {
            t(this).parent().trigger("select.typehelper", e)
        }), r.delegate("li", "mouseover", function () {
            t(this).siblings("li").removeClass("active"), t(this).addClass("active")
        }), n.on("blur", function () {
            var e, n;
            t(this).parent().trigger("hide.typehelper"), a.autoSelect && (t(this).siblings("ul").find(".active").length > 0 ? (e = r.find(".active").index(), n = u[e], t(this).parent().trigger("insert.typehelper", [r.find(".active a"), n])) : t(this).val(""));
        }), e.on("show.typehelper", function () {
            t(this).find("ul").show()
        }), e.on("hide.typehelper", function () {
            t(this).find("ul").hide()
        }), e.on("insert.typehelper", function (i, o, s) {
            e = t(this), n = e.find("input"), r = e.find("ul"), n.val(t(o).data("value")), t(".result", e).length > 0 && (t(".result", e).remove(), e.find(".delete-result").remove()), a.onlyResult && (n.hide(), r.after(t.tmpl(l, {result: n.val()})), a.submitKey && n.data(a.submitKey, t(o).data(a.submitKey)), e.find(".result").on("click", function () {
                t(this).siblings(".delete-result").remove(), t(this).remove(), n.show().focus(), e.trigger("search.typehelper")
            }), e.find(".delete-result").on("click", function () {
                return t(this).siblings(".result").remove(), t(this).remove(), n.val("").show(), !1
            })), e.parents(".form-group").next(".form-group").find("input").focus(), a.insertHandler(s)
        }), e.on("select.typehelper", function (a, i) {
            var o, s, l, c, h, p;
            if (e = t(this), n = e.find("input"), r = e.find("ul"), o = r.find("li"), i)switch (i.keyCode) {
                case 9:
                    i.shiftKey || (i.preventDefault(), e.parent(".form-group").next(".form-group").find("input").focus());
                    break;
                case 38:
                    i.preventDefault(), o.length && (r.find(".active").length ? r.find(".active").removeClass("active").prev("li").addClass("active") : o.last().addClass("active"));
                    break;
                case 40:
                    i.preventDefault(), o.length && (r.find(".active").length ? r.find(".active").removeClass("active").next("li").addClass("active") : o.first().addClass("active"));
                    break;
                case 13:
                    if (i.stopPropagation(), i.preventDefault(), r.find(".active").length <= 0)return;
                    c = r.find(".active").index(), p = u[c], e.trigger("insert.typehelper", [r.find(".active a"), p]), e.trigger("hide.typehelper");
                    break;
                case 9:
                    s = t(this).parents("form").find("input"), l = s.index(t("input:focus")), -1 !== l && (h = s.slice(l + 1), h.length && h.each(function () {
                        var e, n;
                        return n = t(this).attr("type"), e = ["text", "email", "password", "url"], t(this).val() || -1 === e.indexOf(n) ? void 0 : (t(this).focus(), !1)
                    }));
                    break;
                case 27:
                    i.preventDefault();
                    break;
                default:
                    return
            }
        }), e.on("search.typehelper", function () {
            var s, l, c, h;
            if (e = t(this), n = e.find("input"), r = e.find("ul"), n.val().length)if (c = [], a.remoteData)a.remoteData(n.val(), function (e) {
                u = e, c = e, c.length > 0 && (r.children().remove(), t.tmpl(a.tpl, c).appendTo(r), 1 === c.length && r.children().first().addClass("active"))
            }); else {
                for (h = 0, a.emailMode && (a.data = [{name: n.val()}], t.each(o, function (t, e) {
                    a.data.push({name: n.val().replace(/@.*$/, "") + "@" + e})
                })), i = a.data.length, l = 0; i > l && (s = a.data[l], !(0 === s.name.toLowerCase().indexOf(n.val().toLowerCase()) && (c.push(s), h++, h >= a.showNum)));)l++;
                c.length > 0 && (r.children().remove(), t.tmpl(a.tpl, c).appendTo(r), (1 === c.length || a.emailMode) && r.children().first().addClass("active"))
            }
        }), n.val().length > 0 && e.trigger("insert.typehelper", n))
    }
}), function (t) {
    "function" == typeof define && define.amd ? define("jquery-mousewheel", ["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function (t) {
    function e(e) {
        var o = e || window.event, s = l.call(arguments, 1), c = 0, h = 0, p = 0, d = 0, f = 0, m = 0;
        if (e = t.event.fix(o), e.type = "mousewheel", "detail"in o && (p = -1 * o.detail), "wheelDelta"in o && (p = o.wheelDelta), "wheelDeltaY"in o && (p = o.wheelDeltaY), "wheelDeltaX"in o && (h = -1 * o.wheelDeltaX), "axis"in o && o.axis === o.HORIZONTAL_AXIS && (h = -1 * p, p = 0), c = 0 === p ? h : p, "deltaY"in o && (p = -1 * o.deltaY, c = p), "deltaX"in o && (h = o.deltaX, 0 === p && (c = -1 * h)), 0 !== p || 0 !== h) {
            if (1 === o.deltaMode) {
                var g = t.data(this, "mousewheel-line-height");
                c *= g, p *= g, h *= g
            } else if (2 === o.deltaMode) {
                var v = t.data(this, "mousewheel-page-height");
                c *= v, p *= v, h *= v
            }
            if (d = Math.max(Math.abs(p), Math.abs(h)), (!i || i > d) && (i = d, r(o, d) && (i /= 40)), r(o, d) && (c /= 40, h /= 40, p /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / i), h = Math[h >= 1 ? "floor" : "ceil"](h / i), p = Math[p >= 1 ? "floor" : "ceil"](p / i), u.settings.normalizeOffset && this.getBoundingClientRect) {
                var y = this.getBoundingClientRect();
                f = e.clientX - y.left, m = e.clientY - y.top
            }
            return e.deltaX = h, e.deltaY = p, e.deltaFactor = i, e.offsetX = f, e.offsetY = m, e.deltaMode = 0, s.unshift(e, c, h, p), a && clearTimeout(a), a = setTimeout(n, 200), (t.event.dispatch || t.event.handle).apply(this, s)
        }
    }

    function n() {
        i = null
    }

    function r(t, e) {
        return u.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 === 0
    }

    var a, i, o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], s = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], l = Array.prototype.slice;
    if (t.event.fixHooks)for (var c = o.length; c;)t.event.fixHooks[o[--c]] = t.event.mouseHooks;
    var u = t.event.special.mousewheel = {
        version: "3.1.12", setup: function () {
            if (this.addEventListener)for (var n = s.length; n;)this.addEventListener(s[--n], e, !1); else this.onmousewheel = e;
            t.data(this, "mousewheel-line-height", u.getLineHeight(this)), t.data(this, "mousewheel-page-height", u.getPageHeight(this))
        }, teardown: function () {
            if (this.removeEventListener)for (var n = s.length; n;)this.removeEventListener(s[--n], e, !1); else this.onmousewheel = null;
            t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
        }, getLineHeight: function (e) {
            var n = t(e), r = n["offsetParent"in t.fn ? "offsetParent" : "parent"]();
            return r.length || (r = t("body")), parseInt(r.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
        }, getPageHeight: function (e) {
            return t(e).height()
        }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
    };
    t.fn.extend({
        mousewheel: function (t) {
            return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
        }, unmousewheel: function (t) {
            return this.unbind("mousewheel", t)
        }
    })
}), function (t) {
    "undefined" != typeof module && module.exports ? module.exports = t : t(jQuery, window, document)
}(function (t) {
    !function (e) {
        var n = "function" == typeof define && define.amd, r = "undefined" != typeof module && module.exports, a = "https:" == document.location.protocol ? "https:" : "http:", i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        n || (r ? require("jquery-mousewheel")(t) : t.event.special.mousewheel || t("head").append(decodeURI("%3Cscript src=" + a + "//" + i + "%3E%3C/script%3E"))), e()
    }(function () {
        var e, n = "mCustomScrollbar", r = "mCS", a = ".mCustomScrollbar", i = {
            setTop: 0,
            setLeft: 0,
            axis: "y",
            scrollbarPosition: "inside",
            scrollInertia: 950,
            autoDraggerLength: !0,
            alwaysShowScrollbar: 0,
            snapOffset: 0,
            mouseWheel: {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                deltaFactor: "auto",
                disableOver: ["select", "option", "keygen", "datalist", "textarea"]
            },
            scrollButtons: {scrollType: "stepless", scrollAmount: "auto"},
            keyboard: {enable: !0, scrollType: "stepless", scrollAmount: "auto"},
            contentTouchScroll: 25,
            documentTouchScroll: !0,
            advanced: {
                autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                updateOnContentResize: !0,
                updateOnImageLoad: "auto",
                autoUpdateTimeout: 60
            },
            theme: "light",
            callbacks: {onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0}
        }, o = 0, s = {}, l = window.attachEvent && !window.addEventListener ? 1 : 0, c = !1, u = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"], h = {
            init: function (e) {
                var e = t.extend(!0, {}, i, e), n = p.call(this);
                if (e.live) {
                    var l = e.liveSelector || this.selector || a, c = t(l);
                    if ("off" === e.live)return void f(l);
                    s[l] = setTimeout(function () {
                        c.mCustomScrollbar(e), "once" === e.live && c.length && f(l)
                    }, 500)
                } else f(l);
                return e.setWidth = e.set_width ? e.set_width : e.setWidth, e.setHeight = e.set_height ? e.set_height : e.setHeight, e.axis = e.horizontalScroll ? "x" : m(e.axis), e.scrollInertia = e.scrollInertia > 0 && e.scrollInertia < 17 ? 17 : e.scrollInertia, "object" != typeof e.mouseWheel && 1 == e.mouseWheel && (e.mouseWheel = {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    preventDefault: !1,
                    deltaFactor: "auto",
                    normalizeDelta: !1,
                    invert: !1
                }), e.mouseWheel.scrollAmount = e.mouseWheelPixels ? e.mouseWheelPixels : e.mouseWheel.scrollAmount, e.mouseWheel.normalizeDelta = e.advanced.normalizeMouseWheelDelta ? e.advanced.normalizeMouseWheelDelta : e.mouseWheel.normalizeDelta, e.scrollButtons.scrollType = g(e.scrollButtons.scrollType), d(e), t(n).each(function () {
                    var n = t(this);
                    if (!n.data(r)) {
                        n.data(r, {
                            idx: ++o,
                            opt: e,
                            scrollRatio: {y: null, x: null},
                            overflowed: null,
                            contentReset: {y: null, x: null},
                            bindEvents: !1,
                            tweenRunning: !1,
                            sequential: {},
                            langDir: n.css("direction"),
                            cbOffsets: null,
                            trigger: null,
                            poll: {size: {o: 0, n: 0}, img: {o: 0, n: 0}, change: {o: 0, n: 0}}
                        });
                        var a = n.data(r), i = a.opt, s = n.data("mcs-axis"), l = n.data("mcs-scrollbar-position"), c = n.data("mcs-theme");
                        s && (i.axis = s), l && (i.scrollbarPosition = l), c && (i.theme = c, d(i)), v.call(this), a && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), t("#mCSB_" + a.idx + "_container img:not(." + u[2] + ")").addClass(u[2]), h.update.call(null, n)
                    }
                })
            }, update: function (e, n) {
                var a = e || p.call(this);
                return t(a).each(function () {
                    var e = t(this);
                    if (e.data(r)) {
                        var a = e.data(r), i = a.opt, o = t("#mCSB_" + a.idx + "_container"), s = t("#mCSB_" + a.idx), l = [t("#mCSB_" + a.idx + "_dragger_vertical"), t("#mCSB_" + a.idx + "_dragger_horizontal")];
                        if (!o.length)return;
                        a.tweenRunning && V(e), n && a && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), e.hasClass(u[3]) && e.removeClass(u[3]), e.hasClass(u[4]) && e.removeClass(u[4]), s.css("max-height", "none"), s.height() !== e.height() && s.css("max-height", e.height()), b.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || o.css("width", y(o)), a.overflowed = k.call(this), A.call(this), i.autoDraggerLength && x.call(this), w.call(this), P.call(this);
                        var c = [Math.abs(o[0].offsetTop), Math.abs(o[0].offsetLeft)];
                        "x" !== i.axis && (a.overflowed[0] ? l[0].height() > l[0].parent().height() ? C.call(this) : (K(e, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }), a.contentReset.y = null) : (C.call(this), "y" === i.axis ? B.call(this) : "yx" === i.axis && a.overflowed[1] && K(e, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }))), "y" !== i.axis && (a.overflowed[1] ? l[1].width() > l[1].parent().width() ? C.call(this) : (K(e, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none"
                        }), a.contentReset.x = null) : (C.call(this), "x" === i.axis ? B.call(this) : "yx" === i.axis && a.overflowed[0] && K(e, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none"
                        }))), n && a && (2 === n && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === n && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), W.call(this)
                    }
                })
            }, scrollTo: function (e, n) {
                if ("undefined" != typeof e && null != e) {
                    var a = p.call(this);
                    return t(a).each(function () {
                        var a = t(this);
                        if (a.data(r)) {
                            var i = a.data(r), o = i.opt, s = {
                                trigger: "external",
                                scrollInertia: o.scrollInertia,
                                scrollEasing: "mcsEaseInOut",
                                moveDragger: !1,
                                timeout: 60,
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            }, l = t.extend(!0, {}, s, n), c = q.call(this, e), u = l.scrollInertia > 0 && l.scrollInertia < 17 ? 17 : l.scrollInertia;
                            c[0] = z.call(this, c[0], "y"), c[1] = z.call(this, c[1], "x"), l.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), l.dur = nt() ? 0 : u, setTimeout(function () {
                                null !== c[0] && "undefined" != typeof c[0] && "x" !== o.axis && i.overflowed[0] && (l.dir = "y", l.overwrite = "all", K(a, c[0].toString(), l)), null !== c[1] && "undefined" != typeof c[1] && "y" !== o.axis && i.overflowed[1] && (l.dir = "x", l.overwrite = "none", K(a, c[1].toString(), l))
                            }, l.timeout)
                        }
                    })
                }
            }, stop: function () {
                var e = p.call(this);
                return t(e).each(function () {
                    var e = t(this);
                    e.data(r) && V(e)
                })
            }, disable: function (e) {
                var n = p.call(this);
                return t(n).each(function () {
                    var n = t(this);
                    if (n.data(r)) {
                        n.data(r);
                        W.call(this, "remove"), B.call(this), e && C.call(this), A.call(this, !0), n.addClass(u[3])
                    }
                })
            }, destroy: function () {
                var e = p.call(this);
                return t(e).each(function () {
                    var a = t(this);
                    if (a.data(r)) {
                        var i = a.data(r), o = i.opt, s = t("#mCSB_" + i.idx), l = t("#mCSB_" + i.idx + "_container"), c = t(".mCSB_" + i.idx + "_scrollbar");
                        o.live && f(o.liveSelector || t(e).selector), W.call(this, "remove"), B.call(this), C.call(this), a.removeData(r), Q(this, "mcs"), c.remove(), l.find("img." + u[2]).removeClass(u[2]), s.replaceWith(l.contents()), a.removeClass(n + " _" + r + "_" + i.idx + " " + u[6] + " " + u[7] + " " + u[5] + " " + u[3]).addClass(u[4])
                    }
                })
            }
        }, p = function () {
            return "object" != typeof t(this) || t(this).length < 1 ? a : this
        }, d = function (e) {
            var n = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"], r = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"], a = ["minimal", "minimal-dark"], i = ["minimal", "minimal-dark"], o = ["minimal", "minimal-dark"];
            e.autoDraggerLength = t.inArray(e.theme, n) > -1 ? !1 : e.autoDraggerLength, e.autoExpandScrollbar = t.inArray(e.theme, r) > -1 ? !1 : e.autoExpandScrollbar, e.scrollButtons.enable = t.inArray(e.theme, a) > -1 ? !1 : e.scrollButtons.enable, e.autoHideScrollbar = t.inArray(e.theme, i) > -1 ? !0 : e.autoHideScrollbar, e.scrollbarPosition = t.inArray(e.theme, o) > -1 ? "outside" : e.scrollbarPosition
        }, f = function (t) {
            s[t] && (clearTimeout(s[t]), Q(s, t))
        }, m = function (t) {
            return "yx" === t || "xy" === t || "auto" === t ? "yx" : "x" === t || "horizontal" === t ? "x" : "y"
        }, g = function (t) {
            return "stepped" === t || "pixels" === t || "step" === t || "click" === t ? "stepped" : "stepless"
        }, v = function () {
            var e = t(this), a = e.data(r), i = a.opt, o = i.autoExpandScrollbar ? " " + u[1] + "_expand" : "", s = ["<div id='mCSB_" + a.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + o + "'><div class='" + u[12] + "'><div id='mCSB_" + a.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + a.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + o + "'><div class='" + u[12] + "'><div id='mCSB_" + a.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"], l = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical", c = "yx" === i.axis ? s[0] + s[1] : "x" === i.axis ? s[1] : s[0], h = "yx" === i.axis ? "<div id='mCSB_" + a.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "", p = i.autoHideScrollbar ? " " + u[6] : "", d = "x" !== i.axis && "rtl" === a.langDir ? " " + u[7] : "";
            i.setWidth && e.css("width", i.setWidth), i.setHeight && e.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === a.langDir ? "989999px" : i.setLeft, e.addClass(n + " _" + r + "_" + a.idx + p + d).wrapInner("<div id='mCSB_" + a.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + l + "'><div id='mCSB_" + a.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir=" + a.langDir + " /></div>");
            var f = t("#mCSB_" + a.idx), m = t("#mCSB_" + a.idx + "_container");
            "y" === i.axis || i.advanced.autoExpandHorizontalScroll || m.css("width", y(m)), "outside" === i.scrollbarPosition ? ("static" === e.css("position") && e.css("position", "relative"), e.css("overflow", "visible"), f.addClass("mCSB_outside").after(c)) : (f.addClass("mCSB_inside").append(c), m.wrap(h)), _.call(this);
            var g = [t("#mCSB_" + a.idx + "_dragger_vertical"), t("#mCSB_" + a.idx + "_dragger_horizontal")];
            g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
        }, y = function (e) {
            var n = [e[0].scrollWidth, Math.max.apply(Math, e.children().map(function () {
                return t(this).outerWidth(!0)
            }).get())], r = e.parent().width();
            return n[0] > r ? n[0] : n[1] > r ? n[1] : "100%"
        }, b = function () {
            var e = t(this), n = e.data(r), a = n.opt, i = t("#mCSB_" + n.idx + "_container");
            if (a.advanced.autoExpandHorizontalScroll && "y" !== a.axis) {
                i.css({width: "auto", "min-width": 0, "overflow-x": "scroll"});
                var o = Math.ceil(i[0].scrollWidth);
                3 === a.advanced.autoExpandHorizontalScroll || 2 !== a.advanced.autoExpandHorizontalScroll && o > i.parent().width() ? i.css({
                    width: o,
                    "min-width": "100%",
                    "overflow-x": "inherit"
                }) : i.css({
                    "overflow-x": "inherit",
                    position: "absolute"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                    "min-width": "100%",
                    position: "relative"
                }).unwrap()
            }
        }, _ = function () {
            var e = t(this), n = e.data(r), a = n.opt, i = t(".mCSB_" + n.idx + "_scrollbar:first"), o = tt(a.scrollButtons.tabindex) ? "tabindex='" + a.scrollButtons.tabindex + "'" : "", s = ["<a href='#' class='" + u[13] + "' oncontextmenu='return false;' " + o + " />", "<a href='#' class='" + u[14] + "' oncontextmenu='return false;' " + o + " />", "<a href='#' class='" + u[15] + "' oncontextmenu='return false;' " + o + " />", "<a href='#' class='" + u[16] + "' oncontextmenu='return false;' " + o + " />"], l = ["x" === a.axis ? s[2] : s[0], "x" === a.axis ? s[3] : s[1], s[2], s[3]];
            a.scrollButtons.enable && i.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
        }, x = function () {
            var e = t(this), n = e.data(r), a = t("#mCSB_" + n.idx), i = t("#mCSB_" + n.idx + "_container"), o = [t("#mCSB_" + n.idx + "_dragger_vertical"), t("#mCSB_" + n.idx + "_dragger_horizontal")], s = [a.height() / i.outerHeight(!1), a.width() / i.outerWidth(!1)], c = [parseInt(o[0].css("min-height")), Math.round(s[0] * o[0].parent().height()), parseInt(o[1].css("min-width")), Math.round(s[1] * o[1].parent().width())], u = l && c[1] < c[0] ? c[0] : c[1], h = l && c[3] < c[2] ? c[2] : c[3];
            o[0].css({
                height: u,
                "max-height": o[0].parent().height() - 10
            }).find(".mCSB_dragger_bar").css({"line-height": c[0] + "px"}), o[1].css({
                width: h,
                "max-width": o[1].parent().width() - 10
            })
        }, w = function () {
            var e = t(this), n = e.data(r), a = t("#mCSB_" + n.idx), i = t("#mCSB_" + n.idx + "_container"), o = [t("#mCSB_" + n.idx + "_dragger_vertical"), t("#mCSB_" + n.idx + "_dragger_horizontal")], s = [i.outerHeight(!1) - a.height(), i.outerWidth(!1) - a.width()], l = [s[0] / (o[0].parent().height() - o[0].height()), s[1] / (o[1].parent().width() - o[1].width())];
            n.scrollRatio = {y: l[0], x: l[1]}
        }, S = function (t, e, n) {
            var r = n ? u[0] + "_expanded" : "", a = t.closest(".mCSB_scrollTools");
            "active" === e ? (t.toggleClass(u[0] + " " + r), a.toggleClass(u[1]), t[0]._draggable = t[0]._draggable ? 0 : 1) : t[0]._draggable || ("hide" === e ? (t.removeClass(u[0]), a.removeClass(u[1])) : (t.addClass(u[0]), a.addClass(u[1])))
        }, k = function () {
            var e = t(this), n = e.data(r), a = t("#mCSB_" + n.idx), i = t("#mCSB_" + n.idx + "_container"), o = null == n.overflowed ? i.height() : i.outerHeight(!1), s = null == n.overflowed ? i.width() : i.outerWidth(!1), l = i[0].scrollHeight, c = i[0].scrollWidth;
            return l > o && (o = l), c > s && (s = c), [o > a.height(), s > a.width()]
        }, C = function () {
            var e = t(this), n = e.data(r), a = n.opt, i = t("#mCSB_" + n.idx), o = t("#mCSB_" + n.idx + "_container"), s = [t("#mCSB_" + n.idx + "_dragger_vertical"), t("#mCSB_" + n.idx + "_dragger_horizontal")];
            if (V(e), ("x" !== a.axis && !n.overflowed[0] || "y" === a.axis && n.overflowed[0]) && (s[0].add(o).css("top", 0), K(e, "_resetY")), "y" !== a.axis && !n.overflowed[1] || "x" === a.axis && n.overflowed[1]) {
                var l = dx = 0;
                "rtl" === n.langDir && (l = i.width() - o.outerWidth(!1), dx = Math.abs(l / n.scrollRatio.x)), o.css("left", l), s[1].css("left", dx), K(e, "_resetX")
            }
        }, P = function () {
            function e() {
                o = setTimeout(function () {
                    t.event.special.mousewheel ? (clearTimeout(o), M.call(n[0])) : e()
                }, 100)
            }

            var n = t(this), a = n.data(r), i = a.opt;
            if (!a.bindEvents) {
                if (I.call(this), i.contentTouchScroll && T.call(this), O.call(this), i.mouseWheel.enable) {
                    var o;
                    e()
                }
                $.call(this), N.call(this), i.advanced.autoScrollOnFocus && j.call(this), i.scrollButtons.enable && R.call(this), i.keyboard.enable && H.call(this), a.bindEvents = !0
            }
        }, B = function () {
            var e = t(this), n = e.data(r), a = n.opt, i = r + "_" + n.idx, o = ".mCSB_" + n.idx + "_scrollbar", s = t("#mCSB_" + n.idx + ",#mCSB_" + n.idx + "_container,#mCSB_" + n.idx + "_container_wrapper," + o + " ." + u[12] + ",#mCSB_" + n.idx + "_dragger_vertical,#mCSB_" + n.idx + "_dragger_horizontal," + o + ">a"), l = t("#mCSB_" + n.idx + "_container");
            a.advanced.releaseDraggableSelectors && s.add(t(a.advanced.releaseDraggableSelectors)), a.advanced.extraDraggableSelectors && s.add(t(a.advanced.extraDraggableSelectors)), n.bindEvents && (t(document).add(t(!D() || top.document)).unbind("." + i), s.each(function () {
                t(this).unbind("." + i)
            }), clearTimeout(e[0]._focusTimeout), Q(e[0], "_focusTimeout"), clearTimeout(n.sequential.step), Q(n.sequential, "step"), clearTimeout(l[0].onCompleteTimeout), Q(l[0], "onCompleteTimeout"), n.bindEvents = !1)
        }, A = function (e) {
            var n = t(this), a = n.data(r), i = a.opt, o = t("#mCSB_" + a.idx + "_container_wrapper"), s = o.length ? o : t("#mCSB_" + a.idx + "_container"), l = [t("#mCSB_" + a.idx + "_scrollbar_vertical"), t("#mCSB_" + a.idx + "_scrollbar_horizontal")], c = [l[0].find(".mCSB_dragger"), l[1].find(".mCSB_dragger")];
            "x" !== i.axis && (a.overflowed[0] && !e ? (l[0].add(c[0]).add(l[0].children("a")).css("display", "block"), s.removeClass(u[8] + " " + u[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), s.removeClass(u[10])) : (l[0].css("display", "none"), s.addClass(u[10])), s.addClass(u[8]))), "y" !== i.axis && (a.overflowed[1] && !e ? (l[1].add(c[1]).add(l[1].children("a")).css("display", "block"), s.removeClass(u[9] + " " + u[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), s.removeClass(u[11])) : (l[1].css("display", "none"), s.addClass(u[11])), s.addClass(u[9]))), a.overflowed[0] || a.overflowed[1] ? n.removeClass(u[5]) : n.addClass(u[5])
        }, E = function (e) {
            var n = e.type, r = e.target.ownerDocument !== document ? [t(frameElement).offset().top, t(frameElement).offset().left] : null, a = D() && e.target.ownerDocument !== top.document ? [t(e.view.frameElement).offset().top, t(e.view.frameElement).offset().left] : [0, 0];
            switch (n) {
                case"pointerdown":
                case"MSPointerDown":
                case"pointermove":
                case"MSPointerMove":
                case"pointerup":
                case"MSPointerUp":
                    return r ? [e.originalEvent.pageY - r[0] + a[0], e.originalEvent.pageX - r[1] + a[1], !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
                case"touchstart":
                case"touchmove":
                case"touchend":
                    var i = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0], o = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                    return e.target.ownerDocument !== document ? [i.screenY, i.screenX, o > 1] : [i.pageY, i.pageX, o > 1];
                default:
                    return r ? [e.pageY - r[0] + a[0], e.pageX - r[1] + a[1], !1] : [e.pageY, e.pageX, !1]
            }
        }, I = function () {
            function e(t) {
                var e = f.find("iframe");
                if (e.length) {
                    var n = t ? "auto" : "none";
                    e.css("pointer-events", n)
                }
            }

            function n(t, e, n, r) {
                if (f[0].idleTimer = h.scrollInertia < 233 ? 250 : 0, a.attr("id") === d[1])var i = "x", o = (a[0].offsetLeft - e + r) * u.scrollRatio.x; else var i = "y", o = (a[0].offsetTop - t + n) * u.scrollRatio.y;
                K(s, o.toString(), {dir: i, drag: !0})
            }

            var a, i, o, s = t(this), u = s.data(r), h = u.opt, p = r + "_" + u.idx, d = ["mCSB_" + u.idx + "_dragger_vertical", "mCSB_" + u.idx + "_dragger_horizontal"], f = t("#mCSB_" + u.idx + "_container"), m = t("#" + d[0] + ",#" + d[1]), g = h.advanced.releaseDraggableSelectors ? m.add(t(h.advanced.releaseDraggableSelectors)) : m, v = h.advanced.extraDraggableSelectors ? t(!D() || top.document).add(t(h.advanced.extraDraggableSelectors)) : t(!D() || top.document);
            m.bind("mousedown." + p + " touchstart." + p + " pointerdown." + p + " MSPointerDown." + p, function (n) {
                if (n.stopImmediatePropagation(), n.preventDefault(), G(n)) {
                    c = !0, l && (document.onselectstart = function () {
                        return !1
                    }), e(!1), V(s), a = t(this);
                    var r = a.offset(), u = E(n)[0] - r.top, p = E(n)[1] - r.left, d = a.height() + r.top, f = a.width() + r.left;
                    d > u && u > 0 && f > p && p > 0 && (i = u, o = p), S(a, "active", h.autoExpandScrollbar)
                }
            }).bind("touchmove." + p, function (t) {
                t.stopImmediatePropagation(), t.preventDefault();
                var e = a.offset(), r = E(t)[0] - e.top, s = E(t)[1] - e.left;
                n(i, o, r, s)
            }), t(document).add(v).bind("mousemove." + p + " pointermove." + p + " MSPointerMove." + p, function (t) {
                if (a) {
                    var e = a.offset(), r = E(t)[0] - e.top, s = E(t)[1] - e.left;
                    if (i === r && o === s)return;
                    n(i, o, r, s)
                }
            }).add(g).bind("mouseup." + p + " touchend." + p + " pointerup." + p + " MSPointerUp." + p, function (t) {
                a && (S(a, "active", h.autoExpandScrollbar), a = null), c = !1, l && (document.onselectstart = null), e(!0)
            })
        }, T = function () {
            function n(t) {
                if (!Z(t) || c || E(t)[2])return void(e = 0);
                e = 1, w = 0, S = 0, u = 1, k.removeClass("mCS_touch_action");
                var n = I.offset();
                h = E(t)[0] - n.top, p = E(t)[1] - n.left, j = [E(t)[0], E(t)[1]]
            }

            function a(t) {
                if (Z(t) && !c && !E(t)[2] && (P.documentTouchScroll || t.preventDefault(), t.stopImmediatePropagation(), (!S || w) && u)) {
                    g = X();
                    var e = A.offset(), n = E(t)[0] - e.top, r = E(t)[1] - e.left, a = "mcsLinearOut";
                    if (O.push(n), M.push(r), j[2] = Math.abs(E(t)[0] - j[0]), j[3] = Math.abs(E(t)[1] - j[1]), C.overflowed[0])var i = T[0].parent().height() - T[0].height(), o = h - n > 0 && n - h > -(i * C.scrollRatio.y) && (2 * j[3] < j[2] || "yx" === P.axis);
                    if (C.overflowed[1])var s = T[1].parent().width() - T[1].width(), d = p - r > 0 && r - p > -(s * C.scrollRatio.x) && (2 * j[2] < j[3] || "yx" === P.axis);
                    o || d ? (H || t.preventDefault(), w = 1) : (S = 1, k.addClass("mCS_touch_action")), H && t.preventDefault(), _ = "yx" === P.axis ? [h - n, p - r] : "x" === P.axis ? [null, p - r] : [h - n, null], I[0].idleTimer = 250, C.overflowed[0] && l(_[0], L, a, "y", "all", !0), C.overflowed[1] && l(_[1], L, a, "x", $, !0)
                }
            }

            function i(t) {
                if (!Z(t) || c || E(t)[2])return void(e = 0);
                e = 1, t.stopImmediatePropagation(), V(k), m = X();
                var n = A.offset();
                d = E(t)[0] - n.top, f = E(t)[1] - n.left, O = [], M = []
            }

            function o(t) {
                if (Z(t) && !c && !E(t)[2]) {
                    u = 0, t.stopImmediatePropagation(), w = 0, S = 0, v = X();
                    var e = A.offset(), n = E(t)[0] - e.top, r = E(t)[1] - e.left;
                    if (!(v - g > 30)) {
                        b = 1e3 / (v - m);
                        var a = "mcsEaseOut", i = 2.5 > b, o = i ? [O[O.length - 2], M[M.length - 2]] : [0, 0];
                        y = i ? [n - o[0], r - o[1]] : [n - d, r - f];
                        var h = [Math.abs(y[0]), Math.abs(y[1])];
                        b = i ? [Math.abs(y[0] / 4), Math.abs(y[1] / 4)] : [b, b];
                        var p = [Math.abs(I[0].offsetTop) - y[0] * s(h[0] / b[0], b[0]), Math.abs(I[0].offsetLeft) - y[1] * s(h[1] / b[1], b[1])];
                        _ = "yx" === P.axis ? [p[0], p[1]] : "x" === P.axis ? [null, p[1]] : [p[0], null], x = [4 * h[0] + P.scrollInertia, 4 * h[1] + P.scrollInertia];
                        var k = parseInt(P.contentTouchScroll) || 0;
                        _[0] = h[0] > k ? _[0] : 0, _[1] = h[1] > k ? _[1] : 0, C.overflowed[0] && l(_[0], x[0], a, "y", $, !1), C.overflowed[1] && l(_[1], x[1], a, "x", $, !1)
                    }
                }
            }

            function s(t, e) {
                var n = [1.5 * e, 2 * e, e / 1.5, e / 2];
                return t > 90 ? e > 4 ? n[0] : n[3] : t > 60 ? e > 3 ? n[3] : n[2] : t > 30 ? e > 8 ? n[1] : e > 6 ? n[0] : e > 4 ? e : n[2] : e > 8 ? e : n[3]
            }

            function l(t, e, n, r, a, i) {
                t && K(k, t.toString(), {dur: e, scrollEasing: n, dir: r, overwrite: a, drag: i})
            }

            var u, h, p, d, f, m, g, v, y, b, _, x, w, S, k = t(this), C = k.data(r), P = C.opt, B = r + "_" + C.idx, A = t("#mCSB_" + C.idx), I = t("#mCSB_" + C.idx + "_container"), T = [t("#mCSB_" + C.idx + "_dragger_vertical"), t("#mCSB_" + C.idx + "_dragger_horizontal")], O = [], M = [], L = 0, $ = "yx" === P.axis ? "none" : "all", j = [], N = I.find("iframe"), R = ["touchstart." + B + " pointerdown." + B + " MSPointerDown." + B, "touchmove." + B + " pointermove." + B + " MSPointerMove." + B, "touchend." + B + " pointerup." + B + " MSPointerUp." + B], H = void 0 !== document.body.style.touchAction;
            I.bind(R[0], function (t) {
                n(t)
            }).bind(R[1], function (t) {
                a(t)
            }), A.bind(R[0], function (t) {
                i(t)
            }).bind(R[2], function (t) {
                o(t)
            }), N.length && N.each(function () {
                t(this).load(function () {
                    D(this) && t(this.contentDocument || this.contentWindow.document).bind(R[0], function (t) {
                        n(t), i(t)
                    }).bind(R[1], function (t) {
                        a(t)
                    }).bind(R[2], function (t) {
                        o(t)
                    })
                })
            })
        }, O = function () {
            function n() {
                return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
            }

            function a(t, e, n) {
                u.type = n && i ? "stepped" : "stepless", u.scrollAmount = 10, F(o, t, e, "mcsLinearOut", n ? 60 : null)
            }

            var i, o = t(this), s = o.data(r), l = s.opt, u = s.sequential, h = r + "_" + s.idx, p = t("#mCSB_" + s.idx + "_container"), d = p.parent();
            p.bind("mousedown." + h, function (t) {
                e || i || (i = 1, c = !0)
            }).add(document).bind("mousemove." + h, function (t) {
                if (!e && i && n()) {
                    var r = p.offset(), o = E(t)[0] - r.top + p[0].offsetTop, c = E(t)[1] - r.left + p[0].offsetLeft;
                    o > 0 && o < d.height() && c > 0 && c < d.width() ? u.step && a("off", null, "stepped") : ("x" !== l.axis && s.overflowed[0] && (0 > o ? a("on", 38) : o > d.height() && a("on", 40)), "y" !== l.axis && s.overflowed[1] && (0 > c ? a("on", 37) : c > d.width() && a("on", 39)))
                }
            }).bind("mouseup." + h + " dragend." + h, function (t) {
                e || (i && (i = 0, a("off", null)), c = !1)
            })
        }, M = function () {
            function e(e, r) {
                if (V(n), !L(n, e.target)) {
                    var o = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : l && e.deltaFactor < 100 ? 100 : e.deltaFactor || 100, u = i.scrollInertia;
                    if ("x" === i.axis || "x" === i.mouseWheel.axis)var h = "x", p = [Math.round(o * a.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)], d = "auto" !== i.mouseWheel.scrollAmount ? p[1] : p[0] >= s.width() ? .9 * s.width() : p[0], f = Math.abs(t("#mCSB_" + a.idx + "_container")[0].offsetLeft), m = c[1][0].offsetLeft, g = c[1].parent().width() - c[1].width(), v = e.deltaX || e.deltaY || r; else var h = "y", p = [Math.round(o * a.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)], d = "auto" !== i.mouseWheel.scrollAmount ? p[1] : p[0] >= s.height() ? .9 * s.height() : p[0], f = Math.abs(t("#mCSB_" + a.idx + "_container")[0].offsetTop), m = c[0][0].offsetTop, g = c[0].parent().height() - c[0].height(), v = e.deltaY || r;
                    "y" === h && !a.overflowed[0] || "x" === h && !a.overflowed[1] || ((i.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== m || 0 > v && m !== g || i.mouseWheel.preventDefault) && (e.stopImmediatePropagation(), e.preventDefault()), e.deltaFactor < 2 && !i.mouseWheel.normalizeDelta && (d = e.deltaFactor, u = 17), K(n, (f - v * d).toString(), {
                        dir: h,
                        dur: u
                    }))
                }
            }

            if (t(this).data(r)) {
                var n = t(this), a = n.data(r), i = a.opt, o = r + "_" + a.idx, s = t("#mCSB_" + a.idx), c = [t("#mCSB_" + a.idx + "_dragger_vertical"), t("#mCSB_" + a.idx + "_dragger_horizontal")], u = t("#mCSB_" + a.idx + "_container").find("iframe");
                u.length && u.each(function () {
                    t(this).load(function () {
                        D(this) && t(this.contentDocument || this.contentWindow.document).bind("mousewheel." + o, function (t, n) {
                            e(t, n)
                        })
                    })
                }), s.bind("mousewheel." + o, function (t, n) {
                    e(t, n)
                })
            }
        }, D = function (t) {
            var e = null;
            if (t) {
                try {
                    var n = t.contentDocument || t.contentWindow.document;
                    e = n.body.innerHTML
                } catch (r) {
                }
                return null !== e
            }
            try {
                var n = top.document;
                e = n.body.innerHTML
            } catch (r) {
            }
            return null !== e
        }, L = function (e, n) {
            var a = n.nodeName.toLowerCase(), i = e.data(r).opt.mouseWheel.disableOver, o = ["select", "textarea"];
            return t.inArray(a, i) > -1 && !(t.inArray(a, o) > -1 && !t(n).is(":focus"))
        }, $ = function () {
            var e, n = t(this), a = n.data(r), i = r + "_" + a.idx, o = t("#mCSB_" + a.idx + "_container"), s = o.parent(), l = t(".mCSB_" + a.idx + "_scrollbar ." + u[12]);
            l.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function (n) {
                c = !0, t(n.target).hasClass("mCSB_dragger") || (e = 1)
            }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function (t) {
                c = !1
            }).bind("click." + i, function (r) {
                if (e && (e = 0, t(r.target).hasClass(u[12]) || t(r.target).hasClass("mCSB_draggerRail"))) {
                    V(n);
                    var i = t(this), l = i.find(".mCSB_dragger");
                    if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                        if (!a.overflowed[1])return;
                        var c = "x", h = r.pageX > l.offset().left ? -1 : 1, p = Math.abs(o[0].offsetLeft) - h * (.9 * s.width())
                    } else {
                        if (!a.overflowed[0])return;
                        var c = "y", h = r.pageY > l.offset().top ? -1 : 1, p = Math.abs(o[0].offsetTop) - h * (.9 * s.height())
                    }
                    K(n, p.toString(), {dir: c, scrollEasing: "mcsEaseInOut"})
                }
            })
        }, j = function () {
            var e = t(this), n = e.data(r), a = n.opt, i = r + "_" + n.idx, o = t("#mCSB_" + n.idx + "_container"), s = o.parent();
            o.bind("focusin." + i, function (n) {
                var r = t(document.activeElement), i = o.find(".mCustomScrollBox").length, l = 0;
                r.is(a.advanced.autoScrollOnFocus) && (V(e), clearTimeout(e[0]._focusTimeout), e[0]._focusTimer = i ? (l + 17) * i : 0, e[0]._focusTimeout = setTimeout(function () {
                    var t = [et(r)[0], et(r)[1]], n = [o[0].offsetTop, o[0].offsetLeft], i = [n[0] + t[0] >= 0 && n[0] + t[0] < s.height() - r.outerHeight(!1), n[1] + t[1] >= 0 && n[0] + t[1] < s.width() - r.outerWidth(!1)], c = "yx" !== a.axis || i[0] || i[1] ? "all" : "none";
                    "x" === a.axis || i[0] || K(e, t[0].toString(), {
                        dir: "y",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: l
                    }), "y" === a.axis || i[1] || K(e, t[1].toString(), {
                        dir: "x",
                        scrollEasing: "mcsEaseInOut",
                        overwrite: c,
                        dur: l
                    })
                }, e[0]._focusTimer))
            })
        }, N = function () {
            var e = t(this), n = e.data(r), a = r + "_" + n.idx, i = t("#mCSB_" + n.idx + "_container").parent();
            i.bind("scroll." + a, function (e) {
                (0 !== i.scrollTop() || 0 !== i.scrollLeft()) && t(".mCSB_" + n.idx + "_scrollbar").css("visibility", "hidden")
            })
        }, R = function () {
            var e = t(this), n = e.data(r), a = n.opt, i = n.sequential, o = r + "_" + n.idx, s = ".mCSB_" + n.idx + "_scrollbar", l = t(s + ">a");
            l.bind("mousedown." + o + " touchstart." + o + " pointerdown." + o + " MSPointerDown." + o + " mouseup." + o + " touchend." + o + " pointerup." + o + " MSPointerUp." + o + " mouseout." + o + " pointerout." + o + " MSPointerOut." + o + " click." + o, function (r) {
                function o(t, n) {
                    i.scrollAmount = a.scrollButtons.scrollAmount, F(e, t, n)
                }

                if (r.preventDefault(), G(r)) {
                    var s = t(this).attr("class");
                    switch (i.type = a.scrollButtons.scrollType, r.type) {
                        case"mousedown":
                        case"touchstart":
                        case"pointerdown":
                        case"MSPointerDown":
                            if ("stepped" === i.type)return;
                            c = !0, n.tweenRunning = !1, o("on", s);
                            break;
                        case"mouseup":
                        case"touchend":
                        case"pointerup":
                        case"MSPointerUp":
                        case"mouseout":
                        case"pointerout":
                        case"MSPointerOut":
                            if ("stepped" === i.type)return;
                            c = !1, i.dir && o("off", s);
                            break;
                        case"click":
                            if ("stepped" !== i.type || n.tweenRunning)return;
                            o("on", s)
                    }
                }
            })
        }, H = function () {
            function e(e) {
                function r(t, e) {
                    o.type = i.keyboard.scrollType, o.scrollAmount = i.keyboard.scrollAmount, "stepped" === o.type && a.tweenRunning || F(n, t, e)
                }

                switch (e.type) {
                    case"blur":
                        a.tweenRunning && o.dir && r("off", null);
                        break;
                    case"keydown":
                    case"keyup":
                        var s = e.keyCode ? e.keyCode : e.which, l = "on";
                        if ("x" !== i.axis && (38 === s || 40 === s) || "y" !== i.axis && (37 === s || 39 === s)) {
                            if ((38 === s || 40 === s) && !a.overflowed[0] || (37 === s || 39 === s) && !a.overflowed[1])return;
                            "keyup" === e.type && (l = "off"), t(document.activeElement).is(h) || (e.preventDefault(), e.stopImmediatePropagation(), r(l, s))
                        } else if (33 === s || 34 === s) {
                            if ((a.overflowed[0] || a.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type) {
                                V(n);
                                var p = 34 === s ? -1 : 1;
                                if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0])var d = "x", f = Math.abs(c[0].offsetLeft) - p * (.9 * u.width()); else var d = "y", f = Math.abs(c[0].offsetTop) - p * (.9 * u.height());
                                K(n, f.toString(), {dir: d, scrollEasing: "mcsEaseInOut"})
                            }
                        } else if ((35 === s || 36 === s) && !t(document.activeElement).is(h) && ((a.overflowed[0] || a.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type)) {
                            if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0])var d = "x", f = 35 === s ? Math.abs(u.width() - c.outerWidth(!1)) : 0; else var d = "y", f = 35 === s ? Math.abs(u.height() - c.outerHeight(!1)) : 0;
                            K(n, f.toString(), {dir: d, scrollEasing: "mcsEaseInOut"})
                        }
                }
            }

            var n = t(this), a = n.data(r), i = a.opt, o = a.sequential, s = r + "_" + a.idx, l = t("#mCSB_" + a.idx), c = t("#mCSB_" + a.idx + "_container"), u = c.parent(), h = "input,textarea,select,datalist,keygen,[contenteditable='true']", p = c.find("iframe"), d = ["blur." + s + " keydown." + s + " keyup." + s];
            p.length && p.each(function () {
                t(this).load(function () {
                    D(this) && t(this.contentDocument || this.contentWindow.document).bind(d[0], function (t) {
                        e(t)
                    })
                })
            }), l.attr("tabindex", "0").bind(d[0], function (t) {
                e(t)
            })
        }, F = function (e, n, a, i, o) {
            function s(t) {
                h.snapAmount && (p.scrollAmount = h.snapAmount instanceof Array ? "x" === p.dir[0] ? h.snapAmount[1] : h.snapAmount[0] : h.snapAmount);
                var n = "stepped" !== p.type, r = o ? o : t ? n ? m / 1.5 : g : 1e3 / 60, a = t ? n ? 7.5 : 40 : 2.5, l = [Math.abs(d[0].offsetTop), Math.abs(d[0].offsetLeft)], u = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x], f = "x" === p.dir[0] ? l[1] + p.dir[1] * (u[1] * a) : l[0] + p.dir[1] * (u[0] * a), v = "x" === p.dir[0] ? l[1] + p.dir[1] * parseInt(p.scrollAmount) : l[0] + p.dir[1] * parseInt(p.scrollAmount), y = "auto" !== p.scrollAmount ? v : f, b = i ? i : t ? n ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear", _ = t ? !0 : !1;
                return t && 17 > r && (y = "x" === p.dir[0] ? l[1] : l[0]), K(e, y.toString(), {
                    dir: p.dir[0],
                    scrollEasing: b,
                    dur: r,
                    onComplete: _
                }), t ? void(p.dir = !1) : (clearTimeout(p.step), void(p.step = setTimeout(function () {
                    s()
                }, r)))
            }

            function l() {
                clearTimeout(p.step), Q(p, "step"), V(e)
            }

            var c = e.data(r), h = c.opt, p = c.sequential, d = t("#mCSB_" + c.idx + "_container"), f = "stepped" === p.type ? !0 : !1, m = h.scrollInertia < 26 ? 26 : h.scrollInertia, g = h.scrollInertia < 1 ? 17 : h.scrollInertia;
            switch (n) {
                case"on":
                    if (p.dir = [a === u[16] || a === u[15] || 39 === a || 37 === a ? "x" : "y", a === u[13] || a === u[15] || 38 === a || 37 === a ? -1 : 1], V(e), tt(a) && "stepped" === p.type)return;
                    s(f);
                    break;
                case"off":
                    l(), (f || c.tweenRunning && p.dir) && s(!0)
            }
        }, q = function (e) {
            var n = t(this).data(r).opt, a = [];
            return "function" == typeof e && (e = e()), e instanceof Array ? a = e.length > 1 ? [e[0], e[1]] : "x" === n.axis ? [null, e[0]] : [e[0], null] : (a[0] = e.y ? e.y : e.x || "x" === n.axis ? null : e, a[1] = e.x ? e.x : e.y || "y" === n.axis ? null : e), "function" == typeof a[0] && (a[0] = a[0]()), "function" == typeof a[1] && (a[1] = a[1]()), a
        }, z = function (e, n) {
            if (null != e && "undefined" != typeof e) {
                var a = t(this), i = a.data(r), o = i.opt, s = t("#mCSB_" + i.idx + "_container"), l = s.parent(), c = typeof e;
                n || (n = "x" === o.axis ? "x" : "y");
                var u = "x" === n ? s.outerWidth(!1) : s.outerHeight(!1), p = "x" === n ? s[0].offsetLeft : s[0].offsetTop, d = "x" === n ? "left" : "top";
                switch (c) {
                    case"function":
                        return e();
                    case"object":
                        var f = e.jquery ? e : t(e);
                        if (!f.length)return;
                        return "x" === n ? et(f)[1] : et(f)[0];
                    case"string":
                    case"number":
                        if (tt(e))return Math.abs(e);
                        if (-1 !== e.indexOf("%"))return Math.abs(u * parseInt(e) / 100);
                        if (-1 !== e.indexOf("-="))return Math.abs(p - parseInt(e.split("-=")[1]));
                        if (-1 !== e.indexOf("+=")) {
                            var m = p + parseInt(e.split("+=")[1]);
                            return m >= 0 ? 0 : Math.abs(m)
                        }
                        if (-1 !== e.indexOf("px") && tt(e.split("px")[0]))return Math.abs(e.split("px")[0]);
                        if ("top" === e || "left" === e)return 0;
                        if ("bottom" === e)return Math.abs(l.height() - s.outerHeight(!1));
                        if ("right" === e)return Math.abs(l.width() - s.outerWidth(!1));
                        if ("first" === e || "last" === e) {
                            var f = s.find(":" + e);
                            return "x" === n ? et(f)[1] : et(f)[0]
                        }
                        return t(e).length ? "x" === n ? et(t(e))[1] : et(t(e))[0] : (s.css(d, e), void h.update.call(null, a[0]))
                }
            }
        }, W = function (e) {
            function n() {
                return clearTimeout(p[0].autoUpdate), 0 === s.parents("html").length ? void(s = null) : void(p[0].autoUpdate = setTimeout(function () {
                    return c.advanced.updateOnSelectorChange && (l.poll.change.n = i(), l.poll.change.n !== l.poll.change.o) ? (l.poll.change.o = l.poll.change.n, void o(3)) : c.advanced.updateOnContentResize && (l.poll.size.n = s[0].scrollHeight + s[0].scrollWidth + p[0].offsetHeight + s[0].offsetHeight + s[0].offsetWidth, l.poll.size.n !== l.poll.size.o) ? (l.poll.size.o = l.poll.size.n, void o(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (l.poll.img.n = p.find("img").length, l.poll.img.n === l.poll.img.o) ? void((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && n()) : (l.poll.img.o = l.poll.img.n, void p.find("img").each(function () {
                        a(this)
                    }))
                }, c.advanced.autoUpdateTimeout))
            }

            function a(e) {
                function n(t, e) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                }

                function r() {
                    this.onload = null, t(e).addClass(u[2]), o(2)
                }

                if (t(e).hasClass(u[2]))return void o();
                var a = new Image;
                a.onload = n(a, r), a.src = e.src
            }

            function i() {
                c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                var t = 0, e = p.find(c.advanced.updateOnSelectorChange);
                return c.advanced.updateOnSelectorChange && e.length > 0 && e.each(function () {
                    t += this.offsetHeight + this.offsetWidth
                }), t
            }

            function o(t) {
                clearTimeout(p[0].autoUpdate), h.update.call(null, s[0], t)
            }

            var s = t(this), l = s.data(r), c = l.opt, p = t("#mCSB_" + l.idx + "_container");
            return e ? (clearTimeout(p[0].autoUpdate), void Q(p[0], "autoUpdate")) : void n()
        }, U = function (t, e, n) {
            return Math.round(t / e) * e - n
        }, V = function (e) {
            var n = e.data(r), a = t("#mCSB_" + n.idx + "_container,#mCSB_" + n.idx + "_container_wrapper,#mCSB_" + n.idx + "_dragger_vertical,#mCSB_" + n.idx + "_dragger_horizontal");
            a.each(function () {
                J.call(this)
            })
        }, K = function (e, n, a) {
            function i(t) {
                return l && c.callbacks[t] && "function" == typeof c.callbacks[t]
            }

            function o() {
                return [c.callbacks.alwaysTriggerOffsets || _ >= x[0] + k, c.callbacks.alwaysTriggerOffsets || -C >= _]
            }

            function s() {
                var t = [d[0].offsetTop, d[0].offsetLeft], n = [y[0].offsetTop, y[0].offsetLeft], r = [d.outerHeight(!1), d.outerWidth(!1)], i = [p.height(), p.width()];
                e[0].mcs = {
                    content: d,
                    top: t[0],
                    left: t[1],
                    draggerTop: n[0],
                    draggerLeft: n[1],
                    topPct: Math.round(100 * Math.abs(t[0]) / (Math.abs(r[0]) - i[0])),
                    leftPct: Math.round(100 * Math.abs(t[1]) / (Math.abs(r[1]) - i[1])),
                    direction: a.dir
                }
            }

            var l = e.data(r), c = l.opt, u = {
                trigger: "internal",
                dir: "y",
                scrollEasing: "mcsEaseOut",
                drag: !1,
                dur: c.scrollInertia,
                overwrite: "all",
                callbacks: !0,
                onStart: !0,
                onUpdate: !0,
                onComplete: !0
            }, a = t.extend(u, a), h = [a.dur, a.drag ? 0 : a.dur], p = t("#mCSB_" + l.idx), d = t("#mCSB_" + l.idx + "_container"), f = d.parent(), m = c.callbacks.onTotalScrollOffset ? q.call(e, c.callbacks.onTotalScrollOffset) : [0, 0], g = c.callbacks.onTotalScrollBackOffset ? q.call(e, c.callbacks.onTotalScrollBackOffset) : [0, 0];
            if (l.trigger = a.trigger, (0 !== f.scrollTop() || 0 !== f.scrollLeft()) && (t(".mCSB_" + l.idx + "_scrollbar").css("visibility", "visible"), f.scrollTop(0).scrollLeft(0)), "_resetY" !== n || l.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(e[0]), l.contentReset.y = 1), "_resetX" !== n || l.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(e[0]), l.contentReset.x = 1), "_resetY" !== n && "_resetX" !== n) {
                if (!l.contentReset.y && e[0].mcs || !l.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(e[0]), l.contentReset.x = null), !l.contentReset.x && e[0].mcs || !l.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(e[0]), l.contentReset.x = null), c.snapAmount) {
                    var v = c.snapAmount instanceof Array ? "x" === a.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                    n = U(n, v, c.snapOffset)
                }
                switch (a.dir) {
                    case"x":
                        var y = t("#mCSB_" + l.idx + "_dragger_horizontal"), b = "left", _ = d[0].offsetLeft, x = [p.width() - d.outerWidth(!1), y.parent().width() - y.width()], w = [n, 0 === n ? 0 : n / l.scrollRatio.x], k = m[1], C = g[1], P = k > 0 ? k / l.scrollRatio.x : 0, B = C > 0 ? C / l.scrollRatio.x : 0;
                        break;
                    case"y":
                        var y = t("#mCSB_" + l.idx + "_dragger_vertical"), b = "top", _ = d[0].offsetTop, x = [p.height() - d.outerHeight(!1), y.parent().height() - y.height()], w = [n, 0 === n ? 0 : n / l.scrollRatio.y], k = m[0], C = g[0], P = k > 0 ? k / l.scrollRatio.y : 0, B = C > 0 ? C / l.scrollRatio.y : 0
                }
                w[1] < 0 || 0 === w[0] && 0 === w[1] ? w = [0, 0] : w[1] >= x[1] ? w = [x[0], x[1]] : w[0] = -w[0], e[0].mcs || (s(), i("onInit") && c.callbacks.onInit.call(e[0])), clearTimeout(d[0].onCompleteTimeout), Y(y[0], b, Math.round(w[1]), h[1], a.scrollEasing), (l.tweenRunning || !(0 === _ && w[0] >= 0 || _ === x[0] && w[0] <= x[0])) && Y(d[0], b, Math.round(w[0]), h[0], a.scrollEasing, a.overwrite, {
                    onStart: function () {
                        a.callbacks && a.onStart && !l.tweenRunning && (i("onScrollStart") && (s(), c.callbacks.onScrollStart.call(e[0])), l.tweenRunning = !0, S(y), l.cbOffsets = o())
                    }, onUpdate: function () {
                        a.callbacks && a.onUpdate && i("whileScrolling") && (s(), c.callbacks.whileScrolling.call(e[0]))
                    }, onComplete: function () {
                        if (a.callbacks && a.onComplete) {
                            "yx" === c.axis && clearTimeout(d[0].onCompleteTimeout);
                            var t = d[0].idleTimer || 0;
                            d[0].onCompleteTimeout = setTimeout(function () {
                                i("onScroll") && (s(), c.callbacks.onScroll.call(e[0])), i("onTotalScroll") && w[1] >= x[1] - P && l.cbOffsets[0] && (s(), c.callbacks.onTotalScroll.call(e[0])), i("onTotalScrollBack") && w[1] <= B && l.cbOffsets[1] && (s(), c.callbacks.onTotalScrollBack.call(e[0])), l.tweenRunning = !1, d[0].idleTimer = 0, S(y, "hide")
                            }, t)
                        }
                    }
                })
            }
        }, Y = function (t, e, n, r, a, i, o) {
            function s() {
                x.stop || (y || f.call(), y = X() - v, l(), y >= x.time && (x.time = y > x.time ? y + p - (y - x.time) : y + p - 1, x.time < y + 1 && (x.time = y + 1)), x.time < r ? x.id = d(s) : g.call())
            }

            function l() {
                r > 0 ? (x.currVal = h(x.time, b, w, r, a), _[e] = Math.round(x.currVal) + "px") : _[e] = n + "px", m.call()
            }

            function c() {
                p = 1e3 / 60, x.time = y + p, d = window.requestAnimationFrame ? window.requestAnimationFrame : function (t) {
                    return l(), setTimeout(t, .01)
                }, x.id = d(s)
            }

            function u() {
                null != x.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(x.id) : clearTimeout(x.id), x.id = null)
            }

            function h(t, e, n, r, a) {
                switch (a) {
                    case"linear":
                    case"mcsLinear":
                        return n * t / r + e;
                    case"mcsLinearOut":
                        return t /= r, t--, n * Math.sqrt(1 - t * t) + e;
                    case"easeInOutSmooth":
                        return t /= r / 2, 1 > t ? n / 2 * t * t + e : (t--, -n / 2 * (t * (t - 2) - 1) + e);
                    case"easeInOutStrong":
                        return t /= r / 2, 1 > t ? n / 2 * Math.pow(2, 10 * (t - 1)) + e : (t--, n / 2 * (-Math.pow(2, -10 * t) + 2) + e);
                    case"easeInOut":
                    case"mcsEaseInOut":
                        return t /= r / 2, 1 > t ? n / 2 * t * t * t + e : (t -= 2, n / 2 * (t * t * t + 2) + e);
                    case"easeOutSmooth":
                        return t /= r, t--, -n * (t * t * t * t - 1) + e;
                    case"easeOutStrong":
                        return n * (-Math.pow(2, -10 * t / r) + 1) + e;
                    case"easeOut":
                    case"mcsEaseOut":
                    default:
                        var i = (t /= r) * t, o = i * t;
                        return e + n * (.499999999999997 * o * i + -2.5 * i * i + 5.5 * o + -6.5 * i + 4 * t)
                }
            }

            t._mTween || (t._mTween = {top: {}, left: {}});
            var p, d, o = o || {}, f = o.onStart || function () {
                }, m = o.onUpdate || function () {
                }, g = o.onComplete || function () {
                }, v = X(), y = 0, b = t.offsetTop, _ = t.style, x = t._mTween[e];
            "left" === e && (b = t.offsetLeft);
            var w = n - b;
            x.stop = 0, "none" !== i && u(), c()
        }, X = function () {
            return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
        }, J = function () {
            var t = this;
            t._mTween || (t._mTween = {top: {}, left: {}});
            for (var e = ["top", "left"], n = 0; n < e.length; n++) {
                var r = e[n];
                t._mTween[r].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(t._mTween[r].id) : clearTimeout(t._mTween[r].id), t._mTween[r].id = null, t._mTween[r].stop = 1)
            }
        }, Q = function (t, e) {
            try {
                delete t[e]
            } catch (n) {
                t[e] = null
            }
        }, G = function (t) {
            return !(t.which && 1 !== t.which)
        }, Z = function (t) {
            var e = t.originalEvent.pointerType;
            return !(e && "touch" !== e && 2 !== e)
        }, tt = function (t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }, et = function (t) {
            var e = t.parents(".mCSB_container");
            return [t.offset().top - e.offset().top, t.offset().left - e.offset().left]
        }, nt = function () {
            function t() {
                var t = ["webkit", "moz", "ms", "o"];
                if ("hidden"in document)return "hidden";
                for (var e = 0; e < t.length; e++)if (t[e] + "Hidden"in document)return t[e] + "Hidden";
                return null
            }

            var e = t();
            return e ? document[e] : !1
        };
        t.fn[n] = function (e) {
            return h[e] ? h[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : h.init.apply(this, arguments)
        }, t[n] = function (e) {
            return h[e] ? h[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : h.init.apply(this, arguments)
        }, t[n].defaults = i, window[n] = !0, t(window).load(function () {
            t(a)[n](), t.extend(t.expr[":"], {
                mcsInView: t.expr[":"].mcsInView || function (e) {
                    var n, r, a = t(e), i = a.parents(".mCSB_container");
                    if (i.length)return n = i.parent(), r = [i[0].offsetTop, i[0].offsetLeft], r[0] + et(a)[0] >= 0 && r[0] + et(a)[0] < n.height() - a.outerHeight(!1) && r[1] + et(a)[1] >= 0 && r[1] + et(a)[1] < n.width() - a.outerWidth(!1)
                }, mcsOverflow: t.expr[":"].mcsOverflow || function (e) {
                    var n = t(e).data(r);
                    if (n)return n.overflowed[0] || n.overflowed[1]
                }
            })
        })
    })
}), define("mCustomScrollbar", function () {
}), define("main", ["jquery", "sfModal", "mobile", "jquery_hoverIntent", "sfAjax", "bootstrap", "jquery_cookie", "jquery_lazyload", "underscore", "typeHelper", "jquery-mousewheel", "mCustomScrollbar"], function (t, e, n) {
    var r, a, i, o, s, l, c, u;
    return t(".js-content-restore").on("click", function () {
        var e, n, r, a;
        return e = t(this), a = e.data("type"), r = e.data("id"), n = "/api/" + a + "/" + r + "/delete/cancel", confirm("真的要恢复吗?") ? t.post(n, function (t) {
            return location.reload()
        }) : void 0
    }), t(".mCustomScrollbar").length > 0 && t(".mCustomScrollbar").mCustomScrollbar(), s = function () {
        return t.get("/api/notifications", function (e) {
            var n, r, a;
            return e.status ? void 0 : (e.data = null != (n = e.data) ? n : [], r = {
                data: e.data,
                unread: {
                    general: _.filter(e.data.general, function (t) {
                        return 0 === parseInt(t.viewed)
                    }).length, ranked: _.filter(e.data.ranked, function (t) {
                        return 0 === parseInt(t.viewed)
                    }).length, followed: _.filter(e.data.followed, function (t) {
                        return 0 === parseInt(t.viewed)
                    }).length
                }
            }, a = _.reduce(r.unread, function (t, e) {
                return t + e
            }, 0), a > 0 && t(".message-ingore-all").removeClass("hide"), _.each(r.unread, function (e, n) {
                return e > 0 ? t(".notice-dot-" + n).removeClass("hide") : void 0
            }), t("#messageGeneral").html(_.template(t("#messageGeneralTpl").html())(r.data)), t("#messageRanked").html(_.template(t("#messageRankedTpl").html())(r.data)), t("#messageFollowed").html(_.template(t("#messageFollowedTpl").html())(r.data)), t(".opts__item--message-loading").remove(), t(".mCustomScrollbar").mCustomScrollbar())
        })
    }, t(".message-ingore-all").on("click", function () {
        var e;
        return e = t(this), t.post("/api/notifications/all/view", function (n) {
            return s(), t(".notice-dot").addClass("hide"), e.addClass("hide")
        })
    }), t(".opts__item--message").on("click", ".message__btn--follow", function () {
        var e, n;
        return e = t(this), n = e.data("id"), e.addClass("disabled"), t.post("/api/user/" + n + "/follow", function (t) {
            return s(), e.removeClass("disabled")
        })
    }), t(".opts__item--message").on("click", ".message__btn--unfollow", function () {
        var e, n;
        return e = t(this), n = e.data("id"), e.addClass("disabled"), t.post("/api/user/" + n + "/follow/cancel", function (t) {
            return s(), e.removeClass("disabled")
        })
    }), t(".has-unread").on("click", function (e) {
        var n;
        return n = t(".opts__item--message"), 0 === t(e.target).closest(".opts__item--message").length ? "none" !== n.css("display") ? n.addClass("hide") : (n.removeClass("hide"), s()) : void 0
    }), t(".opts__item--message .btn-group>.btn").on("click", function () {
        var e;
        return t(".opts__item--message .btn-group>.btn.active").removeClass("active"), t(this).addClass("active"), e = t(this).attr("href"), "#messageRanked" !== e || t(this).find(".notice-dot").hasClass("hide") || t.post("/api/notifications/all/view?type=ranked"), "#messageFollowed" !== e || t(this).find(".notice-dot").hasClass("hide") ? void 0 : t.post("/api/notifications/all/view?type=followed")
    }), t("body").on("click", function (e) {
        return "none" !== t(".opts__item--message").css("display") && 0 === t(e.target).closest(".has-unread").length ? t(".opts__item--message").addClass("hide") : void 0
    }), "/tags" === t(".nav__item--more>a").attr("href") || (t("body").on("click", function (e) {
        return "none" !== t(".tag-mgr__box").css("display") && 0 === t(e.target).closest(".nav__item--more").length && 0 === t(e.target).closest(".tag-mgr__box").length ? t(".nav__item--more").trigger("click") : void 0
    }), t(".tag-mgr__query").on("keyup", function (e) {
        var n, r, a, i;
        return n = t(this), i = n.data("tags"), r = t(this).val(), a = function (e) {
            var n, a, o;
            return o = '<li><a href="<%= url %>"><%= name %></a></li>', n = _.filter(i, function (t) {
                return -1 !== t.name.search(e)
            }), a = _.reduce(n, function (t, e) {
                return t + _.template(o)(e)
            }, ""), t(".tag-mgr__list").html(a), t(".tag-mgr__list li").length > 0 && r.length > 0 ? t(".tag-mgr__list li:first-child").addClass("active") : void 0
        }, c.inputT && clearTimeout(c.inputT), c.inputT = setTimeout(function () {
            return a(r)
        }, 300)
    }), t(".tag-mgr__list").on("mouseover", function () {
        return t(".tag-mgr__list li").length > 1 ? t(".tag-mgr__list li.active").removeClass("active") : void 0
    }), c = {inputT: 0, t: 0}, t(".nav__item--more").on("click", function () {
        var e, n, r;
        return n = t(this), e = t(".tag-mgr__box"), r = Number(n.data("open")), r ? e.addClass("hide") : (e.removeClass("hide"), t(".tag-mgr__query").focus()), t(this).data("open", Number(!r))
    })), t("body").on("click", ".reloadCaptcha", function () {
        return t(this).find("img").attr("src", "/user/captcha?w=240&h=50")
    }), t(".js__action--complain").on("click", function () {
        return e({
            title: "我要申诉", content: _.template(t("#js__action--complain-tpl").html()), doneFn: function () {
                return t(".complain__form").submit()
            }
        })
    }), t(".js__view--selector").on("click", function () {
        var e;
        return e = t(this).data("action"), t.cookie("view", e), location.reload()
    }), t.cookie("view") && t(".js__view--selector").removeClass("hidden-sm").removeClass("hidden-md").removeClass("hidden-lg"), i = function () {
        var t, e, n;
        n = "test", e = window.sessionStorage;
        try {
            return e.setItem(n, "1"), e.removeItem(n), !0
        } catch (r) {
            return t = r, !1
        }
    }, u = function (e) {
        var n;
        if (i() && !(e > 500))return localStorage && (n = localStorage.getItem("show-app-promotion-bar"), n = n || !0, n !== !0 ? t(".app-promotion-bar").hide() : t(".app-promotion-bar").show()), t("body").on("click", ".close", function () {
            return t(".app-promotion-bar").hide(), localStorage.setItem("show-app-promotion-bar", !1)
        }), t("body").on("click", ".icon", function () {
            return t(".app-promotion-bar").hide(), localStorage.setItem("show-app-promotion-bar", !1)
        })
    }, u(document.body.clientWidth), a = function (t) {
        var e, n;
        switch (n = "", e = new Date(t), e.getDay()) {
            case 0:
                n = "周日";
                break;
            case 1:
                n = "周一";
                break;
            case 2:
                n = "周二";
                break;
            case 3:
                n = "周三";
                break;
            case 4:
                n = "周四";
                break;
            case 5:
                n = "周五";
                break;
            case 6:
                n = "周六"
        }
        return n
    }, o = function () {
        e({
            modalSize: "modal-lg",
            title: "登录",
            doneText: "登录",
            hideClose: !0,
            hideDone: !0,
            hideFooter: !0,
            content: t("#loginModal").text(),
            show: function () {
                return t("[name=mail]").first().focus(), t("#loginShowMore").click(function (e) {
                    e.preventDefault(), t(this).hide(), t(this).siblings().removeClass("hidden")
                }), t(".sfmodal .widget-login a").click(function (e) {
                    e.preventDefault(), window.open(t(this).attr("href"), "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
                }), t("#loginReloadCaptcha").click(function () {
                    t(this).find("img").attr("src", "/user/captcha?w=240&h=50")
                })
            }
        }), t(".register-mail").typeHelperOld({emailMode: !0, onlyResult: !1})
    }, t(".addWeek").each(function (e, n) {
        t(this).append(" " + a(t(this).html()))
    }), t('[data-toggle="tooltip"]').tooltip({container: "body"}), t("img.lazy").lazyload({effect: "fadeIn"}), window.oauthLogin = function (t) {
        -1 !== location.hostname.indexOf("segmentfault") ? location.reload() : location.href = "/"
    }, window.oauthRegister = function (t) {
        location.href = "/user/bind"
    }, r = {
        _: window.SF.token,
        staticUrl: window.SF.staticUrl,
        userId: t("#SFUserId").attr("value"),
        userRank: t("#SFUserRank").attr("value"),
        login: n.login || o
    }, t(document).ajaxError(function (e, n, r) {
        413 === n.status ? (t("#uploading") && t("#uploading").text(""), alert("文件大小或尺寸超出限制，请修改后重新上传！")) : console.log("Ajax " + n.status + ": ", r.url)
    }), t(document).ajaxSend(function (t, e, n) {
        -1 === n.url.indexOf("?") ? n.url = n.url + "?_=" + r._ : n.url = n.url + "&_=" + r._
    }), t(document).ajaxComplete(function (n, a, i) {
        var o, s, l, c, u, h, p;
        window.captchaPostData = null != (l = window.captchaPostData) ? l : {}, a.responseText && (-1 !== a.responseText.indexOf("<br />") || -1 !== a.responseText.indexOf("<pre>exception ") ? console.log("警告：前方高能！", a.responseText) : a.responseJSON && 1 === a.responseJSON.status && (p = a.responseJSON, -1 === i.url.indexOf("/user/stat") && "login" === p.data[0] ? r.login() : "form" === p.data[0] && p.data[1].hasOwnProperty("captcha") && 1 === _.keys(p.data[1]).length ? (captchaPostData.api = i.url, captchaPostData.data = i.data, e({
            modalSize: "modal-sm",
            title: p.data[1].captcha,
            content: "<div id='captchaPostForm' ><div class='reloadCaptcha'><img title='点击切换验证码'  src='/user/captcha?w=240&h=50' ></div><div class='form-group'><input class='form-action form-control' name='captcha'></div></div>",
            hideClose: !0,
            doneText: "确认并提交",
            doneFn: function () {
                var e;
                return e = t("#captchaPostForm").find("input[name=captcha]"), captchaPostData.captcha = e.val(), t.post("/api/captcha/check", {captcha: captchaPostData.captcha}, function (n) {
                    return n.status ? void 0 : n.data ? t.post(captchaPostData.api, captchaPostData.data + "&captcha=" + captchaPostData.captcha, function (t) {
                        return window.captchaPostData = {}, t.data.hasOwnProperty("url") ? location.href = t.data.url : location.reload()
                    }) : (e.addClass("error"), console.log("验证码错误"), t(".reloadCaptcha").trigger("click"))
                })
            }
        })) : "robot" === p.data[0] ? location.href = "/stop-robot" : "unactivated" === p.data[0] ? t("#activate").modal("show") : "form" === p.data[0] ? (h = i.url.split("/")[2], h = h.split("?")[0], c = new RegExp("[?&]_=" + r._), u = i.url.replace(c, ""), o = !0, t.each(p.data[1], function (e, n) {
            var r, a, i, s;
            return "captcha" === e && (t("[name=captcha]").parents(".form-group").show(), t(".captcha").parent("a").click()), i = e.toLowerCase().replace(/\b[a-z]/g, function (t) {
                return t.toUpperCase()
            }), s = "#" + h + i, 0 === t(s).length && (s = "#" + h.replace(/s$/, "") + i), a = t("form#" + h + " *[name=" + e + "]").not("[type=hidden]").parents(".form-group"), 0 === a.length && (a = t("form#" + h.replace(/s$/, "") + " *[name=" + e + "]").not("[type=hidden]").parents(".form-group")), r = t('form[action="' + u + '"] *[name=' + e + "]").not("[type=hidden]").parents(".form-group"), r.length || (r = t("form *[name=" + e + "]").not("[type=hidden]").parents(".form-group")), t(s).length ? t(s).addClass("error").attr("data-error", n).after('<span class="error--msg">' + n + "</span>") : a.length ? (a.find(".help-block.err").remove(), a.addClass("has-error"), a.find("[name=" + e + "]").not("[type=hidden]").after('<span class="help-block err">' + n + "</span>")) : r.length ? (r.find(".help-block").remove(), r.addClass("has-error"), r.find(".input-group").length > 0 ? r.find(".input-group").after('<span class="help-block err">' + n + "</span>") : r.find(".bootstrap-tagsinput").length ? r.find(".bootstrap-tagsinput").addClass("error").after('<span class="help-block err">' + n + "</span>") : r.find("[name=" + e + "]").not("[type=hidden]").after('<span class="help-block err">' + n + "</span>")) : (t("form#" + h + " *[name=" + e + "]").not("[type=hidden]").siblings(".error--msg").remove(), t("form#" + h + " *[name=" + e + "]").not("[type=hidden]").addClass("error").attr("data-error", n).after('<span class="error--msg">' + n + "</span>")), o ? (r.length && r.find("[name=" + e + "]").not("[type=hidden]").focus(), a.length && a.find("[name=" + e + "]").not("[type=hidden]").focus(), t(s).length && t(s).focus(), o = !1) : void 0
        })) : (s = ["limit", "lock", "author", "rank", "account"], _.find(s, function (t) {
            return t === p.data[0]
        }) && t.get("/api/errorMessage", {type: p.data[0], key: p.data[1]}, function (t) {
            return t.data ? e({title: t.data[0], content: t.data[1], hideClose: !0}) : void 0
        }))))
    }), t("body").delegate("form", "submit", function (e) {
        var n;
        n = t(this), n.attr("method") && n.attr("action") && (e.preventDefault(), n.find("button[type=submit]").attr("disabled", "disabled"), t.ajax({
            url: n.attr("action"),
            type: n.attr("method"),
            data: n.serialize(),
            success: function (t) {
                n.find("button[type=submit]").removeAttr("disabled"), 0 === t.status && ("/api/user?do=login" === n.attr("action") && "/user/login" !== location.pathname ? window.location.reload() : /^\//.test(t.data) ? window.location = t.data : window.location.reload())
            }
        }))
    }), t("body").delegate("form input, form textarea", "keydown", function (e) {
        t(this).removeClass("error"), t(this).parents(".form-group").removeClass("has-error"), t(this).next(".help-block.err").remove(), t(this).next(".error--msg").remove()
    }), t("#backtop").click(function () {
        return t("body,html").animate({scrollTop: 0}), !1
    }), t(document).scroll(function () {
        t(this).scrollTop() > 720 ? t("#backtop").removeClass("hidden") : t("#backtop").addClass("hidden")
    }), t(".topframe").length && t(".topframe .close").click(function (e) {
        t(this).parent().remove(), 0 !== t(".topframe").length && t(".topframe .content").text() || t("body").removeClass("have-notify")
    }), window.SFHacker = {
        setOldVersion: function () {
            t.cookie("v", "old"), window.location.reload()
        }, unSetOldVersion: function () {
            t.removeCookie("v", {path: "/"}), window.location.reload()
        }, makePureTextarea: function () {
            t.cookie("typemode", "native"), window.location.reload()
        }, unMakePureTextarea: function () {
            t.removeCookie("typemode", {path: "/"}), window.location.reload()
        }
    }, t(".SFLogin").click(function (t) {
        t.preventDefault(), r.login()
    }), t(".3rdLogin").click(function (e) {
        e.preventDefault(), window.open(t(this).attr("href"), "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
    }), t(".hoverDropdown").hoverIntent(function () {
        t(this).hasClass("open") || t(this).find(".dropdownBtn").dropdown("toggle")
    }, function () {
        t(this).hasClass("open") && t(this).find(".dropdownBtn").dropdown("toggle")
    }, null, 1), t(".dropdownBtn").click(function (e) {
        var n;
        t(this).parent(".hoverDropdown").hasClass("open") && (e.preventDefault(), n = t(this).attr("href"), e.ctrlKey || e.metaKey ? window.open(n) : location.href = n)
    }), l = function (e, n, r, a) {
        var i;
        return i = e, i.length > 0 && t(".write-btns a").each(function (e, n) {
            t(this).click(function (t) {
                return i.modal("show"), !1
            })
        }), t(".activate-change", i).click(function (e) {
            t(".activate-showmail").hide(), t(".activate-form").show()
        }), t(".activate-cancel", i).click(function (e) {
            t(".activate-showmail").show(), t(".activate-form").hide()
        }), i.find(".activate-form").on("submit", function (e) {
            var n;
            return e.preventDefault(), n = t(this), t.post(r, {mail: n.find(".mail").val()}, function (e) {
                0 === e.status && (n.parent().find(".session-mail").text(n.find(".mail").val()), t(".activate-showmail").show(), t(".activate-form").hide(), location.reload())
            }), !1
        }), i.find(".activate-resend", i).click(function (e) {
            var r, i, o, s;
            i = t(this), r = i.siblings("span").find("span"), o = void 0, s = void 0, o = 120, o--, t.post(n, function (e) {
                var n, l;
                0 === e.status ? (t(".company-activete-tips").length && t(".company-activete-tips").html(null != (n = '<div class="alert alert-success">' + e.message) ? n : e.data[1] + "</div>"), a && a(), s = setInterval(function () {
                    return 0 === o ? (clearInterval(s), i.show(), void i.siblings("span").hide()) : void r.text(o--)
                }, 1e3)) : (t(".company-activete-tips").length && t(".company-activete-tips").html(null != (l = '<div class="alert alert-danger">' + e.message) ? l : e.data[1] + "</div>"), setTimeout(function () {
                    t(".company-activete-tips").length && t(".company-activete-tips").html('<div class="alert alert-success">激活邮件已发送 （<span>120</span>）</div>'), i.show()
                }, 9e5))
            })
        })
    }, l(t("#activate"), "/api/user/reactivate", "/api/user/activate/mail"), l(t("#companyActivate"), "/api/company/reactivate", "/api/settings/mail/edit"), t(".side-ask [class*=btn-sn-]").click(function (e) {
        e.preventDefault(), window.open(t(this).attr("href"), "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
    }), r
}), !function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("handlebars", e) : "object" == typeof exports ? exports.Handlebars = e() : t.Handlebars = e()
}(this, function () {
    return function (t) {
        function e(r) {
            if (n[r])return n[r].exports;
            var a = n[r] = {exports: {}, id: r, loaded: !1};
            return t[r].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
        }

        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function (t, e, n) {
        "use strict";
        function r() {
            var t = v();
            return t.compile = function (e, n) {
                return u.compile(e, n, t)
            }, t.precompile = function (e, n) {
                return u.precompile(e, n, t)
            }, t.AST = l["default"], t.Compiler = u.Compiler, t.JavaScriptCompiler = p["default"], t.Parser = c.parser, t.parse = c.parse, t
        }

        var a = n(8)["default"];
        e.__esModule = !0;
        var i = n(1), o = a(i), s = n(2), l = a(s), c = n(3), u = n(4), h = n(5), p = a(h), d = n(6), f = a(d), m = n(7), g = a(m), v = o["default"].create, y = r();
        y.create = r, g["default"](y), y.Visitor = f["default"], y["default"] = y, e["default"] = y, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        function r() {
            var t = new s.HandlebarsEnvironment;
            return d.extend(t, s), t.SafeString = c["default"], t.Exception = h["default"], t.Utils = d, t.escapeExpression = d.escapeExpression, t.VM = m, t.template = function (e) {
                return m.template(e, t)
            }, t
        }

        var a = n(9)["default"], i = n(8)["default"];
        e.__esModule = !0;
        var o = n(10), s = a(o), l = n(11), c = i(l), u = n(12), h = i(u), p = n(13), d = a(p), f = n(14), m = a(f), g = n(7), v = i(g), y = r();
        y.create = r, v["default"](y), y["default"] = y, e["default"] = y, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0;
        var r = {
            helpers: {
                helperExpression: function (t) {
                    return "SubExpression" === t.type || ("MustacheStatement" === t.type || "BlockStatement" === t.type) && !!(t.params && t.params.length || t.hash)
                }, scopedId: function (t) {
                    return /^\.|this\b/.test(t.original)
                }, simpleId: function (t) {
                    return 1 === t.parts.length && !r.helpers.scopedId(t) && !t.depth
                }
            }
        };
        e["default"] = r, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        function r(t, e) {
            if ("Program" === t.type)return t;
            s["default"].yy = d, d.locInfo = function (t) {
                return new d.SourceLocation(e && e.srcName, t)
            };
            var n = new c["default"](e);
            return n.accept(s["default"].parse(t))
        }

        var a = n(8)["default"], i = n(9)["default"];
        e.__esModule = !0, e.parse = r;
        var o = n(15), s = a(o), l = n(16), c = a(l), u = n(17), h = i(u), p = n(13);
        e.parser = s["default"];
        var d = {};
        p.extend(d, h)
    }, function (t, e, n) {
        "use strict";
        function r() {
        }

        function a(t, e, n) {
            if (null == t || "string" != typeof t && "Program" !== t.type)throw new u["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + t);
            e = e || {}, "data"in e || (e.data = !0), e.compat && (e.useDepths = !0);
            var r = n.parse(t, e), a = (new n.Compiler).compile(r, e);
            return (new n.JavaScriptCompiler).compile(a, e)
        }

        function i(t, e, n) {
            function r() {
                var r = n.parse(t, e), a = (new n.Compiler).compile(r, e), i = (new n.JavaScriptCompiler).compile(a, e, void 0, !0);
                return n.template(i)
            }

            function a(t, e) {
                return i || (i = r()), i.call(this, t, e)
            }

            if (void 0 === e && (e = {}), null == t || "string" != typeof t && "Program" !== t.type)throw new u["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + t);
            "data"in e || (e.data = !0), e.compat && (e.useDepths = !0);
            var i = void 0;
            return a._setup = function (t) {
                return i || (i = r()), i._setup(t)
            }, a._child = function (t, e, n, a) {
                return i || (i = r()), i._child(t, e, n, a)
            }, a
        }

        function o(t, e) {
            if (t === e)return !0;
            if (h.isArray(t) && h.isArray(e) && t.length === e.length) {
                for (var n = 0; n < t.length; n++)if (!o(t[n], e[n]))return !1;
                return !0
            }
        }

        function s(t) {
            if (!t.path.parts) {
                var e = t.path;
                t.path = {
                    type: "PathExpression",
                    data: !1,
                    depth: 0,
                    parts: [e.original + ""],
                    original: e.original + "",
                    loc: e.loc
                }
            }
        }

        var l = n(8)["default"];
        e.__esModule = !0, e.Compiler = r, e.precompile = a, e.compile = i;
        var c = n(12), u = l(c), h = n(13), p = n(2), d = l(p), f = [].slice;
        r.prototype = {
            compiler: r, equals: function (t) {
                var e = this.opcodes.length;
                if (t.opcodes.length !== e)return !1;
                for (var n = 0; e > n; n++) {
                    var r = this.opcodes[n], a = t.opcodes[n];
                    if (r.opcode !== a.opcode || !o(r.args, a.args))return !1
                }
                e = this.children.length;
                for (var n = 0; e > n; n++)if (!this.children[n].equals(t.children[n]))return !1;
                return !0
            }, guid: 0, compile: function (t, e) {
                this.sourceNode = [], this.opcodes = [], this.children = [], this.options = e, this.stringParams = e.stringParams, this.trackIds = e.trackIds, e.blockParams = e.blockParams || [];
                var n = e.knownHelpers;
                if (e.knownHelpers = {
                        helperMissing: !0,
                        blockHelperMissing: !0,
                        each: !0,
                        "if": !0,
                        unless: !0,
                        "with": !0,
                        log: !0,
                        lookup: !0
                    }, n)for (var r in n)r in n && (e.knownHelpers[r] = n[r]);
                return this.accept(t)
            }, compileProgram: function (t) {
                var e = new this.compiler, n = e.compile(t, this.options), r = this.guid++;
                return this.usePartial = this.usePartial || n.usePartial, this.children[r] = n, this.useDepths = this.useDepths || n.useDepths, r
            }, accept: function (t) {
                if (!this[t.type])throw new u["default"]("Unknown type: " + t.type, t);
                this.sourceNode.unshift(t);
                var e = this[t.type](t);
                return this.sourceNode.shift(), e
            }, Program: function (t) {
                this.options.blockParams.unshift(t.blockParams);
                for (var e = t.body, n = e.length, r = 0; n > r; r++)this.accept(e[r]);
                return this.options.blockParams.shift(), this.isSimple = 1 === n, this.blockParams = t.blockParams ? t.blockParams.length : 0, this
            }, BlockStatement: function (t) {
                s(t);
                var e = t.program, n = t.inverse;
                e = e && this.compileProgram(e), n = n && this.compileProgram(n);
                var r = this.classifySexpr(t);
                "helper" === r ? this.helperSexpr(t, e, n) : "simple" === r ? (this.simpleSexpr(t), this.opcode("pushProgram", e), this.opcode("pushProgram", n), this.opcode("emptyHash"), this.opcode("blockValue", t.path.original)) : (this.ambiguousSexpr(t, e, n), this.opcode("pushProgram", e), this.opcode("pushProgram", n), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
            }, DecoratorBlock: function (t) {
                var e = t.program && this.compileProgram(t.program), n = this.setupFullMustacheParams(t, e, void 0), r = t.path;
                this.useDecorators = !0, this.opcode("registerDecorator", n.length, r.original)
            }, PartialStatement: function (t) {
                this.usePartial = !0;
                var e = t.program;
                e && (e = this.compileProgram(t.program));
                var n = t.params;
                if (n.length > 1)throw new u["default"]("Unsupported number of partial arguments: " + n.length, t);
                n.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : n.push({
                    type: "PathExpression",
                    parts: [],
                    depth: 0
                }));
                var r = t.name.original, a = "SubExpression" === t.name.type;
                a && this.accept(t.name), this.setupFullMustacheParams(t, e, void 0, !0);
                var i = t.indent || "";
                this.options.preventIndent && i && (this.opcode("appendContent", i), i = ""), this.opcode("invokePartial", a, r, i), this.opcode("append")
            }, PartialBlockStatement: function (t) {
                this.PartialStatement(t)
            }, MustacheStatement: function (t) {
                this.SubExpression(t), t.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
            }, Decorator: function (t) {
                this.DecoratorBlock(t)
            }, ContentStatement: function (t) {
                t.value && this.opcode("appendContent", t.value)
            }, CommentStatement: function () {
            }, SubExpression: function (t) {
                s(t);
                var e = this.classifySexpr(t);
                "simple" === e ? this.simpleSexpr(t) : "helper" === e ? this.helperSexpr(t) : this.ambiguousSexpr(t)
            }, ambiguousSexpr: function (t, e, n) {
                var r = t.path, a = r.parts[0], i = null != e || null != n;
                this.opcode("getContext", r.depth), this.opcode("pushProgram", e), this.opcode("pushProgram", n), r.strict = !0, this.accept(r), this.opcode("invokeAmbiguous", a, i)
            }, simpleSexpr: function (t) {
                var e = t.path;
                e.strict = !0, this.accept(e), this.opcode("resolvePossibleLambda")
            }, helperSexpr: function (t, e, n) {
                var r = this.setupFullMustacheParams(t, e, n), a = t.path, i = a.parts[0];
                if (this.options.knownHelpers[i])this.opcode("invokeKnownHelper", r.length, i); else {
                    if (this.options.knownHelpersOnly)throw new u["default"]("You specified knownHelpersOnly, but used the unknown helper " + i, t);
                    a.strict = !0, a.falsy = !0, this.accept(a), this.opcode("invokeHelper", r.length, a.original, d["default"].helpers.simpleId(a))
                }
            }, PathExpression: function (t) {
                this.addDepth(t.depth), this.opcode("getContext", t.depth);
                var e = t.parts[0], n = d["default"].helpers.scopedId(t), r = !t.depth && !n && this.blockParamIndex(e);
                r ? this.opcode("lookupBlockParam", r, t.parts) : e ? t.data ? (this.options.data = !0, this.opcode("lookupData", t.depth, t.parts, t.strict)) : this.opcode("lookupOnContext", t.parts, t.falsy, t.strict, n) : this.opcode("pushContext")
            }, StringLiteral: function (t) {
                this.opcode("pushString", t.value)
            }, NumberLiteral: function (t) {
                this.opcode("pushLiteral", t.value)
            }, BooleanLiteral: function (t) {
                this.opcode("pushLiteral", t.value)
            }, UndefinedLiteral: function () {
                this.opcode("pushLiteral", "undefined")
            }, NullLiteral: function () {
                this.opcode("pushLiteral", "null")
            }, Hash: function (t) {
                var e = t.pairs, n = 0, r = e.length;
                for (this.opcode("pushHash"); r > n; n++)this.pushParam(e[n].value);
                for (; n--;)this.opcode("assignToHash", e[n].key);
                this.opcode("popHash")
            }, opcode: function (t) {
                this.opcodes.push({opcode: t, args: f.call(arguments, 1), loc: this.sourceNode[0].loc})
            }, addDepth: function (t) {
                t && (this.useDepths = !0)
            }, classifySexpr: function (t) {
                var e = d["default"].helpers.simpleId(t.path), n = e && !!this.blockParamIndex(t.path.parts[0]), r = !n && d["default"].helpers.helperExpression(t), a = !n && (r || e);
                if (a && !r) {
                    var i = t.path.parts[0], o = this.options;
                    o.knownHelpers[i] ? r = !0 : o.knownHelpersOnly && (a = !1)
                }
                return r ? "helper" : a ? "ambiguous" : "simple"
            }, pushParams: function (t) {
                for (var e = 0, n = t.length; n > e; e++)this.pushParam(t[e])
            }, pushParam: function (t) {
                var e = null != t.value ? t.value : t.original || "";
                if (this.stringParams)e.replace && (e = e.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), t.depth && this.addDepth(t.depth), this.opcode("getContext", t.depth || 0), this.opcode("pushStringParam", e, t.type), "SubExpression" === t.type && this.accept(t); else {
                    if (this.trackIds) {
                        var n = void 0;
                        if (!t.parts || d["default"].helpers.scopedId(t) || t.depth || (n = this.blockParamIndex(t.parts[0])), n) {
                            var r = t.parts.slice(1).join(".");
                            this.opcode("pushId", "BlockParam", n, r)
                        } else e = t.original || e, e.replace && (e = e.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", t.type, e)
                    }
                    this.accept(t)
                }
            }, setupFullMustacheParams: function (t, e, n, r) {
                var a = t.params;
                return this.pushParams(a), this.opcode("pushProgram", e), this.opcode("pushProgram", n), t.hash ? this.accept(t.hash) : this.opcode("emptyHash", r), a
            }, blockParamIndex: function (t) {
                for (var e = 0, n = this.options.blockParams.length; n > e; e++) {
                    var r = this.options.blockParams[e], a = r && h.indexOf(r, t);
                    if (r && a >= 0)return [e, a]
                }
            }
        }
    }, function (t, e, n) {
        "use strict";
        function r(t) {
            this.value = t
        }

        function a() {
        }

        function i(t, e, n, r) {
            var a = e.popStack(), i = 0, o = n.length;
            for (t && o--; o > i; i++)a = e.nameLookup(a, n[i], r);
            return t ? [e.aliasable("container.strict"), "(", a, ", ", e.quotedString(n[i]), ")"] : a
        }

        var o = n(8)["default"];
        e.__esModule = !0;
        var s = n(10), l = n(12), c = o(l), u = n(13), h = n(18), p = o(h);
        a.prototype = {
            nameLookup: function (t, e) {
                return a.isValidJavaScriptVariableName(e) ? [t, ".", e] : [t, "[", JSON.stringify(e), "]"]
            }, depthedLookup: function (t) {
                return [this.aliasable("container.lookup"), '(depths, "', t, '")']
            }, compilerInfo: function () {
                var t = s.COMPILER_REVISION, e = s.REVISION_CHANGES[t];
                return [t, e]
            }, appendToBuffer: function (t, e, n) {
                return u.isArray(t) || (t = [t]), t = this.source.wrap(t, e), this.environment.isSimple ? ["return ", t, ";"] : n ? ["buffer += ", t, ";"] : (t.appendToBuffer = !0, t)
            }, initializeBuffer: function () {
                return this.quotedString("")
            }, compile: function (t, e, n, r) {
                this.environment = t, this.options = e, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !r, this.name = this.environment.name, this.isChild = !!n, this.context = n || {
                    decorators: [],
                    programs: [],
                    environments: []
                }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = {list: []}, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(t, e), this.useDepths = this.useDepths || t.useDepths || t.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || t.useBlockParams;
                var a = t.opcodes, i = void 0, o = void 0, s = void 0, l = void 0;
                for (s = 0, l = a.length; l > s; s++)i = a[s], this.source.currentLocation = i.loc, o = o || i.loc, this[i.opcode].apply(this, i.args);
                if (this.source.currentLocation = o, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length)throw new c["default"]("Compile completed with content left on stack");
                this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend("var decorators = container.decorators;\n"), this.decorators.push("return fn;"), r ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), this.decorators.push("}\n"), this.decorators = this.decorators.merge()));
                var u = this.createFunctionContext(r);
                if (this.isChild)return u;
                var h = {compiler: this.compilerInfo(), main: u};
                this.decorators && (h.main_d = this.decorators, h.useDecorators = !0);
                var p = this.context, d = p.programs, f = p.decorators;
                for (s = 0, l = d.length; l > s; s++)d[s] && (h[s] = d[s], f[s] && (h[s + "_d"] = f[s], h.useDecorators = !0));
                return this.environment.usePartial && (h.usePartial = !0), this.options.data && (h.useData = !0), this.useDepths && (h.useDepths = !0), this.useBlockParams && (h.useBlockParams = !0), this.options.compat && (h.compat = !0), r ? h.compilerOptions = this.options : (h.compiler = JSON.stringify(h.compiler), this.source.currentLocation = {
                    start: {
                        line: 1,
                        column: 0
                    }
                }, h = this.objectLiteral(h), e.srcName ? (h = h.toStringWithSourceMap({file: e.destName}), h.map = h.map && h.map.toString()) : h = h.toString()), h
            }, preamble: function () {
                this.lastContext = 0, this.source = new p["default"](this.options.srcName), this.decorators = new p["default"](this.options.srcName)
            }, createFunctionContext: function (t) {
                var e = "", n = this.stackVars.concat(this.registers.list);
                n.length > 0 && (e += ", " + n.join(", "));
                var r = 0;
                for (var a in this.aliases) {
                    var i = this.aliases[a];
                    this.aliases.hasOwnProperty(a) && i.children && i.referenceCount > 1 && (e += ", alias" + ++r + "=" + a, i.children[0] = "alias" + r)
                }
                var o = ["container", "depth0", "helpers", "partials", "data"];
                (this.useBlockParams || this.useDepths) && o.push("blockParams"), this.useDepths && o.push("depths");
                var s = this.mergeSource(e);
                return t ? (o.push(s), Function.apply(this, o)) : this.source.wrap(["function(", o.join(","), ") {\n  ", s, "}"])
            }, mergeSource: function (t) {
                var e = this.environment.isSimple, n = !this.forceBuffer, r = void 0, a = void 0, i = void 0, o = void 0;
                return this.source.each(function (t) {
                    t.appendToBuffer ? (i ? t.prepend("  + ") : i = t, o = t) : (i && (a ? i.prepend("buffer += ") : r = !0, o.add(";"), i = o = void 0), a = !0, e || (n = !1))
                }), n ? i ? (i.prepend("return "), o.add(";")) : a || this.source.push('return "";') : (t += ", buffer = " + (r ? "" : this.initializeBuffer()), i ? (i.prepend("return buffer + "), o.add(";")) : this.source.push("return buffer;")), t && this.source.prepend("var " + t.substring(2) + (r ? "" : ";\n")), this.source.merge()
            }, blockValue: function (t) {
                var e = this.aliasable("helpers.blockHelperMissing"), n = [this.contextName(0)];
                this.setupHelperArgs(t, 0, n);
                var r = this.popStack();
                n.splice(1, 0, r), this.push(this.source.functionCall(e, "call", n))
            }, ambiguousBlockValue: function () {
                var t = this.aliasable("helpers.blockHelperMissing"), e = [this.contextName(0)];
                this.setupHelperArgs("", 0, e, !0), this.flushInline();
                var n = this.topStack();
                e.splice(1, 0, n), this.pushSource(["if (!", this.lastHelper, ") { ", n, " = ", this.source.functionCall(t, "call", e), "}"])
            }, appendContent: function (t) {
                this.pendingContent ? t = this.pendingContent + t : this.pendingLocation = this.source.currentLocation, this.pendingContent = t
            }, append: function () {
                if (this.isInline())this.replaceStack(function (t) {
                    return [" != null ? ", t, ' : ""']
                }), this.pushSource(this.appendToBuffer(this.popStack())); else {
                    var t = this.popStack();
                    this.pushSource(["if (", t, " != null) { ", this.appendToBuffer(t, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"])
                }
            }, appendEscaped: function () {
                this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]))
            }, getContext: function (t) {
                this.lastContext = t
            }, pushContext: function () {
                this.pushStackLiteral(this.contextName(this.lastContext))
            }, lookupOnContext: function (t, e, n, r) {
                var a = 0;
                r || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(t[a++])), this.resolvePath("context", t, a, e, n)
            }, lookupBlockParam: function (t, e) {
                this.useBlockParams = !0, this.push(["blockParams[", t[0], "][", t[1], "]"]), this.resolvePath("context", e, 1)
            }, lookupData: function (t, e, n) {
                t ? this.pushStackLiteral("container.data(data, " + t + ")") : this.pushStackLiteral("data"), this.resolvePath("data", e, 0, !0, n)
            }, resolvePath: function (t, e, n, r, a) {
                var o = this;
                if (this.options.strict || this.options.assumeObjects)return void this.push(i(this.options.strict && a, this, e, t));
                for (var s = e.length; s > n; n++)this.replaceStack(function (a) {
                    var i = o.nameLookup(a, e[n], t);
                    return r ? [" && ", i] : [" != null ? ", i, " : ", a]
                })
            }, resolvePossibleLambda: function () {
                this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"])
            }, pushStringParam: function (t, e) {
                this.pushContext(), this.pushString(e), "SubExpression" !== e && ("string" == typeof t ? this.pushString(t) : this.pushStackLiteral(t))
            }, emptyHash: function (t) {
                this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(t ? "undefined" : "{}")
            }, pushHash: function () {
                this.hash && this.hashes.push(this.hash), this.hash = {values: [], types: [], contexts: [], ids: []}
            }, popHash: function () {
                var t = this.hash;
                this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(t.ids)), this.stringParams && (this.push(this.objectLiteral(t.contexts)), this.push(this.objectLiteral(t.types))), this.push(this.objectLiteral(t.values))
            }, pushString: function (t) {
                this.pushStackLiteral(this.quotedString(t))
            }, pushLiteral: function (t) {
                this.pushStackLiteral(t)
            }, pushProgram: function (t) {
                null != t ? this.pushStackLiteral(this.programExpression(t)) : this.pushStackLiteral(null)
            }, registerDecorator: function (t, e) {
                var n = this.nameLookup("decorators", e, "decorator"), r = this.setupHelperArgs(e, t);
                this.decorators.push(["fn = ", this.decorators.functionCall(n, "", ["fn", "props", "container", r]), " || fn;"])
            }, invokeHelper: function (t, e, n) {
                var r = this.popStack(), a = this.setupHelper(t, e), i = n ? [a.name, " || "] : "", o = ["("].concat(i, r);
                this.options.strict || o.push(" || ", this.aliasable("helpers.helperMissing")), o.push(")"), this.push(this.source.functionCall(o, "call", a.callParams))
            }, invokeKnownHelper: function (t, e) {
                var n = this.setupHelper(t, e);
                this.push(this.source.functionCall(n.name, "call", n.callParams))
            }, invokeAmbiguous: function (t, e) {
                this.useRegister("helper");
                var n = this.popStack();
                this.emptyHash();
                var r = this.setupHelper(0, t, e), a = this.lastHelper = this.nameLookup("helpers", t, "helper"), i = ["(", "(helper = ", a, " || ", n, ")"];
                this.options.strict || (i[0] = "(helper = ", i.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))), this.push(["(", i, r.paramsInit ? ["),(", r.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", r.callParams), " : helper))"])
            }, invokePartial: function (t, e, n) {
                var r = [], a = this.setupParams(e, 1, r);
                t && (e = this.popStack(), delete a.name), n && (a.indent = JSON.stringify(n)), a.helpers = "helpers", a.partials = "partials", t ? r.unshift(e) : r.unshift(this.nameLookup("partials", e, "partial")), this.options.compat && (a.depths = "depths"), a = this.objectLiteral(a), r.push(a), this.push(this.source.functionCall("container.invokePartial", "", r))
            }, assignToHash: function (t) {
                var e = this.popStack(), n = void 0, r = void 0, a = void 0;
                this.trackIds && (a = this.popStack()), this.stringParams && (r = this.popStack(), n = this.popStack());
                var i = this.hash;
                n && (i.contexts[t] = n), r && (i.types[t] = r), a && (i.ids[t] = a), i.values[t] = e
            }, pushId: function (t, e, n) {
                "BlockParam" === t ? this.pushStackLiteral("blockParams[" + e[0] + "].path[" + e[1] + "]" + (n ? " + " + JSON.stringify("." + n) : "")) : "PathExpression" === t ? this.pushString(e) : "SubExpression" === t ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
            }, compiler: a, compileChildren: function (t, e) {
                for (var n = t.children, r = void 0, a = void 0, i = 0, o = n.length; o > i; i++) {
                    r = n[i], a = new this.compiler;
                    var s = this.matchExistingProgram(r);
                    null == s ? (this.context.programs.push(""), s = this.context.programs.length, r.index = s, r.name = "program" + s, this.context.programs[s] = a.compile(r, e, this.context, !this.precompile), this.context.decorators[s] = a.decorators, this.context.environments[s] = r, this.useDepths = this.useDepths || a.useDepths, this.useBlockParams = this.useBlockParams || a.useBlockParams) : (r.index = s, r.name = "program" + s, this.useDepths = this.useDepths || r.useDepths, this.useBlockParams = this.useBlockParams || r.useBlockParams)
                }
            }, matchExistingProgram: function (t) {
                for (var e = 0, n = this.context.environments.length; n > e; e++) {
                    var r = this.context.environments[e];
                    if (r && r.equals(t))return e
                }
            }, programExpression: function (t) {
                var e = this.environment.children[t], n = [e.index, "data", e.blockParams];
                return (this.useBlockParams || this.useDepths) && n.push("blockParams"), this.useDepths && n.push("depths"), "container.program(" + n.join(", ") + ")"
            }, useRegister: function (t) {
                this.registers[t] || (this.registers[t] = !0, this.registers.list.push(t))
            }, push: function (t) {
                return t instanceof r || (t = this.source.wrap(t)), this.inlineStack.push(t), t
            }, pushStackLiteral: function (t) {
                this.push(new r(t))
            }, pushSource: function (t) {
                this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), t && this.source.push(t)
            }, replaceStack: function (t) {
                var e = ["("], n = void 0, a = void 0, i = void 0;
                if (!this.isInline())throw new c["default"]("replaceStack on non-inline");
                var o = this.popStack(!0);
                if (o instanceof r)n = [o.value], e = ["(", n], i = !0; else {
                    a = !0;
                    var s = this.incrStack();
                    e = ["((", this.push(s), " = ", o, ")"], n = this.topStack()
                }
                var l = t.call(this, n);
                i || this.popStack(), a && this.stackSlot--, this.push(e.concat(l, ")"))
            }, incrStack: function () {
                return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
            }, topStackName: function () {
                return "stack" + this.stackSlot
            }, flushInline: function () {
                var t = this.inlineStack;
                this.inlineStack = [];
                for (var e = 0, n = t.length; n > e; e++) {
                    var a = t[e];
                    if (a instanceof r)this.compileStack.push(a); else {
                        var i = this.incrStack();
                        this.pushSource([i, " = ", a, ";"]), this.compileStack.push(i)
                    }
                }
            }, isInline: function () {
                return this.inlineStack.length
            }, popStack: function (t) {
                var e = this.isInline(), n = (e ? this.inlineStack : this.compileStack).pop();
                if (!t && n instanceof r)return n.value;
                if (!e) {
                    if (!this.stackSlot)throw new c["default"]("Invalid stack pop");
                    this.stackSlot--
                }
                return n
            }, topStack: function () {
                var t = this.isInline() ? this.inlineStack : this.compileStack, e = t[t.length - 1];
                return e instanceof r ? e.value : e
            }, contextName: function (t) {
                return this.useDepths && t ? "depths[" + t + "]" : "depth" + t
            }, quotedString: function (t) {
                return this.source.quotedString(t)
            }, objectLiteral: function (t) {
                return this.source.objectLiteral(t)
            }, aliasable: function (t) {
                var e = this.aliases[t];
                return e ? (e.referenceCount++, e) : (e = this.aliases[t] = this.source.wrap(t), e.aliasable = !0, e.referenceCount = 1, e)
            }, setupHelper: function (t, e, n) {
                var r = [], a = this.setupHelperArgs(e, t, r, n), i = this.nameLookup("helpers", e, "helper");
                return {params: r, paramsInit: a, name: i, callParams: [this.contextName(0)].concat(r)}
            }, setupParams: function (t, e, n) {
                var r = {}, a = [], i = [], o = [], s = !n, l = void 0;
                s && (n = []), r.name = this.quotedString(t), r.hash = this.popStack(), this.trackIds && (r.hashIds = this.popStack()), this.stringParams && (r.hashTypes = this.popStack(), r.hashContexts = this.popStack());
                var c = this.popStack(), u = this.popStack();
                (u || c) && (r.fn = u || "container.noop", r.inverse = c || "container.noop");
                for (var h = e; h--;)l = this.popStack(), n[h] = l, this.trackIds && (o[h] = this.popStack()), this.stringParams && (i[h] = this.popStack(), a[h] = this.popStack());
                return s && (r.args = this.source.generateArray(n)), this.trackIds && (r.ids = this.source.generateArray(o)), this.stringParams && (r.types = this.source.generateArray(i), r.contexts = this.source.generateArray(a)), this.options.data && (r.data = "data"), this.useBlockParams && (r.blockParams = "blockParams"), r
            }, setupHelperArgs: function (t, e, n, r) {
                var a = this.setupParams(t, e, n);
                return a = this.objectLiteral(a), r ? (this.useRegister("options"), n.push("options"), ["options=", a]) : n ? (n.push(a), "") : a
            }
        }, function () {
            for (var t = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), e = a.RESERVED_WORDS = {}, n = 0, r = t.length; r > n; n++)e[t[n]] = !0
        }(), a.isValidJavaScriptVariableName = function (t) {
            return !a.RESERVED_WORDS[t] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)
        }, e["default"] = a, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        function r() {
            this.parents = []
        }

        function a(t) {
            this.acceptRequired(t, "path"), this.acceptArray(t.params), this.acceptKey(t, "hash")
        }

        function i(t) {
            a.call(this, t), this.acceptKey(t, "program"), this.acceptKey(t, "inverse")
        }

        function o(t) {
            this.acceptRequired(t, "name"), this.acceptArray(t.params), this.acceptKey(t, "hash")
        }

        var s = n(8)["default"];
        e.__esModule = !0;
        var l = n(12), c = s(l);
        r.prototype = {
            constructor: r,
            mutating: !1,
            acceptKey: function (t, e) {
                var n = this.accept(t[e]);
                if (this.mutating) {
                    if (n && !r.prototype[n.type])throw new c["default"]('Unexpected node type "' + n.type + '" found when accepting ' + e + " on " + t.type);
                    t[e] = n
                }
            },
            acceptRequired: function (t, e) {
                if (this.acceptKey(t, e), !t[e])throw new c["default"](t.type + " requires " + e)
            },
            acceptArray: function (t) {
                for (var e = 0, n = t.length; n > e; e++)this.acceptKey(t, e), t[e] || (t.splice(e, 1), e--, n--)
            },
            accept: function (t) {
                if (t) {
                    if (!this[t.type])throw new c["default"]("Unknown type: " + t.type, t);
                    this.current && this.parents.unshift(this.current), this.current = t;
                    var e = this[t.type](t);
                    return this.current = this.parents.shift(), !this.mutating || e ? e : e !== !1 ? t : void 0
                }
            },
            Program: function (t) {
                this.acceptArray(t.body)
            },
            MustacheStatement: a,
            Decorator: a,
            BlockStatement: i,
            DecoratorBlock: i,
            PartialStatement: o,
            PartialBlockStatement: function (t) {
                o.call(this, t), this.acceptKey(t, "program")
            },
            ContentStatement: function () {
            },
            CommentStatement: function () {
            },
            SubExpression: a,
            PathExpression: function () {
            },
            StringLiteral: function () {
            },
            NumberLiteral: function () {
            },
            BooleanLiteral: function () {
            },
            UndefinedLiteral: function () {
            },
            NullLiteral: function () {
            },
            Hash: function (t) {
                this.acceptArray(t.pairs)
            },
            HashPair: function (t) {
                this.acceptRequired(t, "value")
            }
        }, e["default"] = r, t.exports = e["default"]
    }, function (t, e, n) {
        (function (n) {
            "use strict";
            e.__esModule = !0, e["default"] = function (t) {
                var e = "undefined" != typeof n ? n : window, r = e.Handlebars;
                t.noConflict = function () {
                    e.Handlebars === t && (e.Handlebars = r)
                }
            }, t.exports = e["default"]
        }).call(e, function () {
            return this
        }())
    }, function (t, e, n) {
        "use strict";
        e["default"] = function (t) {
            return t && t.__esModule ? t : {"default": t}
        }, e.__esModule = !0
    }, function (t, e, n) {
        "use strict";
        e["default"] = function (t) {
            if (t && t.__esModule)return t;
            var e = {};
            if (null != t)for (var n in t)Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e["default"] = t, e
        }, e.__esModule = !0
    }, function (t, e, n) {
        "use strict";
        function r(t, e, n) {
            this.helpers = t || {}, this.partials = e || {}, this.decorators = n || {}, l.registerDefaultHelpers(this), c.registerDefaultDecorators(this)
        }

        var a = n(8)["default"];
        e.__esModule = !0, e.HandlebarsEnvironment = r;
        var i = n(13), o = n(12), s = a(o), l = n(19), c = n(20), u = n(21), h = a(u), p = "4.0.0";
        e.VERSION = p;
        var d = 7;
        e.COMPILER_REVISION = d;
        var f = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0"
        };
        e.REVISION_CHANGES = f;
        var m = "[object Object]";
        r.prototype = {
            constructor: r, logger: h["default"], log: h["default"].log, registerHelper: function (t, e) {
                if (i.toString.call(t) === m) {
                    if (e)throw new s["default"]("Arg not supported with multiple helpers");
                    i.extend(this.helpers, t)
                } else this.helpers[t] = e
            }, unregisterHelper: function (t) {
                delete this.helpers[t]
            }, registerPartial: function (t, e) {
                if (i.toString.call(t) === m)i.extend(this.partials, t); else {
                    if ("undefined" == typeof e)throw new s["default"]("Attempting to register a partial as undefined");
                    this.partials[t] = e
                }
            }, unregisterPartial: function (t) {
                delete this.partials[t]
            }, registerDecorator: function (t, e) {
                if (i.toString.call(t) === m) {
                    if (e)throw new s["default"]("Arg not supported with multiple decorators");
                    i.extend(this.decorators, t)
                } else this.decorators[t] = e
            }, unregisterDecorator: function (t) {
                delete this.decorators[t]
            }
        };
        var g = h["default"].log;
        e.log = g, e.createFrame = i.createFrame, e.logger = h["default"]
    }, function (t, e, n) {
        "use strict";
        function r(t) {
            this.string = t
        }

        e.__esModule = !0, r.prototype.toString = r.prototype.toHTML = function () {
            return "" + this.string
        }, e["default"] = r, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        function r(t, e) {
            var n = e && e.loc, i = void 0, o = void 0;
            n && (i = n.start.line, o = n.start.column, t += " - " + i + ":" + o);
            for (var s = Error.prototype.constructor.call(this, t), l = 0; l < a.length; l++)this[a[l]] = s[a[l]];
            Error.captureStackTrace && Error.captureStackTrace(this, r), n && (this.lineNumber = i, this.column = o)
        }

        e.__esModule = !0;
        var a = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        r.prototype = new Error, e["default"] = r, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        function r(t) {
            return h[t]
        }

        function a(t) {
            for (var e = 1; e < arguments.length; e++)for (var n in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e], n) && (t[n] = arguments[e][n]);
            return t
        }

        function i(t, e) {
            for (var n = 0, r = t.length; r > n; n++)if (t[n] === e)return n;
            return -1
        }

        function o(t) {
            if ("string" != typeof t) {
                if (t && t.toHTML)return t.toHTML();
                if (null == t)return "";
                if (!t)return t + "";
                t = "" + t
            }
            return d.test(t) ? t.replace(p, r) : t
        }

        function s(t) {
            return t || 0 === t ? g(t) && 0 === t.length ? !0 : !1 : !0
        }

        function l(t) {
            var e = a({}, t);
            return e._parent = t, e
        }

        function c(t, e) {
            return t.path = e, t
        }

        function u(t, e) {
            return (t ? t + "." : "") + e
        }

        e.__esModule = !0, e.extend = a, e.indexOf = i, e.escapeExpression = o, e.isEmpty = s, e.createFrame = l, e.blockParams = c, e.appendContextPath = u;
        var h = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;"
        }, p = /[&<>"'`=]/g, d = /[&<>"'`=]/, f = Object.prototype.toString;
        e.toString = f;
        var m = function (t) {
            return "function" == typeof t
        };
        m(/x/) && (e.isFunction = m = function (t) {
            return "function" == typeof t && "[object Function]" === f.call(t)
        }), e.isFunction = m;
        var g = Array.isArray || function (t) {
                return t && "object" == typeof t ? "[object Array]" === f.call(t) : !1
            };
        e.isArray = g
    }, function (t, e, n) {
        "use strict";
        function r(t) {
            var e = t && t[0] || 1, n = v.COMPILER_REVISION;
            if (e !== n) {
                if (n > e) {
                    var r = v.REVISION_CHANGES[n], a = v.REVISION_CHANGES[e];
                    throw new g["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + a + ").")
                }
                throw new g["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").")
            }
        }

        function a(t, e) {
            function n(n, r, a) {
                a.hash && (r = f.extend({}, r, a.hash), a.ids && (a.ids[0] = !0)), n = e.VM.resolvePartial.call(this, n, r, a);
                var i = e.VM.invokePartial.call(this, n, r, a);
                if (null == i && e.compile && (a.partials[a.name] = e.compile(n, t.compilerOptions, e), i = a.partials[a.name](r, a)), null != i) {
                    if (a.indent) {
                        for (var o = i.split("\n"), s = 0, l = o.length; l > s && (o[s] || s + 1 !== l); s++)o[s] = a.indent + o[s];
                        i = o.join("\n")
                    }
                    return i
                }
                throw new g["default"]("The partial " + a.name + " could not be compiled when running in runtime-only mode")
            }

            function r(e) {
                function n(e) {
                    return "" + t.main(a, e, a.helpers, a.partials, o, l, s)
                }

                var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = i.data;
                r._setup(i), !i.partial && t.useData && (o = c(e, o));
                var s = void 0, l = t.useBlockParams ? [] : void 0;
                return t.useDepths && (s = i.depths ? e !== i.depths[0] ? [e].concat(i.depths) : i.depths : [e]), (n = u(t.main, n, a, i.depths || [], o, l))(e, i)
            }

            if (!e)throw new g["default"]("No environment passed to template");
            if (!t || !t.main)throw new g["default"]("Unknown template object: " + typeof t);
            t.main.decorator = t.main_d, e.VM.checkRevision(t.compiler);
            var a = {
                strict: function (t, e) {
                    if (!(e in t))throw new g["default"]('"' + e + '" not defined in ' + t);
                    return t[e]
                }, lookup: function (t, e) {
                    for (var n = t.length, r = 0; n > r; r++)if (t[r] && null != t[r][e])return t[r][e]
                }, lambda: function (t, e) {
                    return "function" == typeof t ? t.call(e) : t
                }, escapeExpression: f.escapeExpression, invokePartial: n, fn: function (e) {
                    var n = t[e];
                    return n.decorator = t[e + "_d"], n
                }, programs: [], program: function (t, e, n, r, a) {
                    var o = this.programs[t], s = this.fn(t);
                    return e || a || r || n ? o = i(this, t, s, e, n, r, a) : o || (o = this.programs[t] = i(this, t, s)), o
                }, data: function (t, e) {
                    for (; t && e--;)t = t._parent;
                    return t
                }, merge: function (t, e) {
                    var n = t || e;
                    return t && e && t !== e && (n = f.extend({}, e, t)), n
                }, noop: e.VM.noop, compilerInfo: t.compiler
            };
            return r.isTop = !0, r._setup = function (n) {
                n.partial ? (a.helpers = n.helpers, a.partials = n.partials, a.decorators = n.decorators) : (a.helpers = a.merge(n.helpers, e.helpers), t.usePartial && (a.partials = a.merge(n.partials, e.partials)), t.useDecorators && (a.decorators = a.merge(n.decorators, e.decorators)))
            }, r._child = function (e, n, r, o) {
                if (t.useBlockParams && !r)throw new g["default"]("must pass block params");
                if (t.useDepths && !o)throw new g["default"]("must pass parent depths");
                return i(a, e, t[e], n, 0, r, o)
            }, r
        }

        function i(t, e, n, r, a, i, o) {
            function s(e) {
                var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], s = o;
                return o && e !== o[0] && (s = [e].concat(o)), n(t, e, t.helpers, t.partials, a.data || r, i && [a.blockParams].concat(i), s)
            }

            return s = u(n, s, t, o, r, i), s.program = e, s.depth = o ? o.length : 0, s.blockParams = a || 0, s
        }

        function o(t, e, n) {
            return t ? t.call || n.name || (n.name = t, t = n.partials[t]) : t = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name], t
        }

        function s(t, e, n) {
            n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
            var r = void 0;
            if (n.fn && n.fn !== l && (r = n.data["partial-block"] = n.fn, r.partials && (n.partials = f.extend({}, n.partials, r.partials))), void 0 === t && r && (t = r), void 0 === t)throw new g["default"]("The partial " + n.name + " could not be found");
            return t instanceof Function ? t(e, n) : void 0
        }

        function l() {
            return ""
        }

        function c(t, e) {
            return e && "root"in e || (e = e ? v.createFrame(e) : {}, e.root = t), e
        }

        function u(t, e, n, r, a, i) {
            if (t.decorator) {
                var o = {};
                e = t.decorator(e, o, n, r && r[0], a, i, r), f.extend(e, o)
            }
            return e
        }

        var h = n(9)["default"], p = n(8)["default"];
        e.__esModule = !0, e.checkRevision = r, e.template = a, e.wrapProgram = i, e.resolvePartial = o, e.invokePartial = s, e.noop = l;
        var d = n(13), f = h(d), m = n(12), g = p(m), v = n(10)
    }, function (t, e, n) {
        "use strict";
        var r = function () {
            function t() {
                this.yy = {}
            }

            var e = {
                trace: function () {
                },
                yy: {},
                symbols_: {
                    error: 2,
                    root: 3,
                    program: 4,
                    EOF: 5,
                    program_repetition0: 6,
                    statement: 7,
                    mustache: 8,
                    block: 9,
                    rawBlock: 10,
                    partial: 11,
                    partialBlock: 12,
                    content: 13,
                    COMMENT: 14,
                    CONTENT: 15,
                    openRawBlock: 16,
                    rawBlock_repetition_plus0: 17,
                    END_RAW_BLOCK: 18,
                    OPEN_RAW_BLOCK: 19,
                    helperName: 20,
                    openRawBlock_repetition0: 21,
                    openRawBlock_option0: 22,
                    CLOSE_RAW_BLOCK: 23,
                    openBlock: 24,
                    block_option0: 25,
                    closeBlock: 26,
                    openInverse: 27,
                    block_option1: 28,
                    OPEN_BLOCK: 29,
                    openBlock_repetition0: 30,
                    openBlock_option0: 31,
                    openBlock_option1: 32,
                    CLOSE: 33,
                    OPEN_INVERSE: 34,
                    openInverse_repetition0: 35,
                    openInverse_option0: 36,
                    openInverse_option1: 37,
                    openInverseChain: 38,
                    OPEN_INVERSE_CHAIN: 39,
                    openInverseChain_repetition0: 40,
                    openInverseChain_option0: 41,
                    openInverseChain_option1: 42,
                    inverseAndProgram: 43,
                    INVERSE: 44,
                    inverseChain: 45,
                    inverseChain_option0: 46,
                    OPEN_ENDBLOCK: 47,
                    OPEN: 48,
                    mustache_repetition0: 49,
                    mustache_option0: 50,
                    OPEN_UNESCAPED: 51,
                    mustache_repetition1: 52,
                    mustache_option1: 53,
                    CLOSE_UNESCAPED: 54,
                    OPEN_PARTIAL: 55,
                    partialName: 56,
                    partial_repetition0: 57,
                    partial_option0: 58,
                    openPartialBlock: 59,
                    OPEN_PARTIAL_BLOCK: 60,
                    openPartialBlock_repetition0: 61,
                    openPartialBlock_option0: 62,
                    param: 63,
                    sexpr: 64,
                    OPEN_SEXPR: 65,
                    sexpr_repetition0: 66,
                    sexpr_option0: 67,
                    CLOSE_SEXPR: 68,
                    hash: 69,
                    hash_repetition_plus0: 70,
                    hashSegment: 71,
                    ID: 72,
                    EQUALS: 73,
                    blockParams: 74,
                    OPEN_BLOCK_PARAMS: 75,
                    blockParams_repetition_plus0: 76,
                    CLOSE_BLOCK_PARAMS: 77,
                    path: 78,
                    dataName: 79,
                    STRING: 80,
                    NUMBER: 81,
                    BOOLEAN: 82,
                    UNDEFINED: 83,
                    NULL: 84,
                    DATA: 85,
                    pathSegments: 86,
                    SEP: 87,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    5: "EOF",
                    14: "COMMENT",
                    15: "CONTENT",
                    18: "END_RAW_BLOCK",
                    19: "OPEN_RAW_BLOCK",
                    23: "CLOSE_RAW_BLOCK",
                    29: "OPEN_BLOCK",
                    33: "CLOSE",
                    34: "OPEN_INVERSE",
                    39: "OPEN_INVERSE_CHAIN",
                    44: "INVERSE",
                    47: "OPEN_ENDBLOCK",
                    48: "OPEN",
                    51: "OPEN_UNESCAPED",
                    54: "CLOSE_UNESCAPED",
                    55: "OPEN_PARTIAL",
                    60: "OPEN_PARTIAL_BLOCK",
                    65: "OPEN_SEXPR",
                    68: "CLOSE_SEXPR",
                    72: "ID",
                    73: "EQUALS",
                    75: "OPEN_BLOCK_PARAMS",
                    77: "CLOSE_BLOCK_PARAMS",
                    80: "STRING",
                    81: "NUMBER",
                    82: "BOOLEAN",
                    83: "UNDEFINED",
                    84: "NULL",
                    85: "DATA",
                    87: "SEP"
                },
                productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
                performAction: function (t, e, n, r, a, i, o) {
                    var s = i.length - 1;
                    switch (a) {
                        case 1:
                            return i[s - 1];
                        case 2:
                            this.$ = r.prepareProgram(i[s]);
                            break;
                        case 3:
                            this.$ = i[s];
                            break;
                        case 4:
                            this.$ = i[s];
                            break;
                        case 5:
                            this.$ = i[s];
                            break;
                        case 6:
                            this.$ = i[s];
                            break;
                        case 7:
                            this.$ = i[s];
                            break;
                        case 8:
                            this.$ = i[s];
                            break;
                        case 9:
                            this.$ = {
                                type: "CommentStatement",
                                value: r.stripComment(i[s]),
                                strip: r.stripFlags(i[s], i[s]),
                                loc: r.locInfo(this._$)
                            };
                            break;
                        case 10:
                            this.$ = {type: "ContentStatement", original: i[s], value: i[s], loc: r.locInfo(this._$)};
                            break;
                        case 11:
                            this.$ = r.prepareRawBlock(i[s - 2], i[s - 1], i[s], this._$);
                            break;
                        case 12:
                            this.$ = {
                                path: i[s - 3], params: i[s - 2], hash: i[s - 1]
                            };
                            break;
                        case 13:
                            this.$ = r.prepareBlock(i[s - 3], i[s - 2], i[s - 1], i[s], !1, this._$);
                            break;
                        case 14:
                            this.$ = r.prepareBlock(i[s - 3], i[s - 2], i[s - 1], i[s], !0, this._$);
                            break;
                        case 15:
                            this.$ = {
                                open: i[s - 5],
                                path: i[s - 4],
                                params: i[s - 3],
                                hash: i[s - 2],
                                blockParams: i[s - 1],
                                strip: r.stripFlags(i[s - 5], i[s])
                            };
                            break;
                        case 16:
                            this.$ = {
                                path: i[s - 4],
                                params: i[s - 3],
                                hash: i[s - 2],
                                blockParams: i[s - 1],
                                strip: r.stripFlags(i[s - 5], i[s])
                            };
                            break;
                        case 17:
                            this.$ = {
                                path: i[s - 4],
                                params: i[s - 3],
                                hash: i[s - 2],
                                blockParams: i[s - 1],
                                strip: r.stripFlags(i[s - 5], i[s])
                            };
                            break;
                        case 18:
                            this.$ = {strip: r.stripFlags(i[s - 1], i[s - 1]), program: i[s]};
                            break;
                        case 19:
                            var l = r.prepareBlock(i[s - 2], i[s - 1], i[s], i[s], !1, this._$), c = r.prepareProgram([l], i[s - 1].loc);
                            c.chained = !0, this.$ = {strip: i[s - 2].strip, program: c, chain: !0};
                            break;
                        case 20:
                            this.$ = i[s];
                            break;
                        case 21:
                            this.$ = {path: i[s - 1], strip: r.stripFlags(i[s - 2], i[s])};
                            break;
                        case 22:
                            this.$ = r.prepareMustache(i[s - 3], i[s - 2], i[s - 1], i[s - 4], r.stripFlags(i[s - 4], i[s]), this._$);
                            break;
                        case 23:
                            this.$ = r.prepareMustache(i[s - 3], i[s - 2], i[s - 1], i[s - 4], r.stripFlags(i[s - 4], i[s]), this._$);
                            break;
                        case 24:
                            this.$ = {
                                type: "PartialStatement",
                                name: i[s - 3],
                                params: i[s - 2],
                                hash: i[s - 1],
                                indent: "",
                                strip: r.stripFlags(i[s - 4], i[s]),
                                loc: r.locInfo(this._$)
                            };
                            break;
                        case 25:
                            this.$ = r.preparePartialBlock(i[s - 2], i[s - 1], i[s], this._$);
                            break;
                        case 26:
                            this.$ = {
                                path: i[s - 3],
                                params: i[s - 2],
                                hash: i[s - 1],
                                strip: r.stripFlags(i[s - 4], i[s])
                            };
                            break;
                        case 27:
                            this.$ = i[s];
                            break;
                        case 28:
                            this.$ = i[s];
                            break;
                        case 29:
                            this.$ = {
                                type: "SubExpression",
                                path: i[s - 3],
                                params: i[s - 2],
                                hash: i[s - 1],
                                loc: r.locInfo(this._$)
                            };
                            break;
                        case 30:
                            this.$ = {type: "Hash", pairs: i[s], loc: r.locInfo(this._$)};
                            break;
                        case 31:
                            this.$ = {type: "HashPair", key: r.id(i[s - 2]), value: i[s], loc: r.locInfo(this._$)};
                            break;
                        case 32:
                            this.$ = r.id(i[s - 1]);
                            break;
                        case 33:
                            this.$ = i[s];
                            break;
                        case 34:
                            this.$ = i[s];
                            break;
                        case 35:
                            this.$ = {type: "StringLiteral", value: i[s], original: i[s], loc: r.locInfo(this._$)};
                            break;
                        case 36:
                            this.$ = {
                                type: "NumberLiteral",
                                value: Number(i[s]),
                                original: Number(i[s]),
                                loc: r.locInfo(this._$)
                            };
                            break;
                        case 37:
                            this.$ = {
                                type: "BooleanLiteral",
                                value: "true" === i[s],
                                original: "true" === i[s],
                                loc: r.locInfo(this._$)
                            };
                            break;
                        case 38:
                            this.$ = {
                                type: "UndefinedLiteral",
                                original: void 0,
                                value: void 0,
                                loc: r.locInfo(this._$)
                            };
                            break;
                        case 39:
                            this.$ = {type: "NullLiteral", original: null, value: null, loc: r.locInfo(this._$)};
                            break;
                        case 40:
                            this.$ = i[s];
                            break;
                        case 41:
                            this.$ = i[s];
                            break;
                        case 42:
                            this.$ = r.preparePath(!0, i[s], this._$);
                            break;
                        case 43:
                            this.$ = r.preparePath(!1, i[s], this._$);
                            break;
                        case 44:
                            i[s - 2].push({part: r.id(i[s]), original: i[s], separator: i[s - 1]}), this.$ = i[s - 2];
                            break;
                        case 45:
                            this.$ = [{part: r.id(i[s]), original: i[s]}];
                            break;
                        case 46:
                            this.$ = [];
                            break;
                        case 47:
                            i[s - 1].push(i[s]);
                            break;
                        case 48:
                            this.$ = [i[s]];
                            break;
                        case 49:
                            i[s - 1].push(i[s]);
                            break;
                        case 50:
                            this.$ = [];
                            break;
                        case 51:
                            i[s - 1].push(i[s]);
                            break;
                        case 58:
                            this.$ = [];
                            break;
                        case 59:
                            i[s - 1].push(i[s]);
                            break;
                        case 64:
                            this.$ = [];
                            break;
                        case 65:
                            i[s - 1].push(i[s]);
                            break;
                        case 70:
                            this.$ = [];
                            break;
                        case 71:
                            i[s - 1].push(i[s]);
                            break;
                        case 78:
                            this.$ = [];
                            break;
                        case 79:
                            i[s - 1].push(i[s]);
                            break;
                        case 82:
                            this.$ = [];
                            break;
                        case 83:
                            i[s - 1].push(i[s]);
                            break;
                        case 86:
                            this.$ = [];
                            break;
                        case 87:
                            i[s - 1].push(i[s]);
                            break;
                        case 90:
                            this.$ = [];
                            break;
                        case 91:
                            i[s - 1].push(i[s]);
                            break;
                        case 94:
                            this.$ = [];
                            break;
                        case 95:
                            i[s - 1].push(i[s]);
                            break;
                        case 98:
                            this.$ = [i[s]];
                            break;
                        case 99:
                            i[s - 1].push(i[s]);
                            break;
                        case 100:
                            this.$ = [i[s]];
                            break;
                        case 101:
                            i[s - 1].push(i[s])
                    }
                },
                table: [{
                    3: 1,
                    4: 2,
                    5: [2, 46],
                    6: 3,
                    14: [2, 46],
                    15: [2, 46],
                    19: [2, 46],
                    29: [2, 46],
                    34: [2, 46],
                    48: [2, 46],
                    51: [2, 46],
                    55: [2, 46],
                    60: [2, 46]
                }, {1: [3]}, {5: [1, 4]}, {
                    5: [2, 2],
                    7: 5,
                    8: 6,
                    9: 7,
                    10: 8,
                    11: 9,
                    12: 10,
                    13: 11,
                    14: [1, 12],
                    15: [1, 20],
                    16: 17,
                    19: [1, 23],
                    24: 15,
                    27: 16,
                    29: [1, 21],
                    34: [1, 22],
                    39: [2, 2],
                    44: [2, 2],
                    47: [2, 2],
                    48: [1, 13],
                    51: [1, 14],
                    55: [1, 18],
                    59: 19,
                    60: [1, 24]
                }, {1: [2, 1]}, {
                    5: [2, 47],
                    14: [2, 47],
                    15: [2, 47],
                    19: [2, 47],
                    29: [2, 47],
                    34: [2, 47],
                    39: [2, 47],
                    44: [2, 47],
                    47: [2, 47],
                    48: [2, 47],
                    51: [2, 47],
                    55: [2, 47],
                    60: [2, 47]
                }, {
                    5: [2, 3],
                    14: [2, 3],
                    15: [2, 3],
                    19: [2, 3],
                    29: [2, 3],
                    34: [2, 3],
                    39: [2, 3],
                    44: [2, 3],
                    47: [2, 3],
                    48: [2, 3],
                    51: [2, 3],
                    55: [2, 3],
                    60: [2, 3]
                }, {
                    5: [2, 4],
                    14: [2, 4],
                    15: [2, 4],
                    19: [2, 4],
                    29: [2, 4],
                    34: [2, 4],
                    39: [2, 4],
                    44: [2, 4],
                    47: [2, 4],
                    48: [2, 4],
                    51: [2, 4],
                    55: [2, 4],
                    60: [2, 4]
                }, {
                    5: [2, 5],
                    14: [2, 5],
                    15: [2, 5],
                    19: [2, 5],
                    29: [2, 5],
                    34: [2, 5],
                    39: [2, 5],
                    44: [2, 5],
                    47: [2, 5],
                    48: [2, 5],
                    51: [2, 5],
                    55: [2, 5],
                    60: [2, 5]
                }, {
                    5: [2, 6],
                    14: [2, 6],
                    15: [2, 6],
                    19: [2, 6],
                    29: [2, 6],
                    34: [2, 6],
                    39: [2, 6],
                    44: [2, 6],
                    47: [2, 6],
                    48: [2, 6],
                    51: [2, 6],
                    55: [2, 6],
                    60: [2, 6]
                }, {
                    5: [2, 7],
                    14: [2, 7],
                    15: [2, 7],
                    19: [2, 7],
                    29: [2, 7],
                    34: [2, 7],
                    39: [2, 7],
                    44: [2, 7],
                    47: [2, 7],
                    48: [2, 7],
                    51: [2, 7],
                    55: [2, 7],
                    60: [2, 7]
                }, {
                    5: [2, 8],
                    14: [2, 8],
                    15: [2, 8],
                    19: [2, 8],
                    29: [2, 8],
                    34: [2, 8],
                    39: [2, 8],
                    44: [2, 8],
                    47: [2, 8],
                    48: [2, 8],
                    51: [2, 8],
                    55: [2, 8],
                    60: [2, 8]
                }, {
                    5: [2, 9],
                    14: [2, 9],
                    15: [2, 9],
                    19: [2, 9],
                    29: [2, 9],
                    34: [2, 9],
                    39: [2, 9],
                    44: [2, 9],
                    47: [2, 9],
                    48: [2, 9],
                    51: [2, 9],
                    55: [2, 9],
                    60: [2, 9]
                }, {
                    20: 25,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 36,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    4: 37,
                    6: 3,
                    14: [2, 46],
                    15: [2, 46],
                    19: [2, 46],
                    29: [2, 46],
                    34: [2, 46],
                    39: [2, 46],
                    44: [2, 46],
                    47: [2, 46],
                    48: [2, 46],
                    51: [2, 46],
                    55: [2, 46],
                    60: [2, 46]
                }, {
                    4: 38,
                    6: 3,
                    14: [2, 46],
                    15: [2, 46],
                    19: [2, 46],
                    29: [2, 46],
                    34: [2, 46],
                    44: [2, 46],
                    47: [2, 46],
                    48: [2, 46],
                    51: [2, 46],
                    55: [2, 46],
                    60: [2, 46]
                }, {13: 40, 15: [1, 20], 17: 39}, {
                    20: 42,
                    56: 41,
                    64: 43,
                    65: [1, 44],
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    4: 45,
                    6: 3,
                    14: [2, 46],
                    15: [2, 46],
                    19: [2, 46],
                    29: [2, 46],
                    34: [2, 46],
                    47: [2, 46],
                    48: [2, 46],
                    51: [2, 46],
                    55: [2, 46],
                    60: [2, 46]
                }, {
                    5: [2, 10],
                    14: [2, 10],
                    15: [2, 10],
                    18: [2, 10],
                    19: [2, 10],
                    29: [2, 10],
                    34: [2, 10],
                    39: [2, 10],
                    44: [2, 10],
                    47: [2, 10],
                    48: [2, 10],
                    51: [2, 10],
                    55: [2, 10],
                    60: [2, 10]
                }, {
                    20: 46,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 47,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 48,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 42,
                    56: 49,
                    64: 43,
                    65: [1, 44],
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    33: [2, 78],
                    49: 50,
                    65: [2, 78],
                    72: [2, 78],
                    80: [2, 78],
                    81: [2, 78],
                    82: [2, 78],
                    83: [2, 78],
                    84: [2, 78],
                    85: [2, 78]
                }, {
                    23: [2, 33],
                    33: [2, 33],
                    54: [2, 33],
                    65: [2, 33],
                    68: [2, 33],
                    72: [2, 33],
                    75: [2, 33],
                    80: [2, 33],
                    81: [2, 33],
                    82: [2, 33],
                    83: [2, 33],
                    84: [2, 33],
                    85: [2, 33]
                }, {
                    23: [2, 34],
                    33: [2, 34],
                    54: [2, 34],
                    65: [2, 34],
                    68: [2, 34],
                    72: [2, 34],
                    75: [2, 34],
                    80: [2, 34],
                    81: [2, 34],
                    82: [2, 34],
                    83: [2, 34],
                    84: [2, 34],
                    85: [2, 34]
                }, {
                    23: [2, 35],
                    33: [2, 35],
                    54: [2, 35],
                    65: [2, 35],
                    68: [2, 35],
                    72: [2, 35],
                    75: [2, 35],
                    80: [2, 35],
                    81: [2, 35],
                    82: [2, 35],
                    83: [2, 35],
                    84: [2, 35],
                    85: [2, 35]
                }, {
                    23: [2, 36],
                    33: [2, 36],
                    54: [2, 36],
                    65: [2, 36],
                    68: [2, 36],
                    72: [2, 36],
                    75: [2, 36],
                    80: [2, 36],
                    81: [2, 36],
                    82: [2, 36],
                    83: [2, 36],
                    84: [2, 36],
                    85: [2, 36]
                }, {
                    23: [2, 37],
                    33: [2, 37],
                    54: [2, 37],
                    65: [2, 37],
                    68: [2, 37],
                    72: [2, 37],
                    75: [2, 37],
                    80: [2, 37],
                    81: [2, 37],
                    82: [2, 37],
                    83: [2, 37],
                    84: [2, 37],
                    85: [2, 37]
                }, {
                    23: [2, 38],
                    33: [2, 38],
                    54: [2, 38],
                    65: [2, 38],
                    68: [2, 38],
                    72: [2, 38],
                    75: [2, 38],
                    80: [2, 38],
                    81: [2, 38],
                    82: [2, 38],
                    83: [2, 38],
                    84: [2, 38],
                    85: [2, 38]
                }, {
                    23: [2, 39],
                    33: [2, 39],
                    54: [2, 39],
                    65: [2, 39],
                    68: [2, 39],
                    72: [2, 39],
                    75: [2, 39],
                    80: [2, 39],
                    81: [2, 39],
                    82: [2, 39],
                    83: [2, 39],
                    84: [2, 39],
                    85: [2, 39]
                }, {
                    23: [2, 43],
                    33: [2, 43],
                    54: [2, 43],
                    65: [2, 43],
                    68: [2, 43],
                    72: [2, 43],
                    75: [2, 43],
                    80: [2, 43],
                    81: [2, 43],
                    82: [2, 43],
                    83: [2, 43],
                    84: [2, 43],
                    85: [2, 43],
                    87: [1, 51]
                }, {72: [1, 35], 86: 52}, {
                    23: [2, 45],
                    33: [2, 45],
                    54: [2, 45],
                    65: [2, 45],
                    68: [2, 45],
                    72: [2, 45],
                    75: [2, 45],
                    80: [2, 45],
                    81: [2, 45],
                    82: [2, 45],
                    83: [2, 45],
                    84: [2, 45],
                    85: [2, 45],
                    87: [2, 45]
                }, {
                    52: 53,
                    54: [2, 82],
                    65: [2, 82],
                    72: [2, 82],
                    80: [2, 82],
                    81: [2, 82],
                    82: [2, 82],
                    83: [2, 82],
                    84: [2, 82],
                    85: [2, 82]
                }, {25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54]}, {
                    28: 60,
                    43: 61,
                    44: [1, 59],
                    47: [2, 56]
                }, {13: 63, 15: [1, 20], 18: [1, 62]}, {15: [2, 48], 18: [2, 48]}, {
                    33: [2, 86],
                    57: 64,
                    65: [2, 86],
                    72: [2, 86],
                    80: [2, 86],
                    81: [2, 86],
                    82: [2, 86],
                    83: [2, 86],
                    84: [2, 86],
                    85: [2, 86]
                }, {
                    33: [2, 40],
                    65: [2, 40],
                    72: [2, 40],
                    80: [2, 40],
                    81: [2, 40],
                    82: [2, 40],
                    83: [2, 40],
                    84: [2, 40],
                    85: [2, 40]
                }, {
                    33: [2, 41],
                    65: [2, 41],
                    72: [2, 41],
                    80: [2, 41],
                    81: [2, 41],
                    82: [2, 41],
                    83: [2, 41],
                    84: [2, 41],
                    85: [2, 41]
                }, {
                    20: 65,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {26: 66, 47: [1, 67]}, {
                    30: 68,
                    33: [2, 58],
                    65: [2, 58],
                    72: [2, 58],
                    75: [2, 58],
                    80: [2, 58],
                    81: [2, 58],
                    82: [2, 58],
                    83: [2, 58],
                    84: [2, 58],
                    85: [2, 58]
                }, {
                    33: [2, 64],
                    35: 69,
                    65: [2, 64],
                    72: [2, 64],
                    75: [2, 64],
                    80: [2, 64],
                    81: [2, 64],
                    82: [2, 64],
                    83: [2, 64],
                    84: [2, 64],
                    85: [2, 64]
                }, {
                    21: 70,
                    23: [2, 50],
                    65: [2, 50],
                    72: [2, 50],
                    80: [2, 50],
                    81: [2, 50],
                    82: [2, 50],
                    83: [2, 50],
                    84: [2, 50],
                    85: [2, 50]
                }, {
                    33: [2, 90],
                    61: 71,
                    65: [2, 90],
                    72: [2, 90],
                    80: [2, 90],
                    81: [2, 90],
                    82: [2, 90],
                    83: [2, 90],
                    84: [2, 90],
                    85: [2, 90]
                }, {
                    20: 75,
                    33: [2, 80],
                    50: 72,
                    63: 73,
                    64: 76,
                    65: [1, 44],
                    69: 74,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {72: [1, 80]}, {
                    23: [2, 42],
                    33: [2, 42],
                    54: [2, 42],
                    65: [2, 42],
                    68: [2, 42],
                    72: [2, 42],
                    75: [2, 42],
                    80: [2, 42],
                    81: [2, 42],
                    82: [2, 42],
                    83: [2, 42],
                    84: [2, 42],
                    85: [2, 42],
                    87: [1, 51]
                }, {
                    20: 75,
                    53: 81,
                    54: [2, 84],
                    63: 82,
                    64: 76,
                    65: [1, 44],
                    69: 83,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {26: 84, 47: [1, 67]}, {47: [2, 55]}, {
                    4: 85,
                    6: 3,
                    14: [2, 46],
                    15: [2, 46],
                    19: [2, 46],
                    29: [2, 46],
                    34: [2, 46],
                    39: [2, 46],
                    44: [2, 46],
                    47: [2, 46],
                    48: [2, 46],
                    51: [2, 46],
                    55: [2, 46],
                    60: [2, 46]
                }, {47: [2, 20]}, {
                    20: 86,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    4: 87,
                    6: 3,
                    14: [2, 46],
                    15: [2, 46],
                    19: [2, 46],
                    29: [2, 46],
                    34: [2, 46],
                    47: [2, 46],
                    48: [2, 46],
                    51: [2, 46],
                    55: [2, 46],
                    60: [2, 46]
                }, {26: 88, 47: [1, 67]}, {47: [2, 57]}, {
                    5: [2, 11],
                    14: [2, 11],
                    15: [2, 11],
                    19: [2, 11],
                    29: [2, 11],
                    34: [2, 11],
                    39: [2, 11],
                    44: [2, 11],
                    47: [2, 11],
                    48: [2, 11],
                    51: [2, 11],
                    55: [2, 11],
                    60: [2, 11]
                }, {15: [2, 49], 18: [2, 49]}, {
                    20: 75,
                    33: [2, 88],
                    58: 89,
                    63: 90,
                    64: 76,
                    65: [1, 44],
                    69: 91,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    65: [2, 94],
                    66: 92,
                    68: [2, 94],
                    72: [2, 94],
                    80: [2, 94],
                    81: [2, 94],
                    82: [2, 94],
                    83: [2, 94],
                    84: [2, 94],
                    85: [2, 94]
                }, {
                    5: [2, 25],
                    14: [2, 25],
                    15: [2, 25],
                    19: [2, 25],
                    29: [2, 25],
                    34: [2, 25],
                    39: [2, 25],
                    44: [2, 25],
                    47: [2, 25],
                    48: [2, 25],
                    51: [2, 25],
                    55: [2, 25],
                    60: [2, 25]
                }, {
                    20: 93,
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 75,
                    31: 94,
                    33: [2, 60],
                    63: 95,
                    64: 76,
                    65: [1, 44],
                    69: 96,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    75: [2, 60],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 75,
                    33: [2, 66],
                    36: 97,
                    63: 98,
                    64: 76,
                    65: [1, 44],
                    69: 99,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    75: [2, 66],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 75,
                    22: 100,
                    23: [2, 52],
                    63: 101,
                    64: 76,
                    65: [1, 44],
                    69: 102,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    20: 75,
                    33: [2, 92],
                    62: 103,
                    63: 104,
                    64: 76,
                    65: [1, 44],
                    69: 105,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {33: [1, 106]}, {
                    33: [2, 79],
                    65: [2, 79],
                    72: [2, 79],
                    80: [2, 79],
                    81: [2, 79],
                    82: [2, 79],
                    83: [2, 79],
                    84: [2, 79],
                    85: [2, 79]
                }, {33: [2, 81]}, {
                    23: [2, 27],
                    33: [2, 27],
                    54: [2, 27],
                    65: [2, 27],
                    68: [2, 27],
                    72: [2, 27],
                    75: [2, 27],
                    80: [2, 27],
                    81: [2, 27],
                    82: [2, 27],
                    83: [2, 27],
                    84: [2, 27],
                    85: [2, 27]
                }, {
                    23: [2, 28],
                    33: [2, 28],
                    54: [2, 28],
                    65: [2, 28],
                    68: [2, 28],
                    72: [2, 28],
                    75: [2, 28],
                    80: [2, 28],
                    81: [2, 28],
                    82: [2, 28],
                    83: [2, 28],
                    84: [2, 28],
                    85: [2, 28]
                }, {
                    23: [2, 30],
                    33: [2, 30],
                    54: [2, 30],
                    68: [2, 30],
                    71: 107,
                    72: [1, 108],
                    75: [2, 30]
                }, {23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98]}, {
                    23: [2, 45],
                    33: [2, 45],
                    54: [2, 45],
                    65: [2, 45],
                    68: [2, 45],
                    72: [2, 45],
                    73: [1, 109],
                    75: [2, 45],
                    80: [2, 45],
                    81: [2, 45],
                    82: [2, 45],
                    83: [2, 45],
                    84: [2, 45],
                    85: [2, 45],
                    87: [2, 45]
                }, {
                    23: [2, 44],
                    33: [2, 44],
                    54: [2, 44],
                    65: [2, 44],
                    68: [2, 44],
                    72: [2, 44],
                    75: [2, 44],
                    80: [2, 44],
                    81: [2, 44],
                    82: [2, 44],
                    83: [2, 44],
                    84: [2, 44],
                    85: [2, 44],
                    87: [2, 44]
                }, {54: [1, 110]}, {
                    54: [2, 83],
                    65: [2, 83],
                    72: [2, 83],
                    80: [2, 83],
                    81: [2, 83],
                    82: [2, 83],
                    83: [2, 83],
                    84: [2, 83],
                    85: [2, 83]
                }, {54: [2, 85]}, {
                    5: [2, 13],
                    14: [2, 13],
                    15: [2, 13],
                    19: [2, 13],
                    29: [2, 13],
                    34: [2, 13],
                    39: [2, 13],
                    44: [2, 13],
                    47: [2, 13],
                    48: [2, 13],
                    51: [2, 13],
                    55: [2, 13],
                    60: [2, 13]
                }, {38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76]}, {
                    33: [2, 70],
                    40: 113,
                    65: [2, 70],
                    72: [2, 70],
                    75: [2, 70],
                    80: [2, 70],
                    81: [2, 70],
                    82: [2, 70],
                    83: [2, 70],
                    84: [2, 70],
                    85: [2, 70]
                }, {47: [2, 18]}, {
                    5: [2, 14],
                    14: [2, 14],
                    15: [2, 14],
                    19: [2, 14],
                    29: [2, 14],
                    34: [2, 14],
                    39: [2, 14],
                    44: [2, 14],
                    47: [2, 14],
                    48: [2, 14],
                    51: [2, 14],
                    55: [2, 14],
                    60: [2, 14]
                }, {33: [1, 114]}, {
                    33: [2, 87],
                    65: [2, 87],
                    72: [2, 87],
                    80: [2, 87],
                    81: [2, 87],
                    82: [2, 87],
                    83: [2, 87],
                    84: [2, 87],
                    85: [2, 87]
                }, {33: [2, 89]}, {
                    20: 75,
                    63: 116,
                    64: 76,
                    65: [1, 44],
                    67: 115,
                    68: [2, 96],
                    69: 117,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {33: [1, 118]}, {32: 119, 33: [2, 62], 74: 120, 75: [1, 121]}, {
                    33: [2, 59],
                    65: [2, 59],
                    72: [2, 59],
                    75: [2, 59],
                    80: [2, 59],
                    81: [2, 59],
                    82: [2, 59],
                    83: [2, 59],
                    84: [2, 59],
                    85: [2, 59]
                }, {33: [2, 61], 75: [2, 61]}, {33: [2, 68], 37: 122, 74: 123, 75: [1, 121]}, {
                    33: [2, 65],
                    65: [2, 65],
                    72: [2, 65],
                    75: [2, 65],
                    80: [2, 65],
                    81: [2, 65],
                    82: [2, 65],
                    83: [2, 65],
                    84: [2, 65],
                    85: [2, 65]
                }, {33: [2, 67], 75: [2, 67]}, {23: [1, 124]}, {
                    23: [2, 51],
                    65: [2, 51],
                    72: [2, 51],
                    80: [2, 51],
                    81: [2, 51],
                    82: [2, 51],
                    83: [2, 51],
                    84: [2, 51],
                    85: [2, 51]
                }, {23: [2, 53]}, {33: [1, 125]}, {
                    33: [2, 91],
                    65: [2, 91],
                    72: [2, 91],
                    80: [2, 91],
                    81: [2, 91],
                    82: [2, 91],
                    83: [2, 91],
                    84: [2, 91],
                    85: [2, 91]
                }, {33: [2, 93]}, {
                    5: [2, 22],
                    14: [2, 22],
                    15: [2, 22],
                    19: [2, 22],
                    29: [2, 22],
                    34: [2, 22],
                    39: [2, 22],
                    44: [2, 22],
                    47: [2, 22],
                    48: [2, 22],
                    51: [2, 22],
                    55: [2, 22],
                    60: [2, 22]
                }, {
                    23: [2, 99],
                    33: [2, 99],
                    54: [2, 99],
                    68: [2, 99],
                    72: [2, 99],
                    75: [2, 99]
                }, {73: [1, 109]}, {
                    20: 75,
                    63: 126,
                    64: 76,
                    65: [1, 44],
                    72: [1, 35],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    5: [2, 23],
                    14: [2, 23],
                    15: [2, 23],
                    19: [2, 23],
                    29: [2, 23],
                    34: [2, 23],
                    39: [2, 23],
                    44: [2, 23],
                    47: [2, 23],
                    48: [2, 23],
                    51: [2, 23],
                    55: [2, 23],
                    60: [2, 23]
                }, {47: [2, 19]}, {47: [2, 77]}, {
                    20: 75,
                    33: [2, 72],
                    41: 127,
                    63: 128,
                    64: 76,
                    65: [1, 44],
                    69: 129,
                    70: 77,
                    71: 78,
                    72: [1, 79],
                    75: [2, 72],
                    78: 26,
                    79: 27,
                    80: [1, 28],
                    81: [1, 29],
                    82: [1, 30],
                    83: [1, 31],
                    84: [1, 32],
                    85: [1, 34],
                    86: 33
                }, {
                    5: [2, 24],
                    14: [2, 24],
                    15: [2, 24],
                    19: [2, 24],
                    29: [2, 24],
                    34: [2, 24],
                    39: [2, 24],
                    44: [2, 24],
                    47: [2, 24],
                    48: [2, 24],
                    51: [2, 24],
                    55: [2, 24],
                    60: [2, 24]
                }, {68: [1, 130]}, {
                    65: [2, 95],
                    68: [2, 95],
                    72: [2, 95],
                    80: [2, 95],
                    81: [2, 95],
                    82: [2, 95],
                    83: [2, 95],
                    84: [2, 95],
                    85: [2, 95]
                }, {68: [2, 97]}, {
                    5: [2, 21],
                    14: [2, 21],
                    15: [2, 21],
                    19: [2, 21],
                    29: [2, 21],
                    34: [2, 21],
                    39: [2, 21],
                    44: [2, 21],
                    47: [2, 21],
                    48: [2, 21],
                    51: [2, 21],
                    55: [2, 21],
                    60: [2, 21]
                }, {33: [1, 131]}, {33: [2, 63]}, {
                    72: [1, 133],
                    76: 132
                }, {33: [1, 134]}, {33: [2, 69]}, {15: [2, 12]}, {
                    14: [2, 26],
                    15: [2, 26],
                    19: [2, 26],
                    29: [2, 26],
                    34: [2, 26],
                    47: [2, 26],
                    48: [2, 26],
                    51: [2, 26],
                    55: [2, 26],
                    60: [2, 26]
                }, {23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31]}, {
                    33: [2, 74],
                    42: 135,
                    74: 136,
                    75: [1, 121]
                }, {
                    33: [2, 71],
                    65: [2, 71],
                    72: [2, 71],
                    75: [2, 71],
                    80: [2, 71],
                    81: [2, 71],
                    82: [2, 71],
                    83: [2, 71],
                    84: [2, 71],
                    85: [2, 71]
                }, {33: [2, 73], 75: [2, 73]}, {
                    23: [2, 29],
                    33: [2, 29],
                    54: [2, 29],
                    65: [2, 29],
                    68: [2, 29],
                    72: [2, 29],
                    75: [2, 29],
                    80: [2, 29],
                    81: [2, 29],
                    82: [2, 29],
                    83: [2, 29],
                    84: [2, 29],
                    85: [2, 29]
                }, {
                    14: [2, 15],
                    15: [2, 15],
                    19: [2, 15],
                    29: [2, 15],
                    34: [2, 15],
                    39: [2, 15],
                    44: [2, 15],
                    47: [2, 15],
                    48: [2, 15],
                    51: [2, 15],
                    55: [2, 15],
                    60: [2, 15]
                }, {72: [1, 138], 77: [1, 137]}, {72: [2, 100], 77: [2, 100]}, {
                    14: [2, 16],
                    15: [2, 16],
                    19: [2, 16],
                    29: [2, 16],
                    34: [2, 16],
                    44: [2, 16],
                    47: [2, 16],
                    48: [2, 16],
                    51: [2, 16],
                    55: [2, 16],
                    60: [2, 16]
                }, {33: [1, 139]}, {33: [2, 75]}, {33: [2, 32]}, {72: [2, 101], 77: [2, 101]}, {
                    14: [2, 17],
                    15: [2, 17],
                    19: [2, 17],
                    29: [2, 17],
                    34: [2, 17],
                    39: [2, 17],
                    44: [2, 17],
                    47: [2, 17],
                    48: [2, 17],
                    51: [2, 17],
                    55: [2, 17],
                    60: [2, 17]
                }],
                defaultActions: {
                    4: [2, 1],
                    55: [2, 55],
                    57: [2, 20],
                    61: [2, 57],
                    74: [2, 81],
                    83: [2, 85],
                    87: [2, 18],
                    91: [2, 89],
                    102: [2, 53],
                    105: [2, 93],
                    111: [2, 19],
                    112: [2, 77],
                    117: [2, 97],
                    120: [2, 63],
                    123: [2, 69],
                    124: [2, 12],
                    136: [2, 75],
                    137: [2, 32]
                },
                parseError: function (t, e) {
                    throw new Error(t)
                },
                parse: function (t) {
                    function e() {
                        var t;
                        return t = n.lexer.lex() || 1, "number" != typeof t && (t = n.symbols_[t] || t), t
                    }

                    var n = this, r = [0], a = [null], i = [], o = this.table, s = "", l = 0, c = 0, u = 0;
                    this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                    var h = this.lexer.yylloc;
                    i.push(h);
                    var p = this.lexer.options && this.lexer.options.ranges;
                    "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                    for (var d, f, m, g, v, y, b, _, x, w = {}; ;) {
                        if (m = r[r.length - 1], this.defaultActions[m] ? g = this.defaultActions[m] : ((null === d || "undefined" == typeof d) && (d = e()), g = o[m] && o[m][d]), "undefined" == typeof g || !g.length || !g[0]) {
                            var S = "";
                            if (!u) {
                                x = [];
                                for (y in o[m])this.terminals_[y] && y > 2 && x.push("'" + this.terminals_[y] + "'");
                                S = this.lexer.showPosition ? "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + x.join(", ") + ", got '" + (this.terminals_[d] || d) + "'" : "Parse error on line " + (l + 1) + ": Unexpected " + (1 == d ? "end of input" : "'" + (this.terminals_[d] || d) + "'"), this.parseError(S, {
                                    text: this.lexer.match,
                                    token: this.terminals_[d] || d,
                                    line: this.lexer.yylineno,
                                    loc: h,
                                    expected: x
                                })
                            }
                        }
                        if (g[0]instanceof Array && g.length > 1)throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + d);
                        switch (g[0]) {
                            case 1:
                                r.push(d), a.push(this.lexer.yytext), i.push(this.lexer.yylloc), r.push(g[1]), d = null, f ? (d = f, f = null) : (c = this.lexer.yyleng, s = this.lexer.yytext, l = this.lexer.yylineno, h = this.lexer.yylloc, u > 0 && u--);
                                break;
                            case 2:
                                if (b = this.productions_[g[1]][1], w.$ = a[a.length - b], w._$ = {
                                        first_line: i[i.length - (b || 1)].first_line,
                                        last_line: i[i.length - 1].last_line,
                                        first_column: i[i.length - (b || 1)].first_column,
                                        last_column: i[i.length - 1].last_column
                                    }, p && (w._$.range = [i[i.length - (b || 1)].range[0], i[i.length - 1].range[1]]), v = this.performAction.call(w, s, c, l, this.yy, g[1], a, i), "undefined" != typeof v)return v;
                                b && (r = r.slice(0, -1 * b * 2), a = a.slice(0, -1 * b), i = i.slice(0, -1 * b)), r.push(this.productions_[g[1]][0]), a.push(w.$), i.push(w._$), _ = o[r[r.length - 2]][r[r.length - 1]], r.push(_);
                                break;
                            case 3:
                                return !0
                        }
                    }
                    return !0
                }
            }, n = function () {
                var t = {
                    EOF: 1, parseError: function (t, e) {
                        if (!this.yy.parser)throw new Error(t);
                        this.yy.parser.parseError(t, e)
                    }, setInput: function (t) {
                        return this._input = t, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                    }, input: function () {
                        var t = this._input[0];
                        this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t;
                        var e = t.match(/(?:\r\n?|\n).*/g);
                        return e ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t
                    }, unput: function (t) {
                        var e = t.length, n = t.split(/(?:\r\n?|\n)/g);
                        this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e - 1), this.offset -= e;
                        var r = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
                        var a = this.yylloc.range;
                        return this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - e
                        }, this.options.ranges && (this.yylloc.range = [a[0], a[0] + this.yyleng - e]), this
                    }, more: function () {
                        return this._more = !0, this
                    }, less: function (t) {
                        this.unput(this.match.slice(t))
                    }, pastInput: function () {
                        var t = this.matched.substr(0, this.matched.length - this.match.length);
                        return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "")
                    }, upcomingInput: function () {
                        var t = this.match;
                        return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "")
                    }, showPosition: function () {
                        var t = this.pastInput(), e = new Array(t.length + 1).join("-");
                        return t + this.upcomingInput() + "\n" + e + "^"
                    }, next: function () {
                        if (this.done)return this.EOF;
                        this._input || (this.done = !0);
                        var t, e, n, r, a;
                        this._more || (this.yytext = "", this.match = "");
                        for (var i = this._currentRules(), o = 0; o < i.length && (n = this._input.match(this.rules[i[o]]), !n || e && !(n[0].length > e[0].length) || (e = n, r = o, this.options.flex)); o++);
                        return e ? (a = e[0].match(/(?:\r\n?|\n).*/g), a && (this.yylineno += a.length), this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: a ? a[a.length - 1].length - a[a.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
                        }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], t = this.performAction.call(this, this.yy, this, i[r], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), t ? t : void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    }, lex: function () {
                        var t = this.next();
                        return "undefined" != typeof t ? t : this.lex()
                    }, begin: function (t) {
                        this.conditionStack.push(t)
                    }, popState: function () {
                        return this.conditionStack.pop()
                    }, _currentRules: function () {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                    }, topState: function () {
                        return this.conditionStack[this.conditionStack.length - 2]
                    }, pushState: function (t) {
                        this.begin(t)
                    }
                };
                return t.options = {}, t.performAction = function (t, e, n, r) {
                    function a(t, n) {
                        return e.yytext = e.yytext.substr(t, e.yyleng - n)
                    }

                    switch (n) {
                        case 0:
                            if ("\\\\" === e.yytext.slice(-2) ? (a(0, 1), this.begin("mu")) : "\\" === e.yytext.slice(-1) ? (a(0, 1), this.begin("emu")) : this.begin("mu"), e.yytext)return 15;
                            break;
                        case 1:
                            return 15;
                        case 2:
                            return this.popState(), 15;
                        case 3:
                            return this.begin("raw"), 15;
                        case 4:
                            return this.popState(), "raw" === this.conditionStack[this.conditionStack.length - 1] ? 15 : (e.yytext = e.yytext.substr(5, e.yyleng - 9), "END_RAW_BLOCK");
                        case 5:
                            return 15;
                        case 6:
                            return this.popState(), 14;
                        case 7:
                            return 65;
                        case 8:
                            return 68;
                        case 9:
                            return 19;
                        case 10:
                            return this.popState(), this.begin("raw"), 23;
                        case 11:
                            return 55;
                        case 12:
                            return 60;
                        case 13:
                            return 29;
                        case 14:
                            return 47;
                        case 15:
                            return this.popState(), 44;
                        case 16:
                            return this.popState(), 44;
                        case 17:
                            return 34;
                        case 18:
                            return 39;
                        case 19:
                            return 51;
                        case 20:
                            return 48;
                        case 21:
                            this.unput(e.yytext), this.popState(), this.begin("com");
                            break;
                        case 22:
                            return this.popState(), 14;
                        case 23:
                            return 48;
                        case 24:
                            return 73;
                        case 25:
                            return 72;
                        case 26:
                            return 72;
                        case 27:
                            return 87;
                        case 28:
                            break;
                        case 29:
                            return this.popState(), 54;
                        case 30:
                            return this.popState(), 33;
                        case 31:
                            return e.yytext = a(1, 2).replace(/\\"/g, '"'), 80;
                        case 32:
                            return e.yytext = a(1, 2).replace(/\\'/g, "'"), 80;
                        case 33:
                            return 85;
                        case 34:
                            return 82;
                        case 35:
                            return 82;
                        case 36:
                            return 83;
                        case 37:
                            return 84;
                        case 38:
                            return 81;
                        case 39:
                            return 75;
                        case 40:
                            return 77;
                        case 41:
                            return 72;
                        case 42:
                            return 72;
                        case 43:
                            return "INVALID";
                        case 44:
                            return 5
                    }
                }, t.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], t.conditions = {
                    mu: {
                        rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                        inclusive: !1
                    },
                    emu: {rules: [2], inclusive: !1},
                    com: {rules: [6], inclusive: !1},
                    raw: {rules: [3, 4, 5], inclusive: !1},
                    INITIAL: {rules: [0, 1, 44], inclusive: !0}
                }, t
            }();
            return e.lexer = n, t.prototype = e, e.Parser = t, new t
        }();
        e.__esModule = !0, e["default"] = r
    }, function (t, e, n) {
        "use strict";
        function r() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            this.options = t
        }

        function a(t, e, n) {
            void 0 === e && (e = t.length);
            var r = t[e - 1], a = t[e - 2];
            return r ? "ContentStatement" === r.type ? (a || !n ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(r.original) : void 0 : n
        }

        function i(t, e, n) {
            void 0 === e && (e = -1);
            var r = t[e + 1], a = t[e + 2];
            return r ? "ContentStatement" === r.type ? (a || !n ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(r.original) : void 0 : n
        }

        function o(t, e, n) {
            var r = t[null == e ? 0 : e + 1];
            if (r && "ContentStatement" === r.type && (n || !r.rightStripped)) {
                var a = r.value;
                r.value = r.value.replace(n ? /^\s+/ : /^[ \t]*\r?\n?/, ""), r.rightStripped = r.value !== a
            }
        }

        function s(t, e, n) {
            var r = t[null == e ? t.length - 1 : e - 1];
            if (r && "ContentStatement" === r.type && (n || !r.leftStripped)) {
                var a = r.value;
                return r.value = r.value.replace(n ? /\s+$/ : /[ \t]+$/, ""), r.leftStripped = r.value !== a, r.leftStripped
            }
        }

        var l = n(8)["default"];
        e.__esModule = !0;
        var c = n(6), u = l(c);
        r.prototype = new u["default"], r.prototype.Program = function (t) {
            var e = !this.options.ignoreStandalone, n = !this.isRootSeen;
            this.isRootSeen = !0;
            for (var r = t.body, l = 0, c = r.length; c > l; l++) {
                var u = r[l], h = this.accept(u);
                if (h) {
                    var p = a(r, l, n), d = i(r, l, n), f = h.openStandalone && p, m = h.closeStandalone && d, g = h.inlineStandalone && p && d;
                    h.close && o(r, l, !0), h.open && s(r, l, !0), e && g && (o(r, l), s(r, l) && "PartialStatement" === u.type && (u.indent = /([ \t]+$)/.exec(r[l - 1].original)[1])), e && f && (o((u.program || u.inverse).body), s(r, l)), e && m && (o(r, l), s((u.inverse || u.program).body))
                }
            }
            return t
        }, r.prototype.BlockStatement = r.prototype.DecoratorBlock = r.prototype.PartialBlockStatement = function (t) {
            this.accept(t.program), this.accept(t.inverse);
            var e = t.program || t.inverse, n = t.program && t.inverse, r = n, l = n;
            if (n && n.chained)for (r = n.body[0].program; l.chained;)l = l.body[l.body.length - 1].program;
            var c = {
                open: t.openStrip.open,
                close: t.closeStrip.close,
                openStandalone: i(e.body),
                closeStandalone: a((r || e).body)
            };
            if (t.openStrip.close && o(e.body, null, !0), n) {
                var u = t.inverseStrip;
                u.open && s(e.body, null, !0), u.close && o(r.body, null, !0), t.closeStrip.open && s(l.body, null, !0), !this.options.ignoreStandalone && a(e.body) && i(r.body) && (s(e.body), o(r.body))
            } else t.closeStrip.open && s(e.body, null, !0);
            return c
        }, r.prototype.Decorator = r.prototype.MustacheStatement = function (t) {
            return t.strip
        }, r.prototype.PartialStatement = r.prototype.CommentStatement = function (t) {
            var e = t.strip || {};
            return {inlineStandalone: !0, open: e.open, close: e.close}
        }, e["default"] = r, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        function r(t, e) {
            if (e = e.path ? e.path.original : e, t.path.original !== e) {
                var n = {loc: t.path.loc};
                throw new g["default"](t.path.original + " doesn't match " + e, n)
            }
        }

        function a(t, e) {
            this.source = t, this.start = {line: e.first_line, column: e.first_column}, this.end = {
                line: e.last_line,
                column: e.last_column
            }
        }

        function i(t) {
            return /^\[.*\]$/.test(t) ? t.substr(1, t.length - 2) : t
        }

        function o(t, e) {
            return {open: "~" === t.charAt(2), close: "~" === e.charAt(e.length - 3)}
        }

        function s(t) {
            return t.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "")
        }

        function l(t, e, n) {
            n = this.locInfo(n);
            for (var r = t ? "@" : "", a = [], i = 0, o = "", s = 0, l = e.length; l > s; s++) {
                var c = e[s].part, u = e[s].original !== c;
                if (r += (e[s].separator || "") + c, u || ".." !== c && "." !== c && "this" !== c)a.push(c); else {
                    if (a.length > 0)throw new g["default"]("Invalid path: " + r, {loc: n});
                    ".." === c && (i++, o += "../")
                }
            }
            return {type: "PathExpression", data: t, depth: i, parts: a, original: r, loc: n}
        }

        function c(t, e, n, r, a, i) {
            var o = r.charAt(3) || r.charAt(2), s = "{" !== o && "&" !== o, l = /\*/.test(r);
            return {
                type: l ? "Decorator" : "MustacheStatement",
                path: t,
                params: e,
                hash: n,
                escaped: s,
                strip: a,
                loc: this.locInfo(i)
            }
        }

        function u(t, e, n, a) {
            r(t, n), a = this.locInfo(a);
            var i = {type: "Program", body: e, strip: {}, loc: a};
            return {
                type: "BlockStatement",
                path: t.path,
                params: t.params,
                hash: t.hash,
                program: i,
                openStrip: {},
                inverseStrip: {},
                closeStrip: {},
                loc: a
            }
        }

        function h(t, e, n, a, i, o) {
            a && a.path && r(t, a);
            var s = /\*/.test(t.open);
            e.blockParams = t.blockParams;
            var l = void 0, c = void 0;
            if (n) {
                if (s)throw new g["default"]("Unexpected inverse block on decorator", n);
                n.chain && (n.program.body[0].closeStrip = a.strip), c = n.strip, l = n.program
            }
            return i && (i = l, l = e, e = i), {
                type: s ? "DecoratorBlock" : "BlockStatement",
                path: t.path,
                params: t.params,
                hash: t.hash,
                program: e,
                inverse: l,
                openStrip: t.strip,
                inverseStrip: c,
                closeStrip: a && a.strip,
                loc: this.locInfo(o)
            }
        }

        function p(t, e) {
            if (!e && t.length) {
                var n = t[0].loc, r = t[t.length - 1].loc;
                n && r && (e = {
                    source: n.source,
                    start: {line: n.start.line, column: n.start.column},
                    end: {line: r.end.line, column: r.end.column}
                })
            }
            return {type: "Program", body: t, strip: {}, loc: e}
        }

        function d(t, e, n, a) {
            return r(t, n), {
                type: "PartialBlockStatement",
                name: t.path,
                params: t.params,
                hash: t.hash,
                program: e,
                openStrip: t.strip,
                closeStrip: n && n.strip,
                loc: this.locInfo(a)
            }
        }

        var f = n(8)["default"];
        e.__esModule = !0, e.SourceLocation = a, e.id = i, e.stripFlags = o, e.stripComment = s, e.preparePath = l, e.prepareMustache = c, e.prepareRawBlock = u, e.prepareBlock = h, e.prepareProgram = p, e.preparePartialBlock = d;
        var m = n(12), g = f(m)
    }, function (t, e, n) {
        "use strict";
        function r(t, e, n) {
            if (i.isArray(t)) {
                for (var r = [], a = 0, o = t.length; o > a; a++)r.push(e.wrap(t[a], n));
                return r
            }
            return "boolean" == typeof t || "number" == typeof t ? t + "" : t
        }

        function a(t) {
            this.srcFile = t, this.source = []
        }

        e.__esModule = !0;
        var i = n(13), o = void 0;
        try {
        } catch (s) {
        }
        o || (o = function (t, e, n, r) {
            this.src = "", r && this.add(r)
        }, o.prototype = {
            add: function (t) {
                i.isArray(t) && (t = t.join("")), this.src += t
            }, prepend: function (t) {
                i.isArray(t) && (t = t.join("")), this.src = t + this.src
            }, toStringWithSourceMap: function () {
                return {code: this.toString()}
            }, toString: function () {
                return this.src
            }
        }), a.prototype = {
            isEmpty: function () {
                return !this.source.length
            }, prepend: function (t, e) {
                this.source.unshift(this.wrap(t, e))
            }, push: function (t, e) {
                this.source.push(this.wrap(t, e))
            }, merge: function () {
                var t = this.empty();
                return this.each(function (e) {
                    t.add(["  ", e, "\n"])
                }), t
            }, each: function (t) {
                for (var e = 0, n = this.source.length; n > e; e++)t(this.source[e])
            }, empty: function () {
                var t = this.currentLocation || {start: {}};
                return new o(t.start.line, t.start.column, this.srcFile)
            }, wrap: function (t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? this.currentLocation || {start: {}} : arguments[1];
                return t instanceof o ? t : (t = r(t, this, e), new o(e.start.line, e.start.column, this.srcFile, t))
            }, functionCall: function (t, e, n) {
                return n = this.generateList(n), this.wrap([t, e ? "." + e + "(" : "(", n, ")"])
            }, quotedString: function (t) {
                return '"' + (t + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
            }, objectLiteral: function (t) {
                var e = [];
                for (var n in t)if (t.hasOwnProperty(n)) {
                    var a = r(t[n], this);
                    "undefined" !== a && e.push([this.quotedString(n), ":", a])
                }
                var i = this.generateList(e);
                return i.prepend("{"), i.add("}"), i
            }, generateList: function (t) {
                for (var e = this.empty(), n = 0, a = t.length; a > n; n++)n && e.add(","), e.add(r(t[n], this));
                return e
            }, generateArray: function (t) {
                var e = this.generateList(t);
                return e.prepend("["), e.add("]"), e
            }
        }, e["default"] = a, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        function r(t) {
            o["default"](t), l["default"](t), u["default"](t), p["default"](t), f["default"](t), g["default"](t), y["default"](t)
        }

        var a = n(8)["default"];
        e.__esModule = !0, e.registerDefaultHelpers = r;
        var i = n(22), o = a(i), s = n(23), l = a(s), c = n(24), u = a(c), h = n(25), p = a(h), d = n(26), f = a(d), m = n(27), g = a(m), v = n(28), y = a(v)
    }, function (t, e, n) {
        "use strict";
        function r(t) {
            o["default"](t)
        }

        var a = n(8)["default"];
        e.__esModule = !0, e.registerDefaultDecorators = r;
        var i = n(29), o = a(i)
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0;
        var r = {
            methodMap: ["debug", "info", "warn", "error"], level: "info", lookupLevel: function (t) {
                if ("string" == typeof t) {
                    var e = r.methodMap.indexOf(t.toLowerCase());
                    t = e >= 0 ? e : parseInt(t, 10)
                }
                return t
            }, log: function (t) {
                if (t = r.lookupLevel(t), "undefined" != typeof console && r.lookupLevel(r.level) <= t) {
                    var e = r.methodMap[t];
                    console[e] || (e = "log");
                    for (var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), i = 1; n > i; i++)a[i - 1] = arguments[i];
                    console[e].apply(console, a)
                }
            }
        };
        e["default"] = r, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0;
        var r = n(13);
        e["default"] = function (t) {
            t.registerHelper("blockHelperMissing", function (e, n) {
                var a = n.inverse, i = n.fn;
                if (e === !0)return i(this);
                if (e === !1 || null == e)return a(this);
                if (r.isArray(e))return e.length > 0 ? (n.ids && (n.ids = [n.name]), t.helpers.each(e, n)) : a(this);
                if (n.data && n.ids) {
                    var o = r.createFrame(n.data);
                    o.contextPath = r.appendContextPath(n.data.contextPath, n.name), n = {data: o}
                }
                return i(e, n)
            })
        }, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        var r = n(8)["default"];
        e.__esModule = !0;
        var a = n(13), i = n(12), o = r(i);
        e["default"] = function (t) {
            t.registerHelper("each", function (t, e) {
                function n(e, n, i) {
                    null != t[e] && (c && (c.key = e, c.index = n, c.first = 0 === n, c.last = !!i, u && (c.contextPath = u + e)), l += r(t[e], {
                        data: c,
                        blockParams: a.blockParams([t[e], e], [u + e, null])
                    }))
                }

                if (!e)throw new o["default"]("Must pass iterator to #each");
                var r = e.fn, i = e.inverse, s = 0, l = "", c = void 0, u = void 0;
                if (e.data && e.ids && (u = a.appendContextPath(e.data.contextPath, e.ids[0]) + "."),
                    a.isFunction(t) && (t = t.call(this)), e.data && (c = a.createFrame(e.data)), t && "object" == typeof t)if (a.isArray(t))for (var h = t.length; h > s; s++)n(s, s, s === t.length - 1); else {
                    var p = void 0;
                    for (var d in t)t.hasOwnProperty(d) && (void 0 !== p && n(p, s - 1), p = d, s++);
                    void 0 !== p && n(p, s - 1, !0)
                }
                return 0 === s && (l = i(this)), l
            })
        }, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        var r = n(8)["default"];
        e.__esModule = !0;
        var a = n(12), i = r(a);
        e["default"] = function (t) {
            t.registerHelper("helperMissing", function () {
                if (1 !== arguments.length)throw new i["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
            })
        }, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0;
        var r = n(13);
        e["default"] = function (t) {
            t.registerHelper("if", function (t, e) {
                return r.isFunction(t) && (t = t.call(this)), !e.hash.includeZero && !t || r.isEmpty(t) ? e.inverse(this) : e.fn(this)
            }), t.registerHelper("unless", function (e, n) {
                return t.helpers["if"].call(this, e, {fn: n.inverse, inverse: n.fn, hash: n.hash})
            })
        }, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0, e["default"] = function (t) {
            t.registerHelper("log", function () {
                for (var e = [void 0], n = arguments[arguments.length - 1], r = 0; r < arguments.length - 1; r++)e.push(arguments[r]);
                var a = 1;
                null != n.hash.level ? a = n.hash.level : n.data && null != n.data.level && (a = n.data.level), e[0] = a, t.log.apply(t, e)
            })
        }, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0, e["default"] = function (t) {
            t.registerHelper("lookup", function (t, e) {
                return t && t[e]
            })
        }, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0;
        var r = n(13);
        e["default"] = function (t) {
            t.registerHelper("with", function (t, e) {
                r.isFunction(t) && (t = t.call(this));
                var n = e.fn;
                if (r.isEmpty(t))return e.inverse(this);
                var a = e.data;
                return e.data && e.ids && (a = r.createFrame(e.data), a.contextPath = r.appendContextPath(e.data.contextPath, e.ids[0])), n(t, {
                    data: a,
                    blockParams: r.blockParams([t], [a && a.contextPath])
                })
            })
        }, t.exports = e["default"]
    }, function (t, e, n) {
        "use strict";
        e.__esModule = !0;
        var r = n(13);
        e["default"] = function (t) {
            t.registerDecorator("inline", function (t, e, n, a) {
                var i = t;
                return e.partials || (e.partials = {}, i = function (a, i) {
                    var o = n.partials;
                    n.partials = r.extend({}, o, e.partials);
                    var s = t(a, i);
                    return n.partials = o, s
                }), e.partials[a.args[0]] = a.fn, i
            })
        }, t.exports = e["default"]
    }])
}), !function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("handlebars")) : "function" == typeof define && define.amd ? define("sf_tagpopup", ["handlebars"], e) : "object" == typeof exports ? exports.tagpopup = e(require("handlebars")) : t.tagpopup = e(t.handlebars)
}(this, function (t) {
    return function (t) {
        function e(r) {
            if (n[r])return n[r].exports;
            var a = n[r] = {exports: {}, id: r, loaded: !1};
            return t[r].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
        }

        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function (t, e, n) {
        t.exports = n(1)
    }, function (t, e, n) {
        var r = n(3);
        t.exports = r
    }, function (t, e) {
        function n(t) {
            var e, n;
            e = $.extend({
                element: null,
                event: "click",
                url: null,
                toggleClass: "active",
                loadText: "加载中",
                unActiveText: "加关注",
                activeText: "已关注",
                "do": "follow",
                successFn: function () {
                },
                failFn: function () {
                }
            }, t), n = t.element, r(n), n.on(e.event, function () {
                n.hasClass(e.toggleClass) ? n.trigger("unactive", function () {
                    n.text(e.unActiveText).removeClass(e.toggleClass).attr("disabled", "disabled"), $.post(e.url + "/" + e.element.data("id") + "/" + e["do"] + "/cancel", function (t) {
                        0 === t.status ? e.successFn.call(this, t) : (n.text(e.activeText), e.failFn.call(this, t)), n.removeAttr("disabled")
                    })
                }) : n.trigger("active", function () {
                    n.text(e.activeText).addClass(e.toggleClass).attr("disabled", "disabled"), $.post(e.url + "/" + e.element.data("id") + "/" + e["do"], function (t) {
                        0 === t.status ? e.successFn.call(this, t) : (n.text(e.unActiveText), e.failFn.call(this, t)), n.removeAttr("disabled")
                    })
                })
            })
        }

        function r(t) {
            t.data("toggle", "false"), t.data("toggle") && (t.on("active", function (e, n) {
                t.data("toggle", "true"), n.call(this)
            }), t.on("unactive", function (e, n) {
                t.data("toggle", "true"), n.call(this)
            }))
        }

        t.exports = n
    }, function (t, e, n) {
        function r(t, e, n) {
            t.popover({
                template: '<div class="popover tag-popup" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                content: "loading...",
                html: !0,
                placement: "top",
                trigger: "hover",
                container: "body",
                delay: {show: 1e3, hide: 1e3}
            }, n), t.one("show.bs.popover", function () {
                var n = $(this).data("bs.popover"), r = n.tip();
                r.on("mouseenter", function () {
                    var t = n.options.animation;
                    n.options.animation = !1, n.show.call(n), n.options.animation = t
                }), r.on("mouseleave", n.leave.bind(n)), new a($.extend({}, {
                    url: "/api/tag/" + $(this).data("id"),
                    template: '<p>{{excerpt}}</p> <div class="operation"> <a href="{{url}}">查看</a> <span class="text-muted">&middot;</span> <a href="{{editUrl}}">编辑</a> <span class="text-muted">&middot;</span> <a href="/feeds/tag/{{name}}">订阅</a> <div class="pull-right"> <span class="text-muted followers">{{followers}} 人</span> <button class="btn btn-default btn-xs tagfollow {{isFollowedClass}}" data-id="{{id}}">{{isFollowedBtn}}</button> </div> </div>',
                    locator: "data",
                    handleData: function (t) {
                        0 !== t.data.length && (t.data.excerpt || (t.data.excerpt = "目前还没有关于这个标签的解释"), t.data.isFollowed ? (t.data.isFollowedClass = "active", t.data.isFollowedBtn = "已关注") : (t.data.isFollowedClass = "", t.data.isFollowedBtn = "加关注"))
                    },
                    callback: function (t) {
                        n.options.content = t;
                        var e = n.options.animation;
                        n.options.animation = !1, n.show(), n.options.animation = e, $follow = r.find("button"), i({
                            element: $follow,
                            url: "/api/tag",
                            successFn: function (t) {
                                r.find(".followers").text(t.data + "人")
                            }
                        })
                    }
                }, e)), t.on("shown.bs.popover", function () {
                    var t = $(this).data("bs.popover").tip().find("button");
                    i({
                        element: t, url: "/api/tag", successFn: function (t) {
                            r.find(".followers").text(t.data + "人")
                        }
                    })
                })
            })
        }

        var a = n(4), i = n(2);
        $.fn.tagpopup = function (t, e) {
            r(this, t, e)
        }, t.exports = r
    }, function (t, e, n) {
        function r(t) {
            this.init(t), r.templates.push(this)
        }

        function a(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }

        function i(t) {
            return "[object String]" === Object.prototype.toString.call(t)
        }

        function o(t, e) {
            if (t) {
                if ($.isFunction(t))return t.call(this, e);
                if (!$.isArray(e) && i(t)) {
                    for (var n = t.split("."), r = e; n.length;) {
                        var a = n.shift();
                        if (!r[a])break;
                        r = r[a]
                    }
                    return r
                }
            }
            return e
        }

        var s = n(5)["default"], l = [];
        r.DEFAULT = {
            url: null,
            template: null,
            model: null,
            locator: null,
            handleData: null,
            callback: null
        }, r.prototype = {
            constructor: r, templateHelpers: null, templatePartials: null, init: function (t) {
                this._initAttrs(t), this.get("model") ? this._getLocalModel() : this._getRemoteModel()
            }, _initAttrs: function (t) {
                this.attrs = $.extend({}, r.DEFAULT, t)
            }, _getRemoteModel: function () {
                var t = this, e = this.get("url");
                $.ajax({
                    url: e, async: !0, dataType: "json", success: function (e) {
                        t._handleData(e)
                    }
                })
            }, _getLocalModel: function () {
                var t = this.get("model");
                this._handleData(t)
            }, _setModel: function (t) {
                var e = this.get("locator");
                this.set("model", o(e, t))
            }, _generate: function () {
                var t = this.get("template"), e = this.get("model");
                return this.compile(t, e)
            }, _handleData: function (t) {
                var e = this.get("callback"), n = this.get("handleData");
                n && n(t), this._setModel(t), e && e(this._generate())
            }, compile: function (t, e) {
                if (e.toJSON && (e = e.toJSON()), a(t))return t(e, {
                    helpers: this.templateHelpers,
                    partials: precompile(this.templatePartials)
                });
                var n, r, i = this.templateHelpers, o = this.templatePartials;
                if (i)for (n in i)i.hasOwnProperty(n) && s.registerHelper(n, i[n]);
                if (o)for (r in o)o.hasOwnProperty(r) && s.registerPartial(r, o[r]);
                var c = l[t];
                c || (c = l[t] = s.compile(t));
                var u = c(e);
                if (i)for (n in i)i.hasOwnProperty(n) && delete s.helpers[n];
                if (o)for (r in o)o.hasOwnProperty(r) && delete s.partials[r];
                return u
            }, destroy: function () {
                for (var t in this)this.hasOwnProperty(t) && delete this[t]
            }, get: function (t) {
                return this.attrs[t]
            }, set: function (t, e) {
                return this.attrs[t] = e
            }
        }, t.exports = r, r.templates = [], r.destroy = function () {
            for (var t = 0, e = r.templates.length; e > t; t++)r.templates[t].destroy()
        }
    }, function (e, n) {
        e.exports = t
    }])
}), requirejs(["main", "sf_tagpopup"], function (t) {
    "use strict";
    $(".tagPopup .tag").tagpopup(), $(".userstab a[data-tab]").click(function () {
        var t;
        return $(".userstab a").removeClass("active"), $(this).toggleClass("active"), t = $(this).data("tab"), $("#usersDaily, #usersWeekly").addClass("hidden"), $("#users" + t).removeClass("hidden")
    }), t.userId && !$("#interestTab").hasClass("active") && $.get("/api/tag/following", function (t) {
        var e;
        e = [], t.data.rows.forEach(function (t) {
            e.push(parseInt(t.id))
        }), $(".stream-list__item").each(function () {
            var t, n;
            n = [], t = $(this), $(this).find(".tag").each(function () {
                n.push($(this).data("id"))
            }), n.forEach(function (n) {
                -1 !== e.indexOf(n) && t.addClass("highlight")
            })
        })
    })
}), define("qa_index", function () {
});