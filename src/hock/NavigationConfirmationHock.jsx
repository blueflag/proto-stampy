// @flow
import React from 'react';
import Hock from '../util/Hock';

type Config = {
    confirmWhen: (props: Object, nextLocation: Object, action: string) => boolean
};

type Props = {
    history: Object
};

type State = {
    blocked: boolean,
    nextLocation: Object,
    action: string
};

type ChildProps = {
    cancelNavigation: () => void,
    continueNavigation: () => void,
    navigationBlocked: boolean
};

const MissingHistoryError = () => new Error(`React Route 4 history object must be provided to NavigationConfirmationHock`);

export default Hock({
    hock: ({confirmWhen}: Config) => (ComponentToDecorate: ComponentType<Props>): ComponentType<ChildProps> => {
        return class NavigationConfirmationHock extends React.Component<Props, State> {

            unblockRouteChange: ?Function;

            constructor(props: Props) {
                super(props);
                this.state = {
                    blocked: false,
                    nextLocation: null,
                    action: null
                };
            }

            componentWillMount() {
                this.protectRouteChange();
            }

            componmentWillUnmount() {
                this.unprotectRouteChange();
            }

            resetState = () => {
                this.setState({
                    blocked: false,
                    nextLocation: null,
                    action: null
                });
            };

            cancelNavigation = () => {
                this.resetState();
            };

            continueNavigation = () => {
                this.unblockRouteChange();

                let {history} = this.props;

                let {
                    action,
                    nextLocation
                } = this.state;

                this.resetState();

                let actionMap = {
                    PUSH: () => history.push(nextLocation),
                    REPLACE: () => history.replace(nextLocation),
                    POP: () => history.goBack()
                };

                actionMap[action] && actionMap[action]();
            };

            protectRouteChange = () => {
                let {history} = this.props;
                if(!history) {
                    throw MissingHistoryError();
                }

                this.unprotectRouteChange();

                // when react-router is about to change routes, this function will be called
                // so we reject react-router's automatic route transition and instead
                // provide an identical one as an actionProp

                this.unblockRouteChange = history.block((nextLocation: Object, action: string): boolean => {

                    if(!confirmWhen(this.props, nextLocation, action)) {
                        return true;
                    }

                    this.setState({
                        blocked: true,
                        nextLocation,
                        action
                    });
                    return false;
                });
            };

            unprotectRouteChange = () => {
                this.unblockRouteChange && this.unblockRouteChange();
            };

            render(): Element<*> {
                return <ComponentToDecorate
                    {...this.props}
                    cancelNavigation={this.cancelNavigation}
                    continueNavigation={this.continueNavigation}
                    navigationBlocked={this.state.blocked}
                />;
            }
        };
    },
    defaultConfig: {
        confirmWhen: (/* props: Object, nextLocation: Object, action: string */) => true
    },
    shorthandKey: "confirmWhen"
});
