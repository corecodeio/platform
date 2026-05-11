import React from 'react';
import { useNavigate } from 'react-router-dom';
//icons
import { TbAlertTriangle } from 'react-icons/tb';

const CourseCard = ({ data, text, url, text2, url2, subscribed = true }) => {
    const navigate = useNavigate();
    const bookingClassName = data.extra_alert
        ? 'border-[#d1e0e7] bg-[#fee6da] py-[7px] text-[#d83341]'
        : 'border-[#d1e0e7] bg-[#ebf3f7] py-2.5 text-[#335065]';

    return (
        <article className="flex h-full flex-col">
            <div className="flex flex-1 flex-col rounded-t border border-b-0 border-[#d1e0e7] bg-[#f5f9fb] px-4 py-6 md:px-3.5 xl:px-4">
                <p className="font-['Rubik-Bold'] text-lg text-[#0d1e38] min-[1281px]:text-[19px] min-[1441px]:text-xl">
                    {data.title}
                </p>
                <p className="font-['Rubik-Bold'] text-lg text-[#0d1e38] min-[1281px]:text-[19px] min-[1441px]:text-xl">
                    {data.title_second}
                </p>
                <p className="mb-3 font-['Rubik-Regular'] text-lg text-[#0d1e38] min-[1281px]:text-[19px] min-[1441px]:text-xl">
                    {data.title_extra}
                </p>
                <div className="mb-6 flex flex-wrap gap-1">
                    <p className="rounded-full bg-[#cadbe3] px-3 py-1.5 font-['SourceSansPro-Regular'] text-sm text-[#335065]">
                        {data.type}
                    </p>
                    <p className="rounded-full bg-[#cadbe3] px-3 py-1.5 font-['SourceSansPro-Regular'] text-sm text-[#335065]">
                        {data.duration}
                    </p>
                    <p className="rounded-full bg-[#cadbe3] px-3 py-1.5 font-['SourceSansPro-Regular'] text-sm text-[#335065]">
                        Nivel {data.level}
                    </p>
                </div>
                <div className="flex min-h-[90px] flex-col gap-2 md:min-h-[100px] min-[1281px]:min-h-[90px]">
                    <p className="font-['SourceSansPro-Regular'] text-sm text-[#335065]">
                        <strong className="font-['SourceSansPro-Bold']">Dominarás:</strong>{' '}
                        {data.technologies}
                    </p>
                    <p className="font-['SourceSansPro-Regular'] text-sm text-[#335065]">
                        <strong className="font-['SourceSansPro-Bold']">Precio:</strong> {data.price}
                    </p>
                    <p className="font-['SourceSansPro-Regular'] text-sm text-[#335065]">
                        <strong className="font-['SourceSansPro-Bold']">Inicia:</strong> Al llegar a{' '}
                        {data.minimum} aplicaciones daremos fecha.
                    </p>
                </div>
                <div className="mt-4 flex w-full flex-wrap justify-end gap-3">
                    {text2 && url2 && (
                        <button
                            type="button"
                            className="rounded border border-[#6254ff] bg-transparent px-6 py-3 font-['SourceSansPro-SemiBold'] text-lg text-[#6254ff] transition-colors hover:bg-[#f0efff]"
                            onClick={() => navigate(url2)}
                        >
                            {text2}
                        </button>
                    )}
                    {text && url && (
                        <button
                            type="button"
                            className="rounded border border-[#6254ff] bg-[#6254ff] px-6 py-3 font-['SourceSansPro-SemiBold'] text-lg text-white transition-colors hover:bg-[#5144e5] disabled:border-[#9f98ee] disabled:bg-[#9f98ee] disabled:hover:bg-[#9f98ee]"
                            onClick={() => navigate(url)}
                            disabled={!subscribed}
                        >
                            {text}
                        </button>
                    )}
                </div>
            </div>
            <div
                className={`flex items-center rounded-b border border-t-0 px-2.5 ${bookingClassName}`}
            >
                {data.extra_alert && <TbAlertTriangle className="mr-2.5 mt-1 h-5 w-5 shrink-0" />}
                <p className="font-['SourceSansPro-Bold'] text-sm">{`${
                    data.extra_alert ? '¡Aplica ahora! ' : ''
                }Reservas confirmadas: ${data.bookings}`}</p>
            </div>
        </article>
    );
};

export default CourseCard;
