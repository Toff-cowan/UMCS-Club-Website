import { useState } from "react";
import { getSIGs } from "@/services/api";
import { useFetch } from "@/hooks/useFetch";
import SIGsHero from "@/components/SIGs/SIGsHero";
import SIGsIntroSection from "@/components/SIGs/SIGsIntroSection";
import SIGLeads from "@/components/SIGs/SIGLeads";

export default function SIGs() {
  const { data: sigs, loading, error } = useFetch(getSIGs);

  // Start with first available category, or "All" if none available
  const getInitialCategory = () => {
    if (sigs && sigs.length > 0) {
      const firstCategory = [...new Set(sigs.map((s) => s.category))].find(Boolean);
      return firstCategory || "All";
    }
    return "All";
  };

  const [active, setActive] = useState(getInitialCategory);

  if (loading) {
    return (
      <>
        <SIGsHero />
        <div className="flex justify-center items-center min-h-screen bg-black">
          <p className="text-center text-xl text-white">Loading SIGs...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SIGsHero />
        <div className="flex justify-center items-center min-h-screen bg-black">
          <p className="text-center text-xl text-red-600">Error: {error}</p>
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

