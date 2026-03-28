import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Phone, Lock, Home, Pill, FileText, Plus, 
  Camera, Image as ImageIcon, CheckCircle2, Circle, Clock, 
  Calendar, ChevronLeft, LogOut, User, Bell, ChevronRight,
  Activity, Check
} from 'lucide-react';

// --- MOCK DATA ---
const initialMedications = [
  { id: 1, name: 'Parol', dose: '500mg', time: '08:00', status: 'taken', type: 'pill' },
  { id: 2, name: 'Amoklavin', dose: '1000mg', time: '14:00', status: 'pending', type: 'pill' },
  { id: 3, name: 'Lansor', dose: '30mg', time: '20:00', status: 'upcoming', type: 'capsule' },
];

const mockPrescriptions = [
  { id: 1, date: '28 Mart 2026', doctor: 'Dr. Ayşe Yılmaz', image: 'https://picsum.photos/seed/recete1/400/600' },
  { id: 2, date: '15 Şubat 2026', doctor: 'Dr. Mehmet Demir', image: 'https://picsum.photos/seed/recete2/400/600' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('kvkk');
  const [medications, setMedications] = useState(initialMedications);
  
  // Navigation helper
  const navigate = (screen: string) => setCurrentScreen(screen);

  // Mark medication as taken
  const takeMedication = (id: number) => {
    setMedications(meds => meds.map(m => m.id === id ? { ...m, status: 'taken' } : m));
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 sm:p-4 font-sans text-slate-800">
      {/* Mobile Device Container */}
      <div className="w-full max-w-md h-[100dvh] sm:h-[850px] bg-slate-50 sm:rounded-[2.5rem] sm:shadow-2xl relative overflow-hidden flex flex-col border-4 border-slate-800">
        
        {/* Status Bar Mock (Desktop only) */}
        <div className="hidden sm:flex justify-between items-center px-6 py-3 bg-transparent absolute top-0 w-full z-50 text-slate-800">
          <span className="text-xs font-medium">09:41</span>
          <div className="flex space-x-2">
            <Activity size={14} />
            <div className="w-4 h-3 border border-slate-800 rounded-sm relative">
              <div className="absolute inset-0.5 bg-slate-800 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 relative mt-0 sm:mt-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === 'kvkk' && <KVKKScreen key="kvkk" navigate={navigate} />}
            {currentScreen === 'login' && <LoginScreen key="login" navigate={navigate} />}
            {currentScreen === 'otp' && <OTPScreen key="otp" navigate={navigate} />}
            {currentScreen === 'home' && <HomeScreen key="home" navigate={navigate} medications={medications} takeMedication={takeMedication} />}
            {currentScreen === 'add_prescription' && <AddPrescriptionScreen key="add_prescription" navigate={navigate} />}
            {currentScreen === 'add_medication' && <AddMedicationScreen key="add_medication" navigate={navigate} />}
            {currentScreen === 'medication_list' && <MedicationListScreen key="medication_list" navigate={navigate} medications={medications} />}
            {currentScreen === 'prescription_history' && <PrescriptionHistoryScreen key="prescription_history" navigate={navigate} />}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation (Only on main screens) */}
        {['home', 'medication_list', 'prescription_history'].includes(currentScreen) && (
          <BottomNav currentScreen={currentScreen} navigate={navigate} />
        )}
      </div>
    </div>
  );
}

// --- SCREENS ---

function KVKKScreen({ navigate }: { navigate: (s: string) => void }) {
  const [kvkkChecked, setKvkkChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
      className="h-full flex flex-col p-6 bg-white"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center mt-10">
        <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={48} className="text-teal-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Verileriniz Güvende</h1>
        <p className="text-slate-500 mb-8 text-sm">
          Size daha iyi hizmet verebilmek ve ilaç takibinizi yapabilmek için bazı bilgilerinize ihtiyaç duyuyoruz.
        </p>

        <div className="w-full space-y-4 text-left">
          <label className="flex items-start space-x-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="mt-0.5">
              <input type="checkbox" className="w-5 h-5 accent-teal-600" checked={kvkkChecked} onChange={(e) => setKvkkChecked(e.target.checked)} />
            </div>
            <span className="text-sm text-slate-600 leading-tight">
              <span className="text-teal-600 font-medium underline">KVKK Aydınlatma Metni</span>'ni okudum ve anladım.
            </span>
          </label>

          <label className="flex items-start space-x-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="mt-0.5">
              <input type="checkbox" className="w-5 h-5 accent-teal-600" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} />
            </div>
            <span className="text-sm text-slate-600 leading-tight">
              Sağlık verilerimin işlenmesine ve saklanmasına <span className="font-medium">açık rıza</span> gösteriyorum.
            </span>
          </label>
        </div>
      </div>

      <div className="pb-6 pt-4">
        <button 
          disabled={!kvkkChecked || !consentChecked}
          onClick={() => navigate('login')}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            kvkkChecked && consentChecked 
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Devam Et
        </button>
      </div>
    </motion.div>
  );
}

function LoginScreen({ navigate }: { navigate: (s: string) => void }) {
  const [phone, setPhone] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
      className="h-full flex flex-col p-6 bg-white"
    >
      <button onClick={() => navigate('kvkk')} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 mb-6 mt-4">
        <ChevronLeft size={24} />
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Hoş Geldiniz</h1>
        <p className="text-slate-500 mb-10">Lütfen giriş yapmak için telefon numaranızı girin.</p>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Telefon Numarası</label>
          <div className="flex flex-row items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-teal-500 transition-colors">
            <div className="bg-slate-100 px-4 py-4 font-medium text-slate-600 border-r border-slate-200">
              +90
            </div>
            <input 
              type="tel" 
              placeholder="5XX XXX XX XX" 
              className="flex-1 px-4 py-4 outline-none text-lg tracking-wide"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
            />
          </div>
        </div>
      </div>

      <div className="pb-6">
        <button 
          disabled={phone.length < 10}
          onClick={() => navigate('otp')}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            phone.length >= 10 
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Giriş Yap / Kayıt Ol
        </button>
      </div>
    </motion.div>
  );
}

function OTPScreen({ navigate }: { navigate: (s: string) => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isComplete = otp.every(v => v !== '');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}
      className="h-full flex flex-col p-6 bg-white"
    >
      <button onClick={() => navigate('login')} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 mb-6 mt-4">
        <ChevronLeft size={24} />
      </button>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Doğrulama Kodu</h1>
        <p className="text-slate-500 mb-10">Telefonunuza gönderilen 6 haneli kodu giriniz.</p>

        <div className="flex justify-between space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:bg-teal-50 outline-none transition-all"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
            />
          ))}
        </div>
        
        <p className="text-center text-slate-500 text-sm mt-8">
          Kodu tekrar gönder <span className="text-teal-600 font-medium">(01:59)</span>
        </p>
      </div>

      <div className="pb-6">
        <button 
          disabled={!isComplete}
          onClick={() => navigate('home')}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            isComplete 
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Doğrula ve Giriş Yap
        </button>
      </div>
    </motion.div>
  );
}

function HomeScreen({ navigate, medications, takeMedication }: { navigate: (s: string) => void, medications: any[], takeMedication: (id: number) => void }) {
  const takenCount = medications.filter(m => m.status === 'taken').length;
  const totalCount = medications.length;
  const progress = (takenCount / totalCount) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-slate-50 pb-20 overflow-y-auto"
    >
      {/* Header */}
      <div className="bg-teal-600 px-6 pt-12 pb-8 rounded-b-[2.5rem] text-white shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-teal-100 text-sm font-medium">Merhaba,</p>
            <h1 className="text-2xl font-bold">Ahmet Yılmaz</h1>
          </div>
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center border-2 border-teal-400">
            <User size={24} className="text-white" />
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-5 text-slate-800 shadow-lg">
          <div className="flex justify-between items-end mb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Bugünkü İlerleme</h2>
              <p className="text-2xl font-bold mt-1">{takenCount} <span className="text-lg text-slate-400 font-medium">/ {totalCount} İlaç</span></p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-teal-100 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-teal-500"
                  strokeDasharray={`${progress}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="currentColor" strokeWidth="4"
                />
              </svg>
              <span className="text-xs font-bold text-teal-600">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 mt-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Bugünkü Plan</h2>
          <span className="text-sm text-teal-600 font-medium">28 Mart</span>
        </div>

        <div className="space-y-4">
          {medications.map((med, index) => (
            <div key={med.id} className="flex items-start">
              <div className="flex flex-col items-center mr-4 mt-1">
                <div className={`w-3 h-3 rounded-full ${med.status === 'taken' ? 'bg-teal-500' : med.status === 'pending' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                {index !== medications.length - 1 && <div className="w-0.5 h-20 bg-slate-200 mt-2"></div>}
              </div>
              
              <div className={`flex-1 p-4 rounded-2xl border ${med.status === 'taken' ? 'bg-white border-slate-100 opacity-60' : med.status === 'pending' ? 'bg-white border-amber-200 shadow-sm' : 'bg-white border-slate-100'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block ${med.status === 'taken' ? 'bg-teal-50 text-teal-600' : med.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                      {med.time}
                    </span>
                    <h3 className={`font-bold text-lg ${med.status === 'taken' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{med.name}</h3>
                    <p className="text-sm text-slate-500">{med.dose}</p>
                  </div>
                  
                  {med.status === 'taken' ? (
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-500">
                      <Check size={20} />
                    </div>
                  ) : med.status === 'pending' ? (
                    <button 
                      onClick={() => takeMedication(med.id)}
                      className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all"
                    >
                      <Check size={20} />
                    </button>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-300">
                      <Clock size={20} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <div className="fixed sm:absolute bottom-24 right-6 z-40">
        <button 
          onClick={() => navigate('add_medication')}
          className="w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg shadow-teal-200 flex items-center justify-center hover:bg-teal-700 active:scale-95 transition-all"
        >
          <Plus size={28} />
        </button>
      </div>
    </motion.div>
  );
}

function AddPrescriptionScreen({ navigate }: { navigate: (s: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-10 pb-4 flex items-center border-b border-slate-100">
        <button onClick={() => navigate('home')} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Reçete Yükle</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <p className="text-slate-500 mb-6">Reçetenizin net bir fotoğrafını çekin veya galeriden seçin. Sistemimiz reçetenizi güvenle saklayacaktır.</p>

        <div className="flex-1 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-slate-400">
            <Camera size={32} />
          </div>
          <p className="text-slate-500 font-medium">Henüz fotoğraf seçilmedi</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="py-4 rounded-xl border border-slate-200 font-semibold text-slate-700 flex items-center justify-center space-x-2 hover:bg-slate-50">
            <Camera size={20} />
            <span>Kamera</span>
          </button>
          <button className="py-4 rounded-xl border border-slate-200 font-semibold text-slate-700 flex items-center justify-center space-x-2 hover:bg-slate-50">
            <ImageIcon size={20} />
            <span>Galeri</span>
          </button>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-slate-700">Not (Opsiyonel)</label>
          <textarea 
            placeholder="Doktorun söylediği ek bilgiler..." 
            className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-teal-500 h-24 resize-none"
          ></textarea>
        </div>

        <button 
          onClick={() => navigate('home')}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all"
        >
          Kaydet
        </button>
      </div>
    </motion.div>
  );
}

function AddMedicationScreen({ navigate }: { navigate: (s: string) => void }) {
  const [step, setStep] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="px-6 pt-10 pb-4 flex items-center border-b border-slate-100">
        <button onClick={() => step === 1 ? navigate('home') : setStep(1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 mr-4">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Yeni İlaç Ekle</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Progress */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">1</div>
          <div className={`flex-1 h-1 mx-2 rounded-full ${step === 2 ? 'bg-teal-600' : 'bg-slate-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
        </div>

        {step === 1 ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">İlaç Bilgileri</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">İlaç Adı</label>
              <input type="text" placeholder="Örn: Parol" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-teal-500 text-lg" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Dozaj</label>
              <input type="text" placeholder="Örn: 500mg, 1 Tablet" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-teal-500 text-lg" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">İlaç Tipi</label>
              <div className="grid grid-cols-3 gap-3">
                <div className="border-2 border-teal-500 bg-teal-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer">
                  <Pill size={24} className="text-teal-600 mb-2" />
                  <span className="text-xs font-bold text-teal-700">Hap</span>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50">
                  <div className="w-6 h-6 border-2 border-slate-400 rounded-sm mb-2"></div>
                  <span className="text-xs font-medium text-slate-600">Şurup</span>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50">
                  <div className="w-1 h-6 bg-slate-400 mb-2"></div>
                  <span className="text-xs font-medium text-slate-600">İğne</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Saat Planlama</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">İlk Doz Saati</label>
              <div className="w-full p-4 border border-slate-200 rounded-xl flex items-center justify-between bg-slate-50">
                <span className="text-2xl font-bold text-slate-800">08:00</span>
                <Clock className="text-slate-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kullanım Sıklığı</label>
              <select className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-teal-500 text-lg bg-white appearance-none">
                <option>Günde 1 kez (24 saatte bir)</option>
                <option selected>Günde 2 kez (12 saatte bir)</option>
                <option>Günde 3 kez (8 saatte bir)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Kullanım Süresi</label>
              <select className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-teal-500 text-lg bg-white appearance-none">
                <option>Sürekli</option>
                <option selected>7 Gün</option>
                <option>14 Gün</option>
              </select>
            </div>

            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 flex items-start space-x-3 mt-8">
              <Bell className="text-teal-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-teal-800">
                Bu ilaç için her gün <strong>08:00</strong> ve <strong>20:00</strong> saatlerinde telefonunuza hatırlatıcı bildirim gönderilecektir.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100">
        <button 
          onClick={() => step === 1 ? setStep(2) : navigate('home')}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all"
        >
          {step === 1 ? 'İleri: Saat Planlama' : 'Hatırlatıcıyı Kur'}
        </button>
      </div>
    </motion.div>
  );
}

function MedicationListScreen({ navigate, medications }: { navigate: (s: string) => void, medications: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-slate-50 pb-20"
    >
      <div className="bg-white px-6 pt-12 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">İlaçlarım</h1>
        
        <div className="flex space-x-4">
          <button className="px-4 py-2 border-b-2 border-teal-600 text-teal-600 font-bold">Aktif İlaçlar</button>
          <button className="px-4 py-2 text-slate-400 font-medium">Geçmiş İlaçlar</button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {medications.map(med => (
          <div key={med.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                <Pill size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{med.name}</h3>
                <p className="text-sm text-slate-500">{med.dose} • Her gün {med.time}</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PrescriptionHistoryScreen({ navigate }: { navigate: (s: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-slate-50 pb-20"
    >
      <div className="bg-white px-6 pt-12 pb-4 border-b border-slate-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Reçetelerim</h1>
        <button onClick={() => navigate('add_prescription')} className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {mockPrescriptions.map(pres => (
            <div key={pres.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="h-32 bg-slate-200 relative">
                <img src={pres.image} alt="Reçete" className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-slate-800 truncate">{pres.doctor}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <Calendar size={12} className="mr-1" /> {pres.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// --- COMPONENTS ---

function BottomNav({ currentScreen, navigate }: { currentScreen: string, navigate: (s: string) => void }) {
  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center z-50 pb-6 sm:pb-4">
      <NavItem 
        icon={<Home size={24} />} 
        label="Ana Sayfa" 
        isActive={currentScreen === 'home'} 
        onClick={() => navigate('home')} 
      />
      <NavItem 
        icon={<Pill size={24} />} 
        label="İlaçlarım" 
        isActive={currentScreen === 'medication_list'} 
        onClick={() => navigate('medication_list')} 
      />
      <NavItem 
        icon={<FileText size={24} />} 
        label="Reçeteler" 
        isActive={currentScreen === 'prescription_history'} 
        onClick={() => navigate('prescription_history')} 
      />
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center space-y-1 transition-colors ${isActive ? 'text-teal-600' : 'text-slate-400'}`}>
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}
