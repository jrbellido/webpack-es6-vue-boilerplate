import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router"

import console from "../lib/console"

import * as PinterestActions from "../actions/PinterestActions"

if (typeof window !== "undefined")
  require("../styles/pinterest.scss")

class BoardEditor extends Component {
  static propTypes = {
    pins: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static needs = [
    PinterestActions.getPins
  ]

  render() {
    const { pins, dispatch } = this.props

    console.dump("BoardEditor->render", this)

    return (
      <div>
        <h3>Board: { pins.first().board.name }</h3>

        <div className="pin-container">
        {
          pins.map(
            (pin) => {
              return (<div className="pin-item" key={pin.id}>
                <div className="pin-image">
                  <img 
                    data-pin-nopin="true" 
                    src={`http://localhost:3131/pinterest/thumb?url=${pin.image.original.url}`} 
                    width={pin.image.original.width}
                    height={pin.image.original.height}
                    />
                </div>
              </div>)
            }
          )
        }
        </div>
      </div>
    )
  }
}

export default connect(state => (state))(withRouter(BoardEditor))
