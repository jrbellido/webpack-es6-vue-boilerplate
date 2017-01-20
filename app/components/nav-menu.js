import React, { PropTypes, Component } from "react"
import { withRouter, Link, browserHistory } from "react-router"
import { connect } from "react-redux"

class NavMenuItem extends Component {
	constructor(props) {
		super(props)

		this.state = { className: this.props.location.pathname == this.props.to ? "active" : "" }
	}

	updateActive(context) {
		return function(loc) {
			context.setState({ className: loc.pathname == context.props.to ? "active" : "" })
		}
	}

	componentDidMount() {
		this.props.router.registerTransitionHook(this.updateActive(this))
	}

	componentWillUnmount() {
		this.props.router.unregisterTransitionHook()	
	}

	render() {
		return (
			<li role="presentation" className={this.state.className}>
				<Link to={this.props.to}>{this.props.children}</Link>
			</li>
		)
	}
}

class NavMenu extends Component {
	render() {
		return (
			<ul className="nav nav-pills nav-menu">
				<NavMenuItem to={`/hotels`} {...this.props}>Hotels</NavMenuItem>
				<NavMenuItem to={`/bookings`} {...this.props}>Bookings</NavMenuItem>
				{/* <NavMenuItem to={`/pins`} {...this.props}>Pinterest</NavMenuItem> */}
				{/* <NavMenuItem to={`/items`} {...this.props}>Item</NavMenuItem> */}
				<NavMenuItem to={`/about`} {...this.props}>About</NavMenuItem>
			</ul>
		)
	}
}

export default withRouter(NavMenu)
