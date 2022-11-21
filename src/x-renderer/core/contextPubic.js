import { Context } from './context';
import { RenderApi, API } from '../renderer/renderApi';
import { GLContext } from '../../backend/webgl/context';
import { WGPUContext } from '../../backend/webgpu/context';

Context.Create = function(options) {
    const api = RenderApi.CURRENT_TYPE;
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: Context.CURRENT = (new GLContext(options)).context; break;
        case API.WEBGPU: Context.CURRENT = (new WGPUContext(options)).context; break;
    }
}

export {
    Context,
};
