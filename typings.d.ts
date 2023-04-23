export type timestampType = {
  seconds: number;
  nanoseconds: number;
};

export type tweetType = {
  userId: string;
  timestamp: timestampType;
  text: string;
  retweets: string[];
  media: string[];
  likes: string[];
};

export type userInfoType = {
  bio: string;
  createdAt: string;
  displayName: string;
  email: string;
  followers: string[];
  following: string[];
  headerImageUrl: string;
  profilePictureUrl: string;
  userName: string;
};

export type LayoutProps = {
  children: React.ReactNode;
};

export type TweetProps = {
  tweetId: string;
  likes: string[];
  retweets: string[];
  media: string[];
  text: string;
  timestamp: timestampType;
  userId: string;
};
