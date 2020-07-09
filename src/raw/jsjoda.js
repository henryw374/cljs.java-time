goog.provide('raw.jsjoda');
/*
 (c) 2016, Philipp Th?rw?chter & Pattrick H?per
 @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
 MathUtillicense BSD-3-Clause (see LICENSE in the root directory of this source tree)
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++], } : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.arrayFromIterator = function(a) {
  for (var b, c = []; !(b = a.next()).done;) {
    c.push(b.value);
  }
  return c;
};
$jscomp.arrayFromIterable = function(a) {
  return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a));
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
  var b = function() {
  };
  b.prototype = a;
  return new b;
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) {
    return a[b];
  }
  c = a[c];
  return void 0 !== c ? c : a[b];
};
$jscomp.polyfill = function(a, b, c, d) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d));
};
$jscomp.polyfillUnisolated = function(a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    e in c || (c[e] = {});
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
$jscomp.polyfillIsolated = function(a, b, c, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < e.length - 1; f++) {
    var g = e[f];
    g in d || (d[g] = {});
    d = d[g];
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {configurable:!0, writable:!0, value:b}) : b !== c && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(d, e, {configurable:!0, writable:!0, value:b})));
};
$jscomp.underscoreProtoCanBeSet = function() {
  var a = {a:!0}, b = {};
  try {
    return b.__proto__ = a, b.a;
  } catch (c) {
  }
  return !1;
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
  a.__proto__ = b;
  if (a.__proto__ !== b) {
    throw new TypeError(a + " is not extensible");
  }
  return a;
} : null;
$jscomp.inherits = function(a, b) {
  a.prototype = $jscomp.objectCreate(b.prototype);
  a.prototype.constructor = a;
  if ($jscomp.setPrototypeOf) {
    var c = $jscomp.setPrototypeOf;
    c(a, b);
  } else {
    for (c in b) {
      if ("prototype" != c) {
        if (Object.defineProperties) {
          var d = Object.getOwnPropertyDescriptor(b, c);
          d && Object.defineProperty(a, c, d);
        } else {
          a[c] = b[c];
        }
      }
    }
  }
  a.superClass_ = b.prototype;
};
$jscomp.checkStringArgs = function(a, b, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.polyfill("String.prototype.startsWith", function(a) {
  return a ? a : function(a, c) {
    var b = $jscomp.checkStringArgs(this, a, "startsWith");
    a += "";
    var e = b.length, f = a.length;
    c = Math.max(0, Math.min(c | 0, b.length));
    for (var g = 0; g < f && c < e;) {
      if (b[c++] != a[g++]) {
        return !1;
      }
    }
    return g >= f;
  };
}, "es6", "es3");
function createErrorType(a, b, c) {
  function d(a) {
    Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = Error().stack;
    this.message = a;
    b && b.apply(this, arguments);
    this.toString = function() {
      return this.name + ": " + this.message;
    };
  }
  c = void 0 === c ? Error : c;
  d.prototype = Object.create(c.prototype);
  d.prototype.name = a;
  return d.prototype.constructor = d;
}
function DateTimeException() {
}
function DateTimeParseException() {
}
function UnsupportedTemporalTypeException() {
}
function ArithmeticException() {
}
function IllegalArgumentException() {
}
function IllegalStateException() {
}
function NullPointerException() {
}
function messageWithCause(a, b) {
  b = void 0 === b ? null : b;
  a = a || this.name;
  null !== b && b instanceof Error && (a += "\n-------\nCaused by: " + b.stack + "\n-------\n");
  this.message = a;
}
function messageForDateTimeParseException(a, b, c, d) {
  b = void 0 === b ? "" : b;
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? null : d;
  a = a || this.name;
  a += ": " + b + ", at index: " + c;
  null !== d && d instanceof Error && (a += "\n-------\nCaused by: " + d.stack + "\n-------\n");
  this.message = a;
  this.parsedString = function() {
    return b;
  };
  this.errorIndex = function() {
    return c;
  };
}
var Enum = function(a) {
  this._name = a;
};
Enum.prototype.equals = function(a) {
  return this === a;
};
Enum.prototype.toString = function() {
  return this._name;
};
Enum.prototype.toJSON = function() {
  return this.toString();
};
var TemporalAccessor = function() {
};
TemporalAccessor.prototype.query = function(a) {
  return a === TemporalQueries.zoneId() || a === TemporalQueries.chronology() || a === TemporalQueries.precision() ? null : a.queryFrom(this);
};
TemporalAccessor.prototype.get = function(a) {
  return this.range(a).checkValidIntValue(this.getLong(a), a);
};
TemporalAccessor.prototype.range = function(a) {
  if (a instanceof ChronoField) {
    if (this.isSupported(a)) {
      return a.range();
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.rangeRefinedBy(this);
};
var Temporal = function() {
};
$jscomp.inherits(Temporal, TemporalAccessor);
Temporal.prototype.isSupported = function(a) {
  abstractMethodFail("isSupported");
};
Temporal.prototype.minus = function(a, b) {
  return 2 > arguments.length ? this.minusAmount(a) : this.minusAmountUnit(a, b);
};
Temporal.prototype.minusAmount = function(a) {
  abstractMethodFail("minusAmount");
};
Temporal.prototype.minusAmountUnit = function(a, b) {
  abstractMethodFail("minusAmountUnit");
};
Temporal.prototype.plus = function(a, b) {
  return 2 > arguments.length ? this.plusAmount(a) : this.plusAmountUnit(a, b);
};
Temporal.prototype.plusAmount = function(a) {
  abstractMethodFail("plusAmount");
};
Temporal.prototype.plusAmountUnit = function(a, b) {
  abstractMethodFail("plusAmountUnit");
};
Temporal.prototype.until = function(a, b) {
  abstractMethodFail("until");
};
Temporal.prototype.with = function(a, b) {
  return 2 > arguments.length ? this.withAdjuster(a) : this.withFieldValue(a, b);
};
Temporal.prototype.withAdjuster = function(a) {
  abstractMethodFail("withAdjuster");
};
Temporal.prototype.withFieldValue = function(a, b) {
  abstractMethodFail("withFieldValue");
};
var TemporalAdjuster = function() {
};
TemporalAdjuster.prototype.adjustInto = function(a) {
  abstractMethodFail("adjustInto");
};
var DefaultInterfaceTemporal = function() {
  Temporal.apply(this, arguments);
};
$jscomp.inherits(DefaultInterfaceTemporal, Temporal);
DefaultInterfaceTemporal.prototype.withAdjuster = function(a) {
  requireNonNull(a, "adjuster");
  requireInstance(a, TemporalAdjuster, "adjuster");
  return a.adjustInto(this);
};
DefaultInterfaceTemporal.prototype.plusAmount = function(a) {
  requireNonNull(a, "amount");
  requireInstance(a, TemporalAmount, "amount");
  return a.addTo(this);
};
DefaultInterfaceTemporal.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  requireInstance(a, TemporalAmount, "amount");
  return a.subtractFrom(this);
};
DefaultInterfaceTemporal.prototype.minusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToSubtract");
  requireNonNull(b, "unit");
  requireInstance(b, TemporalUnit, "unit");
  return a === MIN_SAFE_INTEGER ? this.plusAmountUnit(MAX_SAFE_INTEGER, b).plusAmountUnit(1, b) : this.plusAmount(-a, b);
};
var TemporalAdjusters = function() {
};
TemporalAdjusters.firstDayOfMonth = function() {
  return Impl.FIRST_DAY_OF_MONTH;
};
TemporalAdjusters.lastDayOfMonth = function() {
  return Impl.LAST_DAY_OF_MONTH;
};
TemporalAdjusters.firstDayOfNextMonth = function() {
  return Impl.FIRST_DAY_OF_NEXT_MONTH;
};
TemporalAdjusters.firstDayOfYear = function() {
  return Impl.FIRST_DAY_OF_YEAR;
};
TemporalAdjusters.lastDayOfYear = function() {
  return Impl.LAST_DAY_OF_YEAR;
};
TemporalAdjusters.firstDayOfNextYear = function() {
  return Impl.FIRST_DAY_OF_NEXT_YEAR;
};
TemporalAdjusters.firstInMonth = function(a) {
  requireNonNull(a, "dayOfWeek");
  return new DayOfWeekInMonth(1, a);
};
TemporalAdjusters.lastInMonth = function(a) {
  requireNonNull(a, "dayOfWeek");
  return new DayOfWeekInMonth(-1, a);
};
TemporalAdjusters.dayOfWeekInMonth = function(a, b) {
  requireNonNull(b, "dayOfWeek");
  return new DayOfWeekInMonth(a, b);
};
TemporalAdjusters.next = function(a) {
  return new RelativeDayOfWeek(2, a);
};
TemporalAdjusters.nextOrSame = function(a) {
  return new RelativeDayOfWeek(0, a);
};
TemporalAdjusters.previous = function(a) {
  return new RelativeDayOfWeek(3, a);
};
TemporalAdjusters.previousOrSame = function(a) {
  return new RelativeDayOfWeek(1, a);
};
var Impl = function(a) {
  TemporalAdjuster.call(this);
  this._ordinal = a;
};
$jscomp.inherits(Impl, TemporalAdjuster);
Impl.prototype.adjustInto = function(a) {
  switch(this._ordinal) {
    case 0:
      return a.with(ChronoField.DAY_OF_MONTH, 1);
    case 1:
      return a.with(ChronoField.DAY_OF_MONTH, a.range(ChronoField.DAY_OF_MONTH).maximum());
    case 2:
      return a.with(ChronoField.DAY_OF_MONTH, 1).plus(1, ChronoUnit.MONTHS);
    case 3:
      return a.with(ChronoField.DAY_OF_YEAR, 1);
    case 4:
      return a.with(ChronoField.DAY_OF_YEAR, a.range(ChronoField.DAY_OF_YEAR).maximum());
    case 5:
      return a.with(ChronoField.DAY_OF_YEAR, 1).plus(1, ChronoUnit.YEARS);
  }
  throw new IllegalStateException("Unreachable");
};
Impl.FIRST_DAY_OF_MONTH = new Impl(0);
Impl.LAST_DAY_OF_MONTH = new Impl(1);
Impl.FIRST_DAY_OF_NEXT_MONTH = new Impl(2);
Impl.FIRST_DAY_OF_YEAR = new Impl(3);
Impl.LAST_DAY_OF_YEAR = new Impl(4);
Impl.FIRST_DAY_OF_NEXT_YEAR = new Impl(5);
var DayOfWeekInMonth = function(a, b) {
  TemporalAdjuster.call(this);
  this._ordinal = a;
  this._dowValue = b.value();
};
$jscomp.inherits(DayOfWeekInMonth, TemporalAdjuster);
DayOfWeekInMonth.prototype.adjustInto = function(a) {
  if (0 <= this._ordinal) {
    a = a.with(ChronoField.DAY_OF_MONTH, 1);
    var b = a.get(ChronoField.DAY_OF_WEEK);
    b = MathUtil.intMod(this._dowValue - b + 7, 7);
    b += 7 * (this._ordinal - 1);
    return a.plus(b, ChronoUnit.DAYS);
  }
  a = a.with(ChronoField.DAY_OF_MONTH, a.range(ChronoField.DAY_OF_MONTH).maximum());
  b = a.get(ChronoField.DAY_OF_WEEK);
  b = this._dowValue - b;
  b = (0 === b ? 0 : 0 < b ? b - 7 : b) - 7 * (-this._ordinal - 1);
  return a.plus(b, ChronoUnit.DAYS);
};
var RelativeDayOfWeek = function(a, b) {
  TemporalAdjuster.call(this);
  requireNonNull(b, "dayOfWeek");
  this._relative = a;
  this._dowValue = b.value();
};
$jscomp.inherits(RelativeDayOfWeek, TemporalAdjuster);
RelativeDayOfWeek.prototype.adjustInto = function(a) {
  var b = a.get(ChronoField.DAY_OF_WEEK);
  if (2 > this._relative && b === this._dowValue) {
    return a;
  }
  if (0 === (this._relative & 1)) {
    return b -= this._dowValue, a.plus(0 <= b ? 7 - b : -b, ChronoUnit.DAYS);
  }
  b = this._dowValue - b;
  return a.minus(0 <= b ? 7 - b : -b, ChronoUnit.DAYS);
};
var TemporalAmount = function() {
};
TemporalAmount.prototype.get = function(a) {
  abstractMethodFail("get");
};
TemporalAmount.prototype.units = function() {
  abstractMethodFail("units");
};
TemporalAmount.prototype.addTo = function(a) {
  abstractMethodFail("addTo");
};
TemporalAmount.prototype.subtractFrom = function(a) {
  abstractMethodFail("subtractFrom");
};
var TemporalField = function() {
}, TemporalQueries = function() {
};
TemporalQueries.zoneId = function() {
  return TemporalQueries.ZONE_ID;
};
TemporalQueries.chronology = function() {
  return TemporalQueries.CHRONO;
};
TemporalQueries.precision = function() {
  return TemporalQueries.PRECISION;
};
TemporalQueries.zone = function() {
  return TemporalQueries.ZONE;
};
TemporalQueries.offset = function() {
  return TemporalQueries.OFFSET;
};
TemporalQueries.localDate = function() {
  return TemporalQueries.LOCAL_DATE;
};
TemporalQueries.localTime = function() {
  return TemporalQueries.LOCAL_TIME;
};
$jscomp.global.Object.defineProperties(TemporalQueries, {ZONE_ID:{configurable:!0, enumerable:!0, get:function() {
  delete TemporalQueries.ZONE_ID;
  TemporalQueries.ZONE_ID = createTemporalQuery("ZONE_ID", function(a) {
    return a.query(TemporalQueries.ZONE_ID);
  });
  return TemporalQueries.ZONE_ID;
}}, CHRONO:{configurable:!0, enumerable:!0, get:function() {
  delete TemporalQueries.CHRONO;
  TemporalQueries.CHRONO = createTemporalQuery("CHRONO", function(a) {
    return a.query(TemporalQueries.CHRONO);
  });
  return TemporalQueries.CHRONO;
}}, PRECISION:{configurable:!0, enumerable:!0, get:function() {
  delete TemporalQueries.PRECISION;
  TemporalQueries.PRECISION = createTemporalQuery("PRECISION", function(a) {
    return a.query(TemporalQueries.PRECISION);
  });
  return TemporalQueries.PRECISION;
}}, OFFSET:{configurable:!0, enumerable:!0, get:function() {
  delete TemporalQueries.OFFSET;
  TemporalQueries.OFFSET = createTemporalQuery("OFFSET", function(a) {
    return a.isSupported(ChronoField.OFFSET_SECONDS) ? ZoneOffset.ofTotalSeconds(a.get(ChronoField.OFFSET_SECONDS)) : null;
  });
  return TemporalQueries.OFFSET;
}}, ZONE:{configurable:!0, enumerable:!0, get:function() {
  delete TemporalQueries.ZONE;
  TemporalQueries.ZONE = createTemporalQuery("ZONE", function(a) {
    var b = a.query(TemporalQueries.ZONE_ID);
    return null != b ? b : a.query(TemporalQueries.OFFSET);
  });
  return TemporalQueries.ZONE;
}}, LOCAL_DATE:{configurable:!0, enumerable:!0, get:function() {
  delete TemporalQueries.LOCAL_DATE;
  TemporalQueries.LOCAL_DATE = createTemporalQuery("LOCAL_DATE", function(a) {
    return a.isSupported(ChronoField.EPOCH_DAY) ? LocalDate.ofEpochDay(a.getLong(ChronoField.EPOCH_DAY)) : null;
  });
  return TemporalQueries.LOCAL_DATE;
}}, LOCAL_TIME:{configurable:!0, enumerable:!0, get:function() {
  delete TemporalQueries.LOCAL_TIME;
  TemporalQueries.LOCAL_TIME = createTemporalQuery("LOCAL_TIME", function(a) {
    return a.isSupported(ChronoField.NANO_OF_DAY) ? LocalTime.ofNanoOfDay(a.getLong(ChronoField.NANO_OF_DAY)) : null;
  });
  return TemporalQueries.LOCAL_TIME;
}}});
var TemporalQuery = function() {
};
$jscomp.inherits(TemporalQuery, Enum);
TemporalQuery.prototype.queryFrom = function(a) {
  abstractMethodFail("queryFrom");
};
function createTemporalQuery(a, b) {
  var c = function() {
    TemporalQuery.apply(this, arguments);
  };
  $jscomp.inherits(c, TemporalQuery);
  c.prototype.queryFrom = b;
  return new c(a);
}
var TemporalUnit = function() {
};
TemporalUnit.prototype.duration = function() {
  abstractMethodFail("duration");
};
TemporalUnit.prototype.isDurationEstimated = function() {
  abstractMethodFail("isDurationEstimated");
};
TemporalUnit.prototype.isDateBased = function() {
  abstractMethodFail("isDateBased");
};
TemporalUnit.prototype.isTimeBased = function() {
  abstractMethodFail("isTimeBased");
};
TemporalUnit.prototype.isSupportedBy = function(a) {
  abstractMethodFail("isSupportedBy");
};
TemporalUnit.prototype.addTo = function(a, b) {
  abstractMethodFail("addTo");
};
TemporalUnit.prototype.between = function(a, b) {
  abstractMethodFail("between");
};
var ChronoLocalDate = function() {
  DefaultInterfaceTemporal.apply(this, arguments);
};
$jscomp.inherits(ChronoLocalDate, DefaultInterfaceTemporal);
ChronoLocalDate.prototype.isSupported = function(a) {
  return a instanceof ChronoField || a instanceof ChronoUnit ? a.isDateBased() : null != a && a.isSupportedBy(this);
};
ChronoLocalDate.prototype.query = function(a) {
  return a === TemporalQueries.chronology() ? this.chronology() : a === TemporalQueries.precision() ? ChronoUnit.DAYS : a === TemporalQueries.localDate() ? LocalDate.ofEpochDay(this.toEpochDay()) : a === TemporalQueries.localTime() || a === TemporalQueries.zone() || 
  a === TemporalQueries.zoneId() || a === TemporalQueries.offset() ? null : DefaultInterfaceTemporal.prototype.query.call(this, a);
};
ChronoLocalDate.prototype.adjustInto = function(a) {
  return a.with(ChronoField.EPOCH_DAY, this.toEpochDay());
};
ChronoLocalDate.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  requireInstance(a, DateTimeFormatter, "formatter");
  return a.format(this);
};
var ChronoLocalDateTime = function() {
  DefaultInterfaceTemporal.apply(this, arguments);
};
$jscomp.inherits(ChronoLocalDateTime, DefaultInterfaceTemporal);
ChronoLocalDateTime.prototype.chronology = function() {
  return this.toLocalDate().chronology();
};
ChronoLocalDateTime.prototype.query = function(a) {
  return a === TemporalQueries.chronology() ? this.chronology() : a === TemporalQueries.precision() ? ChronoUnit.NANOS : a === TemporalQueries.localDate() ? LocalDate.ofEpochDay(this.toLocalDate().toEpochDay()) : a === TemporalQueries.localTime() ? this.toLocalTime() : a === TemporalQueries.zone() || 
  a === TemporalQueries.zoneId() || a === TemporalQueries.offset() ? null : DefaultInterfaceTemporal.prototype.query.call(this, a);
};
ChronoLocalDateTime.prototype.adjustInto = function(a) {
  return a.with(ChronoField.EPOCH_DAY, this.toLocalDate().toEpochDay()).with(ChronoField.NANO_OF_DAY, this.toLocalTime().toNanoOfDay());
};
ChronoLocalDateTime.prototype.toInstant = function(a) {
  requireInstance(a, ZoneOffset, "zoneId");
  return Instant.ofEpochSecond(this.toEpochSecond(a), this.toLocalTime().nano());
};
ChronoLocalDateTime.prototype.toEpochSecond = function(a) {
  requireNonNull(a, "offset");
  var b = 86400 * this.toLocalDate().toEpochDay() + this.toLocalTime().toSecondOfDay();
  b -= a.totalSeconds();
  return MathUtil.safeToInt(b);
};
var ChronoZonedDateTime = function() {
  DefaultInterfaceTemporal.apply(this, arguments);
};
$jscomp.inherits(ChronoZonedDateTime, DefaultInterfaceTemporal);
ChronoZonedDateTime.prototype.query = function(a) {
  return a === TemporalQueries.zoneId() || a === TemporalQueries.zone() ? this.zone() : a === TemporalQueries.chronology() ? this.toLocalDate().chronology() : a === TemporalQueries.precision() ? ChronoUnit.NANOS : a === TemporalQueries.offset() ? this.offset() : a === TemporalQueries.localDate() ? 
  LocalDate.ofEpochDay(this.toLocalDate().toEpochDay()) : a === TemporalQueries.localTime() ? this.toLocalTime() : DefaultInterfaceTemporal.prototype.query.call(this, a);
};
ChronoZonedDateTime.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  return a.format(this);
};
ChronoZonedDateTime.prototype.toInstant = function() {
  return Instant.ofEpochSecond(this.toEpochSecond(), this.toLocalTime().nano());
};
ChronoZonedDateTime.prototype.toEpochSecond = function() {
  var a = 86400 * this.toLocalDate().toEpochDay() + this.toLocalTime().toSecondOfDay();
  return a -= this.offset().totalSeconds();
};
ChronoZonedDateTime.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  var b = MathUtil.compareNumbers(this.toEpochSecond(), a.toEpochSecond());
  0 === b && (b = this.toLocalTime().nano() - a.toLocalTime().nano(), 0 === b && (b = this.toLocalDateTime().compareTo(a.toLocalDateTime()), 0 === b && (b = strcmp(this.zone().id(), a.zone().id()))));
  return b;
};
ChronoZonedDateTime.prototype.isAfter = function(a) {
  requireNonNull(a, "other");
  var b = this.toEpochSecond(), c = a.toEpochSecond();
  return b > c || b === c && this.toLocalTime().nano() > a.toLocalTime().nano();
};
ChronoZonedDateTime.prototype.isBefore = function(a) {
  requireNonNull(a, "other");
  var b = this.toEpochSecond(), c = a.toEpochSecond();
  return b < c || b === c && this.toLocalTime().nano() < a.toLocalTime().nano();
};
ChronoZonedDateTime.prototype.isEqual = function(a) {
  requireNonNull(a, "other");
  return this.toEpochSecond() === a.toEpochSecond() && this.toLocalTime().nano() === a.toLocalTime().nano();
};
ChronoZonedDateTime.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof ChronoZonedDateTime ? 0 === this.compareTo(a) : !1;
};
function strcmp(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
var IsoChronology = function() {
  Enum.apply(this, arguments);
};
$jscomp.inherits(IsoChronology, Enum);
IsoChronology.isLeapYear = function(a) {
  return 0 === (a & 3) && (0 !== a % 100 || 0 === a % 400);
};
IsoChronology.prototype._updateResolveMap = function(a, b, c) {
  requireNonNull(a, "fieldValues");
  requireNonNull(b, "field");
  var d = a.get(b);
  if (null != d && d !== c) {
    throw new DateTimeException("Invalid state, field: " + b + " " + d + " conflicts with " + b + " " + c);
  }
  a.put(b, c);
};
IsoChronology.prototype.resolveDate = function(a, b) {
  if (a.containsKey(ChronoField.EPOCH_DAY)) {
    return LocalDate.ofEpochDay(a.remove(ChronoField.EPOCH_DAY));
  }
  var c = a.remove(ChronoField.PROLEPTIC_MONTH);
  null != c && (b !== ResolverStyle.LENIENT && ChronoField.PROLEPTIC_MONTH.checkValidValue(c), this._updateResolveMap(a, ChronoField.MONTH_OF_YEAR, MathUtil.floorMod(c, 12) + 1), this._updateResolveMap(a, ChronoField.YEAR, MathUtil.floorDiv(c, 12)));
  c = a.remove(ChronoField.YEAR_OF_ERA);
  if (null != c) {
    b !== ResolverStyle.LENIENT && ChronoField.YEAR_OF_ERA.checkValidValue(c);
    var d = a.remove(ChronoField.ERA);
    if (null == d) {
      d = a.get(ChronoField.YEAR), b === ResolverStyle.STRICT ? null != d ? this._updateResolveMap(a, ChronoField.YEAR, 0 < d ? c : MathUtil.safeSubtract(1, c)) : a.put(ChronoField.YEAR_OF_ERA, c) : this._updateResolveMap(a, ChronoField.YEAR, null == d || 0 < d ? c : MathUtil.safeSubtract(1, 
      c));
    } else {
      if (1 === d) {
        this._updateResolveMap(a, ChronoField.YEAR, c);
      } else {
        if (0 === d) {
          this._updateResolveMap(a, ChronoField.YEAR, MathUtil.safeSubtract(1, c));
        } else {
          throw new DateTimeException("Invalid value for era: " + d);
        }
      }
    }
  } else {
    a.containsKey(ChronoField.ERA) && ChronoField.ERA.checkValidValue(a.get(ChronoField.ERA));
  }
  if (a.containsKey(ChronoField.YEAR)) {
    if (a.containsKey(ChronoField.MONTH_OF_YEAR) && a.containsKey(ChronoField.DAY_OF_MONTH)) {
      c = ChronoField.YEAR.checkValidIntValue(a.remove(ChronoField.YEAR));
      d = a.remove(ChronoField.MONTH_OF_YEAR);
      a = a.remove(ChronoField.DAY_OF_MONTH);
      if (b === ResolverStyle.LENIENT) {
        return b = d - 1, --a, LocalDate.of(c, 1, 1).plusMonths(b).plusDays(a);
      }
      b === ResolverStyle.SMART && (ChronoField.DAY_OF_MONTH.checkValidValue(a), 4 === d || 6 === d || 9 === d || 11 === d ? a = Math.min(a, 30) : 2 === d && (a = Math.min(a, Month.FEBRUARY.length(Year.isLeap(c)))));
      return LocalDate.of(c, d, a);
    }
    if (a.containsKey(ChronoField.DAY_OF_YEAR)) {
      c = ChronoField.YEAR.checkValidIntValue(a.remove(ChronoField.YEAR));
      if (b === ResolverStyle.LENIENT) {
        return b = MathUtil.safeSubtract(a.remove(ChronoField.DAY_OF_YEAR), 1), LocalDate.ofYearDay(c, 1).plusDays(b);
      }
      b = ChronoField.DAY_OF_YEAR.checkValidIntValue(a.remove(ChronoField.DAY_OF_YEAR));
      return LocalDate.ofYearDay(c, b);
    }
    if (a.containsKey(ChronoField.ALIGNED_WEEK_OF_YEAR)) {
      if (a.containsKey(ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR)) {
        c = ChronoField.YEAR.checkValidIntValue(a.remove(ChronoField.YEAR));
        if (b === ResolverStyle.LENIENT) {
          return b = MathUtil.safeSubtract(a.remove(ChronoField.ALIGNED_WEEK_OF_YEAR), 1), a = MathUtil.safeSubtract(a.remove(ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR), 1), LocalDate.of(c, 1, 1).plusWeeks(b).plusDays(a);
        }
        d = ChronoField.ALIGNED_WEEK_OF_YEAR.checkValidIntValue(a.remove(ChronoField.ALIGNED_WEEK_OF_YEAR));
        a = ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR.checkValidIntValue(a.remove(ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR));
        a = LocalDate.of(c, 1, 1).plusDays(7 * (d - 1) + (a - 1));
        if (b === ResolverStyle.STRICT && a.get(ChronoField.YEAR) !== c) {
          throw new DateTimeException("Strict mode rejected date parsed to a different year");
        }
        return a;
      }
      if (a.containsKey(ChronoField.DAY_OF_WEEK)) {
        c = ChronoField.YEAR.checkValidIntValue(a.remove(ChronoField.YEAR));
        if (b === ResolverStyle.LENIENT) {
          return b = MathUtil.safeSubtract(a.remove(ChronoField.ALIGNED_WEEK_OF_YEAR), 1), a = MathUtil.safeSubtract(a.remove(ChronoField.DAY_OF_WEEK), 1), LocalDate.of(c, 1, 1).plusWeeks(b).plusDays(a);
        }
        d = ChronoField.ALIGNED_WEEK_OF_YEAR.checkValidIntValue(a.remove(ChronoField.ALIGNED_WEEK_OF_YEAR));
        a = ChronoField.DAY_OF_WEEK.checkValidIntValue(a.remove(ChronoField.DAY_OF_WEEK));
        a = LocalDate.of(c, 1, 1).plusWeeks(d - 1).with(TemporalAdjusters.nextOrSame(DayOfWeek.of(a)));
        if (b === ResolverStyle.STRICT && a.get(ChronoField.YEAR) !== c) {
          throw new DateTimeException("Strict mode rejected date parsed to a different month");
        }
        return a;
      }
    }
  }
  return null;
};
IsoChronology.prototype.date = function(a) {
  return LocalDate.from(a);
};
$jscomp.global.Object.defineProperties(IsoChronology, {INSTANCE:{configurable:!0, enumerable:!0, get:function() {
  return new IsoChronology("IsoChronology");
}}});
var ChronoField = function(a, b, c, d) {
  TemporalField.call(this);
  this._name = a;
  this._baseUnit = b;
  this._rangeUnit = c;
  this._range = d;
};
$jscomp.inherits(ChronoField, TemporalField);
ChronoField.byName = function(a) {
  for (var b in ChronoField) {
    if (ChronoField[b] && ChronoField[b] instanceof ChronoField && ChronoField[b].name() === a) {
      return ChronoField[b];
    }
  }
};
ChronoField.prototype.name = function() {
  return this._name;
};
ChronoField.prototype.baseUnit = function() {
  return this._baseUnit;
};
ChronoField.prototype.rangeUnit = function() {
  return this._rangeUnit;
};
ChronoField.prototype.range = function() {
  return this._range;
};
ChronoField.prototype.displayName = function() {
  return this.toString();
};
ChronoField.prototype.checkValidValue = function(a) {
  return this.range().checkValidValue(a, this.name());
};
ChronoField.prototype.isDateBased = function() {
  return this === ChronoField.DAY_OF_WEEK || this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH || this === ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR || this === ChronoField.DAY_OF_MONTH || this === ChronoField.DAY_OF_YEAR || this === ChronoField.EPOCH_DAY || this === ChronoField.ALIGNED_WEEK_OF_MONTH || 
  this === ChronoField.ALIGNED_WEEK_OF_YEAR || this === ChronoField.MONTH_OF_YEAR || this === ChronoField.YEAR_OF_ERA || this === ChronoField.YEAR || this === ChronoField.ERA;
};
ChronoField.prototype.isTimeBased = function() {
  return this === ChronoField.NANO_OF_SECOND || this === ChronoField.NANO_OF_DAY || this === ChronoField.MICRO_OF_SECOND || this === ChronoField.MICRO_OF_DAY || this === ChronoField.MILLI_OF_SECOND || this === ChronoField.MILLI_OF_DAY || this === ChronoField.SECOND_OF_MINUTE || 
  this === ChronoField.SECOND_OF_DAY || this === ChronoField.MINUTE_OF_HOUR || this === ChronoField.MINUTE_OF_DAY || this === ChronoField.HOUR_OF_AMPM || this === ChronoField.CLOCK_HOUR_OF_AMPM || this === ChronoField.HOUR_OF_DAY || this === ChronoField.CLOCK_HOUR_OF_DAY || 
  this === ChronoField.AMPM_OF_DAY;
};
ChronoField.prototype.rangeRefinedBy = function(a) {
  return a.range(this);
};
ChronoField.prototype.checkValidIntValue = function(a) {
  return this.range().checkValidIntValue(a, this);
};
ChronoField.prototype.getFrom = function(a) {
  return a.getLong(this);
};
ChronoField.prototype.toString = function() {
  return this.name();
};
ChronoField.prototype.equals = function(a) {
  return this === a;
};
$jscomp.global.Object.defineProperties(ChronoField, {NANO_OF_SECOND:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.NANO_OF_SECOND;
  ChronoField.NANO_OF_SECOND = new ChronoField("NanoOfSecond", ChronoUnit.NANOS, ChronoUnit.SECONDS, ValueRange.of(0, 999999999));
  return ChronoField.NANO_OF_SECOND;
}}, NANO_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.NANO_OF_DAY;
  ChronoField.NANO_OF_DAY = new ChronoField("NanoOfDay", ChronoUnit.NANOS, ChronoUnit.DAYS, ValueRange.of(0, 864E11 - 1));
  return ChronoField.NANO_OF_DAY;
}}, MICRO_OF_SECOND:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.MICRO_OF_SECOND;
  ChronoField.MICRO_OF_SECOND = new ChronoField("MicroOfSecond", ChronoUnit.MICROS, ChronoUnit.SECONDS, ValueRange.of(0, 999999));
  return ChronoField.MICRO_OF_SECOND;
}}, MICRO_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.MICRO_OF_DAY;
  ChronoField.MICRO_OF_DAY = new ChronoField("MicroOfDay", ChronoUnit.MICROS, ChronoUnit.DAYS, ValueRange.of(0, 864E8 - 1));
  return ChronoField.MICRO_OF_DAY;
}}, MILLI_OF_SECOND:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.MILLI_OF_SECOND;
  ChronoField.MILLI_OF_SECOND = new ChronoField("MilliOfSecond", ChronoUnit.MILLIS, ChronoUnit.SECONDS, ValueRange.of(0, 999));
  return ChronoField.MILLI_OF_SECOND;
}}, MILLI_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.MILLI_OF_DAY;
  ChronoField.MILLI_OF_DAY = new ChronoField("MilliOfDay", ChronoUnit.MILLIS, ChronoUnit.DAYS, ValueRange.of(0, 864E5 - 1));
  return ChronoField.MILLI_OF_DAY;
}}, SECOND_OF_MINUTE:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.SECOND_OF_MINUTE;
  ChronoField.SECOND_OF_MINUTE = new ChronoField("SecondOfMinute", ChronoUnit.SECONDS, ChronoUnit.MINUTES, ValueRange.of(0, 59));
  return ChronoField.SECOND_OF_MINUTE;
}}, SECOND_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.SECOND_OF_DAY;
  ChronoField.SECOND_OF_DAY = new ChronoField("SecondOfDay", ChronoUnit.SECONDS, ChronoUnit.DAYS, ValueRange.of(0, 86399));
  return ChronoField.SECOND_OF_DAY;
}}, MINUTE_OF_HOUR:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.MINUTE_OF_HOUR;
  ChronoField.MINUTE_OF_HOUR = new ChronoField("MinuteOfHour", ChronoUnit.MINUTES, ChronoUnit.HOURS, ValueRange.of(0, 59));
  return ChronoField.MINUTE_OF_HOUR;
}}, MINUTE_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.MINUTE_OF_DAY;
  ChronoField.MINUTE_OF_DAY = new ChronoField("MinuteOfDay", ChronoUnit.MINUTES, ChronoUnit.DAYS, ValueRange.of(0, 1439));
  return ChronoField.MINUTE_OF_DAY;
}}, HOUR_OF_AMPM:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.HOUR_OF_AMPM;
  ChronoField.HOUR_OF_AMPM = new ChronoField("HourOfAmPm", ChronoUnit.HOURS, ChronoUnit.HALF_DAYS, ValueRange.of(0, 11));
  return ChronoField.HOUR_OF_AMPM;
}}, CLOCK_HOUR_OF_AMPM:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.CLOCK_HOUR_OF_AMPM;
  ChronoField.CLOCK_HOUR_OF_AMPM = new ChronoField("ClockHourOfAmPm", ChronoUnit.HOURS, ChronoUnit.HALF_DAYS, ValueRange.of(1, 12));
  return ChronoField.CLOCK_HOUR_OF_AMPM;
}}, HOUR_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.HOUR_OF_DAY;
  ChronoField.HOUR_OF_DAY = new ChronoField("HourOfDay", ChronoUnit.HOURS, ChronoUnit.DAYS, ValueRange.of(0, 23));
  return ChronoField.HOUR_OF_DAY;
}}, CLOCK_HOUR_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.CLOCK_HOUR_OF_DAY;
  ChronoField.CLOCK_HOUR_OF_DAY = new ChronoField("ClockHourOfDay", ChronoUnit.HOURS, ChronoUnit.DAYS, ValueRange.of(1, 24));
  return ChronoField.CLOCK_HOUR_OF_DAY;
}}, AMPM_OF_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.AMPM_OF_DAY;
  ChronoField.AMPM_OF_DAY = new ChronoField("AmPmOfDay", ChronoUnit.HALF_DAYS, ChronoUnit.DAYS, ValueRange.of(0, 1));
  return ChronoField.AMPM_OF_DAY;
}}, DAY_OF_WEEK:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.DAY_OF_WEEK;
  ChronoField.DAY_OF_WEEK = new ChronoField("DayOfWeek", ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7));
  return ChronoField.DAY_OF_WEEK;
}}, ALIGNED_DAY_OF_WEEK_IN_MONTH:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH;
  ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH = new ChronoField("AlignedDayOfWeekInMonth", ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7));
  return ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH;
}}, ALIGNED_DAY_OF_WEEK_IN_YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR;
  ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR = new ChronoField("AlignedDayOfWeekInYear", ChronoUnit.DAYS, ChronoUnit.WEEKS, ValueRange.of(1, 7));
  return ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR;
}}, DAY_OF_MONTH:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.DAY_OF_MONTH;
  ChronoField.DAY_OF_MONTH = new ChronoField("DayOfMonth", ChronoUnit.DAYS, ChronoUnit.MONTHS, ValueRange.of(1, 28, 31), "day");
  return ChronoField.DAY_OF_MONTH;
}}, DAY_OF_YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.DAY_OF_YEAR;
  ChronoField.DAY_OF_YEAR = new ChronoField("DayOfYear", ChronoUnit.DAYS, ChronoUnit.YEARS, ValueRange.of(1, 365, 366));
  return ChronoField.DAY_OF_YEAR;
}}, EPOCH_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.EPOCH_DAY;
  ChronoField.EPOCH_DAY = new ChronoField("EpochDay", ChronoUnit.DAYS, ChronoUnit.FOREVER, ValueRange.of(Math.floor(365.25 * YearConstants.MIN_VALUE), Math.floor(365.25 * YearConstants.MAX_VALUE)));
  return ChronoField.EPOCH_DAY;
}}, ALIGNED_WEEK_OF_MONTH:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.ALIGNED_WEEK_OF_MONTH;
  ChronoField.ALIGNED_WEEK_OF_MONTH = new ChronoField("AlignedWeekOfMonth", ChronoUnit.WEEKS, ChronoUnit.MONTHS, ValueRange.of(1, 4, 5));
  return ChronoField.ALIGNED_WEEK_OF_MONTH;
}}, ALIGNED_WEEK_OF_YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.ALIGNED_WEEK_OF_YEAR;
  ChronoField.ALIGNED_WEEK_OF_YEAR = new ChronoField("AlignedWeekOfYear", ChronoUnit.WEEKS, ChronoUnit.YEARS, ValueRange.of(1, 53));
  return ChronoField.ALIGNED_WEEK_OF_YEAR;
}}, MONTH_OF_YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.MONTH_OF_YEAR;
  ChronoField.MONTH_OF_YEAR = new ChronoField("MonthOfYear", ChronoUnit.MONTHS, ChronoUnit.YEARS, ValueRange.of(1, 12), "month");
  return ChronoField.MONTH_OF_YEAR;
}}, PROLEPTIC_MONTH:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.PROLEPTIC_MONTH;
  ChronoField.PROLEPTIC_MONTH = new ChronoField("ProlepticMonth", ChronoUnit.MONTHS, ChronoUnit.FOREVER, ValueRange.of(12 * YearConstants.MIN_VALUE, 12 * YearConstants.MAX_VALUE + 11));
  return ChronoField.PROLEPTIC_MONTH;
}}, YEAR_OF_ERA:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.YEAR_OF_ERA;
  ChronoField.YEAR_OF_ERA = new ChronoField("YearOfEra", ChronoUnit.YEARS, ChronoUnit.FOREVER, ValueRange.of(1, YearConstants.MAX_VALUE, YearConstants.MAX_VALUE + 1));
  return ChronoField.YEAR_OF_ERA;
}}, YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.YEAR;
  ChronoField.YEAR = new ChronoField("Year", ChronoUnit.YEARS, ChronoUnit.FOREVER, ValueRange.of(YearConstants.MIN_VALUE, YearConstants.MAX_VALUE), "year");
  return ChronoField.YEAR;
}}, ERA:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.ERA;
  ChronoField.ERA = new ChronoField("Era", ChronoUnit.ERAS, ChronoUnit.FOREVER, ValueRange.of(0, 1));
  return ChronoField.ERA;
}}, INSTANT_SECONDS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.INSTANT_SECONDS;
  ChronoField.INSTANT_SECONDS = new ChronoField("InstantSeconds", ChronoUnit.SECONDS, ChronoUnit.FOREVER, ValueRange.of(MIN_SAFE_INTEGER, MAX_SAFE_INTEGER));
  return ChronoField.INSTANT_SECONDS;
}}, OFFSET_SECONDS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoField.OFFSET_SECONDS;
  ChronoField.OFFSET_SECONDS = new ChronoField("OffsetSeconds", ChronoUnit.SECONDS, ChronoUnit.FOREVER, ValueRange.of(-64800, 64800));
  return ChronoField.OFFSET_SECONDS;
}}});
var ChronoUnit = function(a, b) {
  TemporalUnit.call(this);
  this._name = a;
  this._duration = b;
};
$jscomp.inherits(ChronoUnit, TemporalUnit);
ChronoUnit.prototype.duration = function() {
  return this._duration;
};
ChronoUnit.prototype.isDurationEstimated = function() {
  return this.isDateBased() || this === ChronoUnit.FOREVER;
};
ChronoUnit.prototype.isDateBased = function() {
  return 0 <= this.compareTo(ChronoUnit.DAYS) && this !== ChronoUnit.FOREVER;
};
ChronoUnit.prototype.isTimeBased = function() {
  return 0 > this.compareTo(ChronoUnit.DAYS);
};
ChronoUnit.prototype.isSupportedBy = function(a) {
  if (this === ChronoUnit.FOREVER) {
    return !1;
  }
  try {
    return a.plus(1, this), !0;
  } catch (b) {
    try {
      return a.plus(-1, this), !0;
    } catch (c) {
      return !1;
    }
  }
};
ChronoUnit.prototype.addTo = function(a, b) {
  return a.plus(b, this);
};
ChronoUnit.prototype.between = function(a, b) {
  return a.until(b, this);
};
ChronoUnit.prototype.toString = function() {
  return this._name;
};
ChronoUnit.prototype.compareTo = function(a) {
  return this.duration().compareTo(a.duration());
};
$jscomp.global.Object.defineProperties(ChronoUnit, {NANOS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.NANOS;
  ChronoUnit.NANOS = new ChronoUnit("Nanos", Duration.ofNanos(1));
  return ChronoUnit.NANOS;
}}, MICROS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.MICROS;
  ChronoUnit.MICROS = new ChronoUnit("Micros", Duration.ofNanos(1000));
  return ChronoUnit.MICROS;
}}, MILLIS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.MILLIS;
  ChronoUnit.MILLIS = new ChronoUnit("Millis", Duration.ofNanos(1000000));
  return ChronoUnit.MILLIS;
}}, SECONDS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.SECONDS;
  ChronoUnit.SECONDS = new ChronoUnit("Seconds", Duration.ofSeconds(1));
  return ChronoUnit.SECONDS;
}}, MINUTES:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.MINUTES;
  ChronoUnit.MINUTES = new ChronoUnit("Minutes", Duration.ofSeconds(60));
  return ChronoUnit.MINUTES;
}}, HOURS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.HOURS;
  ChronoUnit.HOURS = new ChronoUnit("Hours", Duration.ofSeconds(3600));
  return ChronoUnit.HOURS;
}}, HALF_DAYS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.HALF_DAYS;
  ChronoUnit.HALF_DAYS = new ChronoUnit("HalfDays", Duration.ofSeconds(43200));
  return ChronoUnit.HALF_DAYS;
}}, DAYS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.DAYS;
  ChronoUnit.DAYS = new ChronoUnit("Days", Duration.ofSeconds(86400));
  return ChronoUnit.DAYS;
}}, WEEKS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.WEEKS;
  ChronoUnit.WEEKS = new ChronoUnit("Weeks", Duration.ofSeconds(604800));
  return ChronoUnit.WEEKS;
}}, MONTHS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.MONTHS;
  ChronoUnit.MONTHS = new ChronoUnit("Months", Duration.ofSeconds(2629746));
  return ChronoUnit.MONTHS;
}}, YEARS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.YEARS;
  ChronoUnit.YEARS = new ChronoUnit("Years", Duration.ofSeconds(31556952));
  return ChronoUnit.YEARS;
}}, DECADES:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.DECADES;
  ChronoUnit.DECADES = new ChronoUnit("Decades", Duration.ofSeconds(315569520));
  return ChronoUnit.DECADES;
}}, CENTURIES:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.CENTURIES;
  ChronoUnit.CENTURIES = new ChronoUnit("Centuries", Duration.ofSeconds(3155695200));
  return ChronoUnit.CENTURIES;
}}, MILLENNIA:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.MILLENNIA;
  ChronoUnit.MILLENNIA = new ChronoUnit("Millennia", Duration.ofSeconds(31556952E3));
  return ChronoUnit.MILLENNIA;
}}, ERAS:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.ERAS;
  ChronoUnit.ERAS = new ChronoUnit("Eras", Duration.ofSeconds(31556952 * (YearConstants.MAX_VALUE + 1)));
  return ChronoUnit.ERAS;
}}, FOREVER:{configurable:!0, enumerable:!0, get:function() {
  delete ChronoUnit.FOREVER;
  ChronoUnit.FOREVER = new ChronoUnit("Forever", Duration.ofSeconds(MathUtil.MAX_SAFE_INTEGER, 999999999));
  return ChronoUnit.FOREVER;
}}});
var Clock = function() {
};
Clock.systemUTC = function() {
  return new SystemClock(ZoneOffset.UTC);
};
Clock.systemDefaultZone = function() {
  return new SystemClock(ZoneId.systemDefault());
};
Clock.system = function(a) {
  return new SystemClock(a);
};
Clock.fixed = function(a, b) {
  return new FixedClock(a, b);
};
Clock.offset = function(a, b) {
  return new OffsetClock(a, b);
};
Clock.prototype.millis = function() {
  abstractMethodFail("Clock.millis");
};
Clock.prototype.instant = function() {
  abstractMethodFail("Clock.instant");
};
Clock.prototype.zone = function() {
  abstractMethodFail("Clock.zone");
};
Clock.prototype.withZone = function() {
  abstractMethodFail("Clock.withZone");
};
var SystemClock = function(a) {
  requireNonNull(a, "zone");
  Clock.call(this);
  this._zone = a;
};
$jscomp.inherits(SystemClock, Clock);
SystemClock.offset = Clock.offset;
SystemClock.fixed = Clock.fixed;
SystemClock.system = Clock.system;
SystemClock.systemDefaultZone = Clock.systemDefaultZone;
SystemClock.systemUTC = Clock.systemUTC;
SystemClock.prototype.zone = function() {
  return this._zone;
};
SystemClock.prototype.millis = function() {
  return (new Date).getTime();
};
SystemClock.prototype.instant = function() {
  return Instant.ofEpochMilli(this.millis());
};
SystemClock.prototype.equals = function(a) {
  return a instanceof SystemClock ? this._zone.equals(a._zone) : !1;
};
SystemClock.prototype.withZone = function(a) {
  return a.equals(this._zone) ? this : new SystemClock(a);
};
SystemClock.prototype.toString = function() {
  return "SystemClock[" + this._zone.toString() + "]";
};
var FixedClock = function(a, b) {
  Clock.call(this);
  this._instant = a;
  this._zoneId = b;
};
$jscomp.inherits(FixedClock, Clock);
FixedClock.offset = Clock.offset;
FixedClock.fixed = Clock.fixed;
FixedClock.system = Clock.system;
FixedClock.systemDefaultZone = Clock.systemDefaultZone;
FixedClock.systemUTC = Clock.systemUTC;
FixedClock.prototype.instant = function() {
  return this._instant;
};
FixedClock.prototype.millis = function() {
  return this._instant.toEpochMilli();
};
FixedClock.prototype.zone = function() {
  return this._zoneId;
};
FixedClock.prototype.toString = function() {
  return "FixedClock[]";
};
FixedClock.prototype.equals = function(a) {
  return a instanceof FixedClock ? this._instant.equals(a._instant) && this._zoneId.equals(a._zoneId) : !1;
};
FixedClock.prototype.withZone = function(a) {
  return a.equals(this._zoneId) ? this : new FixedClock(this._instant, a);
};
var OffsetClock = function(a, b) {
  Clock.call(this);
  this._baseClock = a;
  this._offset = b;
};
$jscomp.inherits(OffsetClock, Clock);
OffsetClock.offset = Clock.offset;
OffsetClock.fixed = Clock.fixed;
OffsetClock.system = Clock.system;
OffsetClock.systemDefaultZone = Clock.systemDefaultZone;
OffsetClock.systemUTC = Clock.systemUTC;
OffsetClock.prototype.zone = function() {
  return this._baseClock.zone();
};
OffsetClock.prototype.withZone = function(a) {
  return a.equals(this._baseClock.zone()) ? this : new OffsetClock(this._baseClock.withZone(a), this._offset);
};
OffsetClock.prototype.millis = function() {
  return this._baseClock.millis() + this._offset.toMillis();
};
OffsetClock.prototype.instant = function() {
  return this._baseClock.instant().plus(this._offset);
};
OffsetClock.prototype.equals = function(a) {
  return a instanceof OffsetClock ? this._baseClock.equals(a._baseClock) && this._offset.equals(a._offset) : !1;
};
OffsetClock.prototype.toString = function() {
  return "OffsetClock[" + this._baseClock + "," + this._offset + "]";
};
var DayOfWeek = function(a, b) {
  TemporalAccessor.call(this);
  this._ordinal = a;
  this._name = b;
};
$jscomp.inherits(DayOfWeek, TemporalAccessor);
DayOfWeek.prototype.ordinal = function() {
  return this._ordinal;
};
DayOfWeek.prototype.name = function() {
  return this._name;
};
DayOfWeek.values = function() {
  return ENUMS.slice();
};
DayOfWeek.valueOf = function(a) {
  var b = 0;
  for (b; b < ENUMS.length && ENUMS[b].name() !== a; b++) {
  }
  return DayOfWeek.of(b + 1);
};
DayOfWeek.of = function(a) {
  if (1 > a || 7 < a) {
    throw new DateTimeException("Invalid value for DayOfWeek: " + a);
  }
  return ENUMS[a - 1];
};
DayOfWeek.from = function(a) {
  assert(null != a, "temporal", NullPointerException);
  if (a instanceof DayOfWeek) {
    return a;
  }
  try {
    return DayOfWeek.of(a.get(ChronoField.DAY_OF_WEEK));
  } catch (b) {
    if (b instanceof DateTimeException) {
      throw new DateTimeException("Unable to obtain DayOfWeek from TemporalAccessor: " + a + ", type " + (null != a.constructor ? a.constructor.name : ""), b);
    }
    throw b;
  }
};
DayOfWeek.prototype.value = function() {
  return this._ordinal + 1;
};
DayOfWeek.prototype.getDisplayName = function(a, b) {
  throw new IllegalArgumentException("Pattern using (localized) text not implemented yet!");
};
DayOfWeek.prototype.isSupported = function(a) {
  return a instanceof ChronoField ? a === ChronoField.DAY_OF_WEEK : null != a && a.isSupportedBy(this);
};
DayOfWeek.prototype.range = function(a) {
  if (a === ChronoField.DAY_OF_WEEK) {
    return a.range();
  }
  if (a instanceof ChronoField) {
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.rangeRefinedBy(this);
};
DayOfWeek.prototype.get = function(a) {
  return a === ChronoField.DAY_OF_WEEK ? this.value() : this.range(a).checkValidIntValue(this.getLong(a), a);
};
DayOfWeek.prototype.getLong = function(a) {
  if (a === ChronoField.DAY_OF_WEEK) {
    return this.value();
  }
  if (a instanceof ChronoField) {
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
DayOfWeek.prototype.plus = function(a) {
  a = MathUtil.floorMod(a, 7);
  return ENUMS[MathUtil.floorMod(this._ordinal + (a + 7), 7)];
};
DayOfWeek.prototype.minus = function(a) {
  return this.plus(-1 * MathUtil.floorMod(a, 7));
};
DayOfWeek.prototype.query = function(a) {
  if (a === TemporalQueries.precision()) {
    return ChronoUnit.DAYS;
  }
  if (a === TemporalQueries.localDate() || a === TemporalQueries.localTime() || a === TemporalQueries.chronology() || a === TemporalQueries.zone() || a === TemporalQueries.zoneId() || a === TemporalQueries.offset()) {
    return null;
  }
  assert(null != a, "query", NullPointerException);
  return a.queryFrom(this);
};
DayOfWeek.prototype.adjustInto = function(a) {
  requireNonNull(a, "temporal");
  return a.with(ChronoField.DAY_OF_WEEK, this.value());
};
DayOfWeek.prototype.equals = function(a) {
  return this === a;
};
DayOfWeek.prototype.toString = function() {
  return this._name;
};
DayOfWeek.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, DayOfWeek, "other");
  return this._ordinal - a._ordinal;
};
DayOfWeek.prototype.toJSON = function() {
  return this.toString();
};
$jscomp.global.Object.defineProperties(DayOfWeek, {MONDAY:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.MONDAY;
  DayOfWeek.MONDAY = new DayOfWeek(0, "MONDAY");
  return DayOfWeek.MONDAY;
}}, TUESDAY:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.TUESDAY;
  DayOfWeek.TUESDAY = new DayOfWeek(1, "TUESDAY");
  return DayOfWeek.TUESDAY;
}}, WEDNESDAY:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.WEDNESDAY;
  DayOfWeek.WEDNESDAY = new DayOfWeek(2, "WEDNESDAY");
  return DayOfWeek.WEDNESDAY;
}}, THURSDAY:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.THURSDAY;
  DayOfWeek.THURSDAY = new DayOfWeek(3, "THURSDAY");
  return DayOfWeek.THURSDAY;
}}, FRIDAY:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.FRIDAY;
  DayOfWeek.FRIDAY = new DayOfWeek(4, "FRIDAY");
  return DayOfWeek.FRIDAY;
}}, SATURDAY:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.SATURDAY;
  DayOfWeek.SATURDAY = new DayOfWeek(5, "SATURDAY");
  return DayOfWeek.SATURDAY;
}}, SUNDAY:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.SUNDAY;
  DayOfWeek.SUNDAY = new DayOfWeek(6, "SUNDAY");
  return DayOfWeek.SUNDAY;
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.FROM;
  DayOfWeek.FROM = createTemporalQuery("DayOfWeek.FROM", function(a) {
    return DayOfWeek.from(a);
  });
  return DayOfWeek.FROM;
}}, ENUMS:{configurable:!0, enumerable:!0, get:function() {
  delete DayOfWeek.ENUMS;
  DayOfWeek.ENUMS = [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY];
  return DayOfWeek.ENUMS;
}}});
var Duration = function(a, b) {
  TemporalAmount.call(this);
  this._seconds = MathUtil.safeToInt(a);
  this._nanos = MathUtil.safeToInt(b);
};
$jscomp.inherits(Duration, TemporalAmount);
Duration.ofDays = function(a) {
  return Duration._create(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_DAY), 0);
};
Duration.ofHours = function(a) {
  return Duration._create(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_HOUR), 0);
};
Duration.ofMinutes = function(a) {
  return Duration._create(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_MINUTE), 0);
};
Duration.ofSeconds = function(a, b) {
  b = void 0 === b ? 0 : b;
  a = MathUtil.safeAdd(a, MathUtil.floorDiv(b, LocalTime.NANOS_PER_SECOND));
  b = MathUtil.floorMod(b, LocalTime.NANOS_PER_SECOND);
  return Duration._create(a, b);
};
Duration.ofMillis = function(a) {
  var b = MathUtil.intDiv(a, 1000);
  a = MathUtil.intMod(a, 1000);
  0 > a && (a += 1000, b--);
  return Duration._create(b, 1000000 * a);
};
Duration.ofNanos = function(a) {
  var b = MathUtil.intDiv(a, LocalTime.NANOS_PER_SECOND);
  a = MathUtil.intMod(a, LocalTime.NANOS_PER_SECOND);
  0 > a && (a += LocalTime.NANOS_PER_SECOND, b--);
  return Duration._create(b, a);
};
Duration.of = function(a, b) {
  return Duration.ZERO.plus(a, b);
};
Duration.from = function(a) {
  requireNonNull(a, "amount");
  requireInstance(a, TemporalAmount);
  var b = Duration.ZERO;
  a.units().forEach(function(c) {
    b = b.plus(a.get(c), c);
  });
  return b;
};
Duration.between = function(a, b) {
  requireNonNull(a, "startInclusive");
  requireNonNull(b, "endExclusive");
  var c = a.until(b, ChronoUnit.SECONDS), d = 0;
  if (a.isSupported(ChronoField.NANO_OF_SECOND) && b.isSupported(ChronoField.NANO_OF_SECOND)) {
    try {
      var e = a.getLong(ChronoField.NANO_OF_SECOND);
      d = b.getLong(ChronoField.NANO_OF_SECOND) - e;
      if (0 < c && 0 > d) {
        d += LocalTime.NANOS_PER_SECOND;
      } else {
        if (0 > c && 0 < d) {
          d -= LocalTime.NANOS_PER_SECOND;
        } else {
          if (0 === c && 0 !== d) {
            var f = b.with(ChronoField.NANO_OF_SECOND, e);
            c = a.until(f, ChronoUnit.SECONDS);
          }
        }
      }
    } catch (g) {
    }
  }
  return Duration.ofSeconds(c, d);
};
Duration.parse = function(a) {
  requireNonNull(a, "text");
  var b = /([-+]?)P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?/i.exec(a);
  if (null !== b && "T" === b[3] === !1) {
    var c = "-" === b[1], d = b[2], e = b[4], f = b[5], g = b[6];
    b = b[7];
    if (null != d || null != e || null != f || null != g) {
      d = Duration._parseNumber(a, d, LocalTime.SECONDS_PER_DAY, "days");
      e = Duration._parseNumber(a, e, LocalTime.SECONDS_PER_HOUR, "hours");
      f = Duration._parseNumber(a, f, LocalTime.SECONDS_PER_MINUTE, "minutes");
      var h = Duration._parseNumber(a, g, 1, "seconds");
      g = null != g && "-" === g.charAt(0);
      g = Duration._parseFraction(a, b, g ? -1 : 1);
      try {
        return Duration._create(c, d, e, f, h, g);
      } catch (n) {
        throw new DateTimeParseException("Text cannot be parsed to a Duration: overflow", a, 0, n);
      }
    }
  }
  throw new DateTimeParseException("Text cannot be parsed to a Duration", a, 0);
};
Duration._parseNumber = function(a, b, c, d) {
  if (null == b) {
    return 0;
  }
  try {
    return "+" === b[0] && (b = b.substring(1)), MathUtil.safeMultiply(parseFloat(b), c);
  } catch (e) {
    throw new DateTimeParseException("Text cannot be parsed to a Duration: " + d, a, 0, e);
  }
};
Duration._parseFraction = function(a, b, c) {
  if (null == b || 0 === b.length) {
    return 0;
  }
  b = (b + "000000000").substring(0, 9);
  return parseFloat(b) * c;
};
Duration._create = function() {
  return 2 >= arguments.length ? Duration._createSecondsNanos(arguments[0], arguments[1]) : Duration._createNegateDaysHoursMinutesSecondsNanos(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
};
Duration._createNegateDaysHoursMinutesSecondsNanos = function(a, b, c, d, e, f) {
  b = MathUtil.safeAdd(b, MathUtil.safeAdd(c, MathUtil.safeAdd(d, e)));
  return a ? Duration.ofSeconds(b, f).negated() : Duration.ofSeconds(b, f);
};
Duration._createSecondsNanos = function(a, b) {
  a = void 0 === a ? 0 : a;
  b = void 0 === b ? 0 : b;
  return 0 === (a | b) ? Duration.ZERO : new Duration(a, b);
};
Duration.prototype.get = function(a) {
  if (a === ChronoUnit.SECONDS) {
    return this._seconds;
  }
  if (a === ChronoUnit.NANOS) {
    return this._nanos;
  }
  throw new UnsupportedTemporalTypeException("Unsupported unit: " + a);
};
Duration.prototype.units = function() {
  return [ChronoUnit.SECONDS, ChronoUnit.NANOS];
};
Duration.prototype.isZero = function() {
  return 0 === (this._seconds | this._nanos);
};
Duration.prototype.isNegative = function() {
  return 0 > this._seconds;
};
Duration.prototype.seconds = function() {
  return this._seconds;
};
Duration.prototype.nano = function() {
  return this._nanos;
};
Duration.prototype.withSeconds = function(a) {
  return Duration._create(a, this._nanos);
};
Duration.prototype.withNanos = function(a) {
  ChronoField.NANO_OF_SECOND.checkValidIntValue(a);
  return Duration._create(this._seconds, a);
};
Duration.prototype.plusDuration = function(a) {
  requireNonNull(a, "duration");
  return this.plus(a.seconds(), a.nano());
};
Duration.prototype.plus = function(a, b) {
  return 1 === arguments.length ? this.plusDuration(a) : 2 === arguments.length && b instanceof TemporalUnit ? this.plusAmountUnit(a, b) : this.plusSecondsNanos(a, b);
};
Duration.prototype.plusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToAdd");
  requireNonNull(b, "unit");
  if (b === ChronoUnit.DAYS) {
    return this.plusSecondsNanos(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_DAY), 0);
  }
  if (b.isDurationEstimated()) {
    throw new UnsupportedTemporalTypeException("Unit must not have an estimated duration");
  }
  if (0 === a) {
    return this;
  }
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.NANOS:
        return this.plusNanos(a);
      case ChronoUnit.MICROS:
        return this.plusSecondsNanos(1000 * MathUtil.intDiv(a, 1E9), 1000 * MathUtil.intMod(a, 1E9));
      case ChronoUnit.MILLIS:
        return this.plusMillis(a);
      case ChronoUnit.SECONDS:
        return this.plusSeconds(a);
    }
    return this.plusSecondsNanos(MathUtil.safeMultiply(b.duration().seconds(), a), 0);
  }
  a = b.duration().multipliedBy(a);
  return this.plusSecondsNanos(a.seconds(), a.nano());
};
Duration.prototype.plusDays = function(a) {
  return this.plusSecondsNanos(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_DAY), 0);
};
Duration.prototype.plusHours = function(a) {
  return this.plusSecondsNanos(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_HOUR), 0);
};
Duration.prototype.plusMinutes = function(a) {
  return this.plusSecondsNanos(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_MINUTE), 0);
};
Duration.prototype.plusSeconds = function(a) {
  return this.plusSecondsNanos(a, 0);
};
Duration.prototype.plusMillis = function(a) {
  return this.plusSecondsNanos(MathUtil.intDiv(a, 1000), 1000000 * MathUtil.intMod(a, 1000));
};
Duration.prototype.plusNanos = function(a) {
  return this.plusSecondsNanos(0, a);
};
Duration.prototype.plusSecondsNanos = function(a, b) {
  requireNonNull(a, "secondsToAdd");
  requireNonNull(b, "nanosToAdd");
  if (0 === (a | b)) {
    return this;
  }
  a = MathUtil.safeAdd(this._seconds, a);
  a = MathUtil.safeAdd(a, MathUtil.intDiv(b, LocalTime.NANOS_PER_SECOND));
  b = MathUtil.intMod(b, LocalTime.NANOS_PER_SECOND);
  b = MathUtil.safeAdd(this._nanos, b);
  return Duration.ofSeconds(a, b);
};
Duration.prototype.minus = function(a, b) {
  return 1 === arguments.length ? this.minusDuration(a) : this.minusAmountUnit(a, b);
};
Duration.prototype.minusDuration = function(a) {
  requireNonNull(a, "duration");
  var b = a.seconds();
  a = a.nano();
  return b === MIN_SAFE_INTEGER ? this.plus(MAX_SAFE_INTEGER, -a) : this.plus(-b, -a);
};
Duration.prototype.minusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToSubtract");
  requireNonNull(b, "unit");
  return a === MIN_SAFE_INTEGER ? this.plusAmountUnit(MAX_SAFE_INTEGER, b) : this.plusAmountUnit(-a, b);
};
Duration.prototype.minusDays = function(a) {
  return a === MIN_SAFE_INTEGER ? this.plusDays(MAX_SAFE_INTEGER) : this.plusDays(-a);
};
Duration.prototype.minusHours = function(a) {
  return a === MIN_SAFE_INTEGER ? this.plusHours(MAX_SAFE_INTEGER) : this.plusHours(-a);
};
Duration.prototype.minusMinutes = function(a) {
  return a === MIN_SAFE_INTEGER ? this.plusMinutes(MAX_SAFE_INTEGER) : this.plusMinutes(-a);
};
Duration.prototype.minusSeconds = function(a) {
  return a === MIN_SAFE_INTEGER ? this.plusSeconds(MAX_SAFE_INTEGER) : this.plusSeconds(-a);
};
Duration.prototype.minusMillis = function(a) {
  return a === MIN_SAFE_INTEGER ? this.plusMillis(MAX_SAFE_INTEGER) : this.plusMillis(-a);
};
Duration.prototype.minusNanos = function(a) {
  return a === MIN_SAFE_INTEGER ? this.plusNanos(MAX_SAFE_INTEGER) : this.plusNanos(-a);
};
Duration.prototype.multipliedBy = function(a) {
  if (0 === a) {
    return Duration.ZERO;
  }
  if (1 === a) {
    return this;
  }
  var b = MathUtil.safeMultiply(this._seconds, a);
  a = MathUtil.safeMultiply(this._nanos, a);
  b += MathUtil.intDiv(a, LocalTime.NANOS_PER_SECOND);
  a = MathUtil.intMod(a, LocalTime.NANOS_PER_SECOND);
  return Duration.ofSeconds(b, a);
};
Duration.prototype.dividedBy = function(a) {
  if (0 === a) {
    throw new ArithmeticException("Cannot divide by zero");
  }
  if (1 === a) {
    return this;
  }
  var b = MathUtil.intDiv(this._seconds, a), c = MathUtil.roundDown((this._seconds / a - b) * LocalTime.NANOS_PER_SECOND);
  a = MathUtil.intDiv(this._nanos, a);
  return Duration.ofSeconds(b, c + a);
};
Duration.prototype.negated = function() {
  return this.multipliedBy(-1);
};
Duration.prototype.abs = function() {
  return this.isNegative() ? this.negated() : this;
};
Duration.prototype.addTo = function(a) {
  requireNonNull(a, "temporal");
  0 !== this._seconds && (a = a.plus(this._seconds, ChronoUnit.SECONDS));
  0 !== this._nanos && (a = a.plus(this._nanos, ChronoUnit.NANOS));
  return a;
};
Duration.prototype.subtractFrom = function(a) {
  requireNonNull(a, "temporal");
  0 !== this._seconds && (a = a.minus(this._seconds, ChronoUnit.SECONDS));
  0 !== this._nanos && (a = a.minus(this._nanos, ChronoUnit.NANOS));
  return a;
};
Duration.prototype.toDays = function() {
  return MathUtil.intDiv(this._seconds, LocalTime.SECONDS_PER_DAY);
};
Duration.prototype.toHours = function() {
  return MathUtil.intDiv(this._seconds, LocalTime.SECONDS_PER_HOUR);
};
Duration.prototype.toMinutes = function() {
  return MathUtil.intDiv(this._seconds, LocalTime.SECONDS_PER_MINUTE);
};
Duration.prototype.toMillis = function() {
  var a = Math.round(MathUtil.safeMultiply(this._seconds, 1000));
  return a = MathUtil.safeAdd(a, MathUtil.intDiv(this._nanos, 1000000));
};
Duration.prototype.toNanos = function() {
  var a = MathUtil.safeMultiply(this._seconds, LocalTime.NANOS_PER_SECOND);
  return a = MathUtil.safeAdd(a, this._nanos);
};
Duration.prototype.compareTo = function(a) {
  requireNonNull(a, "otherDuration");
  requireInstance(a, Duration, "otherDuration");
  var b = MathUtil.compareNumbers(this._seconds, a.seconds());
  return 0 !== b ? b : this._nanos - a.nano();
};
Duration.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof Duration ? this.seconds() === a.seconds() && this.nano() === a.nano() : !1;
};
Duration.prototype.toString = function() {
  if (this === Duration.ZERO) {
    return "PT0S";
  }
  var a = MathUtil.intDiv(this._seconds, LocalTime.SECONDS_PER_HOUR), b = MathUtil.intDiv(MathUtil.intMod(this._seconds, LocalTime.SECONDS_PER_HOUR), LocalTime.SECONDS_PER_MINUTE), c = MathUtil.intMod(this._seconds, LocalTime.SECONDS_PER_MINUTE), 
  d = "PT";
  0 !== a && (d += a + "H");
  0 !== b && (d += b + "M");
  if (0 === c && 0 === this._nanos && 2 < d.length) {
    return d;
  }
  d = 0 > c && 0 < this._nanos ? -1 === c ? d + "-0" : d + (c + 1) : d + c;
  if (0 < this._nanos) {
    for (d += ".", a = 0 > c ? "" + (2 * LocalTime.NANOS_PER_SECOND - this._nanos) : "" + (LocalTime.NANOS_PER_SECOND + this._nanos), a = a.slice(1, a.length), d += a; "0" === d.charAt(d.length - 1);) {
      d = d.slice(0, d.length - 1);
    }
  }
  return d + "S";
};
Duration.prototype.toJSON = function() {
  return this.toString();
};
$jscomp.global.Object.defineProperties(Duration, {ZERO:{configurable:!0, enumerable:!0, get:function() {
  delete Duration.ZERO;
  Duration.ZERO = new Duration(0, 0);
  return Duration.ZERO;
}}});
var NANOS_PER_MILLI = 1000000, Instant = function(a, b) {
  Temporal.call(this);
  Instant._validate(a, b);
  this._seconds = MathUtil.safeToInt(a);
  this._nanos = MathUtil.safeToInt(b);
};
$jscomp.inherits(Instant, Temporal);
Instant.now = function(a) {
  a = void 0 === a ? Clock.systemUTC() : a;
  return a.instant();
};
Instant.ofEpochSecond = function(a, b) {
  b = void 0 === b ? 0 : b;
  a += MathUtil.floorDiv(b, LocalTime.NANOS_PER_SECOND);
  b = MathUtil.floorMod(b, LocalTime.NANOS_PER_SECOND);
  return Instant._create(a, b);
};
Instant.ofEpochMilli = function(a) {
  var b = MathUtil.floorDiv(a, 1000);
  a = MathUtil.floorMod(a, 1000);
  return Instant._create(b, 1000000 * a);
};
Instant.from = function(a) {
  try {
    var b = a.getLong(ChronoField.INSTANT_SECONDS), c = a.get(ChronoField.NANO_OF_SECOND);
    return Instant.ofEpochSecond(b, c);
  } catch (d) {
    throw new DateTimeException("Unable to obtain Instant from TemporalAccessor: " + a + ", type " + typeof a, d);
  }
};
Instant.parse = function(a) {
  return DateTimeFormatter.ISO_INSTANT.parse(a, Instant.FROM);
};
Instant._create = function(a, b) {
  return 0 === a && 0 === b ? Instant.EPOCH : new Instant(a, b);
};
Instant._validate = function(a, b) {
  if (a < Instant.MIN_SECONDS || a > Instant.MAX_SECONDS) {
    throw new DateTimeException("Instant exceeds minimum or maximum instant");
  }
  if (0 > b || b > LocalTime.NANOS_PER_SECOND) {
    throw new DateTimeException("Instant exceeds minimum or maximum instant");
  }
};
Instant.prototype.isSupported = function(a) {
  return a instanceof ChronoField ? a === ChronoField.INSTANT_SECONDS || a === ChronoField.NANO_OF_SECOND || a === ChronoField.MICRO_OF_SECOND || a === ChronoField.MILLI_OF_SECOND : a instanceof ChronoUnit ? a.isTimeBased() || a === ChronoUnit.DAYS : null != a && 
  a.isSupportedBy(this);
};
Instant.prototype.range = function(a) {
  return Temporal.prototype.range.call(this, a);
};
Instant.prototype.get = function(a) {
  return this.getLong(a);
};
Instant.prototype.getLong = function(a) {
  if (a instanceof ChronoField) {
    switch(a) {
      case ChronoField.NANO_OF_SECOND:
        return this._nanos;
      case ChronoField.MICRO_OF_SECOND:
        return MathUtil.intDiv(this._nanos, 1000);
      case ChronoField.MILLI_OF_SECOND:
        return MathUtil.intDiv(this._nanos, NANOS_PER_MILLI);
      case ChronoField.INSTANT_SECONDS:
        return this._seconds;
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
Instant.prototype.epochSecond = function() {
  return this._seconds;
};
Instant.prototype.nano = function() {
  return this._nanos;
};
Instant.prototype.withAdjuster = function(a) {
  requireNonNull(a, "adjuster");
  return a.adjustInto(this);
};
Instant.prototype.withFieldValue = function(a, b) {
  requireNonNull(a, "field");
  if (a instanceof ChronoField) {
    a.checkValidValue(b);
    switch(a) {
      case ChronoField.MILLI_OF_SECOND:
        return a = b * NANOS_PER_MILLI, a !== this._nanos ? Instant._create(this._seconds, a) : this;
      case ChronoField.MICRO_OF_SECOND:
        return a = 1000 * b, a !== this._nanos ? Instant._create(this._seconds, a) : this;
      case ChronoField.NANO_OF_SECOND:
        return b !== this._nanos ? Instant._create(this._seconds, b) : this;
      case ChronoField.INSTANT_SECONDS:
        return b !== this._seconds ? Instant._create(b, this._nanos) : this;
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.adjustInto(this, b);
};
Instant.prototype.truncatedTo = function(a) {
  requireNonNull(a, "unit");
  if (a === ChronoUnit.NANOS) {
    return this;
  }
  a = a.duration();
  if (a.seconds() > LocalTime.SECONDS_PER_DAY) {
    throw new DateTimeException("Unit is too large to be used for truncation");
  }
  var b = a.toNanos();
  if (0 !== MathUtil.intMod(LocalTime.NANOS_PER_DAY, b)) {
    throw new DateTimeException("Unit must divide into a standard day without remainder");
  }
  a = MathUtil.intMod(this._seconds, LocalTime.SECONDS_PER_DAY) * LocalTime.NANOS_PER_SECOND + this._nanos;
  b *= MathUtil.intDiv(a, b);
  return this.plusNanos(b - a);
};
Instant.prototype.plusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.addTo(this);
};
Instant.prototype.plusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToAdd");
  requireNonNull(b, "unit");
  requireInstance(b, TemporalUnit);
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.NANOS:
        return this.plusNanos(a);
      case ChronoUnit.MICROS:
        return this._plus(MathUtil.intDiv(a, 1000000), 1000 * MathUtil.intMod(a, 1000000));
      case ChronoUnit.MILLIS:
        return this.plusMillis(a);
      case ChronoUnit.SECONDS:
        return this.plusSeconds(a);
      case ChronoUnit.MINUTES:
        return this.plusSeconds(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_MINUTE));
      case ChronoUnit.HOURS:
        return this.plusSeconds(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_HOUR));
      case ChronoUnit.HALF_DAYS:
        return this.plusSeconds(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_DAY / 2));
      case ChronoUnit.DAYS:
        return this.plusSeconds(MathUtil.safeMultiply(a, LocalTime.SECONDS_PER_DAY));
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.addTo(this, a);
};
Instant.prototype.plusSeconds = function(a) {
  return this._plus(a, 0);
};
Instant.prototype.plusMillis = function(a) {
  return this._plus(MathUtil.intDiv(a, 1000), MathUtil.intMod(a, 1000) * NANOS_PER_MILLI);
};
Instant.prototype.plusNanos = function(a) {
  return this._plus(0, a);
};
Instant.prototype._plus = function(a, b) {
  if (0 === (a | b)) {
    return this;
  }
  a = this._seconds + a;
  a += MathUtil.intDiv(b, LocalTime.NANOS_PER_SECOND);
  return Instant.ofEpochSecond(a, this._nanos + b % LocalTime.NANOS_PER_SECOND);
};
Instant.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.subtractFrom(this);
};
Instant.prototype.minusAmountUnit = function(a, b) {
  return this.plusAmountUnit(-1 * a, b);
};
Instant.prototype.minusSeconds = function(a) {
  return this.plusSeconds(-1 * a);
};
Instant.prototype.minusMillis = function(a) {
  return this.plusMillis(-1 * a);
};
Instant.prototype.minusNanos = function(a) {
  return this.plusNanos(-1 * a);
};
Instant.prototype.query = function(a) {
  requireNonNull(a, "query");
  return a === TemporalQueries.precision() ? ChronoUnit.NANOS : a === TemporalQueries.localDate() || a === TemporalQueries.localTime() || a === TemporalQueries.chronology() || a === TemporalQueries.zoneId() || a === TemporalQueries.zone() || a === TemporalQueries.offset() ? 
  null : a.queryFrom(this);
};
Instant.prototype.adjustInto = function(a) {
  requireNonNull(a, "temporal");
  return a.with(ChronoField.INSTANT_SECONDS, this._seconds).with(ChronoField.NANO_OF_SECOND, this._nanos);
};
Instant.prototype.until = function(a, b) {
  requireNonNull(a, "endExclusive");
  requireNonNull(b, "unit");
  a = Instant.from(a);
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.NANOS:
        return this._nanosUntil(a);
      case ChronoUnit.MICROS:
        return MathUtil.intDiv(this._nanosUntil(a), 1000);
      case ChronoUnit.MILLIS:
        return MathUtil.safeSubtract(a.toEpochMilli(), this.toEpochMilli());
      case ChronoUnit.SECONDS:
        return this._secondsUntil(a);
      case ChronoUnit.MINUTES:
        return MathUtil.intDiv(this._secondsUntil(a), LocalTime.SECONDS_PER_MINUTE);
      case ChronoUnit.HOURS:
        return MathUtil.intDiv(this._secondsUntil(a), LocalTime.SECONDS_PER_HOUR);
      case ChronoUnit.HALF_DAYS:
        return MathUtil.intDiv(this._secondsUntil(a), 12 * LocalTime.SECONDS_PER_HOUR);
      case ChronoUnit.DAYS:
        return MathUtil.intDiv(this._secondsUntil(a), LocalTime.SECONDS_PER_DAY);
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.between(this, a);
};
Instant.prototype._nanosUntil = function(a) {
  var b = MathUtil.safeSubtract(a.epochSecond(), this.epochSecond());
  b = MathUtil.safeMultiply(b, LocalTime.NANOS_PER_SECOND);
  return MathUtil.safeAdd(b, a.nano() - this.nano());
};
Instant.prototype._secondsUntil = function(a) {
  var b = MathUtil.safeSubtract(a.epochSecond(), this.epochSecond());
  a = a.nano() - this.nano();
  0 < b && 0 > a ? b-- : 0 > b && 0 < a && b++;
  return b;
};
Instant.prototype.atZone = function(a) {
  return ZonedDateTime.ofInstant(this, a);
};
Instant.prototype.toEpochMilli = function() {
  return MathUtil.safeMultiply(this._seconds, 1000) + MathUtil.intDiv(this._nanos, NANOS_PER_MILLI);
};
Instant.prototype.compareTo = function(a) {
  requireNonNull(a, "otherInstant");
  requireInstance(a, Instant, "otherInstant");
  var b = MathUtil.compareNumbers(this._seconds, a._seconds);
  return 0 !== b ? b : this._nanos - a._nanos;
};
Instant.prototype.isAfter = function(a) {
  return 0 < this.compareTo(a);
};
Instant.prototype.isBefore = function(a) {
  return 0 > this.compareTo(a);
};
Instant.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof Instant ? this.epochSecond() === a.epochSecond() && this.nano() === a.nano() : !1;
};
Instant.prototype.hashCode = function() {
  return MathUtil.hashCode(this._seconds, this._nanos);
};
Instant.prototype.toString = function() {
  return DateTimeFormatter.ISO_INSTANT.format(this);
};
Instant.prototype.toJSON = function() {
  return this.toString();
};
$jscomp.global.Object.defineProperties(Instant, {MIN_SECONDS:{configurable:!0, enumerable:!0, get:function() {
  return -31619119219200;
}}, MAX_SECONDS:{configurable:!0, enumerable:!0, get:function() {
  return 31494816403199;
}}, EPOCH:{configurable:!0, enumerable:!0, get:function() {
  return new Instant(0, 0);
}}, MIN:{configurable:!0, enumerable:!0, get:function() {
  return Instant.ofEpochSecond(Instant.MIN_SECONDS, 0);
}}, MAX:{configurable:!0, enumerable:!0, get:function() {
  return Instant.ofEpochSecond(Instant.MAX_SECONDS, 999999999);
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("Instant.FROM", function(a) {
    return Instant.from(a);
  });
}}});
var DAYS_PER_CYCLE = 146097, DAYS_0000_TO_1970 = 5 * DAYS_PER_CYCLE - 10957, LocalDate = function(a, b, c) {
  ChronoLocalDate.call(this);
  requireNonNull(a, "year");
  requireNonNull(b, "month");
  requireNonNull(c, "dayOfMonth");
  b instanceof Month && (b = b.value());
  this._year = MathUtil.safeToInt(a);
  this._month = MathUtil.safeToInt(b);
  this._day = MathUtil.safeToInt(c);
  LocalDate._validate(this._year, this._month, this._day);
};
$jscomp.inherits(LocalDate, ChronoLocalDate);
LocalDate.now = function(a) {
  a = null == a ? Clock.systemDefaultZone() : a instanceof ZoneId ? Clock.system(a) : a;
  return LocalDate.ofInstant(a.instant(), a.zone());
};
LocalDate.ofInstant = function(a, b) {
  b = void 0 === b ? ZoneId.systemDefault() : b;
  requireNonNull(a, "instant");
  b = b.rules().offset(a);
  a = a.epochSecond() + b.totalSeconds();
  a = MathUtil.floorDiv(a, LocalTime.SECONDS_PER_DAY);
  return LocalDate.ofEpochDay(a);
};
LocalDate.of = function(a, b, c) {
  return new LocalDate(a, b, c);
};
LocalDate.ofYearDay = function(a, b) {
  ChronoField.YEAR.checkValidValue(a);
  var c = IsoChronology.isLeapYear(a);
  366 === b && !1 === c && assert(!1, "Invalid date 'DayOfYear 366' as '" + a + "' is not a leap year", DateTimeException);
  var d = Month.of(Math.floor((b - 1) / 31 + 1)), e = d.firstDayOfYear(c) + d.length(c) - 1;
  b > e && (d = d.plus(1));
  b = b - d.firstDayOfYear(c) + 1;
  return new LocalDate(a, d.value(), b);
};
LocalDate.ofEpochDay = function(a) {
  var b = (void 0 === a ? 0 : a) + DAYS_0000_TO_1970;
  b -= 60;
  var c = 0;
  0 > b && (a = MathUtil.intDiv(b + 1, DAYS_PER_CYCLE) - 1, c = 400 * a, b += -a * DAYS_PER_CYCLE);
  a = MathUtil.intDiv(400 * b + 591, DAYS_PER_CYCLE);
  var d = b - (365 * a + MathUtil.intDiv(a, 4) - MathUtil.intDiv(a, 100) + MathUtil.intDiv(a, 400));
  0 > d && (a--, d = b - (365 * a + MathUtil.intDiv(a, 4) - MathUtil.intDiv(a, 100) + MathUtil.intDiv(a, 400)));
  a += c;
  c = MathUtil.intDiv(5 * d + 2, 153);
  b = (c + 2) % 12 + 1;
  d = d - MathUtil.intDiv(306 * c + 5, 10) + 1;
  a += MathUtil.intDiv(c, 10);
  return new LocalDate(a, b, d);
};
LocalDate.from = function(a) {
  requireNonNull(a, "temporal");
  var b = a.query(TemporalQueries.localDate());
  if (null == b) {
    throw new DateTimeException("Unable to obtain LocalDate from TemporalAccessor: " + a + ", type " + (null != a.constructor ? a.constructor.name : ""));
  }
  return b;
};
LocalDate.parse = function(a, b) {
  b = void 0 === b ? DateTimeFormatter.ISO_LOCAL_DATE : b;
  assert(null != b, "formatter", NullPointerException);
  return b.parse(a, LocalDate.FROM);
};
LocalDate._resolvePreviousValid = function(a, b, c) {
  switch(b) {
    case 2:
      c = Math.min(c, IsoChronology.isLeapYear(a) ? 29 : 28);
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      c = Math.min(c, 30);
  }
  return LocalDate.of(a, b, c);
};
LocalDate._validate = function(a, b, c) {
  ChronoField.YEAR.checkValidValue(a);
  ChronoField.MONTH_OF_YEAR.checkValidValue(b);
  ChronoField.DAY_OF_MONTH.checkValidValue(c);
  if (28 < c) {
    var d = 31;
    switch(b) {
      case 2:
        d = IsoChronology.isLeapYear(a) ? 29 : 28;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        d = 30;
    }
    c > d && (29 === c ? assert(!1, "Invalid date 'February 29' as '" + a + "' is not a leap year", DateTimeException) : assert(!1, "Invalid date '" + a + "' '" + b + "' '" + c + "'", DateTimeException));
  }
};
LocalDate.prototype.isSupported = function(a) {
  return ChronoLocalDate.prototype.isSupported.call(this, a);
};
LocalDate.prototype.range = function(a) {
  if (a instanceof ChronoField) {
    if (a.isDateBased()) {
      switch(a) {
        case ChronoField.DAY_OF_MONTH:
          return ValueRange.of(1, this.lengthOfMonth());
        case ChronoField.DAY_OF_YEAR:
          return ValueRange.of(1, this.lengthOfYear());
        case ChronoField.ALIGNED_WEEK_OF_MONTH:
          return ValueRange.of(1, this.month() === Month.FEBRUARY && !1 === this.isLeapYear() ? 4 : 5);
        case ChronoField.YEAR_OF_ERA:
          return 0 >= this._year ? ValueRange.of(1, Year.MAX_VALUE + 1) : ValueRange.of(1, Year.MAX_VALUE);
      }
      return a.range();
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.rangeRefinedBy(this);
};
LocalDate.prototype.get = function(a) {
  return this.getLong(a);
};
LocalDate.prototype.getLong = function(a) {
  assert(null != a, "", NullPointerException);
  return a instanceof ChronoField ? this._get0(a) : a.getFrom(this);
};
LocalDate.prototype._get0 = function(a) {
  switch(a) {
    case ChronoField.DAY_OF_WEEK:
      return this.dayOfWeek().value();
    case ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH:
      return MathUtil.intMod(this._day - 1, 7) + 1;
    case ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR:
      return MathUtil.intMod(this.dayOfYear() - 1, 7) + 1;
    case ChronoField.DAY_OF_MONTH:
      return this._day;
    case ChronoField.DAY_OF_YEAR:
      return this.dayOfYear();
    case ChronoField.EPOCH_DAY:
      return this.toEpochDay();
    case ChronoField.ALIGNED_WEEK_OF_MONTH:
      return MathUtil.intDiv(this._day - 1, 7) + 1;
    case ChronoField.ALIGNED_WEEK_OF_YEAR:
      return MathUtil.intDiv(this.dayOfYear() - 1, 7) + 1;
    case ChronoField.MONTH_OF_YEAR:
      return this._month;
    case ChronoField.PROLEPTIC_MONTH:
      return this._prolepticMonth();
    case ChronoField.YEAR_OF_ERA:
      return 1 <= this._year ? this._year : 1 - this._year;
    case ChronoField.YEAR:
      return this._year;
    case ChronoField.ERA:
      return 1 <= this._year ? 1 : 0;
  }
  throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
};
LocalDate.prototype._prolepticMonth = function() {
  return 12 * this._year + (this._month - 1);
};
LocalDate.prototype.chronology = function() {
  return IsoChronology.INSTANCE;
};
LocalDate.prototype.year = function() {
  return this._year;
};
LocalDate.prototype.monthValue = function() {
  return this._month;
};
LocalDate.prototype.month = function() {
  return Month.of(this._month);
};
LocalDate.prototype.dayOfMonth = function() {
  return this._day;
};
LocalDate.prototype.dayOfYear = function() {
  return this.month().firstDayOfYear(this.isLeapYear()) + this._day - 1;
};
LocalDate.prototype.dayOfWeek = function() {
  var a = MathUtil.floorMod(this.toEpochDay() + 3, 7);
  return DayOfWeek.of(a + 1);
};
LocalDate.prototype.isLeapYear = function() {
  return IsoChronology.isLeapYear(this._year);
};
LocalDate.prototype.lengthOfMonth = function() {
  switch(this._month) {
    case 2:
      return this.isLeapYear() ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
};
LocalDate.prototype.lengthOfYear = function() {
  return this.isLeapYear() ? 366 : 365;
};
LocalDate.prototype.withAdjuster = function(a) {
  requireNonNull(a, "adjuster");
  if (a instanceof LocalDate) {
    return a;
  }
  assert("function" === typeof a.adjustInto, "adjuster", IllegalArgumentException);
  return a.adjustInto(this);
};
LocalDate.prototype.withFieldValue = function(a, b) {
  assert(null != a, "field", NullPointerException);
  if (a instanceof ChronoField) {
    a.checkValidValue(b);
    switch(a) {
      case ChronoField.DAY_OF_WEEK:
        return this.plusDays(b - this.dayOfWeek().value());
      case ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH:
        return this.plusDays(b - this.getLong(ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH));
      case ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR:
        return this.plusDays(b - this.getLong(ChronoField.ALIGNED_DAY_OF_WEEK_IN_YEAR));
      case ChronoField.DAY_OF_MONTH:
        return this.withDayOfMonth(b);
      case ChronoField.DAY_OF_YEAR:
        return this.withDayOfYear(b);
      case ChronoField.EPOCH_DAY:
        return LocalDate.ofEpochDay(b);
      case ChronoField.ALIGNED_WEEK_OF_MONTH:
        return this.plusWeeks(b - this.getLong(ChronoField.ALIGNED_WEEK_OF_MONTH));
      case ChronoField.ALIGNED_WEEK_OF_YEAR:
        return this.plusWeeks(b - this.getLong(ChronoField.ALIGNED_WEEK_OF_YEAR));
      case ChronoField.MONTH_OF_YEAR:
        return this.withMonth(b);
      case ChronoField.PROLEPTIC_MONTH:
        return this.plusMonths(b - this.getLong(ChronoField.PROLEPTIC_MONTH));
      case ChronoField.YEAR_OF_ERA:
        return this.withYear(1 <= this._year ? b : 1 - b);
      case ChronoField.YEAR:
        return this.withYear(b);
      case ChronoField.ERA:
        return this.getLong(ChronoField.ERA) === b ? this : this.withYear(1 - this._year);
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.adjustInto(this, b);
};
LocalDate.prototype.withYear = function(a) {
  if (this._year === a) {
    return this;
  }
  ChronoField.YEAR.checkValidValue(a);
  return LocalDate._resolvePreviousValid(a, this._month, this._day);
};
LocalDate.prototype.withMonth = function(a) {
  a = a instanceof Month ? a.value() : a;
  if (this._month === a) {
    return this;
  }
  ChronoField.MONTH_OF_YEAR.checkValidValue(a);
  return LocalDate._resolvePreviousValid(this._year, a, this._day);
};
LocalDate.prototype.withDayOfMonth = function(a) {
  return this._day === a ? this : LocalDate.of(this._year, this._month, a);
};
LocalDate.prototype.withDayOfYear = function(a) {
  return this.dayOfYear() === a ? this : LocalDate.ofYearDay(this._year, a);
};
LocalDate.prototype.plusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.addTo(this);
};
LocalDate.prototype.plusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToAdd");
  requireNonNull(b, "unit");
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.DAYS:
        return this.plusDays(a);
      case ChronoUnit.WEEKS:
        return this.plusWeeks(a);
      case ChronoUnit.MONTHS:
        return this.plusMonths(a);
      case ChronoUnit.YEARS:
        return this.plusYears(a);
      case ChronoUnit.DECADES:
        return this.plusYears(MathUtil.safeMultiply(a, 10));
      case ChronoUnit.CENTURIES:
        return this.plusYears(MathUtil.safeMultiply(a, 100));
      case ChronoUnit.MILLENNIA:
        return this.plusYears(MathUtil.safeMultiply(a, 1000));
      case ChronoUnit.ERAS:
        return this.with(ChronoField.ERA, MathUtil.safeAdd(this.getLong(ChronoField.ERA), a));
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.addTo(this, a);
};
LocalDate.prototype.plusYears = function(a) {
  if (0 === a) {
    return this;
  }
  a = ChronoField.YEAR.checkValidIntValue(this._year + a);
  return LocalDate._resolvePreviousValid(a, this._month, this._day);
};
LocalDate.prototype.plusMonths = function(a) {
  if (0 === a) {
    return this;
  }
  var b = 12 * this._year + (this._month - 1) + a;
  a = ChronoField.YEAR.checkValidIntValue(MathUtil.floorDiv(b, 12));
  b = MathUtil.floorMod(b, 12) + 1;
  return LocalDate._resolvePreviousValid(a, b, this._day);
};
LocalDate.prototype.plusWeeks = function(a) {
  return this.plusDays(MathUtil.safeMultiply(a, 7));
};
LocalDate.prototype.plusDays = function(a) {
  if (0 === a) {
    return this;
  }
  a = MathUtil.safeAdd(this.toEpochDay(), a);
  return LocalDate.ofEpochDay(a);
};
LocalDate.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.subtractFrom(this);
};
LocalDate.prototype.minusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToSubtract");
  requireNonNull(b, "unit");
  return this.plusAmountUnit(-1 * a, b);
};
LocalDate.prototype.minusYears = function(a) {
  return this.plusYears(-1 * a);
};
LocalDate.prototype.minusMonths = function(a) {
  return this.plusMonths(-1 * a);
};
LocalDate.prototype.minusWeeks = function(a) {
  return this.plusWeeks(-1 * a);
};
LocalDate.prototype.minusDays = function(a) {
  return this.plusDays(-1 * a);
};
LocalDate.prototype.query = function(a) {
  requireNonNull(a, "query");
  return a === TemporalQueries.localDate() ? this : ChronoLocalDate.prototype.query.call(this, a);
};
LocalDate.prototype.adjustInto = function(a) {
  return ChronoLocalDate.prototype.adjustInto.call(this, a);
};
LocalDate.prototype.until = function(a, b) {
  return 2 > arguments.length ? this.until1(a) : this.until2(a, b);
};
LocalDate.prototype.until2 = function(a, b) {
  a = LocalDate.from(a);
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.DAYS:
        return this.daysUntil(a);
      case ChronoUnit.WEEKS:
        return MathUtil.intDiv(this.daysUntil(a), 7);
      case ChronoUnit.MONTHS:
        return this._monthsUntil(a);
      case ChronoUnit.YEARS:
        return MathUtil.intDiv(this._monthsUntil(a), 12);
      case ChronoUnit.DECADES:
        return MathUtil.intDiv(this._monthsUntil(a), 120);
      case ChronoUnit.CENTURIES:
        return MathUtil.intDiv(this._monthsUntil(a), 1200);
      case ChronoUnit.MILLENNIA:
        return MathUtil.intDiv(this._monthsUntil(a), 12000);
      case ChronoUnit.ERAS:
        return a.getLong(ChronoField.ERA) - this.getLong(ChronoField.ERA);
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.between(this, a);
};
LocalDate.prototype.daysUntil = function(a) {
  return a.toEpochDay() - this.toEpochDay();
};
LocalDate.prototype._monthsUntil = function(a) {
  var b = 32 * this._prolepticMonth() + this.dayOfMonth();
  a = 32 * a._prolepticMonth() + a.dayOfMonth();
  return MathUtil.intDiv(a - b, 32);
};
LocalDate.prototype.until1 = function(a) {
  var b = LocalDate.from(a);
  a = b._prolepticMonth() - this._prolepticMonth();
  var c = b._day - this._day;
  0 < a && 0 > c ? (a--, c = this.plusMonths(a), c = b.toEpochDay() - c.toEpochDay()) : 0 > a && 0 < c && (a++, c -= b.lengthOfMonth());
  b = MathUtil.intDiv(a, 12);
  a = MathUtil.intMod(a, 12);
  return Period.of(b, a, c);
};
LocalDate.prototype.atTime = function() {
  return 1 === arguments.length ? this.atTime1.apply(this, arguments) : this.atTime4.apply(this, arguments);
};
LocalDate.prototype.atTime1 = function(a) {
  return LocalDateTime.of(this, a);
};
LocalDate.prototype.atTime4 = function(a, b, c, d) {
  return this.atTime1(LocalTime.of(a, b, void 0 === c ? 0 : c, void 0 === d ? 0 : d));
};
LocalDate.prototype.atStartOfDay = function(a) {
  return null != a ? this.atStartOfDayWithZone(a) : LocalDateTime.of(this, LocalTime.MIDNIGHT);
};
LocalDate.prototype.atStartOfDayWithZone = function(a) {
  requireNonNull(a, "zone");
  var b = this.atTime(LocalTime.MIDNIGHT);
  if (!1 === a instanceof ZoneOffset) {
    var c = a.rules().transition(b);
    null != c && c.isGap() && (b = c.dateTimeAfter());
  }
  return ZonedDateTime.of(b, a);
};
LocalDate.prototype.toEpochDay = function() {
  var a = this._year, b = this._month;
  var c = 365 * a;
  c = 0 <= a ? c + (MathUtil.intDiv(a + 3, 4) - MathUtil.intDiv(a + 99, 100) + MathUtil.intDiv(a + 399, 400)) : c - (MathUtil.intDiv(a, -4) - MathUtil.intDiv(a, -100) + MathUtil.intDiv(a, -400));
  c += MathUtil.intDiv(367 * b - 362, 12);
  c += this.dayOfMonth() - 1;
  2 < b && (c--, IsoChronology.isLeapYear(a) || c--);
  return c - DAYS_0000_TO_1970;
};
LocalDate.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, LocalDate, "other");
  return this._compareTo0(a);
};
LocalDate.prototype._compareTo0 = function(a) {
  var b = this._year - a._year;
  0 === b && (b = this._month - a._month, 0 === b && (b = this._day - a._day));
  return b;
};
LocalDate.prototype.isAfter = function(a) {
  return 0 < this.compareTo(a);
};
LocalDate.prototype.isBefore = function(a) {
  return 0 > this.compareTo(a);
};
LocalDate.prototype.isEqual = function(a) {
  return 0 === this.compareTo(a);
};
LocalDate.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof LocalDate ? 0 === this._compareTo0(a) : !1;
};
LocalDate.prototype.hashCode = function() {
  var a = this._year;
  return MathUtil.hash(a & 4294965248 ^ (a << 11) + (this._month << 6) + this._day);
};
LocalDate.prototype.toString = function() {
  var a = this._year, b = this._month, c = this._day;
  return (1000 > Math.abs(a) ? 0 > a ? "-" + ("" + (a - 10000)).slice(-4) : ("" + (a + 10000)).slice(-4) : 9999 < a ? "+" + a : "" + a) + (10 > b ? "-0" + b : "-" + b) + (10 > c ? "-0" + c : "-" + c);
};
LocalDate.prototype.toJSON = function() {
  return this.toString();
};
LocalDate.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  requireInstance(a, DateTimeFormatter, "formatter");
  return ChronoLocalDate.prototype.format.call(this, a);
};
$jscomp.global.Object.defineProperties(LocalDate, {MIN:{configurable:!0, enumerable:!0, get:function() {
  return LocalDate.of(YearConstants.MIN_VALUE, 1, 1);
}}, MAX:{configurable:!0, enumerable:!0, get:function() {
  return LocalDate.of(YearConstants.MAX_VALUE, 12, 31);
}}, EPOCH_0:{configurable:!0, enumerable:!0, get:function() {
  return LocalDate.ofEpochDay(0);
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("LocalDate.FROM", function(a) {
    return LocalDate.from(a);
  });
}}});
var LocalTime = function(a, b, c, d) {
  a = void 0 === a ? 0 : a;
  b = void 0 === b ? 0 : b;
  c = void 0 === c ? 0 : c;
  d = void 0 === d ? 0 : d;
  Temporal.call(this);
  a = MathUtil.safeToInt(a);
  b = MathUtil.safeToInt(b);
  c = MathUtil.safeToInt(c);
  d = MathUtil.safeToInt(d);
  LocalTime._validate(a, b, c, d);
  if (0 === (b | c | d)) {
    return LocalTime.HOURS[a] || (this._hour = a, this._minute = b, this._second = c, this._nano = d, LocalTime.HOURS[a] = this), LocalTime.HOURS[a];
  }
  this._hour = a;
  this._minute = b;
  this._second = c;
  this._nano = d;
};
$jscomp.inherits(LocalTime, Temporal);
LocalTime.now = function(a) {
  return null == a ? LocalTime._now(Clock.systemDefaultZone()) : a instanceof Clock ? LocalTime._now(a) : LocalTime._now(Clock.system(a));
};
LocalTime._now = function(a) {
  a = void 0 === a ? Clock.systemDefaultZone() : a;
  requireNonNull(a, "clock");
  return LocalTime.ofInstant(a.instant(), a.zone());
};
LocalTime.ofInstant = function(a, b) {
  b = void 0 === b ? ZoneId.systemDefault() : b;
  b = b.rules().offset(a);
  var c = MathUtil.intMod(a.epochSecond(), LocalTime.SECONDS_PER_DAY);
  c = MathUtil.intMod(c + b.totalSeconds(), LocalTime.SECONDS_PER_DAY);
  0 > c && (c += LocalTime.SECONDS_PER_DAY);
  return LocalTime.ofSecondOfDay(c, a.nano());
};
LocalTime.of = function(a, b, c, d) {
  return new LocalTime(a, b, c, d);
};
LocalTime.ofSecondOfDay = function(a, b) {
  a = void 0 === a ? 0 : a;
  b = void 0 === b ? 0 : b;
  ChronoField.SECOND_OF_DAY.checkValidValue(a);
  ChronoField.NANO_OF_SECOND.checkValidValue(b);
  var c = MathUtil.intDiv(a, LocalTime.SECONDS_PER_HOUR);
  a -= c * LocalTime.SECONDS_PER_HOUR;
  var d = MathUtil.intDiv(a, LocalTime.SECONDS_PER_MINUTE);
  a -= d * LocalTime.SECONDS_PER_MINUTE;
  return new LocalTime(c, d, a, b);
};
LocalTime.ofNanoOfDay = function(a) {
  a = void 0 === a ? 0 : a;
  ChronoField.NANO_OF_DAY.checkValidValue(a);
  var b = MathUtil.intDiv(a, LocalTime.NANOS_PER_HOUR);
  a -= b * LocalTime.NANOS_PER_HOUR;
  var c = MathUtil.intDiv(a, LocalTime.NANOS_PER_MINUTE);
  a -= c * LocalTime.NANOS_PER_MINUTE;
  var d = MathUtil.intDiv(a, LocalTime.NANOS_PER_SECOND);
  a -= d * LocalTime.NANOS_PER_SECOND;
  return new LocalTime(b, c, d, a);
};
LocalTime.from = function(a) {
  requireNonNull(a, "temporal");
  var b = a.query(TemporalQueries.localTime());
  if (null == b) {
    throw new DateTimeException("Unable to obtain LocalTime TemporalAccessor: " + a + ", type " + (null != a.constructor ? a.constructor.name : ""));
  }
  return b;
};
LocalTime.parse = function(a, b) {
  b = void 0 === b ? DateTimeFormatter.ISO_LOCAL_TIME : b;
  requireNonNull(b, "formatter");
  return b.parse(a, LocalTime.FROM);
};
LocalTime._validate = function(a, b, c, d) {
  ChronoField.HOUR_OF_DAY.checkValidValue(a);
  ChronoField.MINUTE_OF_HOUR.checkValidValue(b);
  ChronoField.SECOND_OF_MINUTE.checkValidValue(c);
  ChronoField.NANO_OF_SECOND.checkValidValue(d);
};
LocalTime.prototype.isSupported = function(a) {
  return a instanceof ChronoField || a instanceof ChronoUnit ? a.isTimeBased() : null != a && a.isSupportedBy(this);
};
LocalTime.prototype.range = function(a) {
  requireNonNull(a);
  return Temporal.prototype.range.call(this, a);
};
LocalTime.prototype.get = function(a) {
  return this.getLong(a);
};
LocalTime.prototype.getLong = function(a) {
  requireNonNull(a, "field");
  return a instanceof ChronoField ? this._get0(a) : a.getFrom(this);
};
LocalTime.prototype._get0 = function(a) {
  switch(a) {
    case ChronoField.NANO_OF_SECOND:
      return this._nano;
    case ChronoField.NANO_OF_DAY:
      return this.toNanoOfDay();
    case ChronoField.MICRO_OF_SECOND:
      return MathUtil.intDiv(this._nano, 1000);
    case ChronoField.MICRO_OF_DAY:
      return MathUtil.intDiv(this.toNanoOfDay(), 1000);
    case ChronoField.MILLI_OF_SECOND:
      return MathUtil.intDiv(this._nano, 1000000);
    case ChronoField.MILLI_OF_DAY:
      return MathUtil.intDiv(this.toNanoOfDay(), 1000000);
    case ChronoField.SECOND_OF_MINUTE:
      return this._second;
    case ChronoField.SECOND_OF_DAY:
      return this.toSecondOfDay();
    case ChronoField.MINUTE_OF_HOUR:
      return this._minute;
    case ChronoField.MINUTE_OF_DAY:
      return 60 * this._hour + this._minute;
    case ChronoField.HOUR_OF_AMPM:
      return MathUtil.intMod(this._hour, 12);
    case ChronoField.CLOCK_HOUR_OF_AMPM:
      return a = MathUtil.intMod(this._hour, 12), 0 === a % 12 ? 12 : a;
    case ChronoField.HOUR_OF_DAY:
      return this._hour;
    case ChronoField.CLOCK_HOUR_OF_DAY:
      return 0 === this._hour ? 24 : this._hour;
    case ChronoField.AMPM_OF_DAY:
      return MathUtil.intDiv(this._hour, 12);
  }
  throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
};
LocalTime.prototype.hour = function() {
  return this._hour;
};
LocalTime.prototype.minute = function() {
  return this._minute;
};
LocalTime.prototype.second = function() {
  return this._second;
};
LocalTime.prototype.nano = function() {
  return this._nano;
};
LocalTime.prototype.withAdjuster = function(a) {
  requireNonNull(a, "adjuster");
  if (a instanceof LocalTime) {
    return a;
  }
  assert("function" === typeof a.adjustInto, "adjuster", IllegalArgumentException);
  return a.adjustInto(this);
};
LocalTime.prototype.withFieldValue = function(a, b) {
  requireNonNull(a, "field");
  requireInstance(a, TemporalField, "field");
  if (a instanceof ChronoField) {
    a.checkValidValue(b);
    switch(a) {
      case ChronoField.NANO_OF_SECOND:
        return this.withNano(b);
      case ChronoField.NANO_OF_DAY:
        return LocalTime.ofNanoOfDay(b);
      case ChronoField.MICRO_OF_SECOND:
        return this.withNano(1000 * b);
      case ChronoField.MICRO_OF_DAY:
        return LocalTime.ofNanoOfDay(1000 * b);
      case ChronoField.MILLI_OF_SECOND:
        return this.withNano(1000000 * b);
      case ChronoField.MILLI_OF_DAY:
        return LocalTime.ofNanoOfDay(1000000 * b);
      case ChronoField.SECOND_OF_MINUTE:
        return this.withSecond(b);
      case ChronoField.SECOND_OF_DAY:
        return this.plusSeconds(b - this.toSecondOfDay());
      case ChronoField.MINUTE_OF_HOUR:
        return this.withMinute(b);
      case ChronoField.MINUTE_OF_DAY:
        return this.plusMinutes(b - (60 * this._hour + this._minute));
      case ChronoField.HOUR_OF_AMPM:
        return this.plusHours(b - MathUtil.intMod(this._hour, 12));
      case ChronoField.CLOCK_HOUR_OF_AMPM:
        return this.plusHours((12 === b ? 0 : b) - MathUtil.intMod(this._hour, 12));
      case ChronoField.HOUR_OF_DAY:
        return this.withHour(b);
      case ChronoField.CLOCK_HOUR_OF_DAY:
        return this.withHour(24 === b ? 0 : b);
      case ChronoField.AMPM_OF_DAY:
        return this.plusHours(12 * (b - MathUtil.intDiv(this._hour, 12)));
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.adjustInto(this, b);
};
LocalTime.prototype.withHour = function(a) {
  a = void 0 === a ? 0 : a;
  return this._hour === a ? this : new LocalTime(a, this._minute, this._second, this._nano);
};
LocalTime.prototype.withMinute = function(a) {
  a = void 0 === a ? 0 : a;
  return this._minute === a ? this : new LocalTime(this._hour, a, this._second, this._nano);
};
LocalTime.prototype.withSecond = function(a) {
  a = void 0 === a ? 0 : a;
  return this._second === a ? this : new LocalTime(this._hour, this._minute, a, this._nano);
};
LocalTime.prototype.withNano = function(a) {
  a = void 0 === a ? 0 : a;
  return this._nano === a ? this : new LocalTime(this._hour, this._minute, this._second, a);
};
LocalTime.prototype.truncatedTo = function(a) {
  requireNonNull(a, "unit");
  if (a === ChronoUnit.NANOS) {
    return this;
  }
  a = a.duration();
  if (a.seconds() > LocalTime.SECONDS_PER_DAY) {
    throw new DateTimeException("Unit is too large to be used for truncation");
  }
  a = a.toNanos();
  if (0 !== MathUtil.intMod(LocalTime.NANOS_PER_DAY, a)) {
    throw new DateTimeException("Unit must divide into a standard day without remainder");
  }
  var b = this.toNanoOfDay();
  return LocalTime.ofNanoOfDay(MathUtil.intDiv(b, a) * a);
};
LocalTime.prototype.plusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.addTo(this);
};
LocalTime.prototype.plusAmountUnit = function(a, b) {
  requireNonNull(b, "unit");
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.NANOS:
        return this.plusNanos(a);
      case ChronoUnit.MICROS:
        return this.plusNanos(1000 * MathUtil.intMod(a, LocalTime.MICROS_PER_DAY));
      case ChronoUnit.MILLIS:
        return this.plusNanos(1000000 * MathUtil.intMod(a, LocalTime.MILLIS_PER_DAY));
      case ChronoUnit.SECONDS:
        return this.plusSeconds(a);
      case ChronoUnit.MINUTES:
        return this.plusMinutes(a);
      case ChronoUnit.HOURS:
        return this.plusHours(a);
      case ChronoUnit.HALF_DAYS:
        return this.plusHours(12 * MathUtil.intMod(a, 2));
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.addTo(this, a);
};
LocalTime.prototype.plusHours = function(a) {
  if (0 === a) {
    return this;
  }
  a = MathUtil.intMod(MathUtil.intMod(a, LocalTime.HOURS_PER_DAY) + this._hour + LocalTime.HOURS_PER_DAY, LocalTime.HOURS_PER_DAY);
  return new LocalTime(a, this._minute, this._second, this._nano);
};
LocalTime.prototype.plusMinutes = function(a) {
  if (0 === a) {
    return this;
  }
  var b = this._hour * LocalTime.MINUTES_PER_HOUR + this._minute;
  a = MathUtil.intMod(MathUtil.intMod(a, LocalTime.MINUTES_PER_DAY) + b + LocalTime.MINUTES_PER_DAY, LocalTime.MINUTES_PER_DAY);
  if (b === a) {
    return this;
  }
  b = MathUtil.intDiv(a, LocalTime.MINUTES_PER_HOUR);
  a = MathUtil.intMod(a, LocalTime.MINUTES_PER_HOUR);
  return new LocalTime(b, a, this._second, this._nano);
};
LocalTime.prototype.plusSeconds = function(a) {
  if (0 === a) {
    return this;
  }
  var b = this._hour * LocalTime.SECONDS_PER_HOUR + this._minute * LocalTime.SECONDS_PER_MINUTE + this._second;
  a = MathUtil.intMod(MathUtil.intMod(a, LocalTime.SECONDS_PER_DAY) + b + LocalTime.SECONDS_PER_DAY, LocalTime.SECONDS_PER_DAY);
  if (b === a) {
    return this;
  }
  b = MathUtil.intDiv(a, LocalTime.SECONDS_PER_HOUR);
  var c = MathUtil.intMod(MathUtil.intDiv(a, LocalTime.SECONDS_PER_MINUTE), LocalTime.MINUTES_PER_HOUR);
  a = MathUtil.intMod(a, LocalTime.SECONDS_PER_MINUTE);
  return new LocalTime(b, c, a, this._nano);
};
LocalTime.prototype.plusNanos = function(a) {
  if (0 === a) {
    return this;
  }
  var b = this.toNanoOfDay();
  a = MathUtil.intMod(MathUtil.intMod(a, LocalTime.NANOS_PER_DAY) + b + LocalTime.NANOS_PER_DAY, LocalTime.NANOS_PER_DAY);
  if (b === a) {
    return this;
  }
  b = MathUtil.intDiv(a, LocalTime.NANOS_PER_HOUR);
  var c = MathUtil.intMod(MathUtil.intDiv(a, LocalTime.NANOS_PER_MINUTE), LocalTime.MINUTES_PER_HOUR), d = MathUtil.intMod(MathUtil.intDiv(a, LocalTime.NANOS_PER_SECOND), LocalTime.SECONDS_PER_MINUTE);
  a = MathUtil.intMod(a, LocalTime.NANOS_PER_SECOND);
  return new LocalTime(b, c, d, a);
};
LocalTime.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.subtractFrom(this);
};
LocalTime.prototype.minusAmountUnit = function(a, b) {
  requireNonNull(b, "unit");
  return this.plusAmountUnit(-1 * a, b);
};
LocalTime.prototype.minusHours = function(a) {
  return this.plusHours(-1 * MathUtil.intMod(a, LocalTime.HOURS_PER_DAY));
};
LocalTime.prototype.minusMinutes = function(a) {
  return this.plusMinutes(-1 * MathUtil.intMod(a, LocalTime.MINUTES_PER_DAY));
};
LocalTime.prototype.minusSeconds = function(a) {
  return this.plusSeconds(-1 * MathUtil.intMod(a, LocalTime.SECONDS_PER_DAY));
};
LocalTime.prototype.minusNanos = function(a) {
  return this.plusNanos(-1 * MathUtil.intMod(a, LocalTime.NANOS_PER_DAY));
};
LocalTime.prototype.query = function(a) {
  requireNonNull(a, "query");
  return a === TemporalQueries.precision() ? ChronoUnit.NANOS : a === TemporalQueries.localTime() ? this : a === TemporalQueries.chronology() || a === TemporalQueries.zoneId() || a === TemporalQueries.zone() || a === TemporalQueries.offset() || a === TemporalQueries.localDate() ? 
  null : a.queryFrom(this);
};
LocalTime.prototype.adjustInto = function(a) {
  return a.with(LocalTime.NANO_OF_DAY, this.toNanoOfDay());
};
LocalTime.prototype.until = function(a, b) {
  requireNonNull(a, "endExclusive");
  requireNonNull(b, "unit");
  a = LocalTime.from(a);
  if (b instanceof ChronoUnit) {
    a = a.toNanoOfDay() - this.toNanoOfDay();
    switch(b) {
      case ChronoUnit.NANOS:
        return a;
      case ChronoUnit.MICROS:
        return MathUtil.intDiv(a, 1000);
      case ChronoUnit.MILLIS:
        return MathUtil.intDiv(a, 1000000);
      case ChronoUnit.SECONDS:
        return MathUtil.intDiv(a, LocalTime.NANOS_PER_SECOND);
      case ChronoUnit.MINUTES:
        return MathUtil.intDiv(a, LocalTime.NANOS_PER_MINUTE);
      case ChronoUnit.HOURS:
        return MathUtil.intDiv(a, LocalTime.NANOS_PER_HOUR);
      case ChronoUnit.HALF_DAYS:
        return MathUtil.intDiv(a, 12 * LocalTime.NANOS_PER_HOUR);
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.between(this, a);
};
LocalTime.prototype.atDate = function(a) {
  return LocalDateTime.of(a, this);
};
LocalTime.prototype.toSecondOfDay = function() {
  var a = this._hour * LocalTime.SECONDS_PER_HOUR;
  a += this._minute * LocalTime.SECONDS_PER_MINUTE;
  return a += this._second;
};
LocalTime.prototype.toNanoOfDay = function() {
  var a = this._hour * LocalTime.NANOS_PER_HOUR;
  a += this._minute * LocalTime.NANOS_PER_MINUTE;
  a += this._second * LocalTime.NANOS_PER_SECOND;
  return a += this._nano;
};
LocalTime.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, LocalTime, "other");
  var b = MathUtil.compareNumbers(this._hour, a._hour);
  0 === b && (b = MathUtil.compareNumbers(this._minute, a._minute), 0 === b && (b = MathUtil.compareNumbers(this._second, a._second), 0 === b && (b = MathUtil.compareNumbers(this._nano, a._nano))));
  return b;
};
LocalTime.prototype.isAfter = function(a) {
  return 0 < this.compareTo(a);
};
LocalTime.prototype.isBefore = function(a) {
  return 0 > this.compareTo(a);
};
LocalTime.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof LocalTime ? this._hour === a._hour && this._minute === a._minute && this._second === a._second && this._nano === a._nano : !1;
};
LocalTime.prototype.hashCode = function() {
  var a = this.toNanoOfDay();
  return MathUtil.hash(a);
};
LocalTime.prototype.toString = function() {
  var a = this._hour;
  var b = this._minute, c = this._second, d = this._nano;
  a = (10 > a ? "0" : "") + a + (10 > b ? ":0" : ":") + b;
  if (0 < c || 0 < d) {
    a += 10 > c ? ":0" : ":", a += c, 0 < d && (a += ".", a = 0 === MathUtil.intMod(d, 1000000) ? a + ("" + (MathUtil.intDiv(d, 1000000) + 1000)).substring(1) : 0 === MathUtil.intMod(d, 1000) ? a + ("" + (MathUtil.intDiv(d, 1000) + 1000000)).substring(1) : a + ("" + (d + 1000000000)).substring(1));
  }
  return a;
};
LocalTime.prototype.toJSON = function() {
  return this.toString();
};
LocalTime.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  return a.format(this);
};
$jscomp.global.Object.defineProperties(LocalTime, {HOURS:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.HOURS;
  LocalTime.HOURS = [];
  for (var a = 0; 24 > a; a++) {
    LocalTime.of(a, 0, 0, 0);
  }
  return LocalTime.HOURS;
}}, MIN:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.MIN;
  LocalTime.MIN = LocalTime.HOURS[0];
  return LocalTime.MIN;
}}, MAX:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.MAX;
  LocalTime.MAX = new LocalTime(23, 59, 59, 999999999);
  return LocalTime.MAX;
}}, MIDNIGHT:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.MIDNIGHT;
  LocalTime.MIDNIGHT = LocalTime.HOURS[0];
  return LocalTime.MIDNIGHT;
}}, NOON:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.NOON;
  LocalTime.NOON = LocalTime.HOURS[12];
  return LocalTime.NOON;
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.FROM;
  LocalTime.FROM = createTemporalQuery("LocalTime.FROM", function(a) {
    return LocalTime.from(a);
  });
  return LocalTime.FROM;
}}, HOURS_PER_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.HOURS_PER_DAY;
  LocalTime.HOURS_PER_DAY = 24;
  return LocalTime.HOURS_PER_DAY;
}}, MINUTES_PER_HOUR:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.MINUTES_PER_HOUR;
  LocalTime.MINUTES_PER_HOUR = 60;
  return LocalTime.MINUTES_PER_HOUR;
}}, MINUTES_PER_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.MINUTES_PER_DAY;
  LocalTime.MINUTES_PER_DAY = LocalTime.MINUTES_PER_HOUR * LocalTime.HOURS_PER_DAY;
  return LocalTime.MINUTES_PER_DAY;
}}, SECONDS_PER_MINUTE:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.SECONDS_PER_MINUTE;
  LocalTime.SECONDS_PER_MINUTE = 60;
  return LocalTime.SECONDS_PER_MINUTE;
}}, SECONDS_PER_HOUR:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.SECONDS_PER_HOUR;
  LocalTime.SECONDS_PER_HOUR = LocalTime.SECONDS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
  return LocalTime.SECONDS_PER_HOUR;
}}, SECONDS_PER_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.SECONDS_PER_DAY;
  LocalTime.SECONDS_PER_DAY = LocalTime.SECONDS_PER_HOUR * LocalTime.HOURS_PER_DAY;
  return LocalTime.SECONDS_PER_DAY;
}}, MILLIS_PER_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.MILLIS_PER_DAY;
  LocalTime.MILLIS_PER_DAY = 1000 * LocalTime.SECONDS_PER_DAY;
  return LocalTime.MILLIS_PER_DAY;
}}, MICROS_PER_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.MICROS_PER_DAY;
  LocalTime.MICROS_PER_DAY = 1000000 * LocalTime.SECONDS_PER_DAY;
  return LocalTime.MICROS_PER_DAY;
}}, NANOS_PER_SECOND:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.NANOS_PER_SECOND;
  LocalTime.NANOS_PER_SECOND = 1000000000;
  return LocalTime.NANOS_PER_SECOND;
}}, NANOS_PER_MINUTE:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.NANOS_PER_MINUTE;
  LocalTime.NANOS_PER_MINUTE = LocalTime.NANOS_PER_SECOND * LocalTime.SECONDS_PER_MINUTE;
  return LocalTime.NANOS_PER_MINUTE;
}}, NANOS_PER_HOUR:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.NANOS_PER_HOUR;
  LocalTime.NANOS_PER_HOUR = LocalTime.NANOS_PER_MINUTE * LocalTime.MINUTES_PER_HOUR;
  return LocalTime.NANOS_PER_HOUR;
}}, NANOS_PER_DAY:{configurable:!0, enumerable:!0, get:function() {
  delete LocalTime.NANOS_PER_DAY;
  LocalTime.NANOS_PER_DAY = LocalTime.NANOS_PER_HOUR * LocalTime.HOURS_PER_DAY;
  return LocalTime.NANOS_PER_DAY;
}}});
var LocalDateTime = function(a, b) {
  ChronoLocalDateTime.call(this);
  requireInstance(a, LocalDate, "date");
  requireInstance(b, LocalTime, "time");
  this._date = a;
  this._time = b;
};
$jscomp.inherits(LocalDateTime, ChronoLocalDateTime);
LocalDateTime.now = function(a) {
  return null == a ? LocalDateTime._now(Clock.systemDefaultZone()) : a instanceof Clock ? LocalDateTime._now(a) : LocalDateTime._now(Clock.system(a));
};
LocalDateTime._now = function(a) {
  requireNonNull(a, "clock");
  return LocalDateTime.ofInstant(a.instant(), a.zone());
};
LocalDateTime._ofEpochMillis = function(a, b) {
  var c = MathUtil.floorDiv(a, 1000) + b.totalSeconds();
  b = MathUtil.floorDiv(c, LocalTime.SECONDS_PER_DAY);
  c = MathUtil.floorMod(c, LocalTime.SECONDS_PER_DAY);
  a = 1000000 * MathUtil.floorMod(a, 1000);
  b = LocalDate.ofEpochDay(b);
  a = LocalTime.ofSecondOfDay(c, a);
  return new LocalDateTime(b, a);
};
LocalDateTime.of = function(a, b, c, d, e, f, g) {
  return void 0 == c ? LocalDateTime.ofDateAndTime(a, b) : LocalDateTime.ofNumbers(a, b, c, d, e, f, g);
};
LocalDateTime.ofNumbers = function(a, b, c, d, e, f, g) {
  d = void 0 === d ? 0 : d;
  e = void 0 === e ? 0 : e;
  f = void 0 === f ? 0 : f;
  g = void 0 === g ? 0 : g;
  a = LocalDate.of(a, b, c);
  d = LocalTime.of(d, e, f, g);
  return new LocalDateTime(a, d);
};
LocalDateTime.ofDateAndTime = function(a, b) {
  requireNonNull(a, "date");
  requireNonNull(b, "time");
  return new LocalDateTime(a, b);
};
LocalDateTime.ofInstant = function(a, b) {
  b = void 0 === b ? ZoneId.systemDefault() : b;
  requireNonNull(a, "instant");
  requireInstance(a, Instant, "instant");
  requireNonNull(b, "zone");
  b = b.rules().offset(a);
  return LocalDateTime.ofEpochSecond(a.epochSecond(), a.nano(), b);
};
LocalDateTime.ofEpochSecond = function(a, b, c) {
  a = void 0 === a ? 0 : a;
  b = void 0 === b ? 0 : b;
  2 === arguments.length && b instanceof ZoneOffset && (c = b, b = 0);
  requireNonNull(c, "offset");
  var d = a + c.totalSeconds(), e = MathUtil.floorDiv(d, LocalTime.SECONDS_PER_DAY);
  d = MathUtil.floorMod(d, LocalTime.SECONDS_PER_DAY);
  e = LocalDate.ofEpochDay(e);
  d = LocalTime.ofSecondOfDay(d, b);
  return new LocalDateTime(e, d);
};
LocalDateTime.from = function(a) {
  requireNonNull(a, "temporal");
  if (a instanceof LocalDateTime) {
    return a;
  }
  if (a instanceof ZonedDateTime) {
    return a.toLocalDateTime();
  }
  try {
    var b = LocalDate.from(a), c = LocalTime.from(a);
    return new LocalDateTime(b, c);
  } catch (d) {
    throw new DateTimeException("Unable to obtain LocalDateTime TemporalAccessor: " + a + ", type " + (null != a.constructor ? a.constructor.name : ""));
  }
};
LocalDateTime.parse = function(a, b) {
  b = void 0 === b ? DateTimeFormatter.ISO_LOCAL_DATE_TIME : b;
  requireNonNull(b, "formatter");
  return b.parse(a, LocalDateTime.FROM);
};
LocalDateTime.prototype._withDateTime = function(a, b) {
  return this._date === a && this._time === b ? this : new LocalDateTime(a, b);
};
LocalDateTime.prototype.isSupported = function(a) {
  return a instanceof ChronoField || a instanceof ChronoUnit ? a.isDateBased() || a.isTimeBased() : null != a && a.isSupportedBy(this);
};
LocalDateTime.prototype.range = function(a) {
  return a instanceof ChronoField ? a.isTimeBased() ? this._time.range(a) : this._date.range(a) : a.rangeRefinedBy(this);
};
LocalDateTime.prototype.get = function(a) {
  return a instanceof ChronoField ? a.isTimeBased() ? this._time.get(a) : this._date.get(a) : ChronoLocalDateTime.prototype.get.call(this, a);
};
LocalDateTime.prototype.getLong = function(a) {
  requireNonNull(a, "field");
  return a instanceof ChronoField ? a.isTimeBased() ? this._time.getLong(a) : this._date.getLong(a) : a.getFrom(this);
};
LocalDateTime.prototype.year = function() {
  return this._date.year();
};
LocalDateTime.prototype.monthValue = function() {
  return this._date.monthValue();
};
LocalDateTime.prototype.month = function() {
  return this._date.month();
};
LocalDateTime.prototype.dayOfMonth = function() {
  return this._date.dayOfMonth();
};
LocalDateTime.prototype.dayOfYear = function() {
  return this._date.dayOfYear();
};
LocalDateTime.prototype.dayOfWeek = function() {
  return this._date.dayOfWeek();
};
LocalDateTime.prototype.hour = function() {
  return this._time.hour();
};
LocalDateTime.prototype.minute = function() {
  return this._time.minute();
};
LocalDateTime.prototype.second = function() {
  return this._time.second();
};
LocalDateTime.prototype.nano = function() {
  return this._time.nano();
};
LocalDateTime.prototype.withAdjuster = function(a) {
  requireNonNull(a, "adjuster");
  if (a instanceof LocalDate) {
    return this._withDateTime(a, this._time);
  }
  if (a instanceof LocalTime) {
    return this._withDateTime(this._date, a);
  }
  if (a instanceof LocalDateTime) {
    return a;
  }
  assert("function" === typeof a.adjustInto, "adjuster", IllegalArgumentException);
  return a.adjustInto(this);
};
LocalDateTime.prototype.withFieldValue = function(a, b) {
  requireNonNull(a, "field");
  return a instanceof ChronoField ? a.isTimeBased() ? this._withDateTime(this._date, this._time.with(a, b)) : this._withDateTime(this._date.with(a, b), this._time) : a.adjustInto(this, b);
};
LocalDateTime.prototype.withYear = function(a) {
  return this._withDateTime(this._date.withYear(a), this._time);
};
LocalDateTime.prototype.withMonth = function(a) {
  return this._withDateTime(this._date.withMonth(a), this._time);
};
LocalDateTime.prototype.withDayOfMonth = function(a) {
  return this._withDateTime(this._date.withDayOfMonth(a), this._time);
};
LocalDateTime.prototype.withDayOfYear = function(a) {
  return this._withDateTime(this._date.withDayOfYear(a), this._time);
};
LocalDateTime.prototype.withHour = function(a) {
  a = this._time.withHour(a);
  return this._withDateTime(this._date, a);
};
LocalDateTime.prototype.withMinute = function(a) {
  a = this._time.withMinute(a);
  return this._withDateTime(this._date, a);
};
LocalDateTime.prototype.withSecond = function(a) {
  a = this._time.withSecond(a);
  return this._withDateTime(this._date, a);
};
LocalDateTime.prototype.withNano = function(a) {
  a = this._time.withNano(a);
  return this._withDateTime(this._date, a);
};
LocalDateTime.prototype.truncatedTo = function(a) {
  return this._withDateTime(this._date, this._time.truncatedTo(a));
};
LocalDateTime.prototype.plusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.addTo(this);
};
LocalDateTime.prototype.plusAmountUnit = function(a, b) {
  requireNonNull(b, "unit");
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.NANOS:
        return this.plusNanos(a);
      case ChronoUnit.MICROS:
        return this.plusDays(MathUtil.intDiv(a, LocalTime.MICROS_PER_DAY)).plusNanos(1000 * MathUtil.intMod(a, LocalTime.MICROS_PER_DAY));
      case ChronoUnit.MILLIS:
        return this.plusDays(MathUtil.intDiv(a, LocalTime.MILLIS_PER_DAY)).plusNanos(1000000 * MathUtil.intMod(a, LocalTime.MILLIS_PER_DAY));
      case ChronoUnit.SECONDS:
        return this.plusSeconds(a);
      case ChronoUnit.MINUTES:
        return this.plusMinutes(a);
      case ChronoUnit.HOURS:
        return this.plusHours(a);
      case ChronoUnit.HALF_DAYS:
        return this.plusDays(MathUtil.intDiv(a, 256)).plusHours(12 * MathUtil.intMod(a, 256));
    }
    return this._withDateTime(this._date.plus(a, b), this._time);
  }
  return b.addTo(this, a);
};
LocalDateTime.prototype.plusYears = function(a) {
  a = this._date.plusYears(a);
  return this._withDateTime(a, this._time);
};
LocalDateTime.prototype.plusMonths = function(a) {
  a = this._date.plusMonths(a);
  return this._withDateTime(a, this._time);
};
LocalDateTime.prototype.plusWeeks = function(a) {
  a = this._date.plusWeeks(a);
  return this._withDateTime(a, this._time);
};
LocalDateTime.prototype.plusDays = function(a) {
  a = this._date.plusDays(a);
  return this._withDateTime(a, this._time);
};
LocalDateTime.prototype.plusHours = function(a) {
  return this._plusWithOverflow(this._date, a, 0, 0, 0, 1);
};
LocalDateTime.prototype.plusMinutes = function(a) {
  return this._plusWithOverflow(this._date, 0, a, 0, 0, 1);
};
LocalDateTime.prototype.plusSeconds = function(a) {
  return this._plusWithOverflow(this._date, 0, 0, a, 0, 1);
};
LocalDateTime.prototype.plusNanos = function(a) {
  return this._plusWithOverflow(this._date, 0, 0, 0, a, 1);
};
LocalDateTime.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.subtractFrom(this);
};
LocalDateTime.prototype.minusAmountUnit = function(a, b) {
  requireNonNull(b, "unit");
  return this.plusAmountUnit(-1 * a, b);
};
LocalDateTime.prototype.minusYears = function(a) {
  return this.plusYears(-1 * a);
};
LocalDateTime.prototype.minusMonths = function(a) {
  return this.plusMonths(-1 * a);
};
LocalDateTime.prototype.minusWeeks = function(a) {
  return this.plusWeeks(-1 * a);
};
LocalDateTime.prototype.minusDays = function(a) {
  return this.plusDays(-1 * a);
};
LocalDateTime.prototype.minusHours = function(a) {
  return this._plusWithOverflow(this._date, a, 0, 0, 0, -1);
};
LocalDateTime.prototype.minusMinutes = function(a) {
  return this._plusWithOverflow(this._date, 0, a, 0, 0, -1);
};
LocalDateTime.prototype.minusSeconds = function(a) {
  return this._plusWithOverflow(this._date, 0, 0, a, 0, -1);
};
LocalDateTime.prototype.minusNanos = function(a) {
  return this._plusWithOverflow(this._date, 0, 0, 0, a, -1);
};
LocalDateTime.prototype._plusWithOverflow = function(a, b, c, d, e, f) {
  if (0 === (b | c | d | e)) {
    return this._withDateTime(a, this._time);
  }
  var g = MathUtil.intDiv(e, LocalTime.NANOS_PER_DAY) + MathUtil.intDiv(d, LocalTime.SECONDS_PER_DAY) + MathUtil.intDiv(c, LocalTime.MINUTES_PER_DAY) + MathUtil.intDiv(b, LocalTime.HOURS_PER_DAY);
  g *= f;
  c = MathUtil.intMod(e, LocalTime.NANOS_PER_DAY) + MathUtil.intMod(d, LocalTime.SECONDS_PER_DAY) * LocalTime.NANOS_PER_SECOND + MathUtil.intMod(c, LocalTime.MINUTES_PER_DAY) * LocalTime.NANOS_PER_MINUTE + MathUtil.intMod(b, 
  LocalTime.HOURS_PER_DAY) * LocalTime.NANOS_PER_HOUR;
  b = this._time.toNanoOfDay();
  c = c * f + b;
  g += MathUtil.floorDiv(c, LocalTime.NANOS_PER_DAY);
  f = MathUtil.floorMod(c, LocalTime.NANOS_PER_DAY);
  f = f === b ? this._time : LocalTime.ofNanoOfDay(f);
  return this._withDateTime(a.plusDays(g), f);
};
LocalDateTime.prototype.query = function(a) {
  requireNonNull(a, "query");
  return a === TemporalQueries.localDate() ? this.toLocalDate() : ChronoLocalDateTime.prototype.query.call(this, a);
};
LocalDateTime.prototype.adjustInto = function(a) {
  return ChronoLocalDateTime.prototype.adjustInto.call(this, a);
};
LocalDateTime.prototype.until = function(a, b) {
  requireNonNull(a, "endExclusive");
  requireNonNull(b, "unit");
  a = LocalDateTime.from(a);
  if (b instanceof ChronoUnit) {
    if (b.isTimeBased()) {
      var c = this._date.daysUntil(a._date);
      a = a._time.toNanoOfDay() - this._time.toNanoOfDay();
      0 < c && 0 > a ? (c--, a += LocalTime.NANOS_PER_DAY) : 0 > c && 0 < a && (c++, a -= LocalTime.NANOS_PER_DAY);
      switch(b) {
        case ChronoUnit.NANOS:
          return c = MathUtil.safeMultiply(c, LocalTime.NANOS_PER_DAY), MathUtil.safeAdd(c, a);
        case ChronoUnit.MICROS:
          return c = MathUtil.safeMultiply(c, LocalTime.MICROS_PER_DAY), MathUtil.safeAdd(c, MathUtil.intDiv(a, 1000));
        case ChronoUnit.MILLIS:
          return c = MathUtil.safeMultiply(c, LocalTime.MILLIS_PER_DAY), MathUtil.safeAdd(c, MathUtil.intDiv(a, 1000000));
        case ChronoUnit.SECONDS:
          return c = MathUtil.safeMultiply(c, LocalTime.SECONDS_PER_DAY), MathUtil.safeAdd(c, MathUtil.intDiv(a, LocalTime.NANOS_PER_SECOND));
        case ChronoUnit.MINUTES:
          return c = MathUtil.safeMultiply(c, LocalTime.MINUTES_PER_DAY), MathUtil.safeAdd(c, MathUtil.intDiv(a, LocalTime.NANOS_PER_MINUTE));
        case ChronoUnit.HOURS:
          return c = MathUtil.safeMultiply(c, LocalTime.HOURS_PER_DAY), MathUtil.safeAdd(c, MathUtil.intDiv(a, LocalTime.NANOS_PER_HOUR));
        case ChronoUnit.HALF_DAYS:
          return c = MathUtil.safeMultiply(c, 2), MathUtil.safeAdd(c, MathUtil.intDiv(a, 12 * LocalTime.NANOS_PER_HOUR));
      }
      throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
    }
    c = a._date;
    a = a._time;
    c.isAfter(this._date) && a.isBefore(this._time) ? c = c.minusDays(1) : c.isBefore(this._date) && a.isAfter(this._time) && (c = c.plusDays(1));
    return this._date.until(c, b);
  }
  return b.between(this, a);
};
LocalDateTime.prototype.atZone = function(a) {
  return ZonedDateTime.of(this, a);
};
LocalDateTime.prototype.toLocalDate = function() {
  return this._date;
};
LocalDateTime.prototype.toLocalTime = function() {
  return this._time;
};
LocalDateTime.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, LocalDateTime, "other");
  return this._compareTo0(a);
};
LocalDateTime.prototype._compareTo0 = function(a) {
  var b = this._date.compareTo(a.toLocalDate());
  0 === b && (b = this._time.compareTo(a.toLocalTime()));
  return b;
};
LocalDateTime.prototype.isAfter = function(a) {
  return 0 < this.compareTo(a);
};
LocalDateTime.prototype.isBefore = function(a) {
  return 0 > this.compareTo(a);
};
LocalDateTime.prototype.isEqual = function(a) {
  return 0 === this.compareTo(a);
};
LocalDateTime.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof LocalDateTime ? this._date.equals(a._date) && this._time.equals(a._time) : !1;
};
LocalDateTime.prototype.hashCode = function() {
  return this._date.hashCode() ^ this._time.hashCode();
};
LocalDateTime.prototype.toString = function() {
  return this._date.toString() + "T" + this._time.toString();
};
LocalDateTime.prototype.toJSON = function() {
  return this.toString();
};
LocalDateTime.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  return a.format(this);
};
$jscomp.global.Object.defineProperties(LocalDateTime, {MIN:{configurable:!0, enumerable:!0, get:function() {
  return LocalDateTime.of(LocalDate.MIN, LocalTime.MIN);
}}, MAX:{configurable:!0, enumerable:!0, get:function() {
  return LocalDateTime.of(LocalDate.MAX, LocalTime.MAX);
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("LocalDateTime.FROM", function(a) {
    return LocalDateTime.from(a);
  });
}}});
var Month = function(a, b) {
  TemporalAccessor.call(this);
  this._value = MathUtil.safeToInt(a);
  this._name = b;
};
$jscomp.inherits(Month, TemporalAccessor);
Month.prototype.value = function() {
  return this._value;
};
Month.prototype.ordinal = function() {
  return this._value - 1;
};
Month.prototype.name = function() {
  return this._name;
};
Month.prototype.getDisplayName = function(a, b) {
  throw new IllegalArgumentException("Pattern using (localized) text not implemented yet!");
};
Month.prototype.isSupported = function(a) {
  return null === a ? !1 : a instanceof ChronoField ? a === ChronoField.MONTH_OF_YEAR : null != a && a.isSupportedBy(this);
};
Month.prototype.get = function(a) {
  return a === ChronoField.MONTH_OF_YEAR ? this.value() : this.range(a).checkValidIntValue(this.getLong(a), a);
};
Month.prototype.getLong = function(a) {
  if (a === ChronoField.MONTH_OF_YEAR) {
    return this.value();
  }
  if (a instanceof ChronoField) {
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
Month.prototype.plus = function(a) {
  a = MathUtil.intMod(a, 12) + 12;
  a = MathUtil.intMod(this.value() + a, 12);
  return Month.of(0 === a ? 12 : a);
};
Month.prototype.minus = function(a) {
  return this.plus(-1 * MathUtil.intMod(a, 12));
};
Month.prototype.length = function(a) {
  switch(this) {
    case Month.FEBRUARY:
      return a ? 29 : 28;
    case Month.APRIL:
    case Month.JUNE:
    case Month.SEPTEMBER:
    case Month.NOVEMBER:
      return 30;
    default:
      return 31;
  }
};
Month.prototype.minLength = function() {
  switch(this) {
    case Month.FEBRUARY:
      return 28;
    case Month.APRIL:
    case Month.JUNE:
    case Month.SEPTEMBER:
    case Month.NOVEMBER:
      return 30;
    default:
      return 31;
  }
};
Month.prototype.maxLength = function() {
  switch(this) {
    case Month.FEBRUARY:
      return 29;
    case Month.APRIL:
    case Month.JUNE:
    case Month.SEPTEMBER:
    case Month.NOVEMBER:
      return 30;
    default:
      return 31;
  }
};
Month.prototype.firstDayOfYear = function(a) {
  a = a ? 1 : 0;
  switch(this) {
    case Month.JANUARY:
      return 1;
    case Month.FEBRUARY:
      return 32;
    case Month.MARCH:
      return 60 + a;
    case Month.APRIL:
      return 91 + a;
    case Month.MAY:
      return 121 + a;
    case Month.JUNE:
      return 152 + a;
    case Month.JULY:
      return 182 + a;
    case Month.AUGUST:
      return 213 + a;
    case Month.SEPTEMBER:
      return 244 + a;
    case Month.OCTOBER:
      return 274 + a;
    case Month.NOVEMBER:
      return 305 + a;
    default:
      return 335 + a;
  }
};
Month.prototype.firstMonthOfQuarter = function() {
  switch(this) {
    case Month.JANUARY:
    case Month.FEBRUARY:
    case Month.MARCH:
      return Month.JANUARY;
    case Month.APRIL:
    case Month.MAY:
    case Month.JUNE:
      return Month.APRIL;
    case Month.JULY:
    case Month.AUGUST:
    case Month.SEPTEMBER:
      return Month.JULY;
    default:
      return Month.OCTOBER;
  }
};
Month.prototype.query = function(a) {
  assert(null != a, "query() parameter must not be null", DateTimeException);
  return a === TemporalQueries.chronology() ? IsoChronology.INSTANCE : a === TemporalQueries.precision() ? ChronoUnit.MONTHS : TemporalAccessor.prototype.query.call(this, a);
};
Month.prototype.toString = function() {
  switch(this) {
    case Month.JANUARY:
      return "JANUARY";
    case Month.FEBRUARY:
      return "FEBRUARY";
    case Month.MARCH:
      return "MARCH";
    case Month.APRIL:
      return "APRIL";
    case Month.MAY:
      return "MAY";
    case Month.JUNE:
      return "JUNE";
    case Month.JULY:
      return "JULY";
    case Month.AUGUST:
      return "AUGUST";
    case Month.SEPTEMBER:
      return "SEPTEMBER";
    case Month.OCTOBER:
      return "OCTOBER";
    case Month.NOVEMBER:
      return "NOVEMBER";
    case Month.DECEMBER:
      return "DECEMBER";
    default:
      return "unknown Month, value: " + this.value();
  }
};
Month.prototype.toJSON = function() {
  return this.toString();
};
Month.prototype.adjustInto = function(a) {
  return a.with(ChronoField.MONTH_OF_YEAR, this.value());
};
Month.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, Month, "other");
  return this._value - a._value;
};
Month.prototype.equals = function(a) {
  return this === a;
};
Month.valueOf = function(a) {
  var b = 0;
  for (b; b < Month.MONTHS.length && Month.MONTHS[b].name() !== a; b++) {
  }
  return Month.of(b + 1);
};
Month.values = function() {
  return Month.MONTHS.slice();
};
Month.of = function(a) {
  (1 > a || 12 < a) && assert(!1, "Invalid value for MonthOfYear: " + a, DateTimeException);
  return Month.MONTHS[a - 1];
};
Month.from = function(a) {
  if (a instanceof Month) {
    return a;
  }
  try {
    return Month.of(a.get(ChronoField.MONTH_OF_YEAR));
  } catch (b) {
    throw new DateTimeException("Unable to obtain Month from TemporalAccessor: " + a + " of type " + (a && null != a.constructor ? a.constructor.name : ""), b);
  }
};
$jscomp.global.Object.defineProperties(Month, {JANUARY:{configurable:!0, enumerable:!0, get:function() {
  return new Month(1, "JANUARY");
}}, FEBRUARY:{configurable:!0, enumerable:!0, get:function() {
  return new Month(2, "FEBRUARY");
}}, MARCH:{configurable:!0, enumerable:!0, get:function() {
  return new Month(3, "MARCH");
}}, APRIL:{configurable:!0, enumerable:!0, get:function() {
  return new Month(4, "APRIL");
}}, MAY:{configurable:!0, enumerable:!0, get:function() {
  return new Month(5, "MAY");
}}, JUNE:{configurable:!0, enumerable:!0, get:function() {
  return new Month(6, "JUNE");
}}, JULY:{configurable:!0, enumerable:!0, get:function() {
  return new Month(7, "JULY");
}}, AUGUST:{configurable:!0, enumerable:!0, get:function() {
  return new Month(8, "AUGUST");
}}, SEPTEMBER:{configurable:!0, enumerable:!0, get:function() {
  return new Month(9, "SEPTEMBER");
}}, OCTOBER:{configurable:!0, enumerable:!0, get:function() {
  return new Month(10, "OCTOBER");
}}, NOVEMBER:{configurable:!0, enumerable:!0, get:function() {
  return new Month(11, "NOVEMBER");
}}, DECEMBER:{configurable:!0, enumerable:!0, get:function() {
  return new Month(12, "DECEMBER");
}}, MONTHS:{configurable:!0, enumerable:!0, get:function() {
  return [Month.JANUARY, Month.FEBRUARY, Month.MARCH, Month.APRIL, Month.MAY, Month.JUNE, Month.JULY, Month.AUGUST, Month.SEPTEMBER, Month.OCTOBER, Month.NOVEMBER, 
  Month.DECEMBER];
}}});
var MonthDay = function(a, b) {
  TemporalAccessor.call(this);
  this._month = MathUtil.safeToInt(a);
  this._day = MathUtil.safeToInt(b);
};
$jscomp.inherits(MonthDay, TemporalAccessor);
MonthDay.now = function(a) {
  return 0 === arguments.length ? MonthDay.now0() : 1 === arguments.length && a instanceof ZoneId ? MonthDay.nowZoneId(a) : MonthDay.nowClock(a);
};
MonthDay.now0 = function() {
  return MonthDay.nowClock(Clock.systemDefaultZone());
};
MonthDay.nowZoneId = function(a) {
  requireNonNull(a, "zone");
  return MonthDay.nowClock(Clock.system(a));
};
MonthDay.nowClock = function(a) {
  requireNonNull(a, "clock");
  a = LocalDate.now(a);
  return MonthDay.of(a.month(), a.dayOfMonth());
};
MonthDay.of = function(a, b) {
  return 2 === arguments.length && a instanceof Month ? MonthDay.ofMonthNumber(a, b) : MonthDay.ofNumberNumber(a, b);
};
MonthDay.ofMonthNumber = function(a, b) {
  requireNonNull(a, "month");
  ChronoField.DAY_OF_MONTH.checkValidValue(b);
  if (b > a.maxLength()) {
    throw new DateTimeException("Illegal value for DayOfMonth field, value " + b + " is not valid for month " + a.toString());
  }
  return new MonthDay(a.value(), b);
};
MonthDay.ofNumberNumber = function(a, b) {
  requireNonNull(a, "month");
  requireNonNull(b, "dayOfMonth");
  return MonthDay.of(Month.of(a), b);
};
MonthDay.from = function(a) {
  requireNonNull(a, "temporal");
  requireInstance(a, TemporalAccessor, "temporal");
  if (a instanceof MonthDay) {
    return a;
  }
  try {
    return MonthDay.of(a.get(ChronoField.MONTH_OF_YEAR), a.get(ChronoField.DAY_OF_MONTH));
  } catch (b) {
    throw new DateTimeException("Unable to obtain MonthDay from TemporalAccessor: " + a + ", type " + (a && null != a.constructor ? a.constructor.name : ""));
  }
};
MonthDay.parse = function(a, b) {
  return 1 === arguments.length ? MonthDay.parseString(a) : MonthDay.parseStringFormatter(a, b);
};
MonthDay.parseString = function(a) {
  return MonthDay.parseStringFormatter(a, MonthDay.MonthDayPARSER);
};
MonthDay.parseStringFormatter = function(a, b) {
  requireNonNull(a, "text");
  requireNonNull(b, "formatter");
  requireInstance(b, DateTimeFormatter, "formatter");
  return b.parse(a, MonthDay.FROM);
};
MonthDay.prototype.monthValue = function() {
  return this._month;
};
MonthDay.prototype.month = function() {
  return Month.of(this._month);
};
MonthDay.prototype.dayOfMonth = function() {
  return this._day;
};
MonthDay.prototype.isSupported = function(a) {
  return a instanceof ChronoField ? a === ChronoField.MONTH_OF_YEAR || a === ChronoField.DAY_OF_MONTH : null != a && a.isSupportedBy(this);
};
MonthDay.prototype.range = function(a) {
  return a === ChronoField.MONTH_OF_YEAR ? a.range() : a === ChronoField.DAY_OF_MONTH ? ValueRange.of(1, this.month().minLength(), this.month().maxLength()) : TemporalAccessor.prototype.range.call(this, a);
};
MonthDay.prototype.get = function(a) {
  return this.range(a).checkValidIntValue(this.getLong(a), a);
};
MonthDay.prototype.getLong = function(a) {
  requireNonNull(a, "field");
  if (a instanceof ChronoField) {
    switch(a) {
      case ChronoField.DAY_OF_MONTH:
        return this._day;
      case ChronoField.MONTH_OF_YEAR:
        return this._month;
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
MonthDay.prototype.isValidYear = function(a) {
  return !1 === (29 === this._day && 2 === this._month && !1 === Year.isLeap(a));
};
MonthDay.prototype.withMonth = function(a) {
  return this.with(Month.of(a));
};
MonthDay.prototype.with = function(a) {
  requireNonNull(a, "month");
  if (a.value() === this._month) {
    return this;
  }
  var b = Math.min(this._day, a.maxLength());
  return new MonthDay(a.value(), b);
};
MonthDay.prototype.withDayOfMonth = function(a) {
  return a === this._day ? this : MonthDay.of(this._month, a);
};
MonthDay.prototype.query = function(a) {
  requireNonNull(a, "query");
  requireInstance(a, TemporalQuery, "query");
  return a === TemporalQueries.chronology() ? IsoChronology.INSTANCE : TemporalAccessor.prototype.query.call(this, a);
};
MonthDay.prototype.adjustInto = function(a) {
  requireNonNull(a, "temporal");
  a = a.with(ChronoField.MONTH_OF_YEAR, this._month);
  return a.with(ChronoField.DAY_OF_MONTH, Math.min(a.range(ChronoField.DAY_OF_MONTH).maximum(), this._day));
};
MonthDay.prototype.atYear = function(a) {
  return LocalDate.of(a, this._month, this.isValidYear(a) ? this._day : 28);
};
MonthDay.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, MonthDay, "other");
  var b = this._month - a.monthValue();
  0 === b && (b = this._day - a.dayOfMonth());
  return b;
};
MonthDay.prototype.isAfter = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, MonthDay, "other");
  return 0 < this.compareTo(a);
};
MonthDay.prototype.isBefore = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, MonthDay, "other");
  return 0 > this.compareTo(a);
};
MonthDay.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof MonthDay ? this.monthValue() === a.monthValue() && this.dayOfMonth() === a.dayOfMonth() : !1;
};
MonthDay.prototype.toString = function() {
  return "--" + (10 > this._month ? "0" : "") + this._month + (10 > this._day ? "-0" : "-") + this._day;
};
MonthDay.prototype.toJSON = function() {
  return this.toString();
};
MonthDay.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  requireInstance(a, DateTimeFormatter, "formatter");
  return a.format(this);
};
$jscomp.global.Object.defineProperties(MonthDay, {MonthDayPARSER:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendLiteral("--").appendValue(ChronoField.MONTH_OF_YEAR, 2).appendLiteral("-").appendValue(ChronoField.DAY_OF_MONTH, 2).toFormatter();
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("MonthDay.FROM", function(a) {
    return MonthDay.from(a);
  });
}}});
var PATTERN = /([-+]?)P(?:([-+]?[0-9]+)Y)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)W)?(?:([-+]?[0-9]+)D)?/, Period = function(a, b, c) {
  TemporalAmount.call(this);
  a = MathUtil.safeToInt(a);
  b = MathUtil.safeToInt(b);
  c = MathUtil.safeToInt(c);
  this._years = a;
  this._months = b;
  this._days = c;
};
$jscomp.inherits(Period, TemporalAmount);
Period.ofYears = function(a) {
  return Period.create(a, 0, 0);
};
Period.ofMonths = function(a) {
  return Period.create(0, a, 0);
};
Period.ofWeeks = function(a) {
  return Period.create(0, 0, MathUtil.safeMultiply(a, 7));
};
Period.ofDays = function(a) {
  return Period.create(0, 0, a);
};
Period.of = function(a, b, c) {
  return Period.create(a, b, c);
};
Period.from = function(a) {
  if (a instanceof Period) {
    return a;
  }
  requireNonNull(a, "amount");
  for (var b = 0, c = 0, d = 0, e = a.units(), f = 0; f < e.length; f++) {
    var g = e[f], h = a.get(g);
    if (g === ChronoUnit.YEARS) {
      b = MathUtil.safeToInt(h);
    } else {
      if (g === ChronoUnit.MONTHS) {
        c = MathUtil.safeToInt(h);
      } else {
        if (g === ChronoUnit.DAYS) {
          d = MathUtil.safeToInt(h);
        } else {
          throw new DateTimeException("Unit must be Years, Months or Days, but was " + g);
        }
      }
    }
  }
  return Period.create(b, c, d);
};
Period.between = function(a, b) {
  requireNonNull(a, "startDate");
  requireNonNull(b, "endDate");
  requireInstance(a, LocalDate, "startDate");
  requireInstance(b, LocalDate, "endDate");
  return a.until(b);
};
Period.parse = function(a) {
  requireNonNull(a, "text");
  try {
    return Period._parse(a);
  } catch (b) {
    if (b instanceof ArithmeticException) {
      throw new DateTimeParseException("Text cannot be parsed to a Period", a, 0, b);
    }
    throw b;
  }
};
Period._parse = function(a) {
  var b = PATTERN.exec(a);
  if (null != b) {
    var c = "-" === b[1] ? -1 : 1, d = b[2], e = b[3], f = b[4];
    b = b[5];
    if (null != d || null != e || null != f || null != b) {
      return d = Period._parseNumber(a, d, c), e = Period._parseNumber(a, e, c), f = Period._parseNumber(a, f, c), a = Period._parseNumber(a, b, c), a = MathUtil.safeAdd(a, MathUtil.safeMultiply(f, 7)), Period.create(d, e, a);
    }
  }
  throw new DateTimeParseException("Text cannot be parsed to a Period", a, 0);
};
Period._parseNumber = function(a, b, c) {
  if (null == b) {
    return 0;
  }
  a = MathUtil.parseInt(b);
  return MathUtil.safeMultiply(a, c);
};
Period.create = function(a, b, c) {
  return new Period(a, b, c);
};
Period.prototype.units = function() {
  return [ChronoUnit.YEARS, ChronoUnit.MONTHS, ChronoUnit.DAYS];
};
Period.prototype.chronology = function() {
  return IsoChronology.INSTANCE;
};
Period.prototype.get = function(a) {
  if (a === ChronoUnit.YEARS) {
    return this._years;
  }
  if (a === ChronoUnit.MONTHS) {
    return this._months;
  }
  if (a === ChronoUnit.DAYS) {
    return this._days;
  }
  throw new UnsupportedTemporalTypeException("Unsupported unit: " + a);
};
Period.prototype.isZero = function() {
  return this === Period.ZERO;
};
Period.prototype.isNegative = function() {
  return 0 > this._years || 0 > this._months || 0 > this._days;
};
Period.prototype.years = function() {
  return this._years;
};
Period.prototype.months = function() {
  return this._months;
};
Period.prototype.days = function() {
  return this._days;
};
Period.prototype.withYears = function(a) {
  return a === this._years ? this : Period.create(a, this._months, this._days);
};
Period.prototype.withMonths = function(a) {
  return a === this._months ? this : Period.create(this._years, a, this._days);
};
Period.prototype.withDays = function(a) {
  return a === this._days ? this : Period.create(this._years, this._months, a);
};
Period.prototype.plus = function(a) {
  a = Period.from(a);
  return Period.create(MathUtil.safeAdd(this._years, a._years), MathUtil.safeAdd(this._months, a._months), MathUtil.safeAdd(this._days, a._days));
};
Period.prototype.plusYears = function(a) {
  return 0 === a ? this : Period.create(MathUtil.safeToInt(MathUtil.safeAdd(this._years, a)), this._months, this._days);
};
Period.prototype.plusMonths = function(a) {
  return 0 === a ? this : Period.create(this._years, MathUtil.safeToInt(MathUtil.safeAdd(this._months, a)), this._days);
};
Period.prototype.plusDays = function(a) {
  return 0 === a ? this : Period.create(this._years, this._months, MathUtil.safeToInt(MathUtil.safeAdd(this._days, a)));
};
Period.prototype.minus = function(a) {
  a = Period.from(a);
  return Period.create(MathUtil.safeSubtract(this._years, a._years), MathUtil.safeSubtract(this._months, a._months), MathUtil.safeSubtract(this._days, a._days));
};
Period.prototype.minusYears = function(a) {
  return this.plusYears(-1 * a);
};
Period.prototype.minusMonths = function(a) {
  return this.plusMonths(-1 * a);
};
Period.prototype.minusDays = function(a) {
  return this.plusDays(-1 * a);
};
Period.prototype.multipliedBy = function(a) {
  return this === Period.ZERO || 1 === a ? this : Period.create(MathUtil.safeMultiply(this._years, a), MathUtil.safeMultiply(this._months, a), MathUtil.safeMultiply(this._days, a));
};
Period.prototype.negated = function() {
  return this.multipliedBy(-1);
};
Period.prototype.normalized = function() {
  var a = this.toTotalMonths(), b = MathUtil.intDiv(a, 12);
  a = MathUtil.intMod(a, 12);
  return b === this._years && a === this._months ? this : Period.create(MathUtil.safeToInt(b), a, this._days);
};
Period.prototype.toTotalMonths = function() {
  return 12 * this._years + this._months;
};
Period.prototype.addTo = function(a) {
  requireNonNull(a, "temporal");
  0 !== this._years ? a = 0 !== this._months ? a.plus(this.toTotalMonths(), ChronoUnit.MONTHS) : a.plus(this._years, ChronoUnit.YEARS) : 0 !== this._months && (a = a.plus(this._months, ChronoUnit.MONTHS));
  0 !== this._days && (a = a.plus(this._days, ChronoUnit.DAYS));
  return a;
};
Period.prototype.subtractFrom = function(a) {
  requireNonNull(a, "temporal");
  0 !== this._years ? a = 0 !== this._months ? a.minus(this.toTotalMonths(), ChronoUnit.MONTHS) : a.minus(this._years, ChronoUnit.YEARS) : 0 !== this._months && (a = a.minus(this._months, ChronoUnit.MONTHS));
  0 !== this._days && (a = a.minus(this._days, ChronoUnit.DAYS));
  return a;
};
Period.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof Period ? this._years === a._years && this._months === a._months && this._days === a._days : !1;
};
Period.prototype.hashCode = function() {
  return MathUtil.hashCode(this._years, this._months, this._days);
};
Period.prototype.toString = function() {
  if (this === Period.ZERO) {
    return "P0D";
  }
  var a = "P";
  0 !== this._years && (a += "" + this._years + "Y");
  0 !== this._months && (a += "" + this._months + "M");
  0 !== this._days && (a += "" + this._days + "D");
  return a;
};
Period.prototype.toJSON = function() {
  return this.toString();
};
$jscomp.global.Object.defineProperties(Period, {ZERO:{configurable:!0, enumerable:!0, get:function() {
  return Period.ofDays(0);
}}});
var Year = function(a) {
  Temporal.call(this);
  this._year = MathUtil.safeToInt(a);
};
$jscomp.inherits(Year, Temporal);
Year.prototype.value = function() {
  return this._year;
};
Year.now = function(a) {
  return void 0 === a ? Year.now0() : a instanceof ZoneId ? Year.nowZoneId(a) : Year.nowClock(a);
};
Year.now0 = function() {
  return Year.nowClock(Clock.systemDefaultZone());
};
Year.nowZoneId = function(a) {
  requireNonNull(a, "zone");
  requireInstance(a, ZoneId, "zone");
  return Year.nowClock(Clock.system(a));
};
Year.nowClock = function(a) {
  requireNonNull(a, "clock");
  requireInstance(a, Clock, "clock");
  a = LocalDate.now(a);
  return Year.of(a.year());
};
Year.of = function(a) {
  requireNonNull(a, "isoYear");
  ChronoField.YEAR.checkValidValue(a);
  return new Year(a);
};
Year.from = function(a) {
  requireNonNull(a, "temporal");
  requireInstance(a, TemporalAccessor, "temporal");
  if (a instanceof Year) {
    return a;
  }
  try {
    return Year.of(a.get(ChronoField.YEAR));
  } catch (b) {
    throw new DateTimeException("Unable to obtain Year from TemporalAccessor: " + a + ", type " + (a && null != a.constructor ? a.constructor.name : ""));
  }
};
Year.parse = function(a, b) {
  return 1 >= arguments.length ? Year.parseText(a) : Year.parseTextFormatter(a, b);
};
Year.parseText = function(a) {
  requireNonNull(a, "text");
  return Year.parse(a, Year.YearPARSER);
};
Year.parseTextFormatter = function(a, b) {
  b = void 0 === b ? Year.YearPARSER : b;
  requireNonNull(a, "text");
  requireNonNull(b, "formatter");
  requireInstance(b, DateTimeFormatter, "formatter");
  return b.parse(a, Year.FROM);
};
Year.isLeap = function(a) {
  return 0 === MathUtil.intMod(a, 4) && (0 !== MathUtil.intMod(a, 100) || 0 === MathUtil.intMod(a, 400));
};
Year.prototype.isSupported = function(a) {
  return 1 === arguments.length && a instanceof TemporalField ? this.isSupportedField(a) : this.isSupportedUnit(a);
};
Year.prototype.isSupportedField = function(a) {
  return a instanceof ChronoField ? a === ChronoField.YEAR || a === ChronoField.YEAR_OF_ERA || a === ChronoField.ERA : null != a && a.isSupportedBy(this);
};
Year.prototype.isSupportedUnit = function(a) {
  return a instanceof ChronoUnit ? a === ChronoUnit.YEARS || a === ChronoUnit.DECADES || a === ChronoUnit.CENTURIES || a === ChronoUnit.MILLENNIA || a === ChronoUnit.ERAS : null != a && a.isSupportedBy(this);
};
Year.prototype.range = function(a) {
  if (this.isSupported(a)) {
    return a.range();
  }
  if (a instanceof ChronoField) {
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return Temporal.prototype.range.call(this, a);
};
Year.prototype.get = function(a) {
  return this.range(a).checkValidIntValue(this.getLong(a), a);
};
Year.prototype.getLong = function(a) {
  requireNonNull(a, "field");
  if (a instanceof ChronoField) {
    switch(a) {
      case ChronoField.YEAR_OF_ERA:
        return 1 > this._year ? 1 - this._year : this._year;
      case ChronoField.YEAR:
        return this._year;
      case ChronoField.ERA:
        return 1 > this._year ? 0 : 1;
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
Year.prototype.isLeap = function() {
  return Year.isLeap(this._year);
};
Year.prototype.withAdjuster = function(a) {
  requireNonNull(a, "adjuster");
  return a.adjustInto(this);
};
Year.prototype.withFieldValue = function(a, b) {
  requireNonNull(a, "field");
  requireInstance(a, TemporalField, "field");
  if (a instanceof ChronoField) {
    a.checkValidValue(b);
    switch(a) {
      case ChronoField.YEAR_OF_ERA:
        return Year.of(1 > this._year ? 1 - b : b);
      case ChronoField.YEAR:
        return Year.of(b);
      case ChronoField.ERA:
        return this.getLong(ChronoField.ERA) === b ? this : Year.of(1 - this._year);
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.adjustInto(this, b);
};
Year.prototype.plusAmount = function(a) {
  requireNonNull(a, "amount");
  requireInstance(a, TemporalAmount, "amount");
  return a.addTo(this);
};
Year.prototype.plusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToAdd");
  requireNonNull(b, "unit");
  requireInstance(b, TemporalUnit, "unit");
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.YEARS:
        return this.plusYears(a);
      case ChronoUnit.DECADES:
        return this.plusYears(MathUtil.safeMultiply(a, 10));
      case ChronoUnit.CENTURIES:
        return this.plusYears(MathUtil.safeMultiply(a, 100));
      case ChronoUnit.MILLENNIA:
        return this.plusYears(MathUtil.safeMultiply(a, 1000));
      case ChronoUnit.ERAS:
        return this.with(ChronoField.ERA, MathUtil.safeAdd(this.getLong(ChronoField.ERA), a));
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.addTo(this, a);
};
Year.prototype.plusYears = function(a) {
  return 0 === a ? this : Year.of(ChronoField.YEAR.checkValidIntValue(MathUtil.safeAdd(this._year, a)));
};
Year.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  requireInstance(a, TemporalAmount, "amount");
  return a.subtractFrom(this);
};
Year.prototype.minusAmountUnit = function(a, b) {
  requireNonNull(a, "amountToSubtract");
  requireNonNull(b, "unit");
  requireInstance(b, TemporalUnit, "unit");
  return a === MathUtil.MIN_SAFE_INTEGER ? this.plus(MathUtil.MAX_SAFE_INTEGER, b).plus(1, b) : this.plus(-a, b);
};
Year.prototype.minusYears = function(a) {
  return a === MathUtil.MIN_SAFE_INTEGER ? this.plusYears(MathUtil.MAX_SAFE_INTEGER).plusYears(1) : this.plusYears(-a);
};
Year.prototype.adjustInto = function(a) {
  requireNonNull(a, "temporal");
  return a.with(ChronoField.YEAR, this._year);
};
Year.prototype.isValidMonthDay = function(a) {
  return null != a && a.isValidYear(this._year);
};
Year.prototype.length = function() {
  return this.isLeap() ? 366 : 365;
};
Year.prototype.atDay = function(a) {
  return LocalDate.ofYearDay(this._year, a);
};
Year.prototype.atMonth = function(a) {
  return 1 === arguments.length && a instanceof Month ? this.atMonthMonth(a) : this.atMonthNumber(a);
};
Year.prototype.atMonthMonth = function(a) {
  requireNonNull(a, "month");
  requireInstance(a, Month, "month");
  return YearMonth.of(this._year, a);
};
Year.prototype.atMonthNumber = function(a) {
  requireNonNull(a, "month");
  return YearMonth.of(this._year, a);
};
Year.prototype.atMonthDay = function(a) {
  requireNonNull(a, "monthDay");
  requireInstance(a, MonthDay, "monthDay");
  return a.atYear(this._year);
};
Year.prototype.query = function(a) {
  requireNonNull(a, "query()");
  requireInstance(a, TemporalQuery, "query()");
  return a === TemporalQueries.chronology() ? IsoChronology.INSTANCE : a === TemporalQueries.precision() ? ChronoUnit.YEARS : a === TemporalQueries.localDate() || a === TemporalQueries.localTime() || a === TemporalQueries.zone() || a === TemporalQueries.zoneId() || 
  a === TemporalQueries.offset() ? null : Temporal.prototype.query.call(this, a);
};
Year.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, Year, "other");
  return this._year - a._year;
};
Year.prototype.isAfter = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, Year, "other");
  return this._year > a._year;
};
Year.prototype.isBefore = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, Year, "other");
  return this._year < a._year;
};
Year.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  requireInstance(a, DateTimeFormatter, "formatter");
  return a.format(this);
};
Year.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof Year ? this.value() === a.value() : !1;
};
Year.prototype.toString = function() {
  return "" + this._year;
};
Year.prototype.toJSON = function() {
  return this.toString();
};
Year.prototype.until = function(a, b) {
  a = Year.from(a);
  if (b instanceof ChronoUnit) {
    var c = a.value() - this.value();
    switch(b) {
      case ChronoUnit.YEARS:
        return c;
      case ChronoUnit.DECADES:
        return MathUtil.intDiv(c, 10);
      case ChronoUnit.CENTURIES:
        return MathUtil.intDiv(c, 100);
      case ChronoUnit.MILLENNIA:
        return MathUtil.intDiv(c, 1000);
      case ChronoUnit.ERAS:
        return a.getLong(ChronoField.ERA) - this.getLong(ChronoField.ERA);
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.between(this, a);
};
$jscomp.global.Object.defineProperties(Year, {MIN_VALUE:{configurable:!0, enumerable:!0, get:function() {
  return YearConstants.MIN_VALUE;
}}, MAX_VALUE:{configurable:!0, enumerable:!0, get:function() {
  return YearConstants.MAX_VALUE;
}}, YearPARSER:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD).toFormatter();
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("Year.FROM", function(a) {
    return Year.from(a);
  });
}}});
var YearConstants = function() {
};
YearConstants.MIN_VALUE = -999999;
YearConstants.MAX_VALUE = 999999;
var YearMonth = function(a, b) {
  Temporal.call(this);
  this._year = MathUtil.safeToInt(a);
  this._month = MathUtil.safeToInt(b);
};
$jscomp.inherits(YearMonth, Temporal);
YearMonth.now = function(a) {
  return 0 === arguments.length ? YearMonth.now0() : 1 === arguments.length && a instanceof ZoneId ? YearMonth.nowZoneId(a) : YearMonth.nowClock(a);
};
YearMonth.now0 = function() {
  return YearMonth.nowClock(Clock.systemDefaultZone());
};
YearMonth.nowZoneId = function(a) {
  return YearMonth.nowClock(Clock.system(a));
};
YearMonth.nowClock = function(a) {
  a = LocalDate.now(a);
  return YearMonth.of(a.year(), a.month());
};
YearMonth.of = function(a, b) {
  return 2 === arguments.length && b instanceof Month ? YearMonth.ofNumberMonth(a, b) : YearMonth.ofNumberNumber(a, b);
};
YearMonth.ofNumberMonth = function(a, b) {
  requireNonNull(b, "month");
  requireInstance(b, Month, "month");
  return YearMonth.ofNumberNumber(a, b.value());
};
YearMonth.ofNumberNumber = function(a, b) {
  requireNonNull(a, "year");
  requireNonNull(b, "month");
  ChronoField.YEAR.checkValidValue(a);
  ChronoField.MONTH_OF_YEAR.checkValidValue(b);
  return new YearMonth(a, b);
};
YearMonth.from = function(a) {
  requireNonNull(a, "temporal");
  if (a instanceof YearMonth) {
    return a;
  }
  try {
    return YearMonth.of(a.get(ChronoField.YEAR), a.get(ChronoField.MONTH_OF_YEAR));
  } catch (b) {
    throw new DateTimeException("Unable to obtain YearMonth from TemporalAccessor: " + a + ", type " + (a && null != a.constructor ? a.constructor.name : ""));
  }
};
YearMonth.parse = function(a, b) {
  return 1 === arguments.length ? YearMonth.parseString(a) : YearMonth.parseStringFormatter(a, b);
};
YearMonth.parseString = function(a) {
  return YearMonth.parseStringFormatter(a, YearMonth.YearMonthPARSER);
};
YearMonth.parseStringFormatter = function(a, b) {
  requireNonNull(b, "formatter");
  return b.parse(a, YearMonth.FROM);
};
YearMonth.prototype.isSupported = function(a) {
  return 1 === arguments.length && a instanceof TemporalField ? this.isSupportedField(a) : this.isSupportedUnit(a);
};
YearMonth.prototype.isSupportedField = function(a) {
  return a instanceof ChronoField ? a === ChronoField.YEAR || a === ChronoField.MONTH_OF_YEAR || a === ChronoField.PROLEPTIC_MONTH || a === ChronoField.YEAR_OF_ERA || a === ChronoField.ERA : null != a && a.isSupportedBy(this);
};
YearMonth.prototype.isSupportedUnit = function(a) {
  return a instanceof ChronoUnit ? a === ChronoUnit.MONTHS || a === ChronoUnit.YEARS || a === ChronoUnit.DECADES || a === ChronoUnit.CENTURIES || a === ChronoUnit.MILLENNIA || a === ChronoUnit.ERAS : null != a && a.isSupportedBy(this);
};
YearMonth.prototype.range = function(a) {
  return a === ChronoField.YEAR_OF_ERA ? 0 >= this.year() ? ValueRange.of(1, Year.MAX_VALUE + 1) : ValueRange.of(1, Year.MAX_VALUE) : Temporal.prototype.range.call(this, a);
};
YearMonth.prototype.get = function(a) {
  requireNonNull(a, "field");
  requireInstance(a, TemporalField, "field");
  return this.range(a).checkValidIntValue(this.getLong(a), a);
};
YearMonth.prototype.getLong = function(a) {
  requireNonNull(a, "field");
  requireInstance(a, TemporalField, "field");
  if (a instanceof ChronoField) {
    switch(a) {
      case ChronoField.MONTH_OF_YEAR:
        return this._month;
      case ChronoField.PROLEPTIC_MONTH:
        return this._getProlepticMonth();
      case ChronoField.YEAR_OF_ERA:
        return 1 > this._year ? 1 - this._year : this._year;
      case ChronoField.YEAR:
        return this._year;
      case ChronoField.ERA:
        return 1 > this._year ? 0 : 1;
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
YearMonth.prototype._getProlepticMonth = function() {
  return MathUtil.safeAdd(MathUtil.safeMultiply(this._year, 12), this._month - 1);
};
YearMonth.prototype.year = function() {
  return this._year;
};
YearMonth.prototype.monthValue = function() {
  return this._month;
};
YearMonth.prototype.month = function() {
  return Month.of(this._month);
};
YearMonth.prototype.isLeapYear = function() {
  return IsoChronology.isLeapYear(this._year);
};
YearMonth.prototype.isValidDay = function(a) {
  return 1 <= a && a <= this.lengthOfMonth();
};
YearMonth.prototype.lengthOfMonth = function() {
  return this.month().length(this.isLeapYear());
};
YearMonth.prototype.lengthOfYear = function() {
  return this.isLeapYear() ? 366 : 365;
};
YearMonth.prototype.with = function(a, b) {
  return 1 === arguments.length ? this.withAdjuster(a) : 2 === arguments.length && a instanceof TemporalField ? this.withFieldValue(a, b) : this.withYearMonth(a, b);
};
YearMonth.prototype.withYearMonth = function(a, b) {
  requireNonNull(a);
  requireNonNull(b);
  return this._year === a && this._month === b ? this : new YearMonth(a, b);
};
YearMonth.prototype.withAdjuster = function(a) {
  requireNonNull(a, "adjuster");
  return a.adjustInto(this);
};
YearMonth.prototype.withFieldValue = function(a, b) {
  requireNonNull(a, "field");
  requireInstance(a, TemporalField, "field");
  if (a instanceof ChronoField) {
    a.checkValidValue(b);
    switch(a) {
      case ChronoField.MONTH_OF_YEAR:
        return this.withMonth(b);
      case ChronoField.PROLEPTIC_MONTH:
        return this.plusMonths(b - this.getLong(ChronoField.PROLEPTIC_MONTH));
      case ChronoField.YEAR_OF_ERA:
        return this.withYear(1 > this._year ? 1 - b : b);
      case ChronoField.YEAR:
        return this.withYear(b);
      case ChronoField.ERA:
        return this.getLong(ChronoField.ERA) === b ? this : this.withYear(1 - this._year);
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.adjustInto(this, b);
};
YearMonth.prototype.withYear = function(a) {
  ChronoField.YEAR.checkValidValue(a);
  return this.withYearMonth(a, this._month);
};
YearMonth.prototype.withMonth = function(a) {
  ChronoField.MONTH_OF_YEAR.checkValidValue(a);
  return this.withYearMonth(this._year, a);
};
YearMonth.prototype.plusAmount = function(a) {
  requireNonNull(a, "amount");
  requireInstance(a, TemporalAmount, "amount");
  return a.addTo(this);
};
YearMonth.prototype.plusAmountUnit = function(a, b) {
  requireNonNull(b, "unit");
  requireInstance(b, TemporalUnit, "unit");
  if (b instanceof ChronoUnit) {
    switch(b) {
      case ChronoUnit.MONTHS:
        return this.plusMonths(a);
      case ChronoUnit.YEARS:
        return this.plusYears(a);
      case ChronoUnit.DECADES:
        return this.plusYears(MathUtil.safeMultiply(a, 10));
      case ChronoUnit.CENTURIES:
        return this.plusYears(MathUtil.safeMultiply(a, 100));
      case ChronoUnit.MILLENNIA:
        return this.plusYears(MathUtil.safeMultiply(a, 1000));
      case ChronoUnit.ERAS:
        return this.with(ChronoField.ERA, MathUtil.safeAdd(this.getLong(ChronoField.ERA), a));
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.addTo(this, a);
};
YearMonth.prototype.plusYears = function(a) {
  if (0 === a) {
    return this;
  }
  a = ChronoField.YEAR.checkValidIntValue(this._year + a);
  return this.withYearMonth(a, this._month);
};
YearMonth.prototype.plusMonths = function(a) {
  if (0 === a) {
    return this;
  }
  var b = 12 * this._year + (this._month - 1) + a;
  a = ChronoField.YEAR.checkValidIntValue(MathUtil.floorDiv(b, 12));
  b = MathUtil.floorMod(b, 12) + 1;
  return this.withYearMonth(a, b);
};
YearMonth.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.subtractFrom(this);
};
YearMonth.prototype.minusAmountUnit = function(a, b) {
  return a === MathUtil.MIN_SAFE_INTEGER ? this.plusAmountUnit(MathUtil.MAX_SAFE_INTEGER, b).plusAmountUnit(1, b) : this.plusAmountUnit(-a, b);
};
YearMonth.prototype.minusYears = function(a) {
  return a === MathUtil.MIN_SAFE_INTEGER ? this.plusYears(MathUtil.MIN_SAFE_INTEGER).plusYears(1) : this.plusYears(-a);
};
YearMonth.prototype.minusMonths = function(a) {
  return a === MathUtil.MIN_SAFE_INTEGER ? this.plusMonths(Math.MAX_SAFE_INTEGER).plusMonths(1) : this.plusMonths(-a);
};
YearMonth.prototype.query = function(a) {
  requireNonNull(a, "query");
  requireInstance(a, TemporalQuery, "query");
  return a === TemporalQueries.chronology() ? IsoChronology.INSTANCE : a === TemporalQueries.precision() ? ChronoUnit.MONTHS : a === TemporalQueries.localDate() || a === TemporalQueries.localTime() || a === TemporalQueries.zone() || a === TemporalQueries.zoneId() || 
  a === TemporalQueries.offset() ? null : Temporal.prototype.query.call(this, a);
};
YearMonth.prototype.adjustInto = function(a) {
  requireNonNull(a, "temporal");
  requireInstance(a, Temporal, "temporal");
  return a.with(ChronoField.PROLEPTIC_MONTH, this._getProlepticMonth());
};
YearMonth.prototype.until = function(a, b) {
  requireNonNull(a, "endExclusive");
  requireNonNull(b, "unit");
  requireInstance(a, Temporal, "endExclusive");
  requireInstance(b, TemporalUnit, "unit");
  a = YearMonth.from(a);
  if (b instanceof ChronoUnit) {
    var c = a._getProlepticMonth() - this._getProlepticMonth();
    switch(b) {
      case ChronoUnit.MONTHS:
        return c;
      case ChronoUnit.YEARS:
        return c / 12;
      case ChronoUnit.DECADES:
        return c / 120;
      case ChronoUnit.CENTURIES:
        return c / 1200;
      case ChronoUnit.MILLENNIA:
        return c / 12000;
      case ChronoUnit.ERAS:
        return a.getLong(ChronoField.ERA) - this.getLong(ChronoField.ERA);
    }
    throw new UnsupportedTemporalTypeException("Unsupported unit: " + b);
  }
  return b.between(this, a);
};
YearMonth.prototype.atDay = function(a) {
  return LocalDate.of(this._year, this._month, a);
};
YearMonth.prototype.atEndOfMonth = function() {
  return LocalDate.of(this._year, this._month, this.lengthOfMonth());
};
YearMonth.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  requireInstance(a, YearMonth, "other");
  var b = this._year - a.year();
  0 === b && (b = this._month - a.monthValue());
  return b;
};
YearMonth.prototype.isAfter = function(a) {
  return 0 < this.compareTo(a);
};
YearMonth.prototype.isBefore = function(a) {
  return 0 > this.compareTo(a);
};
YearMonth.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof YearMonth ? this.year() === a.year() && this.monthValue() === a.monthValue() : !1;
};
YearMonth.prototype.toString = function() {
  return YearMonth.YearMonthPARSER.format(this);
};
YearMonth.prototype.toJSON = function() {
  return this.toString();
};
YearMonth.prototype.format = function(a) {
  requireNonNull(a, "formatter");
  return a.format(this);
};
$jscomp.global.Object.defineProperties(YearMonth, {YearMonthPARSER:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD).appendLiteral("-").appendValue(ChronoField.MONTH_OF_YEAR, 2).toFormatter();
}}, FROM:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("YearMonth.FROM", function(a) {
    return YearMonth.from(a);
  });
}}});
var ZonedDateTime = function(a, b, c) {
  requireNonNull(a, "dateTime");
  requireNonNull(b, "offset");
  requireNonNull(c, "zone");
  ChronoZonedDateTime.call(this);
  this._dateTime = a;
  this._offset = b;
  this._zone = c;
};
$jscomp.inherits(ZonedDateTime, ChronoZonedDateTime);
ZonedDateTime.now = function(a) {
  a = a instanceof ZoneId ? Clock.system(a) : null == a ? Clock.systemDefaultZone() : a;
  return ZonedDateTime.ofInstant(a.instant(), a.zone());
};
ZonedDateTime.of = function(a, b, c, d, e, f, g, h) {
  return void 0 == c ? ZonedDateTime.of2(a, b) : a instanceof LocalDate ? ZonedDateTime.of3(a, b, c) : ZonedDateTime.of8(a, b, c, d, e, f, g, h);
};
ZonedDateTime.of3 = function(a, b, c) {
  return ZonedDateTime.of2(LocalDateTime.of(a, b), c);
};
ZonedDateTime.of2 = function(a, b) {
  return ZonedDateTime.ofLocal(a, b, null);
};
ZonedDateTime.of8 = function(a, b, c, d, e, f, g, h) {
  a = LocalDateTime.of(a, b, c, d, e, f, g);
  return ZonedDateTime.ofLocal(a, h, null);
};
ZonedDateTime.ofLocal = function(a, b, c) {
  requireNonNull(a, "localDateTime");
  requireNonNull(b, "zone");
  if (b instanceof ZoneOffset) {
    return new ZonedDateTime(a, b, b);
  }
  var d = null;
  d = b.rules();
  var e = d.validOffsets(a);
  1 === e.length ? d = e[0] : 0 === e.length ? (d = d.transition(a), a = a.plusSeconds(d.duration().seconds()), d = d.offsetAfter()) : d = null != c && e.some(function(a) {
    return a.equals(c);
  }) ? c : requireNonNull(e[0], "offset");
  return new ZonedDateTime(a, d, b);
};
ZonedDateTime.ofInstant = function(a, b, c) {
  return void 0 === c ? ZonedDateTime.ofInstant2(a, b) : ZonedDateTime.ofInstant3(a, b, c);
};
ZonedDateTime.ofInstant2 = function(a, b) {
  requireNonNull(a, "instant");
  requireNonNull(b, "zone");
  return ZonedDateTime._create(a.epochSecond(), a.nano(), b);
};
ZonedDateTime.ofInstant3 = function(a, b, c) {
  requireNonNull(a, "localDateTime");
  requireNonNull(b, "offset");
  requireNonNull(c, "zone");
  return ZonedDateTime._create(a.toEpochSecond(b), a.nano(), c);
};
ZonedDateTime._create = function(a, b, c) {
  var d = c.rules(), e = Instant.ofEpochSecond(a, b);
  d = d.offset(e);
  a = LocalDateTime.ofEpochSecond(a, b, d);
  return new ZonedDateTime(a, d, c);
};
ZonedDateTime.ofStrict = function(a, b, c) {
  requireNonNull(a, "localDateTime");
  requireNonNull(b, "offset");
  requireNonNull(c, "zone");
  var d = c.rules();
  if (!1 === d.isValidOffset(a, b)) {
    d = d.transition(a);
    if (null != d && d.isGap()) {
      throw new DateTimeException("LocalDateTime " + a + " does not exist in zone " + c + " due to a gap in the local time-line, typically caused by daylight savings");
    }
    throw new DateTimeException('ZoneOffset "' + b + '" is not valid for LocalDateTime "' + a + '" in zone "' + c + '"');
  }
  return new ZonedDateTime(a, b, c);
};
ZonedDateTime.ofLenient = function(a, b, c) {
  requireNonNull(a, "localDateTime");
  requireNonNull(b, "offset");
  requireNonNull(c, "zone");
  if (c instanceof ZoneOffset && !1 === b.equals(c)) {
    throw new IllegalArgumentException("ZoneId must match ZoneOffset");
  }
  return new ZonedDateTime(a, b, c);
};
ZonedDateTime.from = function(a) {
  requireNonNull(a, "temporal");
  if (a instanceof ZonedDateTime) {
    return a;
  }
  var b = ZoneId.from(a);
  if (a.isSupported(ChronoField.INSTANT_SECONDS)) {
    var c = ZonedDateTime._from(a, b);
    if (null != c) {
      return c;
    }
  }
  a = LocalDateTime.from(a);
  return ZonedDateTime.of2(a, b);
};
ZonedDateTime._from = function(a, b) {
  try {
    return ZonedDateTime.__from(a, b);
  } catch (c) {
    if (!(c instanceof DateTimeException)) {
      throw c;
    }
  }
};
ZonedDateTime.__from = function(a, b) {
  var c = a.getLong(ChronoField.INSTANT_SECONDS);
  a = a.get(ChronoField.NANO_OF_SECOND);
  return ZonedDateTime._create(c, a, b);
};
ZonedDateTime.parse = function(a, b) {
  b = void 0 === b ? DateTimeFormatter.ISO_ZONED_DATE_TIME : b;
  requireNonNull(b, "formatter");
  return b.parse(a, ZonedDateTime.FROM);
};
ZonedDateTime.prototype._resolveLocal = function(a) {
  requireNonNull(a, "newDateTime");
  return ZonedDateTime.ofLocal(a, this._zone, this._offset);
};
ZonedDateTime.prototype._resolveInstant = function(a) {
  return ZonedDateTime.ofInstant3(a, this._offset, this._zone);
};
ZonedDateTime.prototype._resolveOffset = function(a) {
  return !1 === a.equals(this._offset) && this._zone.rules().isValidOffset(this._dateTime, a) ? new ZonedDateTime(this._dateTime, a, this._zone) : this;
};
ZonedDateTime.prototype.isSupported = function(a) {
  return a instanceof ChronoField ? !0 : a instanceof ChronoUnit ? a.isDateBased() || a.isTimeBased() : null != a && a.isSupportedBy(this);
};
ZonedDateTime.prototype.range = function(a) {
  return a instanceof ChronoField ? a === ChronoField.INSTANT_SECONDS || a === ChronoField.OFFSET_SECONDS ? a.range() : this._dateTime.range(a) : a.rangeRefinedBy(this);
};
ZonedDateTime.prototype.get = function(a) {
  return this.getLong(a);
};
ZonedDateTime.prototype.getLong = function(a) {
  if (a instanceof ChronoField) {
    switch(a) {
      case ChronoField.INSTANT_SECONDS:
        return this.toEpochSecond();
      case ChronoField.OFFSET_SECONDS:
        return this._offset.totalSeconds();
    }
    return this._dateTime.getLong(a);
  }
  requireNonNull(a, "field");
  return a.getFrom(this);
};
ZonedDateTime.prototype.offset = function() {
  return this._offset;
};
ZonedDateTime.prototype.withEarlierOffsetAtOverlap = function() {
  var a = this._zone.rules().transition(this._dateTime);
  return null != a && a.isOverlap() && (a = a.offsetBefore(), !1 === a.equals(this._offset)) ? new ZonedDateTime(this._dateTime, a, this._zone) : this;
};
ZonedDateTime.prototype.withLaterOffsetAtOverlap = function() {
  var a = this._zone.rules().transition(this.toLocalDateTime());
  return null != a && (a = a.offsetAfter(), !1 === a.equals(this._offset)) ? new ZonedDateTime(this._dateTime, a, this._zone) : this;
};
ZonedDateTime.prototype.zone = function() {
  return this._zone;
};
ZonedDateTime.prototype.withZoneSameLocal = function(a) {
  requireNonNull(a, "zone");
  return this._zone.equals(a) ? this : ZonedDateTime.ofLocal(this._dateTime, a, this._offset);
};
ZonedDateTime.prototype.withZoneSameInstant = function(a) {
  requireNonNull(a, "zone");
  return this._zone.equals(a) ? this : ZonedDateTime._create(this._dateTime.toEpochSecond(this._offset), this._dateTime.nano(), a);
};
ZonedDateTime.prototype.withFixedOffsetZone = function() {
  return this._zone.equals(this._offset) ? this : new ZonedDateTime(this._dateTime, this._offset, this._offset);
};
ZonedDateTime.prototype.year = function() {
  return this._dateTime.year();
};
ZonedDateTime.prototype.monthValue = function() {
  return this._dateTime.monthValue();
};
ZonedDateTime.prototype.month = function() {
  return this._dateTime.month();
};
ZonedDateTime.prototype.dayOfMonth = function() {
  return this._dateTime.dayOfMonth();
};
ZonedDateTime.prototype.dayOfYear = function() {
  return this._dateTime.dayOfYear();
};
ZonedDateTime.prototype.dayOfWeek = function() {
  return this._dateTime.dayOfWeek();
};
ZonedDateTime.prototype.hour = function() {
  return this._dateTime.hour();
};
ZonedDateTime.prototype.minute = function() {
  return this._dateTime.minute();
};
ZonedDateTime.prototype.second = function() {
  return this._dateTime.second();
};
ZonedDateTime.prototype.nano = function() {
  return this._dateTime.nano();
};
ZonedDateTime.prototype.withAdjuster = function(a) {
  if (a instanceof LocalDate) {
    return this._resolveLocal(LocalDateTime.of(a, this._dateTime.toLocalTime()));
  }
  if (a instanceof LocalTime) {
    return this._resolveLocal(LocalDateTime.of(this._dateTime.toLocalDate(), a));
  }
  if (a instanceof LocalDateTime) {
    return this._resolveLocal(a);
  }
  if (a instanceof Instant) {
    return ZonedDateTime._create(a.epochSecond(), a.nano(), this._zone);
  }
  if (a instanceof ZoneOffset) {
    return this._resolveOffset(a);
  }
  requireNonNull(a, "adjuster");
  return a.adjustInto(this);
};
ZonedDateTime.prototype.withFieldValue = function(a, b) {
  if (a instanceof ChronoField) {
    switch(a) {
      case ChronoField.INSTANT_SECONDS:
        return ZonedDateTime._create(b, this.nano(), this._zone);
      case ChronoField.OFFSET_SECONDS:
        return a = ZoneOffset.ofTotalSeconds(a.checkValidIntValue(b)), this._resolveOffset(a);
    }
    return this._resolveLocal(this._dateTime.with(a, b));
  }
  return a.adjustInto(this, b);
};
ZonedDateTime.prototype.withYear = function(a) {
  return this._resolveLocal(this._dateTime.withYear(a));
};
ZonedDateTime.prototype.withMonth = function(a) {
  return this._resolveLocal(this._dateTime.withMonth(a));
};
ZonedDateTime.prototype.withDayOfMonth = function(a) {
  return this._resolveLocal(this._dateTime.withDayOfMonth(a));
};
ZonedDateTime.prototype.withDayOfYear = function(a) {
  return this._resolveLocal(this._dateTime.withDayOfYear(a));
};
ZonedDateTime.prototype.withHour = function(a) {
  return this._resolveLocal(this._dateTime.withHour(a));
};
ZonedDateTime.prototype.withMinute = function(a) {
  return this._resolveLocal(this._dateTime.withMinute(a));
};
ZonedDateTime.prototype.withSecond = function(a) {
  return this._resolveLocal(this._dateTime.withSecond(a));
};
ZonedDateTime.prototype.withNano = function(a) {
  return this._resolveLocal(this._dateTime.withNano(a));
};
ZonedDateTime.prototype.truncatedTo = function(a) {
  return this._resolveLocal(this._dateTime.truncatedTo(a));
};
ZonedDateTime.prototype.plusAmount = function(a) {
  requireNonNull(a);
  return a.addTo(this);
};
ZonedDateTime.prototype.plusAmountUnit = function(a, b) {
  if (b instanceof ChronoUnit) {
    return b.isDateBased() ? this._resolveLocal(this._dateTime.plus(a, b)) : this._resolveInstant(this._dateTime.plus(a, b));
  }
  requireNonNull(b, "unit");
  return b.addTo(this, a);
};
ZonedDateTime.prototype.plusYears = function(a) {
  return this._resolveLocal(this._dateTime.plusYears(a));
};
ZonedDateTime.prototype.plusMonths = function(a) {
  return this._resolveLocal(this._dateTime.plusMonths(a));
};
ZonedDateTime.prototype.plusWeeks = function(a) {
  return this._resolveLocal(this._dateTime.plusWeeks(a));
};
ZonedDateTime.prototype.plusDays = function(a) {
  return this._resolveLocal(this._dateTime.plusDays(a));
};
ZonedDateTime.prototype.plusHours = function(a) {
  return this._resolveInstant(this._dateTime.plusHours(a));
};
ZonedDateTime.prototype.plusMinutes = function(a) {
  return this._resolveInstant(this._dateTime.plusMinutes(a));
};
ZonedDateTime.prototype.plusSeconds = function(a) {
  return this._resolveInstant(this._dateTime.plusSeconds(a));
};
ZonedDateTime.prototype.plusNanos = function(a) {
  return this._resolveInstant(this._dateTime.plusNanos(a));
};
ZonedDateTime.prototype.minusAmount = function(a) {
  requireNonNull(a, "amount");
  return a.subtractFrom(this);
};
ZonedDateTime.prototype.minusAmountUnit = function(a, b) {
  return this.plusAmountUnit(-1 * a, b);
};
ZonedDateTime.prototype.minusYears = function(a) {
  return this.plusYears(-1 * a);
};
ZonedDateTime.prototype.minusMonths = function(a) {
  return this.plusMonths(-1 * a);
};
ZonedDateTime.prototype.minusWeeks = function(a) {
  return this.plusWeeks(-1 * a);
};
ZonedDateTime.prototype.minusDays = function(a) {
  return this.plusDays(-1 * a);
};
ZonedDateTime.prototype.minusHours = function(a) {
  return this.plusHours(-1 * a);
};
ZonedDateTime.prototype.minusMinutes = function(a) {
  return this.plusMinutes(-1 * a);
};
ZonedDateTime.prototype.minusSeconds = function(a) {
  return this.plusSeconds(-1 * a);
};
ZonedDateTime.prototype.minusNanos = function(a) {
  return this.plusNanos(-1 * a);
};
ZonedDateTime.prototype.query = function(a) {
  if (a === TemporalQueries.localDate()) {
    return this.toLocalDate();
  }
  requireNonNull(a, "query");
  return ChronoZonedDateTime.prototype.query.call(this, a);
};
ZonedDateTime.prototype.until = function(a, b) {
  a = ZonedDateTime.from(a);
  if (b instanceof ChronoUnit) {
    a = a.withZoneSameInstant(this._zone);
    if (b.isDateBased()) {
      return this._dateTime.until(a._dateTime, b);
    }
    var c = this._offset.totalSeconds() - a._offset.totalSeconds();
    a = a._dateTime.plusSeconds(c);
    return this._dateTime.until(a, b);
  }
  return b.between(this, a);
};
ZonedDateTime.prototype.toLocalDateTime = function() {
  return this._dateTime;
};
ZonedDateTime.prototype.toLocalDate = function() {
  return this._dateTime.toLocalDate();
};
ZonedDateTime.prototype.toLocalTime = function() {
  return this._dateTime.toLocalTime();
};
ZonedDateTime.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof ZonedDateTime ? this._dateTime.equals(a._dateTime) && this._offset.equals(a._offset) && this._zone.equals(a._zone) : !1;
};
ZonedDateTime.prototype.hashCode = function() {
  return MathUtil.hashCode(this._dateTime.hashCode(), this._offset.hashCode(), this._zone.hashCode());
};
ZonedDateTime.prototype.toString = function() {
  var a = this._dateTime.toString() + this._offset.toString();
  this._offset !== this._zone && (a += "[" + this._zone.toString() + "]");
  return a;
};
ZonedDateTime.prototype.toJSON = function() {
  return this.toString();
};
ZonedDateTime.prototype.format = function(a) {
  return ChronoZonedDateTime.prototype.format.call(this, a);
};
$jscomp.global.Object.defineProperties(ZonedDateTime, {FROM:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("ZonedDateTime.FROM", function(a) {
    return ZonedDateTime.from(a);
  });
}}});
var ZoneId = function() {
};
ZoneId.prototype.id = function() {
  abstractMethodFail("ZoneId.id");
};
ZoneId.prototype.rules = function() {
  abstractMethodFail("ZoneId.rules");
};
ZoneId.prototype.normalized = function() {
  var a = this.rules();
  return a.isFixedOffset() ? a.offset(Instant.EPOCH) : this;
};
ZoneId.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof ZoneId ? this.id() === a.id() : !1;
};
ZoneId.prototype.hashCode = function() {
  return StringUtil.hashCode(this.id());
};
ZoneId.prototype.toString = function() {
  return this.id();
};
ZoneId.prototype.toJSON = function() {
  return this.toString();
};
$jscomp.global.Object.defineProperties(ZoneId, {systemDefault:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdFactory.systemDefault;
}}, getAvailableZoneIds:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdFactory.getAvailableZoneIds;
}}, of:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdFactory.of;
}}, ofOffset:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdFactory.ofOffset;
}}, from:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdFactory.from;
}}, SYSTEM:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdFactory.SYSTEM_DEFAULT_ZONE_ID_INSTANCE;
}}, UTC:{configurable:!0, enumerable:!0, get:function() {
  return ZoneOffset.ofTotalSeconds(0);
}}});
var ZoneIdFactory = function() {
};
ZoneIdFactory.systemDefault = function() {
  return ZoneIdFactory.SYSTEM_DEFAULT_ZONE_ID_INSTANCE;
};
ZoneIdFactory.getAvailableZoneIds = function() {
  return ZoneRulesProvider.getAvailableZoneIds();
};
ZoneIdFactory.of = function(a) {
  requireNonNull(a, "zoneId");
  if ("Z" === a) {
    return ZoneOffset.UTC;
  }
  if (1 === a.length) {
    throw new DateTimeException("Invalid zone: " + a);
  }
  if (StringUtil.startsWith(a, "+") || StringUtil.startsWith(a, "-")) {
    return ZoneOffset.of(a);
  }
  if ("UTC" === a || "GMT" === a || "GMT0" === a || "UT" === a) {
    return new ZoneRegion(a, ZoneOffset.UTC.rules());
  }
  if (StringUtil.startsWith(a, "UTC+") || StringUtil.startsWith(a, "GMT+") || StringUtil.startsWith(a, "UTC-") || StringUtil.startsWith(a, "GMT-")) {
    var b = ZoneOffset.of(a.substring(3));
    return 0 === b.totalSeconds() ? new ZoneRegion(a.substring(0, 3), b.rules()) : new ZoneRegion(a.substring(0, 3) + b.id(), b.rules());
  }
  return StringUtil.startsWith(a, "UT+") || StringUtil.startsWith(a, "UT-") ? (a = ZoneOffset.of(a.substring(2)), 0 === a.totalSeconds() ? new ZoneRegion("UT", a.rules()) : new ZoneRegion("UT" + a.id(), a.rules())) : "SYSTEM" === a ? ZoneId.systemDefault() : ZoneRegion.ofId(a);
};
ZoneIdFactory.ofOffset = function(a, b) {
  requireNonNull(a, "prefix");
  requireNonNull(b, "offset");
  if (0 === a.length) {
    return b;
  }
  if ("GMT" === a || "UTC" === a || "UT" === a) {
    return 0 === b.totalSeconds() ? new ZoneRegion(a, b.rules()) : new ZoneRegion(a + b.id(), b.rules());
  }
  throw new IllegalArgumentException("Invalid prefix, must be GMT, UTC or UT: " + a);
};
ZoneIdFactory.from = function(a) {
  requireNonNull(a, "temporal");
  var b = a.query(TemporalQueries.zone());
  if (null == b) {
    throw new DateTimeException("Unable to obtain ZoneId from TemporalAccessor: " + a + ", type " + (null != a.constructor ? a.constructor.name : ""));
  }
  return b;
};
$jscomp.global.Object.defineProperties(ZoneIdFactory, {SYSTEM_DEFAULT_ZONE_ID_INSTANCE:{configurable:!0, enumerable:!0, get:function() {
  return new SystemDefaultZoneId;
}}});
var SECONDS_CACHE = {}, ID_CACHE = {}, ZoneOffset = function(a) {
  ZoneId.call(this);
  ZoneOffset._validateTotalSeconds(a);
  this._totalSeconds = MathUtil.safeToInt(a);
  this._rules = ZoneRules.of(this);
  this._id = ZoneOffset._buildId(a);
};
$jscomp.inherits(ZoneOffset, ZoneId);
ZoneOffset.prototype.totalSeconds = function() {
  return this._totalSeconds;
};
ZoneOffset.prototype.id = function() {
  return this._id;
};
ZoneOffset._buildId = function(a) {
  if (0 === a) {
    return "Z";
  }
  var b = Math.abs(a), c = MathUtil.intDiv(b, LocalTime.SECONDS_PER_HOUR), d = MathUtil.intMod(MathUtil.intDiv(b, LocalTime.SECONDS_PER_MINUTE), LocalTime.MINUTES_PER_HOUR);
  a = (0 > a ? "-" : "+") + (10 > c ? "0" : "") + c + (10 > d ? ":0" : ":") + d;
  b = MathUtil.intMod(b, LocalTime.SECONDS_PER_MINUTE);
  0 !== b && (a += (10 > b ? ":0" : ":") + b);
  return a;
};
ZoneOffset._validateTotalSeconds = function(a) {
  if (Math.abs(a) > ZoneOffset.MAX_SECONDS) {
    throw new DateTimeException("Zone offset not in valid range: -18:00 to +18:00");
  }
};
ZoneOffset._validate = function(a, b, c) {
  if (-18 > a || 18 < a) {
    throw new DateTimeException("Zone offset hours not in valid range: value " + a + " is not in the range -18 to 18");
  }
  if (0 < a) {
    if (0 > b || 0 > c) {
      throw new DateTimeException("Zone offset minutes and seconds must be positive because hours is positive");
    }
  } else {
    if (0 > a) {
      if (0 < b || 0 < c) {
        throw new DateTimeException("Zone offset minutes and seconds must be negative because hours is negative");
      }
    } else {
      if (0 < b && 0 > c || 0 > b && 0 < c) {
        throw new DateTimeException("Zone offset minutes and seconds must have the same sign");
      }
    }
  }
  if (59 < Math.abs(b)) {
    throw new DateTimeException("Zone offset minutes not in valid range: abs(value) " + Math.abs(b) + " is not in the range 0 to 59");
  }
  if (59 < Math.abs(c)) {
    throw new DateTimeException("Zone offset seconds not in valid range: abs(value) " + Math.abs(c) + " is not in the range 0 to 59");
  }
  if (18 === Math.abs(a) && (0 < Math.abs(b) || 0 < Math.abs(c))) {
    throw new DateTimeException("Zone offset not in valid range: -18:00 to +18:00");
  }
};
ZoneOffset.of = function(a) {
  requireNonNull(a, "offsetId");
  var b = ID_CACHE[a];
  if (null != b) {
    return b;
  }
  var c;
  switch(a.length) {
    case 2:
      a = a[0] + "0" + a[1];
    case 3:
      b = ZoneOffset._parseNumber(a, 1, !1);
      var d = c = 0;
      break;
    case 5:
      b = ZoneOffset._parseNumber(a, 1, !1);
      c = ZoneOffset._parseNumber(a, 3, !1);
      d = 0;
      break;
    case 6:
      b = ZoneOffset._parseNumber(a, 1, !1);
      c = ZoneOffset._parseNumber(a, 4, !0);
      d = 0;
      break;
    case 7:
      b = ZoneOffset._parseNumber(a, 1, !1);
      c = ZoneOffset._parseNumber(a, 3, !1);
      d = ZoneOffset._parseNumber(a, 5, !1);
      break;
    case 9:
      b = ZoneOffset._parseNumber(a, 1, !1);
      c = ZoneOffset._parseNumber(a, 4, !0);
      d = ZoneOffset._parseNumber(a, 7, !0);
      break;
    default:
      throw new DateTimeException("Invalid ID for ZoneOffset, invalid format: " + a);
  }
  var e = a[0];
  if ("+" !== e && "-" !== e) {
    throw new DateTimeException("Invalid ID for ZoneOffset, plus/minus not found when expected: " + a);
  }
  return "-" === e ? ZoneOffset.ofHoursMinutesSeconds(-b, -c, -d) : ZoneOffset.ofHoursMinutesSeconds(b, c, d);
};
ZoneOffset._parseNumber = function(a, b, c) {
  if (c && ":" !== a[b - 1]) {
    throw new DateTimeException("Invalid ID for ZoneOffset, colon not found when expected: " + a);
  }
  c = a[b];
  b = a[b + 1];
  if ("0" > c || "9" < c || "0" > b || "9" < b) {
    throw new DateTimeException("Invalid ID for ZoneOffset, non numeric characters found: " + a);
  }
  return 10 * (c.charCodeAt(0) - 48) + (b.charCodeAt(0) - 48);
};
ZoneOffset.ofHours = function(a) {
  return ZoneOffset.ofHoursMinutesSeconds(a, 0, 0);
};
ZoneOffset.ofHoursMinutes = function(a, b) {
  return ZoneOffset.ofHoursMinutesSeconds(a, b, 0);
};
ZoneOffset.ofHoursMinutesSeconds = function(a, b, c) {
  ZoneOffset._validate(a, b, c);
  return ZoneOffset.ofTotalSeconds(a * LocalTime.SECONDS_PER_HOUR + b * LocalTime.SECONDS_PER_MINUTE + c);
};
ZoneOffset.ofTotalMinutes = function(a) {
  return ZoneOffset.ofTotalSeconds(a * LocalTime.SECONDS_PER_MINUTE);
};
ZoneOffset.ofTotalSeconds = function(a) {
  if (0 === a % (15 * LocalTime.SECONDS_PER_MINUTE)) {
    var b = SECONDS_CACHE[a];
    null == b && (b = new ZoneOffset(a), SECONDS_CACHE[a] = b, ID_CACHE[b.id()] = b);
    return b;
  }
  return new ZoneOffset(a);
};
ZoneOffset.prototype.rules = function() {
  return this._rules;
};
ZoneOffset.prototype.get = function(a) {
  return this.getLong(a);
};
ZoneOffset.prototype.getLong = function(a) {
  if (a === ChronoField.OFFSET_SECONDS) {
    return this._totalSeconds;
  }
  if (a instanceof ChronoField) {
    throw new DateTimeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
ZoneOffset.prototype.query = function(a) {
  requireNonNull(a, "query");
  return a === TemporalQueries.offset() || a === TemporalQueries.zone() ? this : a === TemporalQueries.localDate() || a === TemporalQueries.localTime() || a === TemporalQueries.precision() || a === TemporalQueries.chronology() || a === TemporalQueries.zoneId() ? 
  null : a.queryFrom(this);
};
ZoneOffset.prototype.adjustInto = function(a) {
  return a.with(ChronoField.OFFSET_SECONDS, this._totalSeconds);
};
ZoneOffset.prototype.compareTo = function(a) {
  requireNonNull(a, "other");
  return a._totalSeconds - this._totalSeconds;
};
ZoneOffset.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof ZoneOffset ? this._totalSeconds === a._totalSeconds : !1;
};
ZoneOffset.prototype.hashCode = function() {
  return this._totalSeconds;
};
ZoneOffset.prototype.toString = function() {
  return this._id;
};
$jscomp.global.Object.defineProperties(ZoneOffset, {MAX_SECONDS:{configurable:!0, enumerable:!0, get:function() {
  return 18 * LocalTime.SECONDS_PER_HOUR;
}}, UTC:{configurable:!0, enumerable:!0, get:function() {
  return ZoneOffset.ofTotalSeconds(0);
}}, MIN:{configurable:!0, enumerable:!0, get:function() {
  return ZoneOffset.ofTotalSeconds(-ZoneOffset.MAX_SECONDS);
}}, MAX:{configurable:!0, enumerable:!0, get:function() {
  return ZoneOffset.ofTotalSeconds(ZoneOffset.MAX_SECONDS);
}}, from:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdFactory.from;
}}});
var ZoneRegion = function(a, b) {
  ZoneId.call(this);
  this._id = a;
  this._rules = b;
};
$jscomp.inherits(ZoneRegion, ZoneId);
ZoneRegion.ofId = function(a) {
  var b = ZoneRulesProvider.getRules(a);
  return new ZoneRegion(a, b);
};
ZoneRegion.prototype.id = function() {
  return this._id;
};
ZoneRegion.prototype.rules = function() {
  return this._rules;
};
var SystemDefaultZoneId = function() {
  ZoneId.call(this);
  this._rules = new SystemDefaultZoneRules;
};
$jscomp.inherits(SystemDefaultZoneId, ZoneId);
SystemDefaultZoneId.prototype.rules = function() {
  return this._rules;
};
SystemDefaultZoneId.prototype.equals = function(a) {
  return this === a ? !0 : !1;
};
SystemDefaultZoneId.prototype.id = function() {
  return "SYSTEM";
};
var ZoneOffsetTransition = function(a, b, c) {
  requireNonNull(a, "transition");
  requireNonNull(b, "offsetBefore");
  requireNonNull(c, "offsetAfter");
  if (b.equals(c)) {
    throw new IllegalArgumentException("Offsets must not be equal");
  }
  if (0 !== a.nano()) {
    throw new IllegalArgumentException("Nano-of-second must be zero");
  }
  this._transition = a instanceof LocalDateTime ? a : LocalDateTime.ofEpochSecond(a, 0, b);
  this._offsetBefore = b;
  this._offsetAfter = c;
};
ZoneOffsetTransition.of = function(a, b, c) {
  return new ZoneOffsetTransition(a, b, c);
};
ZoneOffsetTransition.prototype.instant = function() {
  return this._transition.toInstant(this._offsetBefore);
};
ZoneOffsetTransition.prototype.toEpochSecond = function() {
  return this._transition.toEpochSecond(this._offsetBefore);
};
ZoneOffsetTransition.prototype.dateTimeBefore = function() {
  return this._transition;
};
ZoneOffsetTransition.prototype.dateTimeAfter = function() {
  return this._transition.plusSeconds(this.durationSeconds());
};
ZoneOffsetTransition.prototype.offsetBefore = function() {
  return this._offsetBefore;
};
ZoneOffsetTransition.prototype.offsetAfter = function() {
  return this._offsetAfter;
};
ZoneOffsetTransition.prototype.duration = function() {
  return Duration.ofSeconds(this.durationSeconds());
};
ZoneOffsetTransition.prototype.durationSeconds = function() {
  return this._offsetAfter.totalSeconds() - this._offsetBefore.totalSeconds();
};
ZoneOffsetTransition.prototype.isGap = function() {
  return this._offsetAfter.totalSeconds() > this._offsetBefore.totalSeconds();
};
ZoneOffsetTransition.prototype.isOverlap = function() {
  return this._offsetAfter.totalSeconds() < this._offsetBefore.totalSeconds();
};
ZoneOffsetTransition.prototype.isValidOffset = function(a) {
  return this.isGap() ? !1 : this._offsetBefore.equals(a) || this._offsetAfter.equals(a);
};
ZoneOffsetTransition.prototype.validOffsets = function() {
  return this.isGap() ? [] : [this._offsetBefore, this._offsetAfter];
};
ZoneOffsetTransition.prototype.compareTo = function(a) {
  return this.instant().compareTo(a.instant());
};
ZoneOffsetTransition.prototype.equals = function(a) {
  return a === this ? !0 : a instanceof ZoneOffsetTransition ? this._transition.equals(a._transition) && this._offsetBefore.equals(a.offsetBefore()) && this._offsetAfter.equals(a.offsetAfter()) : !1;
};
ZoneOffsetTransition.prototype.hashCode = function() {
  return this._transition.hashCode() ^ this._offsetBefore.hashCode() ^ this._offsetAfter.hashCode() >>> 16;
};
ZoneOffsetTransition.prototype.toString = function() {
  return "Transition[" + (this.isGap() ? "Gap" : "Overlap") + " at " + this._transition.toString() + this._offsetBefore.toString() + " to " + this._offsetAfter + "]";
};
var ZoneRules = function() {
};
ZoneRules.of = function(a) {
  requireNonNull(a, "offset");
  return new Fixed(a);
};
ZoneRules.prototype.isFixedOffset = function() {
  abstractMethodFail("ZoneRules.isFixedOffset");
};
ZoneRules.prototype.offset = function(a) {
  return a instanceof Instant ? this.offsetOfInstant(a) : this.offsetOfLocalDateTime(a);
};
ZoneRules.prototype.offsetOfInstant = function(a) {
  abstractMethodFail("ZoneRules.offsetInstant");
};
ZoneRules.prototype.offsetOfEpochMilli = function(a) {
  abstractMethodFail("ZoneRules.offsetOfEpochMilli");
};
ZoneRules.prototype.offsetOfLocalDateTime = function(a) {
  abstractMethodFail("ZoneRules.offsetLocalDateTime");
};
ZoneRules.prototype.validOffsets = function(a) {
  abstractMethodFail("ZoneRules.validOffsets");
};
ZoneRules.prototype.transition = function(a) {
  abstractMethodFail("ZoneRules.transition");
};
ZoneRules.prototype.standardOffset = function(a) {
  abstractMethodFail("ZoneRules.standardOffset");
};
ZoneRules.prototype.daylightSavings = function(a) {
  abstractMethodFail("ZoneRules.daylightSavings");
};
ZoneRules.prototype.isDaylightSavings = function(a) {
  abstractMethodFail("ZoneRules.isDaylightSavings");
};
ZoneRules.prototype.isValidOffset = function(a, b) {
  abstractMethodFail("ZoneRules.isValidOffset");
};
ZoneRules.prototype.nextTransition = function(a) {
  abstractMethodFail("ZoneRules.nextTransition");
};
ZoneRules.prototype.previousTransition = function(a) {
  abstractMethodFail("ZoneRules.previousTransition");
};
ZoneRules.prototype.transitions = function() {
  abstractMethodFail("ZoneRules.transitions");
};
ZoneRules.prototype.transitionRules = function() {
  abstractMethodFail("ZoneRules.transitionRules");
};
ZoneRules.prototype.toString = function() {
  abstractMethodFail("ZoneRules.toString");
};
ZoneRules.prototype.toJSON = function() {
  return this.toString();
};
var Fixed = function(a) {
  ZoneRules.call(this);
  this._offset = a;
};
$jscomp.inherits(Fixed, ZoneRules);
Fixed.of = ZoneRules.of;
Fixed.prototype.isFixedOffset = function() {
  return !0;
};
Fixed.prototype.offsetOfInstant = function() {
  return this._offset;
};
Fixed.prototype.offsetOfEpochMilli = function() {
  return this._offset;
};
Fixed.prototype.offsetOfLocalDateTime = function() {
  return this._offset;
};
Fixed.prototype.validOffsets = function() {
  return [this._offset];
};
Fixed.prototype.transition = function() {
  return null;
};
Fixed.prototype.standardOffset = function() {
  return this._offset;
};
Fixed.prototype.daylightSavings = function() {
  return Duration.ZERO;
};
Fixed.prototype.isDaylightSavings = function() {
  return !1;
};
Fixed.prototype.isValidOffset = function(a, b) {
  return this._offset.equals(b);
};
Fixed.prototype.nextTransition = function() {
  return null;
};
Fixed.prototype.previousTransition = function() {
  return null;
};
Fixed.prototype.transitions = function() {
  return [];
};
Fixed.prototype.transitionRules = function() {
  return [];
};
Fixed.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof Fixed ? this._offset.equals(a._offset) : !1;
};
Fixed.prototype.toString = function() {
  return "FixedRules:" + this._offset.toString();
};
var SystemDefaultZoneRules = function() {
  ZoneRules.apply(this, arguments);
};
$jscomp.inherits(SystemDefaultZoneRules, ZoneRules);
SystemDefaultZoneRules.of = ZoneRules.of;
SystemDefaultZoneRules.prototype.isFixedOffset = function() {
  return !1;
};
SystemDefaultZoneRules.prototype.offsetOfInstant = function(a) {
  a = (new Date(a.toEpochMilli())).getTimezoneOffset();
  return ZoneOffset.ofTotalMinutes(-1 * a);
};
SystemDefaultZoneRules.prototype.offsetOfEpochMilli = function(a) {
  a = (new Date(a)).getTimezoneOffset();
  return ZoneOffset.ofTotalMinutes(-1 * a);
};
SystemDefaultZoneRules.prototype.offsetOfLocalDateTime = function(a) {
  a = 1000 * a.toEpochSecond(ZoneOffset.UTC);
  var b = (new Date(a)).getTimezoneOffset();
  a = (new Date(a + 60000 * b)).getTimezoneOffset();
  return ZoneOffset.ofTotalMinutes(-1 * a);
};
SystemDefaultZoneRules.prototype.validOffsets = function(a) {
  return [this.offsetOfLocalDateTime(a)];
};
SystemDefaultZoneRules.prototype.transition = function() {
  return null;
};
SystemDefaultZoneRules.prototype.standardOffset = function(a) {
  return this.offsetOfInstant(a);
};
SystemDefaultZoneRules.prototype.daylightSavings = function() {
  this._throwNotSupported();
};
SystemDefaultZoneRules.prototype.isDaylightSavings = function() {
  this._throwNotSupported();
};
SystemDefaultZoneRules.prototype.isValidOffset = function(a, b) {
  return this.offsetOfLocalDateTime(a).equals(b);
};
SystemDefaultZoneRules.prototype.nextTransition = function() {
  this._throwNotSupported();
};
SystemDefaultZoneRules.prototype.previousTransition = function() {
  this._throwNotSupported();
};
SystemDefaultZoneRules.prototype.transitions = function() {
  this._throwNotSupported();
};
SystemDefaultZoneRules.prototype.transitionRules = function() {
  this._throwNotSupported();
};
SystemDefaultZoneRules.prototype._throwNotSupported = function() {
  throw new DateTimeException("not supported operation");
};
SystemDefaultZoneRules.prototype.equals = function(a) {
  return this === a || a instanceof SystemDefaultZoneRules ? !0 : !1;
};
SystemDefaultZoneRules.prototype.toString = function() {
  return "SYSTEM";
};
var ZoneRulesProvider = function() {
};
ZoneRulesProvider.getRules = function(a) {
  throw new DateTimeException("unsupported ZoneId:" + a);
};
ZoneRulesProvider.getAvailableZoneIds = function() {
  return [];
};
var IsoFields = function() {
}, QUARTER_DAYS = [0, 90, 181, 273, 0, 91, 182, 274], Field = function() {
  TemporalField.apply(this, arguments);
};
$jscomp.inherits(Field, TemporalField);
Field.prototype.isDateBased = function() {
  return !0;
};
Field.prototype.isTimeBased = function() {
  return !1;
};
Field.prototype._isIso = function() {
  return !0;
};
Field._getWeekRangeByLocalDate = function(a) {
  a = Field._getWeekBasedYear(a);
  return ValueRange.of(1, Field._getWeekRangeByYear(a));
};
Field._getWeekRangeByYear = function(a) {
  a = LocalDate.of(a, 1, 1);
  return a.dayOfWeek() === DayOfWeek.THURSDAY || a.dayOfWeek() === DayOfWeek.WEDNESDAY && a.isLeapYear() ? 53 : 52;
};
Field._getWeek = function(a) {
  var b = a.dayOfWeek().ordinal(), c = a.dayOfYear() - 1;
  b = c + (3 - b);
  var d = MathUtil.intDiv(b, 7);
  b = b - 7 * d - 3;
  -3 > b && (b += 7);
  if (c < b) {
    return Field._getWeekRangeByLocalDate(a.withDayOfYear(180).minusYears(1)).maximum();
  }
  c = MathUtil.intDiv(c - b, 7) + 1;
  53 === c && !1 === (-3 === b || -2 === b && a.isLeapYear()) && (c = 1);
  return c;
};
Field._getWeekBasedYear = function(a) {
  var b = a.year(), c = a.dayOfYear();
  if (3 >= c) {
    a = a.dayOfWeek().ordinal(), -2 > c - a && b--;
  } else {
    if (363 <= c) {
      var d = a.dayOfWeek().ordinal();
      c = c - 363 - (a.isLeapYear() ? 1 : 0);
      0 <= c - d && b++;
    }
  }
  return b;
};
Field.prototype.getDisplayName = function() {
  return this.toString();
};
Field.prototype.resolve = function() {
  return null;
};
Field.prototype.name = function() {
  return this.toString();
};
var DAY_OF_QUARTER_FIELD = function() {
  Field.apply(this, arguments);
};
$jscomp.inherits(DAY_OF_QUARTER_FIELD, Field);
DAY_OF_QUARTER_FIELD._getWeekBasedYear = Field._getWeekBasedYear;
DAY_OF_QUARTER_FIELD._getWeek = Field._getWeek;
DAY_OF_QUARTER_FIELD._getWeekRangeByYear = Field._getWeekRangeByYear;
DAY_OF_QUARTER_FIELD._getWeekRangeByLocalDate = Field._getWeekRangeByLocalDate;
DAY_OF_QUARTER_FIELD.prototype.toString = function() {
  return "DayOfQuarter";
};
DAY_OF_QUARTER_FIELD.prototype.baseUnit = function() {
  return ChronoUnit.DAYS;
};
DAY_OF_QUARTER_FIELD.prototype.rangeUnit = function() {
  return QUARTER_YEARS;
};
DAY_OF_QUARTER_FIELD.prototype.range = function() {
  return ValueRange.of(1, 90, 92);
};
DAY_OF_QUARTER_FIELD.prototype.isSupportedBy = function(a) {
  return a.isSupported(ChronoField.DAY_OF_YEAR) && a.isSupported(ChronoField.MONTH_OF_YEAR) && a.isSupported(ChronoField.YEAR) && this._isIso(a);
};
DAY_OF_QUARTER_FIELD.prototype.rangeRefinedBy = function(a) {
  if (!1 === a.isSupported(this)) {
    throw new UnsupportedTemporalTypeException("Unsupported field: DayOfQuarter");
  }
  var b = a.getLong(QUARTER_OF_YEAR);
  return 1 === b ? (a = a.getLong(ChronoField.YEAR), IsoChronology.isLeapYear(a) ? ValueRange.of(1, 91) : ValueRange.of(1, 90)) : 2 === b ? ValueRange.of(1, 91) : 3 === b || 4 === b ? ValueRange.of(1, 92) : this.range();
};
DAY_OF_QUARTER_FIELD.prototype.getFrom = function(a) {
  if (!1 === a.isSupported(this)) {
    throw new UnsupportedTemporalTypeException("Unsupported field: DayOfQuarter");
  }
  var b = a.get(ChronoField.DAY_OF_YEAR), c = a.get(ChronoField.MONTH_OF_YEAR);
  a = a.getLong(ChronoField.YEAR);
  return b - QUARTER_DAYS[MathUtil.intDiv(c - 1, 3) + (IsoChronology.isLeapYear(a) ? 4 : 0)];
};
DAY_OF_QUARTER_FIELD.prototype.adjustInto = function(a, b) {
  var c = this.getFrom(a);
  this.range().checkValidValue(b, this);
  return a.with(ChronoField.DAY_OF_YEAR, a.getLong(ChronoField.DAY_OF_YEAR) + (b - c));
};
DAY_OF_QUARTER_FIELD.prototype.resolve = function(a, b, c) {
  b = a.get(ChronoField.YEAR);
  var d = a.get(QUARTER_OF_YEAR);
  if (null == b || null == d) {
    return null;
  }
  var e = ChronoField.YEAR.checkValidIntValue(b);
  b = a.get(DAY_OF_QUARTER);
  c === ResolverStyle.LENIENT ? (c = LocalDate.of(e, 1, 1), c = c.plusMonths(MathUtil.safeMultiply(MathUtil.safeSubtract(d, 1), 3)), c = c.plusDays(MathUtil.safeSubtract(b, 1))) : (d = QUARTER_OF_YEAR.range().checkValidIntValue(d, QUARTER_OF_YEAR), c === ResolverStyle.STRICT ? (c = 92, 1 === d ? 
  c = IsoChronology.isLeapYear(e) ? 91 : 90 : 2 === d && (c = 91), ValueRange.of(1, c).checkValidValue(b, this)) : this.range().checkValidValue(b, this), c = LocalDate.of(e, 3 * (d - 1) + 1, 1).plusDays(b - 1));
  a.remove(this);
  a.remove(ChronoField.YEAR);
  a.remove(QUARTER_OF_YEAR);
  return c;
};
var QUARTER_OF_YEAR_FIELD = function() {
  Field.apply(this, arguments);
};
$jscomp.inherits(QUARTER_OF_YEAR_FIELD, Field);
QUARTER_OF_YEAR_FIELD._getWeekBasedYear = Field._getWeekBasedYear;
QUARTER_OF_YEAR_FIELD._getWeek = Field._getWeek;
QUARTER_OF_YEAR_FIELD._getWeekRangeByYear = Field._getWeekRangeByYear;
QUARTER_OF_YEAR_FIELD._getWeekRangeByLocalDate = Field._getWeekRangeByLocalDate;
QUARTER_OF_YEAR_FIELD.prototype.toString = function() {
  return "QuarterOfYear";
};
QUARTER_OF_YEAR_FIELD.prototype.baseUnit = function() {
  return QUARTER_YEARS;
};
QUARTER_OF_YEAR_FIELD.prototype.rangeUnit = function() {
  return ChronoUnit.YEARS;
};
QUARTER_OF_YEAR_FIELD.prototype.range = function() {
  return ValueRange.of(1, 4);
};
QUARTER_OF_YEAR_FIELD.prototype.isSupportedBy = function(a) {
  return a.isSupported(ChronoField.MONTH_OF_YEAR) && this._isIso(a);
};
QUARTER_OF_YEAR_FIELD.prototype.rangeRefinedBy = function(a) {
  return this.range();
};
QUARTER_OF_YEAR_FIELD.prototype.getFrom = function(a) {
  if (!1 === a.isSupported(this)) {
    throw new UnsupportedTemporalTypeException("Unsupported field: QuarterOfYear");
  }
  a = a.getLong(ChronoField.MONTH_OF_YEAR);
  return MathUtil.intDiv(a + 2, 3);
};
QUARTER_OF_YEAR_FIELD.prototype.adjustInto = function(a, b) {
  var c = this.getFrom(a);
  this.range().checkValidValue(b, this);
  return a.with(ChronoField.MONTH_OF_YEAR, a.getLong(ChronoField.MONTH_OF_YEAR) + 3 * (b - c));
};
var WEEK_OF_WEEK_BASED_YEAR_FIELD = function() {
  Field.apply(this, arguments);
};
$jscomp.inherits(WEEK_OF_WEEK_BASED_YEAR_FIELD, Field);
WEEK_OF_WEEK_BASED_YEAR_FIELD._getWeekBasedYear = Field._getWeekBasedYear;
WEEK_OF_WEEK_BASED_YEAR_FIELD._getWeek = Field._getWeek;
WEEK_OF_WEEK_BASED_YEAR_FIELD._getWeekRangeByYear = Field._getWeekRangeByYear;
WEEK_OF_WEEK_BASED_YEAR_FIELD._getWeekRangeByLocalDate = Field._getWeekRangeByLocalDate;
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.toString = function() {
  return "WeekOfWeekBasedYear";
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.baseUnit = function() {
  return ChronoUnit.WEEKS;
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.rangeUnit = function() {
  return WEEK_BASED_YEARS;
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.range = function() {
  return ValueRange.of(1, 52, 53);
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.isSupportedBy = function(a) {
  return a.isSupported(ChronoField.EPOCH_DAY) && this._isIso(a);
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.rangeRefinedBy = function(a) {
  if (!1 === a.isSupported(this)) {
    throw new UnsupportedTemporalTypeException("Unsupported field: WeekOfWeekBasedYear");
  }
  return Field._getWeekRangeByLocalDate(LocalDate.from(a));
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.getFrom = function(a) {
  if (!1 === a.isSupported(this)) {
    throw new UnsupportedTemporalTypeException("Unsupported field: WeekOfWeekBasedYear");
  }
  return Field._getWeek(LocalDate.from(a));
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.adjustInto = function(a, b) {
  this.range().checkValidValue(b, this);
  return a.plus(MathUtil.safeSubtract(b, this.getFrom(a)), ChronoUnit.WEEKS);
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.resolve = function(a, b, c) {
  b = a.get(WEEK_BASED_YEAR);
  var d = a.get(ChronoField.DAY_OF_WEEK);
  if (null == b || null == d) {
    return null;
  }
  b = WEEK_BASED_YEAR.range().checkValidIntValue(b, WEEK_BASED_YEAR);
  var e = a.get(WEEK_OF_WEEK_BASED_YEAR);
  c === ResolverStyle.LENIENT ? (c = d, d = 0, 7 < c ? (d = MathUtil.intDiv(c - 1, 7), c = MathUtil.intMod(c - 1, 7) + 1) : 1 > c && (d = MathUtil.intDiv(c, 7) - 1, c = MathUtil.intMod(c, 7) + 7), b = LocalDate.of(b, 1, 4).plusWeeks(e - 1).plusWeeks(d).with(ChronoField.DAY_OF_WEEK, 
  c)) : (d = ChronoField.DAY_OF_WEEK.checkValidIntValue(d), c === ResolverStyle.STRICT ? (c = LocalDate.of(b, 1, 4), Field._getWeekRangeByLocalDate(c).checkValidValue(e, this)) : this.range().checkValidValue(e, this), b = LocalDate.of(b, 1, 4).plusWeeks(e - 1).with(ChronoField.DAY_OF_WEEK, d));
  a.remove(this);
  a.remove(WEEK_BASED_YEAR);
  a.remove(ChronoField.DAY_OF_WEEK);
  return b;
};
WEEK_OF_WEEK_BASED_YEAR_FIELD.prototype.getDisplayName = function() {
  return "Week";
};
var WEEK_BASED_YEAR_FIELD = function() {
  Field.apply(this, arguments);
};
$jscomp.inherits(WEEK_BASED_YEAR_FIELD, Field);
WEEK_BASED_YEAR_FIELD._getWeekBasedYear = Field._getWeekBasedYear;
WEEK_BASED_YEAR_FIELD._getWeek = Field._getWeek;
WEEK_BASED_YEAR_FIELD._getWeekRangeByYear = Field._getWeekRangeByYear;
WEEK_BASED_YEAR_FIELD._getWeekRangeByLocalDate = Field._getWeekRangeByLocalDate;
WEEK_BASED_YEAR_FIELD.prototype.toString = function() {
  return "WeekBasedYear";
};
WEEK_BASED_YEAR_FIELD.prototype.baseUnit = function() {
  return WEEK_BASED_YEARS;
};
WEEK_BASED_YEAR_FIELD.prototype.rangeUnit = function() {
  return ChronoUnit.FOREVER;
};
WEEK_BASED_YEAR_FIELD.prototype.range = function() {
  return ChronoField.YEAR.range();
};
WEEK_BASED_YEAR_FIELD.prototype.isSupportedBy = function(a) {
  return a.isSupported(ChronoField.EPOCH_DAY) && this._isIso(a);
};
WEEK_BASED_YEAR_FIELD.prototype.rangeRefinedBy = function(a) {
  return ChronoField.YEAR.range();
};
WEEK_BASED_YEAR_FIELD.prototype.getFrom = function(a) {
  if (!1 === a.isSupported(this)) {
    throw new UnsupportedTemporalTypeException("Unsupported field: WeekBasedYear");
  }
  return Field._getWeekBasedYear(LocalDate.from(a));
};
WEEK_BASED_YEAR_FIELD.prototype.adjustInto = function(a, b) {
  if (!1 === this.isSupportedBy(a)) {
    throw new UnsupportedTemporalTypeException("Unsupported field: WeekBasedYear");
  }
  var c = this.range().checkValidIntValue(b, WEEK_BASED_YEAR), d = LocalDate.from(a);
  b = d.get(ChronoField.DAY_OF_WEEK);
  d = Field._getWeek(d);
  53 === d && 52 === Field._getWeekRangeByYear(c) && (d = 52);
  c = LocalDate.of(c, 1, 4);
  b = b - c.get(ChronoField.DAY_OF_WEEK) + 7 * (d - 1);
  c = c.plusDays(b);
  return a.with(c);
};
var Unit = function(a, b) {
  TemporalUnit.call(this);
  this._name = a;
  this._duration = b;
};
$jscomp.inherits(Unit, TemporalUnit);
Unit.prototype.duration = function() {
  return this._duration;
};
Unit.prototype.isDurationEstimated = function() {
  return !0;
};
Unit.prototype.isDateBased = function() {
  return !0;
};
Unit.prototype.isTimeBased = function() {
  return !1;
};
Unit.prototype.isSupportedBy = function(a) {
  return a.isSupported(ChronoField.EPOCH_DAY);
};
Unit.prototype.addTo = function(a, b) {
  switch(this) {
    case WEEK_BASED_YEARS:
      return b = MathUtil.safeAdd(a.get(WEEK_BASED_YEAR), b), a.with(WEEK_BASED_YEAR, b);
    case QUARTER_YEARS:
      return a.plus(MathUtil.intDiv(b, 256), ChronoUnit.YEARS).plus(3 * MathUtil.intMod(b, 256), ChronoUnit.MONTHS);
    default:
      throw new IllegalStateException("Unreachable");
  }
};
Unit.prototype.between = function(a, b) {
  switch(this) {
    case WEEK_BASED_YEARS:
      return MathUtil.safeSubtract(b.getLong(WEEK_BASED_YEAR), a.getLong(WEEK_BASED_YEAR));
    case QUARTER_YEARS:
      return MathUtil.intDiv(a.until(b, ChronoUnit.MONTHS), 3);
    default:
      throw new IllegalStateException("Unreachable");
  }
};
Unit.prototype.toString = function() {
  return this._name;
};
$jscomp.global.Object.defineProperties(Unit, {DAY_OF_QUARTER:{configurable:!0, enumerable:!0, get:function() {
  delete IsoFields.DAY_OF_QUARTER;
  IsoFields.DAY_OF_QUARTER = new DAY_OF_QUARTER_FIELD;
  return IsoFields.DAY_OF_QUARTER;
}}, QUARTER_OF_YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete IsoFields.QUARTER_OF_YEAR;
  IsoFields.QUARTER_OF_YEAR = new QUARTER_OF_YEAR_FIELD;
  return IsoFields.QUARTER_OF_YEAR;
}}, WEEK_OF_WEEK_BASED_YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete IsoFields.WEEK_OF_WEEK_BASED_YEAR;
  IsoFields.WEEK_OF_WEEK_BASED_YEAR = new WEEK_OF_WEEK_BASED_YEAR_FIELD;
  return IsoFields.WEEK_OF_WEEK_BASED_YEAR;
}}, WEEK_BASED_YEAR:{configurable:!0, enumerable:!0, get:function() {
  delete IsoFields.WEEK_BASED_YEAR;
  IsoFields.WEEK_BASED_YEAR = new WEEK_BASED_YEAR_FIELD;
  return IsoFields.WEEK_BASED_YEAR;
}}, WEEK_BASED_YEARS:{configurable:!0, enumerable:!0, get:function() {
  delete IsoFields.WEEK_BASED_YEARS;
  IsoFields.WEEK_BASED_YEARS = new Unit("WeekBasedYears", Duration.ofSeconds(31556952));
  return IsoFields.WEEK_BASED_YEARS;
}}, QUARTER_YEARS:{configurable:!0, enumerable:!0, get:function() {
  delete IsoFields.QUARTER_YEARS;
  IsoFields.QUARTER_YEARS = new Unit("QuarterYears", Duration.ofSeconds(7889238));
  return IsoFields.QUARTER_YEARS;
}}});
LocalDate.prototype.isoWeekOfWeekyear = function() {
  return this.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
};
LocalDate.prototype.isoWeekyear = function() {
  return this.get(IsoFields.WEEK_BASED_YEAR);
};
var ValueRange = function(a, b, c, d) {
  assert(!(a > b), "Smallest minimum value '" + a + "' must be less than largest minimum value '" + b + "'", IllegalArgumentException);
  assert(!(c > d), "Smallest maximum value '" + c + "' must be less than largest maximum value '" + d + "'", IllegalArgumentException);
  assert(!(b > d), "Minimum value '" + b + "' must be less than maximum value '" + d + "'", IllegalArgumentException);
  this._minSmallest = a;
  this._minLargest = b;
  this._maxLargest = d;
  this._maxSmallest = c;
};
ValueRange.prototype.isFixed = function() {
  return this._minSmallest === this._minLargest && this._maxSmallest === this._maxLargest;
};
ValueRange.prototype.minimum = function() {
  return this._minSmallest;
};
ValueRange.prototype.largestMinimum = function() {
  return this._minLargest;
};
ValueRange.prototype.maximum = function() {
  return this._maxLargest;
};
ValueRange.prototype.smallestMaximum = function() {
  return this._maxSmallest;
};
ValueRange.prototype.isValidValue = function(a) {
  return this.minimum() <= a && a <= this.maximum();
};
ValueRange.prototype.checkValidValue = function(a, b) {
  if (!this.isValidValue(a)) {
    return a = null != b ? "Invalid value for " + b + " (valid values " + this.toString() + "): " + a : "Invalid value (valid values " + this.toString() + "): " + a, assert(!1, a, DateTimeException);
  }
};
ValueRange.prototype.checkValidIntValue = function(a, b) {
  if (!1 === this.isValidIntValue(a)) {
    throw new DateTimeException("Invalid int value for " + b + ": " + a);
  }
  return a;
};
ValueRange.prototype.isValidIntValue = function(a) {
  return this.isIntValue() && this.isValidValue(a);
};
ValueRange.prototype.isIntValue = function() {
  return this.minimum() >= MathUtil.MIN_SAFE_INTEGER && this.maximum() <= MathUtil.MAX_SAFE_INTEGER;
};
ValueRange.prototype.equals = function(a) {
  return a === this ? !0 : a instanceof ValueRange ? this._minSmallest === a._minSmallest && this._minLargest === a._minLargest && this._maxSmallest === a._maxSmallest && this._maxLargest === a._maxLargest : !1;
};
ValueRange.prototype.hashCode = function() {
  return MathUtil.hashCode(this._minSmallest, this._minLargest, this._maxSmallest, this._maxLargest);
};
ValueRange.prototype.toString = function() {
  var a = this.minimum() + (this.minimum() !== this.largestMinimum() ? "/" + this.largestMinimum() : "");
  return a = a + " - " + (this.smallestMaximum() + (this.smallestMaximum() !== this.maximum() ? "/" + this.maximum() : ""));
};
ValueRange.of = function() {
  return 2 === arguments.length ? new ValueRange(arguments[0], arguments[0], arguments[1], arguments[1]) : 3 === arguments.length ? new ValueRange(arguments[0], arguments[0], arguments[1], arguments[2]) : 4 === arguments.length ? new ValueRange(arguments[0], arguments[1], arguments[2], arguments[3]) : assert(!1, "Invalid number of arguments " + arguments.length, 
  IllegalArgumentException);
};
var DateTimeBuilder = function() {
  TemporalAccessor.call(this);
  this.fieldValues = new EnumMap;
  this.time = this.date = this.zone = this.chrono = null;
  this.leapSecond = !1;
  this.excessDays = null;
};
$jscomp.inherits(DateTimeBuilder, TemporalAccessor);
DateTimeBuilder.create = function(a, b) {
  var c = new DateTimeBuilder;
  c._addFieldValue(a, b);
  return c;
};
DateTimeBuilder.prototype.getFieldValue0 = function(a) {
  return this.fieldValues.get(a);
};
DateTimeBuilder.prototype._addFieldValue = function(a, b) {
  requireNonNull(a, "field");
  var c = this.getFieldValue0(a);
  if (null != c && c !== b) {
    throw new DateTimeException("Conflict found: " + a + " " + c + " differs from " + a + " " + b + ": " + this);
  }
  return this._putFieldValue0(a, b);
};
DateTimeBuilder.prototype._putFieldValue0 = function(a, b) {
  this.fieldValues.put(a, b);
  return this;
};
DateTimeBuilder.prototype.resolve = function(a, b) {
  null != b && this.fieldValues.retainAll(b);
  this._mergeDate(a);
  this._mergeTime(a);
  this._resolveTimeInferZeroes(a);
  null != this.excessDays && !1 === this.excessDays.isZero() && null != this.date && null != this.time && (this.date = this.date.plus(this.excessDays), this.excessDays = Period.ZERO);
  this._resolveInstant();
  return this;
};
DateTimeBuilder.prototype._mergeDate = function(a) {
  this._checkDate(IsoChronology.INSTANCE.resolveDate(this.fieldValues, a));
};
DateTimeBuilder.prototype._checkDate = function(a) {
  if (null != a) {
    this._addObject(a);
    for (var b in this.fieldValues.keySet()) {
      var c = ChronoField.byName(b);
      if (c && void 0 !== this.fieldValues.get(c) && c.isDateBased()) {
        var d = void 0;
        try {
          d = a.getLong(c);
        } catch (f) {
          if (f instanceof DateTimeException) {
            continue;
          } else {
            throw f;
          }
        }
        var e = this.fieldValues.get(c);
        if (d !== e) {
          throw new DateTimeException("Conflict found: Field " + c + " " + d + " differs from " + c + " " + e + " derived from " + a);
        }
      }
    }
  }
};
DateTimeBuilder.prototype._mergeTime = function(a) {
  if (this.fieldValues.containsKey(ChronoField.CLOCK_HOUR_OF_DAY)) {
    var b = this.fieldValues.remove(ChronoField.CLOCK_HOUR_OF_DAY);
    a === ResolverStyle.LENIENT || a === ResolverStyle.SMART && 0 === b || ChronoField.CLOCK_HOUR_OF_DAY.checkValidValue(b);
    this._addFieldValue(ChronoField.HOUR_OF_DAY, 24 === b ? 0 : b);
  }
  this.fieldValues.containsKey(ChronoField.CLOCK_HOUR_OF_AMPM) && (b = this.fieldValues.remove(ChronoField.CLOCK_HOUR_OF_AMPM), a === ResolverStyle.LENIENT || a === ResolverStyle.SMART && 0 === b || ChronoField.CLOCK_HOUR_OF_AMPM.checkValidValue(b), this._addFieldValue(ChronoField.HOUR_OF_AMPM, 12 === 
  b ? 0 : b));
  a !== ResolverStyle.LENIENT && (this.fieldValues.containsKey(ChronoField.AMPM_OF_DAY) && ChronoField.AMPM_OF_DAY.checkValidValue(this.fieldValues.get(ChronoField.AMPM_OF_DAY)), this.fieldValues.containsKey(ChronoField.HOUR_OF_AMPM) && ChronoField.HOUR_OF_AMPM.checkValidValue(this.fieldValues.get(ChronoField.HOUR_OF_AMPM)));
  if (this.fieldValues.containsKey(ChronoField.AMPM_OF_DAY) && this.fieldValues.containsKey(ChronoField.HOUR_OF_AMPM)) {
    b = this.fieldValues.remove(ChronoField.AMPM_OF_DAY);
    var c = this.fieldValues.remove(ChronoField.HOUR_OF_AMPM);
    this._addFieldValue(ChronoField.HOUR_OF_DAY, 12 * b + c);
  }
  this.fieldValues.containsKey(ChronoField.NANO_OF_DAY) && (b = this.fieldValues.remove(ChronoField.NANO_OF_DAY), a !== ResolverStyle.LENIENT && ChronoField.NANO_OF_DAY.checkValidValue(b), this._addFieldValue(ChronoField.SECOND_OF_DAY, MathUtil.intDiv(b, 1000000000)), this._addFieldValue(ChronoField.NANO_OF_SECOND, 
  MathUtil.intMod(b, 1000000000)));
  this.fieldValues.containsKey(ChronoField.MICRO_OF_DAY) && (b = this.fieldValues.remove(ChronoField.MICRO_OF_DAY), a !== ResolverStyle.LENIENT && ChronoField.MICRO_OF_DAY.checkValidValue(b), this._addFieldValue(ChronoField.SECOND_OF_DAY, MathUtil.intDiv(b, 1000000)), this._addFieldValue(ChronoField.MICRO_OF_SECOND, 
  MathUtil.intMod(b, 1000000)));
  this.fieldValues.containsKey(ChronoField.MILLI_OF_DAY) && (b = this.fieldValues.remove(ChronoField.MILLI_OF_DAY), a !== ResolverStyle.LENIENT && ChronoField.MILLI_OF_DAY.checkValidValue(b), this._addFieldValue(ChronoField.SECOND_OF_DAY, MathUtil.intDiv(b, 1000)), this._addFieldValue(ChronoField.MILLI_OF_SECOND, 
  MathUtil.intMod(b, 1000)));
  this.fieldValues.containsKey(ChronoField.SECOND_OF_DAY) && (b = this.fieldValues.remove(ChronoField.SECOND_OF_DAY), a !== ResolverStyle.LENIENT && ChronoField.SECOND_OF_DAY.checkValidValue(b), this._addFieldValue(ChronoField.HOUR_OF_DAY, MathUtil.intDiv(b, 3600)), this._addFieldValue(ChronoField.MINUTE_OF_HOUR, 
  MathUtil.intMod(MathUtil.intDiv(b, 60), 60)), this._addFieldValue(ChronoField.SECOND_OF_MINUTE, MathUtil.intMod(b, 60)));
  this.fieldValues.containsKey(ChronoField.MINUTE_OF_DAY) && (b = this.fieldValues.remove(ChronoField.MINUTE_OF_DAY), a !== ResolverStyle.LENIENT && ChronoField.MINUTE_OF_DAY.checkValidValue(b), this._addFieldValue(ChronoField.HOUR_OF_DAY, MathUtil.intDiv(b, 60)), this._addFieldValue(ChronoField.MINUTE_OF_HOUR, 
  MathUtil.intMod(b, 60)));
  a !== ResolverStyle.LENIENT && (this.fieldValues.containsKey(ChronoField.MILLI_OF_SECOND) && ChronoField.MILLI_OF_SECOND.checkValidValue(this.fieldValues.get(ChronoField.MILLI_OF_SECOND)), this.fieldValues.containsKey(ChronoField.MICRO_OF_SECOND) && ChronoField.MICRO_OF_SECOND.checkValidValue(this.fieldValues.get(ChronoField.MICRO_OF_SECOND)));
  this.fieldValues.containsKey(ChronoField.MILLI_OF_SECOND) && this.fieldValues.containsKey(ChronoField.MICRO_OF_SECOND) && (a = this.fieldValues.remove(ChronoField.MILLI_OF_SECOND), b = this.fieldValues.get(ChronoField.MICRO_OF_SECOND), this._putFieldValue0(ChronoField.MICRO_OF_SECOND, 1000 * a + MathUtil.intMod(b, 
  1000)));
  this.fieldValues.containsKey(ChronoField.MICRO_OF_SECOND) && this.fieldValues.containsKey(ChronoField.NANO_OF_SECOND) && (a = this.fieldValues.get(ChronoField.NANO_OF_SECOND), this._putFieldValue0(ChronoField.MICRO_OF_SECOND, MathUtil.intDiv(a, 1000)), this.fieldValues.remove(ChronoField.MICRO_OF_SECOND));
  this.fieldValues.containsKey(ChronoField.MILLI_OF_SECOND) && this.fieldValues.containsKey(ChronoField.NANO_OF_SECOND) && (a = this.fieldValues.get(ChronoField.NANO_OF_SECOND), this._putFieldValue0(ChronoField.MILLI_OF_SECOND, MathUtil.intDiv(a, 1000000)), this.fieldValues.remove(ChronoField.MILLI_OF_SECOND));
  this.fieldValues.containsKey(ChronoField.MICRO_OF_SECOND) ? (a = this.fieldValues.remove(ChronoField.MICRO_OF_SECOND), this._putFieldValue0(ChronoField.NANO_OF_SECOND, 1000 * a)) : this.fieldValues.containsKey(ChronoField.MILLI_OF_SECOND) && (a = this.fieldValues.remove(ChronoField.MILLI_OF_SECOND), this._putFieldValue0(ChronoField.NANO_OF_SECOND, 
  1000000 * a));
};
DateTimeBuilder.prototype._resolveTimeInferZeroes = function(a) {
  var b = this.fieldValues.get(ChronoField.HOUR_OF_DAY), c = this.fieldValues.get(ChronoField.MINUTE_OF_HOUR), d = this.fieldValues.get(ChronoField.SECOND_OF_MINUTE), e = this.fieldValues.get(ChronoField.NANO_OF_SECOND);
  null == b || null == c && (null != d || null != e) || null != c && null == d && null != e || (a !== ResolverStyle.LENIENT ? null != b && (a !== ResolverStyle.SMART || 24 !== b || null != c && 0 !== c || null != d && 0 !== d || null != e && 0 !== e || (b = 0, this.excessDays = Period.ofDays(1)), a = ChronoField.HOUR_OF_DAY.checkValidIntValue(b), null != c ? (c = 
  ChronoField.MINUTE_OF_HOUR.checkValidIntValue(c), null != d ? (d = ChronoField.SECOND_OF_MINUTE.checkValidIntValue(d), null != e ? (e = ChronoField.NANO_OF_SECOND.checkValidIntValue(e), this._addObject(LocalTime.of(a, c, d, e))) : this._addObject(LocalTime.of(a, c, d))) : null == e && this._addObject(LocalTime.of(a, 
  c))) : null == d && null == e && this._addObject(LocalTime.of(a, 0))) : null != b && (a = b, null != c ? null != d ? (null == e && (e = 0), a = MathUtil.safeMultiply(a, 3600000000000), a = MathUtil.safeAdd(a, MathUtil.safeMultiply(c, 60000000000)), a = MathUtil.safeAdd(a, MathUtil.safeMultiply(d, 
  1000000000)), a = MathUtil.safeAdd(a, e), e = MathUtil.floorDiv(a, 86400000000000), c = MathUtil.floorMod(a, 86400000000000), this._addObject(LocalTime.ofNanoOfDay(c)), this.excessDays = Period.ofDays(e)) : (e = MathUtil.safeMultiply(a, 3600), e = MathUtil.safeAdd(e, 
  MathUtil.safeMultiply(c, 60)), c = MathUtil.floorDiv(e, 86400), e = MathUtil.floorMod(e, 86400), this._addObject(LocalTime.ofSecondOfDay(e)), this.excessDays = Period.ofDays(c)) : (e = MathUtil.safeToInt(MathUtil.floorDiv(a, 24)), a = MathUtil.floorMod(a, 
  24), this._addObject(LocalTime.of(a, 0)), this.excessDays = Period.ofDays(e))), this.fieldValues.remove(ChronoField.HOUR_OF_DAY), this.fieldValues.remove(ChronoField.MINUTE_OF_HOUR), this.fieldValues.remove(ChronoField.SECOND_OF_MINUTE), this.fieldValues.remove(ChronoField.NANO_OF_SECOND));
};
DateTimeBuilder.prototype._addObject = function(a) {
  a instanceof ChronoLocalDate ? this.date = a : a instanceof LocalTime && (this.time = a);
};
DateTimeBuilder.prototype._resolveInstant = function() {
  if (null != this.date && null != this.time) {
    var a = this.fieldValues.get(ChronoField.OFFSET_SECONDS);
    null != a ? (a = ZoneOffset.ofTotalSeconds(a), a = this.date.atTime(this.time).atZone(a).getLong(ChronoField.INSTANT_SECONDS), this.fieldValues.put(ChronoField.INSTANT_SECONDS, a)) : null != this.zone && (a = this.date.atTime(this.time).atZone(this.zone).getLong(ChronoField.INSTANT_SECONDS), this.fieldValues.put(ChronoField.INSTANT_SECONDS, 
    a));
  }
};
DateTimeBuilder.prototype.build = function(a) {
  return a.queryFrom(this);
};
DateTimeBuilder.prototype.isSupported = function(a) {
  return null == a ? !1 : this.fieldValues.containsKey(a) && void 0 !== this.fieldValues.get(a) || null != this.date && this.date.isSupported(a) || null != this.time && this.time.isSupported(a);
};
DateTimeBuilder.prototype.getLong = function(a) {
  requireNonNull(a, "field");
  var b = this.getFieldValue0(a);
  if (null == b) {
    if (null != this.date && this.date.isSupported(a)) {
      return this.date.getLong(a);
    }
    if (null != this.time && this.time.isSupported(a)) {
      return this.time.getLong(a);
    }
    throw new DateTimeException("Field not found: " + a);
  }
  return b;
};
DateTimeBuilder.prototype.query = function(a) {
  return a === TemporalQueries.zoneId() ? this.zone : a === TemporalQueries.chronology() ? this.chrono : a === TemporalQueries.localDate() ? null != this.date ? LocalDate.from(this.date) : null : a === TemporalQueries.localTime() ? this.time : a !== TemporalQueries.zone() && a !== TemporalQueries.offset() && 
  a === TemporalQueries.precision() ? null : a.queryFrom(this);
};
var DateTimeFormatter = function(a, b, c, d, e, f, g) {
  f = void 0 === f ? IsoChronology.INSTANCE : f;
  assert(null != a);
  assert(null != c);
  assert(null != d);
  this._printerParser = a;
  this._locale = b;
  this._decimalStyle = c;
  this._resolverStyle = d;
  this._resolverFields = e;
  this._chrono = f;
  this._zone = g;
};
DateTimeFormatter.parsedExcessDays = function() {
  return DateTimeFormatter.PARSED_EXCESS_DAYS;
};
DateTimeFormatter.parsedLeapSecond = function() {
  return DateTimeFormatter.PARSED_LEAP_SECOND;
};
DateTimeFormatter.ofPattern = function(a) {
  return (new DateTimeFormatterBuilder).appendPattern(a).toFormatter();
};
DateTimeFormatter.prototype.locale = function() {
  return this._locale;
};
DateTimeFormatter.prototype.decimalStyle = function() {
  return this._decimalStyle;
};
DateTimeFormatter.prototype.chronology = function() {
  return this._chrono;
};
DateTimeFormatter.prototype.withChronology = function(a) {
  return null != this._chrono && this._chrono.equals(a) ? this : new DateTimeFormatter(this._printerParser, this._locale, this._decimalStyle, this._resolverStyle, this._resolverFields, a, this._zone);
};
DateTimeFormatter.prototype.withLocale = function() {
  return this;
};
DateTimeFormatter.prototype.withResolverStyle = function(a) {
  requireNonNull(a, "resolverStyle");
  return a.equals(this._resolverStyle) ? this : new DateTimeFormatter(this._printerParser, this._locale, this._decimalStyle, a, this._resolverFields, this._chrono, this._zone);
};
DateTimeFormatter.prototype.format = function(a) {
  var b = new StringBuilder(32);
  this._formatTo(a, b);
  return b.toString();
};
DateTimeFormatter.prototype._formatTo = function(a, b) {
  requireNonNull(a, "temporal");
  requireNonNull(b, "appendable");
  a = new DateTimePrintContext(a, this);
  this._printerParser.print(a, b);
};
DateTimeFormatter.prototype.parse = function(a, b) {
  return 1 === arguments.length ? this.parse1(a) : this.parse2(a, b);
};
DateTimeFormatter.prototype.parse1 = function(a) {
  requireNonNull(a, "text");
  try {
    return this._parseToBuilder(a, null).resolve(this._resolverStyle, this._resolverFields);
  } catch (b) {
    if (b instanceof DateTimeParseException) {
      throw b;
    }
    throw this._createError(a, b);
  }
};
DateTimeFormatter.prototype.parse2 = function(a, b) {
  requireNonNull(a, "text");
  requireNonNull(b, "type");
  try {
    return this._parseToBuilder(a, null).resolve(this._resolverStyle, this._resolverFields).build(b);
  } catch (c) {
    if (c instanceof DateTimeParseException) {
      throw c;
    }
    throw this._createError(a, c);
  }
};
DateTimeFormatter.prototype._createError = function(a, b) {
  var c = 64 < a.length ? a.substring(0, 64) + "..." : a;
  return new DateTimeParseException("Text '" + c + "' could not be parsed: " + b.message, a, 0, b);
};
DateTimeFormatter.prototype._parseToBuilder = function(a, b) {
  var c = null != b ? b : new ParsePosition(0), d = this._parseUnresolved0(a, c);
  if (null == d || 0 <= c.getErrorIndex() || null == b && c.getIndex() < a.length) {
    b = 64 < a.length ? a.substr(0, 64).toString() + "..." : a;
    if (0 <= c.getErrorIndex()) {
      throw new DateTimeParseException("Text '" + b + "' could not be parsed at index " + c.getErrorIndex(), a, c.getErrorIndex());
    }
    throw new DateTimeParseException("Text '" + b + "' could not be parsed, unparsed text found at index " + c.getIndex(), a, c.getIndex());
  }
  return d.toBuilder();
};
DateTimeFormatter.prototype.parseUnresolved = function(a, b) {
  return this._parseUnresolved0(a, b);
};
DateTimeFormatter.prototype._parseUnresolved0 = function(a, b) {
  assert(null != a, "text", NullPointerException);
  assert(null != b, "position", NullPointerException);
  var c = new DateTimeParseContext(this), d = b.getIndex();
  d = this._printerParser.parse(c, a, d);
  if (0 > d) {
    return b.setErrorIndex(~d), null;
  }
  b.setIndex(d);
  return c.toParsed();
};
DateTimeFormatter.prototype._toPrinterParser = function(a) {
  return this._printerParser.withOptional(a);
};
DateTimeFormatter.prototype.toString = function() {
  var a = this._printerParser.toString();
  return 0 === a.indexOf("[") ? a : a.substring(1, a.length - 1);
};
$jscomp.global.Object.defineProperties(DateTimeFormatter, {ISO_LOCAL_DATE:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD).appendLiteral("-").appendValue(ChronoField.MONTH_OF_YEAR, 2).appendLiteral("-").appendValue(ChronoField.DAY_OF_MONTH, 2).toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);
}}, ISO_LOCAL_TIME:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendValue(ChronoField.HOUR_OF_DAY, 2).appendLiteral(":").appendValue(ChronoField.MINUTE_OF_HOUR, 2).optionalStart().appendLiteral(":").appendValue(ChronoField.SECOND_OF_MINUTE, 2).optionalStart().appendFraction(ChronoField.NANO_OF_SECOND, 0, 9, !0).toFormatter(ResolverStyle.STRICT);
}}, ISO_LOCAL_DATE_TIME:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).parseCaseInsensitive().append(DateTimeFormatter.ISO_LOCAL_DATE).appendLiteral("T").append(DateTimeFormatter.ISO_LOCAL_TIME).toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);
}}, ISO_INSTANT:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).parseCaseInsensitive().appendInstant().toFormatter(ResolverStyle.STRICT);
}}, ISO_OFFSET_DATE_TIME:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).parseCaseInsensitive().append(DateTimeFormatter.ISO_LOCAL_DATE_TIME).appendOffsetId().toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);
}}, ISO_ZONED_DATE_TIME:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).append(DateTimeFormatter.ISO_OFFSET_DATE_TIME).optionalStart().appendLiteral("[").parseCaseSensitive().appendZoneId().appendLiteral("]").toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);
}}, BASIC_ISO_DATE:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD).appendValue(ChronoField.MONTH_OF_YEAR, 2).appendValue(ChronoField.DAY_OF_MONTH, 2).toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);
}}, ISO_OFFSET_DATE:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).parseCaseInsensitive().append(DateTimeFormatter.ISO_LOCAL_DATE).appendOffsetId().toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);
}}, ISO_OFFSET_TIME:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).parseCaseInsensitive().append(DateTimeFormatter.ISO_LOCAL_TIME).appendOffsetId().toFormatter(ResolverStyle.STRICT).withChronology(IsoChronology.INSTANCE);
}}, ISO_ORDINAL_DATE:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD).appendLiteral("-").appendValue(ChronoField.DAY_OF_YEAR).toFormatter(ResolverStyle.STRICT);
}}, ISO_WEEK_DATE:{configurable:!0, enumerable:!0, get:function() {
  return (new DateTimeFormatterBuilder).appendValue(ChronoField.YEAR, 4, 10, SignStyle.EXCEEDS_PAD).appendLiteral("-W").appendValue(ChronoField.ALIGNED_WEEK_OF_YEAR).appendLiteral("-").appendValue(ChronoField.DAY_OF_WEEK).toFormatter(ResolverStyle.STRICT);
}}, PARSED_EXCESS_DAYS:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("PARSED_EXCESS_DAYS", function(a) {
    return a instanceof DateTimeBuilder ? a.excessDays : Period.ZERO;
  });
}}, PARSED_LEAP_SECOND:{configurable:!0, enumerable:!0, get:function() {
  return createTemporalQuery("PARSED_LEAP_SECOND", function(a) {
    return a instanceof DateTimeBuilder ? a.leapSecond : !1;
  });
}}});
var DateTimeFormatterBuilderMAX_WIDTH = 15, DateTimeFormatterBuilder = function() {
  this._active = this;
  this._parent = null;
  this._printerParsers = [];
  this._optional = !1;
  this._padNextWidth = 0;
  this._padNextChar = null;
  this._valueParserIndex = -1;
};
DateTimeFormatterBuilder._of = function(a, b) {
  requireNonNull(a, "parent");
  requireNonNull(b, "optional");
  var c = new DateTimeFormatterBuilder;
  c._parent = a;
  c._optional = b;
  return c;
};
DateTimeFormatterBuilder.prototype.parseCaseSensitive = function() {
  this._appendInternalPrinterParser(SettingsParser.SENSITIVE);
  return this;
};
DateTimeFormatterBuilder.prototype.parseCaseInsensitive = function() {
  this._appendInternalPrinterParser(SettingsParser.INSENSITIVE);
  return this;
};
DateTimeFormatterBuilder.prototype.parseStrict = function() {
  this._appendInternalPrinterParser(SettingsParser.STRICT);
  return this;
};
DateTimeFormatterBuilder.prototype.parseLenient = function() {
  this._appendInternalPrinterParser(SettingsParser.LENIENT);
  return this;
};
DateTimeFormatterBuilder.prototype.appendValue = function() {
  return 1 === arguments.length ? this._appendValue1.apply(this, arguments) : 2 === arguments.length ? this._appendValue2.apply(this, arguments) : this._appendValue4.apply(this, arguments);
};
DateTimeFormatterBuilder.prototype._appendValue1 = function(a) {
  requireNonNull(a);
  this._appendValuePrinterParser(new NumberPrinterParser(a, 1, DateTimeFormatterBuilderMAX_WIDTH, SignStyle.NORMAL));
  return this;
};
DateTimeFormatterBuilder.prototype._appendValue2 = function(a, b) {
  requireNonNull(a);
  if (1 > b || b > DateTimeFormatterBuilderMAX_WIDTH) {
    throw new IllegalArgumentException("The width must be from 1 to " + DateTimeFormatterBuilderMAX_WIDTH + " inclusive but was " + b);
  }
  a = new NumberPrinterParser(a, b, b, SignStyle.NOT_NEGATIVE);
  this._appendValuePrinterParser(a);
  return this;
};
DateTimeFormatterBuilder.prototype._appendValue4 = function(a, b, c, d) {
  requireNonNull(a);
  requireNonNull(d);
  if (b === c && d === SignStyle.NOT_NEGATIVE) {
    return this._appendValue2(a, c);
  }
  if (1 > b || b > DateTimeFormatterBuilderMAX_WIDTH) {
    throw new IllegalArgumentException("The minimum width must be from 1 to " + DateTimeFormatterBuilderMAX_WIDTH + " inclusive but was " + b);
  }
  if (1 > c || c > DateTimeFormatterBuilderMAX_WIDTH) {
    throw new IllegalArgumentException("The minimum width must be from 1 to " + DateTimeFormatterBuilderMAX_WIDTH + " inclusive but was " + c);
  }
  if (c < b) {
    throw new IllegalArgumentException("The maximum width must exceed or equal the minimum width but " + c + " < " + b);
  }
  a = new NumberPrinterParser(a, b, c, d);
  this._appendValuePrinterParser(a);
  return this;
};
DateTimeFormatterBuilder.prototype.appendValueReduced = function() {
  return 4 === arguments.length && arguments[3] instanceof ChronoLocalDate ? this._appendValueReducedFieldWidthMaxWidthBaseDate.apply(this, arguments) : this._appendValueReducedFieldWidthMaxWidthBaseValue.apply(this, arguments);
};
DateTimeFormatterBuilder.prototype._appendValueReducedFieldWidthMaxWidthBaseValue = function(a, b, c, d) {
  requireNonNull(a, "field");
  a = new ReducedPrinterParser(a, b, c, d, null);
  this._appendValuePrinterParser(a);
  return this;
};
DateTimeFormatterBuilder.prototype._appendValueReducedFieldWidthMaxWidthBaseDate = function(a, b, c, d) {
  requireNonNull(a, "field");
  requireNonNull(d, "baseDate");
  requireInstance(d, ChronoLocalDate, "baseDate");
  a = new ReducedPrinterParser(a, b, c, 0, d);
  this._appendValuePrinterParser(a);
  return this;
};
DateTimeFormatterBuilder.prototype._appendValuePrinterParser = function(a) {
  assert(null != a);
  if (0 <= this._active._valueParserIndex && this._active._printerParsers[this._active._valueParserIndex] instanceof NumberPrinterParser) {
    var b = this._active._valueParserIndex, c = this._active._printerParsers[b];
    a.minWidth() === a.maxWidth() && a.signStyle() === SignStyle.NOT_NEGATIVE ? (c = c.withSubsequentWidth(a.maxWidth()), this._appendInternal(a.withFixedWidth()), this._active._valueParserIndex = b) : (c = c.withFixedWidth(), this._active._valueParserIndex = this._appendInternal(a));
    this._active._printerParsers[b] = c;
  } else {
    this._active._valueParserIndex = this._appendInternal(a);
  }
  return this;
};
DateTimeFormatterBuilder.prototype.appendFraction = function(a, b, c, d) {
  this._appendInternal(new FractionPrinterParser(a, b, c, d));
  return this;
};
DateTimeFormatterBuilder.prototype.appendInstant = function(a) {
  a = void 0 === a ? -2 : a;
  if (-2 > a || 9 < a) {
    throw new IllegalArgumentException("Invalid fractional digits: " + a);
  }
  this._appendInternal(new InstantPrinterParser(a));
  return this;
};
DateTimeFormatterBuilder.prototype.appendOffsetId = function() {
  this._appendInternal(OffsetIdPrinterParser.INSTANCE_ID);
  return this;
};
DateTimeFormatterBuilder.prototype.appendOffset = function(a, b) {
  this._appendInternalPrinterParser(new OffsetIdPrinterParser(b, a));
  return this;
};
DateTimeFormatterBuilder.prototype.appendZoneId = function() {
  this._appendInternal(new ZoneIdPrinterParser(TemporalQueries.zoneId(), "ZoneId()"));
  return this;
};
DateTimeFormatterBuilder.prototype.appendPattern = function(a) {
  requireNonNull(a, "pattern");
  this._parsePattern(a);
  return this;
};
DateTimeFormatterBuilder.prototype.appendZoneText = function() {
  throw new IllegalArgumentException("Pattern using (localized) text not implemented, use js-joda-locale plugin!");
};
DateTimeFormatterBuilder.prototype.appendText = function() {
  throw new IllegalArgumentException("Pattern using (localized) text not implemented, use js-joda-locale plugin!");
};
DateTimeFormatterBuilder.prototype.appendLocalizedOffset = function() {
  throw new IllegalArgumentException("Pattern using (localized) text not implemented, use js-joda-locale plugin!");
};
DateTimeFormatterBuilder.prototype.appendWeekField = function() {
  throw new IllegalArgumentException("Pattern using (localized) text not implemented, use js-joda-locale plugin!");
};
DateTimeFormatterBuilder.prototype._parsePattern = function(a) {
  for (var b = {G:ChronoField.ERA, y:ChronoField.YEAR_OF_ERA, u:ChronoField.YEAR, Q:IsoFields.QUARTER_OF_YEAR, q:IsoFields.QUARTER_OF_YEAR, M:ChronoField.MONTH_OF_YEAR, L:ChronoField.MONTH_OF_YEAR, D:ChronoField.DAY_OF_YEAR, d:ChronoField.DAY_OF_MONTH, 
  F:ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH, E:ChronoField.DAY_OF_WEEK, c:ChronoField.DAY_OF_WEEK, e:ChronoField.DAY_OF_WEEK, a:ChronoField.AMPM_OF_DAY, H:ChronoField.HOUR_OF_DAY, k:ChronoField.CLOCK_HOUR_OF_DAY, K:ChronoField.HOUR_OF_AMPM, 
  h:ChronoField.CLOCK_HOUR_OF_AMPM, m:ChronoField.MINUTE_OF_HOUR, s:ChronoField.SECOND_OF_MINUTE, S:ChronoField.NANO_OF_SECOND, A:ChronoField.MILLI_OF_DAY, n:ChronoField.NANO_OF_SECOND, N:ChronoField.NANO_OF_DAY}, c = 0; c < a.length; c++) {
    var d = a.charAt(c);
    if ("A" <= d && "Z" >= d || "a" <= d && "z" >= d) {
      for (var e = c++; c < a.length && a.charAt(c) === d; c++) {
      }
      e = c - e;
      if ("p" === d) {
        var f = 0;
        if (c < a.length && (d = a.charAt(c), "A" <= d && "Z" >= d || "a" <= d && "z" >= d)) {
          f = e;
          for (e = c++; c < a.length && a.charAt(c) === d; c++) {
          }
          e = c - e;
        }
        if (0 === f) {
          throw new IllegalArgumentException("Pad letter 'p' must be followed by valid pad pattern: " + a);
        }
        this.padNext(f);
      }
      f = b[d];
      if (null != f) {
        this._parseField(d, e, f);
      } else {
        if ("z" === d) {
          if (4 < e) {
            throw new IllegalArgumentException("Too many pattern letters: " + d);
          }
          4 === e ? this.appendZoneText(TextStyle.FULL) : this.appendZoneText(TextStyle.SHORT);
        } else {
          if ("V" === d) {
            if (2 !== e) {
              throw new IllegalArgumentException("Pattern letter count must be 2: " + d);
            }
            this.appendZoneId();
          } else {
            if ("Z" === d) {
              if (4 > e) {
                this.appendOffset("+HHMM", "+0000");
              } else {
                if (4 === e) {
                  this.appendLocalizedOffset(TextStyle.FULL);
                } else {
                  if (5 === e) {
                    this.appendOffset("+HH:MM:ss", "Z");
                  } else {
                    throw new IllegalArgumentException("Too many pattern letters: " + d);
                  }
                }
              }
            } else {
              if ("O" === d) {
                if (1 === e) {
                  this.appendLocalizedOffset(TextStyle.SHORT);
                } else {
                  if (4 === e) {
                    this.appendLocalizedOffset(TextStyle.FULL);
                  } else {
                    throw new IllegalArgumentException("Pattern letter count must be 1 or 4: " + d);
                  }
                }
              } else {
                if ("X" === d) {
                  if (5 < e) {
                    throw new IllegalArgumentException("Too many pattern letters: " + d);
                  }
                  this.appendOffset(OffsetIdPrinterParser.PATTERNS[e + (1 === e ? 0 : 1)], "Z");
                } else {
                  if ("x" === d) {
                    if (5 < e) {
                      throw new IllegalArgumentException("Too many pattern letters: " + d);
                    }
                    this.appendOffset(OffsetIdPrinterParser.PATTERNS[e + (1 === e ? 0 : 1)], 1 === e ? "+00" : 0 === e % 2 ? "+0000" : "+00:00");
                  } else {
                    if ("W" === d) {
                      if (1 < e) {
                        throw new IllegalArgumentException("Too many pattern letters: " + d);
                      }
                      this.appendWeekField("W", e);
                    } else {
                      if ("w" === d) {
                        if (2 < e) {
                          throw new IllegalArgumentException("Too many pattern letters: " + d);
                        }
                        this.appendWeekField("w", e);
                      } else {
                        if ("Y" === d) {
                          this.appendWeekField("Y", e);
                        } else {
                          throw new IllegalArgumentException("Unknown pattern letter: " + d);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      c--;
    } else {
      if ("'" === d) {
        for (d = c++; c < a.length; c++) {
          if ("'" === a.charAt(c)) {
            if (c + 1 < a.length && "'" === a.charAt(c + 1)) {
              c++;
            } else {
              break;
            }
          }
        }
        if (c >= a.length) {
          throw new IllegalArgumentException("Pattern ends with an incomplete string literal: " + a);
        }
        d = a.substring(d + 1, c);
        0 === d.length ? this.appendLiteral("'") : this.appendLiteral(d.replace("''", "'"));
      } else {
        if ("[" === d) {
          this.optionalStart();
        } else {
          if ("]" === d) {
            if (null === this._active._parent) {
              throw new IllegalArgumentException("Pattern invalid as it contains ] without previous [");
            }
            this.optionalEnd();
          } else {
            if ("{" === d || "}" === d || "#" === d) {
              throw new IllegalArgumentException("Pattern includes reserved character: '" + d + "'");
            }
            this.appendLiteral(d);
          }
        }
      }
    }
  }
};
DateTimeFormatterBuilder.prototype._parseField = function(a, b, c) {
  switch(a) {
    case "u":
    case "y":
      2 === b ? this.appendValueReduced(c, 2, 2, ReducedPrinterParser.BASE_DATE) : 4 > b ? this.appendValue(c, b, DateTimeFormatterBuilderMAX_WIDTH, SignStyle.NORMAL) : this.appendValue(c, b, DateTimeFormatterBuilderMAX_WIDTH, SignStyle.EXCEEDS_PAD);
      break;
    case "M":
    case "Q":
      switch(b) {
        case 1:
          this.appendValue(c);
          break;
        case 2:
          this.appendValue(c, 2);
          break;
        case 3:
          this.appendText(c, TextStyle.SHORT);
          break;
        case 4:
          this.appendText(c, TextStyle.FULL);
          break;
        case 5:
          this.appendText(c, TextStyle.NARROW);
          break;
        default:
          throw new IllegalArgumentException("Too many pattern letters: " + a);
      }break;
    case "L":
    case "q":
      switch(b) {
        case 1:
          this.appendValue(c);
          break;
        case 2:
          this.appendValue(c, 2);
          break;
        case 3:
          this.appendText(c, TextStyle.SHORT_STANDALONE);
          break;
        case 4:
          this.appendText(c, TextStyle.FULL_STANDALONE);
          break;
        case 5:
          this.appendText(c, TextStyle.NARROW_STANDALONE);
          break;
        default:
          throw new IllegalArgumentException("Too many pattern letters: " + a);
      }break;
    case "e":
      switch(b) {
        case 1:
        case 2:
          this.appendWeekField("e", b);
          break;
        case 3:
          this.appendText(c, TextStyle.SHORT);
          break;
        case 4:
          this.appendText(c, TextStyle.FULL);
          break;
        case 5:
          this.appendText(c, TextStyle.NARROW);
          break;
        default:
          throw new IllegalArgumentException("Too many pattern letters: " + a);
      }break;
    case "c":
      switch(b) {
        case 1:
          this.appendWeekField("c", b);
          break;
        case 2:
          throw new IllegalArgumentException("Invalid number of pattern letters: " + a);
        case 3:
          this.appendText(c, TextStyle.SHORT_STANDALONE);
          break;
        case 4:
          this.appendText(c, TextStyle.FULL_STANDALONE);
          break;
        case 5:
          this.appendText(c, TextStyle.NARROW_STANDALONE);
          break;
        default:
          throw new IllegalArgumentException("Too many pattern letters: " + a);
      }break;
    case "a":
      if (1 === b) {
        this.appendText(c, TextStyle.SHORT);
      } else {
        throw new IllegalArgumentException("Too many pattern letters: " + a);
      }
      break;
    case "E":
    case "G":
      switch(b) {
        case 1:
        case 2:
        case 3:
          this.appendText(c, TextStyle.SHORT);
          break;
        case 4:
          this.appendText(c, TextStyle.FULL);
          break;
        case 5:
          this.appendText(c, TextStyle.NARROW);
          break;
        default:
          throw new IllegalArgumentException("Too many pattern letters: " + a);
      }break;
    case "S":
      this.appendFraction(ChronoField.NANO_OF_SECOND, b, b, !1);
      break;
    case "F":
      if (1 === b) {
        this.appendValue(c);
      } else {
        throw new IllegalArgumentException("Too many pattern letters: " + a);
      }
      break;
    case "d":
    case "h":
    case "H":
    case "k":
    case "K":
    case "m":
    case "s":
      if (1 === b) {
        this.appendValue(c);
      } else {
        if (2 === b) {
          this.appendValue(c, b);
        } else {
          throw new IllegalArgumentException("Too many pattern letters: " + a);
        }
      }
      break;
    case "D":
      if (1 === b) {
        this.appendValue(c);
      } else {
        if (3 >= b) {
          this.appendValue(c, b);
        } else {
          throw new IllegalArgumentException("Too many pattern letters: " + a);
        }
      }
      break;
    default:
      1 === b ? this.appendValue(c) : this.appendValue(c, b);
  }
};
DateTimeFormatterBuilder.prototype.padNext = function() {
  return 1 === arguments.length ? this._padNext1.apply(this, arguments) : this._padNext2.apply(this, arguments);
};
DateTimeFormatterBuilder.prototype._padNext1 = function(a) {
  return this._padNext2(a, " ");
};
DateTimeFormatterBuilder.prototype._padNext2 = function(a, b) {
  if (1 > a) {
    throw new IllegalArgumentException("The pad width must be at least one but was " + a);
  }
  this._active._padNextWidth = a;
  this._active._padNextChar = b;
  this._active._valueParserIndex = -1;
  return this;
};
DateTimeFormatterBuilder.prototype.optionalStart = function() {
  this._active._valueParserIndex = -1;
  this._active = DateTimeFormatterBuilder._of(this._active, !0);
  return this;
};
DateTimeFormatterBuilder.prototype.optionalEnd = function() {
  if (null == this._active._parent) {
    throw new IllegalStateException("Cannot call optionalEnd() as there was no previous call to optionalStart()");
  }
  if (0 < this._active._printerParsers.length) {
    var a = new CompositePrinterParser(this._active._printerParsers, this._active._optional);
    this._active = this._active._parent;
    this._appendInternal(a);
  } else {
    this._active = this._active._parent;
  }
  return this;
};
DateTimeFormatterBuilder.prototype._appendInternal = function(a) {
  assert(null != a);
  0 < this._active._padNextWidth && (null != a && (a = new PadPrinterParserDecorator(a, this._active._padNextWidth, this._active._padNextChar)), this._active._padNextWidth = 0, this._active._padNextChar = 0);
  this._active._printerParsers.push(a);
  this._active._valueParserIndex = -1;
  return this._active._printerParsers.length - 1;
};
DateTimeFormatterBuilder.prototype.appendLiteral = function(a) {
  assert(null != a);
  0 < a.length && (1 === a.length ? this._appendInternalPrinterParser(new CharLiteralPrinterParser(a.charAt(0))) : this._appendInternalPrinterParser(new StringLiteralPrinterParser(a)));
  return this;
};
DateTimeFormatterBuilder.prototype._appendInternalPrinterParser = function(a) {
  assert(null != a);
  0 < this._active._padNextWidth && (null != a && (a = new PadPrinterParserDecorator(a, this._active._padNextWidth, this._active._padNextChar)), this._active._padNextWidth = 0, this._active._padNextChar = 0);
  this._active._printerParsers.push(a);
  this._active._valueParserIndex = -1;
  return this._active._printerParsers.length - 1;
};
DateTimeFormatterBuilder.prototype.append = function(a) {
  requireNonNull(a, "formatter");
  this._appendInternal(a._toPrinterParser(!1));
  return this;
};
DateTimeFormatterBuilder.prototype.toFormatter = function(a) {
  for (a = void 0 === a ? ResolverStyle.SMART : a; null != this._active._parent;) {
    this.optionalEnd();
  }
  var b = new CompositePrinterParser(this._printerParsers, !1);
  return new DateTimeFormatter(b, null, DecimalStyle.STANDARD, a, null, null, null);
};
var SECONDS_PER_10000_YEARS = 31556952E4, SECONDS_0000_TO_1970 = 62167219200, InstantPrinterParser = function(a) {
  this.fractionalDigits = a;
};
InstantPrinterParser.prototype.print = function(a, b) {
  var c = a.getValue(ChronoField.INSTANT_SECONDS), d = 0;
  a.temporal().isSupported(ChronoField.NANO_OF_SECOND) && (d = a.temporal().getLong(ChronoField.NANO_OF_SECOND));
  if (null == c) {
    return !1;
  }
  a = ChronoField.NANO_OF_SECOND.checkValidIntValue(d);
  if (c >= -SECONDS_0000_TO_1970) {
    d = c - SECONDS_PER_10000_YEARS + SECONDS_0000_TO_1970, c = MathUtil.floorDiv(d, SECONDS_PER_10000_YEARS) + 1, d = MathUtil.floorMod(d, SECONDS_PER_10000_YEARS), d = LocalDateTime.ofEpochSecond(d - SECONDS_0000_TO_1970, 0, ZoneOffset.UTC), 
    0 < c && b.append("+").append(c), b.append(d), 0 === d.second() && b.append(":00");
  } else {
    d = c + SECONDS_0000_TO_1970;
    c = MathUtil.intDiv(d, SECONDS_PER_10000_YEARS);
    d = MathUtil.intMod(d, SECONDS_PER_10000_YEARS);
    var e = LocalDateTime.ofEpochSecond(d - SECONDS_0000_TO_1970, 0, ZoneOffset.UTC), f = b.length();
    b.append(e);
    0 === e.second() && b.append(":00");
    0 > c && (-1E4 === e.year() ? b.replace(f, f + 2, "" + (c - 1)) : 0 === d ? b.insert(f, c) : b.insert(f + 1, Math.abs(c)));
  }
  if (-2 === this.fractionalDigits) {
    0 !== a && (b.append("."), 0 === MathUtil.intMod(a, 1000000) ? b.append(("" + (MathUtil.intDiv(a, 1000000) + 1000)).substring(1)) : 0 === MathUtil.intMod(a, 1000) ? b.append(("" + (MathUtil.intDiv(a, 1000) + 1000000)).substring(1)) : b.append(("" + (a + 1000000000)).substring(1)));
  } else {
    if (0 < this.fractionalDigits || -1 === this.fractionalDigits && 0 < a) {
      for (b.append("."), c = 100000000, d = 0; -1 === this.fractionalDigits && 0 < a || d < this.fractionalDigits; d++) {
        e = MathUtil.intDiv(a, c), b.append(e), a -= e * c, c = MathUtil.intDiv(c, 10);
      }
    }
  }
  b.append("Z");
  return !0;
};
InstantPrinterParser.prototype.parse = function(a, b, c) {
  var d = a.copy(), e = 0 > this.fractionalDigits ? 0 : this.fractionalDigits, f = 0 > this.fractionalDigits ? 9 : this.fractionalDigits;
  b = (new DateTimeFormatterBuilder).append(DateTimeFormatter.ISO_LOCAL_DATE).appendLiteral("T").appendValue(ChronoField.HOUR_OF_DAY, 2).appendLiteral(":").appendValue(ChronoField.MINUTE_OF_HOUR, 2).appendLiteral(":").appendValue(ChronoField.SECOND_OF_MINUTE, 2).appendFraction(ChronoField.NANO_OF_SECOND, 
  e, f, !0).appendLiteral("Z").toFormatter()._toPrinterParser(!1).parse(d, b, c);
  if (0 > b) {
    return b;
  }
  e = d.getParsed(ChronoField.YEAR);
  f = d.getParsed(ChronoField.MONTH_OF_YEAR);
  var g = d.getParsed(ChronoField.DAY_OF_MONTH), h = d.getParsed(ChronoField.HOUR_OF_DAY), n = d.getParsed(ChronoField.MINUTE_OF_HOUR), l = d.getParsed(ChronoField.SECOND_OF_MINUTE), k = d.getParsed(ChronoField.NANO_OF_SECOND);
  d = null != l ? l : 0;
  l = null != k ? k : 0;
  k = MathUtil.intMod(e, 10000);
  var p = 0;
  24 === h && 0 === n && 0 === d && 0 === l ? (h = 0, p = 1) : 23 === h && 59 === n && 60 === d && (a.setParsedLeapSecond(), d = 59);
  try {
    var m = LocalDateTime.of(k, f, g, h, n, d, 0).plusDays(p).toEpochSecond(ZoneOffset.UTC);
    m += MathUtil.safeMultiply(MathUtil.intDiv(e, 10000), SECONDS_PER_10000_YEARS);
  } catch (q) {
    return ~c;
  }
  m = a.setParsedField(ChronoField.INSTANT_SECONDS, m, c, b);
  return a.setParsedField(ChronoField.NANO_OF_SECOND, l, c, m);
};
InstantPrinterParser.prototype.toString = function() {
  return "Instant()";
};
$jscomp.global.Object.defineProperties(InstantPrinterParser, {CompositePrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return CompositePrinterParser;
}}, PadPrinterParserDecorator:{configurable:!0, enumerable:!0, get:function() {
  return PadPrinterParserDecorator;
}}, SettingsParser:{configurable:!0, enumerable:!0, get:function() {
  return SettingsParser;
}}, StringLiteralPrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return StringLiteralPrinterParser;
}}, CharLiteralPrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return CharLiteralPrinterParser;
}}, NumberPrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return NumberPrinterParser;
}}, ReducedPrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return ReducedPrinterParser;
}}, FractionPrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return FractionPrinterParser;
}}, OffsetIdPrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return OffsetIdPrinterParser;
}}, ZoneIdPrinterParser:{configurable:!0, enumerable:!0, get:function() {
  return ZoneIdPrinterParser;
}}});
var DateTimeParseContext = function() {
  if (1 === arguments.length) {
    if (arguments[0] instanceof DateTimeParseContext) {
      this._constructorSelf.apply(this, arguments);
      return;
    }
    this._constructorFormatter.apply(this, arguments);
  } else {
    this._constructorParam.apply(this, arguments);
  }
  this._strict = this._caseSensitive = !0;
  this._parsed = [new Parsed(this)];
};
DateTimeParseContext.prototype._constructorParam = function(a, b, c) {
  this._locale = a;
  this._symbols = b;
  this._overrideChronology = c;
};
DateTimeParseContext.prototype._constructorFormatter = function(a) {
  this._locale = a.locale();
  this._symbols = a.decimalStyle();
  this._overrideChronology = a.chronology();
};
DateTimeParseContext.prototype._constructorSelf = function(a) {
  this._locale = a._locale;
  this._symbols = a._symbols;
  this._overrideChronology = a._overrideChronology;
  this._overrideZone = a._overrideZone;
  this._caseSensitive = a._caseSensitive;
  this._strict = a._strict;
  this._parsed = [new Parsed(this)];
};
DateTimeParseContext.prototype.copy = function() {
  return new DateTimeParseContext(this);
};
DateTimeParseContext.prototype.symbols = function() {
  return this._symbols;
};
DateTimeParseContext.prototype.isStrict = function() {
  return this._strict;
};
DateTimeParseContext.prototype.setStrict = function(a) {
  this._strict = a;
};
DateTimeParseContext.prototype.locale = function() {
  return this._locale;
};
DateTimeParseContext.prototype.setLocale = function(a) {
  this._locale = a;
};
DateTimeParseContext.prototype.startOptional = function() {
  this._parsed.push(this.currentParsed().copy());
};
DateTimeParseContext.prototype.endOptional = function(a) {
  a ? this._parsed.splice(this._parsed.length - 2, 1) : this._parsed.splice(this._parsed.length - 1, 1);
};
DateTimeParseContext.prototype.isCaseSensitive = function() {
  return this._caseSensitive;
};
DateTimeParseContext.prototype.setCaseSensitive = function(a) {
  this._caseSensitive = a;
};
DateTimeParseContext.prototype.subSequenceEquals = function(a, b, c, d, e) {
  if (b + e > a.length || d + e > c.length) {
    return !1;
  }
  this.isCaseSensitive() || (a = a.toLowerCase(), c = c.toLowerCase());
  for (var f = 0; f < e; f++) {
    if (a[b + f] !== c[d + f]) {
      return !1;
    }
  }
  return !0;
};
DateTimeParseContext.prototype.charEquals = function(a, b) {
  return this.isCaseSensitive() ? a === b : this.charEqualsIgnoreCase(a, b);
};
DateTimeParseContext.prototype.charEqualsIgnoreCase = function(a, b) {
  return a === b || a.toLowerCase() === b.toLowerCase();
};
DateTimeParseContext.prototype.setParsedField = function(a, b, c, d) {
  var e = this.currentParsed().fieldValues, f = e.get(a);
  e.set(a, b);
  return null != f && f !== b ? ~c : d;
};
DateTimeParseContext.prototype.setParsedZone = function(a) {
  requireNonNull(a, "zone");
  this.currentParsed().zone = a;
};
DateTimeParseContext.prototype.getParsed = function(a) {
  return this.currentParsed().fieldValues.get(a);
};
DateTimeParseContext.prototype.toParsed = function() {
  return this.currentParsed();
};
DateTimeParseContext.prototype.currentParsed = function() {
  return this._parsed[this._parsed.length - 1];
};
DateTimeParseContext.prototype.setParsedLeapSecond = function() {
  this.currentParsed().leapSecond = !0;
};
DateTimeParseContext.prototype.getEffectiveChronology = function() {
  var a = this.currentParsed().chrono;
  null == a && (a = this._overrideChronology, null == a && (a = IsoChronology.INSTANCE));
  return a;
};
var Parsed = function(a) {
  Temporal.call(this);
  this.zone = this.chrono = null;
  this.fieldValues = new EnumMap;
  this.leapSecond = !1;
  this.dateTimeParseContext = a;
};
$jscomp.inherits(Parsed, Temporal);
Parsed.prototype.copy = function() {
  var a = new Parsed;
  a.chrono = this.chrono;
  a.zone = this.zone;
  a.fieldValues.putAll(this.fieldValues);
  a.leapSecond = this.leapSecond;
  a.dateTimeParseContext = this.dateTimeParseContext;
  return a;
};
Parsed.prototype.toString = function() {
  return this.fieldValues + ", " + this.chrono + ", " + this.zone;
};
Parsed.prototype.isSupported = function(a) {
  return this.fieldValues.containsKey(a);
};
Parsed.prototype.get = function(a) {
  a = this.fieldValues.get(a);
  assert(null != a);
  return a;
};
Parsed.prototype.query = function(a) {
  return a === TemporalQueries.chronology() ? this.chrono : a === TemporalQueries.zoneId() || a === TemporalQueries.zone() ? this.zone : Temporal.prototype.query.call(this, a);
};
Parsed.prototype.toBuilder = function() {
  var a = new DateTimeBuilder;
  a.fieldValues.putAll(this.fieldValues);
  a.chrono = this.dateTimeParseContext.getEffectiveChronology();
  a.zone = null != this.zone ? this.zone : this.overrideZone;
  a.leapSecond = this.leapSecond;
  a.excessDays = this.excessDays;
  return a;
};
var DateTimePrintContext = function(a, b, c) {
  2 === arguments.length && arguments[1] instanceof DateTimeFormatter ? (this._temporal = DateTimePrintContext.adjust(a, b), this._locale = b.locale(), this._symbols = b.decimalStyle()) : (this._temporal = a, this._locale = b, this._symbols = c);
  this._optional = 0;
};
DateTimePrintContext.adjust = function(a, b) {
  return a;
};
DateTimePrintContext.prototype.symbols = function() {
  return this._symbols;
};
DateTimePrintContext.prototype.startOptional = function() {
  this._optional++;
};
DateTimePrintContext.prototype.endOptional = function() {
  this._optional--;
};
DateTimePrintContext.prototype.getValueQuery = function(a) {
  a = this._temporal.query(a);
  if (null == a && 0 === this._optional) {
    throw new DateTimeException("Unable to extract value: " + this._temporal);
  }
  return a;
};
DateTimePrintContext.prototype.getValue = function(a) {
  try {
    return this._temporal.getLong(a);
  } catch (b) {
    if (b instanceof DateTimeException && 0 < this._optional) {
      return null;
    }
    throw b;
  }
};
DateTimePrintContext.prototype.temporal = function() {
  return this._temporal;
};
DateTimePrintContext.prototype.locale = function() {
  return this._locale;
};
DateTimePrintContext.prototype.setDateTime = function(a) {
  this._temporal = a;
};
DateTimePrintContext.prototype.setLocale = function(a) {
  this._locale = a;
};
var DecimalStyle = function(a, b, c, d) {
  this._zeroDigit = a;
  this._zeroDigitCharCode = a.charCodeAt(0);
  this._positiveSign = b;
  this._negativeSign = c;
  this._decimalSeparator = d;
};
DecimalStyle.prototype.positiveSign = function() {
  return this._positiveSign;
};
DecimalStyle.prototype.withPositiveSign = function(a) {
  return a === this._positiveSign ? this : new DecimalStyle(this._zeroDigit, a, this._negativeSign, this._decimalSeparator);
};
DecimalStyle.prototype.negativeSign = function() {
  return this._negativeSign;
};
DecimalStyle.prototype.withNegativeSign = function(a) {
  return a === this._negativeSign ? this : new DecimalStyle(this._zeroDigit, this._positiveSign, a, this._decimalSeparator);
};
DecimalStyle.prototype.zeroDigit = function() {
  return this._zeroDigit;
};
DecimalStyle.prototype.withZeroDigit = function(a) {
  return a === this._zeroDigit ? this : new DecimalStyle(a, this._positiveSign, this._negativeSign, this._decimalSeparator);
};
DecimalStyle.prototype.decimalSeparator = function() {
  return this._decimalSeparator;
};
DecimalStyle.prototype.withDecimalSeparator = function(a) {
  return a === this._decimalSeparator ? this : new DecimalStyle(this._zeroDigit, this._positiveSign, this._negativeSign, a);
};
DecimalStyle.prototype.convertToDigit = function(a) {
  a = a.charCodeAt(0) - this._zeroDigitCharCode;
  return 0 <= a && 9 >= a ? a : -1;
};
DecimalStyle.prototype.convertNumberToI18N = function(a) {
  if ("0" === this._zeroDigit) {
    return a;
  }
  for (var b = this._zeroDigitCharCode - 48, c = "", d = 0; d < a.length; d++) {
    c += String.fromCharCode(a.charCodeAt(d) + b);
  }
  return c;
};
DecimalStyle.prototype.equals = function(a) {
  return this === a ? !0 : a instanceof DecimalStyle ? this._zeroDigit === a._zeroDigit && this._positiveSign === a._positiveSign && this._negativeSign === a._negativeSign && this._decimalSeparator === a._decimalSeparator : !1;
};
DecimalStyle.prototype.hashCode = function() {
  return this._zeroDigit + this._positiveSign + this._negativeSign + this._decimalSeparator;
};
DecimalStyle.prototype.toString = function() {
  return "DecimalStyle[" + this._zeroDigit + this._positiveSign + this._negativeSign + this._decimalSeparator + "]";
};
DecimalStyle.of = function() {
  throw Error("not yet supported");
};
DecimalStyle.availableLocales = function() {
  throw Error("not yet supported");
};
DecimalStyle.STANDARD = new DecimalStyle("0", "+", "-", ".");
var EnumMap = function() {
  this._map = {};
};
EnumMap.prototype.putAll = function(a) {
  for (var b in a._map) {
    this._map[b] = a._map[b];
  }
  return this;
};
EnumMap.prototype.containsKey = function(a) {
  return this._map.hasOwnProperty(a.name()) && void 0 !== this.get(a);
};
EnumMap.prototype.get = function(a) {
  return this._map[a.name()];
};
EnumMap.prototype.put = function(a, b) {
  return this.set(a, b);
};
EnumMap.prototype.set = function(a, b) {
  this._map[a.name()] = b;
  return this;
};
EnumMap.prototype.retainAll = function(a) {
  for (var b = {}, c = 0; c < a.length; c++) {
    var d = a[c].name();
    b[d] = this._map[d];
  }
  this._map = b;
  return this;
};
EnumMap.prototype.remove = function(a) {
  a = a.name();
  var b = this._map[a];
  this._map[a] = void 0;
  return b;
};
EnumMap.prototype.keySet = function() {
  return this._map;
};
EnumMap.prototype.clear = function() {
  this._map = {};
};
var ParsePosition = function(a) {
  this._index = a;
  this._errorIndex = -1;
};
ParsePosition.prototype.getIndex = function() {
  return this._index;
};
ParsePosition.prototype.setIndex = function(a) {
  this._index = a;
};
ParsePosition.prototype.getErrorIndex = function() {
  return this._errorIndex;
};
ParsePosition.prototype.setErrorIndex = function(a) {
  this._errorIndex = a;
};
var CharLiteralPrinterParser = function(a) {
  if (1 < a.length) {
    throw new IllegalArgumentException('invalid literal, too long: "' + a + '"');
  }
  this._literal = a;
};
CharLiteralPrinterParser.prototype.print = function(a, b) {
  b.append(this._literal);
  return !0;
};
CharLiteralPrinterParser.prototype.parse = function(a, b, c) {
  if (c === b.length) {
    return ~c;
  }
  b = b.charAt(c);
  return !1 === a.charEquals(this._literal, b) ? ~c : c + this._literal.length;
};
CharLiteralPrinterParser.prototype.toString = function() {
  return "'" === this._literal ? "''" : "'" + this._literal + "'";
};
var CompositePrinterParser = function(a, b) {
  this._printerParsers = a;
  this._optional = b;
};
CompositePrinterParser.prototype.withOptional = function(a) {
  return a === this._optional ? this : new CompositePrinterParser(this._printerParsers, a);
};
CompositePrinterParser.prototype.print = function(a, b) {
  var c = b.length();
  this._optional && a.startOptional();
  try {
    for (var d = 0; d < this._printerParsers.length; d++) {
      if (!1 === this._printerParsers[d].print(a, b)) {
        b.setLength(c);
        break;
      }
    }
  } finally {
    this._optional && a.endOptional();
  }
  return !0;
};
CompositePrinterParser.prototype.parse = function(a, b, c) {
  if (this._optional) {
    a.startOptional();
    for (var d = c, e = 0; e < this._printerParsers.length; e++) {
      if (d = this._printerParsers[e].parse(a, b, d), 0 > d) {
        return a.endOptional(!1), c;
      }
    }
    a.endOptional(!0);
    return d;
  }
  for (d = 0; d < this._printerParsers.length && !(c = this._printerParsers[d].parse(a, b, c), 0 > c); d++) {
  }
  return c;
};
CompositePrinterParser.prototype.toString = function() {
  var a = "";
  if (null != this._printerParsers) {
    a += this._optional ? "[" : "(";
    for (var b = 0; b < this._printerParsers.length; b++) {
      a += this._printerParsers[b].toString();
    }
    a += this._optional ? "]" : ")";
  }
  return a;
};
var FractionPrinterParser = function(a, b, c, d) {
  requireNonNull(a, "field");
  if (!1 === a.range().isFixed()) {
    throw new IllegalArgumentException("Field must have a fixed set of values: " + a);
  }
  if (0 > b || 9 < b) {
    throw new IllegalArgumentException("Minimum width must be from 0 to 9 inclusive but was " + b);
  }
  if (1 > c || 9 < c) {
    throw new IllegalArgumentException("Maximum width must be from 1 to 9 inclusive but was " + c);
  }
  if (c < b) {
    throw new IllegalArgumentException("Maximum width must exceed or equal the minimum width but " + c + " < " + b);
  }
  this.field = a;
  this.minWidth = b;
  this.maxWidth = c;
  this.decimalPoint = d;
};
FractionPrinterParser.prototype.print = function(a, b) {
  var c = a.getValue(this.field);
  if (null === c) {
    return !1;
  }
  a = a.symbols();
  if (0 === c) {
    if (0 < this.minWidth) {
      for (this.decimalPoint && b.append(a.decimalSeparator()), c = 0; c < this.minWidth; c++) {
        b.append(a.zeroDigit());
      }
    }
  } else {
    c = this.convertToFraction(c, a.zeroDigit());
    c = c.substr(0, Math.min(Math.max(c.length, this.minWidth), this.maxWidth));
    if (0 < 1 * c) {
      for (; c.length > this.minWidth && "0" === c[c.length - 1];) {
        c = c.substr(0, c.length - 1);
      }
    }
    c = a.convertNumberToI18N(c);
    this.decimalPoint && b.append(a.decimalSeparator());
    b.append(c);
  }
  return !0;
};
FractionPrinterParser.prototype.parse = function(a, b, c) {
  var d = a.isStrict() ? this.minWidth : 0, e = a.isStrict() ? this.maxWidth : 9, f = b.length;
  if (c === f) {
    return 0 < d ? ~c : c;
  }
  if (this.decimalPoint) {
    if (b[c] !== a.symbols().decimalSeparator()) {
      return 0 < d ? ~c : c;
    }
    c++;
  }
  d = c + d;
  if (d > f) {
    return ~c;
  }
  f = Math.min(c + e, f);
  var g = 0;
  for (e = c; e < f;) {
    var h = b.charAt(e++);
    h = a.symbols().convertToDigit(h);
    if (0 > h) {
      if (e < d) {
        return ~c;
      }
      e--;
      break;
    }
    g = 10 * g + h;
  }
  b = this.convertFromFraction(g, Math.pow(10, e - c));
  return a.setParsedField(this.field, b, c, e);
};
FractionPrinterParser.prototype.convertToFraction = function(a, b) {
  var c = this.field.range();
  c.checkValidValue(a, this.field);
  var d = c.minimum();
  c = c.maximum() - d + 1;
  for (a = "" + MathUtil.intDiv(1000000000 * (a - d), c); 9 > a.length;) {
    a = b + a;
  }
  return a;
};
FractionPrinterParser.prototype.convertFromFraction = function(a, b) {
  var c = this.field.range(), d = c.minimum();
  c = c.maximum() - d + 1;
  return MathUtil.intDiv(a * c, b);
};
FractionPrinterParser.prototype.toString = function() {
  return "Fraction(" + this.field + "," + this.minWidth + "," + this.maxWidth + (this.decimalPoint ? ",DecimalPoint" : "") + ")";
};
var NumberPrinterParserMAX_WIDTH = 15, EXCEED_POINTS = [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000], NumberPrinterParser = function(a, b, c, d, e) {
  this._field = a;
  this._minWidth = b;
  this._maxWidth = c;
  this._signStyle = d;
  this._subsequentWidth = void 0 === e ? 0 : e;
};
NumberPrinterParser.prototype.field = function() {
  return this._field;
};
NumberPrinterParser.prototype.minWidth = function() {
  return this._minWidth;
};
NumberPrinterParser.prototype.maxWidth = function() {
  return this._maxWidth;
};
NumberPrinterParser.prototype.signStyle = function() {
  return this._signStyle;
};
NumberPrinterParser.prototype.withFixedWidth = function() {
  return -1 === this._subsequentWidth ? this : new NumberPrinterParser(this._field, this._minWidth, this._maxWidth, this._signStyle, -1);
};
NumberPrinterParser.prototype.withSubsequentWidth = function(a) {
  return new NumberPrinterParser(this._field, this._minWidth, this._maxWidth, this._signStyle, this._subsequentWidth + a);
};
NumberPrinterParser.prototype._isFixedWidth = function() {
  return -1 === this._subsequentWidth || 0 < this._subsequentWidth && this._minWidth === this._maxWidth && this._signStyle === SignStyle.NOT_NEGATIVE;
};
NumberPrinterParser.prototype.print = function(a, b) {
  var c = a.getValue(this._field);
  if (null == c) {
    return !1;
  }
  c = this._getValue(a, c);
  a = a.symbols();
  var d = "" + Math.abs(c);
  if (d.length > this._maxWidth) {
    throw new DateTimeException("Field " + this._field + " cannot be printed as the value " + c + " exceeds the maximum print width of " + this._maxWidth);
  }
  d = a.convertNumberToI18N(d);
  if (0 <= c) {
    switch(this._signStyle) {
      case SignStyle.EXCEEDS_PAD:
        this._minWidth < NumberPrinterParserMAX_WIDTH && c >= EXCEED_POINTS[this._minWidth] && b.append(a.positiveSign());
        break;
      case SignStyle.ALWAYS:
        b.append(a.positiveSign());
    }
  } else {
    switch(this._signStyle) {
      case SignStyle.NORMAL:
      case SignStyle.EXCEEDS_PAD:
      case SignStyle.ALWAYS:
        b.append(a.negativeSign());
        break;
      case SignStyle.NOT_NEGATIVE:
        throw new DateTimeException("Field " + this._field + " cannot be printed as the value " + c + " cannot be negative according to the SignStyle");
    }
  }
  for (c = 0; c < this._minWidth - d.length; c++) {
    b.append(a.zeroDigit());
  }
  b.append(d);
  return !0;
};
NumberPrinterParser.prototype.parse = function(a, b, c) {
  var d = b.length;
  if (c === d) {
    return ~c;
  }
  assert(0 <= c && c < d);
  var e = b.charAt(c), f = !1, g = !1;
  if (e === a.symbols().positiveSign()) {
    if (!1 === this._signStyle.parse(!0, a.isStrict(), this._minWidth === this._maxWidth)) {
      return ~c;
    }
    g = !0;
    c++;
  } else {
    if (e === a.symbols().negativeSign()) {
      if (!1 === this._signStyle.parse(!1, a.isStrict(), this._minWidth === this._maxWidth)) {
        return ~c;
      }
      f = !0;
      c++;
    } else {
      if (this._signStyle === SignStyle.ALWAYS && a.isStrict()) {
        return ~c;
      }
    }
  }
  var h = a.isStrict() || this._isFixedWidth() ? this._minWidth : 1, n = c + h;
  if (n > d) {
    return ~c;
  }
  var l = (a.isStrict() || this._isFixedWidth() ? this._maxWidth : 9) + Math.max(this._subsequentWidth, 0);
  e = 0;
  for (var k = c, p = 0; 2 > p; p++) {
    for (l = Math.min(k + l, d); k < l;) {
      var m = b.charAt(k++);
      m = a.symbols().convertToDigit(m);
      if (0 > m) {
        k--;
        if (k < n) {
          return ~c;
        }
        break;
      }
      if (k - c > NumberPrinterParserMAX_WIDTH) {
        throw new ArithmeticException("number text exceeds length");
      }
      e = 10 * e + m;
    }
    if (0 < this._subsequentWidth && 0 === p) {
      l = Math.max(h, k - c - this._subsequentWidth), k = c, e = 0;
    } else {
      break;
    }
  }
  if (f) {
    if (0 === e && a.isStrict()) {
      return ~(c - 1);
    }
    0 !== e && (e = -e);
  } else {
    if (this._signStyle === SignStyle.EXCEEDS_PAD && a.isStrict()) {
      if (b = k - c, g) {
        if (b <= this._minWidth) {
          return ~(c - 1);
        }
      } else {
        if (b > this._minWidth) {
          return ~c;
        }
      }
    }
  }
  return this._setValue(a, e, c, k);
};
NumberPrinterParser.prototype._getValue = function(a, b) {
  return b;
};
NumberPrinterParser.prototype._setValue = function(a, b, c, d) {
  return a.setParsedField(this._field, b, c, d);
};
NumberPrinterParser.prototype.toString = function() {
  return 1 === this._minWidth && this._maxWidth === NumberPrinterParserMAX_WIDTH && this._signStyle === SignStyle.NORMAL ? "Value(" + this._field + ")" : this._minWidth === this._maxWidth && this._signStyle === SignStyle.NOT_NEGATIVE ? "Value(" + this._field + "," + this._minWidth + ")" : "Value(" + this._field + "," + this._minWidth + "," + this._maxWidth + "," + this._signStyle + ")";
};
var ReducedPrinterParser = function(a, b, c, d, e) {
  NumberPrinterParser.call(this, a, b, c, SignStyle.NOT_NEGATIVE);
  if (1 > b || 10 < b) {
    throw new IllegalArgumentException("The width must be from 1 to 10 inclusive but was " + b);
  }
  if (1 > c || 10 < c) {
    throw new IllegalArgumentException("The maxWidth must be from 1 to 10 inclusive but was " + c);
  }
  if (c < b) {
    throw new IllegalArgumentException("The maxWidth must be greater than the width");
  }
  if (null === e) {
    if (!1 === a.range().isValidValue(d)) {
      throw new IllegalArgumentException("The base value must be within the range of the field");
    }
    if (d + EXCEED_POINTS[b] > MathUtil.MAX_SAFE_INTEGER) {
      throw new DateTimeException("Unable to add printer-parser as the range exceeds the capacity of an int");
    }
  }
  this._baseValue = d;
  this._baseDate = e;
};
$jscomp.inherits(ReducedPrinterParser, NumberPrinterParser);
ReducedPrinterParser.prototype._getValue = function(a, b) {
  var c = Math.abs(b), d = this._baseValue;
  null !== this._baseDate && (a.temporal(), d = IsoChronology.INSTANCE.date(this._baseDate).get(this._field));
  return b >= d && b < d + EXCEED_POINTS[this._minWidth] ? c % EXCEED_POINTS[this._minWidth] : c % EXCEED_POINTS[this._maxWidth];
};
ReducedPrinterParser.prototype._setValue = function(a, b, c, d) {
  var e = this._baseValue;
  null != this._baseDate && (e = a.getEffectiveChronology().date(this._baseDate).get(this._field));
  if (d - c === this._minWidth && 0 <= b) {
    var f = EXCEED_POINTS[this._minWidth], g = e - e % f;
    b = 0 < e ? g + b : g - b;
    b < e && (b += f);
  }
  return a.setParsedField(this._field, b, c, d);
};
ReducedPrinterParser.prototype.withFixedWidth = function() {
  return -1 === this._subsequentWidth ? this : new ReducedPrinterParser(this._field, this._minWidth, this._maxWidth, this._baseValue, this._baseDate, -1);
};
ReducedPrinterParser.prototype.withSubsequentWidth = function(a) {
  return new ReducedPrinterParser(this._field, this._minWidth, this._maxWidth, this._baseValue, this._baseDate, this._subsequentWidth + a);
};
ReducedPrinterParser.prototype.isFixedWidth = function(a) {
  return !1 === a.isStrict() ? !1 : NumberPrinterParser.prototype.isFixedWidth.call(this, a);
};
ReducedPrinterParser.prototype.toString = function() {
  return "ReducedValue(" + this._field + "," + this._minWidth + "," + this._maxWidth + "," + (null != this._baseDate ? this._baseDate : this._baseValue) + ")";
};
var OffsetIdPrinterParser = function(a, b) {
  requireNonNull(a, "noOffsetText");
  requireNonNull(b, "pattern");
  this.noOffsetText = a;
  this.type = this._checkPattern(b);
};
OffsetIdPrinterParser.prototype._checkPattern = function(a) {
  for (var b = 0; b < OffsetIdPrinterParser.PATTERNS.length; b++) {
    if (OffsetIdPrinterParser.PATTERNS[b] === a) {
      return b;
    }
  }
  throw new IllegalArgumentException("Invalid zone offset pattern: " + a);
};
OffsetIdPrinterParser.prototype.print = function(a, b) {
  a = a.getValue(ChronoField.OFFSET_SECONDS);
  if (null == a) {
    return !1;
  }
  a = MathUtil.safeToInt(a);
  if (0 === a) {
    b.append(this.noOffsetText);
  } else {
    var c = Math.abs(MathUtil.intMod(MathUtil.intDiv(a, 3600), 100)), d = Math.abs(MathUtil.intMod(MathUtil.intDiv(a, 60), 60)), e = Math.abs(MathUtil.intMod(a, 60)), f = b.length(), g = c;
    b.append(0 > a ? "-" : "+").appendChar(MathUtil.intDiv(c, 10) + "0").appendChar(MathUtil.intMod(c, 10) + "0");
    if (3 <= this.type || 1 <= this.type && 0 < d) {
      if (b.append(0 === this.type % 2 ? ":" : "").appendChar(MathUtil.intDiv(d, 10) + "0").appendChar(d % 10 + "0"), g += d, 7 <= this.type || 5 <= this.type && 0 < e) {
        b.append(0 === this.type % 2 ? ":" : "").appendChar(MathUtil.intDiv(e, 10) + "0").appendChar(e % 10 + "0"), g += e;
      }
    }
    0 === g && (b.setLength(f), b.append(this.noOffsetText));
  }
  return !0;
};
OffsetIdPrinterParser.prototype.parse = function(a, b, c) {
  var d = b.length, e = this.noOffsetText.length;
  if (0 === e) {
    if (c === d) {
      return a.setParsedField(ChronoField.OFFSET_SECONDS, 0, c, c);
    }
  } else {
    if (c === d) {
      return ~c;
    }
    if (a.subSequenceEquals(b, c, this.noOffsetText, 0, e)) {
      return a.setParsedField(ChronoField.OFFSET_SECONDS, 0, c, c + e);
    }
  }
  d = b[c];
  if ("+" === d || "-" === d) {
    var f = "-" === d ? -1 : 1;
    d = [0, 0, 0, 0];
    d[0] = c + 1;
    if (!1 === (this._parseNumber(d, 1, b, !0) || this._parseNumber(d, 2, b, 3 <= this.type) || this._parseNumber(d, 3, b, !1))) {
      return b = MathUtil.safeZero(f * (3600 * d[1] + 60 * d[2] + d[3])), a.setParsedField(ChronoField.OFFSET_SECONDS, b, c, d[0]);
    }
  }
  return 0 === e ? a.setParsedField(ChronoField.OFFSET_SECONDS, 0, c, c + e) : ~c;
};
OffsetIdPrinterParser.prototype._parseNumber = function(a, b, c, d) {
  if ((this.type + 3) / 2 < b) {
    return !1;
  }
  var e = a[0];
  if (0 === this.type % 2 && 1 < b) {
    if (e + 1 > c.length || ":" !== c[e]) {
      return d;
    }
    e++;
  }
  if (e + 2 > c.length) {
    return d;
  }
  var f = c[e++];
  c = c[e++];
  if ("0" > f || "9" < f || "0" > c || "9" < c) {
    return d;
  }
  f = 10 * (f.charCodeAt(0) - 48) + (c.charCodeAt(0) - 48);
  if (0 > f || 59 < f) {
    return d;
  }
  a[b] = f;
  a[0] = e;
  return !1;
};
OffsetIdPrinterParser.prototype.toString = function() {
  var a = this.noOffsetText.replace("'", "''");
  return "Offset(" + OffsetIdPrinterParser.PATTERNS[this.type] + ",'" + a + "')";
};
$jscomp.global.Object.defineProperties(OffsetIdPrinterParser, {INSTANCE_ID:{configurable:!0, enumerable:!0, get:function() {
  delete OffsetIdPrinterParser.INSTANCE_ID;
  OffsetIdPrinterParser.INSTANCE_ID = new OffsetIdPrinterParser("Z", "+HH:MM:ss");
  return OffsetIdPrinterParser.INSTANCE_ID;
}}});
OffsetIdPrinterParser.PATTERNS = "+HH +HHmm +HH:mm +HHMM +HH:MM +HHMMss +HH:MM:ss +HHMMSS +HH:MM:SS".split(" ");
var PadPrinterParserDecorator = function(a, b, c) {
  this._printerParser = a;
  this._padWidth = b;
  this._padChar = c;
};
PadPrinterParserDecorator.prototype.print = function(a, b) {
  var c = b.length();
  if (!1 === this._printerParser.print(a, b)) {
    return !1;
  }
  a = b.length() - c;
  if (a > this._padWidth) {
    throw new DateTimeException("Cannot print as output of " + a + " characters exceeds pad width of " + this._padWidth);
  }
  for (var d = 0; d < this._padWidth - a; d++) {
    b.insert(c, this._padChar);
  }
  return !0;
};
PadPrinterParserDecorator.prototype.parse = function(a, b, c) {
  var d = a.isStrict(), e = a.isCaseSensitive();
  assert(!(c > b.length));
  assert(0 <= c);
  if (c === b.length) {
    return ~c;
  }
  var f = c + this._padWidth;
  if (f > b.length) {
    if (d) {
      return ~c;
    }
    f = b.length;
  }
  for (var g = c; g < f && (e ? b[g] === this._padChar : a.charEquals(b[g], this._padChar));) {
    g++;
  }
  b = b.substring(0, f);
  a = this._printerParser.parse(a, b, g);
  return a !== f && d ? ~(c + g) : a;
};
PadPrinterParserDecorator.prototype.toString = function() {
  return "Pad(" + this._printerParser + "," + this._padWidth + (" " === this._padChar ? ")" : ",'" + this._padChar + "')");
};
var SettingsParser = function() {
  Enum.apply(this, arguments);
};
$jscomp.inherits(SettingsParser, Enum);
SettingsParser.prototype.print = function() {
  return !0;
};
SettingsParser.prototype.parse = function(a, b, c) {
  switch(this) {
    case SettingsParser.SENSITIVE:
      a.setCaseSensitive(!0);
      break;
    case SettingsParser.INSENSITIVE:
      a.setCaseSensitive(!1);
      break;
    case SettingsParser.STRICT:
      a.setStrict(!0);
      break;
    case SettingsParser.LENIENT:
      a.setStrict(!1);
  }
  return c;
};
SettingsParser.prototype.toString = function() {
  switch(this) {
    case SettingsParser.SENSITIVE:
      return "ParseCaseSensitive(true)";
    case SettingsParser.INSENSITIVE:
      return "ParseCaseSensitive(false)";
    case SettingsParser.STRICT:
      return "ParseStrict(true)";
    case SettingsParser.LENIENT:
      return "ParseStrict(false)";
  }
};
SettingsParser.SENSITIVE = new SettingsParser("SENSITIVE");
SettingsParser.INSENSITIVE = new SettingsParser("INSENSITIVE");
SettingsParser.STRICT = new SettingsParser("STRICT");
SettingsParser.LENIENT = new SettingsParser("LENIENT");
var StringLiteralPrinterParser = function(a) {
  this._literal = a;
};
StringLiteralPrinterParser.prototype.print = function(a, b) {
  b.append(this._literal);
  return !0;
};
StringLiteralPrinterParser.prototype.parse = function(a, b, c) {
  assert(!(c > b.length || 0 > c));
  return !1 === a.subSequenceEquals(b, c, this._literal, 0, this._literal.length) ? ~c : c + this._literal.length;
};
StringLiteralPrinterParser.prototype.toString = function() {
  return "'" + this._literal.replace("'", "''") + "'";
};
var ZoneIdPrinterParser = function(a, b) {
  this.query = a;
  this.description = b;
};
ZoneIdPrinterParser.prototype.print = function(a, b) {
  a = a.getValueQuery(this.query);
  if (null == a) {
    return !1;
  }
  b.append(a.id());
  return !0;
};
ZoneIdPrinterParser.prototype.parse = function(a, b, c) {
  var d = b.length;
  if (c > d || c === d) {
    return ~c;
  }
  var e = b.charAt(c);
  if ("+" === e || "-" === e) {
    d = a.copy();
    b = OffsetIdPrinterParser.INSTANCE_ID.parse(d, b, c);
    if (0 > b) {
      return b;
    }
    c = d.getParsed(ChronoField.OFFSET_SECONDS);
    c = ZoneOffset.ofTotalSeconds(c);
    a.setParsedZone(c);
    return b;
  }
  if (d >= c + 2) {
    var f = b.charAt(c + 1);
    if (a.charEquals(e, "U") && a.charEquals(f, "T")) {
      return d >= c + 3 && a.charEquals(b.charAt(c + 2), "C") ? this._parsePrefixedOffset(a, b, c, c + 3) : this._parsePrefixedOffset(a, b, c, c + 2);
    }
    if (a.charEquals(e, "G") && d >= c + 3 && a.charEquals(f, "M") && a.charEquals(b.charAt(c + 2), "T")) {
      return this._parsePrefixedOffset(a, b, c, c + 3);
    }
  }
  if ("SYSTEM" === b.substr(c, 6)) {
    return a.setParsedZone(ZoneId.systemDefault()), c + 6;
  }
  if (a.charEquals(e, "Z")) {
    return a.setParsedZone(ZoneOffset.UTC), c + 1;
  }
  e = ZoneRulesProvider.getAvailableZoneIds();
  zoneIdTree.size !== e.length && (zoneIdTree = ZoneIdTree.createTreeMap(e));
  d -= c;
  e = zoneIdTree.treeMap;
  f = null;
  for (var g = 0; null != e;) {
    var h = b.substr(c, Math.min(e.length, d));
    e = e.get(h);
    null != e && e.isLeaf && (f = h, g = e.length);
  }
  return null != f ? (a.setParsedZone(ZoneRegion.ofId(f)), c + g) : ~c;
};
ZoneIdPrinterParser.prototype._parsePrefixedOffset = function(a, b, c, d) {
  c = b.substring(c, d).toUpperCase();
  var e = a.copy();
  if (d < b.length && a.charEquals(b.charAt(d), "Z")) {
    return a.setParsedZone(ZoneId.ofOffset(c, ZoneOffset.UTC)), d;
  }
  b = OffsetIdPrinterParser.INSTANCE_ID.parse(e, b, d);
  if (0 > b) {
    return a.setParsedZone(ZoneId.ofOffset(c, ZoneOffset.UTC)), d;
  }
  d = e.getParsed(ChronoField.OFFSET_SECONDS);
  d = ZoneOffset.ofTotalSeconds(d);
  a.setParsedZone(ZoneId.ofOffset(c, d));
  return b;
};
ZoneIdPrinterParser.prototype.toString = function() {
  return this.description;
};
var ZoneIdTree = function(a, b) {
  this.size = a;
  this.treeMap = b;
};
ZoneIdTree.createTreeMap = function(a) {
  a = a.sort(function(a, b) {
    return a.length - b.length;
  });
  for (var b = new ZoneIdTreeMap(a[0].length, !1), c = 0; c < a.length; c++) {
    b.add(a[c]);
  }
  return new ZoneIdTree(a.length, b);
};
var ZoneIdTreeMap = function(a, b) {
  this.length = void 0 === a ? 0 : a;
  this.isLeaf = void 0 === b ? !1 : b;
  this._treeMap = {};
};
ZoneIdTreeMap.prototype.add = function(a) {
  var b = a.length;
  if (b === this.length) {
    this._treeMap[a] = new ZoneIdTreeMap(b, !0);
  } else {
    if (b > this.length) {
      var c = a.substr(0, this.length), d = this._treeMap[c];
      null == d && (d = new ZoneIdTreeMap(b, !1), this._treeMap[c] = d);
      d.add(a);
    }
  }
};
ZoneIdTreeMap.prototype.get = function(a) {
  return this._treeMap[a];
};
var zoneIdTree = new ZoneIdTree([]), ResolverStyle = function() {
  Enum.apply(this, arguments);
};
$jscomp.inherits(ResolverStyle, Enum);
ResolverStyle.STRICT = new ResolverStyle("STRICT");
ResolverStyle.SMART = new ResolverStyle("SMART");
ResolverStyle.LENIENT = new ResolverStyle("LENIENT");
var SignStyle = function() {
  Enum.apply(this, arguments);
};
$jscomp.inherits(SignStyle, Enum);
SignStyle.prototype.parse = function(a, b, c) {
  switch(this) {
    case SignStyle.NORMAL:
      return !a || !b;
    case SignStyle.ALWAYS:
    case SignStyle.EXCEEDS_PAD:
      return !0;
    default:
      return !b && !c;
  }
};
SignStyle.NORMAL = new SignStyle("NORMAL");
SignStyle.NEVER = new SignStyle("NEVER");
SignStyle.ALWAYS = new SignStyle("ALWAYS");
SignStyle.EXCEEDS_PAD = new SignStyle("EXCEEDS_PAD");
SignStyle.NOT_NEGATIVE = new SignStyle("NOT_NEGATIVE");
var StringBuilder = function() {
  this._str = "";
};
StringBuilder.prototype.append = function(a) {
  this._str += a;
  return this;
};
StringBuilder.prototype.appendChar = function(a) {
  this._str += a[0];
  return this;
};
StringBuilder.prototype.insert = function(a, b) {
  this._str = this._str.slice(0, a) + b + this._str.slice(a);
  return this;
};
StringBuilder.prototype.replace = function(a, b, c) {
  this._str = this._str.slice(0, a) + c + this._str.slice(b);
  return this;
};
StringBuilder.prototype.length = function() {
  return this._str.length;
};
StringBuilder.prototype.setLength = function(a) {
  this._str = this._str.slice(0, a);
  return this;
};
StringBuilder.prototype.toString = function() {
  return this._str;
};
var TextStyle = function() {
  Enum.apply(this, arguments);
};
$jscomp.inherits(TextStyle, Enum);
TextStyle.prototype.isStandalone = function() {
  switch(this) {
    case TextStyle.FULL_STANDALONE:
    case TextStyle.SHORT_STANDALONE:
    case TextStyle.NARROW_STANDALONE:
      return !0;
    default:
      return !1;
  }
};
TextStyle.prototype.asStandalone = function() {
  switch(this) {
    case TextStyle.FULL:
      return TextStyle.FULL_STANDALONE;
    case TextStyle.SHORT:
      return TextStyle.SHORT_STANDALONE;
    case TextStyle.NARROW:
      return TextStyle.NARROW_STANDALONE;
    default:
      return this;
  }
};
TextStyle.prototype.asNormal = function() {
  switch(this) {
    case TextStyle.FULL_STANDALONE:
      return TextStyle.FULL;
    case TextStyle.SHORT_STANDALONE:
      return TextStyle.SHORT;
    case TextStyle.NARROW_STANDALONE:
      return TextStyle.NARROW;
    default:
      return this;
  }
};
TextStyle.FULL = new TextStyle("FULL");
TextStyle.FULL_STANDALONE = new TextStyle("FULL_STANDALONE");
TextStyle.SHORT = new TextStyle("SHORT");
TextStyle.SHORT_STANDALONE = new TextStyle("SHORT_STANDALONE");
TextStyle.NARROW = new TextStyle("NARROW");
TextStyle.NARROW_STANDALONE = new TextStyle("NARROW_STANDALONE");
var MAX_SAFE_INTEGER = 9007199254740991, MIN_SAFE_INTEGER = -9007199254740991;
function MathUtil() {
}
MathUtil.intDiv = function(a, b) {
  a = MathUtil.roundDown(a / b);
  return MathUtil.safeZero(a);
};
MathUtil.intMod = function(a, b) {
  a -= MathUtil.intDiv(a, b) * b;
  a = MathUtil.roundDown(a);
  return MathUtil.safeZero(a);
};
MathUtil.roundDown = function(a) {
  return 0 > a ? Math.ceil(a) : Math.floor(a);
};
MathUtil.floorDiv = function(a, b) {
  return MathUtil.safeZero(Math.floor(a / b));
};
MathUtil.floorMod = function(a, b) {
  a -= MathUtil.floorDiv(a, b) * b;
  return MathUtil.safeZero(a);
};
MathUtil.safeAdd = function(a, b) {
  if (0 === a) {
    return MathUtil.safeZero(b);
  }
  if (0 === b) {
    return MathUtil.safeZero(a);
  }
  var c = MathUtil.safeToInt(a + b);
  if (c === a || c === b) {
    throw new ArithmeticException("Invalid addition beyond MAX_SAFE_INTEGER!");
  }
  return c;
};
MathUtil.safeSubtract = function(a, b) {
  return 0 === a && 0 === b ? 0 : 0 === a ? MathUtil.safeZero(-1 * b) : 0 === b ? MathUtil.safeZero(a) : MathUtil.safeToInt(a - b);
};
MathUtil.safeMultiply = function(a, b) {
  if (1 === a) {
    return MathUtil.safeZero(b);
  }
  if (1 === b) {
    return MathUtil.safeZero(a);
  }
  if (0 === a || 0 === b) {
    return 0;
  }
  var c = MathUtil.safeToInt(a * b);
  if (c / b !== a || a === MIN_SAFE_INTEGER && -1 === b || b === MIN_SAFE_INTEGER && -1 === a) {
    throw new ArithmeticException("Multiplication overflows: " + a + " * " + b);
  }
  return c;
};
MathUtil.parseInt = function(a) {
  a = parseInt(a);
  return MathUtil.safeToInt(a);
};
MathUtil.safeToInt = function(a) {
  return a;
};
MathUtil.verifyInt = function(a) {
  if (null == a) {
    throw new ArithmeticException("Invalid value: '" + a + "', using null or undefined as argument");
  }
  if (isNaN(a)) {
    throw new ArithmeticException("Invalid int value, using NaN as argument");
  }
  if (0 !== a % 1) {
    throw new ArithmeticException("Invalid value: '" + a + "' is a float");
  }
  if (a > MAX_SAFE_INTEGER || a < MIN_SAFE_INTEGER) {
    throw new ArithmeticException("Calculation overflows an int: " + a);
  }
};
MathUtil.safeZero = function(a) {
  return 0 === a ? 0 : +a;
};
MathUtil.compareNumbers = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
};
MathUtil.smi = function(a) {
  return a >>> 1 & 1073741824 | a & 3221225471;
};
MathUtil.hash = function(a) {
  if (a !== a || Infinity === a) {
    return 0;
  }
  for (var b = a; 4294967295 < a;) {
    a /= 4294967295, b ^= a;
  }
  return MathUtil.smi(b);
};
MathUtil.hashCode = function(a) {
  for (var b = [], c = 0; c < arguments.length; ++c) {
    b[c - 0] = arguments[c];
  }
  c = 17;
  b = $jscomp.makeIterator(b);
  for (var d = b.next(); !d.done; d = b.next()) {
    c = (c << 5) - c + MathUtil.hash(d.value);
  }
  return MathUtil.hash(c);
};
MathUtil.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
MathUtil.MIN_SAFE_INTEGER = MIN_SAFE_INTEGER;
var StringUtil = function() {
};
StringUtil.startsWith = function(a, b) {
  return 0 === a.indexOf(b);
};
StringUtil.hashCode = function(a) {
  var b = a.length;
  if (0 === b) {
    return 0;
  }
  for (var c = 0, d = 0; d < b; d++) {
    var e = a.charCodeAt(d);
    c = (c << 5) - c + e;
    c |= 0;
  }
  return MathUtil.smi(c);
};
function assert(a, b, c) {
  if (!a) {
    if (c) {
      throw new c(b);
    }
    throw Error(b);
  }
}
function requireNonNull(a, b) {
  if (null == a) {
    throw new NullPointerException(b + " must not be null");
  }
  return a;
}
function requireInstance(a, b, c) {
  if (!(a instanceof b)) {
    throw new IllegalArgumentException(c + " must be an instance of " + (b.name ? b.name : b) + (a && a.constructor && a.constructor.name ? ", but is " + a.constructor.name : ""));
  }
  return a;
}
function abstractMethodFail(a) {
  throw new TypeError('abstract method "' + a + '" is not implemented');
}
var ToNativeJsConverter = function(a, b) {
  if (a instanceof LocalDate) {
    b = null == b ? ZoneId.systemDefault() : b, a = a.atStartOfDay(b);
  } else {
    if (a instanceof LocalDateTime) {
      b = null == b ? ZoneId.systemDefault() : b, a = a.atZone(b);
    } else {
      if (a instanceof ZonedDateTime) {
        a = null == b ? a : a.withZoneSameInstant(b);
      } else {
        throw new IllegalArgumentException("unsupported instance for convert operation:" + a);
      }
    }
  }
  this.instant = a.toInstant();
};
ToNativeJsConverter.prototype.toDate = function() {
  return new Date(this.instant.toEpochMilli());
};
ToNativeJsConverter.prototype.toEpochMilli = function() {
  return this.instant.toEpochMilli();
};
function convert(a, b) {
  return new ToNativeJsConverter(a, b);
}
var NativeJsTemporal = function(a, b) {
  b = void 0 === b ? ZoneId.systemDefault() : b;
  TemporalAccessor.call(this);
  this._zone = b;
  a instanceof Date ? this._epochMilli = a.getTime() : "function" === typeof a.toDate && a.toDate() instanceof Date ? this._epochMilli = a.toDate().getTime() : assert(!1, "date must be either a javascript date or a moment");
};
$jscomp.inherits(NativeJsTemporal, TemporalAccessor);
NativeJsTemporal.prototype.query = function(a) {
  requireNonNull(a, "query");
  return a === TemporalQueries.localDate() ? LocalDate.ofInstant(Instant.ofEpochMilli(this._epochMilli), this._zone) : a === TemporalQueries.localTime() ? LocalTime.ofInstant(Instant.ofEpochMilli(this._epochMilli), this._zone) : a === TemporalQueries.zone() ? this._zone : 
  TemporalAccessor.prototype.query.call(this, a);
};
NativeJsTemporal.prototype.get = function(a) {
  return this.getLong(a);
};
NativeJsTemporal.prototype.getLong = function(a) {
  requireNonNull(a, "field");
  if (a instanceof ChronoField) {
    switch(a) {
      case ChronoField.NANO_OF_SECOND:
        return 1000000 * MathUtil.floorMod(this._epochMilli, 1000);
      case ChronoField.INSTANT_SECONDS:
        return MathUtil.floorDiv(this._epochMilli, 1000);
    }
    throw new UnsupportedTemporalTypeException("Unsupported field: " + a);
  }
  return a.getFrom(this);
};
NativeJsTemporal.prototype.isSupported = function(a) {
  return a === ChronoField.INSTANT_SECONDS || a === ChronoField.NANO_OF_SECOND;
};
function nativeJs(a, b) {
  return new NativeJsTemporal(a, b);
}
function bindUse(a) {
  var b = [];
  return function(c) {
    ~b.indexOf(c) || (c(a), b.push(c));
    return a;
  };
}

raw.jsjoda.ArithmeticException = ArithmeticException;
raw.jsjoda.CharLiteralPrinterParser = CharLiteralPrinterParser;
raw.jsjoda.ChronoField = ChronoField;
raw.jsjoda.ChronoLocalDate = ChronoLocalDate;
raw.jsjoda.ChronoLocalDateTime = ChronoLocalDateTime;
raw.jsjoda.ChronoUnit = ChronoUnit;
raw.jsjoda.ChronoZonedDateTime = ChronoZonedDateTime;
raw.jsjoda.Clock = Clock;
raw.jsjoda.CompositePrinterParser = CompositePrinterParser;
raw.jsjoda.DateTimeBuilder = DateTimeBuilder;
raw.jsjoda.DateTimeException = DateTimeException;
raw.jsjoda.DateTimeFormatter = DateTimeFormatter;
raw.jsjoda.DateTimeFormatterBuilder = DateTimeFormatterBuilder;
raw.jsjoda.DateTimeParseContext = DateTimeParseContext;
raw.jsjoda.DateTimeParseException = DateTimeParseException;
raw.jsjoda.DateTimePrintContext = DateTimePrintContext;
raw.jsjoda.DayOfWeek = DayOfWeek;
raw.jsjoda.DecimalStyle = DecimalStyle;
raw.jsjoda.DefaultInterfaceTemporal = DefaultInterfaceTemporal;
raw.jsjoda.Duration = Duration;
raw.jsjoda.Enum = Enum;
raw.jsjoda.EnumMap = EnumMap;
raw.jsjoda.FractionPrinterParser = FractionPrinterParser;
raw.jsjoda.IllegalArgumentException = IllegalArgumentException;
raw.jsjoda.IllegalStateException = IllegalStateException;
raw.jsjoda.Instant = Instant;
raw.jsjoda.IsoChronology = IsoChronology;
raw.jsjoda.IsoFields = IsoFields;
raw.jsjoda.LocalDate = LocalDate;
raw.jsjoda.LocalDateTime = LocalDateTime;
raw.jsjoda.LocalTime = LocalTime;
raw.jsjoda.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
raw.jsjoda.MIN_SAFE_INTEGER = MIN_SAFE_INTEGER;
raw.jsjoda.MathUtil = MathUtil;
raw.jsjoda.Month = Month;
raw.jsjoda.MonthDay = MonthDay;
raw.jsjoda.NullPointerException = NullPointerException;
raw.jsjoda.NumberPrinterParser = NumberPrinterParser;
raw.jsjoda.OffsetIdPrinterParser = OffsetIdPrinterParser;
raw.jsjoda.PadPrinterParserDecorator = PadPrinterParserDecorator;
raw.jsjoda.ParsePosition = ParsePosition;
raw.jsjoda.Period = Period;
raw.jsjoda.ReducedPrinterParser = ReducedPrinterParser;
raw.jsjoda.ResolverStyle = ResolverStyle;
raw.jsjoda.SettingsParser = SettingsParser;
raw.jsjoda.SignStyle = SignStyle;
raw.jsjoda.StringBuilder = StringBuilder;
raw.jsjoda.StringLiteralPrinterParser = StringLiteralPrinterParser;
raw.jsjoda.StringUtil = StringUtil;
raw.jsjoda.SystemDefaultZoneId = SystemDefaultZoneId;
raw.jsjoda.SystemDefaultZoneRules = SystemDefaultZoneRules;
raw.jsjoda.Temporal = Temporal;
raw.jsjoda.TemporalAccessor = TemporalAccessor;
raw.jsjoda.TemporalAdjuster = TemporalAdjuster;
raw.jsjoda.TemporalAdjusters = TemporalAdjusters;
raw.jsjoda.TemporalAmount = TemporalAmount;
raw.jsjoda.TemporalField = TemporalField;
raw.jsjoda.TemporalQueries = TemporalQueries;
raw.jsjoda.TemporalQuery = TemporalQuery;
raw.jsjoda.TemporalUnit = TemporalUnit;
raw.jsjoda.TextStyle = TextStyle;
raw.jsjoda.UnsupportedTemporalTypeException = UnsupportedTemporalTypeException;
raw.jsjoda.ValueRange = ValueRange;
raw.jsjoda.Year = Year;
raw.jsjoda.YearConstants = YearConstants;
raw.jsjoda.YearMonth = YearMonth;
raw.jsjoda.ZoneId = ZoneId;
raw.jsjoda.ZoneIdFactory = ZoneIdFactory;
raw.jsjoda.ZoneIdPrinterParser = ZoneIdPrinterParser;
raw.jsjoda.ZoneOffset = ZoneOffset;
raw.jsjoda.ZoneOffsetTransition = ZoneOffsetTransition;
raw.jsjoda.ZoneRegion = ZoneRegion;
raw.jsjoda.ZoneRules = ZoneRules;
raw.jsjoda.ZoneRulesProvider = ZoneRulesProvider;
raw.jsjoda.ZonedDateTime = ZonedDateTime;
raw.jsjoda.abstractMethodFail = abstractMethodFail;
raw.jsjoda.assert = assert;
raw.jsjoda.bindUse = bindUse;
raw.jsjoda.convert = convert;
raw.jsjoda.createTemporalQuery = createTemporalQuery;
raw.jsjoda.nativeJs = nativeJs;
raw.jsjoda.requireInstance = requireInstance;
raw.jsjoda.requireNonNull = requireNonNull;
