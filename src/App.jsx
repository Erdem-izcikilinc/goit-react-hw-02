import { useEffect, useState } from "react";
import CafeTitle from "./components/CafeTitle/CafeTitle";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const App = () => {
  const initialState = () => {
    const saved = localStorage.getItem("feedback");
    return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
  };

  const [feedback, setFeedback] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const total = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage =
    total > 0 ? Math.round(((feedback.good + feedback.neutral) / total) * 100) : 0;

  return (
    <div>
      <CafeTitle />
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        total={total}
      />
      {total > 0 ? (
        <Feedback feedback={feedback} total={total} positive={positivePercentage} />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
};

export default App;
