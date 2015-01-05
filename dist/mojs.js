(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Bit, h;

h = require('./h');

Bit = (function() {
  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

  Bit.prototype.type = 'line';

  Bit.prototype.defaults = {
    radius: 50,
    radiusX: null,
    radiusY: null,
    strokeWidth: 2,
    stroke: 'hotpink',
    fill: 'transparent',
    strokeDasharray: '',
    strokeDashoffset: '',
    x: 0,
    y: 0,
    deg: 0
  };

  function Bit(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.render();
  }

  Bit.prototype.vars = function() {
    var key, rotate, value, _ref;
    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
      this.ctx = this.o.ctx;
    } else {
      throw Error('You should pass a real context(ctx) to the bit');
    }
    if (this.props == null) {
      this.props = {};
    }
    _ref = this.defaults;
    for (key in _ref) {
      value = _ref[key];
      this.props[key] = this.o[key] || value;
    }
    rotate = "rotate(" + this.props.deg + ", " + this.props.x + ", " + this.props.y + ")";
    return this.props.transform = "" + rotate;
  };

  Bit.prototype.setAttr = function(attr, value) {
    var key, keySnake, val, _results;
    if (typeof attr === 'object') {
      _results = [];
      for (key in attr) {
        val = attr[key];
        keySnake = key.split(/(?=[A-Z])/).join('-').toLowerCase();
        if (h.stylePropsMap[key]) {
          _results.push((value || this.el).style[keySnake] = val);
        } else {
          _results.push((value || this.el).setAttribute(keySnake, val));
        }
      }
      return _results;
    } else {
      return this.el.setAttribute(attr, value);
    }
  };

  Bit.prototype.render = function() {
    this.isRendered = true;
    this.el = document.createElementNS(this.ns, this.type || 'line');
    !this.o.isDrawLess && this.draw();
    return this.ctx.appendChild(this.el);
  };

  Bit.prototype.draw = function() {
    return this.setAttr({
      stroke: this.props.stroke,
      strokeWidth: this.props.strokeWidth,
      strokeDasharray: this.props.strokeDasharray,
      strokeDashoffset: this.props.strokeDashoffset,
      fill: this.props.fill,
      transform: this.props.transform
    });
  };

  return Bit;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Bit", [], function() {
    return Bit;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Bit;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Bit = Bit;
}



},{"./h":4}],2:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Circle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Circle = (function(_super) {
  __extends(Circle, _super);

  function Circle() {
    return Circle.__super__.constructor.apply(this, arguments);
  }

  Circle.prototype.type = 'ellipse';

  Circle.prototype.draw = function() {
    Circle.__super__.draw.apply(this, arguments);
    return this.setAttr({
      rx: this.props.radiusX || this.props.radius,
      ry: this.props.radiusY || this.props.radius,
      cx: this.props.x,
      cy: this.props.y
    });
  };

  return Circle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Circle", [], function() {
    return Circle;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Circle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Circle = Circle;
}



},{"./bit":1}],3:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Cross,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Cross = (function(_super) {
  __extends(Cross, _super);

  function Cross() {
    return Cross.__super__.constructor.apply(this, arguments);
  }

  Cross.prototype.type = 'path';

  Cross.prototype.draw = function() {
    var d, line1, line2, x1, x2, y1, y2;
    Cross.__super__.draw.apply(this, arguments);
    x1 = this.props.x - this.props.radius;
    x2 = this.props.x + this.props.radius;
    line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
    y1 = this.props.y - this.props.radius;
    y2 = this.props.y + this.props.radius;
    line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
    d = "" + line1 + " " + line2;
    return this.setAttr({
      d: d
    });
  };

  return Cross;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Cross", [], function() {
    return Cross;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Cross;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Cross = Cross;
}



},{"./bit":1}],4:[function(require,module,exports){
var Helpers;

Helpers = (function() {
  function Helpers() {}

  Helpers.prototype.getRadialPoint = function(o) {
    var point, radAngle;
    if (o == null) {
      o = {};
    }
    if ((o.radius == null) || (o.angle == null) || (o.center == null)) {
      return;
    }
    radAngle = (o.angle - 90) * (Math.PI / 180);
    return point = {
      x: o.center.x + (Math.cos(radAngle) * o.radius),
      y: o.center.y + (Math.sin(radAngle) * o.radius)
    };
  };

  Helpers.prototype.stylePropsMap = {
    fill: 1,
    fillOpacity: 1,
    opacity: 1,
    stroke: 1,
    strokeWidth: 1,
    strokeDasharray: 1,
    strokeOffset: 1,
    strokeLinejoin: 1,
    strokeLinecap: 1
  };

  return Helpers;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Helpers", [], function() {
    return new Helpers;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = new Helpers;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.helpers = new Helpers;
}



},{}],5:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Line,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Line = (function(_super) {
  __extends(Line, _super);

  function Line() {
    return Line.__super__.constructor.apply(this, arguments);
  }

  Line.prototype.draw = function() {
    Line.__super__.draw.apply(this, arguments);
    return this.setAttr({
      x1: this.props.x - this.props.radius,
      x2: this.props.x + this.props.radius,
      y1: this.props.y,
      y2: this.props.y
    });
  };

  return Line;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Line", [], function() {
    return Line;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Line;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Line = Line;
}



},{"./bit":1}],6:[function(require,module,exports){
var Bit, Circle, Cross, Line, Rect, Triangle, rect, svg;

Cross = require('./cross');

Circle = require('./circle');

Triangle = require('./triangle');

Rect = require('./rect');

Line = require('./line');

Bit = require('./bit');

svg = document.getElementById('js-svg');

rect = new Rect({
  ctx: svg,
  x: 100,
  y: 100,
  deg: 45
});



},{"./bit":1,"./circle":2,"./cross":3,"./line":5,"./rect":7,"./triangle":8}],7:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Rect,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

Rect = (function(_super) {
  __extends(Rect, _super);

  function Rect() {
    return Rect.__super__.constructor.apply(this, arguments);
  }

  Rect.prototype.type = 'rect';

  Rect.prototype.draw = function() {
    var rad2;
    console.time('draw');
    Rect.__super__.draw.apply(this, arguments);
    rad2 = 2 * this.props.radius;
    this.setAttr({
      width: rad2,
      height: rad2,
      x: this.props.x - this.props.radius,
      y: this.props.y - this.props.radius
    });
    return console.timeEnd('draw');
  };

  return Rect;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Rect", [], function() {
    return Rect;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Rect;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Rect = Rect;
}



},{"./bit":1}],8:[function(require,module,exports){

/* istanbul ignore next */
var Bit, Triangle, h,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Bit = require('./bit');

h = require('./h');

Triangle = (function(_super) {
  __extends(Triangle, _super);

  function Triangle() {
    return Triangle.__super__.constructor.apply(this, arguments);
  }

  Triangle.prototype.type = 'path';

  Triangle.prototype.draw = function() {
    var cnt, d, i, len, nextI, point, points, space, step, _i, _j, _len;
    cnt = 3;
    step = 360 / cnt;
    points = [];
    for (i = _i = 0; 0 <= cnt ? _i < cnt : _i > cnt; i = 0 <= cnt ? ++_i : --_i) {
      points.push(h.getRadialPoint({
        radius: this.props.radius,
        angle: i * step,
        center: {
          x: this.props.x,
          y: this.props.y
        }
      }));
    }
    d = '';
    len = points.length - 1;
    for (i = _j = 0, _len = points.length; _j < _len; i = ++_j) {
      point = points[i];
      nextI = i < len ? i + 1 : 0;
      space = i === 0 ? '' : ' ';
      d += "" + space + "M" + points[i].x + ", " + points[i].y + " L" + points[nextI].x + ", " + points[nextI].y;
    }
    this.setAttr({
      d: d
    });
    return Triangle.__super__.draw.apply(this, arguments);
  };

  return Triangle;

})(Bit);


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Triangle", [], function() {
    return Triangle;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Triangle;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Triangle = Triangle;
}



},{"./bit":1,"./h":4}]},{},[6])