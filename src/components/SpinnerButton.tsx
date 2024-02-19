interface SpinnerButtonProps {
  text: string;
  loading: boolean;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: text should be children
// TODO: bugfix: despite the disabled attribute, the button is still clickable
const SpinnerButton = ({
  text,
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
        {loading ? <span className='loading loading-spinner'></span> : text}
      </button>
    </div>
  );
};

export default SpinnerButton;
