import { Provider } from "react-redux";
import getStore from "./reducers/store";
import Three from "./containers/three";
import Controls from "./containers/controls";
import { loadColladas } from "./actions";
import { createRoot } from "react-dom/client";
import "./index.css";

const store = getStore();
store.dispatch(loadColladas());

createRoot(document.getElementById("right") as HTMLElement).render(
  <Provider store={store}>
    <div>
      <Three element={document.getElementById("view3D") as HTMLElement} />
      <Controls />
    </div>
  </Provider>,
);
