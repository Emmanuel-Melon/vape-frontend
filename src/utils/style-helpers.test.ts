import { describe, it, expect } from 'vitest';
import { getCategoryColor, getBadgeColor, getBadgeIcon } from './style-helpers';

describe('style-helpers', () => {
  describe('getCategoryColor', () => {
    it('should return the correct color for each category', () => {
      expect(getCategoryColor('beginner')).toBe('bg-green-100 text-green-800');
      expect(getCategoryColor('advanced')).toBe('bg-purple-100 text-purple-800');
      expect(getCategoryColor('budget')).toBe('bg-blue-100 text-blue-800');
      expect(getCategoryColor('premium')).toBe('bg-yellow-100 text-yellow-800');
      expect(getCategoryColor('medical')).toBe('bg-red-100 text-red-800');
      expect(getCategoryColor('recreational')).toBe('bg-pink-100 text-pink-800');
    });

    it('should return the default color for an unknown category', () => {
      expect(getCategoryColor('unknown')).toBe('bg-gray-100 text-gray-800');
    });
  });

  describe('getBadgeColor', () => {
    it('should return the correct color for each badge', () => {
      expect(getBadgeColor('verified')).toBe('bg-blue-500');
      expect(getBadgeColor('expert')).toBe('bg-purple-500');
      expect(getBadgeColor('top-seller')).toBe('bg-yellow-500');
    });

    it('should return the default color for an unknown badge', () => {
      expect(getBadgeColor('unknown')).toBe('bg-gray-500');
    });
  });

  describe('getBadgeIcon', () => {
    it('should return the correct icon for each badge', () => {
      expect(getBadgeIcon('verified')).toBe('✓');
      expect(getBadgeIcon('expert')).toBe('🎓');
      expect(getBadgeIcon('top-seller')).toBe('⭐');
    });

    it('should return an empty string for an unknown badge', () => {
      expect(getBadgeIcon('unknown')).toBe('');
    });
  });
});
