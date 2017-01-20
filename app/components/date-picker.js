import React, { Component, PropTypes } from "react"
import { ValidatedInput } from "react-bootstrap-validation"

class DatePicker extends Component {
  componentDidMount() {
    if (typeof document != "undefined") {
      var flatpickr = require("flatpickr")

      flatpickr(this.refs.datepickerCt, {
        minDate: "today",
        defaultDate: "today"
      })
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <input ref="datepickerCt" className="form-control" placeholder="dd/mm/yyyy" />
      )
  }
}

export default DatePicker
