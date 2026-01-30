import Header from "./Header";
import FeedbackList from "../feedback/FeedbackList";

export default function Container() {
  return (
    <main className="container">
      <Header />
      <FeedbackList />
    </main>
  );
}
