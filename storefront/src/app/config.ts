import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { getNextServerCookiesStorage } from "@saleor/auth-sdk/next/server";
import { invariant } from "ts-invariant";

export const ProductsPerPage = 12;

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;
invariant(saleorApiUrl, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

console.log("Loaded API URL:", process.env.NEXT_PUBLIC_SALEOR_API_URL);
console.log("Environment variables:", process.env);
console.log("API URL from env:", process.env.NEXT_PUBLIC_SALEOR_API_URL);
console.log("Config.ts - API URL:", process.env.NEXT_PUBLIC_SALEOR_API_URL);
console.log("Config.ts - Environment source:", process.env);

export const getServerAuthClient = () => {
	const nextServerCookiesStorage = getNextServerCookiesStorage();
	return createSaleorAuthClient({
		saleorApiUrl,
		refreshTokenStorage: nextServerCookiesStorage,
		accessTokenStorage: nextServerCookiesStorage,
	});
};
