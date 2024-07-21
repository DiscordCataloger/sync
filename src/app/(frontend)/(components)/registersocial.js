import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RegisterSocial() {
  return (
    <div className="flex h-[550px] md:h-[648px]">
      <div className="flex flex-col justify-center items-center bg-[#F6F6F6] w-[20px] md:w-[100px]">
        <div className="border border-l-1 h-[250px]"></div>
        <p className="my-2 text-[12px] md:text-[16px]">OR</p>
        <div className="border border-l-1 h-[250px]"></div>
      </div>
      <div className="flex flex-col items-center justify-center bg-[#F6F6F6] rounded-r-lg px-[10px] md:px-[100px]">
        <Button
          size="default"
          variant="default"
          className="py-2 md:py-6 my-[24px] text-[12px] md:text-[16px] bg-[#F5F5F5] text-[#1E1E1E] drop-shadow-lg hover:bg-[#60595e]/60 hover:text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full px-6"
        >
          Sign Up with Google
          <Image
            className="mx-[5px] w-[18px] h-[18px] md:w-[30px] md:h-[30px]"
            src="/googleicon.png"
            height={30}
            width={30}
          ></Image>
        </Button>
        <Button
          size="default"
          variant="default"
          className="py-2 md:py-6 my-[24px] text-[12px] md:text-[16px] bg-[#F5F5F5] text-[#1E1E1E] drop-shadow-md hover:bg-[#60595e]/60 hover:text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full px-6"
        >
          Sign Up with Facebook
          <Image
            className="mx-[5px] w-[18px] h-[18px] md:w-[30px] md:h-[30px]"
            src="/facebookicon.png"
            height={30}
            width={30}
          ></Image>
        </Button>
        <Button
          size="default"
          variant="default"
          className="py-2 md:py-6 my-[24px] text-[12px] md:text-[16px] bg-[#F5F5F5] text-[#1E1E1E] drop-shadow-md hover:bg-[#60595e]/60 hover:text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full px-6"
        >
          Sign Up with Github
          <Image
            className="mx-[5px] w-[18px] h-[18px] md:w-[30px] md:h-[30px]"
            src="/githubicon.png"
            height={30}
            width={30}
          ></Image>
        </Button>
      </div>
    </div>
  );
}
