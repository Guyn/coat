const sass = require("sass"); // or require('node-sass');
const { readdir, readFile, writeFile } = require("fs").promises;
const { join, parse, dirname } = require("path");
const { mkdir } = require("fs");
const csso = require("csso");

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};
const getFileList = async (filePath, ext) => {
	const fileNames = await (await readdir(filePath))
		.filter((file) => file.includes(ext))
		.map((file) => {
			return {
				name: file,
				path: join(filePath, file),
			};
		});
	return fileNames;
};
const getFiles = async (filePath, ext) => {
	const fileNames = await (await readdir(filePath)).filter((file) =>
		file.includes(ext)
	);
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

		const files = await getFileList(themePath, ".scss");
		const partials = await getFiles(join(themePath, "partial"), ".scss");

		await asyncForEach(files, async (file) => {
			await asyncForEach(partials, async (partial) => {
				combinedFiles.push({
					name: `${parse(file.name).name}-${parse(partial.name).name}`.replace(
						/_/g,
						""
					),
					path: file.path,
					data: partial.data,
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

	asyncForEach(themeFiles, async (source) => {
		console.log(source);

		const result = sass.renderSync({
			file: source.path,
			includePaths: ["node_modules/"],
			inject: `$my_var: blue;`,
		});

		const files = ["file1.scss", "file2.scss"];
		const add = ["$my_var: blue", "$my_var: red"];
		files.forEach((file, index) => {
			const result = sass.renderSync({
				file: file.path,
				includePaths: ["node_modules/"],
				inject: `$my_var: blue;`,
			});
		});

		console.log(result.css);
		const outputFile = join(__dirname, `temp/${source.name}.css`);
		await mkdir(dirname(outputFile), { recursive: true }, async () => {
			await writeFile(outputFile, result.css.toString(), (err) => {
				console.log(err);
			});
			const minified = await csso.minify(result.css.toString(), {
				resulttructure: true,
			});
			await writeFile(
				outputFile.replace(".css", ".min.css"),
				minified.css,
				(err) => {
					console.log(err);
				}
			);
		});
	});
};

buildThemes();
// const resultult = sass.renderSync({ file: "style.scss" });
