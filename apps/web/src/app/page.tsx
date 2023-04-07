import React from 'react'
import '../styles/globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Family-Daily | Home',
  description: 'Free & open-source text similarity API',
}
const RootPage = () => {
  return (
    <div className='text-green-500'>RootPage</div>
  )
}

export default RootPage