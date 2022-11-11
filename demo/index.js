(() => {
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
    drawIndexed(vao, indexCount) {
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
  var GPUContext = class extends Context {
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
      case API.WEBGPU:
        Context.CURRENT = new GPUContext(options).context;
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
  RenderCommand.DrawIndexed = function(vao, indexCount) {
    RenderCommand.Render_API.drawIndexed(vao, indexCount);
  };

  // src/x-renderer/renderer/index.js
  var Renderer = class {
  };
  Renderer.Init = function(options) {
    return RenderCommand.Init(options);
  };
  Renderer.Submit = function(shader, vao) {
    shader.bind();
    vao.bind();
    RenderCommand.DrawIndexed(vao);
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
    onEvent(event) {
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

  // src/x-renderer/core/application.js
  var Application = class {
    constructor(options) {
      this.layerStack = new LayerStack();
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
    run() {
      for (let layer of this.layerStack.layers) {
        layer.onUpdate(0);
      }
    }
  };

  // src/backend/webgl/renderApi.js
  var GLRenderApi = class extends RenderApi {
    init(options) {
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
  var GPURenderApi = class extends RenderApi {
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
    drawIndexed(vao, indexCount) {
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
      passEncoder.setPipeline(Context.CURRENT_SHADER.pipeline);
      vao.upload(passEncoder);
      const count = indexCount ? indexCount : vao.indexBuffer.getCount();
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
        return new GPURenderApi();
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
  var GPUVertexBuffer = class extends VertexBuffer {
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
  var GPUIndexBuffer = class extends IndexBuffer {
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
        return new GPUVertexBuffer(data, offset);
    }
  };
  IndexBuffer.Create = function(data) {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLIndexBuffer(data);
      case API.WEBGPU:
        return new GPUIndexBuffer(data);
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
  var GPUVertexArray = class extends VertexArray {
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
      Context.CURRENT_VAO = this;
    }
    unbind() {
      Context.CURRENT_VAO = void 0;
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
        return new GPUVertexArray();
    }
  };

  // src/x-renderer/renderer/shader.js
  var Shader = class {
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
    constructor(name, vertexSrc, fragmentSrc) {
      super();
      this.name = name;
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
    allocVar(name, loc) {
      loc = this.gl.getUniformLocation(this.id, name);
      this.allocVar[name] = loc;
    }
    bind() {
      this.gl.useProgram(this.id);
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
      this.gl.uniformMatrix4fv(loc, value);
    }
  };

  // src/backend/webgpu/shader.js
  var GPUShader = class extends Shader {
    get device() {
      return Context.device;
    }
    get pipeline() {
      if (!this._pipeline) {
        this.pipelineDesc.vertex.buffers = Context.CURRENT_VAO.vertexBufferDesc;
        this._pipeline = this.device.createRenderPipeline(this.pipelineDesc);
      }
      return this._pipeline;
    }
    constructor(name, vertexSrc, fragmentSrc, vertexEntry = "main", fragmentEntry = "main") {
      super();
      this.name = name;
      this.pipelineDesc = {
        layout: "auto",
        primitive: {
          frontFace: "ccw",
          cullMode: "none",
          topology: "triangle-list"
        }
      };
      this.createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry);
    }
    createShaderDesc(vertexSrc, vertexEntry, fragmentSrc, fragmentEntry) {
      this.device.pushErrorScope("validation");
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
    bind() {
      Context.CURRENT_SHADER = this;
    }
    unbind() {
      Context.CURRENT_SHADER = void 0;
    }
  };

  // src/x-renderer/renderer/shaderPublic.js
  Shader.Create = function(name, vertexShaderSrc, fragmentShaderSrc) {
    switch (RenderApi.CURRENT_TYPE) {
      case API.WEBGL:
        return new GLShader(name, vertexShaderSrc, fragmentShaderSrc);
      case API.WEBGPU:
        return new GPUShader(name, vertexShaderSrc, fragmentShaderSrc);
    }
  };

  // src/index.js
  var src_default = run;

  // sandbox/exampleLayer.js
  var ExampleLayer = class extends Layer {
    constructor() {
      super("example_layer");
      const vertexArray = VertexArray.Create();
      const vertices = [
        -0.5,
        -0.5,
        0,
        0.5,
        -0.5,
        0,
        0,
        0.5,
        0
      ];
      const vertexBuffer = VertexBuffer.Create(vertices);
      const layout = new BufferLayout([
        { type: ShaderDataType.Float3, name: "a_Position" }
      ]);
      vertexBuffer.setLayout(layout);
      vertexArray.addVertexBuffer(vertexBuffer);
      const indices = [0, 1, 2];
      const indexBuffer = IndexBuffer.Create(indices);
      vertexArray.setIndexBuffer(indexBuffer);
      const vertexShaderSource = `struct VertexOutput {
                @builtin(position) Position : vec4<f32>,
                @location(0) fragPosition : vec3<f32>,
            }
            @vertex
            fn main(
                @location(0) position : vec3<f32>
            ) -> VertexOutput {
                var output: VertexOutput;
                output.Position = vec4(position, 1.0);
                output.fragPosition = position;
                return output;
            }`;
      const fragmentShaderSource = `
            @fragment
            fn main(
                @location(0) fragPosition : vec3<f32>,
            ) -> @location(0) vec4<f32> {
                return vec4(fragPosition * 0.5 + 0.5, 1.0);
            }
        `;
      const shader = Shader.Create("VertexPosColor", vertexShaderSource, fragmentShaderSource);
      this.vertexArray = vertexArray;
      this.shader = shader;
    }
    onUpdate(timestep) {
      RenderCommand.SetClearColor({ r: 0.1, g: 0.1, b: 0.1, a: 1 });
      RenderCommand.Clear({
        [MASKTYPE.COLOR]: true,
        [MASKTYPE.DEPTH]: false,
        [MASKTYPE.STENCIL]: false
      });
      Renderer.Submit(this.shader, this.vertexArray);
    }
  };

  // sandbox/sandboxApp.js
  var SandboxApp = class extends Application {
    async init(options) {
      await super.init(options);
      this.pushLayer(new ExampleLayer());
    }
  };
  async function createApp() {
    const canvas = document.getElementById("canvas");
    RenderApi.CURRENT_TYPE = API.WEBGPU;
    const app = new SandboxApp({ canvas });
    await app.init({});
    return app;
  }

  // sandbox/index.js
  src_default(createApp, LogLevels.INFO);
})();
