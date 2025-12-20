import argon2 from 'argon2';

export const hash = async (plainPassword: string): Promise<string> => {
    const password = await argon2.hash(plainPassword);
    return password;
};

export const compare = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return argon2.verify(hashedPassword, plainPassword);
};