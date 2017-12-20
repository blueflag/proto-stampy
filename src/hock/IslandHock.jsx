// @flow
import React from 'react';
import type {Element} from 'react';
import Hock from '../util/Hock';
import debounce from 'debounce';

type Config = {
    debounce?: number
};

type Props = {
    value: *,
    onChange: Function
};

type State = {
    value: *
};

type ChildProps = {
    value: *,
    onChange: Function
};

export default Hock({
    hock: (config: Config) => (ComponentToDecorate: ComponentType<Props>): ComponentType<ChildProps> => {
        return class IslandHock extends React.Component<Props, State> {
            constructor(props: Object) {
                super(props);

                if(config.debounce) {
                    this.onSave = debounce(this.onSave, config.debounce);
                }

                this.state = {
                    value: props.value
                };
            }
            onSave = (value: *) => {
                this.props.onChange(value);
            }
            componentWillReceiveProps(nextProps: Object) {
                const {value} = nextProps;
                if(this.state.value !== value) {
                    this.setState({value});
                }
            }
            onChange = (value: *, meta: Object = {}) => {
                // return early if a save was forced.
                if(meta.islandChange) {
                    this.onSave(value);
                    return;
                }

                // debounced islands need to
                // both save and set their state
                // so they dont return early
                if(config.debounce) {
                    this.onSave(value);
                }

                this.setState({value});
            }
            render(): Element<*> {
                return <ComponentToDecorate
                    {...this.props}
                    onChange={this.onChange}
                    value={this.state.value}
                />;
            }
        };
    },
    defaultConfig: {
        debounce: null
    }
});
