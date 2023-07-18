import { draw } from './core/canvas';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;
const img = new Image();

function html2img(dom: HTMLElement) {
  if (!dom) throw Error('dom is not defined')
  return new Promise((resolve, reject) => {
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
    imgList.forEach((img, index) => {
      draw(img, canvas, context)
      img.src = canvas.toDataURL('image/png')
    })
  })
}

export default html2img;
