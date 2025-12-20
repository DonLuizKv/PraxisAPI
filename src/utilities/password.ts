import argon2 from 'argon2';

export const Hash = async (plainPassword: string): Promise<string> => {
    return await argon2.hash(plainPassword);
};

export const Compare = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    return await argon2.verify(oldPassword, newPassword);
};