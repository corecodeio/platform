import React from 'react';
//styles
import Styles from './CourseCard.module.css';
//icons
import { TbAlertTriangle } from 'react-icons/tb';

const CourseCard = ({ data }) => {
    return (
        <>
            <div className={Styles[`details`]}>
                <p className={Styles[`title`]}>{data.title}</p>
                <p className={Styles[`title`]}>{data.title_second}</p>
                <p className={Styles[`title2`]}>{data.title_extra}</p>
                <div className={Styles[`items`]}>
                    <p>{data.type}</p>
                    <p>{data.duration}</p>
                    <p>Nivel {data.level}</p>
                </div>
                <div className={Styles[`texts`]}>
                    <p className={Styles[`text`]}>
                        <strong>Dominarás:</strong> {data.technologies}
                    </p>
                    <p className={Styles[`text`]}>
                        <strong>Precio:</strong> {data.price}
                    </p>
                    <p className={Styles[`text`]}>
                        <strong>Inicia:</strong> Al llegar a {data.minimum} aplicaciones daremos
                        fecha.
                    </p>
                </div>
                <div className={Styles[`buttons`]}>
                    <button className={Styles[`button-details2`]}>Detalles</button>

                    <button className={Styles[`button-details`]}>Aplicar</button>
                </div>
            </div>
            <div className={Styles[`bookings-${data.extra_alert ? '1' : '0'}`]}>
                {data.extra_alert && <TbAlertTriangle className={Styles[`icon-alert`]} />}
                <p className={Styles[`text2`]}>{`${
                    data.extra_alert ? '¡Aplica ahora! ' : ''
                }Reservas confirmadas: ${45}`}</p>
            </div>
        </>
    );
};

export default CourseCard;
