import types from '../constants'
import simpleStorage from 'simplestorage.js'

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } = types


const authenticated = () => {
    return simpleStorage.hasKey('token')
}

const initialState = {
    isFetching: false,
    isAuthenticated: authenticated()
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_REQUEST:
        return {
            ...state,
            isFetching: true,
            isAuthenticated: false,
            provider: action.provider
        }
    case LOGIN_SUCCESS:
        return {
            ...state,
            isFetching: false,
            isAuthenticated: true,
            user: action.user
        }
    case LOGIN_FAILURE:
        return {
            ...state,
            isFetching: false,
            isAuthenticated: false,
            error: action.error
        }
    case LOGOUT_REQUEST:
        return {
            ...state,
            isFetching: true,
            isAuthenticated: true
        }
    case LOGOUT_SUCCESS:
        return {
            ...state,
            isFetching: false,
            isAuthenticated: false
        }
    default:
        return state
    }
}
export default authReducer
