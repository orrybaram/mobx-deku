import {autorun} from 'mobx';

export default function observer (target) {
  let _unsubscriber = null;
  let _render = target.render;
  let _beforeUnmount = target.beforeUnmount;
  let _updateCount = 0;

  target.render = (component, setState) => {
    var result;
    if (_unsubscriber) {
      _unsubscriber();
    }
    _unsubscriber = autorun(() => {
      result = _render(component, setState);
      setState({ __updates: _updateCount++ });
    });
    return result;
  };

  target.beforeUnmount = (component, el) => {
    if (_unsubscriber) {
      _unsubscriber();
    }
    if (_beforeUnmount) {
      _beforeUnmount(component, el);
    }
  };

  // If there's already a shouldUpdate, don't overwrite it.
  target.shouldUpdate = target.shouldUpdate || _shouldUpdate;

  return target;
}

function _shouldUpdate (component, nextProps, nextState) {
  let {props, state} = component;
  // update on any state changes (as is the default)
  if (state !== nextState) {
    return true;
  }
  // update if props are shallowly not equal, inspired by PureRenderMixin
  let keys = Object.keys(props);
  let key;

  if (keys.length !== Object.keys(nextProps).length) {
    return true;
  }

  for (var i = keys.length - 1; i >= 0, key = keys[i]; i--) {
    if (nextProps[key] !== props[key]) {
      return true;
    }
  }

  return false;
}
