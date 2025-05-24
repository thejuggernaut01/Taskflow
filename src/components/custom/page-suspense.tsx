import ReactLoading from 'react-loading';

const PageSuspense = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed inset-0 bg-white z-50">
      <ReactLoading type="spin" color="#4C36E0" height={40} width={40} />
    </div>
  );
};

export default PageSuspense;