const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#2a9d8f] border-r-[#e9c46a] border-b-[#f4a261] border-l-[#e76f51] animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-[#264653] border-r-[#2a9d8f] border-b-[#e9c46a] border-l-[#f4a261] animate-spin animation-delay-100"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
// Add this to your global CSS:
