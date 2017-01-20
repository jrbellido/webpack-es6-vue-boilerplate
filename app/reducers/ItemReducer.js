import Immutable from "immutable"

import console from "../lib/console"

const defaultState = new Immutable.List()

export default function ItemReducer(state = defaultState, action) {
  switch(action.type) {
    case "GET_ITEMS":
      console.dump("ItemReducer; GET_ITEMS", action.res.status, action.res.statusText)
      return new Immutable.List(action.res.data)
    case "CREATE_ITEM":
      console.dump("ItemReducer; CREATE_ITEM", action.res.status, action.res.data)
      return new Immutable.List(state).push(action.res.data)
    case "DELETE_ITEM":
      console.dump("ItemReducer; DELETE_ITEM", action.res.status, action.res.data.id)
      return new Immutable.List(state).filter( i => i.id != action.res.data.id )
    default:
      return state
  }
}
