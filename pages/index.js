import React from 'react'
import NavigationBar from '../components/navigation_bar'
import Link from 'next/link'
import axios from 'axios'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      shows: [],
      showName: '',
      showAddedStatus: ''
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
    let { showName } = this.state
    axios.post('/create_show', {
      showName: showName
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

  renderShowAddedStatus () {
    return (
      <div>
        {this.state.showAddedStatus}
      </div>
    )
  }

  renderShows () {
    return (
      <ul>
        {this.state.shows.map((show) => {
          return (
            <li>
              <Link href={{ pathname: '/shows', query: { id: show.id } }} >
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
      <div>
        <input type='text' onChange={this.handleShowNameChange} value={this.state.showName} />
        <button onClick={this.handleAddShowClick}>Add Show</button>
      </div>
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
