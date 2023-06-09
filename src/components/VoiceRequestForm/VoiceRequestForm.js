import { useEffect, useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import getBlobDuration from 'get-blob-duration'


import InfoModal from "../InfoModal";

import { useDispatch, useSelector } from "react-redux";

import { selectCurrent, selectStatus, reset, textAsync } from '../../app/requestSlice';
import { selectCurrent as selectUser, refresh } from '../../app/authSlice';
import { selectValue as selectRequest, selectStatus as selectRekoginitionStatus, rekognizeVoiceAsync } from '../../app/rekoginitionSlice';
import { useNavigate } from "react-router-dom";
import AudioRecorder from "./AudioRecorder";



const VoiceRequestForm = () => {
    const status = useSelector(selectStatus);
    const rekoginitionStatus = useSelector(selectRekoginitionStatus);
    const response = useSelector(selectCurrent);
    const request = useSelector(selectRequest);

    const [isValid, setIsValid] = useState(false);

    const user = useSelector(selectUser);

    const [file, setFile] = useState(null);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [isProccessing, setIsProccessing] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const langs = [
        // {
        //     code: "uk-UA",
        //     description: 'Українська'
        // },
        {
            code: "en-US",
            description: 'Англійська'
        },
        {
            code: "ru-RU",
            description: 'Російська'
        },
    ];

    const [lang, setLang] = useState(langs[0]);

    useEffect(() => {
        dispatch(reset());
    }, []);

    const handleFile = (e) => {
        if(!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];

        if (!file.type.startsWith('audio/')){ 
            return;
        }

        const reader = new FileReader();
        reader.onload = (function() {
            return function (e) { 
                setFile({ src: e.target.result, file: file });
                checkFile(e);
            };
        })();
        reader.readAsDataURL(file);
    }

    const handleRecord = async (blob) => {
        const audioUrl = URL.createObjectURL(blob);
        setFile({ src: audioUrl, file: blob });

        const duration = await getBlobDuration(blob)

        if(duration > 15) {
            setIsValid(false);
            setInfoHeader('Завеликий файл');
            setInfoText('Аудіо має бути не більше 15 секунд');
            setInfoModal(true);
        }
        else {
            setIsValid(true);
        }
    }

    const checkFile = (e) => {
        if(e.target.duration > 15) {
            setIsValid(false);
            setInfoHeader('Завеликий файл');
            setInfoText('Аудіо має бути не більше 15 секунд');
            setInfoModal(true);
        }
        else {
            setIsValid(true);
        }
    }

    const rekognize = async() => {
        if(!user) {
            navigate('signin');
        }
        else {
            if(!file || !isValid) {
                return;
            }
            setIsProccessing(true);
            const res = await dispatch(rekognizeVoiceAsync({ file: file.file, lang: lang }));

            if(res && res.payload && res.payload.value) {
                await getResponse(res.payload.value);
            }
        }
    }

    const getResponse = async(request) => {
        if(!user) {
            navigate('signin');
        }
        else {
            if(!request) {
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
                <Input className="ms-2 me-2 mb-1" name="file" type="file" onChange={ handleFile } />
                <AudioRecorder onRecordStop={ handleRecord } />
            </Row>
            <Row>
                <audio controls src={ file && file.src } />
            </Row>
            { file && <Row className="mt-3">
                <Col xs="12" md="6" className="d-flex align-items-center">
                    <Label className="text-white p-2">Мова:</Label>
                    <Input name="select" type="select" value={ lang } onChange={ (e) => setLang(e.target.value) } style={{ minWidth: '10rem' }}>
                        { langs.map((item, idx) => <option key={ idx } value={ item.code }>{ item.description }</option>)}
                    </Input>
                </Col>
                <Col xs="12" md="6" className="text-center">
                    <Button onClick={ rekognize }>Надіслати</Button>
                </Col>
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

export default VoiceRequestForm;