import React, { PropTypes, Component } from "react"
import { withRouter } from "react-router"
import NavMenu from "./nav-menu"
import Footer from "./footer"

class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    console.dump("AppLayout->render", this)

    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="brand app-header">
              <h1></h1>
          
              <NavMenu route={this.props.route} location={this.props.location} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AppLayout)
