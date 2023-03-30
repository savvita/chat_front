


import { useEffect, useState } from "react";
import { Input } from "reactstrap";



const BanSelect = ({ items, onChange }) => {

    const [value, setValue] = useState(0);

    useEffect(() => {
        if(items != null && items.length > 0) {
            setValue(items[0].id);
            onChange && onChange(items[0]);
        }
    }, [items]);

    const handleChange = (e) => {
        setValue(e.target.value);

        if(items) {
            const ban = items.find(x => x.id.toString() === e.target.value);
            if(ban) {
                onChange && onChange(ban);
            }
        }
    }

    return (
        <div className="ms-1 me-1">
            { items && 
                <Input name="select" type="select" value={ value } onChange={ handleChange } style={{ minWidth: '10rem' }}>
                    { items.map(item => <option key={ item.id } value={ item.id }>{ item.description }</option>)}
                </Input>
            }
        </div>
    );
}

export default BanSelect;