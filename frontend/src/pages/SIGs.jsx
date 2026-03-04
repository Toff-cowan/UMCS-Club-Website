import { useState } from "react";
import { getSIGs } from "@/services/api";
import { useFetch } from "@/hooks/useFetch";
import SIGsHero from "@/components/SIGs/SIGsHero";
import SIGsIntroSection from "@/components/SIGs/SIGsIntroSection";
import SIGLeads from "@/components/SIGs/SIGLeads";
import "../App.css";
import "../index.css";
import "./SIGs.css";

export default function SIGs() {
  const { data: sigs, loading, error } = useFetch(getSIGs);
  const [active, setActive] = useState("All");

  if (loading) {
    return (
      <div className="sigs-page-wrap">
        <SIGsHero />
        <div className="sigs-loading-wrap">
          <p className="sigs-loading-text-wrap">Loading SIGs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sigs-page-wrap">
        <SIGsHero />
        <div className="sigs-loading-wrap">
          <p className="sigs-error-wrap">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sigs-page-wrap">
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
    </div>
  );
}

