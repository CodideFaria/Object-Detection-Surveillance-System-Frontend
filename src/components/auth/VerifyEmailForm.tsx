import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { networkAdapter } from '../../network/NetworkAdapter';

export default function VerifyEmailForm() {
  const location = useLocation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  // Use ref to ensure we only call verification once (avoids React strict-mode double invoke in dev)
  const calledRef = useRef(false);

  // Extract token from query parameters
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const completeRegistration = async () => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing token in URL.');
      return;
    }
    setStatus('loading');
    try {
      const response = await networkAdapter.post('/complete-register', { token });
      setStatus(response.status);
      if (response.status !== 'success') {
        setMessage(response.message);
      } else {
        setMessage(response.data);
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Verification failed. Please try again.');
    }
  };

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;
      completeRegistration();
    }
  }, [token]);

  return (
    <div className="max-w-md w-full mx-auto text-center p-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
        Email Verification
      </h1>

      {status === 'loading' && (
        <p className="text-sm text-gray-500">Verifying your email...</p>
      )}

      {(status === 'success' || status === 'error') && (
        <p className={`mb-6 text-sm ${
          status === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}

      <div className="flex justify-center gap-4">
        {status === 'error' && (
          <button
            onClick={() => {
              // reset ref so retry can call again
              calledRef.current = false;
              completeRegistration();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
          >
            Retry
          </button>
        )}

        {(status === 'success' || status === 'error') && (
          <Link
            to="/signin"
            className="px-4 py-2 text-sm font-medium text-brand-500 rounded-lg border border-brand-500 hover:bg-brand-50"
          >
            Go to Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
