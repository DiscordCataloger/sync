import RegisterPageComponent from "@/app/(frontend)/(components)/register";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";
import "@/app/(frontend)/(components)/slide.css";

export const metadata = {
  title: "Sign Up For an Account on Sync!",
  description: "Account Signup on Sync",
};

export default function RegisterPage() {
  return (
    <SlideProvider>
      <RegisterPageComponent />
    </SlideProvider>
  );
}
