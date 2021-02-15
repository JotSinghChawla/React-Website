import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes'
import DishdetailComponent from './DishdetailComponent'

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes : DISHES,
      selectedDish: null
    };
  }

    onDishSelect(dishId) {
        this.state.selectedDish === dishId ? this.setState({ selectedDish: null }) : this.setState({ selectedDish: dishId }) 
    }

  render() {
    return (
      <div >
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu sentDishes={this.state.dishes} 
            onClick={ (dishId) => this.onDishSelect(dishId) } />
        <DishdetailComponent 
            sentDish={ this.state.dishes.filter( (dish) => this.state.selectedDish === dish.id ) }/>        
            {/* This will Send a Selected dish in JSON format (Array of object) */}
      </div>
    );
  }
}

export default Main;
