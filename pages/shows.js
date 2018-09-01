import React from 'react'
import NavigationBar from '../components/navigation_bar'
import axios from 'axios'

export default class Shows extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      seasons: []
    }
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

  render () {
    return (
      <div>
        <NavigationBar />
        <h3>
          {this.props.url.query.name}
        </h3>
      </div>
    )
  }
}
