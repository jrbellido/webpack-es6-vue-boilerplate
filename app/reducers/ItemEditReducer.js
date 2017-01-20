import Immutable from "immutable"

import console from "../lib/console"

const defaultState = new Immutable.Map()

export default function ItemEditReducer(state = defaultState, action) {
  switch(action.type) {
    case "GET_ITEM":
      console.dump("ItemReducer; GET_ITEM", action.res.status, action.res.statusText)
      return action.res.data
    default:
      return state
  }
}
