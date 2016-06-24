# mobx-deku
mobx bindings for deku

`npm install mobx-deku`

# Example
```js
import {render, tree} from 'deku';
import element from 'magic-virtual-element';
import {observable} from 'mobx';
import {observer} from 'mobx-deku';

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
      <div class='app'>{props.appState.counter}</div>
      <button onClick={onClick}></button>
    );
    function onClick () {
      props.appState.increaseCounter();
    }
  }
});

render(tree(<App appState={appState} />), document.createElement('div'));
```

Special thanks to @mattmccray and https://gist.github.com/mattmccray/d8740ea97013c7505a9b