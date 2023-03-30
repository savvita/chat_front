import { useEffect, useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label } from 'reactstrap';

const PerPageSelect = ({ values, onChange }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setCurrent(0);
    }, [values]);

    useEffect(() => {
        onChange && onChange(current);
    }, [current]);

    if(!values) {
        return null;
    }

    const changePerPage = (idx) => {
        setCurrent(idx);
        onChange && onChange(idx);
    }

    return (
        <div className="d-flex justify-content-start align-items-center">
            <Label className='fs-6 m-0 pe-2' style={{ height: '1.1rem' }}>Показувати</Label>
            <UncontrolledDropdown>
                <DropdownToggle caret color="dark" className="p-0">{ values[current] }</DropdownToggle>
                <DropdownMenu dark>
                    { values.map((item, idx) => <DropdownItem key={ item } onClick={ () => changePerPage(idx) }>{ item }</DropdownItem>)}
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>

    );
}

export default PerPageSelect;