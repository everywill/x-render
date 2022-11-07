import { Context } from "./context";
import { Renderer } from '../renderer/index';

export class Application {
    constructor(options) {
        Context.Create(options);
        Renderer.Init();
    }
}
