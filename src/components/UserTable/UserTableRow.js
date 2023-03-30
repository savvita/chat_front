import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";
import BanSelect from "./BanSelect";





const UserTableRow = ({ item, idx, bans, onUpdate, onBanned }) => {

    const [isAdmin, setIsAdmin] = useState(item && item.isAdmin);

    const [ban, setBan] = useState({});

    const switchAdminRole = () => {
        setIsAdmin(!isAdmin);

        if(!item) {
            return;
        }

        onUpdate && onUpdate({ ...item, isAdmin: !item.isAdmin });
    }

    const banChanged = (ban) => {
        setBan(ban);
    }

    const banUser = () => {
        if(!ban || !item) {
            return;
        }

        onBanned && onBanned(item.id, ban);
    }

    const unbanUser = () => {
        if(!item) {
            return;
        }

        onBanned && onBanned(item.id, null);
    }

    if(!item) {
        return null;
    }

    return (
        <tr>
            <th scope="row" className='text-center ms-4 me-4 ps-0 pe-0'><p className="p-1 m-0">{ idx }</p></th>
            <td className="ps-0 pe-0"><Link to={ `${ item.id }` } className="text-white text-decoration-none">{ item.userName }</Link></td>
            <td className="ps-0 pe-0"><FormGroup switch className="d-flex justify-content-center"><Input type="switch" checked={ isAdmin } onChange={ switchAdminRole } /></FormGroup></td>
            <td className="ps-0 pe-0">{ item.bannedUntil ? (new Date(item.bannedUntil)).toLocaleString() : "" }</td>
            <td className="ps-0 pe-0">
                <div className="d-flex">
                    <BanSelect onChange={ banChanged } items={ bans } /> 
                    <Button onClick={ banUser }>Заблокувати</Button>
                    <Button onClick={ unbanUser } className="text-nowrap ms-1">Зняти бан</Button>
                </div>
            </td>
        </tr>
    );
}

export default UserTableRow;