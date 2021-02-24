import React from 'react'
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'

const DishdetailComponent = ({ sentDish, comments }) => {

    // This is a functional component
    const RenderDish = ({ dish }) => {                  
        return dish !== null ?
                <Card>
                    <CardImg width="100%" top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            : <div></div> 
    }

    // This is a functional component
    const ShowComments = ({ dish }) => {
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
        </> : <div></div>
    }

    const inputDish = sentDish.length !== 0 ? sentDish[0] : null ;    
    const inputComments = comments.length !== 0 ? comments : null;
    
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
                        <ShowComments dish={ inputComments } />
                    </ul>
                </div>
            </div>
        </div> 
    )

   
    
}


export default DishdetailComponent
