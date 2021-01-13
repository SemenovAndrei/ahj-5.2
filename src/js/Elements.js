/* eslint-disable prefer-destructuring */
/**
 * @class Elements
 */
export default class Elements {
  constructor(item, form) {
    this.item = item;
    this.form = form.getForm();
    this.body = document.getElementsByTagName('body')[0];
  }

  /**
   * Init
   */
  init() {
    this.addElements();
    this.body.insertAdjacentElement('afterbegin', this.container);
    this.container.appendChild(this.form);
    this.container.appendChild(this.content);
    this.addContentList();
    this.addContentItems();
  }

  /**
   * Add all elements
   */
  addElements() {
    this.addContainer();
    this.addContent();
  }

  /**
   * Add container
   */
  addContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
  }

  /**
   * Add content
   */
  addContent() {
    this.content = document.createElement('div');
    this.content.classList.add('content');
    this.addContentMarkup();
  }

  addContentList() {
    this.contentList = document.querySelector('.content-list');
  }

  addContentItems() {
    this.contentItems = document.querySelector('.items');
  }

  showForm() {
    this.form.classList.add('form-active');
    this.form.querySelector('.field-title').focus();
  }

  hideForm() {
    this.form.classList.remove('form-active');
    this.resetHint();
  }

  showHint(e, message) {
    const parent = this.form.querySelector(`.field-${e}`);

    const hint = parent.nextElementSibling;

    hint.textContent = message;
    hint.style.top = `${parent.closest('label').getBoundingClientRect().top - 10}px`;
    hint.style.left = `${parent.getBoundingClientRect().right - hint.getBoundingClientRect().width}px`;
    hint.classList.add('hint-active');
  }

  resetHint() {
    const hints = this.form.querySelectorAll('.hint');
    hints.forEach((e) => {
      e.textContent = '';
      e.classList.remove('hint-active');
    });
  }

  /**
   * Add markup for content
   */
  addContentMarkup() {
    this.content.innerHTML = `
    <div class="content-header">
      <h1 class="title">товары</h1>
      <button class="button button-content button-add" title="add">+</button>
    </div>
    <div class="content-list">
      <div class="tooltips">
        <div class="tooltip">Название</div>
        <div class="tooltip">Стоимость</div>
        <div class="tooltip">Действия</div>
      </div>
      <div class="items"></div>
    </div>
    `;
  }

  addItem(item) {
    this.contentItems.appendChild(this.item.getItem(item));
  }

  clearContentItems() {
    this.contentItems.innerHTML = '';
  }
}
