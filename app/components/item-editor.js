import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router"

import { Button, FormGroup, Col } from "react-bootstrap/lib"
import { Form, ValidatedInput } from "react-bootstrap-validation"

import console from "../lib/console"
import * as ItemActions from "../actions/ItemActions"

import ItemList from "./item-list"

class ItemEditor extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static needs = [
    ItemActions.getItem
  ]

  _handleValidSubmit(values) {
    console.dump("ItemEditor->_handleValidSubmit", this, values)

    this.props.dispatch(ItemActions.updateItem(this.props.item.id, values)).then(() => {
      this.props.router.replace("/")
    })
  }

  _handleInvalidSubmit(errors, values) {
    console.dump("ItemEditor->_handleInvalidSubmit", this, errors, values)
  }

  render() {
    console.dump("ItemEditor->render", this)

    const { item, dispatch } = this.props

    return (
      <Form 
        className="item-editor" 
        onValidSubmit={this._handleValidSubmit.bind(this)} 
        onInvalidSubmit={this._handleInvalidSubmit.bind(this)}
      >
        <ol className="breadcrumb">
          <li><Link to={`/`}>Items</Link></li>
          <li className="active">{item.name}</li>
        </ol>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Edit: <strong>{item.name}</strong></h3>
          </div>
          <div className="panel-body">
            <div className="container no-h-padding">
              <div className="row">
                <Col xs={4}>
                  <ValidatedInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={this.props.item.name}
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
                    defaultValue={this.props.item.value}
                    validate={(val, context) => { return !isNaN(parseFloat(val)) } }
                    errorHelp="Invalid value"
                  />
                </Col>
              </div>

              <div className="row">
                <Col xs={12}>
                  <Button bsStyle="primary" type="submit">Save</Button> <Link className="btn btn-default" to={`/`}>Cancel</Link>
                </Col>
              </div>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

export default connect(state => (state))(withRouter(ItemEditor))
