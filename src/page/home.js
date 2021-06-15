import React from 'react';
import LayoutHeader from '../components/layout/header/header';
import Cards from '../components/ui/cards/cards';
import TitleSection from '../components/ui/title-section/title-section';

const Home = () => {
    return (
        <>
            {/* <LayoutHeader> */}
            <div className="container">
                <TitleSection nombre="Recientes" />
                <Cards />
                <TitleSection nombre="Más Valorados" />
                <Cards />
                <TitleSection nombre="Recomendados" />
                <Cards />
            </div>
            {/* </LayoutHeader> */}
        </>
    );
}

export default Home;