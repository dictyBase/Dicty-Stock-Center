import React, { Component, PropTypes } from 'react'
import 'styles/core.scss'

export default class FormShippingInfo extends Component {
    displayName = 'form shipping information';

    static propTypes = {
        shipAccount: PropTypes.object.isRequired,
        shipAccountNum: PropTypes.object.isRequired
    }

    render() {
        const { shipAccount, shipAccountNum } = this.props
        return (
            <div>
                <div className="form-group">
                    <span className="text-danger">* </span>
                    <label>Shipping Account:</label><br />
                    <div className="radio">
                        <label>
                          <input type="radio" { ...shipAccount } value="Fedex"
                            checked={ shipAccount.value === 'Fedex' } />
                          FedEx
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                          <input type="radio" { ...shipAccount } value="UPS"
                            checked={ shipAccount.value === 'UPS' } />
                          UPS
                        </label>
                    </div>
                    <div className="radio">
                        <label><input type="radio" { ...shipAccount } value="DHL"
                          checked={ shipAccount.value === 'DHL' } />
                          DHL
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                          <input type="radio" { ...shipAccount } value="WillCall"
                            checked={ shipAccount.value === 'WillCall' } />
                          Call in Credit card # for FedEx waybill 1-312-503-4169
                        </label>
                        { shipAccount.touched && shipAccount.error &&
                            <div className="text-danger">{ shipAccount.error }</div>
                        }
                    </div>
                    <input type="text" className="form-control" { ...shipAccountNum }
                      placeholder="Shipping Account Number" />
                      { shipAccountNum.touched && shipAccountNum.error &&
                          <div className="text-danger">{ shipAccountNum.error }</div>
                      }
                </div>
            </div>
        )
    }
}
