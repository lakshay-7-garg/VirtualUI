import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../configs/connectDB.js";
import User from "../models/user.model.js";
import Component from "../models/components.model.js";

dotenv.config();

const libPath = path.join(process.cwd(), "../virtual-ui-lib");
const libSrc = path.join(libPath, "src");
const indexFile = path.join(libSrc, "index.js");

const exportRegex = /export\s*{\s*([\w\s,]+)\s*}\s*from\s*["'](.+?)["']/g;

async function main() {
  try {
    console.log("Connecting to DB...");
    await connectDB();

    // find or create an admin user to own the seeded components
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.log(
        "No admin user found. Creating a local admin user 'library-admin'.",
      );
      admin = await User.create({
        name: "library-admin",
        email: "library-admin@local",
        role: "admin",
      });
    }

    if (!fs.existsSync(indexFile)) {
      console.error("Could not find index file:", indexFile);
      process.exit(1);
    }

    const indexText = fs.readFileSync(indexFile, "utf8");

    const toSeed = [];
    let m;
    while ((m = exportRegex.exec(indexText)) !== null) {
      const names = m[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const relPath = m[2];
      for (const name of names) {
        toSeed.push({ name, relPath });
      }
    }

    console.log(`Found ${toSeed.length} exports in ${indexFile}`);

    let created = 0;
    for (const item of toSeed) {
      try {
        const rel = item.relPath.replace(/^\.\//, "");
        const compFile = path.join(libSrc, rel);

        if (!fs.existsSync(compFile)) {
          console.warn("Component file not found, skipping:", compFile);
          continue;
        }

        const code = fs.readFileSync(compFile, "utf8");

        // attempt to extract props from a pattern like `export const Name = ({ a = "", b = 1 }) =>` or function signature
        let props = [];
        try {
          const re = new RegExp(
            `export\\s+const\\s+${item.name}\\s*=\\s*\\(\\s*\\{([^}]*)\\}`,
            "m",
          );
          const pm = code.match(re);
          if (pm && pm[1]) {
            props = pm[1]
              .split(",")
              .map((p) => p.split("=")[0].trim())
              .filter(Boolean);
          }
        } catch (e) {
          // ignore prop extraction errors
        }

        const upsert = await Component.findOneAndUpdate(
          { name: item.name, npmPackage: "virtual-ui-componenet-library" },
          {
            $set: {
              name: item.name,
              code,
              props,
              owner: admin._id,
              visibility: "public",
              npmPackage: "virtual-ui-componenet-library",
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        created++;
        console.log("Seeded:", item.name);
      } catch (err) {
        console.error("Error seeding component", item.name, err.message);
      }
    }

    console.log(
      `Seeding complete. Processed ${toSeed.length} exports, created/updated ${created} components.`,
    );
  } catch (error) {
    console.error("Seed script failed:", error);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
}

main();
