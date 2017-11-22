import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'styles/core.scss'

export default class EditPanel extends Component {
    displayName = 'panel to edit order info';

    static propTypes = {
        user: PropTypes.object.isRequired,
        edit: PropTypes.func.isRequired,
        title: PropTypes.string,
        icon: PropTypes.string,
        shipping: PropTypes.object,
        payment: PropTypes.object
    }
    renderShippingMethod = () => {
        const { shipping } = this.props
        // display the shipping method with shipping account number(if available)
        return (
            <div>
                <strong>Shipping method: </strong>
                { shipping.account }
                { shipping.accountNum && <span> (#{ shipping.accountNum })</span> }
            </div>
        )
    }

    renderPaymentMethod = () => {
        const { payment } = this.props
        // if pay method is PO and PO# is available, display that.
        // else, just display the pay method, Credit card, Wire transfer etc.
        return (
            <div>
                <strong>Payment method: </strong>{ payment.method }
                { payment.method === 'PO' &&
                    payment.poNum &&
                    <span> (#{ payment.poNum })</span>
                }
            </div>

        )
    }

    render() {
        const { title, edit, icon, shipping, payment } = this.props
        const { firstName, lastName, address, address2,
            city, state, zip, country
        } = this.props.user
        return (
            <div>
                <h4>
                    { icon && <i className={ icon }></i> }
                    { title }
                </h4>
                <div>{ firstName } { lastName }</div>
                <div>{ address }</div>
                <div>{ address2 && address2 }</div>
                <div>{ city } { state && state } { zip }</div>
                <div>{ country }</div>
                    { (shipping || payment) && <br /> }
                    { shipping && this.renderShippingMethod() }
                    { payment && this.renderPaymentMethod() }
                <br />
                <div>
                    <a href="#" onClick = { edit }>
                        <i className="fa fa-pencil-square-o"></i>
                        { payment ? ' Edit payment info' : ' Edit shipping info' }
                    </a>
                </div>
            </div>
        )
    }
}
