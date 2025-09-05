#!/usr/bin/env node
/**
 * @author 闻人放歌
 * @description Sync dependencies to pnpm-workspace catalog
 * @since 2025-09-05
 */
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const rootDir = process.cwd();
const pkgPath = path.join(rootDir, "package.json");
const catalogPath = path.join(rootDir, "pnpm-workspace.yaml");

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const workspaceYaml = yaml.load(fs.readFileSync(catalogPath, "utf-8"));

const catalogWord = "catalog:";
const workspaceWord = "workspace:*";

if (!workspaceYaml.catalog) {
  workspaceYaml.catalog = {};
}

function syncCatalog(deeps) {
  if (!deeps) return;
  for (const [name, version] of Object.entries(deeps)) {
    if (name.includes("@repo")) {
      if (version.trim() === workspaceWord) {
        continue;
      }
      console.log(`🔄 Sync ${name}@${version} to workspace`);
      workspaceYaml.catalog[name] = version;
      deeps[name] = workspaceWord;
    } else {
      if (version === catalogWord) {
        continue;
      }
      console.log(`🔄 Sync ${name}@${version} to catalog`);
      workspaceYaml.catalog[name] = version;
      deeps[name] = catalogWord;
    }
  }
}

syncCatalog(pkg.dependencies);
syncCatalog(pkg.devDependencies);

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
fs.writeFileSync(catalogPath, yaml.dump(workspaceYaml), "utf-8");
