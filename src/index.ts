const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;
const img = new Image();

const draw = (img: HTMLImageElement, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  const width = img.width, height = img.height;
  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);
  context.drawImage(img, 0, 0, width, height);
}

function createSvg(dom: HTMLElement, cloneDom: HTMLElement): string {
  let htmlsvg = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${dom.offsetWidth}" height="${dom.offsetHeight}"><foreignObject x="0" y="0" width="100%" height="100%">${new XMLSerializer().serializeToString(cloneDom)}${document.querySelector('style')?.outerHTML}</foreignObject></svg>`;
  htmlsvg = htmlsvg.replace(/\n/g, '').replace(/\t/g, '').replace(/#/g, '%23');
  return htmlsvg
}

function html2img(dom: HTMLElement) {
  if (!dom) throw Error('dom is not defined')
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let imgDom: NodeListOf<HTMLImageElement> | HTMLImageElement, imgList: HTMLImageElement[] = [];
    const cloneDom = dom.cloneNode(true) as HTMLElement;
    cloneDom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml'); // 设置一个xhtml命名空间
    if (cloneDom.tagName.toLowerCase() === 'img') {
      imgDom = cloneDom as HTMLImageElement
    } else {
      imgDom = cloneDom.querySelectorAll('img')
    }
    if (imgDom) {
      if (imgDom instanceof HTMLImageElement) {
        imgList.push(imgDom)
      } else {
        imgList = Array.from(imgDom)
      }
    }
    if (imgList.length > 0) {
      imgList.forEach((img, index) => {
        draw(img, canvas, context)
        img.src = canvas.toDataURL()
      })
    }
    const htmlSvg = createSvg(dom, cloneDom)
    
    img.onload = () => {
      draw(img, canvas, context)
      resolve(img)
    }
    img.onerror = (err) => {
      reject(err)
    }
    img.src = htmlSvg
  })
}

export default html2img;
