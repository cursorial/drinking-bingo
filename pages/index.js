import React from 'react'
import NavigationBar from '../components/navigation_bar'

export default class Index extends React.Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <p>Hello, World!</p>
      </div>
    )
  }
}
