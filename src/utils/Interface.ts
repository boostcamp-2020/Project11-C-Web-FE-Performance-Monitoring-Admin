export interface CreateProject {
  title: string;
  description: string;
  platform: string;
}

export interface InviteMember {
  userId: string;
}

export interface SignUpUser {
  name: string;
  email: string;
  pwd: string;
}
