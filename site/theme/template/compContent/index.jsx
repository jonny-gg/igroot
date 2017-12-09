import collect from 'bisheng/collect';
import CompsContent from './CompContent';
import * as utils from '../utils';

function isChangelog(pathname) {
  return pathname.indexOf('changelog') >= 0;
}

export default collect(async (nextProps) => {
  const pathname = nextProps.location.pathname;
  const pageDataPath = pathname.replace('-cn', '').split('/');
  const pageData = isChangelog(pathname) ?
          nextProps.data.changelog.CHANGELOG :
          nextProps.utils.get(nextProps.data, pageDataPath);
  // console.log(nextProps.data, "data")
  // console.log(pageDataPath, "path")
  console.log(nextProps.utils.get(nextProps.data, pageDataPath), "path")
  if (!pageData) {
    throw 404; // eslint-disable-line no-throw-literal
  }

  const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
  const pageDataPromise = typeof pageData === 'function' ?
          pageData() : (pageData[locale] || pageData.index[locale] || pageData.index)();
  const demosFetcher = nextProps.utils.get(nextProps.data, [...pageDataPath, 'demo']);
  
  if (demosFetcher) {
    const [localizedPageData, demos] = await Promise.all([pageDataPromise, demosFetcher()]);
    console.log(demos, "xxxx")
    return { localizedPageData, demos };
  }
  return { localizedPageData: await pageDataPromise };
})(CompsContent);
