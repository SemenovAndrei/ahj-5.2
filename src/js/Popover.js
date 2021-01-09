export default class Popover {
  // constructor() {
  //   this.container = null;
  // }

  init() {
    this.addElements();
    // this.container.insertAdjacentElement('afterbegin', this.popover);
  }

  addElements() {
    // this.addContainer();
    this.addPopover();
  }

  // addContainer() {
  //   this.container = document.createElement('div');
  //   this.container.classList.add('container-content');
  // }

  addPopover() {
    this.popover = document.createElement('div');
    this.popover.classList.add('popover');
    this.addPopoverMarkup();
  }

  addPopoverMarkup() {
    this.popover.innerHTML = `
    <h3 class="popover-title">Popover Title</h3>
    <div class="popover-content">Popover Some Content</div>
    `;
  }

  getPopover() {
    this.init();

    return this.popover;
  }
}
