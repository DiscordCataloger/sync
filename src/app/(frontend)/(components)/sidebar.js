import { AiFillMessage } from "react-icons/ai";
import { FaComments, FaPinterest, FaLinkedin, FaPlusCircle, FaBell } from 'react-icons/fa';
import styles from "@/app/(frontend)/(components)/sidebar.module.css";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.button}>
        <AiFillMessage size={40} className={styles.icon} />
      </div>
      <div className={styles.button}>
        <FaPinterest size={40} className={styles.icon} />
      </div>
      <div className={styles.button}>
        <FaLinkedin size={40} className={styles.icon} />
      </div>
      <div className={styles.button}>
        <FaPlusCircle size={40} className={styles.icon} />
      </div>

      <div className={styles.notification}>
        <FaBell size={40} className={styles.icon} />
      </div>
      <div className={styles.profile}>
        <Image src="/profile.png" alt="Profile" width={40} height={40} className={styles.profileImage} />
        <div className={styles.status}></div>
      </div>
    </div>
  );
};

export default Sidebar;