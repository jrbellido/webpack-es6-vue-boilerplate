import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router"

import console from "../lib/console"

import * as ItemActions from "../actions/ItemActions"

import ItemNew from "./item-new"
import ItemList from "./item-list"

class ItemManager extends Component {
  static propTypes = {
    items: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static needs = [
    ItemActions.getItems
  ]

  componentWillReceiveProps() {
    console.dump("ItemManager->componentWillReceiveProps", this)

    this.forceUpdate()
  }

  render() {
    const { items, dispatch } = this.props

    console.dump("ItemManager->render", this)

    return (
      <div className="item-manager">
        <div className="heading container-fluid no-h-padding">
          <div className="row">
            <div className="col-xs-6">
              <h3 className="no-v-margin">Item manager</h3>
            </div>
            <div className="col-xs-6 align-right">
              <Link className="btn btn-primary" to={`/item/new`}>New</Link>
            </div>
          </div>
        </div>

        <ItemList items={items} dispatch={dispatch}
            {...bindActionCreators(ItemActions, dispatch)} />
      </div>
    )
  }
}

export default connect(state => (state))(withRouter(ItemManager))
