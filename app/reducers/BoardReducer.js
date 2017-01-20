import Immutable from "immutable"

import console from "../lib/console"

const defaultState = new Immutable.List()

export default function BoardReducer(state = defaultState, action) {
  switch(action.type) {
    case "GET_BOARDS":
      console.dump("BoardReducer; GET_BOARDS", action.res.status, action.res.data)
      return new Immutable.List(action.res.data.data).sortBy( board => board.name )
    default:
      return state
  }
}
