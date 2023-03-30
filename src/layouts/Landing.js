import LandingItem from "../components/LandingItem/LandingItem";




const Landing = () => {
    return (
        <div className="container-fluid m-0 p-0 w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: 'rgb(11, 4, 20)' }}>
            <LandingItem />
        </div>
    );
}

export default Landing;