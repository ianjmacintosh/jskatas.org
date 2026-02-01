import {render} from '../lit-html.js';
import {OverviewPage} from '../components/OverviewPage.js';
import {loadAllKatasConstructor} from '../use-cases/load-all-katas.js';
import {loadViaAjax as fetch} from './ajax.js';

const renderInBrowser = katas => {
  const targetNode = document.getElementById('app');
  // Clear SSR content before first render - lit-html doesn't recognize
  // pre-rendered HTML and would append instead of replacing
  targetNode.innerHTML = '';

  const showKataWithDetails = kata => {
    renderAgain({mixinInputData: {kataWithDetails: kata}});
  };
  const hideKataWithDetails = () => {
    renderAgain();
  };
  const actions = {
    showKataWithDetails,
    hideKataWithDetails,
  };
  const renderAgain = ({mixinInputData = {}} = {}) => {
    render(OverviewPage({inputData: {katas, ...mixinInputData}, actions}), targetNode);
  };
  renderAgain();

  document.addEventListener('keyup', evt => {
    if (evt.key === 'Escape') hideKataWithDetails();
  });
};

const loadAllKatas = loadAllKatasConstructor({fetch});
(async () => {
    renderInBrowser(await loadAllKatas());
  }
)();
