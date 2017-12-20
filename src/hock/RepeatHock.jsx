// @flow
import React from 'react';
import type {Element} from 'react';
import Hock from '../util/Hock';

type Config = {
    initialRepeat: boolean,
    interval: (props: Object) => number,
    timeout: (props: Object) => ?number
};

type Props = {
    value: *,
    onChange: Function
};

type State = {
    isRepeating: boolean,
    firstRepeat: ?Date,
    lastRepeat: ?Date,
    repeats: number,
    timedOut: boolean
};

type ChildProps = {
    isRepeating: boolean,
    firstRepeat: Date,
    lastRepeat: Date,
    repeats: number,
    startRepeats: Function,
    stopRepeats: Function,
    timedOut: boolean
};

export default Hock({
    hock: (config: Config) => (ComponentToDecorate: ComponentType<Props>): ComponentType<ChildProps> => {
        return class RepeatHock extends React.Component<Props, State> {

            request: *;

            constructor(props: Object) {
                super(props);
                this.state = {
                    isRepeating: config.initialRepeat,
                    firstRepeat: null,
                    lastRepeat: null,
                    repeats: 0,
                    timedOut: false
                };
            }

            componentDidMount() {
                this.request = requestAnimationFrame(this.tick);
                if(this.state.isRepeating) {
                    this.startRepeats();
                }
            }

            componentWillUnmount() {
                cancelAnimationFrame(this.request);
            }

            tick = () => {
                let {
                    firstRepeat,
                    isRepeating,
                    lastRepeat
                } = this.state;

                this.request = requestAnimationFrame(this.tick);

                if(!isRepeating) {
                    return;
                }

                const now = new Date();
                let timeoutValue = config.timeout(this.props);
                if(timeoutValue && firstRepeat && (now - firstRepeat > timeoutValue)) {
                    this.setState({
                        isRepeating: false,
                        timedOut: true
                    });
                } else if(lastRepeat && now - lastRepeat > config.interval(this.props)) {
                    this.doRepeat();
                }
            }

            doRepeat = () => {
                this.setState({
                    isRepeating: true,
                    lastRepeat: new Date(),
                    repeats: this.state.repeats + 1
                });
            }

            startRepeats = () => {
                this.setState({
                    firstRepeat: new Date()
                });
                this.doRepeat();
            }

            stopRepeats = () => {
                if(!this.state.isRepeating) {
                    return;
                }
                this.setState({
                    isRepeating: false
                });
            }

            render(): Element<*> {
                return <ComponentToDecorate
                    {...this.props}
                    {...this.state}
                    startRepeats={this.startRepeats}
                    stopRepeats={this.stopRepeats}
                />;
            }
        };
    },
    defaultConfig: {
        initialRepeat: true,
        interval: (/* props: Object */) => 1000,
        timeout: (/* props: Object */) => null
    },
    shorthandKey: "interval"
});
