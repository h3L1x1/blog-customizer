import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	onFontFamilyChange: (option: OptionType) => void;
	onFontSizeChange: (option: OptionType) => void;
	onFontColorChange: (option: OptionType) => void;
	onContentWidthChange: (option: OptionType) => void;
	onBackgroundColorChange: (option: OptionType) => void;
	handleReset: () => void;
	handleSubmit: (evt: React.FormEvent) => void;
	isOpen: boolean;
	toggleSideBar: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	onFontFamilyChange,
	onFontSizeChange,
	onFontColorChange,
	onContentWidthChange,
	onBackgroundColorChange,
	handleReset,
	handleSubmit,
	isOpen,
	toggleSideBar,
}) => {
	const sidebarRef = React.useRef<HTMLDivElement>(null);
	const buttonRef = React.useRef<HTMLDivElement>(null);
	const [tempValues, setTempValues] = React.useState(articleState);

	// Обновляем временные значения при изменении articleState
	React.useEffect(() => {
		setTempValues(articleState);
	}, [articleState]);

	// Обработчики для временных изменений
	const handleTempFontFamilyChange = (option: OptionType) => {
		setTempValues((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleTempFontSizeChange = (option: OptionType) => {
		setTempValues((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleTempFontColorChange = (option: OptionType) => {
		setTempValues((prev) => ({ ...prev, fontColor: option }));
	};

	const handleTempBackgroundColorChange = (option: OptionType) => {
		setTempValues((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleTempContentWidthChange = (option: OptionType) => {
		setTempValues((prev) => ({ ...prev, contentWidth: option }));
	};

	// Обработчик submit
	const handleFormSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();

		// Применяем все изменения
		onFontFamilyChange(tempValues.fontFamilyOption);
		onFontSizeChange(tempValues.fontSizeOption);
		onFontColorChange(tempValues.fontColor);
		onBackgroundColorChange(tempValues.backgroundColor);
		onContentWidthChange(tempValues.contentWidth);

		// Вызываем переданный handleSubmit
		handleSubmit(evt);
	};

	// Обработчик сброса
	const handleFormReset = () => {
		setTempValues(articleState);
		handleReset();
	};

	const handleClickOutside = React.useCallback(
		(evt: MouseEvent) => {
			if (
				sidebarRef.current &&
				!evt.composedPath().includes(sidebarRef.current) &&
				buttonRef.current &&
				!evt.composedPath().includes(buttonRef.current)
			) {
				toggleSideBar();
			}
		},
		[sidebarRef, buttonRef, toggleSideBar]
	);

	React.useEffect(() => {
		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, [handleClickOutside]);

	return (
		<>
			<div ref={buttonRef}>
				<ArrowButton isOpen={isOpen} onClick={toggleSideBar} />
			</div>
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					{/* Шрифт - Select */}
					<div className={styles.section}>
						<Select
							selected={tempValues.fontFamilyOption}
							onChange={handleTempFontFamilyChange}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
					</div>

					{/* Размер шрифта - RadioGroup */}
					<div className={styles.section}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={tempValues.fontSizeOption}
							onChange={handleTempFontSizeChange}
							title='Размер шрифта'
						/>
					</div>

					{/* Цвет текста - Select */}
					<div className={styles.section}>
						<Select
							selected={tempValues.fontColor}
							onChange={handleTempFontColorChange}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>

					{/* Цвет фона - Select */}
					<div className={styles.section}>
						<Select
							selected={tempValues.backgroundColor}
							onChange={handleTempBackgroundColorChange}
							options={backgroundColors}
							title='Цвет фона'
						/>
					</div>

					{/* Ширина контента - Select */}
					<div className={styles.section}>
						<Select
							selected={tempValues.contentWidth}
							onChange={handleTempContentWidthChange}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleFormReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
