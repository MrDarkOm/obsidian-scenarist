import { EntityKind } from '../models/types';

/** Тело .md-заметки (без frontmatter) для новой сущности. */
export function bodyTemplate(kind: EntityKind, name: string): string {
	switch (kind) {
		case 'character':
			return characterBody(name);
		case 'project':
			return `# ${name}\n\n## О проекте\n> *Что это за вселенная / сборник историй.*\n\n## Заметки\n- \n`;
		case 'work':
			return `# ${name}\n\n## Логлайн\n> *Одно предложение, о чём это.*\n\n## Темы\n- \n`;
		case 'book':
			return `# ${name}\n\n## Синопсис\n\n## Идея\n\n`;
		case 'arc':
			return `# ${name}\n\n## Цель арки\n\n## Описание\n\n## Ключевые события\n- \n`;
		case 'anchor':
			return `# ${name}\n\n## Что происходит\n> *Суть ключевого события.*\n\n## Последствия\n- \n`;
		case 'chapter':
			return `# ${name}\n\n## Синопсис\n\n---\n\n## Сцена\n\n> *Описание обстановки.*\n\n`;
		case 'page':
			return `# ${name}\n\n> *Содержимое страницы / раскадровка.*\n\n`;
		case 'categoryItem':
			return `# ${name}\n\n## Описание\n\n## Детали\n\n`;
		default:
			return `# ${name}\n`;
	}
}

function characterBody(_name: string): string {
	return `## Семья и отношения


## Настоящее имя


## Место и дата рождения


## Дополнительно

`;
}
