
const Loader = ({ size = "h-8 w-8", color = "border-blue-500" }) => {
  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`animate-spin rounded-full ${size} border-2 border-solid border-t-transparent ${color}`}
      />
    </div>
  );
};

export default Loader;
