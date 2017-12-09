import pkg from '../package.json';

describe('igroot dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    const igroot = process.env.CI ? require('../dist/igroot') : require('../components'); // eslint-disable-line global-require
    expect(Object.keys(igroot)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (process.env.CI) {
    it('should have igroot.version', () => {
      const igroot = require('../dist/igroot'); // eslint-disable-line global-require
      expect(igroot.version).toBe(pkg.version);
    });
  }
});
