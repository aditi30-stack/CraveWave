// index.jsx (or App.jsx)
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Headers } from "./components/Header";
import { Body } from "./components/Body";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import {Error} from "./components/Error.js"
import { RestaurantMenu } from "./components/RestaurantMenu.js";
import { Provider } from "react-redux";
import appStore from "./utils/AppStore.js";
import { Cart } from "./components/Cart.js";
import { Search } from "./components/Search.js";


const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div>
      <div className="flex flex-col h-full min-h-screen overflow-y-hidden bg-gray-800 text-white mb-12">
          <Headers />
          <div className="flex-1 p-4 mt-4 overflow-y-auto no-scrollbar min-h-screen">
              <Outlet />
          </div>
      </div>
      </div>
      </Provider>
  );
};



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <Body/>
      },

      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/contact',
        element: <Contact/>
      }, {
        path: '/restaurant/:restName/:restId',
        element: <RestaurantMenu/>
      }, {
        path: '/cart',
        element: <Cart/>
      }, {
        path: '/search',
        element: <Search/>
      }],
    errorElement: <Error/>
  }
 

])




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router ={appRouter}/>);


