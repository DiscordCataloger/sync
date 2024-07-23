import LoginPageComponent from "@/app/(frontend)/(components)/login";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";

export const metadata = {
  title: "Sign In to Sync",
  description: "Account Sign-in",
};

export default function LoginPage() {
  return (
    <SlideProvider>
      <LoginPageComponent />
    </SlideProvider>
  );
}
