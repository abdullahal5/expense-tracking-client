/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicSummary from "@/components/dynamicRoute/DynamicSummar";


const DynamicSummaryPage = ({ params }: {params: any}) => {
  const { slug } = params;

  return (
    <div>
      <DynamicSummary slug={slug} />
    </div>
  );
};

export default DynamicSummaryPage;
