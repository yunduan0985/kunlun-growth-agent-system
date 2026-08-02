function mainPackageSize() {
  const project = readJson("project.config.json");
  const app = readJson("app.json");
  const ignores = (project.packOptions && project.packOptions.ignore) || [];
  const subpackages = (app.subPackages || []).map((item) => String(item.root || "").replace(/\/$/, ""));
  const cloudRoot = project.cloudfunctionRoot ? String(project.cloudfunctionRoot).replace(/\/$/, "") : "";
  return walkFiles(MINI_ROOT)
    .filter(({ relativePath }) => !ignoredByProject(relativePath, ignores))
    .filter(({ relativePath }) => !subpackages.some((root) => relativePath === root || relativePath.startsWith(`${root}/`)))
    .filter(({ relativePath }) => !cloudRoot || (relativePath !== cloudRoot && !relativePath.startsWith(`${cloudRoot}/`)))
    .reduce((sum, item) => sum + fs.statSync(item.fullPath).size, 0);
}