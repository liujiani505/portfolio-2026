import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/work";
import { Lab } from "@/components/sections/lab";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div id="top">
      <Hero />
      <SelectedWork />
      <Lab />
      <About />
      <Contact />
    </div>
  );
}
