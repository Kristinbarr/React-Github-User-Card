import React from 'react'
import FollowerList from './components/FollowerList'
import Search from './components/Search'
import './App.scss'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: 'kristinbarr',
      userInfo: {},
      followers: [],
      search: ''
    }
  }

  changeUserName = (userName) => {
    this.setState({ userName: userName })
  }

  componentDidMount() {
    this.fetchFollowers()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userName !== this.state.userName) {
      this.fetchFollowers()
    }
  }

  fetchFollowers = () => {
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then((res) => {
        return res.json()
      })
      .then((resInfo) => {
        this.setState({ userInfo: resInfo })
        return fetch(this.state.userInfo.followers_url)
      })
      .then((followers) => {
        return followers.json()
      })
      .then((userFollowers) => {
        this.setState({ followers: userFollowers })
        return userFollowers
      })
      .catch((err) => {
        console.log('something went wrong!', err)
      })
  }

  render() {
    // console.log('state', this.state)
    // console.log('props', this.props)
    const { userName, followers, userInfo } = this.state

    return (
      <div className='App'>
        <header className='App-header'>
          <h3>GITHUB USER CARD</h3>
          <Search changeUserName={this.changeUserName} />
        </header>

        <div className='profile'>
          <img src={userInfo.avatar_url} alt='avatar' />
          <div className='profile-name'>
            <h3>{userInfo.name}</h3>
            <h5>
              Location:&nbsp;<span>{userInfo.location}</span>
            </h5>
            <h5>{userInfo.bio}</h5>
          </div>
          <div className='stats'>
            <div className='stat-item'>
              <h3>{userInfo.public_repos}</h3>
              <h5>Public Repos</h5>
            </div>
            <div className='stat-item'>
              <h3>{userInfo.followers}</h3>
              <h5>Followers</h5>
            </div>
            <div className='stat-item'>
              <h3>{userInfo.following}</h3>
              <h5> Following</h5>
            </div>
          </div>
        </div>
        <FollowerList
          userName={userName}
          followers={followers}
          userInfo={userInfo}
        />
      </div>
    )
  }
}

export default App
