import React from 'react';
//styles
import Styles from './CourseCard.module.css';
import { useNavigate } from 'react-router-dom';
//icons
import { TbAlertTriangle } from 'react-icons/tb';

const CourseCard = ({ data, text, url, text2, url2, subscribed = true }) => {
    const navigate = useNavigate();
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
                    {text2 && url2 && (
                        <button
                            className={Styles[`button-details2`]}
                            onClick={() => navigate(url2)}
                        >
                            {text2}
                        </button>
                    )}
                    {text && url && (
                        <button
                            className={Styles[`button-details`]}
                            onClick={() => navigate(url)}
                            disabled={!subscribed}
                        >
                            {text}
                        </button>
                    )}
                </div>
            </div>
            <div className={Styles[`bookings-${data.extra_alert ? '1' : '0'}`]}>
                {data.extra_alert && <TbAlertTriangle className={Styles[`icon-alert`]} />}
                <p className={Styles[`text2`]}>{`${
                    data.extra_alert ? '¡Aplica ahora! ' : ''
                }Reservas confirmadas: ${data.bookings}`}</p>
            </div>
        </>
    );
};

export default CourseCard;
