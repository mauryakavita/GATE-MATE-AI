


// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const { signInWithGoogle } = useAuth();


//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//       <div className="w-full max-w-md">

//         {/* YAHAN SE BRANDING START */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center gap-3 mb-4">
//             {/* GMI Logo */}
//             <svg width="48" height="48" viewBox="0 0 100 100">
//               <rect width="100" height="100" rx="22" fill="url(#grad)"/>
//               <text x="50" y="67" fontFamily="Poppins" fontWeight="800" fontSize="36" fill="white" textAnchor="middle">GMI</text>
//               <circle cx="82" cy="22" r="7" fill="#F59E0B"/>
//               <defs>
//                 <linearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
//                   <stop offset="0%" stopColor="#2563EB"/>
//                   <stop offset="100%" stopColor="#1E40AF"/>
//                 </linearGradient>
//               </defs>
//             </svg>
//             <h1 className="text-3xl font-bold text-white">GATE Mate AI</h1>
//           </div>
//           <p className="text-gray-400 text-sm">Track. Solve. Crack GATE 2027</p>
//         </div>
//         {/* BRANDING END */}

//         {/* Tera existing Login Form yahan se start hoga */}
//         <div className="bg-slate-800 p-8 rounded-xl">
//           <h2 className="text-xl text-white mb-6">Welcome Back</h2>
//           {/* Email, Password input etc */}
//         </div>

//       </div>
//     </div>
//   )
// }





//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#0f172a',
//       color: 'white',
//       fontFamily: 'Arial, sans-serif'
//     }}>
//       <div style={{
//         textAlign: 'center',
//         padding: '40px',
//         backgroundColor: '#1e293b',
//         borderRadius: '12px',
//         border: '1px solid #38bdf8',
//         maxWidth: '400px',
//         width: '90%'
//       }}>
//         <h1 style={{ 
//           color: '#38bdf8', 
//           marginBottom: '10px', 
//           lineHeight:'1.4',
//           fontSize: '24px'
//         }}>
//           🚀 GATE 2027 Smart Prep Tracker
//         </h1>
//         <p style={{ 
//           marginBottom: '30px', 
//           color: '#cbd5e1',
//           fontSize: '14px'
//         }}>
//           Apna progress secure karne ke liye login karo
//         </p>
//         <button 
//           onClick={signInWithGoogle}
//           style={{
//             padding: '12px 24px',
//             backgroundColor: '#38bdf8',
//             color: '#000',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//             fontSize: '16px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             margin: 'auto'
//           }}
//         >
//           <img 
//            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
//             alt="Google" 
//             style={{ width: '20px', height: '20px' }}
//           />
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// };
// )
// export default Login;


import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        border: '1px solid #38bdf8',
        maxWidth: '400px',
        width: '90%'
      }}>
        {/* Branding */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <svg width="48" height="48" viewBox="0 0 100 100">
              <rect width="100" height="100" rx="22" fill="url(#grad)"/>
              <text x="50" y="67" fontFamily="Poppins" fontWeight="800" fontSize="36" fill="white" textAnchor="middle">GMI</text>
              <circle cx="82" cy="22" r="7" fill="#3da1ed"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stopColor="#a31fe6"/>
                  <stop offset="100%" stopColor="#eb2ee1"/>
                </linearGradient>
              </defs>
            </svg>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', margin: 0 }}>GATE Mate AI</h1>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Track. Solve. Crack GATE 2027</p>
        </div>

        <h2 style={{ 
          color: '#38bdf8', 
          marginBottom: '10px', 
          lineHeight:'1.4',
          fontSize: '22px'
        }}>
          🚀 Welcome Back
        </h2>
        <p style={{ 
          marginBottom: '30px', 
          color: '#cbd5e1',
          fontSize: '14px'
        }}>
          Login to secure your GATE 2027 progress
        </p>
        
        <button 
          onClick={signInWithGoogle}
          style={{
            padding: '12px 24px',
            backgroundColor: '#38bdf8',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: 'auto'
          }}
        >
          <img 
            src="https://www.svgrepo.com/show/355037/google.svg" 
            alt="Google" 
            style={{ width: '20px', height: '20px' }}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;