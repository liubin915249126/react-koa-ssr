import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext,StaticRouter} from 'react-router'
import {Provider} from 'react-redux'
import routes from '../../client/routes'
import configureStore from '../../client/common/store/configureStore'

// const React = require('react')
// const renderToString = require('react-dom/server')
// const {match, RouterContext} = require('react-router')
// const {Provider} = require('react-redux')
// const routes = require('../../client/routes')
// const configureStore = require('../../client/common/store/configureStore')


const store = configureStore()

async function clientRoute(ctx, next) {
    let _renderProps

    match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
        _renderProps = renderProps
    })

    if (_renderProps) {
        await ctx.render('index', {
            root: renderToString(
                <Provider store={store}>
                  <StaticRouter location={req.url} context={context}>
                    <RouterContext {..._renderProps}/>
                  </StaticRouter>
                </Provider>
            ),
            state: store.getState()
        })
    } else {
        await next()
    }
}

export default clientRoute
// module.exports = clientRoute
