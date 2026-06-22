import React from 'react';
import { useNavigate } from 'react-router-dom';
//icons
import { TbAlertTriangle } from 'react-icons/tb';

const CourseCard = ({ data, text, url, text2, url2, subscribed = true }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="min-w-0 overflow-hidden rounded-t border border-b-0 border-[#d1e0e7] bg-[#f5f9fb] px-4 py-6">
                <p className="text-xl text-[#0d1e38] [font-family:'Rubik-Bold',serif] lg:text-[18.4px] xl:text-[19px] 2xl:text-xl">
                    {data.title}
                </p>
                <p className="text-xl text-[#0d1e38] [font-family:'Rubik-Bold',serif] lg:text-[18.4px] xl:text-[19px] 2xl:text-xl">
                    {data.title_second}
                </p>
                <p className="mb-3 text-xl text-[#0d1e38] [font-family:'Rubik-Regular',serif] lg:text-[18.4px] xl:text-[19px] 2xl:text-xl">
                    {data.title_extra}
                </p>
                <div className="mb-6 flex flex-wrap gap-1">
                    <p className="rounded-full bg-[#cadbe3] px-3 py-1.5 text-sm text-[#335065]">
                        {data.type}
                    </p>
                    <p className="rounded-full bg-[#cadbe3] px-3 py-1.5 text-sm text-[#335065]">
                        {data.duration}
                    </p>
                    <p className="rounded-full bg-[#cadbe3] px-3 py-1.5 text-sm text-[#335065]">
                        Nivel {data.level}
                    </p>
                </div>
                <div className="flex min-h-[90px] flex-col gap-2 lg:min-h-[100px] xl:min-h-[90px]">
                    <p className="break-words text-sm text-[#335065]">
                        <strong>Dominarás:</strong> {data.technologies}
                    </p>
                    <p className="break-words text-sm text-[#335065]">
                        <strong>Precio:</strong> {data.price}
                    </p>
                    <p className="break-words text-sm text-[#335065]">
                        <strong>Inicia:</strong> Al llegar a {data.minimum} aplicaciones daremos
                        fecha.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                    {text2 && url2 && (
                        <button
                            className="mt-4 w-full rounded border border-[#6254ff] bg-transparent px-4 py-3 text-base text-[#6254ff] transition hover:bg-[#6254ff]/10 sm:w-auto sm:px-6 sm:text-lg"
                            onClick={() => navigate(url2)}
                            type="button"
                        >
                            {text2}
                        </button>
                    )}
                    {text && url && (
                        <button
                            className="w-full rounded border border-[#6254ff] bg-[#6254ff] px-4 py-3 text-base text-white transition hover:bg-[#5145d9] disabled:border-[#9f98ee] disabled:bg-[#9f98ee] sm:mt-4 sm:w-auto sm:px-6 sm:text-lg"
                            onClick={() => navigate(url)}
                            disabled={!subscribed}
                            type="button"
                        >
                            {text}
                        </button>
                    )}
                </div>
            </div>
            <div
                className={`flex rounded-b border border-t-0 border-[#d1e0e7] px-2.5 ${
                    data.extra_alert
                        ? 'items-center bg-[#fee6da] py-[7px] text-[#d83341]'
                        : 'bg-[#ebf3f7] py-2.5 text-[#0d1e38]'
                }`}
            >
                {data.extra_alert && (
                    <TbAlertTriangle className="mr-2.5 mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                )}
                <p className="text-sm [font-family:'SourceSansPro-Bold',serif]">{`${
                    data.extra_alert ? '¡Aplica ahora! ' : ''
                }Reservas confirmadas: ${data.bookings}`}</p>
            </div>
        </>
    );
};

export default CourseCard;
