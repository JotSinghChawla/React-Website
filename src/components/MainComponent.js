import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
    }    
}

class Main extends Component {

    // onDishSelect(dishId) {
    //     this.props.selectedDish === dishId ? this.setState({ selectedDish: null }) : this.setState({ selectedDish: dishId }) 
    // }

  render() {
    // Another method to pass props in Home component
    const HomePage = () => {
      return ( <Home dish={ this.props.dishes.filter( (check) => check.featured )[0] }
                     promotion={ this.props.promotions.filter( (check) => check.featured )[0] }
                     leader={ this.props.leaders.filter( (check) => check.featured )[0] } 
                /> )
    }

    // Here match is a prop which is part of Route component just like history & location
    const DishWithId = ({ match }) => {
      return (
        <DishdetailComponent sentDish={ this.props.dishes.filter( check => check.id === parseInt(match.params.dishId) )} 
          comments={this.props.comments.filter( check => check.dishId === parseInt(match.params.dishId) )} />
      )
    }

    return (
      <div >
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />       
          <Route exact path='/menu' component={ () => <Menu sentDishes={this.props.dishes} /> } />
          <Route path='/menu/:dishId' component={ DishWithId } />
          <Route exact path='/aboutus' component={ () => <About leaders={this.props.leaders} /> } />
          <Route exact path='/contactus' component={ Contact } />
          <Redirect to='/home' />
        </Switch>
{/*         
        <Menu sentDishes={this.props.dishes} 
            onClick={ (dishId) => this.onDishSelect(dishId) } />
        <DishdetailComponent 
            sentDish={ this.props.dishes.filter( (dish) => this.props.selectedDish === dish.id ) }/>     */}

            {/* This will Send a Selected dish in JSON format (Array of object) */}
        <Footer />
      </div>
    );
  }
}

export default (connect(mapStateToProps)(Main));
