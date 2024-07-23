import ForgetPageComponent from "@/app/(frontend)/(components)/forget";
import SlideProvider from "../(slide)/slideProvider";

export const metadata = {
  title: "Account Recovery",
  description: "Account Recovery on Sync",
};

export default function ForgetCreds() {
  return (
    <SlideProvider>
      <ForgetPageComponent />
    </SlideProvider>
  );
}
