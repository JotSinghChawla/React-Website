import React from 'react'
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

const DishdetailComponent = ({ sentDish }) => {

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
                    { dish.comments.map(element => {
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

    {/* Select the first object in Array of objects*/}
    const inputDish = sentDish.length !== 0 ?sentDish[0] : null ;    
    
    return ( 
        <div className='container'>
            <div className='row'>
                <div className="col-12 col-md-5 m-2" >
                    <RenderDish dish={ inputDish } />
                </div>
                <div className="col-12 col-md-5 m-2" >
                    <ul className='list-unstyled'>
                        <ShowComments dish={ inputDish } />
                    </ul>
                </div>
            </div>
        </div> 
    )

   
    
}


export default DishdetailComponent
