export default class ListCrud {
  constructor(elements, items = []) {
    this.elements = elements;
    this.items = items;
  }

  init() {
    this.elements.init();
    this.showItems();
    this.addListeners();
  }

  addListeners() {
    this.elements.container.addEventListener('click', this.buttonsLogic.bind(this));
  }

  buttonsLogic(e) {
    e.preventDefault();

    if (e.target.classList.contains('button-add')) {
      this.elements.showForm();
      this.getItemEmpty();
    }

    if (e.target.classList.contains('button-edit')) {
      this.elements.showForm();
      this.getItemValue(e.target);
      this.editItemID = Number(e.target.closest('.item').dataset.id);
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

  getItemValue(e) {
    const title = e.closest('.item').querySelector('.item-title').textContent;
    const price = e.closest('.item').querySelector('.item-price').textContent;

    this.elements.form.querySelector('.field-title').value = title;
    this.elements.form.querySelector('.field-price').value = Number(price);
  }

  getItemEmpty() {
    this.elements.form.querySelector('.field-title').value = '';
    this.elements.form.querySelector('.field-price').value = '';
  }

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

  setItemID() {
    let cnt = 0;

    do {
      cnt += 1;
    } while (this.items.some((e) => e.id === cnt));

    return cnt;
  }

  showItems() {
    this.items.forEach((e) => this.elements.addItem(e));
  }
}
