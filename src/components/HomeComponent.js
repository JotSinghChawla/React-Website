import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import Loading from './LoadingComponent'
import { baseURL } from '../shared/baseURL'

const HomeComponent = ({ dish, promotion, leader, dishesErrMess, dishesLoading, promosLoading, promosErrMess }) => {

    const RenderCard = ({ item, isLoading, errMess }) => {
        if (isLoading) {
            return(
              <Loading />
            )
        }
        else if(errMess) {
            return (
                <h3>{errMess}</h3>
            )
        }
        else {
            return (
                <Card >
                    <CardImg src={baseURL + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle> {item.name} </CardTitle>
                        { item.designation ? <CardSubtitle> {item.designation} </CardSubtitle> : null }
                        <CardText> {item.description} </CardText>
                    </CardBody>
                </Card>
            )
        }
    }

    return (
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-2'>
                    <RenderCard item = {dish} isLoading={ dishesLoading } errMess={ dishesErrMess } /> 
                </div>
                <div className='col-12 col-md m-2'>
                    <RenderCard item = {promotion} isLoading={ promosLoading } errMess={ promosErrMess }  /> 
                </div>
                <div className='col-12 col-md m-2'>
                    <RenderCard item = {leader} /> 
                </div>
            </div>
        </div>
    )
}

export default HomeComponent
