import React, { Component } from 'react';
import Menu from './MenuComponent'
import DishdetailComponent from './DishdetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addComment, fetchComments, fetchDishes, fetchPromos } from '../redux/ActionCreators'
import { actions } from 'react-redux-form'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
    }    
}

const mapDispatchToProps = (dispatch) => ({
  addComment: ( dishId, rating, author, comment ) => dispatch(addComment( dishId, rating, author, comment )) ,
  fetchDishes: () => { dispatch(fetchDishes()) } ,
  resetFeedbackForm: () => { dispatch( actions.reset('feedback') ) } ,
  fetchComments: () => { dispatch(fetchComments()) } ,
  fetchPromos: () => { dispatch(fetchPromos()) } ,
})

class Main extends Component {

    // onDishSelect(dishId) {
    //     this.props.selectedDish === dishId ? this.setState({ selectedDish: null }) : this.setState({ selectedDish: dishId }) 
    // }
  
  componentDidMount() {
    this.props.fetchDishes()      // this function is called
    this.props.fetchComments() 
    this.props.fetchPromos()  
  }

  render() {
    // Another method to pass props in Home component
    const HomePage = () => {
      return ( <Home dish={ this.props.dishes.dishes.filter( (check) => check.featured )[0] }
                     dishesLoading={ this.props.dishes.isLoading }
                     dishesErrMess={this.props.dishes.errorMessage }
                     promosLoading={ this.props.promotions.isLoading }
                     promosErrMess={this.props.promotions.errorMessage }
                     promotion={ this.props.promotions.promotions.filter( (check) => check.featured )[0] }
                     leader={ this.props.leaders.filter( (check) => check.featured )[0] } 
                /> )
    }

    // Here match is a prop which is part of Route component just like history & location
    const DishWithId = ({ match }) => {
      return (
        <DishdetailComponent sentDish={ this.props.dishes.dishes.filter( check => check.id === parseInt(match.params.dishId) )}
          isLoading={ this.props.dishes.isLoading }
          errMess={this.props.dishes.errorMessage } 
          commentsErrMess={this.props.comments.errorMessage } 
          comments={this.props.comments.comments.filter( check => check.dishId === parseInt(match.params.dishId) )}
          addComment={ this.props.addComment } />
      )
    }

    return (
      <div >
        <Header />
        <Switch>
          <Route path='/home' component={ HomePage } />       
          <Route exact path='/menu' component={ () => <Menu sentDishes={this.props.dishes} /> } />
          <Route path='/menu/:dishId' component={ DishWithId } />
          <Route exact path='/aboutus' component={ () => <About leaders={this.props.leaders} /> } />
          <Route exact path='/contactus' component={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
