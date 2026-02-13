import { useState } from "react";
import { getSIGs } from "@/services/api";
import { useFetch } from "@/hooks/useFetch";
import SIGsHero from "@/components/SIGs/SIGsHero";
import SIGsIntroSection from "@/components/SIGs/SIGsIntroSection";
import SIGLeads from "@/components/SIGs/SIGLeads";

const SECTION_BG = "#0A0F2C";

export default function SIGs() {
  const { data: sigs, loading, error } = useFetch(getSIGs);
  const [active, setActive] = useState("All");

  if (loading) {
    return (
      <>
        <SIGsHero />
        <div
          className="flex justify-center items-center min-h-[60vh] px-4"
          style={{ backgroundColor: SECTION_BG }}
        >
          <p className="text-center text-xl text-white/90">Loading SIGs...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SIGsHero />
        <div
          className="flex justify-center items-center min-h-[60vh] px-4"
          style={{ backgroundColor: SECTION_BG }}
        >
          <p className="text-center text-xl text-red-400 max-w-md">Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <SIGsHero />

      {/* Intro Section with Category Buttons and Content */}
      <SIGsIntroSection 
        activeCategory={active}
        onCategoryChange={setActive}
        sigs={sigs}
      />

      {/* SIG Leads Section */}
      <SIGLeads />
    </>
  );
}

