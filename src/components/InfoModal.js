import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const InfoModal = ({ title, text, isOpen, onAccept, children }) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>{ title }</ModalHeader>
            <ModalBody>
                <p>{ text }</p>
                { children }
            </ModalBody>
            <ModalFooter>
                <Button color="info" onClick={ onAccept }>Гаразд</Button>{' '}
            </ModalFooter>
        </Modal>
    );
}

export default InfoModal;