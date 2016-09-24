import structure from './structure/plain';
import componentContainer from './containers/AsyncConnect';
import { asyncConnect } from './containers/decorator';
import { loadOnServer } from './helpers/utils';
import reducer from './store';
// export { reducer, immutableReducer } from './store';
// export { setToImmutableStateFunc, setToMutableStateFunc } from './helpers/state';

export default {
  ReduxAsyncConnect: componentContainer(structure),
  asyncConnect,
  loadOnServer,
  reducer,
};
