import SearchBar from '@/app/(frontend)/(components)/Searchbar';
import Menu from '@/app/(frontend)/(components)/Menu';
import DirectMessages from '@/app/(frontend)/(components)/Directmessage';
import Sidebar from '@/app/(frontend)/(components)/Sidebar';

const MainLayout = ({ onOpenModal }) => {
    return (
        <div className='bg-blue-100'>
        <div className="flex bg-blue-100 h-screen" style={{ width: '40%' }}>
            <Sidebar onOpenModal={onOpenModal} className="w-64 h-full" />
            <div className="flex-1 p-4 h-screen overflow-hidden ml-20">
                <SearchBar />
                <Menu />
                <DirectMessages />
            </div>
        </div>
        </div>
    );
};

export default MainLayout;
