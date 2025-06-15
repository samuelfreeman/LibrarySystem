"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/extractFields.ts
const fs_1 = require("fs");
const prisma_schema_parser_1 = require("@loancrate/prisma-schema-parser");
const path_1 = __importDefault(require("path"));
/**
 * Extract fields from schema declaration
 */
const extractModels = (data) => {
    if (!data.declarations || !Array.isArray(data.declarations))
        return [];
    return data.declarations.map((model, modelIndex) => {
        const modelName = model?.name?.value ?? `UnnamedModel_${modelIndex}`;
        const fields = (model.members || [])
            .filter((member) => {
            if (!member?.name?.value)
                return false;
            if (member.type?.kind === "list")
                return false;
            if (member.attributes &&
                member.attributes.some((attr) => Array.isArray(attr.path?.value) &&
                    attr.path.value.includes("relation"))) {
                return false;
            }
            return true;
        })
            .map((member) => member.name?.value || "unknown");
        return { modelName, fields };
    });
};
/**
 * Process a single schema file
 */
const processSchema = (schemaPath, outputName) => {
    const schema = (0, fs_1.readFileSync)(schemaPath, "utf-8");
    const parsedSchema = (0, prisma_schema_parser_1.parsePrismaSchema)(schema);
    const models = extractModels(parsedSchema);
    const outputDir = path_1.default.join(__dirname, "./allowedFields");
    if (!(0, fs_1.existsSync)(outputDir)) {
        (0, fs_1.mkdirSync)(outputDir);
    }
    (0, fs_1.writeFileSync)(path_1.default.join(outputDir, `${outputName}.json`), JSON.stringify(models, null, 2));
    console.log(`✅ Extracted allowed fields for ${outputName} schema.`);
};
/**
 * MAIN
 */
processSchema("./prisma/schema.prisma", "fields");
