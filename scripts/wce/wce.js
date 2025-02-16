var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners2(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners2 = this._events[evt];
      if (!listeners2) return 0;
      if (listeners2.fn) return 1;
      return listeners2.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners2 = this._events[evt], len = arguments.length, args, i;
      if (listeners2.fn) {
        if (listeners2.once) this.removeListener(event, listeners2.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners2.fn.call(listeners2.context), true;
          case 2:
            return listeners2.fn.call(listeners2.context, a1), true;
          case 3:
            return listeners2.fn.call(listeners2.context, a1, a2), true;
          case 4:
            return listeners2.fn.call(listeners2.context, a1, a2, a3), true;
          case 5:
            return listeners2.fn.call(listeners2.context, a1, a2, a3, a4), true;
          case 6:
            return listeners2.fn.call(listeners2.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners2.fn.apply(listeners2.context, args);
      } else {
        var length = listeners2.length, j;
        for (i = 0; i < length; i++) {
          if (listeners2[i].once) this.removeListener(event, listeners2[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners2[i].fn.call(listeners2[i].context);
              break;
            case 2:
              listeners2[i].fn.call(listeners2[i].context, a1);
              break;
            case 3:
              listeners2[i].fn.call(listeners2[i].context, a1, a2);
              break;
            case 4:
              listeners2[i].fn.call(listeners2[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners2[i].fn.apply(listeners2[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners2 = this._events[evt];
      if (listeners2.fn) {
        if (listeners2.fn === fn && (!once || listeners2.once) && (!context || listeners2.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners2.length; i < length; i++) {
          if (listeners2[i].fn !== fn || once && !listeners2[i].once || context && listeners2[i].context !== context) {
            events.push(listeners2[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter;
    }
  }
});

// node_modules/buttplug/dist/main/src/core/Logging.js
var require_Logging = __commonJS({
  "node_modules/buttplug/dist/main/src/core/Logging.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugLogger = exports.LogMessage = exports.ButtplugLogLevel = void 0;
    var eventemitter3_1 = require_eventemitter3();
    var ButtplugLogLevel;
    (function(ButtplugLogLevel2) {
      ButtplugLogLevel2[ButtplugLogLevel2["Off"] = 0] = "Off";
      ButtplugLogLevel2[ButtplugLogLevel2["Error"] = 1] = "Error";
      ButtplugLogLevel2[ButtplugLogLevel2["Warn"] = 2] = "Warn";
      ButtplugLogLevel2[ButtplugLogLevel2["Info"] = 3] = "Info";
      ButtplugLogLevel2[ButtplugLogLevel2["Debug"] = 4] = "Debug";
      ButtplugLogLevel2[ButtplugLogLevel2["Trace"] = 5] = "Trace";
    })(ButtplugLogLevel || (exports.ButtplugLogLevel = ButtplugLogLevel = {}));
    var LogMessage = class {
      /**
       * @param logMessage Log message.
       * @param logLevel: Log severity level.
       */
      constructor(logMessage, logLevel) {
        const a = /* @__PURE__ */ new Date();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        this.timestamp = `${hour}:${min}:${sec}`;
        this.logMessage = logMessage;
        this.logLevel = logLevel;
      }
      /**
       * Returns the log message.
       */
      get Message() {
        return this.logMessage;
      }
      /**
       * Returns the log message level.
       */
      get LogLevel() {
        return this.logLevel;
      }
      /**
       * Returns the log message timestamp.
       */
      get Timestamp() {
        return this.timestamp;
      }
      /**
       * Returns a formatted string with timestamp, level, and message.
       */
      get FormattedMessage() {
        return `${ButtplugLogLevel[this.logLevel]} : ${this.timestamp} : ${this.logMessage}`;
      }
    };
    exports.LogMessage = LogMessage;
    var ButtplugLogger = class _ButtplugLogger extends eventemitter3_1.EventEmitter {
      /**
       * Returns the stored static instance of the logger, creating one if it
       * doesn't currently exist.
       */
      static get Logger() {
        if (_ButtplugLogger.sLogger === void 0) {
          _ButtplugLogger.sLogger = new _ButtplugLogger();
        }
        return this.sLogger;
      }
      /**
       * Constructor. Can only be called internally since we regulate ButtplugLogger
       * ownership.
       */
      constructor() {
        super();
        this.maximumConsoleLogLevel = ButtplugLogLevel.Off;
        this.maximumEventLogLevel = ButtplugLogLevel.Off;
      }
      /**
       * Set the maximum log level to output to console.
       */
      get MaximumConsoleLogLevel() {
        return this.maximumConsoleLogLevel;
      }
      /**
       * Get the maximum log level to output to console.
       */
      set MaximumConsoleLogLevel(buttplugLogLevel) {
        this.maximumConsoleLogLevel = buttplugLogLevel;
      }
      /**
       * Set the global maximum log level
       */
      get MaximumEventLogLevel() {
        return this.maximumEventLogLevel;
      }
      /**
       * Get the global maximum log level
       */
      set MaximumEventLogLevel(logLevel) {
        this.maximumEventLogLevel = logLevel;
      }
      /**
       * Log new message at Error level.
       */
      Error(msg) {
        this.AddLogMessage(msg, ButtplugLogLevel.Error);
      }
      /**
       * Log new message at Warn level.
       */
      Warn(msg) {
        this.AddLogMessage(msg, ButtplugLogLevel.Warn);
      }
      /**
       * Log new message at Info level.
       */
      Info(msg) {
        this.AddLogMessage(msg, ButtplugLogLevel.Info);
      }
      /**
       * Log new message at Debug level.
       */
      Debug(msg) {
        this.AddLogMessage(msg, ButtplugLogLevel.Debug);
      }
      /**
       * Log new message at Trace level.
       */
      Trace(msg) {
        this.AddLogMessage(msg, ButtplugLogLevel.Trace);
      }
      /**
       * Checks to see if message should be logged, and if so, adds message to the
       * log buffer. May also print message and emit event.
       */
      AddLogMessage(msg, level) {
        if (level > this.maximumEventLogLevel && level > this.maximumConsoleLogLevel) {
          return;
        }
        const logMsg = new LogMessage(msg, level);
        if (level <= this.maximumConsoleLogLevel) {
          console.log(logMsg.FormattedMessage);
        }
        if (level <= this.maximumEventLogLevel) {
          this.emit("log", logMsg);
        }
      }
    };
    exports.ButtplugLogger = ButtplugLogger;
    ButtplugLogger.sLogger = void 0;
  }
});

// node_modules/class-transformer/cjs/enums/transformation-type.enum.js
var require_transformation_type_enum = __commonJS({
  "node_modules/class-transformer/cjs/enums/transformation-type.enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformationType = void 0;
    var TransformationType;
    (function(TransformationType2) {
      TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
      TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
      TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
    })(TransformationType = exports.TransformationType || (exports.TransformationType = {}));
  }
});

// node_modules/class-transformer/cjs/enums/index.js
var require_enums = __commonJS({
  "node_modules/class-transformer/cjs/enums/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_transformation_type_enum(), exports);
  }
});

// node_modules/class-transformer/cjs/MetadataStorage.js
var require_MetadataStorage = __commonJS({
  "node_modules/class-transformer/cjs/MetadataStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetadataStorage = void 0;
    var enums_1 = require_enums();
    var MetadataStorage = class {
      constructor() {
        this._typeMetadatas = /* @__PURE__ */ new Map();
        this._transformMetadatas = /* @__PURE__ */ new Map();
        this._exposeMetadatas = /* @__PURE__ */ new Map();
        this._excludeMetadatas = /* @__PURE__ */ new Map();
        this._ancestorsMap = /* @__PURE__ */ new Map();
      }
      // -------------------------------------------------------------------------
      // Adder Methods
      // -------------------------------------------------------------------------
      addTypeMetadata(metadata) {
        if (!this._typeMetadatas.has(metadata.target)) {
          this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      }
      addTransformMetadata(metadata) {
        if (!this._transformMetadatas.has(metadata.target)) {
          this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
          this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
        }
        this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
      }
      addExposeMetadata(metadata) {
        if (!this._exposeMetadatas.has(metadata.target)) {
          this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      }
      addExcludeMetadata(metadata) {
        if (!this._excludeMetadatas.has(metadata.target)) {
          this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      }
      // -------------------------------------------------------------------------
      // Public Methods
      // -------------------------------------------------------------------------
      findTransformMetadatas(target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName).filter((metadata) => {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_CLASS || transformationType === enums_1.TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        });
      }
      findExcludeMetadata(target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
      }
      findExposeMetadata(target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
      }
      findExposeMetadataByCustomName(target, name) {
        return this.getExposedMetadatas(target).find((metadata) => {
          return metadata.options && metadata.options.name === name;
        });
      }
      findTypeMetadata(target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
      }
      getStrategy(target) {
        const excludeMap = this._excludeMetadatas.get(target);
        const exclude = excludeMap && excludeMap.get(void 0);
        const exposeMap = this._exposeMetadatas.get(target);
        const expose = exposeMap && exposeMap.get(void 0);
        if (exclude && expose || !exclude && !expose)
          return "none";
        return exclude ? "excludeAll" : "exposeAll";
      }
      getExposedMetadatas(target) {
        return this.getMetadata(this._exposeMetadatas, target);
      }
      getExcludedMetadatas(target) {
        return this.getMetadata(this._excludeMetadatas, target);
      }
      getExposedProperties(target, transformationType) {
        return this.getExposedMetadatas(target).filter((metadata) => {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_CLASS || transformationType === enums_1.TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map((metadata) => metadata.propertyName);
      }
      getExcludedProperties(target, transformationType) {
        return this.getExcludedMetadatas(target).filter((metadata) => {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_CLASS || transformationType === enums_1.TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === enums_1.TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map((metadata) => metadata.propertyName);
      }
      clear() {
        this._typeMetadatas.clear();
        this._exposeMetadatas.clear();
        this._excludeMetadatas.clear();
        this._ancestorsMap.clear();
      }
      // -------------------------------------------------------------------------
      // Private Methods
      // -------------------------------------------------------------------------
      getMetadata(metadatas, target) {
        const metadataFromTargetMap = metadatas.get(target);
        let metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter((meta) => meta.propertyName !== void 0);
        }
        const metadataFromAncestors = [];
        for (const ancestor of this.getAncestors(target)) {
          const ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            const metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter((meta) => meta.propertyName !== void 0);
            metadataFromAncestors.push(...metadataFromAncestor);
          }
        }
        return metadataFromAncestors.concat(metadataFromTarget || []);
      }
      findMetadata(metadatas, target, propertyName) {
        const metadataFromTargetMap = metadatas.get(target);
        if (metadataFromTargetMap) {
          const metadataFromTarget = metadataFromTargetMap.get(propertyName);
          if (metadataFromTarget) {
            return metadataFromTarget;
          }
        }
        for (const ancestor of this.getAncestors(target)) {
          const ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            const ancestorResult = ancestorMetadataMap.get(propertyName);
            if (ancestorResult) {
              return ancestorResult;
            }
          }
        }
        return void 0;
      }
      findMetadatas(metadatas, target, propertyName) {
        const metadataFromTargetMap = metadatas.get(target);
        let metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = metadataFromTargetMap.get(propertyName);
        }
        const metadataFromAncestorsTarget = [];
        for (const ancestor of this.getAncestors(target)) {
          const ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            if (ancestorMetadataMap.has(propertyName)) {
              metadataFromAncestorsTarget.push(...ancestorMetadataMap.get(propertyName));
            }
          }
        }
        return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
      }
      getAncestors(target) {
        if (!target)
          return [];
        if (!this._ancestorsMap.has(target)) {
          const ancestors = [];
          for (let baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
            ancestors.push(baseClass);
          }
          this._ancestorsMap.set(target, ancestors);
        }
        return this._ancestorsMap.get(target);
      }
    };
    exports.MetadataStorage = MetadataStorage;
  }
});

// node_modules/class-transformer/cjs/storage.js
var require_storage = __commonJS({
  "node_modules/class-transformer/cjs/storage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultMetadataStorage = void 0;
    var MetadataStorage_1 = require_MetadataStorage();
    exports.defaultMetadataStorage = new MetadataStorage_1.MetadataStorage();
  }
});

// node_modules/class-transformer/cjs/utils/get-global.util.js
var require_get_global_util = __commonJS({
  "node_modules/class-transformer/cjs/utils/get-global.util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGlobal = void 0;
    function getGlobal() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof self !== "undefined") {
        return self;
      }
    }
    exports.getGlobal = getGlobal;
  }
});

// node_modules/class-transformer/cjs/utils/is-promise.util.js
var require_is_promise_util = __commonJS({
  "node_modules/class-transformer/cjs/utils/is-promise.util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPromise = void 0;
    function isPromise(p) {
      return p !== null && typeof p === "object" && typeof p.then === "function";
    }
    exports.isPromise = isPromise;
  }
});

// node_modules/class-transformer/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/class-transformer/cjs/utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_get_global_util(), exports);
    __exportStar(require_is_promise_util(), exports);
  }
});

// node_modules/class-transformer/cjs/TransformOperationExecutor.js
var require_TransformOperationExecutor = __commonJS({
  "node_modules/class-transformer/cjs/TransformOperationExecutor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformOperationExecutor = void 0;
    var storage_1 = require_storage();
    var enums_1 = require_enums();
    var utils_1 = require_utils();
    function instantiateArrayType(arrayType) {
      const array = new arrayType();
      if (!(array instanceof Set) && !("push" in array)) {
        return [];
      }
      return array;
    }
    var TransformOperationExecutor = class {
      // -------------------------------------------------------------------------
      // Constructor
      // -------------------------------------------------------------------------
      constructor(transformationType, options) {
        this.transformationType = transformationType;
        this.options = options;
        this.recursionStack = /* @__PURE__ */ new Set();
      }
      // -------------------------------------------------------------------------
      // Public Methods
      // -------------------------------------------------------------------------
      transform(source, value, targetType, arrayType, isMap, level = 0) {
        if (Array.isArray(value) || value instanceof Set) {
          const newValue = arrayType && this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
          value.forEach((subValue, index) => {
            const subSource = source ? source[index] : void 0;
            if (!this.options.enableCircularCheck || !this.isCircular(subValue)) {
              let realTargetType;
              if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
                if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                  realTargetType = targetType.options.discriminator.subTypes.find((subType) => subType.name === subValue[targetType.options.discriminator.property]);
                  const options = { newObject: newValue, object: subValue, property: void 0 };
                  const newType = targetType.typeFunction(options);
                  realTargetType === void 0 ? realTargetType = newType : realTargetType = realTargetType.value;
                  if (!targetType.options.keepDiscriminatorProperty)
                    delete subValue[targetType.options.discriminator.property];
                }
                if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
                  realTargetType = subValue.constructor;
                }
                if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN) {
                  subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find((subType) => subType.value === subValue.constructor).name;
                }
              } else {
                realTargetType = targetType;
              }
              const value2 = this.transform(subSource, subValue, realTargetType, void 0, subValue instanceof Map, level + 1);
              if (newValue instanceof Set) {
                newValue.add(value2);
              } else {
                newValue.push(value2);
              }
            } else if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
              if (newValue instanceof Set) {
                newValue.add(subValue);
              } else {
                newValue.push(subValue);
              }
            }
          });
          return newValue;
        } else if (targetType === String && !isMap) {
          if (value === null || value === void 0)
            return value;
          return String(value);
        } else if (targetType === Number && !isMap) {
          if (value === null || value === void 0)
            return value;
          return Number(value);
        } else if (targetType === Boolean && !isMap) {
          if (value === null || value === void 0)
            return value;
          return Boolean(value);
        } else if ((targetType === Date || value instanceof Date) && !isMap) {
          if (value instanceof Date) {
            return new Date(value.valueOf());
          }
          if (value === null || value === void 0)
            return value;
          return new Date(value);
        } else if (!!(0, utils_1.getGlobal)().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap) {
          if (value === null || value === void 0)
            return value;
          return Buffer.from(value);
        } else if ((0, utils_1.isPromise)(value) && !isMap) {
          return new Promise((resolve, reject) => {
            value.then((data) => resolve(this.transform(void 0, data, targetType, void 0, void 0, level + 1)), reject);
          });
        } else if (!isMap && value !== null && typeof value === "object" && typeof value.then === "function") {
          return value;
        } else if (typeof value === "object" && value !== null) {
          if (!targetType && value.constructor !== Object)
            if (!Array.isArray(value) && value.constructor === Array) {
            } else {
              targetType = value.constructor;
            }
          if (!targetType && source)
            targetType = source.constructor;
          if (this.options.enableCircularCheck) {
            this.recursionStack.add(value);
          }
          const keys = this.getKeys(targetType, value, isMap);
          let newValue = source ? source : {};
          if (!source && (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS || this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS)) {
            if (isMap) {
              newValue = /* @__PURE__ */ new Map();
            } else if (targetType) {
              newValue = new targetType();
            } else {
              newValue = {};
            }
          }
          for (const key of keys) {
            if (key === "__proto__" || key === "constructor") {
              continue;
            }
            const valueKey = key;
            let newValueKey = key, propertyName = key;
            if (!this.options.ignoreDecorators && targetType) {
              if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key);
                if (exposeMetadata) {
                  propertyName = exposeMetadata.propertyName;
                  newValueKey = exposeMetadata.propertyName;
                }
              } else if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN || this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
                const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(targetType, key);
                if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                  newValueKey = exposeMetadata.options.name;
                }
              }
            }
            let subValue = void 0;
            if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
              subValue = value[valueKey];
            } else {
              if (value instanceof Map) {
                subValue = value.get(valueKey);
              } else if (value[valueKey] instanceof Function) {
                subValue = value[valueKey]();
              } else {
                subValue = value[valueKey];
              }
            }
            let type = void 0, isSubValueMap = subValue instanceof Map;
            if (targetType && isMap) {
              type = targetType;
            } else if (targetType) {
              const metadata = storage_1.defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
              if (metadata) {
                const options = { newObject: newValue, object: value, property: propertyName };
                const newType = metadata.typeFunction ? metadata.typeFunction(options) : metadata.reflectedType;
                if (metadata.options && metadata.options.discriminator && metadata.options.discriminator.property && metadata.options.discriminator.subTypes) {
                  if (!(value[valueKey] instanceof Array)) {
                    if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                      type = metadata.options.discriminator.subTypes.find((subType) => {
                        if (subValue && subValue instanceof Object && metadata.options.discriminator.property in subValue) {
                          return subType.name === subValue[metadata.options.discriminator.property];
                        }
                      });
                      type === void 0 ? type = newType : type = type.value;
                      if (!metadata.options.keepDiscriminatorProperty) {
                        if (subValue && subValue instanceof Object && metadata.options.discriminator.property in subValue) {
                          delete subValue[metadata.options.discriminator.property];
                        }
                      }
                    }
                    if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
                      type = subValue.constructor;
                    }
                    if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN) {
                      if (subValue) {
                        subValue[metadata.options.discriminator.property] = metadata.options.discriminator.subTypes.find((subType) => subType.value === subValue.constructor).name;
                      }
                    }
                  } else {
                    type = metadata;
                  }
                } else {
                  type = newType;
                }
                isSubValueMap = isSubValueMap || metadata.reflectedType === Map;
              } else if (this.options.targetMaps) {
                this.options.targetMaps.filter((map) => map.target === targetType && !!map.properties[propertyName]).forEach((map) => type = map.properties[propertyName]);
              } else if (this.options.enableImplicitConversion && this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
                const reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
                if (reflectedType) {
                  type = reflectedType;
                }
              }
            }
            const arrayType2 = Array.isArray(value[valueKey]) ? this.getReflectedType(targetType, propertyName) : void 0;
            const subSource = source ? source[valueKey] : void 0;
            if (newValue.constructor.prototype) {
              const descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
              if ((this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS || this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) && // eslint-disable-next-line @typescript-eslint/unbound-method
              (descriptor && !descriptor.set || newValue[newValueKey] instanceof Function))
                continue;
            }
            if (!this.options.enableCircularCheck || !this.isCircular(subValue)) {
              const transformKey = this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS ? newValueKey : key;
              let finalValue;
              if (this.transformationType === enums_1.TransformationType.CLASS_TO_PLAIN) {
                finalValue = value[transformKey];
                finalValue = this.applyCustomTransformations(finalValue, targetType, transformKey, value, this.transformationType);
                finalValue = value[transformKey] === finalValue ? subValue : finalValue;
                finalValue = this.transform(subSource, finalValue, type, arrayType2, isSubValueMap, level + 1);
              } else {
                if (subValue === void 0 && this.options.exposeDefaultValues) {
                  finalValue = newValue[newValueKey];
                } else {
                  finalValue = this.transform(subSource, subValue, type, arrayType2, isSubValueMap, level + 1);
                  finalValue = this.applyCustomTransformations(finalValue, targetType, transformKey, value, this.transformationType);
                }
              }
              if (finalValue !== void 0 || this.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            } else if (this.transformationType === enums_1.TransformationType.CLASS_TO_CLASS) {
              let finalValue = subValue;
              finalValue = this.applyCustomTransformations(finalValue, targetType, key, value, this.transformationType);
              if (finalValue !== void 0 || this.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            }
          }
          if (this.options.enableCircularCheck) {
            this.recursionStack.delete(value);
          }
          return newValue;
        } else {
          return value;
        }
      }
      applyCustomTransformations(value, target, key, obj, transformationType) {
        let metadatas = storage_1.defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
        if (this.options.version !== void 0) {
          metadatas = metadatas.filter((metadata) => {
            if (!metadata.options)
              return true;
            return this.checkVersion(metadata.options.since, metadata.options.until);
          });
        }
        if (this.options.groups && this.options.groups.length) {
          metadatas = metadatas.filter((metadata) => {
            if (!metadata.options)
              return true;
            return this.checkGroups(metadata.options.groups);
          });
        } else {
          metadatas = metadatas.filter((metadata) => {
            return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
          });
        }
        metadatas.forEach((metadata) => {
          value = metadata.transformFn({ value, key, obj, type: transformationType, options: this.options });
        });
        return value;
      }
      // preventing circular references
      isCircular(object) {
        return this.recursionStack.has(object);
      }
      getReflectedType(target, propertyName) {
        if (!target)
          return void 0;
        const meta = storage_1.defaultMetadataStorage.findTypeMetadata(target, propertyName);
        return meta ? meta.reflectedType : void 0;
      }
      getKeys(target, object, isMap) {
        let strategy = storage_1.defaultMetadataStorage.getStrategy(target);
        if (strategy === "none")
          strategy = this.options.strategy || "exposeAll";
        let keys = [];
        if (strategy === "exposeAll" || isMap) {
          if (object instanceof Map) {
            keys = Array.from(object.keys());
          } else {
            keys = Object.keys(object);
          }
        }
        if (isMap) {
          return keys;
        }
        if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
          const exposedProperties = storage_1.defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          const excludedProperties = storage_1.defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          keys = [...exposedProperties, ...excludedProperties];
        }
        if (!this.options.ignoreDecorators && target) {
          let exposedProperties = storage_1.defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          if (this.transformationType === enums_1.TransformationType.PLAIN_TO_CLASS) {
            exposedProperties = exposedProperties.map((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                return exposeMetadata.options.name;
              }
              return key;
            });
          }
          if (this.options.excludeExtraneousValues) {
            keys = exposedProperties;
          } else {
            keys = keys.concat(exposedProperties);
          }
          const excludedProperties = storage_1.defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          if (excludedProperties.length > 0) {
            keys = keys.filter((key) => {
              return !excludedProperties.includes(key);
            });
          }
          if (this.options.version !== void 0) {
            keys = keys.filter((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
            });
          }
          if (this.options.groups && this.options.groups.length) {
            keys = keys.filter((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return this.checkGroups(exposeMetadata.options.groups);
            });
          } else {
            keys = keys.filter((key) => {
              const exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
              return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
            });
          }
        }
        if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
          keys = keys.filter((key) => this.options.excludePrefixes.every((prefix) => {
            return key.substr(0, prefix.length) !== prefix;
          }));
        }
        keys = keys.filter((key, index, self2) => {
          return self2.indexOf(key) === index;
        });
        return keys;
      }
      checkVersion(since, until) {
        let decision = true;
        if (decision && since)
          decision = this.options.version >= since;
        if (decision && until)
          decision = this.options.version < until;
        return decision;
      }
      checkGroups(groups) {
        if (!groups)
          return true;
        return this.options.groups.some((optionGroup) => groups.includes(optionGroup));
      }
    };
    exports.TransformOperationExecutor = TransformOperationExecutor;
  }
});

// node_modules/class-transformer/cjs/constants/default-options.constant.js
var require_default_options_constant = __commonJS({
  "node_modules/class-transformer/cjs/constants/default-options.constant.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultOptions = void 0;
    exports.defaultOptions = {
      enableCircularCheck: false,
      enableImplicitConversion: false,
      excludeExtraneousValues: false,
      excludePrefixes: void 0,
      exposeDefaultValues: false,
      exposeUnsetFields: true,
      groups: void 0,
      ignoreDecorators: false,
      strategy: void 0,
      targetMaps: void 0,
      version: void 0
    };
  }
});

// node_modules/class-transformer/cjs/ClassTransformer.js
var require_ClassTransformer = __commonJS({
  "node_modules/class-transformer/cjs/ClassTransformer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassTransformer = void 0;
    var TransformOperationExecutor_1 = require_TransformOperationExecutor();
    var enums_1 = require_enums();
    var default_options_constant_1 = require_default_options_constant();
    var ClassTransformer = class {
      instanceToPlain(object, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_PLAIN, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      }
      classToPlainFromExist(object, plainObject, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_PLAIN, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(plainObject, object, void 0, void 0, void 0, void 0);
      }
      plainToInstance(cls, plain, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.PLAIN_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(void 0, plain, cls, void 0, void 0, void 0);
      }
      plainToClassFromExist(clsObject, plain, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.PLAIN_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(clsObject, plain, void 0, void 0, void 0, void 0);
      }
      instanceToInstance(object, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      }
      classToClassFromExist(object, fromObject, options) {
        const executor = new TransformOperationExecutor_1.TransformOperationExecutor(enums_1.TransformationType.CLASS_TO_CLASS, {
          ...default_options_constant_1.defaultOptions,
          ...options
        });
        return executor.transform(fromObject, object, void 0, void 0, void 0, void 0);
      }
      serialize(object, options) {
        return JSON.stringify(this.instanceToPlain(object, options));
      }
      /**
       * Deserializes given JSON string to a object of the given class.
       */
      deserialize(cls, json, options) {
        const jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      }
      /**
       * Deserializes given JSON string to an array of objects of the given class.
       */
      deserializeArray(cls, json, options) {
        const jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      }
    };
    exports.ClassTransformer = ClassTransformer;
  }
});

// node_modules/class-transformer/cjs/decorators/exclude.decorator.js
var require_exclude_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/exclude.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Exclude = void 0;
    var storage_1 = require_storage();
    function Exclude(options = {}) {
      return function(object, propertyName) {
        storage_1.defaultMetadataStorage.addExcludeMetadata({
          target: object instanceof Function ? object : object.constructor,
          propertyName,
          options
        });
      };
    }
    exports.Exclude = Exclude;
  }
});

// node_modules/class-transformer/cjs/decorators/expose.decorator.js
var require_expose_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/expose.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Expose = void 0;
    var storage_1 = require_storage();
    function Expose(options = {}) {
      return function(object, propertyName) {
        storage_1.defaultMetadataStorage.addExposeMetadata({
          target: object instanceof Function ? object : object.constructor,
          propertyName,
          options
        });
      };
    }
    exports.Expose = Expose;
  }
});

// node_modules/class-transformer/cjs/decorators/transform-instance-to-instance.decorator.js
var require_transform_instance_to_instance_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform-instance-to-instance.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformInstanceToInstance = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    function TransformInstanceToInstance(params) {
      return function(target, propertyKey, descriptor) {
        const classTransformer = new ClassTransformer_1.ClassTransformer();
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
          const result = originalMethod.apply(this, args);
          const isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
          return isPromise ? result.then((data) => classTransformer.instanceToInstance(data, params)) : classTransformer.instanceToInstance(result, params);
        };
      };
    }
    exports.TransformInstanceToInstance = TransformInstanceToInstance;
  }
});

// node_modules/class-transformer/cjs/decorators/transform-instance-to-plain.decorator.js
var require_transform_instance_to_plain_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform-instance-to-plain.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformInstanceToPlain = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    function TransformInstanceToPlain(params) {
      return function(target, propertyKey, descriptor) {
        const classTransformer = new ClassTransformer_1.ClassTransformer();
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
          const result = originalMethod.apply(this, args);
          const isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
          return isPromise ? result.then((data) => classTransformer.instanceToPlain(data, params)) : classTransformer.instanceToPlain(result, params);
        };
      };
    }
    exports.TransformInstanceToPlain = TransformInstanceToPlain;
  }
});

// node_modules/class-transformer/cjs/decorators/transform-plain-to-instance.decorator.js
var require_transform_plain_to_instance_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform-plain-to-instance.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransformPlainToInstance = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    function TransformPlainToInstance(classType, params) {
      return function(target, propertyKey, descriptor) {
        const classTransformer = new ClassTransformer_1.ClassTransformer();
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
          const result = originalMethod.apply(this, args);
          const isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
          return isPromise ? result.then((data) => classTransformer.plainToInstance(classType, data, params)) : classTransformer.plainToInstance(classType, result, params);
        };
      };
    }
    exports.TransformPlainToInstance = TransformPlainToInstance;
  }
});

// node_modules/class-transformer/cjs/decorators/transform.decorator.js
var require_transform_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/transform.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Transform = void 0;
    var storage_1 = require_storage();
    function Transform(transformFn, options = {}) {
      return function(target, propertyName) {
        storage_1.defaultMetadataStorage.addTransformMetadata({
          target: target.constructor,
          propertyName,
          transformFn,
          options
        });
      };
    }
    exports.Transform = Transform;
  }
});

// node_modules/class-transformer/cjs/decorators/type.decorator.js
var require_type_decorator = __commonJS({
  "node_modules/class-transformer/cjs/decorators/type.decorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Type = void 0;
    var storage_1 = require_storage();
    function Type(typeFunction, options = {}) {
      return function(target, propertyName) {
        const reflectedType = Reflect.getMetadata("design:type", target, propertyName);
        storage_1.defaultMetadataStorage.addTypeMetadata({
          target: target.constructor,
          propertyName,
          reflectedType,
          typeFunction,
          options
        });
      };
    }
    exports.Type = Type;
  }
});

// node_modules/class-transformer/cjs/decorators/index.js
var require_decorators = __commonJS({
  "node_modules/class-transformer/cjs/decorators/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_exclude_decorator(), exports);
    __exportStar(require_expose_decorator(), exports);
    __exportStar(require_transform_instance_to_instance_decorator(), exports);
    __exportStar(require_transform_instance_to_plain_decorator(), exports);
    __exportStar(require_transform_plain_to_instance_decorator(), exports);
    __exportStar(require_transform_decorator(), exports);
    __exportStar(require_type_decorator(), exports);
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/expose-options.interface.js
var require_expose_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/expose-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/exclude-options.interface.js
var require_exclude_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/exclude-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/transform-options.interface.js
var require_transform_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/transform-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/type-discriminator-descriptor.interface.js
var require_type_discriminator_descriptor_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/type-discriminator-descriptor.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/decorator-options/type-options.interface.js
var require_type_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/decorator-options/type-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/exclude-metadata.interface.js
var require_exclude_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/exclude-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/expose-metadata.interface.js
var require_expose_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/expose-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/transform-metadata.interface.js
var require_transform_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/transform-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/transform-fn-params.interface.js
var require_transform_fn_params_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/transform-fn-params.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/metadata/type-metadata.interface.js
var require_type_metadata_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/metadata/type-metadata.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/class-constructor.type.js
var require_class_constructor_type = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/class-constructor.type.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/class-transformer-options.interface.js
var require_class_transformer_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/class-transformer-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/target-map.interface.js
var require_target_map_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/target-map.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/type-help-options.interface.js
var require_type_help_options_interface = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/type-help-options.interface.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/class-transformer/cjs/interfaces/index.js
var require_interfaces = __commonJS({
  "node_modules/class-transformer/cjs/interfaces/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_expose_options_interface(), exports);
    __exportStar(require_exclude_options_interface(), exports);
    __exportStar(require_transform_options_interface(), exports);
    __exportStar(require_type_discriminator_descriptor_interface(), exports);
    __exportStar(require_type_options_interface(), exports);
    __exportStar(require_exclude_metadata_interface(), exports);
    __exportStar(require_expose_metadata_interface(), exports);
    __exportStar(require_transform_metadata_interface(), exports);
    __exportStar(require_transform_fn_params_interface(), exports);
    __exportStar(require_type_metadata_interface(), exports);
    __exportStar(require_class_constructor_type(), exports);
    __exportStar(require_class_transformer_options_interface(), exports);
    __exportStar(require_target_map_interface(), exports);
    __exportStar(require_type_help_options_interface(), exports);
  }
});

// node_modules/class-transformer/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/class-transformer/cjs/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deserializeArray = exports.deserialize = exports.serialize = exports.classToClassFromExist = exports.instanceToInstance = exports.plainToClassFromExist = exports.plainToInstance = exports.plainToClass = exports.classToPlainFromExist = exports.instanceToPlain = exports.classToPlain = exports.ClassTransformer = void 0;
    var ClassTransformer_1 = require_ClassTransformer();
    var ClassTransformer_2 = require_ClassTransformer();
    Object.defineProperty(exports, "ClassTransformer", { enumerable: true, get: function() {
      return ClassTransformer_2.ClassTransformer;
    } });
    __exportStar(require_decorators(), exports);
    __exportStar(require_interfaces(), exports);
    __exportStar(require_enums(), exports);
    var classTransformer = new ClassTransformer_1.ClassTransformer();
    function classToPlain(object, options) {
      return classTransformer.instanceToPlain(object, options);
    }
    exports.classToPlain = classToPlain;
    function instanceToPlain(object, options) {
      return classTransformer.instanceToPlain(object, options);
    }
    exports.instanceToPlain = instanceToPlain;
    function classToPlainFromExist(object, plainObject, options) {
      return classTransformer.classToPlainFromExist(object, plainObject, options);
    }
    exports.classToPlainFromExist = classToPlainFromExist;
    function plainToClass(cls, plain, options) {
      return classTransformer.plainToInstance(cls, plain, options);
    }
    exports.plainToClass = plainToClass;
    function plainToInstance(cls, plain, options) {
      return classTransformer.plainToInstance(cls, plain, options);
    }
    exports.plainToInstance = plainToInstance;
    function plainToClassFromExist(clsObject, plain, options) {
      return classTransformer.plainToClassFromExist(clsObject, plain, options);
    }
    exports.plainToClassFromExist = plainToClassFromExist;
    function instanceToInstance(object, options) {
      return classTransformer.instanceToInstance(object, options);
    }
    exports.instanceToInstance = instanceToInstance;
    function classToClassFromExist(object, fromObject, options) {
      return classTransformer.classToClassFromExist(object, fromObject, options);
    }
    exports.classToClassFromExist = classToClassFromExist;
    function serialize(object, options) {
      return classTransformer.serialize(object, options);
    }
    exports.serialize = serialize;
    function deserialize(cls, json, options) {
      return classTransformer.deserialize(cls, json, options);
    }
    exports.deserialize = deserialize;
    function deserializeArray(cls, json, options) {
      return classTransformer.deserializeArray(cls, json, options);
    }
    exports.deserializeArray = deserializeArray;
  }
});

// node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS({
  "node_modules/reflect-metadata/Reflect.js"() {
    var Reflect2;
    (function(Reflect3) {
      (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
        var exporter = makeExporter(Reflect3);
        if (typeof root.Reflect !== "undefined") {
          exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
          root.Reflect = Reflect3;
        }
        function makeExporter(target, previous) {
          return function(key, value) {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
            if (previous)
              previous(key, value);
          };
        }
        function functionThis() {
          try {
            return Function("return this;")();
          } catch (_) {
          }
        }
        function indirectEvalThis() {
          try {
            return (void 0, eval)("(function() { return this; })()");
          } catch (_) {
          }
        }
        function sloppyModeThis() {
          return functionThis() || indirectEvalThis();
        }
      })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function";
        var supportsProto = { __proto__: [] } instanceof Array;
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
          // create an object in dictionary mode (a.k.a. "slow" mode in v8)
          create: supportsCreate ? function() {
            return MakeDictionary(/* @__PURE__ */ Object.create(null));
          } : supportsProto ? function() {
            return MakeDictionary({ __proto__: null });
          } : function() {
            return MakeDictionary({});
          },
          has: downLevel ? function(map, key) {
            return hasOwn.call(map, key);
          } : function(map, key) {
            return key in map;
          },
          get: downLevel ? function(map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0;
          } : function(map, key) {
            return map[key];
          }
        };
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        function decorate(decorators, target, propertyKey, attributes) {
          if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsObject(target))
              throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
              throw new TypeError();
            if (IsNull(attributes))
              attributes = void 0;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
          } else {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsConstructor(target))
              throw new TypeError();
            return DecorateConstructor(decorators, target);
          }
        }
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
          function decorator(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
              throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          return decorator;
        }
        exporter("metadata", metadata);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        function hasMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        function getMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        function getOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          var provider = GetMetadataProvider(
            target,
            propertyKey,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsConstructor(decorated))
                throw new TypeError();
              target = decorated;
            }
          }
          return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsObject(decorated))
                throw new TypeError();
              descriptor = decorated;
            }
          }
          return descriptor;
        }
        function OrdinaryHasMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return true;
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
          return false;
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
        }
        function OrdinaryGetMetadata(MetadataKey, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
          if (hasOwn2)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
          return void 0;
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return;
          return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            true
          );
          provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
        }
        function OrdinaryMetadataKeys(O, P) {
          var ownKeys = OrdinaryOwnMetadataKeys(O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (parent === null)
            return ownKeys;
          var parentKeys = OrdinaryMetadataKeys(parent, P);
          if (parentKeys.length <= 0)
            return ownKeys;
          if (ownKeys.length <= 0)
            return parentKeys;
          var set = new _Set();
          var keys = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          return keys;
        }
        function OrdinaryOwnMetadataKeys(O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*create*/
            false
          );
          if (!provider) {
            return [];
          }
          return provider.OrdinaryOwnMetadataKeys(O, P);
        }
        function Type(x) {
          if (x === null)
            return 1;
          switch (typeof x) {
            case "undefined":
              return 0;
            case "boolean":
              return 2;
            case "string":
              return 3;
            case "symbol":
              return 4;
            case "number":
              return 5;
            case "object":
              return x === null ? 1 : 6;
            default:
              return 6;
          }
        }
        function IsUndefined(x) {
          return x === void 0;
        }
        function IsNull(x) {
          return x === null;
        }
        function IsSymbol(x) {
          return typeof x === "symbol";
        }
        function IsObject(x) {
          return typeof x === "object" ? x !== null : typeof x === "function";
        }
        function ToPrimitive(input, PreferredType) {
          switch (Type(input)) {
            case 0:
              return input;
            case 1:
              return input;
            case 2:
              return input;
            case 3:
              return input;
            case 4:
              return input;
            case 5:
              return input;
          }
          var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
          var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
          if (exoticToPrim !== void 0) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
              throw new TypeError();
            return result;
          }
          return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        function OrdinaryToPrimitive(O, hint) {
          if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
              var result = toString_1.call(O);
              if (!IsObject(result))
                return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
          } else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
              var result = toString_2.call(O);
              if (!IsObject(result))
                return result;
            }
          }
          throw new TypeError();
        }
        function ToBoolean(argument) {
          return !!argument;
        }
        function ToString(argument) {
          return "" + argument;
        }
        function ToPropertyKey(argument) {
          var key = ToPrimitive(
            argument,
            3
            /* String */
          );
          if (IsSymbol(key))
            return key;
          return ToString(key);
        }
        function IsArray(argument) {
          return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        function IsCallable(argument) {
          return typeof argument === "function";
        }
        function IsConstructor(argument) {
          return typeof argument === "function";
        }
        function IsPropertyKey(argument) {
          switch (Type(argument)) {
            case 3:
              return true;
            case 4:
              return true;
            default:
              return false;
          }
        }
        function SameValueZero(x, y) {
          return x === y || x !== x && y !== y;
        }
        function GetMethod(V, P) {
          var func = V[P];
          if (func === void 0 || func === null)
            return void 0;
          if (!IsCallable(func))
            throw new TypeError();
          return func;
        }
        function GetIterator(obj) {
          var method = GetMethod(obj, iteratorSymbol);
          if (!IsCallable(method))
            throw new TypeError();
          var iterator = method.call(obj);
          if (!IsObject(iterator))
            throw new TypeError();
          return iterator;
        }
        function IteratorValue(iterResult) {
          return iterResult.value;
        }
        function IteratorStep(iterator) {
          var result = iterator.next();
          return result.done ? false : result;
        }
        function IteratorClose(iterator) {
          var f = iterator["return"];
          if (f)
            f.call(iterator);
        }
        function OrdinaryGetPrototypeOf(O) {
          var proto = Object.getPrototypeOf(O);
          if (typeof O !== "function" || O === functionPrototype)
            return proto;
          if (proto !== functionPrototype)
            return proto;
          var prototype = O.prototype;
          var prototypeProto = prototype && Object.getPrototypeOf(prototype);
          if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
          var constructor = prototypeProto.constructor;
          if (typeof constructor !== "function")
            return proto;
          if (constructor === O)
            return proto;
          return constructor;
        }
        function CreateMetadataRegistry() {
          var fallback;
          if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
            fallback = CreateFallbackProvider(root.Reflect);
          }
          var first;
          var second;
          var rest;
          var targetProviderMap = new _WeakMap();
          var registry = {
            registerProvider,
            getProvider,
            setProvider
          };
          return registry;
          function registerProvider(provider) {
            if (!Object.isExtensible(registry)) {
              throw new Error("Cannot add provider to a frozen registry.");
            }
            switch (true) {
              case fallback === provider:
                break;
              case IsUndefined(first):
                first = provider;
                break;
              case first === provider:
                break;
              case IsUndefined(second):
                second = provider;
                break;
              case second === provider:
                break;
              default:
                if (rest === void 0)
                  rest = new _Set();
                rest.add(provider);
                break;
            }
          }
          function getProviderNoCache(O, P) {
            if (!IsUndefined(first)) {
              if (first.isProviderFor(O, P))
                return first;
              if (!IsUndefined(second)) {
                if (second.isProviderFor(O, P))
                  return first;
                if (!IsUndefined(rest)) {
                  var iterator = GetIterator(rest);
                  while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                      return void 0;
                    }
                    var provider = IteratorValue(next);
                    if (provider.isProviderFor(O, P)) {
                      IteratorClose(iterator);
                      return provider;
                    }
                  }
                }
              }
            }
            if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
              return fallback;
            }
            return void 0;
          }
          function getProvider(O, P) {
            var providerMap = targetProviderMap.get(O);
            var provider;
            if (!IsUndefined(providerMap)) {
              provider = providerMap.get(P);
            }
            if (!IsUndefined(provider)) {
              return provider;
            }
            provider = getProviderNoCache(O, P);
            if (!IsUndefined(provider)) {
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return provider;
          }
          function hasProvider(provider) {
            if (IsUndefined(provider))
              throw new TypeError();
            return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
          }
          function setProvider(O, P, provider) {
            if (!hasProvider(provider)) {
              throw new Error("Metadata provider not registered.");
            }
            var existingProvider = getProvider(O, P);
            if (existingProvider !== provider) {
              if (!IsUndefined(existingProvider)) {
                return false;
              }
              var providerMap = targetProviderMap.get(O);
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return true;
          }
        }
        function GetOrCreateMetadataRegistry() {
          var metadataRegistry2;
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            metadataRegistry2 = root.Reflect[registrySymbol];
          }
          if (IsUndefined(metadataRegistry2)) {
            metadataRegistry2 = CreateMetadataRegistry();
          }
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            Object.defineProperty(root.Reflect, registrySymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: metadataRegistry2
            });
          }
          return metadataRegistry2;
        }
        function CreateMetadataProvider(registry) {
          var metadata2 = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var targetMetadata = metadata2.get(O);
              if (IsUndefined(targetMetadata))
                return false;
              return targetMetadata.has(P);
            },
            OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
            OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
            OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
            OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
            OrdinaryDeleteMetadata
          };
          metadataRegistry.registerProvider(provider);
          return provider;
          function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = metadata2.get(O);
            var createdTargetMetadata = false;
            if (IsUndefined(targetMetadata)) {
              if (!Create)
                return void 0;
              targetMetadata = new _Map();
              metadata2.set(O, targetMetadata);
              createdTargetMetadata = true;
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
              if (!Create)
                return void 0;
              metadataMap = new _Map();
              targetMetadata.set(P, metadataMap);
              if (!registry.setProvider(O, P, provider)) {
                targetMetadata.delete(P);
                if (createdTargetMetadata) {
                  metadata2.delete(O);
                }
                throw new Error("Wrong provider for target.");
              }
            }
            return metadataMap;
          }
          function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            return ToBoolean(metadataMap.has(MetadataKey));
          }
          function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return void 0;
            return metadataMap.get(MetadataKey);
          }
          function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              true
            );
            metadataMap.set(MetadataKey, MetadataValue);
          }
          function OrdinaryOwnMetadataKeys2(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys.length = k;
                return keys;
              }
              var nextValue = IteratorValue(next);
              try {
                keys[k] = nextValue;
              } catch (e) {
                try {
                  IteratorClose(iterator);
                } finally {
                  throw e;
                }
              }
              k++;
            }
          }
          function OrdinaryDeleteMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            if (!metadataMap.delete(MetadataKey))
              return false;
            if (metadataMap.size === 0) {
              var targetMetadata = metadata2.get(O);
              if (!IsUndefined(targetMetadata)) {
                targetMetadata.delete(P);
                if (targetMetadata.size === 0) {
                  metadata2.delete(targetMetadata);
                }
              }
            }
            return true;
          }
        }
        function CreateFallbackProvider(reflect) {
          var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
          var metadataOwner = new _WeakMap();
          var provider = {
            isProviderFor: function(O, P) {
              var metadataPropertySet = metadataOwner.get(O);
              if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
                return true;
              }
              if (getOwnMetadataKeys2(O, P).length) {
                if (IsUndefined(metadataPropertySet)) {
                  metadataPropertySet = new _Set();
                  metadataOwner.set(O, metadataPropertySet);
                }
                metadataPropertySet.add(P);
                return true;
              }
              return false;
            },
            OrdinaryDefineOwnMetadata: defineMetadata2,
            OrdinaryHasOwnMetadata: hasOwnMetadata2,
            OrdinaryGetOwnMetadata: getOwnMetadata2,
            OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
            OrdinaryDeleteMetadata: deleteMetadata2
          };
          return provider;
        }
        function GetMetadataProvider(O, P, Create) {
          var registeredProvider = metadataRegistry.getProvider(O, P);
          if (!IsUndefined(registeredProvider)) {
            return registeredProvider;
          }
          if (Create) {
            if (metadataRegistry.setProvider(O, P, metadataProvider)) {
              return metadataProvider;
            }
            throw new Error("Illegal state.");
          }
          return void 0;
        }
        function CreateMapPolyfill() {
          var cacheSentinel = {};
          var arraySentinel = [];
          var MapIterator = (
            /** @class */
            function() {
              function MapIterator2(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
              }
              MapIterator2.prototype["@@iterator"] = function() {
                return this;
              };
              MapIterator2.prototype[iteratorSymbol] = function() {
                return this;
              };
              MapIterator2.prototype.next = function() {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                  var result = this._selector(this._keys[index], this._values[index]);
                  if (index + 1 >= this._keys.length) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  } else {
                    this._index++;
                  }
                  return { value: result, done: false };
                }
                return { value: void 0, done: true };
              };
              MapIterator2.prototype.throw = function(error) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                throw error;
              };
              MapIterator2.prototype.return = function(value) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                return { value, done: true };
              };
              return MapIterator2;
            }()
          );
          var Map2 = (
            /** @class */
            function() {
              function Map3() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              Object.defineProperty(Map3.prototype, "size", {
                get: function() {
                  return this._keys.length;
                },
                enumerable: true,
                configurable: true
              });
              Map3.prototype.has = function(key) {
                return this._find(
                  key,
                  /*insert*/
                  false
                ) >= 0;
              };
              Map3.prototype.get = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                return index >= 0 ? this._values[index] : void 0;
              };
              Map3.prototype.set = function(key, value) {
                var index = this._find(
                  key,
                  /*insert*/
                  true
                );
                this._values[index] = value;
                return this;
              };
              Map3.prototype.delete = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                if (index >= 0) {
                  var size = this._keys.length;
                  for (var i = index + 1; i < size; i++) {
                    this._keys[i - 1] = this._keys[i];
                    this._values[i - 1] = this._values[i];
                  }
                  this._keys.length--;
                  this._values.length--;
                  if (SameValueZero(key, this._cacheKey)) {
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                  }
                  return true;
                }
                return false;
              };
              Map3.prototype.clear = function() {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              };
              Map3.prototype.keys = function() {
                return new MapIterator(this._keys, this._values, getKey);
              };
              Map3.prototype.values = function() {
                return new MapIterator(this._keys, this._values, getValue);
              };
              Map3.prototype.entries = function() {
                return new MapIterator(this._keys, this._values, getEntry);
              };
              Map3.prototype["@@iterator"] = function() {
                return this.entries();
              };
              Map3.prototype[iteratorSymbol] = function() {
                return this.entries();
              };
              Map3.prototype._find = function(key, insert) {
                if (!SameValueZero(this._cacheKey, key)) {
                  this._cacheIndex = -1;
                  for (var i = 0; i < this._keys.length; i++) {
                    if (SameValueZero(this._keys[i], key)) {
                      this._cacheIndex = i;
                      break;
                    }
                  }
                }
                if (this._cacheIndex < 0 && insert) {
                  this._cacheIndex = this._keys.length;
                  this._keys.push(key);
                  this._values.push(void 0);
                }
                return this._cacheIndex;
              };
              return Map3;
            }()
          );
          return Map2;
          function getKey(key, _) {
            return key;
          }
          function getValue(_, value) {
            return value;
          }
          function getEntry(key, value) {
            return [key, value];
          }
        }
        function CreateSetPolyfill() {
          var Set2 = (
            /** @class */
            function() {
              function Set3() {
                this._map = new _Map();
              }
              Object.defineProperty(Set3.prototype, "size", {
                get: function() {
                  return this._map.size;
                },
                enumerable: true,
                configurable: true
              });
              Set3.prototype.has = function(value) {
                return this._map.has(value);
              };
              Set3.prototype.add = function(value) {
                return this._map.set(value, value), this;
              };
              Set3.prototype.delete = function(value) {
                return this._map.delete(value);
              };
              Set3.prototype.clear = function() {
                this._map.clear();
              };
              Set3.prototype.keys = function() {
                return this._map.keys();
              };
              Set3.prototype.values = function() {
                return this._map.keys();
              };
              Set3.prototype.entries = function() {
                return this._map.entries();
              };
              Set3.prototype["@@iterator"] = function() {
                return this.keys();
              };
              Set3.prototype[iteratorSymbol] = function() {
                return this.keys();
              };
              return Set3;
            }()
          );
          return Set2;
        }
        function CreateWeakMapPolyfill() {
          var UUID_SIZE = 16;
          var keys = HashMap.create();
          var rootKey = CreateUniqueKey();
          return (
            /** @class */
            function() {
              function WeakMap2() {
                this._key = CreateUniqueKey();
              }
              WeakMap2.prototype.has = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.has(table, this._key) : false;
              };
              WeakMap2.prototype.get = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.get(table, this._key) : void 0;
              };
              WeakMap2.prototype.set = function(target, value) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  true
                );
                table[this._key] = value;
                return this;
              };
              WeakMap2.prototype.delete = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? delete table[this._key] : false;
              };
              WeakMap2.prototype.clear = function() {
                this._key = CreateUniqueKey();
              };
              return WeakMap2;
            }()
          );
          function CreateUniqueKey() {
            var key;
            do
              key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
          }
          function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
              if (!create)
                return void 0;
              Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
          }
          function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
              buffer[i] = Math.random() * 255 | 0;
            return buffer;
          }
          function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
              var array = new Uint8Array(size);
              if (typeof crypto !== "undefined") {
                crypto.getRandomValues(array);
              } else if (typeof msCrypto !== "undefined") {
                msCrypto.getRandomValues(array);
              } else {
                FillRandomBytes(array, size);
              }
              return array;
            }
            return FillRandomBytes(new Array(size), size);
          }
          function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 79 | 64;
            data[8] = data[8] & 191 | 128;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
              var byte = data[offset];
              if (offset === 4 || offset === 6 || offset === 8)
                result += "-";
              if (byte < 16)
                result += "0";
              result += byte.toString(16).toLowerCase();
            }
            return result;
          }
        }
        function MakeDictionary(obj) {
          obj.__ = void 0;
          delete obj.__;
          return obj;
        }
      });
    })(Reflect2 || (Reflect2 = {}));
  }
});

// node_modules/buttplug/dist/main/src/core/Messages.js
var require_Messages = __commonJS({
  "node_modules/buttplug/dist/main/src/core/Messages.js"(exports) {
    "use strict";
    var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = exports && exports.__metadata || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RawReading = exports.RawUnsubscribeCmd = exports.RawSubscribeCmd = exports.RawWriteCmd = exports.RawReadCmd = exports.SensorReading = exports.SensorReadCmd = exports.LinearCmd = exports.VectorSubcommand = exports.RotateCmd = exports.RotateSubcommand = exports.ScalarCmd = exports.ScalarSubcommand = exports.GenericMessageSubcommand = exports.StopAllDevices = exports.StopDeviceCmd = exports.ServerInfo = exports.RequestServerInfo = exports.ScanningFinished = exports.StopScanning = exports.StartScanning = exports.RequestDeviceList = exports.DeviceRemoved = exports.DeviceAdded = exports.DeviceList = exports.DeviceInfo = exports.Error = exports.ErrorClass = exports.Ping = exports.Ok = exports.ButtplugSystemMessage = exports.ButtplugDeviceMessage = exports.ButtplugMessage = exports.SensorDeviceMessageAttributes = exports.RawDeviceMessageAttributes = exports.GenericDeviceMessageAttributes = exports.SensorType = exports.ActuatorType = exports.MessageAttributes = exports.MESSAGE_SPEC_VERSION = exports.MAX_ID = exports.DEFAULT_MESSAGE_ID = exports.SYSTEM_MESSAGE_ID = void 0;
    var class_transformer_1 = require_cjs();
    require_Reflect();
    exports.SYSTEM_MESSAGE_ID = 0;
    exports.DEFAULT_MESSAGE_ID = 1;
    exports.MAX_ID = 4294967295;
    exports.MESSAGE_SPEC_VERSION = 3;
    var MessageAttributes = class {
      constructor(data) {
        Object.assign(this, data);
      }
      update() {
        var _a, _b, _c, _d, _e;
        (_a = this.ScalarCmd) === null || _a === void 0 ? void 0 : _a.forEach((x, i) => x.Index = i);
        (_b = this.RotateCmd) === null || _b === void 0 ? void 0 : _b.forEach((x, i) => x.Index = i);
        (_c = this.LinearCmd) === null || _c === void 0 ? void 0 : _c.forEach((x, i) => x.Index = i);
        (_d = this.SensorReadCmd) === null || _d === void 0 ? void 0 : _d.forEach((x, i) => x.Index = i);
        (_e = this.SensorSubscribeCmd) === null || _e === void 0 ? void 0 : _e.forEach((x, i) => x.Index = i);
      }
    };
    exports.MessageAttributes = MessageAttributes;
    var ActuatorType;
    (function(ActuatorType2) {
      ActuatorType2["Unknown"] = "Unknown";
      ActuatorType2["Vibrate"] = "Vibrate";
      ActuatorType2["Rotate"] = "Rotate";
      ActuatorType2["Oscillate"] = "Oscillate";
      ActuatorType2["Constrict"] = "Constrict";
      ActuatorType2["Inflate"] = "Inflate";
      ActuatorType2["Position"] = "Position";
    })(ActuatorType || (exports.ActuatorType = ActuatorType = {}));
    var SensorType;
    (function(SensorType2) {
      SensorType2["Unknown"] = "Unknown";
      SensorType2["Battery"] = "Battery";
      SensorType2["RSSI"] = "RSSI";
      SensorType2["Button"] = "Button";
      SensorType2["Pressure"] = "Pressure";
    })(SensorType || (exports.SensorType = SensorType = {}));
    var GenericDeviceMessageAttributes = class {
      constructor(data) {
        this.Index = 0;
        Object.assign(this, data);
      }
    };
    exports.GenericDeviceMessageAttributes = GenericDeviceMessageAttributes;
    var RawDeviceMessageAttributes = class {
      constructor(Endpoints) {
        this.Endpoints = Endpoints;
      }
    };
    exports.RawDeviceMessageAttributes = RawDeviceMessageAttributes;
    var SensorDeviceMessageAttributes = class {
      constructor(data) {
        this.Index = 0;
        Object.assign(this, data);
      }
    };
    exports.SensorDeviceMessageAttributes = SensorDeviceMessageAttributes;
    var ButtplugMessage = class {
      constructor(Id) {
        this.Id = Id;
      }
      // tslint:disable-next-line:ban-types
      get Type() {
        return this.constructor;
      }
      toJSON() {
        return JSON.stringify(this.toProtocolFormat());
      }
      toProtocolFormat() {
        const jsonObj = {};
        jsonObj[this.constructor.Name] = (0, class_transformer_1.instanceToPlain)(this);
        return jsonObj;
      }
      update() {
      }
    };
    exports.ButtplugMessage = ButtplugMessage;
    var ButtplugDeviceMessage = class extends ButtplugMessage {
      constructor(DeviceIndex, Id) {
        super(Id);
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
      }
    };
    exports.ButtplugDeviceMessage = ButtplugDeviceMessage;
    var ButtplugSystemMessage = class extends ButtplugMessage {
      constructor(Id = exports.SYSTEM_MESSAGE_ID) {
        super(Id);
        this.Id = Id;
      }
    };
    exports.ButtplugSystemMessage = ButtplugSystemMessage;
    var Ok = class extends ButtplugSystemMessage {
      constructor(Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.Id = Id;
      }
    };
    exports.Ok = Ok;
    Ok.Name = "Ok";
    var Ping = class extends ButtplugMessage {
      constructor(Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.Id = Id;
      }
    };
    exports.Ping = Ping;
    Ping.Name = "Ping";
    var ErrorClass;
    (function(ErrorClass2) {
      ErrorClass2[ErrorClass2["ERROR_UNKNOWN"] = 0] = "ERROR_UNKNOWN";
      ErrorClass2[ErrorClass2["ERROR_INIT"] = 1] = "ERROR_INIT";
      ErrorClass2[ErrorClass2["ERROR_PING"] = 2] = "ERROR_PING";
      ErrorClass2[ErrorClass2["ERROR_MSG"] = 3] = "ERROR_MSG";
      ErrorClass2[ErrorClass2["ERROR_DEVICE"] = 4] = "ERROR_DEVICE";
    })(ErrorClass || (exports.ErrorClass = ErrorClass = {}));
    var Error2 = class extends ButtplugMessage {
      constructor(ErrorMessage, ErrorCode = ErrorClass.ERROR_UNKNOWN, Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.ErrorMessage = ErrorMessage;
        this.ErrorCode = ErrorCode;
        this.Id = Id;
      }
      get Schemversion() {
        return 0;
      }
    };
    exports.Error = Error2;
    Error2.Name = "Error";
    var DeviceInfo = class {
      constructor(data) {
        Object.assign(this, data);
      }
    };
    exports.DeviceInfo = DeviceInfo;
    __decorate([
      (0, class_transformer_1.Type)(() => MessageAttributes),
      __metadata("design:type", MessageAttributes)
    ], DeviceInfo.prototype, "DeviceMessages", void 0);
    var DeviceList = class extends ButtplugMessage {
      constructor(devices, id = exports.DEFAULT_MESSAGE_ID) {
        super(id);
        this.Devices = devices;
        this.Id = id;
      }
      update() {
        for (const device of this.Devices) {
          device.DeviceMessages.update();
        }
      }
    };
    exports.DeviceList = DeviceList;
    DeviceList.Name = "DeviceList";
    __decorate([
      (0, class_transformer_1.Type)(() => DeviceInfo),
      __metadata("design:type", Array)
    ], DeviceList.prototype, "Devices", void 0);
    var DeviceAdded = class extends ButtplugSystemMessage {
      constructor(data) {
        super();
        Object.assign(this, data);
      }
      update() {
        this.DeviceMessages.update();
      }
    };
    exports.DeviceAdded = DeviceAdded;
    DeviceAdded.Name = "DeviceAdded";
    __decorate([
      (0, class_transformer_1.Type)(() => MessageAttributes),
      __metadata("design:type", MessageAttributes)
    ], DeviceAdded.prototype, "DeviceMessages", void 0);
    var DeviceRemoved = class extends ButtplugSystemMessage {
      constructor(DeviceIndex) {
        super();
        this.DeviceIndex = DeviceIndex;
      }
    };
    exports.DeviceRemoved = DeviceRemoved;
    DeviceRemoved.Name = "DeviceRemoved";
    var RequestDeviceList = class extends ButtplugMessage {
      constructor(Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.Id = Id;
      }
    };
    exports.RequestDeviceList = RequestDeviceList;
    RequestDeviceList.Name = "RequestDeviceList";
    var StartScanning = class extends ButtplugMessage {
      constructor(Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.Id = Id;
      }
    };
    exports.StartScanning = StartScanning;
    StartScanning.Name = "StartScanning";
    var StopScanning = class extends ButtplugMessage {
      constructor(Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.Id = Id;
      }
    };
    exports.StopScanning = StopScanning;
    StopScanning.Name = "StopScanning";
    var ScanningFinished = class extends ButtplugSystemMessage {
      constructor() {
        super();
      }
    };
    exports.ScanningFinished = ScanningFinished;
    ScanningFinished.Name = "ScanningFinished";
    var RequestServerInfo = class extends ButtplugMessage {
      constructor(ClientName, MessageVersion = 0, Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.ClientName = ClientName;
        this.MessageVersion = MessageVersion;
        this.Id = Id;
      }
    };
    exports.RequestServerInfo = RequestServerInfo;
    RequestServerInfo.Name = "RequestServerInfo";
    var ServerInfo = class extends ButtplugSystemMessage {
      constructor(MessageVersion, MaxPingTime, ServerName, Id = exports.DEFAULT_MESSAGE_ID) {
        super();
        this.MessageVersion = MessageVersion;
        this.MaxPingTime = MaxPingTime;
        this.ServerName = ServerName;
        this.Id = Id;
      }
    };
    exports.ServerInfo = ServerInfo;
    ServerInfo.Name = "ServerInfo";
    var StopDeviceCmd = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex = -1, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
      }
    };
    exports.StopDeviceCmd = StopDeviceCmd;
    StopDeviceCmd.Name = "StopDeviceCmd";
    var StopAllDevices = class extends ButtplugMessage {
      constructor(Id = exports.DEFAULT_MESSAGE_ID) {
        super(Id);
        this.Id = Id;
      }
    };
    exports.StopAllDevices = StopAllDevices;
    StopAllDevices.Name = "StopAllDevices";
    var GenericMessageSubcommand = class {
      constructor(Index) {
        this.Index = Index;
      }
    };
    exports.GenericMessageSubcommand = GenericMessageSubcommand;
    var ScalarSubcommand = class extends GenericMessageSubcommand {
      constructor(Index, Scalar, ActuatorType2) {
        super(Index);
        this.Scalar = Scalar;
        this.ActuatorType = ActuatorType2;
      }
    };
    exports.ScalarSubcommand = ScalarSubcommand;
    var ScalarCmd = class extends ButtplugDeviceMessage {
      constructor(Scalars, DeviceIndex = -1, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.Scalars = Scalars;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
      }
    };
    exports.ScalarCmd = ScalarCmd;
    ScalarCmd.Name = "ScalarCmd";
    var RotateSubcommand = class extends GenericMessageSubcommand {
      constructor(Index, Speed, Clockwise) {
        super(Index);
        this.Speed = Speed;
        this.Clockwise = Clockwise;
      }
    };
    exports.RotateSubcommand = RotateSubcommand;
    var RotateCmd = class _RotateCmd extends ButtplugDeviceMessage {
      static Create(deviceIndex, commands2) {
        const cmdList = new Array();
        let i = 0;
        for (const [speed, clockwise] of commands2) {
          cmdList.push(new RotateSubcommand(i, speed, clockwise));
          ++i;
        }
        return new _RotateCmd(cmdList, deviceIndex);
      }
      constructor(Rotations, DeviceIndex = -1, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.Rotations = Rotations;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
      }
    };
    exports.RotateCmd = RotateCmd;
    RotateCmd.Name = "RotateCmd";
    var VectorSubcommand = class extends GenericMessageSubcommand {
      constructor(Index, Position, Duration) {
        super(Index);
        this.Position = Position;
        this.Duration = Duration;
      }
    };
    exports.VectorSubcommand = VectorSubcommand;
    var LinearCmd = class _LinearCmd extends ButtplugDeviceMessage {
      static Create(deviceIndex, commands2) {
        const cmdList = new Array();
        let i = 0;
        for (const cmd of commands2) {
          cmdList.push(new VectorSubcommand(i, cmd[0], cmd[1]));
          ++i;
        }
        return new _LinearCmd(cmdList, deviceIndex);
      }
      constructor(Vectors, DeviceIndex = -1, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.Vectors = Vectors;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
      }
    };
    exports.LinearCmd = LinearCmd;
    LinearCmd.Name = "LinearCmd";
    var SensorReadCmd = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex, SensorIndex, SensorType2, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.SensorIndex = SensorIndex;
        this.SensorType = SensorType2;
        this.Id = Id;
      }
    };
    exports.SensorReadCmd = SensorReadCmd;
    SensorReadCmd.Name = "SensorReadCmd";
    var SensorReading = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex, SensorIndex, SensorType2, Data, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.SensorIndex = SensorIndex;
        this.SensorType = SensorType2;
        this.Data = Data;
        this.Id = Id;
      }
    };
    exports.SensorReading = SensorReading;
    SensorReading.Name = "SensorReading";
    var RawReadCmd = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex, Endpoint, ExpectedLength, Timeout, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Endpoint = Endpoint;
        this.ExpectedLength = ExpectedLength;
        this.Timeout = Timeout;
        this.Id = Id;
      }
    };
    exports.RawReadCmd = RawReadCmd;
    RawReadCmd.Name = "RawReadCmd";
    var RawWriteCmd = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex, Endpoint, Data, WriteWithResponse, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Endpoint = Endpoint;
        this.Data = Data;
        this.WriteWithResponse = WriteWithResponse;
        this.Id = Id;
      }
    };
    exports.RawWriteCmd = RawWriteCmd;
    RawWriteCmd.Name = "RawWriteCmd";
    var RawSubscribeCmd = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex, Endpoint, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Endpoint = Endpoint;
        this.Id = Id;
      }
    };
    exports.RawSubscribeCmd = RawSubscribeCmd;
    RawSubscribeCmd.Name = "RawSubscribeCmd";
    var RawUnsubscribeCmd = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex, Endpoint, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Endpoint = Endpoint;
        this.Id = Id;
      }
    };
    exports.RawUnsubscribeCmd = RawUnsubscribeCmd;
    RawUnsubscribeCmd.Name = "RawUnsubscribeCmd";
    var RawReading = class extends ButtplugDeviceMessage {
      constructor(DeviceIndex, Endpoint, Data, Id = exports.DEFAULT_MESSAGE_ID) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Endpoint = Endpoint;
        this.Data = Data;
        this.Id = Id;
      }
    };
    exports.RawReading = RawReading;
    RawReading.Name = "RawReading";
  }
});

// node_modules/buttplug/dist/main/src/core/Exceptions.js
var require_Exceptions = __commonJS({
  "node_modules/buttplug/dist/main/src/core/Exceptions.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugUnknownError = exports.ButtplugPingError = exports.ButtplugMessageError = exports.ButtplugDeviceError = exports.ButtplugInitError = exports.ButtplugError = void 0;
    var Messages = __importStar(require_Messages());
    var ButtplugError = class extends Error {
      get ErrorClass() {
        return this.errorClass;
      }
      get InnerError() {
        return this.innerError;
      }
      get Id() {
        return this.messageId;
      }
      get ErrorMessage() {
        return new Messages.Error(this.message, this.ErrorClass, this.Id);
      }
      static LogAndError(constructor, logger, message, id = Messages.SYSTEM_MESSAGE_ID) {
        logger.Error(message);
        return new constructor(message, id);
      }
      static FromError(error) {
        switch (error.ErrorCode) {
          case Messages.ErrorClass.ERROR_DEVICE:
            return new ButtplugDeviceError(error.ErrorMessage, error.Id);
          case Messages.ErrorClass.ERROR_INIT:
            return new ButtplugInitError(error.ErrorMessage, error.Id);
          case Messages.ErrorClass.ERROR_UNKNOWN:
            return new ButtplugUnknownError(error.ErrorMessage, error.Id);
          case Messages.ErrorClass.ERROR_PING:
            return new ButtplugPingError(error.ErrorMessage, error.Id);
          case Messages.ErrorClass.ERROR_MSG:
            return new ButtplugMessageError(error.ErrorMessage, error.Id);
          default:
            throw new Error(`Message type ${error.ErrorCode} not handled`);
        }
      }
      constructor(message, errorClass, id = Messages.SYSTEM_MESSAGE_ID, inner) {
        super(message);
        this.errorClass = Messages.ErrorClass.ERROR_UNKNOWN;
        this.errorClass = errorClass;
        this.innerError = inner;
        this.messageId = id;
      }
    };
    exports.ButtplugError = ButtplugError;
    var ButtplugInitError = class extends ButtplugError {
      constructor(message, id = Messages.SYSTEM_MESSAGE_ID) {
        super(message, Messages.ErrorClass.ERROR_INIT, id);
      }
    };
    exports.ButtplugInitError = ButtplugInitError;
    var ButtplugDeviceError = class extends ButtplugError {
      constructor(message, id = Messages.SYSTEM_MESSAGE_ID) {
        super(message, Messages.ErrorClass.ERROR_DEVICE, id);
      }
    };
    exports.ButtplugDeviceError = ButtplugDeviceError;
    var ButtplugMessageError = class extends ButtplugError {
      constructor(message, id = Messages.SYSTEM_MESSAGE_ID) {
        super(message, Messages.ErrorClass.ERROR_MSG, id);
      }
    };
    exports.ButtplugMessageError = ButtplugMessageError;
    var ButtplugPingError = class extends ButtplugError {
      constructor(message, id = Messages.SYSTEM_MESSAGE_ID) {
        super(message, Messages.ErrorClass.ERROR_PING, id);
      }
    };
    exports.ButtplugPingError = ButtplugPingError;
    var ButtplugUnknownError = class extends ButtplugError {
      constructor(message, id = Messages.SYSTEM_MESSAGE_ID) {
        super(message, Messages.ErrorClass.ERROR_UNKNOWN, id);
      }
    };
    exports.ButtplugUnknownError = ButtplugUnknownError;
  }
});

// node_modules/buttplug/dist/main/src/core/MessageUtils.js
var require_MessageUtils = __commonJS({
  "node_modules/buttplug/dist/main/src/core/MessageUtils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromJSON = exports.getMessageClassFromMessage = void 0;
    var class_transformer_1 = require_cjs();
    var Messages = __importStar(require_Messages());
    function getMessageClass(type) {
      for (const value of Object.values(Messages)) {
        if (typeof value === "function" && "Name" in value && value.Name === type) {
          return value;
        }
      }
      return null;
    }
    function getMessageClassFromMessage(msg) {
      return getMessageClass(Object.getPrototypeOf(msg).constructor.Name);
    }
    exports.getMessageClassFromMessage = getMessageClassFromMessage;
    function fromJSON(str) {
      const msgarray = JSON.parse(str);
      const msgs = [];
      for (const x of Array.from(msgarray)) {
        const type = Object.getOwnPropertyNames(x)[0];
        const cls = getMessageClass(type);
        if (cls) {
          const msg = (0, class_transformer_1.plainToInstance)(cls, x[type]);
          msg.update();
          msgs.push(msg);
        }
      }
      return msgs;
    }
    exports.fromJSON = fromJSON;
  }
});

// node_modules/buttplug/dist/main/src/client/ButtplugClientDevice.js
var require_ButtplugClientDevice = __commonJS({
  "node_modules/buttplug/dist/main/src/client/ButtplugClientDevice.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugClientDevice = void 0;
    var Messages = __importStar(require_Messages());
    var Exceptions_1 = require_Exceptions();
    var eventemitter3_1 = require_eventemitter3();
    var MessageUtils_1 = require_MessageUtils();
    var ButtplugClientDevice = class _ButtplugClientDevice extends eventemitter3_1.EventEmitter {
      /**
       * Return the name of the device.
       */
      get name() {
        return this._deviceInfo.DeviceName;
      }
      /**
       * Return the user set name of the device.
       */
      get displayName() {
        return this._deviceInfo.DeviceDisplayName;
      }
      /**
       * Return the index of the device.
       */
      get index() {
        return this._deviceInfo.DeviceIndex;
      }
      /**
       * Return the index of the device.
       */
      get messageTimingGap() {
        return this._deviceInfo.DeviceMessageTimingGap;
      }
      /**
       * Return a list of message types the device accepts.
       */
      get messageAttributes() {
        return this._deviceInfo.DeviceMessages;
      }
      static fromMsg(msg, sendClosure) {
        return new _ButtplugClientDevice(msg, sendClosure);
      }
      /**
       * @param _index Index of the device, as created by the device manager.
       * @param _name Name of the device.
       * @param allowedMsgs Buttplug messages the device can receive.
       */
      constructor(_deviceInfo, _sendClosure) {
        super();
        this._deviceInfo = _deviceInfo;
        this._sendClosure = _sendClosure;
        this.allowedMsgs = /* @__PURE__ */ new Map();
        _deviceInfo.DeviceMessages.update();
      }
      send(msg) {
        return __awaiter(this, void 0, void 0, function* () {
          return yield this._sendClosure(this, msg);
        });
      }
      sendExpectOk(msg) {
        return __awaiter(this, void 0, void 0, function* () {
          const response = yield this.send(msg);
          switch ((0, MessageUtils_1.getMessageClassFromMessage)(response)) {
            case Messages.Ok:
              return;
            case Messages.Error:
              throw Exceptions_1.ButtplugError.FromError(response);
            default:
              throw new Exceptions_1.ButtplugMessageError(`Message type ${response.constructor} not handled by SendMsgExpectOk`);
          }
        });
      }
      scalar(scalar) {
        return __awaiter(this, void 0, void 0, function* () {
          if (Array.isArray(scalar)) {
            yield this.sendExpectOk(new Messages.ScalarCmd(scalar, this.index));
          } else {
            yield this.sendExpectOk(new Messages.ScalarCmd([scalar], this.index));
          }
        });
      }
      scalarCommandBuilder(speed, actuator) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const scalarAttrs = (_a = this.messageAttributes.ScalarCmd) === null || _a === void 0 ? void 0 : _a.filter((x) => x.ActuatorType === actuator);
          if (!scalarAttrs || scalarAttrs.length === 0) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no ${actuator} capabilities`);
          }
          const cmds = [];
          if (typeof speed === "number") {
            scalarAttrs.forEach((x) => cmds.push(new Messages.ScalarSubcommand(x.Index, speed, actuator)));
          } else if (Array.isArray(speed)) {
            if (speed.length > scalarAttrs.length) {
              throw new Exceptions_1.ButtplugDeviceError(`${speed.length} commands send to a device with ${scalarAttrs.length} vibrators`);
            }
            scalarAttrs.forEach((x, i) => {
              cmds.push(new Messages.ScalarSubcommand(x.Index, speed[i], actuator));
            });
          } else {
            throw new Exceptions_1.ButtplugDeviceError(`${actuator} can only take numbers or arrays of numbers.`);
          }
          yield this.scalar(cmds);
        });
      }
      get vibrateAttributes() {
        var _a, _b;
        return (_b = (_a = this.messageAttributes.ScalarCmd) === null || _a === void 0 ? void 0 : _a.filter((x) => x.ActuatorType === Messages.ActuatorType.Vibrate)) !== null && _b !== void 0 ? _b : [];
      }
      vibrate(speed) {
        return __awaiter(this, void 0, void 0, function* () {
          yield this.scalarCommandBuilder(speed, Messages.ActuatorType.Vibrate);
        });
      }
      get oscillateAttributes() {
        var _a, _b;
        return (_b = (_a = this.messageAttributes.ScalarCmd) === null || _a === void 0 ? void 0 : _a.filter((x) => x.ActuatorType === Messages.ActuatorType.Oscillate)) !== null && _b !== void 0 ? _b : [];
      }
      oscillate(speed) {
        return __awaiter(this, void 0, void 0, function* () {
          yield this.scalarCommandBuilder(speed, Messages.ActuatorType.Oscillate);
        });
      }
      get rotateAttributes() {
        var _a;
        return (_a = this.messageAttributes.RotateCmd) !== null && _a !== void 0 ? _a : [];
      }
      rotate(values, clockwise) {
        return __awaiter(this, void 0, void 0, function* () {
          const rotateAttrs = this.messageAttributes.RotateCmd;
          if (!rotateAttrs || rotateAttrs.length === 0) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no Rotate capabilities`);
          }
          let msg;
          if (typeof values === "number") {
            msg = Messages.RotateCmd.Create(this.index, new Array(rotateAttrs.length).fill([values, clockwise]));
          } else if (Array.isArray(values)) {
            msg = Messages.RotateCmd.Create(this.index, values);
          } else {
            throw new Exceptions_1.ButtplugDeviceError("SendRotateCmd can only take a number and boolean, or an array of number/boolean tuples");
          }
          yield this.sendExpectOk(msg);
        });
      }
      get linearAttributes() {
        var _a;
        return (_a = this.messageAttributes.LinearCmd) !== null && _a !== void 0 ? _a : [];
      }
      linear(values, duration) {
        return __awaiter(this, void 0, void 0, function* () {
          const linearAttrs = this.messageAttributes.LinearCmd;
          if (!linearAttrs || linearAttrs.length === 0) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no Linear capabilities`);
          }
          let msg;
          if (typeof values === "number") {
            msg = Messages.LinearCmd.Create(this.index, new Array(linearAttrs.length).fill([values, duration]));
          } else if (Array.isArray(values)) {
            msg = Messages.LinearCmd.Create(this.index, values);
          } else {
            throw new Exceptions_1.ButtplugDeviceError("SendLinearCmd can only take a number and number, or an array of number/number tuples");
          }
          yield this.sendExpectOk(msg);
        });
      }
      sensorRead(sensorIndex, sensorType) {
        return __awaiter(this, void 0, void 0, function* () {
          const response = yield this.send(new Messages.SensorReadCmd(this.index, sensorIndex, sensorType));
          switch ((0, MessageUtils_1.getMessageClassFromMessage)(response)) {
            case Messages.SensorReading:
              return response.Data;
            case Messages.Error:
              throw Exceptions_1.ButtplugError.FromError(response);
            default:
              throw new Exceptions_1.ButtplugMessageError(`Message type ${response.constructor} not handled by sensorRead`);
          }
        });
      }
      get hasBattery() {
        var _a;
        const batteryAttrs = (_a = this.messageAttributes.SensorReadCmd) === null || _a === void 0 ? void 0 : _a.filter((x) => x.SensorType === Messages.SensorType.Battery);
        return batteryAttrs !== void 0 && batteryAttrs.length > 0;
      }
      battery() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          if (!this.hasBattery) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no Battery capabilities`);
          }
          const batteryAttrs = (_a = this.messageAttributes.SensorReadCmd) === null || _a === void 0 ? void 0 : _a.filter((x) => x.SensorType === Messages.SensorType.Battery);
          const result = yield this.sensorRead(batteryAttrs[0].Index, Messages.SensorType.Battery);
          return result[0] / 100;
        });
      }
      get hasRssi() {
        var _a;
        const rssiAttrs = (_a = this.messageAttributes.SensorReadCmd) === null || _a === void 0 ? void 0 : _a.filter((x) => x.SensorType === Messages.SensorType.RSSI);
        return rssiAttrs !== void 0 && rssiAttrs.length === 0;
      }
      rssi() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          if (!this.hasRssi) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no RSSI capabilities`);
          }
          const rssiAttrs = (_a = this.messageAttributes.SensorReadCmd) === null || _a === void 0 ? void 0 : _a.filter((x) => x.SensorType === Messages.SensorType.RSSI);
          const result = yield this.sensorRead(rssiAttrs[0].Index, Messages.SensorType.RSSI);
          return result[0];
        });
      }
      rawRead(endpoint, expectedLength, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!this.messageAttributes.RawReadCmd) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw read capabilities`);
          }
          if (this.messageAttributes.RawReadCmd.Endpoints.indexOf(endpoint) === -1) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw readable endpoint ${endpoint}`);
          }
          const response = yield this.send(new Messages.RawReadCmd(this.index, endpoint, expectedLength, timeout));
          switch ((0, MessageUtils_1.getMessageClassFromMessage)(response)) {
            case Messages.RawReading:
              return new Uint8Array(response.Data);
            case Messages.Error:
              throw Exceptions_1.ButtplugError.FromError(response);
            default:
              throw new Exceptions_1.ButtplugMessageError(`Message type ${response.constructor} not handled by rawRead`);
          }
        });
      }
      rawWrite(endpoint, data, writeWithResponse) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!this.messageAttributes.RawWriteCmd) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw write capabilities`);
          }
          if (this.messageAttributes.RawWriteCmd.Endpoints.indexOf(endpoint) === -1) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw writable endpoint ${endpoint}`);
          }
          yield this.sendExpectOk(new Messages.RawWriteCmd(this.index, endpoint, data, writeWithResponse));
        });
      }
      rawSubscribe(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!this.messageAttributes.RawSubscribeCmd) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw subscribe capabilities`);
          }
          if (this.messageAttributes.RawSubscribeCmd.Endpoints.indexOf(endpoint) === -1) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw subscribable endpoint ${endpoint}`);
          }
          yield this.sendExpectOk(new Messages.RawSubscribeCmd(this.index, endpoint));
        });
      }
      rawUnsubscribe(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!this.messageAttributes.RawSubscribeCmd) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw unsubscribe capabilities`);
          }
          if (this.messageAttributes.RawSubscribeCmd.Endpoints.indexOf(endpoint) === -1) {
            throw new Exceptions_1.ButtplugDeviceError(`Device ${this.name} has no raw unsubscribable endpoint ${endpoint}`);
          }
          yield this.sendExpectOk(new Messages.RawUnsubscribeCmd(this.index, endpoint));
        });
      }
      stop() {
        return __awaiter(this, void 0, void 0, function* () {
          yield this.sendExpectOk(new Messages.StopDeviceCmd(this.index));
        });
      }
      emitDisconnected() {
        this.emit("deviceremoved");
      }
    };
    exports.ButtplugClientDevice = ButtplugClientDevice;
  }
});

// node_modules/buttplug/dist/main/src/utils/ButtplugMessageSorter.js
var require_ButtplugMessageSorter = __commonJS({
  "node_modules/buttplug/dist/main/src/utils/ButtplugMessageSorter.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugMessageSorter = void 0;
    var Messages = __importStar(require_Messages());
    var Exceptions_1 = require_Exceptions();
    var ButtplugMessageSorter = class {
      constructor(_useCounter) {
        this._useCounter = _useCounter;
        this._counter = 1;
        this._waitingMsgs = /* @__PURE__ */ new Map();
      }
      // One of the places we should actually return a promise, as we need to store
      // them while waiting for them to return across the line.
      // tslint:disable:promise-function-async
      PrepareOutgoingMessage(msg) {
        if (this._useCounter) {
          msg.Id = this._counter;
          this._counter += 1;
        }
        let res;
        let rej;
        const msgPromise = new Promise((resolve, reject) => {
          res = resolve;
          rej = reject;
        });
        this._waitingMsgs.set(msg.Id, [res, rej]);
        return msgPromise;
      }
      ParseIncomingMessages(msgs) {
        const noMatch = [];
        for (const x of msgs) {
          if (x.Id !== Messages.SYSTEM_MESSAGE_ID && this._waitingMsgs.has(x.Id)) {
            const [res, rej] = this._waitingMsgs.get(x.Id);
            if (x.Type === Messages.Error) {
              rej(Exceptions_1.ButtplugError.FromError(x));
              continue;
            }
            res(x);
            continue;
          } else {
            noMatch.push(x);
          }
        }
        return noMatch;
      }
    };
    exports.ButtplugMessageSorter = ButtplugMessageSorter;
  }
});

// node_modules/buttplug/dist/main/src/client/ButtplugClientConnectorException.js
var require_ButtplugClientConnectorException = __commonJS({
  "node_modules/buttplug/dist/main/src/client/ButtplugClientConnectorException.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugClientConnectorException = void 0;
    var Exceptions_1 = require_Exceptions();
    var Messages = __importStar(require_Messages());
    var ButtplugClientConnectorException = class extends Exceptions_1.ButtplugError {
      constructor(message) {
        super(message, Messages.ErrorClass.ERROR_UNKNOWN);
      }
    };
    exports.ButtplugClientConnectorException = ButtplugClientConnectorException;
  }
});

// node_modules/buttplug/dist/main/src/client/Client.js
var require_Client = __commonJS({
  "node_modules/buttplug/dist/main/src/client/Client.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugClient = void 0;
    var Logging_1 = require_Logging();
    var eventemitter3_1 = require_eventemitter3();
    var ButtplugClientDevice_1 = require_ButtplugClientDevice();
    var ButtplugMessageSorter_1 = require_ButtplugMessageSorter();
    var Messages = __importStar(require_Messages());
    var Exceptions_1 = require_Exceptions();
    var ButtplugClientConnectorException_1 = require_ButtplugClientConnectorException();
    var MessageUtils_1 = require_MessageUtils();
    var ButtplugClient = class extends eventemitter3_1.EventEmitter {
      constructor(clientName = "Generic Buttplug Client") {
        super();
        this._pingTimer = null;
        this._connector = null;
        this._devices = /* @__PURE__ */ new Map();
        this._logger = Logging_1.ButtplugLogger.Logger;
        this._isScanning = false;
        this._sorter = new ButtplugMessageSorter_1.ButtplugMessageSorter(true);
        this.connect = (connector) => __awaiter(this, void 0, void 0, function* () {
          this._logger.Info(`ButtplugClient: Connecting using ${connector.constructor.name}`);
          yield connector.connect();
          this._connector = connector;
          this._connector.addListener("message", this.parseMessages);
          this._connector.addListener("disconnect", this.disconnectHandler);
          yield this.initializeConnection();
        });
        this.disconnect = () => __awaiter(this, void 0, void 0, function* () {
          this._logger.Debug("ButtplugClient: Disconnect called");
          this.checkConnector();
          yield this.shutdownConnection();
          yield this._connector.disconnect();
        });
        this.startScanning = () => __awaiter(this, void 0, void 0, function* () {
          this._logger.Debug("ButtplugClient: StartScanning called");
          this._isScanning = true;
          yield this.sendMsgExpectOk(new Messages.StartScanning());
        });
        this.stopScanning = () => __awaiter(this, void 0, void 0, function* () {
          this._logger.Debug("ButtplugClient: StopScanning called");
          this._isScanning = false;
          yield this.sendMsgExpectOk(new Messages.StopScanning());
        });
        this.stopAllDevices = () => __awaiter(this, void 0, void 0, function* () {
          this._logger.Debug("ButtplugClient: StopAllDevices");
          yield this.sendMsgExpectOk(new Messages.StopAllDevices());
        });
        this.disconnectHandler = () => {
          this._logger.Info("ButtplugClient: Disconnect event receieved.");
          this.emit("disconnect");
        };
        this.parseMessages = (msgs) => {
          const leftoverMsgs = this._sorter.ParseIncomingMessages(msgs);
          for (const x of leftoverMsgs) {
            switch ((0, MessageUtils_1.getMessageClassFromMessage)(x)) {
              case Messages.DeviceAdded: {
                const addedMsg = x;
                const addedDevice = ButtplugClientDevice_1.ButtplugClientDevice.fromMsg(addedMsg, this.sendDeviceMessageClosure);
                this._devices.set(addedMsg.DeviceIndex, addedDevice);
                this.emit("deviceadded", addedDevice);
                break;
              }
              case Messages.DeviceRemoved: {
                const removedMsg = x;
                if (this._devices.has(removedMsg.DeviceIndex)) {
                  const removedDevice = this._devices.get(removedMsg.DeviceIndex);
                  removedDevice === null || removedDevice === void 0 ? void 0 : removedDevice.emitDisconnected();
                  this._devices.delete(removedMsg.DeviceIndex);
                  this.emit("deviceremoved", removedDevice);
                }
                break;
              }
              case Messages.ScanningFinished:
                this._isScanning = false;
                this.emit("scanningfinished", x);
                break;
            }
          }
        };
        this.initializeConnection = () => __awaiter(this, void 0, void 0, function* () {
          this.checkConnector();
          const msg = yield this.sendMessage(new Messages.RequestServerInfo(this._clientName, Messages.MESSAGE_SPEC_VERSION));
          switch ((0, MessageUtils_1.getMessageClassFromMessage)(msg)) {
            case Messages.ServerInfo: {
              const serverinfo = msg;
              this._logger.Info(`ButtplugClient: Connected to Server ${serverinfo.ServerName}`);
              const ping = serverinfo.MaxPingTime;
              if (serverinfo.MessageVersion < Messages.MESSAGE_SPEC_VERSION) {
                yield this._connector.disconnect();
                throw Exceptions_1.ButtplugError.LogAndError(Exceptions_1.ButtplugInitError, this._logger, `Server protocol version ${serverinfo.MessageVersion} is older than client protocol version ${Messages.MESSAGE_SPEC_VERSION}. Please update server.`);
              }
              if (ping > 0) {
              }
              yield this.requestDeviceList();
              return true;
            }
            case Messages.Error: {
              yield this._connector.disconnect();
              const err = msg;
              throw Exceptions_1.ButtplugError.LogAndError(Exceptions_1.ButtplugInitError, this._logger, `Cannot connect to server. ${err.ErrorMessage}`);
            }
          }
          return false;
        });
        this.requestDeviceList = () => __awaiter(this, void 0, void 0, function* () {
          this.checkConnector();
          this._logger.Debug("ButtplugClient: ReceiveDeviceList called");
          const deviceList = yield this.sendMessage(new Messages.RequestDeviceList());
          deviceList.Devices.forEach((d) => {
            if (!this._devices.has(d.DeviceIndex)) {
              const device = ButtplugClientDevice_1.ButtplugClientDevice.fromMsg(d, this.sendDeviceMessageClosure);
              this._logger.Debug(`ButtplugClient: Adding Device: ${device}`);
              this._devices.set(d.DeviceIndex, device);
              this.emit("deviceadded", device);
            } else {
              this._logger.Debug(`ButtplugClient: Device already added: ${d}`);
            }
          });
        });
        this.shutdownConnection = () => __awaiter(this, void 0, void 0, function* () {
          yield this.stopAllDevices();
          if (this._pingTimer !== null) {
            clearInterval(this._pingTimer);
            this._pingTimer = null;
          }
        });
        this.sendMsgExpectOk = (msg) => __awaiter(this, void 0, void 0, function* () {
          const response = yield this.sendMessage(msg);
          switch ((0, MessageUtils_1.getMessageClassFromMessage)(response)) {
            case Messages.Ok:
              return;
            case Messages.Error:
              throw Exceptions_1.ButtplugError.FromError(response);
            default:
              throw Exceptions_1.ButtplugError.LogAndError(Exceptions_1.ButtplugMessageError, this._logger, `Message type ${(0, MessageUtils_1.getMessageClassFromMessage)(response).constructor} not handled by SendMsgExpectOk`);
          }
        });
        this.sendDeviceMessageClosure = (device, msg) => __awaiter(this, void 0, void 0, function* () {
          return yield this.sendDeviceMessage(device, msg);
        });
        this._clientName = clientName;
        this._logger.Debug(`ButtplugClient: Client ${clientName} created.`);
      }
      get connected() {
        return this._connector !== null && this._connector.Connected;
      }
      get devices() {
        this.checkConnector();
        const devices = [];
        this._devices.forEach((d) => {
          devices.push(d);
        });
        return devices;
      }
      get isScanning() {
        return this._isScanning;
      }
      sendDeviceMessage(device, deviceMsg) {
        return __awaiter(this, void 0, void 0, function* () {
          this.checkConnector();
          const dev = this._devices.get(device.index);
          if (dev === void 0) {
            throw Exceptions_1.ButtplugError.LogAndError(Exceptions_1.ButtplugDeviceError, this._logger, `Device ${device.index} not available.`);
          }
          deviceMsg.DeviceIndex = device.index;
          return yield this.sendMessage(deviceMsg);
        });
      }
      sendMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
          this.checkConnector();
          const p = this._sorter.PrepareOutgoingMessage(msg);
          yield this._connector.send(msg);
          return yield p;
        });
      }
      checkConnector() {
        if (!this.connected) {
          throw new ButtplugClientConnectorException_1.ButtplugClientConnectorException("ButtplugClient not connected");
        }
      }
    };
    exports.ButtplugClient = ButtplugClient;
  }
});

// node_modules/buttplug/dist/main/src/utils/ButtplugBrowserWebsocketConnector.js
var require_ButtplugBrowserWebsocketConnector = __commonJS({
  "node_modules/buttplug/dist/main/src/utils/ButtplugBrowserWebsocketConnector.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugBrowserWebsocketConnector = void 0;
    var eventemitter3_1 = require_eventemitter3();
    var MessageUtils_1 = require_MessageUtils();
    var ButtplugBrowserWebsocketConnector = class extends eventemitter3_1.EventEmitter {
      constructor(_url) {
        super();
        this._url = _url;
        this._websocketConstructor = null;
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
          var _a;
          const ws = new ((_a = this._websocketConstructor) !== null && _a !== void 0 ? _a : WebSocket)(this._url);
          let res;
          let rej;
          const p = new Promise((resolve, reject) => {
            res = resolve;
            rej = reject;
          });
          const conErrorCallback = () => rej();
          ws.addEventListener("open", () => __awaiter(this, void 0, void 0, function* () {
            this._ws = ws;
            try {
              yield this.initialize();
              this._ws.addEventListener("message", (msg) => {
                this.parseIncomingMessage(msg);
              });
              this._ws.removeEventListener("close", conErrorCallback);
              this._ws.addEventListener("close", this.disconnect);
              res();
            } catch (e) {
              console.log(e);
              rej();
            }
          }));
          ws.addEventListener("close", conErrorCallback);
          return p;
        });
        this.disconnect = () => __awaiter(this, void 0, void 0, function* () {
          if (!this.Connected) {
            return;
          }
          this._ws.close();
          this._ws = void 0;
          this.emit("disconnect");
        });
        this.initialize = () => __awaiter(this, void 0, void 0, function* () {
          return Promise.resolve();
        });
      }
      get Connected() {
        return this._ws !== void 0;
      }
      sendMessage(msg) {
        if (!this.Connected) {
          throw new Error("ButtplugBrowserWebsocketConnector not connected");
        }
        this._ws.send("[" + msg.toJSON() + "]");
      }
      parseIncomingMessage(event) {
        if (typeof event.data === "string") {
          const msgs = (0, MessageUtils_1.fromJSON)(event.data);
          this.emit("message", msgs);
        } else if (event.data instanceof Blob) {
        }
      }
      onReaderLoad(event) {
        const msgs = (0, MessageUtils_1.fromJSON)(event.target.result);
        this.emit("message", msgs);
      }
    };
    exports.ButtplugBrowserWebsocketConnector = ButtplugBrowserWebsocketConnector;
  }
});

// node_modules/buttplug/dist/main/src/client/ButtplugBrowserWebsocketClientConnector.js
var require_ButtplugBrowserWebsocketClientConnector = __commonJS({
  "node_modules/buttplug/dist/main/src/client/ButtplugBrowserWebsocketClientConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugBrowserWebsocketClientConnector = void 0;
    var ButtplugBrowserWebsocketConnector_1 = require_ButtplugBrowserWebsocketConnector();
    var ButtplugBrowserWebsocketClientConnector = class extends ButtplugBrowserWebsocketConnector_1.ButtplugBrowserWebsocketConnector {
      constructor() {
        super(...arguments);
        this.send = (msg) => {
          if (!this.Connected) {
            throw new Error("ButtplugClient not connected");
          }
          this.sendMessage(msg);
        };
      }
    };
    exports.ButtplugBrowserWebsocketClientConnector = ButtplugBrowserWebsocketClientConnector;
  }
});

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/buttplug/dist/main/src/client/ButtplugNodeWebsocketClientConnector.js
var require_ButtplugNodeWebsocketClientConnector = __commonJS({
  "node_modules/buttplug/dist/main/src/client/ButtplugNodeWebsocketClientConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtplugNodeWebsocketClientConnector = void 0;
    var ButtplugBrowserWebsocketClientConnector_1 = require_ButtplugBrowserWebsocketClientConnector();
    var ws_1 = require_browser();
    var ButtplugNodeWebsocketClientConnector = class extends ButtplugBrowserWebsocketClientConnector_1.ButtplugBrowserWebsocketClientConnector {
      constructor() {
        super(...arguments);
        this._websocketConstructor = ws_1.WebSocket;
      }
    };
    exports.ButtplugNodeWebsocketClientConnector = ButtplugNodeWebsocketClientConnector;
  }
});

// node_modules/buttplug/dist/main/src/client/IButtplugClientConnector.js
var require_IButtplugClientConnector = __commonJS({
  "node_modules/buttplug/dist/main/src/client/IButtplugClientConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/buttplug/dist/main/src/index.js
var require_src = __commonJS({
  "node_modules/buttplug/dist/main/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Client(), exports);
    __exportStar(require_ButtplugClientDevice(), exports);
    __exportStar(require_ButtplugBrowserWebsocketClientConnector(), exports);
    __exportStar(require_ButtplugNodeWebsocketClientConnector(), exports);
    __exportStar(require_ButtplugClientConnectorException(), exports);
    __exportStar(require_ButtplugMessageSorter(), exports);
    __exportStar(require_IButtplugClientConnector(), exports);
    __exportStar(require_Messages(), exports);
    __exportStar(require_MessageUtils(), exports);
    __exportStar(require_Logging(), exports);
    __exportStar(require_Exceptions(), exports);
  }
});

// node_modules/dexie/dist/dexie.js
var require_dexie = __commonJS({
  "node_modules/dexie/dist/dexie.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Dexie = factory());
    })(exports, function() {
      "use strict";
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }
      var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      }
      var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
      var keys = Object.keys;
      var isArray = Array.isArray;
      if (typeof Promise !== "undefined" && !_global.Promise) {
        _global.Promise = Promise;
      }
      function extend(obj, extension) {
        if (typeof extension !== "object")
          return obj;
        keys(extension).forEach(function(key) {
          obj[key] = extension[key];
        });
        return obj;
      }
      var getProto = Object.getPrototypeOf;
      var _hasOwn = {}.hasOwnProperty;
      function hasOwn(obj, prop) {
        return _hasOwn.call(obj, prop);
      }
      function props(proto, extension) {
        if (typeof extension === "function")
          extension = extension(getProto(proto));
        (typeof Reflect === "undefined" ? keys : Reflect.ownKeys)(extension).forEach(function(key) {
          setProp(proto, key, extension[key]);
        });
      }
      var defineProperty = Object.defineProperty;
      function setProp(obj, prop, functionOrGetSet, options) {
        defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === "function" ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
      }
      function derive(Child) {
        return {
          from: function(Parent) {
            Child.prototype = Object.create(Parent.prototype);
            setProp(Child.prototype, "constructor", Child);
            return {
              extend: props.bind(null, Child.prototype)
            };
          }
        };
      }
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      function getPropertyDescriptor(obj, prop) {
        var pd = getOwnPropertyDescriptor(obj, prop);
        var proto;
        return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
      }
      var _slice = [].slice;
      function slice(args, start, end) {
        return _slice.call(args, start, end);
      }
      function override(origFunc, overridedFactory) {
        return overridedFactory(origFunc);
      }
      function assert(b) {
        if (!b)
          throw new Error("Assertion Failed");
      }
      function asap$1(fn) {
        if (_global.setImmediate)
          setImmediate(fn);
        else
          setTimeout(fn, 0);
      }
      function arrayToObject(array, extractor) {
        return array.reduce(function(result, item, i) {
          var nameAndValue = extractor(item, i);
          if (nameAndValue)
            result[nameAndValue[0]] = nameAndValue[1];
          return result;
        }, {});
      }
      function getByKeyPath(obj, keyPath) {
        if (typeof keyPath === "string" && hasOwn(obj, keyPath))
          return obj[keyPath];
        if (!keyPath)
          return obj;
        if (typeof keyPath !== "string") {
          var rv = [];
          for (var i = 0, l = keyPath.length; i < l; ++i) {
            var val = getByKeyPath(obj, keyPath[i]);
            rv.push(val);
          }
          return rv;
        }
        var period = keyPath.indexOf(".");
        if (period !== -1) {
          var innerObj = obj[keyPath.substr(0, period)];
          return innerObj == null ? void 0 : getByKeyPath(innerObj, keyPath.substr(period + 1));
        }
        return void 0;
      }
      function setByKeyPath(obj, keyPath, value) {
        if (!obj || keyPath === void 0)
          return;
        if ("isFrozen" in Object && Object.isFrozen(obj))
          return;
        if (typeof keyPath !== "string" && "length" in keyPath) {
          assert(typeof value !== "string" && "length" in value);
          for (var i = 0, l = keyPath.length; i < l; ++i) {
            setByKeyPath(obj, keyPath[i], value[i]);
          }
        } else {
          var period = keyPath.indexOf(".");
          if (period !== -1) {
            var currentKeyPath = keyPath.substr(0, period);
            var remainingKeyPath = keyPath.substr(period + 1);
            if (remainingKeyPath === "")
              if (value === void 0) {
                if (isArray(obj) && !isNaN(parseInt(currentKeyPath)))
                  obj.splice(currentKeyPath, 1);
                else
                  delete obj[currentKeyPath];
              } else
                obj[currentKeyPath] = value;
            else {
              var innerObj = obj[currentKeyPath];
              if (!innerObj || !hasOwn(obj, currentKeyPath))
                innerObj = obj[currentKeyPath] = {};
              setByKeyPath(innerObj, remainingKeyPath, value);
            }
          } else {
            if (value === void 0) {
              if (isArray(obj) && !isNaN(parseInt(keyPath)))
                obj.splice(keyPath, 1);
              else
                delete obj[keyPath];
            } else
              obj[keyPath] = value;
          }
        }
      }
      function delByKeyPath(obj, keyPath) {
        if (typeof keyPath === "string")
          setByKeyPath(obj, keyPath, void 0);
        else if ("length" in keyPath)
          [].map.call(keyPath, function(kp) {
            setByKeyPath(obj, kp, void 0);
          });
      }
      function shallowClone(obj) {
        var rv = {};
        for (var m in obj) {
          if (hasOwn(obj, m))
            rv[m] = obj[m];
        }
        return rv;
      }
      var concat = [].concat;
      function flatten(a) {
        return concat.apply([], a);
      }
      var intrinsicTypeNames = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(flatten([8, 16, 32, 64].map(function(num) {
        return ["Int", "Uint", "Float"].map(function(t) {
          return t + num + "Array";
        });
      }))).filter(function(t) {
        return _global[t];
      });
      var intrinsicTypes = new Set(intrinsicTypeNames.map(function(t) {
        return _global[t];
      }));
      function cloneSimpleObjectTree(o) {
        var rv = {};
        for (var k in o)
          if (hasOwn(o, k)) {
            var v = o[k];
            rv[k] = !v || typeof v !== "object" || intrinsicTypes.has(v.constructor) ? v : cloneSimpleObjectTree(v);
          }
        return rv;
      }
      function objectIsEmpty(o) {
        for (var k in o)
          if (hasOwn(o, k))
            return false;
        return true;
      }
      var circularRefs = null;
      function deepClone(any) {
        circularRefs = /* @__PURE__ */ new WeakMap();
        var rv = innerDeepClone(any);
        circularRefs = null;
        return rv;
      }
      function innerDeepClone(x) {
        if (!x || typeof x !== "object")
          return x;
        var rv = circularRefs.get(x);
        if (rv)
          return rv;
        if (isArray(x)) {
          rv = [];
          circularRefs.set(x, rv);
          for (var i = 0, l = x.length; i < l; ++i) {
            rv.push(innerDeepClone(x[i]));
          }
        } else if (intrinsicTypes.has(x.constructor)) {
          rv = x;
        } else {
          var proto = getProto(x);
          rv = proto === Object.prototype ? {} : Object.create(proto);
          circularRefs.set(x, rv);
          for (var prop in x) {
            if (hasOwn(x, prop)) {
              rv[prop] = innerDeepClone(x[prop]);
            }
          }
        }
        return rv;
      }
      var toString = {}.toString;
      function toStringTag(o) {
        return toString.call(o).slice(8, -1);
      }
      var iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
      var getIteratorOf = typeof iteratorSymbol === "symbol" ? function(x) {
        var i;
        return x != null && (i = x[iteratorSymbol]) && i.apply(x);
      } : function() {
        return null;
      };
      function delArrayItem(a, x) {
        var i = a.indexOf(x);
        if (i >= 0)
          a.splice(i, 1);
        return i >= 0;
      }
      var NO_CHAR_ARRAY = {};
      function getArrayOf(arrayLike) {
        var i, a, x, it;
        if (arguments.length === 1) {
          if (isArray(arrayLike))
            return arrayLike.slice();
          if (this === NO_CHAR_ARRAY && typeof arrayLike === "string")
            return [arrayLike];
          if (it = getIteratorOf(arrayLike)) {
            a = [];
            while (x = it.next(), !x.done)
              a.push(x.value);
            return a;
          }
          if (arrayLike == null)
            return [arrayLike];
          i = arrayLike.length;
          if (typeof i === "number") {
            a = new Array(i);
            while (i--)
              a[i] = arrayLike[i];
            return a;
          }
          return [arrayLike];
        }
        i = arguments.length;
        a = new Array(i);
        while (i--)
          a[i] = arguments[i];
        return a;
      }
      var isAsyncFunction = typeof Symbol !== "undefined" ? function(fn) {
        return fn[Symbol.toStringTag] === "AsyncFunction";
      } : function() {
        return false;
      };
      var dexieErrorNames = [
        "Modify",
        "Bulk",
        "OpenFailed",
        "VersionChange",
        "Schema",
        "Upgrade",
        "InvalidTable",
        "MissingAPI",
        "NoSuchDatabase",
        "InvalidArgument",
        "SubTransaction",
        "Unsupported",
        "Internal",
        "DatabaseClosed",
        "PrematureCommit",
        "ForeignAwait"
      ];
      var idbDomErrorNames = [
        "Unknown",
        "Constraint",
        "Data",
        "TransactionInactive",
        "ReadOnly",
        "Version",
        "NotFound",
        "InvalidState",
        "InvalidAccess",
        "Abort",
        "Timeout",
        "QuotaExceeded",
        "Syntax",
        "DataClone"
      ];
      var errorList = dexieErrorNames.concat(idbDomErrorNames);
      var defaultTexts = {
        VersionChanged: "Database version changed by other database connection",
        DatabaseClosed: "Database has been closed",
        Abort: "Transaction aborted",
        TransactionInactive: "Transaction has already completed or failed",
        MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
      };
      function DexieError(name, msg) {
        this.name = name;
        this.message = msg;
      }
      derive(DexieError).from(Error).extend({
        toString: function() {
          return this.name + ": " + this.message;
        }
      });
      function getMultiErrorMessage(msg, failures) {
        return msg + ". Errors: " + Object.keys(failures).map(function(key) {
          return failures[key].toString();
        }).filter(function(v, i, s) {
          return s.indexOf(v) === i;
        }).join("\n");
      }
      function ModifyError(msg, failures, successCount, failedKeys) {
        this.failures = failures;
        this.failedKeys = failedKeys;
        this.successCount = successCount;
        this.message = getMultiErrorMessage(msg, failures);
      }
      derive(ModifyError).from(DexieError);
      function BulkError(msg, failures) {
        this.name = "BulkError";
        this.failures = Object.keys(failures).map(function(pos) {
          return failures[pos];
        });
        this.failuresByPos = failures;
        this.message = getMultiErrorMessage(msg, this.failures);
      }
      derive(BulkError).from(DexieError);
      var errnames = errorList.reduce(function(obj, name) {
        return obj[name] = name + "Error", obj;
      }, {});
      var BaseException = DexieError;
      var exceptions = errorList.reduce(function(obj, name) {
        var fullName = name + "Error";
        function DexieError2(msgOrInner, inner) {
          this.name = fullName;
          if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
          } else if (typeof msgOrInner === "string") {
            this.message = "".concat(msgOrInner).concat(!inner ? "" : "\n " + inner);
            this.inner = inner || null;
          } else if (typeof msgOrInner === "object") {
            this.message = "".concat(msgOrInner.name, " ").concat(msgOrInner.message);
            this.inner = msgOrInner;
          }
        }
        derive(DexieError2).from(BaseException);
        obj[name] = DexieError2;
        return obj;
      }, {});
      exceptions.Syntax = SyntaxError;
      exceptions.Type = TypeError;
      exceptions.Range = RangeError;
      var exceptionMap = idbDomErrorNames.reduce(function(obj, name) {
        obj[name + "Error"] = exceptions[name];
        return obj;
      }, {});
      function mapError(domError, message) {
        if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
          return domError;
        var rv = new exceptionMap[domError.name](message || domError.message, domError);
        if ("stack" in domError) {
          setProp(rv, "stack", { get: function() {
            return this.inner.stack;
          } });
        }
        return rv;
      }
      var fullNameExceptions = errorList.reduce(function(obj, name) {
        if (["Syntax", "Type", "Range"].indexOf(name) === -1)
          obj[name + "Error"] = exceptions[name];
        return obj;
      }, {});
      fullNameExceptions.ModifyError = ModifyError;
      fullNameExceptions.DexieError = DexieError;
      fullNameExceptions.BulkError = BulkError;
      function nop() {
      }
      function mirror(val) {
        return val;
      }
      function pureFunctionChain(f1, f2) {
        if (f1 == null || f1 === mirror)
          return f2;
        return function(val) {
          return f2(f1(val));
        };
      }
      function callBoth(on1, on2) {
        return function() {
          on1.apply(this, arguments);
          on2.apply(this, arguments);
        };
      }
      function hookCreatingChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          var res = f1.apply(this, arguments);
          if (res !== void 0)
            arguments[0] = res;
          var onsuccess = this.onsuccess, onerror = this.onerror;
          this.onsuccess = null;
          this.onerror = null;
          var res2 = f2.apply(this, arguments);
          if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
          if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
          return res2 !== void 0 ? res2 : res;
        };
      }
      function hookDeletingChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          f1.apply(this, arguments);
          var onsuccess = this.onsuccess, onerror = this.onerror;
          this.onsuccess = this.onerror = null;
          f2.apply(this, arguments);
          if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
          if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        };
      }
      function hookUpdatingChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function(modifications) {
          var res = f1.apply(this, arguments);
          extend(modifications, res);
          var onsuccess = this.onsuccess, onerror = this.onerror;
          this.onsuccess = null;
          this.onerror = null;
          var res2 = f2.apply(this, arguments);
          if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
          if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
          return res === void 0 ? res2 === void 0 ? void 0 : res2 : extend(res, res2);
        };
      }
      function reverseStoppableEventChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          if (f2.apply(this, arguments) === false)
            return false;
          return f1.apply(this, arguments);
        };
      }
      function promisableChain(f1, f2) {
        if (f1 === nop)
          return f2;
        return function() {
          var res = f1.apply(this, arguments);
          if (res && typeof res.then === "function") {
            var thiz = this, i = arguments.length, args = new Array(i);
            while (i--)
              args[i] = arguments[i];
            return res.then(function() {
              return f2.apply(thiz, args);
            });
          }
          return f2.apply(this, arguments);
        };
      }
      var debug2 = typeof location !== "undefined" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
      function setDebug(value, filter) {
        debug2 = value;
      }
      var INTERNAL = {};
      var ZONE_ECHO_LIMIT = 100, _a$1 = typeof Promise === "undefined" ? [] : function() {
        var globalP = Promise.resolve();
        if (typeof crypto === "undefined" || !crypto.subtle)
          return [globalP, getProto(globalP), globalP];
        var nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
        return [
          nativeP,
          getProto(nativeP),
          globalP
        ];
      }(), resolvedNativePromise = _a$1[0], nativePromiseProto = _a$1[1], resolvedGlobalPromise = _a$1[2], nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
      var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
      var patchGlobalPromise = !!resolvedGlobalPromise;
      function schedulePhysicalTick() {
        queueMicrotask(physicalTick);
      }
      var asap = function(callback, args) {
        microtickQueue.push([callback, args]);
        if (needsNewPhysicalTick) {
          schedulePhysicalTick();
          needsNewPhysicalTick = false;
        }
      };
      var isOutsideMicroTick = true, needsNewPhysicalTick = true, unhandledErrors = [], rejectingErrors = [], rejectionMapper = mirror;
      var globalPSD = {
        id: "global",
        global: true,
        ref: 0,
        unhandleds: [],
        onunhandled: nop,
        pgp: false,
        env: {},
        finalize: nop
      };
      var PSD = globalPSD;
      var microtickQueue = [];
      var numScheduledCalls = 0;
      var tickFinalizers = [];
      function DexiePromise(fn) {
        if (typeof this !== "object")
          throw new TypeError("Promises must be constructed via new");
        this._listeners = [];
        this._lib = false;
        var psd = this._PSD = PSD;
        if (typeof fn !== "function") {
          if (fn !== INTERNAL)
            throw new TypeError("Not a function");
          this._state = arguments[1];
          this._value = arguments[2];
          if (this._state === false)
            handleRejection(this, this._value);
          return;
        }
        this._state = null;
        this._value = null;
        ++psd.ref;
        executePromiseTask(this, fn);
      }
      var thenProp = {
        get: function() {
          var psd = PSD, microTaskId = totalEchoes;
          function then(onFulfilled, onRejected) {
            var _this = this;
            var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
            var cleanup = possibleAwait && !decrementExpectedAwaits();
            var rv = new DexiePromise(function(resolve, reject) {
              propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait, cleanup), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait, cleanup), resolve, reject, psd));
            });
            if (this._consoleTask)
              rv._consoleTask = this._consoleTask;
            return rv;
          }
          then.prototype = INTERNAL;
          return then;
        },
        set: function(value) {
          setProp(this, "then", value && value.prototype === INTERNAL ? thenProp : {
            get: function() {
              return value;
            },
            set: thenProp.set
          });
        }
      };
      props(DexiePromise.prototype, {
        then: thenProp,
        _then: function(onFulfilled, onRejected) {
          propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
        },
        catch: function(onRejected) {
          if (arguments.length === 1)
            return this.then(null, onRejected);
          var type2 = arguments[0], handler = arguments[1];
          return typeof type2 === "function" ? this.then(null, function(err) {
            return err instanceof type2 ? handler(err) : PromiseReject(err);
          }) : this.then(null, function(err) {
            return err && err.name === type2 ? handler(err) : PromiseReject(err);
          });
        },
        finally: function(onFinally) {
          return this.then(function(value) {
            return DexiePromise.resolve(onFinally()).then(function() {
              return value;
            });
          }, function(err) {
            return DexiePromise.resolve(onFinally()).then(function() {
              return PromiseReject(err);
            });
          });
        },
        timeout: function(ms, msg) {
          var _this = this;
          return ms < Infinity ? new DexiePromise(function(resolve, reject) {
            var handle = setTimeout(function() {
              return reject(new exceptions.Timeout(msg));
            }, ms);
            _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
          }) : this;
        }
      });
      if (typeof Symbol !== "undefined" && Symbol.toStringTag)
        setProp(DexiePromise.prototype, Symbol.toStringTag, "Dexie.Promise");
      globalPSD.env = snapShot();
      function Listener(onFulfilled, onRejected, resolve, reject, zone) {
        this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
        this.onRejected = typeof onRejected === "function" ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
        this.psd = zone;
      }
      props(DexiePromise, {
        all: function() {
          var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise(function(resolve, reject) {
            if (values.length === 0)
              resolve([]);
            var remaining = values.length;
            values.forEach(function(a, i) {
              return DexiePromise.resolve(a).then(function(x) {
                values[i] = x;
                if (!--remaining)
                  resolve(values);
              }, reject);
            });
          });
        },
        resolve: function(value) {
          if (value instanceof DexiePromise)
            return value;
          if (value && typeof value.then === "function")
            return new DexiePromise(function(resolve, reject) {
              value.then(resolve, reject);
            });
          var rv = new DexiePromise(INTERNAL, true, value);
          return rv;
        },
        reject: PromiseReject,
        race: function() {
          var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise(function(resolve, reject) {
            values.map(function(value) {
              return DexiePromise.resolve(value).then(resolve, reject);
            });
          });
        },
        PSD: {
          get: function() {
            return PSD;
          },
          set: function(value) {
            return PSD = value;
          }
        },
        totalEchoes: { get: function() {
          return totalEchoes;
        } },
        newPSD: newScope,
        usePSD,
        scheduler: {
          get: function() {
            return asap;
          },
          set: function(value) {
            asap = value;
          }
        },
        rejectionMapper: {
          get: function() {
            return rejectionMapper;
          },
          set: function(value) {
            rejectionMapper = value;
          }
        },
        follow: function(fn, zoneProps) {
          return new DexiePromise(function(resolve, reject) {
            return newScope(function(resolve2, reject2) {
              var psd = PSD;
              psd.unhandleds = [];
              psd.onunhandled = reject2;
              psd.finalize = callBoth(function() {
                var _this = this;
                run_at_end_of_this_or_next_physical_tick(function() {
                  _this.unhandleds.length === 0 ? resolve2() : reject2(_this.unhandleds[0]);
                });
              }, psd.finalize);
              fn();
            }, zoneProps, resolve, reject);
          });
        }
      });
      if (NativePromise) {
        if (NativePromise.allSettled)
          setProp(DexiePromise, "allSettled", function() {
            var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise(function(resolve) {
              if (possiblePromises.length === 0)
                resolve([]);
              var remaining = possiblePromises.length;
              var results = new Array(remaining);
              possiblePromises.forEach(function(p, i) {
                return DexiePromise.resolve(p).then(function(value) {
                  return results[i] = { status: "fulfilled", value };
                }, function(reason) {
                  return results[i] = { status: "rejected", reason };
                }).then(function() {
                  return --remaining || resolve(results);
                });
              });
            });
          });
        if (NativePromise.any && typeof AggregateError !== "undefined")
          setProp(DexiePromise, "any", function() {
            var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise(function(resolve, reject) {
              if (possiblePromises.length === 0)
                reject(new AggregateError([]));
              var remaining = possiblePromises.length;
              var failures = new Array(remaining);
              possiblePromises.forEach(function(p, i) {
                return DexiePromise.resolve(p).then(function(value) {
                  return resolve(value);
                }, function(failure) {
                  failures[i] = failure;
                  if (!--remaining)
                    reject(new AggregateError(failures));
                });
              });
            });
          });
        if (NativePromise.withResolvers)
          DexiePromise.withResolvers = NativePromise.withResolvers;
      }
      function executePromiseTask(promise, fn) {
        try {
          fn(function(value) {
            if (promise._state !== null)
              return;
            if (value === promise)
              throw new TypeError("A promise cannot be resolved with itself.");
            var shouldExecuteTick = promise._lib && beginMicroTickScope();
            if (value && typeof value.then === "function") {
              executePromiseTask(promise, function(resolve, reject) {
                value instanceof DexiePromise ? value._then(resolve, reject) : value.then(resolve, reject);
              });
            } else {
              promise._state = true;
              promise._value = value;
              propagateAllListeners(promise);
            }
            if (shouldExecuteTick)
              endMicroTickScope();
          }, handleRejection.bind(null, promise));
        } catch (ex) {
          handleRejection(promise, ex);
        }
      }
      function handleRejection(promise, reason) {
        rejectingErrors.push(reason);
        if (promise._state !== null)
          return;
        var shouldExecuteTick = promise._lib && beginMicroTickScope();
        reason = rejectionMapper(reason);
        promise._state = false;
        promise._value = reason;
        addPossiblyUnhandledError(promise);
        propagateAllListeners(promise);
        if (shouldExecuteTick)
          endMicroTickScope();
      }
      function propagateAllListeners(promise) {
        var listeners2 = promise._listeners;
        promise._listeners = [];
        for (var i = 0, len = listeners2.length; i < len; ++i) {
          propagateToListener(promise, listeners2[i]);
        }
        var psd = promise._PSD;
        --psd.ref || psd.finalize();
        if (numScheduledCalls === 0) {
          ++numScheduledCalls;
          asap(function() {
            if (--numScheduledCalls === 0)
              finalizePhysicalTick();
          }, []);
        }
      }
      function propagateToListener(promise, listener) {
        if (promise._state === null) {
          promise._listeners.push(listener);
          return;
        }
        var cb = promise._state ? listener.onFulfilled : listener.onRejected;
        if (cb === null) {
          return (promise._state ? listener.resolve : listener.reject)(promise._value);
        }
        ++listener.psd.ref;
        ++numScheduledCalls;
        asap(callListener, [cb, promise, listener]);
      }
      function callListener(cb, promise, listener) {
        try {
          var ret, value = promise._value;
          if (!promise._state && rejectingErrors.length)
            rejectingErrors = [];
          ret = debug2 && promise._consoleTask ? promise._consoleTask.run(function() {
            return cb(value);
          }) : cb(value);
          if (!promise._state && rejectingErrors.indexOf(value) === -1) {
            markErrorAsHandled(promise);
          }
          listener.resolve(ret);
        } catch (e) {
          listener.reject(e);
        } finally {
          if (--numScheduledCalls === 0)
            finalizePhysicalTick();
          --listener.psd.ref || listener.psd.finalize();
        }
      }
      function physicalTick() {
        usePSD(globalPSD, function() {
          beginMicroTickScope() && endMicroTickScope();
        });
      }
      function beginMicroTickScope() {
        var wasRootExec = isOutsideMicroTick;
        isOutsideMicroTick = false;
        needsNewPhysicalTick = false;
        return wasRootExec;
      }
      function endMicroTickScope() {
        var callbacks, i, l;
        do {
          while (microtickQueue.length > 0) {
            callbacks = microtickQueue;
            microtickQueue = [];
            l = callbacks.length;
            for (i = 0; i < l; ++i) {
              var item = callbacks[i];
              item[0].apply(null, item[1]);
            }
          }
        } while (microtickQueue.length > 0);
        isOutsideMicroTick = true;
        needsNewPhysicalTick = true;
      }
      function finalizePhysicalTick() {
        var unhandledErrs = unhandledErrors;
        unhandledErrors = [];
        unhandledErrs.forEach(function(p) {
          p._PSD.onunhandled.call(null, p._value, p);
        });
        var finalizers = tickFinalizers.slice(0);
        var i = finalizers.length;
        while (i)
          finalizers[--i]();
      }
      function run_at_end_of_this_or_next_physical_tick(fn) {
        function finalizer() {
          fn();
          tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
        }
        tickFinalizers.push(finalizer);
        ++numScheduledCalls;
        asap(function() {
          if (--numScheduledCalls === 0)
            finalizePhysicalTick();
        }, []);
      }
      function addPossiblyUnhandledError(promise) {
        if (!unhandledErrors.some(function(p) {
          return p._value === promise._value;
        }))
          unhandledErrors.push(promise);
      }
      function markErrorAsHandled(promise) {
        var i = unhandledErrors.length;
        while (i)
          if (unhandledErrors[--i]._value === promise._value) {
            unhandledErrors.splice(i, 1);
            return;
          }
      }
      function PromiseReject(reason) {
        return new DexiePromise(INTERNAL, false, reason);
      }
      function wrap(fn, errorCatcher) {
        var psd = PSD;
        return function() {
          var wasRootExec = beginMicroTickScope(), outerScope = PSD;
          try {
            switchToZone(psd, true);
            return fn.apply(this, arguments);
          } catch (e) {
            errorCatcher && errorCatcher(e);
          } finally {
            switchToZone(outerScope, false);
            if (wasRootExec)
              endMicroTickScope();
          }
        };
      }
      var task = { awaits: 0, echoes: 0, id: 0 };
      var taskCounter = 0;
      var zoneStack = [];
      var zoneEchoes = 0;
      var totalEchoes = 0;
      var zone_id_counter = 0;
      function newScope(fn, props2, a1, a2) {
        var parent = PSD, psd = Object.create(parent);
        psd.parent = parent;
        psd.ref = 0;
        psd.global = false;
        psd.id = ++zone_id_counter;
        globalPSD.env;
        psd.env = patchGlobalPromise ? {
          Promise: DexiePromise,
          PromiseProp: { value: DexiePromise, configurable: true, writable: true },
          all: DexiePromise.all,
          race: DexiePromise.race,
          allSettled: DexiePromise.allSettled,
          any: DexiePromise.any,
          resolve: DexiePromise.resolve,
          reject: DexiePromise.reject
        } : {};
        if (props2)
          extend(psd, props2);
        ++parent.ref;
        psd.finalize = function() {
          --this.parent.ref || this.parent.finalize();
        };
        var rv = usePSD(psd, fn, a1, a2);
        if (psd.ref === 0)
          psd.finalize();
        return rv;
      }
      function incrementExpectedAwaits() {
        if (!task.id)
          task.id = ++taskCounter;
        ++task.awaits;
        task.echoes += ZONE_ECHO_LIMIT;
        return task.id;
      }
      function decrementExpectedAwaits() {
        if (!task.awaits)
          return false;
        if (--task.awaits === 0)
          task.id = 0;
        task.echoes = task.awaits * ZONE_ECHO_LIMIT;
        return true;
      }
      if (("" + nativePromiseThen).indexOf("[native code]") === -1) {
        incrementExpectedAwaits = decrementExpectedAwaits = nop;
      }
      function onPossibleParallellAsync(possiblePromise) {
        if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
          incrementExpectedAwaits();
          return possiblePromise.then(function(x) {
            decrementExpectedAwaits();
            return x;
          }, function(e) {
            decrementExpectedAwaits();
            return rejection(e);
          });
        }
        return possiblePromise;
      }
      function zoneEnterEcho(targetZone) {
        ++totalEchoes;
        if (!task.echoes || --task.echoes === 0) {
          task.echoes = task.awaits = task.id = 0;
        }
        zoneStack.push(PSD);
        switchToZone(targetZone, true);
      }
      function zoneLeaveEcho() {
        var zone = zoneStack[zoneStack.length - 1];
        zoneStack.pop();
        switchToZone(zone, false);
      }
      function switchToZone(targetZone, bEnteringZone) {
        var currentZone = PSD;
        if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
          queueMicrotask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
        }
        if (targetZone === PSD)
          return;
        PSD = targetZone;
        if (currentZone === globalPSD)
          globalPSD.env = snapShot();
        if (patchGlobalPromise) {
          var GlobalPromise = globalPSD.env.Promise;
          var targetEnv = targetZone.env;
          if (currentZone.global || targetZone.global) {
            Object.defineProperty(_global, "Promise", targetEnv.PromiseProp);
            GlobalPromise.all = targetEnv.all;
            GlobalPromise.race = targetEnv.race;
            GlobalPromise.resolve = targetEnv.resolve;
            GlobalPromise.reject = targetEnv.reject;
            if (targetEnv.allSettled)
              GlobalPromise.allSettled = targetEnv.allSettled;
            if (targetEnv.any)
              GlobalPromise.any = targetEnv.any;
          }
        }
      }
      function snapShot() {
        var GlobalPromise = _global.Promise;
        return patchGlobalPromise ? {
          Promise: GlobalPromise,
          PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
          all: GlobalPromise.all,
          race: GlobalPromise.race,
          allSettled: GlobalPromise.allSettled,
          any: GlobalPromise.any,
          resolve: GlobalPromise.resolve,
          reject: GlobalPromise.reject
        } : {};
      }
      function usePSD(psd, fn, a1, a2, a3) {
        var outerScope = PSD;
        try {
          switchToZone(psd, true);
          return fn(a1, a2, a3);
        } finally {
          switchToZone(outerScope, false);
        }
      }
      function nativeAwaitCompatibleWrap(fn, zone, possibleAwait, cleanup) {
        return typeof fn !== "function" ? fn : function() {
          var outerZone = PSD;
          if (possibleAwait)
            incrementExpectedAwaits();
          switchToZone(zone, true);
          try {
            return fn.apply(this, arguments);
          } finally {
            switchToZone(outerZone, false);
            if (cleanup)
              queueMicrotask(decrementExpectedAwaits);
          }
        };
      }
      function execInGlobalContext(cb) {
        if (Promise === NativePromise && task.echoes === 0) {
          if (zoneEchoes === 0) {
            cb();
          } else {
            enqueueNativeMicroTask(cb);
          }
        } else {
          setTimeout(cb, 0);
        }
      }
      var rejection = DexiePromise.reject;
      function tempTransaction(db, mode, storeNames, fn) {
        if (!db.idbdb || !db._state.openComplete && (!PSD.letThrough && !db._vip)) {
          if (db._state.openComplete) {
            return rejection(new exceptions.DatabaseClosed(db._state.dbOpenError));
          }
          if (!db._state.isBeingOpened) {
            if (!db._state.autoOpen)
              return rejection(new exceptions.DatabaseClosed());
            db.open().catch(nop);
          }
          return db._state.dbReadyPromise.then(function() {
            return tempTransaction(db, mode, storeNames, fn);
          });
        } else {
          var trans = db._createTransaction(mode, storeNames, db._dbSchema);
          try {
            trans.create();
            db._state.PR1398_maxLoop = 3;
          } catch (ex) {
            if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
              console.warn("Dexie: Need to reopen db");
              db.close({ disableAutoOpen: false });
              return db.open().then(function() {
                return tempTransaction(db, mode, storeNames, fn);
              });
            }
            return rejection(ex);
          }
          return trans._promise(mode, function(resolve, reject) {
            return newScope(function() {
              PSD.trans = trans;
              return fn(resolve, reject, trans);
            });
          }).then(function(result) {
            if (mode === "readwrite")
              try {
                trans.idbtrans.commit();
              } catch (_a2) {
              }
            return mode === "readonly" ? result : trans._completion.then(function() {
              return result;
            });
          });
        }
      }
      var DEXIE_VERSION = "4.0.11";
      var maxString = String.fromCharCode(65535);
      var minKey = -Infinity;
      var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
      var STRING_EXPECTED = "String expected.";
      var connections = [];
      var DBNAMES_DB = "__dbnames";
      var READONLY = "readonly";
      var READWRITE = "readwrite";
      function combine(filter1, filter2) {
        return filter1 ? filter2 ? function() {
          return filter1.apply(this, arguments) && filter2.apply(this, arguments);
        } : filter1 : filter2;
      }
      var AnyRange = {
        type: 3,
        lower: -Infinity,
        lowerOpen: false,
        upper: [[]],
        upperOpen: false
      };
      function workaroundForUndefinedPrimKey(keyPath) {
        return typeof keyPath === "string" && !/\./.test(keyPath) ? function(obj) {
          if (obj[keyPath] === void 0 && keyPath in obj) {
            obj = deepClone(obj);
            delete obj[keyPath];
          }
          return obj;
        } : function(obj) {
          return obj;
        };
      }
      function Entity2() {
        throw exceptions.Type();
      }
      function cmp2(a, b) {
        try {
          var ta = type(a);
          var tb = type(b);
          if (ta !== tb) {
            if (ta === "Array")
              return 1;
            if (tb === "Array")
              return -1;
            if (ta === "binary")
              return 1;
            if (tb === "binary")
              return -1;
            if (ta === "string")
              return 1;
            if (tb === "string")
              return -1;
            if (ta === "Date")
              return 1;
            if (tb !== "Date")
              return NaN;
            return -1;
          }
          switch (ta) {
            case "number":
            case "Date":
            case "string":
              return a > b ? 1 : a < b ? -1 : 0;
            case "binary": {
              return compareUint8Arrays(getUint8Array(a), getUint8Array(b));
            }
            case "Array":
              return compareArrays(a, b);
          }
        } catch (_a2) {
        }
        return NaN;
      }
      function compareArrays(a, b) {
        var al = a.length;
        var bl = b.length;
        var l = al < bl ? al : bl;
        for (var i = 0; i < l; ++i) {
          var res = cmp2(a[i], b[i]);
          if (res !== 0)
            return res;
        }
        return al === bl ? 0 : al < bl ? -1 : 1;
      }
      function compareUint8Arrays(a, b) {
        var al = a.length;
        var bl = b.length;
        var l = al < bl ? al : bl;
        for (var i = 0; i < l; ++i) {
          if (a[i] !== b[i])
            return a[i] < b[i] ? -1 : 1;
        }
        return al === bl ? 0 : al < bl ? -1 : 1;
      }
      function type(x) {
        var t = typeof x;
        if (t !== "object")
          return t;
        if (ArrayBuffer.isView(x))
          return "binary";
        var tsTag = toStringTag(x);
        return tsTag === "ArrayBuffer" ? "binary" : tsTag;
      }
      function getUint8Array(a) {
        if (a instanceof Uint8Array)
          return a;
        if (ArrayBuffer.isView(a))
          return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
        return new Uint8Array(a);
      }
      var Table = function() {
        function Table2() {
        }
        Table2.prototype._trans = function(mode, fn, writeLocked) {
          var trans = this._tx || PSD.trans;
          var tableName = this.name;
          var task2 = debug2 && typeof console !== "undefined" && console.createTask && console.createTask("Dexie: ".concat(mode === "readonly" ? "read" : "write", " ").concat(this.name));
          function checkTableInTransaction(resolve, reject, trans2) {
            if (!trans2.schema[tableName])
              throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
            return fn(trans2.idbtrans, trans2);
          }
          var wasRootExec = beginMicroTickScope();
          try {
            var p = trans && trans.db._novip === this.db._novip ? trans === PSD.trans ? trans._promise(mode, checkTableInTransaction, writeLocked) : newScope(function() {
              return trans._promise(mode, checkTableInTransaction, writeLocked);
            }, { trans, transless: PSD.transless || PSD }) : tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
            if (task2) {
              p._consoleTask = task2;
              p = p.catch(function(err) {
                console.trace(err);
                return rejection(err);
              });
            }
            return p;
          } finally {
            if (wasRootExec)
              endMicroTickScope();
          }
        };
        Table2.prototype.get = function(keyOrCrit, cb) {
          var _this = this;
          if (keyOrCrit && keyOrCrit.constructor === Object)
            return this.where(keyOrCrit).first(cb);
          if (keyOrCrit == null)
            return rejection(new exceptions.Type("Invalid argument to Table.get()"));
          return this._trans("readonly", function(trans) {
            return _this.core.get({ trans, key: keyOrCrit }).then(function(res) {
              return _this.hook.reading.fire(res);
            });
          }).then(cb);
        };
        Table2.prototype.where = function(indexOrCrit) {
          if (typeof indexOrCrit === "string")
            return new this.db.WhereClause(this, indexOrCrit);
          if (isArray(indexOrCrit))
            return new this.db.WhereClause(this, "[".concat(indexOrCrit.join("+"), "]"));
          var keyPaths = keys(indexOrCrit);
          if (keyPaths.length === 1)
            return this.where(keyPaths[0]).equals(indexOrCrit[keyPaths[0]]);
          var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function(ix) {
            if (ix.compound && keyPaths.every(function(keyPath) {
              return ix.keyPath.indexOf(keyPath) >= 0;
            })) {
              for (var i = 0; i < keyPaths.length; ++i) {
                if (keyPaths.indexOf(ix.keyPath[i]) === -1)
                  return false;
              }
              return true;
            }
            return false;
          }).sort(function(a, b) {
            return a.keyPath.length - b.keyPath.length;
          })[0];
          if (compoundIndex && this.db._maxKey !== maxString) {
            var keyPathsInValidOrder = compoundIndex.keyPath.slice(0, keyPaths.length);
            return this.where(keyPathsInValidOrder).equals(keyPathsInValidOrder.map(function(kp) {
              return indexOrCrit[kp];
            }));
          }
          if (!compoundIndex && debug2)
            console.warn("The query ".concat(JSON.stringify(indexOrCrit), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(keyPaths.join("+"), "]"));
          var idxByName = this.schema.idxByName;
          function equals(a, b) {
            return cmp2(a, b) === 0;
          }
          var _a2 = keyPaths.reduce(function(_a3, keyPath) {
            var prevIndex = _a3[0], prevFilterFn = _a3[1];
            var index = idxByName[keyPath];
            var value = indexOrCrit[keyPath];
            return [
              prevIndex || index,
              prevIndex || !index ? combine(prevFilterFn, index && index.multi ? function(x) {
                var prop = getByKeyPath(x, keyPath);
                return isArray(prop) && prop.some(function(item) {
                  return equals(value, item);
                });
              } : function(x) {
                return equals(value, getByKeyPath(x, keyPath));
              }) : prevFilterFn
            ];
          }, [null, null]), idx = _a2[0], filterFunction = _a2[1];
          return idx ? this.where(idx.name).equals(indexOrCrit[idx.keyPath]).filter(filterFunction) : compoundIndex ? this.filter(filterFunction) : this.where(keyPaths).equals("");
        };
        Table2.prototype.filter = function(filterFunction) {
          return this.toCollection().and(filterFunction);
        };
        Table2.prototype.count = function(thenShortcut) {
          return this.toCollection().count(thenShortcut);
        };
        Table2.prototype.offset = function(offset) {
          return this.toCollection().offset(offset);
        };
        Table2.prototype.limit = function(numRows) {
          return this.toCollection().limit(numRows);
        };
        Table2.prototype.each = function(callback) {
          return this.toCollection().each(callback);
        };
        Table2.prototype.toArray = function(thenShortcut) {
          return this.toCollection().toArray(thenShortcut);
        };
        Table2.prototype.toCollection = function() {
          return new this.db.Collection(new this.db.WhereClause(this));
        };
        Table2.prototype.orderBy = function(index) {
          return new this.db.Collection(new this.db.WhereClause(this, isArray(index) ? "[".concat(index.join("+"), "]") : index));
        };
        Table2.prototype.reverse = function() {
          return this.toCollection().reverse();
        };
        Table2.prototype.mapToClass = function(constructor) {
          var _a2 = this, db = _a2.db, tableName = _a2.name;
          this.schema.mappedClass = constructor;
          if (constructor.prototype instanceof Entity2) {
            constructor = function(_super) {
              __extends(class_1, _super);
              function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
              }
              Object.defineProperty(class_1.prototype, "db", {
                get: function() {
                  return db;
                },
                enumerable: false,
                configurable: true
              });
              class_1.prototype.table = function() {
                return tableName;
              };
              return class_1;
            }(constructor);
          }
          var inheritedProps = /* @__PURE__ */ new Set();
          for (var proto = constructor.prototype; proto; proto = getProto(proto)) {
            Object.getOwnPropertyNames(proto).forEach(function(propName) {
              return inheritedProps.add(propName);
            });
          }
          var readHook = function(obj) {
            if (!obj)
              return obj;
            var res = Object.create(constructor.prototype);
            for (var m in obj)
              if (!inheritedProps.has(m))
                try {
                  res[m] = obj[m];
                } catch (_) {
                }
            return res;
          };
          if (this.schema.readHook) {
            this.hook.reading.unsubscribe(this.schema.readHook);
          }
          this.schema.readHook = readHook;
          this.hook("reading", readHook);
          return constructor;
        };
        Table2.prototype.defineClass = function() {
          function Class(content) {
            extend(this, content);
          }
          return this.mapToClass(Class);
        };
        Table2.prototype.add = function(obj, key) {
          var _this = this;
          var _a2 = this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
          var objToAdd = obj;
          if (keyPath && auto) {
            objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
          }
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "add", keys: key != null ? [key] : null, values: [objToAdd] });
          }).then(function(res) {
            return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult;
          }).then(function(lastResult) {
            if (keyPath) {
              try {
                setByKeyPath(obj, keyPath, lastResult);
              } catch (_) {
              }
            }
            return lastResult;
          });
        };
        Table2.prototype.update = function(keyOrObject, modifications) {
          if (typeof keyOrObject === "object" && !isArray(keyOrObject)) {
            var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
            if (key === void 0)
              return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
            return this.where(":id").equals(key).modify(modifications);
          } else {
            return this.where(":id").equals(keyOrObject).modify(modifications);
          }
        };
        Table2.prototype.put = function(obj, key) {
          var _this = this;
          var _a2 = this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
          var objToAdd = obj;
          if (keyPath && auto) {
            objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
          }
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "put", values: [objToAdd], keys: key != null ? [key] : null });
          }).then(function(res) {
            return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult;
          }).then(function(lastResult) {
            if (keyPath) {
              try {
                setByKeyPath(obj, keyPath, lastResult);
              } catch (_) {
              }
            }
            return lastResult;
          });
        };
        Table2.prototype.delete = function(key) {
          var _this = this;
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "delete", keys: [key] });
          }).then(function(res) {
            return res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0;
          });
        };
        Table2.prototype.clear = function() {
          var _this = this;
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "deleteRange", range: AnyRange });
          }).then(function(res) {
            return res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0;
          });
        };
        Table2.prototype.bulkGet = function(keys2) {
          var _this = this;
          return this._trans("readonly", function(trans) {
            return _this.core.getMany({
              keys: keys2,
              trans
            }).then(function(result) {
              return result.map(function(res) {
                return _this.hook.reading.fire(res);
              });
            });
          });
        };
        Table2.prototype.bulkAdd = function(objects, keysOrOptions, options) {
          var _this = this;
          var keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
          options = options || (keys2 ? void 0 : keysOrOptions);
          var wantResults = options ? options.allKeys : void 0;
          return this._trans("readwrite", function(trans) {
            var _a2 = _this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
            if (keyPath && keys2)
              throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
            if (keys2 && keys2.length !== objects.length)
              throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            var numObjects = objects.length;
            var objectsToAdd = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
            return _this.core.mutate({ trans, type: "add", keys: keys2, values: objectsToAdd, wantResults }).then(function(_a3) {
              var numFailures = _a3.numFailures, results = _a3.results, lastResult = _a3.lastResult, failures = _a3.failures;
              var result = wantResults ? results : lastResult;
              if (numFailures === 0)
                return result;
              throw new BulkError("".concat(_this.name, ".bulkAdd(): ").concat(numFailures, " of ").concat(numObjects, " operations failed"), failures);
            });
          });
        };
        Table2.prototype.bulkPut = function(objects, keysOrOptions, options) {
          var _this = this;
          var keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
          options = options || (keys2 ? void 0 : keysOrOptions);
          var wantResults = options ? options.allKeys : void 0;
          return this._trans("readwrite", function(trans) {
            var _a2 = _this.schema.primKey, auto = _a2.auto, keyPath = _a2.keyPath;
            if (keyPath && keys2)
              throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
            if (keys2 && keys2.length !== objects.length)
              throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            var numObjects = objects.length;
            var objectsToPut = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
            return _this.core.mutate({ trans, type: "put", keys: keys2, values: objectsToPut, wantResults }).then(function(_a3) {
              var numFailures = _a3.numFailures, results = _a3.results, lastResult = _a3.lastResult, failures = _a3.failures;
              var result = wantResults ? results : lastResult;
              if (numFailures === 0)
                return result;
              throw new BulkError("".concat(_this.name, ".bulkPut(): ").concat(numFailures, " of ").concat(numObjects, " operations failed"), failures);
            });
          });
        };
        Table2.prototype.bulkUpdate = function(keysAndChanges) {
          var _this = this;
          var coreTable = this.core;
          var keys2 = keysAndChanges.map(function(entry) {
            return entry.key;
          });
          var changeSpecs = keysAndChanges.map(function(entry) {
            return entry.changes;
          });
          var offsetMap = [];
          return this._trans("readwrite", function(trans) {
            return coreTable.getMany({ trans, keys: keys2, cache: "clone" }).then(function(objs) {
              var resultKeys = [];
              var resultObjs = [];
              keysAndChanges.forEach(function(_a2, idx) {
                var key = _a2.key, changes = _a2.changes;
                var obj = objs[idx];
                if (obj) {
                  for (var _i = 0, _b = Object.keys(changes); _i < _b.length; _i++) {
                    var keyPath = _b[_i];
                    var value = changes[keyPath];
                    if (keyPath === _this.schema.primKey.keyPath) {
                      if (cmp2(value, key) !== 0) {
                        throw new exceptions.Constraint("Cannot update primary key in bulkUpdate()");
                      }
                    } else {
                      setByKeyPath(obj, keyPath, value);
                    }
                  }
                  offsetMap.push(idx);
                  resultKeys.push(key);
                  resultObjs.push(obj);
                }
              });
              var numEntries = resultKeys.length;
              return coreTable.mutate({
                trans,
                type: "put",
                keys: resultKeys,
                values: resultObjs,
                updates: {
                  keys: keys2,
                  changeSpecs
                }
              }).then(function(_a2) {
                var numFailures = _a2.numFailures, failures = _a2.failures;
                if (numFailures === 0)
                  return numEntries;
                for (var _i = 0, _b = Object.keys(failures); _i < _b.length; _i++) {
                  var offset = _b[_i];
                  var mappedOffset = offsetMap[Number(offset)];
                  if (mappedOffset != null) {
                    var failure = failures[offset];
                    delete failures[offset];
                    failures[mappedOffset] = failure;
                  }
                }
                throw new BulkError("".concat(_this.name, ".bulkUpdate(): ").concat(numFailures, " of ").concat(numEntries, " operations failed"), failures);
              });
            });
          });
        };
        Table2.prototype.bulkDelete = function(keys2) {
          var _this = this;
          var numKeys = keys2.length;
          return this._trans("readwrite", function(trans) {
            return _this.core.mutate({ trans, type: "delete", keys: keys2 });
          }).then(function(_a2) {
            var numFailures = _a2.numFailures, lastResult = _a2.lastResult, failures = _a2.failures;
            if (numFailures === 0)
              return lastResult;
            throw new BulkError("".concat(_this.name, ".bulkDelete(): ").concat(numFailures, " of ").concat(numKeys, " operations failed"), failures);
          });
        };
        return Table2;
      }();
      function Events(ctx) {
        var evs = {};
        var rv = function(eventName, subscriber) {
          if (subscriber) {
            var i2 = arguments.length, args = new Array(i2 - 1);
            while (--i2)
              args[i2 - 1] = arguments[i2];
            evs[eventName].subscribe.apply(null, args);
            return ctx;
          } else if (typeof eventName === "string") {
            return evs[eventName];
          }
        };
        rv.addEventType = add3;
        for (var i = 1, l = arguments.length; i < l; ++i) {
          add3(arguments[i]);
        }
        return rv;
        function add3(eventName, chainFunction, defaultFunction) {
          if (typeof eventName === "object")
            return addConfiguredEvents(eventName);
          if (!chainFunction)
            chainFunction = reverseStoppableEventChain;
          if (!defaultFunction)
            defaultFunction = nop;
          var context = {
            subscribers: [],
            fire: defaultFunction,
            subscribe: function(cb) {
              if (context.subscribers.indexOf(cb) === -1) {
                context.subscribers.push(cb);
                context.fire = chainFunction(context.fire, cb);
              }
            },
            unsubscribe: function(cb) {
              context.subscribers = context.subscribers.filter(function(fn) {
                return fn !== cb;
              });
              context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
            }
          };
          evs[eventName] = rv[eventName] = context;
          return context;
        }
        function addConfiguredEvents(cfg) {
          keys(cfg).forEach(function(eventName) {
            var args = cfg[eventName];
            if (isArray(args)) {
              add3(eventName, cfg[eventName][0], cfg[eventName][1]);
            } else if (args === "asap") {
              var context = add3(eventName, mirror, function fire() {
                var i2 = arguments.length, args2 = new Array(i2);
                while (i2--)
                  args2[i2] = arguments[i2];
                context.subscribers.forEach(function(fn) {
                  asap$1(function fireEvent() {
                    fn.apply(null, args2);
                  });
                });
              });
            } else
              throw new exceptions.InvalidArgument("Invalid event config");
          });
        }
      }
      function makeClassConstructor(prototype, constructor) {
        derive(constructor).from({ prototype });
        return constructor;
      }
      function createTableConstructor(db) {
        return makeClassConstructor(Table.prototype, function Table2(name, tableSchema, trans) {
          this.db = db;
          this._tx = trans;
          this.name = name;
          this.schema = tableSchema;
          this.hook = db._allTables[name] ? db._allTables[name].hook : Events(null, {
            "creating": [hookCreatingChain, nop],
            "reading": [pureFunctionChain, mirror],
            "updating": [hookUpdatingChain, nop],
            "deleting": [hookDeletingChain, nop]
          });
        });
      }
      function isPlainKeyRange(ctx, ignoreLimitFilter) {
        return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
      }
      function addFilter(ctx, fn) {
        ctx.filter = combine(ctx.filter, fn);
      }
      function addReplayFilter(ctx, factory, isLimitFilter) {
        var curr = ctx.replayFilter;
        ctx.replayFilter = curr ? function() {
          return combine(curr(), factory());
        } : factory;
        ctx.justLimit = isLimitFilter && !curr;
      }
      function addMatchFilter(ctx, fn) {
        ctx.isMatch = combine(ctx.isMatch, fn);
      }
      function getIndexOrStore(ctx, coreSchema) {
        if (ctx.isPrimKey)
          return coreSchema.primaryKey;
        var index = coreSchema.getIndexByKeyPath(ctx.index);
        if (!index)
          throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
        return index;
      }
      function openCursor(ctx, coreTable, trans) {
        var index = getIndexOrStore(ctx, coreTable.schema);
        return coreTable.openCursor({
          trans,
          values: !ctx.keysOnly,
          reverse: ctx.dir === "prev",
          unique: !!ctx.unique,
          query: {
            index,
            range: ctx.range
          }
        });
      }
      function iter(ctx, fn, coreTrans, coreTable) {
        var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
        if (!ctx.or) {
          return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
        } else {
          var set_1 = {};
          var union = function(item, cursor, advance) {
            if (!filter || filter(cursor, advance, function(result) {
              return cursor.stop(result);
            }, function(err) {
              return cursor.fail(err);
            })) {
              var primaryKey = cursor.primaryKey;
              var key = "" + primaryKey;
              if (key === "[object ArrayBuffer]")
                key = "" + new Uint8Array(primaryKey);
              if (!hasOwn(set_1, key)) {
                set_1[key] = true;
                fn(item, cursor, advance);
              }
            }
          };
          return Promise.all([
            ctx.or._iterate(union, coreTrans),
            iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)
          ]);
        }
      }
      function iterate(cursorPromise, filter, fn, valueMapper) {
        var mappedFn = valueMapper ? function(x, c, a) {
          return fn(valueMapper(x), c, a);
        } : fn;
        var wrappedFn = wrap(mappedFn);
        return cursorPromise.then(function(cursor) {
          if (cursor) {
            return cursor.start(function() {
              var c = function() {
                return cursor.continue();
              };
              if (!filter || filter(cursor, function(advancer) {
                return c = advancer;
              }, function(val) {
                cursor.stop(val);
                c = nop;
              }, function(e) {
                cursor.fail(e);
                c = nop;
              }))
                wrappedFn(cursor.value, cursor, function(advancer) {
                  return c = advancer;
                });
              c();
            });
          }
        });
      }
      var PropModification2 = function() {
        function PropModification3(spec) {
          this["@@propmod"] = spec;
        }
        PropModification3.prototype.execute = function(value) {
          var _a2;
          var spec = this["@@propmod"];
          if (spec.add !== void 0) {
            var term = spec.add;
            if (isArray(term)) {
              return __spreadArray(__spreadArray([], isArray(value) ? value : [], true), term, true).sort();
            }
            if (typeof term === "number")
              return (Number(value) || 0) + term;
            if (typeof term === "bigint") {
              try {
                return BigInt(value) + term;
              } catch (_b) {
                return BigInt(0) + term;
              }
            }
            throw new TypeError("Invalid term ".concat(term));
          }
          if (spec.remove !== void 0) {
            var subtrahend_1 = spec.remove;
            if (isArray(subtrahend_1)) {
              return isArray(value) ? value.filter(function(item) {
                return !subtrahend_1.includes(item);
              }).sort() : [];
            }
            if (typeof subtrahend_1 === "number")
              return Number(value) - subtrahend_1;
            if (typeof subtrahend_1 === "bigint") {
              try {
                return BigInt(value) - subtrahend_1;
              } catch (_c) {
                return BigInt(0) - subtrahend_1;
              }
            }
            throw new TypeError("Invalid subtrahend ".concat(subtrahend_1));
          }
          var prefixToReplace = (_a2 = spec.replacePrefix) === null || _a2 === void 0 ? void 0 : _a2[0];
          if (prefixToReplace && typeof value === "string" && value.startsWith(prefixToReplace)) {
            return spec.replacePrefix[1] + value.substring(prefixToReplace.length);
          }
          return value;
        };
        return PropModification3;
      }();
      var Collection = function() {
        function Collection2() {
        }
        Collection2.prototype._read = function(fn, cb) {
          var ctx = this._ctx;
          return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readonly", fn).then(cb);
        };
        Collection2.prototype._write = function(fn) {
          var ctx = this._ctx;
          return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readwrite", fn, "locked");
        };
        Collection2.prototype._addAlgorithm = function(fn) {
          var ctx = this._ctx;
          ctx.algorithm = combine(ctx.algorithm, fn);
        };
        Collection2.prototype._iterate = function(fn, coreTrans) {
          return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
        };
        Collection2.prototype.clone = function(props2) {
          var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
          if (props2)
            extend(ctx, props2);
          rv._ctx = ctx;
          return rv;
        };
        Collection2.prototype.raw = function() {
          this._ctx.valueMapper = null;
          return this;
        };
        Collection2.prototype.each = function(fn) {
          var ctx = this._ctx;
          return this._read(function(trans) {
            return iter(ctx, fn, trans, ctx.table.core);
          });
        };
        Collection2.prototype.count = function(cb) {
          var _this = this;
          return this._read(function(trans) {
            var ctx = _this._ctx;
            var coreTable = ctx.table.core;
            if (isPlainKeyRange(ctx, true)) {
              return coreTable.count({
                trans,
                query: {
                  index: getIndexOrStore(ctx, coreTable.schema),
                  range: ctx.range
                }
              }).then(function(count2) {
                return Math.min(count2, ctx.limit);
              });
            } else {
              var count = 0;
              return iter(ctx, function() {
                ++count;
                return false;
              }, trans, coreTable).then(function() {
                return count;
              });
            }
          }).then(cb);
        };
        Collection2.prototype.sortBy = function(keyPath, cb) {
          var parts = keyPath.split(".").reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
          function getval(obj, i) {
            if (i)
              return getval(obj[parts[i]], i - 1);
            return obj[lastPart];
          }
          var order = this._ctx.dir === "next" ? 1 : -1;
          function sorter(a, b) {
            var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
            return cmp2(aVal, bVal) * order;
          }
          return this.toArray(function(a) {
            return a.sort(sorter);
          }).then(cb);
        };
        Collection2.prototype.toArray = function(cb) {
          var _this = this;
          return this._read(function(trans) {
            var ctx = _this._ctx;
            if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
              var valueMapper_1 = ctx.valueMapper;
              var index = getIndexOrStore(ctx, ctx.table.core.schema);
              return ctx.table.core.query({
                trans,
                limit: ctx.limit,
                values: true,
                query: {
                  index,
                  range: ctx.range
                }
              }).then(function(_a2) {
                var result = _a2.result;
                return valueMapper_1 ? result.map(valueMapper_1) : result;
              });
            } else {
              var a_1 = [];
              return iter(ctx, function(item) {
                return a_1.push(item);
              }, trans, ctx.table.core).then(function() {
                return a_1;
              });
            }
          }, cb);
        };
        Collection2.prototype.offset = function(offset) {
          var ctx = this._ctx;
          if (offset <= 0)
            return this;
          ctx.offset += offset;
          if (isPlainKeyRange(ctx)) {
            addReplayFilter(ctx, function() {
              var offsetLeft = offset;
              return function(cursor, advance) {
                if (offsetLeft === 0)
                  return true;
                if (offsetLeft === 1) {
                  --offsetLeft;
                  return false;
                }
                advance(function() {
                  cursor.advance(offsetLeft);
                  offsetLeft = 0;
                });
                return false;
              };
            });
          } else {
            addReplayFilter(ctx, function() {
              var offsetLeft = offset;
              return function() {
                return --offsetLeft < 0;
              };
            });
          }
          return this;
        };
        Collection2.prototype.limit = function(numRows) {
          this._ctx.limit = Math.min(this._ctx.limit, numRows);
          addReplayFilter(this._ctx, function() {
            var rowsLeft = numRows;
            return function(cursor, advance, resolve) {
              if (--rowsLeft <= 0)
                advance(resolve);
              return rowsLeft >= 0;
            };
          }, true);
          return this;
        };
        Collection2.prototype.until = function(filterFunction, bIncludeStopEntry) {
          addFilter(this._ctx, function(cursor, advance, resolve) {
            if (filterFunction(cursor.value)) {
              advance(resolve);
              return bIncludeStopEntry;
            } else {
              return true;
            }
          });
          return this;
        };
        Collection2.prototype.first = function(cb) {
          return this.limit(1).toArray(function(a) {
            return a[0];
          }).then(cb);
        };
        Collection2.prototype.last = function(cb) {
          return this.reverse().first(cb);
        };
        Collection2.prototype.filter = function(filterFunction) {
          addFilter(this._ctx, function(cursor) {
            return filterFunction(cursor.value);
          });
          addMatchFilter(this._ctx, filterFunction);
          return this;
        };
        Collection2.prototype.and = function(filter) {
          return this.filter(filter);
        };
        Collection2.prototype.or = function(indexName) {
          return new this.db.WhereClause(this._ctx.table, indexName, this);
        };
        Collection2.prototype.reverse = function() {
          this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
          if (this._ondirectionchange)
            this._ondirectionchange(this._ctx.dir);
          return this;
        };
        Collection2.prototype.desc = function() {
          return this.reverse();
        };
        Collection2.prototype.eachKey = function(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          return this.each(function(val, cursor) {
            cb(cursor.key, cursor);
          });
        };
        Collection2.prototype.eachUniqueKey = function(cb) {
          this._ctx.unique = "unique";
          return this.eachKey(cb);
        };
        Collection2.prototype.eachPrimaryKey = function(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          return this.each(function(val, cursor) {
            cb(cursor.primaryKey, cursor);
          });
        };
        Collection2.prototype.keys = function(cb) {
          var ctx = this._ctx;
          ctx.keysOnly = !ctx.isMatch;
          var a = [];
          return this.each(function(item, cursor) {
            a.push(cursor.key);
          }).then(function() {
            return a;
          }).then(cb);
        };
        Collection2.prototype.primaryKeys = function(cb) {
          var ctx = this._ctx;
          if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
            return this._read(function(trans) {
              var index = getIndexOrStore(ctx, ctx.table.core.schema);
              return ctx.table.core.query({
                trans,
                values: false,
                limit: ctx.limit,
                query: {
                  index,
                  range: ctx.range
                }
              });
            }).then(function(_a2) {
              var result = _a2.result;
              return result;
            }).then(cb);
          }
          ctx.keysOnly = !ctx.isMatch;
          var a = [];
          return this.each(function(item, cursor) {
            a.push(cursor.primaryKey);
          }).then(function() {
            return a;
          }).then(cb);
        };
        Collection2.prototype.uniqueKeys = function(cb) {
          this._ctx.unique = "unique";
          return this.keys(cb);
        };
        Collection2.prototype.firstKey = function(cb) {
          return this.limit(1).keys(function(a) {
            return a[0];
          }).then(cb);
        };
        Collection2.prototype.lastKey = function(cb) {
          return this.reverse().firstKey(cb);
        };
        Collection2.prototype.distinct = function() {
          var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
          if (!idx || !idx.multi)
            return this;
          var set = {};
          addFilter(this._ctx, function(cursor) {
            var strKey = cursor.primaryKey.toString();
            var found = hasOwn(set, strKey);
            set[strKey] = true;
            return !found;
          });
          return this;
        };
        Collection2.prototype.modify = function(changes) {
          var _this = this;
          var ctx = this._ctx;
          return this._write(function(trans) {
            var modifyer;
            if (typeof changes === "function") {
              modifyer = changes;
            } else {
              var keyPaths = keys(changes);
              var numKeys = keyPaths.length;
              modifyer = function(item) {
                var anythingModified = false;
                for (var i = 0; i < numKeys; ++i) {
                  var keyPath = keyPaths[i];
                  var val = changes[keyPath];
                  var origVal = getByKeyPath(item, keyPath);
                  if (val instanceof PropModification2) {
                    setByKeyPath(item, keyPath, val.execute(origVal));
                    anythingModified = true;
                  } else if (origVal !== val) {
                    setByKeyPath(item, keyPath, val);
                    anythingModified = true;
                  }
                }
                return anythingModified;
              };
            }
            var coreTable = ctx.table.core;
            var _a2 = coreTable.schema.primaryKey, outbound = _a2.outbound, extractKey = _a2.extractKey;
            var limit = 200;
            var modifyChunkSize = _this.db._options.modifyChunkSize;
            if (modifyChunkSize) {
              if (typeof modifyChunkSize == "object") {
                limit = modifyChunkSize[coreTable.name] || modifyChunkSize["*"] || 200;
              } else {
                limit = modifyChunkSize;
              }
            }
            var totalFailures = [];
            var successCount = 0;
            var failedKeys = [];
            var applyMutateResult = function(expectedCount, res) {
              var failures = res.failures, numFailures = res.numFailures;
              successCount += expectedCount - numFailures;
              for (var _i = 0, _a3 = keys(failures); _i < _a3.length; _i++) {
                var pos = _a3[_i];
                totalFailures.push(failures[pos]);
              }
            };
            return _this.clone().primaryKeys().then(function(keys2) {
              var criteria = isPlainKeyRange(ctx) && ctx.limit === Infinity && (typeof changes !== "function" || changes === deleteCallback) && {
                index: ctx.index,
                range: ctx.range
              };
              var nextChunk = function(offset) {
                var count = Math.min(limit, keys2.length - offset);
                return coreTable.getMany({
                  trans,
                  keys: keys2.slice(offset, offset + count),
                  cache: "immutable"
                }).then(function(values) {
                  var addValues = [];
                  var putValues = [];
                  var putKeys = outbound ? [] : null;
                  var deleteKeys = [];
                  for (var i = 0; i < count; ++i) {
                    var origValue = values[i];
                    var ctx_1 = {
                      value: deepClone(origValue),
                      primKey: keys2[offset + i]
                    };
                    if (modifyer.call(ctx_1, ctx_1.value, ctx_1) !== false) {
                      if (ctx_1.value == null) {
                        deleteKeys.push(keys2[offset + i]);
                      } else if (!outbound && cmp2(extractKey(origValue), extractKey(ctx_1.value)) !== 0) {
                        deleteKeys.push(keys2[offset + i]);
                        addValues.push(ctx_1.value);
                      } else {
                        putValues.push(ctx_1.value);
                        if (outbound)
                          putKeys.push(keys2[offset + i]);
                      }
                    }
                  }
                  return Promise.resolve(addValues.length > 0 && coreTable.mutate({ trans, type: "add", values: addValues }).then(function(res) {
                    for (var pos in res.failures) {
                      deleteKeys.splice(parseInt(pos), 1);
                    }
                    applyMutateResult(addValues.length, res);
                  })).then(function() {
                    return (putValues.length > 0 || criteria && typeof changes === "object") && coreTable.mutate({
                      trans,
                      type: "put",
                      keys: putKeys,
                      values: putValues,
                      criteria,
                      changeSpec: typeof changes !== "function" && changes,
                      isAdditionalChunk: offset > 0
                    }).then(function(res) {
                      return applyMutateResult(putValues.length, res);
                    });
                  }).then(function() {
                    return (deleteKeys.length > 0 || criteria && changes === deleteCallback) && coreTable.mutate({
                      trans,
                      type: "delete",
                      keys: deleteKeys,
                      criteria,
                      isAdditionalChunk: offset > 0
                    }).then(function(res) {
                      return applyMutateResult(deleteKeys.length, res);
                    });
                  }).then(function() {
                    return keys2.length > offset + count && nextChunk(offset + limit);
                  });
                });
              };
              return nextChunk(0).then(function() {
                if (totalFailures.length > 0)
                  throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
                return keys2.length;
              });
            });
          });
        };
        Collection2.prototype.delete = function() {
          var ctx = this._ctx, range = ctx.range;
          if (isPlainKeyRange(ctx) && (ctx.isPrimKey || range.type === 3)) {
            return this._write(function(trans) {
              var primaryKey = ctx.table.core.schema.primaryKey;
              var coreRange = range;
              return ctx.table.core.count({ trans, query: { index: primaryKey, range: coreRange } }).then(function(count) {
                return ctx.table.core.mutate({ trans, type: "deleteRange", range: coreRange }).then(function(_a2) {
                  var failures = _a2.failures;
                  _a2.lastResult;
                  _a2.results;
                  var numFailures = _a2.numFailures;
                  if (numFailures)
                    throw new ModifyError("Could not delete some values", Object.keys(failures).map(function(pos) {
                      return failures[pos];
                    }), count - numFailures);
                  return count - numFailures;
                });
              });
            });
          }
          return this.modify(deleteCallback);
        };
        return Collection2;
      }();
      var deleteCallback = function(value, ctx) {
        return ctx.value = null;
      };
      function createCollectionConstructor(db) {
        return makeClassConstructor(Collection.prototype, function Collection2(whereClause, keyRangeGenerator) {
          this.db = db;
          var keyRange = AnyRange, error = null;
          if (keyRangeGenerator)
            try {
              keyRange = keyRangeGenerator();
            } catch (ex) {
              error = ex;
            }
          var whereCtx = whereClause._ctx;
          var table = whereCtx.table;
          var readingHook = table.hook.reading.fire;
          this._ctx = {
            table,
            index: whereCtx.index,
            isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
            range: keyRange,
            keysOnly: false,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: true,
            isMatch: null,
            offset: 0,
            limit: Infinity,
            error,
            or: whereCtx.or,
            valueMapper: readingHook !== mirror ? readingHook : null
          };
        });
      }
      function simpleCompare(a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
      }
      function simpleCompareReverse(a, b) {
        return a > b ? -1 : a === b ? 0 : 1;
      }
      function fail(collectionOrWhereClause, err, T) {
        var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause.Collection(collectionOrWhereClause) : collectionOrWhereClause;
        collection._ctx.error = T ? new T(err) : new TypeError(err);
        return collection;
      }
      function emptyCollection(whereClause) {
        return new whereClause.Collection(whereClause, function() {
          return rangeEqual("");
        }).limit(0);
      }
      function upperFactory(dir) {
        return dir === "next" ? function(s) {
          return s.toUpperCase();
        } : function(s) {
          return s.toLowerCase();
        };
      }
      function lowerFactory(dir) {
        return dir === "next" ? function(s) {
          return s.toLowerCase();
        } : function(s) {
          return s.toUpperCase();
        };
      }
      function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp3, dir) {
        var length = Math.min(key.length, lowerNeedle.length);
        var llp = -1;
        for (var i = 0; i < length; ++i) {
          var lwrKeyChar = lowerKey[i];
          if (lwrKeyChar !== lowerNeedle[i]) {
            if (cmp3(key[i], upperNeedle[i]) < 0)
              return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
            if (cmp3(key[i], lowerNeedle[i]) < 0)
              return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
            if (llp >= 0)
              return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
            return null;
          }
          if (cmp3(key[i], lwrKeyChar) < 0)
            llp = i;
        }
        if (length < lowerNeedle.length && dir === "next")
          return key + upperNeedle.substr(key.length);
        if (length < key.length && dir === "prev")
          return key.substr(0, upperNeedle.length);
        return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
      }
      function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
        var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
        if (!needles.every(function(s) {
          return typeof s === "string";
        })) {
          return fail(whereClause, STRING_EXPECTED);
        }
        function initDirection(dir) {
          upper = upperFactory(dir);
          lower = lowerFactory(dir);
          compare = dir === "next" ? simpleCompare : simpleCompareReverse;
          var needleBounds = needles.map(function(needle) {
            return { lower: lower(needle), upper: upper(needle) };
          }).sort(function(a, b) {
            return compare(a.lower, b.lower);
          });
          upperNeedles = needleBounds.map(function(nb) {
            return nb.upper;
          });
          lowerNeedles = needleBounds.map(function(nb) {
            return nb.lower;
          });
          direction = dir;
          nextKeySuffix = dir === "next" ? "" : suffix;
        }
        initDirection("next");
        var c = new whereClause.Collection(whereClause, function() {
          return createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
        });
        c._ondirectionchange = function(direction2) {
          initDirection(direction2);
        };
        var firstPossibleNeedle = 0;
        c._addAlgorithm(function(cursor, advance, resolve) {
          var key = cursor.key;
          if (typeof key !== "string")
            return false;
          var lowerKey = lower(key);
          if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
            return true;
          } else {
            var lowestPossibleCasing = null;
            for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
              var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
              if (casing === null && lowestPossibleCasing === null)
                firstPossibleNeedle = i + 1;
              else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                lowestPossibleCasing = casing;
              }
            }
            if (lowestPossibleCasing !== null) {
              advance(function() {
                cursor.continue(lowestPossibleCasing + nextKeySuffix);
              });
            } else {
              advance(resolve);
            }
            return false;
          }
        });
        return c;
      }
      function createRange(lower, upper, lowerOpen, upperOpen) {
        return {
          type: 2,
          lower,
          upper,
          lowerOpen,
          upperOpen
        };
      }
      function rangeEqual(value) {
        return {
          type: 1,
          lower: value,
          upper: value
        };
      }
      var WhereClause = function() {
        function WhereClause2() {
        }
        Object.defineProperty(WhereClause2.prototype, "Collection", {
          get: function() {
            return this._ctx.table.db.Collection;
          },
          enumerable: false,
          configurable: true
        });
        WhereClause2.prototype.between = function(lower, upper, includeLower, includeUpper) {
          includeLower = includeLower !== false;
          includeUpper = includeUpper === true;
          try {
            if (this._cmp(lower, upper) > 0 || this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper))
              return emptyCollection(this);
            return new this.Collection(this, function() {
              return createRange(lower, upper, !includeLower, !includeUpper);
            });
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
        };
        WhereClause2.prototype.equals = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return rangeEqual(value);
          });
        };
        WhereClause2.prototype.above = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(value, void 0, true);
          });
        };
        WhereClause2.prototype.aboveOrEqual = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(value, void 0, false);
          });
        };
        WhereClause2.prototype.below = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(void 0, value, false, true);
          });
        };
        WhereClause2.prototype.belowOrEqual = function(value) {
          if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
          return new this.Collection(this, function() {
            return createRange(void 0, value);
          });
        };
        WhereClause2.prototype.startsWith = function(str) {
          if (typeof str !== "string")
            return fail(this, STRING_EXPECTED);
          return this.between(str, str + maxString, true, true);
        };
        WhereClause2.prototype.startsWithIgnoreCase = function(str) {
          if (str === "")
            return this.startsWith(str);
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return x.indexOf(a[0]) === 0;
          }, [str], maxString);
        };
        WhereClause2.prototype.equalsIgnoreCase = function(str) {
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return x === a[0];
          }, [str], "");
        };
        WhereClause2.prototype.anyOfIgnoreCase = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return emptyCollection(this);
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return a.indexOf(x) !== -1;
          }, set, "");
        };
        WhereClause2.prototype.startsWithAnyOfIgnoreCase = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return emptyCollection(this);
          return addIgnoreCaseAlgorithm(this, function(x, a) {
            return a.some(function(n) {
              return x.indexOf(n) === 0;
            });
          }, set, maxString);
        };
        WhereClause2.prototype.anyOf = function() {
          var _this = this;
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          var compare = this._cmp;
          try {
            set.sort(compare);
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          if (set.length === 0)
            return emptyCollection(this);
          var c = new this.Collection(this, function() {
            return createRange(set[0], set[set.length - 1]);
          });
          c._ondirectionchange = function(direction) {
            compare = direction === "next" ? _this._ascending : _this._descending;
            set.sort(compare);
          };
          var i = 0;
          c._addAlgorithm(function(cursor, advance, resolve) {
            var key = cursor.key;
            while (compare(key, set[i]) > 0) {
              ++i;
              if (i === set.length) {
                advance(resolve);
                return false;
              }
            }
            if (compare(key, set[i]) === 0) {
              return true;
            } else {
              advance(function() {
                cursor.continue(set[i]);
              });
              return false;
            }
          });
          return c;
        };
        WhereClause2.prototype.notEqual = function(value) {
          return this.inAnyRange([[minKey, value], [value, this.db._maxKey]], { includeLowers: false, includeUppers: false });
        };
        WhereClause2.prototype.noneOf = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (set.length === 0)
            return new this.Collection(this);
          try {
            set.sort(this._ascending);
          } catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          var ranges = set.reduce(function(res, val) {
            return res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]];
          }, null);
          ranges.push([set[set.length - 1], this.db._maxKey]);
          return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
        };
        WhereClause2.prototype.inAnyRange = function(ranges, options) {
          var _this = this;
          var cmp3 = this._cmp, ascending = this._ascending, descending = this._descending, min = this._min, max = this._max;
          if (ranges.length === 0)
            return emptyCollection(this);
          if (!ranges.every(function(range) {
            return range[0] !== void 0 && range[1] !== void 0 && ascending(range[0], range[1]) <= 0;
          })) {
            return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
          }
          var includeLowers = !options || options.includeLowers !== false;
          var includeUppers = options && options.includeUppers === true;
          function addRange2(ranges2, newRange) {
            var i = 0, l = ranges2.length;
            for (; i < l; ++i) {
              var range = ranges2[i];
              if (cmp3(newRange[0], range[1]) < 0 && cmp3(newRange[1], range[0]) > 0) {
                range[0] = min(range[0], newRange[0]);
                range[1] = max(range[1], newRange[1]);
                break;
              }
            }
            if (i === l)
              ranges2.push(newRange);
            return ranges2;
          }
          var sortDirection = ascending;
          function rangeSorter(a, b) {
            return sortDirection(a[0], b[0]);
          }
          var set;
          try {
            set = ranges.reduce(addRange2, []);
            set.sort(rangeSorter);
          } catch (ex) {
            return fail(this, INVALID_KEY_ARGUMENT);
          }
          var rangePos = 0;
          var keyIsBeyondCurrentEntry = includeUppers ? function(key) {
            return ascending(key, set[rangePos][1]) > 0;
          } : function(key) {
            return ascending(key, set[rangePos][1]) >= 0;
          };
          var keyIsBeforeCurrentEntry = includeLowers ? function(key) {
            return descending(key, set[rangePos][0]) > 0;
          } : function(key) {
            return descending(key, set[rangePos][0]) >= 0;
          };
          function keyWithinCurrentRange(key) {
            return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
          }
          var checkKey = keyIsBeyondCurrentEntry;
          var c = new this.Collection(this, function() {
            return createRange(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
          });
          c._ondirectionchange = function(direction) {
            if (direction === "next") {
              checkKey = keyIsBeyondCurrentEntry;
              sortDirection = ascending;
            } else {
              checkKey = keyIsBeforeCurrentEntry;
              sortDirection = descending;
            }
            set.sort(rangeSorter);
          };
          c._addAlgorithm(function(cursor, advance, resolve) {
            var key = cursor.key;
            while (checkKey(key)) {
              ++rangePos;
              if (rangePos === set.length) {
                advance(resolve);
                return false;
              }
            }
            if (keyWithinCurrentRange(key)) {
              return true;
            } else if (_this._cmp(key, set[rangePos][1]) === 0 || _this._cmp(key, set[rangePos][0]) === 0) {
              return false;
            } else {
              advance(function() {
                if (sortDirection === ascending)
                  cursor.continue(set[rangePos][0]);
                else
                  cursor.continue(set[rangePos][1]);
              });
              return false;
            }
          });
          return c;
        };
        WhereClause2.prototype.startsWithAnyOf = function() {
          var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
          if (!set.every(function(s) {
            return typeof s === "string";
          })) {
            return fail(this, "startsWithAnyOf() only works with strings");
          }
          if (set.length === 0)
            return emptyCollection(this);
          return this.inAnyRange(set.map(function(str) {
            return [str, str + maxString];
          }));
        };
        return WhereClause2;
      }();
      function createWhereClauseConstructor(db) {
        return makeClassConstructor(WhereClause.prototype, function WhereClause2(table, index, orCollection) {
          this.db = db;
          this._ctx = {
            table,
            index: index === ":id" ? null : index,
            or: orCollection
          };
          this._cmp = this._ascending = cmp2;
          this._descending = function(a, b) {
            return cmp2(b, a);
          };
          this._max = function(a, b) {
            return cmp2(a, b) > 0 ? a : b;
          };
          this._min = function(a, b) {
            return cmp2(a, b) < 0 ? a : b;
          };
          this._IDBKeyRange = db._deps.IDBKeyRange;
          if (!this._IDBKeyRange)
            throw new exceptions.MissingAPI();
        });
      }
      function eventRejectHandler(reject) {
        return wrap(function(event) {
          preventDefault(event);
          reject(event.target.error);
          return false;
        });
      }
      function preventDefault(event) {
        if (event.stopPropagation)
          event.stopPropagation();
        if (event.preventDefault)
          event.preventDefault();
      }
      var DEXIE_STORAGE_MUTATED_EVENT_NAME = "storagemutated";
      var STORAGE_MUTATED_DOM_EVENT_NAME = "x-storagemutated-1";
      var globalEvents = Events(null, DEXIE_STORAGE_MUTATED_EVENT_NAME);
      var Transaction = function() {
        function Transaction2() {
        }
        Transaction2.prototype._lock = function() {
          assert(!PSD.global);
          ++this._reculock;
          if (this._reculock === 1 && !PSD.global)
            PSD.lockOwnerFor = this;
          return this;
        };
        Transaction2.prototype._unlock = function() {
          assert(!PSD.global);
          if (--this._reculock === 0) {
            if (!PSD.global)
              PSD.lockOwnerFor = null;
            while (this._blockedFuncs.length > 0 && !this._locked()) {
              var fnAndPSD = this._blockedFuncs.shift();
              try {
                usePSD(fnAndPSD[1], fnAndPSD[0]);
              } catch (e) {
              }
            }
          }
          return this;
        };
        Transaction2.prototype._locked = function() {
          return this._reculock && PSD.lockOwnerFor !== this;
        };
        Transaction2.prototype.create = function(idbtrans) {
          var _this = this;
          if (!this.mode)
            return this;
          var idbdb = this.db.idbdb;
          var dbOpenError = this.db._state.dbOpenError;
          assert(!this.idbtrans);
          if (!idbtrans && !idbdb) {
            switch (dbOpenError && dbOpenError.name) {
              case "DatabaseClosedError":
                throw new exceptions.DatabaseClosed(dbOpenError);
              case "MissingAPIError":
                throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
              default:
                throw new exceptions.OpenFailed(dbOpenError);
            }
          }
          if (!this.active)
            throw new exceptions.TransactionInactive();
          assert(this._completion._state === null);
          idbtrans = this.idbtrans = idbtrans || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : idbdb.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }));
          idbtrans.onerror = wrap(function(ev) {
            preventDefault(ev);
            _this._reject(idbtrans.error);
          });
          idbtrans.onabort = wrap(function(ev) {
            preventDefault(ev);
            _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
            _this.active = false;
            _this.on("abort").fire(ev);
          });
          idbtrans.oncomplete = wrap(function() {
            _this.active = false;
            _this._resolve();
            if ("mutatedParts" in idbtrans) {
              globalEvents.storagemutated.fire(idbtrans["mutatedParts"]);
            }
          });
          return this;
        };
        Transaction2.prototype._promise = function(mode, fn, bWriteLock) {
          var _this = this;
          if (mode === "readwrite" && this.mode !== "readwrite")
            return rejection(new exceptions.ReadOnly("Transaction is readonly"));
          if (!this.active)
            return rejection(new exceptions.TransactionInactive());
          if (this._locked()) {
            return new DexiePromise(function(resolve, reject) {
              _this._blockedFuncs.push([function() {
                _this._promise(mode, fn, bWriteLock).then(resolve, reject);
              }, PSD]);
            });
          } else if (bWriteLock) {
            return newScope(function() {
              var p2 = new DexiePromise(function(resolve, reject) {
                _this._lock();
                var rv = fn(resolve, reject, _this);
                if (rv && rv.then)
                  rv.then(resolve, reject);
              });
              p2.finally(function() {
                return _this._unlock();
              });
              p2._lib = true;
              return p2;
            });
          } else {
            var p = new DexiePromise(function(resolve, reject) {
              var rv = fn(resolve, reject, _this);
              if (rv && rv.then)
                rv.then(resolve, reject);
            });
            p._lib = true;
            return p;
          }
        };
        Transaction2.prototype._root = function() {
          return this.parent ? this.parent._root() : this;
        };
        Transaction2.prototype.waitFor = function(promiseLike) {
          var root = this._root();
          var promise = DexiePromise.resolve(promiseLike);
          if (root._waitingFor) {
            root._waitingFor = root._waitingFor.then(function() {
              return promise;
            });
          } else {
            root._waitingFor = promise;
            root._waitingQueue = [];
            var store = root.idbtrans.objectStore(root.storeNames[0]);
            (function spin() {
              ++root._spinCount;
              while (root._waitingQueue.length)
                root._waitingQueue.shift()();
              if (root._waitingFor)
                store.get(-Infinity).onsuccess = spin;
            })();
          }
          var currentWaitPromise = root._waitingFor;
          return new DexiePromise(function(resolve, reject) {
            promise.then(function(res) {
              return root._waitingQueue.push(wrap(resolve.bind(null, res)));
            }, function(err) {
              return root._waitingQueue.push(wrap(reject.bind(null, err)));
            }).finally(function() {
              if (root._waitingFor === currentWaitPromise) {
                root._waitingFor = null;
              }
            });
          });
        };
        Transaction2.prototype.abort = function() {
          if (this.active) {
            this.active = false;
            if (this.idbtrans)
              this.idbtrans.abort();
            this._reject(new exceptions.Abort());
          }
        };
        Transaction2.prototype.table = function(tableName) {
          var memoizedTables = this._memoizedTables || (this._memoizedTables = {});
          if (hasOwn(memoizedTables, tableName))
            return memoizedTables[tableName];
          var tableSchema = this.schema[tableName];
          if (!tableSchema) {
            throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
          }
          var transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
          transactionBoundTable.core = this.db.core.table(tableName);
          memoizedTables[tableName] = transactionBoundTable;
          return transactionBoundTable;
        };
        return Transaction2;
      }();
      function createTransactionConstructor(db) {
        return makeClassConstructor(Transaction.prototype, function Transaction2(mode, storeNames, dbschema, chromeTransactionDurability, parent) {
          var _this = this;
          this.db = db;
          this.mode = mode;
          this.storeNames = storeNames;
          this.schema = dbschema;
          this.chromeTransactionDurability = chromeTransactionDurability;
          this.idbtrans = null;
          this.on = Events(this, "complete", "error", "abort");
          this.parent = parent || null;
          this.active = true;
          this._reculock = 0;
          this._blockedFuncs = [];
          this._resolve = null;
          this._reject = null;
          this._waitingFor = null;
          this._waitingQueue = null;
          this._spinCount = 0;
          this._completion = new DexiePromise(function(resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
          });
          this._completion.then(function() {
            _this.active = false;
            _this.on.complete.fire();
          }, function(e) {
            var wasActive = _this.active;
            _this.active = false;
            _this.on.error.fire(e);
            _this.parent ? _this.parent._reject(e) : wasActive && _this.idbtrans && _this.idbtrans.abort();
            return rejection(e);
          });
        });
      }
      function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey) {
        return {
          name,
          keyPath,
          unique,
          multi,
          auto,
          compound,
          src: (unique && !isPrimKey ? "&" : "") + (multi ? "*" : "") + (auto ? "++" : "") + nameFromKeyPath(keyPath)
        };
      }
      function nameFromKeyPath(keyPath) {
        return typeof keyPath === "string" ? keyPath : keyPath ? "[" + [].join.call(keyPath, "+") + "]" : "";
      }
      function createTableSchema(name, primKey, indexes) {
        return {
          name,
          primKey,
          indexes,
          mappedClass: null,
          idxByName: arrayToObject(indexes, function(index) {
            return [index.name, index];
          })
        };
      }
      function safariMultiStoreFix(storeNames) {
        return storeNames.length === 1 ? storeNames[0] : storeNames;
      }
      var getMaxKey = function(IdbKeyRange) {
        try {
          IdbKeyRange.only([[]]);
          getMaxKey = function() {
            return [[]];
          };
          return [[]];
        } catch (e) {
          getMaxKey = function() {
            return maxString;
          };
          return maxString;
        }
      };
      function getKeyExtractor(keyPath) {
        if (keyPath == null) {
          return function() {
            return void 0;
          };
        } else if (typeof keyPath === "string") {
          return getSinglePathKeyExtractor(keyPath);
        } else {
          return function(obj) {
            return getByKeyPath(obj, keyPath);
          };
        }
      }
      function getSinglePathKeyExtractor(keyPath) {
        var split = keyPath.split(".");
        if (split.length === 1) {
          return function(obj) {
            return obj[keyPath];
          };
        } else {
          return function(obj) {
            return getByKeyPath(obj, keyPath);
          };
        }
      }
      function arrayify(arrayLike) {
        return [].slice.call(arrayLike);
      }
      var _id_counter = 0;
      function getKeyPathAlias(keyPath) {
        return keyPath == null ? ":id" : typeof keyPath === "string" ? keyPath : "[".concat(keyPath.join("+"), "]");
      }
      function createDBCore(db, IdbKeyRange, tmpTrans) {
        function extractSchema(db2, trans) {
          var tables2 = arrayify(db2.objectStoreNames);
          return {
            schema: {
              name: db2.name,
              tables: tables2.map(function(table) {
                return trans.objectStore(table);
              }).map(function(store) {
                var keyPath = store.keyPath, autoIncrement = store.autoIncrement;
                var compound = isArray(keyPath);
                var outbound = keyPath == null;
                var indexByKeyPath = {};
                var result = {
                  name: store.name,
                  primaryKey: {
                    name: null,
                    isPrimaryKey: true,
                    outbound,
                    compound,
                    keyPath,
                    autoIncrement,
                    unique: true,
                    extractKey: getKeyExtractor(keyPath)
                  },
                  indexes: arrayify(store.indexNames).map(function(indexName) {
                    return store.index(indexName);
                  }).map(function(index) {
                    var name = index.name, unique = index.unique, multiEntry = index.multiEntry, keyPath2 = index.keyPath;
                    var compound2 = isArray(keyPath2);
                    var result2 = {
                      name,
                      compound: compound2,
                      keyPath: keyPath2,
                      unique,
                      multiEntry,
                      extractKey: getKeyExtractor(keyPath2)
                    };
                    indexByKeyPath[getKeyPathAlias(keyPath2)] = result2;
                    return result2;
                  }),
                  getIndexByKeyPath: function(keyPath2) {
                    return indexByKeyPath[getKeyPathAlias(keyPath2)];
                  }
                };
                indexByKeyPath[":id"] = result.primaryKey;
                if (keyPath != null) {
                  indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
                }
                return result;
              })
            },
            hasGetAll: tables2.length > 0 && "getAll" in trans.objectStore(tables2[0]) && !(typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
          };
        }
        function makeIDBKeyRange(range) {
          if (range.type === 3)
            return null;
          if (range.type === 4)
            throw new Error("Cannot convert never type to IDBKeyRange");
          var lower = range.lower, upper = range.upper, lowerOpen = range.lowerOpen, upperOpen = range.upperOpen;
          var idbRange = lower === void 0 ? upper === void 0 ? null : IdbKeyRange.upperBound(upper, !!upperOpen) : upper === void 0 ? IdbKeyRange.lowerBound(lower, !!lowerOpen) : IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
          return idbRange;
        }
        function createDbCoreTable(tableSchema) {
          var tableName = tableSchema.name;
          function mutate(_a3) {
            var trans = _a3.trans, type2 = _a3.type, keys2 = _a3.keys, values = _a3.values, range = _a3.range;
            return new Promise(function(resolve, reject) {
              resolve = wrap(resolve);
              var store = trans.objectStore(tableName);
              var outbound = store.keyPath == null;
              var isAddOrPut = type2 === "put" || type2 === "add";
              if (!isAddOrPut && type2 !== "delete" && type2 !== "deleteRange")
                throw new Error("Invalid operation type: " + type2);
              var length = (keys2 || values || { length: 1 }).length;
              if (keys2 && values && keys2.length !== values.length) {
                throw new Error("Given keys array must have same length as given values array.");
              }
              if (length === 0)
                return resolve({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
              var req;
              var reqs = [];
              var failures = [];
              var numFailures = 0;
              var errorHandler = function(event) {
                ++numFailures;
                preventDefault(event);
              };
              if (type2 === "deleteRange") {
                if (range.type === 4)
                  return resolve({ numFailures, failures, results: [], lastResult: void 0 });
                if (range.type === 3)
                  reqs.push(req = store.clear());
                else
                  reqs.push(req = store.delete(makeIDBKeyRange(range)));
              } else {
                var _a4 = isAddOrPut ? outbound ? [values, keys2] : [values, null] : [keys2, null], args1 = _a4[0], args2 = _a4[1];
                if (isAddOrPut) {
                  for (var i = 0; i < length; ++i) {
                    reqs.push(req = args2 && args2[i] !== void 0 ? store[type2](args1[i], args2[i]) : store[type2](args1[i]));
                    req.onerror = errorHandler;
                  }
                } else {
                  for (var i = 0; i < length; ++i) {
                    reqs.push(req = store[type2](args1[i]));
                    req.onerror = errorHandler;
                  }
                }
              }
              var done = function(event) {
                var lastResult = event.target.result;
                reqs.forEach(function(req2, i2) {
                  return req2.error != null && (failures[i2] = req2.error);
                });
                resolve({
                  numFailures,
                  failures,
                  results: type2 === "delete" ? keys2 : reqs.map(function(req2) {
                    return req2.result;
                  }),
                  lastResult
                });
              };
              req.onerror = function(event) {
                errorHandler(event);
                done(event);
              };
              req.onsuccess = done;
            });
          }
          function openCursor2(_a3) {
            var trans = _a3.trans, values = _a3.values, query2 = _a3.query, reverse = _a3.reverse, unique = _a3.unique;
            return new Promise(function(resolve, reject) {
              resolve = wrap(resolve);
              var index = query2.index, range = query2.range;
              var store = trans.objectStore(tableName);
              var source = index.isPrimaryKey ? store : store.index(index.name);
              var direction = reverse ? unique ? "prevunique" : "prev" : unique ? "nextunique" : "next";
              var req = values || !("openKeyCursor" in source) ? source.openCursor(makeIDBKeyRange(range), direction) : source.openKeyCursor(makeIDBKeyRange(range), direction);
              req.onerror = eventRejectHandler(reject);
              req.onsuccess = wrap(function(ev) {
                var cursor = req.result;
                if (!cursor) {
                  resolve(null);
                  return;
                }
                cursor.___id = ++_id_counter;
                cursor.done = false;
                var _cursorContinue = cursor.continue.bind(cursor);
                var _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
                if (_cursorContinuePrimaryKey)
                  _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
                var _cursorAdvance = cursor.advance.bind(cursor);
                var doThrowCursorIsNotStarted = function() {
                  throw new Error("Cursor not started");
                };
                var doThrowCursorIsStopped = function() {
                  throw new Error("Cursor not stopped");
                };
                cursor.trans = trans;
                cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
                cursor.fail = wrap(reject);
                cursor.next = function() {
                  var _this = this;
                  var gotOne = 1;
                  return this.start(function() {
                    return gotOne-- ? _this.continue() : _this.stop();
                  }).then(function() {
                    return _this;
                  });
                };
                cursor.start = function(callback) {
                  var iterationPromise = new Promise(function(resolveIteration, rejectIteration) {
                    resolveIteration = wrap(resolveIteration);
                    req.onerror = eventRejectHandler(rejectIteration);
                    cursor.fail = rejectIteration;
                    cursor.stop = function(value) {
                      cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                      resolveIteration(value);
                    };
                  });
                  var guardedCallback = function() {
                    if (req.result) {
                      try {
                        callback();
                      } catch (err) {
                        cursor.fail(err);
                      }
                    } else {
                      cursor.done = true;
                      cursor.start = function() {
                        throw new Error("Cursor behind last entry");
                      };
                      cursor.stop();
                    }
                  };
                  req.onsuccess = wrap(function(ev2) {
                    req.onsuccess = guardedCallback;
                    guardedCallback();
                  });
                  cursor.continue = _cursorContinue;
                  cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
                  cursor.advance = _cursorAdvance;
                  guardedCallback();
                  return iterationPromise;
                };
                resolve(cursor);
              }, reject);
            });
          }
          function query(hasGetAll2) {
            return function(request) {
              return new Promise(function(resolve, reject) {
                resolve = wrap(resolve);
                var trans = request.trans, values = request.values, limit = request.limit, query2 = request.query;
                var nonInfinitLimit = limit === Infinity ? void 0 : limit;
                var index = query2.index, range = query2.range;
                var store = trans.objectStore(tableName);
                var source = index.isPrimaryKey ? store : store.index(index.name);
                var idbKeyRange = makeIDBKeyRange(range);
                if (limit === 0)
                  return resolve({ result: [] });
                if (hasGetAll2) {
                  var req = values ? source.getAll(idbKeyRange, nonInfinitLimit) : source.getAllKeys(idbKeyRange, nonInfinitLimit);
                  req.onsuccess = function(event) {
                    return resolve({ result: event.target.result });
                  };
                  req.onerror = eventRejectHandler(reject);
                } else {
                  var count_1 = 0;
                  var req_1 = values || !("openKeyCursor" in source) ? source.openCursor(idbKeyRange) : source.openKeyCursor(idbKeyRange);
                  var result_1 = [];
                  req_1.onsuccess = function(event) {
                    var cursor = req_1.result;
                    if (!cursor)
                      return resolve({ result: result_1 });
                    result_1.push(values ? cursor.value : cursor.primaryKey);
                    if (++count_1 === limit)
                      return resolve({ result: result_1 });
                    cursor.continue();
                  };
                  req_1.onerror = eventRejectHandler(reject);
                }
              });
            };
          }
          return {
            name: tableName,
            schema: tableSchema,
            mutate,
            getMany: function(_a3) {
              var trans = _a3.trans, keys2 = _a3.keys;
              return new Promise(function(resolve, reject) {
                resolve = wrap(resolve);
                var store = trans.objectStore(tableName);
                var length = keys2.length;
                var result = new Array(length);
                var keyCount = 0;
                var callbackCount = 0;
                var req;
                var successHandler = function(event) {
                  var req2 = event.target;
                  if ((result[req2._pos] = req2.result) != null)
                    ;
                  if (++callbackCount === keyCount)
                    resolve(result);
                };
                var errorHandler = eventRejectHandler(reject);
                for (var i = 0; i < length; ++i) {
                  var key = keys2[i];
                  if (key != null) {
                    req = store.get(keys2[i]);
                    req._pos = i;
                    req.onsuccess = successHandler;
                    req.onerror = errorHandler;
                    ++keyCount;
                  }
                }
                if (keyCount === 0)
                  resolve(result);
              });
            },
            get: function(_a3) {
              var trans = _a3.trans, key = _a3.key;
              return new Promise(function(resolve, reject) {
                resolve = wrap(resolve);
                var store = trans.objectStore(tableName);
                var req = store.get(key);
                req.onsuccess = function(event) {
                  return resolve(event.target.result);
                };
                req.onerror = eventRejectHandler(reject);
              });
            },
            query: query(hasGetAll),
            openCursor: openCursor2,
            count: function(_a3) {
              var query2 = _a3.query, trans = _a3.trans;
              var index = query2.index, range = query2.range;
              return new Promise(function(resolve, reject) {
                var store = trans.objectStore(tableName);
                var source = index.isPrimaryKey ? store : store.index(index.name);
                var idbKeyRange = makeIDBKeyRange(range);
                var req = idbKeyRange ? source.count(idbKeyRange) : source.count();
                req.onsuccess = wrap(function(ev) {
                  return resolve(ev.target.result);
                });
                req.onerror = eventRejectHandler(reject);
              });
            }
          };
        }
        var _a2 = extractSchema(db, tmpTrans), schema = _a2.schema, hasGetAll = _a2.hasGetAll;
        var tables = schema.tables.map(function(tableSchema) {
          return createDbCoreTable(tableSchema);
        });
        var tableMap = {};
        tables.forEach(function(table) {
          return tableMap[table.name] = table;
        });
        return {
          stack: "dbcore",
          transaction: db.transaction.bind(db),
          table: function(name) {
            var result = tableMap[name];
            if (!result)
              throw new Error("Table '".concat(name, "' not found"));
            return tableMap[name];
          },
          MIN_KEY: -Infinity,
          MAX_KEY: getMaxKey(IdbKeyRange),
          schema
        };
      }
      function createMiddlewareStack(stackImpl, middlewares) {
        return middlewares.reduce(function(down, _a2) {
          var create = _a2.create;
          return __assign(__assign({}, down), create(down));
        }, stackImpl);
      }
      function createMiddlewareStacks(middlewares, idbdb, _a2, tmpTrans) {
        var IDBKeyRange = _a2.IDBKeyRange;
        _a2.indexedDB;
        var dbcore = createMiddlewareStack(createDBCore(idbdb, IDBKeyRange, tmpTrans), middlewares.dbcore);
        return {
          dbcore
        };
      }
      function generateMiddlewareStacks(db, tmpTrans) {
        var idbdb = tmpTrans.db;
        var stacks = createMiddlewareStacks(db._middlewares, idbdb, db._deps, tmpTrans);
        db.core = stacks.dbcore;
        db.tables.forEach(function(table) {
          var tableName = table.name;
          if (db.core.schema.tables.some(function(tbl) {
            return tbl.name === tableName;
          })) {
            table.core = db.core.table(tableName);
            if (db[tableName] instanceof db.Table) {
              db[tableName].core = table.core;
            }
          }
        });
      }
      function setApiOnPlace(db, objs, tableNames, dbschema) {
        tableNames.forEach(function(tableName) {
          var schema = dbschema[tableName];
          objs.forEach(function(obj) {
            var propDesc = getPropertyDescriptor(obj, tableName);
            if (!propDesc || "value" in propDesc && propDesc.value === void 0) {
              if (obj === db.Transaction.prototype || obj instanceof db.Transaction) {
                setProp(obj, tableName, {
                  get: function() {
                    return this.table(tableName);
                  },
                  set: function(value) {
                    defineProperty(this, tableName, { value, writable: true, configurable: true, enumerable: true });
                  }
                });
              } else {
                obj[tableName] = new db.Table(tableName, schema);
              }
            }
          });
        });
      }
      function removeTablesApi(db, objs) {
        objs.forEach(function(obj) {
          for (var key in obj) {
            if (obj[key] instanceof db.Table)
              delete obj[key];
          }
        });
      }
      function lowerVersionFirst(a, b) {
        return a._cfg.version - b._cfg.version;
      }
      function runUpgraders(db, oldVersion, idbUpgradeTrans, reject) {
        var globalSchema = db._dbSchema;
        if (idbUpgradeTrans.objectStoreNames.contains("$meta") && !globalSchema.$meta) {
          globalSchema.$meta = createTableSchema("$meta", parseIndexSyntax("")[0], []);
          db._storeNames.push("$meta");
        }
        var trans = db._createTransaction("readwrite", db._storeNames, globalSchema);
        trans.create(idbUpgradeTrans);
        trans._completion.catch(reject);
        var rejectTransaction = trans._reject.bind(trans);
        var transless = PSD.transless || PSD;
        newScope(function() {
          PSD.trans = trans;
          PSD.transless = transless;
          if (oldVersion === 0) {
            keys(globalSchema).forEach(function(tableName) {
              createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
            });
            generateMiddlewareStacks(db, idbUpgradeTrans);
            DexiePromise.follow(function() {
              return db.on.populate.fire(trans);
            }).catch(rejectTransaction);
          } else {
            generateMiddlewareStacks(db, idbUpgradeTrans);
            return getExistingVersion(db, trans, oldVersion).then(function(oldVersion2) {
              return updateTablesAndIndexes(db, oldVersion2, trans, idbUpgradeTrans);
            }).catch(rejectTransaction);
          }
        });
      }
      function patchCurrentVersion(db, idbUpgradeTrans) {
        createMissingTables(db._dbSchema, idbUpgradeTrans);
        if (idbUpgradeTrans.db.version % 10 === 0 && !idbUpgradeTrans.objectStoreNames.contains("$meta")) {
          idbUpgradeTrans.db.createObjectStore("$meta").add(Math.ceil(idbUpgradeTrans.db.version / 10 - 1), "version");
        }
        var globalSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
        adjustToExistingIndexNames(db, db._dbSchema, idbUpgradeTrans);
        var diff = getSchemaDiff(globalSchema, db._dbSchema);
        var _loop_1 = function(tableChange2) {
          if (tableChange2.change.length || tableChange2.recreate) {
            console.warn("Unable to patch indexes of table ".concat(tableChange2.name, " because it has changes on the type of index or primary key."));
            return { value: void 0 };
          }
          var store = idbUpgradeTrans.objectStore(tableChange2.name);
          tableChange2.add.forEach(function(idx) {
            if (debug2)
              console.debug("Dexie upgrade patch: Creating missing index ".concat(tableChange2.name, ".").concat(idx.src));
            addIndex(store, idx);
          });
        };
        for (var _i = 0, _a2 = diff.change; _i < _a2.length; _i++) {
          var tableChange = _a2[_i];
          var state_1 = _loop_1(tableChange);
          if (typeof state_1 === "object")
            return state_1.value;
        }
      }
      function getExistingVersion(db, trans, oldVersion) {
        if (trans.storeNames.includes("$meta")) {
          return trans.table("$meta").get("version").then(function(metaVersion) {
            return metaVersion != null ? metaVersion : oldVersion;
          });
        } else {
          return DexiePromise.resolve(oldVersion);
        }
      }
      function updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans) {
        var queue = [];
        var versions = db._versions;
        var globalSchema = db._dbSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
        var versToRun = versions.filter(function(v) {
          return v._cfg.version >= oldVersion;
        });
        if (versToRun.length === 0) {
          return DexiePromise.resolve();
        }
        versToRun.forEach(function(version) {
          queue.push(function() {
            var oldSchema = globalSchema;
            var newSchema = version._cfg.dbschema;
            adjustToExistingIndexNames(db, oldSchema, idbUpgradeTrans);
            adjustToExistingIndexNames(db, newSchema, idbUpgradeTrans);
            globalSchema = db._dbSchema = newSchema;
            var diff = getSchemaDiff(oldSchema, newSchema);
            diff.add.forEach(function(tuple) {
              createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
            });
            diff.change.forEach(function(change) {
              if (change.recreate) {
                throw new exceptions.Upgrade("Not yet support for changing primary key");
              } else {
                var store_1 = idbUpgradeTrans.objectStore(change.name);
                change.add.forEach(function(idx) {
                  return addIndex(store_1, idx);
                });
                change.change.forEach(function(idx) {
                  store_1.deleteIndex(idx.name);
                  addIndex(store_1, idx);
                });
                change.del.forEach(function(idxName) {
                  return store_1.deleteIndex(idxName);
                });
              }
            });
            var contentUpgrade = version._cfg.contentUpgrade;
            if (contentUpgrade && version._cfg.version > oldVersion) {
              generateMiddlewareStacks(db, idbUpgradeTrans);
              trans._memoizedTables = {};
              var upgradeSchema_1 = shallowClone(newSchema);
              diff.del.forEach(function(table) {
                upgradeSchema_1[table] = oldSchema[table];
              });
              removeTablesApi(db, [db.Transaction.prototype]);
              setApiOnPlace(db, [db.Transaction.prototype], keys(upgradeSchema_1), upgradeSchema_1);
              trans.schema = upgradeSchema_1;
              var contentUpgradeIsAsync_1 = isAsyncFunction(contentUpgrade);
              if (contentUpgradeIsAsync_1) {
                incrementExpectedAwaits();
              }
              var returnValue_1;
              var promiseFollowed = DexiePromise.follow(function() {
                returnValue_1 = contentUpgrade(trans);
                if (returnValue_1) {
                  if (contentUpgradeIsAsync_1) {
                    var decrementor = decrementExpectedAwaits.bind(null, null);
                    returnValue_1.then(decrementor, decrementor);
                  }
                }
              });
              return returnValue_1 && typeof returnValue_1.then === "function" ? DexiePromise.resolve(returnValue_1) : promiseFollowed.then(function() {
                return returnValue_1;
              });
            }
          });
          queue.push(function(idbtrans) {
            var newSchema = version._cfg.dbschema;
            deleteRemovedTables(newSchema, idbtrans);
            removeTablesApi(db, [db.Transaction.prototype]);
            setApiOnPlace(db, [db.Transaction.prototype], db._storeNames, db._dbSchema);
            trans.schema = db._dbSchema;
          });
          queue.push(function(idbtrans) {
            if (db.idbdb.objectStoreNames.contains("$meta")) {
              if (Math.ceil(db.idbdb.version / 10) === version._cfg.version) {
                db.idbdb.deleteObjectStore("$meta");
                delete db._dbSchema.$meta;
                db._storeNames = db._storeNames.filter(function(name) {
                  return name !== "$meta";
                });
              } else {
                idbtrans.objectStore("$meta").put(version._cfg.version, "version");
              }
            }
          });
        });
        function runQueue() {
          return queue.length ? DexiePromise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : DexiePromise.resolve();
        }
        return runQueue().then(function() {
          createMissingTables(globalSchema, idbUpgradeTrans);
        });
      }
      function getSchemaDiff(oldSchema, newSchema) {
        var diff = {
          del: [],
          add: [],
          change: []
        };
        var table;
        for (table in oldSchema) {
          if (!newSchema[table])
            diff.del.push(table);
        }
        for (table in newSchema) {
          var oldDef = oldSchema[table], newDef = newSchema[table];
          if (!oldDef) {
            diff.add.push([table, newDef]);
          } else {
            var change = {
              name: table,
              def: newDef,
              recreate: false,
              del: [],
              add: [],
              change: []
            };
            if ("" + (oldDef.primKey.keyPath || "") !== "" + (newDef.primKey.keyPath || "") || oldDef.primKey.auto !== newDef.primKey.auto) {
              change.recreate = true;
              diff.change.push(change);
            } else {
              var oldIndexes = oldDef.idxByName;
              var newIndexes = newDef.idxByName;
              var idxName = void 0;
              for (idxName in oldIndexes) {
                if (!newIndexes[idxName])
                  change.del.push(idxName);
              }
              for (idxName in newIndexes) {
                var oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
                if (!oldIdx)
                  change.add.push(newIdx);
                else if (oldIdx.src !== newIdx.src)
                  change.change.push(newIdx);
              }
              if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                diff.change.push(change);
              }
            }
          }
        }
        return diff;
      }
      function createTable(idbtrans, tableName, primKey, indexes) {
        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
        indexes.forEach(function(idx) {
          return addIndex(store, idx);
        });
        return store;
      }
      function createMissingTables(newSchema, idbtrans) {
        keys(newSchema).forEach(function(tableName) {
          if (!idbtrans.db.objectStoreNames.contains(tableName)) {
            if (debug2)
              console.debug("Dexie: Creating missing table", tableName);
            createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
          }
        });
      }
      function deleteRemovedTables(newSchema, idbtrans) {
        [].slice.call(idbtrans.db.objectStoreNames).forEach(function(storeName) {
          return newSchema[storeName] == null && idbtrans.db.deleteObjectStore(storeName);
        });
      }
      function addIndex(store, idx) {
        store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
      }
      function buildGlobalSchema(db, idbdb, tmpTrans) {
        var globalSchema = {};
        var dbStoreNames = slice(idbdb.objectStoreNames, 0);
        dbStoreNames.forEach(function(storeName) {
          var store = tmpTrans.objectStore(storeName);
          var keyPath = store.keyPath;
          var primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", true, false, !!store.autoIncrement, keyPath && typeof keyPath !== "string", true);
          var indexes = [];
          for (var j = 0; j < store.indexNames.length; ++j) {
            var idbindex = store.index(store.indexNames[j]);
            keyPath = idbindex.keyPath;
            var index = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
            indexes.push(index);
          }
          globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
        });
        return globalSchema;
      }
      function readGlobalSchema(db, idbdb, tmpTrans) {
        db.verno = idbdb.version / 10;
        var globalSchema = db._dbSchema = buildGlobalSchema(db, idbdb, tmpTrans);
        db._storeNames = slice(idbdb.objectStoreNames, 0);
        setApiOnPlace(db, [db._allTables], keys(globalSchema), globalSchema);
      }
      function verifyInstalledSchema(db, tmpTrans) {
        var installedSchema = buildGlobalSchema(db, db.idbdb, tmpTrans);
        var diff = getSchemaDiff(installedSchema, db._dbSchema);
        return !(diff.add.length || diff.change.some(function(ch) {
          return ch.add.length || ch.change.length;
        }));
      }
      function adjustToExistingIndexNames(db, schema, idbtrans) {
        var storeNames = idbtrans.db.objectStoreNames;
        for (var i = 0; i < storeNames.length; ++i) {
          var storeName = storeNames[i];
          var store = idbtrans.objectStore(storeName);
          db._hasGetAll = "getAll" in store;
          for (var j = 0; j < store.indexNames.length; ++j) {
            var indexName = store.indexNames[j];
            var keyPath = store.index(indexName).keyPath;
            var dexieName = typeof keyPath === "string" ? keyPath : "[" + slice(keyPath).join("+") + "]";
            if (schema[storeName]) {
              var indexSpec = schema[storeName].idxByName[dexieName];
              if (indexSpec) {
                indexSpec.name = indexName;
                delete schema[storeName].idxByName[dexieName];
                schema[storeName].idxByName[indexName] = indexSpec;
              }
            }
          }
        }
        if (typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
          db._hasGetAll = false;
        }
      }
      function parseIndexSyntax(primKeyAndIndexes) {
        return primKeyAndIndexes.split(",").map(function(index, indexNum) {
          index = index.trim();
          var name = index.replace(/([&*]|\+\+)/g, "");
          var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split("+") : name;
          return createIndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), indexNum === 0);
        });
      }
      var Version = function() {
        function Version2() {
        }
        Version2.prototype._parseStoresSpec = function(stores, outSchema) {
          keys(stores).forEach(function(tableName) {
            if (stores[tableName] !== null) {
              var indexes = parseIndexSyntax(stores[tableName]);
              var primKey = indexes.shift();
              primKey.unique = true;
              if (primKey.multi)
                throw new exceptions.Schema("Primary key cannot be multi-valued");
              indexes.forEach(function(idx) {
                if (idx.auto)
                  throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                if (!idx.keyPath)
                  throw new exceptions.Schema("Index must have a name and cannot be an empty string");
              });
              outSchema[tableName] = createTableSchema(tableName, primKey, indexes);
            }
          });
        };
        Version2.prototype.stores = function(stores) {
          var db = this.db;
          this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
          var versions = db._versions;
          var storesSpec = {};
          var dbschema = {};
          versions.forEach(function(version) {
            extend(storesSpec, version._cfg.storesSource);
            dbschema = version._cfg.dbschema = {};
            version._parseStoresSpec(storesSpec, dbschema);
          });
          db._dbSchema = dbschema;
          removeTablesApi(db, [db._allTables, db, db.Transaction.prototype]);
          setApiOnPlace(db, [db._allTables, db, db.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
          db._storeNames = keys(dbschema);
          return this;
        };
        Version2.prototype.upgrade = function(upgradeFunction) {
          this._cfg.contentUpgrade = promisableChain(this._cfg.contentUpgrade || nop, upgradeFunction);
          return this;
        };
        return Version2;
      }();
      function createVersionConstructor(db) {
        return makeClassConstructor(Version.prototype, function Version2(versionNumber) {
          this.db = db;
          this._cfg = {
            version: versionNumber,
            storesSource: null,
            dbschema: {},
            tables: {},
            contentUpgrade: null
          };
        });
      }
      function getDbNamesTable(indexedDB2, IDBKeyRange) {
        var dbNamesDB = indexedDB2["_dbNamesDB"];
        if (!dbNamesDB) {
          dbNamesDB = indexedDB2["_dbNamesDB"] = new Dexie$1(DBNAMES_DB, {
            addons: [],
            indexedDB: indexedDB2,
            IDBKeyRange
          });
          dbNamesDB.version(1).stores({ dbnames: "name" });
        }
        return dbNamesDB.table("dbnames");
      }
      function hasDatabasesNative(indexedDB2) {
        return indexedDB2 && typeof indexedDB2.databases === "function";
      }
      function getDatabaseNames(_a2) {
        var indexedDB2 = _a2.indexedDB, IDBKeyRange = _a2.IDBKeyRange;
        return hasDatabasesNative(indexedDB2) ? Promise.resolve(indexedDB2.databases()).then(function(infos) {
          return infos.map(function(info) {
            return info.name;
          }).filter(function(name) {
            return name !== DBNAMES_DB;
          });
        }) : getDbNamesTable(indexedDB2, IDBKeyRange).toCollection().primaryKeys();
      }
      function _onDatabaseCreated(_a2, name) {
        var indexedDB2 = _a2.indexedDB, IDBKeyRange = _a2.IDBKeyRange;
        !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).put({ name }).catch(nop);
      }
      function _onDatabaseDeleted(_a2, name) {
        var indexedDB2 = _a2.indexedDB, IDBKeyRange = _a2.IDBKeyRange;
        !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).delete(name).catch(nop);
      }
      function vip(fn) {
        return newScope(function() {
          PSD.letThrough = true;
          return fn();
        });
      }
      function idbReady() {
        var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
        if (!isSafari || !indexedDB.databases)
          return Promise.resolve();
        var intervalId;
        return new Promise(function(resolve) {
          var tryIdb = function() {
            return indexedDB.databases().finally(resolve);
          };
          intervalId = setInterval(tryIdb, 100);
          tryIdb();
        }).finally(function() {
          return clearInterval(intervalId);
        });
      }
      var _a;
      function isEmptyRange(node) {
        return !("from" in node);
      }
      var RangeSet2 = function(fromOrTree, to) {
        if (this) {
          extend(this, arguments.length ? { d: 1, from: fromOrTree, to: arguments.length > 1 ? to : fromOrTree } : { d: 0 });
        } else {
          var rv = new RangeSet2();
          if (fromOrTree && "d" in fromOrTree) {
            extend(rv, fromOrTree);
          }
          return rv;
        }
      };
      props(RangeSet2.prototype, (_a = {
        add: function(rangeSet) {
          mergeRanges2(this, rangeSet);
          return this;
        },
        addKey: function(key) {
          addRange(this, key, key);
          return this;
        },
        addKeys: function(keys2) {
          var _this = this;
          keys2.forEach(function(key) {
            return addRange(_this, key, key);
          });
          return this;
        },
        hasKey: function(key) {
          var node = getRangeSetIterator(this).next(key).value;
          return node && cmp2(node.from, key) <= 0 && cmp2(node.to, key) >= 0;
        }
      }, _a[iteratorSymbol] = function() {
        return getRangeSetIterator(this);
      }, _a));
      function addRange(target, from, to) {
        var diff = cmp2(from, to);
        if (isNaN(diff))
          return;
        if (diff > 0)
          throw RangeError();
        if (isEmptyRange(target))
          return extend(target, { from, to, d: 1 });
        var left = target.l;
        var right = target.r;
        if (cmp2(to, target.from) < 0) {
          left ? addRange(left, from, to) : target.l = { from, to, d: 1, l: null, r: null };
          return rebalance(target);
        }
        if (cmp2(from, target.to) > 0) {
          right ? addRange(right, from, to) : target.r = { from, to, d: 1, l: null, r: null };
          return rebalance(target);
        }
        if (cmp2(from, target.from) < 0) {
          target.from = from;
          target.l = null;
          target.d = right ? right.d + 1 : 1;
        }
        if (cmp2(to, target.to) > 0) {
          target.to = to;
          target.r = null;
          target.d = target.l ? target.l.d + 1 : 1;
        }
        var rightWasCutOff = !target.r;
        if (left && !target.l) {
          mergeRanges2(target, left);
        }
        if (right && rightWasCutOff) {
          mergeRanges2(target, right);
        }
      }
      function mergeRanges2(target, newSet) {
        function _addRangeSet(target2, _a2) {
          var from = _a2.from, to = _a2.to, l = _a2.l, r = _a2.r;
          addRange(target2, from, to);
          if (l)
            _addRangeSet(target2, l);
          if (r)
            _addRangeSet(target2, r);
        }
        if (!isEmptyRange(newSet))
          _addRangeSet(target, newSet);
      }
      function rangesOverlap2(rangeSet1, rangeSet2) {
        var i1 = getRangeSetIterator(rangeSet2);
        var nextResult1 = i1.next();
        if (nextResult1.done)
          return false;
        var a = nextResult1.value;
        var i2 = getRangeSetIterator(rangeSet1);
        var nextResult2 = i2.next(a.from);
        var b = nextResult2.value;
        while (!nextResult1.done && !nextResult2.done) {
          if (cmp2(b.from, a.to) <= 0 && cmp2(b.to, a.from) >= 0)
            return true;
          cmp2(a.from, b.from) < 0 ? a = (nextResult1 = i1.next(b.from)).value : b = (nextResult2 = i2.next(a.from)).value;
        }
        return false;
      }
      function getRangeSetIterator(node) {
        var state = isEmptyRange(node) ? null : { s: 0, n: node };
        return {
          next: function(key) {
            var keyProvided = arguments.length > 0;
            while (state) {
              switch (state.s) {
                case 0:
                  state.s = 1;
                  if (keyProvided) {
                    while (state.n.l && cmp2(key, state.n.from) < 0)
                      state = { up: state, n: state.n.l, s: 1 };
                  } else {
                    while (state.n.l)
                      state = { up: state, n: state.n.l, s: 1 };
                  }
                case 1:
                  state.s = 2;
                  if (!keyProvided || cmp2(key, state.n.to) <= 0)
                    return { value: state.n, done: false };
                case 2:
                  if (state.n.r) {
                    state.s = 3;
                    state = { up: state, n: state.n.r, s: 0 };
                    continue;
                  }
                case 3:
                  state = state.up;
              }
            }
            return { done: true };
          }
        };
      }
      function rebalance(target) {
        var _a2, _b;
        var diff = (((_a2 = target.r) === null || _a2 === void 0 ? void 0 : _a2.d) || 0) - (((_b = target.l) === null || _b === void 0 ? void 0 : _b.d) || 0);
        var r = diff > 1 ? "r" : diff < -1 ? "l" : "";
        if (r) {
          var l = r === "r" ? "l" : "r";
          var rootClone = __assign({}, target);
          var oldRootRight = target[r];
          target.from = oldRootRight.from;
          target.to = oldRootRight.to;
          target[r] = oldRootRight[r];
          rootClone[r] = oldRootRight[l];
          target[l] = rootClone;
          rootClone.d = computeDepth(rootClone);
        }
        target.d = computeDepth(target);
      }
      function computeDepth(_a2) {
        var r = _a2.r, l = _a2.l;
        return (r ? l ? Math.max(r.d, l.d) : r.d : l ? l.d : 0) + 1;
      }
      function extendObservabilitySet(target, newSet) {
        keys(newSet).forEach(function(part) {
          if (target[part])
            mergeRanges2(target[part], newSet[part]);
          else
            target[part] = cloneSimpleObjectTree(newSet[part]);
        });
        return target;
      }
      function obsSetsOverlap(os1, os2) {
        return os1.all || os2.all || Object.keys(os1).some(function(key) {
          return os2[key] && rangesOverlap2(os2[key], os1[key]);
        });
      }
      var cache = {};
      var unsignaledParts = {};
      var isTaskEnqueued = false;
      function signalSubscribersLazily(part, optimistic) {
        extendObservabilitySet(unsignaledParts, part);
        if (!isTaskEnqueued) {
          isTaskEnqueued = true;
          setTimeout(function() {
            isTaskEnqueued = false;
            var parts = unsignaledParts;
            unsignaledParts = {};
            signalSubscribersNow(parts, false);
          }, 0);
        }
      }
      function signalSubscribersNow(updatedParts, deleteAffectedCacheEntries) {
        if (deleteAffectedCacheEntries === void 0) {
          deleteAffectedCacheEntries = false;
        }
        var queriesToSignal = /* @__PURE__ */ new Set();
        if (updatedParts.all) {
          for (var _i = 0, _a2 = Object.values(cache); _i < _a2.length; _i++) {
            var tblCache = _a2[_i];
            collectTableSubscribers(tblCache, updatedParts, queriesToSignal, deleteAffectedCacheEntries);
          }
        } else {
          for (var key in updatedParts) {
            var parts = /^idb\:\/\/(.*)\/(.*)\//.exec(key);
            if (parts) {
              var dbName = parts[1], tableName = parts[2];
              var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
              if (tblCache)
                collectTableSubscribers(tblCache, updatedParts, queriesToSignal, deleteAffectedCacheEntries);
            }
          }
        }
        queriesToSignal.forEach(function(requery) {
          return requery();
        });
      }
      function collectTableSubscribers(tblCache, updatedParts, outQueriesToSignal, deleteAffectedCacheEntries) {
        var updatedEntryLists = [];
        for (var _i = 0, _a2 = Object.entries(tblCache.queries.query); _i < _a2.length; _i++) {
          var _b = _a2[_i], indexName = _b[0], entries = _b[1];
          var filteredEntries = [];
          for (var _c = 0, entries_1 = entries; _c < entries_1.length; _c++) {
            var entry = entries_1[_c];
            if (obsSetsOverlap(updatedParts, entry.obsSet)) {
              entry.subscribers.forEach(function(requery) {
                return outQueriesToSignal.add(requery);
              });
            } else if (deleteAffectedCacheEntries) {
              filteredEntries.push(entry);
            }
          }
          if (deleteAffectedCacheEntries)
            updatedEntryLists.push([indexName, filteredEntries]);
        }
        if (deleteAffectedCacheEntries) {
          for (var _d = 0, updatedEntryLists_1 = updatedEntryLists; _d < updatedEntryLists_1.length; _d++) {
            var _e = updatedEntryLists_1[_d], indexName = _e[0], filteredEntries = _e[1];
            tblCache.queries.query[indexName] = filteredEntries;
          }
        }
      }
      function dexieOpen(db) {
        var state = db._state;
        var indexedDB2 = db._deps.indexedDB;
        if (state.isBeingOpened || db.idbdb)
          return state.dbReadyPromise.then(function() {
            return state.dbOpenError ? rejection(state.dbOpenError) : db;
          });
        state.isBeingOpened = true;
        state.dbOpenError = null;
        state.openComplete = false;
        var openCanceller = state.openCanceller;
        var nativeVerToOpen = Math.round(db.verno * 10);
        var schemaPatchMode = false;
        function throwIfCancelled() {
          if (state.openCanceller !== openCanceller)
            throw new exceptions.DatabaseClosed("db.open() was cancelled");
        }
        var resolveDbReady = state.dbReadyResolve, upgradeTransaction = null, wasCreated = false;
        var tryOpenDB = function() {
          return new DexiePromise(function(resolve, reject) {
            throwIfCancelled();
            if (!indexedDB2)
              throw new exceptions.MissingAPI();
            var dbName = db.name;
            var req = state.autoSchema || !nativeVerToOpen ? indexedDB2.open(dbName) : indexedDB2.open(dbName, nativeVerToOpen);
            if (!req)
              throw new exceptions.MissingAPI();
            req.onerror = eventRejectHandler(reject);
            req.onblocked = wrap(db._fireOnBlocked);
            req.onupgradeneeded = wrap(function(e) {
              upgradeTransaction = req.transaction;
              if (state.autoSchema && !db._options.allowEmptyDB) {
                req.onerror = preventDefault;
                upgradeTransaction.abort();
                req.result.close();
                var delreq = indexedDB2.deleteDatabase(dbName);
                delreq.onsuccess = delreq.onerror = wrap(function() {
                  reject(new exceptions.NoSuchDatabase("Database ".concat(dbName, " doesnt exist")));
                });
              } else {
                upgradeTransaction.onerror = eventRejectHandler(reject);
                var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
                wasCreated = oldVer < 1;
                db.idbdb = req.result;
                if (schemaPatchMode) {
                  patchCurrentVersion(db, upgradeTransaction);
                }
                runUpgraders(db, oldVer / 10, upgradeTransaction, reject);
              }
            }, reject);
            req.onsuccess = wrap(function() {
              upgradeTransaction = null;
              var idbdb = db.idbdb = req.result;
              var objectStoreNames = slice(idbdb.objectStoreNames);
              if (objectStoreNames.length > 0)
                try {
                  var tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), "readonly");
                  if (state.autoSchema)
                    readGlobalSchema(db, idbdb, tmpTrans);
                  else {
                    adjustToExistingIndexNames(db, db._dbSchema, tmpTrans);
                    if (!verifyInstalledSchema(db, tmpTrans) && !schemaPatchMode) {
                      console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this.");
                      idbdb.close();
                      nativeVerToOpen = idbdb.version + 1;
                      schemaPatchMode = true;
                      return resolve(tryOpenDB());
                    }
                  }
                  generateMiddlewareStacks(db, tmpTrans);
                } catch (e) {
                }
              connections.push(db);
              idbdb.onversionchange = wrap(function(ev) {
                state.vcFired = true;
                db.on("versionchange").fire(ev);
              });
              idbdb.onclose = wrap(function(ev) {
                db.on("close").fire(ev);
              });
              if (wasCreated)
                _onDatabaseCreated(db._deps, dbName);
              resolve();
            }, reject);
          }).catch(function(err) {
            switch (err === null || err === void 0 ? void 0 : err.name) {
              case "UnknownError":
                if (state.PR1398_maxLoop > 0) {
                  state.PR1398_maxLoop--;
                  console.warn("Dexie: Workaround for Chrome UnknownError on open()");
                  return tryOpenDB();
                }
                break;
              case "VersionError":
                if (nativeVerToOpen > 0) {
                  nativeVerToOpen = 0;
                  return tryOpenDB();
                }
                break;
            }
            return DexiePromise.reject(err);
          });
        };
        return DexiePromise.race([
          openCanceller,
          (typeof navigator === "undefined" ? DexiePromise.resolve() : idbReady()).then(tryOpenDB)
        ]).then(function() {
          throwIfCancelled();
          state.onReadyBeingFired = [];
          return DexiePromise.resolve(vip(function() {
            return db.on.ready.fire(db.vip);
          })).then(function fireRemainders() {
            if (state.onReadyBeingFired.length > 0) {
              var remainders_1 = state.onReadyBeingFired.reduce(promisableChain, nop);
              state.onReadyBeingFired = [];
              return DexiePromise.resolve(vip(function() {
                return remainders_1(db.vip);
              })).then(fireRemainders);
            }
          });
        }).finally(function() {
          if (state.openCanceller === openCanceller) {
            state.onReadyBeingFired = null;
            state.isBeingOpened = false;
          }
        }).catch(function(err) {
          state.dbOpenError = err;
          try {
            upgradeTransaction && upgradeTransaction.abort();
          } catch (_a2) {
          }
          if (openCanceller === state.openCanceller) {
            db._close();
          }
          return rejection(err);
        }).finally(function() {
          state.openComplete = true;
          resolveDbReady();
        }).then(function() {
          if (wasCreated) {
            var everything_1 = {};
            db.tables.forEach(function(table) {
              table.schema.indexes.forEach(function(idx) {
                if (idx.name)
                  everything_1["idb://".concat(db.name, "/").concat(table.name, "/").concat(idx.name)] = new RangeSet2(-Infinity, [[[]]]);
              });
              everything_1["idb://".concat(db.name, "/").concat(table.name, "/")] = everything_1["idb://".concat(db.name, "/").concat(table.name, "/:dels")] = new RangeSet2(-Infinity, [[[]]]);
            });
            globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME).fire(everything_1);
            signalSubscribersNow(everything_1, true);
          }
          return db;
        });
      }
      function awaitIterator(iterator) {
        var callNext = function(result) {
          return iterator.next(result);
        }, doThrow = function(error) {
          return iterator.throw(error);
        }, onSuccess = step(callNext), onError = step(doThrow);
        function step(getNext) {
          return function(val) {
            var next = getNext(val), value = next.value;
            return next.done ? value : !value || typeof value.then !== "function" ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
          };
        }
        return step(callNext)();
      }
      function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
        var i = arguments.length;
        if (i < 2)
          throw new exceptions.InvalidArgument("Too few arguments");
        var args = new Array(i - 1);
        while (--i)
          args[i - 1] = arguments[i];
        scopeFunc = args.pop();
        var tables = flatten(args);
        return [mode, tables, scopeFunc];
      }
      function enterTransactionScope(db, mode, storeNames, parentTransaction, scopeFunc) {
        return DexiePromise.resolve().then(function() {
          var transless = PSD.transless || PSD;
          var trans = db._createTransaction(mode, storeNames, db._dbSchema, parentTransaction);
          trans.explicit = true;
          var zoneProps = {
            trans,
            transless
          };
          if (parentTransaction) {
            trans.idbtrans = parentTransaction.idbtrans;
          } else {
            try {
              trans.create();
              trans.idbtrans._explicit = true;
              db._state.PR1398_maxLoop = 3;
            } catch (ex) {
              if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
                console.warn("Dexie: Need to reopen db");
                db.close({ disableAutoOpen: false });
                return db.open().then(function() {
                  return enterTransactionScope(db, mode, storeNames, null, scopeFunc);
                });
              }
              return rejection(ex);
            }
          }
          var scopeFuncIsAsync = isAsyncFunction(scopeFunc);
          if (scopeFuncIsAsync) {
            incrementExpectedAwaits();
          }
          var returnValue;
          var promiseFollowed = DexiePromise.follow(function() {
            returnValue = scopeFunc.call(trans, trans);
            if (returnValue) {
              if (scopeFuncIsAsync) {
                var decrementor = decrementExpectedAwaits.bind(null, null);
                returnValue.then(decrementor, decrementor);
              } else if (typeof returnValue.next === "function" && typeof returnValue.throw === "function") {
                returnValue = awaitIterator(returnValue);
              }
            }
          }, zoneProps);
          return (returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue).then(function(x) {
            return trans.active ? x : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
          }) : promiseFollowed.then(function() {
            return returnValue;
          })).then(function(x) {
            if (parentTransaction)
              trans._resolve();
            return trans._completion.then(function() {
              return x;
            });
          }).catch(function(e) {
            trans._reject(e);
            return rejection(e);
          });
        });
      }
      function pad(a, value, count) {
        var result = isArray(a) ? a.slice() : [a];
        for (var i = 0; i < count; ++i)
          result.push(value);
        return result;
      }
      function createVirtualIndexMiddleware(down) {
        return __assign(__assign({}, down), { table: function(tableName) {
          var table = down.table(tableName);
          var schema = table.schema;
          var indexLookup = {};
          var allVirtualIndexes = [];
          function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
            var keyPathAlias = getKeyPathAlias(keyPath);
            var indexList = indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || [];
            var keyLength = keyPath == null ? 0 : typeof keyPath === "string" ? 1 : keyPath.length;
            var isVirtual = keyTail > 0;
            var virtualIndex = __assign(__assign({}, lowLevelIndex), { name: isVirtual ? "".concat(keyPathAlias, "(virtual-from:").concat(lowLevelIndex.name, ")") : lowLevelIndex.name, lowLevelIndex, isVirtual, keyTail, keyLength, extractKey: getKeyExtractor(keyPath), unique: !isVirtual && lowLevelIndex.unique });
            indexList.push(virtualIndex);
            if (!virtualIndex.isPrimaryKey) {
              allVirtualIndexes.push(virtualIndex);
            }
            if (keyLength > 1) {
              var virtualKeyPath = keyLength === 2 ? keyPath[0] : keyPath.slice(0, keyLength - 1);
              addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
            }
            indexList.sort(function(a, b) {
              return a.keyTail - b.keyTail;
            });
            return virtualIndex;
          }
          var primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
          indexLookup[":id"] = [primaryKey];
          for (var _i = 0, _a2 = schema.indexes; _i < _a2.length; _i++) {
            var index = _a2[_i];
            addVirtualIndexes(index.keyPath, 0, index);
          }
          function findBestIndex(keyPath) {
            var result2 = indexLookup[getKeyPathAlias(keyPath)];
            return result2 && result2[0];
          }
          function translateRange(range, keyTail) {
            return {
              type: range.type === 1 ? 2 : range.type,
              lower: pad(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
              lowerOpen: true,
              upper: pad(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
              upperOpen: true
            };
          }
          function translateRequest(req) {
            var index2 = req.query.index;
            return index2.isVirtual ? __assign(__assign({}, req), { query: {
              index: index2.lowLevelIndex,
              range: translateRange(req.query.range, index2.keyTail)
            } }) : req;
          }
          var result = __assign(__assign({}, table), { schema: __assign(__assign({}, schema), { primaryKey, indexes: allVirtualIndexes, getIndexByKeyPath: findBestIndex }), count: function(req) {
            return table.count(translateRequest(req));
          }, query: function(req) {
            return table.query(translateRequest(req));
          }, openCursor: function(req) {
            var _a3 = req.query.index, keyTail = _a3.keyTail, isVirtual = _a3.isVirtual, keyLength = _a3.keyLength;
            if (!isVirtual)
              return table.openCursor(req);
            function createVirtualCursor(cursor) {
              function _continue(key) {
                key != null ? cursor.continue(pad(key, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) : req.unique ? cursor.continue(cursor.key.slice(0, keyLength).concat(req.reverse ? down.MIN_KEY : down.MAX_KEY, keyTail)) : cursor.continue();
              }
              var virtualCursor = Object.create(cursor, {
                continue: { value: _continue },
                continuePrimaryKey: {
                  value: function(key, primaryKey2) {
                    cursor.continuePrimaryKey(pad(key, down.MAX_KEY, keyTail), primaryKey2);
                  }
                },
                primaryKey: {
                  get: function() {
                    return cursor.primaryKey;
                  }
                },
                key: {
                  get: function() {
                    var key = cursor.key;
                    return keyLength === 1 ? key[0] : key.slice(0, keyLength);
                  }
                },
                value: {
                  get: function() {
                    return cursor.value;
                  }
                }
              });
              return virtualCursor;
            }
            return table.openCursor(translateRequest(req)).then(function(cursor) {
              return cursor && createVirtualCursor(cursor);
            });
          } });
          return result;
        } });
      }
      var virtualIndexMiddleware = {
        stack: "dbcore",
        name: "VirtualIndexMiddleware",
        level: 1,
        create: createVirtualIndexMiddleware
      };
      function getObjectDiff(a, b, rv, prfx) {
        rv = rv || {};
        prfx = prfx || "";
        keys(a).forEach(function(prop) {
          if (!hasOwn(b, prop)) {
            rv[prfx + prop] = void 0;
          } else {
            var ap = a[prop], bp = b[prop];
            if (typeof ap === "object" && typeof bp === "object" && ap && bp) {
              var apTypeName = toStringTag(ap);
              var bpTypeName = toStringTag(bp);
              if (apTypeName !== bpTypeName) {
                rv[prfx + prop] = b[prop];
              } else if (apTypeName === "Object") {
                getObjectDiff(ap, bp, rv, prfx + prop + ".");
              } else if (ap !== bp) {
                rv[prfx + prop] = b[prop];
              }
            } else if (ap !== bp)
              rv[prfx + prop] = b[prop];
          }
        });
        keys(b).forEach(function(prop) {
          if (!hasOwn(a, prop)) {
            rv[prfx + prop] = b[prop];
          }
        });
        return rv;
      }
      function getEffectiveKeys(primaryKey, req) {
        if (req.type === "delete")
          return req.keys;
        return req.keys || req.values.map(primaryKey.extractKey);
      }
      var hooksMiddleware = {
        stack: "dbcore",
        name: "HooksMiddleware",
        level: 2,
        create: function(downCore) {
          return __assign(__assign({}, downCore), { table: function(tableName) {
            var downTable = downCore.table(tableName);
            var primaryKey = downTable.schema.primaryKey;
            var tableMiddleware = __assign(__assign({}, downTable), { mutate: function(req) {
              var dxTrans = PSD.trans;
              var _a2 = dxTrans.table(tableName).hook, deleting = _a2.deleting, creating = _a2.creating, updating = _a2.updating;
              switch (req.type) {
                case "add":
                  if (creating.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return addPutOrDelete(req);
                  }, true);
                case "put":
                  if (creating.fire === nop && updating.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return addPutOrDelete(req);
                  }, true);
                case "delete":
                  if (deleting.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return addPutOrDelete(req);
                  }, true);
                case "deleteRange":
                  if (deleting.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", function() {
                    return deleteRange(req);
                  }, true);
              }
              return downTable.mutate(req);
              function addPutOrDelete(req2) {
                var dxTrans2 = PSD.trans;
                var keys2 = req2.keys || getEffectiveKeys(primaryKey, req2);
                if (!keys2)
                  throw new Error("Keys missing");
                req2 = req2.type === "add" || req2.type === "put" ? __assign(__assign({}, req2), { keys: keys2 }) : __assign({}, req2);
                if (req2.type !== "delete")
                  req2.values = __spreadArray([], req2.values, true);
                if (req2.keys)
                  req2.keys = __spreadArray([], req2.keys, true);
                return getExistingValues(downTable, req2, keys2).then(function(existingValues) {
                  var contexts = keys2.map(function(key, i) {
                    var existingValue = existingValues[i];
                    var ctx = { onerror: null, onsuccess: null };
                    if (req2.type === "delete") {
                      deleting.fire.call(ctx, key, existingValue, dxTrans2);
                    } else if (req2.type === "add" || existingValue === void 0) {
                      var generatedPrimaryKey = creating.fire.call(ctx, key, req2.values[i], dxTrans2);
                      if (key == null && generatedPrimaryKey != null) {
                        key = generatedPrimaryKey;
                        req2.keys[i] = key;
                        if (!primaryKey.outbound) {
                          setByKeyPath(req2.values[i], primaryKey.keyPath, key);
                        }
                      }
                    } else {
                      var objectDiff = getObjectDiff(existingValue, req2.values[i]);
                      var additionalChanges_1 = updating.fire.call(ctx, objectDiff, key, existingValue, dxTrans2);
                      if (additionalChanges_1) {
                        var requestedValue_1 = req2.values[i];
                        Object.keys(additionalChanges_1).forEach(function(keyPath) {
                          if (hasOwn(requestedValue_1, keyPath)) {
                            requestedValue_1[keyPath] = additionalChanges_1[keyPath];
                          } else {
                            setByKeyPath(requestedValue_1, keyPath, additionalChanges_1[keyPath]);
                          }
                        });
                      }
                    }
                    return ctx;
                  });
                  return downTable.mutate(req2).then(function(_a3) {
                    var failures = _a3.failures, results = _a3.results, numFailures = _a3.numFailures, lastResult = _a3.lastResult;
                    for (var i = 0; i < keys2.length; ++i) {
                      var primKey = results ? results[i] : keys2[i];
                      var ctx = contexts[i];
                      if (primKey == null) {
                        ctx.onerror && ctx.onerror(failures[i]);
                      } else {
                        ctx.onsuccess && ctx.onsuccess(
                          req2.type === "put" && existingValues[i] ? req2.values[i] : primKey
                        );
                      }
                    }
                    return { failures, results, numFailures, lastResult };
                  }).catch(function(error) {
                    contexts.forEach(function(ctx) {
                      return ctx.onerror && ctx.onerror(error);
                    });
                    return Promise.reject(error);
                  });
                });
              }
              function deleteRange(req2) {
                return deleteNextChunk(req2.trans, req2.range, 1e4);
              }
              function deleteNextChunk(trans, range, limit) {
                return downTable.query({ trans, values: false, query: { index: primaryKey, range }, limit }).then(function(_a3) {
                  var result = _a3.result;
                  return addPutOrDelete({ type: "delete", keys: result, trans }).then(function(res) {
                    if (res.numFailures > 0)
                      return Promise.reject(res.failures[0]);
                    if (result.length < limit) {
                      return { failures: [], numFailures: 0, lastResult: void 0 };
                    } else {
                      return deleteNextChunk(trans, __assign(__assign({}, range), { lower: result[result.length - 1], lowerOpen: true }), limit);
                    }
                  });
                });
              }
            } });
            return tableMiddleware;
          } });
        }
      };
      function getExistingValues(table, req, effectiveKeys) {
        return req.type === "add" ? Promise.resolve([]) : table.getMany({ trans: req.trans, keys: effectiveKeys, cache: "immutable" });
      }
      function getFromTransactionCache(keys2, cache2, clone) {
        try {
          if (!cache2)
            return null;
          if (cache2.keys.length < keys2.length)
            return null;
          var result = [];
          for (var i = 0, j = 0; i < cache2.keys.length && j < keys2.length; ++i) {
            if (cmp2(cache2.keys[i], keys2[j]) !== 0)
              continue;
            result.push(clone ? deepClone(cache2.values[i]) : cache2.values[i]);
            ++j;
          }
          return result.length === keys2.length ? result : null;
        } catch (_a2) {
          return null;
        }
      }
      var cacheExistingValuesMiddleware = {
        stack: "dbcore",
        level: -1,
        create: function(core) {
          return {
            table: function(tableName) {
              var table = core.table(tableName);
              return __assign(__assign({}, table), { getMany: function(req) {
                if (!req.cache) {
                  return table.getMany(req);
                }
                var cachedResult = getFromTransactionCache(req.keys, req.trans["_cache"], req.cache === "clone");
                if (cachedResult) {
                  return DexiePromise.resolve(cachedResult);
                }
                return table.getMany(req).then(function(res) {
                  req.trans["_cache"] = {
                    keys: req.keys,
                    values: req.cache === "clone" ? deepClone(res) : res
                  };
                  return res;
                });
              }, mutate: function(req) {
                if (req.type !== "add")
                  req.trans["_cache"] = null;
                return table.mutate(req);
              } });
            }
          };
        }
      };
      function isCachableContext(ctx, table) {
        return ctx.trans.mode === "readonly" && !!ctx.subscr && !ctx.trans.explicit && ctx.trans.db._options.cache !== "disabled" && !table.schema.primaryKey.outbound;
      }
      function isCachableRequest(type2, req) {
        switch (type2) {
          case "query":
            return req.values && !req.unique;
          case "get":
            return false;
          case "getMany":
            return false;
          case "count":
            return false;
          case "openCursor":
            return false;
        }
      }
      var observabilityMiddleware = {
        stack: "dbcore",
        level: 0,
        name: "Observability",
        create: function(core) {
          var dbName = core.schema.name;
          var FULL_RANGE = new RangeSet2(core.MIN_KEY, core.MAX_KEY);
          return __assign(__assign({}, core), { transaction: function(stores, mode, options) {
            if (PSD.subscr && mode !== "readonly") {
              throw new exceptions.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(PSD.querier));
            }
            return core.transaction(stores, mode, options);
          }, table: function(tableName) {
            var table = core.table(tableName);
            var schema = table.schema;
            var primaryKey = schema.primaryKey, indexes = schema.indexes;
            var extractKey = primaryKey.extractKey, outbound = primaryKey.outbound;
            var indexesWithAutoIncPK = primaryKey.autoIncrement && indexes.filter(function(index) {
              return index.compound && index.keyPath.includes(primaryKey.keyPath);
            });
            var tableClone = __assign(__assign({}, table), { mutate: function(req) {
              var _a2, _b;
              var trans = req.trans;
              var mutatedParts = req.mutatedParts || (req.mutatedParts = {});
              var getRangeSet = function(indexName) {
                var part = "idb://".concat(dbName, "/").concat(tableName, "/").concat(indexName);
                return mutatedParts[part] || (mutatedParts[part] = new RangeSet2());
              };
              var pkRangeSet = getRangeSet("");
              var delsRangeSet = getRangeSet(":dels");
              var type2 = req.type;
              var _c = req.type === "deleteRange" ? [req.range] : req.type === "delete" ? [req.keys] : req.values.length < 50 ? [getEffectiveKeys(primaryKey, req).filter(function(id) {
                return id;
              }), req.values] : [], keys2 = _c[0], newObjs = _c[1];
              var oldCache = req.trans["_cache"];
              if (isArray(keys2)) {
                pkRangeSet.addKeys(keys2);
                var oldObjs = type2 === "delete" || keys2.length === newObjs.length ? getFromTransactionCache(keys2, oldCache) : null;
                if (!oldObjs) {
                  delsRangeSet.addKeys(keys2);
                }
                if (oldObjs || newObjs) {
                  trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs);
                }
              } else if (keys2) {
                var range = {
                  from: (_a2 = keys2.lower) !== null && _a2 !== void 0 ? _a2 : core.MIN_KEY,
                  to: (_b = keys2.upper) !== null && _b !== void 0 ? _b : core.MAX_KEY
                };
                delsRangeSet.add(range);
                pkRangeSet.add(range);
              } else {
                pkRangeSet.add(FULL_RANGE);
                delsRangeSet.add(FULL_RANGE);
                schema.indexes.forEach(function(idx) {
                  return getRangeSet(idx.name).add(FULL_RANGE);
                });
              }
              return table.mutate(req).then(function(res) {
                if (keys2 && (req.type === "add" || req.type === "put")) {
                  pkRangeSet.addKeys(res.results);
                  if (indexesWithAutoIncPK) {
                    indexesWithAutoIncPK.forEach(function(idx) {
                      var idxVals = req.values.map(function(v) {
                        return idx.extractKey(v);
                      });
                      var pkPos = idx.keyPath.findIndex(function(prop) {
                        return prop === primaryKey.keyPath;
                      });
                      for (var i = 0, len = res.results.length; i < len; ++i) {
                        idxVals[i][pkPos] = res.results[i];
                      }
                      getRangeSet(idx.name).addKeys(idxVals);
                    });
                  }
                }
                trans.mutatedParts = extendObservabilitySet(trans.mutatedParts || {}, mutatedParts);
                return res;
              });
            } });
            var getRange = function(_a2) {
              var _b, _c;
              var _d = _a2.query, index = _d.index, range = _d.range;
              return [
                index,
                new RangeSet2((_b = range.lower) !== null && _b !== void 0 ? _b : core.MIN_KEY, (_c = range.upper) !== null && _c !== void 0 ? _c : core.MAX_KEY)
              ];
            };
            var readSubscribers = {
              get: function(req) {
                return [primaryKey, new RangeSet2(req.key)];
              },
              getMany: function(req) {
                return [primaryKey, new RangeSet2().addKeys(req.keys)];
              },
              count: getRange,
              query: getRange,
              openCursor: getRange
            };
            keys(readSubscribers).forEach(function(method) {
              tableClone[method] = function(req) {
                var subscr = PSD.subscr;
                var isLiveQuery = !!subscr;
                var cachable = isCachableContext(PSD, table) && isCachableRequest(method, req);
                var obsSet = cachable ? req.obsSet = {} : subscr;
                if (isLiveQuery) {
                  var getRangeSet = function(indexName) {
                    var part = "idb://".concat(dbName, "/").concat(tableName, "/").concat(indexName);
                    return obsSet[part] || (obsSet[part] = new RangeSet2());
                  };
                  var pkRangeSet_1 = getRangeSet("");
                  var delsRangeSet_1 = getRangeSet(":dels");
                  var _a2 = readSubscribers[method](req), queriedIndex = _a2[0], queriedRanges = _a2[1];
                  if (method === "query" && queriedIndex.isPrimaryKey && !req.values) {
                    delsRangeSet_1.add(queriedRanges);
                  } else {
                    getRangeSet(queriedIndex.name || "").add(queriedRanges);
                  }
                  if (!queriedIndex.isPrimaryKey) {
                    if (method === "count") {
                      delsRangeSet_1.add(FULL_RANGE);
                    } else {
                      var keysPromise_1 = method === "query" && outbound && req.values && table.query(__assign(__assign({}, req), { values: false }));
                      return table[method].apply(this, arguments).then(function(res) {
                        if (method === "query") {
                          if (outbound && req.values) {
                            return keysPromise_1.then(function(_a3) {
                              var resultingKeys = _a3.result;
                              pkRangeSet_1.addKeys(resultingKeys);
                              return res;
                            });
                          }
                          var pKeys = req.values ? res.result.map(extractKey) : res.result;
                          if (req.values) {
                            pkRangeSet_1.addKeys(pKeys);
                          } else {
                            delsRangeSet_1.addKeys(pKeys);
                          }
                        } else if (method === "openCursor") {
                          var cursor_1 = res;
                          var wantValues_1 = req.values;
                          return cursor_1 && Object.create(cursor_1, {
                            key: {
                              get: function() {
                                delsRangeSet_1.addKey(cursor_1.primaryKey);
                                return cursor_1.key;
                              }
                            },
                            primaryKey: {
                              get: function() {
                                var pkey = cursor_1.primaryKey;
                                delsRangeSet_1.addKey(pkey);
                                return pkey;
                              }
                            },
                            value: {
                              get: function() {
                                wantValues_1 && pkRangeSet_1.addKey(cursor_1.primaryKey);
                                return cursor_1.value;
                              }
                            }
                          });
                        }
                        return res;
                      });
                    }
                  }
                }
                return table[method].apply(this, arguments);
              };
            });
            return tableClone;
          } });
        }
      };
      function trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs) {
        function addAffectedIndex(ix) {
          var rangeSet = getRangeSet(ix.name || "");
          function extractKey(obj) {
            return obj != null ? ix.extractKey(obj) : null;
          }
          var addKeyOrKeys = function(key) {
            return ix.multiEntry && isArray(key) ? key.forEach(function(key2) {
              return rangeSet.addKey(key2);
            }) : rangeSet.addKey(key);
          };
          (oldObjs || newObjs).forEach(function(_, i) {
            var oldKey = oldObjs && extractKey(oldObjs[i]);
            var newKey = newObjs && extractKey(newObjs[i]);
            if (cmp2(oldKey, newKey) !== 0) {
              if (oldKey != null)
                addKeyOrKeys(oldKey);
              if (newKey != null)
                addKeyOrKeys(newKey);
            }
          });
        }
        schema.indexes.forEach(addAffectedIndex);
      }
      function adjustOptimisticFromFailures(tblCache, req, res) {
        if (res.numFailures === 0)
          return req;
        if (req.type === "deleteRange") {
          return null;
        }
        var numBulkOps = req.keys ? req.keys.length : "values" in req && req.values ? req.values.length : 1;
        if (res.numFailures === numBulkOps) {
          return null;
        }
        var clone = __assign({}, req);
        if (isArray(clone.keys)) {
          clone.keys = clone.keys.filter(function(_, i) {
            return !(i in res.failures);
          });
        }
        if ("values" in clone && isArray(clone.values)) {
          clone.values = clone.values.filter(function(_, i) {
            return !(i in res.failures);
          });
        }
        return clone;
      }
      function isAboveLower(key, range) {
        return range.lower === void 0 ? true : range.lowerOpen ? cmp2(key, range.lower) > 0 : cmp2(key, range.lower) >= 0;
      }
      function isBelowUpper(key, range) {
        return range.upper === void 0 ? true : range.upperOpen ? cmp2(key, range.upper) < 0 : cmp2(key, range.upper) <= 0;
      }
      function isWithinRange(key, range) {
        return isAboveLower(key, range) && isBelowUpper(key, range);
      }
      function applyOptimisticOps(result, req, ops, table, cacheEntry, immutable) {
        if (!ops || ops.length === 0)
          return result;
        var index = req.query.index;
        var multiEntry = index.multiEntry;
        var queryRange = req.query.range;
        var primaryKey = table.schema.primaryKey;
        var extractPrimKey = primaryKey.extractKey;
        var extractIndex = index.extractKey;
        var extractLowLevelIndex = (index.lowLevelIndex || index).extractKey;
        var finalResult = ops.reduce(function(result2, op) {
          var modifedResult = result2;
          var includedValues = [];
          if (op.type === "add" || op.type === "put") {
            var includedPKs = new RangeSet2();
            for (var i = op.values.length - 1; i >= 0; --i) {
              var value = op.values[i];
              var pk = extractPrimKey(value);
              if (includedPKs.hasKey(pk))
                continue;
              var key = extractIndex(value);
              if (multiEntry && isArray(key) ? key.some(function(k) {
                return isWithinRange(k, queryRange);
              }) : isWithinRange(key, queryRange)) {
                includedPKs.addKey(pk);
                includedValues.push(value);
              }
            }
          }
          switch (op.type) {
            case "add": {
              var existingKeys_1 = new RangeSet2().addKeys(req.values ? result2.map(function(v) {
                return extractPrimKey(v);
              }) : result2);
              modifedResult = result2.concat(req.values ? includedValues.filter(function(v) {
                var key2 = extractPrimKey(v);
                if (existingKeys_1.hasKey(key2))
                  return false;
                existingKeys_1.addKey(key2);
                return true;
              }) : includedValues.map(function(v) {
                return extractPrimKey(v);
              }).filter(function(k) {
                if (existingKeys_1.hasKey(k))
                  return false;
                existingKeys_1.addKey(k);
                return true;
              }));
              break;
            }
            case "put": {
              var keySet_1 = new RangeSet2().addKeys(op.values.map(function(v) {
                return extractPrimKey(v);
              }));
              modifedResult = result2.filter(
                function(item) {
                  return !keySet_1.hasKey(req.values ? extractPrimKey(item) : item);
                }
              ).concat(
                req.values ? includedValues : includedValues.map(function(v) {
                  return extractPrimKey(v);
                })
              );
              break;
            }
            case "delete":
              var keysToDelete_1 = new RangeSet2().addKeys(op.keys);
              modifedResult = result2.filter(function(item) {
                return !keysToDelete_1.hasKey(req.values ? extractPrimKey(item) : item);
              });
              break;
            case "deleteRange":
              var range_1 = op.range;
              modifedResult = result2.filter(function(item) {
                return !isWithinRange(extractPrimKey(item), range_1);
              });
              break;
          }
          return modifedResult;
        }, result);
        if (finalResult === result)
          return result;
        finalResult.sort(function(a, b) {
          return cmp2(extractLowLevelIndex(a), extractLowLevelIndex(b)) || cmp2(extractPrimKey(a), extractPrimKey(b));
        });
        if (req.limit && req.limit < Infinity) {
          if (finalResult.length > req.limit) {
            finalResult.length = req.limit;
          } else if (result.length === req.limit && finalResult.length < req.limit) {
            cacheEntry.dirty = true;
          }
        }
        return immutable ? Object.freeze(finalResult) : finalResult;
      }
      function areRangesEqual(r1, r2) {
        return cmp2(r1.lower, r2.lower) === 0 && cmp2(r1.upper, r2.upper) === 0 && !!r1.lowerOpen === !!r2.lowerOpen && !!r1.upperOpen === !!r2.upperOpen;
      }
      function compareLowers(lower1, lower2, lowerOpen1, lowerOpen2) {
        if (lower1 === void 0)
          return lower2 !== void 0 ? -1 : 0;
        if (lower2 === void 0)
          return 1;
        var c = cmp2(lower1, lower2);
        if (c === 0) {
          if (lowerOpen1 && lowerOpen2)
            return 0;
          if (lowerOpen1)
            return 1;
          if (lowerOpen2)
            return -1;
        }
        return c;
      }
      function compareUppers(upper1, upper2, upperOpen1, upperOpen2) {
        if (upper1 === void 0)
          return upper2 !== void 0 ? 1 : 0;
        if (upper2 === void 0)
          return -1;
        var c = cmp2(upper1, upper2);
        if (c === 0) {
          if (upperOpen1 && upperOpen2)
            return 0;
          if (upperOpen1)
            return -1;
          if (upperOpen2)
            return 1;
        }
        return c;
      }
      function isSuperRange(r1, r2) {
        return compareLowers(r1.lower, r2.lower, r1.lowerOpen, r2.lowerOpen) <= 0 && compareUppers(r1.upper, r2.upper, r1.upperOpen, r2.upperOpen) >= 0;
      }
      function findCompatibleQuery(dbName, tableName, type2, req) {
        var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
        if (!tblCache)
          return [];
        var queries = tblCache.queries[type2];
        if (!queries)
          return [null, false, tblCache, null];
        var indexName = req.query ? req.query.index.name : null;
        var entries = queries[indexName || ""];
        if (!entries)
          return [null, false, tblCache, null];
        switch (type2) {
          case "query":
            var equalEntry = entries.find(function(entry) {
              return entry.req.limit === req.limit && entry.req.values === req.values && areRangesEqual(entry.req.query.range, req.query.range);
            });
            if (equalEntry)
              return [
                equalEntry,
                true,
                tblCache,
                entries
              ];
            var superEntry = entries.find(function(entry) {
              var limit = "limit" in entry.req ? entry.req.limit : Infinity;
              return limit >= req.limit && (req.values ? entry.req.values : true) && isSuperRange(entry.req.query.range, req.query.range);
            });
            return [superEntry, false, tblCache, entries];
          case "count":
            var countQuery = entries.find(function(entry) {
              return areRangesEqual(entry.req.query.range, req.query.range);
            });
            return [countQuery, !!countQuery, tblCache, entries];
        }
      }
      function subscribeToCacheEntry(cacheEntry, container, requery, signal) {
        cacheEntry.subscribers.add(requery);
        signal.addEventListener("abort", function() {
          cacheEntry.subscribers.delete(requery);
          if (cacheEntry.subscribers.size === 0) {
            enqueForDeletion(cacheEntry, container);
          }
        });
      }
      function enqueForDeletion(cacheEntry, container) {
        setTimeout(function() {
          if (cacheEntry.subscribers.size === 0) {
            delArrayItem(container, cacheEntry);
          }
        }, 3e3);
      }
      var cacheMiddleware = {
        stack: "dbcore",
        level: 0,
        name: "Cache",
        create: function(core) {
          var dbName = core.schema.name;
          var coreMW = __assign(__assign({}, core), { transaction: function(stores, mode, options) {
            var idbtrans = core.transaction(stores, mode, options);
            if (mode === "readwrite") {
              var ac_1 = new AbortController();
              var signal = ac_1.signal;
              var endTransaction = function(wasCommitted) {
                return function() {
                  ac_1.abort();
                  if (mode === "readwrite") {
                    var affectedSubscribers_1 = /* @__PURE__ */ new Set();
                    for (var _i = 0, stores_1 = stores; _i < stores_1.length; _i++) {
                      var storeName = stores_1[_i];
                      var tblCache = cache["idb://".concat(dbName, "/").concat(storeName)];
                      if (tblCache) {
                        var table = core.table(storeName);
                        var ops = tblCache.optimisticOps.filter(function(op) {
                          return op.trans === idbtrans;
                        });
                        if (idbtrans._explicit && wasCommitted && idbtrans.mutatedParts) {
                          for (var _a2 = 0, _b = Object.values(tblCache.queries.query); _a2 < _b.length; _a2++) {
                            var entries = _b[_a2];
                            for (var _c = 0, _d = entries.slice(); _c < _d.length; _c++) {
                              var entry = _d[_c];
                              if (obsSetsOverlap(entry.obsSet, idbtrans.mutatedParts)) {
                                delArrayItem(entries, entry);
                                entry.subscribers.forEach(function(requery) {
                                  return affectedSubscribers_1.add(requery);
                                });
                              }
                            }
                          }
                        } else if (ops.length > 0) {
                          tblCache.optimisticOps = tblCache.optimisticOps.filter(function(op) {
                            return op.trans !== idbtrans;
                          });
                          for (var _e = 0, _f = Object.values(tblCache.queries.query); _e < _f.length; _e++) {
                            var entries = _f[_e];
                            for (var _g = 0, _h = entries.slice(); _g < _h.length; _g++) {
                              var entry = _h[_g];
                              if (entry.res != null && idbtrans.mutatedParts) {
                                if (wasCommitted && !entry.dirty) {
                                  var freezeResults = Object.isFrozen(entry.res);
                                  var modRes = applyOptimisticOps(entry.res, entry.req, ops, table, entry, freezeResults);
                                  if (entry.dirty) {
                                    delArrayItem(entries, entry);
                                    entry.subscribers.forEach(function(requery) {
                                      return affectedSubscribers_1.add(requery);
                                    });
                                  } else if (modRes !== entry.res) {
                                    entry.res = modRes;
                                    entry.promise = DexiePromise.resolve({ result: modRes });
                                  }
                                } else {
                                  if (entry.dirty) {
                                    delArrayItem(entries, entry);
                                  }
                                  entry.subscribers.forEach(function(requery) {
                                    return affectedSubscribers_1.add(requery);
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    affectedSubscribers_1.forEach(function(requery) {
                      return requery();
                    });
                  }
                };
              };
              idbtrans.addEventListener("abort", endTransaction(false), {
                signal
              });
              idbtrans.addEventListener("error", endTransaction(false), {
                signal
              });
              idbtrans.addEventListener("complete", endTransaction(true), {
                signal
              });
            }
            return idbtrans;
          }, table: function(tableName) {
            var downTable = core.table(tableName);
            var primKey = downTable.schema.primaryKey;
            var tableMW = __assign(__assign({}, downTable), { mutate: function(req) {
              var trans = PSD.trans;
              if (primKey.outbound || trans.db._options.cache === "disabled" || trans.explicit || trans.idbtrans.mode !== "readwrite") {
                return downTable.mutate(req);
              }
              var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
              if (!tblCache)
                return downTable.mutate(req);
              var promise = downTable.mutate(req);
              if ((req.type === "add" || req.type === "put") && (req.values.length >= 50 || getEffectiveKeys(primKey, req).some(function(key) {
                return key == null;
              }))) {
                promise.then(function(res) {
                  var reqWithResolvedKeys = __assign(__assign({}, req), { values: req.values.map(function(value, i) {
                    var _a2;
                    if (res.failures[i])
                      return value;
                    var valueWithKey = ((_a2 = primKey.keyPath) === null || _a2 === void 0 ? void 0 : _a2.includes(".")) ? deepClone(value) : __assign({}, value);
                    setByKeyPath(valueWithKey, primKey.keyPath, res.results[i]);
                    return valueWithKey;
                  }) });
                  var adjustedReq = adjustOptimisticFromFailures(tblCache, reqWithResolvedKeys, res);
                  tblCache.optimisticOps.push(adjustedReq);
                  queueMicrotask(function() {
                    return req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                  });
                });
              } else {
                tblCache.optimisticOps.push(req);
                req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                promise.then(function(res) {
                  if (res.numFailures > 0) {
                    delArrayItem(tblCache.optimisticOps, req);
                    var adjustedReq = adjustOptimisticFromFailures(tblCache, req, res);
                    if (adjustedReq) {
                      tblCache.optimisticOps.push(adjustedReq);
                    }
                    req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                  }
                });
                promise.catch(function() {
                  delArrayItem(tblCache.optimisticOps, req);
                  req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                });
              }
              return promise;
            }, query: function(req) {
              var _a2;
              if (!isCachableContext(PSD, downTable) || !isCachableRequest("query", req))
                return downTable.query(req);
              var freezeResults = ((_a2 = PSD.trans) === null || _a2 === void 0 ? void 0 : _a2.db._options.cache) === "immutable";
              var _b = PSD, requery = _b.requery, signal = _b.signal;
              var _c = findCompatibleQuery(dbName, tableName, "query", req), cacheEntry = _c[0], exactMatch = _c[1], tblCache = _c[2], container = _c[3];
              if (cacheEntry && exactMatch) {
                cacheEntry.obsSet = req.obsSet;
              } else {
                var promise = downTable.query(req).then(function(res) {
                  var result = res.result;
                  if (cacheEntry)
                    cacheEntry.res = result;
                  if (freezeResults) {
                    for (var i = 0, l = result.length; i < l; ++i) {
                      Object.freeze(result[i]);
                    }
                    Object.freeze(result);
                  } else {
                    res.result = deepClone(result);
                  }
                  return res;
                }).catch(function(error) {
                  if (container && cacheEntry)
                    delArrayItem(container, cacheEntry);
                  return Promise.reject(error);
                });
                cacheEntry = {
                  obsSet: req.obsSet,
                  promise,
                  subscribers: /* @__PURE__ */ new Set(),
                  type: "query",
                  req,
                  dirty: false
                };
                if (container) {
                  container.push(cacheEntry);
                } else {
                  container = [cacheEntry];
                  if (!tblCache) {
                    tblCache = cache["idb://".concat(dbName, "/").concat(tableName)] = {
                      queries: {
                        query: {},
                        count: {}
                      },
                      objs: /* @__PURE__ */ new Map(),
                      optimisticOps: [],
                      unsignaledParts: {}
                    };
                  }
                  tblCache.queries.query[req.query.index.name || ""] = container;
                }
              }
              subscribeToCacheEntry(cacheEntry, container, requery, signal);
              return cacheEntry.promise.then(function(res) {
                return {
                  result: applyOptimisticOps(res.result, req, tblCache === null || tblCache === void 0 ? void 0 : tblCache.optimisticOps, downTable, cacheEntry, freezeResults)
                };
              });
            } });
            return tableMW;
          } });
          return coreMW;
        }
      };
      function vipify(target, vipDb) {
        return new Proxy(target, {
          get: function(target2, prop, receiver) {
            if (prop === "db")
              return vipDb;
            return Reflect.get(target2, prop, receiver);
          }
        });
      }
      var Dexie$1 = function() {
        function Dexie3(name, options) {
          var _this = this;
          this._middlewares = {};
          this.verno = 0;
          var deps = Dexie3.dependencies;
          this._options = options = __assign({
            addons: Dexie3.addons,
            autoOpen: true,
            indexedDB: deps.indexedDB,
            IDBKeyRange: deps.IDBKeyRange,
            cache: "cloned"
          }, options);
          this._deps = {
            indexedDB: options.indexedDB,
            IDBKeyRange: options.IDBKeyRange
          };
          var addons = options.addons;
          this._dbSchema = {};
          this._versions = [];
          this._storeNames = [];
          this._allTables = {};
          this.idbdb = null;
          this._novip = this;
          var state = {
            dbOpenError: null,
            isBeingOpened: false,
            onReadyBeingFired: null,
            openComplete: false,
            dbReadyResolve: nop,
            dbReadyPromise: null,
            cancelOpen: nop,
            openCanceller: null,
            autoSchema: true,
            PR1398_maxLoop: 3,
            autoOpen: options.autoOpen
          };
          state.dbReadyPromise = new DexiePromise(function(resolve) {
            state.dbReadyResolve = resolve;
          });
          state.openCanceller = new DexiePromise(function(_, reject) {
            state.cancelOpen = reject;
          });
          this._state = state;
          this.name = name;
          this.on = Events(this, "populate", "blocked", "versionchange", "close", { ready: [promisableChain, nop] });
          this.on.ready.subscribe = override(this.on.ready.subscribe, function(subscribe) {
            return function(subscriber, bSticky) {
              Dexie3.vip(function() {
                var state2 = _this._state;
                if (state2.openComplete) {
                  if (!state2.dbOpenError)
                    DexiePromise.resolve().then(subscriber);
                  if (bSticky)
                    subscribe(subscriber);
                } else if (state2.onReadyBeingFired) {
                  state2.onReadyBeingFired.push(subscriber);
                  if (bSticky)
                    subscribe(subscriber);
                } else {
                  subscribe(subscriber);
                  var db_1 = _this;
                  if (!bSticky)
                    subscribe(function unsubscribe() {
                      db_1.on.ready.unsubscribe(subscriber);
                      db_1.on.ready.unsubscribe(unsubscribe);
                    });
                }
              });
            };
          });
          this.Collection = createCollectionConstructor(this);
          this.Table = createTableConstructor(this);
          this.Transaction = createTransactionConstructor(this);
          this.Version = createVersionConstructor(this);
          this.WhereClause = createWhereClauseConstructor(this);
          this.on("versionchange", function(ev) {
            if (ev.newVersion > 0)
              console.warn("Another connection wants to upgrade database '".concat(_this.name, "'. Closing db now to resume the upgrade."));
            else
              console.warn("Another connection wants to delete database '".concat(_this.name, "'. Closing db now to resume the delete request."));
            _this.close({ disableAutoOpen: false });
          });
          this.on("blocked", function(ev) {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion)
              console.warn("Dexie.delete('".concat(_this.name, "') was blocked"));
            else
              console.warn("Upgrade '".concat(_this.name, "' blocked by other connection holding version ").concat(ev.oldVersion / 10));
          });
          this._maxKey = getMaxKey(options.IDBKeyRange);
          this._createTransaction = function(mode, storeNames, dbschema, parentTransaction) {
            return new _this.Transaction(mode, storeNames, dbschema, _this._options.chromeTransactionDurability, parentTransaction);
          };
          this._fireOnBlocked = function(ev) {
            _this.on("blocked").fire(ev);
            connections.filter(function(c) {
              return c.name === _this.name && c !== _this && !c._state.vcFired;
            }).map(function(c) {
              return c.on("versionchange").fire(ev);
            });
          };
          this.use(cacheExistingValuesMiddleware);
          this.use(cacheMiddleware);
          this.use(observabilityMiddleware);
          this.use(virtualIndexMiddleware);
          this.use(hooksMiddleware);
          var vipDB = new Proxy(this, {
            get: function(_, prop, receiver) {
              if (prop === "_vip")
                return true;
              if (prop === "table")
                return function(tableName) {
                  return vipify(_this.table(tableName), vipDB);
                };
              var rv = Reflect.get(_, prop, receiver);
              if (rv instanceof Table)
                return vipify(rv, vipDB);
              if (prop === "tables")
                return rv.map(function(t) {
                  return vipify(t, vipDB);
                });
              if (prop === "_createTransaction")
                return function() {
                  var tx = rv.apply(this, arguments);
                  return vipify(tx, vipDB);
                };
              return rv;
            }
          });
          this.vip = vipDB;
          addons.forEach(function(addon) {
            return addon(_this);
          });
        }
        Dexie3.prototype.version = function(versionNumber) {
          if (isNaN(versionNumber) || versionNumber < 0.1)
            throw new exceptions.Type("Given version is not a positive number");
          versionNumber = Math.round(versionNumber * 10) / 10;
          if (this.idbdb || this._state.isBeingOpened)
            throw new exceptions.Schema("Cannot add version when database is open");
          this.verno = Math.max(this.verno, versionNumber);
          var versions = this._versions;
          var versionInstance = versions.filter(function(v) {
            return v._cfg.version === versionNumber;
          })[0];
          if (versionInstance)
            return versionInstance;
          versionInstance = new this.Version(versionNumber);
          versions.push(versionInstance);
          versions.sort(lowerVersionFirst);
          versionInstance.stores({});
          this._state.autoSchema = false;
          return versionInstance;
        };
        Dexie3.prototype._whenReady = function(fn) {
          var _this = this;
          return this.idbdb && (this._state.openComplete || PSD.letThrough || this._vip) ? fn() : new DexiePromise(function(resolve, reject) {
            if (_this._state.openComplete) {
              return reject(new exceptions.DatabaseClosed(_this._state.dbOpenError));
            }
            if (!_this._state.isBeingOpened) {
              if (!_this._state.autoOpen) {
                reject(new exceptions.DatabaseClosed());
                return;
              }
              _this.open().catch(nop);
            }
            _this._state.dbReadyPromise.then(resolve, reject);
          }).then(fn);
        };
        Dexie3.prototype.use = function(_a2) {
          var stack = _a2.stack, create = _a2.create, level = _a2.level, name = _a2.name;
          if (name)
            this.unuse({ stack, name });
          var middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
          middlewares.push({ stack, create, level: level == null ? 10 : level, name });
          middlewares.sort(function(a, b) {
            return a.level - b.level;
          });
          return this;
        };
        Dexie3.prototype.unuse = function(_a2) {
          var stack = _a2.stack, name = _a2.name, create = _a2.create;
          if (stack && this._middlewares[stack]) {
            this._middlewares[stack] = this._middlewares[stack].filter(function(mw) {
              return create ? mw.create !== create : name ? mw.name !== name : false;
            });
          }
          return this;
        };
        Dexie3.prototype.open = function() {
          var _this = this;
          return usePSD(
            globalPSD,
            function() {
              return dexieOpen(_this);
            }
          );
        };
        Dexie3.prototype._close = function() {
          var state = this._state;
          var idx = connections.indexOf(this);
          if (idx >= 0)
            connections.splice(idx, 1);
          if (this.idbdb) {
            try {
              this.idbdb.close();
            } catch (e) {
            }
            this.idbdb = null;
          }
          if (!state.isBeingOpened) {
            state.dbReadyPromise = new DexiePromise(function(resolve) {
              state.dbReadyResolve = resolve;
            });
            state.openCanceller = new DexiePromise(function(_, reject) {
              state.cancelOpen = reject;
            });
          }
        };
        Dexie3.prototype.close = function(_a2) {
          var _b = _a2 === void 0 ? { disableAutoOpen: true } : _a2, disableAutoOpen = _b.disableAutoOpen;
          var state = this._state;
          if (disableAutoOpen) {
            if (state.isBeingOpened) {
              state.cancelOpen(new exceptions.DatabaseClosed());
            }
            this._close();
            state.autoOpen = false;
            state.dbOpenError = new exceptions.DatabaseClosed();
          } else {
            this._close();
            state.autoOpen = this._options.autoOpen || state.isBeingOpened;
            state.openComplete = false;
            state.dbOpenError = null;
          }
        };
        Dexie3.prototype.delete = function(closeOptions) {
          var _this = this;
          if (closeOptions === void 0) {
            closeOptions = { disableAutoOpen: true };
          }
          var hasInvalidArguments = arguments.length > 0 && typeof arguments[0] !== "object";
          var state = this._state;
          return new DexiePromise(function(resolve, reject) {
            var doDelete = function() {
              _this.close(closeOptions);
              var req = _this._deps.indexedDB.deleteDatabase(_this.name);
              req.onsuccess = wrap(function() {
                _onDatabaseDeleted(_this._deps, _this.name);
                resolve();
              });
              req.onerror = eventRejectHandler(reject);
              req.onblocked = _this._fireOnBlocked;
            };
            if (hasInvalidArguments)
              throw new exceptions.InvalidArgument("Invalid closeOptions argument to db.delete()");
            if (state.isBeingOpened) {
              state.dbReadyPromise.then(doDelete);
            } else {
              doDelete();
            }
          });
        };
        Dexie3.prototype.backendDB = function() {
          return this.idbdb;
        };
        Dexie3.prototype.isOpen = function() {
          return this.idbdb !== null;
        };
        Dexie3.prototype.hasBeenClosed = function() {
          var dbOpenError = this._state.dbOpenError;
          return dbOpenError && dbOpenError.name === "DatabaseClosed";
        };
        Dexie3.prototype.hasFailed = function() {
          return this._state.dbOpenError !== null;
        };
        Dexie3.prototype.dynamicallyOpened = function() {
          return this._state.autoSchema;
        };
        Object.defineProperty(Dexie3.prototype, "tables", {
          get: function() {
            var _this = this;
            return keys(this._allTables).map(function(name) {
              return _this._allTables[name];
            });
          },
          enumerable: false,
          configurable: true
        });
        Dexie3.prototype.transaction = function() {
          var args = extractTransactionArgs.apply(this, arguments);
          return this._transaction.apply(this, args);
        };
        Dexie3.prototype._transaction = function(mode, tables, scopeFunc) {
          var _this = this;
          var parentTransaction = PSD.trans;
          if (!parentTransaction || parentTransaction.db !== this || mode.indexOf("!") !== -1)
            parentTransaction = null;
          var onlyIfCompatible = mode.indexOf("?") !== -1;
          mode = mode.replace("!", "").replace("?", "");
          var idbMode, storeNames;
          try {
            storeNames = tables.map(function(table) {
              var storeName = table instanceof _this.Table ? table.name : table;
              if (typeof storeName !== "string")
                throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
              return storeName;
            });
            if (mode == "r" || mode === READONLY)
              idbMode = READONLY;
            else if (mode == "rw" || mode == READWRITE)
              idbMode = READWRITE;
            else
              throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
            if (parentTransaction) {
              if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
                if (onlyIfCompatible) {
                  parentTransaction = null;
                } else
                  throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
              }
              if (parentTransaction) {
                storeNames.forEach(function(storeName) {
                  if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                    if (onlyIfCompatible) {
                      parentTransaction = null;
                    } else
                      throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
                  }
                });
              }
              if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
                parentTransaction = null;
              }
            }
          } catch (e) {
            return parentTransaction ? parentTransaction._promise(null, function(_, reject) {
              reject(e);
            }) : rejection(e);
          }
          var enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
          return parentTransaction ? parentTransaction._promise(idbMode, enterTransaction, "lock") : PSD.trans ? usePSD(PSD.transless, function() {
            return _this._whenReady(enterTransaction);
          }) : this._whenReady(enterTransaction);
        };
        Dexie3.prototype.table = function(tableName) {
          if (!hasOwn(this._allTables, tableName)) {
            throw new exceptions.InvalidTable("Table ".concat(tableName, " does not exist"));
          }
          return this._allTables[tableName];
        };
        return Dexie3;
      }();
      var symbolObservable = typeof Symbol !== "undefined" && "observable" in Symbol ? Symbol.observable : "@@observable";
      var Observable = function() {
        function Observable2(subscribe) {
          this._subscribe = subscribe;
        }
        Observable2.prototype.subscribe = function(x, error, complete) {
          return this._subscribe(!x || typeof x === "function" ? { next: x, error, complete } : x);
        };
        Observable2.prototype[symbolObservable] = function() {
          return this;
        };
        return Observable2;
      }();
      var domDeps;
      try {
        domDeps = {
          indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
          IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
        };
      } catch (e) {
        domDeps = { indexedDB: null, IDBKeyRange: null };
      }
      function liveQuery2(querier) {
        var hasValue = false;
        var currentValue;
        var observable = new Observable(function(observer) {
          var scopeFuncIsAsync = isAsyncFunction(querier);
          function execute(ctx) {
            var wasRootExec = beginMicroTickScope();
            try {
              if (scopeFuncIsAsync) {
                incrementExpectedAwaits();
              }
              var rv = newScope(querier, ctx);
              if (scopeFuncIsAsync) {
                rv = rv.finally(decrementExpectedAwaits);
              }
              return rv;
            } finally {
              wasRootExec && endMicroTickScope();
            }
          }
          var closed = false;
          var abortController;
          var accumMuts = {};
          var currentObs = {};
          var subscription = {
            get closed() {
              return closed;
            },
            unsubscribe: function() {
              if (closed)
                return;
              closed = true;
              if (abortController)
                abortController.abort();
              if (startedListening)
                globalEvents.storagemutated.unsubscribe(mutationListener);
            }
          };
          observer.start && observer.start(subscription);
          var startedListening = false;
          var doQuery = function() {
            return execInGlobalContext(_doQuery);
          };
          function shouldNotify() {
            return obsSetsOverlap(currentObs, accumMuts);
          }
          var mutationListener = function(parts) {
            extendObservabilitySet(accumMuts, parts);
            if (shouldNotify()) {
              doQuery();
            }
          };
          var _doQuery = function() {
            if (closed || !domDeps.indexedDB) {
              return;
            }
            accumMuts = {};
            var subscr = {};
            if (abortController)
              abortController.abort();
            abortController = new AbortController();
            var ctx = {
              subscr,
              signal: abortController.signal,
              requery: doQuery,
              querier,
              trans: null
            };
            var ret = execute(ctx);
            Promise.resolve(ret).then(function(result) {
              hasValue = true;
              currentValue = result;
              if (closed || ctx.signal.aborted) {
                return;
              }
              accumMuts = {};
              currentObs = subscr;
              if (!objectIsEmpty(currentObs) && !startedListening) {
                globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, mutationListener);
                startedListening = true;
              }
              execInGlobalContext(function() {
                return !closed && observer.next && observer.next(result);
              });
            }, function(err) {
              hasValue = false;
              if (!["DatabaseClosedError", "AbortError"].includes(err === null || err === void 0 ? void 0 : err.name)) {
                if (!closed)
                  execInGlobalContext(function() {
                    if (closed)
                      return;
                    observer.error && observer.error(err);
                  });
              }
            });
          };
          setTimeout(doQuery, 0);
          return subscription;
        });
        observable.hasValue = function() {
          return hasValue;
        };
        observable.getValue = function() {
          return currentValue;
        };
        return observable;
      }
      var Dexie2 = Dexie$1;
      props(Dexie2, __assign(__assign({}, fullNameExceptions), {
        delete: function(databaseName) {
          var db = new Dexie2(databaseName, { addons: [] });
          return db.delete();
        },
        exists: function(name) {
          return new Dexie2(name, { addons: [] }).open().then(function(db) {
            db.close();
            return true;
          }).catch("NoSuchDatabaseError", function() {
            return false;
          });
        },
        getDatabaseNames: function(cb) {
          try {
            return getDatabaseNames(Dexie2.dependencies).then(cb);
          } catch (_a2) {
            return rejection(new exceptions.MissingAPI());
          }
        },
        defineClass: function() {
          function Class(content) {
            extend(this, content);
          }
          return Class;
        },
        ignoreTransaction: function(scopeFunc) {
          return PSD.trans ? usePSD(PSD.transless, scopeFunc) : scopeFunc();
        },
        vip,
        async: function(generatorFn) {
          return function() {
            try {
              var rv = awaitIterator(generatorFn.apply(this, arguments));
              if (!rv || typeof rv.then !== "function")
                return DexiePromise.resolve(rv);
              return rv;
            } catch (e) {
              return rejection(e);
            }
          };
        },
        spawn: function(generatorFn, args, thiz) {
          try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== "function")
              return DexiePromise.resolve(rv);
            return rv;
          } catch (e) {
            return rejection(e);
          }
        },
        currentTransaction: {
          get: function() {
            return PSD.trans || null;
          }
        },
        waitFor: function(promiseOrFunction, optionalTimeout) {
          var promise = DexiePromise.resolve(typeof promiseOrFunction === "function" ? Dexie2.ignoreTransaction(promiseOrFunction) : promiseOrFunction).timeout(optionalTimeout || 6e4);
          return PSD.trans ? PSD.trans.waitFor(promise) : promise;
        },
        Promise: DexiePromise,
        debug: {
          get: function() {
            return debug2;
          },
          set: function(value) {
            setDebug(value);
          }
        },
        derive,
        extend,
        props,
        override,
        Events,
        on: globalEvents,
        liveQuery: liveQuery2,
        extendObservabilitySet,
        getByKeyPath,
        setByKeyPath,
        delByKeyPath,
        shallowClone,
        deepClone,
        getObjectDiff,
        cmp: cmp2,
        asap: asap$1,
        minKey,
        addons: [],
        connections,
        errnames,
        dependencies: domDeps,
        cache,
        semVer: DEXIE_VERSION,
        version: DEXIE_VERSION.split(".").map(function(n) {
          return parseInt(n);
        }).reduce(function(p, c, i) {
          return p + c / Math.pow(10, i * 2);
        })
      }));
      Dexie2.maxKey = getMaxKey(Dexie2.dependencies.IDBKeyRange);
      if (typeof dispatchEvent !== "undefined" && typeof addEventListener !== "undefined") {
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, function(updatedParts) {
          if (!propagatingLocally) {
            var event_1;
            event_1 = new CustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, {
              detail: updatedParts
            });
            propagatingLocally = true;
            dispatchEvent(event_1);
            propagatingLocally = false;
          }
        });
        addEventListener(STORAGE_MUTATED_DOM_EVENT_NAME, function(_a2) {
          var detail = _a2.detail;
          if (!propagatingLocally) {
            propagateLocally(detail);
          }
        });
      }
      function propagateLocally(updateParts) {
        var wasMe = propagatingLocally;
        try {
          propagatingLocally = true;
          globalEvents.storagemutated.fire(updateParts);
          signalSubscribersNow(updateParts, true);
        } finally {
          propagatingLocally = wasMe;
        }
      }
      var propagatingLocally = false;
      var bc;
      var createBC = function() {
      };
      if (typeof BroadcastChannel !== "undefined") {
        createBC = function() {
          bc = new BroadcastChannel(STORAGE_MUTATED_DOM_EVENT_NAME);
          bc.onmessage = function(ev) {
            return ev.data && propagateLocally(ev.data);
          };
        };
        createBC();
        if (typeof bc.unref === "function") {
          bc.unref();
        }
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, function(changedParts) {
          if (!propagatingLocally) {
            bc.postMessage(changedParts);
          }
        });
      }
      if (typeof addEventListener !== "undefined") {
        addEventListener("pagehide", function(event) {
          if (!Dexie$1.disableBfCache && event.persisted) {
            if (debug2)
              console.debug("Dexie: handling persisted pagehide");
            bc === null || bc === void 0 ? void 0 : bc.close();
            for (var _i = 0, connections_1 = connections; _i < connections_1.length; _i++) {
              var db = connections_1[_i];
              db.close({ disableAutoOpen: false });
            }
          }
        });
        addEventListener("pageshow", function(event) {
          if (!Dexie$1.disableBfCache && event.persisted) {
            if (debug2)
              console.debug("Dexie: handling persisted pageshow");
            createBC();
            propagateLocally({ all: new RangeSet2(-Infinity, [[]]) });
          }
        });
      }
      function add2(value) {
        return new PropModification2({ add: value });
      }
      function remove2(value) {
        return new PropModification2({ remove: value });
      }
      function replacePrefix2(a, b) {
        return new PropModification2({ replacePrefix: [a, b] });
      }
      DexiePromise.rejectionMapper = mapError;
      setDebug(debug2);
      var namedExports = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        Dexie: Dexie$1,
        liveQuery: liveQuery2,
        Entity: Entity2,
        cmp: cmp2,
        PropModification: PropModification2,
        replacePrefix: replacePrefix2,
        add: add2,
        remove: remove2,
        "default": Dexie$1,
        RangeSet: RangeSet2,
        mergeRanges: mergeRanges2,
        rangesOverlap: rangesOverlap2
      });
      __assign(Dexie$1, namedExports, { default: Dexie$1 });
      return Dexie$1;
    });
  }
});

// node_modules/dexie/import-wrapper.mjs
var import_wrapper_exports = {};
__export(import_wrapper_exports, {
  Dexie: () => Dexie,
  Entity: () => Entity,
  PropModification: () => PropModification,
  RangeSet: () => RangeSet,
  add: () => add,
  cmp: () => cmp,
  default: () => import_wrapper_default,
  liveQuery: () => liveQuery,
  mergeRanges: () => mergeRanges,
  rangesOverlap: () => rangesOverlap,
  remove: () => remove,
  replacePrefix: () => replacePrefix
});
var import_dexie, DexieSymbol, Dexie, liveQuery, mergeRanges, rangesOverlap, RangeSet, cmp, Entity, PropModification, replacePrefix, add, remove, import_wrapper_default;
var init_import_wrapper = __esm({
  "node_modules/dexie/import-wrapper.mjs"() {
    import_dexie = __toESM(require_dexie(), 1);
    DexieSymbol = Symbol.for("Dexie");
    Dexie = globalThis[DexieSymbol] || (globalThis[DexieSymbol] = import_dexie.default);
    if (import_dexie.default.semVer !== Dexie.semVer) {
      throw new Error(`Two different versions of Dexie loaded in the same app: ${import_dexie.default.semVer} and ${Dexie.semVer}`);
    }
    ({
      liveQuery,
      mergeRanges,
      rangesOverlap,
      RangeSet,
      cmp,
      Entity,
      PropModification,
      replacePrefix,
      add,
      remove
    } = Dexie);
    import_wrapper_default = Dexie;
  }
});

// src/util/logger.ts
var pastLogs = Array.from({ length: 100 });
function pushLog(level, ...args) {
  pastLogs.shift();
  pastLogs.push({
    level,
    message: args.map((v) => {
      if (typeof v === "string") {
        return v;
      }
      if (v instanceof Error) {
        return v.stack;
      }
      try {
        return JSON.stringify(v);
      } catch {
        return v?.toString();
      }
    }).join(", ")
  });
}
function debug(...args) {
  console.debug("WCE", `${globalThis.FBC_VERSION}:`, ...args);
  pushLog("debug", ...args);
}
function logInfo(...args) {
  console.info("WCE", `${globalThis.FBC_VERSION}:`, ...args);
  pushLog("info", ...args);
}
function logWarn(...args) {
  console.warn("WCE", `${globalThis.FBC_VERSION}:`, ...args);
  pushLog("warn", ...args);
}
function logError(...args) {
  console.error("WCE", `${globalThis.FBC_VERSION}:`, ...args);
  pushLog("error", ...args);
}

// src/util/utils.ts
function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
async function waitFor(func, cancelFunc = () => false) {
  while (!func()) {
    if (cancelFunc()) {
      return false;
    }
    await sleep(10);
  }
  return true;
}
function isString(s) {
  return typeof s === "string";
}
function isNonNullObject(o) {
  return !!o && typeof o === "object" && !Array.isArray(o);
}
function isChatMessage(m) {
  return isNonNullObject(m) && typeof m.Type === "string" && typeof m.Content === "string";
}
function isCharacter(c) {
  return isNonNullObject(c) && typeof c.IsPlayer === "function";
}
function isStringOrStringArray(c) {
  return isString(c) || Array.isArray(c) && c.every(isString);
}
function isWardrobe(o) {
  return Array.isArray(o) && o.every((b) => isItemBundleArray(b) || b === null);
}
function isItemBundle(o) {
  return isNonNullObject(o) && typeof o.Name === "string" && typeof o.Group === "string";
}
function isItemBundleArray(o) {
  return Array.isArray(o) && o.every(isItemBundle);
}
function mustNum(id, def = -Number.MAX_SAFE_INTEGER) {
  return id ?? def;
}
function deepCopy(o) {
  return structuredClone(o);
}
function objEntries(obj) {
  if (!isNonNullObject(obj)) {
    return [];
  }
  return Object.entries(obj);
}
function parseJSON(jsonString) {
  if (jsonString === null) {
    return null;
  }
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    logError("parsing JSON", e);
    return null;
  }
}
function drawTextFitLeft(text, x, y, width, color, backColor) {
  const ctx = window.MainCanvas.getContext("2d");
  if (!ctx) {
    throw new Error("could not get canvas 2d context");
  }
  const bk = ctx.textAlign;
  ctx.textAlign = "left";
  DrawTextFit(text, x, y, width, color, backColor);
  ctx.textAlign = bk;
}
function drawTooltip(x, y, width, text, align) {
  const canvas = window.MainCanvas.getContext("2d");
  if (!canvas) {
    throw new Error("could not get canvas 2d context");
  }
  const bak = canvas.textAlign;
  canvas.textAlign = align;
  DrawRect(x, y, width, 65, "#FFFF88");
  DrawEmptyRect(x, y, width, 65, "black", 2);
  DrawTextFit(text, align === "left" ? x + 3 : x + width / 2, y + 33, width - 6, "black");
  canvas.textAlign = bak;
}
function fbcChatNotify(node) {
  const div = document.createElement("div");
  div.setAttribute("class", "ChatMessage bce-notification");
  div.setAttribute("data-time", ChatRoomCurrentTime());
  div.setAttribute("data-sender", Player.MemberNumber?.toString());
  if (typeof node === "string") {
    div.appendChild(document.createTextNode(node));
  } else if (Array.isArray(node)) {
    div.append(...node);
  } else {
    div.appendChild(node);
  }
  ChatRoomAppendChat(div);
}
async function fbcNotify(text, duration = 5e3, properties = {}) {
  await waitFor(() => !!Player && new Date(ServerBeep?.Timer || 0) < /* @__PURE__ */ new Date());
  ServerBeep = {
    Timer: Date.now() + duration,
    Message: text,
    ...properties
  };
}
function fbcSendAction(text) {
  ServerSend("ChatRoomChat", {
    Content: "Beep",
    Type: "Action",
    Dictionary: [
      // EN
      { Tag: "Beep", Text: "msg" },
      // CN
      { Tag: "\u53D1\u9001\u79C1\u804A", Text: "msg" },
      // DE
      { Tag: "Biep", Text: "msg" },
      // FR
      { Tag: "Sonner", Text: "msg" },
      // Message itself
      { Tag: "msg", Text: text }
    ]
  });
}
function addCustomEffect(effect) {
  let updated = false;
  const pronouns = Player.Appearance.find((a) => a.Asset.Group.Name === "Pronouns");
  if (!pronouns) {
    logWarn("Could not find pronouns asset.");
    return updated;
  }
  if (!pronouns.Property) {
    pronouns.Property = { Effect: [effect] };
    updated = true;
  } else if (!pronouns.Property.Effect) {
    pronouns.Property.Effect = [effect];
    updated = true;
  } else if (!pronouns.Property.Effect.includes(effect)) {
    pronouns.Property.Effect.push(effect);
    updated = true;
  }
  if (updated && ServerPlayerIsInChatRoom()) {
    ChatRoomCharacterUpdate(Player);
  }
  return updated;
}
function removeCustomEffect(effect) {
  const pronouns = Player.Appearance.find((a) => a.Asset.Group.Name === "Pronouns");
  let updated = false;
  if (pronouns?.Property?.Effect?.includes(effect)) {
    pronouns.Property.Effect = pronouns.Property.Effect.filter((e) => e !== effect);
    updated = true;
  }
  if (updated && ServerPlayerIsInChatRoom()) {
    ChatRoomCharacterUpdate(Player);
  }
  return updated;
}
function enableLeashing() {
  addCustomEffect("Leash");
}
function disableLeashing() {
  removeCustomEffect("Leash");
}

// src/util/constants.ts
var FBC_VERSION = "6.3.8";
var settingsVersion = 63.6;
var SUPPORTED_GAME_VERSIONS = ["R112", "R113"];
var fbcChangelog = `WCE v6.3.8
* BC R113 compatibility and other fixes
* fixes extended wardrobe creation for new accounts (just reenable it again now)
* for a full changelog visit our new website: https://wce-docs.vercel.app/blog

WCE v6.3
* configure layer hiding in layering menus

WCE v6.2
* WCE 6.2 is a fork of the old FBC 5.8 and tries to bring all it's amazing features back
* new Anti Garble system, layering improvements, local wardrobe and other fixes and improvements
* please recheck your WCE settings, because many things have changed
`;
var WEBSITE_URL = "https://wce-docs.vercel.app";
var BCE_COLOR_ADJUSTMENTS_CLASS_NAME = "bce-colors";
var BCE_LICENSE = "https://github.com/KittenApps/WCE/blob/main/LICENSE";
var BCE_MAX_AROUSAL = 99.6;
var BCE_MSG = "BCEMsg";
var DARK_INPUT_CLASS = "bce-dark-input";
var DEFAULT_WARDROBE_SIZE = 24;
var EXPANDED_WARDROBE_SIZE = 96;
var LOCAL_WARDROBE_SIZE = EXPANDED_WARDROBE_SIZE * 4;
var HIDDEN = "Hidden";
var MESSAGE_TYPES = Object.freeze({
  Activity: "Activity",
  ArousalSync: "ArousalSync",
  Hello: "Hello"
});
var WHISPER_CLASS = "bce-whisper-input";

// src/util/modding.ts
var deviatingHashes = [];
var skippedFunctionality = [];
var HOOK_PRIORITIES = {
  Top: 11,
  OverrideBehaviour: 10,
  ModifyBehaviourHigh: 6,
  ModifyBehaviourMedium: 5,
  ModifyBehaviourLow: 4,
  AddBehaviour: 3,
  Observe: 0
};
var SDK = bcModSdk.registerMod(
  {
    name: "WCE",
    version: FBC_VERSION,
    fullName: "Wholesome Club Extensions",
    repository: "https://github.com/KittenApps/WCE.git"
  },
  { allowReplace: false }
);
function patchFunction(functionName, patches, affectedFunctionality) {
  if (deviatingHashes.includes(functionName) && SUPPORTED_GAME_VERSIONS.includes(GameVersion)) {
    logWarn(
      `Attempted patching of ${functionName} despite detected deviation. Impact may be: ${affectedFunctionality}

See /wcedebug in a chatroom for more information or copy(await fbcDebug()) in console.`
    );
    skippedFunctionality.push(affectedFunctionality);
  }
  SDK.patchFunction(functionName, patches);
}

// src/functions/appendSocketListenersToInit.ts
var listeners = [];
function registerSocketListener(event, cb) {
  if (!listeners.some((l) => l[1] === cb)) {
    listeners.push([event, cb]);
    return ServerSocket.on(event, cb);
  }
  return null;
}
function appendSocketListenersToInit() {
  SDK.hookFunction(
    "ServerInit",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const ret = next(args);
      for (const [event, cb] of listeners) {
        ServerSocket.on(event, cb);
      }
      return ret;
    }
  );
}

// src/functions/hookBCXAPI.ts
var BCX = null;
async function hookBCXAPI() {
  await waitFor(() => !!window.bcx);
  BCX = window.bcx?.getModApi("WCE") ?? null;
}

// src/util/localization.ts
function displayText(original, replacements = {}) {
  const translations = Object.freeze({
    CN: {
      "Automatic Arousal Expressions (Replaces Vanilla)": "\u81EA\u52A8\u6B32\u671B\u8868\u60C5 (\u66FF\u6362\u539F\u7248)",
      "Activity Expressions": "\u6D3B\u52A8\u8868\u793A",
      "Alternate Arousal (Replaces Vanilla, requires hybrid/locked arousal meter)": "\u53E6\u4E00\u79CD\u6B32\u671B (\u66FF\u6362\u539F\u7248, \u9700\u8981\u6DF7\u5408\u6216\u9501\u5B9A\u6B32\u671B\u6761)",
      "Alternative speech stutter": "\u53E6\u4E00\u79CD\u8A00\u8BED\u4E0D\u6E05",
      "Extended wardrobe slots (96)": "\u6269\u5C55\u8863\u67DC\u4FDD\u5B58\u69FD (96\u4E2A)",
      "Replace wardrobe list with character previews": "\u4F7F\u7528\u89D2\u8272\u9884\u89C8\u66FF\u6362\u8863\u67DC\u4FDD\u5B58\u5217\u8868",
      "Clear Drawing Cache Hourly": "\u6BCF\u5C0F\u65F6\u6E05\u9664\u7ED8\u56FE\u7F13\u5B58",
      "Instant messenger": "\u5373\u65F6\u901A\u8BAF",
      "Chat Links and Embeds": "\u804A\u5929\u94FE\u63A5\u548C\u5D4C\u5165",
      "Use Ctrl+Enter to OOC": "\u4F7F\u7528Ctrl+Enter\u8FDB\u884COOC\u53D1\u8A00",
      "Use italics for input when whispering": "\u6084\u6084\u8BDD\u4F7F\u7528\u659C\u4F53\u5B57",
      "Improve colors for readability": "\u6539\u5584\u989C\u8272\u4EE5\u63D0\u9AD8\u53EF\u8BFB\u6027",
      "Show friend presence notifications": "\u663E\u793A\u597D\u53CB\u5728\u7EBF\u901A\u77E5",
      "Understand All Gagged and when Deafened": "\u5728\u88AB\u5835\u4F4F\u5634\u548C\u88AB\u5835\u4F4F\u8033\u6735\u65F6\u53EF\u4EE5\u542C\u61C2\u6240\u6709\u53D1\u8A00",
      "Reveal Lockpicking Order Based on Skill": "\u6839\u636E\u6280\u80FD\u663E\u793A\u64AC\u9501/\u5F00\u9501\u987A\u5E8F",
      "Allow layering menus while bound": "\u5141\u8BB8\u5728\u6346\u7ED1\u65F6\u7528\u5206\u5C42\u83DC\u5355",
      "Limited gag anti-cheat: cloth-gag equivalent garbling": "\u6709\u9650\u7684\u5835\u5634\u53CD\u4F5C\u5F0A: \u548C\u5E03\u5835\u5634\u76F8\u540C\u7684\u4E71\u7801",
      "Full gag anti-cheat: use equipped gags to determine garbling": "\u5B8C\u6574\u7684\u5835\u5634\u53CD\u4F5C\u5F0A: \u4F7F\u7528\u5F53\u524D\u88C5\u5907\u7684\u5835\u5634\u6765\u786E\u5B9A\u4E71\u7801",
      "Extra gag anti-cheat: even more garbling for the most extreme gags": "\u6269\u5C55\u7684\u5835\u5634\u53CD\u4F5C\u5F0A: \u5BF9\u4E8E\u4F7F\u7528\u6700\u6781\u7AEF\u7684\u5835\u5634\u66F4\u52A0\u6DF7\u4E71",
      "Require glasses to see": "\u9700\u8981\u773C\u955C\u624D\u80FD\u770B\u6E05",
      "Automatic Relogin on Disconnect": "\u65AD\u7EBF\u540E\u81EA\u52A8\u91CD\u8FDE",
      "Show gag cheat and anti-cheat options in chat": "\u5728\u804A\u5929\u5BA4\u91CC\u663E\u793A\u5835\u5634\u4F5C\u5F0A\u548C\u53CD\u4F5C\u5F0A\u9009\u9879",
      "Automatically ghost+blocklist unnaturally new users": "\u81EA\u52A8\u5BF9\u4E0D\u81EA\u7136\u7684\u7528\u6237\u65E0\u89C6\u5E76\u6DFB\u52A0\u9ED1\u540D\u5355",
      "Confirm leaving the game": "\u79BB\u5F00\u6E38\u620F\u524D\u9700\u8981\u786E\u8BA4",
      "Discreet mode (disable drawing)": "\u8C28\u614E\u6A21\u5F0F (\u7981\u7528\u7ED8\u56FE)",
      "Make automatic progress while struggling": "\u5728\u6323\u624E\u65F6\u81EA\u52A8\u589E\u52A0\u8FDB\u5EA6",
      "Allow leashing without wearing a leashable item (requires leasher to have WCE too)": "\u5141\u8BB8\u5728\u4E0D\u4F69\u6234\u7275\u5F15\u7EF3\u7684\u60C5\u51B5\u4E0B\u4E5F\u53EF\u4EE5\u8FDB\u884C\u7275\u5F15\uFF08\u9700\u8981\u7275\u5F15\u8005\u4E5F\u5B89\u88C5\u6709WCE\uFF09",
      "Enable buttplug.io (requires refresh)": "\u542F\u7528buttplug.io\uFF08\u9700\u8981\u5237\u65B0\u7F51\u9875)",
      "This page allows configuration of the synchronization of bluetooth connected toys.": "\u6B64\u9875\u9762\u5141\u8BB8\u914D\u7F6E\u5C06BC\u9707\u52A8\u5668\u72B6\u6001\u540C\u6B65\u5230\u84DD\u7259\u8FDE\u63A5\u7684\u73A9\u5177",
      "Save & browse seen profiles (requires refresh)": "\u4FDD\u5B58\u5E76\u6D4F\u89C8\u5DF2\u77E5\u7684\u4E2A\u4EBA\u8D44\u6599 (\u9700\u8981\u5237\u65B0)",
      "Chat & Social": "\u804A\u5929 & \u793E\u4EA4",
      "Activities & Arousal": "\u6D3B\u52A8 & \u6B32\u671B",
      "Appearance & Wardrobe": "\u5916\u89C2 & \u8863\u67DC",
      "Immersion & Anti-Cheat": "\u6C89\u6D78\u4F53\u9A8C & \u53CD\u4F5C\u5F0A",
      Performance: "\u8868\u73B0",
      Misc: "\u6742\u9879",
      Cheats: "\u4F5C\u5F0A",
      ah: "\u554A",
      aah: "\u554A\u2764",
      mnm: "\u5514\u59C6",
      nn: "\u55EF\u554A",
      mnh: "\u55EF\u54C8",
      mngh: "\u5514\u554A",
      haa: "\u54C8\u554A",
      nng: "\u55EF\u55EF\u2764",
      mnng: "\u5514\u554A\u2764",
      "FBC Developer": "FBC \u5F00\u53D1\u8005",
      "WCE Developer": "WCE \u5F00\u53D1\u8005",
      Incompatibility: "\u4E0D\u517C\u5BB9",
      "Show recent WCE changelog": "\u663E\u793A\u6700\u8FD1\u7684WCE\u66F4\u65B0\u65E5\u5FD7",
      "Include binds?": "\u5305\u62EC\u675F\u7F1A\uFF1F",
      "Include locks?": "\u5305\u62EC\u9501\uFF1F",
      "Include height, body type, hair, etc?": "\u5305\u62EC\u8EAB\u9AD8\uFF0C\u4F53\u578B\uFF0C\u5934\u53D1\u7B49\uFF1F",
      "Copy the looks string below": "\u590D\u5236\u4E0B\u9762\u7684\u5916\u89C2\u5B57\u7B26\u4E32",
      "Paste your looks here": "\u5728\u8FD9\u91CC\u7C98\u8D34\u4F60\u7684\u5916\u89C2",
      "No looks string provided": "\u6CA1\u6709\u63D0\u4F9B\u5916\u89C2\u5B57\u7B26\u4E32",
      "Applied looks": "\u5E94\u7528\u5916\u89C2",
      "Could not parse looks": "\u65E0\u6CD5\u89E3\u6790\u5916\u89C2",
      "[membernumber] [message]: beep someone": "[\u7528\u6237\u7F16\u53F7] [\u6D88\u606F]: \u53D1\u9001beep",
      "Wholesome Club Extensions (WCE) Settings": "Wholesome Club Extensions (WCE)\u8BBE\u7F6E",
      "Join Discord": "\u52A0\u5165Discord",
      License: "\u6388\u6743",
      Information: "\u4FE1\u606F",
      "Still connecting or connection failed...": "\u6B63\u5728\u8FDE\u63A5\u6216\u8FDE\u63A5\u5931\u8D25...",
      Scan: "\u641C\u7D22",
      "Device Name": "\u8BBE\u5907\u540D\u79F0",
      "Synchronized Slot": "\u540C\u6B65\u680F\u4F4D",
      "Click on a setting to see its description": "\u70B9\u51FB\u8BBE\u7F6E\u4EE5\u67E5\u770B\u5176\u63CF\u8FF0",
      "WCE Settings": "WCE\u8BBE\u7F6E",
      "Saved Logins (WCE)": "\u5DF2\u4FDD\u5B58\u7684\u767B\u5F55 (WCE)",
      "Save (WCE)": "\u4FDD\u5B58 (WCE)",
      "Reconnected!": "\u91CD\u65B0\u8FDE\u63A5\uFF01",
      ERROR: "\u9519\u8BEF",
      "Reset all expressions": "\u91CD\u7F6E\u6240\u6709\u8868\u60C5",
      "['list' or name of emote]: run an animation": "['list' \u6216 \u8868\u60C5\u540D\u79F0]: \u8FD0\u884C\u4E00\u4E2A\u52A8\u753B",
      "['list' or list of poses]: set your pose": "['list' \u6216 \u59FF\u52BF\u5217\u8868]: \u8BBE\u7F6E\u4F60\u7684\u59FF\u52BF",
      "Load without body parts": "\u52A0\u8F7D\u65F6\u4E0D\u5305\u62EC\u8EAB\u4F53\u90E8\u4F4D",
      "Exclude body parts": "\u6392\u9664\u8EAB\u4F53\u90E8\u4F4D",
      Gagging: "\u5835\u5634",
      "Antigarble anti-cheat strength": "\u53CD\u5835\u5634\u53CD\u4F5C\u5F0A\u5F3A\u5EA6",
      "Understand: Yes": "\u7406\u89E3: \u662F",
      "Understand gagspeak: No": "\u7406\u89E3\u5835\u5634\u8BF4\u8BDD: \u5426",
      "Understand gagspeak: Yes": "\u7406\u89E3\u5835\u5634\u8BF4\u8BDD: \u662F",
      "Having recovered your glasses you can see again!": "\u627E\u56DE\u4E86\u4F60\u7684\u773C\u955C\uFF0C\u4F60\u53EF\u4EE5\u770B\u89C1\u4E86\uFF01",
      "Having lost your glasses your eyesight is impaired!": "\u5931\u53BB\u4E86\u4F60\u7684\u773C\u955C\uFF0C\u4F60\u7684\u89C6\u529B\u53D7\u635F\u4E86\uFF01",
      "([WCE] Force them to become a Club Slave.)": "([WCE] \u5F3A\u5236\u4ED6\u4EEC\u6210\u4E3A\u4FF1\u4E50\u90E8\u5974\u96B6\u3002)",
      "(She will become a Club Slave for the next hour.)": "(\u5979\u5C06\u6210\u4E3A\u4FF1\u4E50\u90E8\u5974\u96B6\uFF0C\u6301\u7EED\u4E00\u4E2A\u5C0F\u65F6\u3002)",
      "Search for a friend": "\u641C\u7D22\u597D\u53CB",
      "Sending beeps is currently restricted by BCX rules": "\u53D1\u9001beep\u76EE\u524D\u53D7\u5230BCX\u89C4\u5219\u7684\u9650\u5236",
      Online: "\u5728\u7EBF",
      Offline: "\u79BB\u7EBF",
      "Instant Messenger (Disabled by BCX)": "\u5373\u65F6\u901A\u8BAF\u5668 (\u88ABBCX\u7981\u7528)",
      "Instant Messenger": "\u5373\u65F6\u901A\u8BAF\u5668",
      "WCE Changelog": "WCE\u66F4\u65B0\u65E5\u5FD7",
      "Trust this session": "\u4FE1\u4EFB\u6B64\u4F1A\u8BDD",
      "(embed)": "(\u5D4C\u5165)",
      "(This origin is trusted by authors of WCE)": "(\u6B64\u6765\u6E90\u5DF2\u88ABWCE\u4F5C\u8005\u4FE1\u4EFB)",
      "Deny for session": "\u62D2\u7EDD\u6B64\u4F1A\u8BDD",
      "Allow for session": "\u5141\u8BB8\u6B64\u4F1A\u8BDD",
      OnlineChat: "\u5728\u7EBF\u804A\u5929",
      "Scans for connected buttplug.io toys": "\u626B\u63CF\u5DF2\u8FDE\u63A5\u7684buttplug.io\u73A9\u5177",
      "buttplug.io is not connected": "buttplug.io\u672A\u8FDE\u63A5",
      "Scanning stopped": "\u626B\u63CF\u505C\u6B62",
      "Scanning for toys": "\u626B\u63CF\u73A9\u5177",
      "Last seen: ": "\u6700\u540E\u5728\u7EBF: ",
      "No profile found": "\u672A\u627E\u5230\u4E2A\u4EBA\u8D44\u6599",
      Open: "\u6253\u5F00",
      "Saved Profiles": "\u5DF2\u4FDD\u5B58\u7684\u4E2A\u4EBA\u8D44\u6599",
      "Personal notes (only you can read these):": "\u4E2A\u4EBA\u7B14\u8BB0 (\u53EA\u6709\u4F60\u53EF\u4EE5\u8BFB\u5230):",
      "[WCE] Notes": "[WCE] \u7B14\u8BB0",
      "Toggle Editing Mode": "\u5207\u6362\u7F16\u8F91\u6A21\u5F0F",
      "Paste the craft here": "\u5728\u8FD9\u91CC\u7C98\u8D34\u5236\u4F5C\u7269\u54C1",
      "Copy the craft here": "\u5728\u8FD9\u91CC\u590D\u5236\u5236\u4F5C\u7269\u54C1",
      Import: "\u5BFC\u5165",
      Export: "\u5BFC\u51FA",
      "Description:": "\u63CF\u8FF0:",
      "Animation Engine": "\u52A8\u753B\u5F15\u64CE",
      "Show numeric arousal meter": "\u663E\u793A\u6B32\u671B\u6761\u6570\u503C",
      "Show friends going offline too": "\u663E\u793A\u670B\u53CB\u79BB\u7EBF\u901A\u77E5",
      "Show friend presence notifications in chat, when possible": "\u5728\u804A\u5929\u5BA4\u91CC\u663E\u793A\u597D\u53CB\u5728\u7EBF\u901A\u77E5",
      "Show sent messages while waiting for server": "\u5728\u7B49\u5F85\u670D\u52A1\u5668\u65F6\u663E\u793A\u5DF2\u53D1\u9001\u7684\u6D88\u606F",
      "Show whisper button on chat messages (requires refresh)": "\u5728\u804A\u5929\u6D88\u606F\u4E0A\u663E\u793A\u6084\u6084\u8BDD\u6309\u94AE \uFF08\u9700\u8981\u5237\u65B0\u7F51\u9875)",
      "Rich online profile": "\u4E30\u5BCC\u7684\u5728\u7EBF\u4E2A\u4EBA\u8D44\u6599",
      "Allow IMs to bypass BCX beep restrictions": "\u5141\u8BB8\u5373\u65F6\u901A\u8BAF\u7ED5\u8FC7BCX beep\u9650\u5236",
      "Hide the hidden items icon": "\u4E0D\u663E\u793A\u9690\u85CF\u7684\u7269\u54C1\u56FE\u6807",
      "Enable anti-cheat": "\u542F\u7528\u53CD\u4F5C\u5F0A",
      "Blacklist detected cheaters automatically": "\u81EA\u52A8\u5C06\u68C0\u6D4B\u5230\u7684\u4F5C\u5F0A\u8005\u52A0\u5165\u9ED1\u540D\u5355",
      "Enable uwall anti-cheat": "\u542F\u7528uwall\u53CD\u4F5C\u5F0A",
      "Prompt before loading content from a 3rd party domain": "\u5728\u52A0\u8F7D\u7B2C\u4E09\u65B9\u57DF\u540D\u7684\u5185\u5BB9\u524D\u63D0\u793A",
      "Share Addons": "\u5206\u4EAB\u63D2\u4EF6\u8BBE\u7F6E",
      "Buttplug Devices": "Buttplug\u8BBE\u5907"
    }
  });
  let text = translations[TranslationLanguage]?.[original] ?? original;
  for (const [key, val] of Object.entries(replacements)) {
    while (text.includes(key)) {
      text = text.replace(key, val);
    }
  }
  return text;
}

// src/functions/forcedClubSlave.ts
async function bceStartClubSlave() {
  if (BCX?.getRuleState("block_club_slave_work")?.isEnforced) {
    fbcSendAction(displayText("BCX rules forbid $PlayerName from becoming a Club Slave.", { $PlayerName: CharacterNickname(Player) }));
    return;
  }
  fbcSendAction(
    displayText("$PlayerName gets grabbed by two maids and escorted to management to serve as a Club Slave.", { $PlayerName: CharacterNickname(Player) })
  );
  if (!ChatRoomData) {
    logError("ChatRoomData is null in bceStartClubSlave. Was it called outside a chat room?");
    return;
  }
  const room = ChatRoomData.Name;
  ChatRoomLeave(false);
  ChatRoomLeashPlayer = null;
  CommonSetScreen("Room", "Management");
  await waitFor(() => !!ManagementMistress);
  if (!ManagementMistress) {
    throw new Error("ManagementMistress is missing");
  }
  PoseSetActive(Player, "Kneel", false);
  ManagementMistress.Stage = "320";
  ManagementMistress.CurrentDialog = displayText(
    "(You get grabbed by a pair of maids and brought to management.) Your owner wants you to be a Club Slave. Now strip."
  );
  CharacterSetCurrent(ManagementMistress);
  await waitFor(() => CurrentScreen !== "Management" || !CurrentCharacter);
  bceGotoRoom(room);
}
function bceGotoRoom(roomName) {
  ChatRoomJoinLeash = roomName;
  DialogLeave();
  if (CurrentScreen === "ChatRoom") ChatRoomLeave(false);
  if (roomName) {
    ChatRoomStart("X", "", null, null, "Introduction", BackgroundsTagList);
  } else {
    ChatRoomSetLastChatRoom(null);
    CommonSetScreen("Room", "MainHall");
  }
}
async function forcedClubSlave() {
  async function patchDialog() {
    await waitFor(
      () => !!CommonCSVCache["Screens/Online/ChatRoom/Dialog_Online.csv"] && CommonCSVCache["Screens/Online/ChatRoom/Dialog_Online.csv"].length > 150
    );
    const clubSlaveDialog = [
      [
        "160",
        "100",
        displayText("([WCE] Force them to become a Club Slave.)"),
        displayText("(She will become a Club Slave for the next hour.)"),
        "bceSendToClubSlavery()",
        "bceCanSendToClubSlavery()"
      ],
      [
        "160",
        "160",
        displayText("([WCE] Force them to become a Club Slave.)"),
        displayText("(Requires both to use compatible versions of WCE and the target to not already be a club slave.)"),
        "",
        "!bceCanSendToClubSlavery()"
      ]
    ];
    const idx = CommonCSVCache["Screens/Online/ChatRoom/Dialog_Online.csv"].findIndex((v) => v[0] === "160") + 1;
    CommonCSVCache["Screens/Online/ChatRoom/Dialog_Online.csv"].splice(idx, 0, ...clubSlaveDialog);
    function appendDialog(C) {
      if (!C.Dialog || C.Dialog.some((v) => v.FBC)) {
        return;
      }
      C.Dialog.splice(
        idx,
        0,
        ...clubSlaveDialog.map((v) => ({
          Stage: v[0],
          NextStage: v[1],
          Option: v[2],
          Result: v[3],
          Function: v[4] === "" ? null : `ChatRoom${v[4]}`,
          Prerequisite: v[5],
          Group: null,
          Trait: null,
          FBC: true
        }))
      );
    }
    for (const c of ChatRoomCharacter.filter((cc) => !cc.IsPlayer() && cc.IsOnline())) {
      appendDialog(c);
    }
    if (GameVersion !== "R112") {
      SDK.hookFunction(
        "CharacterBuildDialog",
        HOOK_PRIORITIES.AddBehaviour,
        ([C, CSV, functionPrefix, reload], next) => {
          const ret = next([C, CSV, functionPrefix, false]);
          if (isCharacter(C) && C.IsOnline()) appendDialog(C);
          if (reload && DialogMenuMode === "dialog") DialogMenuMapping.dialog.Reload(null, null, { reset: true });
          return ret;
        }
      );
    } else {
      SDK.hookFunction(
        "CharacterBuildDialog",
        HOOK_PRIORITIES.AddBehaviour,
        (args, next) => {
          const ret = next(args);
          const [C] = args;
          if (isCharacter(C) && C.IsOnline()) {
            appendDialog(C);
          }
          return ret;
        }
      );
    }
  }
  const patch = patchDialog();
  function bceSendToClubSlavery() {
    const message = {
      Type: HIDDEN,
      Content: BCE_MSG,
      Sender: Player.MemberNumber,
      Dictionary: [
        {
          // @ts-ignore - cannot extend valid dictionary entries to add our type to it, but this is possible within the game's wire format
          message: {
            type: MESSAGE_TYPES.Activity,
            version: FBC_VERSION,
            activity: "ClubSlavery"
          }
        }
      ]
    };
    ServerSend("ChatRoomChat", message);
    DialogLeave();
  }
  function bceCanSendToClubSlavery() {
    const C = CurrentCharacter;
    if (!C) {
      return false;
    }
    return C.BCECapabilities?.includes("clubslave") && !C.Appearance.some((a) => a.Asset.Name === "ClubSlaveCollar");
  }
  globalThis.bceGotoRoom = bceGotoRoom;
  globalThis.ChatRoombceSendToClubSlavery = bceSendToClubSlavery;
  globalThis.ChatRoombceCanSendToClubSlavery = bceCanSendToClubSlavery;
  await patch;
}

// src/functions/hiddenMessageHandler.ts
function sendHello(target = null, requestReply = false) {
  if (!settingsLoaded()) return;
  if (!ServerIsConnected || !ServerPlayerIsInChatRoom()) return;
  const capabilities = ["clubslave", "layeringHide"];
  if (fbcSettings.preventLayeringByOthers) capabilities.push("preventLayeringByOthers");
  const message = {
    Type: HIDDEN,
    Content: BCE_MSG,
    Sender: Player.MemberNumber,
    Dictionary: []
  };
  const fbcMessage = {
    message: {
      type: MESSAGE_TYPES.Hello,
      version: FBC_VERSION,
      alternateArousal: !!fbcSettings.alternateArousal,
      replyRequested: requestReply,
      capabilities
    }
  };
  if (target) {
    message.Target = target;
  }
  if (fbcSettings.alternateArousal) {
    fbcMessage.message.progress = Player.BCEArousalProgress || Player.ArousalSettings?.Progress || 0;
    fbcMessage.message.enjoyment = Player.BCEEnjoyment || 1;
  }
  if (fbcSettings.shareAddons) {
    fbcMessage.message.otherAddons = bcModSdk.getModsInfo();
  }
  message.Dictionary.push(fbcMessage);
  ServerSend("ChatRoomChat", message);
}
async function hiddenMessageHandler() {
  await waitFor(() => ServerSocket && ServerIsConnected);
  function parseBCEMessage(data) {
    let message = {};
    if (Array.isArray(data.Dictionary)) {
      const dicts = data.Dictionary;
      message = dicts?.find((t) => t.message)?.message || message;
    } else {
      const dict = data.Dictionary;
      message = dict?.message || message;
    }
    return message;
  }
  function processBCEMessage(sender, message, deferred = false) {
    debug("Processing BCE message", sender, message, deferred ? "(deferred)" : "");
    if (!sender?.ArousalSettings && !deferred) {
      logWarn("No arousal settings found for", sender, "; deferring execution to microtask.");
      queueMicrotask(() => processBCEMessage(sender, message, true));
      return;
    }
    if (!sender?.ArousalSettings) logWarn("No arousal settings found for", sender);
    switch (message.type) {
      case MESSAGE_TYPES.Hello:
        processHello(sender, message);
        break;
      case MESSAGE_TYPES.ArousalSync:
        sender.BCEArousal = message.alternateArousal || false;
        sender.BCEArousalProgress = message.progress || 0;
        sender.BCEEnjoyment = message.enjoyment || 1;
        break;
      case MESSAGE_TYPES.Activity:
        if (sender.MemberNumber === Player.Ownership?.MemberNumber && !Player.Appearance.some((a) => a.Asset.Name === "ClubSlaveCollar")) {
          bceStartClubSlave();
        }
        break;
    }
  }
  function processHello(sender, message) {
    sender.FBC = message.version ?? "0.0";
    sender.BCEArousal = message.alternateArousal || false;
    sender.BCEArousalProgress = message.progress || sender.ArousalSettings?.Progress || 0;
    sender.BCEEnjoyment = message.enjoyment || 1;
    sender.BCECapabilities = message.capabilities ?? [];
    if (message.replyRequested) sendHello(sender.MemberNumber);
    sender.FBCOtherAddons = message.otherAddons;
  }
  registerSocketListener("ChatRoomMessage", (data) => {
    if (data.Type !== HIDDEN) return;
    if (data.Content === "BCEMsg") {
      const sender = Character.find((a) => a.MemberNumber === data.Sender);
      if (!sender) return;
      const message = parseBCEMessage(data);
      processBCEMessage(sender, message);
    }
  });
  registerSocketListener("ChatRoomSyncMemberJoin", (data) => {
    if (data.SourceMemberNumber !== Player.MemberNumber) sendHello(data.SourceMemberNumber);
  });
  registerSocketListener("ChatRoomSync", () => {
    sendHello();
  });
}

// src/util/hooks.ts
var timers = [];
function createTimer(cb, intval) {
  timers.push({ cb, intval, lastTime: performance.now() });
  return () => {
    timers.splice(timers.findIndex((t) => t.cb === cb), 1);
  };
}
SDK.hookFunction(
  "GameRun",
  HOOK_PRIORITIES.Top,
  (args, next) => {
    if (document.hidden) {
      return next(args);
    }
    const ts = performance.now();
    timers.forEach((t) => {
      if (ts - t.lastTime > t.intval) {
        t.lastTime = ts;
        t.cb();
      }
    });
    return next(args);
  }
);
SDK.hookFunction(
  "GameRunBackground",
  HOOK_PRIORITIES.Top,
  /**
   * @param {Parameters<typeof GameRun>} args
   */
  (args, next) => {
    if (!document.hidden) {
      return next(args);
    }
    const ts = performance.now();
    timers.forEach((t) => {
      if (ts - t.lastTime > t.intval) {
        t.lastTime = ts;
        t.cb();
      }
    });
    return next(args);
  }
);
function fbcBeepNotify(title, text) {
  SDK.callOriginal("ServerAccountBeep", [
    {
      MemberNumber: Player.MemberNumber || -1,
      BeepType: "",
      MemberName: "WCE",
      ChatRoomName: title,
      Private: true,
      Message: text,
      ChatRoomSpace: ""
    }
  ]);
}

// src/functions/toySync.ts
var toySyncState = { deviceSettings: /* @__PURE__ */ new Map() };
async function toySync() {
  if (!fbcSettings.toySync) {
    return;
  }
  const { ButtplugClient, ButtplugBrowserWebsocketClientConnector } = await Promise.resolve().then(() => __toESM(require_src(), 1));
  logInfo("Loaded Buttplug.io");
  const client = new ButtplugClient("WCE Toy Sync");
  client.addListener(
    "deviceadded",
    (device) => {
      debug("Device connected", device);
      fbcChatNotify(displayText("Vibrator connected: $DeviceName", { $DeviceName: device.name }));
      const deviceSettings = toySyncState.deviceSettings.get(device.name);
      if (deviceSettings) delete deviceSettings.LastIntensity;
    }
  );
  client.addListener(
    "deviceremoved",
    (device) => {
      debug("Device disconnected", device);
      fbcChatNotify(displayText("Vibrator disconnected: $DeviceName", { $DeviceName: device.name }));
    }
  );
  client.addListener("scanningfinished", (data) => {
    debug("Scanning finished", data);
  });
  const connector = new ButtplugBrowserWebsocketClientConnector(fbcSettings.toySyncAddress || "ws://127.0.0.1:12345");
  try {
    await client.connect(connector);
    logInfo("Connected buttplug.io");
  } catch (ex) {
    FUSAM.modals.openAsync({
      prompt: displayText(
        "buttplug.io is enabled, but server could not be contacted at $toySyncAddress. Is Intiface Desktop running? Is another client connected to it?",
        { $toySyncAddress: fbcSettings.toySyncAddress }
      ),
      buttons: { submit: "OK" }
    });
    logError("buttplug.io could not connect to server", ex);
    return;
  }
  toySyncState.client = client;
  const removeTimer = createTimer(() => {
    if (!client.connected) {
      removeTimer();
      return;
    }
    for (const d of client.devices.filter((dev) => dev.vibrateAttributes.length > 0)) {
      const deviceSettings = toySyncState.deviceSettings?.get(d.name);
      if (!deviceSettings) continue;
      const slot = deviceSettings.SlotName;
      const intensity = Player.Appearance.find((a) => a.Asset.Group.Name === slot)?.Property?.Intensity;
      if (deviceSettings.LastIntensity === intensity) continue;
      deviceSettings.LastIntensity = intensity;
      if (typeof intensity !== "number" || intensity < 0) {
        d.vibrate(0);
      } else {
        switch (intensity) {
          case 0:
            d.vibrate(0.1);
            debug(d.name, slot, "intensity 0.1");
            break;
          case 1:
            d.vibrate(0.4);
            debug(d.name, slot, "intensity 0.4");
            break;
          case 2:
            d.vibrate(0.75);
            debug(d.name, slot, "intensity 0.75");
            break;
          case 3:
            d.vibrate(1);
            debug(d.name, slot, "intensity 1");
            break;
          default:
            logWarn("Invalid intensity in ", slot, ":", intensity);
            break;
        }
      }
    }
  }, 3e3);
  CommandCombine([
    {
      Tag: "toybatteries",
      Description: displayText("Shows the battery status of all connected buttplug.io toys"),
      Action: () => {
        if (!client.connected) {
          fbcChatNotify("buttplug.io is not connected");
          return;
        }
        const batteryDevices = client.devices.filter((dev) => dev.hasBattery);
        if (batteryDevices.length === 0) {
          fbcChatNotify("No battery devices connected");
          return;
        }
        Promise.all(batteryDevices.map((dev) => dev.battery())).then((batteryStatus) => {
          for (let i = 0; i < batteryDevices.length; i++) {
            const battery = batteryStatus[i] * 100;
            fbcChatNotify(`${batteryDevices[i].name}: ${battery}%`);
          }
        });
      }
    },
    {
      Tag: "toyscan",
      Description: displayText("Scans for connected buttplug.io toys"),
      Action: () => {
        if (!client.connected) {
          fbcChatNotify(displayText("buttplug.io is not connected"));
          return;
        }
        if (client.isScanning) {
          client.stopScanning();
          fbcChatNotify(displayText("Scanning stopped"));
          return;
        }
        client.startScanning();
        fbcChatNotify(displayText("Scanning for toys"));
      }
    }
  ]);
  await client.startScanning();
}

// src/functions/extendedWardrobe.ts
var localWardrobeTable;
var extendedWardrobeLoaded = false;
async function loadLocalWardrobe(wardrobe) {
  const { Dexie: Dexie2 } = await Promise.resolve().then(() => (init_import_wrapper(), import_wrapper_exports));
  const db = new Dexie2("wce-local-wardrobe");
  db.version(1).stores({ wardrobe: "id, appearance" });
  localWardrobeTable = db.table("wardrobe");
  const localWardrobe = await localWardrobeTable.toArray() || [];
  await waitFor(() => wardrobe.length === EXPANDED_WARDROBE_SIZE);
  wardrobe.push(...localWardrobe.map((w) => sanitizeBundles(w.appearance)));
}
async function saveLocalWardrobe(wardrobe) {
  await localWardrobeTable.bulkPut(wardrobe.map((appearance, id) => ({ id, appearance })));
}
function sanitizeBundles(bundleList) {
  if (!Array.isArray(bundleList)) return bundleList;
  return bundleList.map((bundle) => {
    if (typeof bundle.Property?.Type === "string" && !CommonIsObject(bundle.Property?.TypeRecord)) {
      const asset = AssetGet("Female3DCG", bundle.Group, bundle.Name);
      if (asset) bundle.Property.TypeRecord = ExtendedItemTypeToRecord(asset, bundle.Property.Type);
    }
    return bundle;
  });
}
function loadExtendedWardrobe(wardrobe, init) {
  if (fbcSettings.extendedWardrobe) {
    WardrobeSize = EXPANDED_WARDROBE_SIZE;
    WardrobeFixLength();
  }
  const wardrobeData = Player.ExtensionSettings.FBCWardrobe || Player.OnlineSettings?.BCEWardrobe;
  if (wardrobeData || !init) {
    if (Player.OnlineSettings?.BCEWardrobe) {
      Player.ExtensionSettings.FBCWardrobe = wardrobeData;
      ServerPlayerExtensionSettingsSync("FBCWardrobe");
      logInfo("Migrated wardrobe from OnlineSettings to ExtensionSettings");
      delete Player.OnlineSettings.BCEWardrobe;
    }
    try {
      const additionalItemBundle = wardrobeData ? parseJSON(LZString.decompressFromUTF16(wardrobeData)) : [];
      if (isWardrobe(additionalItemBundle)) {
        for (let i = DEFAULT_WARDROBE_SIZE; i < EXPANDED_WARDROBE_SIZE; i++) {
          const additionalIdx = i - DEFAULT_WARDROBE_SIZE;
          if (additionalIdx >= additionalItemBundle.length) {
            break;
          }
          wardrobe[i] = sanitizeBundles(additionalItemBundle[additionalIdx]);
        }
        extendedWardrobeLoaded = true;
      }
    } catch (e) {
      logError("Failed to load extended wardrobe", e);
      fbcBeepNotify("Wardrobe error", `Failed to load extended wardrobe.

Backup: ${wardrobeData}`);
      logInfo("Backup wardrobe", wardrobeData);
    }
  }
  return wardrobe;
}
async function extendedWardrobe() {
  await waitFor(() => !!ServerSocket);
  SDK.hookFunction(
    "CharacterCompressWardrobe",
    HOOK_PRIORITIES.Top,
    ([wardrobe], next) => {
      if (isWardrobe(wardrobe)) {
        const additionalWardrobe = wardrobe.slice(DEFAULT_WARDROBE_SIZE, EXPANDED_WARDROBE_SIZE);
        if (additionalWardrobe.length > 0 && extendedWardrobeLoaded) {
          Player.ExtensionSettings.FBCWardrobe = LZString.compressToUTF16(JSON.stringify(additionalWardrobe));
          const additionalLocalWardrobe = wardrobe.slice(EXPANDED_WARDROBE_SIZE);
          if (additionalLocalWardrobe.length > 0) saveLocalWardrobe(additionalLocalWardrobe);
          wardrobe = wardrobe.slice(0, DEFAULT_WARDROBE_SIZE);
          ServerPlayerExtensionSettingsSync("FBCWardrobe");
        }
      }
      return next([wardrobe]);
    }
  );
  SDK.hookFunction(
    "WardrobeLoadCharacterNames",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (!fbcSettings.localWardrobe) return next(args);
      if (!Player.WardrobeCharacterNames) Player.WardrobeCharacterNames = [];
      let Push = false;
      while (Player.WardrobeCharacterNames.length <= WardrobeSize) {
        if (Player.WardrobeCharacterNames.length < EXPANDED_WARDROBE_SIZE) {
          Player.WardrobeCharacterNames.push(Player.Name);
          Push = true;
        } else {
          Player.WardrobeCharacterNames.push("Local");
        }
      }
      if (Push) ServerAccountUpdate.QueueData({ WardrobeCharacterNames: Player.WardrobeCharacterNames.slice(0, EXPANDED_WARDROBE_SIZE) });
      return null;
    }
  );
}

// src/functions/customContentDomainCheck.js
var sessionCustomOrigins = /* @__PURE__ */ new Map();
function customContentDomainCheck() {
  const trustedOrigins = ["https://fs.kinkop.eu", "https://i.imgur.com"];
  let open2 = false;
  function showCustomContentDomainCheckWarning(origin, type = null) {
    if (open2) {
      return;
    }
    open2 = true;
    FUSAM.modals.open({
      prompt: displayText(`Do you want to allow 3rd party ${type ?? "content"} to be loaded from $origin? $trusted`, {
        $origin: origin,
        $trusted: trustedOrigins.includes(origin) ? displayText("(This origin is trusted by authors of WCE)") : ""
      }),
      callback: (act) => {
        open2 = false;
        if (act === "submit") {
          sessionCustomOrigins.set(origin, "allowed");
        } else if (act === "cancel") {
          sessionCustomOrigins.set(origin, "denied");
        }
      },
      buttons: {
        cancel: displayText("Deny for session"),
        submit: displayText("Allow for session")
      }
    });
  }
  SDK.hookFunction(
    "ChatAdminRoomCustomizationProcess",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      if (!fbcSettings.customContentDomainCheck) {
        return next(args);
      }
      try {
        const [{ ImageURL, MusicURL }] = args;
        const imageOrigin = ImageURL && new URL(ImageURL).origin;
        const musicOrigin = MusicURL && new URL(MusicURL).origin;
        if (imageOrigin && !sessionCustomOrigins.has(imageOrigin)) {
          showCustomContentDomainCheckWarning(imageOrigin, "image");
        } else if (musicOrigin && !sessionCustomOrigins.has(musicOrigin)) {
          showCustomContentDomainCheckWarning(musicOrigin, "music");
        }
        if ((!ImageURL || sessionCustomOrigins.get(imageOrigin) === "allowed") && (!MusicURL || sessionCustomOrigins.get(musicOrigin) === "allowed")) {
          return next(args);
        }
      } catch {
      }
      return null;
    }
  );
  SDK.hookFunction(
    "ChatAdminRoomCustomizationClick",
    HOOK_PRIORITIES.Observe,
    (args, next) => {
      for (const s of [ElementValue("InputImageURL").trim(), ElementValue("InputMusicURL").trim()]) {
        try {
          const url = new URL(s);
          sessionCustomOrigins.set(url.origin, "allowed");
        } catch {
        }
      }
      return next(args);
    }
  );
}

// src/functions/chatAugments.js
var CLOSINGBRACKETINDICATOR = "\\uf130\\u005d";
var EMBED_TYPE = (
  /** @type {const} */
  {
    Image: "img",
    None: "",
    Untrusted: "none-img"
  }
);
function bceParseUrl(word) {
  try {
    const url = new URL(word);
    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }
    return url;
  } catch {
    return false;
  }
}
var startSounds = ["..", "--"];
var endSounds = ["...", "~", "~..", "~~", "..~"];
var eggedSounds = ["ah", "aah", "mnn", "nn", "mnh", "mngh", "haa", "nng", "mnng"];
function stutterWord(word, forceStutter) {
  if (!word?.length) {
    return { results: [word], stutter: false };
  }
  function addStutter(wrd) {
    return /^\p{L}/u.test(wrd) ? `${wrd.substring(0, /[\uD800-\uDFFF]/u.test(wrd[0]) ? 2 : 1)}-${wrd}` : wrd;
  }
  const maxIntensity = Math.max(
    0,
    ...Player.Appearance.filter((a) => (a.Property?.Intensity ?? -1) > -1).map((a) => a.Property?.Intensity ?? 0)
  );
  const playerArousal = Player.ArousalSettings?.Progress ?? 0;
  const eggedBonus = maxIntensity * 5;
  const chanceToStutter = Math.max(0, playerArousal - 10 + eggedBonus) * 0.5 / 100;
  const chanceToMakeSound = Math.max(0, playerArousal / 2 - 20 + eggedBonus * 2) * 0.5 / 100;
  let stutter = false;
  const r = Math.random();
  for (let i = Math.min(4, Math.max(1, maxIntensity)); i >= 1; i--) {
    if (r < chanceToStutter / i || i === 1 && forceStutter && chanceToStutter > 0) {
      word = addStutter(word);
      stutter = true;
    }
  }
  const results = [word];
  if (maxIntensity > 0 && Math.random() < chanceToMakeSound) {
    const startSound = startSounds[Math.floor(Math.random() * startSounds.length)];
    const sound = eggedSounds[Math.floor(Math.random() * eggedSounds.length)];
    const endSound = endSounds[Math.floor(Math.random() * endSounds.length)];
    results.push(" ", `${startSound}${displayText(sound)}${endSound}`);
    stutter = true;
  }
  return { results, stutter };
}
function bceAllowedToEmbed(url) {
  const isTrustedOrigin = [
    "cdn.discordapp.com",
    "media.discordapp.com",
    "i.imgur.com",
    "tenor.com",
    "c.tenor.com",
    "media.tenor.com",
    "i.redd.it",
    "puu.sh",
    "fs.kinkop.eu"
  ].includes(url.host) || sessionCustomOrigins.get(url.origin) === "allowed";
  if (/\/[^/]+\.(png|jpe?g|webp|gif)$/ui.test(url.pathname)) {
    return isTrustedOrigin ? EMBED_TYPE.Image : EMBED_TYPE.Untrusted;
  }
  return EMBED_TYPE.None;
}
function processChatAugmentsForLine(chatMessageElement, scrollToEnd) {
  const newChildren = [];
  let originalText = "";
  for (const node of chatMessageElement.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE) {
      newChildren.push(node);
      continue;
    }
    const contents = node.textContent ?? "", words = [contents];
    originalText += contents;
    for (let i = 0; i < words.length; i++) {
      const whitespaceIdx = words[i].search(/[\s\r\n]/u);
      if (whitespaceIdx >= 1) {
        words.splice(i + 1, 0, words[i].substring(whitespaceIdx));
        words[i] = words[i].substring(0, whitespaceIdx);
      } else if (whitespaceIdx === 0) {
        words.splice(i + 1, 0, words[i].substring(1));
        [words[i]] = words[i];
        newChildren.push(document.createTextNode(words[i]));
        continue;
      }
      const url = bceParseUrl(words[i].replace(/(^\(+|\)+$)/gu, ""));
      if (url) {
        let domNode = null;
        const linkNode = document.createElement("a");
        newChildren.push(linkNode);
        const embedType = bceAllowedToEmbed(url);
        switch (embedType) {
          case EMBED_TYPE.Image:
            {
              const imgNode = document.createElement("img");
              imgNode.src = url.href;
              imgNode.alt = url.href;
              imgNode.onload = scrollToEnd;
              imgNode.classList.add("bce-img");
              linkNode.classList.add("bce-img-link");
              domNode = imgNode;
            }
            break;
          default:
            domNode = document.createTextNode(url.href);
            if (embedType !== EMBED_TYPE.None) {
              const promptTrust = document.createElement("a");
              promptTrust.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = (
                  /** @type {HTMLAnchorElement} */
                  e.target
                );
                FUSAM.modals.open({
                  prompt: displayText("Do you want to add $origin to trusted origins?", { $origin: url.origin }),
                  callback: (act) => {
                    if (act === "submit") {
                      sessionCustomOrigins.set(url.origin, "allowed");
                      const parent = target.parentElement;
                      if (!parent) {
                        throw new Error("clicked promptTrust has no parent");
                      }
                      parent.removeChild(target);
                      const name = parent.querySelector(".ChatMessageName");
                      parent.innerHTML = "";
                      if (name) {
                        parent.appendChild(name);
                        parent.appendChild(document.createTextNode(" "));
                      }
                      const ogText = parent.getAttribute("bce-original-text");
                      if (!ogText) {
                        throw new Error("clicked promptTrust has no original text");
                      }
                      parent.appendChild(document.createTextNode(ogText));
                      processChatAugmentsForLine(chatMessageElement, scrollToEnd);
                      debug("updated trusted origins", sessionCustomOrigins);
                    }
                  },
                  buttons: { submit: displayText("Trust this session") }
                });
              };
              promptTrust.href = "#";
              promptTrust.title = displayText("Trust this session");
              promptTrust.textContent = displayText("(embed)");
              newChildren.push(document.createTextNode(" "));
              newChildren.push(promptTrust);
            }
            break;
        }
        linkNode.href = url.href;
        linkNode.title = url.href;
        linkNode.target = "_blank";
        linkNode.appendChild(domNode);
      } else if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/u.test(words[i])) {
        const color = document.createElement("span");
        color.classList.add("bce-color");
        color.style.background = words[i];
        newChildren.push(color);
        newChildren.push(document.createTextNode(words[i]));
      } else {
        newChildren.push(document.createTextNode(words[i]));
      }
    }
  }
  while (chatMessageElement.firstChild) {
    chatMessageElement.removeChild(chatMessageElement.firstChild);
  }
  for (const child of newChildren) {
    chatMessageElement.appendChild(child);
  }
  chatMessageElement.setAttribute("bce-original-text", originalText);
}
function augmentedChatNotify(node) {
  const div = document.createElement("div");
  div.setAttribute("class", "ChatMessage bce-notification");
  div.setAttribute("data-time", ChatRoomCurrentTime());
  div.setAttribute("data-sender", Player.MemberNumber?.toString());
  if (typeof node === "string") {
    div.appendChild(document.createTextNode(node));
  } else if (Array.isArray(node)) {
    div.append(...node);
  } else {
    div.appendChild(node);
  }
  ChatRoomAppendChat(div);
  processChatAugmentsForLine(div, () => {
    if (ElementIsScrolledToEnd("TextAreaChatLog")) ElementScrollToEnd("TextAreaChatLog");
  });
}
function chatAugments() {
  SDK.hookFunction(
    "ChatRoomKeyDown",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    ([event], next) => {
      const inputChat = (
        /** @type {HTMLInputElement} */
        document.getElementById("InputChat")
      );
      if (inputChat && document.activeElement === inputChat) {
        if (event.key === "Enter" && !event.shiftKey) {
          if (fbcSettings.ctrlEnterOoc && event.ctrlKey && inputChat.value.trim().length !== 0) {
            let text = inputChat.value;
            let prefix = "";
            if (!text) {
              fbcChatNotify("Nothing to send!");
              return true;
            }
            if (text.startsWith("/w ")) {
              const textParts = text.split(" ");
              text = textParts.slice(2).join(" ");
              prefix = `${textParts.slice(0, 2).join(" ")} `;
            } else if (text.startsWith("/") && !text.startsWith("//")) {
              fbcChatNotify("Tried to OOC send a command. Use double // to confirm sending to chat.");
              return true;
            }
            inputChat.value = `${prefix}(${text.replace(/\)/g, CLOSINGBRACKETINDICATOR)}`;
          }
          ChatRoomSendChat();
          return true;
        }
        if (event.metaKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
          ChatRoomScrollHistory(event.key === "ArrowUp");
          return true;
        }
      }
      return next([event]);
    }
  );
  SDK.hookFunction(
    "ChatRoomMessageDisplay",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    ([data, msg, SenderCharacter, metadata], next) => next(
      [data, msg.replace(new RegExp(CLOSINGBRACKETINDICATOR, "g"), ")"), SenderCharacter, metadata]
    )
  );
  SDK.hookFunction(
    "SpeechTransformProcess",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    ([C, m, effects, ignoreOOC], next) => {
      const { msg, hasStuttered } = bceMessageReplacements(m || "");
      const result = next([C, msg, effects.filter((f) => f !== "stutter" || !fbcSettings.stutters), ignoreOOC]);
      if (hasStuttered) result.effects.push("stutter");
      return result;
    }
  );
  function bceMessageReplacements(msg) {
    const words = [msg];
    let firstStutter = true, inOOC = false;
    const newWords = [];
    let hasStuttered = false;
    for (let i = 0; i < words.length; i++) {
      const whitespaceIdx = words[i].search(/[\s\r\n]/u);
      if (whitespaceIdx >= 1) {
        words.splice(i + 1, 0, words[i].substring(whitespaceIdx));
        words[i] = words[i].substring(0, whitespaceIdx);
      } else if (whitespaceIdx === 0) {
        words.splice(i + 1, 0, words[i].substring(1));
        [words[i]] = words[i];
        newWords.push(words[i]);
        continue;
      }
      const oocIdx = words[i].search(/[()]/u);
      if (oocIdx > 0) {
        words.splice(i + 1, 0, words[i].substring(oocIdx + 1));
        words.splice(i + 1, 0, words[i].substring(oocIdx, oocIdx + 1));
        words[i] = words[i].substring(0, oocIdx);
      } else if (oocIdx === 0 && words[i].length > 1) {
        words.splice(i + 1, 0, words[i].substring(1));
        [words[i]] = words[i];
      }
      if (words[i] === "(") {
        inOOC = true;
      }
      if (bceParseUrl(words[i]) && !inOOC) {
        newWords.push("( ");
        newWords.push(words[i]);
        newWords.push(" )");
      } else if (fbcSettings.stutters && !inOOC) {
        const { results, stutter } = stutterWord(words[i], firstStutter);
        hasStuttered ||= stutter;
        newWords.push(...results);
        firstStutter = false;
      } else {
        newWords.push(words[i]);
      }
      if (words[i] === ")") {
        inOOC = false;
      }
    }
    return { msg: newWords.join(""), hasStuttered };
  }
  function bceChatAugments() {
    if (CurrentScreen !== "ChatRoom" || !fbcSettings.augmentChat) {
      return;
    }
    const chatLogContainerId = "TextAreaChatLog", handledAttributeName = "data-bce-handled", unhandledChat = document.querySelectorAll(`.ChatMessage:not([${handledAttributeName}=true])`);
    for (const chatMessageElement of unhandledChat) {
      chatMessageElement.setAttribute(handledAttributeName, "true");
      if ((chatMessageElement.classList.contains("ChatMessageChat") || chatMessageElement.classList.contains("ChatMessageWhisper")) && !chatMessageElement.classList.contains("bce-pending")) {
        const scrolledToEnd = ElementIsScrolledToEnd(chatLogContainerId);
        processChatAugmentsForLine(chatMessageElement, () => {
          if (scrolledToEnd) {
            ElementScrollToEnd(chatLogContainerId);
          }
        });
        if (scrolledToEnd) {
          ElementScrollToEnd(chatLogContainerId);
        }
      }
    }
  }
  createTimer(bceChatAugments, 500);
}

// src/functions/antiGarbling.ts
var createChatOptions;
function antiGarbling() {
  SDK.hookFunction(
    "ChatRoomGenerateChatRoomChatMessage",
    HOOK_PRIORITIES.Top,
    ([type, msg], next) => {
      if (!fbcSettings.antiGarble) return next([type, msg]);
      const lastRange = SpeechGetOOCRanges(msg).pop();
      if (Player.ChatSettings.OOCAutoClose && typeof lastRange === "object" && msg.charAt(lastRange.start + lastRange.length - 1) !== ")" && lastRange.start + lastRange.length === msg.length && lastRange.length !== 1) {
        msg += ")";
      }
      let process = { effects: [], text: msg };
      let originalMsg;
      if (type !== "Whisper" || fbcSettings.antiGarbleWhisperLevel !== "off") {
        process = SpeechTransformProcess(Player, msg, SpeechTransformSenderEffects);
        const shouldBabyTalk = SpeechTransformShouldBabyTalk(Player);
        const gagIntensity = SpeechTransformGagGarbleIntensity(Player);
        const stutterIntensity = SpeechTransformStutterIntensity(Player);
        if (gagIntensity > 0 || fbcSettings[`antiGarble${type}BabyTalk`] === "remove" && shouldBabyTalk || fbcSettings[`antiGarble${type}Stutter`] === "remove" && stutterIntensity > 0) {
          if (Player.RestrictionSettings?.NoSpeechGarble) {
            originalMsg = msg;
          } else if (fbcSettings[`antiGarble${type}Level`] !== "full") {
            originalMsg = msg;
            if (fbcSettings[`antiGarble${type}BabyTalk`] === "preserve" && shouldBabyTalk) {
              originalMsg = SpeechTransformBabyTalk(originalMsg);
            }
            if (["low", "medium", "high"].includes(fbcSettings[`antiGarble${type}Level`])) {
              const int = Math.min(gagIntensity, { low: 1, medium: 3, high: 5 }[fbcSettings[`antiGarble${type}Level`]]);
              originalMsg = SpeechTransformGagGarble(originalMsg, int);
            }
            if (fbcSettings[`antiGarble${type}Stutter`] === "preserve" && stutterIntensity > 0) {
              originalMsg = fbcSettings.stutters ? stutterWord(originalMsg, true).results.join("") : SpeechTransformStutter(originalMsg, stutterIntensity);
            }
          }
        }
        if (process.text === originalMsg) originalMsg = void 0;
      }
      const Dictionary = [{ Effects: process.effects, Original: originalMsg }];
      return { Content: process.text, Type: type, Dictionary };
    }
  );
  const effectOptions = defaultSettings.antiGarbleChatBabyTalk.options;
  function BabyTalkOnClick() {
    if (this.disabled || this.getAttribute("aria-disabled") === "true") return;
    const key = this.parentElement.classList.contains("wce-whisper") ? "antiGarbleWhisperBabyTalk" : "antiGarbleChatBabyTalk";
    const idx = effectOptions.indexOf(fbcSettings[key]);
    fbcSettings[key] = effectOptions[(idx + 1) % effectOptions.length];
    resetChatButtonStates(this.id);
  }
  function StutterOnClick() {
    if (this.disabled || this.getAttribute("aria-disabled") === "true") return;
    const key = this.parentElement.classList.contains("wce-whisper") ? "antiGarbleWhisperStutter" : "antiGarbleChatStutter";
    const idx = effectOptions.indexOf(fbcSettings[key]);
    fbcSettings[key] = effectOptions[(idx + 1) % effectOptions.length];
    resetChatButtonStates(this.id);
  }
  function GarbleOnChange() {
    const key = this.parentElement.parentElement.classList.contains("wce-whisper") ? "antiGarbleWhisperLevel" : "antiGarbleChatLevel";
    fbcSettings[key] = this.value;
    resetChatButtonStates();
  }
  function resetChatButtonStates(id) {
    const buttons = {
      "wce-chat-baby-talk": { state: "antiGarbleChatBabyTalk", whisperState: "antiGarbleWhisperBabyTalk" },
      "wce-chat-stutters": { state: "antiGarbleChatStutter", whisperState: "antiGarbleWhisperStutter" }
    };
    const div = document.getElementById("chat-room-buttons");
    const isWhisper = div.classList.contains("wce-whisper");
    const select = document.getElementById("wce-chat-garble");
    if (!id) {
      const tooltip = document.getElementById(select?.getAttribute("aria-describedby"));
      if (select && tooltip) {
        const key = isWhisper ? "antiGarbleWhisperLevel" : "antiGarbleChatLevel";
        select.value = fbcSettings[key];
        select.dataset.state = fbcSettings[key];
        tooltip.innerText = `${isWhisper ? "Whisper" : "Chat"} garble level: ${fbcSettings[key]}`;
      }
    }
    const garbleIsFull = ["full", "off"].includes(select?.value);
    const entries = id ? [[id, buttons[id]]] : Object.entries(buttons);
    for (const [buttonId, { state, whisperState }] of entries) {
      const button = document.getElementById(buttonId);
      const tooltip = document.getElementById(button?.getAttribute("aria-describedby"));
      if (button && tooltip) {
        const key = isWhisper ? whisperState : state;
        button.dataset.state = fbcSettings[key];
        tooltip.innerText = `${isWhisper ? "Whisper" : "Chat"} ${buttonId === "wce-chat-stutters" ? "stutters" : "baby talk"}: ${fbcSettings[key]}`;
        button.setAttribute("aria-disabled", garbleIsFull);
      }
    }
  }
  function whisperUpdate(isWhisper) {
    const div = document.getElementById("chat-room-buttons");
    if (!div) return;
    if (isWhisper && !div.classList.contains("wce-whisper")) {
      div.classList.add("wce-whisper");
      resetChatButtonStates();
    } else if (!isWhisper && div.classList.contains("wce-whisper")) {
      div.classList.remove("wce-whisper");
      resetChatButtonStates();
    }
  }
  createChatOptions = function(div) {
    const buttonGrid = div?.querySelector("#chat-room-buttons");
    if (buttonGrid && !buttonGrid.querySelector(".wce-chat-room-button")) {
      ElementMenu.PrependItem(buttonGrid, ElementCreate({
        tag: "div",
        style: { display: "none" },
        classList: ["wce-chat-room-select-div", "wce-chat-room-button"],
        children: [
          {
            tag: "label",
            attributes: { id: "wce-chat-garble-label", for: "wce-chat-garble" }
          },
          {
            tag: "select",
            attributes: { id: "wce-chat-garble", "aria-describedby": "wce-chat-garble-tooltip" },
            classList: ["wce-chat-room-select"],
            eventListeners: { change: GarbleOnChange },
            children: defaultSettings.antiGarbleWhisperLevel.options.map((option) => ({
              tag: "option",
              attributes: { value: option },
              children: [option]
            }))
          },
          {
            tag: "div",
            attributes: { id: "wce-chat-garble-tooltip", role: "tooltip" },
            classList: ["button-tooltip", "button-tooltip-left"],
            children: []
          }
        ]
      }));
      ElementMenu.AppendButton(buttonGrid, ElementButton.Create(
        "wce-chat-baby-talk",
        BabyTalkOnClick,
        { noStyling: true },
        { button: { classList: ["chat-room-button", "wce-chat-room-button"], style: { display: "none" } } }
      ));
      ElementMenu.AppendButton(buttonGrid, ElementButton.Create(
        "wce-chat-stutters",
        StutterOnClick,
        { noStyling: true },
        { button: { classList: ["chat-room-button", "wce-chat-room-button"], style: { display: "none" } } }
      ));
      resetChatButtonStates();
    }
  };
  let registeredChatInputListener = false;
  SDK.hookFunction(
    "ChatRoomCreateElement",
    HOOK_PRIORITIES.ModifyBehaviourHigh,
    (args, next) => {
      if (!fbcSettings.antiGarbleChatOptions) return next(args);
      if (!registeredChatInputListener) {
        const chatInput = document.getElementById("InputChat");
        const chatButtonArrow = document.getElementById("chat-room-buttons-collapse");
        if (chatInput && chatButtonArrow) {
          chatInput.addEventListener("input", function WceInputChatListener() {
            const isWhisper = this.value.startsWith("/w ") || this.value.startsWith("/whisper ");
            whisperUpdate(isWhisper);
          });
          chatButtonArrow.addEventListener("click", (e) => {
            ChatRoomChatInputChangeHandler.call(chatInput, e);
          });
          registeredChatInputListener = true;
        }
      }
      const div = next(args);
      createChatOptions(div);
      return div;
    }
  );
  SDK.hookFunction(
    "ChatRoomSetTarget",
    HOOK_PRIORITIES.ModifyBehaviourHigh,
    ([memberNumer, ...args], next) => {
      const isWhisper = Number.isInteger(memberNumer) && memberNumer !== -1;
      whisperUpdate(isWhisper);
      return next([memberNumer, ...args]);
    }
  );
  ChatRoomRegisterMessageHandler({
    Description: "show OriginalMsg while deafened",
    Priority: 90,
    Callback: (data, _, msg, metadata) => {
      if (data.Type === "Chat" && fbcSettings.antiDeaf && Player.GetDeafLevel() > 0 && !metadata.OriginalMsg) {
        metadata.OriginalMsg = msg;
      }
      return false;
    }
  });
  if (CurrentScreen === "ChatRoom") ChatRoomResize(false);
}

// src/util/settings.ts
var fbcSettings = {};
var postSettingsHasRun = false;
var defaultSettings = {
  animationEngine: {
    label: "Animation Engine",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      if (newValue && Player.ArousalSettings) {
        Player.ArousalSettings.AffectExpression = false;
      }
      if (!newValue) {
        fbcSettings.expressions = false;
        fbcSettings.activityExpressions = false;
      }
      debug("animationEngine", newValue);
    },
    category: "activities",
    description: "Enables the animation engine. This will replace the game's expression and pose system."
  },
  expressions: {
    label: "Automatic Arousal Expressions (Replaces Vanilla)",
    type: "checkbox",
    value: false,
    disabled: () => !fbcSettings.animationEngine,
    sideEffects: (newValue) => {
      debug("expressions", newValue);
    },
    category: "activities",
    description: "Automatically express arousal when performing an activity (requires Animation Engine)."
  },
  activityExpressions: {
    label: "Activity Expressions",
    type: "checkbox",
    value: false,
    disabled: () => !fbcSettings.animationEngine,
    sideEffects: (newValue) => {
      debug("activityExpressions", newValue);
    },
    category: "activities",
    description: "Automatically express reactions to certain activities (requires Animation Engine)."
  },
  alternateArousal: {
    label: "Alternate Arousal (Replaces Vanilla, requires hybrid/locked arousal meter)",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      sendHello();
      Player.BCEArousal = !!newValue;
      Player.BCEArousalProgress = Math.min(BCE_MAX_AROUSAL, Player.ArousalSettings?.Progress ?? 0);
      debug("alternateArousal", newValue);
    },
    category: "activities",
    description: "More intense activities will affect arousal faster."
  },
  stutters: {
    label: "Alternative speech stutter",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("stutters", newValue);
    },
    category: "activities",
    description: "More stuttering at high arousal, moans between words with vibrators."
  },
  numericArousalMeter: {
    label: "Show numeric arousal meter",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("numericArousalMeter", newValue);
    },
    category: "activities",
    description: "Shows the numeric value of arousal meters when expanded."
  },
  layeringHide: {
    label: "[Beta] Allow configuring layer hiding in layering menu",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("layeringHide", newValue);
    },
    category: "appearance",
    description: "Allows you to configure which lower layers an item should hide or not (changes only visible to other WCE players)."
  },
  copyColor: {
    label: "Enable option to copy color to all item's of the same type",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("copyColor", newValue);
    },
    category: "appearance",
    description: "Enable option to copy color to all item's of the same type."
  },
  extendedWardrobe: {
    label: "Extended wardrobe slots (96)",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue, init) => {
      debug("extendedWardrobe", newValue);
      if (newValue) {
        if (Player.Wardrobe) {
          WardrobeSize = EXPANDED_WARDROBE_SIZE;
          loadExtendedWardrobe(Player.Wardrobe, init);
          CharacterCompressWardrobe(Player.Wardrobe);
        } else {
          logWarn("Player.Wardrobe not found, skipping wardrobe extension");
        }
      } else {
        fbcSettings.localWardrobe = false;
        WardrobeSize = DEFAULT_WARDROBE_SIZE;
        WardrobeFixLength();
        CharacterAppearanceWardrobeOffset = 0;
      }
    },
    category: "appearance",
    description: "Increase the amount of wardrobe slots to save more outfits."
  },
  localWardrobe: {
    label: "Local Wardrobe (+288)",
    type: "checkbox",
    value: false,
    disabled: () => !fbcSettings.extendedWardrobe,
    sideEffects: (newValue) => {
      debug("localWardrobe", newValue);
      if (newValue) {
        if (Player.Wardrobe) {
          WardrobeSize = LOCAL_WARDROBE_SIZE;
          loadLocalWardrobe(Player.Wardrobe);
          CharacterCompressWardrobe(Player.Wardrobe);
        } else {
          logWarn("Player.Wardrobe not found, skipping wardrobe extension");
        }
      } else if (fbcSettings.extendedWardrobe) {
        WardrobeSize = EXPANDED_WARDROBE_SIZE;
        WardrobeFixLength();
        CharacterAppearanceWardrobeOffset = 0;
      }
    },
    category: "appearance",
    description: "Enables the Local Wardrobe - save 288 additional outfits on your device (not synced between devices, but shared between alts on the same device)."
  },
  privateWardrobe: {
    label: "Replace wardrobe list with character previews",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("privateWardrobe", newValue);
    },
    category: "appearance",
    description: "Allows you to preview all saved outfits at a glance, no more having to remember names."
  },
  confirmWardrobeSave: {
    label: "Confirm overriding wardrobe outfits",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("confirmWardrobeSave", newValue);
    },
    category: "appearance",
    description: "When saving over an already existing wardrobe outfit you'll ask for confirmation, preventing accidentally overwriting outfits."
  },
  automateCacheClear: {
    label: "Clear Drawing Cache Hourly",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("automateCacheClear", newValue);
    },
    category: "performance",
    description: "Automatically clears the drawing cache every hour, preventing memory usage from growing out of control during long play sessions."
  },
  manualCacheClear: {
    label: "Adds a clear / reload drawing cache button",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("manualCacheClear", newValue);
    },
    category: "performance",
    description: "Adds a button to the chat room menu to clear and reload the drawing cache of all characters, helping to fix buged / non-loaded assets."
  },
  instantMessenger: {
    label: "Instant messenger",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("instantMessenger", newValue);
    },
    category: "chat",
    description: "Allows you to send messages to other players without having to open the friends list, with enhancements."
  },
  augmentChat: {
    label: "Chat Links and Embeds",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("augmentChat", newValue);
    },
    category: "chat",
    description: "Adds clickable links and image embeds from trusted domains only (e.g. imgur) to chat messages."
  },
  ctrlEnterOoc: {
    label: "Use Ctrl+Enter to OOC",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("ctrlEnterOoc", newValue);
    },
    category: "chat",
    description: "Allows you to use Ctrl+Enter to send OOC messages."
  },
  whisperInput: {
    label: "Use italics for input when whispering",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("whisperInput", newValue);
    },
    category: "chat",
    description: "Changes the input field to italics when you're in whisper mode to make it more obvious."
  },
  chatColors: {
    label: "Improve colors for readability",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      if (newValue) {
        document.body.classList.add(BCE_COLOR_ADJUSTMENTS_CLASS_NAME);
      } else {
        document.body.classList.remove(BCE_COLOR_ADJUSTMENTS_CLASS_NAME);
      }
      debug("chatColors", newValue);
    },
    category: "chat",
    description: "Improves contrast between the colors used for chat messages to comply with web accessibility standards."
  },
  friendPresenceNotifications: {
    label: "Show friend presence notifications",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("friendPresenceNotifications", newValue);
    },
    category: "chat",
    description: "Enables friend presence tracking and shows a notification when a friend logs in."
  },
  friendOfflineNotifications: {
    label: "Show friends going offline too",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("friendOfflineNotifications", newValue);
    },
    category: "chat",
    description: "Shows a notification when a friend logs out. (Requires friend presence)"
  },
  friendNotificationsInChat: {
    label: "Show friend presence notifications in chat, when possible",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("friendNotificationsInChat", newValue);
    },
    category: "chat",
    description: "Shows friend presence notifications in chat, when possible. (Requires friend presence)"
  },
  pastProfiles: {
    label: "Save & browse seen profiles (requires refresh)",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("pastProfiles", newValue);
    },
    category: "chat",
    description: "Saves the profiles for everyone you've seen and allows you to browse them using /profiles in chatrooms."
  },
  pendingMessages: {
    label: "Show sent messages while waiting for server",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("showSentMessages", newValue);
    },
    category: "chat",
    description: "Shows messages you've sent while waiting for the server to respond, confirming you have sent the message and the server is just being slow."
  },
  richOnlineProfile: {
    label: "Rich online profile",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("richOnlineProfile", newValue);
    },
    category: "chat",
    description: "Changes the online profile to support clickable links and embedded images."
  },
  whisperTargetFixes: {
    label: "Improved whisper target handling",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("whisperTargetFixes", newValue);
    },
    category: "chat",
    description: "Automatically reset whisper target if they leave the room for more than one minute and after the first invalid whisper target warning message."
  },
  antiGarble: {
    label: "Anti Garble",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue, init) => {
      if (!newValue) {
        fbcSettings.antiGarbleChatOptions = false;
        defaultSettings.antiGarbleChatOptions.sideEffects(false, init);
        fbcSettings.antiGarbleChatLevel = "full";
        fbcSettings.antiGarbleChatBabyTalk = "preserve";
        fbcSettings.antiGarbleChatStutter = "preserve";
        fbcSettings.antiGarbleWhisperLevel = "full";
        fbcSettings.antiGarbleWhisperBabyTalk = "preserve";
        fbcSettings.antiGarbleWhisperStutter = "preserve";
      } else if (!init) {
        fbcSettings.antiGarbleChatOptions = true;
        defaultSettings.antiGarbleChatOptions.sideEffects(true, init);
        fbcSettings.antiGarbleChatLevel = "none";
        fbcSettings.antiGarbleChatBabyTalk = "remove";
        fbcSettings.antiGarbleChatStutter = "ignore";
        fbcSettings.antiGarbleWhisperLevel = "none";
        fbcSettings.antiGarbleWhisperBabyTalk = "remove";
        fbcSettings.antiGarbleWhisperStutter = "ignore";
      }
      debug("antiGarble", newValue);
    },
    category: "antigarble",
    description: "Enables the anti-garble system. Allowing you to send less garbled version of your messages together with the garbled one to others, who could read it in brackets."
  },
  antiGarbleChatOptions: {
    label: "Anti Garble chat options",
    type: "checkbox",
    value: false,
    disabled: () => !fbcSettings.antiGarble,
    sideEffects: (newValue, init) => {
      debug("antiGarbleChatoptions", newValue);
      if (!init && newValue) {
        createChatOptions(document.getElementById("chat-room-div"));
      } else if (!init) {
        document.querySelectorAll(".wce-chat-room-button").forEach((e) => e.remove());
      }
    },
    category: "antigarble",
    description: "Adds quick options for your anti-garble settings to the chat input menu."
  },
  antiGarbleChatLevel: {
    label: "Chat garble level:",
    type: "select",
    value: "none",
    options: ["none", "low", "medium", "high", "full"],
    tooltips: [
      "Chat garble level: none (send a fully ungarbled message to the recipient, shown in brackets)",
      "Chat garble level: low (send a partly ungarbled message, which is only garbled up to the low garbel level 1)",
      "Chat garble level: medium (send a partly ungarbled message, which is only garbled up to the medium garbel level 3)",
      "Chat garble level: high (send a partly ungarbled message, which is only garbled up to the high garbel level 5)",
      "Chat garble level: full (always only sends the full garbled message, no ungarbled message in brackets)"
    ],
    disabled: () => !fbcSettings.antiGarble,
    sideEffects: (newValue) => {
      debug("antiGarbleChatLevel", newValue);
    },
    category: "antigarble",
    description: "Sends an ungarbled (or lower garbled up to the selected value) chat message together with the garbled messages, which is shown on the recipient side in brackets (defaults to full = no ungarbling)."
  },
  antiGarbleChatStutter: {
    label: "Chat stutters:",
    type: "select",
    value: "preserve",
    options: ["remove", "ignore", "preserve"],
    tooltips: [
      "Chat stutters: remove (always remove chat stutters, even if it is the only effect)",
      "Chat stutters: ignore (remove chat stutters if ungarbling gag speech, but ignore it if it's the only effect)",
      "Chat stutters: preserve (always preserve chat stutters in the ungarbled text in brackets)"
    ],
    disabled: () => !fbcSettings.antiGarble || fbcSettings.antiGarbleChatLevel === "full",
    sideEffects: (newValue) => {
      debug("antiGarbleChatoptions", newValue);
    },
    category: "antigarble",
    description: "Controls if stutters in chat messages are always removed, ignored (only removed if other ungarbling applied) or preserved."
  },
  antiGarbleChatBabyTalk: {
    label: "Chat baby talk:",
    type: "select",
    value: "preserve",
    options: ["remove", "ignore", "preserve"],
    tooltips: [
      "Chat baby talk: remove (always remove chat baby talk, even if it is the only effect)",
      "Chat baby talk: ignore (remove chat baby talk if ungarbling gag speech, but ignore it if it's the only effect)",
      "Chat baby talk: preserve (always preserve chat baby talk in the ungarbled text in brackets)"
    ],
    disabled: () => !fbcSettings.antiGarble || fbcSettings.antiGarbleChatLevel === "full",
    sideEffects: (newValue) => {
      debug("antiGarbleChatBabyTalk", newValue);
    },
    category: "antigarble",
    description: "Controls if baby talk in chat messages is always removed, ignored (only removed if other ungarbling applied) or preserved."
  },
  antiGarbleWhisperLevel: {
    label: "Whisper garble level:",
    type: "select",
    value: "none",
    options: ["none", "low", "medium", "high", "full", "off"],
    tooltips: [
      "Whisper garble level: none (send a fully ungarbled whisper to the recipient, shown in brackets)",
      "Whisper garble level: low (send a partly ungarbled whisper, which is only garbled up to the low garbel level 1)",
      "Whisper garble level: medium (send a partly ungarbled whisper, which is only garbled up to the medium garbel level 3)",
      "Whisper garble level: high (send a partly ungarbled whisper, which is only garbled up to the high garbel level 5)",
      "Whisper garble level: full (always only sends the full garbled whisper, no ungarbled message in brackets)",
      "Whisper garble level: off (don't garble whisper messages at all, normal message is ungarbled, no message in brackets)"
    ],
    disabled: () => !fbcSettings.antiGarble,
    sideEffects: (newValue) => {
      debug("antiGarbleWhisperLevel", newValue);
    },
    category: "antigarble",
    description: "Sends an ungarbled (or lower garbled) whisper message together with the garbled messages, which is shown on the recipient side in brackets. (off = only sending the ungarbled messages as the original)."
  },
  antiGarbleWhisperStutter: {
    label: "Whispers stutters:",
    type: "select",
    value: "preserve",
    options: ["remove", "ignore", "preserve"],
    tooltips: [
      "Whispers stutters: remove (always remove whispers stutters, even if it is the only effect)",
      "Whispers stutters: ignore (remove whispers stutters if ungarbling gag speech, but ignore it if it's the only effect)",
      "Whispers stutters: preserve (always preserve whispers stutters in the ungarbled text in brackets)"
    ],
    disabled: () => !fbcSettings.antiGarble || ["off", "full"].includes(fbcSettings.antiGarbleWhisperLevel),
    sideEffects: (newValue) => {
      debug("antiGarbleWhisperStutter", newValue);
    },
    category: "antigarble",
    description: "Controls if stutters in whispers are always removed, ignored (only removed if other ungarbling applied) or preserved."
  },
  antiGarbleWhisperBabyTalk: {
    label: "Whispers baby talk:",
    type: "select",
    value: "preserve",
    options: ["remove", "ignore", "preserve"],
    tooltips: [
      "Whispers baby talk: remove (always remove whispers baby talk, even if it is the only effect)",
      "Whispers baby talk: ignore (remove whispers baby talk if ungarbling gag speech, but ignore it if it's the only effect)",
      "Whispers baby talk: preserve (always preserve whispers baby talk in the ungarbled text in brackets)"
    ],
    disabled: () => !fbcSettings.antiGarble || ["off", "full"].includes(fbcSettings.antiGarbleWhisperLevel),
    sideEffects: (newValue) => {
      debug("antiGarbleWhisperBabyTalk", newValue);
    },
    category: "antigarble",
    description: "Controls if baby talk in whispers is always removed, ignored (only removed if other ungarbling applied) or preserved."
  },
  lockpick: {
    label: "Reveal Lockpicking Order Based on Skill",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("lockpick", newValue);
    },
    category: "cheats",
    description: "Randomly reveals the order of some of the pins with higher lockpicking skill revealing more pins on average. Picking can still be impossible like other forms of struggling."
  },
  allowLayeringWhileBound: {
    label: "Allow layering menus while bound",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("allowLayeringWhileBound", newValue);
    },
    category: "cheats",
    description: "Allows you to open menus while bound, even if they're disabled in the settings."
  },
  autoStruggle: {
    label: "Make automatic progress while struggling",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("autoStruggle", newValue);
    },
    category: "cheats",
    description: "All three forms of struggling will be completed automatically in a realistic amount of time, if the restraint is possible to struggle out of."
  },
  allowIMBypassBCX: {
    label: "Allow IMs to bypass BCX beep restrictions",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("allowIMBypassBCX", newValue);
    },
    category: "cheats",
    description: "This setting is temporary until BCX supports a focus mode rule."
  },
  antiDeaf: {
    label: "Anti Deafen",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("antiDeaf", newValue);
    },
    category: "cheats",
    description: "Show original messages in brackets while deafened."
  },
  toySync: {
    label: "Enable buttplug.io (requires refresh)",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("toySync", newValue);
    },
    category: "buttplug",
    description: "Allows the game to control your real vibrators. For a list of supported vibrators see https://buttplug.io"
  },
  blindWithoutGlasses: {
    label: "Require glasses to see",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      if (!newValue) {
        removeCustomEffect("BlurLight");
      }
      debug("blindWithoutGlasses", newValue);
    },
    category: "immersion",
    description: "You will be partially blinded while not wearing glasses."
  },
  leashAlways: {
    label: "Allow leashing without wearing a leashable item (requires leasher to have WCE too)",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("leashAlways", newValue);
      if (newValue) {
        enableLeashing();
      } else {
        disableLeashing();
      }
    },
    category: "immersion",
    description: "Allows you to be leashed between rooms even when you are not wearing an item that counts as a leash to allow roleplaying being carried in arms."
  },
  hideHiddenItemsIcon: {
    label: "Hide the hidden items icon",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("hideHiddenItemsIcon", newValue);
    },
    category: "immersion",
    description: "You can choose to hide items (not on extreme difficulty). The game shows an icon on players that have hidden items. This option hides that icon."
  },
  itemAntiCheat: {
    label: "Enable anti-cheat",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("itemAntiCheat", newValue);
    },
    category: "immersion",
    description: "Prevents certain console cheats from impacting your character. Whitelisted actors are exempt from this."
  },
  antiCheatBlackList: {
    label: "Blacklist detected cheaters automatically",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("antiCheatBlackList", newValue);
    },
    category: "immersion",
    description: "Automatically blacklist detected cheaters. Whitelisted actors are exempt from this."
  },
  uwall: {
    label: "Enable uwall anti-cheat",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("uwall", newValue);
      if (Player?.OnlineSharedSettings && typeof newValue === "boolean") {
        Player.OnlineSharedSettings.Uwall = newValue;
        ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
      } else {
        logWarn("Player.OnlineSharedSettings not found, skipping uwall");
      }
    },
    category: "immersion",
    description: "Prevents certain other addon cheats from impacting your character."
  },
  preventLayeringByOthers: {
    label: "Prevents other players from using layering on you",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue, init) => {
      debug("preventLayeringByOthers", newValue);
      if (!init) sendHello();
    },
    category: "immersion",
    description: "Prevents other WCE players to make Layering based changes to your character."
  },
  relogin: {
    label: "Automatic Relogin on Disconnect",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("relogin", newValue);
    },
    category: "misc",
    description: "Automatically re-enter your password after you disconnect from the game. For convenience or AFK. Requires the password for the current account to have been saved in the login screen. Passwords are saved in your browser's local storage in plain text."
  },
  ghostNewUsers: {
    label: "Automatically ghost+blocklist unnaturally new users",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("ghostNewUsers", newValue);
    },
    category: "misc",
    description: "Automatically ghost+blocklist unnaturally new users. This is useful for preventing malicious bots, but is not recommended to be enabled normally."
  },
  confirmLeave: {
    label: "Confirm leaving the game",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("confirmLeave", newValue);
    },
    category: "misc",
    description: "When you leave the game, you will be prompted to confirm your decision. This is useful for preventing accidentally closing the tab, but will cause you to reconnect."
  },
  discreetMode: {
    label: "Discreet mode (disable drawing)",
    type: "checkbox",
    value: false,
    disabled: () => false,
    sideEffects: (newValue, init) => {
      debug("discreetMode", newValue);
      if (newValue) {
        document.getElementById("favicon").href = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        NotificationTitleUpdate();
      } else if (!init) {
        NotificationTitleUpdate();
        document.getElementById("favicon").href = "Icons/Logo.png";
      }
    },
    category: "misc",
    description: "Disables drawing on the screen. This is useful for preventing accidental drawing."
  },
  customContentDomainCheck: {
    label: "Prompt before loading content from a 3rd party domain",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("customContentDomainCheck", newValue);
    },
    category: "misc",
    description: "Show a confirmation prompt before allowing content from a 3rd party domain to be loaded."
  },
  shareAddons: {
    label: "Share Addons",
    type: "checkbox",
    value: true,
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("shareAddons", newValue);
    },
    category: "misc",
    description: "Share a list of your installed addons with other WCE users in the room, visible via /versions chat command."
  },
  buttplugDevices: {
    label: "Buttplug Devices",
    type: "input",
    value: "",
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("buttplugDevices", newValue);
      if (newValue === "") {
        return;
      }
      try {
        if (!isString(newValue)) {
          throw new Error("expected string for buttplugDevices");
        }
        const devices = parseJSON(newValue);
        if (!Array.isArray(devices)) {
          throw new Error("expected array for devices");
        }
        for (const device of devices) {
          toySyncState.deviceSettings.set(device.Name, device);
        }
      } catch (ex) {
        logError(ex);
      }
    },
    category: "hidden",
    description: ""
  },
  toySyncAddress: {
    label: "Intiface Address",
    type: "input",
    value: "ws://127.0.0.1:12345",
    disabled: () => false,
    sideEffects: (newValue) => {
      debug("toySyncAddress", newValue);
    },
    category: "hidden",
    description: ""
  }
};
function settingsLoaded() {
  return postSettingsHasRun;
}
function bceSettingKey() {
  return `bce.settings.${Player?.AccountName}`;
}
async function bceLoadSettings() {
  await waitFor(() => !!Player?.AccountName);
  const key = bceSettingKey();
  debug("loading settings");
  if (Object.keys(fbcSettings).length === 0) {
    let settings = parseJSON(localStorage.getItem(key));
    const onlineSettings = parseJSON(LZString.decompressFromBase64(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      Player.ExtensionSettings.FBC || (Player.OnlineSettings?.BCE ?? "")
    ) || null);
    if (!onlineSettings) {
      logWarn("No online settings found");
      debug("onlineSettings", Player.OnlineSettings);
      debug("extensionSettings", Player.ExtensionSettings);
    }
    if (Player.OnlineSettings?.BCE) {
      Player.ExtensionSettings.FBC = Player.OnlineSettings.BCE;
      ServerPlayerExtensionSettingsSync("FBC");
      logInfo("Migrated online settings to extension settings");
      delete Player.OnlineSettings.BCE;
    }
    const localVersion = settings?.version || 0;
    if (onlineSettings && onlineSettings.version >= localVersion) {
      logInfo("using online settings");
      settings = onlineSettings;
    }
    if (!isNonNullObject(settings)) {
      debug("no settings", key);
      fbcBeepNotify(
        "Welcome to WCE",
        `Welcome to Wholesome Club Extensions v${globalThis.FBC_VERSION}! As this is your first time using WCE on this account, you may want to check out the settings page for some options to customize your experience. You can find it in the game preferences. Enjoy!`
        // In case of problems, you can contact us via Discord at ${DISCORD_INVITE_URL}`
      );
      settings = {};
    }
    if (!isNonNullObject(settings)) {
      throw new Error("failed to initialize settings");
    }
    for (const [setting] of Object.entries(defaultSettings)) {
      if (!(setting in settings)) {
        if (setting === "activityExpressions" && "expressions" in settings) {
          settings[setting] = settings.expressions;
          continue;
        }
        settings[setting] = defaultSettings[setting].value;
      }
    }
    if (typeof settings.version === "undefined" || settings.version < settingsVersion) {
      beepChangelog();
    }
    settings.version = settingsVersion;
    fbcSettings = settings;
  }
}
function bceSaveSettings() {
  debug("saving settings");
  if (toySyncState.deviceSettings.size > 0) {
    fbcSettings.buttplugDevices = JSON.stringify(Array.from(toySyncState.deviceSettings.values()));
  }
  localStorage.setItem(bceSettingKey(), JSON.stringify(fbcSettings));
  Player.ExtensionSettings.FBC = LZString.compressToBase64(JSON.stringify(fbcSettings));
  ServerPlayerExtensionSettingsSync("FBC");
  debug("saved settings", fbcSettings);
}
function isDefaultSettingKey(key) {
  return key in defaultSettings;
}
function postSettings() {
  debug("handling settings side effects");
  for (const [k, v] of Object.entries(fbcSettings)) {
    if (k === "version") {
      continue;
    }
    if (!isDefaultSettingKey(k)) {
      logWarn("Deleting unknown setting", k);
      delete fbcSettings[k];
      continue;
    }
    defaultSettings[k].sideEffects(v, true);
  }
  bceSaveSettings();
  postSettingsHasRun = true;
}
async function beepChangelog() {
  await waitFor(() => !!Player?.AccountName);
  await sleep(5e3);
  fbcBeepNotify(
    displayText("WCE Changelog"),
    displayText("WCE has received significant updates since you last used it. See /wcechangelog in a chatroom.")
  );
  await waitFor(() => !!document.getElementById("TextAreaChatLog"));
  augmentedChatNotify(`Wholesome Club Extensions (WCE) changelog:
${fbcChangelog}`);
}
function fbcSettingValue(key) {
  if (isDefaultSettingKey(key)) {
    return fbcSettings[key];
  }
  return false;
}

// src/util/functionHashes.ts
function expectedHashes(gameVersion) {
  switch (gameVersion.toLowerCase()) {
    case "r112":
      return {
        ActivityChatRoomArousalSync: "BFF3DED7",
        ActivitySetArousal: "3AE28123",
        ActivitySetArousalTimer: "1342AFE2",
        ActivityTimerProgress: "6CD388A7",
        AppearanceClick: "2F2F08AD",
        // Screens/Character/Appearance/Appearance.js (21.5.2024)
        AppearanceLoad: "4360C485",
        AppearanceRun: "8B7558CB",
        // Screens/Character/Appearance/Appearance.js (13.5.2024)
        CharacterAppearanceBuildCanvas: "C05FE035",
        // Screens/Character/Appearance/Appearance.js
        CharacterAppearanceMustHide: "9C34DF21",
        CharacterAppearanceVisible: "0740043C",
        CharacterAppearanceWardrobeLoad: "A5B63A03",
        CharacterBuildDialog: "85F79C6E",
        CharacterCompressWardrobe: "2A05ECD1",
        CharacterDelete: "57AA5D48",
        CharacterGetCurrent: "69F45A41",
        CharacterLoadCanvas: "EAB81BC4",
        CharacterLoadOnline: "407FEDDE",
        // Scripts/Character.js
        CharacterNickname: "A794EFF5",
        CharacterRefresh: "301DA9CF",
        CharacterSetCurrent: "9B71AC3E",
        CharacterSetFacialExpression: "EC032BEE",
        // Scripts/Character.js (6.5.2024)
        CharacterSetActivePose: "566A14D7",
        ChatAdminRoomCustomizationClick: "9D859B28",
        ChatAdminRoomCustomizationProcess: "AF01C65A",
        ChatRoomAppendChat: "12890378",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomCharacterUpdate: "DE2DC592",
        ChatRoomCharacterViewDraw: "732C91C9",
        // Screens/Online/ChatRoom/ChatRoomCharacterView.js (19.4.2024 )
        ChatRoomCharacterViewIsActive: "CD8066FA",
        ChatRoomCurrentTime: "A462DD3A",
        ChatRoomDrawCharacterStatusIcons: "3D957FC2",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomGenerateChatRoomChatMessage: "3BDE0884",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomHideElements: "D58ECB5C",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomHTMLEntities: "0A7ADB1D",
        ChatRoomKeyDown: "A4974D73",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomLeave: "BD1A285F",
        ChatRoomListManipulation: "75D28A8B",
        ChatRoomMapViewCharacterIsVisible: "286C447D",
        ChatRoomMapViewCharacterOnWhisperRange: "B0D08E96",
        ChatRoomMapViewIsActive: "D181020D",
        ChatRoomMenuBuild: "BE8ACFBE",
        ChatRoomMenuClick: "BE001739",
        // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomMenuDraw: "6DBEC23B",
        // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomMessage: "E75ED29B",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomRegisterMessageHandler: "C432923A",
        ChatRoomSendChat: "ACB10CE5",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomStart: "9B822A9A",
        ChatRoomSyncMemberJoin: "2A9CB40B",
        // Screens/Online/ChatRoom/ChatRoom.js
        CommandCombine: "80F9D4AF",
        // Screens/Online/ChatRoom/Commands.js
        CommandExecute: "D1DEB2AD",
        // Screens/Online/ChatRoom/Commands.js
        CommonClick: "918C74F3",
        CommonColorIsValid: "390A2CE4",
        CommonSetScreen: "85E69EBB",
        // Scripts/Common.js
        CraftingClick: "5E7225EA",
        // Screens/Room/Crafting/Crafting.js
        CraftingConvertSelectedToItem: "F5211D40",
        CraftingRun: "4CD7AB08",
        // Screens/Room/Crafting/Crafting.js
        DialogCanUnlock: "A86B2558",
        DialogLeave: "AD3A0840",
        DialogMenuButtonBuild: "88CE1D73",
        // Scripts/Dialog.js (13.5.2024)
        DialogMenuButtonClick: "2CA1256C",
        // Scripts/Dialog.js (2.5.2024)
        DrawArousalMeter: "BB0755AF",
        DrawArousalThermometer: "7ED6D822",
        DrawBackNextButton: "7263249E",
        // Scripts/Drawing.js
        DrawButton: "B747DF6E",
        DrawCharacter: "B175AF5E",
        DrawCheckbox: "00FD87EB",
        DrawImageEx: "E01BE7E7",
        DrawImageResize: "D205975A",
        DrawItemPreview: "6A7A1E2A",
        DrawProcess: "7DA972D9",
        DrawText: "C1BF0F50",
        DrawTextFit: "F9A1B11E",
        ElementCreate: "A3E07B07",
        ElementCreateInput: "7F1709DA",
        ElementCreateTextArea: "4E040819",
        // Scripts/Element.js
        ElementIsScrolledToEnd: "1CC4FE11",
        ElementPosition: "81836C4E",
        // Scripts/Element.js
        ElementScrollToEnd: "1AC45575",
        ElementValue: "4F26C62F",
        FriendListShowBeep: "5B91D5DA",
        // Screens/Character/FriendList/FriendList.js
        GameRun: "337CB358",
        // Scripts/Game.js
        GLDrawResetCanvas: "81214642",
        InformationSheetRun: "5B5C7751",
        // Screens/Character/InformationSheet/InformationSheet.js
        InterfaceTextGet: "66603471",
        // Scripts/Text.js (2.5.2024)
        InventoryGet: "E666F671",
        "Layering.Load": "8FA7D9CB",
        // Scripts/Layering.js
        "Layering._ResetClickListener": "5EDCC26F",
        // Scripts/Layering.js
        LoginClick: "5B9765F8",
        // Screens/Character/Login/Login.js
        LoginDoLogin: "E9145D39",
        // Screens/Character/Login/Login.js
        LoginRun: "181BE041",
        // Screens/Character/Login/Login.js
        LoginStatusReset: "43C3FCD2",
        MouseIn: "CA8B839E",
        NotificationDrawFavicon: "AB88656B",
        NotificationRaise: "E8F29646",
        NotificationTitleUpdate: "0E92F3ED",
        OnlineGameAllowChange: "3779F42C",
        OnlineProfileClick: "521146DF",
        OnlineProfileUnload: "A8651F30",
        OnlineProfileLoad: "BE8B009B",
        OnlineProfileRun: "7F57EF9A",
        PoseSetActive: "22C02050",
        PreferenceExit: "27E40748",
        PreferenceInitPlayer: "B12FA731",
        // Screens/Character/Preference/Preference.js (6.5.2024)
        PreferenceSubscreenArousalClick: "84F49886",
        PreferenceSubscreenArousalRun: "96A6157B",
        PreferenceSubscreenImmersionClick: "0EF82344",
        PreferenceSubscreenImmersionRun: "276FA30B",
        RelogRun: "843E8F94",
        RelogExit: "2DFB2DAD",
        ServerAccountBeep: "8782A099",
        // Scripts/Server.js
        ServerAppearanceBundle: "4D069622",
        ServerAppearanceLoadFromBundle: "946537FD",
        ServerConnect: "845E50A6",
        ServerDisconnect: "433A71F9",
        ServerInit: "B6CEF7F1",
        ServerOpenFriendList: "FA8D3CDE",
        ServerPlayerAppearanceSync: "A014E0B7",
        ServerPlayerExtensionSettingsSync: "1776666B",
        ServerSend: "ABE74E75",
        ServerSendQueueProcess: "BD4277AC",
        SkillGetWithRatio: "3EB4BC45",
        SpeechTransformBabyTalk: "C812EE0E",
        // Scripts/Speech.js
        SpeechTransformGagGarble: "691A05BF",
        // Scripts/Speech.js
        SpeechTransformGagGarbleIntensity: "F61ECBDA",
        // Scripts/Speech.js
        SpeechTransformProcess: "666DDA2F",
        // Scripts/Speech.js
        SpeechTransformShouldBabyTalk: "634BCD64",
        // Scripts/Speech.js
        SpeechTransformStutter: "A930F55E",
        // Scripts/Speech.js
        SpeechTransformStutterIntensity: "4754768A",
        // Scripts/Speech.js
        StruggleDexterityProcess: "D185D348",
        // Scripts/Struggle.js
        StruggleFlexibilityCheck: "727CE05B",
        StruggleFlexibilityProcess: "1A0B96EF",
        // Scripts/Struggle.js
        StruggleLockPickDraw: "6FE841B9",
        // Scripts/Struggle.js
        StruggleMinigameHandleExpression: "1B3ABF55",
        StruggleMinigameStop: "FB05E8A9",
        StruggleStrengthProcess: "B1A1457D",
        // StruggleStrengthProcess
        TextGet: "4DDE5794",
        TextLoad: "0D535190",
        TimerInventoryRemove: "2588CA11",
        TimerProcess: "BFB7FFE2",
        TitleExit: "F13F533C",
        ValidationSanitizeProperties: "843D3952",
        WardrobeClick: "33405B1D",
        WardrobeExit: "12D14AE4",
        WardrobeFastLoad: "AAB9F25B",
        WardrobeFastSave: "D1E906FD",
        WardrobeFixLength: "CA3334C6",
        WardrobeLoad: "C343A4C7",
        WardrobeLoadCharacterNames: "F39DF5E3",
        WardrobeRun: "633B3570"
      };
    default:
      return {
        ActivityChatRoomArousalSync: "BFF3DED7",
        ActivitySetArousal: "3AE28123",
        ActivitySetArousalTimer: "1342AFE2",
        ActivityTimerProgress: "6CD388A7",
        AppearanceClick: "22CDB584",
        // Screens/Character/Appearance/Appearance.js (21.5.2024)
        AppearanceLoad: "4360C485",
        AppearanceRun: "08D2AED9",
        // Screens/Character/Appearance/Appearance.js (13.5.2024)
        CharacterAppearanceBuildCanvas: "C05FE035",
        // Screens/Character/Appearance/Appearance.js
        CharacterAppearanceMustHide: "9C34DF21",
        CharacterAppearanceVisible: "0740043C",
        CharacterAppearanceWardrobeLoad: "A5B63A03",
        CharacterBuildDialog: "9196D21D",
        CharacterCompressWardrobe: "2A05ECD1",
        CharacterDelete: "57AA5D48",
        CharacterGetCurrent: "69F45A41",
        CharacterLoadCanvas: "EAB81BC4",
        CharacterLoadOnline: "407FEDDE",
        // Scripts/Character.js
        CharacterNickname: "A794EFF5",
        CharacterRefresh: "301DA9CF",
        CharacterSetCurrent: "9B71AC3E",
        CharacterSetFacialExpression: "FAF129E1",
        // Scripts/Character.js (6.5.2024)
        CharacterSetActivePose: "566A14D7",
        ChatAdminRoomCustomizationClick: "857766E7",
        ChatAdminRoomCustomizationProcess: "AF01C65A",
        ChatRoomAppendChat: "12890378",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomCharacterUpdate: "DE2DC592",
        ChatRoomCharacterViewDraw: "732C91C9",
        // Screens/Online/ChatRoom/ChatRoomCharacterView.js (19.4.2024 )
        ChatRoomCharacterViewIsActive: "CD8066FA",
        ChatRoomCurrentTime: "A462DD3A",
        ChatRoomDrawCharacterStatusIcons: "3D957FC2",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomGenerateChatRoomChatMessage: "3BDE0884",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomHideElements: "D58ECB5C",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomHTMLEntities: "0A7ADB1D",
        ChatRoomKeyDown: "A4974D73",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomLeave: "BD1A285F",
        ChatRoomListManipulation: "75D28A8B",
        ChatRoomMapViewCharacterIsVisible: "286C447D",
        ChatRoomMapViewCharacterOnWhisperRange: "B0D08E96",
        ChatRoomMapViewIsActive: "D181020D",
        ChatRoomMenuBuild: "BE8ACFBE",
        ChatRoomMenuClick: "BE001739",
        // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomMenuDraw: "6DBEC23B",
        // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomMessage: "E75ED29B",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomRegisterMessageHandler: "C432923A",
        ChatRoomSendChat: "ACB10CE5",
        // Screens/Online/ChatRoom/ChatRoom.js
        ChatRoomStart: "2D8ADD08",
        ChatRoomSyncMemberJoin: "2A9CB40B",
        // Screens/Online/ChatRoom/ChatRoom.js
        CommandCombine: "80F9D4AF",
        // Screens/Online/ChatRoom/Commands.js
        CommandExecute: "D1DEB2AD",
        // Screens/Online/ChatRoom/Commands.js
        CommonClick: "918C74F3",
        CommonColorIsValid: "390A2CE4",
        CommonSetScreen: "85E69EBB",
        // Scripts/Common.js
        CraftingClick: "5E7225EA",
        // Screens/Room/Crafting/Crafting.js
        CraftingConvertSelectedToItem: "F5211D40",
        CraftingRun: "4CD7AB08",
        // Screens/Room/Crafting/Crafting.js
        DialogCanUnlock: "A86B2558",
        DialogLeave: "A31B5D3E",
        DialogMenuButtonBuild: "88CE1D73",
        // Scripts/Dialog.js (13.5.2024)
        DialogMenuButtonClick: "2CA1256C",
        // Scripts/Dialog.js (2.5.2024)
        DrawArousalMeter: "BB0755AF",
        DrawArousalThermometer: "7ED6D822",
        DrawBackNextButton: "7263249E",
        // Scripts/Drawing.js
        DrawButton: "B747DF6E",
        DrawCharacter: "B175AF5E",
        DrawCheckbox: "00FD87EB",
        DrawImageEx: "E01BE7E7",
        DrawImageResize: "D205975A",
        DrawItemPreview: "6A7A1E2A",
        DrawProcess: "7DA972D9",
        DrawText: "C1BF0F50",
        DrawTextFit: "F9A1B11E",
        ElementCreate: "A3E07B07",
        ElementCreateInput: "7F1709DA",
        ElementCreateTextArea: "4E040819",
        // Scripts/Element.js
        ElementIsScrolledToEnd: "1CC4FE11",
        ElementPosition: "81836C4E",
        // Scripts/Element.js
        ElementScrollToEnd: "1AC45575",
        ElementValue: "4F26C62F",
        FriendListShowBeep: "5B91D5DA",
        // Screens/Character/FriendList/FriendList.js
        GameRun: "337CB358",
        // Scripts/Game.js
        GLDrawResetCanvas: "81214642",
        InformationSheetRun: "5B5C7751",
        // Screens/Character/InformationSheet/InformationSheet.js
        InterfaceTextGet: "66603471",
        // Scripts/Text.js (2.5.2024)
        InventoryGet: "E666F671",
        "Layering.Load": "8FA7D9CB",
        // Scripts/Layering.js
        "Layering._ResetClickListener": "5EDCC26F",
        // Scripts/Layering.js
        LoginClick: "5B9765F8",
        // Screens/Character/Login/Login.js
        LoginDoLogin: "E9145D39",
        // Screens/Character/Login/Login.js
        LoginRun: "181BE041",
        // Screens/Character/Login/Login.js
        LoginStatusReset: "43C3FCD2",
        MouseIn: "CA8B839E",
        NotificationDrawFavicon: "AB88656B",
        NotificationRaise: "E8F29646",
        NotificationTitleUpdate: "0E92F3ED",
        OnlineGameAllowChange: "3779F42C",
        OnlineProfileClick: "521146DF",
        OnlineProfileUnload: "A8651F30",
        OnlineProfileLoad: "BE8B009B",
        OnlineProfileRun: "7F57EF9A",
        PoseSetActive: "22C02050",
        PreferenceExit: "27E40748",
        PreferenceInitPlayer: "B12FA731",
        // Screens/Character/Preference/Preference.js (6.5.2024)
        PreferenceSubscreenArousalClick: "84F49886",
        PreferenceSubscreenArousalRun: "96A6157B",
        PreferenceSubscreenImmersionClick: "0EF82344",
        PreferenceSubscreenImmersionRun: "276FA30B",
        RelogRun: "843E8F94",
        RelogExit: "2DFB2DAD",
        ServerAccountBeep: "8782A099",
        // Scripts/Server.js
        ServerAppearanceBundle: "4D069622",
        ServerAppearanceLoadFromBundle: "946537FD",
        ServerConnect: "845E50A6",
        ServerDisconnect: "433A71F9",
        ServerInit: "B6CEF7F1",
        ServerOpenFriendList: "FA8D3CDE",
        ServerPlayerAppearanceSync: "A014E0B7",
        ServerPlayerExtensionSettingsSync: "1776666B",
        ServerSend: "ABE74E75",
        ServerSendQueueProcess: "BD4277AC",
        SkillGetWithRatio: "3EB4BC45",
        SpeechTransformBabyTalk: "C812EE0E",
        // Scripts/Speech.js
        SpeechTransformGagGarble: "691A05BF",
        // Scripts/Speech.js
        SpeechTransformGagGarbleIntensity: "F61ECBDA",
        // Scripts/Speech.js
        SpeechTransformProcess: "666DDA2F",
        // Scripts/Speech.js
        SpeechTransformShouldBabyTalk: "634BCD64",
        // Scripts/Speech.js
        SpeechTransformStutter: "A930F55E",
        // Scripts/Speech.js
        SpeechTransformStutterIntensity: "4754768A",
        // Scripts/Speech.js
        StruggleDexterityProcess: "D185D348",
        // Scripts/Struggle.js
        StruggleFlexibilityCheck: "727CE05B",
        StruggleFlexibilityProcess: "1A0B96EF",
        // Scripts/Struggle.js
        StruggleLockPickDraw: "6FE841B9",
        // Scripts/Struggle.js
        StruggleMinigameHandleExpression: "1B3ABF55",
        StruggleMinigameStop: "FB05E8A9",
        StruggleStrengthProcess: "B1A1457D",
        // StruggleStrengthProcess
        TextGet: "4DDE5794",
        TextLoad: "0D535190",
        TimerInventoryRemove: "2588CA11",
        TimerProcess: "BFB7FFE2",
        TitleExit: "F13F533C",
        ValidationSanitizeProperties: "843D3952",
        WardrobeClick: "33405B1D",
        WardrobeExit: "12D14AE4",
        WardrobeFastLoad: "AAB9F25B",
        WardrobeFastSave: "D1E906FD",
        WardrobeFixLength: "CA3334C6",
        WardrobeLoad: "C343A4C7",
        WardrobeLoadCharacterNames: "F39DF5E3",
        WardrobeRun: "633B3570"
      };
  }
}

// src/functions/functionIntegrityCheck.ts
async function functionIntegrityCheck() {
  await waitFor(() => GameVersion !== "R0" && typeof ServerIsConnected === "boolean" && ServerIsConnected);
  logInfo("Checking function integrity with GameVersion", GameVersion);
  function isObject(obj) {
    return !!obj && typeof obj === "object" && !Array.isArray(obj);
  }
  for (const [func, hash] of Object.entries(expectedHashes(GameVersion) || {})) {
    if (hash === "SKIP") continue;
    let context = window;
    const targetPath = func.split(".");
    for (let i = 0; i < targetPath.length - 1; i++) {
      context = context[targetPath[i]];
      if (!isObject(context)) {
        logWarn(`Expected Function ${func} not found; ${targetPath.slice(0, i + 1).join(".")} is not object`);
      }
    }
    context = context[targetPath.pop()];
    if (typeof context !== "function") {
      logWarn(`Expected function ${func} is not a function.`);
      continue;
    }
    const actualHash = SDK.getOriginalHash(func);
    if (actualHash !== hash) {
      logWarn(`Function ${func} has been modified before WCE, potential incompatibility: ${actualHash}`);
      deviatingHashes.push(func);
    }
  }
}

// src/functions/wceStyles.ts
var INPUT_WARN_CLASS = "bce-input-warn";
function wceStyles() {
  const css = (
    /* CSS */
    `
  .bce-beep-link {
    text-decoration: none;
  }
  #TextAreaChatLog .bce-notification,
  #TextAreaChatLog .bce-notification {
    background-color: #D696FF;
    color: black;
  }
  #TextAreaChatLog[data-colortheme="dark"] .bce-notification,
  #TextAreaChatLog[data-colortheme="dark2"] .bce-notification {
    background-color: #481D64;
    color: white;
  }
  .bce-img-link {
    vertical-align: top;
  }
  .bce-img {
    max-height: 25rem;
    max-width: 90%;
    display: inline;
    border:1px solid red;
    padding: 0.1rem;
  }
  .bce-color {
    width: 0.8em;
    height: 0.8em;
    display: inline-block;
    vertical-align: middle;
    border: 0.1em solid black;
    margin-right: 0.1em;
  }
  .${BCE_COLOR_ADJUSTMENTS_CLASS_NAME} .${DARK_INPUT_CLASS}.${INPUT_WARN_CLASS} {
    background-color: #400000 !important;
  }
  .${INPUT_WARN_CLASS} {
    background-color: yellow !important;
  }
  #TextAreaChatLog a,
  .bce-message a {
    color: #003f91;
    cursor: pointer;
  }
  #TextAreaChatLog a:visited,
  .bce-message a {
    color: #380091;
  }
  .${BCE_COLOR_ADJUSTMENTS_CLASS_NAME} div.ChatMessageWhisper,
  .${BCE_COLOR_ADJUSTMENTS_CLASS_NAME} div.ChatMessageWhisper {
    color: #646464;
  }
  .${BCE_COLOR_ADJUSTMENTS_CLASS_NAME} #TextAreaChatLog[data-colortheme="dark"] div.ChatMessageWhisper,
  .${BCE_COLOR_ADJUSTMENTS_CLASS_NAME} #TextAreaChatLog[data-colortheme="dark2"] div.ChatMessageWhisper {
    color: #828282;
  }
  #TextAreaChatLog[data-colortheme="dark"] a,
  #TextAreaChatLog[data-colortheme="dark2"] a,
  .bce-message a {
    color: #a9ceff;
  }
  #TextAreaChatLog[data-colortheme="dark"] a:visited,
  #TextAreaChatLog[data-colortheme="dark2"] a:visited,
  .bce-message a {
    color: #3d91ff;
  }
  .${WHISPER_CLASS} {
    font-style: italic;
  }
  .${BCE_COLOR_ADJUSTMENTS_CLASS_NAME} .${DARK_INPUT_CLASS} {
    background-color: #111;
    color: #eee;
    border-color: #333;
  }
  a.bce-button {
    text-decoration: none;
  }
  .bce-hidden {
    display: none !important;
  }
  .bce-false-hidden {
    position: absolute;
    border: 0;
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    width: 0.1px;
    height: 0.1px;
    opacity: 0.01;
  }
  .bce-line-icon-wrapper {
    display: none;
    position: absolute;
    right: 1em;
  }
  .ChatMessage:hover .bce-line-icon-wrapper,
  .ChatMessage:focus .bce-line-icon-wrapper,
  .ChatMessage:focus-within .bce-line-icon-wrapper {
    display: inline;
  }
  .bce-line-icon {
    height: 1em;
    vertical-align: middle;
  }
  #bce-instant-messenger {
    display: flex;
    z-index: 100;
    position: fixed;
    width: 80%;
    height: 70%;
    top: 5%;
    left: 10%;
    padding: 0;
    margin: 0;
    flex-direction: row;
    background-color: #111;
    color: #eee;
    border: 0.2em solid white;
    resize: both;
    overflow: auto;
    max-width: 80%;
    max-height: 75%;
    min-width: 38%;
    min-height: 30%;
    overflow-wrap: break-word;
  }
  #bce-friend-list {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .bce-friend-list-entry {
    padding: 1em;
  }
  .bce-friend-list-entry-name {
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }
  .bce-friend-list-selected {
    font-style: italic;
    border-top: 0.1em solid white;
    border-bottom: 0.1em solid white;
    background-color: #222;
  }
  #bce-message-container {
    width: 100%;
    height: 90%;
    font-size: 1.5rem;
    font-family: Arial, sans-serif;
  }
  #bce-message-right-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    border-left: 0.1em solid white;
  }
  #bce-message-input {
    width: 100%;
    height: 10%;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: #222;
    color: #eee;
    font-size: 1.5rem;
    font-family: system-ui;
  }
  .bce-friend-list-unread {
    background-color: #a22;
  }
  .bce-message-divider {
    margin: 0.5em 2em;
    border-bottom: 0.2em solid white;
  }
  .bce-message {
    padding: 0.2em 0.4em;
    position: relative;
    white-space: pre-wrap;
  }
  .bce-message::before {
    content: attr(data-time);
    float: right;
    color: gray;
    font-size: 0.5em;
    margin-right: 0.2em;
    font-style: italic;
  }
  .bce-message-sender {
    text-shadow: 0.05em 0.05em #eee;
    font-weight: bold;
  }
  .bce-message-Emote, .bce-message-Action {
    font-style: italic;
    color: gray;
  }
  .bce-message-Message .bce-message-sender {
    text-shadow: 0.05em 0.05em #eee;
  }
  .bce-friend-history {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
  }
  .bce-friend-list-handshake-false,
  .bce-friend-list-handshake-pending {
    text-decoration: line-through;
    color: gray;
  }
  #bce-message-left-container {
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 100%;
  }
  #bce-friend-search {
    border: 0;
    border-bottom: 0.1em solid white;
    padding: 0.5em;
    height: 1em;
    background-color: #222;
    color: #eee;
  }
  .bce-profile-open {
    margin-right: 0.5em;
  }
  .bce-pending {
    opacity: 0.4;
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 1em;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 44%;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

  #bceNoteInput {
    z-index: 100 !important;
  }

  #layering {
    grid-template:
      "asset-header button-grid" min-content
      "asset-grid asset-grid" min-content
      "layer-header layer-header" min-content
      "layer-grid layer-grid" auto
      "layer-hide-header layer-hide-header" min-content
      "layer-hide-grid layer-hide-grid" auto
      / auto min-content
    ;
  }
  #layering-button-grid {
    top: 0;
    position: sticky;
  }
  #layering-hide-header {
    grid-area: layer-hide-header;
  }
  #layering-wce-hide-div {
    box-sizing: border-box;
    grid-area: layer-hide-grid;
    width: 100%;
    height: calc(100% - min(2vh, 1vw));
    padding-left: min(2vh, 1vw);
    padding-right: min(2vh, 1vw);
    align-self: self-start;
  }

  .wce-chat-room-select,
  #wce-chat-garble-label {
    font-size: 80%;
  }
  #TextAreaChatLog[data-colortheme="dark"] + #chat-room-bot .wce-chat-room-select,
  #TextAreaChatLog[data-colortheme="dark2"] + #chat-room-bot .wce-chat-room-select {
    color: #fff;
    background-color: #111;
    border-color: #555;
  }
  .wce-chat-room-select option[value="off"] {
    display: none;
  }
  .wce-whisper .wce-chat-room-select option[value="off"] {
    display: block;
  }
  #wce-chat-garble-label:after {
    content: "chat: ";
  }
  .wce-whisper #wce-chat-garble-label:after {
    content: "whis: ";
  }
  .wce-chat-room-select-div {
    grid-column: 1 / 4;
    direction: ltr;
    position: relative;
    display: grid;
    grid-template-columns: 28% 72%;
    justify-items: stretch;
    align-items: baseline;
  }
  @media (hover: hover) {
    .wce-chat-room-select-div:hover > .button-tooltip {
      visibility: visible;
    }
  }
  #wce-chat-baby-talk::before {
    background-image: url("${"https://fielr.github.io/scripts/wce"}/baby.png");
    mask-image: url("${"https://fielr.github.io/scripts/wce"}/baby.png");
  }
  #wce-chat-stutters::before {
    background-image: url("${"https://fielr.github.io/scripts/wce"}/stutter.png");
    mask-image: url("${"https://fielr.github.io/scripts/wce"}/stutter.png");
  }
  #wce-chat-baby-talk[data-state="ignore"]::before,
  #wce-chat-stutters[data-state="ignore"]::before {
    --button-color: #bbb;
  }
  #wce-chat-baby-talk[data-state="preserve"]::before,
  #wce-chat-stutters[data-state="preserve"]::before {
    --button-color: #666;
  }
  `
  );
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

// src/functions/commonPatches.ts
var FBC_DEVS = [23476, 27006, 24890];
var WCE_DEVS = [129178];
function commonPatches() {
  patchFunction(
    "DrawBackNextButton",
    {
      "Disabled, ArrowWidth": "Disabled, ArrowWidth, tooltipPosition",
      "DrawButtonHover(Left, Top, Width, Height,": "DrawButtonHover(tooltipPosition?.X || Left, tooltipPosition?.Y || Top, tooltipPosition?.Width || Width, tooltipPosition?.Height || Height,"
    },
    "DrawBackNextButton tooltip positions may be incorrect."
  );
  patchFunction(
    "DrawButton",
    {
      "HoveringText, Disabled": "HoveringText, Disabled, tooltipPosition",
      "DrawButtonHover(Left, Top, Width, Height,": "DrawButtonHover(tooltipPosition?.X || Left, tooltipPosition?.Y || Top, tooltipPosition?.Width || Width, tooltipPosition?.Height || Height,"
    },
    "DrawButton tooltip positions may be incorrect."
  );
  patchFunction(
    "CommandExecute",
    { "key.indexOf(CommandsKey + cmd.Tag) == 0)": "key.substring(1) === cmd.Tag)" },
    "Whitelist commands will not work."
  );
  patchFunction(
    "PreferenceSubscreenArousalRun",
    {
      'DrawCheckbox(1250, 276, 64, 64, TextGet("ArousalAffectExpression"), Player.ArousalSettings.AffectExpression);': 'DrawCheckbox(1250, 276, 64, 64, TextGet("ArousalAffectExpression"), Player.ArousalSettings.AffectExpression, fbcSettingValue("animationEngine"));'
    },
    "disabling conflicting Player.ArousalSettings.AffectExpression when Animation Engine is active"
  );
  SDK.hookFunction(
    "PreferenceSubscreenArousalClick",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (fbcSettings.animationEngine && PreferenceArousalIsActive() && MouseIn(1250, 276, 64, 64)) return null;
      return next(args);
    }
  );
  patchFunction(
    "PreferenceSubscreenImmersionRun",
    {
      'TextGet("ShowUngarbledMessages"), Player.ImmersionSettings.ShowUngarbledMessages, disableButtons);': 'TextGet("ShowUngarbledMessages"), Player.ImmersionSettings.ShowUngarbledMessages, false);'
    },
    "Can't control show ungarbled messages while in Extreme mode."
  );
  SDK.hookFunction(
    "PreferenceSubscreenImmersionClick",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (PreferencePageCurrent === 2 && MouseIn(500, 592, 64, 64) && (Player.GetDifficulty() > 2 || Player.GameplaySettings.ImmersionLockSetting && Player.IsRestrained())) {
        Player.ImmersionSettings.ShowUngarbledMessages = !Player.ImmersionSettings.ShowUngarbledMessages;
        return null;
      }
      return next(args);
    }
  );
  PreferenceSubscreens.find((s) => s.name === "Arousal").run = PreferenceSubscreenArousalRun;
  PreferenceSubscreens.find((s) => s.name === "Arousal").click = PreferenceSubscreenArousalClick;
  PreferenceSubscreens.find((s) => s.name === "Immersion").run = PreferenceSubscreenImmersionRun;
  PreferenceSubscreens.find((s) => s.name === "Immersion").click = PreferenceSubscreenImmersionClick;
  SDK.hookFunction(
    "PreferenceLoad",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      PreferenceDidAddOldStyleScreens = false;
      const ret = next(args);
      PreferenceSubscreenList = [];
      return ret;
    }
  );
  SDK.hookFunction(
    "InformationSheetRun",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (!InformationSheetSelection?.MemberNumber) {
        return next(args);
      }
      const ret = next(args);
      const isFbcDev = FBC_DEVS.includes(InformationSheetSelection.MemberNumber);
      const isWceDev = WCE_DEVS.includes(InformationSheetSelection.MemberNumber);
      if (isFbcDev || isWceDev) {
        const ctx = window.MainCanvas.getContext("2d");
        if (!ctx) {
          throw new Error("could not get canvas 2d context");
        }
        ctx.textAlign = "left";
        DrawText(
          isWceDev ? displayText("WCE Developer") : displayText("FBC Developer"),
          550,
          75,
          isWceDev ? "fuchsia" : "hotpink",
          "black"
        );
        ctx.textAlign = "center";
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "ServerSend",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      const [msgType, data] = args;
      if (msgType !== "AccountUpdate") {
        return next(args);
      }
      if (!isNonNullObject(data)) {
        return next(args);
      }
      if ("ExtensionSettings" in data) {
        throw new Error("misuse of ExtensionSettings detected; write prevented");
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "ServerSendQueueProcess",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      if (!ServerIsConnected) {
        return null;
      }
      return next(args);
    }
  );
}

// src/functions/beepImprovements.js
function beepImprovements() {
  if (typeof window.StartBcUtil === "function") {
    fbcBeepNotify(
      displayText("Incompatibility"),
      displayText(
        "WCE is incompatible with BCUtil. Some functionality from WCE may not work. BCUtil's wardrobe, appearance, and instant messaging functionality are all available within WCE. Go to WCE settings and enable the relevant options, then disable BCUtil to migrate fully to WCE. This beep will appear every time WCE detects BCUtil as having loaded before WCE."
      )
    );
    return;
  }
  patchFunction(
    "ServerAccountBeep",
    {
      // eslint-disable-next-line no-template-curly-in-string
      'ChatRoomSendLocal(`<a onclick="ServerOpenFriendList()">(${ServerBeep.Message})</a>`);': `{
        const beepId = FriendListBeepLog.length - 1;
        ChatRoomSendLocal(\`<a id="bce-beep-reply-\${beepId}">\u21A9\uFE0F</a><a class="bce-beep-link" id="bce-beep-\${beepId}">(\${ServerBeep.Message}\${ChatRoomHTMLEntities(data.Message ? \`: \${bceStripBeepMetadata(data.Message.length > 150 ? data.Message.substring(0, 150) + "..." : data.Message)}\` : "")})</a>\`);
        if (document.getElementById("bce-beep-reply-" + beepId)) {
          document.getElementById(\`bce-beep-reply-\${beepId}\`).onclick = (e) => {
            e.preventDefault();
            ElementValue("InputChat", \`/beep \${data.MemberNumber} \${ElementValue("InputChat").replace(/^\\/(beep|w) \\S+ ?/u, '')}\`);
            document.getElementById('InputChat').focus();
          };
        }
        if (document.getElementById("bce-beep-" + beepId)) {
          document.getElementById(\`bce-beep-\${beepId}\`).onclick = (e) => {
            e.preventDefault();
            ServerOpenFriendList();
            FriendListModeIndex = 1;
            FriendListShowBeep(\`\${beepId}\`);
          };
        }
      }`
    },
    "Beeps are not enhanced by WCE."
  );
}

// src/functions/commands.ts
async function fbcDebug(copy) {
  const info = /* @__PURE__ */ new Map();
  info.set("Browser", navigator.userAgent);
  info.set("Game Version", `${GameVersion}${SUPPORTED_GAME_VERSIONS.includes(GameVersion) ? "" : " (unsupported)"}`);
  info.set("WebGL Version", GLVersion);
  info.set("WCE Version", FBC_VERSION);
  info.set("Loaded via FUSAM", typeof FUSAM === "object" && FUSAM?.addons?.WCE ? "Yes" : "No");
  info.set(
    "WCE Enabled Settings",
    `
- ${objEntries(fbcSettings).filter(([k, v]) => v || k === "version").map(([k, v]) => `${k}: ${v.toString()}`).join("\n- ")}`
  );
  if (toySyncState.client?.connected) {
    info.set(
      "Buttplug.io Devices",
      toySyncState.client.devices.map(
        (d) => `${d.name} (${d.vibrateAttributes.map((a) => a.FeatureDescriptor).join(",")})`
      ).join(", ")
    );
  }
  info.set(
    "SDK Mods",
    `
- ${bcModSdk.getModsInfo().map((m) => `${m.name} @ ${m.version}`).join("\n- ")}`
  );
  info.set("Incomplete Functions", incompleteFunctions.join(", "));
  info.set("Modified Functions (non-SDK)", deviatingHashes.join(", "));
  info.set("Skipped Functionality for Compatibility", `
- ${skippedFunctionality.join("\n- ")}`);
  info.set(
    "Log",
    pastLogs.filter((v) => v).map((v) => `[${v.level.toUpperCase()}] ${v.message}`).join("\n")
  );
  const print = Array.from(info).map(([k, v]) => `${k}: ${v}`).join("\n");
  if (copy) {
    fbcChatNotify(`${print}

**The report has been copied to your clipboard.**`);
    console.debug(`${print}

**The report has been copied to your clipboard.**`);
    await navigator.clipboard.writeText(print);
  }
  if (skippedFunctionality.length > 0) {
    fbcChatNotify(
      "If you are running another addon that modifies the game, but is not listed above, please tell its developer to use https://github.com/Jomshir98/bondage-club-mod-sdk to hook into the game instead. This is a very cheap and easy way for addon developers to almost guarantee compatibility with other addons."
    );
  }
  return print;
}
function findDrawnCharacters(target, limitVisible = false) {
  let baseList = limitVisible ? ChatRoomCharacterDrawlist : ChatRoomCharacter;
  if (ChatRoomMapViewIsActive()) {
    baseList = baseList.filter(ChatRoomMapViewCharacterIsVisible);
  }
  if (target === null) {
    return baseList;
  }
  let targetMembers = [];
  if (/^\d+$/u.test(target)) {
    targetMembers = [baseList.find((c) => c.MemberNumber === parseInt(target))];
  } else {
    targetMembers = baseList.filter(
      (c) => CharacterNickname(c).split(" ")[0]?.toLowerCase() === target?.toLowerCase() || c.Name.split(" ")[0].toLowerCase() === target?.toLowerCase()
    );
  }
  return targetMembers.filter(Boolean);
}
async function commands() {
  await waitFor(() => !!Commands);
  debug("registering additional commands");
  CommandCombine([
    {
      Tag: "fbcdebug",
      Description: displayText("Get debug information to share with developers."),
      Action: () => {
        fbcChatNotify("Warning: /fbcdebug is deprecated, use /wcedebug instead!");
        fbcDebug(true);
      }
    },
    {
      Tag: "fbcchangelog",
      Description: displayText("Show recent WCE changelog"),
      Action: () => {
        augmentedChatNotify(fbcChangelog);
        fbcChatNotify("Warning: /fbcchangelog is deprecated, use /wcechangelog instead!");
      }
    },
    {
      Tag: "wcedebug",
      Description: displayText("Get debug information to share with developers."),
      Action: () => {
        fbcDebug(true);
      }
    },
    {
      Tag: "wcechangelog",
      Description: displayText("Show recent WCE changelog"),
      Action: () => {
        augmentedChatNotify(fbcChangelog);
      }
    },
    {
      Tag: "wcegotoroom",
      Description: displayText("[room name or empty] switches to the room or leaves room if empty (ignoring all restrictions)"),
      Action: (_, command) => {
        bceGotoRoom(command.substring(13).trim());
      }
    },
    {
      Tag: "exportlooks",
      Description: displayText("[target member number]: Copy your or another player's appearance in a format that can be imported with WCE or BCX"),
      Action: (_, _command, [target]) => {
        let targetCharacter = null;
        if (!target) {
          targetCharacter = Player;
        } else {
          targetCharacter = Character.find((c) => c.MemberNumber === parseInt(target)) ?? null;
        }
        if (!targetCharacter) {
          logInfo("Could not find member", target);
          return;
        }
        let includeBase = false, includeBinds = false, includeLocks = false;
        FUSAM.modals.openAsync({
          prompt: displayText("Include binds?"),
          buttons: { cancel: "No", submit: "Yes" }
        }).then(([bindSubmit]) => {
          includeBinds = bindSubmit === "submit";
          if (includeBinds) {
            return FUSAM.modals.openAsync({
              prompt: displayText("Include locks?"),
              buttons: { cancel: "No", submit: "Yes" }
            }).then(([lockSubmit]) => {
              includeLocks = lockSubmit === "submit";
            });
          }
          return null;
        }).then(() => FUSAM.modals.openAsync({
          prompt: displayText("Include height, body type, hair, etc?"),
          buttons: { cancel: "No", submit: "Yes" }
        })).then(([baseSubmit]) => {
          includeBase = baseSubmit === "submit";
          const base = targetCharacter.Appearance.filter((a) => a.Asset.Group.IsDefault && !a.Asset.Group.Clothing);
          const clothes = targetCharacter.Appearance.filter((a) => a.Asset.Group.Category === "Appearance" && a.Asset.Group.Clothing);
          const binds = targetCharacter.Appearance.filter((a) => a.Asset.Group.Category === "Item" && !a.Asset.Group.BodyCosplay);
          const appearance = [...clothes];
          if (includeBinds) appearance.push(...binds);
          if (includeBase) appearance.push(...base);
          const looks = appearance.map((i) => {
            const property = i.Property ? { ...i.Property } : {};
            if (!includeLocks && property.LockedBy) {
              delete property.LockedBy;
              delete property.LockMemberNumber;
            }
            if (property?.LockMemberNumber) {
              property.LockMemberNumber = Player.MemberNumber;
            }
            return {
              Group: i.Asset.Group.Name,
              Name: i.Asset.Name,
              Color: i.Color,
              Difficulty: i.Difficulty,
              Property: property,
              Craft: i.Craft
            };
          });
          const targetName = targetCharacter.IsPlayer() ? "yourself" : CharacterNickname(targetCharacter);
          const exportString = LZString.compressToBase64(JSON.stringify(looks));
          FUSAM.modals.openAsync({
            prompt: displayText(displayText("Copy the looks string below")),
            input: { initial: exportString, readonly: true, type: "textarea" },
            buttons: { submit: "Done" }
          });
          return navigator.clipboard.writeText(exportString).then(() => {
            fbcChatNotify(displayText("Exported looks for $TargetName copied to clipboard", { $TargetName: targetName }));
          });
        });
      }
    },
    {
      Tag: "importlooks",
      Description: displayText("Import looks from a string (BCX or WCE export)"),
      Action: () => {
        if (!Player.CanChangeOwnClothes() || !OnlineGameAllowChange()) {
          fbcChatNotify(displayText("You cannot change your appearance while bound or during online games, such as LARP."));
          return;
        }
        FUSAM.modals.open({
          prompt: displayText("Paste your looks here"),
          input: { initial: "", readonly: false, type: "textarea" },
          callback: (act, bundleString) => {
            if (act !== "submit") return;
            if (!bundleString) {
              fbcChatNotify(displayText("No looks string provided"));
              return;
            }
            try {
              const bundle = bundleString.startsWith("[") ? parseJSON(bundleString) : parseJSON(LZString.decompressFromBase64(bundleString));
              if (!Array.isArray(bundle) || bundle.length === 0 || !bundle[0].Group) throw new Error("Invalid bundle");
              for (const item of Player.Appearance) {
                if (item.Property?.LockedBy && !DialogCanUnlock(Player, item)) {
                  const itemBundle = {
                    Group: item.Asset.Group.Name,
                    Name: item.Asset.Name,
                    Color: item.Color,
                    Difficulty: item.Difficulty,
                    Property: item.Property
                  };
                  const idx = bundle.findIndex((v) => v.Group === item.Asset.Group.Name);
                  if (idx < 0) {
                    bundle.push(itemBundle);
                  } else {
                    bundle[idx] = itemBundle;
                  }
                }
              }
              ServerAppearanceLoadFromBundle(Player, "Female3DCG", bundle, Player.MemberNumber);
              ChatRoomCharacterUpdate(Player);
              fbcChatNotify(displayText("Applied looks"));
            } catch (e) {
              console.error(e);
              fbcChatNotify(displayText("Could not parse looks"));
            }
          }
        });
      }
    },
    {
      Tag: "beep",
      Description: displayText("[membernumber] [message]: beep someone"),
      Action: (_, command, [target]) => {
        if (BCX?.getRuleState("speech_restrict_beep_send")?.isEnforced) {
          fbcChatNotify(displayText("Sending beeps is restricted by BCX rule."));
          return;
        }
        const [, , ...message] = command.split(" ");
        const msg = message?.join(" ");
        if (!target || !msg || !/^\d+$/u.test(target)) {
          fbcChatNotify(displayText("beep target or message not provided"));
          return;
        }
        const targetMemberNumber = parseInt(target);
        if (!Player.FriendList?.includes(targetMemberNumber)) {
          fbcChatNotify(displayText("$Target is not in your friend list", { $Target: target }));
          return;
        }
        const targetName = Player.FriendNames?.get(targetMemberNumber);
        ServerSend("AccountBeep", {
          BeepType: "",
          MemberNumber: targetMemberNumber,
          Message: msg,
          IsSecret: true
        });
        FriendListBeepLog.push({
          MemberNumber: targetMemberNumber,
          MemberName: targetName ?? `unknown (${targetMemberNumber})`,
          Sent: true,
          Private: false,
          Time: /* @__PURE__ */ new Date(),
          Message: msg
        });
        const beepId = FriendListBeepLog.length - 1;
        const link = document.createElement("a");
        link.href = `#beep-${beepId}`;
        link.onclick = (e) => {
          e.preventDefault();
          ServerOpenFriendList();
          FriendListModeIndex = 1;
          FriendListShowBeep(beepId);
        };
        link.textContent = displayText("(Beep to $Name ($Number): $Message)", {
          $Name: targetName ?? "unknown",
          $Number: targetMemberNumber.toString(),
          $Message: msg.length > 150 ? `${msg.substring(0, 150)}...` : msg
        });
        link.classList.add("bce-beep-link");
        fbcChatNotify(link);
      }
    },
    {
      Tag: "w",
      Description: displayText(
        "[target name] [message]: whisper the target player. Use first name only. Finds the first person in the room with a matching name, left-to-right, top-to-bottom."
      ),
      Action: (_, command, args) => {
        if (args.length < 2) {
          fbcChatNotify(displayText("Whisper target or message not provided"));
          return;
        }
        const [target] = args;
        const [, , ...message] = command.split(" ");
        const msg = message?.join(" ");
        const targetMembers = findDrawnCharacters(target);
        if (!target || !targetMembers || targetMembers.length === 0) {
          fbcChatNotify(`Whisper target not found: ${target}`);
        } else if (targetMembers.length > 1) {
          fbcChatNotify(displayText(
            "Multiple whisper targets found: $Targets. You can still whisper the player by clicking their name or by using their member number.",
            { $Targets: targetMembers.map((c) => `${CharacterNickname(c)} (${c.MemberNumber ?? ""})`).join(", ") }
          ));
        } else if (targetMembers[0].IsPlayer()) {
          fbcChatNotify("You can't whisper yourself!");
        } else if (!msg) {
          fbcChatNotify(displayText("No message provided"));
        } else {
          const targetMemberNumber = targetMembers[0].MemberNumber;
          const originalTarget = ChatRoomTargetMemberNumber;
          ChatRoomTargetMemberNumber = targetMemberNumber ?? -1;
          ElementValue("InputChat", `${msg.length > 0 && [".", "/"].includes(msg[0]) ? "\u200B" : ""}${msg}`);
          ChatRoomSendChat();
          ChatRoomLastMessage.pop();
          ChatRoomTargetMemberNumber = originalTarget;
        }
      }
    },
    {
      Tag: "versions",
      Description: displayText("show versions of the club, WCE, BCX and other mods in use by players"),
      Action: (_, _command, args) => {
        function getCharacterModInfo(character) {
          const bcVersion = character.OnlineSharedSettings?.GameVersion ?? "R0";
          const BCXi = window.bcx?.getCharacterVersion(character.MemberNumber) ? ` BCX ${window.bcx.getCharacterVersion(character.MemberNumber) ?? "?"}` : "";
          const FBCi = character.FBC ? `
WCE v${character.FBC} Alt Arousal: ${character.BCEArousal?.toString()}` : "";
          const others = character.FBCOtherAddons?.some((mod) => !["BCX", "FBC", "WCE"].includes(mod.name)) ? `
Other Addons:
- ${character.FBCOtherAddons.filter((mod) => !["BCX", "FBC", "WCE"].includes(mod.name)).map((mod) => `${mod.name} v${mod.version} ${mod.repository ?? ""}`).join("\n- ")}` : "";
          return `${CharacterNickname(character)} (${character.MemberNumber ?? ""}) club ${bcVersion}${BCXi}${FBCi}${others}`;
        }
        const printList = findDrawnCharacters(args.length > 0 ? args[0] : null, true);
        const versionOutput = printList.map(getCharacterModInfo).filter((info) => info).join("\n\n");
        fbcChatNotify(versionOutput);
        debug(versionOutput);
      }
    },
    {
      Tag: "ulistadd",
      Description: displayText("[membernumber]: adds a player to the list allowing to bypass Uwall."),
      Action: (_, _command, args) => {
        if (args.length < 1) {
          fbcChatNotify("The ulistadd command must be followed by the member number of the player that you allow to bypass Uwall.");
        } else {
          const member = parseInt(args[0]);
          const Ulist = Player.OnlineSharedSettings.Ulist ?? [];
          if (!isNaN(member) && member > 0 && member !== Player.MemberNumber && !Ulist.includes(member)) {
            Player.OnlineSharedSettings.Ulist = [...Ulist, member];
            ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
          }
          if (!fbcSettings.uwall) fbcChatNotify("Warning: Uwall is not activated in WCE's settings.");
        }
      }
    },
    {
      Tag: "ulistremove",
      Description: displayText("[membernumber]: removes a player from the list allowing to bypass Uwall."),
      Action: (_, _command, args) => {
        if (args.length < 1) {
          fbcChatNotify("The ulistremove command must be followed by the member number of the player who is no more allowed to bypass Uwall.");
        } else {
          const member = parseInt(args[0]);
          const { Ulist } = Player.OnlineSharedSettings;
          if (Array.isArray(Ulist) && !isNaN(member) && member > 0 && member !== Player.MemberNumber) {
            Player.OnlineSharedSettings.Ulist = Ulist.filter((m) => m !== member);
            ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
          }
          if (!fbcSettings.uwall) fbcChatNotify("Warning: Uwall is not activated in WCE's settings.");
        }
      }
    },
    {
      Tag: "ulistshow",
      Description: displayText("displays the list of players allowed to bypass Uwall."),
      Action: () => {
        fbcChatNotify(`Ulist: ${JSON.stringify(Player.OnlineSharedSettings.Ulist ?? [])}`);
        if (!fbcSettings.uwall) fbcChatNotify("Warning: Uwall is not activated in WCE's settings.");
      }
    }
  ]);
}

// src/functions/settingsPage.ts
var SelectButtonOffset = 900;
var SelectButtonWidth = 200;
async function settingsPage() {
  await waitFor(() => !!PreferenceRegisterExtensionSetting);
  debug("initializing");
  const settingsPerPage = 8, settingsYIncrement = 70, settingsYStart = 225;
  function settingsPageCount(category) {
    return Math.ceil(Object.values(defaultSettings).filter((v) => v.category === category).length / settingsPerPage);
  }
  const licensePosition = [
    1500,
    /* 120 */
    60,
    250,
    50
  ];
  const websitePosition = [1240, 60, 250, 50];
  let currentPageNumber = 0;
  let currentCategory = null;
  let currentSetting = "";
  const settingsCategories = [
    "chat",
    "activities",
    "appearance",
    "immersion",
    "antigarble",
    "performance",
    "misc",
    "cheats",
    "buttplug"
  ];
  const settingCategoryLabels = {
    chat: "Chat & Social",
    activities: "Activities & Arousal",
    appearance: "Appearance & Wardrobe",
    immersion: "Immersion & Anti-Cheat",
    antigarble: "Gagspeak & Anti-Garble",
    performance: "Performance",
    misc: "Misc",
    cheats: "Cheats",
    buttplug: "Buttplug.io Toys",
    hidden: ""
  };
  const vibratingSlots = [
    "None",
    ...new Set(Asset.filter((a) => a.AllowEffect?.includes("Vibrating") || a.AllowEffect?.includes("Egged")).map((a) => a.Group.Name))
  ];
  const scanButtonPosition = [1650, 225, 150, 50];
  function currentDefaultSettings(category) {
    return Object.entries(defaultSettings).filter(([k, v]) => v.category === category && k !== "buttplugDevices");
  }
  function PreferenceSubscreenBCESettingsLoad() {
    ElementCreateInput("WceIntifaceAddress", "text", fbcSettings.toySyncAddress);
    ElementPosition("WceIntifaceAddress", -999, -999, 550);
    currentPageNumber = 0;
  }
  function PreferenceSubscreenBCESettingsExit() {
    fbcSettings.toySyncAddress = ElementValue("WceIntifaceAddress");
    ElementRemove("WceIntifaceAddress");
    bceSaveSettings();
    PreferenceSubscreenExtensionsClear();
  }
  function PreferenceSubscreenBCESettingsRun() {
    const ctx = window.MainCanvas.getContext("2d");
    if (!ctx) {
      logError("Could not get canvas context");
      return;
    }
    ctx.textAlign = "left";
    DrawText(
      displayText(currentCategory ? `WCE Settings - ${settingCategoryLabels[currentCategory]}` : "Wholesome Club Extensions (WCE) Settings"),
      300,
      125,
      "Black",
      "Gray"
    );
    DrawButton(...licensePosition, "", "White", "");
    DrawText(displayText("License"), licensePosition[0] + 20, licensePosition[1] + licensePosition[3] / 2, "Black", "");
    DrawButton(...websitePosition, "", "White", "");
    DrawText(
      displayText("Information"),
      websitePosition[0] + 20,
      websitePosition[1] + websitePosition[3] / 2,
      "Black",
      ""
    );
    DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
    if (currentCategory) {
      let y = settingsYStart;
      for (const [settingName, defaultSetting] of currentDefaultSettings(currentCategory).slice(
        currentPageNumber * settingsPerPage,
        currentPageNumber * settingsPerPage + settingsPerPage
      )) {
        if (defaultSetting.type === "select" && Array.isArray(defaultSetting.options)) {
          const defSetting = defaultSetting;
          const idx = defSetting.options.indexOf(fbcSettings[settingName]);
          const len = defSetting.options.length;
          const disabled = defSetting.disabled?.() || false;
          DrawText(
            displayText(defaultSetting.label),
            400,
            y + 33,
            currentSetting === settingName ? "Red" : "Black",
            "Gray"
          );
          DrawBackNextButton(
            SelectButtonOffset,
            y,
            SelectButtonWidth,
            64,
            displayText(defSetting.options[idx]),
            disabled ? "#ebebe4" : "White",
            "",
            () => displayText(`${defaultSetting.label} ${defSetting.options[(idx - 1 + len) % len]}`),
            () => displayText(`${defaultSetting.label} ${defSetting.options[(idx + 1 + len) % len]}`),
            disabled
          );
        } else {
          DrawCheckbox(
            300,
            y,
            64,
            64,
            displayText(defaultSetting.label),
            !!fbcSettings[settingName],
            defaultSetting.disabled(),
            currentSetting === settingName ? "Red" : "Black"
          );
        }
        y += settingsYIncrement;
      }
      if (currentCategory === "buttplug") {
        DrawText(
          displayText("This page allows configuration of the synchronization of bluetooth connected toys."),
          300,
          350,
          "Black",
          "Gray"
        );
        ElementPosition("WceIntifaceAddress", 1300, settingsYStart + 32, 550);
        if (fbcSettings.toySync) {
          if (!toySyncState.client?.connected) {
            DrawText(displayText("Still connecting or connection failed..."), 300, 450, "Black", "Gray");
          } else {
            ctx.textAlign = "center";
            DrawButton(
              ...scanButtonPosition,
              displayText("Scan"),
              toySyncState.client.isScanning ? "Grey" : "White",
              "",
              // Bc types do not accept null
              // eslint-disable-next-line no-undefined
              toySyncState.client.isScanning ? "Already scanning" : void 0,
              toySyncState.client.isScanning
            );
            ctx.textAlign = "left";
            DrawText(displayText("Device Name"), 300, 420, "Black", "Gray");
            DrawText(displayText("Synchronized Slot"), 800, 420, "Black", "Gray");
            y = 500;
            for (const d of toySyncState.client.devices.filter((dev) => dev.vibrateAttributes.length > 0)) {
              let deviceSettings = toySyncState.deviceSettings.get(d.name);
              if (!deviceSettings) {
                deviceSettings = {
                  Name: d.name,
                  SlotName: "None"
                };
                toySyncState.deviceSettings.set(d.name, deviceSettings);
              }
              const currentIdx = vibratingSlots.indexOf(deviceSettings.SlotName);
              let nextIdx = 0, previousIdx = 0;
              if (currentIdx <= 0) {
                previousIdx = vibratingSlots.length - 1;
              } else {
                previousIdx = currentIdx - 1;
              }
              if (currentIdx === vibratingSlots.length - 1) {
                nextIdx = 0;
              } else {
                nextIdx = currentIdx + 1;
              }
              DrawText(d.name, 300, y, "Black", "Gray");
              ctx.textAlign = "center";
              DrawBackNextButton(
                800,
                y - 32,
                450,
                64,
                displayText(deviceSettings.SlotName),
                "white",
                "",
                () => displayText(vibratingSlots[previousIdx]),
                () => displayText(vibratingSlots[nextIdx])
              );
              ctx.textAlign = "left";
              y += settingsYIncrement;
              if (y > 950) {
                break;
              }
            }
          }
        }
      } else {
        DrawText(displayText("Click on a setting to see its description"), 300, 160, "Gray", "Silver");
        if (isDefaultSettingKey(currentSetting)) {
          if (defaultSettings[currentSetting].type === "select" && Array.isArray(defaultSettings[currentSetting].tooltips)) {
            const defSetting = defaultSettings[currentSetting];
            const idx = defSetting.options.indexOf(fbcSettings[currentSetting]);
            drawTooltip(300, 800, 1600, displayText(defSetting.description), "left");
            drawTooltip(330, 870, 1570, displayText(defSetting.tooltips[idx]), "left");
          } else {
            drawTooltip(300, 830, 1600, displayText(defaultSettings[currentSetting].description), "left");
          }
        }
        if (settingsPageCount(currentCategory) > 1) {
          DrawText(`${currentPageNumber + 1} / ${settingsPageCount(currentCategory)}`, 1700, 230, "Black", "Gray");
          DrawButton(1815, 180, 90, 90, "", "White", "Icons/Next.png");
        }
      }
    } else {
      let y = settingsYStart;
      for (const category of settingsCategories) {
        DrawButton(300, y, 400, 64, "", "White");
        DrawTextFit(displayText(settingCategoryLabels[category]), 310, y + 32, 380, "Black");
        y += settingsYIncrement;
      }
    }
    ctx.textAlign = "center";
  }
  function PreferenceSubscreenBCESettingsClick() {
    let y = settingsYStart;
    if (MouseIn(1815, 75, 90, 90)) {
      if (currentCategory === null) {
        PreferenceSubscreenBCESettingsExit();
      } else {
        ElementPosition("WceIntifaceAddress", -999, -999, 550);
        currentCategory = null;
      }
    } else if (MouseIn(...licensePosition)) {
      open(BCE_LICENSE, "_blank");
    } else if (MouseIn(...websitePosition)) {
      open(WEBSITE_URL, "_blank");
    } else if (currentCategory !== null) {
      if (MouseIn(1815, 180, 90, 90) && currentCategory !== "buttplug") {
        currentPageNumber += 1;
        currentPageNumber %= settingsPageCount(currentCategory);
      } else {
        for (const [settingName, defaultSetting] of currentDefaultSettings(currentCategory).slice(
          currentPageNumber * settingsPerPage,
          currentPageNumber * settingsPerPage + settingsPerPage
        )) {
          if (defaultSetting.type === "select" && Array.isArray(defaultSetting.options)) {
            const defSetting = defaultSetting;
            const segWidth = SelectButtonWidth / 2;
            const idx = defSetting.options.indexOf(fbcSettings[settingName]);
            const len = defSetting.options.length;
            if (MouseIn(SelectButtonOffset + segWidth, y, segWidth, 64) && !defSetting.disabled?.()) {
              fbcSettings[settingName] = defSetting.options[(idx + 1 + len) % len];
            } else if (MouseIn(SelectButtonOffset, y, segWidth, 64) && !defSetting.disabled?.()) {
              fbcSettings[settingName] = defSetting.options[(idx - 1 + len) % len];
            }
          } else if (MouseIn(300, y, 64, 64) && !defaultSetting.disabled?.()) {
            fbcSettings[settingName] = !fbcSettings[settingName];
            defaultSetting.sideEffects(fbcSettings[settingName], false);
          }
          if (MouseIn(364, y, 1e3, 64)) {
            currentSetting = settingName;
            debug("currentSetting", currentSetting);
          }
          y += settingsYIncrement;
        }
      }
      if (currentCategory === "buttplug" && toySyncState.client?.connected) {
        if (MouseIn(...scanButtonPosition)) {
          if (!toySyncState.client.isScanning) {
            toySyncState.client.startScanning();
          }
          return;
        }
        y = 500;
        for (const d of toySyncState.client.devices.filter((dev) => dev.vibrateAttributes.length > 0)) {
          if (!MouseIn(800, y - 32, 450, 64)) {
            y += settingsYIncrement;
            continue;
          }
          const deviceSettings = toySyncState.deviceSettings.get(d.name);
          if (!deviceSettings) {
            logWarn("Could not find device settings for", d.name, toySyncState.deviceSettings);
            y += settingsYIncrement;
            continue;
          }
          const currentIdx = vibratingSlots.indexOf(deviceSettings.SlotName);
          let nextIdx = 0, previousIdx = 0;
          if (currentIdx <= 0) {
            previousIdx = vibratingSlots.length - 1;
          } else {
            previousIdx = currentIdx - 1;
          }
          if (currentIdx === vibratingSlots.length - 1) {
            nextIdx = 0;
          } else {
            nextIdx = currentIdx + 1;
          }
          if (MouseX < 800 + 450 / 2) {
            deviceSettings.SlotName = vibratingSlots[previousIdx];
          } else {
            deviceSettings.SlotName = vibratingSlots[nextIdx];
          }
          y += settingsYIncrement;
          if (y > 950) {
            break;
          }
        }
      }
    } else {
      for (const category of settingsCategories) {
        if (MouseIn(300, y, 400, 64)) {
          currentCategory = category;
          currentPageNumber = 0;
          break;
        }
        y += settingsYIncrement;
      }
    }
  }
  PreferenceRegisterExtensionSetting({
    Identifier: "WCE",
    ButtonText: displayText("WCE Settings"),
    Image: `${"https://fielr.github.io/scripts/wce"}/icon.png`,
    click: PreferenceSubscreenBCESettingsClick,
    run: PreferenceSubscreenBCESettingsRun,
    exit: PreferenceSubscreenBCESettingsExit,
    load: PreferenceSubscreenBCESettingsLoad
  });
  function keyHandler(e) {
    if (e.key === "Escape" && currentCategory !== null) {
      currentCategory = null;
      ElementPosition("WceIntifaceAddress", -999, -999, 550);
      e.stopPropagation();
      e.preventDefault();
    }
  }
  document.addEventListener("keydown", keyHandler, true);
  document.addEventListener("keypress", keyHandler, true);
}

// src/functions/lockpickHelp.js
async function lockpickHelp() {
  await waitFor(() => !!StruggleMinigames);
  function newRand(s) {
    return () => {
      s = Math.sin(s) * 1e4;
      return s - Math.floor(s);
    };
  }
  const pinSpacing = 100, pinWidth = 200, x = 1575, y = 300;
  SDK.hookFunction(
    "StruggleLockPickDraw",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (fbcSettings.lockpick && StruggleLockPickOrder) {
        const hints = StruggleLockPickOrder.map((a) => {
          return a;
        });
        for (let p = 0; p < hints.length; p++) {
          const xx = x - pinWidth / 2 + (0.5 - hints.length / 2 + p) * pinSpacing;
          DrawText(`${StruggleLockPickOrder.indexOf(p) + 1}`, xx, y, "white");
        }
      }
      return next(args);
    }
  );
  debug("hooking struggle for lockpick cheat draw", StruggleMinigames);
  StruggleMinigames.LockPick.Draw = StruggleLockPickDraw;
}

// src/functions/automaticReconnect.js
async function automaticReconnect() {
  const { Dexie: Dexie2 } = await Promise.resolve().then(() => (init_import_wrapper(), import_wrapper_exports));
  const db = new Dexie2("wce-saved-accounts");
  db.version(2).stores({
    key: "id, key",
    accounts: "id, data, iv, auth"
  });
  const keyTable = db.table("key");
  const accTable = db.table("accounts");
  let encKey, key;
  try {
    key = await keyTable.get({ id: 1 });
  } catch (e) {
    logWarn(e);
    localStorage.removeItem("bce.passwords");
    await db.delete();
    window.location.reload();
  }
  if (!key) {
    encKey = await window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    await keyTable.put({ id: 1, key: encKey });
  } else {
    encKey = key.key;
  }
  async function loadAccounts() {
    const d = localStorage.getItem("bce.passwords");
    if (d) {
      const accs = parseJSON(d) || {};
      if (window.crypto?.subtle) {
        setTimeout(() => {
          localStorage.removeItem("bce.passwords");
          storeAccounts(accs);
        }, 1);
      }
      return accs;
    }
    const res = await accTable.get({ id: 1 });
    if (!res) return {};
    const { auth, iv, data } = res;
    const decoder = new TextDecoder("utf8");
    try {
      const s = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv, additionalData: auth, tagLength: 128 }, encKey, data);
      return parseJSON(decoder.decode(new Uint8Array(s))) || {};
    } catch (e) {
      logWarn(e);
      localStorage.removeItem("bce.passwords");
      keyTable.clear();
      accTable.clear();
      return {};
    }
  }
  let accounts = await loadAccounts();
  function loadPasswords() {
    return accounts || {};
  }
  function storeAccounts(accs) {
    if (window.crypto?.subtle) {
      const iv = window.crypto.getRandomValues(new Uint8Array(16));
      const auth = window.crypto.getRandomValues(new Uint8Array(16));
      const encoder = new TextEncoder();
      accounts = accs;
      window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv, additionalData: auth, tagLength: 128 },
        encKey,
        encoder.encode(JSON.stringify(accs))
      ).then((s) => accTable.put({ id: 1, iv, auth, data: new Uint8Array(s) }, [1]));
    } else {
      localStorage.removeItem("bce.passwords");
    }
  }
  function updatePasswordForReconnect() {
    let name = "";
    if (CurrentScreen === "Login") {
      name = ElementValue("InputName").toUpperCase();
    } else if (CurrentScreen === "Relog") {
      name = Player.AccountName;
    }
    const passwords = loadPasswords();
    passwords[name] = ElementValue("InputPassword");
    storeAccounts(passwords);
  }
  globalThis.bceUpdatePasswordForReconnect = updatePasswordForReconnect;
  function clearPassword(accountname) {
    const passwords = loadPasswords();
    if (!Object.hasOwn(passwords, accountname)) {
      return;
    }
    delete passwords[accountname];
    storeAccounts(passwords);
  }
  globalThis.bceClearPassword = clearPassword;
  let lastClick = Date.now();
  async function loginCheck() {
    await waitFor(() => CurrentScreen === "Login");
    const loginData = {
      passwords: loadPasswords(),
      posMaps: {}
    };
    SDK.hookFunction(
      "LoginRun",
      HOOK_PRIORITIES.Top,
      (args, next) => {
        const ret = next(args);
        if (Object.keys(loginData.passwords).length > 0) {
          DrawText(displayText("Saved Logins (WCE)"), 170, 35, "White", "Black");
        }
        DrawButton(1250, 387, 180, 50, displayText("Save (WCE)"), "White");
        let y = 60;
        for (const user in loginData.passwords) {
          if (!Object.hasOwn(loginData.passwords, user)) {
            continue;
          }
          loginData.posMaps[y] = user;
          DrawButton(10, y, 350, 60, user, "White");
          DrawButton(355, y, 60, 60, "X", "White");
          y += 70;
        }
        return ret;
      }
    );
    SDK.hookFunction(
      "LoginClick",
      HOOK_PRIORITIES.Top,
      (args, next) => {
        const ret = next(args);
        if (MouseIn(1250, 385, 180, 60)) {
          updatePasswordForReconnect();
          loginData.posMaps = {};
          loginData.passwords = loadPasswords();
        }
        const now = Date.now();
        if (now - lastClick < 150) {
          return ret;
        }
        lastClick = now;
        for (const pos in loginData.posMaps) {
          if (!Object.hasOwn(loginData.posMaps, pos)) {
            continue;
          }
          const idx = parseInt(pos);
          if (MouseIn(10, idx, 350, 60)) {
            LoginDoLogin(loginData.posMaps[idx], loginData.passwords[loginData.posMaps[idx]]);
          } else if (MouseIn(355, idx, 60, 60)) {
            clearPassword(loginData.posMaps[idx]);
            loginData.posMaps = {};
            loginData.passwords = loadPasswords();
          }
        }
        return ret;
      }
    );
    CurrentScreenFunctions.Run = LoginRun;
    CurrentScreenFunctions.Click = LoginClick;
  }
  loginCheck();
  let breakCircuit = false;
  let breakCircuitFull = false;
  async function relog() {
    if (!Player?.AccountName || !ServerIsConnected || LoginSubmitted || !ServerSocket.connected || breakCircuit || breakCircuitFull || !fbcSettings.relogin) {
      return;
    }
    breakCircuit = true;
    const passwords = loadPasswords();
    debug("Attempting to log in again as", Player.AccountName);
    if (!passwords[Player.AccountName]) {
      logWarn("No saved credentials for account", Player.AccountName);
      return;
    }
    LoginDoLogin(Player.AccountName, passwords[Player.AccountName]);
    if (!await waitFor(
      () => CurrentScreen !== "Relog",
      () => !breakCircuit
    )) {
      logWarn("Relogin failed, circuit was restored");
    }
    await sleep(500);
    SDK.callOriginal("ServerAccountBeep", [
      {
        MemberNumber: Player.MemberNumber || -1,
        BeepType: "",
        MemberName: "VOID",
        ChatRoomName: "VOID",
        Private: true,
        Message: displayText("Reconnected!"),
        ChatRoomSpace: ""
      }
    ]);
  }
  SDK.hookFunction(
    "RelogRun",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      const forbiddenReasons = ["ErrorDuplicatedLogin"];
      if (!forbiddenReasons.includes(LoginErrorMessage)) {
        relog();
      } else if (!breakCircuit) {
        SDK.callOriginal("ServerAccountBeep", [
          {
            MemberNumber: Player.MemberNumber || -1,
            BeepType: "",
            MemberName: Player.Name,
            ChatRoomName: displayText("ERROR"),
            Private: true,
            Message: displayText(
              "Signed in from a different location! Refresh the page to re-enable relogin in this tab."
            ),
            ChatRoomSpace: ""
          }
        ]);
        breakCircuit = true;
        breakCircuitFull = true;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "RelogExit",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      breakCircuit = false;
      breakCircuitFull = false;
      return next(args);
    }
  );
  registerSocketListener("connect", () => {
    breakCircuit = false;
  });
  SDK.hookFunction(
    "ServerDisconnect",
    HOOK_PRIORITIES.ModifyBehaviourHigh,
    (args, next) => {
      const [, force] = args;
      args[1] = false;
      const ret = next(args);
      if (force) {
        logWarn("Forcefully disconnected", args);
        ServerSocket.disconnect();
        if (isString(args[0]) && ["ErrorRateLimited", "ErrorDuplicatedLogin"].includes(args[0])) {
          logWarn("Reconnecting...");
          setTimeout(
            () => {
              logWarn("Connecting...");
              ServerInit();
            },
            3e3 + Math.round(Math.random() * 3e3)
          );
        } else {
          logWarn("Disconnected.");
        }
      }
      return ret;
    }
  );
}

// src/functions/layeringMenu.ts
async function layeringMenu() {
  await waitFor(() => !!Player?.AppearanceLayers);
  function DialogCanUnlock2(C, Item) {
    if (Item?.Property?.LockedBy === "ExclusivePadlock") return !C.IsPlayer();
    if (LogQuery("KeyDeposit", "Cell")) return false;
    if (Item?.Asset?.OwnerOnly) return Item.Asset.Enable && C.IsOwnedByPlayer();
    if (Item?.Asset?.LoverOnly) return Item.Asset.Enable && C.IsLoverOfPlayer();
    if (Item?.Asset?.FamilyOnly) return Item.Asset.Enable && C.IsFamilyOfPlayer();
    return DialogHasKey(C, Item);
  }
  SDK.hookFunction(
    "Layering.Load",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (fbcSettings.allowLayeringWhileBound && (!InventoryItemHasEffect(Layering.Item, "Lock") || DialogCanUnlock2(Layering.Character, Layering.Item))) {
        Layering.Readonly = false;
      }
      if (!Layering.Character.IsPlayer() && Layering.Character.BCECapabilities?.includes("preventLayeringByOthers")) {
        Layering.Readonly = true;
      }
      if (!fbcSettings.layeringHide || CurrentScreen === "Crafting" || !Layering.Character.BCECapabilities?.includes("layeringHide")) return next(args);
      const ret = next(args);
      const defaultItemHide = Layering.Asset.Hide || [];
      if (defaultItemHide.length === 0) return ret;
      const overrideItemHide = Layering.Item.Property.wceOverrideHide || defaultItemHide;
      const root = document.getElementById(Layering.ID.root);
      root.classList.add("scroll-box");
      root.querySelector("#layering-layer-div")?.classList.remove("scroll-box");
      ElementCreate({
        tag: "h1",
        attributes: { id: "layering-hide-header" },
        parent: root,
        children: [displayText("[WCE] Configure layer hiding")]
      });
      ElementCreate({
        tag: "form",
        attributes: { id: "layering-wce-hide-div" },
        classList: ["layering-layer-inner-grid"],
        parent: root,
        children: defaultItemHide.map((h) => ({
          tag: "div",
          classList: ["layering-pair"],
          children: [
            {
              tag: "input",
              // eslint-disable-next-line no-undefined
              attributes: { type: "checkbox", name: "checkbox-hide", value: h, disabled: Layering.Readonly ? true : void 0, checked: overrideItemHide.includes(h) ? true : void 0 },
              classList: [],
              eventListeners: {
                click: () => {
                  const hideForm = document.getElementById("layering-wce-hide-div");
                  Layering.Item.Property.wceOverrideHide = new FormData(hideForm).getAll("checkbox-hide");
                  if (defaultItemHide.length === Layering.Item.Property.wceOverrideHide.length) delete Layering.Item.Property.wceOverrideHide;
                  Layering._CharacterRefresh(Layering.Character, false, false);
                }
              }
            },
            {
              tag: "span",
              classList: ["layering-pair-text"],
              children: [h]
            }
          ]
        }))
      });
      return ret;
    }
  );
  SDK.hookFunction(
    "Layering._ResetClickListener",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (!fbcSettings.layeringHide || CurrentScreen === "Crafting") return next(args);
      delete Layering.Item.Property.wceOverrideHide;
      document.querySelectorAll("input[name=checkbox-hide]").forEach((e) => {
        e.checked = true;
      });
      return next(args);
    }
  );
  patchFunction(
    "CharacterAppearanceVisible",
    {
      "if ((item.Asset.Hide != null) && (item.Asset.Hide.indexOf(GroupName) >= 0) && !Excluded) HidingItem = true;": `
        const hide = item.Property?.wceOverrideHide != null ? item.Property.wceOverrideHide : item.Asset.Hide;
        if ((hide != null) && (hide.indexOf(GroupName) >= 0) && !Excluded) HidingItem = true;`
    },
    "Override C.Appeareance.Asset.Hide won't work"
  );
  function serverAppearance(appearance) {
    const WCEOverrides = { Hide: {} };
    for (const a of appearance) {
      if (Array.isArray(a.Property?.wceOverrideHide)) {
        const { wceOverrideHide, ...property } = a.Property;
        WCEOverrides.Hide[a.Group] = wceOverrideHide;
        a.Property = property;
      }
    }
    Player.ExtensionSettings.WCEOverrides = LZString.compressToUTF16(JSON.stringify(WCEOverrides));
    ServerPlayerExtensionSettingsSync("WCEOverrides");
    return appearance;
  }
  globalThis.wceServerAppearance = serverAppearance;
  patchFunction(
    "ServerPlayerAppearanceSync",
    {
      "D.Appearance = ServerAppearanceBundle(Player.Appearance);": "D.Appearance = wceServerAppearance(ServerAppearanceBundle(Player.Appearance));"
    },
    "wceOverrideHide would be stored in the BC database"
  );
  SDK.hookFunction(
    "ServerAppearanceLoadFromBundle",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      const ret = next(args);
      const [C] = args;
      if (C.IsPlayer() && Array.isArray(C.Appearance)) {
        let updated = false;
        const WCEOverrides = parseJSON(LZString.decompressFromUTF16(Player.ExtensionSettings.WCEOverrides));
        for (const [Group, Hide] of Object.entries(WCEOverrides?.Hide || {})) {
          const item = InventoryGet(C, Group);
          if (item && !Array.isArray(item.Property?.wceOverrideHide)) {
            item.Property ??= {};
            item.Property.wceOverrideHide = Hide;
            updated = true;
          }
        }
        if (updated) ChatRoomCharacterUpdate(C);
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "ChatRoomSyncMemberJoin",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const ret = next(args);
      if (Player.Appearance.some((a) => Array.isArray(a.Property?.wceOverrideHide))) ChatRoomCharacterUpdate(Player);
      return ret;
    }
  );
  SDK.hookFunction(
    "PreferenceExit",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const test = PreferenceSubscreen.name === "Main";
      const ret = next(args);
      if (test && Player.Appearance.some((a) => Array.isArray(a.Property?.wceOverrideHide))) ChatRoomCharacterUpdate(Player);
      return ret;
    }
  );
  const ignoredColorCopyableAssets = [
    "LeatherCrop",
    "LeatherWhip",
    "ShockCollarRemote",
    "SpankingToys",
    "VibratorRemote"
  ];
  const colorCopyableAssets = Asset.filter(
    (ass) => AssetGroup.filter((a) => a.Name.startsWith("Item") && !/\d$/u.test(a.Name) && a.Asset.find((b) => b.Name === ass.Name)).length > 1
  ).filter((v, i, a) => a.findIndex((as) => as.Name === v.Name) === i).map((a) => a.Name).filter((a) => !ignoredColorCopyableAssets.includes(a));
  function assetWorn(C, item) {
    return !!item && !!C.Appearance.find((a) => a === item);
  }
  SDK.hookFunction(
    "DialogMenuButtonBuild",
    HOOK_PRIORITIES.AddBehaviour,
    ([C], next) => {
      const ret = next([C]);
      if (isCharacter(C) && fbcSettings.copyColor && Player.CanInteract() && C?.FocusGroup?.Name && !InventoryGroupIsBlocked(C, C.FocusGroup.Name) && DialogMenuMode === "items") {
        const focusItem = InventoryGet(C, C.FocusGroup.Name);
        if (assetWorn(C, focusItem) && colorCopyableAssets.includes(focusItem.Asset.Name)) {
          DialogMenuButton.push("Paint");
        }
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "InterfaceTextGet",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (args[0] === "DialogMenuPaint") return displayText("[WCE] Copy colors to other items of same type");
      return next(args);
    }
  );
  SDK.hookFunction(
    "DialogMenuButtonClick",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const ret = next(args);
      if (!ret && !["colorExpression", "colorItem", "extended", "layering", "tighten"].includes(DialogMenuMode)) {
        const C = CharacterGetCurrent();
        const Item = C.FocusGroup ? InventoryGet(C, C.FocusGroup.Name) : null;
        for (let I = 0; I < DialogMenuButton.length; I++) {
          if (MouseIn(1885 - I * 110, 15, 90, 90)) {
            const button = DialogMenuButton[I];
            if (Item && button === "Paint") {
              copyColors(C, Item);
              return false;
            }
          }
        }
      }
      return ret;
    }
  );
  function copyColorTo(item, focusItem) {
    if (item.Asset.Name === focusItem.Asset.Name) {
      if (Array.isArray(focusItem.Color)) {
        if (Array.isArray(item.Color)) {
          for (let i = item.Color.length - 1; i >= 0; i--) {
            item.Color[i] = focusItem.Color[i % focusItem.Color.length];
          }
        } else {
          item.Color = focusItem.Color[focusItem.Color.length - 1];
        }
      } else if (Array.isArray(item.Color)) {
        for (let i = 0; i < item.Color.length; i++) {
          item.Color[i] = focusItem.Color ?? "Default";
        }
      } else {
        item.Color = deepCopy(focusItem.Color);
      }
    }
  }
  function copyColors(C, focusItem) {
    if (!fbcSettings.copyColor || !Player.CanInteract() || InventoryGroupIsBlocked(C, C.FocusGroup.Name) || !assetWorn(C, focusItem) || !colorCopyableAssets.includes(focusItem.Asset.Name)) return;
    for (const item of C.Appearance) {
      copyColorTo(item, focusItem);
    }
    if (CurrentScreen === "ChatRoom") {
      ChatRoomCharacterUpdate(C);
      fbcSendAction(
        displayText("$TargetName's $ItemName colors spread from their $ItemGroup", {
          $TargetName: CharacterNickname(C),
          $ItemName: focusItem.Asset.Description.toLowerCase(),
          $ItemGroup: focusItem.Asset.Group.Description.toLowerCase()
        })
      );
    } else {
      CharacterRefresh(C);
    }
  }
}

// src/functions/cacheClearer.ts
function cacheClearer() {
  const cacheClearInterval = 1 * 60 * 60 * 1e3;
  SDK.hookFunction(
    "ChatRoomMenuBuild",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const ret = next(args);
      if (fbcSettings.manualCacheClear) ChatRoomMenuButtons.splice(ChatRoomMenuButtons.indexOf("Cut"), 0, "clearCache");
      return ret;
    }
  );
  SDK.hookFunction(
    "ChatRoomMenuClick",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const ret = next(args);
      if (fbcSettings.manualCacheClear) {
        const Space = 992 / ChatRoomMenuButtons.length;
        for (let B = 0; B < ChatRoomMenuButtons.length; B++) {
          if (MouseXIn(1005 + Space * B, Space - 2) && ChatRoomMenuButtons[B] === "clearCache") {
            doClearCaches();
          }
        }
      }
      return ret;
    }
  );
  patchFunction(
    "ChatRoomMenuDraw",
    {
      'let suffix = "";': `let suffix = "";
        if (name === "clearCache") {
          DrawButton(1005 + Space * Number(idx), 2, Space - 2, 60, "", color, null, "[WCE] clear and reload the drawing cache of all characters");
          DrawImage("Icons/Small/Reset.png", 976 + Space * Number(idx) + Space / 2, 4);
          continue;
        }`
    },
    "manual clearing and reloading of drawing cache"
  );
  async function clearCaches() {
    const start = Date.now();
    const canClear = await waitFor(
      // Only clear when in chat room and not inspecting a character and BC window in focus
      () => CurrentScreen === "ChatRoom" && !CurrentCharacter && document.hasFocus(),
      () => Date.now() - start > cacheClearInterval
    );
    if (canClear && fbcSettings.automateCacheClear) doClearCaches();
  }
  globalThis.bceClearCaches = clearCaches;
  function doClearCaches() {
    debug("Clearing caches");
    if (GLDrawCanvas) {
      if (GLDrawCanvas.GL?.textureCache) {
        GLDrawCanvas.GL.textureCache.clear();
      }
      GLDrawResetCanvas();
    }
    debug("Clearing old characters from cache");
    const oldOnlineCharacters = Character.filter((c) => c.IsOnline?.() && !ChatRoomCharacter.some((cc) => cc.MemberNumber === c.MemberNumber));
    oldOnlineCharacters.forEach((c) => CharacterDelete(c));
    Character.filter((c) => c.IsOnline?.()).forEach((c) => CharacterRefresh(c, false, false));
  }
  createTimer(() => {
    if (fbcSettings.automateCacheClear) {
      clearCaches();
    }
  }, cacheClearInterval);
}

// src/functions/chatRoomOverlay.ts
function chatRoomOverlay() {
  SDK.hookFunction(
    "ChatRoomDrawCharacterStatusIcons",
    HOOK_PRIORITIES.AddBehaviour,
    ([C, CharX, CharY, Zoom], next) => {
      const ret = next([C, CharX, CharY, Zoom]);
      if (isCharacter(C) && typeof CharX === "number" && typeof CharY === "number" && typeof Zoom === "number" && C.FBC && ChatRoomHideIconState === 0) {
        const text = ["1", "2", "3", "4", "5"].includes(C.FBC.split(".")[0]) ? "FBC" : "WCE";
        DrawTextFit(
          text,
          CharX + 290 * Zoom,
          CharY + 14 * Zoom,
          60 * Zoom,
          C.FBCNoteExists ? "Cyan" : "White",
          "Black"
        );
        DrawTextFit(
          /^\d+\.\d+(\.\d+)?b?$/u.test(C.FBC) ? C.FBC.replace("b", "") : "",
          CharX + 290 * Zoom,
          CharY + 36 * Zoom,
          C.FBC.split(".").length === 3 ? 60 * Zoom : 40 * Zoom,
          C.FBC.endsWith("b") ? "Lightpink" : "White",
          "Black"
        );
      }
      return ret;
    }
  );
}

// src/functions/privateWardrobe.js
async function privateWardrobe() {
  await waitFor(() => !!Player);
  let inCustomWardrobe = false, targetCharacter = null;
  let appearanceBackup = null;
  let excludeBodyparts = false;
  function currentWardrobeTargetIsPlayer() {
    return inCustomWardrobe && targetCharacter?.IsPlayer() || CharacterAppearanceSelection?.IsPlayer();
  }
  patchFunction(
    "DrawProcess",
    { 'CurrentScreen !== "Crafting"': 'CurrentScreen !== "Crafting" && CurrentScreen !== "Wardrobe"' },
    "Full wardrobe may display blur and blindness effects of the background"
  );
  patchFunction(
    "DrawCharacter",
    { '|| CurrentScreen === "Crafting"': '|| CurrentScreen === "Crafting" || CurrentScreen === "Wardrobe"' },
    "Full wardrobe may display blur and blindness effects of the outfits"
  );
  SDK.hookFunction(
    "CharacterAppearanceWardrobeLoad",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      const [C] = args;
      if (fbcSettings.privateWardrobe && CurrentScreen === "Appearance") {
        inCustomWardrobe = true;
        targetCharacter = isCharacter(C) ? C : CharacterGetCurrent();
        CommonSetScreen("Character", "Wardrobe");
        return null;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "AppearanceLoad",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const ret = next(args);
      if (inCustomWardrobe) {
        CharacterAppearanceBackup = appearanceBackup;
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "AppearanceRun",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (CharacterAppearanceMode === "Wardrobe" && currentWardrobeTargetIsPlayer()) {
        DrawCheckbox(1300, 350, 64, 64, "", excludeBodyparts, false, "white");
        drawTextFitLeft(displayText("Load without body parts"), 1374, 380, 630, "white");
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "AppearanceClick",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (CharacterAppearanceMode === "Wardrobe" && MouseIn(1300, 350, 64, 64) && currentWardrobeTargetIsPlayer()) {
        excludeBodyparts = !excludeBodyparts;
        return null;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "WardrobeLoad",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      appearanceBackup = CharacterAppearanceBackup;
      return next(args);
    }
  );
  SDK.hookFunction(
    "WardrobeRun",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const playerBackup = Player;
      if (inCustomWardrobe) {
        Player = targetCharacter;
      }
      const ret = next(args);
      if (inCustomWardrobe) {
        Player = playerBackup;
      }
      DrawText(`Page: ${(WardrobeOffset / 12 | 0) + 1}/${WardrobeSize / 12}`, 300, 35, "White");
      DrawCheckbox(10, 74, 64, 64, "", excludeBodyparts, false, "white");
      drawTextFitLeft(displayText("Exclude body parts"), 84, 106, 300, "white");
      return ret;
    }
  );
  SDK.hookFunction(
    "WardrobeClick",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (MouseIn(10, 74, 64, 64)) {
        excludeBodyparts = !excludeBodyparts;
        return null;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "WardrobeExit",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      if (!inCustomWardrobe) {
        return next(args);
      }
      CommonSetScreen("Character", "Appearance");
      inCustomWardrobe = false;
      return null;
    }
  );
  SDK.hookFunction(
    "WardrobeFastLoad",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      let [C] = args;
      const base = C.Appearance.filter((a) => a.Asset.Group.IsDefault && !a.Asset.Group.Clothing);
      if (inCustomWardrobe && isCharacter(C) && C.IsPlayer()) {
        if (!targetCharacter) {
          throw new Error("targetCharacter is not defined in WardrobeFastLoad");
        }
        args[0] = targetCharacter;
        C = targetCharacter;
        args[2] = false;
      }
      const ret = next(args);
      if (excludeBodyparts) {
        C.Appearance = [...base, ...C.Appearance.filter((a) => !a.Asset.Group.IsDefault || a.Asset.Group.Clothing)];
        CharacterLoadCanvas(C);
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "WardrobeFastSave",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      const [C] = args;
      if (inCustomWardrobe && isCharacter(C) && C.IsPlayer()) {
        if (!targetCharacter) {
          throw new Error("targetCharacter is not defined in WardrobeFastSave");
        }
        args[0] = targetCharacter;
      }
      if (fbcSettings.confirmWardrobeSave && Player.Wardrobe?.length > args[1] && Player.Wardrobe[args[1]]?.some((a) => a.Group === "Pronouns")) {
        if (!window.confirm("Do you really want to override this wardrobe outfit?")) {
          return null;
        }
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "ServerPlayerIsInChatRoom",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => inCustomWardrobe && CharacterAppearanceReturnRoom === "ChatRoom" || next(args)
  );
  function keyHandler(e) {
    if (!fbcSettings.privateWardrobe) {
      return;
    }
    if (e.key === "Escape" && inCustomWardrobe) {
      WardrobeExit();
      e.stopPropagation();
      e.preventDefault();
    }
  }
  document.addEventListener("keydown", keyHandler, true);
  document.addEventListener("keypress", keyHandler, true);
}

// src/util/expressions.ts
var ArousalExpressionStages = {
  Blush: [
    { Expression: "High", Limit: 100 },
    { Expression: "Medium", Limit: 60 },
    { Expression: "Low", Limit: 10 },
    { Expression: null, Limit: 0 }
  ],
  Eyebrows: [
    { Expression: "Soft", Limit: 80 },
    { Expression: "Lowered", Limit: 50 },
    { Expression: "Raised", Limit: 20 },
    { Expression: null, Limit: 0 }
  ],
  Fluids: [
    { Expression: "DroolMedium", Limit: 100 },
    { Expression: "DroolLow", Limit: 40 },
    { Expression: null, Limit: 0 }
  ],
  Eyes: [
    { Expression: "Closed", Limit: 100 },
    { Expression: "Surprised", Limit: 90 },
    { Expression: "Horny", Limit: 70 },
    { Expression: "Dazed", Limit: 20 },
    { Expression: null, Limit: 0 }
  ],
  Eyes2: [
    { Expression: "Closed", Limit: 100 },
    { Expression: "Surprised", Limit: 90 },
    { Expression: "Horny", Limit: 70 },
    { Expression: "Dazed", Limit: 20 },
    { Expression: null, Limit: 0 }
  ],
  // Pussy group includes Penis, which is the only type of "pussy" with expressions and controls erections.
  Pussy: [{ Expression: "Hard", Limit: 50 }, { Expression: null, Limit: 0 }]
};
var EventExpressions = {
  PostOrgasm: {
    Type: "PostOrgasm",
    Duration: 2e4,
    Priority: 1e4,
    Expression: {
      Blush: [
        { Expression: "Extreme", Duration: 5e3 },
        { ExpressionModifier: -1, Duration: 5e3 },
        { ExpressionModifier: -1, Duration: 5e3, Priority: 1e3 },
        { ExpressionModifier: -1, Duration: 5e3, Priority: 200 }
      ],
      Eyes: [
        { Expression: "Closed", Duration: 8500 },
        { Expression: "Heart", Duration: 7500 },
        { Expression: "Sad", Duration: 4e3, Priority: 200 }
      ],
      Eyes2: [
        { Expression: "Closed", Duration: 8e3 },
        { Expression: "Heart", Duration: 8e3 },
        { Expression: "Sad", Duration: 4e3, Priority: 200 }
      ],
      Mouth: [
        { Expression: "Ahegao", Duration: 5e3 },
        { Expression: "Moan", Duration: 5e3 },
        { Expression: "HalfOpen", Duration: 1e4, Priority: 200 }
      ],
      Fluids: [
        { Expression: "DroolMessy", Duration: 5e3 },
        { Expression: "DroolSides", Duration: 9e3, Priority: 400 },
        { Expression: "DroolLow", Duration: 6e3, Priority: 200 }
      ],
      Eyebrows: [
        { Expression: "Soft", Duration: 1e4 },
        { Expression: "Lowered", Duration: 5e3, Priority: 200 },
        { Expression: null, Duration: 5e3, Priority: 1 }
      ]
    }
  },
  Pout: {
    Type: "Pout",
    Duration: -1,
    Expression: {
      Mouth: [{ Expression: "Pout", Duration: -1 }],
      Eyes: [{ Expression: "Dazed", Duration: -1 }],
      Eyes2: [{ Expression: "Dazed", Duration: -1 }],
      Eyebrows: [{ Expression: "Harsh", Duration: -1 }]
    }
  },
  ResetBrows: { Type: "ResetBrows", Duration: -1, Expression: { Eyebrows: [{ Expression: null, Duration: -1 }] } },
  RaiseBrows: { Type: "RaiseBrows", Duration: -1, Expression: { Eyebrows: [{ Expression: "Raised", Duration: -1 }] } },
  Confused: { Type: "Confused", Duration: -1, Expression: { Eyebrows: [{ Expression: "OneRaised", Duration: -1 }] } },
  Smirk: { Type: "Smirk", Duration: -1, Expression: { Mouth: [{ Expression: "Smirk", Duration: -1 }] } },
  Wink: { Type: "Wink", Duration: 1500, Expression: { Eyes: [{ Expression: "Closed", Duration: 1500 }] } },
  Laugh: {
    Type: "Laugh",
    Duration: 8e3,
    Expression: {
      Mouth: [
        { Expression: "Laughing", Duration: 1e3 },
        { Expression: "Grin", Duration: 200 },
        { Expression: "Laughing", Duration: 1e3 },
        { Expression: "Happy", Duration: 200 },
        { Expression: "Laughing", Duration: 800 },
        { Expression: "Grin", Duration: 400 },
        { Expression: "Laughing", Duration: 800 },
        { Expression: "Happy", Duration: 400 },
        { Expression: "Laughing", Duration: 600 },
        { Expression: "Grin", Duration: 600 },
        { Expression: "Laughing", Duration: 600 },
        { Expression: "Happy", Duration: 600 },
        { Expression: "Laughing", Duration: 200 },
        { Expression: "Grin", Duration: 200 },
        { Expression: "Laughing", Duration: 200 },
        { Expression: "Happy", Duration: 200 }
      ]
    }
  },
  Giggle: {
    Type: "Giggle",
    Duration: 4e3,
    Expression: {
      Mouth: [
        { Expression: "Laughing", Duration: 800 },
        { Expression: "Grin", Duration: 200 },
        { Expression: "Laughing", Duration: 700 },
        { Expression: "Happy", Duration: 200 },
        { Expression: "Laughing", Duration: 600 },
        { Expression: "Grin", Duration: 200 },
        { Expression: "Laughing", Duration: 500 },
        { Expression: "Grin", Duration: 200 },
        { Expression: "Laughing", Duration: 400 },
        { Expression: "Happy", Duration: 200 }
      ]
    }
  },
  Chuckle: { Type: "Chuckle", Duration: 4e3, Expression: { Mouth: [{ Expression: "Grin", Duration: 4e3 }] } },
  Smile: { Type: "Smile", Duration: -1, Expression: { Mouth: [{ Expression: "Grin", Duration: -1 }] } },
  Blink: {
    Type: "Blink",
    Duration: 200,
    Expression: { Eyes: [{ Expression: "Closed", Duration: 200 }], Eyes2: [{ Expression: "Closed", Duration: 200 }] }
  },
  Grin: {
    Type: "Grin",
    Duration: -1,
    Expression: {
      Eyes: [{ Expression: "Horny", Duration: -1 }],
      Eyes2: [{ Expression: "Horny", Duration: -1 }],
      Mouth: [{ Expression: "Grin", Duration: -1 }]
    }
  },
  Cuddle: {
    Type: "Cuddle",
    Duration: 1e4,
    Priority: 150,
    Expression: {
      Mouth: [{ Expression: "Happy", Duration: 1e4 }],
      Eyes: [{ Expression: "ShylyHappy", Duration: 1e4 }],
      Eyes2: [{ Expression: "ShylyHappy", Duration: 1e4 }],
      Eyebrows: [{ Expression: "Raised", Duration: 1e4 }]
    }
  },
  Blush: { Type: "Blush", Duration: 1e4, Expression: { Blush: [{ ExpressionModifier: 1, Duration: 1e4 }] } },
  Choke: {
    Type: "Choke",
    Duration: 4e3,
    Priority: 150,
    Expression: {
      Blush: [{ ExpressionModifier: 3, Duration: 4e3 }],
      Eyes: [{ Expression: "VeryLewd", Duration: 3e3 }, { Expression: "Sad", Duration: 1e3 }],
      Eyes2: [{ Expression: "VeryLewd", Duration: 3e3 }, { Expression: "Sad", Duration: 1e3 }],
      Eyebrows: [{ Expression: "Harsh", Duration: 4e3 }]
    }
  },
  Stimulated: {
    Type: "Stimulated",
    Duration: 5e3,
    Priority: 400,
    Expression: {
      Blush: [{ ExpressionModifier: 2, Duration: 5e3 }],
      Eyes: [{ Expression: "VeryLewd", Duration: 4e3 }, { Expression: "Sad", Duration: 1e3 }],
      Eyes2: [{ Expression: "VeryLewd", Duration: 4e3 }, { Expression: "Sad", Duration: 1e3 }],
      Eyebrows: [{ Expression: "Soft", Duration: 5e3 }]
    }
  },
  StimulatedLong: { Type: "StimulatedLong", Duration: 2e4, Priority: 400, Expression: { Blush: [{ ExpressionModifier: 1, Duration: 2e4 }] } },
  Shock: {
    Type: "Shock",
    Duration: 15e3,
    Priority: 1e3,
    Expression: {
      Blush: [
        { ExpressionModifier: 5, Duration: 1e4 },
        { ExpressionModifier: -1, Duration: 2e3 },
        { ExpressionModifier: -1, Duration: 2e3 },
        { ExpressionModifier: -1, Duration: 1e3 }
      ],
      Eyes: [{ Expression: "Dizzy", Duration: 1e3 }, { Expression: "Scared", Duration: 8e3 }, { Expression: "Surprised", Duration: 7e3 }],
      Eyes2: [{ Expression: "Dizzy", Duration: 1e3 }, { Expression: "Scared", Duration: 8e3 }, { Expression: "Surprised", Duration: 7e3 }],
      Eyebrows: [{ Expression: "Soft", Duration: 15e3 }],
      Mouth: [{ Expression: "Pained", Duration: 1e4 }, { Expression: "Angry", Duration: 5e3 }]
    }
  },
  ShockLight: {
    Type: "ShockLight",
    Duration: 5e3,
    Priority: 900,
    Expression: {
      Blush: [{ ExpressionModifier: 2, Duration: 5e3 }],
      Eyes: [{ Expression: "Dizzy", Duration: 2e3 }, { Expression: "Surprised", Duration: 3e3 }],
      Eyes2: [{ Expression: "Dizzy", Duration: 2e3 }, { Expression: "Surprised", Duration: 3e3 }],
      Eyebrows: [{ Expression: "Soft", Duration: 5e3 }],
      Mouth: [{ Expression: "Angry", Duration: 5e3 }]
    }
  },
  Hit: {
    Type: "Hit",
    Duration: 7e3,
    Priority: 500,
    Expression: {
      Blush: [{ Expression: "VeryHigh", Duration: 7e3 }],
      Eyes: [{ Expression: "Daydream", Duration: 1e3 }, { Expression: "Closed", Duration: 3e3 }, { Expression: "Daydream", Duration: 3e3 }],
      Eyes2: [{ Expression: "Daydream", Duration: 1e3 }, { Expression: "Closed", Duration: 3e3 }, { Expression: "Daydream", Duration: 3e3 }],
      Eyebrows: [{ Expression: "Soft", Duration: 7e3 }]
    }
  },
  Spank: {
    Type: "Spank",
    Duration: 3e3,
    Priority: 300,
    Expression: {
      Eyes: [{ Expression: "Lewd", Duration: 3e3 }],
      Eyes2: [{ Expression: "Lewd", Duration: 3e3 }],
      Eyebrows: [{ Expression: "Soft", Duration: 3e3 }]
    }
  },
  Kiss: { Type: "Kiss", Duration: 2e3, Priority: 200, Expression: { Mouth: [{ Expression: "HalfOpen", Duration: 2e3 }] } },
  KissOnLips: {
    Type: "KissOnLips",
    Duration: 2e3,
    Priority: 200,
    Expression: {
      Eyes: [{ Expression: "Closed", Duration: 2e3 }],
      Eyes2: [{ Expression: "Closed", Duration: 2e3 }],
      Mouth: [{ Expression: "HalfOpen", Duration: 2e3 }],
      Blush: [{ Skip: true, Duration: 1e3 }, { ExpressionModifier: 1, Duration: 1e3 }]
    }
  },
  LongKiss: {
    Type: "LongKiss",
    Duration: 4e3,
    Priority: 200,
    Expression: {
      Eyes: [{ Expression: "Closed", Duration: 4e3 }],
      Eyes2: [{ Expression: "Closed", Duration: 4e3 }],
      Mouth: [{ Expression: "Open", Duration: 4e3 }],
      Blush: [{ Skip: true, Duration: 1e3 }, { ExpressionModifier: 1, Duration: 1e3 }, { ExpressionModifier: 1, Duration: 2e3 }]
    }
  },
  Disoriented: {
    Type: "Disoriented",
    Duration: 8e3,
    Priority: 250,
    Expression: {
      Eyes: [{ Expression: "Dizzy", Duration: 8e3 }],
      Eyes2: [{ Expression: "Dizzy", Duration: 8e3 }],
      Eyebrows: [{ Expression: "Raised", Duration: 8e3 }],
      Blush: [{ ExpressionModifier: 2, Duration: 8e3 }]
    }
  },
  Angry: {
    Type: "Angry",
    Duration: -1,
    Expression: {
      Mouth: [{ Expression: "Angry", Duration: -1 }],
      Eyes: [{ Expression: "Angry", Duration: -1 }],
      Eyes2: [{ Expression: "Angry", Duration: -1 }],
      Eyebrows: [{ Expression: "Angry", Duration: -1 }]
    }
  },
  Sad: {
    Type: "Sad",
    Duration: -1,
    Expression: {
      Mouth: [{ Expression: "Frown", Duration: -1 }],
      Eyes: [{ Expression: "Shy", Duration: -1 }],
      Eyes2: [{ Expression: "Shy", Duration: -1 }],
      Eyebrows: [{ Expression: "Soft", Duration: -1 }]
    }
  },
  Worried: {
    Type: "Worried",
    Duration: -1,
    Expression: {
      Eyes: [{ Expression: "Surprised", Duration: -1 }],
      Eyes2: [{ Expression: "Surprised", Duration: -1 }],
      Eyebrows: [{ Expression: "Soft", Duration: -1 }]
    }
  },
  Distressed: {
    Type: "Distressed",
    Duration: -1,
    Expression: {
      Eyes: [{ Expression: "Scared", Duration: -1 }],
      Eyes2: [{ Expression: "Scared", Duration: -1 }],
      Eyebrows: [{ Expression: "Soft", Duration: -1 }],
      Mouth: [{ Expression: "Angry", Duration: -1 }]
    }
  },
  Reset: {
    Type: "Reset",
    Duration: -1,
    Expression: {
      Mouth: [{ Expression: null, Duration: -1 }],
      Eyes: [{ Expression: null, Duration: -1 }],
      Eyes2: [{ Expression: null, Duration: -1 }],
      Eyebrows: [{ Expression: null, Duration: -1 }],
      Blush: [{ Expression: null, Duration: -1 }],
      Fluids: [{ Expression: null, Duration: -1 }]
    }
  },
  Cry: { Type: "Cry", Duration: -1, Expression: { Fluids: [{ Expression: "TearsMedium", Duration: -1 }] } },
  DroolReset: { Type: "DroolReset", Duration: -1, Expression: { Fluids: [{ Expression: null, Duration: -1 }] } },
  DroolSides: { Type: "DroolSides", Duration: -1, Expression: { Fluids: [{ Expression: "DroolSides", Duration: -1 }] } },
  BareTeeth: { Type: "BareTeeth", Duration: -1, Expression: { Mouth: [{ Expression: "Angry", Duration: -1 }] } },
  Happy: { Type: "Happy", Duration: -1, Expression: { Mouth: [{ Expression: "Happy", Duration: -1 }] } },
  Frown: { Type: "Frown", Duration: -1, Expression: { Mouth: [{ Expression: "Frown", Duration: -1 }] } },
  Glare: {
    Type: "Glare",
    Duration: -1,
    Expression: {
      Eyes: [{ Expression: "Angry", Duration: -1 }],
      Eyes2: [{ Expression: "Angry", Duration: -1 }],
      Eyebrows: [{ Expression: "Harsh", Duration: -1 }]
    }
  },
  NarrowEyes: {
    Type: "NarrowEyes",
    Duration: -1,
    Expression: { Eyes: [{ Expression: "Horny", Duration: -1 }], Eyes2: [{ Expression: "Horny", Duration: -1 }] }
  },
  OpenEyes: {
    Type: "OpenEyes",
    Duration: -1,
    Expression: { Eyes: [{ Expression: null, Duration: -1 }], Eyes2: [{ Expression: null, Duration: -1 }] }
  },
  CloseEyes: {
    Type: "CloseEyes",
    Duration: -1,
    Expression: { Eyes: [{ Expression: "Closed", Duration: -1 }], Eyes2: [{ Expression: "Closed", Duration: -1 }] }
  },
  CloseMouth: { Type: "CloseMouth", Duration: -1, Expression: { Mouth: [{ Expression: null, Duration: -1 }] } },
  OpenMouth: { Type: "OpenMouth", Duration: -1, Expression: { Mouth: [{ Expression: "Moan", Duration: -1 }] } },
  LipBite: { Type: "LipBite", Duration: -1, Expression: { Mouth: [{ Expression: "LipBite", Duration: -1 }] } },
  Lick: {
    Type: "Lick",
    Duration: 4e3,
    Priority: 200,
    Expression: { Mouth: [{ Expression: "Ahegao", Duration: 4e3 }], Blush: [{ ExpressionModifier: 1, Duration: 4e3 }] }
  },
  GagInflate: {
    Type: "GagInflate",
    Duration: 4e3,
    Priority: 400,
    Expression: {
      Eyes: [{ Expression: "Lewd", Duration: 4e3 }],
      Eyes2: [{ Expression: "Lewd", Duration: 4e3 }],
      Blush: [{ ExpressionModifier: 2, Duration: 2e3 }, { ExpressionModifier: -1, Duration: 2e3 }]
    }
  },
  Iced: {
    Type: "Iced",
    Duration: 4e3,
    Priority: 500,
    Expression: {
      Eyes: [{ Expression: "Surprised", Duration: 3e3 }, { Expression: null, Duration: 1e3 }],
      Eyes2: [{ Expression: "Surprised", Duration: 3e3 }, { Expression: null, Duration: 1e3 }],
      Mouth: [{ Expression: "Angry", Duration: 4e3 }]
    }
  },
  AllFours: { Type: "AllFours", Duration: -1, Poses: [{ Pose: ["AllFours"], Duration: -1 }] },
  SpreadKnees: { Type: "SpreadKnees", Duration: -1, Poses: [{ Pose: ["KneelingSpread"], Duration: -1 }] },
  Hogtied: { Type: "Hogtied", Duration: -1, Poses: [{ Pose: ["Hogtied"], Duration: -1 }] },
  Handstand: { Type: "Handstand", Duration: -1, Poses: [{ Pose: ["Suspension", "OverTheHead"], Duration: -1 }] },
  Stretch: {
    Type: "Stretch",
    Priority: 100,
    Duration: 6e3,
    Poses: [
      { Pose: ["OverTheHead"], Duration: 1e3 },
      { Pose: ["Yoked"], Duration: 1e3 },
      { Pose: ["BaseUpper"], Duration: 1e3 },
      { Pose: ["Spread"], Duration: 1e3 },
      { Pose: ["LegsClosed"], Duration: 1e3 },
      { Pose: ["BaseLower"], Duration: 1e3 }
    ]
  },
  SpreadLegs: { Type: "SpreadLegs", Duration: -1, Poses: [{ Pose: ["Spread"], Duration: -1 }] },
  JumpingJacks: {
    Type: "JumpingJacks",
    Priority: 100,
    Duration: 8e3,
    Poses: [
      { Pose: ["OverTheHead", "Spread"], Duration: 1e3 },
      { Pose: ["BaseUpper", "LegsClosed"], Duration: 1e3 },
      { Pose: ["OverTheHead", "Spread"], Duration: 1e3 },
      { Pose: ["BaseUpper", "LegsClosed"], Duration: 1e3 },
      { Pose: ["OverTheHead", "Spread"], Duration: 1e3 },
      { Pose: ["BaseUpper", "LegsClosed"], Duration: 1e3 },
      { Pose: ["OverTheHead", "Spread"], Duration: 1e3 },
      { Pose: ["BaseUpper", "LegsClosed"], Duration: 1e3 }
    ]
  }
};
var ActivityTriggers = [
  { Event: "Blush", Type: "Activity", Matchers: [{ Tester: /^ChatOther-ItemMouth-PoliteKiss$/u }] },
  { Event: "Stretch", Type: "Emote", Matchers: [{ Tester: /^stretches (her|his|their) whole body/u }] },
  { Event: "JumpingJacks", Type: "Emote", Matchers: [{ Tester: /^does jumping[ -]?jacks/u }] },
  { Event: "AllFours", Type: "Emote", Matchers: [{ Tester: /^(gets on all fours|starts crawling)/u }] },
  { Event: "SpreadKnees", Type: "Emote", Matchers: [{ Tester: /^spreads(( (her|his|their) legs)? on)? (her|his|their) knees/u }] },
  { Event: "SpreadLegs", Type: "Emote", Matchers: [{ Tester: /^spreads (her|his|their) legs apart/u }] },
  { Event: "Handstand", Type: "Emote", Matchers: [{ Tester: /^(does a handstand|stands on (her|his|their) hands)/u }] },
  { Event: "Hogtied", Type: "Emote", Matchers: [{ Tester: /^lies( down)? on (the floor|(her|his|their) (tummy|stomach))/u }] },
  { Event: "Blush", Type: "Emote", Matchers: [{ Tester: /^blushes/u }] },
  { Event: "Chuckle", Type: "Emote", Matchers: [{ Tester: /^chuckles/u }] },
  { Event: "Laugh", Type: "Emote", Matchers: [{ Tester: /^laughs/u }] },
  { Event: "Giggle", Type: "Emote", Matchers: [{ Tester: /^giggles/u }] },
  { Event: "Smirk", Type: "Emote", Matchers: [{ Tester: /^(smirk(s|ing)|.*with a smirk)/u }] },
  { Event: "Wink", Type: "Emote", Matchers: [{ Tester: /^winks/u }] },
  { Event: "Pout", Type: "Emote", Matchers: [{ Tester: /^pouts/u }] },
  { Event: "Blink", Type: "Emote", Matchers: [{ Tester: /^blinks/u }] },
  { Event: "Frown", Type: "Emote", Matchers: [{ Tester: /^frowns/u }] },
  { Event: "Grin", Type: "Emote", Matchers: [{ Tester: /^(grins|is grinning)/u }] },
  { Event: "Confused", Type: "Emote", Matchers: [{ Tester: /^((seems|looks) (confused|curious|suspicious)|raises an eyebrow)/u }] },
  { Event: "CloseMouth", Type: "Emote", Matchers: [{ Tester: /^closes (her|his|their) mouth/u }] },
  { Event: "OpenMouth", Type: "Emote", Matchers: [{ Tester: /^opens (her|his|their) mouth/u }] },
  { Event: "Happy", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets|smiles) happ(il)?y/u }] },
  { Event: "Smile", Type: "Emote", Matchers: [{ Tester: /^smiles/u }] },
  { Event: "Distressed", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets) distressed/u }] },
  { Event: "Sad", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets) sad/u }] },
  { Event: "Worried", Type: "Emote", Matchers: [{ Tester: /^(looks|seems|is|gets) (worried|surprised)/u }] },
  { Event: "BareTeeth", Type: "Emote", Matchers: [{ Tester: /^(bares (her|his|their) teeth|snarls)/u }] },
  { Event: "Angry", Type: "Emote", Matchers: [{ Tester: /^(looks angr(il)?y|(gets|is|seems) angry)/u }] },
  { Event: "Glare", Type: "Emote", Matchers: [{ Tester: /^(glares|looks harshly|gives a (glare|harsh look))/u }] },
  { Event: "OpenEyes", Type: "Emote", Matchers: [{ Tester: /^opens (her|his|their) eyes/u }] },
  { Event: "NarrowEyes", Type: "Emote", Matchers: [{ Tester: /^((squints|narrows) (her|his|their) eyes|narrowly opens (her|his|their) eyes)/u }] },
  { Event: "CloseEyes", Type: "Emote", Matchers: [{ Tester: /^closes (her|his|their) eyes/u }] },
  { Event: "ResetBrows", Type: "Emote", Matchers: [{ Tester: /^lowers (her|his|their) eyebrows/u }] },
  { Event: "RaiseBrows", Type: "Emote", Matchers: [{ Tester: /^raises (her|his|their) eyebrows/u }] },
  { Event: "DroolSides", Type: "Emote", Matchers: [{ Tester: /^drools/u }] },
  { Event: "Cry", Type: "Emote", Matchers: [{ Tester: /^(starts to cry|sheds .* tears?|eyes( start( to)?)? leak)/u }] },
  { Event: "Reset", Type: "Emote", Matchers: [{ Tester: /^'s (expression|face) returns to normal/u }] },
  {
    Event: "Shock",
    Type: "Action",
    Matchers: [
      {
        Tester: /^(ActionActivityShockItem|FuturisticVibratorShockTrigger|FuturisticChastityBeltShock\w+|(TriggerShock|(ShockCollar|Collar(Auto)?ShockUnit|(LoveChastityBelt|SciFiPleasurePanties)Shock)Trigger)(1|2))$/u,
        Criteria: { TargetIsPlayer: true }
      }
    ]
  },
  {
    Event: "ShockLight",
    Type: "Action",
    Matchers: [
      {
        Tester: /^(TriggerShock|(ShockCollar|Collar(Auto)?ShockUnit|(LoveChastityBelt|SciFiPleasurePanties)Shock)Trigger)0$/u,
        Criteria: { TargetIsPlayer: true }
      }
    ]
  },
  { Event: "Hit", Type: "Action", Matchers: [{ Tester: /^ActionActivitySpankItem$/u, Criteria: { TargetIsPlayer: true } }] },
  {
    Event: "Spank",
    Type: "Activity",
    Matchers: [
      { Tester: /^ChatOther-ItemButt-Spank$/u, Criteria: { TargetIsPlayer: true } },
      { Tester: /^ChatSelf-ItemButt-Spank$/u }
    ]
  },
  { Event: "Cuddle", Type: "Activity", Matchers: [{ Tester: /^ChatOther-.*-Cuddle$/u }, { Tester: /^ChatSelf-.*-Cuddle$/u }] },
  { Event: "Stimulated", Type: "Action", Matchers: [{ Tester: /^ActionActivityMasturbateItem$/u, Criteria: { TargetIsPlayer: true } }] },
  {
    Event: "StimulatedLong",
    Type: "Activity",
    Matchers: [
      { Tester: /^ChatOther-.*-(Masturbate|Penetrate).*$/u, Criteria: { TargetIsPlayer: true } },
      { Tester: /^ChatSelf-.*-(Masturbate|Penetrate).*$/u }
    ]
  },
  { Event: "KissOnLips", Type: "Activity", Matchers: [{ Tester: /^ChatOther-ItemMouth-Kiss$/u }] },
  { Event: "Kiss", Type: "Activity", Matchers: [{ Tester: /^ChatOther-.*-Kiss$/u, Criteria: { SenderIsPlayer: true } }] },
  { Event: "Disoriented", Type: "Action", Matchers: [{ Tester: /^(KneelDown|StandUp)Fail$/u }] },
  { Event: "LipBite", Type: "Activity", Matchers: [{ Tester: /^ChatSelf-ItemMouth-Bite$/u }] },
  { Event: "Lick", Type: "Activity", Matchers: [{ Tester: /^ChatOther-.*-(Lick|MasturbateTongue)$/u, Criteria: { SenderIsPlayer: true } }] },
  {
    Event: "DroolReset",
    Type: "Activity",
    Matchers: [{ Tester: /^ChatOther-ItemMouth-Caress$/u, Criteria: { TargetIsPlayer: true } }, { Tester: /^ChatSelf-ItemMouth-Caress$/u }]
  },
  { Event: "LongKiss", Type: "Activity", Matchers: [{ Tester: /^ChatOther-ItemMouth-FrenchKiss$/u }] }
];

// src/functions/automaticExpressions.js
async function automaticExpressions() {
  await waitFor(() => CurrentScreen === "ChatRoom" && !!Player.ArousalSettings);
  if (!Player.ArousalSettings) {
    throw new Error("Player.ArousalSettings is not defined");
  }
  patchFunction(
    "StruggleMinigameHandleExpression",
    { '");': '", 3);' },
    "Resetting blush, eyes, and eyebrows after struggling"
  );
  function animationEngineEnabled() {
    return !!fbcSettings.animationEngine;
  }
  globalThis.bceAnimationEngineEnabled = animationEngineEnabled;
  SDK.hookFunction(
    "StruggleMinigameStop",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (fbcSettings.animationEngine) {
        StruggleExpressionStore = void 0;
        resetExpressionQueue([GAME_TIMED_EVENT_TYPE], [MANUAL_OVERRIDE_EVENT_TYPE]);
      }
      return next(args);
    }
  );
  if (!globalThis.bce_ArousalExpressionStages) {
    globalThis.bce_ArousalExpressionStages = ArousalExpressionStages;
  }
  const bceExpressionModifierMap = Object.freeze({ Blush: [null, "Low", "Medium", "High", "VeryHigh", "Extreme"] });
  const AUTOMATED_AROUSAL_EVENT_TYPE = "AutomatedByArousal", DEFAULT_EVENT_TYPE = "DEFAULT", GAME_TIMED_EVENT_TYPE = "GameTimer", MANUAL_OVERRIDE_EVENT_TYPE = "ManualOverride", POST_ORGASM_EVENT_TYPE = "PostOrgasm";
  const bceExpressionsQueue = [];
  let lastUniqueId = 0;
  function newUniqueId() {
    lastUniqueId = (lastUniqueId + 1) % (Number.MAX_SAFE_INTEGER - 1);
    return lastUniqueId;
  }
  const manualComponents = {};
  function pushEvent(evt) {
    if (!evt) {
      return;
    }
    switch (evt.Type) {
      case AUTOMATED_AROUSAL_EVENT_TYPE:
      case POST_ORGASM_EVENT_TYPE:
        if (!fbcSettings.expressions) {
          return;
        }
        break;
      case MANUAL_OVERRIDE_EVENT_TYPE:
        break;
      default:
        if (!fbcSettings.activityExpressions) {
          return;
        }
    }
    const time = Date.now();
    const event = deepCopy(evt);
    event.At = time;
    event.Until = time + event.Duration;
    event.Id = newUniqueId();
    if (typeof event.Priority !== "number") {
      event.Priority = 1;
    }
    if (event.Expression) {
      for (const t of Object.values(event.Expression)) {
        for (const exp of t) {
          exp.Id = newUniqueId();
          if (typeof exp.Priority !== "number") {
            exp.Priority = 1;
          }
          if (typeof exp.Duration !== "number") {
            exp.Duration = event.Duration;
          }
        }
      }
    }
    if (event.Poses) {
      for (const p of event.Poses) {
        p.Id = newUniqueId();
        if (typeof p.Priority !== "number") {
          p.Priority = 1;
        }
      }
    }
    bceExpressionsQueue.push(event);
  }
  globalThis.fbcPushEvent = pushEvent;
  if (!globalThis.bce_EventExpressions) {
    globalThis.bce_EventExpressions = EventExpressions;
  }
  if (!globalThis.bce_ActivityTriggers) {
    globalThis.bce_ActivityTriggers = ActivityTriggers;
  }
  function dictHasPlayerTarget(dict) {
    return dict?.some((t) => t && "TargetCharacter" in t && t.TargetCharacter === Player.MemberNumber) || false;
  }
  registerSocketListener("ChatRoomMessage", (data) => {
    activityTriggers: for (const trigger of globalThis.bce_ActivityTriggers.filter((t) => t.Type === data.Type)) {
      if (Player.GhostList.includes(data.Sender)) break;
      for (const matcher of trigger.Matchers) {
        if (matcher.Tester.test(data.Content)) {
          if (matcher.Criteria) {
            if (matcher.Criteria.SenderIsPlayer && data.Sender !== Player.MemberNumber) {
              continue;
            } else if (matcher.Criteria.TargetIsPlayer && !dictHasPlayerTarget(data.Dictionary)) {
              continue;
            } else if (matcher.Criteria.DictionaryMatchers && !matcher.Criteria.DictionaryMatchers.some((m) => data.Dictionary?.find((t) => Object.keys(m).every((k) => m[k] === t[k])))) {
              continue;
            }
            pushEvent(globalThis.bce_EventExpressions[trigger.Event]);
          } else if (data.Sender === Player.MemberNumber || dictHasPlayerTarget(data.Dictionary)) {
            pushEvent(globalThis.bce_EventExpressions[trigger.Event]);
            break activityTriggers;
          }
        }
      }
    }
  });
  function expression(t) {
    const properties = Player.Appearance.find((a) => a.Asset.Group.Name === t)?.Property ?? null;
    return [properties?.Expression || null, !properties?.RemoveTimer];
  }
  function setExpression(t, n, color) {
    if (!n) {
      n = null;
    }
    for (const appearance of Player.Appearance) {
      if (appearance.Asset.Group.Name === t) {
        if (!appearance.Property) {
          appearance.Property = {};
        }
        appearance.Property.Expression = n;
        if (color) {
          appearance.Color = color;
        }
        break;
      }
    }
  }
  const poseCategories = (
    /** @type {const} */
    {
      BodyFull: { Conflicts: ["BodyUpper", "BodyLower"] },
      BodyUpper: { Conflicts: ["BodyFull"] },
      BodyLower: { Conflicts: ["BodyFull"] }
    }
  );
  function hasConflicts(pose) {
    return isString(pose) && pose in poseCategories;
  }
  const faceComponents = ["Eyes", "Eyes2", "Eyebrows", "Mouth", "Fluids", "Emoticon", "Blush", "Pussy"];
  pushEvent({
    Type: MANUAL_OVERRIDE_EVENT_TYPE,
    Duration: -1,
    Expression: faceComponents.map((t) => {
      const [expr] = expression(t);
      return [t, expr];
    }).filter((v) => v[1] !== null).map((v) => [v[0], [{ Expression: v[1] }]]).reduce((a, v) => ({ ...a, [
      /** @type {string} */
      v[0]
    ]: v[1] }), {})
  });
  let lastOrgasm = 0, orgasmCount = 0, wasDefault = false;
  let PreviousArousal = Player.ArousalSettings;
  const ArousalMeterDirection = {
    None: 0,
    Down: 1,
    Up: 2
  };
  let PreviousDirection = ArousalMeterDirection.Up;
  function resetExpressionQueue(types, skippedTypes = []) {
    delete Player.ExpressionQueue;
    bceExpressionsQueue.push(
      ...bceExpressionsQueue.splice(0, bceExpressionsQueue.length).map((e) => {
        if (types.includes(e.Type) || e.Duration <= 0 && e.Type !== AUTOMATED_AROUSAL_EVENT_TYPE && !skippedTypes.includes(e.Type)) {
          delete e.Expression;
        }
        return e;
      })
    );
    if (!types.includes(MANUAL_OVERRIDE_EVENT_TYPE)) {
      pushEvent({
        Type: MANUAL_OVERRIDE_EVENT_TYPE,
        Duration: -1,
        Expression: objEntries(manualComponents).reduce((a, [k, v]) => ({ ...a, [k]: [{ Expression: v }] }), {})
      });
    } else {
      for (const [k] of objEntries(manualComponents)) {
        delete manualComponents[k];
      }
    }
  }
  CommandCombine([
    {
      Tag: "r",
      Description: displayText("[part of face or 'all']: resets expression overrides on part of or all of face"),
      Action: (args) => {
        if (args.length === 0 || args === "all") {
          resetExpressionQueue([MANUAL_OVERRIDE_EVENT_TYPE]);
          fbcChatNotify(displayText("Reset all expressions"));
        } else {
          const component = `${args[0].toUpperCase()}${args.substring(1).toLowerCase()}`;
          for (const e of bceExpressionsQueue.map((a) => a.Expression).filter(Boolean)) {
            if (component === "Eyes" && "Eyes2" in e) {
              delete e.Eyes2;
            }
            if (component in e) {
              delete e[component];
            }
          }
          fbcChatNotify(displayText("Reset expression on $component", { $component: component }));
        }
      }
    },
    {
      Tag: "anim",
      Description: displayText("['list' or name of emote]: run an animation"),
      Action: (_1, _2, args) => {
        if (!fbcSettings.activityExpressions) {
          fbcChatNotify(displayText("Activity expressions are not enabled in WCE settings. Unable to run animations."));
          return;
        }
        if (args[0] === "list") {
          fbcChatNotify(displayText("Available animations: $anims", { $anims: Object.keys(globalThis.bce_EventExpressions).join(", ") }));
        }
        const animation = Object.keys(globalThis.bce_EventExpressions).find((a) => a.toLowerCase() === args[0]?.toLowerCase());
        if (animation) {
          pushEvent(globalThis.bce_EventExpressions[animation]);
        }
      }
    }
  ]);
  function getPoseCategory(pose) {
    return PoseFemale3DCG.find((a) => a.Name === pose)?.Category;
  }
  function setPoses(poses) {
    poses = poses.filter((p) => p).map((p) => p.toLowerCase());
    bceExpressionsQueue.forEach((e) => {
      if (e.Type === MANUAL_OVERRIDE_EVENT_TYPE) {
        e.Poses = [];
      } else if (e.Poses && e.Poses.length > 0) {
        e.Poses.forEach((p) => {
          if (p.Pose.length === 0) {
            return;
          }
          if (typeof p.Pose[0] === "string") {
            return;
          }
          const poseList = p.Pose;
          p.Pose = poseList.filter((pp) => !!getPoseCategory(pp));
        });
      }
    });
    const poseNames = PoseFemale3DCG.filter((p) => poses.includes(p.Name.toLowerCase())).map((p) => p.Name);
    for (const poseName of poseNames) {
      PoseSetActive(Player, poseName, false);
    }
  }
  CommandCombine({
    Tag: "pose",
    Description: displayText("['list' or list of poses]: set your pose"),
    Action: (_1, _2, poses) => {
      if (poses[0] === "list") {
        const categories = [...new Set(PoseFemale3DCG.map((a) => a.Category))];
        for (const category of categories) {
          const list = PoseFemale3DCG.filter((a) => a.Category === category)?.map((a) => a.Name);
          list.sort();
          fbcChatNotify(`=> ${category}:
${list.join("\n")}

`);
        }
        return;
      }
      if (!fbcSettings.animationEngine) {
        fbcChatNotify(
          displayText(
            "Warning: animation engine in WCE is disabled. Pose may not be synchronized or set. Enable animation engine in WCE settings."
          )
        );
      }
      setPoses(poses);
    }
  });
  patchFunction(
    "TimerInventoryRemove",
    {
      "CharacterSetFacialExpression(C, C.ExpressionQueue[0].Group, C.ExpressionQueue[0].Expression, undefined, undefined, true);": `if (bceAnimationEngineEnabled()) {
        fbcPushEvent({
          Type: "${GAME_TIMED_EVENT_TYPE}",
          Duration: -1,
          Expression: {
            [C.ExpressionQueue[0].Group]: [{ Expression: C.ExpressionQueue[0].Expression, Duration: -1 }]
          }
        })
      } else {
        CharacterSetFacialExpression(C, C.ExpressionQueue[0].Group, C.ExpressionQueue[0].Expression, undefined, undefined, true);
      }`
    },
    "Game's timed expressions are not hooked to WCE's animation engine"
  );
  patchFunction(
    "ValidationSanitizeProperties",
    {
      "delete property.Expression;": `delete property.Expression;
      if (bceAnimationEngineEnabled()) {
        if (item?.Asset?.Group?.Name) {
          CharacterSetFacialExpression(C, item.Asset.Group.Name, null);
          console.warn("(WCE) Animation engine acknowledged validation-based expression removal for face component", item)
        } else {
          console.warn("Unable to determine asset group name for item", item);
        }
      }`
    },
    "Prevent animation engine from getting into an endless loop when another addon includes an invalid expression"
  );
  SDK.hookFunction(
    "CharacterSetFacialExpression",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      let [C, AssetGroup2, Expression, Timer, Color] = args;
      if (!isCharacter(C) || !isString(AssetGroup2) || !isString(Expression) && Expression !== null || !C.IsPlayer() || !fbcSettings.animationEngine) {
        return next(args);
      }
      const duration = typeof Timer === "number" && Timer > 0 ? Timer * 1e3 : -1, e = {};
      let types = [];
      if (AssetGroup2 === "Eyes") {
        types = ["Eyes", "Eyes2"];
      } else if (AssetGroup2 === "Eyes1") {
        types = ["Eyes"];
      } else {
        types = [AssetGroup2];
      }
      if (!Color || !isStringOrStringArray(Color) || !CommonColorIsValid(Color)) {
        Color = void 0;
      }
      for (const t of types) {
        e[t] = [{ Expression, Duration: duration, Color }];
        if (duration < 0) {
          manualComponents[t] = Expression;
        }
      }
      const evt = {
        Type: MANUAL_OVERRIDE_EVENT_TYPE,
        Duration: duration,
        Expression: e
      };
      pushEvent(evt);
      return CustomArousalExpression();
    }
  );
  const poseFuncs = (
    /** @type {const} */
    ["CharacterSetActivePose", "PoseSetActive"]
  );
  for (const poseFunc of poseFuncs) {
    SDK.hookFunction(
      poseFunc,
      HOOK_PRIORITIES.OverrideBehaviour,
      (args, next) => {
        const [C, Pose] = args;
        if (!isCharacter(C) || !isStringOrStringArray(Pose) && Pose !== null || !C.IsPlayer() || !fbcSettings.animationEngine) {
          return next(args);
        }
        const p = {};
        if (!Pose || Array.isArray(Pose) && Pose.every((pp) => !pp)) {
          p.Pose = /** @type {AssetPoseName[]} */
          ["BaseUpper", "BaseLower"];
        } else {
          p.Pose = [Pose];
        }
        p.Duration = -1;
        const evt = {
          Type: MANUAL_OVERRIDE_EVENT_TYPE,
          Duration: -1,
          Poses: [p]
        };
        pushEvent(evt);
        return CustomArousalExpression();
      }
    );
  }
  registerSocketListener("ChatRoomSyncPose", (data) => {
    if (data === null || !isNonNullObject(data)) {
      return;
    }
    if (!Array.isArray(data.Pose)) {
      logWarn(`data.Pose in ChatRoomSyncPose for ${data.MemberNumber?.toString()} is not an array`);
      return;
    }
    if (!fbcSettings.animationEngine) {
      return;
    }
    if (data.MemberNumber === Player.MemberNumber) {
      setPoses(data.Pose);
    }
  });
  registerSocketListener("ChatRoomSyncSingle", (data) => {
    if (data === null || !isNonNullObject(data)) {
      return;
    }
    if (!fbcSettings.animationEngine) {
      return;
    }
    if (data.Character?.MemberNumber === Player.MemberNumber) {
      setPoses(data.Character.ActivePose ?? []);
    }
  });
  resetExpressionQueue([MANUAL_OVERRIDE_EVENT_TYPE, GAME_TIMED_EVENT_TYPE]);
  function CustomArousalExpression() {
    if (!fbcSettings.animationEngine || !Player?.AppearanceLayers) {
      return;
    }
    Player.Appearance.filter((a) => faceComponents.includes(a.Asset.Group.Name) && a.Property?.RemoveTimer).forEach(
      (a) => {
        delete a.Property.RemoveTimer;
      }
    );
    if (!Player.ArousalSettings) {
      logWarn("Player.ArousalSettings is not defined");
      return;
    }
    Player.ArousalSettings.AffectExpression = false;
    const oCount = Player.ArousalSettings.OrgasmCount ?? 0;
    if (orgasmCount < oCount) {
      orgasmCount = oCount;
    } else if (orgasmCount > oCount) {
      Player.ArousalSettings.OrgasmCount = orgasmCount;
      ActivityChatRoomArousalSync(Player);
    }
    let isDefault = true;
    for (const t of faceComponents) {
      if (expression(t)[0]) {
        isDefault = false;
      }
    }
    if (isDefault) {
      PreviousArousal.Progress = 0;
      PreviousDirection = ArousalMeterDirection.Up;
      if (!wasDefault) {
        for (const queuedExpression of bceExpressionsQueue) {
          if (queuedExpression.Type === AUTOMATED_AROUSAL_EVENT_TYPE) {
            continue;
          }
          queuedExpression.Expression = {};
        }
      }
      wasDefault = true;
    } else {
      wasDefault = false;
    }
    const arousal = Player.ArousalSettings.Progress;
    let direction = PreviousDirection;
    if (arousal < PreviousArousal.Progress) {
      direction = ArousalMeterDirection.Down;
    } else if (arousal > PreviousArousal.Progress) {
      direction = ArousalMeterDirection.Up;
    }
    PreviousDirection = direction;
    function lastOrgasmAdjustment() {
      const lastOrgasmMaxArousal = 90, lastOrgasmMaxBoost = 30, orgasms = Player.ArousalSettings?.OrgasmCount || 0;
      const lastOrgasmBoostDuration = Math.min(300, 60 + orgasms * 5), secondsSinceOrgasm = (Date.now() - lastOrgasm) / 1e4 | 0;
      if (secondsSinceOrgasm > lastOrgasmBoostDuration) {
        return 0;
      }
      return Math.min(
        Math.max(0, lastOrgasmMaxArousal - arousal),
        lastOrgasmMaxBoost * (lastOrgasmBoostDuration - secondsSinceOrgasm) / lastOrgasmBoostDuration
      );
    }
    const OrgasmRecoveryStage = 2;
    if (PreviousArousal.OrgasmStage !== OrgasmRecoveryStage && Player.ArousalSettings.OrgasmStage === OrgasmRecoveryStage && bceExpressionsQueue.filter((a) => a.Type === POST_ORGASM_EVENT_TYPE).length === 0) {
      pushEvent(globalThis.bce_EventExpressions.PostOrgasm);
      lastOrgasm = Date.now();
    }
    const desiredExpression = {};
    let desiredPose = {};
    const nextExpression = {};
    function trySetNextExpression(e, exp, next, t) {
      const priority = exp.Priority || next.Priority || 0;
      if (!nextExpression[t] || (nextExpression[t].Priority ?? 0) <= priority) {
        nextExpression[t] = {
          Id: exp.Id,
          Expression: e,
          Duration: exp.Duration,
          Priority: priority,
          Color: exp.Color
        };
      }
    }
    for (let j = 0; j < bceExpressionsQueue.length; j++) {
      const next = bceExpressionsQueue[j];
      const nextUntil = next.Until ?? 0;
      const nextAt = next.At ?? 0;
      let active = false;
      if (nextUntil > Date.now() || nextUntil - nextAt < 0) {
        const nextExpr = next.Expression ?? {};
        if (Object.keys(nextExpr).length > 0) {
          for (const t of Object.keys(nextExpr)) {
            let durationNow = Date.now() - nextAt;
            for (let i = 0; i < nextExpr[t].length; i++) {
              const exp = nextExpr[t][i];
              durationNow -= exp.Duration;
              if (durationNow < 0 || exp.Duration < 0) {
                active = true;
                if (!exp.Skip) {
                  if (exp.ExpressionModifier && t in bceExpressionModifierMap) {
                    const [current] = expression(t);
                    if (!exp.Applied) {
                      let idx = bceExpressionModifierMap[t].indexOf(current) + exp.ExpressionModifier;
                      if (idx >= bceExpressionModifierMap[t].length) {
                        idx = bceExpressionModifierMap[t].length - 1;
                      } else if (idx < 0) {
                        idx = 0;
                      }
                      trySetNextExpression(bceExpressionModifierMap[t][idx], exp, next, t);
                      bceExpressionsQueue[j].Expression[t][i].Applied = true;
                    } else {
                      trySetNextExpression(current, exp, next, t);
                    }
                  } else {
                    trySetNextExpression(exp.Expression ?? null, exp, next, t);
                  }
                }
                break;
              }
            }
          }
        }
        if (next.Poses?.length) {
          let durationNow = Date.now() - nextAt;
          for (const pose of next.Poses) {
            durationNow -= pose.Duration;
            if (durationNow < 0 || pose.Duration < 0) {
              active = true;
              for (const p of pose.Pose) {
                const priority = pose.Priority || next.Priority || 0;
                const category = getPoseCategory(p);
                if (!category) {
                  logWarn(`Pose ${p} has no category`);
                  continue;
                }
                if (!pose.Id) {
                  logWarn(`Pose ${p} has no ID`);
                  pose.Id = newUniqueId();
                }
                if (!desiredPose[category] || desiredPose[category].Priority <= priority) {
                  desiredPose[category] = {
                    Id: pose.Id,
                    Pose: p,
                    Category: category,
                    Duration: pose.Duration,
                    Priority: priority,
                    Type: next.Type
                  };
                }
              }
              break;
            }
          }
        }
      }
      if (!active) {
        const last = bceExpressionsQueue.splice(j, 1);
        j--;
        if (!fbcSettings.expressions && last.length > 0 && last[0].Expression) {
          for (const t of Object.keys(last[0].Expression)) {
            trySetNextExpression(
              null,
              { Duration: -1 },
              {
                Priority: 0,
                Type: DEFAULT_EVENT_TYPE,
                Duration: 500
              },
              t
            );
          }
        }
      }
    }
    for (let j = 0; j < bceExpressionsQueue.length; j++) {
      const qExpr = bceExpressionsQueue[j].Expression;
      const qPoses = bceExpressionsQueue[j].Poses;
      if (qExpr) {
        for (const t of Object.keys(qExpr)) {
          if (!nextExpression[t] || nextExpression[t].Duration > 0) {
            continue;
          }
          const nextId = mustNum(nextExpression[t].Id), nextPriority = mustNum(nextExpression[t].Priority, 0);
          for (let i = 0; i < qExpr[t].length; i++) {
            const exp = qExpr[t][i];
            if (exp.Duration < 0 && (mustNum(exp.Id) < nextId || mustNum(exp.Priority, 0) < nextPriority)) {
              qExpr[t].splice(i, 1);
              i--;
            }
          }
          if (qExpr[t].length === 0) {
            delete qExpr[t];
          }
        }
      }
      if (qPoses) {
        for (let k = 0; k < qPoses.length; k++) {
          const pose = qPoses[k];
          const poseList = pose.Pose;
          const desiredIsNewerAndInfinite = poseList.every(
            // eslint-disable-next-line no-loop-func
            (p) => {
              const category = getPoseCategory(p);
              return !!category && desiredPose[category]?.Duration < 0 && desiredPose[category]?.Id > mustNum(pose.Id) && (desiredPose[category]?.Type === MANUAL_OVERRIDE_EVENT_TYPE || bceExpressionsQueue[j].Type !== MANUAL_OVERRIDE_EVENT_TYPE);
            }
          );
          if (pose.Duration < 0 && desiredIsNewerAndInfinite) {
            qPoses.splice(k, 1);
            k--;
          }
        }
      }
      if (Object.keys(bceExpressionsQueue[j].Expression || {}).length === 0 && bceExpressionsQueue[j].Poses?.length === 0) {
        bceExpressionsQueue.splice(j, 1);
        j--;
      }
    }
    let needsRefresh = false;
    let poseUpdate = false;
    if (Player.ActivePose) {
      for (let i = 0; i < Player.ActivePose.length; i++) {
        const pose = Player.ActivePose[i];
        const p = PoseFemale3DCG.find((pp) => pp.Name === pose);
        if (!p?.Category && Object.values(desiredPose).every((v) => v.Pose !== pose)) {
          poseUpdate = [...Player.ActivePose];
          poseUpdate.splice(i, 1);
          i--;
          needsRefresh = true;
        }
      }
    }
    outer: for (const t of Object.keys(globalThis.bce_ArousalExpressionStages)) {
      const [exp] = expression(t);
      let chosenExpression = null;
      let expressionChosen = false;
      for (const face of globalThis.bce_ArousalExpressionStages[t]) {
        const limit = face.Limit - (direction === ArousalMeterDirection.Up ? 0 : 1);
        if (arousal + lastOrgasmAdjustment() >= limit) {
          if (face.Expression !== exp) {
            chosenExpression = face.Expression;
            expressionChosen = true;
            break;
          } else {
            continue outer;
          }
        }
      }
      if (expressionChosen) {
        const e = {};
        e[t] = [{ Expression: chosenExpression, Duration: -1, Priority: 0 }];
        pushEvent({
          Type: AUTOMATED_AROUSAL_EVENT_TYPE,
          Duration: -1,
          Priority: 0,
          // @ts-ignore
          Expression: e
        });
      }
    }
    for (const t of faceComponents) {
      const [exp] = expression(t), nextExp = nextExpression[t] || {
        Duration: -1,
        Expression: null
      };
      if (nextExp.Expression !== exp && typeof nextExp.Expression !== "undefined") {
        desiredExpression[t] = { ...nextExp };
      }
    }
    if (Object.keys(desiredExpression).length > 0) {
      for (const t of Object.keys(desiredExpression)) {
        if (BCX?.getRuleState("block_changing_emoticon")?.isEnforced && t === "Emoticon") {
          continue;
        }
        setExpression(t, desiredExpression[t].Expression ?? null, desiredExpression[t].Color);
        ServerSend("ChatRoomCharacterExpressionUpdate", {
          // @ts-ignore - null is a valid name, mistake in BC-stubs
          Name: desiredExpression[t].Expression ?? null,
          Group: t,
          Appearance: ServerAppearanceBundle(Player.Appearance)
        });
      }
      needsRefresh = true;
    }
    function resolvePoseConflicts() {
      const maxPriority = Math.max(...Object.values(desiredPose).map((p) => p.Priority));
      const maxPriorityPoses = objEntries(desiredPose).filter((p) => p[1].Priority === maxPriority);
      let maxPriorityPose = "";
      if (maxPriorityPoses.length > 1) {
        const maxId = Math.max(...maxPriorityPoses.map((p) => p[1].Id)), maxIdPoses = maxPriorityPoses.filter((p) => p[1].Id === maxId);
        [[maxPriorityPose]] = maxIdPoses;
      } else if (maxPriorityPoses.length === 0) {
        return 0;
      } else {
        [[maxPriorityPose]] = maxPriorityPoses;
      }
      let deleted = 0;
      if (hasConflicts(maxPriorityPose)) {
        const conflicts = poseCategories[maxPriorityPose].Conflicts || [];
        for (const conflict of Array.from(conflicts).filter((c) => c in desiredPose)) {
          delete desiredPose[conflict];
          deleted++;
        }
      }
      return deleted;
    }
    while (resolvePoseConflicts() > 0) {
    }
    if (Object.keys(desiredPose).length === 0) {
      desiredPose = {
        BodyUpper: {
          Pose: "BaseUpper",
          Duration: -1,
          Id: newUniqueId(),
          Priority: 0,
          Type: DEFAULT_EVENT_TYPE
        },
        BodyLower: {
          Pose: "BaseLower",
          Duration: -1,
          Id: newUniqueId(),
          Priority: 0,
          Type: DEFAULT_EVENT_TYPE
        }
      };
    }
    const basePoseMatcher = /^Base(Lower|Upper)$/u;
    const newPose = Object.values(desiredPose).map((p) => p.Pose).filter((p) => !basePoseMatcher.test(p));
    if (JSON.stringify(Player.ActivePose) !== JSON.stringify(newPose)) {
      poseUpdate = newPose;
      needsRefresh = true;
    }
    if (poseUpdate) {
      Player.ActivePose = poseUpdate;
      ServerSend("ChatRoomCharacterPoseUpdate", { Pose: poseUpdate });
    }
    if (needsRefresh) {
      CharacterRefresh(Player, false, false);
    }
    PreviousArousal = { ...Player.ArousalSettings };
  }
  createTimer(CustomArousalExpression, 250);
}

// src/functions/alternateArousal.js
async function alternateArousal() {
  await waitFor(() => !!ServerSocket && ServerIsConnected);
  Player.BCEArousalProgress = Math.min(BCE_MAX_AROUSAL, Player.ArousalSettings?.Progress ?? 0);
  Player.BCEEnjoyment = 1;
  const enjoymentMultiplier = 0.2;
  registerSocketListener("ChatRoomSyncArousal", (data) => {
    if (data.MemberNumber === Player.MemberNumber) {
      return;
    }
    const target = ChatRoomCharacter.find((c) => c.MemberNumber === data.MemberNumber);
    if (!target) {
      return;
    }
    queueMicrotask(() => {
      target.BCEArousalProgress = Math.min(BCE_MAX_AROUSAL, data.Progress || 0);
      if (!target?.ArousalSettings) {
        logWarn("No arousal settings found for", target);
        return;
      }
      target.ArousalSettings.Progress = Math.round(target.BCEArousalProgress);
    });
  });
  patchFunction(
    "ActivitySetArousalTimer",
    {
      "if (Progress > 0 && (C.ArousalSettings.Progress + Progress) > Max)\n		Progress = (Max - C.ArousalSettings.Progress >= 0) ? Max - C.ArousalSettings.Progress : 0;": `
      if (!C.BCEArousal) {
        if ((Progress > 0) && (C.ArousalSettings.Progress + Progress > Max)) Progress = (Max - C.ArousalSettings.Progress >= 0) ? Max - C.ArousalSettings.Progress : 0;
      } else {
        if (Max === 100) Max = 105;
        const fromMax = Max - (C.BCEArousal ? C.BCEArousalProgress : C.ArousalSettings.Progress);
        if (Progress > 0 && fromMax < Progress) {
          if (fromMax <= 0) {
            Progress = 0;
          } else if (C.BCEArousal) {
            Progress = Math.floor(fromMax / ${enjoymentMultiplier} / (C.BCEEnjoyment || 1));
          } else {
            Progress = fromMax;
          }
        }
      }
    `,
      "if (Progress < -25) Progress = -25;": `
      if (!C.BCEArousal) {
        if (Progress < -25) Progress = -25;
      } else {
        if (Progress < -20) Progress = -20;
      }
      `,
      "if (Progress > 25) Progress = 25;": `
      if (!C.BCEArousal) {
        if (Progress > 25) Progress = 25;
      } else {
        if (Progress > 20) Progress = 20;
      }
      `
    },
    "Alternate arousal algorithm will be incorrect."
  );
  SDK.hookFunction(
    "ActivityChatRoomArousalSync",
    HOOK_PRIORITIES.Observe,
    (args, next) => {
      const [C] = args;
      if (isCharacter(C) && C.IsPlayer() && CurrentScreen === "ChatRoom") {
        const message = {
          Type: HIDDEN,
          Content: BCE_MSG,
          Dictionary: [
            {
              // @ts-ignore - cannot extend valid dictionary entries to add our type to it, but this is possible within the game's wire format
              message: {
                type: MESSAGE_TYPES.ArousalSync,
                version: FBC_VERSION,
                alternateArousal: fbcSettings.alternateArousal,
                progress: C.BCEArousalProgress,
                enjoyment: C.BCEEnjoyment
              }
            }
          ]
        };
        ServerSend("ChatRoomChat", message);
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "ActivitySetArousal",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const [C, Progress] = args;
      const ret = next(args);
      if (isCharacter(C) && typeof Progress === "number" && Math.abs(C.BCEArousalProgress - Progress) > 3) {
        C.BCEArousalProgress = Math.min(BCE_MAX_AROUSAL, Progress);
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "ActivitySetArousalTimer",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const [C, , , Factor] = args;
      if (isCharacter(C) && typeof Factor === "number") {
        C.BCEEnjoyment = 1 + (Factor > 1 ? Math.round(Math.log2(Factor)) : 0);
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "ActivityTimerProgress",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      const [C, progress] = args;
      if (isCharacter(C) && typeof progress === "number") {
        if (!C.BCEArousalProgress) {
          C.BCEArousalProgress = 0;
        }
        if (!C.BCEEnjoyment) {
          C.BCEEnjoyment = 1;
        }
        C.BCEArousalProgress += progress * (progress > 0 ? C.BCEEnjoyment * enjoymentMultiplier : 1);
        C.BCEArousalProgress = Math.min(BCE_MAX_AROUSAL, C.BCEArousalProgress);
        if (C.BCEArousal) {
          if (!C.ArousalSettings) {
            throw new Error(`No arousal settings found for ${C.Name}`);
          }
          C.ArousalSettings.Progress = Math.round(C.BCEArousalProgress);
          args[1] = 0;
          return next(args);
        }
      }
      return next(args);
    }
  );
  patchFunction(
    "TimerProcess",
    {
      "// If the character is egged, we find the highest intensity factor and affect the progress, low and medium vibrations have a cap\n							let Factor = -1;": `
      let Factor = -1;
      if (Character[C].BCEArousal) {
        let maxIntensity = 0;
        let vibes = 0;
        let noOrgasmVibes = 0;
        for (let A = 0; A < Character[C].Appearance.length; A++) {
          let Item = Character[C].Appearance[A];
          let ZoneFactor = PreferenceGetZoneFactor(Character[C], Item.Asset.ArousalZone) - 2;
          if (InventoryItemHasEffect(Item, "Egged", true) && typeof Item.Property?.Intensity === "number" && !isNaN(Item.Property.Intensity) && Item.Property.Intensity >= 0 && ZoneFactor >= 0) {
            if (Item.Property.Intensity >= 0) {
              vibes++;
              if (!PreferenceGetZoneOrgasm(Character[C], Item.Asset.ArousalZone)) {
                noOrgasmVibes++;
              }
              maxIntensity = Math.max(Item.Property.Intensity, maxIntensity);
              Factor += Item.Property.Intensity + ZoneFactor + 1;
            }
          }
        }
        // Adds the fetish value to the factor
        if (Factor >= 0) {
          var Fetish = ActivityFetishFactor(Character[C]);
          if (Fetish > 0) Factor = Factor + Math.ceil(Fetish / 3);
          if (Fetish < 0) Factor = Factor + Math.floor(Fetish / 3);
        }

        let maxProgress = 100;
        switch (maxIntensity) {
          case 0:
            maxProgress = 40 + vibes * 5;
            break;
          case 1:
            maxProgress = 70 + vibes * 5;
            break;
          default:
            maxProgress = vibes === 0 || vibes > noOrgasmVibes ? 100 : 95;
            break;
        }
        const topStepInterval = 2;
        let stepInterval = topStepInterval;
        if (Factor < 0) {
          ActivityVibratorLevel(Character[C], 0);
        } else {
          if (Factor < 1) {
            ActivityVibratorLevel(Character[C], 1);
            maxProgress = Math.min(maxProgress, 35);
            stepInterval = 5;
          } else if (Factor < 2) {
            ActivityVibratorLevel(Character[C], 1);
            maxProgress = Math.min(maxProgress, 65);
            stepInterval = 4;
          } else if (Factor < 3) {
            maxProgress = Math.min(maxProgress, 95);
            stepInterval = 3;
            ActivityVibratorLevel(Character[C], 2);
          } else {
            ActivityVibratorLevel(Character[C], Math.min(4, Math.floor(Factor)));
          }
          if (maxProgress === 100) {
            maxProgress = 105;
          }
          let maxIncrease = maxProgress - Character[C].ArousalSettings.Progress;
          if (TimerLastArousalProgressCount % stepInterval === 0 && maxIncrease > 0) {
            Character[C].BCEEnjoyment = 1 + (Factor > 1 ? Math.round(1.5*Math.log2(Factor)) : 0);
            ActivityTimerProgress(Character[C], 1);
          }
        }
      } else {
      `,
      "if ((Factor == -1)) {ActivityVibratorLevel(Character[C], 0);}\n\n						}": `if (Factor == -1) {
          ActivityVibratorLevel(Character[C], 0);
        }
      }
    } else {
      ActivityVibratorLevel(Character[C], 0);
    }
    `,
      "// No decay if there's a vibrating item running": `// No decay if there's a vibrating item running
    Character[C].BCEEnjoyment = 1;`
    },
    "Alternative arousal algorithm will be incorrect."
  );
}

// src/functions/autoGhostBroadcast.ts
async function autoGhostBroadcast() {
  await waitFor(() => !!ServerSocket && ServerIsConnected);
  registerSocketListener("ChatRoomSyncMemberJoin", (data) => {
    if (fbcSettings.ghostNewUsers && Date.now() - data.Character.Creation < 3e4) {
      ChatRoomListManipulation(Player.BlackList, true, data.Character.MemberNumber.toString());
      if (!Player.GhostList) {
        Player.GhostList = [];
      }
      ChatRoomListManipulation(Player.GhostList, true, data.Character.MemberNumber.toString());
      debug(
        "Blacklisted",
        data.Character.Name,
        CharacterNickname(CharacterLoadOnline(data.Character, data.SourceMemberNumber)),
        data.Character.MemberNumber,
        "registered",
        (Date.now() - data.Character.Creation) / 1e3,
        "seconds ago"
      );
    }
  });
}

// src/functions/blindWithoutGlasses.ts
async function blindWithoutGlasses() {
  await waitFor(() => !!Player && !!Player.Appearance);
  function checkBlindness() {
    const glasses = [
      "Glasses1",
      "Glasses2",
      "Glasses3",
      "Glasses4",
      "Glasses5",
      "Glasses6",
      "SunGlasses1",
      "SunGlasses2",
      "SunGlassesClear",
      // "EyePatch1",
      "CatGlasses",
      "Goggles",
      "VGlasses",
      "GradientSunglasses",
      "JokeGlasses",
      "StreetEyewear",
      "Pincenez",
      "FuturisticVisor",
      "InteractiveVisor",
      "InteractiveVRHeadset",
      "FuturisticMask"
    ], hasGlasses = !!Player.Appearance.find((a) => glasses.includes(a.Asset.Name));
    if (hasGlasses) {
      if (removeCustomEffect("BlurLight")) {
        fbcChatNotify(displayText("Having recovered your glasses you can see again!"));
      }
    } else if (addCustomEffect("BlurLight")) {
      fbcChatNotify(displayText("Having lost your glasses your eyesight is impaired!"));
    }
  }
  SDK.hookFunction(
    "CharacterAppearanceBuildCanvas",
    HOOK_PRIORITIES.Observe,
    (args, next) => {
      if (fbcSettings.blindWithoutGlasses && args[0].IsPlayer()) checkBlindness();
      return next(args);
    }
  );
}

// src/functions/friendPresenceNotifications.js
var BEEP_CLICK_ACTIONS = Object.freeze({
  /** @type {"FriendList"} */
  FriendList: "FriendList"
});
async function friendPresenceNotifications() {
  await waitFor(() => !!Player && ServerSocket && ServerIsConnected);
  function checkFriends() {
    if (!fbcSettings.friendPresenceNotifications && !fbcSettings.instantMessenger) {
      return;
    }
    if (CurrentScreen === "FriendList" || CurrentScreen === "Relog" || CurrentScreen === "Login") {
      return;
    }
    ServerSend("AccountQuery", { Query: "OnlineFriends" });
  }
  createTimer(checkFriends, 2e4);
  let lastFriends = [];
  registerSocketListener("AccountQueryResult", (data) => {
    if (CurrentScreen === "FriendList" || CurrentScreen === "Relog" || CurrentScreen === "Login") {
      return;
    }
    if (!fbcSettings.friendPresenceNotifications) {
      return;
    }
    if (data.Query !== "OnlineFriends") {
      return;
    }
    const friendMemberNumbers = data.Result.map((f) => f.MemberNumber), offlineFriends = lastFriends.map((f) => f.MemberNumber).filter((f) => !friendMemberNumbers.includes(f)), onlineFriends = friendMemberNumbers.filter((f) => !lastFriends.some((ff) => ff.MemberNumber === f));
    if (onlineFriends.length) {
      const list = onlineFriends.map((f) => {
        const { MemberNumber, MemberName } = data.Result.find((d) => d.MemberNumber === f) ?? {
          MemberName: "",
          MemberNumber: -1
        };
        return `${MemberName} (${MemberNumber})`;
      }).join(", ");
      if (fbcSettings.friendNotificationsInChat && CurrentScreen === "ChatRoom") {
        fbcChatNotify(displayText("Now online: $list", { $list: list }));
      } else {
        fbcNotify(displayText("Now online: $list", { $list: list }), 5e3, { ClickAction: BEEP_CLICK_ACTIONS.FriendList });
      }
    }
    if (fbcSettings.friendOfflineNotifications && offlineFriends.length) {
      const list = offlineFriends.map((f) => {
        const { MemberNumber, MemberName } = lastFriends.find((d) => d.MemberNumber === f) ?? {
          MemberName: "",
          MemberNumber: -1
        };
        return `${MemberName} (${MemberNumber})`;
      }).join(", ");
      if (fbcSettings.friendNotificationsInChat && CurrentScreen === "ChatRoom") {
        fbcChatNotify(displayText("Now offline: $list", { $list: list }));
      } else {
        fbcNotify(displayText("Now offline: $list", { $list: list }), 5e3, { ClickAction: BEEP_CLICK_ACTIONS.FriendList });
      }
    }
    lastFriends = data.Result;
  });
}

// src/functions/itemAntiCheat.js
function itemAntiCheat() {
  const noticesSent = /* @__PURE__ */ new Map();
  function validateNewLockMemberNumber(sourceCharacter, newItem) {
    if (!newItem.Name || !newItem.Property?.LockedBy) {
      return true;
    }
    if (newItem.Property?.LockMemberNumber !== sourceCharacter.MemberNumber) {
      debug("Bad lock member number", newItem.Property?.LockMemberNumber, "from", sourceCharacter.MemberNumber);
      return false;
    }
    return true;
  }
  function validateSingleItemChange(sourceCharacter, oldItem, newItem, ignoreLocks, ignoreColors) {
    const changes = {
      changed: 0,
      prohibited: false
    };
    if (sourceCharacter.IsPlayer()) {
      return changes;
    }
    const sourceName = `${CharacterNickname(sourceCharacter)} (${sourceCharacter.MemberNumber ?? "-1"})`;
    function deleteUnneededMetaData(item) {
      if (!item) {
        return item;
      }
      const clone = deepCopy(item);
      if (!clone) {
        return clone;
      }
      if (clone.Property) {
        if (ignoreLocks) {
          delete clone.Property.LockMemberNumber;
          delete clone.Property.LockedBy;
          delete clone.Property.RemoveTimer;
          delete clone.Property.Effect;
        }
        delete clone.Property.BlinkState;
      }
      if (ignoreColors) {
        delete clone.Color;
      }
      return clone;
    }
    function validateMistressLocks() {
      const sourceCanBeMistress = (sourceCharacter?.Reputation?.find((a) => a.Type === "Dominant")?.Value ?? 0) >= 50 || sourceCharacter.Title === "Mistress";
      if (sourceCanBeMistress || sourceCharacter.MemberNumber === Player.Ownership?.MemberNumber || Player.Lovership?.some((a) => a.MemberNumber === sourceCharacter.MemberNumber)) {
        return;
      }
      if (oldItem?.Property?.LockedBy === "MistressPadlock" && newItem?.Property?.LockedBy !== "MistressPadlock" || oldItem?.Property?.LockedBy === "MistressTimerPadlock" && newItem?.Property?.LockedBy !== "MistressTimerPadlock") {
        debug("Not a mistress attempting to remove mistress lock", sourceName);
        changes.prohibited = true;
      }
      if (oldItem?.Property?.LockedBy !== "MistressPadlock" && newItem?.Property?.LockedBy === "MistressPadlock" || oldItem?.Property?.LockedBy !== "MistressTimerPadlock" && newItem?.Property?.LockedBy === "MistressTimerPadlock") {
        debug("Not a mistress attempting to add mistress lock", sourceName);
        changes.prohibited = true;
      }
      if (oldItem?.Property?.LockedBy === "MistressTimerPadlock" && Math.abs(mustNum(oldItem.Property?.RemoveTimer, Number.MAX_SAFE_INTEGER) - mustNum(newItem?.Property?.RemoveTimer)) > 31 * 60 * 1e3) {
        changes.prohibited = true;
        debug("Not a mistress attempting to change mistress lock timer more than allowed by public entry", sourceName);
      }
    }
    if (newItem && newItem.Property?.LockMemberNumber !== oldItem?.Property?.LockMemberNumber) {
      if (!validateNewLockMemberNumber(sourceCharacter, newItem)) {
        changes.prohibited = true;
      }
    }
    validateMistressLocks();
    newItem = deleteUnneededMetaData(newItem);
    oldItem = deleteUnneededMetaData(oldItem);
    if (JSON.stringify(newItem) !== JSON.stringify(oldItem)) {
      debug(sourceName, "changed", JSON.stringify(oldItem), "to", JSON.stringify(newItem), "changes:", changes);
      changes.changed++;
    }
    return changes;
  }
  function revertChanges(sourceCharacter) {
    if (typeof sourceCharacter.MemberNumber !== "number") {
      throw new Error("change from invalid source character with no member number");
    }
    const sourceName = `${CharacterNickname(sourceCharacter)} (${sourceCharacter.MemberNumber ?? "-1"})`;
    debug("Rejected changes from", sourceName);
    fbcChatNotify(
      displayText(
        `[Anti-Cheat] ${sourceName} tried to make suspicious changes! Appearance changes rejected. Consider telling the user to stop, whitelisting the user (if trusted friend), or blacklisting the user (if the behaviour continues, chat command: "/blacklistadd ${sourceCharacter.MemberNumber}").`
      )
    );
    const noticeSent = noticesSent.get(sourceCharacter.MemberNumber) || 0;
    if (Date.now() - noticeSent > 1e3 * 60 * 10) {
      noticesSent.set(sourceCharacter.MemberNumber, Date.now());
      fbcSendAction(
        displayText(
          `A magical shield on ${CharacterNickname(
            Player
          )} repelled the suspiciously magical changes attempted by ${sourceName}! [WCE Anti-Cheat]`
        )
      );
    }
    if (fbcSettings.antiCheatBlackList && !Player.WhiteList.includes(sourceCharacter.MemberNumber) && !Player.BlackList.includes(sourceCharacter.MemberNumber)) {
      ChatRoomListManipulation(Player.BlackList, true, sourceCharacter.MemberNumber.toString());
      fbcChatNotify(displayText(`[AntiCheat] ${sourceName} blacklisted.`));
    }
    ChatRoomCharacterUpdate(Player);
  }
  SDK.hookFunction(
    "ChatRoomSyncItem",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      const [data] = args;
      if (!fbcSettings.itemAntiCheat) {
        return next(args);
      }
      const item = (
        /** @type {{ Target: number; } & ItemBundle} */
        data?.Item
      );
      if (item?.Target !== Player.MemberNumber) {
        return next(args);
      }
      if (Player.WhiteList.includes(data.Source)) {
        return next(args);
      }
      const sourceCharacter = ChatRoomCharacter.find((a) => a.MemberNumber === data.Source) || (data.Source === Player.MemberNumber ? Player : null);
      if (!sourceCharacter) {
        throw new Error("change from invalid source character not in the current room");
      }
      const ignoreLocks = Player.Appearance.some((a) => a.Asset.Name === "FuturisticCollar");
      const ignoreColors = Player.Appearance.some((a) => a.Asset.Name === "FuturisticHarness") || ignoreLocks;
      const oldItem = Player.Appearance.find((i) => i.Asset.Group.Name === item.Group);
      const oldItemBundle = oldItem ? ServerAppearanceBundle([oldItem])[0] : null;
      const result = validateSingleItemChange(sourceCharacter, oldItemBundle, item, ignoreLocks, ignoreColors);
      if (result.prohibited) {
        revertChanges(sourceCharacter);
        return null;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "ChatRoomSyncSingle",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      const [data] = args;
      if (!fbcSettings.itemAntiCheat) {
        return next(args);
      }
      if (!data?.Character) {
        return next(args);
      }
      if (data.Character.MemberNumber !== Player.MemberNumber) {
        return next(args);
      }
      if (Player.WhiteList.includes(data.SourceMemberNumber)) {
        return next(args);
      }
      const sourceCharacter = ChatRoomCharacter.find((a) => a.MemberNumber === data.SourceMemberNumber) || (data.SourceMemberNumber === Player.MemberNumber ? Player : null);
      if (!sourceCharacter) {
        throw new Error("change from invalid source character not in the current room");
      }
      if (sourceCharacter.IsPlayer()) {
        return next(args);
      }
      function processItemBundleToMap(bundle) {
        const initial = /* @__PURE__ */ new Map();
        return bundle.reduce((prev, cur) => {
          cur = deepCopy(cur);
          delete cur.Color;
          prev.set(`${cur.Group}/${cur.Name}`, cur);
          return prev;
        }, initial);
      }
      const oldItems = processItemBundleToMap(
        ServerAppearanceBundle(Player.Appearance.filter((a) => a.Asset.Group.Category === "Item"))
      );
      if (!data.Character.Appearance) {
        throw new Error("no appearance data in sync single");
      }
      const newItems = processItemBundleToMap(
        data.Character.Appearance.filter((a) => ServerBundledItemToAppearanceItem("Female3DCG", a)?.Asset.Group.Category === "Item")
      );
      const ignoreLocks = Array.from(oldItems.values()).some((i) => i.Name === "FuturisticCollar") && Array.from(newItems.values()).some((i) => i.Name === "FuturisticCollar");
      const ignoreColors = Array.from(oldItems.values()).some((i) => i.Name === "FuturisticHarness") && Array.from(newItems.values()).some((i) => i.Name === "FuturisticHarness") || ignoreLocks;
      debug("Anti-Cheat validating bulk change from", sourceCharacter.MemberNumber);
      const newAndChanges = Array.from(newItems.keys()).reduce(
        (changes, cur) => {
          const newItem = newItems.get(cur);
          if (!newItem) {
            throw new Error("this should never happen: newItem is null inside map loop");
          }
          if (!oldItems.has(cur)) {
            if (!validateNewLockMemberNumber(sourceCharacter, newItem)) {
              changes.prohibited = true;
            }
            changes.new++;
            return changes;
          }
          const oldItem = oldItems.get(cur) ?? null;
          const result = validateSingleItemChange(sourceCharacter, oldItem, newItem, ignoreLocks, ignoreColors);
          changes.prohibited = changes.prohibited || result.prohibited;
          changes.changed += result.changed;
          return changes;
        },
        { new: 0, changed: 0, prohibited: false }
      );
      const removed = Array.from(oldItems.keys()).reduce((prev, cur) => {
        if (!newItems.has(cur)) {
          return prev + 1;
        }
        return prev;
      }, 0);
      if (newAndChanges.new + newAndChanges.changed + removed > 2 || newAndChanges.prohibited) {
        debug("Anti-Cheat tripped on bulk change from", sourceCharacter.MemberNumber, newAndChanges, removed);
        revertChanges(sourceCharacter);
        return null;
      }
      return next(args);
    }
  );
}

// src/functions/leashFix.ts
function leashFix() {
  patchFunction(
    "ChatSearchQuery",
    {
      "// Prevent spam searching the same thing.": 'if (ChatRoomJoinLeash) { SearchData.Language = ""; }\n	// Prevent spam searching the same thing.'
    },
    "Leashing between language filters"
  );
}

// src/functions/instantMessenger.js
function instantMessenger() {
  function stripBeepMetadata(msg) {
    return msg.split("\uF124")[0].trimEnd();
  }
  globalThis.bceStripBeepMetadata = stripBeepMetadata;
  const container = document.createElement("div");
  container.classList.add("bce-hidden");
  container.id = "bce-instant-messenger";
  const leftContainer = document.createElement("div");
  leftContainer.id = "bce-message-left-container";
  const friendList = document.createElement("div");
  friendList.id = "bce-friend-list";
  const rightContainer = document.createElement("div");
  rightContainer.id = "bce-message-right-container";
  const messageContainer = document.createElement("div");
  messageContainer.id = "bce-message-container";
  const messageInput = document.createElement("textarea");
  messageInput.id = "bce-message-input";
  messageInput.setAttribute("maxlength", "2000");
  messageInput.addEventListener("keydown", (e) => {
    e.stopPropagation();
  });
  const friendSearch = document.createElement("input");
  friendSearch.id = "bce-friend-search";
  friendSearch.setAttribute("placeholder", displayText("Search for a friend"));
  friendSearch.autocomplete = "off";
  friendSearch.addEventListener("keydown", (e) => {
    e.stopPropagation();
  });
  const onlineClass = "bce-friend-list-handshake-completed";
  const offlineClass = "bce-friend-list-handshake-false";
  container.appendChild(leftContainer);
  container.appendChild(rightContainer);
  leftContainer.appendChild(friendSearch);
  leftContainer.appendChild(friendList);
  rightContainer.appendChild(messageContainer);
  rightContainer.appendChild(messageInput);
  document.body.appendChild(container);
  function storageKey() {
    return `bce-instant-messenger-state-${Player.AccountName.toLowerCase()}`;
  }
  let activeChat = -1;
  let unreadSinceOpened = 0;
  let IMloaded = false;
  const friendMessages = /* @__PURE__ */ new Map();
  function scrollToBottom() {
    const friend = friendMessages.get(activeChat);
    if (friend) {
      friend.history.scrollTop = friend.history.scrollHeight;
    }
  }
  function saveHistory() {
    const history = {};
    friendMessages.forEach((friend, id) => {
      if (friend.historyRaw.length === 0) {
        return;
      }
      const historyLength = Math.min(friend.historyRaw.length, 100);
      history[id] = { historyRaw: friend.historyRaw.slice(-historyLength) };
    });
    localStorage.setItem(storageKey(), JSON.stringify(history));
  }
  function changeActiveChat(friendId) {
    const friend = friendMessages.get(friendId);
    messageInput.disabled = !friend?.online;
    messageContainer.innerHTML = "";
    for (const f of friendMessages.values()) {
      f.listElement.classList.remove("bce-friend-list-selected");
    }
    if (friend) {
      friend.listElement.classList.add("bce-friend-list-selected");
      friend.listElement.classList.remove("bce-friend-list-unread");
      messageContainer.appendChild(friend.history);
      friend.unread = 0;
    }
    const previousFriend = friendMessages.get(activeChat);
    if (previousFriend) {
      const divider = previousFriend.history.querySelector(".bce-message-divider");
      if (divider) {
        previousFriend.history.removeChild(divider);
      }
    }
    sortIM();
    activeChat = friendId;
    scrollToBottom();
  }
  function addMessage(friendId, sent, beep, skipHistory, createdAt) {
    const friend = friendMessages.get(friendId);
    if (!friend || beep.BeepType) {
      return;
    }
    const details = parseJSON(
      beep.Message?.split("\n").find((line) => line.startsWith("\uF124"))?.substring(1) ?? "{}"
    ) ?? { messageType: "Message" };
    if (!details.messageType) {
      details.messageType = "Message";
    }
    const messageType = ["Message", "Emote", "Action"].includes(details.messageType) ? details.messageType : "Message";
    const messageColor = details?.messageColor ?? "#ffffff";
    const messageText = beep.Message?.split("\n").filter((line) => !line.startsWith("\uF124")).join("\n").trimEnd();
    if (!messageText) {
      debug("skipped empty beep", friendId, beep, sent, skipHistory);
      return;
    }
    const scrolledToEnd = friend.history.scrollHeight - friend.history.scrollTop - friend.history.clientHeight < 1;
    const message = document.createElement("div");
    message.classList.add("bce-message");
    message.classList.add(sent ? "bce-message-sent" : "bce-message-received");
    message.classList.add(`bce-message-${messageType}`);
    message.setAttribute("data-time", createdAt.toLocaleString());
    const author = sent ? CharacterNickname(Player) : beep.MemberName ?? "<Unknown>";
    switch (messageType) {
      case "Emote":
        message.textContent = `*${author}${messageText}*`;
        break;
      case "Action":
        message.textContent = `*${messageText}*`;
        break;
      case "Message":
        {
          const sender = document.createElement("span");
          sender.classList.add("bce-message-sender");
          if (messageColor) {
            sender.style.color = messageColor;
          }
          sender.textContent = `${author}: `;
          message.appendChild(sender);
          message.appendChild(document.createTextNode(messageText));
        }
        break;
      default:
        message.textContent = messageText;
        break;
    }
    if (!Player.MemberNumber) {
      throw new Error("Player.MemberNumber is invalid");
    }
    let authorId = Player.MemberNumber;
    if (!sent) {
      if (!beep.MemberNumber) {
        throw new Error("beep.MemberNumber is invalid");
      }
      authorId = beep.MemberNumber;
    }
    if (!skipHistory) {
      friend.historyRaw.push({
        author,
        authorId,
        message: messageText,
        type: messageType,
        color: messageColor,
        createdAt: Date.now()
      });
      friend.listElement.setAttribute("data-last-updated", Date.now().toString());
      if (friendId !== activeChat) {
        friend.listElement.classList.add("bce-friend-list-unread");
        friend.unread++;
      }
      if (friend.unread === 1 && (container.classList.contains("bce-hidden") || friendId !== activeChat)) {
        const divider = document.createElement("div");
        divider.classList.add("bce-message-divider");
        friend.history.appendChild(divider);
      }
      if (container.classList.contains("bce-hidden")) {
        unreadSinceOpened++;
      }
    }
    processChatAugmentsForLine(message, scrolledToEnd ? scrollToBottom : () => null);
    friend.history.appendChild(message);
    if (scrolledToEnd) {
      scrollToBottom();
    }
    saveHistory();
  }
  function handleUnseenFriend(friendId) {
    let msgs = friendMessages.get(friendId);
    if (!msgs) {
      const friendData = {
        statusText: document.createElement("span"),
        listElement: document.createElement("div"),
        historyRaw: [],
        history: document.createElement("div"),
        unread: 0,
        online: false
      };
      friendData.listElement.id = `bce-friend-list-entry-${friendId}`;
      friendData.listElement.classList.add("bce-friend-list-entry");
      friendData.listElement.onclick = () => {
        changeActiveChat(friendId);
      };
      friendData.history.classList.add("bce-friend-history");
      const name = document.createElement("div");
      name.classList.add("bce-friend-list-entry-name");
      name.textContent = Player.FriendNames?.get(friendId) || "";
      friendData.listElement.appendChild(name);
      const memberNumber = document.createElement("div");
      memberNumber.classList.add("bce-friend-list-entry-member-number");
      memberNumber.textContent = friendId.toString();
      friendData.listElement.appendChild(memberNumber);
      friendData.listElement.appendChild(friendData.statusText);
      friendList.appendChild(friendData.listElement);
      friendMessages.set(friendId, friendData);
      msgs = friendData;
    }
    return msgs;
  }
  function loadIM() {
    IMloaded = true;
    const history = (
      /** @type {Record<string, {historyRaw: RawHistory[]}>} */
      parseJSON(localStorage.getItem(storageKey()) || "{}")
    );
    for (const [friendIdStr, friendHistory] of objEntries(history)) {
      const friendId = parseInt(friendIdStr);
      const friend = handleUnseenFriend(friendId);
      friend.historyRaw = friendHistory.historyRaw;
      for (const hist of friendHistory.historyRaw) {
        addMessage(
          friendId,
          hist.authorId === Player.MemberNumber,
          {
            Message: `${hist.message}

\uF124${JSON.stringify({
              messageType: hist.type,
              messageColor: hist.color
            })}`,
            MemberNumber: hist.authorId,
            MemberName: hist.author
          },
          true,
          hist.createdAt ? new Date(hist.createdAt) : /* @__PURE__ */ new Date(0)
        );
        if (hist.createdAt) {
          friend.listElement.setAttribute("data-last-updated", hist.createdAt.toString());
        }
      }
    }
  }
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (BCX?.getRuleState("speech_restrict_beep_send")?.isEnforced && !fbcSettings.allowIMBypassBCX) {
        fbcNotify(displayText("Sending beeps is currently restricted by BCX rules"));
        return;
      }
      let messageText = messageInput.value;
      if (messageText.trim() === "") {
        return;
      }
      messageInput.value = "";
      let messageType = "Message";
      if (messageText.startsWith("/me ")) {
        messageText = messageText.substring(4);
        if (!/^[', ]/u.test(messageText)) {
          messageText = ` ${messageText}`;
        }
        messageType = "Emote";
      } else if (messageText.startsWith("/action ")) {
        messageText = messageText.substring(8);
        messageType = "Action";
      } else if (/^\*[^*]/u.test(messageText)) {
        messageText = messageText.substring(1);
        if (!/^[', ]/u.test(messageText)) {
          messageText = ` ${messageText}`;
        }
        messageType = "Emote";
      } else if (messageText.startsWith("**")) {
        messageText = messageText.substring(2);
        messageType = "Action";
      }
      const message = {
        BeepType: "",
        MemberNumber: activeChat,
        IsSecret: true,
        Message: `${messageText}

\uF124${JSON.stringify({
          messageType,
          messageColor: Player.LabelColor
        })}`
      };
      addMessage(activeChat, true, message, false, /* @__PURE__ */ new Date());
      FriendListBeepLog.push({
        ...message,
        MemberName: Player.FriendNames?.get(activeChat) || "aname",
        Sent: true,
        Private: false,
        Time: /* @__PURE__ */ new Date()
      });
      ServerSend("AccountBeep", message);
    }
  });
  friendSearch.onkeyup = () => {
    const search = friendSearch.value.toLowerCase();
    for (const friendId of friendMessages.keys()) {
      const friend = friendMessages.get(friendId);
      if (!friend) {
        throw new Error("this should never happen, friend is null in map loop");
      }
      const friendName = Player.FriendNames?.get(friendId)?.toLowerCase();
      if (search === "") {
        friend.listElement.classList.remove("bce-hidden");
      } else if (!friendId.toString().includes(search) && !friendName?.includes(search)) {
        friend.listElement.classList.add("bce-hidden");
      } else {
        friend.listElement.classList.remove("bce-hidden");
      }
    }
    sortIM();
  };
  registerSocketListener("AccountQueryResult", (data) => {
    if (data.Query !== "OnlineFriends") {
      return;
    }
    if (data.Result && fbcSettings.instantMessenger) {
      for (const friend of data.Result) {
        const f = handleUnseenFriend(friend.MemberNumber);
        f.online = true;
        f.statusText.textContent = displayText("Online");
        f.listElement.classList.remove(offlineClass);
        f.listElement.classList.add(onlineClass);
      }
      for (const friendId of Array.from(friendMessages.keys()).filter((f) => !data.Result.some((f2) => f2.MemberNumber === f))) {
        const f = friendMessages.get(friendId);
        if (!f) {
          throw new Error("this should never happen, f is null in map loop");
        }
        f.online = false;
        f.statusText.textContent = displayText("Offline");
        f.listElement.classList.remove(onlineClass);
        f.listElement.classList.add(offlineClass);
      }
      if (!data.Result.some((f) => f.MemberNumber === activeChat)) {
        messageInput.disabled = true;
      } else {
        messageInput.disabled = false;
      }
    }
  });
  function sortIM() {
    [...friendList.children].sort((a, b) => {
      const notA = !a.classList.contains(onlineClass);
      const notB = !b.classList.contains(onlineClass);
      if (notA && notB || !notA && !notB) {
        const aUpdatedAt = a.getAttribute("data-last-updated") ?? "";
        const bUpdatedAt = b.getAttribute("data-last-updated") ?? "";
        const au = /^\d+$/u.test(aUpdatedAt) ? parseInt(aUpdatedAt) : 0;
        const bu = /^\d+$/u.test(bUpdatedAt) ? parseInt(bUpdatedAt) : 0;
        return bu - au;
      }
      if (notA) {
        return 1;
      }
      return -1;
    }).forEach((node) => {
      friendList.removeChild(node);
      friendList.appendChild(node);
    });
  }
  SDK.hookFunction(
    "ServerAccountBeep",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      const [beep] = args;
      if (beep && isNonNullObject(beep) && !beep.BeepType && fbcSettings.instantMessenger) {
        if (!IMloaded) loadIM();
        addMessage(beep.MemberNumber, false, beep, false, /* @__PURE__ */ new Date());
      }
      next(args);
    }
  );
  SDK.hookFunction(
    "ServerSend",
    HOOK_PRIORITIES.Observe,
    (args, next) => {
      const [command, b] = args;
      if (command !== "AccountBeep") {
        return next(args);
      }
      const beep = (
        /** @type {ServerAccountBeepRequest} */
        b
      );
      if (!beep?.BeepType && isString(beep?.Message) && !beep.Message.includes("\uF124")) {
        if (!IMloaded) loadIM();
        addMessage(beep.MemberNumber, true, beep, false, /* @__PURE__ */ new Date());
      }
      return next(args);
    }
  );
  const buttonPosition = [126, 905, 60, 60];
  SDK.hookFunction(
    "DrawProcess",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      next(args);
      if (fbcSettings.instantMessenger) {
        if (!fbcSettings.allowIMBypassBCX && (BCX?.getRuleState("speech_restrict_beep_receive")?.isEnforced || BCX?.getRuleState("alt_hide_friends")?.isEnforced && Player.GetBlindLevel() >= 3)) {
          if (!container.classList.contains("bce-hidden")) hideIM();
          DrawButton(
            ...buttonPosition,
            "",
            "Gray",
            "Icons/Small/Chat.png",
            displayText("Instant Messenger (Disabled by BCX)"),
            false
          );
        } else {
          DrawButton(
            ...buttonPosition,
            "",
            unreadSinceOpened ? "Red" : "White",
            "Icons/Small/Chat.png",
            displayText("Instant Messenger"),
            false
          );
        }
      }
    }
  );
  SDK.hookFunction(
    "CommonClick",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      if (fbcSettings.instantMessenger && MouseIn(...buttonPosition)) {
        if (!container.classList.contains("bce-hidden")) {
          hideIM();
          return;
        }
        if (!IMloaded) loadIM();
        sortIM();
        container.classList.toggle("bce-hidden");
        ServerSend("AccountQuery", { Query: "OnlineFriends" });
        unreadSinceOpened = 0;
        scrollToBottom();
        NotificationReset("Beep");
        return;
      }
      next(args);
    }
  );
  SDK.hookFunction(
    "NotificationRaise",
    HOOK_PRIORITIES.ModifyBehaviourHigh,
    (args, next) => {
      if (args[0] === "Beep" && args[1]?.body) {
        args[1].body = stripBeepMetadata(args[1].body);
      }
      return next(args);
    }
  );
  function keyHandler(e) {
    if (!fbcSettings.instantMessenger) {
      return;
    }
    if (e.key === "Escape" && !container.classList.contains("bce-hidden")) {
      hideIM();
      e.stopPropagation();
      e.preventDefault();
    }
  }
  function hideIM() {
    container.classList.add("bce-hidden");
    messageInput.blur();
    friendSearch.blur();
  }
  document.addEventListener("keydown", keyHandler, true);
  document.addEventListener("keypress", keyHandler, true);
}

// src/functions/discreetMode.ts
var ignoredImages = /(^Backgrounds\/(?!Sheet(White)?|grey|White\.|BrickWall\.)|\b(Kneel|Arousal|Activity|Asylum|Cage|Cell|ChangeLayersMouth|Diaper|Kidnap|Logo|Player|Remote|Restriction|SpitOutPacifier|Struggle|Therapy|Orgasm\d|Poses|HouseVincula|Seducer\w+)\b|^data:|^Assets\/(?!Female3DCG\/Emoticon\/(Afk|Sleep|Read|Gaming|Hearing|Thumbs(Up|Down))\/))/u;
function discreetMode() {
  SDK.hookFunction(
    "CharacterSetActivePose",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (fbcSettings.discreetMode) return null;
      return next(args);
    }
  );
  SDK.hookFunction(
    "PoseSetActive",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (fbcSettings.discreetMode) return null;
      return next(args);
    }
  );
  SDK.hookFunction(
    "DrawImageEx",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (fbcSettings.discreetMode) {
        if (!args) return false;
        if (isString(args[0]) && ignoredImages.test(args[0])) {
          if (args[0].startsWith("Backgrounds/")) {
            args[0] = "Backgrounds/BrickWall.jpg";
            return next(args);
          }
          return false;
        }
        if (args[0] instanceof HTMLCanvasElement) return false;
        if (args[0] instanceof HTMLImageElement && ignoredImages.test(args[0].src)) return false;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "ChatRoomCharacterViewDraw",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (fbcSettings.discreetMode) {
        let backgroundURL;
        const itemBackground = DrawGetCustomBackground(Player);
        if (itemBackground) {
          backgroundURL = `Backgrounds/${itemBackground}.jpg`;
        } else if (ChatRoomCustomized && ChatRoomCustomBackground) {
          return false;
        } else {
          backgroundURL = `Backgrounds/${ChatRoomData.Background}.jpg`;
        }
        if (ignoredImages.test(backgroundURL)) {
          const charCount = ChatRoomCharacterViewCharacterCount;
          const charsPerRow = ChatRoomCharacterViewCharactersPerRow;
          const viewWidth = ChatRoomCharacterViewWidth;
          const viewHeight = ChatRoomCharacterViewHeight;
          const opts = {
            inverted: Player.GraphicsSettings.InvertRoom && Player.IsInverted(),
            blur: Player.GetBlurLevel(),
            darken: DrawGetDarkFactor(),
            tints: Player.GetTints(),
            sizeMode: ChatRoomData.Custom?.SizeMode
          };
          ChatRoomCharacterViewLoopCharacters((charIdx, charX, charY, _space, roomZoom) => {
            if (charIdx % charsPerRow === 0) {
              const Y = charCount <= charsPerRow ? viewHeight * (1 - roomZoom) / 2 : 0;
              const bgRect = RectMakeRect(0, Y + charIdx * 100, viewWidth, viewHeight * roomZoom);
              DrawRoomBackground("Backgrounds/BrickWall.jpg", bgRect, opts);
            }
            DrawCharacter(ChatRoomCharacterDrawlist[charIdx], charX, charY, roomZoom);
            DrawStatus(ChatRoomCharacterDrawlist[charIdx], charX, charY, roomZoom);
            if (ChatRoomCharacterDrawlist[charIdx].MemberNumber) {
              ChatRoomCharacterViewDrawOverlay(ChatRoomCharacterDrawlist[charIdx], charX, charY, roomZoom);
            }
          });
        }
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "NotificationTitleUpdate",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (fbcSettings.discreetMode) {
        const notificationCount = NotificationGetTotalCount(NotificationAlertType.TITLEPREFIX);
        document.title = `${notificationCount > 0 ? `(${notificationCount}) ` : ""}${displayText("OnlineChat")}`;
        return null;
      }
      return next(args);
    }
  );
}

// src/functions/autoStruggle.js
function autoStruggle() {
  SDK.hookFunction(
    "StruggleFlexibilityCheck",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      if (fbcSettings.autoStruggle) {
        if (StruggleProgressFlexCircles && StruggleProgressFlexCircles.length > 0) {
          StruggleProgressFlexCircles.splice(0, 1);
          return true;
        }
      }
      return next(args);
    }
  );
  createTimer(() => {
    if (!fbcSettings.autoStruggle) {
      return;
    }
    if (typeof StruggleProgress !== "number" || StruggleProgress < 0) {
      return;
    }
    if (StruggleProgressCurrentMinigame === "Strength") {
      StruggleStrengthProcess(false);
    } else if (StruggleProgressCurrentMinigame === "Flexibility") {
      if (StruggleProgressFlexCircles && StruggleProgressFlexCircles.length > 0) {
        StruggleFlexibilityProcess(false);
      }
    }
  }, 60);
  createTimer(() => {
    if (!fbcSettings.autoStruggle) {
      return;
    }
    if (typeof StruggleProgress !== "number" || StruggleProgress < 0) {
      return;
    }
    if (StruggleProgressCurrentMinigame === "Dexterity") {
      const distMult = Math.max(
        -0.5,
        Math.min(1, (85 - Math.abs(StruggleProgressDexTarget - StruggleProgressDexCurrent)) / 75)
      );
      if (distMult > 0.5) {
        StruggleDexterityProcess();
      }
    }
  }, 0);
}

// src/functions/leashAlways.ts
function leashAlways() {
  if (fbcSettings.leashAlways) {
    enableLeashing();
  } else {
    disableLeashing();
  }
}

// src/functions/pastProfiles.js
async function pastProfiles() {
  if (!fbcSettings.pastProfiles) {
    return;
  }
  const { Dexie: Dexie2 } = await Promise.resolve().then(() => (init_import_wrapper(), import_wrapper_exports));
  const db = new Dexie2("bce-past-profiles");
  db.version(3).stores({
    profiles: "memberNumber, name, lastNick, seen, characterBundle",
    notes: "memberNumber, note, updatedAt"
  });
  ElementCreateTextArea("bceNoteInput");
  const noteInput = document.getElementById("bceNoteInput");
  noteInput.maxLength = 1e4;
  noteInput.classList.add("bce-hidden");
  const profiles = db.table("profiles");
  const notes = db.table("notes");
  async function readQuota() {
    try {
      const { quota, usage } = await navigator.storage.estimate();
      debug(`current quota usage ${usage?.toLocaleString() ?? "?"} out of maximum ${quota?.toLocaleString() ?? "?"}`);
      return { quota: quota ?? -1, usage: usage ?? 0 };
    } catch (e) {
      logError("reading storage quota information", e);
      return { quota: -1, usage: -1 };
    }
  }
  async function trimProfiles(num) {
    let list = await profiles.toArray();
    list.sort((a, b) => a.seen - b.seen);
    list = list.slice(0, num);
    debug("deleting", list);
    await profiles.bulkDelete(list.map((p) => p.memberNumber));
  }
  async function quotaSafetyCheck() {
    const { quota, usage } = await readQuota();
    if (usage / quota > 0.9) {
      logInfo(
        `storage quota above 90% utilization (${usage}/${quota}), cleaning some of the least recently seen profiles before saving new one`
      );
      await trimProfiles(10);
    }
  }
  async function saveProfile(characterBundle) {
    await quotaSafetyCheck();
    const name = characterBundle.Name;
    const nick = characterBundle.Nickname;
    const unnecessaryFields = [
      "ActivePose",
      "Inventory",
      "BlockItems",
      "LimitedItems",
      "FavoriteItems",
      "ArousalSettings",
      "OnlineSharedSettings",
      "WhiteList",
      "BlackList",
      "Crafting"
    ];
    for (const field of unnecessaryFields) {
      delete characterBundle[field];
    }
    debug(`saving profile of ${nick ?? name} (${name})`);
    try {
      await profiles.put({
        memberNumber: characterBundle.MemberNumber,
        name,
        lastNick: nick,
        seen: Date.now(),
        characterBundle: JSON.stringify(characterBundle)
      });
    } catch (e) {
      const { quota, usage } = await readQuota();
      logError(`unable to save profile (${usage}/${quota}):`, e);
    }
  }
  SDK.hookFunction(
    "ChatRoomSync",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      const [data] = args;
      if (data?.Character?.length) {
        for (const char of data.Character) {
          saveProfile(deepCopy(char));
        }
      }
      next(args);
    }
  );
  SDK.hookFunction(
    "ChatRoomSyncSingle",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      const [data] = args;
      if (data?.Character?.MemberNumber) {
        saveProfile(deepCopy(data.Character));
      }
      next(args);
    }
  );
  SDK.hookFunction(
    "InformationSheetRun",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (!InformationSheetSelection) {
        throw new Error("InformationSheetSelection is null in InformationSheetRun");
      }
      if (InformationSheetSelection.BCESeen) {
        const ctx = window.MainCanvas.getContext("2d");
        if (!ctx) {
          throw new Error("could not get canvas 2d context");
        }
        ctx.textAlign = "left";
        DrawText(
          displayText("Last seen: ") + new Date(InformationSheetSelection.BCESeen).toLocaleString(),
          1200,
          75,
          "grey",
          "black"
        );
        ctx.textAlign = "center";
      }
      return next(args);
    }
  );
  async function openCharacter(memberNumber) {
    try {
      const profile = await profiles.get(memberNumber);
      const C = CharacterLoadOnline(
        /** @type {ServerAccountDataSynced} */
        parseJSON(profile.characterBundle),
        memberNumber
      );
      C.BCESeen = profile.seen;
      if (CurrentScreen === "ChatRoom") {
        ChatRoomHideElements();
        if (ChatRoomData) {
          ChatRoomBackground = ChatRoomData.Background;
        }
      }
      InformationSheetLoadCharacter(C);
    } catch (e) {
      fbcChatNotify(displayText("No profile found"));
      logError("reading profile", e);
    }
  }
  CommandCombine({
    Tag: "profiles",
    Description: displayText("<filter> - List seen profiles, optionally searching by member number or name"),
    Action: (argums) => {
      (async (args) => {
        let list = await profiles.toArray();
        list = list.filter(
          (p) => !args || p.name.toLowerCase().includes(args) || p.memberNumber.toString().includes(args) || p.lastNick?.toLowerCase().includes(args)
        );
        list.sort((a, b) => b.seen - a.seen);
        const matches = list.length;
        list = list.slice(0, 100);
        list.sort((a, b) => -(b.lastNick ?? b.name).localeCompare(a.lastNick ?? a.name));
        const lines = list.map((p) => {
          const div = document.createElement("div");
          div.textContent = displayText("$nickAndName ($memberNumber) - Seen: $seen", {
            $nickAndName: p.lastNick ? `${p.lastNick} / ${p.name}` : p.name,
            $memberNumber: p.memberNumber.toString(),
            $seen: new Date(p.seen).toLocaleDateString()
          });
          const link = document.createElement("a");
          link.textContent = displayText("Open");
          link.href = "#";
          link.classList.add("bce-profile-open");
          link.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCharacter(p.memberNumber);
          });
          div.prepend(link);
          return div;
        });
        const header = document.createElement("h3");
        header.textContent = displayText("Saved Profiles");
        header.style.marginTop = "0";
        const footer = document.createElement("div");
        footer.textContent = displayText("showing $num most recent of $total total profiles matching search", {
          $num: list.length.toLocaleString(),
          $total: matches.toLocaleString()
        });
        fbcChatNotify([header, ...lines, footer]);
      })(argums);
    }
  });
  let inNotes = false;
  let noteUpdatedAt = 0;
  function isNote(n) {
    return isNonNullObject(n) && typeof n.note === "string";
  }
  function showNoteInput() {
    if (!InformationSheetSelection?.MemberNumber) {
      throw new Error("invalid InformationSheetSelection in notes");
    }
    inNotes = true;
    noteInput.classList.remove("bce-hidden");
    noteInput.value = "Loading...";
    notes.get(InformationSheetSelection.MemberNumber).then((note) => {
      if (isNote(note)) {
        noteInput.value = note?.note || "";
        noteUpdatedAt = note?.updatedAt || 0;
      } else {
        throw new Error("invalid note");
      }
    }).catch((reason) => {
      noteInput.value = "";
      logError("getting note", reason);
    });
  }
  SDK.hookFunction(
    "CharacterLoadOnline",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      const C = next(args);
      if (isCharacter(C) && C.MemberNumber) {
        notes.get(C.MemberNumber).then((note) => {
          C.FBCNoteExists = Boolean(isNote(note) && note.note);
        });
      }
      return C;
    }
  );
  function hideNoteInput() {
    noteInput.classList.add("bce-hidden");
    inNotes = false;
  }
  function keyHandler(e) {
    if (e.key === "Escape" && inNotes) {
      hideNoteInput();
      e.stopPropagation();
      e.preventDefault();
    }
  }
  document.addEventListener("keydown", keyHandler, true);
  document.addEventListener("keypress", keyHandler, true);
  SDK.hookFunction(
    "OnlineProfileRun",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      if (inNotes) {
        DrawText(displayText("Personal notes (only you can read these):"), 910, 105, "Black", "Gray");
        if (noteUpdatedAt) {
          drawTextFitLeft(
            displayText("Last saved: $date", { $date: new Date(noteUpdatedAt).toLocaleString() }),
            60,
            105,
            400,
            "Black",
            "Gray"
          );
        }
        ElementPositionFix("bceNoteInput", 36, 100, 160, 1790, 750);
        DrawButton(1720, 60, 90, 90, "", "White", "Icons/Accept.png", TextGet("LeaveSave"));
        DrawButton(1820, 60, 90, 90, "", "White", "Icons/Cancel.png", TextGet("LeaveNoSave"));
        return null;
      }
      DrawButton(1620, 60, 90, 90, "", "White", "Icons/Notifications.png", displayText("[WCE] Notes"));
      return next(args);
    }
  );
  SDK.hookFunction(
    "OnlineProfileClick",
    HOOK_PRIORITIES.OverrideBehaviour,
    (args, next) => {
      if (inNotes) {
        if (MouseIn(1720, 60, 90, 90)) {
          quotaSafetyCheck().then(() => {
            if (!InformationSheetSelection?.MemberNumber) {
              throw new Error("invalid InformationSheetSelection in notes");
            }
            return notes.put({
              memberNumber: InformationSheetSelection.MemberNumber,
              note: noteInput.value,
              updatedAt: Date.now()
            });
          });
          hideNoteInput();
        } else if (MouseIn(1820, 60, 90, 90)) {
          hideNoteInput();
        }
        return;
      } else if (!inNotes && MouseIn(1620, 60, 90, 90)) {
        showNoteInput();
      }
      next(args);
    }
  );
  if (navigator.storage?.persisted && !await navigator.storage.persisted()) {
    if (!await navigator.storage.persist()) {
      logWarn("Profile storage may not be persistent.");
    }
  }
}

// src/functions/pendingMessages.js
function pendingMessages() {
  function addToDictionary(dictionary, key, value) {
    if (!Array.isArray(dictionary)) {
      dictionary = [];
    }
    dictionary.push({ Tag: key, Text: value });
    return dictionary;
  }
  let nonce = 0;
  SDK.hookFunction(
    "ChatRoomMessage",
    HOOK_PRIORITIES.Observe,
    (args, next) => {
      const ret = next(args);
      if (fbcSettings.pendingMessages && args?.length && isChatMessage(args[0]) && Array.isArray(args[0].Dictionary)) {
        const [message] = args;
        const tag = message.Dictionary?.find?.((d) => d.Tag === "fbc_nonce");
        if (tag) {
          const el = document.querySelector(`[data-nonce='${tag.Text}']`);
          if (el) {
            el.remove();
          }
        }
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "ServerSend",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (fbcSettings.pendingMessages && args?.length >= 2 && args[0] === "ChatRoomChat" && isChatMessage(args[1]) && args[1].Type !== HIDDEN && !args[1].Target) {
        nonce++;
        if (nonce >= Number.MAX_SAFE_INTEGER) {
          nonce = 0;
        }
        args[1].Dictionary = addToDictionary(
          // @ts-ignore - custom dictionary Tag
          args[1].Dictionary,
          "fbc_nonce",
          nonce
        );
        const div = document.createElement("div");
        div.classList.add("ChatMessage", "bce-pending");
        div.setAttribute("data-time", ChatRoomCurrentTime());
        div.setAttribute("data-sender", Player.MemberNumber?.toString());
        div.setAttribute("data-nonce", nonce.toString());
        switch (args[1].Type) {
          case "Chat":
            {
              div.classList.add("ChatMessageChat");
              const name = document.createElement("span");
              name.classList.add("ChatMessageName");
              name.style.color = Player.LabelColor || "";
              name.textContent = CharacterNickname(Player);
              div.appendChild(name);
              div.appendChild(document.createTextNode(`: ${args[1].Content}`));
            }
            break;
          case "Emote":
          case "Action":
            div.classList.add("ChatMessageEmote");
            div.appendChild(
              document.createTextNode(
                `*${args[1].Type === "Emote" ? `${CharacterNickname(Player)}: ` : ""}${args[1].Content}*`
              )
            );
            break;
          default:
            return next(args);
        }
        const loader = document.createElement("div");
        loader.classList.add("lds-ellipsis");
        for (let i = 0; i < 4; i++) {
          const dot = document.createElement("div");
          loader.appendChild(dot);
        }
        div.appendChild(loader);
        const scroll = ElementIsScrolledToEnd("TextAreaChatLog");
        const textarea = document.getElementById("TextAreaChatLog");
        if (textarea) {
          textarea.appendChild(div);
          if (scroll) {
            ElementScrollToEnd("TextAreaChatLog");
          }
        }
      }
      return next(args);
    }
  );
}

// src/functions/hideHiddenItemsIcon.ts
function hideHiddenItemsIcon() {
  SDK.hookFunction(
    "DrawCharacter",
    HOOK_PRIORITIES.ModifyBehaviourLow,
    (args, next) => {
      const [C] = args;
      if (!C || !fbcSettings.hideHiddenItemsIcon) {
        return next(args);
      }
      const backup = C.HasHiddenItems;
      C.HasHiddenItems = false;
      const ret = next(args);
      C.HasHiddenItems = backup;
      return ret;
    }
  );
}

// src/functions/richOnlineProfile.js
function richOnlineProfile() {
  const descTextArea = "DescriptionInput";
  const descRich = "bceRichOnlineProfile";
  let originalShown = true;
  function hideOriginalTextArea() {
    const ta = document.getElementById(descTextArea);
    if (!ta) {
      return;
    }
    originalShown = false;
    ta.style.display = "none";
  }
  function showOriginalTextArea() {
    const ta = document.getElementById(descTextArea);
    if (!ta) {
      return;
    }
    originalShown = true;
    ta.style.display = "";
  }
  function enableRichTextArea() {
    hideOriginalTextArea();
    const div = document.createElement("div");
    div.id = descRich;
    div.style.overflowY = "scroll";
    div.style.overflowX = "hidden";
    div.style.overflowWrap = "break-word";
    div.style.whiteSpace = "pre-wrap";
    div.style.background = "rgb(244, 236, 216)";
    div.style.color = "rgb(45, 35, 27)";
    div.style.border = "2px solid black";
    div.style.padding = "2px";
    div.classList.add("bce-rich-textarea");
    div.textContent = InformationSheetSelection?.Description || "";
    processChatAugmentsForLine(div, () => false);
    document.body.append(div);
    resizeRichTextArea();
  }
  function resizeRichTextArea() {
    ElementPositionFix(descRich, 36, 100, 160, 1790, 750);
  }
  function disableRichTextArea() {
    const div = document.getElementById(descRich);
    if (div) {
      div.remove();
    }
    showOriginalTextArea();
  }
  SDK.hookFunction(
    "OnlineProfileLoad",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      originalShown = true;
      const ret = next(args);
      const ta = document.getElementById(descTextArea);
      if (!fbcSettings.richOnlineProfile || !ta) {
        return ret;
      }
      enableRichTextArea();
      return ret;
    }
  );
  SDK.hookFunction(
    "ChatRoomHideElements",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      disableRichTextArea();
      return next(args);
    }
  );
  const toggleEditButtonPos = (
    /** @type {const} */
    [90, 60, 90, 90]
  );
  SDK.hookFunction(
    "OnlineProfileRun",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (!fbcSettings.richOnlineProfile) {
        return next(args);
      }
      DrawButton(...toggleEditButtonPos, "", "White", "Icons/Crafting.png", displayText("Toggle Editing Mode"));
      const ret = next(args);
      if (!originalShown) {
        hideOriginalTextArea();
        resizeRichTextArea();
      }
      return ret;
    }
  );
  SDK.hookFunction(
    "OnlineProfileClick",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (!fbcSettings.richOnlineProfile) {
        return next(args);
      }
      if (MouseIn(...toggleEditButtonPos)) {
        if (originalShown) {
          enableRichTextArea();
        } else {
          disableRichTextArea();
        }
        return true;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "OnlineProfileUnload",
    HOOK_PRIORITIES.ModifyBehaviourMedium,
    (args, next) => {
      if (!originalShown) {
        disableRichTextArea();
      }
      return next(args);
    }
  );
}

// src/functions/numericArousalMeters.ts
function numericArousalMeters() {
  let isExpanded = false;
  let increasing = false;
  SDK.hookFunction(
    "DrawArousalMeter",
    HOOK_PRIORITIES.Observe,
    (args, next) => {
      const [C] = args;
      isExpanded = !!C.ArousalZoom;
      const progressTimer = C.ArousalSettings?.ProgressTimer ?? 0;
      const activityGoing = progressTimer > 0;
      const vibratorLevel = C.ArousalSettings?.VibratorLevel ?? 0;
      const vibed = vibratorLevel > 0;
      const progress = C.ArousalSettings?.Progress ?? 0;
      const vibedOnEdge = (C.IsEdged() || C.HasEffect("DenialMode")) && progress >= 95;
      increasing = activityGoing || vibed && !vibedOnEdge;
      const ret = next(args);
      isExpanded = false;
      return ret;
    }
  );
  SDK.hookFunction(
    "DrawArousalThermometer",
    HOOK_PRIORITIES.Observe,
    (args, next) => {
      const ret = next(args);
      if (fbcSettings.numericArousalMeter && isExpanded) {
        const [x, y, zoom, progress] = args;
        let color = "white";
        if (progress >= 95) {
          if (increasing) {
            color = "red";
          } else {
            color = "hotpink";
          }
        } else if (progress >= 70) {
          color = "pink";
        }
        DrawTextFit(
          progress.toLocaleString() + (increasing ? "\u2191" : " "),
          x + 50 * zoom,
          y - 30 * zoom,
          100 * zoom,
          color,
          "black"
        );
      }
      return ret;
    }
  );
}

// src/functions/nicknames.ts
function nicknames() {
  ServerCharacterNicknameRegex = /^[\p{L}0-9\p{Z}'-]+$/u;
}

// src/functions/shareAddons.ts
function shareAddons() {
  waitFor(() => ServerIsConnected && ServerPlayerIsInChatRoom());
  sendHello(null, true);
  createTimer(() => {
    const loadedAddons = bcModSdk.getModsInfo();
    if (fbcSettings.shareAddons && JSON.stringify(loadedAddons) !== JSON.stringify(Player.FBCOtherAddons) && ServerIsConnected && ServerPlayerIsInChatRoom()) {
      Player.FBCOtherAddons = loadedAddons;
      sendHello(null, true);
    }
  }, 5e3);
}

// src/functions/confirmLeave.js
function confirmLeave() {
  window.addEventListener(
    "beforeunload",
    (e) => {
      if (toySyncState.client?.connected) {
        for (const device of toySyncState.client.devices.filter((d) => d.vibrateAttributes.length > 0)) {
          device.vibrate(0);
        }
      }
      if (fbcSettings.confirmLeave) {
        e.preventDefault();
        ServerSocket.io.disconnect();
        CommonSetScreen("Character", "Relog");
        ServerSocket.io.connect();
        return e.returnValue = "Are you sure you want to leave the club?";
      }
      return null;
    },
    { capture: true }
  );
}

// src/functions/chatRoomWhisperFixes.ts
function chatRoomWhisperFixes() {
  const leaveResetTargetTimers = {};
  SDK.hookFunction(
    "ChatRoomMessageDisplay",
    HOOK_PRIORITIES.AddBehaviour,
    (args, next) => {
      if (fbcSettings.whisperTargetFixes && args[0].Type === "Action" && args[0].Sender === ChatRoomTargetMemberNumber) {
        if (["ServerLeave", "ServerBan", "ServerKick", "ServerDisconnect"].some((m) => args[0].Content.startsWith(m))) {
          leaveResetTargetTimers[args[0].Sender] = window.setTimeout(() => {
            ChatRoomSetTarget(-1);
            ChatRoomSendLocal('<span style="color: red">[WCE] Your whisper target was cleared, because they left the room for more than a minute!</span>');
          }, 60 * 1e3);
        } else if (args[0].Content.startsWith("ServerEnter")) {
          if (leaveResetTargetTimers[args[0].Sender]) {
            window.clearTimeout(leaveResetTargetTimers[args[0].Sender]);
            delete leaveResetTargetTimers[args[0].Sender];
          }
        }
      }
      return next(args);
    }
  );
  patchFunction(
    "ChatRoomSendChat",
    {
      // eslint-disable-next-line no-template-curly-in-string
      'ChatRoomSendLocal(`<span style="color: red">${TextGet("WhisperTargetGone")}</span>`);': `ChatRoomSendLocal('<span style="color: red">' + TextGet("WhisperTargetGone") + " Resetting to talk to everyone now!</span>");
        if(fbcSettingValue("whisperTargetFixes")) ChatRoomSetTarget(-1);
        `
    },
    "Resetting blush, eyes, and eyebrows after struggling"
  );
}

// src/functions/allowCustomEffects.js
async function allowCustomEffect() {
  await waitFor(() => AssetFemale3DCG?.some((a) => a.Group === "Pronouns"));
  AssetFemale3DCG.find((a) => a.Group === "Pronouns").Asset.forEach((p) => p.AllowEffect = [E.Leash, E.BlurLight]);
  await waitFor(() => Player?.Appearance?.some((a) => a.Asset.Group.Name === "Pronouns"));
  Player.Appearance.find((a) => a.Asset.Group.Name === "Pronouns").Asset.AllowEffect = [E.Leash, E.BlurLight];
}

// src/registerFunctions.ts
var incompleteFunctions = [];
async function registerFunction(func, label) {
  incompleteFunctions.push(label);
  try {
    const ret = func();
    if (ret instanceof Promise) {
      await ret;
    }
    incompleteFunctions.splice(incompleteFunctions.indexOf(label), 1);
  } catch (err) {
    const e = err;
    logError(`Error in ${label}: ${e?.toString()}
${e?.stack ?? ""}`);
  }
}
async function registerAllFunctions() {
  let funcsRegistered = "init";
  SDK.hookFunction(
    "LoginResponse",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (funcsRegistered === "init") {
        funcsRegistered = "disable";
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "LoginStatusReset",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (funcsRegistered === "disable") {
        funcsRegistered = "init";
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "GameRun",
    HOOK_PRIORITIES.Top,
    (args, next) => {
      if (funcsRegistered === "disable") {
        GameAnimationFrameId = requestAnimationFrame(GameRun);
        return null;
      }
      return next(args);
    }
  );
  SDK.hookFunction(
    "GameRunBackground",
    HOOK_PRIORITIES.Top,
    /**
     * @param {Parameters<typeof GameRunBackground>} args
     */
    (args, next) => {
      if (funcsRegistered === "disable") return null;
      return next(args);
    }
  );
  await registerFunction(functionIntegrityCheck, "functionIntegrityCheck");
  registerFunction(wceStyles, "wceStyles");
  registerFunction(commonPatches, "commonPatches");
  registerFunction(extendedWardrobe, "extendedWardrobe");
  registerFunction(allowCustomEffect, "allowCustomEffect");
  registerFunction(automaticReconnect, "automaticReconnect");
  registerFunction(hiddenMessageHandler, "hiddenMessageHandler");
  await registerFunction(bceLoadSettings, "bceLoadSettings");
  registerFunction(postSettings, "postSettings");
  registerFunction(appendSocketListenersToInit, "appendSocketListenersToInit");
  debug(fbcSettings);
  registerFunction(discreetMode, "discreetMode");
  registerFunction(beepImprovements, "beepImprovements");
  registerFunction(settingsPage, "settingsPage");
  registerFunction(alternateArousal, "alternateArousal");
  registerFunction(chatAugments, "chatAugments");
  registerFunction(automaticExpressions, "automaticExpressions");
  registerFunction(layeringMenu, "layeringMenu");
  registerFunction(cacheClearer, "cacheClearer");
  registerFunction(lockpickHelp, "lockpickHelp");
  registerFunction(commands, "commands");
  registerFunction(chatRoomOverlay, "chatRoomOverlay");
  registerFunction(privateWardrobe, "privateWardrobe");
  registerFunction(antiGarbling, "antiGarbling");
  registerFunction(autoGhostBroadcast, "autoGhostBroadcast");
  registerFunction(blindWithoutGlasses, "blindWithoutGlasses");
  registerFunction(friendPresenceNotifications, "friendPresenceNotifications");
  registerFunction(forcedClubSlave, "forcedClubSlave");
  registerFunction(instantMessenger, "instantMessenger");
  registerFunction(autoStruggle, "autoStruggle");
  registerFunction(nicknames, "nicknames");
  registerFunction(leashAlways, "leashAlways");
  registerFunction(toySync, "toySync");
  registerFunction(pastProfiles, "pastProfiles");
  registerFunction(pendingMessages, "pendingMessages");
  registerFunction(hideHiddenItemsIcon, "hideHiddenItemsIcon");
  registerFunction(itemAntiCheat, "itemAntiCheat");
  registerFunction(leashFix, "leashFix");
  registerFunction(hookBCXAPI, "hookBCXAPI");
  registerFunction(customContentDomainCheck, "customContentDomainCheck");
  registerFunction(numericArousalMeters, "numericArousalMeters");
  registerFunction(richOnlineProfile, "richOnlineProfile");
  registerFunction(shareAddons, "shareAddons");
  registerFunction(confirmLeave, "confirmLeave");
  registerFunction(chatRoomWhisperFixes, "chatRoomWhisperFixes");
  funcsRegistered = "enable";
}

// src/index.ts
await waitFor(() => typeof FUSAM === "object" && FUSAM?.present && typeof bcModSdk === "object" && !!bcModSdk);
if (globalThis.FBC_VERSION) {
  throw new Error("FBC already loaded. Skipping load.");
}
if (typeof ChatRoomCharacter === "undefined") {
  throw new Error("Bondage Club not detected. Skipping WCE initialization.");
}
GameVersion = new URLSearchParams(location.hash.slice(1)).get("version") ?? GameVersion;
globalThis.FBC_VERSION = FBC_VERSION;
globalThis.fbcDisplayText = displayText;
globalThis.fbcChatNotify = fbcChatNotify;
globalThis.fbcSendAction = fbcSendAction;
globalThis.fbcSettingValue = fbcSettingValue;
globalThis.bce_initializeDefaultExpression = () => null;
globalThis.fbcDebug = fbcDebug;
FUSAM.registerDebugMethod("WCE", () => fbcDebug(false));
await registerAllFunctions();
await fbcNotify(`Wholesome Club Extensions v${globalThis.FBC_VERSION} loaded!`);
Player.FBC = FBC_VERSION;
window.addEventListener("error", (e) => {
  pushLog("error", e.message, `${e.filename} (${e.lineno}:${e.colno})`, e.error);
});
/*! Bundled license information:

buttplug/dist/main/src/core/Logging.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)

buttplug/dist/main/src/core/Messages.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/core/Exceptions.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/core/MessageUtils.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/client/ButtplugClientDevice.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/utils/ButtplugMessageSorter.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/client/ButtplugClientConnectorException.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/client/Client.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/utils/ButtplugBrowserWebsocketConnector.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/client/ButtplugBrowserWebsocketClientConnector.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/client/ButtplugNodeWebsocketClientConnector.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/client/IButtplugClientConnector.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

buttplug/dist/main/src/index.js:
  (*!
   * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
   * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
   * project root for full license information.
   *
   * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
   *)

dexie/dist/dexie.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=wce.js.map
