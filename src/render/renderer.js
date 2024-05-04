const RENDER_TYPE = {
    MOBILE: 0,
    DESKTOP: 1,
    COUNT: 2,
};

class Render {
    Prepare() {}
    BegineFrame() {}
    Render() {}
    EndFrame() {}
}

Render.Create = function() { }

Render.Destroy = function() { }