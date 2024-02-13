interface SubmitButtonProps {
    text: string;
    loading: boolean;
}

const SubmitButton = ({ text, loading }: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      className='btn btn-primary btn-block'
      disabled={loading}
    >
      {loading ? (
        <>
          <span className='loading loading-spinner'></span>
          sending...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};
export default SubmitButton;
