import {JSDOM} from 'jsdom';
import instantify from './instantify';

describe('instantify', () => {
  const dom = new JSDOM(`<!DOCTYPE html><div id="foo" style="transition:.2s"></div>`);
  global.getComputedStyle = jest.fn();
  global.getComputedStyle.mockReturnValueOnce({
    transition: '.2s'
  });

  test('this', async () => {
    const div = dom.window.document.getElementById('foo');
    expect(div.style.transition).toEqual('.2s');

    const pRestore = await instantify(div);
    expect(div.style.transition).toEqual(null);

    await pRestore();
    expect(div.style.transition).toEqual('.2s');
  });
});
