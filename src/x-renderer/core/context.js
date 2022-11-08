import { GLContext } from '../../backend/webgl/context';
import { RenderApi, API } from '../renderer/renderApi';

export class Context {
    constructor(options) {
        this.canvas = options.canvas;
    }
}

Context.CURRENT = undefined;

Context.Create = function(options) {
    const api = RenderApi.CURRENT_TYPE;
    if(api === API.WEBGL) {
        Context.CURRENT = (new GLContext(options)).context;
    } 
}
