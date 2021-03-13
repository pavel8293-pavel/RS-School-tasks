export default class DOMelement {
    constructor(tagName = 'div', parent, className = '', inner = '', event, callback) {
      let el = document.createElement(tagName);
      document.querySelectorAll(parent).forEach((node) => { node.append(el) })
      el.className = className;
      el.innerHTML = inner
      el.addEventListener(event, callback);
      this.node = el;
    }
  }