import { getFileUrl } from "@/utils";
import type { MainTableAction, MainTableColumn } from "../types";
import { ImageIcon } from "lucide-react";

export interface MainTableProps<T extends { id: string }> {
  data: T[];
  columns: MainTableColumn<T>[];
  actions?: MainTableAction[];
}

const MainTable = <T extends { id: string }>({
  columns,
  data,
  actions,
}: MainTableProps<T>) => {
  return (
    <table className="bg-white rounded-md w-full max-h-full relative">
      <thead>
        <tr className="border-b border-b-secondary-text sticky top-0 bg-white">
          {columns.map((col) => (
            <th
              key={col.key as string}
              className="p-3 text-left text-primary-text text-nowrap"
            >
              {col.label}
            </th>
          ))}
          {actions && actions.length > 0 && (
            <th className="p-3 text-left text-primary-text text-nowrap">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data?.map((row) => (
          <tr key={row.id} className="border-b border-b-secondary-text">
            {columns.map((col) => (
              <td key={col.key as string} className="p-3 text-nowrap">
                {col.key === "image" ? (
                  row[col.key] ? (
                    <img
                      src={getFileUrl(row[col.key] as string)}
                      width={"40px"}
                      height={"50px"}
                      className="mx-auto object-cover"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <ImageIcon
                      width={"40px"}
                      height={"50px"}
                      className="mx-auto"
                    />
                  )
                ) : (
                  (row[col.key] as string)
                )}
              </td>
            ))}
            {actions && actions.length > 0 && (
              <td className="p-3 ">
                <div className="flex gap-4">
                  {actions.map((act, index) => (
                    <act.icon
                      key={index}
                      size={20}
                      cursor={"pointer"}
                      color={act.type == "delete" ? "red" : "gray"}
                      onClick={() => act.action(row.id)}
                    />
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTable;
