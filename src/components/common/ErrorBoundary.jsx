import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // You could also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary p-4 m-4 border border-red-500 rounded bg-red-100 text-red-900">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">We're sorry, an error occurred while rendering this component.</p>
          {this.state.error && (
            <details className="mb-4">
              <summary className="cursor-pointer font-medium">Error details</summary>
              <p className="mt-2 p-2 bg-red-50 rounded font-mono text-sm overflow-auto max-h-40">
                {this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <p className="mt-2 p-2 bg-red-50 rounded font-mono text-sm overflow-auto max-h-40">
                  {this.state.errorInfo.componentStack}
                </p>
              )}
            </details>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary; 