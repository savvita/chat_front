import { FaDownload, FaRegTrashAlt } from "react-icons/fa";
import { UncontrolledTooltip } from "reactstrap";

const FileTableRow = ({ idx, item, onDownload, onDelete }) => {


    return (
        <tr>
            <th scope="row" className='text-center ms-4 me-4'><p className="p-1 m-0">{ idx }</p></th>
            <td style={{ width: '100%' }}>
                <p className="p-1 m-0"> { item  }</p>
            </td>
            {/* <td className="text-center">
                <a href={ `https://rekognitionimagesbucket.s3.eu-west-2.amazonaws.com/${ item }` } alt={ item }>
                    <div id={ `file${ idx }__download` } className="d-inline-block overflow-hidden p-1">
                        <FaDownload className="property-table__icon" onClick={ onDownload } />
                    </div>
                </a>
                <UncontrolledTooltip placement="right" target={ `file${ idx }__download` } >
                        Завантажити
                </UncontrolledTooltip>
            </td> */}
            <td className="text-center">
                <div id={ `file${ idx }__delete` } className="d-inline-block overflow-hidden p-1">
                    <FaRegTrashAlt className="property-table__icon" onClick={ onDelete } />
                </div>
                <UncontrolledTooltip placement="right" target={ `file${ idx }__delete` } >
                    Видалити
                </UncontrolledTooltip>
            </td>
        </tr>
    );
}

export default FileTableRow;