import { Shader } from '../../x-renderer/renderer/shader';
import { Context } from '../../x-renderer/core/context';
import logger from '../../x-renderer/core/log';

export class GLShader extends Shader {
    get gl() { return Context.CURRENT; }

    constructor(vertexSrc, fragmentSrc) {
        super();
        this.varLocs = {};
        this.createProgram(vertexSrc, fragmentSrc);
    }

    createProgram(vSrc, fSrc) {
        const program = this.gl.createProgram();
        this.shaders = [];
        // vertex shader
        const vShaderId = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vShaderId, vSrc);
        this.gl.compileShader(vShaderId);
        if (!this.gl.getShaderParameter(vShaderId, this.gl.COMPILE_STATUS)) {
            const info = this.gl.getShaderInfoLog(vShaderId)
            logger.error('compile vertexShader', '', info);
        }
        this.gl.attachShader(program, vShaderId);
        this.shaders.push(vShaderId);

        // fragment shader
        const fShaderId = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fShaderId, fSrc);
        this.gl.compileShader(fShaderId);
        if (!this.gl.getShaderParameter(fShaderId, this.gl.COMPILE_STATUS)) {
            const info = this.gl.getShaderInfoLog(fShaderId)
            logger.error('compile fragmentShader', '', info);
        }
        this.gl.attachShader(program, fShaderId);
        this.shaders.push(fShaderId);

        // link
        this.gl.linkProgram(program);
        if(!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const info = this.gl.getProgramInfoLog(program);
            logger.error('linkProgram', '', info);
            this.gl.deleteProgram(program);
        }

        for(let shader of this.shaders) {
            // this.gl.detachShader(program, shader);
            this.gl.deleteShader(shader)
        }

        this.id = program;
    }

    setVAO(vao) {
        this.vao = vao;
    }

    bind() {
        this.gl.useProgram(this.id);
        if(this.vao) {
            this.vao.bind();
        }
    }
    unbind() {
        this.gl.useProgram(0);
    }

    setTexture(tex, loc = 0) {
        tex.bind(loc);
        this.setInt(tex.name, loc);
    }

    setInt(name, value) {
        this.uploadUniformInt(name, value);
    }
    uploadUniformInt(name, value) {
        if(!this.allocVar[name]) {
            this.allocVar[name] = this.gl.getUniformLocation(this.id, name);
        }
        const loc = this.allocVar[name];
        this.gl.uniform1i(loc, value);
    }

    setIntArray(name, value) {
        this.uploadUniformIntArray(name, value);
    }
    uploadUniformIntArray(name, value) {
        if(!this.allocVar[name]) {
            this.allocVar[name] = this.gl.getUniformLocation(this.id, name);
        }
        const loc = this.allocVar[name];
        this.gl.uniform1iv(loc, value);
    }

    setFloat(name, value) {
        this.uploadUniformFloat(name, value);
    }
    uploadUniformFloat(name, value) {
        if(!this.allocVar[name]) {
            this.allocVar[name] = this.gl.getUniformLocation(this.id, name);
        }
        const loc = this.allocVar[name];
        this.gl.uniform1f(loc, value);
    }

    setFloat2(name, value) {
        this.uploadUniformFloat2(name, value);
    }
    uploadUniformFloat2(name, value) {
        if(!this.allocVar[name]) {
            this.allocVar[name] = this.gl.getUniformLocation(this.id, name);
        }
        const loc = this.allocVar[name];
        this.gl.uniform2fv(loc, value);
    }

    setFloat3(name, value) {
        this.uploadUniformFloat3(name, value);
    }
    uploadUniformFloat3(name, value) {
        if(!this.allocVar[name]) {
            this.allocVar[name] = this.gl.getUniformLocation(this.id, name);
        }
        const loc = this.allocVar[name];
        this.gl.uniform3fv(loc, value);
    }

    setFloat4(name, value) {
        this.uploadUniformFloat4(name, value);
    }
    uploadUniformFloat4(name, value) {
        if(!this.allocVar[name]) {
            this.allocVar[name] = this.gl.getUniformLocation(this.id, name);
        }
        const loc = this.allocVar[name];
        this.gl.uniform4fv(loc, value);
    }

    setMat4(name, value) {
        this.uploadUniformMat4(name, value);
    }
    uploadUniformMat4(name, value) {
        if(!this.allocVar[name]) {
            this.allocVar[name] = this.gl.getUniformLocation(this.id, name);
        }
        const loc = this.allocVar[name];
        this.gl.uniformMatrix4fv(loc, false, value); // value is 16x element array
    }
}
