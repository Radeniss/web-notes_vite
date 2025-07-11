const MainTemplate = ({ header, sidebar, mainContent }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {header}
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow p-6 h-fit">
            {sidebar}
          </div>
          
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {mainContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTemplate;