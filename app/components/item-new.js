import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router"

import { Button, FormGroup, Col } from "react-bootstrap/lib"
import { Form, ValidatedInput } from "react-bootstrap-validation"

import console from "../lib/console"
import * as ItemActions from "../actions/ItemActions"

import Item from "./item"

class ItemNew extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  _handleValidSubmit(values) {
    console.dump("ItemNew->_handleValidSubmit", this, values)

    this.props.dispatch(ItemActions.createItem(values.name, values.value)).then(() => {
      this.props.router.replace("/")
    })
  }

  _handleInvalidSubmit(errors, values) {
    console.dump("ItemNew->_handleInvalidSubmit", this, errors, values)
  }

  render() {
    return (
      <Form 
        className="item-new"
        onValidSubmit={this._handleValidSubmit.bind(this)} 
        onInvalidSubmit={this._handleInvalidSubmit.bind(this)}
      >
        <ol className="breadcrumb">
          <li><Link to={`/`}>Items</Link></li>
          <li className="active">New</li>
        </ol>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Create a new item</h3>
          </div>
          <div className="panel-body">
            <div className="container no-h-padding">
              <div className="row">
                <Col xs={4}>
                  <ValidatedInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    validate="required,isLength:5:60"
                    errorHelp={{
                      required: "Please enter a name",
                      isLength: "Name must be between 5 and 60 characters long"
                    }}
                  />
                </Col>
              </div>

              <div className="row">
                <Col xs={4}>
                  <ValidatedInput
                    type="text"
                    name="value"
                    placeholder="Value"
                    validate={(val, context) => { return !isNaN(parseFloat(val)) } }
                    errorHelp="Invalid value"
                  />
                </Col>
              </div>

              <div className="row">
                <Col xs={12}>
                  <Button bsStyle="primary" type="submit">Create</Button> <Link className="btn btn-default" to={`/`}>Cancel</Link>
                </Col>
              </div>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

export default connect(state => (state))(withRouter(ItemNew))
