import React from 'react';
import { render, shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';

import NoteTimeLine from '../src/components/note/noteTimeline/index.js';

describe('Note Container', () => {
	it('Test!', () => {

		const Mock = () => {
			return <div></div>
		}
		const noteContainer = shallow(<Mock />);
		expect(noteContainer).toBeDefined();
	});
});