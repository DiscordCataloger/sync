import React from 'react';
import { AiFillMessage } from "react-icons/ai";
import { FaPinterest, FaLinkedin, FaPlusCircle, FaBell } from 'react-icons/fa';
import Image from "next/image";

const Sidebar = ({ 
    onOpenInbox, 
    onOpenServerModal, 
    onOpenProfileCard, 
    onOpenPrinterest, 
    onShowComponents // New prop
}) => {
    const icons = [
        { icon: <AiFillMessage size={40} />, onClick: onShowComponents }, // Set onClick to onShowComponents
        { icon: <FaPinterest size={40} />, onClick: onOpenPrinterest },
        { icon: <FaLinkedin size={40} />, onClick: null }, 
        { icon: <FaPlusCircle size={40} />, onClick: onOpenServerModal },
    ];

    return (
        <div className="fixed top-2 left-2 w-20 h-[calc(100vh-20px)] bg-blue-600 flex flex-col items-center py-5 rounded-xl shadow-lg z-10">
            {icons.map((item, index) => (
                <div key={index} className="mb-5 cursor-pointer" onClick={item.onClick}>
                    {item.icon}
                </div>
            ))}
            <div className="mt-auto mb-2 cursor-pointer" onClick={onOpenInbox}>
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

