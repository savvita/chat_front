import { Form, FormGroup, Label, Input, Button, FormFeedback, Row, Col } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SignUpForm = ({ onSignUp, onError }) => {

    const [login, setLogin] = useState({ value: '', isValid: false });
    const [password, setPassword] = useState({ value: '', isValid: false });
    const [passwordConfirm, setPasswordConfirm] = useState({ value: '', isValid: false });

    const [isValid, setIsValid] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(!name) {
            return;
        }

        switch (name) {
            case 'login':
                setLogin({ value: value, isValid: value.length > 0 });
                setIsValid(password.isValid && passwordConfirm.isValid && value.length > 0);
                break;

            case 'password':
                setPassword({ value: value, isValid: value.length > 0});
                setIsValid(login.isValid && passwordConfirm.isValid && value.length > 0);
                break;

            case 'passwordConfirm':
                setPasswordConfirm({ value: value, isValid: value.length > 0});
                setIsValid(password.isValid && login.isValid && value === password.value);
                break;

            default: break;
        }
    }

    const signUp = (e) => {
        e.preventDefault();
        if(!isValid) {
            if(!login.isValid || !password.isValid) {
                onError && onError('Помилка валідації', 'Заповніть усі обов’язкові поля');
                return;
            }
            if(!passwordConfirm) {
                onError && onError('Помилка валідації', 'Паролі не співпадають');
                return;
            }

            onError && onError();
            return;
        }

        onSignUp && onSignUp({ login: login.value, password: password.value });
    }

    return (
        <Form className="container-sm" style={{ maxWidth: '500px', minWidth: '300px' }}>
            <FormGroup className="position-relative mt-2">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signup__login" className="text-white">Логін</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signup__login" name="login" placeholder="Логін" type="text" value={ login.value } onInput={ handleInput } invalid={ !login.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signup__password" className="text-white">Пароль</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signup__password" name="password" placeholder="Пароль" type="password" value={ password.value } onInput={ handleInput } invalid={ !password.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>        
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signup__passwordConfirm" className="text-white">Підтвердіть пароль</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signup__passwordConfirm" name="passwordConfirm" placeholder="Підтвердіть пароль" type="password" value={ passwordConfirm.value } onInput={ handleInput } invalid={ !passwordConfirm.isValid } />
                        <FormFeedback tooltip>Паролі не співпадають</FormFeedback>
                    </Col>
                </Row>        
            </FormGroup>
            <Row className="mt-5">
                <Col><Link to="/signin" className="text-decoration-none">Маєте акаунт?</Link></Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Button onClick={ signUp } color="warning" disabled={ !isValid } className="mt-3 ps-4 pe-4">Зареєструватися</Button>
            </Row>
        </Form>
    );
}

export default SignUpForm;