
import { ReportLayout } from "@/components/reports/ReportLayout";
import { Section } from "@/components/reports/Section";
import { AnimatedParagraph } from "@/components/reports/AnimatedParagraph";
import { ReportLineChart } from "@/components/reports/ReportLineChart";

const sections = [
  { id: "introduction", title: "Introduction to EVs" },
  { id: "market-trends", title: "Market Trends" },
  { id: "infrastructure", title: "Infrastructure Needs" },
];

const EnergyReport3 = () => {
  return (
    <ReportLayout sections={sections}>
      <Section id="introduction">
        <h2 className="text-3xl font-bold mb-4">The Future of Electric Vehicles</h2>
        <AnimatedParagraph>Electric vehicles (EVs) are at the forefront of the transportation revolution. This report examines the current state of the EV market, explores key technological advancements, and projects future growth trajectories. We delve into the factors driving consumer adoption and the challenges that lie ahead for widespread electrification.</AnimatedParagraph>
      </Section>
      <Section id="market-trends">
        <h2 className="text-3xl font-bold mb-4">EV Market Trends</h2>
        <AnimatedParagraph>The global EV market is expanding at an exponential rate. This growth is propelled by a combination of factors, including stricter emissions regulations, improving battery technology, and a wider range of available models. The chart below showcases the projected growth in EV sales over the next decade, using a sample line chart for demonstration.</AnimatedParagraph>
        <ReportLineChart />
        <AnimatedParagraph>Legacy automakers and new entrants are all vying for market share, leading to intense competition and innovation. Battery costs, a major component of EV prices, continue to decline, making EVs more affordable for the average consumer.</AnimatedParagraph>
      </Section>
      <Section id="infrastructure">
        <h2 className="text-3xl font-bold mb-4">Charging Infrastructure Needs</h2>
        <AnimatedParagraph>A robust and accessible charging infrastructure is critical for the mass adoption of EVs. This section analyzes the current state of public and private charging networks and identifies the investment needed to support a fully electric fleet. We discuss the different types of chargers (Level 1, Level 2, DC Fast Charging) and their roles in the ecosystem.</AnimatedParagraph>
        <AnimatedParagraph>Smart charging solutions, vehicle-to-grid (V2G) technology, and wireless charging are emerging as key areas of innovation that could transform the EV charging experience and enhance grid stability. Policy support and private investment will be essential to build out the necessary infrastructure.</AnimatedParagraph>
      </Section>
    </ReportLayout>
  );
};

export default EnergyReport3;
