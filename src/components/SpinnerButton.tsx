interface SpinnerButtonProps {
  text: string;
  loading: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: text should be children
// TODO: bugfix: despite the disabled attribute, the button is still clickable
const SpinnerButton = ({ text, loading, onClick }: SpinnerButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
  };

  return (
    <button
      type='submit'
      className='btn-block'
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? <span className='loading loading-spinner'></span> : text}
    </button>
  );
};

export default SpinnerButton;
