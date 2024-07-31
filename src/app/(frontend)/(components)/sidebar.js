"use client";
import { AiFillMessage } from "react-icons/ai";
import { FaPinterest, FaLinkedin, FaPlusCircle, FaBell } from 'react-icons/fa';
import styles from "@/app/(frontend)/(components)/sidebar.module.css";
import Image from "next/image";

const Sidebar = ({ onOpenInbox, onOpenModal, onOpenServerModal, onOpenProfileCard, onOpenPrinterest }) => {
  return (
    <div className="fixed top-2 left-2 w-20 h-[calc(100vh-20px)] bg-blue-600 flex flex-col items-center py-5 rounded-xl shadow-lg z-10">
      <div className="mb-5 cursor-pointer" onClick={onOpenInbox}>
        <AiFillMessage size={40} className="text-white" />
      </div>
      <div className="mb-5 cursor-pointer" onClick={onOpenPrinterest}>
        <FaPinterest size={40} className="text-white" />
      </div>
      <div className="mb-5 cursor-pointer">
        <FaLinkedin size={40} className="text-white" />
      </div>
      <div className="mb-5 cursor-pointer" onClick={onOpenServerModal}>
        <FaPlusCircle size={40} className="text-white" />
      </div>
      <div className="mt-auto mb-2 cursor-pointer" onClick={onOpenModal}>
        <FaBell size={30} className="text-white" />
      </div>
      <div className="mb-5 relative" onClick={onOpenProfileCard}>
        <Image src="/profile.png" alt="Profile" width={40} height={40} className="rounded-full" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Sidebar;
