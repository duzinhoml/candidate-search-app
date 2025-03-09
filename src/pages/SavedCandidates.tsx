import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        
          savedCandidates.map((candidate: Candidate) => (
            <div key={candidate.login}>
              <h2>{candidate.name}</h2>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location}</p>
              <img src={candidate.avatar_url} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
              <p>Email: {candidate.email ? candidate.email : 'Not available'}</p>
              <p>
                GitHub URL: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a>
              </p>
              <p>Company: {candidate.company ? candidate.company : 'Not available'}</p>
              <button onClick={() => {
                const updatedCandidates = savedCandidates.filter((c) => c.login !== candidate.login);
                setSavedCandidates(updatedCandidates);
                localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
              }}>Reject</button>
            </div>
          ))
        
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </>
  );
};

export default SavedCandidates;
