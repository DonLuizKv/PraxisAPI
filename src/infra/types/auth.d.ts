export type Token = {
    sub: number;       // Aquí va el ID del usuario
    role: 'admin' | 'student';
    iat?: number;      // "Issued At" (Cuándo se creó)
    exp?: number;      // "Expiration" (Cuándo vence)
}