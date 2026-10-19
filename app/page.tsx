import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/work";
import { Beyond } from "@/components/sections/beyond";
import { Lab } from "@/components/sections/lab";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div id="top">
      <Hero />
      <SelectedWork />
      <Beyond />
      <Lab />
      <About />
      <Contact />
    </div>
  );
}
