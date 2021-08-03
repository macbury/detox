export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  /** ES256 key in pem format */
  PemKeyArgument: any;
  /**
   *       This argument can parse a huge variety of date and time formats. Following
   * is a small sample of strings that will be properly parsed. Parsing is case
   * insensitive and will handle common abbreviations and misspellings:
   *       Simple:
   *       - hursday
   *       - november
   *       - summer
   *       - friday 13:00
   *       - mon 2:35
   *       - 4pm
   *       - 10 to 8
   *       - 10 past 2
   *       - half past 2
   *       - 6 in the morning
   *       - friday 1pm
   *       - sat 7 in the evening
   *       - yesterday
   *       - today
   *       - tomorrow
   *       - last week
   *       - next week
   *       - this tuesday
   *       - next month
   *       - last winter
   *       - this morning
   *       - last night
   *       - this second
   *       - yesterday at 4:00
   *       - last friday at 20:00
   *       - last week tuesday
   *       - tomorrow at 6:45pm
   *       - afternoon yesterday
   *       - thursday last week
   *       Complex
   *       - 3 years ago
   *       - a year ago
   *       - 5 months before now
   *       - 7 hours ago
   *       - 7 days from now
   *       - 1 week hence
   *       - in 3 hours
   *       - 1 year ago tomorrow
   *       - 3 months ago saturday at 5:00 pm
   *       - 7 hours before tomorrow at noon
   *       - 3rd wednesday in november
   *       - 3rd month next year
   *       - 3rd thursday this september
   *       - 4th day last week
   *       - fourteenth of june 2010 at eleven o'clock in the evening
   *       - may seventh '97 at three in the morning
   *       Specific Dates
   *       - January 5
   *       - 22nd of june
   *       - 5th may 2017
   *       - February twenty first
   *       - dec 25
   *       - may 27th
   *       - October 2006
   *       - oct 06
   *       - jan 3 2010
   *       - february 14, 2004
   *       - february 14th, 2004
   *       - 3 jan 2000
   *       - 17 april 85
   *       - 5/27/1979
   *       - 27/5/1979
   *       - 05/06
   *       - 1979-05-27
   *       - Friday
   *       - 5
   *       - 4:00
   *       - 17:00
   *       - 0800
   */
  TimeArgument: any;
  /** Comma separated words or sentences */
  WordRulesArgument: any;
};

export type Article = {
  __typename?: 'Article';
  body: Scalars['String'];
  commentsUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  poster?: Maybe<Poster>;
  story: Story;
};


export type ArticlePosterArgs = {
  variant?: Maybe<Variant>;
};

export type Audio = {
  __typename?: 'Audio';
  body: Scalars['String'];
  duration?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  playback?: Maybe<Playback>;
  poster?: Maybe<Poster>;
  secureUri: Scalars['String'];
  story: Story;
  uri: Scalars['String'];
};


export type AudioPosterArgs = {
  variant?: Maybe<Variant>;
};

export type Channel = {
  __typename?: 'Channel';
  blockRules?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  /** Pretty printed domain for source without protocol */
  domain: Scalars['String'];
  downloadPage?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
  extractionRules?: Maybe<Scalars['String']>;
  /** Favicon icon url */
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  kind?: Maybe<ChannelKind>;
  lastCheckAt?: Maybe<Scalars['ISO8601DateTime']>;
  name?: Maybe<Scalars['String']>;
  rejectRules?: Maybe<Scalars['String']>;
  rewriteRules?: Maybe<Array<RewriteRuleEnum>>;
  siteUrl?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  status?: Maybe<ChannelStatus>;
  updatedAt: Scalars['ISO8601DateTime'];
  userAgent?: Maybe<Scalars['String']>;
};

/** The connection type for Channel. */
export type ChannelConnection = {
  __typename?: 'ChannelConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ChannelEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Channel>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ChannelEdge = {
  __typename?: 'ChannelEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Channel>;
};

export enum ChannelKind {
  Rss = 'RSS',
  Twitter = 'TWITTER',
  Youtube = 'YOUTUBE'
}

export enum ChannelStatus {
  Archived = 'ARCHIVED',
  Error = 'ERROR',
  Pending = 'PENDING',
  Refreshed = 'REFRESHED',
  Refreshing = 'REFRESHING'
}

/** Autogenerated return type of ClearJobs */
export type ClearJobsPayload = {
  __typename?: 'ClearJobsPayload';
  deleted?: Maybe<Scalars['Int']>;
};

/** Autogenerated input type of CreateGroup */
export type CreateGroupInput = {
  channelIds: Array<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  name: Scalars['String'];
};

/** Autogenerated return type of CreateGroup */
export type CreateGroupPayload = {
  __typename?: 'CreateGroupPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<Group>;
};

/** Autogenerated input type of CreateUser */
export type CreateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Autogenerated return type of CreateUser */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<User>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  id: Scalars['ID'];
  status: UserStatus;
  username: Scalars['String'];
};

/** Autogenerated input type of Discover */
export type DiscoverInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

/** Autogenerated return type of Discover */
export type DiscoverPayload = {
  __typename?: 'DiscoverPayload';
  channels?: Maybe<Array<DiscoveredChannel>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

export type DiscoveredChannel = {
  __typename?: 'DiscoveredChannel';
  iconUrl?: Maybe<Scalars['String']>;
  kind: ChannelKind;
  source: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

/** Autogenerated input type of DownloadStory */
export type DownloadStoryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Story ids */
  id: Scalars['ID'];
};

/** Autogenerated return type of DownloadStory */
export type DownloadStoryPayload = {
  __typename?: 'DownloadStoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  story?: Maybe<Story>;
};

export type Group = {
  __typename?: 'Group';
  channels?: Maybe<Array<Channel>>;
  icon: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  unread: Scalars['Int'];
};


export type JobBlueprint = {
  __typename?: 'JobBlueprint';
  arguments: Array<Scalars['String']>;
  backtrace?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  error?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  jobClass: Scalars['String'];
  lockKey?: Maybe<Scalars['String']>;
  lockedAt?: Maybe<Scalars['ISO8601DateTime']>;
  priority: Scalars['Int'];
  runAt?: Maybe<Scalars['ISO8601DateTime']>;
};

/** The connection type for JobBlueprint. */
export type JobBlueprintConnection = {
  __typename?: 'JobBlueprintConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<JobBlueprintEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<JobBlueprint>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type JobBlueprintEdge = {
  __typename?: 'JobBlueprintEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<JobBlueprint>;
};

export enum JobKind {
  All = 'All',
  Bench = 'Bench',
  Processing = 'Processing',
  WithErrors = 'WithErrors'
}

/** Autogenerated return type of Logout */
export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  errors: Array<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of MarkStories */
export type MarkStoriesInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Story ids */
  ids: Array<Scalars['ID']>;
  isRead?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated return type of MarkStories */
export type MarkStoriesPayload = {
  __typename?: 'MarkStoriesPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  stories?: Maybe<Array<Story>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Clear not running jobs */
  clearJobs?: Maybe<ClearJobsPayload>;
  /** Create new group with channels */
  createGroup?: Maybe<CreateGroupPayload>;
  /** Create new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Find what channels are available for url */
  discover?: Maybe<DiscoverPayload>;
  /** Download story using rules configured in channel settings */
  downloadStory?: Maybe<DownloadStoryPayload>;
  /** Destroy current session */
  logout?: Maybe<LogoutPayload>;
  /** Update multiple stories state for reading, is favorite etc. */
  markStories?: Maybe<MarkStoriesPayload>;
  /** Refresh feed in the background */
  refresh?: Maybe<RefreshPayload>;
  /** Refresh all feeds in the background */
  refreshAll?: Maybe<RefreshAllPayload>;
  /** Cleanup current stories and run again sync */
  reimportStories?: Maybe<ReimportStoriesPayload>;
  /** Create new session with ability to interact with other api */
  signIn?: Maybe<SignInPayload>;
  /** Snooze story to be read readed in near future */
  snooze?: Maybe<SnoozePayload>;
  /** Subscribe to channel using provided url */
  subscribe?: Maybe<SubscribePayload>;
  /** Unsubscribe from channel */
  unsubscribe?: Maybe<UnsubscribePayload>;
  /** Update channel settings */
  updateChannel?: Maybe<UpdateChannelPayload>;
  /** Update existing group */
  updateGroup?: Maybe<UpdateGroupPayload>;
  /** Update current user password */
  updatePassword?: Maybe<UpdatePasswordPayload>;
  /** Update playback status for story */
  updatePlayback?: Maybe<UpdatePlaybackPayload>;
  /** Update setting value */
  updateSettings?: Maybe<UpdateSettingPayload>;
  /** Update story state for reading, is favorite etc. */
  updateStory?: Maybe<UpdateStoryPayload>;
  /** Update user settings */
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationClearJobsArgs = {
  jobIds: Array<Scalars['ID']>;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDiscoverArgs = {
  input: DiscoverInput;
};


export type MutationDownloadStoryArgs = {
  input: DownloadStoryInput;
};


export type MutationMarkStoriesArgs = {
  input: MarkStoriesInput;
};


export type MutationRefreshArgs = {
  input: RefreshInput;
};


export type MutationReimportStoriesArgs = {
  input: ReimportStoriesInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSnoozeArgs = {
  input: SnoozeInput;
};


export type MutationSubscribeArgs = {
  input: SubscribeInput;
};


export type MutationUnsubscribeArgs = {
  input: UnsubscribeInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdatePlaybackArgs = {
  input: UpdatePlaybackInput;
};


export type MutationUpdateSettingsArgs = {
  input: UpdateSettingInput;
};


export type MutationUpdateStoryArgs = {
  input: UpdateStoryInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** Autogenerated return type of ObserveStories */
export type ObserveStoriesPayload = {
  __typename?: 'ObserveStoriesPayload';
  new?: Maybe<Array<Story>>;
  unreadStories?: Maybe<UnreadStories>;
  updated?: Maybe<Array<Story>>;
};

export enum Order {
  Newest = 'Newest',
  Oldest = 'Oldest',
  RecentlyRead = 'RecentlyRead',
  UnreadFirst = 'UnreadFirst'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};


export type Playback = {
  __typename?: 'Playback';
  duration: Scalars['Int'];
  id: Scalars['ID'];
  position: Scalars['Int'];
  resumedAt?: Maybe<Scalars['ISO8601DateTime']>;
  status: PlaybackStatus;
  story: Story;
};

/** Autogenerated return type of PlaybackStateUpdated */
export type PlaybackStateUpdatedPayload = {
  __typename?: 'PlaybackStateUpdatedPayload';
  story: Story;
};

export enum PlaybackStatus {
  Paused = 'PAUSED',
  Playing = 'PLAYING'
}

export type Poster = {
  __typename?: 'Poster';
  blurhash?: Maybe<Scalars['String']>;
  colors?: Maybe<PosterColors>;
  height: Scalars['Int'];
  id: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  width: Scalars['Int'];
};

export type PosterColors = {
  __typename?: 'PosterColors';
  accent: Scalars['String'];
  background: Scalars['String'];
  foreground: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Get processed background jobs */
  backgroundJobs: JobBlueprintConnection;
  /** Lists user subscribed channels */
  channels: ChannelConnection;
  /** Get current user information */
  currentUser?: Maybe<CurrentUser>;
  /** Get one background job */
  getBackgroundJob?: Maybe<JobBlueprint>;
  /** Find channel by its id */
  getChannel?: Maybe<Channel>;
  /** Get group information */
  getGroup?: Maybe<Group>;
  /** Get story information */
  getStory?: Maybe<Story>;
  /** Lists user groups */
  groups: Array<Group>;
  /** List all settings */
  settings: Array<Setting>;
  /** Lists user stories */
  stories: StoryConnection;
  unreadStories?: Maybe<UnreadStories>;
  /** Lists all users in system */
  users: UserConnection;
};


export type QueryBackgroundJobsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  kind: JobKind;
  last?: Maybe<Scalars['Int']>;
};


export type QueryChannelsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetBackgroundJobArgs = {
  id: Scalars['ID'];
};


export type QueryGetChannelArgs = {
  id: Scalars['ID'];
};


export type QueryGetGroupArgs = {
  id: Scalars['ID'];
};


export type QueryGetStoryArgs = {
  id: Scalars['ID'];
};


export type QueryStoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  channelId?: Maybe<Scalars['ID']>;
  exceptIds?: Maybe<Array<Scalars['ID']>>;
  favorite?: Maybe<Scalars['Boolean']>;
  first?: Maybe<Scalars['Int']>;
  groupId?: Maybe<Scalars['ID']>;
  kind?: Maybe<StoryKind>;
  last?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
  startTime?: Maybe<Scalars['TimeArgument']>;
  unread?: Maybe<Scalars['Boolean']>;
  updatedAfter?: Maybe<Scalars['ISO8601DateTime']>;
};


export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Autogenerated return type of RefreshAll */
export type RefreshAllPayload = {
  __typename?: 'RefreshAllPayload';
  errors: Array<Scalars['String']>;
  success: Scalars['Boolean'];
};

/** Autogenerated input type of Refresh */
export type RefreshInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Channel id */
  id: Scalars['ID'];
};

/** Autogenerated return type of Refresh */
export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  channel?: Maybe<Channel>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of ReimportStories */
export type ReimportStoriesInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of ReimportStories */
export type ReimportStoriesPayload = {
  __typename?: 'ReimportStoriesPayload';
  channel?: Maybe<Channel>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

/** How imported channel entry be transformed */
export enum RewriteRuleEnum {
  InsertPoster = 'InsertPoster',
  ReplacePoster = 'ReplacePoster'
}

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  ip?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Setting = {
  __typename?: 'Setting';
  id: Scalars['ID'];
  key: Scalars['String'];
  secret: Scalars['Boolean'];
  value?: Maybe<Scalars['String']>;
  valueType: SettingEnum;
};

export enum SettingEnum {
  Number = 'NUMBER',
  String = 'STRING'
}

/** Autogenerated input type of SignIn */
export type SignInInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['String'];
  publicKey: Scalars['PemKeyArgument'];
  username: Scalars['String'];
};

/** Autogenerated return type of SignIn */
export type SignInPayload = {
  __typename?: 'SignInPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  session?: Maybe<Session>;
};

/** Autogenerated input type of Snooze */
export type SnoozeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Story id */
  id: Scalars['ID'];
};

/** Autogenerated return type of Snooze */
export type SnoozePayload = {
  __typename?: 'SnoozePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  story?: Maybe<Story>;
};

export type Story = {
  __typename?: 'Story';
  attachment?: Maybe<StoryAttachment>;
  channel?: Maybe<Channel>;
  createdAt: Scalars['ISO8601DateTime'];
  /** Pretty printed domain for source without protocol */
  domain?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Group>>;
  guid?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
  isRead: Scalars['Boolean'];
  permalink?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  viewAt?: Maybe<Scalars['ISO8601DateTime']>;
};

/** object attached to story like article, video or picture */
export type StoryAttachment = Article | Audio | Video;

/** The connection type for Story. */
export type StoryConnection = {
  __typename?: 'StoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<StoryEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Story>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type StoryEdge = {
  __typename?: 'StoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Story>;
};

export enum StoryKind {
  All = 'All',
  Playable = 'Playable',
  Readable = 'Readable',
  Viewable = 'Viewable'
}

export type Stream = {
  __typename?: 'Stream';
  bitrate: Scalars['Int'];
  mimeType: Scalars['String'];
  quality: Scalars['String'];
  secureUrl: Scalars['String'];
  url: Scalars['String'];
};

/** Autogenerated input type of Subscribe */
export type SubscribeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  kind: ChannelKind;
  source: Scalars['String'];
};

/** Autogenerated return type of Subscribe */
export type SubscribePayload = {
  __typename?: 'SubscribePayload';
  channel?: Maybe<Channel>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Observer stories */
  observeStories: ObserveStoriesPayload;
  /** Listen only for events with playback control */
  playbackStateUpdated: PlaybackStateUpdatedPayload;
};


export type UnreadStories = {
  __typename?: 'UnreadStories';
  groups: Array<Group>;
  total: Scalars['Int'];
};

/** Autogenerated input type of Unsubscribe */
export type UnsubscribeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of Unsubscribe */
export type UnsubscribePayload = {
  __typename?: 'UnsubscribePayload';
  channel?: Maybe<Channel>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of UpdateChannel */
export type UpdateChannelInput = {
  archiveSize?: Maybe<Scalars['Int']>;
  blockRules?: Maybe<Scalars['WordRulesArgument']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  downloadPage?: Maybe<Scalars['Boolean']>;
  extractionRules?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  rejectRules?: Maybe<Scalars['String']>;
  rewriteRules?: Maybe<Array<RewriteRuleEnum>>;
  siteUrl?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  status?: Maybe<ChannelStatus>;
  userAgent?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateChannel */
export type UpdateChannelPayload = {
  __typename?: 'UpdateChannelPayload';
  channel?: Maybe<Channel>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of UpdateGroup */
export type UpdateGroupInput = {
  channelIds: Array<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Autogenerated return type of UpdateGroup */
export type UpdateGroupPayload = {
  __typename?: 'UpdateGroupPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<Group>;
};

/** Autogenerated input type of UpdatePassword */
export type UpdatePasswordInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

/** Autogenerated return type of UpdatePassword */
export type UpdatePasswordPayload = {
  __typename?: 'UpdatePasswordPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of UpdatePlayback */
export type UpdatePlaybackInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  /** Story id */
  id: Scalars['ID'];
  isPlaying?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['Float']>;
};

/** Autogenerated return type of UpdatePlayback */
export type UpdatePlaybackPayload = {
  __typename?: 'UpdatePlaybackPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  story?: Maybe<Story>;
};

/** Autogenerated input type of UpdateSetting */
export type UpdateSettingInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Setting key */
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateSetting */
export type UpdateSettingPayload = {
  __typename?: 'UpdateSettingPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  setting?: Maybe<Setting>;
};

/** Autogenerated input type of UpdateStory */
export type UpdateStoryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Story id */
  id: Scalars['ID'];
  isFavorite?: Maybe<Scalars['Boolean']>;
  isRead?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated return type of UpdateStory */
export type UpdateStoryPayload = {
  __typename?: 'UpdateStoryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  story?: Maybe<Story>;
};

/** Autogenerated input type of UpdateUser */
export type UpdateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  status?: Maybe<UserStatus>;
  username?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateUser */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  status: UserStatus;
  username: Scalars['String'];
};

/** The connection type for User. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

export enum UserStatus {
  Admin = 'ADMIN',
  Inactive = 'INACTIVE',
  Normal = 'NORMAL'
}

export enum Variant {
  Desktop = 'Desktop',
  Mobile = 'Mobile',
  Original = 'Original'
}

export type Video = {
  __typename?: 'Video';
  body: Scalars['String'];
  duration?: Maybe<Scalars['Int']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  playback?: Maybe<Playback>;
  poster?: Maybe<Poster>;
  story: Story;
  streams?: Maybe<Array<Stream>>;
  uri: Scalars['String'];
  width: Scalars['Int'];
};


export type VideoPosterArgs = {
  variant?: Maybe<Variant>;
};

