import React from 'react';
import Input from './inputForm';
import InputForm from './inputFormBorder';

const Formulario = ({ title,
    description,
    language,
    platform,
    country,
    specialty,
    category,
    university,
    onChange,
    tag,
    setTag,
    tags,
    setTags,
    setValuesResource,
    licence
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
                    <i className="fas fa-link"></i>
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
            <div className="container-sb">
                <p className="mb-1">{title}</p>
                <select name="specialty" id="specialtyCreate" onChange={onChange} value={specialty}>
                    <option value="Educación Infantil">Educación Infantil</option>
                    <option value="Educación Primaria">Educación Primaria</option>
                    <option value="Educación Secundaria">Educación Secundaria</option>
                    <option value="Educación Superior">Educación Superior</option>
                </select>
                {/* <input type="text" value={specialty} name="specialty" id="specialty" onChange={onChange} /> */}
            </div>
            <Input
                id="category"
                name="category"
                placeholder="Ej. Proyecto matemáticas, covid...."
                title="Agregar una categoría"
                value={category}
                onChange={onChange}
            />
            <Input
                id="licence"
                name="licence"
                placeholder="Escribe la licencia del recurso"
                title="Agrega la licencia del recurso"
                value={licence}
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
                id="platform"
                name="Plataforma"
                placeholder="Escribe la plataforma..."
                title="plataforma"
                value={platform}
                onChange={onChange}
            />
        </div>
    );
}

export default Formulario;