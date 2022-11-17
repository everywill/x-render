import { Texture } from '../../x-renderer/renderer/texture';
import { Context } from '../../x-renderer/core/context';

export class GLTexture extends Texture {
    get gl() { return Context.CURRENT }

    constructor(width, height) {
        this.internalFormat = this.gl.RGBA;
        this.dataFormat = this.gl.RGBA;
        this.id = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
        this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, this.internalFormat, width, height);  // support 1 level
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);  // Linear
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    }

    setData(data, width, height) {
        this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, width, height, this.dataFormat, this.gl.UNSIGNED_BYTE, data);
    }

    bind(slot) {
        this.activeTexture(this.gl[`TEXTURE${slot}`]);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
    }
}