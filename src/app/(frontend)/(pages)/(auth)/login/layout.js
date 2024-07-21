"use client";
import { Kanit, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const kanit = Kanit({ subsets: ["latin"], weight: ["500"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const Authlayout = ({ children }) => {
  return (
    <div>
      <Link href="/">
        <div className="absolute left-4 top-4 flex items-center">
          <Image
            src="/robo_icon.png"
            alt="background"
            width={64}
            height={64}
            className="mr-3 w-10 h-10 md:w-16 md:h-16"
          />
          <h1
            className={`${kanit.className} text-[#EBEBFF] text-[30px] md:text-[41px] font-medium`}
          >
            Sync
          </h1>
        </div>
      </Link>
      <div
        className={`${poppins.className} bg-[url('/nightsky.jpg')] bg-cover bg-no-repeat bg-center bg-fixed h-screen flex justify-center items-center`}
      >
        {children}
      </div>
    </div>
  );
};
export default Authlayout;
