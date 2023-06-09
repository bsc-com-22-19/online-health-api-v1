import { genSalt, hash } from "bcrypt";
export async function hashPassword(password: string): Promise <string> {
    const salt = await genSalt(10);
    return hash(password, salt);
}