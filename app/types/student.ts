import { Practical } from "./practical";

export type student = {
  id: string;
  name: string;
  email: string;
  pracs: Practical[];
  instructor: string;
  slug: string;
};