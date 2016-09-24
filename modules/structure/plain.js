import shallowEqual from 'shallowequal';

function toPath(field) {
  let path = field || [];
  if (typeof path === 'string') path = [path];
  return path;
}

function isLikeObject(o) {
  return o && typeof o === 'object';
}


export const fromJS = o => o;
export const toJS = o => o;
export const merge = (a, b) => ({ ...a, ...b });

export const getIn = (state, field) => {
  if (!state) return state;

  const path = toPath(field);
  if (!path.length) return undefined;

  let result = state;
  let i = 0;
  for (; i < path.length && isLikeObject(result); i++) {
    result = result[path[i]];
  }
  if (i < path.length) return undefined;
  return result;
};

function setWithPath(state, [first, ...rest], value) {
  if (!state) {
    const o = isNaN(first) ? {} : [];
    return setWithPath(o, [first, ...rest], value);
  }

  const copy = Array.isArray(state) ?
    [...state] :
    ({ ...state });

  copy[first] = rest.length ?
    setWithPath(copy[first], rest, value) :
    value;

  return copy;
}

export const setIn = (state, field, value) => {
  const path = toPath(field);
  return !path.length ?
    state :
    setWithPath(state, path, value);
};

export const updateIn = (state, field, updater) => {
  const path = toPath(field);
  if (!path.length) return state;
  return setIn(state, path, updater(getIn(state, path)));
};

export const isEqual = (props, newProps) => shallowEqual(props, newProps);
