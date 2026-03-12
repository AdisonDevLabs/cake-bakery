// make-brand.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brandId = process.argv[2];

// If no brand ID is provided, just update the registry
if (!brandId) {
  console.log('🔄 No brand ID provided. Updating registry only...');
  await updateRegistry();
  process.exit(0);
}

const templateDir = path.join(__dirname, 'public', 'brands', '_template');
const targetDir = path.join(__dirname, 'public', 'brands', brandId);

async function createBrand() {
  try {
    await fs.access(templateDir);
  } catch {
    console.error('\n❌ Error: Could not find the _template folder.');
    process.exit(1);
  }

  try {
    try {
      await fs.access(targetDir);
      console.error(`\n⚠️  Warning: The brand folder "${brandId}" already exists!`);
      process.exit(1);
    } catch {}

    await fs.mkdir(targetDir, { recursive: true });
    
    const files = await fs.readdir(templateDir);
    for (const file of files) {
      const srcPath = path.join(templateDir, file);
      const destPath = path.join(targetDir, file);
      await fs.copyFile(srcPath, destPath);
    }

    console.log(`\n✅ Successfully generated brand folder for: ${brandId}`);
    
    // AFTER CREATING THE BRAND, UPDATE THE REGISTRY
    await updateRegistry();
    
  } catch (err) {
    console.error('\n❌ Something went wrong:', err.message);
  }
}

// --- NEW REGISTRY GENERATOR ---
async function updateRegistry() {
  const brandsDir = path.join(__dirname, 'public', 'brands');
  const folders = await fs.readdir(brandsDir, { withFileTypes: true });
  const registry = [];

  for (const dirent of folders) {
    // Only look at directories that aren't the template
    if (dirent.isDirectory() && dirent.name !== '_template') {
      try {
        // Read the brand.json to get the actual Bakery Name
        const brandJsonPath = path.join(brandsDir, dirent.name, 'brand.json');
        const brandData = JSON.parse(await fs.readFile(brandJsonPath, 'utf-8'));
        
        registry.push({
          name: brandData.name,
          id: dirent.name
        });
      } catch (e) {
        console.warn(`⚠️ Skipping ${dirent.name}: Missing or invalid brand.json`);
      }
    }
  }

  // Write the master list to public/brands/registry.json
  await fs.writeFile(
    path.join(brandsDir, 'registry.json'),
    JSON.stringify(registry, null, 2)
  );
  console.log('✅ Registry updated successfully!\n');
}

createBrand();