import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import Immutable from "immutable"
import * as ItemActions from "../actions/ItemActions"

import Item from "./item"

export default class ItemList extends Component {
  static propTypes = {
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    console.dump("ItemList->render", this)

  	const { items, dispatch } = this.props

    return (
      <table className="item-list table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, index) => {
              return (<Item key={index} item={item} dispatch={dispatch} {...bindActionCreators(ItemActions, dispatch)} />)
            })
          }
        </tbody>
      </table>
    )
  }
}
