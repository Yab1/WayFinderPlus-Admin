import { format, parse } from "date-fns";

function formatDate(dateString) {
  const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());

  const formattedDate = format(parsedDate, "dd MMM yyyy");

  return formattedDate;
}

export default formatDate;
