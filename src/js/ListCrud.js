/**
 * @class ListCrud
 */
export default class ListCrud {
  /**
   * @constructor
   *
   * @param {class} elements - Elements
   * @param {class} items - Items
   */
  constructor(elements, items = []) {
    this.elements = elements;
    this.items = items;
  }

  /**
   * Init
   */
  init() {
    this.elements.init();
    this.showItems();
    this.addListeners();
  }

  /**
   * Add listeners
   */
  addListeners() {
    this.elements.container.addEventListener('click', this.buttonsLogic.bind(this));
  }

  /**
   * Logic actions to click on buttons
   *
   * @param {event} e - Click event
   */
  buttonsLogic(e) {
    e.preventDefault();
    this.resetDeleteButtons();

    if (e.target.classList.contains('button-add')) {
      this.elements.showForm();
      this.getItemEmpty();
    }

    if (e.target.classList.contains('button-edit')) {
      this.elements.showForm();
      this.getItemValue(e.target);
      this.editItemID = Number(e.target.closest('.item').dataset.id);
    }

    if (e.target.classList.contains('button-delete')) {
      this.editItemID = Number(e.target.closest('.item').dataset.id);

      ListCrud.confirmDelete(e.target);
    }

    if (e.target.classList.contains('button-really-delete')) {
      this.editItemID = Number(e.target.closest('.item').dataset.id);
      this.deleteItem();
      this.elements.clearContentItems();
      this.showItems();
    }

    if ([...e.target.classList].some((c) => c === 'form' || c === 'button-cancel')) {
      this.elements.hideForm();
    }

    if (e.target.classList.contains('button-save')) {
      if (this.checkForm()) {
        return;
      }

      this.addItem();
      this.elements.hideForm();
      this.elements.clearContentItems();
      this.showItems();
    }
  }

  /**
   * Get values to fields form
   *
   * @param {element} e - event target
   */
  getItemValue(e) {
    const title = e.closest('.item').querySelector('.item-title').textContent;
    const price = e.closest('.item').querySelector('.item-price').textContent;

    this.elements.form.querySelector('.field-title').value = title;
    this.elements.form.querySelector('.field-price').value = Number(price);
  }

  /**
   * Get empty values to fields form
   */
  getItemEmpty() {
    this.elements.form.querySelector('.field-title').value = '';
    this.elements.form.querySelector('.field-price').value = '';
  }

  /**
   * Check fields form to correct value
   */
  checkForm() {
    this.elements.resetHint();

    const title = this.elements.form.querySelector('.field-title').value;
    const price = this.elements.form.querySelector('.field-price').value;

    if (!title || /^\W/.test(title)) {
      this.elements.showHint('title', 'Нужно заполнить поле');
      return true;
    }

    if (!price) {
      this.elements.showHint('price', 'Нужно заполнить поле');
      return true;
    }

    if (/\D/.test(price)) {
      this.elements.showHint('price', 'некорректное значение');
      return true;
    }
  }

  /**
   * Add items to this.items
   *
   * @param {object} object - Object item
   */
  addItem(object = '') {
    const result = {
      title: object.title || this.elements.form.querySelector('.field-title').value,
      price: object.price || this.elements.form.querySelector('.field-price').value,
    };

    if (this.editItemID) {
      const editItem = this.items.findIndex((e) => e.id === this.editItemID);
      this.items[editItem].title = result.title;
      this.items[editItem].price = result.price;
      this.items[editItem].id = this.editItemID;

      this.editItemID = null;
      return;
    }

    result.id = this.setItemID();
    this.items.push(result);
  }

  /**
   * Set ID to item
   */
  setItemID() {
    let cnt = 0;

    do {
      cnt += 1;
    // eslint-disable-next-line no-loop-func
    } while (this.items.some((e) => e.id === cnt));

    return cnt;
  }

  /**
   * Show hidden buttonsReallyDelete
   *
   * @param {button} item - button
   */
  static confirmDelete(button) {
    button.style.display = 'none';
    button.nextElementSibling.style.display = 'block';
  }

  /**
   * Delete item in this.items
   */
  deleteItem() {
    const index = this.items.findIndex((e) => e.id === this.editItemID);
    this.items.splice(index, 1);
    this.editItemID = null;
  }

  /**
   * Reset all delete buttons
   */
  resetDeleteButtons() {
    const buttonsDelete = this.elements.content.getElementsByClassName('button-delete');

    buttonsDelete.forEach((e) => {
      e.style.display = 'block';
    });

    const buttonsReallyDelete = this.elements.content.getElementsByClassName('button-really-delete');

    buttonsReallyDelete.forEach((e) => {
      e.style.display = 'none';
    });
  }

  /**
   * Show this.items on page
   */
  showItems() {
    this.items.forEach((e) => this.elements.addItem(e));
  }
}
