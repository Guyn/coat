const sass = require("sass"); // or require('node-sass');
const { readdir, readFile, writeFile } = require("fs").promises;
const { join, parse, dirname } = require("path");
const { mkdir } = require("fs");
const csso = require("csso");
const LOG = require("cli-block");
const prettier = require("prettier");

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

const outputDir = process.argv[2]
	? join(__dirname, "../", process.argv[2])
	: join(__dirname, `../css`);

const getFiles = async (filePath, ext, filter = null) => {
	const fileNames = await (await readdir(filePath))
		.filter((file) => file.includes(ext))
		.filter((file) => file.charAt(0) !== filter);

	const files = Promise.all(
		fileNames.map(async (file) => {
			const data = await readFile(join(filePath, file));
			return {
				path: join(filePath, file),
				name: file,
				data: data.toString(),
			};
		})
	);

	return files;
};
const getThemeFiles = async () => {
	const combinedFiles = [];
	try {
		const themePath = join(__dirname, "scss/theme");

		const files = await getFiles(themePath, ".scss", "_");
		const partials = await getFiles(join(themePath, "partial"), ".scss");

		LOG.BLOCK_START("Coat themes");

		await asyncForEach(files, async (file) => {
			await asyncForEach(partials, async (partial) => {
				const filename =
					parse(partial.name).name !== "_"
						? `${parse(file.name).name}-${parse(partial.name).name}`.replace(
								/_/g,
								""
						  )
						: parse(file.name).name;
				combinedFiles.push({
					name: filename,
					path: file.path,
					data: file.data + partial.data,
				});
			});
		});
	} catch (err) {
		console.log(err);
	}
	return combinedFiles;
};

const buildThemes = async () => {
	const themeFiles = await getThemeFiles();

	await asyncForEach(themeFiles, async (source) => {
		LOG.BLOCK_LINE_SUCCESS(source.name);
		const res = sass.renderSync({
			file: source.path,
			includePaths: [join(__dirname, "../node_modules")],
			data: source.data,
		});
		const outputFile = join(outputDir, `/theme/${source.name}.css`);
		await mkdir(dirname(outputFile), { recursive: true }, async () => {
			const minified = await csso.minify(res.css.toString(), {
				restructure: true,
			});
			await writeFile(
				outputFile,
				prettier.format(minified.css, { parser: "css" }),
				(err) => {
					console.log(err);
				}
			);
			await writeFile(
				outputFile.replace(".css", ".min.css"),
				minified.css,
				(err) => {
					console.log(err);
				}
			);
		});
	});
	LOG.BLOCK_END();
};

buildThemes();
