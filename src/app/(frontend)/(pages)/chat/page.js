"use client";


{/*import MainLayout from '@/app/(frontend)/(components)/MainLayout';

export default function Home() {
  const handleOpenModal = () => {
    // Handle modal opening logic here
  };

  return <MainLayout onOpenModal={handleOpenModal} />;
}




{/*import React from "react";
import NotificationButton from "@/app/(frontend)/(components)/NotificationButton";


const Home = () => {
  return (
    <div>
      <NotificationButton />
    </div>
  );
};

export default Home
*/}

//Inbox


import React, { useState } from 'react';
import Sidebar from '@/app/(frontend)/(components)/Sidebar';
import Inbox from '@/app/(frontend)/(components)/Inbox';
import ServerModal from '@/app/(frontend)/(components)/ServerModal'; 
import ProfileCard from '@/app/(frontend)/(components)/ProfileCard';
import ChannelBar from '@/app/(frontend)/(components)/ChannelBar';
import Searchbar from '@/app/(frontend)/(components)/Searchbar';
import Menu from '@/app/(frontend)/(components)/Menu'; 
import Directmessage from '@/app/(frontend)/(components)/Directmessage';
import SelectFriends from '@/app/(frontend)/(components)/SelectFriends';

const App = () => {
    const [activeComponent, setActiveComponent] = useState(null);

    const closeAllComponents = () => setActiveComponent(null);

    const handleOpenInbox = () => {
        closeAllComponents();
        setActiveComponent('inbox');
    };

    const handleOpenServerModal = () => {
        closeAllComponents();
        setActiveComponent('serverModal');
    };

    const handleOpenProfileCard = () => {
        closeAllComponents();
        setActiveComponent('profileCard');
    };

    const handleOpenPrinterest = () => {
        closeAllComponents();
        setActiveComponent('printerest');
    };

    const handleOpenSelectFriends = () => {
        closeAllComponents();
        setActiveComponent('selectFriends');
    };

    return (
      <div className='bg-blue-100'>
        <div className="flex bg-blue-100 h-screen" style={{ width: '40%' }}>
            <Sidebar 
                onOpenModal={handleOpenInbox} 
                onOpenServerModal={handleOpenServerModal}
                onOpenProfileCard={handleOpenProfileCard} 
                onOpenPrinterest={handleOpenPrinterest} 
                className="w-64 h-full" 
            />
            {activeComponent === 'inbox' && (
                <Inbox isOpen={true} onClose={closeAllComponents} />
            )}
            {activeComponent === 'serverModal' && (
                <ServerModal isOpen={true} onClose={closeAllComponents} />
            )}
            {activeComponent === 'profileCard' && (
                <ProfileCard 
                    isOpen={true} 
                    onClose={closeAllComponents} 
                    username="YourUsername" 
                    discriminator="#1234" 
                    onSave={() => console.log('Saved!')} 
                />
            )}
            {activeComponent === 'printerest' ? (
                <ChannelBar onClose={closeAllComponents} />
            ) : (
                <div className="flex-1 flex flex-col p-4 overflow-hidden ml-20">
                    <Searchbar />
                    <Menu onOpenSelectFriends={handleOpenSelectFriends} />
                    <Directmessage />
                </div>
            )}
            {activeComponent === 'selectFriends' && (
                <SelectFriends onClose={closeAllComponents} />
            )}
        </div>
      </div>
    );
};

export default App;









//SelectFriends
{/*import SelectFriends from "@/app/(frontend)/(components)/SelectFriends";

export default function Home() {
  return (
    <div>
      <SelectFriends />
    </div>
  );
}

*/}





//ProflieCard
{/*import ProfileCard from '@/app/(frontend)/(components)/ProfileCard';

const App = () => {
  return (
    <ProfileCard 
      username="Kojio" 
      discriminator="koji0060" 
      onSave={handleSave} 
    />
  );
};

export default App;*/}







//ServerModal
{/*import React, {useState} from 'react';
import Sidebar from "@/app/(frontend)/(components)/sidebar";
import ServerModal from "@/app/(frontend)/(components)/ServerModal";



//ServerModel
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <Sidebar onOpenModal={handleOpenModal} />
      <ServerModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
*/}
