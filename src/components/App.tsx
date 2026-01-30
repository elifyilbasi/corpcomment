import Container from "./layout/Container";
import HashtagList from "./hashtag/HashtagList";
import FeedbackItemsContextProvider from "../contexts/FeedbackItemsContextProvider";

function App() {
  return (
    <div className="app">
      <FeedbackItemsContextProvider>
        <Container />
        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
