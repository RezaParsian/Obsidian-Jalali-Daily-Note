import {Notice, Plugin} from 'obsidian';
import * as jalaali from 'jalaali-js';

export default class RpJalali extends Plugin {
	async onload() {
		this.addRibbonIcon('calendar', 'ایجاد یادداشت روزانه شمسی', async (evt: MouseEvent) => {
			try {
				const folderName = 'Daily Notes';
				const folder = this.app.vault.getAbstractFileByPath(folderName);
				if (!folder) {
					await this.app.vault.createFolder(folderName);
				}

				const fileName = generateName();
				const fullPath = folderName + '/' + fileName;

				await this.app.vault.create(fullPath, '');

				new Notice(`فایل ساخته شد: ${fullPath}`);
			} catch (err) {
				new Notice('خطا در ساخت فایل: ' + err.message);
			}
		});

		this.addCommand({
			id: 'insert-persian-date',
			name: 'now',
			editorCallback: (editor) => {
				const date = generateName('/', false)+' ';
				editor.replaceRange(date, editor.getCursor());
				editor.setCursor(editor.getCursor().ch + date.length)
			}
		});
	}
}

function generateName(separator: string = '-', withExtension: boolean = true): string {
	const today = new Date();
	const {jy, jm, jd} = jalaali.toJalaali(today);
	return `${jy}${separator}${String(jm).padStart(2, '0')}${separator}${String(jd).padStart(2, '0')}${withExtension ? '.md' : ''}`;
}
