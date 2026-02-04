import { useState, useEffect } from 'react';
import { studentService, type Student } from '@/services';
import StudentComponent from '@/components/StudentComponent';
import StudentModal from '@/components/StudentModal';
import { ErrorMessage } from '@/components';

const ITEMS_PER_PAGE = 9;

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchStudents = async () => {
    try {
      setError(null);
      
      // Fetch students from API service
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      // Extract meaningful error message
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch student data. Please try again later.';
      
      setError(errorMessage);
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = students.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={fetchStudents}
        onGoHome={() => window.location.href = '/'}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-maroon-600 mb-3">
              Student Directory
            </h2>
            <p className="text-gray-600 text-lg">Browse and manage student information</p>
          </div>
          
          {/* Stats Bar */}
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-maroon-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Students</p>
                  <p className="text-2xl font-bold text-gray-800">{students.length}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3 text-sm text-gray-600">
                <span className="px-4 py-2 bg-maroon-50 rounded-lg font-medium">
                  📄 Page {currentPage} of {totalPages}
                </span>
                <span className="px-4 py-2 bg-maroon-50 rounded-lg font-medium">
                  👥 Showing {startIndex + 1}-{Math.min(endIndex, students.length)}
                </span>
              </div>
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentStudents.map((student) => (
              <StudentComponent
                key={student.id}
                id={student.id}
                name={student.name}
                course={student.course}
                year={student.year}
                onViewDetails={() => handleViewDetails(student)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-maroon-600 hover:bg-maroon-50 border border-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && goToPage(page)}
                  disabled={page === '...'}
                  className={`min-w-[40px] px-4 py-2 rounded-lg font-medium transition-all ${
                    page === currentPage
                      ? 'bg-maroon-600 text-white shadow-lg'
                      : page === '...'
                      ? 'bg-transparent text-gray-400 cursor-default'
                      : 'bg-white text-gray-700 hover:bg-maroon-50 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-maroon-600 hover:bg-maroon-50 border border-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        student={selectedStudent}
      />
    </div>
  );
};

export default Students;
