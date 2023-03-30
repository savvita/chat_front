import Collapse from './Collapse/Collapse';


const AdminSidebar = () => {
    
    const users = [
        {
            heading: 'Користувачі',
            link: 'users'
        },
        {
            heading: 'Продажі',
            link: 'sales'
        }
    ]

    const storages = [
        {
            heading: 'Файли',
            link: 'storage'
        }
    ]

    return (
        <div className='d-flex flex-column'>
            <Collapse heading='Сервіс' items={ users } />
            <Collapse heading='Сховище' items={ storages } />
        </div>
    );
}

export default AdminSidebar;