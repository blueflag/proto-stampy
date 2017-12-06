// @flow
import React from 'react';
import type {ComponentType, Element} from 'react';
import Compose from '../util/Compose';
import SpruceClassName from '../util/SpruceClassName';
import StateHock from '../hock/StateHock';

/**
 * @module Components
 */

/**
 * @component
 *
 * `DropDown` is a controlled component that displays a dropdown list of options based off a schema object.
 * It does not keep state but provides an onChange function that toggles `props.isOpen`.
 *
 * @example
 */

type ButtonProps = {
    isOpen: boolean
};

type RenderProps = {};

type DropdownSchema = [
    {
        render: ComponentType<RenderProps>,
        onClick?: Function
    }
];

type Props = {
    button: ComponentType<ButtonProps>,
    className?: string,
    modifier?: string,
    onChange: (isOpen: boolean) => {},
    peer?: string,
    isOpen: boolean,
    spruceName: string,
    schema: DropdownSchema
};

export default class Dropdown extends React.Component<Props> {

    element: ?HTMLElement;

    static defaultProps = {
        onChange: (data) => data,
        isOpen: false,
        spruceName: 'Dropdown'
    };

    componentWillMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener("click", this.closeDropdown, false);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.closeDropdown, false);
    }

    closeDropdown: Function = (ee: Event) => {
        if(this.props.isOpen && this.element instanceof window.HTMLElement && !this.element.contains(ee.target)) {
            this.props.onChange(false);
        }
    };

    render(): Element<*> {
        var {
            button: Button,
            className,
            modifier,
            onChange,
            peer,
            isOpen,
            spruceName: name,
            schema
        } = this.props;

        const divClassName = SpruceClassName({name, modifier, className, peer});
        const buttonClassName = SpruceClassName({name: `${name}_button`, modifier});
        const listClassName = SpruceClassName({name: `${name}_list`, modifier});
        const listItemClassName = SpruceClassName({name: `${name}_listItem`, modifier});

        return <div className={divClassName} ref={elem => this.element = elem}>
            <div className={buttonClassName} onClick={() => onChange(!isOpen)}>
                <Button isOpen={isOpen} />
            </div>
            {isOpen &&
                <ul className={listClassName}>
                    {schema.map((schemaItem: Object, key: number): Element<*> => {
                        const {
                            render: Render,
                            onClick
                        } = schemaItem;

                        const itemClick = () => {
                            onClick && onClick();
                            onChange(false);
                        };

                        return <li
                            key={key}
                            className={listItemClassName}
                            onClick={itemClick}
                        >
                            <Render />
                        </li>;
                    })}
                </ul>
            }
        </div>;
    }
}

/**
 * @component
 *
 * `DropdownStateful` is a stateful version of Dropdown.
 *
 * @example
 */


export const DropdownStateful = Compose(
    StateHock(() => ({
        isOpen: false
    })),
    (Component) => (props: Object) => <Component
        {...props}
        isOpen={props.value.isOpen}
        onChange={(isOpen) => props.onChange({isOpen})}
    />
)(Dropdown);
