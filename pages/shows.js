import React from 'react'
import NavigationBar from '../components/navigation_bar'

export default class Shows extends React.Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <h3>
          {this.props.url.query.id}
        </h3>
      </div>
    )
  }
}
