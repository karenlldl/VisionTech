import { useState } from "react";
import { Plus, X } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FAQItem[];
};

const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-14 max-w-4xl space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.question}
            className={`overflow-hidden rounded-[28px] border bg-white transition-all duration-300 ${
              isOpen
                ? "border-brand-orange shadow-glow"
                : "border-border shadow-soft hover:border-brand-orange/40"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
            >
              <span className="text-base font-semibold text-brand-dark">
                {item.question}
              </span>

              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                  isOpen
                    ? "bg-brand-orange text-white"
                    : "bg-black/5 text-brand-dark"
                }`}
              >
                {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-7">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default FaqAccordion;