import { render, tree } from 'deku';
import element from 'magic-virtual-element'; // eslint-disable-line
import {observable} from 'mobx';
import {observer} from '../';
import test from 'ava';

class AppState {
  @observable counter = 0;
  increaseCounter () {
    this.counter += 1;
  }
}
const appState = new AppState();

const App = observer({
  render ({props}) {
    return (
      <div>{props.appState.counter}</div>
    );
  }
});

const container = document.createElement('div');
const app = render(tree(<App appState={appState} />), container);

test('App gets rendered', (t) => {
  t.truthy(app);
});

