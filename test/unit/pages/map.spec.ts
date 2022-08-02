import { Map } from '../../../src/pages/map/map';
import { render } from '../helper';

describe('map', () => {
  it('should render message', async () => {
    const node = (await render('<map></map>', Map)).firstElementChild?.firstElementChild;
    const text = node?.innerHTML;
    expect(text?.trim()).toBe('Map works!');
  });
});
