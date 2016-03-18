import React, { Component, PropTypes } from 'react'
import countryList from 'forms/utils/countryList'
import 'styles/core.scss'

export default class FormAddress extends Component {
    displayName = 'form address information';

    static propTypes = {
        address: PropTypes.object.isRequired,
        address2: PropTypes.object.isRequired,
        city: PropTypes.object.isRequired,
        state: PropTypes.object.isRequired,
        zip: PropTypes.object.isRequired,
        country: PropTypes.object.isRequired
    }

    render() {
        const { address, address2, city, state, zip, country } = this.props
        return (
          <div>
              <div className="form-group">
                <span style={ {color: '#FF0000'} }>* </span>
                <label>Address:</label>
                <input type="text" className="form-control" { ...address } />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input type="text" className="form-control" { ...address2 }
                  placeholder="Optional" />
              </div>
              <div className="form-group">
                <span style={ {color: '#FF0000'} }>* </span>
                <label>City:</label>
                <input type="text" className="form-control" { ...city } />
              </div>
              <div className="form-group">
                <label>State/Province:</label>
                <input type="text" className="form-control" { ...state } />
              </div>
              <div className="form-group">
                <span style={ {color: '#FF0000'} }>* </span>
                <label>ZIP:</label>
                <input type="number" className="form-control" { ...zip } />
              </div>
              <div className="form-group">
                <span style={ {color: '#FF0000'} }>* </span>
                <label>Country:</label>
                <select className="form-control" {...country} value={ country.value } >
                    <option>Select</option>
                    { countryList.map((cont) => {
                        return (
                            <option key={ countryList.indexOf(cont) }
                                value={ cont }>{ cont }</option>
                        )
                    }) }
                </select>
              </div>
          </div>
        )
    }
}
