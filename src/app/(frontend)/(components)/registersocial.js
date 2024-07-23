import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RegisterSocial() {
  return (
    <div className="flex mt-0 md:mt-[5%] h-[454px] md:h-[551px]">
      <div className="flex flex-col justify-center items-center py-5 bg-[#F6F6F6]">
        <div className="border border-l-1 h-[180px] border-[#aeb5bf]"></div>
        <p className="my-2 text-[12px] md:text-[16px] text-[#aeb5bf] font-extrabold">
          OR
        </p>
        <div className="border border-l-1 h-[180px] border-[#aeb5bf]"></div>
      </div>
      <div className="flex flex-col items-center justify-center bg-[#F6F6F6] rounded-r-lg px-[30px] md:px-[25px]">
        <Button
          size="default"
          variant="grey"
          className="py-2 md:py-6 my-[24px] text-[12px] md:text-[16px] bg-[#F5F5F5] text-[#1E1E1E] drop-shadow-lg hover:bg-[#60595e]/60 hover:text-[#F5F5F5] hover:shadow-md rounded-md h-[25px] md:h-[40px] w-full px-6"
        >
          Sign Up with Google
          <Image
            className="mx-[5px] w-[18px] h-[18px] md:w-[30px] md:h-[30px]"
            src="/googleicon.png"
            height={30}
            width={30}
            alt="Google_register"
          ></Image>
        </Button>
        <Button
          size="default"
          variant="grey"
          className="py-2 md:py-6 my-[24px] text-[12px] md:text-[16px] bg-[#F5F5F5] text-[#1E1E1E] drop-shadow-md hover:bg-[#60595e]/60 hover:text-[#F5F5F5] hover:shadow-md rounded-md h-[25px] md:h-[40px] w-full px-6"
        >
          Sign Up with Facebook
          <Image
            className="mx-[5px] w-[18px] h-[18px] md:w-[30px] md:h-[30px]"
            src="/facebookicon.png"
            height={30}
            width={30}
            alt="facebookregister"
          ></Image>
        </Button>
        <Button
          size="default"
          variant="grey"
          className="py-2 md:py-6 my-[24px] text-[12px] md:text-[16px] bg-[#F5F5F5] text-[#1E1E1E] drop-shadow-md hover:bg-[#60595e]/60 hover:shadow-md hover:text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full px-6"
        >
          Sign Up with Github
          <Image
            className="mx-[5px] w-[18px] h-[18px] md:w-[30px] md:h-[30px]"
            src="/githubicon.png"
            height={30}
            width={30}
            alt="githubregister"
          ></Image>
        </Button>
      </div>
    </div>
  );
}
