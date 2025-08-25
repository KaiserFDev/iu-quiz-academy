import React, { useEffect, useState } from 'react';
import './LearningKPIs.css';

// API-Basis-URL aus Umgebungsvariable
const API_BASE = process.env.REACT_APP_API_URL;

function LearningKPIs({ userId }) {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    successRate: 0,
    totalPoints: 0,
  });

  useEffect(() => {
    if (!userId) return;
    async function fetchStats() {
      try {
        const response = await fetch(`${API_BASE}/api/statistics?userId=${userId}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Lernstatistiken:', error);
      }
    }

    fetchStats();
  }, [userId]);

  return (
    <section>
      <h2>Lernstatistiken</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>🕹️Quiz Sessions</h3>
          <p>{stats.totalQuizzes}</p>
        </div>
        <div className="stat-card">
          <h3>🏆Erfolgsquote</h3>
          <p>{stats.successRate} %</p>
        </div>
        <div className="stat-card">
          <h3>🎯Punkte gesamt</h3>
          <p>{stats.totalPoints}</p>
        </div>
      </div>
    </section>
  );
}

export default LearningKPIs;