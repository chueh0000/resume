import Resume from './components/Resume';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 print:bg-white">
        <Resume />
      </div>
    </LanguageProvider>
  )
}
