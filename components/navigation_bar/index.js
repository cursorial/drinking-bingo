import React from 'react'
import NavigationItem from './children/navigation_item'
import { PAGES } from './constants'

export default class NavigationBar extends React.Component {
  render () {
    return (
      <ul>
        {PAGES.map((page, index) => {
          return (
            <NavigationItem key={index} url={page.url} name={page.name} />
          )
        })}
      </ul>
    )
  }
}
