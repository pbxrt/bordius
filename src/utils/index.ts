
export const getImageSize = (file: File): Promise<[number, number]> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve([img.naturalWidth, img.naturalHeight])
        };
        img.src = URL.createObjectURL(file);
    });
}

export const generateImg = (img: HTMLImageElement, crop: any) => {
    const ratio = window.devicePixelRatio;
    const { naturalWidth, naturalHeight, width } = img;
    const x = naturalWidth * crop.x / 100 // 裁剪框左上角x坐标
    var y = naturalHeight * crop.y / 100; // 裁剪框左上角y坐标
    var w = naturalWidth * crop.width / 100; // 裁剪框宽度
    var h = naturalHeight * crop.height / 100; // 裁剪框高度
    var borderRadius = +crop.borderRadius * naturalWidth / width; // 裁剪框的border-radius值

    // 创建一个canvas，并将img绘制到canvas上
    // var canvas = document.createElement('canvas');
    // canvas.width = naturalWidth;
    // canvas.height = naturalHeight;
    // var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    // ctx.drawImage(img, 0, 0);

    // document.body.appendChild(canvas);

    // 在新的canvas上绘制裁剪后的部分
    var newCanvas = document.createElement('canvas');
    newCanvas.width = w;
    newCanvas.height = h;
    var newCtx = newCanvas.getContext('2d') as CanvasRenderingContext2D;
    newCtx.beginPath();
    newCtx.moveTo(borderRadius, 0);
    newCtx.lineTo(w - borderRadius, 0);
    newCtx.arc(
        w - borderRadius,
        borderRadius,
        borderRadius,
        Math.PI * 3 / 2,
        Math.PI * 2,
        false,
    );

    newCtx.lineTo(w, h - borderRadius);
    newCtx.arc(
        w - borderRadius,
        h - borderRadius,
        borderRadius,
        0,
        Math.PI / 2,
        false,
    );

    newCtx.lineTo(borderRadius, h);
    newCtx.arc(
        borderRadius,
        h - borderRadius,
        borderRadius,
        Math.PI / 2,
        Math.PI,
        false,
    );

    newCtx.lineTo(0, borderRadius);
    newCtx.arc(
        borderRadius,
        borderRadius,
        borderRadius,
        Math.PI,
        Math.PI * 3 / 2,
        false,
    );

    newCtx.closePath();
    newCtx.clip();
    newCtx.drawImage(img, x, y, w, h, 0, 0, w, h);

    // 将新的canvas转换成dataURL，并创建a标签进行下载
    var dataURL = newCanvas.toDataURL('image/png');
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'cropped-image.png';
    downloadLink.click();
}