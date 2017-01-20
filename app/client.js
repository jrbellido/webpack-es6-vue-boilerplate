import "babel-polyfill"

import React from "react"
import { render } from "react-dom"
import { Router, browserHistory, RouterContext, match } from "react-router"
import { fromJS } from "immutable"
import { Provider } from "react-redux"
import { createStore, combineReducers, applyMiddleware }  from "redux"
import assign from "object-assign"

import appReducers from "./reducers"
import routes from "./routes"

import * as ItemActions from "./actions/ItemActions"
import promiseMiddleware from "./lib/promiseMiddleware"
import fetchComponentData from "./lib/fetchComponentData"
import console from "./lib/console"

if (typeof window !== 'undefined')
  require("./styles/app.scss")

const initialState = window.__INITIAL_STATE__

const reducer = combineReducers(appReducers)

const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState)

browserHistory.listenBefore((location, callback) => {
	console.dump("browserHistory->listenBefore", location, callback)

	match({ routes, location }, (err, redirectLocation, renderProps) => {
		console.dump("react-router->match", err, redirectLocation, renderProps)

	    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
	    	.then(() => {
		    	callback()
	    	})
	    	.catch(err => console.error(err.message))
	})
})

render(
	<Provider store={store}>
		<Router 
			children={routes} 
			history={browserHistory} 
		/>
	</Provider>,
	document.getElementById("root")
)
