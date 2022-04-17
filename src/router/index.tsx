/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-17 17:39:08
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-17 23:29:25
 */
import * as React from "react";
import TestA from '../components/testA'
import TestB from '../components/testb'
import LayoutCom from '@/Layout';
import {  Navigate, useRoutes } from 'react-router-dom';
const routes = [
    {
      path: '/*',
      element: <LayoutCom />,
      children: [
        { path: '', element: <Navigate to="testA" /> }, // Redirect
        {
          path: 'testA',
          element: <TestA />
        },
        {
            path: 'testB',
            element: <TestB />
        }
      ]
    },
]

export { routes }
  