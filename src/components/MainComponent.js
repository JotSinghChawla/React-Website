import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishdetailComponent from './DishdetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'



class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes : DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS, 
      // selectedDish: null
    };
  }

    // onDishSelect(dishId) {
    //     this.state.selectedDish === dishId ? this.setState({ selectedDish: null }) : this.setState({ selectedDish: dishId }) 
    // }

  render() {
    // Another method to pass props in Home component
    const HomePage = () => {
      return ( <Home dish={ this.state.dishes.filter( (check) => check.featured )[0] }
                     promotion={ this.state.promotions.filter( (check) => check.featured )[0] }
                     leader={ this.state.leaders.filter( (check) => check.featured )[0] } 
                /> )
    }

    const DishWithId = ({ match }) => {
      return (
        <DishdetailComponent sentDish={ this.state.dishes.filter( check => check.id === parseInt(match.params.dishId) )} 
          comments={this.state.comments.filter( check => check.dishId === parseInt(match.params.dishId) )} />
      )
    }

    return (
      <div >
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />       
          <Route exact path='/menu' component={ () => <Menu sentDishes={this.state.dishes} /> } />
          <Route path='/menu/:dishId' component={ DishWithId } />
          <Route exact path='/aboutus' component={ () => <About leaders={this.state.leaders} /> } />
          <Route exact path='/contactus' component={ Contact } />
          <Redirect to='/home' />
        </Switch>
{/*         
        <Menu sentDishes={this.state.dishes} 
            onClick={ (dishId) => this.onDishSelect(dishId) } />
        <DishdetailComponent 
            sentDish={ this.state.dishes.filter( (dish) => this.state.selectedDish === dish.id ) }/>     */}

            {/* This will Send a Selected dish in JSON format (Array of object) */}
        <Footer />
      </div>
    );
  }
}

export default Main;
