import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmDeletingModal = ({ isOpen, header, onAccept, onCancel }) => {

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>{ header }</ModalHeader>
            <ModalBody>
                <p>Цю дію не можна відминити.</p>
                <p>Ви впевнені, що хочете видалити цей файл?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={ onAccept }>Видалити</Button>{' '}
                <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmDeletingModal;