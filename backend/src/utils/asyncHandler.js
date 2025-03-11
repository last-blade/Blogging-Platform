const asyncHandler = (func) => async(request, response, next) => {
    try {
        await func(request, response, next)
    } catch (error) {
        return response.status(error.code || 500,).json({
            success: false,
            message: error.message,
        })
    }
};

export { asyncHandler }