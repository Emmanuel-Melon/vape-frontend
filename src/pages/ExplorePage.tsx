import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudBackground } from '../components/layout/CloudBackground';
import { Footer } from '../components/layout/Footer';
import { TemplateDiscussion } from '../components/TemplateDiscussion';
import { CommunityTemplate } from '../types/explore';
import { allTemplates } from '../data/explore-data';
import { ExploreHeader } from '../components/explore/ExploreHeader';
import { FeaturedTemplates } from '../components/explore/FeaturedTemplates';
import { SearchBar } from '../components/explore/SearchBar';
import { TemplatesGrid } from '../components/explore/TemplatesGrid';
import { CommunityStats } from '../components/explore/CommunityStats';

const ITEMS_PER_PAGE = 9;

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'trending' | 'newest'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CommunityTemplate | null>(null);
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());
  const [bookmarkedTemplates, setBookmarkedTemplates] = useState<Set<string>>(new Set());

  const categories = [
    { value: 'all', label: 'All Templates', count: allTemplates.length },
    { value: 'beginner', label: 'Beginner', count: allTemplates.filter(t => t.category === 'beginner').length },
    { value: 'advanced', label: 'Advanced', count: allTemplates.filter(t => t.category === 'advanced').length },
    { value: 'budget', label: 'Budget', count: allTemplates.filter(t => t.category === 'budget').length },
    { value: 'premium', label: 'Premium', count: allTemplates.filter(t => t.category === 'premium').length },
    { value: 'medical', label: 'Medical', count: allTemplates.filter(t => t.category === 'medical').length },
    { value: 'recreational', label: 'Recreational', count: allTemplates.filter(t => t.category === 'recreational').length }
  ];

  const filteredTemplates = allTemplates
    .filter(template => 
      (selectedCategory === 'all' || template.category === selectedCategory) &&
      (template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        case 'newest':
          return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const featuredTemplates = allTemplates.filter(t => t.featured).slice(0, 3);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleUseTemplate = (template: CommunityTemplate) => {
    console.log('Using template:', template);
    navigate('/');
  };

  const handleViewProfile = (authorId: string) => {
    navigate(`/seller/${authorId}`);
  };

  const handleViewTemplate = (templateId: string) => {
    navigate(`/template/${templateId}`);
  };

  const handleOpenDiscussion = (template: CommunityTemplate) => {
    setSelectedTemplate(template);
    setShowDiscussion(true);
  };

  const handleToggleLike = (templateId: string) => {
    setLikedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  const handleToggleBookmark = (templateId: string) => {
    setBookmarkedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <ExploreHeader />

        <FeaturedTemplates
          templates={featuredTemplates}
          likedTemplates={likedTemplates}
          bookmarkedTemplates={bookmarkedTemplates}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          onViewProfile={handleViewProfile}
          onViewTemplate={handleViewTemplate}
          onUseTemplate={handleUseTemplate}
        />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />

        <TemplatesGrid
          templates={paginatedTemplates}
          likedTemplates={likedTemplates}
          bookmarkedTemplates={bookmarkedTemplates}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          onViewProfile={handleViewProfile}
          onViewTemplate={handleViewTemplate}
          onUseTemplate={handleUseTemplate}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <CommunityStats templates={allTemplates} />
      </div>

      <Footer />

      {selectedTemplate && (
        <TemplateDiscussion
          templateId={selectedTemplate.id}
          templateTitle={selectedTemplate.title}
          isOpen={showDiscussion}
          onClose={() => {
            setShowDiscussion(false);
            setSelectedTemplate(null);
          }}
        />
      )}
    </div>
  );
};