 //for run - cd MY-APP  , npm run dev  ,then press O+enter key 
 //for depoly on netlify ,npm run build    (but take care ki jis folder me rakhe ho cd folder_name chla lena pahle)    , then dist folder bn jayega use drag-drop kar den netlify pe



import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";




 import { useState, useEffect } from 'react';

function AppContent() {
  const { user } = useAuth();
 if (!user) return <Login />;

  // --- 1. GATE Subjects State (LocalStorage से लोड करना) ---
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("gate_subjects");
    const defaultSubjects = [
      { id: 1, name: "C Programming & Data Structures", pyq: 0, revision: 0, tests: 0 },
      { id: 2, name: "Databases (DBMS)", pyq: 0, revision: 0, tests: 0 },
      { id: 3, name: "Operating System", pyq: 0, revision: 0, tests: 0 },
      { id: 4, name: "Engineering Mathematics & Aptitude", pyq: 0, revision: 0, tests: 0 }
    ];
    return saved ? JSON.parse(saved) : defaultSubjects;
  }); 




  const [newSubjectName, setNewSubjectName] = useState("");

  // --- 2. Full-Length Mock Test Tracker State ---
  const [fltCount, setFltCount] = useState(() => {
    const savedFlt = localStorage.getItem("gate_flt");
    return savedFlt ? parseInt(savedFlt) : 0;
  });

  // 💾 LocalStorage में डेटा सुरक्षित करना
  useEffect(() => {
    localStorage.setItem("gate_subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("gate_flt", fltCount.toString());
  }, [fltCount]);

  // नया सब्जेक्ट जोड़ने का फंक्शन
  const handleAddSubject = () => {
    if (newSubjectName.trim() === "") return;
    const newSub = {
      id: Date.now(),
      name: newSubjectName,
      pyq: 0,
      revision: 0,
      tests: 0
    };
    setSubjects([...subjects, newSub]);
    setNewSubjectName("");
  };

  // किसी सब्जेक्ट को डिलीट करने का फंक्शन
  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  // काउंटर्स को अपडेट (+ या -) करने का कॉमन फंक्शन
  const updateCounter = (id, field, type) => {
    const updated = subjects.map(sub => {
      if (sub.id === id) {
        let currentVal = sub[field];
        let newVal = type === 'inc' ? currentVal + 1 : currentVal - 1;
        return { ...sub, [field]: newVal < 0 ? 0 : newVal }; // वैल्यू 0 से कम न हो
      }
      return sub;
    });
    setSubjects(updated);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif', color: '#fff', backgroundColor: '#0f172a', minHeight: '100vh', borderRadius: '12px' }}>
      
      <h1 style={{ textAlign: 'center', color: '#38bdf8', marginBottom: '30px' ,lineHeight:'1.4',wordSpacing:'4px'}}>🚀GATE 2027 Prep Tracker</h1>

      {/* सेक्शन 1: फुल लेंथ टेस्ट काउंटर डैशबोर्ड */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '30px', border: '1px solid #38bdf8' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#38bdf8' }}>🏆 Full-Length Mock Tests (FLTs)</h2>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '10px' }}>{fltCount} Tests Given</div>
        <button onClick={() => setFltCount(fltCount + 1)} style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}>+ Log New FLT</button>
        <button onClick={() => setFltCount(fltCount > 0 ? fltCount - 1 : 0)} style={{ padding: '8px 16px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset</button>
      </div>

      {/* सेक्शन 2: नया सब्जेक्ट जोड़ने का इनपुट */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Add a new core subject (e.g., OS, CN, TOC)..." 
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '6px', border: 'none', fontSize: '15px', backgroundColor: '#1e293b', color: '#fff' }}
        />
        <button onClick={handleAddSubject} style={{ padding: '12px 24px', backgroundColor: '#38bdf8', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Add Subject</button>
      </div>
{/* सेक्शन 3: सब्जेक्ट्स ट्रैकिंग लिस्ट */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {subjects.map((sub) => (
          <div key={sub.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', borderLeft: '6px solid #38bdf8' }}>
            
            {/* सब्जेक्ट हेडिंग और डिलीट बटन */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '18px' }}>{sub.name}</h3>
              <button onClick={() => handleDeleteSubject(sub.id)} style={{ backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
            </div>

            {/* 3 अलग काउंटर्स ग्रिड */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
              
              {/* काउंटर ए: PYQs */}
              <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#bff1aa', textTransform: 'uppercase' }}>📚 PYQs Solved</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0', color: '#72e44d' }}>{sub.pyq} Times</div>
                <button onClick={() => updateCounter(sub.id, 'pyq', 'inc')} style={{ padding: '2px 8px', backgroundColor: '#2df922', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px', fontWeight: 'bold' }}>+</button>
                <button onClick={() => updateCounter(sub.id, 'pyq', 'dec')} style={{ padding: '2px 8px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>-</button>
              </div>

              {/* काउंटर बी: Revision */}
              <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#d1d135', textTransform: 'uppercase' }}>🔄 Revisions</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0', color: '#cec002' }}>{sub.revision} Times</div>
                <button onClick={() => updateCounter(sub.id, 'revision', 'inc')} style={{ padding: '2px 8px', backgroundColor: '#bbbe0b', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px', fontWeight: 'bold' }}>+</button>
                <button onClick={() => updateCounter(sub.id, 'revision', 'dec')} style={{ padding: '2px 8px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>-</button>
              </div>

              {/* काउंटर सी: Topic/Subject Tests */}
              <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#ffffff', textTransform: 'uppercase' }}>📝 Subject Tests</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0', color: '#f43f5e' }}>{sub.tests} Done</div>
                <button onClick={() => updateCounter(sub.id, 'tests', 'inc')} style={{ padding: '2px 8px', backgroundColor: '#f43f5e', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px', fontWeight: 'bold' }}>+</button>
                <button onClick={() => updateCounter(sub.id, 'tests', 'dec')} style={{ padding: '2px 8px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>-</button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;