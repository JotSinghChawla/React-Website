import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

export default class DishdetailComponent extends Component {
    renderDish(dish) {
        return dish !== null ?
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            : <div></div> 
    }
    showComments(dish) {
        
        return dish !== null ? <>
            <h3>Comments</h3>
                <div>
                    { dish.comments.map(element => {
                       return ( <li key={element.id}>
                            <p> {element.comment} </p>
                            <p>  -- {element.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse( element.date )) )} </p>
                        </li>
                            ) 
                        }) 
                    }
                </div>    
        </> : <div></div>
    }
    render() {
        const dish = this.props.sentDish.length !== 0 ? this.props.sentDish[0] : null ;
        return ( 
            <div className='container'>
                <div className='row'>
                    <div className="col-12 col-md-5 m-2" >
                        { this.renderDish(dish) }
                    </div>
                    <div className="col-12 col-md-5 m-2" >
                        <ul className='list-unstyled'>
                            { this.showComments(dish) }
                        </ul>
                    </div>
                </div>
            </div> 
        )
    }
}
