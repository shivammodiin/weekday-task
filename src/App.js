import "./assets/css/App.css";
import JobCard from "./components/jobCard";

function App() {
  return (
    <div className="main-container">
      {/* Filters Will Come Here */}
      <div className="posting__container">
        {Array(10)
          .fill("")
          .map((_, i) => {
            return (
              <div key={i} className="job__card">
                <JobCard />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
