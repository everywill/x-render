import { vec3, mat4 } from 'gl-matrix';

export class OrthoCamera {
    constructor(left, right, bottom, top) {
        this.position = vec3.create();
        this.rad = 0;
        this.viewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();
        this.viewProjectionMatrix = mat4.create();

        mat4.ortho(this.projectionMatrix, left, right, bottom, top, -1, 1);
        mat4.mul(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
    }

    setPostion(x, y, z) {
        this.position = vec3.fromValues(x, y, z);
        this.recalculateViewMatrix();
    }

    setRotation(rad) {
        this.rotation = rad;
        this.recalculateViewMatrix();
    }

    setProjection(left, right, bottom, top) {
        mat4.ortho(this.projectionMatrix, left, right, bottom, top);
        mat4.mul(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
    }

    recalculateViewMatrix() {
        const rotation = mat4.create();
        mat4.rotate(rotation, mat4.create(), this.rotation, vec3.fromValues(0, 0, 1));

        const translation = mat4.create();
        mat4.translate(translation, mat4.create(), this.position);

        mat4.mul(this.viewMatrix, translation, rotation);
        mat4.mul(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
    }
}
