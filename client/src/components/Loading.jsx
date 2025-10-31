

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
      <p className="text-gray-600 mt-3 font-medium">{text}</p>
    </div>
  );
};

export default Loading;
