import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

const TuitionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    if (id) {
      const fetchTuition = async () => {
        try {
          setLoading(true); // Start loading
          const response = await fetch(`/api/tuitions?id=${id}`);
          const result = await response.json();
          setTuition(result.data);
        } catch (error) {
          console.error('Error fetching tuition:', error);
        } finally {
          setLoading(false); // End loading
        }
      };

      fetchTuition();
    }
  }, [id]);

  const handleAttendanceToggle = async (day) => {
    if (!tuition) return;

    const updatedAttendance = tuition.attendance.includes(day)
      ? tuition.attendance.filter(d => d !== day)  // Remove day if already present
      : [...tuition.attendance, day];              // Add day if not present

    const updatedTuition = { ...tuition, attendance: updatedAttendance };
    setTuition(updatedTuition);

    await fetch('/api/tuitions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...updatedTuition, id: tuition._id })
    });
  };

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    </Layout>
  );

  if (!tuition) return <div>No tuition data found</div>;

  const daysGone = tuition.attendance.length;
  const daysLeft = tuition.daysPerMonth - daysGone;

  return (
<Layout>
  {/* Title and general info */}
  <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold mb-4 text-center text-base-content">{tuition.subject} - {tuition.className}</h2>
    
    <div className="bg-base-200 p-4 rounded-lg shadow-sm mb-6">
      <p className="text-lg mb-2"><strong>Student:</strong> {tuition.studentName}</p>
      <p className="text-lg mb-2"><strong>Days per Month:</strong> {tuition.daysPerMonth}</p>
      <p className="text-lg mb-2"><strong>Days Attended:</strong> {daysGone}</p>
      <p className="text-lg"><strong>Days Left:</strong> {daysLeft}</p>
    </div>

    {/* Attendance grid */}
    <h3 className="text-2xl font-semibold mb-4">Attendance</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: tuition.daysPerMonth }, (_, i) => i + 1).map(day => (
        <label key={day} className="flex items-center space-x-2 cursor-pointer hover:bg-base-200 rounded-lg p-2">
          <input
            type="checkbox"
            className="checkbox checkbox-accent"
            checked={tuition.attendance.includes(day)}
            onChange={() => handleAttendanceToggle(day)}
          />
          <span className={`text-base-content ${tuition.attendance.includes(day) ? 'font-semibold' : ''}`}>Day {day}</span>
        </label>
      ))}
    </div>

    {/* Back button */}
    <div className="mt-6 text-center">
      <button className="btn btn-primary w-full max-w-xs mx-auto" onClick={() => router.back()}>
        Back to List
      </button>
    </div>
  </div>
</Layout>

  );
};

export default TuitionDetail;
