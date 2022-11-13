import Modal from 'modal-component-byml/dist/Modal';
import './modalComponent.css';

export function ModalComponent(props) {
    
    return (
        <Modal 
        isVisible={props.isVisible} 
        message={props.message} 
        handleClose={props.handleClose} />
    )
}
