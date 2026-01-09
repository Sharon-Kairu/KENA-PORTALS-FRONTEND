import { practicals } from "../data/practicals";
import { Practical } from "../types/practical";

export function getPracticals(slug: string): Practical | undefined {
    return practicals.find(practical=>practical.slug===slug);
}