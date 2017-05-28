import React, { Component } from 'react';
import css from './timelineSnippet.css';
const tagBox = (tagArray) => {
	tagArray.map((tag, index)=>{
		return (
			<div key={index} className='tag-box'>

			</div>
		)
	})
}
const TimelineSnippet = ({ title, final_modified_at, snippet, tag, style}) => {
	return (
		<div className='container'>
			<div className='left'>
			</div>
			<div className='right'>
				<div className='snippet'>
				</div>
				<div className='tag'>
					{tagBox(tag)}
				</div>
			</div>
		</div>
	)	
}
export default TimelineSnippet;