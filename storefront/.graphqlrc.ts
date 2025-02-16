import { loadEnvConfig } from "@next/env";
import { resolve } from "path";
import type { CodegenConfig } from "@graphql-codegen/cli";

// Load environment variables from .env file
loadEnvConfig(resolve(process.cwd(), ".env"));

console.log("Environment variables:", process.env);

console.log("GraphQLRC - API URL:", process.env.NEXT_PUBLIC_SALEOR_API_URL);
console.log("GraphQLRC - Environment source:", process.env);

let schemaUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;

if (process.env.GITHUB_ACTION === "generate-schema-from-file") {
	schemaUrl = "schema.graphql";
}

if (!schemaUrl) {
	console.error(
		"Before GraphQL types can be generated, you need to set NEXT_PUBLIC_SALEOR_API_URL environment variable.",
	);
	console.error("Follow development instructions in the README.md file.");
	process.exit(1);
}

console.log("Using schema URL:", schemaUrl);

const config: CodegenConfig = {
	overwrite: true,
	schema: schemaUrl,
	documents: "src/graphql/**/*.graphql",
	generates: {
		"src/gql/": {
			preset: "client",
			plugins: [],
			config: {
				documentMode: "string",
				useTypeImports: true,
				strictScalars: true,
				scalars: {
					Date: "string",
					DateTime: "string",
					Day: "number",
					Decimal: "number",
					GenericScalar: "unknown",
					JSON: "unknown",
					JSONString: "string",
					Metadata: "Record<string, string>",
					Minute: "number",
					PositiveDecimal: "number",
					UUID: "string",
					Upload: "unknown",
					WeightScalar: "unknown",
					_Any: "unknown",
				},
			},
			presetConfig: {
				fragmentMasking: false,
			},
		},
	},
};

export default config;
