import { Kanit } from "next/font/google";

const kanit = Kanit({ subsets: ["latin"], weight: ["500"] });

const Authlayout = ({ children }) => {
  return (
    <div>
      <div className="absolute left-4 top-4 flex items-center">
        <img src="/robo_icon.png" className="mr-3 w-16 h-16" />
        <h1 className={`${kanit.className} text-[41px] font-medium`}>Sync</h1>
      </div>
      <div className="bg-[url('/nightsky.jpg')] bg-cover bg-no-repeat bg-center bg-fixed h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};
export default Authlayout;
