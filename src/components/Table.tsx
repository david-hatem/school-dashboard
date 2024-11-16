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

  return (
    <div>
      <button
        className="bg-blue-400 text-white p-2 rounded-md"
        onClick={handlePrintContent}
      >
        print
      </button>
      <div ref={contentRef}>
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
