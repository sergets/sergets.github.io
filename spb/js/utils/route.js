define(function() {
    var routeUtils = {
        strip : function(route) {
            return route.replace(/^[-<>]/, '');
        },

        getType : function(route) {
        	route = routeUtils.strip(route);
        	return route.indexOf('Мт')? route.indexOf('Тб')? route.indexOf('Тм')? 'bus' : 'tram' : 'trolley' : 'minibus';
        },

        clearType : function(route) {
        	return routeUtils.strip(route).replace(/^(Тб|Тм|Мт) /, '');
        },

        notPhantom : function(route) {
        	return route[0] != '-';
        },

        inverse : function(route) {
            return route.replace(/^</, '%').replace(/^>/, '<').replace(/^%/, '>');
        },

        inverseList : function(list, sign) {
            if (!sign) { sign = -1 };
            return sign < 0? list.map(routeUtils.inverse).reverse() : list;
        }
    };

    return routeUtils;
});