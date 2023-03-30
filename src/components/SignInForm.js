import { Form, FormGroup, Label, Input, Button, FormFeedback, Row, Col } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SignInForm = ({ onSignIn, onError }) => {

    const [login, setLogin] = useState({ value: '', isValid: false });
    const [password, setPassword] = useState({ value: '', isValid: false });

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
                setIsValid(password.isValid && value.length > 0);
                break;

            case 'password':
                setPassword({ value: value, isValid: value.length > 0});
                setIsValid(login.isValid && value.length > 0);
                break;

            default: break;
        }
    }

    const signIn = (e) => {
        e.preventDefault();
        if(!isValid) {
            onError && onError('Помилка валідації', 'Заповніть усі обов’язкові поля');
            return;
        }

        onSignIn && onSignIn({ login: login.value, password: password.value });
    }

    return (
        <Form className="container-sm" style={{ maxWidth: '500px', minWidth: '300px' }}>
            <FormGroup className="position-relative mt-2">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signin__login" className="text-white">Логін</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signin__login" name="login" placeholder="Логін" type="text" value={ login.value } onInput={ handleInput } invalid={ !login.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signin__password" className="text-white">Пароль</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signin__password" name="password" placeholder="Пароль" type="password" value={ password.value } onInput={ handleInput } invalid={ !password.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>        
            </FormGroup>
            <Row className="mt-5">
                <Col><Link to="/signup" className="text-decoration-none">Зареєструватися</Link></Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Button onClick={ signIn } color="warning" disabled={ !isValid } className="mt-3 ps-4 pe-4">Увійти</Button>
            </Row>
        </Form>
    );
}

export default SignInForm;