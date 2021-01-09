import Popover from './Popover';
import Elements from './Elements';
import Popovers from './Popovers';

const popover = new Popover();

const elements = new Elements(popover);

const popovers = new Popovers(elements);
popovers.init();
