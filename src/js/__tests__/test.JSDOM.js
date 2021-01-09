import Popover from '../Popover';
import Elements from '../Elements';
import Popovers from '../Popovers';

const popover = new Popover();

const elements = new Elements(popover);

const popovers = new Popovers(elements);
popovers.init();

const buttons = document.querySelectorAll('.button');

describe('test Popovers', () => {
  describe('valid', () => {
    test.each([
      [buttons[0]],
      [buttons[1]],
      [buttons[2]],
      [buttons[3]],
    ])('%p', (button) => {
      const tooltip = button.nextElementSibling;

      button.click();

      expect(tooltip.hasChildNodes()).toBeTruthy();
    });
  });
  describe('invalid', () => {
    test.each([
      [buttons[0]],
      [buttons[1]],
      [buttons[2]],
      [buttons[3]],
    ])('%p', (button) => {
      const tooltip = button.nextElementSibling;

      button.click();
      button.click();

      expect(tooltip.hasChildNodes()).toBeFalsy();
    });
  });
});
