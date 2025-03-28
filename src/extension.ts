// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('扩展 "sort-words" 已激活');

	const disposable = vscode.commands.registerCommand('sort-words.sortWords', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const selection = editor.selection;

		// 获取要处理的文本范围
		let startLine = selection.start.line;
		let endLine = selection.end.line;
		let startCharacter = selection.start.character;
		let endCharacter = selection.end.character;

		// 如果没有选中文本，则处理当前行
		if (selection.isEmpty) {
			startLine = selection.start.line;
			endLine = selection.start.line;
			startCharacter = 0;
			endCharacter = document.lineAt(startLine).text.length;
		}

		// 处理每一行
		const edits: vscode.TextEdit[] = [];
		for (let line = startLine; line <= endLine; line++) {
			const lineText = document.lineAt(line).text;
      // 如果不包含最后一个字符的的所有内容都不包含逗号，则不处理
      if (!lineText.slice(0, -1).includes(',')) {
        continue;
      }

			let textToProcess = lineText;
			let rangeStart = 0;
			let rangeEnd = lineText.length;

			// 如果是选中模式，只处理选中部分
			if (!selection.isEmpty) {
				if (line === startLine) {
					rangeStart = startCharacter;
				}
				if (line === endLine) {
					rangeEnd = endCharacter;
				}
				textToProcess = lineText.substring(rangeStart, rangeEnd);
			}

			const processedText = processLine(textToProcess);
			if (processedText !== textToProcess) {
				const range = new vscode.Range(line, rangeStart, line, rangeEnd);
				edits.push(new vscode.TextEdit(range, processedText));
			}
		}

		// 应用编辑
		if (edits.length > 0) {
			const edit = new vscode.WorkspaceEdit();
			edit.set(document.uri, edits);
			vscode.workspace.applyEdit(edit);
		}
	});

	context.subscriptions.push(disposable);
}

function processLine(text: string): string {
	// 匹配最外层的括号内容
	const bracketPattern = /[\(\[\<]([^\(\[\<]*?)[\)\]\>]/g;
	return text.replace(bracketPattern, (match, content) => {
		// 分割并排序单词，同时保持原始逗号分隔
		const parts = content.split(',').map((part: string) => part.trim());
		const words = parts.filter((word: string) => word);
		const sortedWords = words.sort();

		// 重建原始格式，保持空逗号分隔
		let result = '';
		let wordIndex = 0;
		for (let i = 0; i < parts.length; i++) {
			if (parts[i] !== '') {
				// result += ',';
			// } else {
				result += sortedWords[wordIndex++];
				if (i < parts.length - 1) {
					result += ', ';
				}
			}
		}

		// 保持原始括号类型
		const openBracket = match[0];
		const closeBracket = match[match.length - 1];
		return `${openBracket}${result}${closeBracket}`;
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
