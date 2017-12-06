// @flow

// @flow
import React from 'react';
import type {Element} from 'react';
import Hock from '../util/Hock';

type Config = {
    initialRepeat: boolean,
    interval: (props: Object) => number,
    timeout?: (props: Object) => ?number
};

type Props = {
    value: *,
    onChange: Function
};

type State = {
    isRepeating: boolean,
    firstRepeat: Date,
    lastRepeat: Date,
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
        let {
            timeout,
            interval,
            initialRepeat
        } = config;

        return class RepeatHock extends React.Component<Props, State> {

            request: *;

            constructor(props: Object) {
                super(props);
                this.state = {
                    isRepeating: initialRepeat,
                    firstRepeat: null,
                    lastRepeat: null,
                    repeats: 0,
                    timedOut: false
                };
                this.tick = this.tick.bind(this);
                this.startRepeats = this.startRepeats.bind(this);
                this.stopRepeats = this.stopRepeats.bind(this);
            }

            tick() {
                this.request = requestAnimationFrame(this.tick);

                if(!this.state.isRepeating) {
                    return;
                }

                const now = new Date();
                if(timeout && (now - this.state.firstRepeat > timeout(this.props))) {
                    this.setState({
                        isRepeating: false,
                        timedOut: true
                    });
                } else if(now - this.state.lastRepeat > interval(this.props)) {
                    this.doRepeat();
                }
            }

            doRepeat() {
                this.setState({
                    isRepeating: true,
                    lastRepeat: new Date(),
                    repeats: this.state.repeats + 1
                });
            }

            startRepeats() {
                this.setState({
                    firstRepeat: new Date()
                });
                this.doRepeat();
            }

            stopRepeats() {
                if(!this.state.isRepeating) {
                    return;
                }
                this.setState({
                    isRepeating: false
                });
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
