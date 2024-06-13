
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Api from './pages/Api';

function App() {


//   const fetchUserDetails = async () => {
//     try {
//         const dataResponse = await fetch(SummaryApi.currentUser.url, {
//             method: SummaryApi.currentUser.method,
//             credentials: 'include'
//         });

//         if (!dataResponse.ok) {
//             // toast.error(`HTTP error! Status: ${dataResponse.status}`);
//             return; // Exit early if the response is not okay
//         }

//         try {
//             const dataapi = await dataResponse.json();
//             console.log("data", dataapi);

//             if (dataapi.success) {
//                 toast.success(dataapi.message);
//                 console.log("data", dataapi);
//               }
              
//               if (dataapi.error) {
//                 toast.error(dataapi.message);
//                 console.log("data", dataapi);
//             }

//         } catch (jsonError) {
//             const responseText = await dataResponse.text();
//             console.error("Error parsing JSON response:", responseText);
//             toast.error("There was an error processing the response from the server.");
//         }

//     } catch (fetchError) {
//         console.error("Fetch error:", fetchError);
//         toast.error("An error occurred while fetching user details.");
//     }
// }

const dispatch= useDispatch()

const fetchUserDetails = async()=>{
  const dataResponse = await fetch(SummaryApi.current_user.url,{
    method : SummaryApi.current_user.method,
    credentials : 'include'
  })

  const dataApi = await dataResponse.json()

  if(dataApi.success){
    dispatch(setUserDetails(dataApi.data))
  }
}




  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <>
    <Context.Provider value={{
      fetchUserDetails
    }}>

      <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-120px)]'>
   

        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
