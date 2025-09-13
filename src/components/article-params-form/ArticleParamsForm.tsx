import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
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
	onStateChange: (newState: ArticleStateType) => void;
	handleReset: () => void;
	handleSubmit: (evt: React.FormEvent) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	onStateChange,
	handleReset,
	handleSubmit,
}) => {
	const [isFormOpen, setIsFormOpen] = React.useState(false);
	const sidebarRef = React.useRef<HTMLDivElement>(null);
	const buttonRef = React.useRef<HTMLDivElement>(null);
	const [tempValues, setTempValues] = React.useState(articleState);

	React.useEffect(() => {
		setTempValues(articleState);
	}, [articleState]);

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

	const handleFormSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		onStateChange(tempValues);
		handleSubmit(evt);
	};

	const handleFormReset = () => {
		setTempValues(articleState);
		handleReset();
	};

	const toggleSideBar = () => {
		setIsFormOpen((prev) => !prev);
	};

	const handleClickOutside = React.useCallback(
		(evt: MouseEvent) => {
			if (
				sidebarRef.current &&
				!evt.composedPath().includes(sidebarRef.current) &&
				buttonRef.current &&
				!evt.composedPath().includes(buttonRef.current)
			) {
				setIsFormOpen(false);
			}
		},
		[setIsFormOpen]
	);

	React.useEffect(() => {
		if (!isFormOpen) return;
		document.body.addEventListener('click', handleClickOutside);
		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		};
	}, [isFormOpen, handleClickOutside]);

	return (
		<>
			<div ref={buttonRef}>
				<ArrowButton isOpen={isFormOpen} onClick={toggleSideBar} />
			</div>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={clsx(styles.form)}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					{/* Шрифт - Select */}
					<div className={clsx(styles.section)}>
						<Select
							selected={tempValues.fontFamilyOption}
							onChange={handleTempFontFamilyChange}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
					</div>

					{/* Размер шрифта - RadioGroup */}
					<div className={clsx(styles.section)}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={tempValues.fontSizeOption}
							onChange={handleTempFontSizeChange}
							title='Размер шрифта'
						/>
					</div>

					{/* Цвет текста - Select */}
					<div className={clsx(styles.section)}>
						<Select
							selected={tempValues.fontColor}
							onChange={handleTempFontColorChange}
							options={fontColors}
							title='Цвет шрифта'
						/>
					</div>

					{/* Цвет фона - Select */}
					<div className={clsx(styles.section)}>
						<Select
							selected={tempValues.backgroundColor}
							onChange={handleTempBackgroundColorChange}
							options={backgroundColors}
							title='Цвет фона'
						/>
					</div>

					{/* Ширина контента - Select */}
					<div className={clsx(styles.section)}>
						<Select
							selected={tempValues.contentWidth}
							onChange={handleTempContentWidthChange}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>

					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
