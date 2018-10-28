module.exports = function create(fittingDef, bagpipes) {
    return function parseSwaggerParams(context, cb) {
        const swaggerParams = context.request.swagger.params;

        if (swaggerParams.where && swaggerParams.where.value) {
            swaggerParams.where.value = JSON.parse(swaggerParams.where.value);
        }

        if (swaggerParams.include && swaggerParams.include.value) {
            swaggerParams.include.value = JSON.parse(swaggerParams.include.value);
        }

        cb(null, context);
    };
};