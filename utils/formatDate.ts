import { timestampType } from "@/typings";
import moment from "moment";

// Logic to convert timestamp to required format
export const formatDate = (timestamp: timestampType) => {
  const date = moment.unix(timestamp.seconds).utcOffset(1);
  const formattedDate = date.format("DD MMMM [at] HH:mm");
  return formattedDate;
};
