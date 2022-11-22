(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/x-renderer/core/log.js
  var LogLevels = {
    OFF: 0,
    INFO: 1,
    LOG: 2,
    DEBUG: 3,
    WARN: 4,
    ERROR: 5
  };
  var Logger = class {
    constructor(options) {
      this.level = options.level || LogLevels.LOG;
    }
    setLevel(level) {
      this.level = level;
    }
    echo(fnName, message, data) {
      if (this.level <= 0 || this.level > 4) {
        return;
      }
      if (this.level === 2 && ["info"].includes(fnName)) {
        return;
      }
      if (this.level === 3 && ["log", "info"].includes(fnName)) {
        return;
      }
      if (this.level === 4 && ["log", "info", "debug"].includes(fnName)) {
        return;
      }
      if (this.level === 5 && fnName !== "error") {
        return;
      }
      const time = new Date().toLocaleString();
      let arr = [`\x1B[32m${message}\x1B[39m`, ...data, time];
      if (fnName === "error" || fnName === "warn") {
        arr = [message, ...data, time];
      }
      console[fnName].apply(console, arr);
    }
    info(fnName, action, ...data) {
      this.echo("info", fnName, data);
    }
    log(fnName, action, ...data) {
      this.echo("log", fnName, data);
    }
    debug(fnName, action, ...data) {
      this.echo("debug", fnName, data);
    }
    warn(fnName, action, ...data) {
      this.echo("warn", fnName, data);
    }
    error(fnName, action, ...data) {
      this.echo("error", fnName, data);
    }
  };
  var logger = new Logger({});
  var log_default = logger;

  // src/x-renderer/core/entry.js
  async function run(createApp2, logLevel = LogLevels.LOG) {
    log_default.setLevel(logLevel);
    log_default.info("Crearing App");
    const app = await createApp2();
    log_default.info("App starts");
    app.run();
    log_default.info("App terminated");
  }

  // src/x-renderer/core/context.js
  var Context = class {
    constructor(options) {
      this.canvas = options.canvas;
    }
  };
  Context.CURRENT = void 0;

  // src/x-renderer/renderer/renderApi.js
  var API = {
    WEBGL: 0,
    WEBGPU: 1
  };
  var MASKTYPE = {
    COLOR: "Color",
    DEPTH: "Depth",
    STENCIL: "Stencil"
  };
  var RenderApi = class {
    get ctx() {
      return Context.CURRENT;
    }
    init(options) {
    }
    setClearColor(color) {
    }
    clear(mask) {
    }
    drawIndexed(shader, indexCount) {
    }
  };
  RenderApi.CURRENT_TYPE = void 0;

  // src/backend/webgl/context.js
  var GLContext = class extends Context {
    constructor(options) {
      super(options);
      this.context = this.canvas.getContext("webgl2");
    }
  };

  // src/backend/webgpu/context.js
  var WGPUContext = class extends Context {
    constructor(options) {
      super(options);
      this.context = this.canvas.getContext("webgpu");
    }
  };

  // src/x-renderer/core/contextPubic.js
  Context.Create = function(options) {
    const api = RenderApi.CURRENT_TYPE;
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        Context.CURRENT = new GLContext(options).context;
        break;
      case API.WEBGPU:
        Context.CURRENT = new WGPUContext(options).context;
        break;
    }
  };

  // src/x-renderer/renderer/renderCommand.js
  var RenderCommand = class {
  };
  RenderCommand.Init = function(options) {
    RenderCommand.Render_API = RenderApi.Create();
    return RenderCommand.Render_API.init(options);
  };
  RenderCommand.SetClearColor = function(color) {
    RenderCommand.Render_API.setClearColor(color);
  };
  RenderCommand.Clear = function(mask) {
    RenderCommand.Render_API.clear(mask);
  };
  RenderCommand.DrawIndexed = function(shader, indexCount) {
    RenderCommand.Render_API.drawIndexed(shader, indexCount);
  };

  // node_modules/gl-matrix/esm/common.js
  var EPSILON = 1e-6;
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  var RANDOM = Math.random;
  var degree = Math.PI / 180;
  if (!Math.hypot)
    Math.hypot = function() {
      var y = 0, i = arguments.length;
      while (i--) {
        y += arguments[i] * arguments[i];
      }
      return Math.sqrt(y);
    };

  // node_modules/gl-matrix/esm/mat4.js
  var mat4_exports = {};
  __export(mat4_exports, {
    add: () => add,
    adjoint: () => adjoint,
    clone: () => clone,
    copy: () => copy,
    create: () => create,
    determinant: () => determinant,
    equals: () => equals,
    exactEquals: () => exactEquals,
    frob: () => frob,
    fromQuat: () => fromQuat,
    fromQuat2: () => fromQuat2,
    fromRotation: () => fromRotation,
    fromRotationTranslation: () => fromRotationTranslation,
    fromRotationTranslationScale: () => fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
    fromScaling: () => fromScaling,
    fromTranslation: () => fromTranslation,
    fromValues: () => fromValues,
    fromXRotation: () => fromXRotation,
    fromYRotation: () => fromYRotation,
    fromZRotation: () => fromZRotation,
    frustum: () => frustum,
    getRotation: () => getRotation,
    getScaling: () => getScaling,
    getTranslation: () => getTranslation,
    identity: () => identity,
    invert: () => invert,
    lookAt: () => lookAt,
    mul: () => mul,
    multiply: () => multiply,
    multiplyScalar: () => multiplyScalar,
    multiplyScalarAndAdd: () => multiplyScalarAndAdd,
    ortho: () => ortho,
    orthoNO: () => orthoNO,
    orthoZO: () => orthoZO,
    perspective: () => perspective,
    perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
    perspectiveNO: () => perspectiveNO,
    perspectiveZO: () => perspectiveZO,
    rotate: () => rotate,
    rotateX: () => rotateX,
    rotateY: () => rotateY,
    rotateZ: () => rotateZ,
    scale: () => scale,
    set: () => set,
    str: () => str,
    sub: () => sub,
    subtract: () => subtract,
    targetTo: () => targetTo,
    translate: () => translate,
    transpose: () => transpose
  });
  function create() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function clone(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function transpose(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a03 = a[3];
      var a12 = a[6], a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }
    return out;
  }
  function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len2 = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;
    if (len2 < EPSILON) {
      return null;
    }
    len2 = 1 / len2;
    x *= len2;
    y *= len2;
    z *= len2;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    if (a !== out) {
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotation(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len2 = Math.hypot(x, y, z);
    var s, c, t;
    if (len2 < EPSILON) {
      return null;
    }
    len2 = 1 / len2;
    x *= len2;
    y *= len2;
    z *= len2;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotationTranslation(out, q, v) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromQuat2(out, a) {
    var translation = new ARRAY_TYPE(3);
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw;
    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }
    fromRotationTranslation(out, a, translation);
    return out;
  }
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  function getRotation(out, mat) {
    var scaling = new ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }
    return out;
  }
  function fromRotationTranslationScale(out, q, v, s) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  function perspectiveNO(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }
  var perspective = perspectiveNO;
  function perspectiveZO(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = far * nf;
      out[14] = far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -near;
    }
    return out;
  }
  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
    var xScale = 2 / (leftTan + rightTan);
    var yScale = 2 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = yScale;
    out[6] = 0;
    out[7] = 0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near / (near - far);
    out[15] = 0;
    return out;
  }
  function orthoNO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  var ortho = orthoNO;
  function orthoZO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = near * nf;
    out[15] = 1;
    return out;
  }
  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len2;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];
    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len2 = 1 / Math.hypot(z0, z1, z2);
    z0 *= len2;
    z1 *= len2;
    z2 *= len2;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len2 = Math.hypot(x0, x1, x2);
    if (!len2) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len2 = 1 / len2;
      x0 *= len2;
      x1 *= len2;
      x2 *= len2;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len2 = Math.hypot(y0, y1, y2);
    if (!len2) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len2 = 1 / len2;
      y0 *= len2;
      y1 *= len2;
      y2 *= len2;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  function targetTo(out, eye, target, up) {
    var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
    var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
    var len2 = z0 * z0 + z1 * z1 + z2 * z2;
    if (len2 > 0) {
      len2 = 1 / Math.sqrt(len2);
      z0 *= len2;
      z1 *= len2;
      z2 *= len2;
    }
    var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len2 = x0 * x0 + x1 * x1 + x2 * x2;
    if (len2 > 0) {
      len2 = 1 / Math.sqrt(len2);
      x0 *= len2;
      x1 *= len2;
      x2 *= len2;
    }
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  function str(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
  }
  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  function multiplyScalarAndAdd(out, a, b, scale3) {
    out[0] = a[0] + b[0] * scale3;
    out[1] = a[1] + b[1] * scale3;
    out[2] = a[2] + b[2] * scale3;
    out[3] = a[3] + b[3] * scale3;
    out[4] = a[4] + b[4] * scale3;
    out[5] = a[5] + b[5] * scale3;
    out[6] = a[6] + b[6] * scale3;
    out[7] = a[7] + b[7] * scale3;
    out[8] = a[8] + b[8] * scale3;
    out[9] = a[9] + b[9] * scale3;
    out[10] = a[10] + b[10] * scale3;
    out[11] = a[11] + b[11] * scale3;
    out[12] = a[12] + b[12] * scale3;
    out[13] = a[13] + b[13] * scale3;
    out[14] = a[14] + b[14] * scale3;
    out[15] = a[15] + b[15] * scale3;
    return out;
  }
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
    var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
    var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
    var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
    var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
  }
  var mul = multiply;
  var sub = subtract;

  // node_modules/gl-matrix/esm/vec3.js
  var vec3_exports = {};
  __export(vec3_exports, {
    add: () => add2,
    angle: () => angle,
    bezier: () => bezier,
    ceil: () => ceil,
    clone: () => clone2,
    copy: () => copy2,
    create: () => create2,
    cross: () => cross,
    dist: () => dist,
    distance: () => distance,
    div: () => div,
    divide: () => divide,
    dot: () => dot,
    equals: () => equals2,
    exactEquals: () => exactEquals2,
    floor: () => floor,
    forEach: () => forEach,
    fromValues: () => fromValues2,
    hermite: () => hermite,
    inverse: () => inverse,
    len: () => len,
    length: () => length,
    lerp: () => lerp,
    max: () => max,
    min: () => min,
    mul: () => mul2,
    multiply: () => multiply2,
    negate: () => negate,
    normalize: () => normalize,
    random: () => random,
    rotateX: () => rotateX2,
    rotateY: () => rotateY2,
    rotateZ: () => rotateZ2,
    round: () => round,
    scale: () => scale2,
    scaleAndAdd: () => scaleAndAdd,
    set: () => set2,
    sqrDist: () => sqrDist,
    sqrLen: () => sqrLen,
    squaredDistance: () => squaredDistance,
    squaredLength: () => squaredLength,
    str: () => str2,
    sub: () => sub2,
    subtract: () => subtract2,
    transformMat3: () => transformMat3,
    transformMat4: () => transformMat4,
    transformQuat: () => transformQuat,
    zero: () => zero
  });
  function create2() {
    var out = new ARRAY_TYPE(3);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function clone2(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  function fromValues2(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function copy2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function set2(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function add2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function subtract2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  function multiply2(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }
  function scale2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function scaleAndAdd(out, a, b, scale3) {
    out[0] = a[0] + b[0] * scale3;
    out[1] = a[1] + b[1] * scale3;
    out[2] = a[2] + b[2] * scale3;
    return out;
  }
  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }
  function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
  }
  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
  }
  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len2 = x * x + y * y + z * z;
    if (len2 > 0) {
      len2 = 1 / Math.sqrt(len2);
    }
    out[0] = a[0] * len2;
    out[1] = a[1] * len2;
    out[2] = a[2] * len2;
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2];
    var bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function random(out, scale3) {
    scale3 = scale3 || 1;
    var r = RANDOM() * 2 * Math.PI;
    var z = RANDOM() * 2 - 1;
    var zScale = Math.sqrt(1 - z * z) * scale3;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale3;
    return out;
  }
  function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  function transformQuat(out, a, q) {
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    var x = a[0], y = a[1], z = a[2];
    var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
    var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  function rotateX2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateY2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateZ2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2];
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function angle(a, b) {
    var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  function zero(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  }
  function str2(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
  }
  function exactEquals2(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  function equals2(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
  }
  var sub2 = subtract2;
  var mul2 = multiply2;
  var div = divide;
  var dist = distance;
  var sqrDist = squaredDistance;
  var len = length;
  var sqrLen = squaredLength;
  var forEach = function() {
    var vec = create2();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }
      return a;
    };
  }();

  // src/x-renderer/renderer/index.js
  var Renderer = class {
  };
  var sceneData = {
    viewProjectMatrix: mat4_exports.create()
  };
  Renderer.Init = function(options) {
    return RenderCommand.Init(options);
  };
  Renderer.BeginScene = function(camera) {
    sceneData.viewProjectMatrix = camera.viewProjectionMatrix;
  };
  Renderer.EndScene = function() {
  };
  Renderer.Submit = function(shader, vao) {
    shader.setVAO(vao);
    shader.bind();
    shader.setMat4("u_ViewProjection", sceneData.viewProjectMatrix);
    RenderCommand.DrawIndexed(shader);
  };

  // src/x-renderer/core/layer.js
  var Layer = class {
    constructor(name) {
      this.name = name;
    }
    onAttach() {
    }
    onDetach() {
    }
    onUpdate(timestep) {
    }
    onEvent(ev) {
    }
  };
  var LayerStack = class {
    constructor() {
      this.layers = [];
      this.toInsertIndex = 0;
    }
    pushOverLayer(layer) {
      layer.onAttach();
      this.layers.push(layer);
    }
    popOverLayer(layer) {
      const index = this.layers.indexOf(layer, this.toInsertIndex + 1);
      if (index !== -1) {
        layer.onDetach();
        this.layers.splice(index, 1);
      }
    }
    pushLayer(layer) {
      layer.onAttach();
      this.layers.splice(this.toInsertIndex, 0, layer);
      this.toInsertIndex++;
    }
    popLayer(layer) {
      const index = this.layers.indexOf(layer);
      if (index !== -1 && index < this.toInsertIndex) {
        layer.onDetach();
        this.layers.splice(index, 1);
        this.toInsertIndex--;
      }
    }
  };

  // src/x-renderer/core/global.js
  var Global = class {
    setEventCallback(cb) {
    }
  };

  // src/x-renderer/event/event.js
  var EventCategory = {
    NONE: "NONE"
  };
  var EventType = {
    NONE: "NONE"
  };
  var Event = class {
    constructor() {
      this.handled = false;
      this.type = EventType.NONE;
      this.category = EventCategory.NONE;
    }
    getEventTypeName() {
      return this.type;
    }
  };
  var EventDispatcher = class {
    constructor(ev, type) {
      this.ev = ev;
      this.type = type;
    }
    dispatch(handler) {
      if (this.type === this.ev.getEventTypeName()) {
        this.ev.handled |= handler(this.ev);
      }
    }
  };

  // src/x-renderer/event/keyEvent.js
  EventCategory.KEY_EVENT = "KEY_EVENT";
  var KeyEvent = class extends Event {
    constructor(key) {
      super();
      this.category = EventCategory.KEY_EVENT;
      this.key = key;
    }
  };
  EventType.KEY_UP = "KEY_UP";
  var KeyUpEvent = class extends KeyEvent {
    constructor(key) {
      super(key);
      this.type = EventType.KEY_UP;
    }
  };
  EventType.KEY_DOWN = "KEY_DOWN";
  var KeyDownEvent = class extends KeyEvent {
    constructor(key) {
      super(key);
      this.type = EventType.KEY_DOWN;
    }
  };

  // src/x-renderer/event/mouseEvent.js
  EventCategory.MOUSE_EVENT = "MOUSE_EVENT";
  EventType.MOUSE_WHEEL = "MOUSE_WHEEL";
  var MouseWheelEvent = class extends Event {
    constructor(xOffset, yOffset) {
      super();
      this.xOffset = xOffset;
      this.yOffset = yOffset;
      this.category = EventCategory.MOUSE_EVENT;
      this.type = EventType.MOUSE_WHEEL;
    }
  };

  // src/platform/window.js
  var GloablWindow = class extends Global {
    constructor() {
      super();
      this.callbackHandle = () => {
      };
      window.addEventListener("keyup", (ev) => {
        const keyUpEvent = new KeyUpEvent(ev.key);
        this.callbackHandle(keyUpEvent);
      });
      window.addEventListener("keydown", (ev) => {
        const keyDownEvent = new KeyDownEvent(ev.key);
        this.callbackHandle(keyDownEvent);
      });
      window.addEventListener("wheel", (ev) => {
        const mouseWheelEvent = new MouseWheelEvent(ev.deltaX, ev.deltaY);
        this.callbackHandle(mouseWheelEvent);
      });
    }
    setEventCallback(cb) {
      this.callbackHandle = cb;
    }
  };

  // src/x-renderer/core/globalPublic.js
  Global.Create = function() {
    return new GloablWindow();
  };

  // src/x-renderer/core/application.js
  var Application = class {
    constructor(options) {
      this.layerStack = new LayerStack();
      this.global = Global.Create();
      this.global.setEventCallback(this.onEvent.bind(this));
      Context.Create(options);
    }
    async init(options) {
      await Renderer.Init(options);
    }
    pushLayer(layer) {
      this.layerStack.pushLayer(layer);
    }
    pushOverLayer(layer) {
      this.layerStack.pushOverLayer(layer);
    }
    popLayer(layer) {
      this.layerStack.popLayer(layer);
    }
    popOverLayer(layer) {
      this.layerStack.popOverLayer(layer);
    }
    onEvent(ev) {
      const length2 = this.layerStack.layers.length;
      for (let i = length2 - 1; i >= 0; i--) {
        this.layerStack.layers[i].onEvent(ev);
      }
    }
    run() {
      for (let layer of this.layerStack.layers) {
        layer.onUpdate(0);
      }
      requestAnimationFrame(() => {
        this.run();
      });
    }
  };

  // src/backend/webgl/renderApi.js
  var GLRenderApi = class extends RenderApi {
    init(options) {
      if (options.enableBlend) {
        this.ctx.enable(this.ctx.BLEND);
        this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
      }
    }
    setClearColor(color) {
      const { r, g, b, a } = color;
      this.ctx.clearColor(r, g, b, a);
    }
    clear(mask) {
      const color_bit_mask = mask[MASKTYPE.COLOR] ? this.ctx.COLOR_BUFFER_BIT : 0;
      const depth_bit_mask = mask[MASKTYPE.DEPTH] ? this.ctx.DEPTH_BUFFER_BIT : 0;
      const stencil_bit_mask = mask[MASKTYPE.STENCIL] ? this.ctx.STENCIL_BUFFER_BIT : 0;
      this.ctx.clear(color_bit_mask | depth_bit_mask | stencil_bit_mask);
    }
    drawIndexed(vao, indexCount) {
      vao.bind();
      const count = indexCount ? indexCount : vao.indexBuffer.getCount();
      this.ctx.drawElements(this.ctx.TRIANGLES, count, this.ctx.UNSIGNED_SHORT, 0);
    }
  };

  // src/backend/webgpu/renderApi.js
  var WGPURenderApi = class extends RenderApi {
    async init(options) {
      const adapter = await navigator.gpu.requestAdapter();
      const device = await adapter.requestDevice();
      const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
      this.ctx.configure({
        device,
        format: presentationFormat
      });
      Context.device = device;
    }
    setClearColor(color) {
      this.clearColor = color;
    }
    clear(mask) {
    }
    drawIndexed(shader, indexCount) {
      const commandEncoder = Context.device.createCommandEncoder();
      const renderPassDescriptor = {
        colorAttachments: [{
          view: Context.CURRENT.getCurrentTexture().createView(),
          clearValue: this.clearColor,
          loadOp: "clear",
          storeOp: "store"
        }]
      };
      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      passEncoder.setPipeline(shader.pipeline);
      shader.upload(passEncoder);
      const count = indexCount ? indexCount : shader.vao.indexBuffer.getCount();
      passEncoder.drawIndexed(count);
      passEncoder.end();
      Context.device.queue.submit([commandEncoder.finish()]);
    }
  };

  // src/x-renderer/renderer/renderApiPublic.js
  RenderApi.Create = function() {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLRenderApi();
      case API.WEBGPU:
        return new WGPURenderApi();
    }
  };

  // src/x-renderer/renderer/buffer.js
  var ShaderDataType = {
    Float: "Float",
    Float2: "Float2",
    Float3: "Float3",
    Float4: "Float4",
    Mat3: "Mat3",
    Mat4: "Mat4",
    Int: "Int",
    Int2: "Int2",
    Int3: "Int3",
    int4: "Int4"
  };
  var ShaderDataTypeSize = {
    Float: 4,
    Float2: 4 * 2,
    Float3: 4 * 3,
    Float4: 4 * 4,
    Mat3: 4 * 3 * 3,
    Mat4: 4 * 4 * 4,
    Int: 4,
    Int2: 4 * 2,
    Int3: 4 * 3,
    Int4: 4 * 4
  };
  var ShaderDataTypeCompCount = {
    Float: 1,
    Float2: 2,
    Float3: 3,
    Float4: 4,
    Mat3: 3,
    Mat4: 4,
    Int: 1,
    Int2: 2,
    Int3: 3,
    Int4: 4
  };
  var BufferElement = class {
    constructor(type, name, normalized) {
      this.name = name;
      this.type = type;
      this.size = ShaderDataTypeSize[type];
      this.offset = 0;
      this.normalized = normalized;
    }
    getComponentCount() {
      return ShaderDataTypeCompCount[this.type];
    }
  };
  var BufferLayout = class {
    get length() {
      return this.elements.length;
    }
    constructor(list) {
      this.elements = [];
      for (let item of list) {
        const { type, name, normalized = false } = item;
        const el = new BufferElement(type, name, normalized);
        this.elements.push(el);
      }
      this.stride = 0;
      this.calculateOffsetAndStride();
    }
    [Symbol.iterator]() {
      return this.elements.values();
    }
    calculateOffsetAndStride() {
      let offset = 0;
      for (let el of this.elements) {
        el.offset = offset;
        offset += el.size;
        this.stride += el.size;
      }
    }
  };
  var VertexBuffer = class {
    bind() {
    }
    unbind() {
    }
    setData(data, size) {
    }
    getLayout() {
    }
    setLayout(layout) {
    }
  };
  var IndexBuffer = class {
    bind() {
    }
    unbind() {
    }
    getCount() {
    }
  };

  // src/backend/webgl/buffer.js
  var GLVertexBuffer = class extends VertexBuffer {
    get gl() {
      return Context.CURRENT;
    }
    constructor(data, offset = 0) {
      super();
      if (!(data instanceof Float32Array)) {
        data = new Float32Array(data);
      }
      this.id = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.DYNAMIC_DRAW, offset);
    }
    bind() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
    }
    unbind() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }
    setData(data, dstOffset = 0, srcOffset = 0, size) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id);
      this.gl.bufferSubData(this.gl.ARRAY_BUFFER, dstOffset, data, srcOffset, size);
    }
    getLayout() {
      return this.layout;
    }
    setLayout(layout) {
      this.layout = layout;
    }
  };
  var GLIndexBuffer = class extends IndexBuffer {
    get gl() {
      return Context.CURRENT;
    }
    constructor(data, count) {
      super();
      if (!(data instanceof Uint16Array)) {
        data = new Uint16Array(data);
      }
      this.id = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.id);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
      this.count = count ? count : data.length;
    }
    bind() {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.id);
    }
    unbind() {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, 0);
    }
    getCount() {
      return this.count;
    }
  };

  // src/backend/webgpu/buffer.js
  var WGPUVertexBuffer = class extends VertexBuffer {
    get device() {
      return Context.device;
    }
    constructor(data) {
      super();
      if (!(data instanceof Float32Array)) {
        data = new Float32Array(data);
      }
      const buffer = this.device.createBuffer({
        size: data.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        mappedAtCreation: true
      });
      new Float32Array(buffer.getMappedRange()).set(data);
      buffer.unmap();
      this.buffer = buffer;
    }
    bind(passEncoder, index) {
      passEncoder.setVertexBuffer(index, this.buffer);
    }
    unbind() {
    }
    setData(data) {
    }
    getLayout() {
      return this.layout;
    }
    setLayout(layout) {
      this.layout = layout;
    }
  };
  var WGPUIndexBuffer = class extends IndexBuffer {
    get device() {
      return Context.device;
    }
    constructor(data, count) {
      super();
      if (!(data instanceof Uint32Array)) {
        data = new Uint32Array(data);
      }
      const buffer = this.device.createBuffer({
        size: data.byteLength,
        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
        mappedAtCreation: true
      });
      new Uint32Array(buffer.getMappedRange()).set(data);
      buffer.unmap();
      this.buffer = buffer;
      this.count = count ? count : data.length;
    }
    bind(passEncoder) {
      passEncoder.setIndexBuffer(this.buffer, "uint32");
    }
    unbind() {
    }
    getCount() {
      return this.count;
    }
  };

  // src/x-renderer/renderer/bufferPublic.js
  VertexBuffer.Create = function(data, offset) {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLVertexBuffer(data, offset);
      case API.WEBGPU:
        return new WGPUVertexBuffer(data, offset);
    }
  };
  IndexBuffer.Create = function(data) {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLIndexBuffer(data);
      case API.WEBGPU:
        return new WGPUIndexBuffer(data);
    }
  };

  // src/x-renderer/renderer/vertexArray.js
  var VertexArray = class {
    bind() {
    }
    unbind() {
    }
    addVertexBuffer(vertexBuffer) {
    }
    setIndexBuffer(indexBuffer) {
    }
  };

  // src/backend/webgl/vertexArray.js
  var GLVertexArray = class extends VertexArray {
    get gl() {
      return Context.CURRENT;
    }
    constructor() {
      super();
      this.id = this.gl.createVertexArray();
      this.vertexBufferIndex = 0;
      this.vertexBuffers = [];
      this.indexBuffer = void 0;
    }
    bind() {
      this.gl.bindVertexArray(this.id);
    }
    unbind() {
      this.gl.bindVertexArray(null);
    }
    addVertexBuffer(vertexBuffer) {
      const layout = vertexBuffer.getLayout();
      if (layout.length > 0) {
        this.gl.bindVertexArray(this.id);
        vertexBuffer.bind();
        for (let el of layout) {
          switch (el.type) {
            case ShaderDataType.Float:
            case ShaderDataType.Float2:
            case ShaderDataType.Float3:
            case ShaderDataType.Float4: {
              this.gl.enableVertexAttribArray(this.vertexBufferIndex);
              this.gl.vertexAttribPointer(this.vertexBufferIndex, el.getComponentCount(), this.gl.FLOAT, el.normalized, layout.stride, el.offset);
              this.vertexBufferIndex++;
              break;
            }
            case ShaderDataType.Int:
            case ShaderDataType.Int2:
            case ShaderDataType.Int3:
            case ShaderDataType.int4: {
              this.gl.enableVertexAttribArray(this.vertexBufferIndex);
              this.gl.vertexAttribIPointer(this.vertexBufferIndex, el.getComponentCount(), this.gl.INT, layout.stride, el.offset);
              this.vertexBufferIndex++;
              break;
            }
            case ShaderDataType.Mat3:
            case ShaderDataType.Mat4: {
              const count = el.getComponentCount();
              for (let i = 0; i < count; i++) {
                this.gl.enableVertexAttribArray(this.vertexBufferIndex);
                this.gl.vertexAttribPointer(this.vertexBufferIndex, count, this.gl.FLOAT, layout.stride, el.offset + 4 * i * count);
                this.gl.vertexAttribDivisor(this.vertexBufferIndex, 1);
                this.vertexBufferIndex++;
              }
              break;
            }
          }
        }
        this.vertexBuffers.push(vertexBuffer);
      }
    }
    setIndexBuffer(indexBuffer) {
      this.gl.bindVertexArray(this.id);
      indexBuffer.bind();
      this.indexBuffer = indexBuffer;
    }
  };

  // src/backend/webgpu/vertexArray.js
  var WGPUVertexArray = class extends VertexArray {
    get device() {
      return Context.device;
    }
    get vertexBufferDesc() {
      return this.vertexBuffers.map((item) => item.desc);
    }
    constructor() {
      super();
      this.vertexBufferIndex = 0;
      this.vertexBuffers = [];
      this.indexBuffer = void 0;
    }
    bind() {
    }
    unbind() {
    }
    upload(passEncoder) {
      for (let i = 0; i < this.vertexBuffers.length; i++) {
        this.vertexBuffers[i].vBuffer.bind(passEncoder, i);
      }
      this.indexBuffer.bind(passEncoder);
    }
    addVertexBuffer(vertexBuffer) {
      const layout = vertexBuffer.getLayout();
      if (layout.length > 0) {
        let bufferDesc = {
          attributes: [],
          arrayStride: layout.stride,
          stepMode: "vertex"
        };
        let attribDesc;
        for (let el of layout) {
          switch (el.type) {
            case ShaderDataType.Float:
            case ShaderDataType.Float2:
            case ShaderDataType.Float3:
            case ShaderDataType.Float4: {
              attribDesc = {
                shaderLocation: this.vertexBufferIndex,
                offset: el.offset,
                format: el.getComponentCount() > 1 ? `float32x${el.getComponentCount()}` : "float32"
              };
              bufferDesc.attributes.push(attribDesc);
              this.vertexBufferIndex++;
              break;
            }
            case ShaderDataType.Int:
            case ShaderDataType.Int2:
            case ShaderDataType.Int3:
            case ShaderDataType.Int4: {
              attribDesc = {
                shaderLocation: this.vertexBufferIndex,
                offset: el.offset,
                format: el.getComponentCount() > 1 ? `sint32x${el.getComponentCount()}` : "sint32"
              };
              bufferDesc.attributes.push(attribDesc);
              this.vertexBufferIndex++;
              break;
            }
            case ShaderDataType.Mat3:
            case ShaderDataType.Mat4: {
              const count = el.getComponentCount();
              for (let i = 0; i < count; i++) {
                attribDesc = {
                  shaderLocation: this.vertexBufferIndex,
                  offset: el.offset + 4 * count * i,
                  format: "float32x4"
                };
                bufferDesc.attributes.push(attribDesc);
                this.vertexBufferIndex++;
              }
              break;
            }
          }
        }
        this.vertexBuffers.push({
          desc: bufferDesc,
          vBuffer: vertexBuffer
        });
      }
    }
    setIndexBuffer(indexBuffer) {
      this.indexBuffer = indexBuffer;
    }
  };

  // src/x-renderer/renderer/vertexArrayPublic.js
  VertexArray.Create = function() {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLVertexArray();
      case API.WEBGPU:
        return new WGPUVertexArray();
    }
  };

  // src/x-renderer/renderer/shader.js
  var Shader = class {
    setVAO(vao) {
    }
    bind() {
    }
    unbind() {
    }
    allocVar(name, loc) {
    }
    setInt(name, value) {
    }
    setIntArray(name, value) {
    }
    setFloat(name, value) {
    }
    setFloat2(name, value) {
    }
    setFloat3(name, value) {
    }
    setFloat4(name, value) {
    }
    setMat4(name, value) {
    }
  };

  // src/backend/webgl/shader.js
  var GLShader = class extends Shader {
    get gl() {
      return Context.CURRENT;
    }
    constructor(vertexSrc, fragmentSrc) {
      super();
      this.varLocs = {};
      this.createProgram(vertexSrc, fragmentSrc);
    }
    createProgram(vSrc, fSrc) {
      const program = this.gl.createProgram();
      this.shaders = [];
      const vShaderId = this.gl.createShader(this.gl.VERTEX_SHADER);
      this.gl.shaderSource(vShaderId, vSrc);
      this.gl.compileShader(vShaderId);
      if (!this.gl.getShaderParameter(vShaderId, this.gl.COMPILE_STATUS)) {
        const info = this.gl.getShaderInfoLog(vShaderId);
        log_default.error("compile vertexShader", "", info);
      }
      this.gl.attachShader(program, vShaderId);
      this.shaders.push(vShaderId);
      const fShaderId = this.gl.createShader(this.gl.FRAGMENT_SHADER);
      this.gl.shaderSource(fShaderId, fSrc);
      this.gl.compileShader(fShaderId);
      if (!this.gl.getShaderParameter(fShaderId, this.gl.COMPILE_STATUS)) {
        const info = this.gl.getShaderInfoLog(fShaderId);
        log_default.error("compile fragmentShader", "", info);
      }
      this.gl.attachShader(program, fShaderId);
      this.shaders.push(fShaderId);
      this.gl.linkProgram(program);
      if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
        const info = this.gl.getProgramInfoLog(program);
        log_default.error("linkProgram", "", info);
        this.gl.deleteProgram(program);
      }
      for (let shader of this.shaders) {
        this.gl.deleteShader(shader);
      }
      this.id = program;
    }
    setVAO(vao) {
      this.vao = vao;
    }
    allocVar(name, loc) {
      loc = this.gl.getUniformLocation(this.id, name);
      this.allocVar[name] = loc;
    }
    bind() {
      this.gl.useProgram(this.id);
      if (this.vao) {
        this.vao.bind();
      }
    }
    unbind() {
      this.gl.useProgram(0);
    }
    setInt(name, value) {
      this.uploadUniformInt(name, value);
    }
    uploadUniformInt(name, value) {
      const loc = this.allocVar[name];
      this.gl.uniform1i(loc, value);
    }
    setIntArray(name, value) {
      this.uploadUniformIntArray(name, value);
    }
    uploadUniformIntArray(name, value) {
      const loc = tthis.allocVar[name];
      this.gl.uniform1iv(loc, value);
    }
    setFloat(name, value) {
      this.uploadUniformFloat(name, value);
    }
    uploadUniformFloat(name, value) {
      const loc = this.allocVar[name];
      this.gl.uniform1f(loc, value);
    }
    setFloat2(name, value) {
      this.uploadUniformFloat2(name, value);
    }
    uploadUniformFloat2(name, value) {
      const loc = this.allocVar[name];
      this.gl.uniform2fv(loc, value);
    }
    setFloat3(name, value) {
      this.uploadUniformFloat3(name, value);
    }
    uploadUniformFloat3(name, value) {
      const loc = this.allocVar[name];
      this.gl.uniform3fv(loc, value);
    }
    setFloat4(name, value) {
      this.uploadUniformFloat4(name, value);
    }
    uploadUniformFloat4(name, value) {
      const loc = this.allocVar[name];
      this.gl.uniform4fv(loc, value);
    }
    setMat4(name, value) {
      this.uploadUniformMat4(name, value);
    }
    uploadUniformMat4(name, value) {
      const loc = this.allocVar[name];
      this.gl.uniformMatrix4fv(loc, false, value);
    }
  };

  // src/backend/webgpu/shader.js
  var WGPUShader = class extends Shader {
    get device() {
      return Context.device;
    }
    get pipeline() {
      if (!this._pipeline) {
        this.pipelineDesc.vertex.buffers = this.vao.vertexBufferDesc;
        this._pipeline = this.device.createRenderPipeline(this.pipelineDesc);
      }
      return this._pipeline;
    }
    get bindGroup() {
      if (!this._bindGroup) {
        const entries = [];
        this.bindings.forEach((value, key) => {
          if (value.type === ShaderDataType.Mat4) {
            entries[value.index] = {
              binding: value.index,
              resource: { buffer: value.buffer }
            };
          }
        });
        this._bindGroup = this.device.createBindGroup({
          layout: this.pipeline.getBindGroupLayout(0),
          entries
        });
      }
      return this._bindGroup;
    }
    constructor(vertexSrc, fragmentSrc, vertexEntry = "main", fragmentEntry = "main") {
      super();
      this.pipelineDesc = {
        layout: "auto",
        primitive: {
          frontFace: "ccw",
          cullMode: "none",
          topology: "triangle-list"
        }
      };
      this.createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry);
      this.bindings = /* @__PURE__ */ new Map();
    }
    createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry) {
      const vShaderModule = this.device.createShaderModule({ code: vertexSrc });
      const vertexDesc = {
        module: vShaderModule,
        entryPoint: vertexEntry
      };
      this.pipelineDesc.vertex = vertexDesc;
      const fShaderModule = this.device.createShaderModule({ code: fragmentSrc });
      const fragmentDesc = {
        module: fShaderModule,
        entryPoint: fragmentEntry,
        targets: [{
          format: navigator.gpu.getPreferredCanvasFormat()
        }]
      };
      this.pipelineDesc.fragment = fragmentDesc;
    }
    setMat4(name, value) {
      if (!this.bindings.get(name) || this.bindings.get(name).type !== ShaderDataType.Mat4) {
        this.bindings.set(name, {
          index: this.bindings.size,
          type: ShaderDataType.Mat4,
          buffer: this.device.createBuffer({
            size: ShaderDataTypeSize[ShaderDataType.Mat4],
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
          })
        });
      }
      if (!(value instanceof Float32Array)) {
        value = new Float32Array(value);
      }
      const entry = this.bindings.get(name);
      entry.data = value;
    }
    uploadUniformMat4(name, value) {
      const { buffer, data } = this.bindings.get(name);
      this.device.queue.writeBuffer(buffer, 0, data, 0, data.length);
    }
    setVAO(vao) {
      this.vao = vao;
    }
    upload(passEncoder) {
      this.vao.upload(passEncoder);
      for (const [key, value] of this.bindings.entries()) {
        if (value.type === ShaderDataType.Mat4) {
          this.uploadUniformMat4(key);
        }
      }
      passEncoder.setBindGroup(0, this.bindGroup);
    }
    bind() {
    }
    unbind() {
    }
  };

  // src/x-renderer/renderer/shaderPublic.js
  Shader.Create = function(vertexShaderSrc, fragmentShaderSrc) {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLShader(vertexShaderSrc, fragmentShaderSrc);
      case API.WEBGPU:
        return new WGPUShader(vertexShaderSrc, fragmentShaderSrc);
    }
  };
  var ShaderLibrary = class {
    constructor() {
      this.shaders = /* @__PURE__ */ new Map();
    }
    async load(name, path) {
      const text = await fetch(path).then((res) => res.text());
      const shaderSource = this.preProcess(text);
      const shader = Shader.Create(shaderSource.vertex, shaderSource.fragment);
      this.shaders.set(name, shader);
      return shader;
    }
    preProcess(text) {
      const reg = new RegExp(/#type ([a-z]+)(?:\s+)/, "g");
      let e = reg.exec(text);
      const ret = {};
      let startIndex = 0;
      let endIndex = 0;
      let type = "";
      while (e) {
        endIndex = e.index;
        if (endIndex > startIndex) {
          ret[type] = text.substring(startIndex, endIndex);
        }
        type = e[1];
        startIndex = endIndex + e[0].length;
        e = reg.exec(text);
      }
      ret[type] = text.substring(startIndex);
      return ret;
    }
    get(name) {
      return this.shaders.get(name);
    }
  };

  // src/x-renderer/renderer/texture.js
  var Texture = class {
    bind(slot) {
    }
    setData(data, width, height) {
    }
  };

  // src/backend/webgl/texture.js
  var GLTexture = class extends Texture {
    get gl() {
      return Context.CURRENT;
    }
    constructor(width, height) {
      super(width, height);
      this.width = width;
      this.height = height;
      this.internalFormat = this.gl.RGBA8;
      this.dataFormat = this.gl.RGBA;
      this.id = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
      this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, this.internalFormat, width, height);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    }
    setData(data) {
      this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, this.dataFormat, this.gl.UNSIGNED_BYTE, data);
    }
    bind(slots) {
      this.gl.activeTexture(this.gl[`TEXTURE${slots.tex}`]);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    }
  };

  // src/x-renderer/renderer/texturePublic.js
  Texture.Create = function(width, height) {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLTexture(width, height);
    }
  };

  // src/x-renderer/renderer/orthoCamera.js
  var OrthoCamera = class {
    constructor(left, right, bottom, top) {
      this.position = vec3_exports.create();
      this.rad = 0;
      this.viewMatrix = mat4_exports.create();
      this.projectionMatrix = mat4_exports.create();
      this.viewProjectionMatrix = mat4_exports.create();
      mat4_exports.ortho(this.projectionMatrix, left, right, bottom, top, -1, 1);
      mat4_exports.mul(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
    }
    setPostion(x, y, z) {
      this.position = vec3_exports.fromValues(x, y, z);
      this.recalculateViewMatrix();
    }
    setRotation(rad) {
      this.rotation = rad;
      this.recalculateViewMatrix();
    }
    setProjection(left, right, bottom, top) {
      mat4_exports.ortho(this.projectionMatrix, left, right, bottom, top, -1, 1);
      mat4_exports.mul(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
    }
    recalculateViewMatrix() {
      const rotation = mat4_exports.create();
      mat4_exports.rotate(rotation, mat4_exports.create(), this.rotation, vec3_exports.fromValues(0, 0, 1));
      const translation = mat4_exports.create();
      mat4_exports.translate(translation, mat4_exports.create(), this.position);
      mat4_exports.mul(this.viewMatrix, translation, rotation);
      mat4_exports.mul(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
    }
  };

  // src/x-renderer/renderer/orthoCameraController.js
  var OrthoCameraController = class {
    constructor(aspectRatio, canRotate) {
      this.zoomLevel = 1;
      this.aspectRatio = aspectRatio;
      this.canRotate = canRotate;
      this.camera = new OrthoCamera(-this.aspectRatio * this.zoomLevel, this.aspectRatio * this.zoomLevel, -this.zoomLevel, this.zoomLevel);
    }
    onEvent(ev) {
      const dispatcher = new EventDispatcher(ev, EventType.MOUSE_WHEEL);
      dispatcher.dispatch(this.onMouseWheel.bind(this));
    }
    onMouseWheel(ev) {
      let offset = 0.25 * (ev.yOffset < 0 ? 1 : -1);
      this.zoomLevel += offset;
      this.camera.setProjection(-this.aspectRatio * this.zoomLevel, this.aspectRatio * this.zoomLevel, -this.zoomLevel, this.zoomLevel);
      return false;
    }
  };

  // src/index.js
  var src_default = run;

  // sandbox/src/exampleLayer.js
  var ExampleLayer = class extends Layer {
    constructor() {
      super("example_layer");
      this.shaderLibrary = new ShaderLibrary();
    }
    async initResource() {
      const vertexArray = VertexArray.Create();
      const vertices = [
        -0.5,
        -0.5,
        0,
        0,
        0,
        0.5,
        -0.5,
        0,
        1,
        0,
        0.5,
        0.5,
        0,
        1,
        1,
        -0.5,
        0.5,
        0,
        0,
        1
      ];
      this.cameraController = new OrthoCameraController(2, false);
      const vertexBuffer = VertexBuffer.Create(vertices);
      const layout = new BufferLayout([
        { type: ShaderDataType.Float3, name: "a_Position" },
        { type: ShaderDataType.Float2, name: "a_TexCoord" }
      ]);
      vertexBuffer.setLayout(layout);
      vertexArray.addVertexBuffer(vertexBuffer);
      const indices = [0, 1, 2, 2, 3, 0];
      const indexBuffer = IndexBuffer.Create(indices);
      vertexArray.setIndexBuffer(indexBuffer);
      this.vertexArray = vertexArray;
      await this.shaderLibrary.load("triangle", "assets/shaders/triangle.wgsl");
    }
    onEvent(ev) {
      this.cameraController.onEvent(ev);
    }
    onUpdate(timestep) {
      RenderCommand.SetClearColor({ r: 0.1, g: 0.1, b: 0.1, a: 1 });
      RenderCommand.Clear({
        [MASKTYPE.COLOR]: true,
        [MASKTYPE.DEPTH]: false,
        [MASKTYPE.STENCIL]: false
      });
      Renderer.BeginScene(this.cameraController.camera);
      Renderer.Submit(this.shaderLibrary.get("triangle"), this.vertexArray);
      Renderer.EndScene();
    }
  };

  // sandbox/src/sandboxApp.js
  var SandboxApp = class extends Application {
    async init(options) {
      await super.init(options);
      const exampleLayer = new ExampleLayer();
      await exampleLayer.initResource();
      this.pushLayer(exampleLayer);
    }
  };
  async function createApp() {
    const canvas = document.getElementById("canvas");
    RenderApi.CURRENT_TYPE = API.WEBGPU;
    const app = new SandboxApp({ canvas });
    await app.init({
      enableBlend: true
    });
    return app;
  }

  // sandbox/src/index.js
  src_default(createApp, LogLevels.INFO);
})();
