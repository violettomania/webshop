interface SpinnerButtonProps {
  text: string;
  loading: boolean;
}

// TODO: bugfix: despite the disabled attribute, the button is still clickable
const SpinnerButton = ({ text, loading }: SpinnerButtonProps) => {
  return (
    <button type='submit' className='btn-block' disabled={loading}>
      {loading ? <span className='loading loading-spinner'></span> : text}
    </button>
  );
};

export default SpinnerButton;
