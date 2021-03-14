import { Server } from '../models/server';

declare global {
    interface Window {
        gtag: any;
        ga: any;
    }
}

export function trackServerNavigation(server: Server) {
    try {
        if (!server) return;
        if (!window.gtag) return;

        let mainRate: string = '';
        let xp = server.rates.find(x => x.type.toLowerCase() === 'xp');
        if (!xp || xp.amount <= 0) {
            mainRate = server.type;
        } else {
            mainRate = xp.amount.toString();
        }

        let event: ServerNavigationEvent = {
            chronicles: server.chronicles,
            name: server.name,
            mainRate: mainRate,
            open: server.openDate,
        };
        window.gtag('event', 'server_navigation', event);
    } catch { }
}

export function trackFilterChange(type: string, value: string) {
    try {
        if (!type || !value) return;
        if (!window.gtag) return;

        let event: FilterChangeEvent = {
            filterRouteType: type,
            filterRouteValue: value,
        };

        window.gtag('event', 'filter_change', event);
    } catch { }
}

export function trackCacheUpdated(oldStamp: string | null, newStamp: string) {
    try {
        if (!window.gtag) return;
        if (
            !oldStamp ||
            oldStamp.length === 0 ||
            !newStamp ||
            newStamp.length === 0
        )
            return;
        let event: CacheUpdateEvent = {
            outdatedDateStamp: oldStamp,
            updatedDateStamp: newStamp,
        };

        window.gtag('event', 'cache_eviction', event);
    } catch { }
}

type CacheUpdateEvent = {
    outdatedDateStamp: string;
    updatedDateStamp: string;
};

type FilterChangeEvent = {
    filterRouteType: string;
    filterRouteValue: string;
};

type ServerNavigationEvent = {
    name: string;
    chronicles: string;
    mainRate: string;
    open: string;
};
