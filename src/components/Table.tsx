import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrintContent = () => {
    const printContent = contentRef.current;
    if (!printContent) return;

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;

    window.print();

    // document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const generatePDF = async () => {
    const element = document.getElementById("pdf-table");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 10; // Initial top margin
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight; // Adjust position
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("table.pdf");
  };

  return (
    <div>
      <button
        className="bg-blue-400 text-white p-2 rounded-md"
        onClick={generatePDF}
      >
        print
      </button>
      <div ref={contentRef} id="pdf-table">
        <table className="w-full mt-4">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              {columns.map((col) => (
                <th key={col.accessor} className={col.className}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map((item) => renderRow(item))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
