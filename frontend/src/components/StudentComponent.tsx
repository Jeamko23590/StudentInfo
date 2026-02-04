interface StudentComponentProps {
  name: string;
  course: string;
  year: number;
  id: number;
  onViewDetails: () => void;
}

const StudentComponent = ({ name, course, year, id, onViewDetails }: StudentComponentProps) => {
  const getYearColor = (year: number) => {
    const colors = [
      'bg-maroon-400',
      'bg-maroon-500',
      'bg-maroon-600',
      'bg-maroon-700',
    ];
    return colors[(year - 1) % colors.length];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all">
      {/* Header with maroon color */}
      <div className={`h-24 ${getYearColor(year)} relative`}>
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white">
            <span className="text-xl font-bold text-maroon-600">
              {getInitials(name)}
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white text-maroon-700 text-xs font-semibold px-3 py-1 rounded-full">
            #{id}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 px-6 pb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">Student Profile</p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-maroon-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-maroon-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Course</p>
              <p className="text-sm font-semibold text-gray-800">{course}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-maroon-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-maroon-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Academic Year</p>
              <p className="text-sm font-semibold text-gray-800">Year {year}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StudentComponent;
