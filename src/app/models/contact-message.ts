export type ContactMessageRequest = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  website?: string;
};

export type ContactMessageResponse = {
  success: boolean;
  message: string;
};
