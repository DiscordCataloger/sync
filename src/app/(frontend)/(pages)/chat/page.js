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

    const handleOpenComponent = (component) => {
        closeAllComponents(); 
        setActiveComponent(component); 
    };

    const handleOpenInbox = () => {
        setActiveComponent('inbox'); 
    };

    const handleShowComponents = () => {
        closeAllComponents(); 
        setActiveComponent(null); 
    };

    return (
        <div className='bg-blue-100'>
            <div className="flex h-screen" style={{ width: '40%' }}>
                <Sidebar 
                    onOpenInbox={handleOpenInbox} 
                    onOpenServerModal={() => handleOpenComponent('serverModal')}
                    onOpenProfileCard={() => handleOpenComponent('profileCard')} 
                    onOpenPrinterest={() => handleOpenComponent('channelBar')} 
                    onShowComponents={handleShowComponents} 
                />
                <div className="flex-1 flex flex-col p-4 overflow-hidden ml-20">
                    {activeComponent === 'channelBar' ? (
                        <ChannelBar onClose={closeAllComponents} />
                    ) : (
                        <>
                            <Searchbar />
                            <Menu onOpenSelectFriends={() => handleOpenComponent('selectFriends')} />
                            <Directmessage />
                            {activeComponent === 'inbox' && <Inbox isOpen={true} onClose={closeAllComponents} />}
                            {activeComponent === 'serverModal' && <ServerModal isOpen={true} onClose={closeAllComponents} />}
                            {activeComponent === 'profileCard' && (
                                <ProfileCard 
                                    isOpen={true} 
                                    onClose={closeAllComponents} 
                                    username="YourUsername" 
                                    discriminator="#1234" 
                                    onSave={() => console.log('Saved!')} 
                                />
                            )}
                            {activeComponent === 'selectFriends' && <SelectFriends onClose={closeAllComponents} />}
                        </>
                    )}
                </div>
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
