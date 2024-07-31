import { FaInbox, FaRegStar } from 'react-icons/fa';
import { BiMessageRoundedDots } from "react-icons/bi";

export default function Menu({ onOpenSelectFFriends }) {
  return (
    <>
      <div className=" w-full rounded-3xl bg-white text-black mt-3">
        <button className="flex items-center w-full p-2 gap-2 rounded-lg hover:bg-blue-100 transition-colors">
          <FaInbox style={{width:"1.5em", height:"1.5em"}} />
          <span className=" p-1 ml-2 font-bold text-md">Servers</span>
        </button>
        <button className="flex items-center w-full p-2 gap-2 rounded-lg hover:bg-blue-100 transition-colors">
          <FaRegStar style={{width:"1.5em", height:"1.5em"}}/>
          <span className="p-1 ml-2 font-bold text-md">Friends</span>
        </button>
      </div>
      <div className="mt-3 bg-white text-black rounded-full"> 
        <button className="flex items-center w-full h-14 p-2 gap-2 rounded-full hover:bg-blue-100 transition-colors" onClick={onOpenSelectFFriends}>
          <BiMessageRoundedDots style={{width:"1.5em", height:"1.5em"}} />
          <span className="ml-2 font-bold text-md ">Direct Messages</span>
          <span className='ml-auto font-bold'>+</span>
        </button>
      </div>
    </>
  );
}

