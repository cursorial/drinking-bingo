import React from 'react'
import Link from 'next/link'

export default class NavigationItem extends React.Component {
  render () {
    const {key, url, name} = this.props
    return (
      <li key={key}>
        <Link href={url}>
          <a>{name}</a>
        </Link>
      </li>
    )
  }
}
