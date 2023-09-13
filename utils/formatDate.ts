import { timestampType } from "@/typings";
import moment from "moment";

// Logic to convert timestamp to required format
export const formatDateForTweet = (timestamp: timestampType) => {
  const date = moment.unix(timestamp.seconds).utcOffset(1);
  const formattedDate = date.format("DD MMMM [at] HH:mm");
  return formattedDate;
};

//   Logic to convert timestamp to timeAgo
export const formatDateToTimeAgo = (timestamp: timestampType) => {
  if (timestamp) {
    const date = moment.unix(timestamp.seconds).utcOffset(1);
    return moment(date).fromNow();
  }
  return "-";
};
