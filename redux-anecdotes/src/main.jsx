import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import createStore from './store'

const store = createStore()

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)