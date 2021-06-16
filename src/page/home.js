import React from 'react';
import Cards from '../components/ui/cards/cards';
import TitleSection from '../components/ui/title-section/title-section';

const Home = () => {
    return (
        <>
            {/* <LayoutHeader> */}
            <div className="container">
                <TitleSection nombre="Recientes" url='/all-resource' state="Recientes"/>
                <Cards />
                <TitleSection nombre="Más Valorados" url='/all-resource' state="Más Valorados"/>
                <Cards />
                <TitleSection nombre="Recomendados" url='/all-resource' state="Recomendados"/>
                <Cards />
            </div>
            {/* </LayoutHeader> */}
        </>
    );
}

export default Home;