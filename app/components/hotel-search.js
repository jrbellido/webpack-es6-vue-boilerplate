import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router"
import { FormControl, Button, FormGroup, Col } from "react-bootstrap/lib"
import { Form, ValidatedInput } from "react-bootstrap-validation"
import axios from "axios"

import DatePicker from "./date-picker"

import console from "../lib/console"

class HotelSearch extends Component {
  static propTypes = {
    boards: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static needs = [
  ]

  _handleValidSubmit(values) {
    console.dump("HotelSearch->_handleValidSubmit", this, values)

    axios.get("http://localhost:3131/hotels").then((r) => {
      console.log(r.data)
    })
  }

  _handleInvalidSubmit(errors, values) {
    console.dump("HotelSearch->_handleInvalidSubmit", this, errors, values)
  }

  render() {
    const { boards, dispatch } = this.props

    console.dump("HotelSearch->render", this)

    return (
      <div className="hotel-search">
        <div className="heading container-fluid no-h-padding">
          <div className="row">
            <div className="col-md-6">
              <Form
                className="hotel-search-form form-inline"
                onValidSubmit={this._handleValidSubmit.bind(this)} 
                onInvalidSubmit={this._handleInvalidSubmit.bind(this)}
              >
                <FormGroup>
                  <FormControl
                    type="text"
                    name="q"
                    placeholder="Enter hotel name, destination, dates, etc."
                  />
                </FormGroup>

                <FormGroup>
                  <DatePicker />
                </FormGroup>

                <FormGroup>
                  <DatePicker />
                </FormGroup>

                <div className="action-buttons">
                  <Button bsStyle="primary" type="submit">Search</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => (state))(withRouter(HotelSearch))
