import Register from "@/app/(frontend)/(components)/register";
import RegisterSocial from "@/app/(frontend)/(components)/registersocial";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center mt-[5%]">
      <Register />
      <RegisterSocial />
    </div>
  );
}
