import { Context } from './context';
import { GLContext } from '../../backend/webgl/context';
import { RenderApi, API } from '../renderer/renderApi';

Context.Create = function(options) {
    const api = RenderApi.CURRENT_TYPE;
    if(api === API.WEBGL) {
        Context.CURRENT = (new GLContext(options)).context;
    } 
}

export {
    Context,
};