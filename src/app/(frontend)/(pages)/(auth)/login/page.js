import LoginPageComponent from "@/app/(frontend)/(components)/login";
import "@/app/(frontend)/(components)/slide.css";
import SlideProvider from "../(slide)/slideProvider";

export const metadata = {
  title: "Account Recovery",
  description: "Account Recovery on Sync",
};

export default function LoginPage() {
  return (
    <SlideProvider>
      <LoginPageComponent />
    </SlideProvider>
  );
}
