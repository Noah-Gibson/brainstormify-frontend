const normalizeDate = (dateStr: string): string => {
    if (dateStr.endsWith("Z") || dateStr.match(/[\+\-]\d{2}:\d{2}$/)) {
      return dateStr;
    }
    return dateStr + "Z";
};

export default normalizeDate;