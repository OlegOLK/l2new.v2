import { ComplexFilter, Rates } from '../models/complexfilter'
import * as dfn from 'date-fns';
import q from 'querystring'
import {
    Server,
    ServersList,
    Premium,
    Rate,
} from '../models/server';
import { UrlFilter } from '../models/url.filter';

function getFilterFromLocalStorage(filterName): ComplexFilter | null {
    if (typeof window === "undefined") {
        return null;
    }


    const jsonFilter = localStorage.getItem('filter');
    let filter;

    if (!jsonFilter) {
        return null;
    }
    filter = JSON.parse(jsonFilter);
    const complexFitlers: ComplexFilter[] = filter.userFilters;
    const complexFilter = complexFitlers.find(
        x => x.name.toLowerCase() === filterName.toLowerCase(),
    );
    return complexFilter ? complexFilter : null;
}

function filterByUrl(options: UrlFilter, s: Server) {
    const t: { (s: Server): boolean; }[] = [];
    if (options.chronicles) {
        t.push((s: Server) => options.chronicles instanceof Array ?
            options.chronicles.some(f => {
                 return f.toLowerCase() == s.chronicles.toLowerCase()}) :
            s.chronicles.toLowerCase() == options.chronicles.toString().toLowerCase());
    }
    if (options.date) {
        t.push((s: Server) => dfn.compareAsc(
            dfn.parseISO(s.openDate),
            dfn.parse(options.date, 'dd.MM.yyyy', new Date()),
        ) === 0);
    }

    if (options.types) {
        t.push((s: Server) =>
            options.types  instanceof Array ?
                (options.types.some(t => s.type.toLowerCase() === t.toLowerCase()) ||
                    options.types.some(t => s.features.some(f => f.toLowerCase() === t.toLowerCase()))) :
                (options.types.toLowerCase() === s.type ||
                    s.features.some(f => f.toLowerCase() === options.types.toString().toLowerCase())));
    }

    if (options.rates && options.rates !== 0) {
        t.push((s: Server) => {
            return s.rates.some(sr => sr.type.toLowerCase() === 'xp' && sr.amount == options.rates);
        })
    }

    if (options.rateMax) {
        t.push((s: Server) =>
            s.rates.some(r => r.type.toLowerCase() === 'xp' && r.amount <= options.rateMax));
    }

    if (options.rateMin) {
        t.push((s: Server) =>
            s.rates.some(r => r.type.toLowerCase() === 'xp' && r.amount >= options.rateMin));
    }

    return t.every(x => x(s));
}

function complexFilter(
    s: Server,
    type: string,
    lowerVal: string,
    complexFilters: ComplexFilter | null,
) {
    switch (type) {
        case 'chronicles':
            return s.chronicles.toLowerCase() === lowerVal;
        case 'types': {
            return (
                s.features.some(x => x.toLowerCase() === lowerVal) ||
                s.type.toLowerCase() === lowerVal.toLowerCase()
            );
        }
        case 'rates': {
            return s.rates.some(
                x =>
                    x.type.toLowerCase() === 'xp' &&
                    x.amount === Number.parseInt(lowerVal),
            );
        }
        case 'date': {
            return (
                dfn.compareAsc(
                    dfn.parseISO(s.openDate),
                    dfn.parse(lowerVal, 'dd.MM.yyyy', new Date()),
                ) === 0
            );
        }
        case 'custom': {
            var com = complex(s, complexFilters);
            return com;
        }
        default:
            return true;
    }
}

function predicate(r: Rate, f: Rates) {
    return (
        f.name.toLowerCase() === r.type.toLowerCase() &&
        f.max >= r.amount &&
        f.min <= r.amount
    );
}

function complex(s: Server, f: ComplexFilter | null) {
    if (!f) {
        return true;
    }

    let ok: boolean = true;
    if (f.chronicles.length !== 0) {
        ok = f.chronicles.some(
            x => x.selected === true && x.label === s.chronicles,
        );
    }
    if (!ok) {
        return ok;
    }
    if (f.rates.length !== 0) {
        ok = s.rates.some(x =>
            f.rates.some(frate => {
                return predicate(x, frate);
            }),
        );
    }

    return ok;
}

function selectFromSorted(
    servers: ServersList[],
    filter: string,
): ServersList[] {
    const type = filter.split('=');
    const lowerVal = type[1].toLowerCase();
    const filters = getFilterFromLocalStorage(lowerVal);
    const filtered = servers.flatMap(s => {
        const filteredServers = s.servers.filter(x =>
            complexFilter(x, type[0], lowerVal, filters),
        );
        return {
            label: s.label,
            panel: s.panel,
            servers: filteredServers,
            sortOrder: s.sortOrder,
        };
    });

    return filtered;
}

function isEmpty(filter: UrlFilter) {
    return filter.chronicles == null &&
        filter.rates == null &&
        filter.types == null &&
        filter.date == null &&
        filter.rateMin == null &&
        filter.rateMax == null;
}

export function sort(servers: Server[], filter: UrlFilter) {
    console.log(JSON.stringify(filter), 'test');
    let soon: Server[] = [];
    let already: Server[] = [];
    let today: Server[] = [];
    let groupped: ServersList[] = [];
    const todayDate = dfn.parseISO(new Date().toISOString());
    const sevenMinus = dfn.addDays(todayDate, -7);
    const sevenPlus = dfn.addDays(todayDate, 7);
    // const type = filter.split('='); //${filterType}=${value}
    // const lowerVal = type[1].toLowerCase();
    // const filters = getFilterFromLocalStorage(lowerVal);
    let sortedServers = [...servers];
    if (!isEmpty(filter)) {
        sortedServers = sortedServers.filter(x => {
            if (filterByUrl(filter, x)) {
                return x
            }
        })

    }

    sortedServers.map(s => {
        if (dfn.isToday(dfn.parseISO(s.openDate))) {
            today.push(s);
            return s;
        }
        let res = dfn.compareAsc(dfn.parseISO(s.openDate), todayDate);

        switch (res) {
            case 1: {
                soon.push(s);
                break;
            }
            case -1: {
                already.push(s);
                break;
            }
        }
        return s;
    });

    soon = soon.sort((first, second) => {
        return dfn.compareAsc(
            dfn.parseISO(first.openDate),
            dfn.parseISO(second.openDate),
        );
    });
    already = already.sort((first, second) => {
        return dfn.compareDesc(
            dfn.parseISO(first.openDate),
            dfn.parseISO(second.openDate),
        );
    });

    groupped.push({
        label: 'СКОРО ОТКРОЮТСЯ ПРЕМИУМ СЕРВЕРА',
        servers: soon.filter(x => x.premium === Premium.vip_pinned),
        panel: 0,
        sortOrder: 0,
    });

    groupped.push({
        servers: already.filter(x => x.premium === Premium.vip_pinned),
        sortOrder: 1,
        label: 'УЖЕ ОТКРЫЛИСЬ ПРЕМИУМ СЕРВЕРА',
        panel: 1,
    });

    groupped.push({
        servers: today,
        sortOrder: 2,
        label: 'ОТКРЫТИЕ СЕГОДНЯ',
        panel: 0,
    });

    var yesterday = already.filter(x => {
        var open = dfn.parseISO(x.openDate);
        return dfn.isYesterday(open);
    });

    const tomorrow = soon.filter(x => {
        var open = dfn.parseISO(x.openDate);
        return dfn.isTomorrow(open);
    });

    const soon7Days: Server[] = [];
    const soonMore7Days: Server[] = [];
    soon.forEach(x => {
        if (tomorrow.some(s => s.name === x.name)) {
            return;
        }
        var compare = dfn.compareAsc(dfn.parseISO(x.openDate), sevenPlus);
        if (compare === -1 || compare === 0) {
            soon7Days.push(x);
        } else {
            soonMore7Days.push(x);
        }
    });

    groupped.push({
        servers: yesterday,
        sortOrder: 3,
        label: 'ВЧЕРА',
        panel: 1,
    });

    groupped.push({
        servers: tomorrow,
        sortOrder: 4,
        label: 'ЗАВТРА',
        panel: 0,
    });

    groupped.push({
        servers: soon7Days,
        sortOrder: 5,
        label: 'БЛИЖАЙШИЕ 7 ДНЕЙ',
        panel: 0,
    });

    groupped.push({
        servers: already.filter(x => {
            if (yesterday.some(s => s.id === x.id)) {
                return false;
            }
            var open = dfn.parseISO(x.openDate);
            const compare = dfn.compareAsc(open, sevenMinus);
            return compare === 1 || compare === 0;
            // if (dfn.compareAsc(open, sevenMinus) === -1) {
            //   return x;
            // }
        }),
        sortOrder: 6,
        label: 'ПРЕДЫДУЩИЕ 7 ДНЕЙ',
        panel: 1,
    });

    groupped.push({
        servers: already.filter(x => {
            var open = dfn.parseISO(x.openDate);
            return dfn.compareAsc(open, sevenMinus) === -1;
            // if (dfn.compareAsc(open, sevenMinus) === 1) {
            //   return x;
            // }
        }),
        sortOrder: 8,
        label: 'НЕДЕЛЮ НАЗАД И БОЛЕЕ',
        panel: 1,
    });

    groupped.push({
        servers: soonMore7Days,
        // already.filter(x => {
        //   var open = dfn.parseISO(x.openDate);
        //   return dfn.compareAsc(open, sevenPlus) === 1;

        //   // if (dfn.compareAsc(open, sevenPlus) === 1) {
        //   //   return x;
        //   // }
        // }),
        sortOrder: 7,
        label: 'ЧЕРЕЗ НЕДЕЛЮ И БОЛЕЕ',
        panel: 0,
    });

    return groupped;
}
