import { Starship } from './starship';
export class PageResponse {
    count: number;
    next: string;
    previous: string;
    results: Starship[];
}