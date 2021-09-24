import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import Footer from '../components/Footer';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';

import { requestRobots, setSearchField } from '../actions'

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  } 
}

const App = (props) => {

  // const [robots, setRobots] = useState([]);
  // const [searchField, setSearchField] = useState('');
  const { searchField, onSearchChange, robots, isPending, onRequestRobots } = props
  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })

  useEffect(() => {
    onRequestRobots()
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(users => setRobots(users))
    //   .catch(err => console.log(err)); 
  }, [])

  // const onSearchChange = (event) => {
  //   setSearchField(event.target.value)   
  // }
    

    return isPending ?
  // return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
        <Footer />
      </div>
    )    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);