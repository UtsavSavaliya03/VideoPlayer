import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";
import { GoCloudUpload } from "react-icons/go";

export const StudioSidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiOutlineHome />,
        cName: 'nav-text'
    },
    // {
    //     title: 'My Channel',
    //     path: '/studio',
    //     icon: <BiBookContent />,
    //     cName: 'nav-text'
    // },
    {
        title: 'Content',
        path: '/studio/myContent',
        icon: <BiBookContent />,
        cName: 'nav-text'
    },
    {
        title: 'Upload',
        path: '/studio/upload',
        icon: <GoCloudUpload />,
        cName: 'nav-text'
    },
];