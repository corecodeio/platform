import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//styles
import Styles from './Apply.module.css';
//icons
import { RxCross2 } from 'react-icons/rx';
const Apply = () => {
    let { id } = useParams();
    const [error, setError] = useState('');
    const [send, setSend] = useState(false);
    const [data, setData] = useState({
        course_id: id,
        adult: false,
        knowledge_level: 'soy nuevo',
        reference: 'otros'
    });
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const handlechange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSend(true);
        try {
            const response = await axios.post('/api/student/postulation', data);
            if (response.data.successful) {
                enqueueSnackbar('course created successfully', { variant: 'success' });
                navigate('/dashboard/postulations')
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error);
            setError('500 server error');
        }
        setSend(false);
    };
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`container`]}>
                <RxCross2
                    className={Styles[`container-icon`]}
                    onClick={() => navigate('/dashboard/available-courses')}
                />
                <p className={Styles[`container-title`]}>Postulation</p>
                <form className={Styles[`form`]} onSubmit={handleSubmit}>
                    <p>Full Name:</p>
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                    <p>Email:</p>
                    <p>{user.email}</p>
                    <label htmlFor="adult">¿Eres mayor de edad?*</label>
                    <select onChange={handlechange} id="adult" name="adult" value={data.adult}>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                    </select>
                    <label htmlFor="knowledge_level">
                        Nivel conocimiento en Tecnología y Programación*
                    </label>
                    <select
                        onChange={handlechange}
                        id="knowledge_level"
                        name="knowledge_level"
                        value={data.knowledge_level}
                    >
                        <option value="soy nuevo">Soy nuevo</option>
                        <option value="principiante">principiante</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                        <option value="experto">Experto</option>
                    </select>
                    <label htmlFor="reference">
                        ¿Cómo te enteraste de los programas Core Code?
                    </label>
                    <select
                        onChange={handlechange}
                        id="reference"
                        name="reference"
                        value={data.reference}
                    >
                        <option value="institucion/Escuela/Academia">
                            institucion/Escuela/Academia
                        </option>
                        <option value="Facebook Core Code">Facebook Core Code</option>
                        <option value="Instagram @corecodeio">Instagram @corecodeio</option>
                        <option value="Tik Tok">Tik Tok</option>
                        <option value="Linkedin Core Code">Linkedin Core Code</option>
                        <option value="Network Sessions YouTube Core Code">
                            Network Sessions YouTube Core Code
                        </option>
                        <option value="Busqueda en Google">Busqueda en Google</option>
                        <option value="Radio">Radio</option>
                        <option value="TV">TV</option>
                        <option value="Guatemala.com">Guatemala.com</option>
                        <option value="otros">otros</option>
                    </select>
                    <button type="submit" disabled={send}>
                        {!send ? 'Enviar' : 'Processing...'}
                    </button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Apply;
