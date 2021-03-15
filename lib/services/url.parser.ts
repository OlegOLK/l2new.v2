import { ParsedUrlQuery } from "node:querystring";
import { UrlFilter } from '../models/url.filter'
export function parseQuery(query: ParsedUrlQuery): UrlFilter {
    return JSON.parse(JSON.stringify(query));
}