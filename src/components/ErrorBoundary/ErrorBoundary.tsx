import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    if (this.props.onRetry) {
      this.props.onRetry();
    }
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
          <div className='w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full'>
              <svg className='w-6 h-6 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h2 className='mt-3 text-lg font-medium text-gray-900'>Something went wrong</h2>
            <p className='mt-2 text-sm text-gray-500'>{this.state.error?.message || 'An unexpected error occurred.'}</p>
            {this.props.onRetry && (
              <button
                onClick={this.handleRetry}
                className='px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Try again
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
