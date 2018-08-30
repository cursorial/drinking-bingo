import React from 'react'
import NavigationBar from '../components/navigation_bar'
import axios from 'axios'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      shows: []
    }
  }

  componentDidMount () {
    axios.post('/shows_index')
      .then((response) => { response.json() })
      .then((data) => {
        this.setState({
          shows: data
        })
      })
  }

  renderShows () {
    return (
      <ul>
        {this.state.shows.map((show) => {
          return (
            <li>Show</li>
          )
        })}
      </ul>
    )
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <h3>Drinking Bingo!</h3>
        {this.renderShows()}
      </div>
    )
  }
}
