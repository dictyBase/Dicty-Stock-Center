import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Flex, Box } from 'rebass'
import { Container } from 'styles'

export class AuthLoader extends Component {
    displayName = 'loading component during authentication';
    render() {
        return (
            <Container>
                <Flex justify="center">
                    <Box>
                        <h1>Logging in...</h1>
                    </Box>
                    <Box>
                        <i className="fa fa-5x fa-spinner fa-pulse fa-fw"></i>
                    </Box>
                </Flex>
            </Container>
        )
    }
}

export class Logout extends Component {
    displayName = 'logout confirmation';
    render() {
        return (
            <Container>
                <Flex>
                    <Box w={ 1 }>
                        <div className="alert alert-success text-center">
                            <i className="fa fa-5x fa-check-circle-o"></i>
                            <h1>Logout successful!</h1>
                            <p>You have successfully logged out of Dicty Stock Center</p>
                        </div>
                    </Box>
                    <Box>
                        <Link to="/" className="btn btn-lg btn-primary">
                            Stock Center Home
                        </Link>
                    </Box>
                </Flex>
            </Container>
        )
    }
}
