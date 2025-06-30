import config from "../config/env.js";
import Errors from "../errors/errors.js";
const errorHandler = (err, req, res, next) => {
    console.error("Error", err);
    if (err instanceof Errors.HttpError) {
        if (config.isDevelopment) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(err.status).json({ message: err.message });
        return;
    }
    res.status(500).json({ message: "Internal Server Error" });
    return;
};
export default errorHandler;
