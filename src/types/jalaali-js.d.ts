declare module 'jalaali-js' {
	export function toJalaali(date: Date | number, month?: number, day?: number): {
		jy: number;
		jm: number;
		jd: number;
	};
	export function toGregorian(jy: number, jm: number, jd: number): {
		gy: number;
		gm: number;
		gd: number;
	};
}
