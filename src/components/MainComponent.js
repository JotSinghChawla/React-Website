import React, { Component } from 'react';
import Menu from './MenuComponent'
import DishdetailComponent from './DishdetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import About from './AboutComponent'
import Contact from './ContactComponent'
import Favorites from './FavoriteComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback, fetchFavorites, postFavorites, deleteFavorites, loginUser, logoutUser } from '../redux/ActionCreators'
import { actions } from 'react-redux-form'              // For Reseting the Feedback Form 
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth
    }    
}

const mapDispatchToProps = (dispatch) => ({
  postComment: ( dishId, rating, author, comment ) => {dispatch( postComment( dishId, rating, author, comment ) ) },
  postFeedback: ( firstname, lastname, email, telnum, agree, contactType ,message ) => { dispatch( postFeedback( firstname, lastname, email, telnum, agree, contactType ,message ) ) },
  fetchDishes: () => { dispatch(fetchDishes() ) } ,
  resetFeedbackForm: () => { dispatch( actions.reset('feedback') ) } ,
  fetchComments: () => { dispatch( fetchComments() ) } ,
  fetchPromos: () => { dispatch( fetchPromos() ) } ,
  fetchLeaders: () => { dispatch( fetchLeaders() ) } ,
  fetchFavorites: () => { dispatch( fetchFavorites() ) } ,
  postFavorites: dishId => { dispatch( postFavorites(dishId) ) } ,
  deleteFavorites: dishId => dispatch(deleteFavorites(dishId) ),
  loginUser: creds => dispatch( loginUser(creds) ),
  logoutUser: () => dispatch( logoutUser() )
})

class Main extends Component {

    // onDishSelect(dishId) {
    //     this.props.selectedDish === dishId ? this.setState({ selectedDish: null }) : this.setState({ selectedDish: dishId }) 
    // }
  
  componentDidMount() {
    this.props.fetchDishes()      // this function is called
    this.props.fetchComments() 
    this.props.fetchPromos()  
    this.props.fetchLeaders()
    this.props.fetchFavorites()
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
                     leader={ this.props.leaders.leaders.filter( (check) => check.featured )[0] } 
                     leadersLoading={ this.props.leaders.isLoading }
                     leadersErrMess={ this.props.leaders.errorMessage }
                /> )        
    }

    // Here match is a prop which is part of Route component just like history & location
    const DishWithId = ({ match }) => {
      return (
         this.props.auth.isAuthenticated  ? 
            <DishdetailComponent sentDish={ this.props.dishes.dishes.filter( check => check.id === parseInt(match.params.dishId) )}
              isLoading={ this.props.dishes.isLoading }
              errMess={this.props.dishes.errorMessage } 
              commentsErrMess={this.props.comments.errorMessage } 
              comments={this.props.comments.comments.filter( check => check.dishId === parseInt(match.params.dishId) )}
              postComment={ this.props.postComment } 
              favorites={ this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
              postFavorites={this.props.postFavorite}
            />
          :
            <DishdetailComponent sentDish={ this.props.dishes.dishes.filter( check => check.id === parseInt(match.params.dishId) )}
              isLoading={ this.props.dishes.isLoading }
              errMess={this.props.dishes.errorMessage } 
              commentsErrMess={this.props.comments.errorMessage } 
              comments={this.props.comments.comments.filter( check => check.dishId === parseInt(match.params.dishId) )}
              postComment={ this.props.postComment } 
              favorites={ false } 
              postFavorites={this.props.postFavorites} 
            /> 
      )
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (         // IDK how it works ??
      <Route {...rest} render={ (props) => (
        this.props.auth.isAuthenticated ? 
          <Component {...props} />
          : 
          <Redirect to={{
            pathname: '/home',
            state: { from: props.location }           // state is used for Referring
          }} />
      )} />
    )

    return (
      <div >
       <Header loginUser={ this.props.loginUser }
               logoutUser={ this.props.logoutUser } 
               auth={ this.props.auth } />
        <TransitionGroup>
          <CSSTransition key={this.props.location.pathname} classNames='page' timeout={300}>   
             {/*  Here it is ClassNameS <-- in Csstransition component to apply to all children */}
            <Switch location={this.props.location}>
              {/* <Route path={ process.env.PUBLIC_URL + '/home'} component={ HomePage } />       
              <Route exact path={ process.env.PUBLIC_URL + '/aboutus'} component={ () => <About leaders={this.props.leaders.leaders} /> } />
              <Route exact path={ process.env.PUBLIC_URL + '/menu'} component={ () => <Menu sentDishes={this.props.dishes} /> } />
              <Route path={ process.env.PUBLIC_URL + '/menu/:dishId'} component={ DishWithId } />
              <Route exact path={ process.env.PUBLIC_URL + '/contactus'} component={ () => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} /> } />
              <Redirect to={ process.env.PUBLIC_URL + '/home'} /> */}
              <Route path='/home' component={ HomePage } />       
              <Route exact path='/aboutus' component={ () => <About leaders={this.props.leaders.leaders} /> } />
              <Route exact path='/menu' component={ () => <Menu sentDishes={this.props.dishes} /> } />
              <Route path='/menu/:dishId' component={ DishWithId } />
              <Route exact path='/contactus' component={ () => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} /> } />
              <PrivateRoute exact path='/favorites' component={ () => <Favorites fav={this.props.favorites} deleteFav={this.props.deleteFavorites} /> } />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
