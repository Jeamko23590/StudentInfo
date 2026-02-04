import { useEffect } from 'react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: number;
    name: string;
    course: string;
    year: number;
  } | null;
}

const StudentModal = ({ isOpen, onClose, student }: StudentModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !student) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-maroon-600 text-white p-8 rounded-t-2xl">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-maroon-600">
                {getInitials(student.name)}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{student.name}</h2>
              <p className="text-maroon-100">Student ID: #{student.id}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Student Information</h3>
          
          <div className="space-y-6">
            {/* Course Information */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-maroon-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-maroon-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Course Enrolled</p>
                  <p className="text-lg font-semibold text-gray-800">{student.course}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    This student is currently pursuing their degree in {student.course}.
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Year */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-maroon-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-maroon-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Academic Year</p>
                  <p className="text-lg font-semibold text-gray-800">Year {student.year}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Currently in year {student.year} of their academic program.
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-maroon-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-maroon-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Enrollment Status</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Active
                    </span>
                    <span className="px-3 py-1 bg-maroon-100 text-maroon-700 rounded-full text-sm font-medium">
                      Full-time
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-maroon-50 rounded-xl p-6 border border-maroon-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-maroon-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Additional Details
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">{student.name}</span> (ID: #{student.id}) is an active student 
                enrolled in <span className="font-semibold">{student.course}</span> and is currently in 
                <span className="font-semibold"> year {student.year}</span> of their academic journey.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
