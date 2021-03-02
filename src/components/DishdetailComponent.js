import React from 'react'
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import Submit from './CommentFormComponent'
import { addComment } from '../redux/ActionCreators';
import Loading  from './LoadingComponent'
import { baseURL } from '../shared/baseURL'

const DishdetailComponent = ({ sentDish, comments, addComment, isLoading, errMess }) => {

    // This is a functional component
    const RenderDish = ({ dish }) => {                  
        return dish !== null ?
                <Card>
                    <CardImg width="100%" top src={baseURL + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            : <div></div> 
    }

    // This is a functional component
    const ShowComments = ({ dish, addComment, dishId }) => {
        return dish !== null ? <>
            <h3>Comments</h3>
                <div>
                    { dish.map(element => {
                       return ( <li key={element.id}>
                            <p> {element.comment} </p>
                            <p>  -- {element.author} | {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse( element.date )) )} </p>
                        </li>
                            ) 
                        }) 
                    }
                </div> 
                <Submit text='Submit Comment' dishId={dishId} addComment={addComment}/>   
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
                        <ShowComments dish={ inputComments } addComment={ addComment } dishId={ inputDish.id } />
                    </ul>
                </div>
            </div>
        </div> 
    )
    }
   
    
}


export default DishdetailComponent
