
import Quiz from "./components/Quiz";
import { Provider } from 'react-redux';
import store from "./redux/store"; 

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center mt-20">
        <Quiz/>
      </div>
    </Provider>
  );
};

export default App;
