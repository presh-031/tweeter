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
  userName: string;
  bookmarkedTweets: string[];
};

export type profileTweetsProps = {
  profileOwnerId: string;
};

export type userServicesProps = {
  profileOwnerId: string;
  authUserId: string;
  profileOwnerInfo: DocumentData;
  authUserInfo: DocumentData;
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
  bookmarkedBy: string[];
};

export type AddCommentProps = {
  tweetId: string;
  setShowAddComment: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ExploreTabsProps = {
  activeTab: string;
  handleTabClick: (string) => void;
};

export type UserNavProps = {
  authUserId: string;
  toggleShowUserNav: () => void;
};

export type MediaProps = {
  images: string[];
};

export type EditProfileFormProps = {
  authUserId: string;
  triggerFunction: () => void;
};

export type EditProfileImagesProps = {
  authUserId: string;
  triggered: boolean;
};

export type CoverImageProps = {
  userId: string;
};

export type ProfileInfoProps = {
  userName: string;
  followers: string[];
  following: string[];
  bio: string;
};

export type ProfilePictureProps = {
  userId: string;
  height: number;
  width: number;
};

export type DisplayNameProps = {
  authUserId: string;
};
