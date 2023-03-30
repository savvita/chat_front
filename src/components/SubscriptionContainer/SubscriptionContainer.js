
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import { selectValues, selectStatus, getAsync, selectSelected } from '../../app/subscriptionSlice';
import { selectCurrent as selectUser, refresh } from '../../app/authSlice';
import { createAsync } from '../../app/shoppingSlice';
import SubscriptionCard from "./SubscriptionCard";

import './SubscriptionContainer.css';
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import InfoModal from "../InfoModal";

const SubscriptionContainer = () => {
    const items = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const user = useSelector(selectUser);

    const item = useSelector(selectSelected);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        dispatch(getAsync());
    }, []);

    const buy = async () => {
        if(!user) {
            navigate('signin');
        }
        else {
            if(!item) {
                return;
            }

            const res = await dispatch(createAsync(item));

            if(!res || !res.payload || res.payload.value === undefined || res.payload.value === false) {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
            }
        }

        setIsModal(false);
        await dispatch(refresh());

    }

    const showPaymentModal = () => {
        if(!user) {
            navigate('signin');
        }
        else {
            setIsModal(true)
        }
    }

    return (
        <>
        <h3 className="text-white text-center mt-3 mb-3">Підписки</h3>
            <div className={ status === 'loading' ? 'd-none' : "bg-dark d-flex flex-wrap justify-content-center" } style={{ maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' }}>
                { items && items.map(item => <SubscriptionCard key={ item.id } item={ item } onBuyClick={ showPaymentModal } />) }
            </div>
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
            <PaymentModal isOpen={ isModal } onCancel={ () => setIsModal(false) } onAccept={ buy } />
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
        </>
    );
}

export default SubscriptionContainer;