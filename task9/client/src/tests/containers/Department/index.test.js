import 'jsdom-global/register';
import React from 'react';
import { Department } from 'containers/Department';
import { shallow } from 'enzyme';

describe('Department', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Department location={{ search: '' }} />);
	});

	it('renders component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('has header for new department', () => {
		expect(wrapper.find('header').text()).toEqual('Add new department');
	});

	it('has header for existing department', () => {
		wrapper.setState({ departmentId: 1 });
		expect(wrapper.find('header').text()).toEqual('Edit department');
	});

	it('has departmentName in state', () => {
		expect(wrapper.state().departmentName).toBeDefined();
	});

	it('has div with form-group class', () => {
		expect(wrapper.find('.form-group').type()).toBe('div');
	});

	it('has form control inputs', () => {
		expect(wrapper.find('input').at(0).hasClass('form-control')).toBe(true);
		expect(wrapper.find('input').at(1).hasClass('form-control')).toBe(true);
		expect(wrapper.find('input').at(2).hasClass('form-control')).toBe(false);
	});

	it('has submit function', () => {
		const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
		const event = { preventDefault: () => {} };
        wrapper.setState({ departmentId: 1, departmentName: 'd1' });
		wrapper.find('form').simulate('submit', event);
		expect(spy).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
