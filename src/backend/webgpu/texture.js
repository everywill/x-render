import { Texture } from "../../x-renderer/renderer/texture";
import { Context } from "../../x-renderer/core/context";

export class WGPUTexture extends Texture {
    get device() { return Context.device }

    constructor(name, width, height) {
        super(width, height);
        this.name = name;
        this.width = width;
        this.height = height;
        this.tex = this.device.createTexture({
            size: { width, height },
            format: 'rgba8unorm',
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        });

        this.sampler = this.device.createSampler({
            addressModeU: 'repeat',
            addressModeV: 'repeat',
            magFilter: 'linear',
            minFilter: 'linear',
        });
    }

    setData(data) { // data: Uint8Array
        this.device.queue.writeTexture(
            { texture: this.tex },
            data,
            { bytesPerRow:  this.width * 4, rowsPerImage: this.height },
            { width: this.width, height: this.height }
        );
    }

    bind() {}
}
