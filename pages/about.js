import React from 'react'
import NavigationBar from '../components/navigation_bar'
import axios from 'axios'

export default class About extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {}
    }
  }

  componentDidMount () {
    axios.post('/db', {})
      .then((response) => {
        this.setState({
          data: response.data
        })
      })
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <p>About</p>
        <p>{JSON.stringify(this.state.data)}</p>
      </div>
    )
  }
}
