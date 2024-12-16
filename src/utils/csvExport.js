import { saveAs } from "file-saver";

export const convertToCSV = (data, fields) => {
  const headers = fields.map((field) => field.header).join(",");
  const rows = data.map((item) =>
    fields
      .map((field) => {
        const value = field.getter(item);
        // Handle values that might contain commas
        return typeof value === "string" && value.includes(",")
          ? `"${value}"`
          : value;
      })
      .join(",")
  );
  return [headers, ...rows].join("\n");
};

export const downloadCSV = (content, fileName) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, fileName);
};
