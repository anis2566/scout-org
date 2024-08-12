import { create } from "zustand";

interface AwardState {
  open: boolean;
  awardId: string;
  onOpen: (awardId: string) => void;
  onClose: () => void;
}

export const useAward = create<AwardState>()((set) => ({
  open: false,
  awardId: "",
  onOpen: (awardId) => set({ open: true, awardId }),
  onClose: () => set({ open: false, awardId: "" }),
}));
