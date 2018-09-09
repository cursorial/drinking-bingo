import React from 'react'
import NavigationBar from '../components/navigation_bar'
import Link from 'next/link'
import axios from 'axios'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      shows: [],
      showName: ''
    }

    this.handleShowNameChange = this.handleShowNameChange.bind(this)
    this.handleAddShowClick = this.handleAddShowClick.bind(this)
  }

  componentDidMount () {
    axios.post('/shows_index')
      .then((response) => {
        this.setState({
          shows: response.data.shows
        })
      })
  }

  handleShowNameChange (event) {
    this.setState({
      showName: event.target.value
    })
  }

  handleAddShowClick () {
    axios.post('/create_show', {
      showName: this.state.showName
    }).then((response) => {
      axios.post('/shows_index')
        .then((response) => {
          this.setState({
            shows: response.data.shows,
            showName: ''
          })
        })
    })
  }

  renderShows () {
    return (
      <ul>
        {this.state.shows.map((show) => {
          return (
            <li>
              <Link href={{ pathname: '/show', query: { id: show.id, name: show.name } }} >
                <a>{show.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  renderAddShowForm () {
    return (
      <React.Fragment>
        <input type='text' onChange={this.handleShowNameChange} value={this.state.showName} />
        <button onClick={this.handleAddShowClick}>Add Show</button>
      </React.Fragment>
    )
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <h3>Drinking Bingo!</h3>
        {this.renderShowAddedStatus()}
        {this.renderShows()}
        {this.renderAddShowForm()}
      </div>
    )
  }
}
