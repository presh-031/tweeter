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
  text: string;
  timestamp: timestampType;
  userId: string;
};

type CommentProps = {
  text: string;
  timestamp: timestampType;
  userId: string;
};

export type TweetUserInfoProps = {
  timestamp: timestampType;
  userId: string;
};

export type TweetTextProps = {
  text: string;
};

export type TweetStatsProps = {
  tweetId: string;
};
export type StatBtnProps = {
  tweetId: string;
  currentUserId: string;
};

export type AddCommentProps = {
  tweetId: string;
  setShowAddComment: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TweetCommentsProps = {
  tweetId: string;
};

export type CommentBtnProps = {
  handleCommentBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ExploreTabsProps = {
  activeTab: string;
  handleTabClick: (string) => void;
};
export type ProfileTabsProps = {
  activeProfileTab: string;
  handleTabClick: (string) => void;
};

export type UserNavProps = {
  authUserId: string;
  toggleShowUserNav: () => void;
};

export type BookmarkInfoProps = {
  bookmarkInfo: any;
};
export type LikeProps = {
  likeInfo: any;
};

export type MediaProps = {
  tweetId: string;
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

export type ProfileOwnerTweetsImgsUiProps = {
  imgMetaDataTweetId: string;
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
