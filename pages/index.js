import React from 'react'
import NavigationBar from '../components/navigation_bar'
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
    let { shows, showName } = this.state
    axios.post('/create_show', {
      showName: showName
    }).then((response) => {
      shows.push(showName)
      this.setState({
        showAddedStatus: response.data.success,
        shows: shows
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
            <li>{show.name}</li>
          )
        })}
      </ul>
    )
  }

  renderAddShowForm () {
    return (
      <div>
        <input type='text' onChange={this.handleShowNameChange} />
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
