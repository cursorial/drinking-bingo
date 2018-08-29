import React from 'react'
import Link from 'next/link'

export default class NavigationItem extends React.Component {
  render () {
    const {url, name} = this.props
    return (
      <li>
        <Link href={url}>
          <a>{name}</a>
        </Link>
      </li>
    )
  }
}
