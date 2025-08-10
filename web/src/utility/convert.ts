export const cToF = (c: number) => Number(((c * 9) / 5 + 32).toFixed(1));
export const fToC = (f: number) => Number((((f - 32) * 5) / 9).toFixed(1));
export const kToMph = (k: number) => Number((k * 1.15078).toFixed(1));
export const kToMS = (k: number) => Number((k * 0.514444).toFixed(1));
export const msToK = (m: number) => Number((m * 1.94384).toFixed(1));
export const msToMph = (m: number) => Number((m * 2.23694).toFixed(1));
export const mToFt = (m: number) => Number((m * 3.28084).toFixed(1));
export const ftToM = (f: number) => Number((f * 0.3048).toFixed(1));