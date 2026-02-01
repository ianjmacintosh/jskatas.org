import {render} from '../lit-html.js';
import {loadViaAjax} from './ajax.js';
import {Page} from '../components/page.js';
import {loadKataBundles} from '../pagedata.js';

const renderInBrowser = kataBundles => {
  const targetNode = document.getElementById('app');
  // Clear SSR content before first render - lit-html doesn't recognize
  // pre-rendered HTML and would append instead of replacing
  targetNode.innerHTML = '';
  render(Page({kataBundles}), targetNode);
};

const loadAllKatas = async () => {
  const kataBundles = await loadKataBundles({fetch: loadViaAjax});
  renderInBrowser(kataBundles);
};
loadAllKatas();
