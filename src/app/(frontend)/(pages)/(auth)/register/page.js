import Register from "@/app/(frontend)/(components)/register";
import RegisterSocial from "@/app/(frontend)/(components)/registersocial";
import "@/app/(frontend)/(components)/register.css";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center">
      <Register />
      <RegisterSocial />
    </div>
  );
}
