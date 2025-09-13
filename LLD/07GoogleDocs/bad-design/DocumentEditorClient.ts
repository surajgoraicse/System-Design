import { promises as fs } from "fs";
interface Editor {
	addText(text: string): void;
	addImage(image: string): void;
	renderDocument(): string;
	saveToFile(): Promise<void>;
}

class DocumentEditor implements Editor {
	private renderedDocument: string = "";
	private elements: string[] = [];

	public addText(text: string): void {
		this.elements.push(text);
	}
	public addImage(image: string): void {
		this.elements.push(image);
	}
	// Renders the document by checking the type of each element at runtime
	public renderDocument(): string {
		if (this.renderedDocument.length === 0) {
			let result = "";
			this.elements.forEach((element) => {
				if (
					element.length > 4 &&
					(element.endsWith(".png") || element.endsWith(".jpg"))
				) {
					result += `[Image : ${element}]\n`;
				} else {
					result += `${element}\n`;
				}
			});
			this.renderedDocument = result;
		}
		return this.renderedDocument;
	}
	// save to file
	public async saveToFile(): Promise<void> {
		try {
			await fs.writeFile("document.txt", this.renderedDocument, "utf-8");
			console.log("successfully written in file");
		} catch (error) {
			console.log("Error saving to file : ", error);
		}
	}
}
(function main() {
	const editor = new DocumentEditor();
	editor.addText("hello world");
	editor.addText("Hi Everyone");
	editor.addText("My name is Suraj");
	editor.addImage("./images/cat.png");
	editor.addImage("./images/rabbit.png");

	console.log(editor.renderDocument());
	editor.saveToFile();
})();

/**
hello world
Hi Everyone
My name is Suraj
[Image : ./images/cat.png]
[Image : ./images/rabbit.png]

successfully written in file
 */
