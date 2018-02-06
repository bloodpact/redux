import React from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from   'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component{
    onDelete(_id){
        const currentBookToDelete = this.props.cart;
        const indexToDelete =  currentBookToDelete.findIndex(
                function(cart){
                    return cart._id === _id;
                }
            )
        let cartAfterDelete =
            [...currentBookToDelete.slice(0,
                indexToDelete),
                ...currentBookToDelete.slice(indexToDelete +
                    1)]
        this.props.deleteCartItem(cartAfterDelete);
    }
    onIncrement(_id){
        this.props.updateCart(_id, 1);
    }
    onDecrement(_id, quantity){
        if(quantity > 1){
            this.props.updateCart(_id, -1);
        }
    }
    constructor(){
        super();
        this.state= {
            showModal:false
        }
    }
    open(){
        this.setState({showModal:true})
    }
    handleClose(){
        this.setState({showModal:false})
    }
    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
    renderEmpty(){
        return(<div></div>)
    }
    renderCart(){
        const cartItemsList =
            this.props.cart.map(function(cartArr){
                return(
                    <Panel key={cartArr._id}>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h6>{cartArr.title}</h6><span>
</span>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>usd. {cartArr.price}</h6>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>qty. <Label
                                    bsStyle="success">{cartArr.quantity}</Label></h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup
                                    style={{minWidth:'300px'}}>
                                    <Button
                                        onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                                        bsStyle="default" bsSize="small">-</Button>
                                    <Button
                                        onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                    <span> </span>
                                    <Button
                                        onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger"
                                        bsSize="small">DELETE</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel>
                )
                }, this)
                return(
                <Panel header="Cart" bsStyle="primary">
                    {cartItemsList}
                    <Row>
                        <Col xs={12}>
                            <h6>Total amount:{this.props.totalAmount}</h6>
                            <Button
                                onClick={this.open.bind(this)}
                                bsStyle="success" bsSize="small">
                                PROCEED TO CHECKOUT
                            </Button>
                        </Col>
                    </Row>
                <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h6>order has been saved</h6>
                        <p>you will recieve an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose.bind(this)}>Close</Button>
                        <Col xs={6}>$:{this.props.totalAmount}</Col>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}
function mapStateToProps(state){
    return{
        cart: state.cart.cart,
        totalAmount : state.cart.totalAmount
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem:deleteCartItem,
        updateCart:updateCart
    }, dispatch)
}
export default connect(mapStateToProps,
    mapDispatchToProps)(Cart);