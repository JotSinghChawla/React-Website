import React from 'react'
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import SubmitComment from './CommentFormComponent'
import { postComment } from '../redux/ActionCreators';
import Loading  from './LoadingComponent'
import { baseURL } from '../shared/baseURL'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

const DishdetailComponent = ({ sentDish, comments, postComment, isLoading, errMess }) => {

    // This is a functional component
    const RenderDish = ({ dish }) => {                  
        return dish !== null ?
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%) '}} >
                    <Card>
                        <CardImg width="100%" top src={baseURL + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            : <div></div> 
    }

    // This is a functional component
    const ShowComments = ({ dish, postComment, dishId }) => {
        return dish !== null ? <>
            <h3>Comments</h3>
                <ul className='list-unstyled'>
                    <Stagger in>
                        { dish.map(element => {
                        return ( 
                            <Fade in>
                                <li key={element.id}>
                                    <p> {element.comment} </p>
                                    <p>  -- {element.author} | {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse( element.date )) )} </p>
                                </li>
                            </Fade>
                                ) 
                            }) 
                        }
                    </Stagger>
                </ul> 
                <SubmitComment text='Submit Comment' dishId={dishId} postComment={postComment}/>   
        </> : <div></div>
    }

    const inputDish = sentDish.length !== 0 ? sentDish[0] : null ;    
    const inputComments = comments.length !== 0 ? comments : null;

    if(isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
    }

    else 
    {
    return ( 
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem> 
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active> 
                        { inputDish.name }
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='row'>
                <div className="col-12 col-md-5 m-2" >
                    <RenderDish dish={ inputDish } />
                </div>
                <div className="col-12 col-md-5 m-2" >
                    <ul className='list-unstyled'>
                        <ShowComments dish={ inputComments } postComment={ postComment } dishId={ inputDish.id } />
                    </ul>
                </div>
            </div>
        </div> 
    )
    }
   
    
}


export default DishdetailComponent
