function html2img(dom: HTMLElement) {
  if (!dom) throw Error('dom is not defined')
  const cloneDom = dom.cloneNode(true) as HTMLElement;
  
}

export default html2img;
