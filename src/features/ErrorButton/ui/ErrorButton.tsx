import { useState } from 'react';

export function ErrorButton() {
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  return (
    <button
      type="button"
      className="error_button"
      onClick={() => {
        setError(new Error('Hooray! You broke the site!'));
      }}
    >
      Throw Error
    </button>
  );
}
