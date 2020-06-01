export interface Talk {
  title: string;
  description: string;
  speaker: string;
  link: string;
  duration: number;
  topics: string[];
  attendes?: [];
  likes?: number;
}

export interface User {
  name: string;
  talks?: boolean;
  likes?: Talk[];
  dislikes?: Talk[];
  topics: string[];
}
