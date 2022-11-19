import { Global } from "./global";
import { GloablWindow } from "../../platform/window";

Global.Create = function() {
    return new GloablWindow();
}

export {
    Global,
};
