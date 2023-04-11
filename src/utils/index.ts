
export const getImageSize = (file: File): Promise<[number, number]> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve([img.naturalWidth, img.naturalHeight])
        };
        img.src = URL.createObjectURL(file);
    });
}

let templateWidth: number;
export const generateImg = async (img: HTMLImageElement, crop: any, isTemplate?: boolean) => {
    const { naturalWidth, naturalHeight, width } = img;
    if (isTemplate) {
        templateWidth = width;
    }
    const x = naturalWidth * crop.x / 100 // 裁剪框左上角x坐标
    var y = naturalHeight * crop.y / 100; // 裁剪框左上角y坐标
    var w = naturalWidth * crop.width / 100; // 裁剪框宽度
    var h = naturalHeight * crop.height / 100; // 裁剪框高度
    var borderRadius = +crop.borderRadius * naturalWidth / templateWidth; // 裁剪框的border-radius值

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

    await new Promise(resolve => {
        setTimeout(resolve, 300);
    });
}