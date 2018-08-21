// @flow
import { dsctypes } from "constants/dsctypes"

const {
  FETCH_FOOTER_REQUEST,
  FETCH_FOOTER_SUCCESS,
  FETCH_FOOTER_FAILURE,
} = dsctypes

const initialState = {}

const footerReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_FOOTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_FOOTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        links: action.payload.links,
      }
    case FETCH_FOOTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default footerReducer
