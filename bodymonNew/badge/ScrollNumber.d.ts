import * as React from 'react';
import { Component } from 'react';
import { ConfigConsumerProps } from '../config-provider';
export interface ScrollNumberProps {
    prefixCls?: string;
    className?: string;
    count?: string | number | null;
    displayComponent?: React.ReactElement<HTMLElement>;
    component?: string;
    onAnimated?: Function;
    style?: React.CSSProperties;
    title?: string | number | null;
}
export interface ScrollNumberState {
    animateStarted?: boolean;
    count?: string | number | null;
}
declare class ScrollNumber extends Component<ScrollNumberProps, ScrollNumberState> {
    static defaultProps: {
        count: null;
        onAnimated(): void;
    };
    static getDerivedStateFromProps(nextProps: ScrollNumberProps, nextState: ScrollNumberState): {
        animateStarted: boolean;
    } | null;
    lastCount?: string | number | null;
    constructor(props: ScrollNumberProps);
    getPositionByNum(num: number, i: number): number;
    componentDidUpdate(_: any, prevState: ScrollNumberState): void;
    onAnimated: () => void;
    renderNumberList(position: number): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    renderCurrentNumber(prefixCls: string, num: number | string, i: number): JSX.Element;
    renderNumberElement(prefixCls: string): string | number | JSX.Element[] | null | undefined;
    renderScrollNumber: ({ getPrefixCls }: ConfigConsumerProps) => React.ComponentElement<any, React.Component<any, any, any>> | React.ReactElement<HTMLElement, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    render(): JSX.Element;
}
export default ScrollNumber;
