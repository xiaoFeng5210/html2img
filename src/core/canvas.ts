export const draw = (img: HTMLImageElement, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  const width = img.width, height = img.height;
  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);
  context.drawImage(img, 0, 0, width, height);
}
