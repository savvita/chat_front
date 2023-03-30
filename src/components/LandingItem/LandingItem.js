import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";




import './LandingItem.css';

const LandingItem = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-white text-center m-5">ASK ME</h1>
            <div className="position-relative">
                <img src="choice.webp" />
                <div className="position-absolute translate-middle start-50" style={{ top: '4rem' }}>
                    <ol id="landing" className="text-white fs-4">
                        <li>Зареєструйся</li>
                        <li>Задай питання</li>
                        <li>Отримай відповідь</li>
                    </ol>
                    <Button className="btn-outline-light ps-4 pe-4 w-100" color="dark" onClick={() => navigate("/subscriptions")}>Почати</Button>
                </div>
            </div>
        </div>
    );
}

export default LandingItem;