import { useEffect, useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row, Spinner } from "reactstrap";


import './ImageRequestForm.css';

import InfoModal from "../InfoModal";

import { useDispatch, useSelector } from "react-redux";

import { selectCurrent, selectStatus, reset, textAsync } from '../../app/requestSlice';
import { selectCurrent as selectUser, refresh } from '../../app/authSlice';
import { selectValue as selectRequest, selectStatus as selectRekoginitionStatus, rekognizeImageAsync } from '../../app/rekoginitionSlice';
import { useNavigate } from "react-router-dom";



const ImageRequestForm = () => {
    const status = useSelector(selectStatus);
    const rekoginitionStatus = useSelector(selectRekoginitionStatus);
    const response = useSelector(selectCurrent);
    const request = useSelector(selectRequest);

    const user = useSelector(selectUser);

    const [img, setImg] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [isProccessing, setIsProccessing] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(reset());
    }, []);

    const handleFile = (e) => {
        if(!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];

        if (!file.type.startsWith('image/')){ 
            return;
        }

        const reader = new FileReader();
        reader.onload = (function() {
            return function (e) { 
                setImg({ src: e.target.result, file: file }); 
            };
        })();
        reader.readAsDataURL(file);
    }

    const rekognize = async() => {
        if(!user) {
            navigate('signin');
        }
        else {
            if(!img || !img.file) {
                return;
            }
            setIsProccessing(true);
            const res = await dispatch(rekognizeImageAsync(img.file));

            if(res && res.payload && res.payload.value) {
                await getResponse(res.payload.value);
            }
        }
    }

    const getResponse = async(request) => {
        console.log(request);
        if(!user) {
            navigate('signin');
        }
        else {
            if(!img ?? !request) {
                return;
            }
    
            const res = await dispatch(textAsync(request));
            if(!res || !res.payload) {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
                return;
            }

            if(res.payload.code && res.payload.code === 'max-count-reached') {
                setInfoHeader('Ви досягли ліміту запитів');
                setInfoText('Використано всі доступні запити за день. Приходьте завтра або змініть підписку');
                setInfoModal(true);
                return;
            }

            if(res.payload.value === undefined || res.payload.value === false) {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
                return;
            }

            await dispatch(refresh());
        }

    }

    return (
        <div className="p-3">
            <Row>
                <Input className="ms-2 me-2 mb-3" name="file" type="file" onChange={ handleFile } />
            </Row>
            { img && <Row>
                <div className="image-request__image-preview border border-light rounded-1 mb-3">
                    { img && <img src={ img.src } alt={ img.src } /> }
                </div>
                <Button className="mt-3" onClick={ rekognize }>Надіслати</Button>
            </Row> }
            { isProccessing && <Row>
                <Col lg="6" md="12">
                    <div className={ rekoginitionStatus !== 'loading' ? "mt-3" : "d-none" }>
                        <Label className="text-white ps-1">Ваш запит</Label>
                        <div className="d-flex flex-column position-relative">
                            <FormGroup className="position-relative">             
                                <Input type="textarea" style={{ height: '15rem' }} value={ request ? request  : "" } readOnly />
                            </FormGroup>
                        </div>
                    </div>
                    <div className={ rekoginitionStatus === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="warning">Loading...</Spinner></div>
                </Col>
                <Col lg="6" md="12">
                    <div className={ status !== 'loading' && rekoginitionStatus !== 'loading' ? "mt-3" : "d-none" }>
                        <Label className="text-white ps-1">Відповідь</Label>
                        <Input className="mb-2" type="textarea" style={{ height: '15rem' }} readOnly value={ response && response.responseMessage ? response.responseMessage : "" } />
                    </div>
                    <div className={ status === 'loading' || rekoginitionStatus === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="warning">Loading...</Spinner></div>
                </Col>
            </Row> }
            
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />  
        </div>
    );
}

export default ImageRequestForm;