function html2img(dom: HTMLElement) {
  if (!dom) throw Error('dom is not defined')
  const cloneDom = dom.cloneNode(true) as HTMLElement;
  cloneDom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml'); // 设置一个xhtml命名空间
  let imgDom: HTMLImageElement | NodeListOf<HTMLImageElement>;
  if (cloneDom.tagName.toLowerCase() === 'img') {
    imgDom = cloneDom as HTMLImageElement
  } else {
    imgDom = cloneDom.querySelectorAll('img')
  }

}

export default html2img;
