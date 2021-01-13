import Item from '../Item';
import Form from '../Form';
import Elements from '../Elements';
import ListCrud from '../ListCrud';

const item = new Item();

const form = new Form();

const elements = new Elements(item, form);

const listCrud = new ListCrud(elements);
listCrud.init();

listCrud.addItem({ title: 'iPhone XR', price: 60000 });
listCrud.addItem({ title: 'Samsung Galaxy S10+', price: 80000 });
listCrud.addItem({ title: 'Huawei View', price: 50000 });
listCrud.showItems();

describe('test ListCrud', () => {
  test('add', () => {
    const buttonAdd = document.querySelector('.button-add');
    const buttonSave = document.querySelector('.button-save');
    buttonAdd.click();

    document.querySelector('.field-title').value = 'test';
    document.querySelector('.field-price').value = 123;
    buttonSave.click();
    expect(listCrud.items.length).toBe(4);
  });

  test('cancel', () => {
    const buttonAdd = document.querySelector('.button-add');
    const buttonCancel = document.querySelector('.button-cancel');
    buttonAdd.click();

    document.querySelector('.field-title').value = 'test';
    document.querySelector('.field-price').value = 123;
    buttonCancel.click();
    expect(listCrud.items.length).toBe(4);
  });

  test('edit', () => {
    const buttonSave = document.querySelector('.button-save');

    const buttonEdit = document.querySelector('.button-edit');
    buttonEdit.click();

    document.querySelector('.field-title').value = 'test123';
    document.querySelector('.field-price').value = 123;
    buttonSave.click();
    expect(listCrud.items[0].title).toBe('test123');
  });

  test('edit', () => {
    const buttonDelete = document.querySelector('.button-delete');
    const buttonReallyDelete = document.querySelector('.button-really-delete');
    buttonDelete.click();
    buttonReallyDelete.click();
    expect(listCrud.items.length).toBe(3);
  });
});
