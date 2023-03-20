import React, { useState } from 'react';
import Styles from './ItemList.module.css';
//compoents
import { Tr, Td } from './../../Interface';
import FormZoom from './FormZoom';
import CreateSlack from './CreateSlack';
//icons
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineWifiProtectedSetup } from 'react-icons/md';

const ItemList = ({ item, searchList }) => {
    const [openZoomLink, setOpenZoomLink] = useState(false);
    const [openZoomCode, setOpenZoomCode] = useState(false);
    const [openCreateSlack, setOpenCreateSlack] = useState(false);

    return (
        <Tr>
            <Td>{item.name}</Td>
            <Td>
                {item.slack_id ? (
                    item.slack_name
                ) : !openCreateSlack ? (
                    <button
                        className={Styles[`button-create-slack`]}
                        onClick={() => setOpenCreateSlack(true)}
                    >
                        Create Slack
                        <MdOutlineWifiProtectedSetup
                            className={Styles[`button-create-slack-icon`]}
                        />
                    </button>
                ) : (
                    <CreateSlack
                        item={item}
                        setOpenCreateSlack={setOpenCreateSlack}
                        searchList={searchList}
                    />
                )}
            </Td>
            <Td>
                {item.google_calendar_name ? (
                    item.google_calendar_name
                ) : (
                    <button className={Styles[`button-create-slack`]}>
                        Create Calendar
                        <MdOutlineWifiProtectedSetup
                            className={Styles[`button-create-slack-icon`]}
                        />
                    </button>
                )}
            </Td>
            <Td>
                {!openZoomLink ? (
                    <div className={Styles[`edit`]}>
                        {item.zoom_url ? item.zoom_url : 'null'}
                        <AiFillEdit
                            className={Styles[`edit-icon`]}
                            onClick={() => setOpenZoomLink(true)}
                        />
                    </div>
                ) : (
                    <FormZoom
                        item={item}
                        setOpenZoom={setOpenZoomLink}
                        searchList={searchList}
                        type="zoom_url"
                    />
                )}
            </Td>
            <Td>
                {!openZoomCode ? (
                    <div className={Styles[`edit`]}>
                        {item.zoom_code ? item.zoom_code : 'null'}
                        <AiFillEdit
                            className={Styles[`edit-icon`]}
                            onClick={() => setOpenZoomCode(true)}
                        />
                    </div>
                ) : (
                    <FormZoom
                        item={item}
                        setOpenZoom={setOpenZoomCode}
                        searchList={searchList}
                        type="zoom_code"
                    />
                )}
            </Td>
            <Td>{item.status}</Td>
            <Td>
                <p className={Styles[`detail`]}>Detail</p>
            </Td>
        </Tr>
    );
};

export default ItemList;
