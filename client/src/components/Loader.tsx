const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 rounded-full bg-black/30 p-1">
        <div className="h-full w-full animate-spin rounded-full border-4 border-transparent border-t-gray-100" />
      </div>
    </div>
  );
};

export default Loader;
