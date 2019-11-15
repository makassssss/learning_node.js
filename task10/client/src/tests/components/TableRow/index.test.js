import 'jsdom-global/register';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DepartmentTableRow } from 'components/TableRow';

describe('TableRow', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<DepartmentTableRow department={{ department_id: 1, department_name: 'd1' }} />);
	});

	it('renders component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('has edit button', () => {
		expect(wrapper.find('.btn').first().text()).toBe('edit');
	});

	it('has 3 elements with btn class', () => {
	   expect(wrapper.find('.btn').length).toBe(3);
    });

	it('should set modalOpen on click', () => {
        const spy = jest.spyOn(React, 'useState');
	    wrapper.find('button').simulate('click');
	    expect(spy).toHaveBeenCalled();
	    expect(spy).toHaveBeenCalledTimes(1);
    });

	it('should open modal on click', () => {
	    wrapper.find('button').simulate('click');
	    expect(wrapper.find('Portal').props().open).toBeTruthy();
    });

	it('has department prop', () => {
	    const wrapper = mount(
            <div>
                <BrowserRouter>
                    <table>
                        <tbody>
                            <DepartmentTableRow department={{department_id: 1, department_name: 'd1'}}/>
                        </tbody>
                    </table>
                </BrowserRouter>
            </div>
        );
	    expect(wrapper.find(DepartmentTableRow).props().department).toBeDefined();
    })
});
