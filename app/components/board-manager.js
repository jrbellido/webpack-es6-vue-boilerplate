import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router"

import console from "../lib/console"

import * as PinterestActions from "../actions/PinterestActions"

class BoardManager extends Component {
  static propTypes = {
    boards: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static needs = [
    PinterestActions.getBoards
  ]

  render() {
    const { boards, dispatch } = this.props

    console.dump("BoardManager->render", this)

    return (
      <div className="item-manager">
        <div className="heading container-fluid no-h-padding">
          <div className="row">
            <div className="col-xs-6">
              <h3 className="no-v-margin">Board manager</h3>
            </div>
            <div className="col-xs-6 align-right">
              <Link className="btn btn-primary" to={`/item/new`}>New</Link>
            </div>
          </div>
        </div>

        {
          boards.map((board, index) => {
            return (<div key={board.id}><Link to={`/pins/${board.id}`}>{ board.name }</Link></div>)
          })
        }
      </div>
    )
  }
}

export default connect(state => (state))(withRouter(BoardManager))
