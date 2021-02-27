export default function ExperienceBar() {
  return (
    <header className="experience-bar">
      <span>0 xp</span>
      <div className="progress-pane">
        <div 
          className="progress-pane-percentage"
          style={{ width: '50%' }}
        />
        <span 
          className="current-xp-value"
          style={{left: '50%'}}  
        >
          300 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  );
}
