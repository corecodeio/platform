//icons
import { AiOutlineTeam, AiOutlineControl, AiOutlineSlack } from 'react-icons/ai';
import {
    MdOutlineAdminPanelSettings,
    MdOutlinePlayLesson,
    MdSettingsApplications,
    MdOutlineCreateNewFolder,
    MdAutoGraph
} from 'react-icons/md';
import { FaUsers, FaUserTie } from 'react-icons/fa';
import { TbContrast2 } from 'react-icons/tb';
import { HiChatAlt2 } from 'react-icons/hi';
import { SiPowerpages } from 'react-icons/si';
import { TbFilePower } from 'react-icons/tb';
import { IoLogoGoogle } from 'react-icons/io';

const options = [
    {
        url: '',
        title: 'Statistics',
        icon: MdAutoGraph,
        list: []
    },
    {
        url: 'users',
        title: 'Users',
        icon: FaUsers,
        list: [
            { url: 'applicants', title: 'Applicants', icon: MdSettingsApplications },
            { url: 'chats', title: 'Chats', icon: HiChatAlt2 },
            { url: 'contracts', title: 'Contracts', icon: TbContrast2 }
        ]
    },
    {
        url: 'staff',
        title: 'Staff',
        icon: AiOutlineTeam,
        list: [
            { url: 'send-invitation', title: 'Send Invitation', icon: MdOutlineCreateNewFolder },
            { url: 'staff-list', title: 'Staff List', icon: FaUserTie }
        ]
    },
    {
        url: 'course',
        title: 'Courses',
        icon: MdOutlinePlayLesson,
        list: []
    },
    {
        url: 'permissions-and-roles',
        title: 'Permissions and Roles',
        icon: MdOutlineAdminPanelSettings,
        list: [
            { url: 'administer-powers', title: 'Administer Powers', icon: TbFilePower },
            { url: 'roles', title: 'roles', icon: SiPowerpages },
            { url: 'permissions', title: 'Permissions', icon: AiOutlineControl }
        ]
    },
    {
        url: 'automatic-invitations',
        title: 'Automatic Invitations',
        icon: MdOutlineCreateNewFolder,
        list: [
            { url: 'slack', title: 'Slack', icon: AiOutlineSlack },
            { url: 'google-calendar', title: 'Google Calendar', icon: IoLogoGoogle }
        ]
    }
];

export default options;
