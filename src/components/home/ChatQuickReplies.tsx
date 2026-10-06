import { FaPaperPlane } from "react-icons/fa";

type Props = {
  step: number;
  loading: boolean;
  prefs: { category: string; budget: number; travelers: number };
  CATEGORIES: string[];
  BUDGETS: number[];
  handleCategory: (cat: string) => void;
  handleBudget: (b: number) => void;
  reset: () => void;
};

export default function ChatQuickReplies({ step, loading, prefs, CATEGORIES, BUDGETS, handleCategory, handleBudget, reset }: Props) {
  if (loading) return null;
  
  return (
    <div className="px-4 pb-4 shrink-0 space-y-2">
      {step === 1 && (
        <div className="grid grid-cols-3 gap-1.5">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => handleCategory(cat)}
              className="btn btn-xs btn-outline capitalize hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all">
              {cat}
            </button>
          ))}
          <button onClick={() => handleCategory("")} className="btn btn-xs btn-ghost col-span-3 text-base-content/50">
            Any destination
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-2 gap-1.5">
          {BUDGETS.map((b) => (
            <button key={b} onClick={() => handleBudget(b)}
              className={`btn btn-xs ${prefs.budget === b ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-none" : "btn-outline"}`}>
              ${b}
            </button>
          ))}
        </div>
      )}

      {step === 4 && (
        <button onClick={reset}
          className="w-full btn btn-sm btn-outline gap-2">
          <FaPaperPlane size={12} /> Start New Search
        </button>
      )}
    </div>
  );
}
