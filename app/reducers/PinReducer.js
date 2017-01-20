import Immutable from "immutable"

import console from "../lib/console"

const defaultState = new Immutable.List()

export default function PinReducer(state = defaultState, action) {
  switch(action.type) {
    case "GET_PINS":
      console.dump("PinReducer; GET_PINS", action.res.status, action.res.data)
      return new Immutable.List(action.res.data.data)
    default:
      return state
  }
}
