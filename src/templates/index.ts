import { EntityKind } from '../models/types';
import { t } from '../i18n';

/** Тело .md-заметки (без frontmatter) для новой сущности. */
export function bodyTemplate(kind: EntityKind, name: string): string {
	switch (kind) {
		case 'character':
			return t('templates.character');
		case 'project':
			return t('templates.project', { name });
		case 'work':
			return t('templates.work', { name });
		case 'book':
			return t('templates.book', { name });
		case 'arc':
			return t('templates.arc', { name });
		case 'anchor':
			return t('templates.anchor', { name });
		case 'chapter':
			return t('templates.chapter', { name });
		case 'page':
			return t('templates.page', { name });
		case 'categoryItem':
			return t('templates.categoryItem', { name });
		default:
			return `# ${name}\n`;
	}
}
