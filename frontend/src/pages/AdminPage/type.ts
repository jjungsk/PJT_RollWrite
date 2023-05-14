export interface User {
  nickname: string;
  profileImage: string;
  userId: number;
  userType: string;
}

export interface DialogInfo {
  title: string;
  content?: string;
  user: User;
}

export interface Tag {
  tagId: string;
  content: string;
}

export interface Meeting {
  meetingId: number;
  title: string;
  tag: Tag[];
  startDay: string;
  endDay: string;
  color: string;
  inviteUrl: string;
}

export interface Inquiry {
  inquiryId: number;
  content: string;
  imageUrl: string;
  createdAt: string;
  userNickname: string;
  userProfileImage: string;
}

export interface MeetingStats {
  day: string;
  meetingCnt: number;
  findMeetingResDtoList: Meeting[];
}

export interface ParticipantStats {
  meetingCnt: number;
  userCnt?: number;
  findUserResDtoList: User[];
}

export interface UserStats {
  day: string;
  userCnt?: number;
  findUserResDtoList: User[];
}
