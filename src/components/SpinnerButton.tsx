import React from 'react';

interface SpinnerButtonProps {
  children: string;
  loading: boolean;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SpinnerButton = ({
  children,
  loading,
  onClick,
  className,
}: SpinnerButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  };

  return (
    <div className={`btn btn-block ${className}`}>
      <button
        type='submit'
        disabled={loading}
        onClick={handleClick}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
      >
        {loading ? <span className='loading loading-spinner'></span> : children}
      </button>
    </div>
  );
};

export default SpinnerButton;
