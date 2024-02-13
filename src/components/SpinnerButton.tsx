interface SpinnerButtonProps {
  text: string;
  loading: boolean;
}

const SpinnerButton = ({ text, loading }: SpinnerButtonProps) => {
  return (
    <button type='submit' className='btn-block' disabled={loading}>
      {loading ? <span className='loading loading-spinner'></span> : text}
    </button>
  );
};

export default SpinnerButton;
