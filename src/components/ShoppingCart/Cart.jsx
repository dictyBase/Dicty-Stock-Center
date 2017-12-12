import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { Container } from 'styles'
import { DangerButton } from 'styles/buttons'

export default class Cart extends Component {
    displayName = 'Shopping cart'
    static propTypes = {
        cart: PropTypes.object.isRequired,
        cartActions: PropTypes.object.isRequired
    }

    render() {
        const { cart, cartActions } = this.props
        return (
            <Container>
                <div className="table-responsive">
                    <table className="table table-condensed">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Strain/Plasmid Name</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cart.addedItems.map((item, index) => {
                                return (
                                    <tr key={ index }>
                                        <td>{ item.id }</td>
                                        <td>{ item.name }</td>
                                        <td>{ item.fee }</td>
                                        <td>
                                            <DangerButton
                                                type="button"
                                                onClick={ () =>
                                                    cartActions.removeItem(
                                                        item.id
                                                    )
                                                }>
                                                <FontAwesome name="trash-o" />
                                            </DangerButton>
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </Container>
        )
    }
}
