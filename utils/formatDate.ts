import { timestampType } from "@/typings";
import moment from "moment";

// Logic to convert timestamp to required format
export const formatDateForTweet = (timestamp: timestampType) => {
  const date = moment.unix(timestamp.seconds).utcOffset(1);
  const formattedDate = date.format("DD MMMM [at] HH:mm");
  return formattedDate;
};

export //   Logic to convert timestamp to timeAgo
const formatDateToTimeAgo = (timestamp: timestampType) => {
  const date = moment.unix(timestamp.seconds).utcOffset(1);
  return moment(date).fromNow();
};
