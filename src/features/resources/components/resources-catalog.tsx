"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { ResourceGrid } from "@/features/resources/components/resource-grid";
import type { ResolvedResourcePreview } from "@/features/resources/lib/previews";
import type {
  ResourceCategoryId,
  ResourceCategoryMeta,
  ResourceEntry,
} from "@/features/resources/types";
import { cn } from "@/lib/utils";

import type { Ref } from "react";

type FilterId = "all" | ResourceCategoryId;

type ResourcesCatalogProps = {
  resources: ResourceEntry[];
  categories: ResourceCategoryMeta[];
  previews: Record<string, ResolvedResourcePreview>;
};

export function ResourcesCatalog({
  resources,
  categories,
  previews,
}: ResourcesCatalogProps) {
  const [selected, setSelected] = useState<FilterId>("all");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef(new Map<FilterId, HTMLButtonElement>());

  const previewMap = useMemo(
    () => new Map(Object.entries(previews)),
    [previews],
  );

  const filterIds = useMemo<FilterId[]>(
    () => ["all", ...categories.map((category) => category.id)],
    [categories],
  );

  const filteredResources = useMemo(() => {
    if (selected === "all") return resources;
    return resources.filter((resource) => resource.category === selected);
  }, [resources, selected]);

  const selectedLabel =
    selected === "all"
      ? "All"
      : (categories.find((category) => category.id === selected)?.label ??
        selected);

  const setChipRef = useCallback(
    (id: FilterId, node: HTMLButtonElement | null) => {
      if (node) {
        chipRefs.current.set(id, node);
      } else {
        chipRefs.current.delete(id);
      }
    },
    [],
  );

  const scrollChipIntoView = useCallback(
    (id: FilterId) => {
      const scroller = scrollerRef.current;
      const chip = chipRefs.current.get(id);
      if (!scroller || !chip) return;

      const index = filterIds.indexOf(id);
      if (index < 0) return;

      const scrollerRect = scroller.getBoundingClientRect();
      const chipRect = chip.getBoundingClientRect();
      const padding = 16;
      /** Treat chip as edge-adjacent within this distance (px). */
      const edgeSlop = 40;
      /** How many extra chips to pull into view past the selection. */
      const revealCount = 2;

      const isFullyVisible = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return (
          rect.left >= scrollerRect.left - 1 &&
          rect.right <= scrollerRect.right + 1
        );
      };

      let visibleAfter = 0;
      for (let i = index + 1; i < filterIds.length; i++) {
        const nextId = filterIds[i];
        if (!nextId) break;
        const next = chipRefs.current.get(nextId);
        if (!next || !isFullyVisible(next)) break;
        visibleAfter += 1;
      }

      let visibleBefore = 0;
      for (let i = index - 1; i >= 0; i--) {
        const prevId = filterIds[i];
        if (!prevId) break;
        const prev = chipRefs.current.get(prevId);
        if (!prev || !isFullyVisible(prev)) break;
        visibleBefore += 1;
      }

      const atRightEdge =
        chipRect.right >= scrollerRect.right - edgeSlop || visibleAfter === 0;
      const atLeftEdge =
        chipRect.left <= scrollerRect.left + edgeSlop || visibleBefore === 0;

      // Mouse-friendly: selecting the last visible chip peels the strip
      // forward so the next couple of categories become usable.
      if (
        atRightEdge &&
        index < filterIds.length - 1 &&
        visibleAfter < revealCount
      ) {
        const targetIndex = Math.min(
          index + revealCount,
          filterIds.length - 1,
        );
        const targetId = filterIds[targetIndex];
        const target = targetId
          ? chipRefs.current.get(targetId)
          : undefined;
        if (target) {
          const targetRect = target.getBoundingClientRect();
          const delta = targetRect.right - scrollerRect.right + padding;
          if (delta > 0) {
            scroller.scrollBy({ left: delta, behavior: "smooth" });
            return;
          }
        }
      }

      // Symmetric peel backward when selecting the first visible chip.
      if (atLeftEdge && index > 0 && visibleBefore < revealCount) {
        const targetIndex = Math.max(index - revealCount, 0);
        const targetId = filterIds[targetIndex];
        const target = targetId
          ? chipRefs.current.get(targetId)
          : undefined;
        if (target) {
          const targetRect = target.getBoundingClientRect();
          const delta = targetRect.left - scrollerRect.left - padding;
          if (delta < 0) {
            scroller.scrollBy({ left: delta, behavior: "smooth" });
            return;
          }
        }
      }

      // Minimum: keep the selected chip fully inside the viewport.
      if (chipRect.left < scrollerRect.left + padding) {
        scroller.scrollBy({
          left: chipRect.left - scrollerRect.left - padding,
          behavior: "smooth",
        });
      } else if (chipRect.right > scrollerRect.right - padding) {
        scroller.scrollBy({
          left: chipRect.right - scrollerRect.right + padding,
          behavior: "smooth",
        });
      }
    },
    [filterIds],
  );

  const handleSelect = useCallback(
    (id: FilterId) => {
      setSelected(id);
      // Defer until after selected styles apply / layout settles.
      requestAnimationFrame(() => {
        scrollChipIntoView(id);
      });
    },
    [scrollChipIntoView],
  );

  return (
    <>
      {/*
        screen-line-top must NOT sit on the overflow-x scroller.
        Its ::before is w-[200vw], which would inflate scrollWidth and let
        the last chip park on the left with a huge empty region.
      */}
      <div className="screen-line-top">
        <nav aria-label="Resource categories">
          <div
            ref={scrollerRef}
            className={cn(
              "max-w-full overflow-x-auto overscroll-x-contain",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            <div className="flex w-max flex-nowrap items-center gap-2 px-4 py-3">
              <FilterChip
                ref={(node) => setChipRef("all", node)}
                label="All"
                selected={selected === "all"}
                onSelect={() => handleSelect("all")}
              />
              {categories.map((category) => (
                <FilterChip
                  key={category.id}
                  ref={(node) => setChipRef(category.id, node)}
                  label={category.label}
                  selected={selected === category.id}
                  onSelect={() => handleSelect(category.id)}
                />
              ))}
            </div>
          </div>
        </nav>
      </div>

      {filteredResources.length === 0 ? (
        <p className="screen-line-top px-4 py-8 text-sm text-muted-foreground">
          No resources in {selectedLabel}.
        </p>
      ) : (
        <div className="screen-line-top relative py-4">
          <ResourceGrid resources={filteredResources} previews={previewMap} />
        </div>
      )}
    </>
  );
}

function FilterChip({
  label,
  selected,
  onSelect,
  ref,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  ref?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "shrink-0 rounded-md border px-2.5 py-1 text-xs transition-colors",
        selected
          ? "border-foreground/25 bg-muted text-foreground"
          : "border-line text-muted-foreground hover:border-foreground/20 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
