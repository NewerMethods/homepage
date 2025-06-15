
import { ReportLayout } from "@/components/reports/ReportLayout";
import { Section } from "@/components/reports/Section";
import { AnimatedParagraph } from "@/components/reports/AnimatedParagraph";
import { ReportHeatmap } from "@/components/reports/ReportHeatmap";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "regional-analysis", title: "Regional Analysis" },
  { id: "conclusion", title: "Conclusion" },
];

const EnergyReport1 = () => {
  return (
    <ReportLayout sections={sections}>
      <Section id="introduction">
        <h2 className="text-3xl font-bold mb-4">Annual Energy Outlook 2024: Introduction</h2>
        <AnimatedParagraph>This report provides a comprehensive analysis of energy markets in the United States through 2050. The U.S. Energy Information Administration (EIA) develops this outlook to assist in policymaking, as well as to help energy companies, and the public in their business and personal decisions. The projections in the Annual Energy Outlook 2024 (AEO2024) are not statements of what will happen but are modeled projections of what may happen given certain assumptions and methodologies.</AnimatedParagraph>
        <AnimatedParagraph>Our analysis focuses on several key areas: electricity generation, consumption patterns across different sectors, and regional energy dynamics. We use a variety of modeling techniques to project future trends, and this year's report includes a new interactive heatmap to visualize regional energy consumption data.</AnimatedParagraph>
      </Section>
      <Section id="regional-analysis">
        <h2 className="text-3xl font-bold mb-4">Regional Energy Analysis</h2>
        <AnimatedParagraph>Understanding regional differences in energy consumption is crucial for effective energy planning and policy. The following heatmap displays monthly energy usage across five major regions of the country. This visualization allows for quick identification of seasonal peaks and regional disparities in energy demand.</AnimatedParagraph>
        <ReportHeatmap />
        <AnimatedParagraph>As the data shows, there are significant variations in energy consumption patterns. The Southern region typically shows a high peak in summer months due to air conditioning demand, while the Northern region's peak is in the winter for heating. The Central region exhibits a more balanced profile with dual peaks in both summer and winter.</AnimatedParagraph>
      </Section>
      <Section id="conclusion">
        <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
        <AnimatedParagraph>The AEO2024 projections highlight a dynamic and evolving energy landscape. The transition to renewable energy sources is projected to continue, but the pace and nature of this transition will vary significantly by region. The interactive tools provided with this report are designed to help stakeholders explore these complex dynamics and make more informed decisions.</AnimatedParagraph>
        <AnimatedParagraph>Continued monitoring and analysis will be essential to navigate the challenges and opportunities of the coming decades. We encourage readers to explore the data further and use these insights to contribute to a more sustainable and resilient energy future.</AnimatedParagraph>
      </Section>
    </ReportLayout>
  );
};

export default EnergyReport1;
