import React from 'react'

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.changeUserName(this.state.search)
    this.setState({ search: '' })
  }

  render() {
    return (
      <div className='searchbar'>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h5>FIND A USER:&nbsp;</h5>
            <input
              type='text'
              name='search'
              value={this.state.search}
              onChange={this.handleChange}
              placeholder='Github Username'
            />
          </label>
          <button type='submit'>SEARCH</button>
        </form>
      </div>
    )
  }
}

export default Search
