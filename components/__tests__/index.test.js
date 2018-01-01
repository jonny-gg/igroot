import * as antd from '..';

describe('igroot', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });
});
