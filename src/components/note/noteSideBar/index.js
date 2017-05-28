import React, { Component } from 'react';
import noteCss from '../note.css';
import css from './noteSideBar.css';
import trashIcon from './TrashIcon.svg';
import noteListIcon from './NoteListIcon.svg';
import rianLogo from './RianLogo.svg';
import star from './Star.svg';

const NoteSideBar = ({changeMode}) => {
	return (
		<div className={noteCss.fixedBar}>
			<div className={css.head}>
				<div className={css.logo}>R</div>
			</div>
			<div className={css.sort}>
				<div className={css.how}>최신</div>
				<div className={css.how}>갯수</div>
				<div className={css.how}><img className={css.howIcon} src={star} /></div>
			</div>
			<div className={css.tool}>
				<div className={css.border} />
				<img className={css.toolIcon} src={noteListIcon} onClick={changeMode}/>
				<img className={css.toolIcon} src={trashIcon} />
			</div>
			<div className={css.move}>
				<div className={css.border} />
				<div className={css.moveIcon}>N-LIST</div>
				<div className={css.moveIcon}>SOCIAL</div>
			</div>
		</div>
	)
}

export default NoteSideBar