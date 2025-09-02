import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

// Расширяем CSSProperties для кастомных переменных
type AppCSSProperties = React.CSSProperties & {
	'--font-family'?: string;
	'--font-size'?: string;
	'--font-color'?: string;
	'--container-width'?: string;
	'--bg-color'?: string;
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [articleState, setArticleState] =
		React.useState<ArticleStateType>(defaultArticleState);

	const toggleSideBar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setArticleState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontColorChange = (option: OptionType) => {
		setArticleState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setArticleState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setArticleState((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setArticleState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
	};

	const appStyles: AppCSSProperties = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	};

	return (
		<main className={clsx(styles.main)} style={appStyles}>
			<ArticleParamsForm
				articleState={articleState}
				onFontFamilyChange={handleFontFamilyChange}
				onFontSizeChange={handleFontSizeChange}
				onFontColorChange={handleFontColorChange}
				onContentWidthChange={handleContentWidthChange}
				onBackgroundColorChange={handleBackgroundColorChange}
				handleReset={handleReset}
				handleSubmit={handleSubmit}
				isOpen={isOpen}
				toggleSideBar={toggleSideBar}
			/>
			<Article
				fontFamily={articleState.fontFamilyOption.value}
				fontSize={articleState.fontSizeOption.value}
				fontColor={articleState.fontColor.value}
				contentWidth={articleState.contentWidth.value}
				backgroundColor={articleState.backgroundColor.value}
			/>
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
