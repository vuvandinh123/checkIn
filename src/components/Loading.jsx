import { useScrollTop } from "../hook";

const Loading = () => {
  useScrollTop();
  return (
    <div className="fixed inset-0 z-50 bg-[#0000008d]">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-center items-center space-x-3 text-sm text-blue-700">
          <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>

        </div>
      </div>
    </div>
  );
};

export default Loading;
