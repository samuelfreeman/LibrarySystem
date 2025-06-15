// scripts/extractFields.ts
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { parsePrismaSchema } from "@loancrate/prisma-schema-parser";
import path from "path";

interface Location {
  start: { offset: number; line: number; column: number };
  end: { offset: number; line: number; column: number };
}

interface Name {
  kind: string;
  value: string;
  location: Location;
}

interface TypeId {
  kind: string;
  name: Name;
}

interface FieldAttribute {
  kind: string;
  path: {
    kind: string;
    value: string[];
    location: Location;
  };
  args: any[];
  location: Location;
}

interface Member {
  kind: string;
  name: Name;
  type: TypeId | { kind: string; type: TypeId };
  attributes: FieldAttribute[];
  comment: any;
  location: Location;
}

interface Model {
  kind: string;
  name: Name;
  members: Member[];
  location: Location;
}

interface Declarations {
  declarations: Model[];
}

interface ExtractedModel {
  modelName: string;
  fields: string[];
}

/**
 * Extract fields from schema declaration
 */
const extractModels = (data: Declarations): ExtractedModel[] => {
  if (!data.declarations || !Array.isArray(data.declarations)) return [];

  return data.declarations.map((model, modelIndex) => {
    const modelName = model?.name?.value ?? `UnnamedModel_${modelIndex}`;
    const fields = (model.members || [])
      .filter((member) => {
        if (!member?.name?.value) return false;
        if (member.type?.kind === "list") return false;

        if (
          member.attributes &&
          member.attributes.some(
            (attr) =>
              Array.isArray(attr.path?.value) &&
              attr.path.value.includes("relation")
          )
        ) {
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
const processSchema = (schemaPath: string, outputName: string) => {
  const schema = readFileSync(schemaPath, "utf-8");
  const parsedSchema = parsePrismaSchema(schema) as Declarations;

  const models = extractModels(parsedSchema);

  const outputDir = path.join(__dirname, "./allowedFields");
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  writeFileSync(path.join(outputDir, `${outputName}.json`), JSON.stringify(models, null, 2));
  console.log(`✅ Extracted allowed fields for ${outputName} schema.`);
};

/**
 * MAIN
 */
processSchema("./prisma/schema.prisma", "fields");
