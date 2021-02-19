import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'; 
import { Link } from "react-router-dom";

class Menu extends Component {

    constructor(props) {
        super(props);

        console.log("1. constructor is called")
    }
    componentWillMount() {
        console.log('2. componentWillMount is called')
    }
    componentDidMount() {
        console.log("4. componentDidMount is called")
    }
    componentDidUpdate() {
        console.log('5. componentDidUpdate is called')
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

        console.log("3. render is called")

        const menu = this.props.sentDishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-2">
                    <Card>
                        <Link to={ `/menu/${dish.id}` } >
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle> {dish.name} </CardTitle>
                            </CardImgOverlay>
                        </Link>
                    </Card>
                </div> 
            );
        });

        return (  
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem> 
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active> 
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Menu </h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
         );
    } 
}

export default Menu;