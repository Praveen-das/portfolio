import { create } from "zustand";

export const usePortfolioStore = create((set) => ({
  heroRef: null,
  setHeroRef: (ref) => set({ heroRef: ref }),
  threeScene: null,
  setThreeScene: (scene) => set({ threeScene: scene }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  progress: 0,
  setProgress: (progress) => set({ progress }),
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
}));
