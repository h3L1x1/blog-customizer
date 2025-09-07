import React from 'react';
import styles from './styles/index.module.scss';

import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

type AppCSSProperties = React.CSSProperties & {
	'--font-family'?: string;
	'--font-size'?: string;
	'--font-color'?: string;
	'--container-width'?: string;
	'--bg-color'?: string;
};

const App = () => {
	const [articleState, setArticleState] =
		React.useState<ArticleStateType>(defaultArticleState);

	const handleStateChange = (newState: ArticleStateType) => {
		setArticleState(newState);
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
				onStateChange={handleStateChange}
				handleReset={handleReset}
				handleSubmit={handleSubmit}
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

export default App;
