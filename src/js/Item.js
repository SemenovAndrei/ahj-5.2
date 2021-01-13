export default class Item {
  init(item) {
    this.addElements(item);
  }

  addElements(item) {
    this.addItem(item);
  }

  addItem(item) {
    this.item = document.createElement('div');
    this.item.dataset.id = item.id;
    this.item.classList.add('item');
    this.addItemMarkup(item);
  }

  addItemMarkup(item) {
    this.item.innerHTML = `
    <div class="cell item-title">${item.title}</div>
    <div class="cell item-price">${item.price}</div>
    <div class="cell item-control">
      <button class="button button-content button-edit" title="edit">✎</button>
      <button class="button button-content button-delete" title="delete">❌</button>
    </div>
    `;
  }

  getItem(item) {
    this.init(item);

    return this.item;
  }
}
