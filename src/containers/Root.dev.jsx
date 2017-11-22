import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import DevTools from 'containers/DevTools'
import App from 'containers/App'

export default class Root extends Component {
    displayName = 'root component';
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    render() {
        const { store, history } = this.props
        return (
          <Provider store={ store }>
              <div>
                  <ConnectedRouter history= { history }>
                    <App />
                  </ConnectedRouter>
                  <DevTools />
              </div>
          </Provider>
        )
    }
}

