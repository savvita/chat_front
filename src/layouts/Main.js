import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";



const Main = () => {

    return (
        <div className="container-md d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="p-4 flex-grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Main;