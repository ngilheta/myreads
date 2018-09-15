import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import WebFont from 'webfontloader'

WebFont.load({
    google: {
        families: ['Karla', 'sans-serif']
    }
})

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
    document.getElementById('root')
)
