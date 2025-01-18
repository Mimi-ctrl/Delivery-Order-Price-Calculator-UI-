import React from 'react'
import ReactDOM from 'react-dom/client'
import DeliveryOrderPriceCalculator from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <DeliveryOrderPriceCalculator />
  </React.StrictMode>
)
