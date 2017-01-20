import React, { PropTypes, Component } from "react"
import { render } from "react-dom"
import { Link } from "react-router"

import Button from "react-bootstrap/lib/Button"
import Modal from "react-bootstrap/lib/Modal"

import * as ItemActions from "../actions/ItemActions"

class DeleteConfirmWindow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal 
        bsSize="small"
        animation={false}
        aria-labelledby="contained-modal-title-sm"
        {...this.props}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to delete one item, this procedure is irreversible.</p>
          <p>Do you want to proceed?</p>
          <p>Item ID: <br/> <strong>{this.props.item.id}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button bsStyle="danger" onClick={this.props.onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      showConfirm: false
    }
  }

  hideDeleteConfirm() {
    this.setState({ showConfirm: false })
  }

  showDeleteConfirm() {
    this.setState({ showConfirm: true })
  }

  confirmDelete() {
    console.dump("Item->confirmDelete", this)

    this.props.deleteItem(this.props.item.id)
    this.setState({ showConfirm: false })
  }

  render() {
  	const { item, dispatch } = this.props

    return (
      <tr className="item" key={item.id} ref="activeItem">
        <td><strong><Link to={`/item/${item.id}`}>{item.name}</Link></strong></td>
        <td><span>{item.value}</span></td>
        <td className="text-right">
          <Button bsSize="xsmall" onClick={(e) => this.showDeleteConfirm(e)}>Delete</Button>
          <DeleteConfirmWindow 
            onConfirm={(e) => this.confirmDelete(e)} 
            show={this.state.showConfirm} 
            onHide={(e) => this.hideDeleteConfirm(e)} 
            {...this.props} 
          />
        </td>
      </tr>
    )
  }
}
