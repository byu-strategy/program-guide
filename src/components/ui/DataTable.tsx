interface DataTableProps {
  headers: string[];
  rows: string[][];
}

export default function DataTable({ headers, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-md shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border-b-2 border-navy bg-navy px-4 py-3 text-left font-heading text-xs font-semibold tracking-wider text-white uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone"}>
              {row.map((cell, j) => (
                <td key={j} className="border-b border-slate-gray/10 px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
