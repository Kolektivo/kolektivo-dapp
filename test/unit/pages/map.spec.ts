import { Map } from '../../../src/pages/map/map';
import { render } from '../helper';

describe('map', () => {
  it('should render iframe', async () => {
    const node = (await render('<map></map>', Map)).firstElementChild?.firstElementChild?.firstElementChild;
    expect(node?.tagName.toLowerCase()).toBe('iframe');
  });
});
