import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface.tsx';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchGithub();
        const filteredCandidates = data.filter(
          (candidate: any) => candidate.login && candidate.avatar_url
        );
        console.log(filteredCandidates)
        setCandidates(filteredCandidates);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleAccept = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]') as Candidate[];
    if (candidates[currentCandidateIndex]) {
      savedCandidates.push(candidates[currentCandidateIndex]);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }

        if (currentCandidateIndex === candidates.length - 1) {
          setCandidates([]);
          setCurrentCandidateIndex(0);
        } else if (currentCandidateIndex < candidates.length - 1) {
          setCurrentCandidateIndex(currentCandidateIndex + 1);
        }
      };
  const handleReject = () => {
    if (currentCandidateIndex === candidates.length - 1) {
      setCandidates([]);
      setCurrentCandidateIndex(0);
    } else if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    }
  };

  let content;

  if (loading) {
    content = <p>Loading candidates...</p>;
  } else if (error) {
    content = <p>Error: {error}</p>;
  } else if (candidates.length === 0) {
    content = <p>No candidates available.</p>;
  } else if (candidates[currentCandidateIndex]) {
    const candidate = candidates[currentCandidateIndex];
    content = (
      <>
        <p>Username: {candidate.login}</p>
        <img src={candidate.avatar_url} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <p>Email: {candidate.email ? candidate.email : 'Not available'}</p>
        <p>
          GitHub URL: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a>
        </p>
        <p>Company: {candidate.company ? candidate.company : 'Not available'}</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={handleAccept} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
          <button onClick={handleReject} style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      {content}
    </div>
  );
};

export default CandidateSearch;
