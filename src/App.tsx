import { Routes, Route } from 'react-router-dom';
import VaporizerQuiz from './components/quiz/VaporizerQuiz';
import { HomePage } from './pages/HomePage';
import { SavedPage } from './pages/SavedPage';
import { ExplorePage } from './pages/ExplorePage';
import { ResultDetailPage } from './pages/ResultDetailPage';
import { SellerProfilePage } from './pages/SellerProfilePage';
import { StoreSetupPage } from './pages/StoreSetupPage';
import { AboutPage } from './pages/AboutPage';
import { TemplateViewPage } from './pages/TemplateViewPage';
import { RecommendationPage } from './pages/RecommendationPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFoundPage } from './components/layout/NotFoundPage';
import ProductDisplayPage from './pages/ProductDisplayPage'; // Added for product display
import { CloudNavbar } from './components/layout/CloudNavbar';
import { MobileNavbar } from './components/layout/MobileNavbar';
import { useIsMobile } from './hooks/useMediaQuery';
import  AuthPage  from './pages/AuthPage';
import { AuthProvider } from './contexts/AuthContext'; // <-- Import AuthProvider

function App() {
  const isMobile = useIsMobile();

  return (
    <AuthProvider> 
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
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<VaporizerQuiz quizId={1} />} />
                <Route path="/recommendation" element={<RecommendationPage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/template/:templateId" element={<TemplateViewPage />} />
                <Route path="/results/:id" element={<ResultDetailPage />} />
                <Route path="/seller/:sellerId" element={<SellerProfilePage />} />
                <Route path="/my-profile" element={<SellerProfilePage />} />
                <Route path="/store-setup" element={<StoreSetupPage />} />
                <Route path="/products/:slug" element={<ProductDisplayPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* 404 catch-all route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            {isMobile && <MobileNavbar />}
          </>
        } />
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;