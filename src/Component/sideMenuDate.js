import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

const isLogin = localStorage.getItem('isLogin');

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiOutlineHome />,
    cName: 'nav-text'
  },
  {
    title: 'Favourite',
    path: '/favourite',
    icon: <AiOutlineHeart />,
    cName: 'nav-text'
  },
  {
    title: 'Watch Later',
    path: '/watchLater',
    icon: <MdOutlineWatchLater />,
    cName: 'nav-text'
  },
  {
    title: 'Liked Videos',
    path: '/watchLater',
    icon: <BiLike />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/history',
    icon: <RiHistoryLine />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/history',
    icon: <FiSettings />,
    cName: 'nav-text'
  }
];