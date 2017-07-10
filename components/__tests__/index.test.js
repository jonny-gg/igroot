import * as igroot from '..';

describe('igroot', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(igroot)).toMatchSnapshot();
  });
});
