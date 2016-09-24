import { createAction, handleActions } from 'redux-actions';

export const clearKey = createAction('@redux-conn/CLEAR');
export const beginGlobalLoad = createAction('@redux-conn/BEGIN_GLOBAL_LOAD');
export const endGlobalLoad = createAction('@redux-conn/END_GLOBAL_LOAD');
export const load = createAction('@redux-conn/LOAD', key => ({ key }));
export const loadSuccess = createAction('@redux-conn/LOAD_SUCCESS', (key, data) => ({ key, data }));
export const loadFail = createAction('@redux-conn/LOAD_FAIL', (key, error) => ({ key, error }));

const initialState = {
  loaded: false,
  loadState: {},
};

export default function reducerCreator({ setIn, updateIn, fromJS, merge }) {
  return handleActions({
    [beginGlobalLoad]: (state) => setIn(state, 'loaded', false),

    [endGlobalLoad]: (state) => setIn(state, 'loaded', true),

    [load]: (state, { payload }) => updateIn(state, 'loadState',
      (value) => merge(value, fromJS({
        [payload.key]: {
          loading: true,
          loaded: false,
        },
      }))
    ),

    [loadSuccess]: (state, { payload: { key, data } }) => {
      let newState = setIn(state, key, fromJS(data));
      newState = updateIn(newState, 'loadState',
        (value) => merge(value, fromJS({
          [key]: {
            loading: false,
            loaded: true,
            error: null,
          },
        }))
      );
      return newState;
    },

    [loadFail]: (state, { payload: { key, error } }) => updateIn(state, 'loadState',
      (value) => merge(value, fromJS({
        [key]: {
          loading: false,
          loaded: false,
          error,
        },
      }))
    ),

    [clearKey]: (state, { payload }) => {
      let newState = setIn(state, payload, null);
      newState = updateIn(newState, 'loadState',
        (value) => merge(value, fromJS({
          [payload]: {
            loading: false,
            loaded: false,
            error: null,
          },
        }))
      );
      return newState;
    },

  }, initialState);
}
