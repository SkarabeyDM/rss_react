import type { ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { Component } from 'react';

export type ErrorBoundaryState = {
  hasError: boolean;
};

export type ErrorBoundaryProps = PropsWithChildren & {
  fallback: ReactNode;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (hasError) {
      return fallback;
    }

    return children;
  }
}
