export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export type ProjectProps = {
  children?: React.ReactNode;
  className?: string;
  id: number;
  name: string;
  slug: string;
  industry: string;
  challenge: string;
  services: string[];
  technology: string[];
  quote: string;
  image: string;
  url: string;
  job_description: string[];
};

export type CardProps = {
  children?: React.ReactNode;
  className?: string;
  id: number;
  name: string;
  image: string;
};