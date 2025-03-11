import { User } from "../models/user.model.js";

async function fetchAllUsers() {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export {fetchAllUsers}
