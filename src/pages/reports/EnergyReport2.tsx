
import { ReportLayout } from "@/components/reports/ReportLayout";
import { Section } from "@/components/reports/Section";
import { AnimatedParagraph } from "@/components/reports/AnimatedParagraph";
import { ReportLineChart } from "@/components/reports/ReportLineChart";

const sections = [
  { id: "market-overview", title: "Market Overview" },
  { id: "growth-drivers", title: "Growth Drivers" },
  { id: "future-outlook", title: "Future Outlook" },
];

const EnergyReport2 = () => {
  return (
    <ReportLayout sections={sections}>
      <Section id="market-overview">
        <h2 className="text-3xl font-bold mb-4">Renewable Energy Market Update: Overview</h2>
        <AnimatedParagraph>The global renewable energy market has experienced unprecedented growth over the past decade. This report provides an update on the latest trends, focusing on the expansion of solar and wind power generation. We analyze market dynamics, investment trends, and policy impacts that are shaping the future of clean energy.</AnimatedParagraph>
        <AnimatedParagraph>Our data indicates a significant acceleration in renewable capacity additions, driven by falling costs and increasing demand for sustainable energy solutions. The chart below illustrates the comparative growth of solar and wind energy generation over the last few years.</AnimatedParagraph>
        <ReportLineChart />
      </Section>
      <Section id="growth-drivers">
        <h2 className="text-3xl font-bold mb-4">Key Growth Drivers</h2>
        <AnimatedParagraph>Several factors are fueling the rapid expansion of the renewable energy sector. Technological advancements have led to more efficient solar panels and wind turbines, significantly reducing the levelized cost of energy (LCOE). Additionally, supportive government policies, such as tax incentives and renewable portfolio standards, have created a favorable investment climate.</AnimatedParagraph>
        <AnimatedParagraph>Corporate procurement of renewable energy has also emerged as a major driver, with many large companies committing to 100% renewable energy targets. This corporate demand provides a stable revenue stream for renewable energy projects, further de-risking investments in the sector.</AnimatedParagraph>
      </Section>
      <Section id="future-outlook">
        <h2 className="text-3xl font-bold mb-4">Future Outlook</h2>
        <AnimatedParagraph>The outlook for renewable energy remains strong. Projections indicate that renewables will account for the majority of new electricity capacity additions globally over the next five years. However, challenges remain, including grid integration, energy storage, and supply chain constraints.</AnimatedParagraph>
        <AnimatedParagraph>Addressing these challenges will require continued innovation, investment in grid infrastructure, and policy support. The transition to a clean energy economy is well underway, and the trends outlined in this report suggest a promising future for renewable energy.</AnimatedParagraph>
      </Section>
    </ReportLayout>
  );
};

export default EnergyReport2;
