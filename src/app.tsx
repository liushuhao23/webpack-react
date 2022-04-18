/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-03 22:05:47
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-18 10:46:31
 */
import React, { useState } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from '@/router'


import './App.less'
const RouteElement =() => {
    const element = useRoutes(routes)
    return element
  }
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <RouteElement />
                </header>
            </div>
        </BrowserRouter>
    )
}

export default App
