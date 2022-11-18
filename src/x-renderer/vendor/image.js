export function decodeNetworkImage(url, type = 'image/png') {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                const decoder = new ImageDecoder({
                    data: response.body,
                    type,
                });
                decoder.decode()
                    .then(({image, complete}) => {
                        const uint8 = new Uint8Array(image.allocationSize());
                        image.copyTo(uint8).then(() => {
                            const width = image.codedWidth;
                            const height = image.codedHeight;
                            const format = image.format;
                            image.close();
                            decoder.close();
                            
                            if(format.indexOf('BGR') !== -1) {
                                for(let i=0; i<uint8.length/4; i++) {
                                    const tmp = uint8[i*4];
                                    uint8[i*4] = uint8[i*4 + 2];
                                    uint8[i*4 + 2] = tmp;
                                }
                            }
                            resolve({
                                pixels: uint8,
                                width,
                                height,
                            });
                        });
                    });
            });
    });
}
