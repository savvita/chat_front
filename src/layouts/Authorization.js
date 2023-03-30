import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import InfoModal from '../components/InfoModal';

import { useState } from 'react';


import { signInAsync, signUpAsync } from '../app/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Authorization = ({ signIn, signUp }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const onSignIn = async (auth) => {
        if(!auth) {
            showError();
        }

        const res = await dispatch(signInAsync({ login: auth.login, password: auth.password }));
        hadnleAuthorizationResult(res);
    }

    const onSignUp = async (auth) => {
        if(!auth) {
            showError();
        }

        const res = await dispatch(signUpAsync({ login: auth.login, password: auth.password }));
        hadnleAuthorizationResult(res);
    }

    const hadnleAuthorizationResult = async (res) => { 
        if(!res || !res.payload) {
            showError();
            return;
        }

        if(res.payload.code) {
            if(res.payload.code === 'invalid-credentials') {
                showError("Помилка авторизації", "Неправильний логін та/або пароль");
                return;
            }

            if(res.payload.code === 'user-is-banned') {
                showError("Помилка авторизації", 'Обліковий запис було заблоковано');
                return;
            }

            if(res.payload.code === 'login-is-registered') {
                showError("Помилка авторизації", 'Логін вже зареєстровано');
                return;
            }

            showError();
            return;
        }

        navigate("/requests");
    }

    const showError = (title, text) => {
        setInfoHeader(title ?? 'Інформація');
        setInfoText(text ?? 'Ой, щось пішло не так :( Спробуйте пізніше');
        setInfoModal(true);
    }

    return (
        <div>
           { signIn && <SignInForm onSignIn={ onSignIn } onError={ showError } /> }
           { signUp && <SignUpForm onSignUp={ onSignUp } onError={ showError } /> }
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
        </div>
    );
}

export default Authorization;