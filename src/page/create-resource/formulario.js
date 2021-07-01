import React from 'react';
import Input from './inputForm';
import InputForm from './inputFormBorder';

const Formulario = ({ title,
    description,
    language,
    plataform,
    country,
    specialty,
    category,
    university,
    onChange,
    tag,
    setTag,
    tags,
    setTags,
}) => {
    return (
        <div className="formulario">
            <InputForm
                title="Título"
                id="title"
                name="title"
                placeholder="Escribe un título..."
                value={title}
                onChange={onChange}
            />
            <InputForm
                title="Descripción"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Escribe una descripción..."
            />
            <div className="container-recurso">
                <p>Agregar Recurso</p>
                <div className="container-border-recurso">
                    <i class="fas fa-link"></i>
                    <p>Agregar Recurso</p>
                    <hr />
                    <p>Tipo: Documento</p>
                </div>
            </div>
            <div className="container-sb">
                <p>Agregar Tags</p>
                <div className="agg-tag">
                    <input type="text" name="tag" id="tag" placeholder="Escribe un Tag..." value={tag} onChange={(e) => setTag(e.target.value)} />
                    <button onClickCapture={() => {
                        tags.push(tag);
                        setTags(tags)
                        setTag("")
                    }} >Agregar Tag</button>
                </div>
            </div>
            <div className="container-addTags">
                {
                    tags.map((tagU) => {
                        return (
                            <div className="container-tag">
                                <p>{tagU}</p>
                            </div>
                        )
                    })
                }
            </div>
            <Input
                id="specialty"
                name="specialty"
                placeholder="Escribe una especialidad..."
                title="Agregar Especialidad"
                value={specialty}
                onChange={onChange}
            />
            <Input
                id="category"
                name="category"
                placeholder="Ej. Proyecto matemáticas, covid...."
                title="Agregar una categoría"
                value={category}
                onChange={onChange}
            />
            <Input
                id="language"
                name="language"
                placeholder="Específica el idioma..."
                value="Español"
                title="Lenguaje"
                value={language}
                onChange={onChange}
            />
            <Input
                id="university"
                name="university"
                placeholder="Escribe la Universidad..."
                title="Universidad"
                value={university}
                onChange={onChange}
            />
            <Input
                id="country"
                name="country"
                placeholder="Escribe el país..."
                value="Ecuador"
                title="País"
                value={country}
                onChange={onChange}

            />
            <Input
                id="plataform"
                name="plataform"
                placeholder="Escribe la plataforma..."
                title="Plataforma"
                value={plataform}
                onChange={onChange}
            />
        </div>
    );
}

export default Formulario;