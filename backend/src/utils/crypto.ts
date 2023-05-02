import * as crypto from 'crypto';

export async function encryptTohashPassword(password: string) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash;
}
