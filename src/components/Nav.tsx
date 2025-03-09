import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Candidate Search</Link>
      <Link to="/SavedCandidates" style={{ textDecoration: 'none', color: 'black' }}>Saved Candidates</Link>
    </nav>
  );
};

export default Nav;
