import { parseISO, format } from "date-fns";

const Date: React.FC<{ dateString: string }> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "d LLLL, yyyy")}</time>;
};

export default Date;
