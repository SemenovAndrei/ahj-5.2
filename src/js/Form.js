/**
 * @class Form
 */
export default class Form {
  /**
   * Init
   */
  init() {
    this.addElements();
  }

  /**
   * Add all elements
   */
  addElements() {
    this.addForm();
  }

  /**
   * Add form
   */
  addForm() {
    this.form = document.createElement('form');
    this.form.classList.add('form');
    this.addFormMarkup();
  }

  /**
   * Add markup to form
   */
  addFormMarkup() {
    this.form.innerHTML = `
    <div class="form-content">
      <div class="wrapper">
        <label class="form-title">Название
          <input class="field field-title" placeholder="write the name here">
          <div class="hint"></div>
        </label>
      </div>
      <div class="wrapper">
        <label class="form-price">Стоимость
          <input class="field field-price" placeholder="write the price here">
          <div class="hint"></div>
        </label>
      </div>
      <div class="form-controls">
        <button class="button button-form button-save">Сохранить</button>
        <button class="button button-form button-cancel">Отмена</button>
      </div>
    </div>
    `;
  }

  /**
   * @return this.form
   */
  getForm() {
    this.init();

    return this.form;
  }
}
