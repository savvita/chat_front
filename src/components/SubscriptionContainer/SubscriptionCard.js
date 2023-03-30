import { Badge, Button, Card, CardBody, CardHeader, Table } from "reactstrap";


import { FaBan, FaCheck } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { set } from '../../app/subscriptionSlice';


const SubscriptionCard = ({ item, onBuyClick }) => {
    const dispatch = useDispatch();

    if(!item) {
        return null;
    }

    const buyClick = async () => {
        if(!item) {
            return;
        }

        await dispatch(set(item));

        onBuyClick && onBuyClick();
    }
    
    return (
        <div className="position-relative m-2 subscription-card">
            <Card style={{ width: '20rem' }}>
                <CardHeader><h4  className="fw-weight-bold mb-1">{ item.name }</h4></CardHeader>
                <CardBody>
                    { 
                        item.abilities && 
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Кількість запитів:</td>
                                    <td  className="text-center">{ item.maxCount ? item.maxCount : 'Необмежено' }</td>
                                </tr>
                                <tr>
                                    <td>Текст:</td>
                                    <td className="text-center">{ item.abilities.find(x => x.id === 1) ? <FaCheck className="text-success" /> : <FaBan className="text-danger" /> }</td>
                                </tr>
                                <tr>
                                    <td className="text-nowrap">Текст на зображенні:</td>
                                    <td className="text-center"> { item.abilities.find(x => x.id === 2) ? <FaCheck className="text-success" /> : <FaBan className="text-danger"  /> }</td>
                                </tr>
                                <tr>
                                    <td>Голос:</td>
                                    <td className="text-center">{ item.abilities.find(x => x.id === 3) ? <FaCheck className="text-success" /> : <FaBan className="text-danger"  /> }</td>
                                </tr>
                                <tr>
                                    <td>Перегляд історії:</td>
                                    <td className="text-center">{ item.abilities.find(x => x.id === 4) ? <FaCheck className="text-success" /> : <FaBan className="text-danger"  /> }</td>
                                </tr>
                            </tbody>
                        </Table>
                    }
                    <Button className="w-100" onClick={ buyClick }>Купити</Button>
                </CardBody>
            </Card>
            <Badge color="danger" className="position-absolute top-0 end-0 fs-4 ps-4 pe-4">{ item.price }$</Badge>
        </div>
    );
}


export default SubscriptionCard;