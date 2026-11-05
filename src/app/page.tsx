import { AppScreens } from "@/components/site/AppScreens";
import { Faq } from "@/components/site/Faq";
import { Features } from "@/components/site/Features";
import { Hero } from "@/components/site/Hero";
import { Install } from "@/components/site/Install";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <AppScreens />
      <Install />
      <Faq />
    </>
  );
}
