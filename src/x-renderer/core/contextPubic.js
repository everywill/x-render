import { Context } from './context';
import { RenderApi, API } from '../renderer/renderApi';
import { GLContext } from '../../backend/webgl/context';
import { GPUContext } from '../../backend/webgpu/context';

Context.Create = function(options) {
    const api = RenderApi.CURRENT_TYPE;
    switch(RenderApi.CURRENT_TYPE) {
        case API.WEBGL: Context.CURRENT = (new GLContext(options)).context;
        case API.WEBGPU: Context.CURRENT = (new GPUContext(options)).context;
    }
}

export {
    Context,
};
