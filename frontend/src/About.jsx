import React, { useState, useEffect } from 'react';
import './About.css';




const About = () => {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);


//Mock data to test executives section <-----here
  

  // Lead executive (President or Vice President) in center; others in circle
  const president = executives.find(exec =>
    exec.position && (exec.position.toLowerCase() === 'president' || exec.position.toLowerCase() === 'vice president')
  );
  const members = executives.filter(exec => exec !== president);

  useEffect(() => {
    // Fetch execs from database
    const fetchExecutives = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/executives');
        const data = await response.json();
        setExecutives(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching executives:', error);
        // Fallback to mock data if fetch fails
        setExecutives([]);
        setLoading(false);
      }
    };

    fetchExecutives();
  }, []);

  
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <div className="about-container">
      {/* Header Section */}
      
      <section className="about-header" style={{ 
  opacity: Math.max(0, 1 - scrollY / 300), 
  transform: `translateY(${scrollY * 0.5}px)`,
  pointerEvents: scrollY > 250 ? 'none' : 'auto'
}}>
        <h1>ABOUT</h1>
      </section>
      

      {/* Description Section */}
      <section className="about-description">
        <div className="about-grid">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" 
              alt="Coding"
              className="description-image"
            />
          </div>
          <div className="description-text">
            <p>
              The Computing Club is a dynamic group of tech enthusiasts dedicated to exploring the ever-evolving 
              world of computer science, coding, and digital innovation. Our mission is to inspire creativity, 
              teamwork, and problem-solving skills through hands-on projects, workshops, and discussions on topics 
              such as programming, web development, artificial intelligence, cybersecurity, and robotics.
            </p>
            <p>
              Whether you're a beginner eager to learn or an experienced coder looking to collaborate, the club 
              provides a supportive environment to sharpen your skills and bring ideas to life. Members have 
              opportunities to participate in hackathons, coding challenges, and community tech events, helping 
              them gain real-world experience and confidence in the digital field
            </p>
            <div className="meeting-time-box">
              <h3>Meeting Time:</h3>
              <p>📅 Every Thursday at 2:00 PM </p>
              <p>📍 Computing Lecture Room</p>
            </div>
          </div>
        </div>
      </section>
    {/* Executives Section */}
    {/* Executives Section */}
      <section className="about-executive">
        
        <h2>MEET THE EXECUTIVES</h2>
        
        {loading ? (
          <div className="loading">Loading executives...</div>
        ) : (
          <div className="executive-grid">
            {/* President */}
            {president && (
              <div className="executive-member main">
                <img src={president.image || 'path-to-main-executive.jpg'} alt={president.position || 'Lead'} />
                <div className="member-info">
                  <h3>{president.name}</h3>
                  <p>{president.position}</p>
                </div>
              </div>
            )}

            {/* Other Execs */}
            {members.map((member, index) => {
              const baseAngle = -90; // rotations start from top
              const angle = baseAngle + (360 / members.length) * index;
              return (
                <div 
                  key={member._id || index} 
                  className="executive-member"
                  style={{ 
                    '--rotation-angle': `${angle}deg`,
                    animationDelay: `${-(20 / members.length) * index}s`
                  }}
                >
                  <img src={member.image || '/default-avatar.jpg'} alt="Member" />
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p>{member.position}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default About;