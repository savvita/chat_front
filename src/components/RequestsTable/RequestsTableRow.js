




const RequestTableRow = ({ item, idx }) => {
    if(!item) {
        return null;
    }

    return (
        <tr>
            <th scope="row" className='text-center ms-4 me-4 ps-1 pe-1'><p className="p-1 m-0">{ idx }</p></th>
            <td className="ps-1 pe-1">{ item.date && (new Date(item.date)).toLocaleString() }</td>
            <td className="ps-1 pe-1">{ item.requestMessage }</td>
            <td className="ps-1 pe-1">{ item.responseMessage }</td>
        </tr>
    );
}

export default RequestTableRow;