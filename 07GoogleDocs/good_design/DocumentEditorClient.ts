import { promises as fs } from "fs";

interface DocumentElement {
	render(): void;
}

// text element
class TextElement implements DocumentElement {
	private text: string = "";
	constructor(text: string) {
		this.text = text + "\n";
	}
	public render() {
		return this.text;
	}
}

// image element
class ImageElement implements DocumentElement {
	private image: string = "";
	constructor(image: string) {
		this.image = image;
	}
	public render() {
		return `[Image : ${this.image}]\n`;
	}
}

// can easily add more elements (OCP followed)
class TabSpaceElement implements DocumentElement {
	public render() {
		return `\t`;
	}
}
class NewLine implements DocumentElement {
	public render() {
		return "\n";
	}
}

// Document class responsible for holding collection of elements and rendering all elements
class Document {
	private documentElements: DocumentElement[] = [];
	public addElement(element: DocumentElement) {
		this.documentElements.push(element);
	}
	public renderDoc() {
		let result = "";
		this.documentElements.forEach((element) => {
			result += element.render();
		});
		return result;
	}
}

// Storage
interface Persistence {
	save(doc: string): void;
}

class FileStorage implements Persistence {
	public async save(doc: string) {
		await fs.writeFile("document.txt", doc, "utf-8");
		console.log("File Saved Successfully");
	}
}
class DbStorage implements Persistence {
	public async save(doc: string) {
		console.log("File Saved to DB Successfully");
	}
}

interface IDocuementEditor {
	// private properties : document : stroe array of elements and render all
	// 										: storage : store in some storage system
	//										: renderedDocument : use to store the render content.

	addText(text: string): void;
	addImage(image: string): void;
	addTabSpace(spac3: string): void;
	addNewLine(newLine: string): void;
	renderDocument(): string;
	saveDocument(): void;
}

// DocumentEditor class managing client interactions (binds everything in one place)
class DocumentEditor implements IDocuementEditor {
	private document: Document; // store elements and render all
	private storage: Persistence; // db storage
	private renderedDocument: string = ""; // use to store the final
	constructor(document: Document, storage: Persistence) {
		this.document = document;
		this.storage = storage;
	}

	public addText(text: string): void {
		this.document.addElement(new TextElement(text));
	}
	public addImage(image: string): void {
		this.document.addElement(new ImageElement(image));
	}
	public addNewLine(): void {
		this.document.addElement(new NewLine());
	}
	public addTabSpace(): void {
		this.document.addElement(new TabSpaceElement());
	}

	public renderDocument(): string {
		if (this.renderedDocument.length === 0) {
			this.renderedDocument = this.document.renderDoc();
		}
		return this.renderedDocument;
	}

	public saveDocument(): void {
		this.storage.save(this.renderedDocument);
	}
}

// client usage example:
(function main() {
	const document: Document = new Document();
	const db: Persistence = new FileStorage();
	const editor = new DocumentEditor(document, db);

	editor.addText("hello ! I am suraj");
	editor.addImage("./images/img.png");
	editor.addTabSpace();
	editor.addNewLine();
	editor.addText("Thank You");
	editor.addTabSpace()
	editor.addText("!!")
	console.log(editor.renderDocument());
	editor.saveDocument();
})();

/**
 * Still the DocumentEditor class is breaking the single responsibility principle.
 *  
 */