function ComputeMipLevelsCount(width, height = 0, depth = 0) {
    width = Math.max(width, height, depth);
    if(width == 0) {
        return 0;
    }
    let mipLevels = 0;
    while((width >> mipLevels) > 0) {
        mipLevels ++;
    }
    return mipLevels;
}

export {
    ComputeMipLevelsCount,
}