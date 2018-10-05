define(['vow'], function(vow) {

var DEFAULT_WIDTH = 2,
    NO_DATA_WIDTH = 0,
    SELECTED_ROUTE_WIDTH = 20;

return {
    shouldRecalc : function(state, updatedStateFields) {
        return true;
    },

    deps : ['existingRoutes'],

    calc : function(data, state, existingRoutes) {
        return vow.resolve(existingRoutes.reduce(function(widths, routeName) {
            var rgam = data.registry,
                width = rgam[routeName] && rgam[routeName].quantity && (rgam[routeName].quantity / rgam[routeName].length) * 90

            if (state.isEqualWidthsMode) {
                widths[routeName] = DEFAULT_WIDTH;
            } else if (state.selectedRoutes.length == 1) {
                widths[routeName] = (routeName == state.selectedRoutes[0]? SELECTED_ROUTE_WIDTH : 0);
            } else {
                widths[routeName] = width / 12; // 12 hours

                if (state.selectedRoutes.length && state.selectedRoutes.indexOf(routeName) == -1) {
                    widths[routeName] = 0;
                }
            }

            widths[routeName] *= state.widthFactor;
            widths[routeName] = Math.round(widths[routeName] * 100) / 100 || widths[routeName];

            return widths;
        }, {}));
    }
}

});
