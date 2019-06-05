import React from "react";
import { create } from "react-test-renderer";
import UserEditForm from "./UserEditForm";
import { plainToClass } from 'class-transformer';
import UserModel from "../../models/UserModel";

describe("UserEditForm component", () => {
  const mockUser = plainToClass(UserModel, {
    id: 1,
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'test@test.com',
    uuid: 'test-123',
    pictureUrl: 'https://via.placeholder.com/150'
  });

  test("it matches the snapshot", () => {
    const component = create(<UserEditForm user={mockUser} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("it should contain user object passed via props", () => {
    const component = create(<UserEditForm user={mockUser} />);
    const instance = component.getInstance();
    expect(instance.state.user).toEqual(mockUser);
  });

  test("it should update user object firstName field for passed value in event", () => {
    const component = create(<UserEditForm user={mockUser} />);
    const instance = component.getInstance();
    const mockEvent = {
      target: {
        value: "testFirstName"
      }
    };
    instance.handleFirstNameChange(mockEvent);
    expect(instance.state.user.firstName).toEqual(mockEvent.target.value);
  });

  test("it should update user object lastName field for passed value in event", () => {
    const component = create(<UserEditForm user={mockUser} />);
    const instance = component.getInstance();
    const mockEvent = {
      target: {
        value: "testLastName"
      }
    };
    instance.handleLastNameChange(mockEvent);
    expect(instance.state.user.lastName).toEqual(mockEvent.target.value);
  });

  test("it should update specified field in states user object", () => {
    const component = create(<UserEditForm user={mockUser} />);
    const instance = component.getInstance();
    const mockValue = 999;
    instance.changeSpecifiedNameField('id', mockValue);
    expect(instance.state.user.id).toEqual(mockValue);
  });

  test("it should call onCancel and pass falsy value via prop function", () => {
    let testValue = true;
    const propFn = (val) => {
      testValue = val;
    };
    const mockEvent = {
      preventDefault: () => {}
    };
    const component = create(<UserEditForm user={mockUser} closeModal={propFn}/>);
    const instance = component.getInstance();
    instance.onCancel(mockEvent);
    expect(testValue).toBeFalsy();
  });

  test("it should call actionOnUserObject on form submit", () => {
    const component = create(<UserEditForm user={mockUser} />);
    const instance = component.getInstance();
    const mockEvent = {
      preventDefault: () => {}
    };
    const spy = jest.spyOn(instance, 'actionOnUserObject');
    instance.handleSubmit(mockEvent);
    expect(spy).toHaveBeenCalled();
  });
});
