import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle } from 'reactstrap'; 


class Menu extends Component {

    constructor(props) {
        super(props);

        console.log("1. constructor is called")
    }

    componentDidMount() {
        console.log("3. componentDidMount is called")
    }
    componentDidUpdate() {
        console.log('4. componentDidUpdate is called')
    }

    // renderDish(dish) {
    //     if(dish!==null){
    //         return(
    //             <Card>
    //                 <CardImg width="100%" src={dish.image} alt={dish.name} />
    //                 <CardBody>
    //                     <CardTitle> {dish.name} </CardTitle>
    //                     <CardText> {dish.description} </CardText>
    //                 </CardBody>
    //             </Card>
    //         )
    //     }
    //     else{
    //         return (
    //             <div></div>
    //         )
    //     }
    // }

    // showComments(dish) {
    //     return dish !== null ? <div>
    //         <h3>Comments</h3>
            
    //     </div> : <div></div>
    // }

    render() {

        console.log("2. render is called")

        const menu = this.props.sentDishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-2">
                    <Card onClick={ () => this.props.onClick(dish.id) }>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle> {dish.name} </CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div> 
            );
        });

        return (  
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
         );
    } 
}

export default Menu;