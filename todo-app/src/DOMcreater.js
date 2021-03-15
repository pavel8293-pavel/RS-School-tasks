export default class DOMelement {
  constructor(tagName = 'div', parent, className = '', id = '', inner = '') {
    let child = document.createElement(tagName);
    document.querySelectorAll(parent).forEach((node) => {
      node.append(child)
    })
    child.className = className;
    child.innerHTML = inner
    child.id = id
    this.node = child;
  }
}