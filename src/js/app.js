import Item from './Item';
import Form from './Form';
import Elements from './Elements';
import ListCrud from './ListCrud';

const item = new Item();

const form = new Form();

const elements = new Elements(item, form);

const listCrud = new ListCrud(elements);
listCrud.init();

listCrud.addItem({ title: 'iPhone XR', price: 60000 });
listCrud.addItem({ title: 'Samsung Galaxy S10+', price: 80000 });
listCrud.addItem({ title: 'Huawei View', price: 50000 });
listCrud.showItems();
