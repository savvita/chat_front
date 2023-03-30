

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Row, Col } from 'reactstrap';



const PaymentModal = ({ sum, isOpen, onAccept, onCancel }) => {
    return (
        <Modal isOpen={ isOpen }>
            <ModalHeader>Оплата</ModalHeader>
            <ModalBody>
                <h3>Найчесніший банк КрадиБанк</h3>
                <Label className='text-muted ps-1 mb-0'>Номер картки</Label>
                <Input name="card" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" readOnly />
                <Row className='pt-3 pb-3'>
                    <Col>
                        <Label className='text-muted ps-1 mb-0'>Діє до</Label>
                        <Input name="date" type="text" placeholder="__/__" readOnly />
                    </Col>
                    <Col>
                        <Label className='text-muted ps-1 mb-0'>CVV</Label>
                        <Input name="cvv" type="text" placeholder="XXX" readOnly />
                    </Col>
                </Row>
                { sum && 
                <Row className="mb-3 mb-0" >
                    <Label className='text-muted ps-1'>Сума</Label>
                    <Input name="sum" type="text" readOnly value={ `${ sum }$`} />
                </Row> }
            </ModalBody>
            <ModalFooter>
                <Button color="warning" onClick={ onAccept }>Оплатити</Button>{' '}
                <Button color="warning" onClick={ onCancel }>Скасувати</Button>{' '}
            </ModalFooter>
        </Modal>
    );
}

export default PaymentModal;