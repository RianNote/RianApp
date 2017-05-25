import React from 'react';
import PropTypes from 'prop-types';

import NoteCardTimeLine from '../src/components/note/noteCardTimeline/index.js';

describe('TEST JEST', () => {
	it('Test!', () => {

		const Mock = () => {
			return <div></div>
		}
		const noteContainer = shallow(<Mock />);
		expect(noteContainer).toBeDefined();
	});
});

describe('NoteCardTimeLine', () => {
	it('canRenderNoteCardTimeLine', () => {
		const wrapper = shallow(<NoteCardTimeLine  />);
		expect(wrapper.find('.container')).to.have.length(1);
	});


});