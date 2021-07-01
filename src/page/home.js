import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/ui/cards/card';
// import Cards from '../components/ui/cards/cards';
import TitleSection from '../components/ui/title-section/title-section';

const Home = () => {

    const {
        resources: { listRecentResources }
    } = useSelector((state) => state);

    const shortRecent = () => {
        return listRecentResources.slice(0, 6);
    }

    return (
        <>
            {/* <LayoutHeader> */}
            <div className="container">
                <TitleSection nombre="Recientes" url='/all-resource' state="Recientes" mostrarBtn={false} />
                <div className="container-row-arounds">
                    {
                        listRecentResources.length === 0 ?
                            <h3>No hay Recursos recientes</h3>
                            : shortRecent().map((resource) =>
                                <Card
                                    calificacion={resource.calificacion}
                                    condition={resource.condition}
                                    country={resource.country}
                                    create={resource.create}
                                    description={resource.description}
                                    id={resource._id}
                                    language={resource.language}
                                    nameAuthor={resource.nameAuthor}
                                    plataform={resource.plataform}
                                    tags={resource.tags}
                                    title={resource.title}
                                    isAdmin={false}
                                    isPending={false}
                                    key={resource._id}
                                />
                            )


                    }
                </div>
                <TitleSection nombre="Más Valorados" url='/all-resource' state="Más Valorados" mostrarBtn={false} />
                <div className="container-row-arounds">
                    <h3>No hay Recursos Valorados</h3>
                </div>
                <TitleSection nombre="Recomendados" url='/all-resource' state="Recomendados" mostrarBtn={false} />
                <div className="container-row-arounds">
                    <h3>No hay Recursos Recomendados</h3>
                </div>
            </div>
            {/* </LayoutHeader> */}
        </>
    );
}

export default Home;