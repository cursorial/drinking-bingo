import React from 'react'
import NavigationBar from '../components/navigation_bar'
import axios from 'axios'
import Link from 'next/link'

export default class Show extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      seasons: [],
      seasonNumber: 1
    }

    this.handleAddSeasonClick = this.handleAddSeasonClick.bind(this)
    this.handleSeasonNumberChange = this.handleSeasonNumberChange.bind(this)
  }

  componentDidMount () {
    axios.post('/seasons_index', {
      showId: this.props.url.query.id
    }).then((response) => {
      this.setState({
        seasons: response.data.seasons
      })
    })
  }

  handleAddSeasonClick (event) {
    axios.post('/create_season', {
      seasonNumber: this.state.seasonNumber
    }).then((response) => {
      axios.post('/seasons_index', {
        showId: this.props.url.query.id
      }).then((response) => {
        this.setState({
          seasons: response.data.seasons,
          seasonNumber: 1
        })
      })
    })
  }

  handleSeasonNumberChange (event) {
    if (event.target.value < 1 || event.target.value > 500) {
      event.target.value = 1
    }
    this.setState({
      seasonNumber: event.target.value
    })
  }

  renderSeasons () {
    return (
      <ul>
        {this.state.seasons.map((season) => {
          return (
            <li>
              <Link href={{ pathname: '/season', query: { id: season.id, name: season.season_number } }} >
                <a>Season {season.season_number}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  renderAddSeasonForm () {
    return (
      <React.Fragment>
        <input type='number' onChange={this.handleSeasonNumberChange} value={this.state.seasonNumber} />
        <button onClick={this.handleAddSeasonClick}>Add Season</button>
      </React.Fragment>
    )
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <h3>
          {this.props.url.query.name}
        </h3>
        {this.renderSeasons()}
        {this.renderAddSeasonForm()}
      </div>
    )
  }
}
