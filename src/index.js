import { app } from "./app.js";
import { connectDB } from "./db/database.js";

const port = process.env.PORT;

connectDB()
.then(() => {
    app.listen(port || 8000, () => {
        console.log(`Server is running on ${port}`)
    })
})
.catch((error) => {
    console.log("Error while connecting to database", error.message)
});