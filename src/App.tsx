import { Routes, Route } from 'react-router-dom';
import { VaporizerQuiz } from './components/quiz/VaporizerQuiz';
import { HomePage } from './components/HomePage';
import { SavedPage } from './components/SavedPage';
import { ExplorePage } from './components/ExplorePage';
import { ResultDetailPage } from './components/ResultDetailPage';
import { SellerProfilePage } from './components/SellerProfilePage';
import { StoreSetupPage } from './components/StoreSetupPage';
import { AuthPage } from './components/AuthPage';
import { AboutPage } from './components/AboutPage';
import { TemplateViewPage } from './components/TemplateViewPage';
import { NotFoundPage } from './components/NotFoundPage';
import { CloudNavbar } from './components/CloudNavbar';
import { MobileNavbar } from './components/MobileNavbar';
import { useIsMobile } from './hooks/useMediaQuery';

function App() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Routes>
        {/* Auth routes without navbar */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Main app routes with navbar */}
        <Route path="/*" element={
          <>
            <CloudNavbar />
            <div className={`${isMobile ? 'pb-20' : 'pt-20'}`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<VaporizerQuiz />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/template/:templateId" element={<TemplateViewPage />} />
                <Route path="/results/:id" element={<ResultDetailPage />} />
                <Route path="/seller/:sellerId" element={<SellerProfilePage />} />
                <Route path="/store-setup" element={<StoreSetupPage />} />
                {/* 404 catch-all route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            {isMobile && <MobileNavbar />}
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;