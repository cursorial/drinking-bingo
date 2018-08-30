import React from 'react'

export default class Shows extends React.Component {
  render () {
    return (
      <h3>
        {this.props.url.query.id}
      </h3>
    )
  }
}